import { db, initDB } from '../db.js';
import { loadSystemConfig } from '../config_manager.js';
import { sendEmail } from '../gmail_service.js';
import { logToDashboard } from '../shared_utils.js';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export interface OutreachGateResult {
    readyCount: number;
    safeCount: number;
    blockedLead?: string;
}

export async function checkOutreachSafetyGate(): Promise<OutreachGateResult> {
    return new Promise((resolve) => {
        db.all(
            `SELECT id, company_name, email, status, is_relevant FROM leads WHERE status = 'ready' AND is_relevant = 1`,
            (err, rows: any[]) => {
                if (err || !rows) return resolve({ readyCount: 0, safeCount: 0 });
                resolve({
                    readyCount: rows.length,
                    safeCount: rows.length,
                    blockedLead: rows.length === 0 ? undefined : `${rows[0].company_name} | ${rows[0].email}`
                });
            }
        );
    });
}

async function getSentTodayCount(): Promise<number> {
    return new Promise((res) => {
        db.get(
            `SELECT COUNT(*) as cnt FROM outreach_drafts WHERE approval_status = 'sent' AND DATE(sent_at) = DATE('now')`,
            (err, row: any) => res(row?.cnt || 0)
        );
    });
}

async function runOutreachWorker() {
    console.log("📤 [WORKER: OUTREACH] SMTP Dispatch & Approved Email Delivery Engine Online...");
    await initDB();

    let consecutiveIdle = 0;

    while (true) {
        try {
            const settings = await loadSystemConfig();
            const outreachEnabled = settings.outreach_enabled === true;
            const dailyLimit = settings.daily_limit || 100;

            if (!outreachEnabled) {
                if (consecutiveIdle % 12 === 0) { // Log every ~60s
                    console.log(`⏸️  [OUTREACH] Outreach is DISABLED in Dashboard Settings. Enable it to start sending.`);
                }
                consecutiveIdle++;
                await delay(5000);
                continue;
            }

            if (settings.engine_paused) {
                if (consecutiveIdle % 12 === 0) {
                    console.log(`⏸️  [OUTREACH] Engine is PAUSED from Dashboard. Waiting...`);
                }
                consecutiveIdle++;
                await delay(5000);
                continue;
            }

            // Daily limit check
            const sentToday = await getSentTodayCount();
            if (sentToday >= dailyLimit) {
                if (consecutiveIdle % 60 === 0) {
                    console.log(`🛑 [OUTREACH] Daily limit reached (${sentToday}/${dailyLimit}). Will resume tomorrow.`);
                }
                consecutiveIdle++;
                await delay(5000);
                continue;
            }

            // Atomic claim — mark one approved draft 'sending' so parallel senders
            // (outreach_worker + worker.ts) never double-send. Stale 'sending' rows
            // (crashed mid-send) are reclaimed after 10 minutes.
            const claimedId = await new Promise<number | null>((resolve) => {
                db.run(
                    `UPDATE outreach_drafts SET approval_status = 'sending', updated_at = CURRENT_TIMESTAMP
                     WHERE id = (
                       SELECT id FROM outreach_drafts
                       WHERE (approval_status = 'approved'
                              OR (approval_status = 'sending' AND updated_at < datetime('now', '-10 minutes')))
                         AND sent_at IS NULL
                         AND recipient_email NOT LIKE '//%' AND recipient_email LIKE '%@%'
                       ORDER BY id ASC LIMIT 1
                     )`,
                    function (err: any) {
                        if (err || !this || !(this.changes > 0)) return resolve(null);
                        db.get("SELECT id FROM outreach_drafts WHERE approval_status = 'sending' AND sent_at IS NULL ORDER BY id ASC LIMIT 1",
                            (e2: any, row: any) => resolve(e2 ? null : (row?.id ?? null)));
                    }
                );
            });

            const approvedDrafts: any[] = claimedId
                ? await new Promise((res, rej) => db.all(
                    `SELECT d.*, l.company_name FROM outreach_drafts d JOIN leads l ON d.lead_id = l.id WHERE d.id = ?`,
                    [claimedId], (err, rows: any[]) => err ? rej(err) : res(rows || [])))
                : [];

            if (approvedDrafts.length > 0) {
                const draft = approvedDrafts[0];
                consecutiveIdle = 0;
                console.log(`📤 [OUTREACH] Dispatching to ${draft.company_name} <${draft.recipient_email}> | Sent today: ${sentToday + 1}/${dailyLimit}`);

                const result = await sendEmail(draft.recipient_email, draft.subject, draft.text_body);
                if (result.success) {
                    await new Promise<void>((resolve) => {
                        db.run("UPDATE outreach_drafts SET approval_status = 'sent', sent_at = CURRENT_TIMESTAMP WHERE id = ?", [draft.id], resolve);
                    });
                    db.run("UPDATE leads SET status = 'contacted', last_contacted = CURRENT_TIMESTAMP WHERE id = ?", [draft.lead_id]);
                    // === FIX ISSUE 2: Write to analytics table so Dashboard shows sent count ===
                    db.run(`INSERT INTO analytics (date, emails_sent, emails_delivered, replies_received, positive_replies, negative_replies)
                        VALUES (DATE('now'), 1, 1, 0, 0, 0)
                        ON CONFLICT(date) DO UPDATE SET
                          emails_sent = emails_sent + 1,
                          emails_delivered = emails_delivered + 1`,
                        (analyticsErr: any) => {
                            if (analyticsErr) console.warn('⚠️ [OUTREACH] Analytics update failed:', analyticsErr.message);
                        }
                    );
                    console.log(`✅ [OUTREACH] EMAIL SENT: ${draft.company_name} (${draft.recipient_email})`);
                    await logToDashboard(`📤 Email sent to ${draft.company_name} (${draft.recipient_email})`, 'success');

                } else {
                    console.error(`❌ [OUTREACH] SEND FAILED for ${draft.recipient_email}: ${result.error}`);
                    db.run("UPDATE outreach_drafts SET approval_status = 'failed' WHERE id = ?", [draft.id]);
                    await logToDashboard(`❌ Failed to send to ${draft.company_name}: ${result.error}`, 'error');
                }

                // Respectful delay between sends (10-20s) to avoid spam filters
                const sendDelay = 10000 + Math.floor(Math.random() * 10000);
                console.log(`⏳ [OUTREACH] Waiting ${Math.round(sendDelay / 1000)}s before next send...`);
                await delay(sendDelay);

            } else {
                consecutiveIdle++;
                if (consecutiveIdle % 6 === 0) { // Every ~30s
                    const approvedCount: any = await new Promise(res => db.get(
                        `SELECT COUNT(*) as cnt FROM outreach_drafts WHERE approval_status = 'approved' AND sent_at IS NULL`,
                        (err, row: any) => res(row)
                    ));
                    console.log(`😴 [OUTREACH] Queue empty - ${approvedCount?.cnt || 0} approved drafts, ${sentToday} sent today. Waiting for Drafts Worker...`);
                }
                await delay(5000);
            }

        } catch (err: any) {
            console.error(`⚠️ [OUTREACH WORKER ERROR]: ${err.message}`);
            await delay(5000);
        }
    }
}

runOutreachWorker();
