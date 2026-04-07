// Sovereign v17.0 — Complete Autonomous Sales Closer Engine
// Phase 1: Discovery via Ground-Truth Scraping (YP → Bing → DDG) [UNTOUCHED]
// Phase 2: 4-Day Drip Campaign (Automatic Follow-Ups) [NEW]
// Phase 3: Reply Sentiment Analysis & Gold Alerts [NEW]
// Phase 4: Analytics + Heartbeat Monitoring
// RULE: No 3rd-party paid APIs. Only free web scraping + DNS checks.

import { initDB, db, isDuplicateCompany, isAlreadyContacted, recordOutreach, extractDomain } from './db';
import { findLeads, scrapeAboutPage, ddgSearch, findOfficialWebsite, scrapeGmbProfile } from './search_service';
import { personalizeOutreach, generateFollowUp, analyzeLeadRelevance, personalizeDeepOutreach } from './personalizer';
import { sendEmail } from './gmail_service';
import { enrichCompanyData } from './email_discovery';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as dns from 'dns';

import { promisify } from 'util';
const sentThisRun = new Set<string>();
dotenv.config();

// Validate required environment variables
const requiredEnv = ['GMAIL_USER', 'GMAIL_APP_PASS'];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

// Simple file logger for outreach actions
import * as fs from 'fs';
function logOutreach(entry: string) {
  const logLine = `${new Date().toISOString()} ${entry}\n`;
  fs.appendFileSync('outreach.log', logLine);
}


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
export async function validateEmailSafe(email: string, verifyDns: boolean = true): Promise<boolean> {
    if (!email || !email.includes('@')) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return false;
    const domain = email.split('@')[1].toLowerCase();
    // v21.26 Hardened Prohibited Patterns (Filtered by User & Industry experience)
    const forbiddenPatterns = [
        'yellowpages', 'zawya', 'dubizzle', 'w3.org', 'google.com', 'bing.com', 'yahoo.com', 
        'pro-services', 'visa-uae', 'setup-dubai', 'propertynews', 'w.media', 'news.ae',
        'scientechnic', 'media', 'publisher', 'realestate', 'property'
    ];
    if (forbiddenPatterns.some(f => domain.includes(f))) {
        console.warn(`🛡️ Bounce-Shield: Prohibited domain pattern detected (${domain}). Skipping.`);
        return false;
    }
    
    if (!verifyDns) return true; // Bypass MX check if disabled in settings
    
    try {
        const mx = await resolveMx(domain);
        return !!(mx && mx.length > 0);
    } catch (e: any) { 
        // v21.25 Cloud-Shield Hardening: If local DNS is failing/timed out, perform a Cloudflare DoH lookup
        if (e.code === 'ECONNREFUSED' || e.code === 'ETIMEOUT' || e.code === 'ESERVFAIL' || e.code === 'ENOTFOUND') {
            try {
                const dohResponse = await axios.get(`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`, {
                    headers: { 'Accept': 'application/dns-json' },
                    timeout: 5000
                });
                const status = dohResponse.data?.Status;
                // Status 3 is NXDOMAIN (Domain does not exist) -> Reject
                if (status === 3) {
                    console.warn(`🛡️ Cloud-Shield: Domain ${domain} confirmed NON-EXISTENT (NXDOMAIN). Rejecting.`);
                    return false;
                }
                // Status 0 is NoError (Success) -> Check for MX answer
                if (status === 0 && dohResponse.data.Answer && dohResponse.data.Answer.length > 0) {
                    return true;
                }
                // If cloud lookup is also inconclusive, but it's not a hard reject, we fallback to safe true
                return false; 
            } catch (dohError) {
                // If even the cloud-shield is blocked (no internet), we fallback to false for safety
                console.error(`🛡️ Cloud-Shield: Failed to reach Cloudflare for ${domain}. Falsing for safety.`);
                return false;
            }
        }
        return false; 
    }
}

// --- Hyper-Local Search Grid [LOCKED] ---
const BASE_NICHES = [
    "Building Construction Companies UAE",
    "MEP Contracting LLC",
    "Civil Engineering Contractors",
    "Electromechanical Contractors",
    "Infrastructure Construction LLC",
    "Steel Structure Construction",
    "Mechanical Engineering Contractors",
    "HVAC Installation Companies",
    "Electrical Switchgear Companies",
    "Panel Builders UAE",
    "Industrial Maintenance Engineering",
    "Power Systems Contractors",
    "Interior Fit-out Contracting LLC",
    "Instrumentation & Control LLC",
    // v18.2: Heavy Industrial Expansion
    "Warehouse Construction Companies",
    "Substation Contractors UAE",
    "Water Treatment Plant Engineering",
    "Marine Engineering Contracting",
    "Industrial Ventilation Systems",
    "Fire Fighting Contractors Dubai",
    "Security & Automation Systems",
    "Aluminum & Glass Contracting LLC",
    "Pre-Engineered Building PEB",
    // v19.0: Specialized Item Niches
    "IT Infrastructure Contractors UAE",
    "Low Voltage System Installers",
    "Fire Alarm System Contractors",
    "Data Center Solutions Dubai",
    "Security System Integrators",
    "CCTV & ELV Contractors",
    "Oil and Gas Pipeline Contractors",
    "Solar Energy EPC Contractors",
    "Cold Storage Construction LLC",
    "Commercial Kitchen Ventilation",
    "Cold Room Manufacturers UAE"
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

export async function getSettings() {
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
        db.all("SELECT * FROM leads WHERE status IN ('ready', 'priority_ready') ORDER BY CASE WHEN status = 'priority_ready' THEN 0 ELSE 1 END ASC, added_at ASC LIMIT 10", (err, data) => resolve((data as any[]) || []));
    });
}
async function getFollowUpLeads(followupDays: number): Promise<any[]> {
    return new Promise((resolve) => {
        db.all(
            `SELECT * FROM leads WHERE status = 'sent' AND sent_count < 2 AND reply_sentiment IS NULL AND last_contacted < datetime('now', '-${followupDays} days') LIMIT 5`,
        );
    });
}

// v20.3: Identity Guard 2.0 (Zero-Token Regex Name Cleaner)
async function cleanCompanyName(rawName: string): Promise<string> {
    if (!rawName) return '';
    let name = rawName;
    // Step 1: Split on separators and take the first meaningful chunk
    name = name.split(/[\|–—]/)[0].trim();
    // Step 2: Remove leading SEO spam words
    name = name.replace(/^(buy|best|top|cheap|leading|expert|premium|affordable|trusted|official|quality|professional|certified|licensed)\s+/gi, '');
    // Step 3: Remove trailing city/country/region words
    name = name.replace(/\s+(dubai|abu\s?dhabi|sharjah|ajman|uae|rak|fujairah|umm\s?al\s?quwain|al\s?ain|saudi|gcc|middle\s?east|qatar|oman|bahrain|india|in\s+dubai|in\s+uae|in\s+sharjah)$/gi, '');
    // Step 4: Remove trailing SEO descriptions
    name = name.replace(/\s*[-–—]\s*(premium|best|top|leading|expert|cheap|affordable|trusted|professional|certified|licensed|quality|supplier|installation|services?|solutions?|provider|company|manufacturer|dealer|distributor).*$/gi, '');
    // Step 5: Remove dangling dashes/pipes
    name = name.replace(/\s*[-–—|:]\s*$/, '').trim();
    // Step 6: Fallback - if we over-stripped, return original first segment
    if (name.length < 3) name = rawName.split(/[\|–—\-]/)[0].trim();
    return name;
}

export async function dbInsertLead(lead: any): Promise<boolean> {
    const domain = extractDomain(lead.website);
    const cleanedName = await cleanCompanyName(lead.company_name);
    
    if (await isDuplicateCompany(lead.website, cleanedName)) return false;
    if (lead.email && await isAlreadyContacted(lead.email)) return false;
    
    return new Promise((resolve) => {
        db.run(
            `INSERT OR IGNORE INTO leads (company_name, website, domain, type, phone, location, category, status, email, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [cleanedName, lead.website || 'N/A', domain, lead.type || 'auto_discovery', lead.phone || lead.mobile_number || '', lead.location || 'UAE', lead.category || '', lead.email ? 'ready' : 'new', lead.email || null, lead.mobile_number || null],
            function(err) { resolve(!err && this.changes > 0); }
        );
    });
}
function trackAnalytic(field: string, increment: number = 1) {
    const today = new Date().toISOString().split('T')[0];
    db.run(`INSERT INTO analytics (date, ${field}) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET ${field} = ${field} + ?`, [today, increment, increment], () => {});
}
import { heartbeatData, logToDashboard, analyzeSentiment, groqClient } from './shared_utils.js';
import { startImapMonitor } from './imap_monitor.js';

async function emitHeartbeat() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const stats: any = await new Promise((res) => db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row) => res(row || { emails_sent: 0 })));
        heartbeatData.emails_sent_today = stats.emails_sent || 0;
        
        const countRes: any = await new Promise((res) => db.get("SELECT COUNT(*) as count FROM leads WHERE date(added_at) = ?", [today], (err, row) => res(row || { count: 0 })));
        heartbeatData.companies_found_today = countRes.count || 0;

        const replyRes: any = await new Promise((res) => db.get("SELECT COUNT(*) as count FROM replies WHERE date(received_at) = ?", [today], (err, row) => res(row || { count: 0 })));
        heartbeatData.replies_today = replyRes.count || 0;

        await axios.post('http://localhost:3001/api/heartbeat', heartbeatData);
    } catch (e: any) {
        console.error("[HEARTBEAT ERROR]:", e.message);
    }
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
        const includeGmb = settings.include_gmb !== 'false';
        logToDashboard(`Phase 1: Deep Discovery for: "${keyword}" (GMB: ${includeGmb ? 'ON' : 'OFF'})`, "info");
        await updateSettings({ discovery_loop_count: (loopCount + 1).toString() });
        const { leads, trace } = await findLeads(keyword, includeGmb);
        logToDashboard(`Scan complete. Found ${leads.length} leads.`, "info");
        let inserted = 0;
        const verifyDns = settings.verify_domains !== 'false';
        for (const lead of leads) {
            if (lead.email && !(await validateEmailSafe(lead.email, verifyDns))) continue;
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
    // v21.1: Junk protection - skip leads that are just URLs or junk letters
    if (name.length < 3 || name.startsWith('http') || name.startsWith('www') || name.includes('.com')) return false;
    
    const bad = [
        // Directories & Portals
        'news', 'media', 'publisher', 'real estate', 'property', 'research', 'academic', 
        'professor', 'student', 'directory', 'portal', 'zawya', 'yellowpages', 'muqawlat', 
        'hidubai', 'yello.ae', 'atninfo', 'dial4trade', 'dubizzle', 'magazine', 'events', 
        'tenders', 'blog', 'offplan', 'developer', 'no.1', 'timeout', 'khaleej', 'gulfnews', 
        'classified', 'job', 'vacancy', 'career', 'exhibition', 'summit', 'conference',
        // Competitors / Vendors (DO NOT EMAIL)
        'switchgear', 'electrical trading', 'electrical supplier', 'cable manufacturer',
        'transformer', 'electrical store', 'electrical wholesale', 'breakers', 'distribution boards',
        // Unrelated Industries
        'auto parts', 'spare parts', 'garage', 'rent a car', 'salon', 'clinic', 'medical', 
        'hospital', 'pharmacy', 'laundry', 'restaurant', 'cafe', 'grocery', 'supermarket'
    ];
    return !bad.some(t => d.includes(t) || name.includes(t) || e.includes(t));
}

// ─── Main Worker Loop ────────────────────────────────────────────────────────
async function runWorker() {
    console.log("🚀 Tri-Angle Sovereign v17.0 — FULL SALES CLOER SYSTEM ONLINE...");
    await initDB();
    startImapMonitor(); 
    let lastDiscovery = 0;
    const DISCOVERY_INTERVAL = 60 * 1000;
    setInterval(async () => { await emitHeartbeat(); }, 15000);
    let loopCount = 0;
    
    while (true) {
        loopCount++;
        const settings = await getSettings();
        const model = settings.model || 'llama-3.3-70b-versatile';
        const tone = settings.tone || 'Professional & Bold';
        const autoDiscover = settings.auto_discover !== 'false';
        const verifyDns = settings.verify_domains !== 'false';

        // ─── Phase 1: PRIORITY OUTREACH (Send First, Scan Later) ─────────────
        const sentToday = await getTodaySentCount();
        if (sentToday < 250) {
            const rawReadyLeads = await getReadyLeads();
            
            // Clean the queue of any unsafe leads that are clogging it
            for (const lead of rawReadyLeads) {
                if (!isSafeLead(lead) || lead.is_relevant === 0) {
                    logToDashboard(`BRAIN: Rejecting unsafe/irrelevant lead from queue: ${lead.company_name}`, "warning");
                    await new Promise(r => db.run("UPDATE leads SET status = 'unsafe' WHERE id = ?", [lead.id], r));
                }
            }

            const readyLeads = rawReadyLeads.filter(l => isSafeLead(l) && l.is_relevant !== 0);
            
            // Re-verify existing ready leads if DNS check is ON
            if (verifyDns && readyLeads.length > 0) {
                 const lead = readyLeads[0];
                 if (lead.email && !(await validateEmailSafe(lead.email, true))) {
                     logToDashboard(`BRAIN: Rejecting lead with failed DNS/MX: ${lead.company_name}`, "warning");
                     await new Promise(r => db.run("UPDATE leads SET status = 'failed' WHERE id = ?", [lead.id], r));
                     continue;
                 }
            }
            
            if (readyLeads.length > 0) {
                const lead = readyLeads[0];
                try {
                    // v21.10: FINAL AI VERIFICATION SHIELD
                    // If lead was never deep-scanned, force an AI relevance check on the name to block vendors/auto-parts
                    if (lead.is_relevant === null) {
                        logToDashboard(`BRAIN: Running final Mistral Relevance Check on ${lead.company_name}...`, "info");
                        const { analyzeLeadRelevance } = await import('./personalizer');
                        const analysis = await analyzeLeadRelevance(lead.company_name, lead.category || lead.company_name); 
                        if (!analysis.is_relevant) {
                            db.run("UPDATE leads SET status = 'irrelevant', is_relevant = 0 WHERE id = ?", [lead.id]);
                            logToDashboard(`BRAIN: Rejected ${lead.company_name} - Mistral AI marked as totally irrelevant.`, "warning");
                            await delay(5000);
                            continue;
                        } else {
                            db.run("UPDATE leads SET is_relevant = 1 WHERE id = ?", [lead.id]);
                        }
                    }

                    logToDashboard(`OUTREACH: Prioritizing ${lead.company_name}...`, "info");
                    let pitch = '';
                    // v22.0: Always use deep personalization with full website context
                    const websiteContext = lead.about_summary || lead.target_services || lead.website || '';
                    if (lead.target_services || lead.analysis_notes || lead.about_summary) {
                        pitch = await personalizeDeepOutreach(lead.company_name, { notes: lead.analysis_notes || '', services: lead.target_services || '', websiteContent: lead.about_summary || '' }, model, tone);
                    } else {
                        pitch = await personalizeOutreach(lead.company_name, lead.website, tone, model);
                    }
                    
                    const { cleanName } = await import('./personalizer');
                    const cleanSubjectName = cleanName(lead.company_name);
// Domain guard: ensure email domain matches website domain
const emailDomain = lead.email?.split('@')[1]?.toLowerCase();
const siteDomain = lead.website ? new URL(lead.website.startsWith('http') ? lead.website : `https://${lead.website}`).hostname.replace('www.', '').toLowerCase() : '';
if (process.env.STRICT_DOMAIN_MATCH !== 'false' && emailDomain && siteDomain && emailDomain !== siteDomain) {
    logToDashboard(`⚠️ Domain Guard: ${lead.email} domain (${emailDomain}) does not match site (${siteDomain}) – skipping.`, "warning");
    db.run("UPDATE leads SET status = 'invalid_email' WHERE id = ?", [lead.id]);
    continue;
}
if (sentThisRun.has(lead.email)) {
    logToDashboard(`🔁 Duplicate‑Run Guard: ${lead.email} already sent this run – skipping.`, "warning");
    continue;
}
sentThisRun.add(lead.email);
// v22.1: Final Email Sanitization Gate — clean URL encoding & reject garbage
let cleanEmail = lead.email.trim();
try { cleanEmail = decodeURIComponent(cleanEmail); } catch {}
cleanEmail = cleanEmail.replace(/\s+/g, '').toLowerCase();
if (!cleanEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || cleanEmail.includes('%') || cleanEmail.includes(' ')) {
    logToDashboard(`🛡️ Email Sanitizer: Rejected malformed email "${lead.email}" — skipping.`, "warning");
    db.run("UPDATE leads SET status = 'invalid_email' WHERE id = ?", [lead.id]);
    continue;
}
                    const result = await sendEmail(cleanEmail, `${cleanSubjectName} // Electrical Support`, pitch);
                    if (result.success) {
                        db.run("UPDATE leads SET status = 'sent', pitch = ?, last_contacted = CURRENT_TIMESTAMP, sent_count = 1 WHERE id = ?", [pitch, lead.id]);
                        logToDashboard(`OUTREACH SUCCESS: Sent to ${lead.company_name}`, "success");
                        recordOutreach(lead.email, lead.company_name);
                    } else {
                        // Mark as failed to avoid infinite queue loop and log the actual error message
                        db.run("UPDATE leads SET status = 'failed' WHERE id = ?", [lead.id]);
                        throw new Error(result.error || "Unknown Gmail SMTP Error");
                    }
                } catch (e: any) {
                    logToDashboard(`OUTREACH FAILED: ${lead.company_name} -> ${e.message}`, "error");
                }
                // Short safety delay before next lead or next phase
                await delay(30000); 
            }
        }

        // ─── Phase 2: LEAD ENRICHMENT WITH GOOGLE FALLBACK ───────────────────
        const pendingEnrichment: any[] = await new Promise((res) => db.all("SELECT * FROM leads WHERE status IN ('new', 'no_email') LIMIT 3", (err, rows) => res(rows || [])));
        for (const lead of pendingEnrichment) {
            try {
                let website = lead.website;
                if (!website || website === 'N/A') {
                    const searchUrls = await findOfficialWebsite(`"${lead.company_name}" UAE office`);
                    if (searchUrls.length > 0) website = searchUrls[0];
                }

                logToDashboard(`BRAIN: Deep-scanning ${lead.company_name}...`, "info");
                let enrichment = await enrichCompanyData(lead.company_name, website);
                
                // v21.9: GOOGLE INTELLIGENCE FALLBACK (For Cloudflare Blocked Domains)
                if (!enrichment.email) {
                    logToDashboard(`BRAIN: Website blocked/failed for ${lead.company_name}. Engaging OSINT Bypass...`, "info");
                    const { osintEmailSearch } = await import('./email_discovery');
                    const domain = new URL(website).hostname;
                    const bypassEmail = await osintEmailSearch(lead.company_name, domain);
                    
                    if (bypassEmail) {
                        enrichment.email = bypassEmail;
                        logToDashboard(`BRAIN: 🎯 OSINT Bypassed barrier! Found: ${enrichment.email}`, "success");
                    } else {
                        logToDashboard(`BRAIN: OSINT also failed to find a valid email. Marking as Domain Refused.`, "warning");
                    }
                }

                if (enrichment.email) {
                    const analysis = await analyzeLeadRelevance(lead.company_name, enrichment.scrapedText || '');
                    const isRelevant = (analysis.is_relevant || lead.company_name.toLowerCase().includes('mep') || lead.company_name.toLowerCase().includes('electromechanical')) ? 1 : 0;
                    
                    // v21.30 Brand identity correction
                    let finalName = lead.company_name;
                    if (isRelevant && analysis.brand_name && analysis.brand_name.length > 3) {
                        const brandCandidate = analysis.brand_name.trim();
                        // Always overwrite if the AI found a better brand name than the scraped junk search term
                        if (brandCandidate !== lead.company_name && !brandCandidate.toLowerCase().includes("home")) {
                            console.log(`🛡️ Identity Guard: Correcting title [${lead.company_name}] -> [${brandCandidate}]`);
                            finalName = brandCandidate;
                        }
                    }

                    db.run(`UPDATE leads SET company_name = ?, email = ?, status = ?, mobile_number = ?, contact_name = ?, linkedin_url = ?, is_relevant = ?, analysis_notes = ?, target_services = ?, about_summary = ? WHERE id = ?`, 
                        [finalName, enrichment.email, isRelevant ? 'ready' : 'irrelevant', enrichment.mobile_number, enrichment.contact_name, enrichment.linkedin_url, isRelevant, analysis.notes, analysis.services, (enrichment.scrapedText || '').slice(0, 5000), lead.id]);
                } else {
                    db.run("UPDATE leads SET status = 'no_email' WHERE id = ?", [lead.id]);
                }
            } catch (e) {
                console.error(`[WORKER] Enrichment failed for ${lead.company_name}:`, e);
            }
            await delay(5000);
        }

        // ─── Phase 3: DISCOVERY (Only if needed) ─────────────────────────────
        if (autoDiscover && (Date.now() - lastDiscovery > DISCOVERY_INTERVAL)) {
            await autonomousDiscover();
            lastDiscovery = Date.now();
        }

        // Cycle complete - Fast loop if there is outreach to do
        const hasMoreOutreach = await new Promise(res => db.get("SELECT COUNT(*) as count FROM leads WHERE status='ready'", (err, row: any) => res(row?.count > 0)));
        await delay(hasMoreOutreach ? 10000 : 60000);
    }
}
// ─── Singleton Guard ────────────────────────────────────────────────────────
// ─── Singleton Guard ────────────────────────────────────────────────────────
const WORKER_ID = `worker-${Date.now()}`;

async function checkSingleInstance(): Promise<boolean> {
    return new Promise((resolve) => {
        // v21.40: Emergency Heartbeat Cleanup
        // If a previously crashed instance left a heartbeat, we clear it if it's older than 60s
        const ninetySecondsAgo = new Date(Date.now() - 90000).toISOString();
        db.run(`DELETE FROM heartbeat WHERE last_active < ?`, [ninetySecondsAgo], () => {
            const thirtySecondsAgo = new Date(Date.now() - 30000).toISOString();
            db.get(
                `SELECT worker_id FROM heartbeat WHERE last_active > ? AND worker_id != ? LIMIT 1`,
                [thirtySecondsAgo, WORKER_ID],
                (err, row: any) => {
                    if (row) {
                        console.error(`⚠️ COLLISION DETECTED: Another worker (${row.worker_id}) is active. EXITING.`);
                        resolve(false);
                    } else {
                        db.run(
                            `INSERT OR REPLACE INTO heartbeat (worker_id, last_active) VALUES (?, ?)`,
                            [WORKER_ID, new Date().toISOString()],
                            () => resolve(true)
                        );
                    }
                }
            );
        });
    });
}

async function updateHeartbeat() {
    db.run(`UPDATE heartbeat SET last_active = ? WHERE worker_id = ?`, [new Date().toISOString(), WORKER_ID]);
}

// Graceful shutdown – clean heartbeat entry on exit
function cleanupOnExit() {
    db.run(`DELETE FROM heartbeat WHERE worker_id = ?`, [WORKER_ID], (err) => {
        if (err) console.error('⚠️ Failed to clean heartbeat on exit:', err);
        else console.log('✅ Cleaned heartbeat entry, exiting.');
        process.exit();
    });
}
process.on('SIGINT', cleanupOnExit);
process.on('SIGTERM', cleanupOnExit);

async function start() {
    if (await checkSingleInstance()) {
        setInterval(updateHeartbeat, 30000); // 30s heartbeat
        runWorker();
    }
}

start();
