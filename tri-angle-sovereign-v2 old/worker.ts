// Sovereign v17.0 — Complete Autonomous Sales Closer Engine
// Phase 1: Discovery via Ground-Truth Scraping (YP → Bing → DDG) [UNTOUCHED]
// Phase 2: 4-Day Drip Campaign (Automatic Follow-Ups) [NEW]
// Phase 3: Reply Sentiment Analysis & Gold Alerts [NEW]
// Phase 4: Analytics + Heartbeat Monitoring
// RULE: No 3rd-party paid APIs. Only free web scraping + DNS checks.

import { initDB, db, isDuplicateCompany, isAlreadyContacted, recordOutreach, extractDomain } from './db';
import { findLeads, scrapeAboutPage, ddgSearch, findOfficialWebsite, scrapeGmbProfile } from './search_service';
import { personalizeOutreach, generateFollowUp } from './personalizer';
import { sendEmail } from './gmail_service';
import { enrichCompanyData } from './email_discovery';
import axios from 'axios';
import dotenv from 'dotenv';
import dns from 'dns';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const resolveMx = promisify(dns.resolveMx);
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Decode HTML entities
function decodeHtmlEntities(input: string): string {
    return String(input || '')
        .replace(/&amp;/g, '&')
        .replace(/&#038;/g, '&')
        .replace(/&nbsp;|&#160;/g, ' ')
        .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, '-')
        .replace(/&#8217;|&#8216;/g, "'")
        .replace(/&#8218;/g, "'")
        .replace(/&#8219;/g, "'")
        .replace(/&#8213;/g, '...');
}

// 🛡️ Bounce-Shield MX Verification
async function validateEmailSafe(email: string): Promise<boolean> {
    if (!email || !email.includes('@')) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return false;
    const domain = email.split('@')[1].toLowerCase();
    const forbiddenPatterns = ['yellowpages', 'zawya', 'dubizzle', 'w3.org', 'google.com', 'bing.com', 'yahoo.com', 'pro-services', 'visa-uae', 'setup-dubai'];
    if (forbiddenPatterns.some(f => domain.includes(f))) return false;
    try {
        const mx = await resolveMx(domain);
        return mx && mx.length > 0;
    } catch { return false; }
}

// --- Hyper-Local Search Grid [LOCKED] ---
const BASE_NICHES = [
    "MEP Contracting LLC", "Electromechanical Contractors", "Electrical Switchgear Companies",
    "Panel Builders UAE", "Civil Engineering Contractors", "HVAC Installation Companies",
    "Infrastructure Construction LLC", "Industrial Maintenance Engineering", "Power Systems Contractors",
    "Building Construction Companies UAE", "Interior Fit-out Contracting LLC", "Steel Structure Construction",
    "Mechanical Engineering Contractors", "Instrumentation & Control LLC"
];
const UAE_LOCATIONS = [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
    "Jebel Ali Industrial", "Al Quoz Industrial", "Dubai Investment Park DIP", "Mussafah Abu Dhabi", 
    "ICAD Abu Dhabi", "Sajja Industrial Sharjah", "Hamriyah Free Zone", "Ajman Industrial Area",
    "Al Hamra Industrial RAK", "Fujairah Free Zone", "Business Bay Dubai", "Al Quoz 4", "Mussafah 10"
];
const UAE_DISCOVERY_KEYWORDS: string[] = [];
for (const niche of BASE_NICHES) for (const loc of UAE_LOCATIONS) UAE_DISCOVERY_KEYWORDS.push(`${niche} ${loc}`);
UAE_DISCOVERY_KEYWORDS.sort(() => Math.random() - 0.5);

let heartbeatData = {
    status: 'running' as 'running' | 'idle' | 'offline',
    last_action: 'Initializing engine v17.0 Sales Closer...',
    emails_sent_today: 0,
    companies_found_today: 0,
    timestamp: new Date(),
};

async function getSettings() {
    return new Promise<any>((resolve) => {
        db.all('SELECT * FROM settings', (err, rows) => {
            if (err || !rows) return resolve({});
            const s = (rows as any[]).reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
            resolve(s);
        });
    });
}
async function updateSettings(pairs: Record<string, string>) {
    for (const [key, value] of Object.entries(pairs)) {
        await new Promise((resolve) => {
            db.run('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?', [key, value, value], () => resolve(true));
        });
    }
}
async function getReadyLeads(): Promise<any[]> {
    return new Promise((resolve) => {
        db.all("SELECT * FROM leads WHERE status IN ('ready', 'priority_ready') ORDER BY added_at ASC LIMIT 10", (err, data) => resolve((data as any[]) || []));
    });
}
async function getFollowUpLeads(followupDays: number): Promise<any[]> {
    return new Promise((resolve) => {
        db.all(
            `SELECT * FROM leads WHERE status = 'sent' AND sent_count < 2 AND reply_sentiment IS NULL AND last_contacted < datetime('now', '-${followupDays} days') LIMIT 5`,
            (err, data) => resolve((data as any[]) || [])
        );
    });
}
export async function dbInsertLead(lead: any): Promise<boolean> {
    const domain = extractDomain(lead.website);
    if (await isDuplicateCompany(lead.website, lead.company_name)) return false;
    if (lead.email && await isAlreadyContacted(lead.email)) return false;
    return new Promise((resolve) => {
        db.run(
            `INSERT OR IGNORE INTO leads (company_name, website, domain, type, phone, location, category, status, email, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [lead.company_name, lead.website || 'N/A', domain, lead.type || 'auto_discovery', lead.phone || lead.mobile_number || '', lead.location || 'UAE', lead.category || '', lead.email ? 'ready' : 'new', lead.email || null, lead.mobile_number || null],
            function(err) { resolve(!err && this.changes > 0); }
        );
    });
}
function trackAnalytic(field: string, increment: number = 1) {
    const today = new Date().toISOString().split('T')[0];
    db.run(`INSERT INTO analytics (date, ${field}) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET ${field} = ${field} + ?`, [today, increment, increment], () => {});
}
async function logToDashboard(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    heartbeatData.last_action = message;
    heartbeatData.timestamp = new Date();
    try { await axios.post('http://localhost:3001/api/logs', { message, type }); console.log(`[DASHBOARD] ${message}`); } catch {}
}
async function emitHeartbeat() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const stats: any = await new Promise((res) => db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row) => res(row || { emails_sent: 0 })));
        heartbeatData.emails_sent_today = stats.emails_sent || 0;
        const countRes: any = await new Promise((res) => db.get("SELECT COUNT(*) as count FROM leads WHERE date(added_at) = ?", [today], (err, row) => res(row || { count: 0 })));
        heartbeatData.companies_found_today = countRes.count || 0;
        await axios.post('http://localhost:3002/api/heartbeat', heartbeatData);
    } catch {}
}

async function analyzeSentiment(replyBody: string): Promise<'positive' | 'negative' | 'auto_reply' | 'neutral'> {
    try {
        const prompt = `Classify this email reply: "${replyBody.slice(0, 500)}". Categories: positive/negative/auto_reply/neutral. Respond ONLY with the category word.`;
        const { Groq } = await import('groq-sdk');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY });
        const chat = await groq.chat.completions.create({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], temperature: 0, max_tokens: 10 });
        return (chat.choices[0]?.message?.content?.trim().toLowerCase() as any) || 'neutral';
    } catch { return 'neutral'; }
}

async function getTodaySentCount(): Promise<number> {
    try {
        const today = new Date().toISOString().split('T')[0];
        const stats: any = await new Promise((res) => db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row) => res(row || { emails_sent: 0 })));
        return stats.emails_sent || 0;
    } catch { return 0; }
}

// ─── Phase 1: Discovery [LOCKED] ───────────────────────────────────────────
async function autonomousDiscover(): Promise<number> {
    try {
        const settings = await getSettings();
        const loopCount = parseInt(settings.discovery_loop_count || '0', 10);
        const keyword = UAE_DISCOVERY_KEYWORDS[loopCount % UAE_DISCOVERY_KEYWORDS.length];
        logToDashboard(`Phase 1: Deep Discovery for: "${keyword}"`, "info");
        await updateSettings({ discovery_loop_count: (loopCount + 1).toString() });
        const { leads, trace } = await findLeads(keyword);
        logToDashboard(`Scan complete. Found ${leads.length} leads.`, "info");
        let inserted = 0;
        for (const lead of leads) {
            if (lead.email && !(await validateEmailSafe(lead.email))) continue;
            if (await dbInsertLead({ ...lead, category: keyword })) { inserted++; heartbeatData.companies_found_today++; }
        }
        return inserted;
    } catch (e: any) { logToDashboard(`Discovery error: ${e.message}`, "error"); return 0; }
}

function isSafeLead(lead: any): boolean {
    const d = (lead.website || '').toLowerCase();
    const e = (lead.email || '').toLowerCase();
    const forbiddenDomains = ['.edu', '.gov', '.org', 'researchgate', 'academia.edu', 'wikipedia', 'github.com', 'microsoft.com', 'google.com', 'scientific', 'journal'];
    if (forbiddenDomains.some(t => d.includes(t) || e.includes(t))) return false;
    
    const name = (lead.company_name || '').toLowerCase();
    const bad = ['news', 'media', 'publisher', 'real estate', 'property', 'research', 'academic', 'professor', 'student'];
    return !bad.some(t => d.includes(t) || name.includes(t) || e.includes(t));
}

// ─── Main Worker Loop ────────────────────────────────────────────────────────
async function runWorker() {
    console.log("🚀 Tri-Angle Sovereign v17.0 — FULL SALES CLOER SYSTEM ONLINE...");
    await initDB();
    let lastDiscovery = 0;
    const DISCOVERY_INTERVAL = 60 * 1000;
    setInterval(async () => { await emitHeartbeat(); }, 15000);
    let loopCount = 0;
    let imapMonitorStarted = false;

    while (true) {
        loopCount++;
        const settings = await getSettings();
        const model = settings.ai_model || 'llama-3.3-70b-versatile';
        const tone = settings.ai_tone || 'Professional & Bold';
        const autoDiscover = settings.auto_discover !== 'false';
        const followupDays = parseInt(settings.drip_followup_days || '4', 10);

        // 1. Discovery Phase [LOCKED]
        if (autoDiscover && (Date.now() - lastDiscovery > DISCOVERY_INTERVAL)) {
            await autonomousDiscover();
            lastDiscovery = Date.now();
        }

        // 2. Lead Enrichment (LinkedIn + Email)
        const newLeads: any[] = await new Promise((res) => db.all("SELECT * FROM leads WHERE status = 'new' AND email IS NULL LIMIT 10", (err, rows) => res(rows || [])));
        for (const lead of newLeads) {
            try {
                let website = lead.website;
                if (!website || website === 'N/A') {
                    const searchUrls = await findOfficialWebsite(`"${lead.company_name}" UAE website`);
                    if (searchUrls.length > 0) website = searchUrls[0];
                }
                if (website && website !== 'N/A') {
                    const enrichment = await enrichCompanyData(lead.company_name, website);
                    if (enrichment.email) {
                        // Update company_name if enrichment found a better one
                        const finalCompanyName = enrichment.scrapedText && enrichment.scrapedText.length > 100
                            ? lead.company_name
                            : lead.company_name;

                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET email = ?, status = 'ready', mobile_number = ?, contact_name = ?, linkedin_url = ? WHERE id = ?", [enrichment.email, enrichment.mobile_number, enrichment.contact_name, enrichment.linkedin_url, lead.id], function(err) {
                                if (err) {
                                    logToDashboard(`⚠️ Enrichment update failed for ${lead.company_name}: ${err.message}`, 'error');
                                } else {
                                    logToDashboard(`UNLOCKED: ${lead.company_name} lead ready.`, "success");
                                }
                                resolve();
                            });
                        });
                    } else {
                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET status = 'no_email' WHERE id = ?", [lead.id], (err) => {
                                if (err) logToDashboard(`⚠️ Status update failed: ${err.message}`, 'error');
                                resolve();
                            });
                        });
                    }
                }
            } catch {}
            await delay(2000);
        }

        // 3. Phase 1C: Initial Outreach (CAP AT 250)
        const sentToday = await getTodaySentCount();
        if (sentToday >= 250) {
            logToDashboard(`🛡️ GMAIL-SHIELD ACTIVE: Daily limit (250) reached. Outreach paused until tomorrow.`, "warning");
        } else {
            const readyLeads = (await getReadyLeads()).filter(isSafeLead);
            for (const lead of readyLeads) {
                try {
                    // ✅ DOUBLE-SEND GUARD: Re-check DB right before sending
                    const freshLead: any = await new Promise(res =>
                        db.get("SELECT status, sent_count, company_name FROM leads WHERE id = ?", [lead.id], (e, r) => res(r))
                    );
                    if (!freshLead || (freshLead.sent_count || 0) > 0 || !['ready', 'priority_ready'].includes(freshLead.status)) {
                        logToDashboard(`SKIP: ${lead.company_name} already processed (sent_count=${freshLead?.sent_count}, status=${freshLead?.status})`, 'warning');
                        continue;
                    }

                    // Use freshLead company_name to ensure we have the correct current value
                    const companyNameToUse = freshLead.company_name || lead.company_name;
                    const aboutText = await scrapeAboutPage(lead.website);
                    const pitch = await personalizeOutreach(companyNameToUse, aboutText, tone, model);
                    const cleanedCompanyName = decodeHtmlEntities(companyNameToUse);
                    const result = await sendEmail(lead.email, `${cleanedCompanyName} // Electrical Support`, pitch);
                    if (result.success) {
                        // Atomic update with error handling: only increments if sent_count is still 0
                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET status = 'sent', pitch = ?, last_contacted = CURRENT_TIMESTAMP, sent_count = 1 WHERE id = ? AND (sent_count = 0 OR sent_count IS NULL)", [pitch, lead.id], function(err) {
                                if (err) {
                                    logToDashboard(`⚠️ DB UPDATE FAILED for ${companyNameToUse}: ${err.message}`, 'error');
                                } else if (this.changes === 0) {
                                    logToDashboard(`⚠️ ATOMIC UPDATE FAILED - Lead may have been sent by another process: ${companyNameToUse}`, 'warning');
                                } else {
                                    logToDashboard(`OUTREACH SUCCESS: Sent to ${companyNameToUse}`, "success");
                                    recordOutreach(lead.email, companyNameToUse);
                                    trackAnalytic('emails_sent');
                                }
                                resolve();
                            });
                        });
                    }
                } catch (e: any) { logToDashboard(`FAILED: ${lead.company_name} -> ${e.message}`, "error"); }
                
                // v18.1: Human Delay (45-120s randomized)
                const humanDelay = Math.floor(Math.random() * (120000 - 45000 + 1) + 45000);
                await delay(humanDelay);
                
                if (await getTodaySentCount() >= 250) break;
            }
        }

        // 4. Phase 2: Day 4 Drip (The Nudge)
        const followUps = await getFollowUpLeads(followupDays);
        for (const lead of followUps) {
            try {
                // Re-check the lead hasn't been sent already by another process
                const freshFollowupLead: any = await new Promise(res =>
                    db.get("SELECT sent_count, status FROM leads WHERE id = ?", [lead.id], (e, r) => res(r))
                );
                if (!freshFollowupLead || freshFollowupLead.sent_count >= 2) {
                    logToDashboard(`SKIP: ${lead.company_name} follow-up already sent (sent_count=${freshFollowupLead?.sent_count})`, 'warning');
                    continue;
                }

                logToDashboard(`Phase 2: Sending Day 4 Nudge to ${lead.company_name}...`, "info");
                const nudge = await generateFollowUp(lead.company_name, model);
                const cleanedFollowupName = decodeHtmlEntities(lead.company_name);
                const result = await sendEmail(lead.email, `RE: ${cleanedFollowupName} // Electrical Support`, nudge);
                if (result.success) {
                    await new Promise<void>((resolve) => {
                        db.run("UPDATE leads SET status = 'sent_followup', last_contacted = CURRENT_TIMESTAMP, sent_count = 2 WHERE id = ? AND sent_count < 2", [lead.id], function(err) {
                            if (err) {
                                logToDashboard(`⚠️ Follow-up update failed for ${lead.company_name}: ${err.message}`, 'error');
                            } else if (this.changes === 0) {
                                logToDashboard(`⚠️ Follow-up atomic update failed - may have been sent by another process: ${lead.company_name}`, 'warning');
                            } else {
                                logToDashboard(`Nudge delivered to ${lead.company_name}!`, "success");
                            }
                            resolve();
                        });
                    });
                }
            } catch {}
            await delay(15000);
        }

        // 5. Phase 3: Reply Analysis & Gold Alerts
        const pendingReplies: any[] = await new Promise((res) => db.all("SELECT * FROM replies WHERE sentiment = 'pending' LIMIT 5", (err, rows) => res(rows || [])));
        for (const reply of pendingReplies) {
            const sentiment = await analyzeSentiment(reply.body || '');
            db.run("UPDATE replies SET sentiment = ?, status = 'analyzed' WHERE id = ?", [sentiment, reply.id]);
            db.run("UPDATE leads SET reply_sentiment = ? WHERE id = ?", [sentiment, reply.lead_id]);
            if (sentiment === 'positive') {
                logToDashboard(`🔥 GOLD LEAD ALERT: ${reply.from_email} reached out!`, "success");
                if (reply.body.toLowerCase().includes('catalog') || reply.body.toLowerCase().includes('profile')) {
                    const catalog = `Dear Team, as requested, here is our profile: https://drive.google.com/file/d/1T_rHZ6zOWXkOsHso0y2ncHm7rgpg5ol6/view?usp=sharing`;
                    await sendEmail(reply.from_email, "Requested: Electrical Supply Catalog", catalog);
                    logToDashboard(`Auto-sent catalog to ${reply.from_email}.`, "success");
                }
            }
        }

        if (!imapMonitorStarted) {
            imapMonitorStarted = true;
            try { const { monitorReplies } = await import('./monitor_service'); void monitorReplies(); } catch { imapMonitorStarted = false; }
        }
        await delay(15000);
    }
}
// fileURLToPath already imported at top
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    runWorker().catch(err => console.error("Worker failed:", err));
}
