// Sovereign v3.0 — Master Refactored Engine
// ALL config from Dashboard DB. Zero .env reliance. Mistral-first drafting.
// Phase 1: Discovery via Ground-Truth Scraping (YP → Bing → DDG)
// Phase 2: Lead Enrichment & Brand Extraction
// Phase 3: OSINT-Personalized Outreach via Mistral AI
// Phase 4: Analytics + Heartbeat Monitoring
// RULE: No 3rd-party paid APIs. Only free web scraping + DNS checks.

import { initDB, db, isDuplicateCompany, isAlreadyContacted, recordOutreach, extractDomain } from './db.js';
import { findLeads, scrapeAboutPage, ddgSearch, findOfficialWebsite, scrapeGmbProfile } from './search_service.js';
import { personalizeOutreach, generateFollowUp, analyzeLeadRelevance, personalizeDeepOutreach } from './personalizer.js';
import { sendEmail } from './gmail_service.js';
import { enrichCompanyData } from './email_discovery.js';
import { loadSystemConfig } from './config_manager.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as dns from 'dns';

import { promisify } from 'util';
const sentThisRun = new Set<string>();
dotenv.config();

// v22.0: Environment validation moved to dynamic DB loader

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
        'pro-services', 'visa-uae', 'setup-dubai'
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

// v22.0: AI-Pivot — Discovery niches are now dynamically generated from the Dashboard Pitch & Location
// No more hard-coded niches or locations.


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
    
    // v24.1: Never use generic fallback names — they cause mass deduplication
    if (!lead.company_name || lead.company_name === 'UAE Business Entity') {
        lead.company_name = domain ? domain.replace(/\.(com|ae|net|org|io|co).*$/, '').replace(/\./g, ' ') : null;
    }
    if (!lead.company_name || lead.company_name.length < 2) {
        console.log(`   ❌ DROP: No usable company name for ${lead.website}`);
        return false;
    }
    
    const cleanedName = await cleanCompanyName(lead.company_name);
    
    if (await isDuplicateCompany(lead.website, cleanedName)) {
        console.log(`   🔄 DUPLICATE: ${cleanedName} (${domain})`);
        return false;
    }
    if (lead.email && await isAlreadyContacted(lead.email)) {
        console.log(`   📧 ALREADY CONTACTED: ${lead.email}`);
        return false;
    }
    
    return new Promise((resolve) => {
        db.run(
            `INSERT OR IGNORE INTO leads (company_name, website, domain, type, phone, location, category, status, email, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [cleanedName, lead.website || 'N/A', domain, lead.type || 'auto_discovery', lead.phone || lead.mobile_number || '', lead.location || 'UAE', lead.category || '', lead.email ? 'ready' : 'new', lead.email || null, lead.mobile_number || null],
            function(err) {
                if (err) console.log(`   ❌ DB ERROR: ${err.message}`);
                resolve(!err && this.changes > 0);
            }
        );
    });
}
function trackAnalytic(field: string, increment: number = 1) {
    const today = new Date().toISOString().split('T')[0];
    db.run(`INSERT INTO analytics (date, ${field}) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET ${field} = ${field} + ?`, [today, increment, increment], () => {});
}
import { heartbeatData, logToDashboard, analyzeSentiment } from './shared_utils.js';
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

        await axios.post('http://127.0.0.1:3010/api/heartbeat', heartbeatData);
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
        
        // v22.0: Dynamic Niche Extraction
        let niches: string[] = [];
        try { niches = JSON.parse(settings.DYNAMIC_NICHES || '[]'); } catch { niches = []; }
        
        if (niches.length === 0) {
            logToDashboard("Discovery Standby: AI is still brainstorming targets based on your pitch...", "warning");
            return 0;
        }

        const loopCount = parseInt(settings.discovery_loop_count || '0', 10);
        const keyword = niches[loopCount % niches.length];
        const includeGmb = settings.include_gmb !== 'false';
        const location = settings.TARGET_LOCATION || 'UAE';

        logToDashboard(`Phase 1: AI Discovery for: "${keyword}" in ${location}`, "info");
        await updateSettings({ discovery_loop_count: (loopCount + 1).toString() });
        
        const { leads, trace } = await findLeads(`${keyword} ${location}`, includeGmb);
        logToDashboard(`Scan complete. Found ${leads.length} targets in ${location}.`, "info");
        
        let inserted = 0;
        const verifyDns = settings.verify_domains !== 'false';
        for (const lead of leads) {
            if (lead.email && !(await validateEmailSafe(lead.email, verifyDns))) {
                console.log(`   ⚡ Email rejected by Bounce-Shield: ${lead.email}`);
                // Still save the lead without the bad email
                lead.email = null;
            }
            const saved = await dbInsertLead({ ...lead, category: keyword, location });
            if (saved) { 
                inserted++; 
                heartbeatData.companies_found_today++;
                console.log(`   ✅ SAVED: ${lead.company_name} → ${lead.website}`);
            } else {
                console.log(`   ⏭️  Skipped (duplicate/filtered): ${lead.company_name}`);
            }
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
        'directory', 'portal', 'zawya', 'yellowpages', 'muqawlat', 
        'hidubai', 'yello.ae', 'atninfo', 'dial4trade', 'dubizzle',
        'tenders', 'offplan', 'no.1', 'timeout', 'khaleej', 'gulfnews', 
        'classified', 'job', 'vacancy', 'career', 'exhibition', 'summit', 'conference',
        // Competitors / Vendors (DO NOT EMAIL)
        'switchgear', 'electrical trading', 'electrical supplier', 'cable manufacturer',
        'transformer', 'electrical store', 'electrical wholesale', 'breakers', 'distribution boards',
        // Unrelated Industries (Strictly Blocked)
        'auto parts', 'spare parts', 'garage', 'rent a car', 'salon', 'clinic', 'medical', 
        'hospital', 'pharmacy', 'laundry', 'restaurant', 'cafe', 'grocery', 'supermarket',
        'portable toilets', 'kazema'
    ];
    return !bad.some(t => d.includes(t) || name.includes(t) || e.includes(t));
}

// ─── Main Worker Loop ────────────────────────────────────────────────────────
async function runWorker() {
    console.log(`🚀 Sovereign Engine — Initializing...`);
    await initDB();
    startImapMonitor(); 
    let lastDiscovery = 0;
    const DISCOVERY_INTERVAL = 60 * 1000;
    setInterval(async () => { await emitHeartbeat(); }, 15000);
    let loopCount = 0;
    
    while (true) {
        loopCount++;
        const config = await loadSystemConfig();
        const isConfigured = config.company_name && 
                             config.company_name.length > 2 &&
                             config.pitch_context && 
                             config.pitch_context.length > 10;

        if (!isConfigured) {
            if (loopCount % 4 === 1) {
                logToDashboard("ENGINE STANDBY: Waiting for Agency Configuration (Name & Pitch) to be saved in Settings...", "warning");
                console.log("\n🛑 ENGINE HALTED: Missing configuration in Dashboard.");
                console.log("   → Set COMPANY_NAME and PITCH_CONTEXT in Dashboard > Settings.\n");
            }
            await delay(15000);
            continue;
        }

        // v3.0: CRITICAL — Halt if no API keys or SMTP credentials
        const hasLLMKey = !!(config.mistral_api_key || config.groq_api_key);
        const hasSMTP = !!(config.email && config.gmail_pass);
        if (!hasLLMKey || !hasSMTP) {
            if (loopCount % 4 === 1) {
                if (!hasLLMKey) {
                    console.error("\n🛑 ENGINE HALTED: Missing configuration in Dashboard.");
                    console.error("   → No MISTRAL_API_KEY and no GROQ_API_KEY found.");
                    logToDashboard("ENGINE HALTED: No AI API keys configured. Go to Settings.", "error");
                }
                if (!hasSMTP) {
                    console.error("\n🛑 ENGINE HALTED: Missing configuration in Dashboard.");
                    console.error("   → No EMAIL_USER or GMAIL_APP_PASS found.");
                    logToDashboard("ENGINE HALTED: No SMTP credentials configured. Go to Settings.", "error");
                }
            }
            await delay(15000);
            continue;
        }

        if (loopCount === 1 || loopCount % 50 === 0) {
            logToDashboard(`🚀 SOVEREIGN IGNITION: ${config.company_name} Brain Active.`, "success");
            if (config.company_knowledge) logToDashboard(`🧠 Neural KB: Loaded ${config.company_knowledge.length} chars of specialized expertise.`, "info");
        }

        const settings = await getSettings();
        const model = settings.model || 'llama-3.3-70b-versatile';
        const tone = settings.tone || 'Professional & Bold';
        const autoDiscover = settings.auto_discover !== 'false';
        const verifyDns = settings.verify_domains !== 'false';

        // v23.2: Force-Discovery Check (Manual Ignition from Dashboard)
        const forceTrigger: any = await new Promise((res) => db.get("SELECT force_discovery FROM heartbeat WHERE worker_id = 'COMMAND_CENTER'", (err, row) => res(row)));
        const isForceRun = forceTrigger && forceTrigger.force_discovery === 1;
        
        if (isForceRun) {
            logToDashboard("🚀 ENGINE IGNITION: Manual discovery triggered from Command Center.", "success");
            await autonomousDiscover();
            db.run("UPDATE heartbeat SET force_discovery = 0 WHERE worker_id = 'COMMAND_CENTER'");
            lastDiscovery = Date.now();
        }


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
                    // v3.0: FINAL AI VERIFICATION SHIELD
                    if (lead.is_relevant === null) {
                        logToDashboard(`BRAIN: Running Mistral Relevance Check on ${lead.company_name}...`, "info");
                        const { analyzeLeadRelevance } = await import('./personalizer');
                        const analysis = await analyzeLeadRelevance(lead.company_name, lead.about_summary || '', "Final verification check"); 
                        if (!analysis.isRelevant) {
                            db.run("UPDATE leads SET status = 'irrelevant', is_relevant = 0 WHERE id = ?", [lead.id]);
                            logToDashboard(`BRAIN: Rejected ${lead.company_name} — AI marked irrelevant.`, "warning");
                            await delay(5000);
                            continue;
                        } else {
                            // Save the extracted brand name back to DB
                            const brandName = analysis.brandName || lead.company_name;
                            db.run("UPDATE leads SET is_relevant = 1, company_name = ? WHERE id = ?", [brandName, lead.id]);
                            lead.company_name = brandName;
                        }
                    }

                    // v3.0: Use the DB company_name directly — it's already been cleaned by enrichment
                    const displayBrand = lead.company_name;

                    // v3.1: LIVE RE-SCRAPE — If lead has no about_summary but has a website, scrape NOW
                    if ((!lead.about_summary || lead.about_summary.length < 50) && lead.website) {
                        console.log(`   🔄 RE-SCRAPE: ${displayBrand} has no cached content. Scraping ${lead.website}...`);
                        logToDashboard(`BRAIN: Re-scraping ${displayBrand} website for OSINT data...`, "info");
                        try {
                            const freshContent = await scrapeAboutPage(lead.website);
                            if (freshContent && freshContent.length > 50) {
                                lead.about_summary = freshContent;
                                await new Promise(r => db.run(
                                    "UPDATE leads SET about_summary = ? WHERE id = ?", 
                                    [freshContent.slice(0, 8000), lead.id], r
                                ));
                                console.log(`   ✅ RE-SCRAPE: Got ${freshContent.length} chars for ${displayBrand}`);
                            } else {
                                console.log(`   ⚠️ RE-SCRAPE: No usable content from ${lead.website}`);
                            }
                        } catch (scrapeErr: any) {
                            console.log(`   ⚠️ RE-SCRAPE FAILED: ${scrapeErr.message}`);
                        }
                    }

                    logToDashboard(`BRAIN: Drafting Mistral Outreach for [${displayBrand}]...`, "info");
                    
                    // v3.0: CRITICAL — pass scraped website content for OSINT personalization
                    const pitch = await personalizeDeepOutreach(displayBrand, { 
                        notes: lead.analysis_notes || '', 
                        services: lead.target_services || '', 
                        websiteContent: lead.about_summary || '',
                        email: lead.email || '',
                        website: lead.website || '',
                        targetProject: lead.target_services || ''
                    });
                    
                    // v3.0: If personalizer returned null = missing config, scrape failed, or empty content
                    if (!pitch) {
                        logToDashboard(`⚠️ SKIP: Cannot personalize ${displayBrand} (scrape failed or missing config).`, "warning");
                        db.run("UPDATE leads SET status = 'scrape_failed' WHERE id = ?", [lead.id]);
                        await delay(5000);
                        continue;
                    }
                    
                    const { cleanName } = await import('./personalizer');
                    const cleanSubjectName = cleanName(displayBrand);
                    const subjectLine = cleanSubjectName ? `${cleanSubjectName} // Business Inquiry` : 'Business Inquiry';

                    // Domain guard
                    const emailDomain = lead.email?.split('@')[1]?.toLowerCase();
                    const siteDomain = lead.website ? new URL(lead.website.startsWith('http') ? lead.website : `https://${lead.website}`).hostname.replace('www.', '').toLowerCase() : '';
                    const emailRoot = emailDomain?.split('.')[0];
                    const siteRoot = siteDomain?.split('.')[0];
                    const isMatch = emailRoot && siteRoot && (emailRoot.includes(siteRoot) || siteRoot.includes(emailRoot));

                    if (process.env.STRICT_DOMAIN_MATCH !== 'false' && emailDomain && siteDomain && !isMatch) {
                        logToDashboard(`⚠️ Domain Guard: ${lead.email} does not match site (${siteDomain}) – skipping.`, "warning");
                        db.run("UPDATE leads SET status = 'invalid_email' WHERE id = ?", [lead.id]);
                        continue;
                    }
                    if (sentThisRun.has(lead.email)) {
                        logToDashboard(`🔁 Duplicate‑Run Guard: ${lead.email} already sent this run – skipping.`, "warning");
                        continue;
                    }
                    sentThisRun.add(lead.email);

                    // Email sanitization gate
                    let cleanEmail = lead.email.trim();
                    try { cleanEmail = decodeURIComponent(cleanEmail); } catch {}
                    cleanEmail = cleanEmail.replace(/\s+/g, '').toLowerCase();
                    if (!cleanEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || cleanEmail.includes('%') || cleanEmail.includes(' ')) {
                        logToDashboard(`🛡️ Email Sanitizer: Rejected malformed email "${lead.email}" — skipping.`, "warning");
                        db.run("UPDATE leads SET status = 'invalid_email' WHERE id = ?", [lead.id]);
                        continue;
                    }

                    // ─── VERIFICATION LOGGING ───
                    console.log(`\n📧 ─── OUTREACH ATTEMPT ───`);
                    console.log(`   Active SMTP User: ${config.email}`);
                    console.log(`   Target Brand Name: ${displayBrand}`);
                    console.log(`   Mistral Prompt Triggered: true`);
                    console.log(`   Recipient: ${cleanEmail}`);

                    // v3.0: sendEmail now fetches its own creds from DB — no more passing options
                    const result = await sendEmail(cleanEmail, subjectLine, pitch, { name: config.rep_name || config.company_name });
                    if (result.success) {
                        db.run("UPDATE leads SET status = 'sent', pitch = ?, last_contacted = CURRENT_TIMESTAMP, sent_count = 1 WHERE id = ?", [pitch, lead.id]);
                        logToDashboard(`✅ OUTREACH SUCCESS: Sent to ${displayBrand} (${cleanEmail})`, "success");
                        recordOutreach(lead.email, displayBrand);
                    } else {
                        db.run("UPDATE leads SET status = 'failed' WHERE id = ?", [lead.id]);
                        throw new Error(result.error || "Unknown SMTP Error");
                    }
                } catch (e: any) {
                    logToDashboard(`❌ OUTREACH FAILED: ${lead.company_name} -> ${e.message}`, "error");
                }
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
                    const analysis = await analyzeLeadRelevance(lead.company_name, enrichment.scrapedText || '', "Deep-scan enrichment check");
                    const isRelevant = analysis.isRelevant ? 1 : 0;
                    
                    // v3.0: LLM Brand Identity Override
                    let finalName = lead.company_name;
                    if (analysis.brandName && analysis.brandName.length > 2) {
                        const brandCandidate = analysis.brandName.trim();
                        const { cleanName } = await import('./personalizer');
                        finalName = cleanName(brandCandidate) || brandCandidate;
                        console.log(`🛡️ Identity Guard: [${lead.company_name}] -> [${finalName}]`);
                    }

                    db.run(`UPDATE leads SET company_name = ?, email = ?, status = ?, mobile_number = ?, contact_name = ?, linkedin_url = ?, is_relevant = ?, analysis_notes = ?, target_services = ?, about_summary = ? WHERE id = ?`, 
                        [finalName, enrichment.email, isRelevant ? 'ready' : 'irrelevant', enrichment.mobile_number, enrichment.contact_name, enrichment.linkedin_url, isRelevant, analysis.reason, analysis.targetProject, (enrichment.scrapedText || '').slice(0, 5000), lead.id]);
                } else {
                    db.run("UPDATE leads SET status = 'abandoned' WHERE id = ?", [lead.id]);
                }
            } catch (e) {
                console.error(`[WORKER] Enrichment failed for ${lead.company_name}:`, e);
            }
            await delay(5000);
        }

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
        // v22.1: Elite Resale Force Ignition — Wipe stale sessions immediately on manual start
        const fifteenSecondsAgo = new Date(Date.now() - 15000).toISOString();
        db.get(
            `SELECT worker_id, last_active FROM heartbeat WHERE last_active > ? AND worker_id != ? LIMIT 1`,
            [fifteenSecondsAgo, WORKER_ID],
            (err, row: any) => {
                if (row) {
                    console.warn(`⚠️ COLLISION DETECTED: Another worker was active ${Math.floor((Date.now() - new Date(row.last_active).getTime()) / 1000)}s ago.`);
                    console.log(`🚀 FORCE IGNITION: Overriding stale session...`);
                    db.run(`DELETE FROM heartbeat`, [], () => {
                        db.run(
                            `INSERT OR REPLACE INTO heartbeat (worker_id, last_active) VALUES (?, ?)`,
                            [WORKER_ID, new Date().toISOString()],
                            () => resolve(true)
                        );
                    });
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
