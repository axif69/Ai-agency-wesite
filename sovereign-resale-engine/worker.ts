import { db, initDB, recordOutreach } from './db.js';
import { scrapeAboutPage, findLeads } from './search_service.js';
import { personalizeOutreach, generateFollowUp } from './personalizer.js';
import { sendEmail } from './gmail_service.js';
import { logToDashboard, analyzeSentiment } from './shared_utils.js';
import { enrichCompanyData } from './email_discovery.js';
import { fileURLToPath } from 'url';
import path from 'path';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const decodeHtmlEntities = (str: string) => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)).replace(/&[a-z]+;/g, ' ');

// ─── MASSIVE B2B & PROFESSIONAL SERVICES TARGETING ───────────────────────────
// ─── MASSIVE B2B & PROFESSIONAL SERVICES TARGETING ───────────────────────────
const UAE_DISCOVERY_KEYWORDS = [
    // Tech & Digital (High Conversion)
    'software development agency dubai', 'cybersecurity companies uae', 'it managed services dubai',
    'mobile app developers dubai', 'cloud infrastructure uae', 'data analytics consultants dubai',
    'ai solutions provider uae', 'digital transformation agency dubai', 'erp software dubai',
    
    // Professional & Legal
    'corporate law firm dubai', 'legal consultants uae', 'trademark registration dubai',
    'accounting and auditing firms dubai', 'tax advisory uae', 'vat consultants dubai',
    'management consulting uae', 'human resources consultancy dubai', 'iso certification uae',
    
    // Medical & Healthcare (Premium LTV)
    'specialized medical center dubai', 'dental clinics uae', 'physiotherapy center dubai',
    'medical laboratory uae', 'pharmaceutical distribution dubai', 'healthcare technology uae',
    'diagnostic center dubai', 'aesthetic clinic uae',
    
    // Logistics & Industrial
    'logistics and supply chain dubai', 'freight forwarding uae', 'cold storage services dubai',
    'warehousing solutions uae', 'third party logistics dubai', 'packaging solutions dubai',
    'industrial equipment suppliers uae', 'material handling dubai',
    
    // Financial & Business Setup
    'business setup consultants dubai', 'pro services uae', 'offshore company formation dubai',
    'investment advisory uae', 'private equity firms dubai', 'insurance brokers uae',
    'commercial insurance dubai', 'wealth management uae',
    
    // Engineering & Construction
    'interior fit out companies dubai', 'mep contractors uae', 'structural engineering dubai',
    'civil engineering consultants uae', 'commercial landscaping dubai', 'facility management uae',
    'smart home automation dubai', 'renewable energy companies uae',
    
    // Marketing & Media
    'branding and design agency dubai', 'pr and communications uae', 'event management dubai',
    'video production house dubai', 'digital marketing agency uae', 'seo agency dubai',
    'content creation studio uae', 'advertising agency dubai'
];

let nicheIndex = 0; // Persistent index for Round-Robin selection

// ─── Database Helpers (Self-Contained) ──────────────────────────────────────
const getSettings = (): Promise<any> => new Promise((res) => {
    db.all("SELECT * FROM settings", (err, rows: any[]) => {
        const config = rows ? rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {}) : {};
        res(config);
    });
});

const getTodaySentCount = (): Promise<number> => new Promise((res) => {
    const today = new Date().toISOString().split('T')[0];
    db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row: any) => res(row?.emails_sent || 0));
});

const getReadyLeads = (): Promise<any[]> => new Promise((res) => {
    db.all("SELECT * FROM leads WHERE status IN ('ready', 'priority_ready') AND email IS NOT NULL LIMIT 50", (err, rows) => res(rows || []));
});

const getFollowUpLeads = (days: number): Promise<any[]> => new Promise((res) => {
    db.all("SELECT * FROM leads WHERE status = 'sent' AND sent_count = 1 AND last_contacted <= datetime('now', '-' || ? || ' days')", [days], (err, rows) => res(rows || []));
});

const isSafeLead = (lead: any): boolean => {
    if (!lead.email || !lead.email.includes('@')) return false;
    const emailLower = lead.email.toLowerCase();
    const nameLower = (lead.company_name || '').toLowerCase();

    // v26.1: GARBAGE-GUARD (Hard-Reject Placeholders)
    const forbiddenDomains = ['facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com', 'google.com', 'apple.com', 'microsoft.com', 'example.com', 'domain.com'];
    const forbiddenPrefixes = ['name@', 'test@', 'email@', 'user@', 'admin@', 'info@example', 'support@example'];
    
    const isEmailSafe = !forbiddenDomains.some(d => emailLower.includes(d)) && 
                        !forbiddenPrefixes.some(p => emailLower.startsWith(p));
    
    const isNameSafe = nameLower.length > 2 && 
                       nameLower !== 'n/a' && 
                       nameLower !== 'uae business entity' &&
                       // v26.3: Specialized B2B Filter — ALLOWS construction/MEP/contracting
                       !['retail', 'supermarket', 'grocery', 'clothing'].some(bad => nameLower.includes(bad));
    
    return isEmailSafe && isNameSafe;
};

const emitHeartbeat = async () => {
    try {
        await db.run("INSERT INTO metrics (key, value, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = value + 1, timestamp = CURRENT_TIMESTAMP", ["heartbeat", 1]);
    } catch (e) {}
};

let imapMonitorStarted = false;

// ─── Main Worker Loop ────────────────────────────────────────────────────────
async function runWorker() {
    console.log("🚀 Sovereign Resale Engine v5.1.2 [STABILIZED] — AI OUTREACH SALES MACHINE ONLINE...");
    await initDB();
    let lastDiscovery = 0; // Set to 0 to trigger immediate discovery on first run
    const DISCOVERY_INTERVAL = 120 * 1000;
    setInterval(async () => { await emitHeartbeat(); }, 15000);

    while (true) {
        const settings = await getSettings();
        const model = settings.ai_model || 'llama-3.3-70b-versatile';
        const tone = settings.ai_tone || 'Professional & Bold';
        const autoDiscover = settings.auto_discovery === 'true' || settings.auto_discovery === true;
        const followupDays = parseInt(settings.drip_followup_days || '4', 10);

        // 1. OUTREACH FIRST (PRIORITY)
        const sentTodayCount = await getTodaySentCount();
        console.log(`[WORKER] [${new Date().toLocaleTimeString()}] SENT TODAY: ${sentTodayCount}/250`);
        
        if (sentTodayCount < 250) {
            const allReady = await getReadyLeads();
            const readyLeads = allReady.filter(isSafeLead).slice(0, 10);
            
            if (readyLeads.length > 0) {
                console.log(`🎯 [OUTREACH] Found ${readyLeads.length} ready leads. Igniting engine...`);
                for (const lead of readyLeads) {
                    try {
                        const companyNameToUse = lead.company_name;
                        
                        // v26.1: DOUBLE-CHECK (No N/A ever reaches the draft phase)
                        if (!companyNameToUse || companyNameToUse.toLowerCase() === 'n/a' || lead.email.startsWith('name@')) {
                            console.log(`   ⚠️ Skipping Garbage Lead: ${companyNameToUse} | ${lead.email}`);
                            db.run("UPDATE leads SET status = 'rejected' WHERE id = ?", [lead.id]);
                            continue;
                        }

                        console.log(`📧 [OUTREACH] Drafting for ${companyNameToUse}...`);
                        const aboutText = await scrapeAboutPage(lead.website);
                        const personalization = await personalizeOutreach(companyNameToUse, aboutText, lead.website, tone, model);
                        
                        console.log(`📤 [OUTREACH] Sending to ${lead.email}...`);
                        const result = await sendEmail(lead.email, `Autonomous AI Agent for ${companyNameToUse} Sales Outreach`, personalization.body);
                        
                        if (result.success) {
                            recordOutreach(lead.email, lead.company_name);
                            await new Promise<void>((resolve) => {
                                db.run("UPDATE leads SET status = 'sent', last_contacted = CURRENT_TIMESTAMP, sent_count = 1 WHERE id = ?", [lead.id], resolve);
                            });
                            console.log(`✅ [OUTREACH] SENT SUCCESS: ${personalization.brandName}`);
                        }
                    } catch (err: any) {
                        const errMsg = err.message || '';
                        console.error(`❌ [OUTREACH] ERROR: ${errMsg}`);
                        
                        if (errMsg.includes('550 5.4.5') || errMsg.includes('sending limit exceeded')) {
                            console.error("🛑 [CRITICAL] GMAIL SENDING LIMIT REACHED. SHUTTING DOWN WORKER.");
                            process.exit(1);
                        }
                    }
                    
                    const cooldown = Math.floor(Math.random() * (120000 - 60000 + 1) + 60000);
                    console.log(`⏳ [COOLDOWN] Waiting ${Math.round(cooldown/1000)}s before next outreach to maintain human cadence...`);
                    await delay(cooldown);
                }
            }
        }

        // 2. Discovery Phase [IMMEDIATE CHECK]
        if (autoDiscover && (lastDiscovery === 0 || Date.now() - lastDiscovery > DISCOVERY_INTERVAL)) {
            console.log("🚀 [DISCOVERY] Launching New Niche Burst...");
            logToDashboard("🚀 Launching Incremental Discovery Burst...", "info");
            
            // v25.3: Round-Robin Niche Selection (ensures diversity)
            const burstNiches = [];
            for (let i = 0; i < 3; i++) {
                burstNiches.push(UAE_DISCOVERY_KEYWORDS[nicheIndex % UAE_DISCOVERY_KEYWORDS.length]);
                nicheIndex++;
            }
            for (const query of burstNiches) {
                console.log(`🔍 [DISCOVERY] Searching: "${query}"`);
                const { leads } = await findLeads(query);
                
                if (leads && leads.length > 0) {
                    let newCount = 0;
                    for (const lead of leads) {
                        try {
                            const url = lead.website;
                            const domain = new URL(url).hostname.replace('www.', '').toLowerCase();
                            const exists = await new Promise((res) => db.get("SELECT id FROM leads WHERE website LIKE ? OR website LIKE ?", [`%${domain}%`, `%${url}%`], (err, row) => res(!!row)));
                            
                            if (!exists) {
                                // If email was already found during discovery, set to ready immediately
                                const initialStatus = lead.email ? 'ready' : 'new';
                                await new Promise<void>((res) => db.run(
                                    "INSERT INTO leads (company_name, website, email, status, category) VALUES (?, ?, ?, ?, ?)", 
                                    [lead.company_name, url, lead.email || null, initialStatus, query], 
                                    () => res()
                                ));
                                newCount++;
                                console.log(`   ✅ STAGING (${initialStatus.toUpperCase()}): ${url}`);
                            } else {
                                // Don't log SKIPPED to keep console clean, only log STAGING
                            }
                        } catch (e) {
                            console.error(`   ⚠️ Discovery Insert Error: ${lead.website} - ${e instanceof Error ? e.message : String(e)}`);
                        }
                    }
                    console.log(`✨ [DISCOVERY] Found ${newCount} new prospects for "${query}"`);
                }
            }
            lastDiscovery = Date.now();
        }

        // 3. Lead Enrichment
        const newLeads: any[] = await new Promise((res) => db.all("SELECT * FROM leads WHERE status = 'new' LIMIT 5", (err, rows) => res(rows || [])));
        if (newLeads.length > 0) {
            console.log(`🧪 [ENRICHMENT] Processing batch of ${newLeads.length}...`);
            for (const lead of newLeads) {
                const website = lead.website;
                if (website && website !== 'N/A') {
                    console.log(`🔎 [ENRICHMENT] Analyzing: ${lead.company_name} (${website})`);
                    const enrichment = await enrichCompanyData(lead.company_name, website);
                    if (enrichment.email) {
                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET email = ?, status = 'ready', phone = ?, company_name = ? WHERE id = ?", 
                                [enrichment.email, enrichment.mobile_number, enrichment.companyName || lead.company_name, lead.id], 
                                resolve
                            );
                        });
                        console.log(`🎯 [ENRICHMENT] UNLOCKED: ${enrichment.companyName || lead.company_name}`);
                    } else {
                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET status = 'no_email' WHERE id = ?", [lead.id], resolve);
                        });
                    }
                }
            }
        }

        if (!imapMonitorStarted) {
            imapMonitorStarted = true;
            try { const { monitorReplies } = await import('./monitor_service.js'); void monitorReplies(); } catch { imapMonitorStarted = false; }
        }
        
        console.log(`😴 [LOOP] Phase complete. Resting for 15s...`);
        await delay(15000);
    }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    runWorker().catch(err => console.error("Worker failed:", err));
}
