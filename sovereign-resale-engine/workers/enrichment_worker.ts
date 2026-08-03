import { db, initDB, upsertContact, extractDomain, queueContactForDeepHunt } from '../db.js';
import { loadSystemConfig } from '../config_manager.js';
import { enrichCompanyData } from '../email_discovery.js';
import { assessEnterpriseBuyerFit, loadCompetitorTerms } from '../search_service.js';
import { logToDashboard } from '../shared_utils.js';
import { cleanContactName, normalizeEmailCandidate } from '../contact_validation.js';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const safeParseNiches = (settings: any): string[] => {
    try {
        const parsed = JSON.parse(String(settings.DYNAMIC_NICHES || settings.dynamic_niches || '[]'));
        return Array.isArray(parsed) ? parsed.map((s: any) => String(s).trim()).filter(Boolean) : [];
    } catch { return []; }
};

export async function getProcessableEnrichmentBatch(batchSize: number = 5): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM leads 
             WHERE status = 'new' OR (status = 'no_email' AND is_relevant = 1)
             ORDER BY id ASC LIMIT ?`,
            [batchSize],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            }
        );
    });
}

async function runEnrichmentWorker() {
    console.log("🔵 [WORKER: ENRICHMENT] Lead Enrichment & B2B Qualification Engine Online...");
    await initDB();

    while (true) {
        try {
            const settings = await loadSystemConfig();
            if (settings.engine_paused) {
                await delay(15000);
                continue;
            }

            // F-14: Honor scheduled retries. The server marks failed enrichments as
            // 'retry_scheduled' with a future next_retry_at (exponential backoff). The
            // old monolithic worker picked those back up when due; the modular worker
            // only looked at status='new', so retry_scheduled leads (status no_email/
            // rejected/approved) were stranded forever. Pull them in when due, capped at
            // the same 4-attempt ceiling the legacy loop used.
            const newLeads: any[] = await new Promise((res, rej) => db.all(
                `SELECT * FROM leads
                 WHERE (
                     status = 'new' AND website IS NOT NULL AND TRIM(website) <> ''
                     AND (enrichment_status IS NULL OR enrichment_status IN ('pending', 'retry_scheduled', ''))
                 ) OR (
                     enrichment_status = 'retry_scheduled'
                     AND website IS NOT NULL AND TRIM(website) <> ''
                     AND next_retry_at IS NOT NULL
                     AND datetime(next_retry_at) <= datetime('now')
                     AND COALESCE(enrichment_attempt_count, 0) < 4
                 )
                 ORDER BY id ASC LIMIT 5`,
                (err, rows) => err ? rej(err) : res(rows || [])
            ));

            // Auto-recover stuck 'needs_review' leads (retry after 1 hour)
            const stuckLeads: any[] = await new Promise((res, rej) => db.all(
                `SELECT * FROM leads WHERE status = 'needs_review' AND enrichment_status = 'failed' AND added_at < datetime('now', '-1 hour') ORDER BY id ASC LIMIT 2`,
                (err, rows) => err ? rej(err) : res(rows || [])
            ));

            const allLeads = [...newLeads, ...stuckLeads];

            if (allLeads.length === 0) {
                console.log("😴 [ENRICHMENT] Queue clear. Resting 10s...");
                await delay(10000);
                continue;
            }

            console.log(`🧪 [ENRICHMENT] Processing batch of ${allLeads.length} leads...`);

            for (const lead of allLeads) {
                const website = lead.website.startsWith('http') ? lead.website : `https://${lead.website}`;
                console.log(`🔎 [ENRICHMENT] Analyzing: ${lead.company_name} (${website})...`);

                try {
                    db.run("UPDATE leads SET enrichment_status = 'processing' WHERE id = ?", [lead.id]);
                    const enrichment = await enrichCompanyData(lead.company_name, website);

                    // F-15: Persist decision-maker contacts to the `contacts` table.
                    // The dashboard "Verified Contacts" stat reads `contacts`, but the
                    // modular worker previously only UPDATE'd `leads` and never inserted
                    // contacts — so the count stayed frozen while discovery grew. Mirror
                    // the manual re-enrich path (server.ts) and upsert each contact here.
                    const leadDomain = lead.domain || extractDomain(lead.website);
                    let savedContacts = 0;
                    for (const contact of (enrichment?.contacts || [])) {
                        const saved = await upsertContact({
                            ...contact,
                            lead_id: lead.id,
                            company_name: enrichment?.companyName || lead.company_name,
                            domain: leadDomain,
                            website: lead.website
                        });
                        if (saved) {
                            savedContacts++;
                            // Task3 — Auto-queue incomplete DMs (name + title, no direct
                            // email) so the LinkedIn/OSINT worker hunts their direct
                            // profile & inbox in the background.
                            const hasEmail = Boolean(contact.email && String(contact.email).trim() !== '');
                            const hasName = Boolean(contact.full_name && String(contact.full_name).trim() !== '');
                            const hasTitle = Boolean(contact.job_title && String(contact.job_title).trim() !== '');
                            if (!hasEmail && hasName && hasTitle && contact.is_decision_maker) {
                                const queued = await new Promise<number>((res) => {
                                    db.get(
                                        `SELECT id FROM contacts WHERE full_name = ? AND domain = ? AND lead_id = ?
                                         AND (email IS NULL OR email = '') AND job_title IS NOT NULL AND job_title != ''
                                         ORDER BY id DESC LIMIT 1`,
                                        [contact.full_name, leadDomain, lead.id],
                                        (e, row: any) => res(row?.id || 0)
                                    );
                                });
                                if (queued) {
                                    await queueContactForDeepHunt(queued);
                                    console.log(`🎯 [ENRICHMENT] Queued DM for deep hunt: ${contact.full_name} (${contact.job_title})`);
                                }
                            }
                        }
                    }
                    if (savedContacts > 0) {
                        console.log(`💾 [ENRICHMENT] Persisted ${savedContacts} contact(s) for ${lead.company_name}`);
                    }

                    if (enrichment && (enrichment.email || enrichment.phone || enrichment.mobile_number)) {
                        // Strict email gate: normalize before saving so malformed/placeholder scraped
                        // emails (e.g. "553400464sales@...comuae") never enter the pipeline.
                        const safeEmail = enrichment.email ? normalizeEmailCandidate(enrichment.email) : null;
                        const hasEmail = Boolean(safeEmail);
                        // Genuine buyer-fit gate: only local + target-niche companies become draftable.
                        // DYNAMIC COMPETITOR GUARD: pass the workspace's own service categories so a
                        // competing agency/web-firm/lead-gen tool is never qualified as a buyer.
                        const competitorTerms = await loadCompetitorTerms(settings);
                        const fit = assessEnterpriseBuyerFit(lead.company_name, enrichment.scrapedText || lead.about_summary || '', safeParseNiches(settings), competitorTerms);
                        const isFit = fit.qualified;
                        const nextStatus = (hasEmail && isFit) ? 'ready' : 'no_email';
                        const fitNote = isFit
                            ? `Buyer-fit: ${fit.reason}`
                            : `Quarantined by buyer-fit gate: ${fit.reason}`;

                        // Validate contact name before saving — reject scraped junk
                        const validatedName = cleanContactName(enrichment.contact_name);

                        await new Promise<void>((resolve) => {
                            db.run(
                                `UPDATE leads SET status = ?, email = COALESCE(?, email), mobile_number = COALESCE(?, mobile_number), phone = COALESCE(?, phone), contact_name = COALESCE(?, contact_name), linkedin_url = COALESCE(?, linkedin_url), about_summary = COALESCE(?, about_summary), is_relevant = ?, relevance_score = ?, analysis_notes = COALESCE(analysis_notes, '') || ?, enrichment_status = 'completed', enrichment_finished_at = CURRENT_TIMESTAMP, next_retry_at = NULL, last_error_code = NULL, last_error_message = NULL, enrichment_attempt_count = COALESCE(enrichment_attempt_count, 0) + 1 WHERE id = ?`,
                                [nextStatus, safeEmail || null, enrichment.mobile_number || null, enrichment.phone || null, validatedName, enrichment.linkedin_url || null, enrichment.scrapedText || '', isFit ? 1 : 0, fit.score, ` | ${fitNote}`, lead.id],
                                () => resolve()
                            );
                        });
                        console.log(`✅ [ENRICHMENT] SUCCESS: ${lead.company_name} -> Status: ${nextStatus.toUpperCase()} (Email: ${safeEmail || 'None'}, Fit: ${fit.score}/100 ${isFit ? '✅' : '⛔ ' + fit.reason}, Contact: ${validatedName || 'None'})`);
                    } else {
                        db.run("UPDATE leads SET status = 'no_email', enrichment_status = 'completed', enrichment_finished_at = CURRENT_TIMESTAMP, next_retry_at = NULL, enrichment_attempt_count = COALESCE(enrichment_attempt_count, 0) + 1 WHERE id = ?", [lead.id]);
                    }
                } catch (e: any) {
                    console.warn(`⚠️ [ENRICHMENT ERROR] ${lead.company_name}: ${e.message}`);
                    db.run("UPDATE leads SET status = 'needs_review', enrichment_status = 'failed', enrichment_finished_at = CURRENT_TIMESTAMP, next_retry_at = NULL, enrichment_attempt_count = COALESCE(enrichment_attempt_count, 0) + 1 WHERE id = ?", [lead.id]);
                }
            }

        } catch (err: any) {
            console.error(`⚠️ [ENRICHMENT LOOP ERROR]: ${err.message}`);
        }

        await delay(3000);
    }
}

runEnrichmentWorker();
