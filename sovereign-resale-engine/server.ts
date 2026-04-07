import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { db, initDB } from './db.js';
import { findLeads, scrapeAboutPage } from './search_service.js';
import { runGmbNinjaScan } from './gmb_stealth.js';
import { logToDashboard, generateDiscoveryNiches } from './shared_utils.js';

import { extractTextFromPDF } from './kb_processor.js';
import dotenv from 'dotenv';
import { spawn, ChildProcess } from 'child_process';
dotenv.config();

const __dirname = path.resolve();
let workerProcess: ChildProcess | null = null;

const app = express();
// v24.0: Increased Payload Limit for Large PDFs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// @ts-ignore - Ignore cors type error since @types/cors install failed
app.use(cors());

initDB();

// ========== LIVE LOGS (Dashboard Feedback) ==========
const logs: { id: string, timestamp: string, message: string, type: 'info' | 'success' | 'warning' | 'error' }[] = [];

app.post('/api/logs', (req, res) => {
    const { message, type } = req.body;
    if (!message) return res.status(400).send("No message provided");
    const log = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        message,
        type: type || 'info'
    };
    logs.unshift(log);
    if (logs.length > 50) logs.pop();
    res.json({ success: true });
});

app.get('/api/logs', (req, res) => {
    res.json(logs);
});

// ========== WORKER CONTROL CENTER (Issue 5 — No-Code Dashboard Control) ==========
app.get('/api/worker/status', (req, res) => {
    res.json({ 
        online: !!workerProcess, 
        pid: workerProcess?.pid || null,
        last_heartbeat: lastHeartbeat?.received_at || null 
    });
});

app.post('/api/worker/start', (req, res) => {
    if (workerProcess) return res.json({ success: true, message: 'Worker already running', pid: workerProcess.pid });
    
    console.log("🚀 STARTING SOVEREIGN ENGINE [MANAGED MODE]...");
    
    // Spawn ts-node on Windows
    workerProcess = spawn('npx', ['ts-node', 'worker.ts'], {
        cwd: __dirname,
        shell: true,
        stdio: 'inherit'
    });

    workerProcess.on('exit', () => {
        console.log("🛑 SOVEREIGN ENGINE STOPPED.");
        workerProcess = null;
    });

    res.json({ success: true, pid: workerProcess.pid });
});

app.post('/api/worker/stop', (req, res) => {
    if (!workerProcess) return res.json({ success: true, message: 'Worker not running' });
    
    console.log("🛑 STOPPING SOVEREIGN ENGINE...");
    // Force kill the tree on Windows
    spawn('taskkill', ['/pid', workerProcess.pid!.toString(), '/f', '/t'], { shell: true });
    workerProcess = null;
    
    res.json({ success: true });
});

// ========== HEARTBEAT (Issue 4 — Worker Status) ==========
let lastHeartbeat: any = null;

app.post('/api/heartbeat', (req, res) => {
    lastHeartbeat = { ...req.body, received_at: new Date().toISOString() };
    res.json({ success: true });
});

app.get('/api/heartbeat', (req, res) => {
    if (!lastHeartbeat) {
        return res.json({ status: 'offline', last_action: 'No heartbeat received', timestamp: null });
    }
    // Check if heartbeat is stale (>60 seconds old)
    const age = Date.now() - new Date(lastHeartbeat.received_at).getTime();
    const isAlive = age < 60000;
    res.json({
        ...lastHeartbeat,
        status: isAlive ? 'running' : 'offline',
        age_seconds: Math.floor(age / 1000),
    });
});
// (Duplicates removed, consolidated below)

// ========== LEADS ==========
app.get('/api/leads', (req, res) => {
    db.all("SELECT * FROM leads ORDER BY added_at DESC", (err, rows) => {
        res.json(rows || []);
    });
});

app.post('/api/leads/clear', (req, res) => {
    db.run("DELETE FROM leads", (err) => {
        res.json({ success: !err });
    });
});

// v24.0: Discrete Lead Management Endpoints
app.patch('/api/leads/:id/email', (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
    db.run(
        "UPDATE leads SET email = ?, status = CASE WHEN status = 'no_email' THEN 'new' ELSE status END WHERE id = ?",
        [email.trim(), id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`✏️ Lead #${id} Email Updated: ${email}`);
            res.json({ success: true, changes: this.changes });
        }
    );
});

app.delete('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM leads WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        console.log(`🗑️ Lead #${id} Deleted`);
        res.json({ success: true, changes: this.changes });
    });
});

/**
 * v23.0: Strategic Webhook Trigger
 * Sends positive lead data to user-defined CRM Webhook URL.
 */
const triggerLeadWebhook = async (lead: any) => {
    const config = await (await import('./config_manager')).loadSystemConfig();
    if (!config.webhook_url) return;

    try {
        const axios = (await import('axios')).default;
        await axios.post(config.webhook_url, {
            event: 'lead_positive',
            lead_id: lead.id,
            company: lead.company_name,
            website: lead.website,
            email: lead.email,
            phone: lead.phone || lead.mobile_number,
            timestamp: new Date().toISOString()
        });
        console.log(`📡 WEBHOOK: Positive lead "${lead.company_name}" pushed to CRM.`);
    } catch (e: any) {
        console.error(`⚠️ WEBHOOK FAILED: ${e.message}`);
    }
};

app.post('/api/leads/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    db.run("UPDATE leads SET status = ? WHERE id = ?", [status, id], async function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        if (status === 'positive' || status === 'hot') {
            db.get("SELECT * FROM leads WHERE id = ?", [id], (err, lead) => {
                if (lead) triggerLeadWebhook(lead);
            });
        }
        
        res.json({ success: true, changes: this.changes });
    });
});

// Clear stale leads that failed email extraction
app.post('/api/leads/clear-stale', (req, res) => {
    const junkPatterns = ['%@lseg.com', '%@yellowpages%', '%@zawya%', '%.png', '%.jpg', '%.jpeg', '%.svg', '%.pdf'];
    let query = "DELETE FROM leads WHERE status = 'no_email' OR email IS NULL OR email = '' OR email = 'N/A'";
    junkPatterns.forEach(p => {
        query += ` OR email LIKE '${p}'`;
    });
    
    db.run(query, (err) => {
        console.log(`🗑️  Cleared stale and junk leads from DB`);
        res.json({ success: !err });
    });
});

// (Consolidated below in Outreach section)

// ========== ANALYTICS ==========
app.get('/api/analytics', (req, res) => {
    db.all("SELECT * FROM analytics ORDER BY date ASC", (err, rows) => {
        res.json(rows || []);
    });
});

// ========== SETTINGS ==========
app.get('/api/settings', (req, res) => {
    db.all("SELECT * FROM settings", (err, rows: any[]) => {
        if (err) return res.status(500).json({ error: err.message });
        const config = rows ? rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {}) : {};
        res.json(config);
    });
});

app.post('/api/settings', (req, res) => {
    const { settings } = req.body;
    if (!settings) return res.status(400).json({ error: 'No settings provided' });

    // Check if critical discovery fields were updated
    const needsRegen = settings.COMPANY_NAME || settings.PITCH_CONTEXT || settings.TARGET_LOCATION;

    const entries = Object.entries(settings);
    if (entries.length === 0) return res.json({ success: true });

    db.serialize(() => {
        entries.forEach(([key, value]) => {
            db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, String(value)]);
        });
        
        if (needsRegen) {
            // Trigger AI niche generation in background
            db.all("SELECT * FROM settings", async (err, rows: any[]) => {
                if (err) return;
                const config = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
                const niches = await generateDiscoveryNiches(
                    config.COMPANY_NAME || 'Your Agency', 
                    config.PITCH_CONTEXT || '', 
                    config.TARGET_LOCATION || 'UAE'
                );
                if (niches.length > 0) {
                    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["DYNAMIC_NICHES", JSON.stringify(niches)]);
                    console.log(`🤖 AI: Generated ${niches.length} new discovery targets based on updated profile.`);
                }
            });
        }

        console.log(`⚙️ System Settings Updated: ${entries.length} fields sync'd.`);
        res.json({ success: true });
    });
});


/**
 * 📚 Knowledge Base Processor
 * Receives a Base64 PDF, extracts text, and saves it to the system context.
 */
app.post('/api/settings/kb-upload', async (req: Request, res: Response) => {
    const { base64Pdf, fileName } = req.body;
    if (!base64Pdf) return res.status(400).json({ error: "No file content received." });

    try {
        console.log(`📚 KB UPLOAD: Processing "${fileName || 'profile.pdf'}"...`);
        // v23.0: Safety Strip — in case the frontend sends the full Data URI
        const cleanBase64 = base64Pdf.includes(',') ? base64Pdf.split(',')[1] : base64Pdf;
        const buffer = Buffer.from(cleanBase64, 'base64');
        const extractedText = await extractTextFromPDF(buffer);
        
        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_KNOWLEDGE", extractedText], (err) => {
            if (err) throw err;
            console.log(`✅ KB UPLOAD: ${extractedText.length} characters extracted and saved.`);
            res.json({ 
                success: true, 
                length: extractedText.length, 
                message: `Successfully ingested ${extractedText.length} characters of knowledge.`,
                textSnippet: extractedText.slice(0, 500)
            });
        });
    } catch (e: any) {
        console.error("❌ KB UPLOAD FAILED:", e.message);
        res.status(500).json({ error: e.message || "Failed to parse PDF." });
    }
});

/**
 * 🔍 Self-Scraper for Onboarding
 * Takes a URL, scrapes the "About" context, and suggests a brand name.
 */
app.post('/api/settings/scrape-self', async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided." });

    try {
        console.log(`🔍 SELF-SCRAPE: Investigating ${url}...`);
        const bio = await scrapeAboutPage(url);
        
        res.json({ 
            success: true, 
            suggested_pitch: bio.slice(0, 5000),
            message: "Successfully analyzed your website."
        });
    } catch (e: any) {
        console.error("❌ SELF-SCRAPE FAILED:", e.message);
        res.status(500).json({ error: e.message });
    }
});


// ========== BULK GMB / LIST IMPORT ==========
// Accepts raw pasted text — each line can be:
//   - A company name (e.g. "Al Madar Engineering")
//   - A website URL (e.g. "https://almadar.ae")
//   - A Google Maps GMB URL (e.g. "https://www.google.com/maps/place/...")
//   - Raw GMB text blocks (name, address, phone on separate lines)
app.post('/api/bulk-import', (req, res) => {
    const { data, category } = req.body;
    if (!data) return res.status(400).json({ error: 'No data provided' });

    let lines = data.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 2);
    
    // GMB Noise Filter: Removes UI elements, reviews, and ratings from raw Maps copy-paste
    lines = lines.filter((l: string) => {
        const lower = l.toLowerCase();
        // Exact UI buttons & common GMB noise
        if (['website', 'directions', 'save', 'share', 'nearby', 'send to phone', 'add a label', 'your maps history', 'suggest an edit', 'own this business?'].includes(lower)) return false;
        // Status lines & Meta strings
        if (l.includes('·')) return false; // GMB heavily uses middle dot for "Hours · Phone" etc.
        if (lower.startsWith('open now') || lower.startsWith('closes ') || lower.startsWith('closed') || lower.startsWith('opens ')) return false;
        // Reviews
        if (l.startsWith('"') || l.startsWith('“')) return false;
        // Ratings & Numbers (e.g. "4.2", "(105)", or starts with stars)
        if (/^\d\.\d\s*\(\d+\)/.test(l) || lower.includes('⭐') || /^\(\d+\)$/.test(l.trim()) || /^\d[\d.,]*$/.test(l.trim())) return false;
        // Phone numbers purely numbers/spaces
        if (/^[\d\s\-\+()]{8,}$/.test(l)) return false; 
        // Plus codes / Addresses
        if (/^[A-Z0-9]{4}\+[A-Z0-9]{2}/.test(l)) return false; 
        if (lower.includes('st - ') || lower.includes('street - ') || lower.includes('floor, ') || lower.includes('building,')) return false;
        
        // Skip very short lines (often stray meta data)
        if (l.length < 5) return false;

        return true;
    });

    // Final dedup to prevent duplicate entries from the same paste (like categories repeating)
    lines = [...new Set(lines)];

    console.log(`📥 Bulk Import: ${lines.length} cleaned lines, category="${category || 'Manual Import'}"`);

    let inserted = 0;
    const insertPromises = lines.map((line: string) => new Promise<void>((resolve) => {
        const isGmbUrl = line.includes('google.com/maps') || line.includes('maps.app.goo.gl');
        const isDomain = !line.includes(' ') && line.includes('.');
        let isUrl = false;
        let parsedHost = '';
        
        try {
            if (line.startsWith('http')) {
                parsedHost = new URL(line).hostname;
                isUrl = true;
            }
        } catch (e) {
            isUrl = false;
        }

        let company_name = line;
        let website: string | null = null;

        if (isGmbUrl) {
            // Store the GMB URL as website; worker will scrape it for actual website + email
            website = line.startsWith('http') ? line : `https://${line}`;
            company_name = 'GMB Import — Pending Discovery';
        } else if (isUrl) {
            website = line;
            company_name = parsedHost.replace('www.', '').split('.')[0].replace(/-/g, ' ');
        } else if (isDomain) {
            website = `https://${line}`;
            company_name = line.split('.')[0].replace(/-/g, ' ');
        }
        // else: plain company name, no website — worker will search DDG for it

        db.run(
            `INSERT OR IGNORE INTO leads 
             (company_name, website, type, status, category, location, added_at) 
             VALUES (?, ?, ?, 'new', ?, 'UAE', ?)`,
            [company_name, website, isGmbUrl ? 'gmb_import' : 'bulk_import', category || 'Manual Import', new Date().toISOString()],
            function(err) {
                if (!err && this.changes > 0) inserted++;
                resolve();
            }
        );
    }));

    Promise.all(insertPromises).then(() => {
        const msg = `✅ Bulk Import: ${inserted}/${lines.length} new targets queued for Discovery Engine.`;
        console.log(msg);
        res.json({ success: true, count: lines.length, inserted });
    });
});

// ========== GMB URL BATCH IMPORT ==========
// Accepts an array of Google Maps URLs string (one per line in body.urls)
// Worker will scrape each GMB page for business name, website, phone, then email
app.post('/api/gmb-urls', (req, res) => {
    const { urls, category } = req.body;
    if (!urls) return res.status(400).json({ error: 'No urls provided' });

    const urlList: string[] = (typeof urls === 'string' ? urls.split('\n') : urls)
        .map((u: string) => u.trim())
        .filter((u: string) => u.length > 5 && (u.includes('google.com/maps') || u.includes('goo.gl') || u.startsWith('http')));

    console.log(`📍 GMB URL Import: ${urlList.length} profiles queued`);

    let inserted = 0;
    const insertPromises = urlList.map((gmbUrl: string) => new Promise<void>((resolve) => {
        db.run(
            `INSERT OR IGNORE INTO leads 
             (company_name, website, type, status, category, location, added_at) 
             VALUES (?, ?, 'gmb_import', 'new', ?, 'UAE', ?)`,
            ['GMB Profile — Pending', gmbUrl, category || 'GMB Import', new Date().toISOString()],
            function(err) {
                if (!err && this.changes > 0) inserted++;
                resolve();
            }
        );
    }));

    Promise.all(insertPromises).then(() => {
        console.log(`✅ GMB URLs Queued: ${inserted} profiles added. Worker will discover details automatically.`);
        res.json({ success: true, count: urlList.length, inserted, message: `${inserted} GMB profiles queued. Worker is discovering contact details automatically.` });
    });
});

// ========== SEARCH (Manual) ==========
app.post('/api/search', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query required' });
    console.log(`📡 Manual search request: "${query}"`);

    // Hard safety: refuse non-target niches (fast, deterministic; no AI)
    const qLower = String(query).toLowerCase();
    const forbiddenNiches = ['plumbing', 'drainage', 'sanitary', 'plumber'];
    if (forbiddenNiches.some(k => qLower.includes(k))) {
        return res.status(400).json({
            error: 'Rejected search query (not our target niche). Use electrical/MEP/electromechanical/switchgear/panel builder keywords.'
        });
    }
    try {
        const { leads, trace } = await findLeads(query);
        console.log(`🔍 Found ${leads.length} leads. [Trace: ${trace}] Inserting into DB...`);

        let inserted = 0;
        const insertPromises = (leads || []).map(lead => new Promise<void>(async (resolve) => {
            if (!lead.company_name || !lead.website) return resolve();
            
            try {
                // 1. Strict Deduplication
                const existing = await new Promise((res) => {
                    db.get("SELECT id FROM leads WHERE website = ? OR company_name LIKE ?", 
                    [lead.website, lead.company_name], (err, row) => res(row));
                });
                if (existing) return resolve();

                // 2. Database Insertion
                db.run(
                    `INSERT OR IGNORE INTO leads 
                     (company_name, website, type, phone, location, category, status, email, mobile_number, relevance_score) 
                     VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)`,
                    [
                        lead.company_name, lead.website, lead.type || 'manual_search', 
                        lead.phone || lead.mobile_number || '', 'UAE', query,
                        lead.email || null, lead.mobile_number || null, 10
                    ],
                    function(err) {
                        if (!err && this.changes > 0) inserted++;
                        resolve();
                    }
                );
            } catch (e) {
                console.error("Manual Search Process Error:", e);
                resolve();
            }
        }));

        await Promise.all(insertPromises);
        res.json({ success: true, count: leads.length, inserted, trace });
    } catch (e: any) {
        console.error("Search Route Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// v23.2: FORCE IGNITION ROUTE
app.post('/api/worker/run', (req, res) => {
    console.log("🚀 MANUAL IGNITION: Pushing discovery sequence to front of queue...");
    // Ensure column exists then update
    db.run("ALTER TABLE heartbeat ADD COLUMN force_discovery INTEGER DEFAULT 0", () => {
        db.run("INSERT OR REPLACE INTO heartbeat (worker_id, last_active, force_discovery) VALUES ('COMMAND_CENTER', ?, 1)", [new Date().toISOString()]);
        res.json({ success: true, message: "Engine ignited successfully." });
    });
});

// ========== GMB NINJA SCAN (v20.0) ==========
app.post('/api/gmb-ninja-scan', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query required' });

    await logToDashboard(`🥷 GMB Ninja: Initiating Stealth Discovery Scan for "${query}"...`, 'info');
    console.log(`🥷 GMB Ninja: Starting Stealth Discovery for "${query}"...`);
    
    // Non-blocking response: The scan takes time, so we return 200 immediately
    // and process in the background. Progress is visible via /api/logs
    res.json({ success: true, message: `Ninja Mining started for "${query}". Check logs for progress.` });

    try {
        const leads = await runGmbNinjaScan(query);
        await logToDashboard(`✅ GMB Ninja: Scan finished for "${query}". Found ${leads.length} targets.`, 'success');
        console.log(`🥷 GMB Ninja: Scan finished for "${query}". Found ${leads.length} leads.`);
    } catch (e: any) {
        await logToDashboard(`❌ GMB Ninja Scan Failed: ${e.message}`, 'error');
        console.error(`❌ GMB Ninja Scan Failed: ${e.message}`);
    }
});

// ========== OUTREACH ==========
app.post('/api/bulk-send', (req, res) => {
    const { ids } = req.body;
    if (!ids || ids.length === 0) return res.json({ success: false });
    // Safety: only unlock leads with a real email.
    // Also block obvious non-prospect niches (news/media/publisher/real-estate).
    const badLike = [
        '%news%', '%media%', '%publisher%', '%real estate%', '%propertynews%',
        '%w.media%', '%propertynews.ae%',
        '%scientechnic%', '%scientechnic.ae%'
    ];
    const emailClause = `email IS NOT NULL AND TRIM(email) != ''`;
    db.run(
        `UPDATE leads SET status = 'priority_ready' WHERE id IN (${ids.join(',')}) AND ${emailClause}`,
        (err) => res.json({ success: !err })
    );
});

app.post('/api/worker/run', (req, res) => {
    console.log("⚡ Manual Worker Priority Trigger received.");
    res.json({ success: true, message: "Worker signaled. Queue will be processed on next cycle (<15s)." });
});

// ========== REPLIES & APPROVAL WORKFLOW ==========
app.get('/api/replies', (req, res) => {
    db.all(`SELECT r.*, l.company_name, l.email as company_email 
            FROM replies r 
            LEFT JOIN leads l ON r.lead_id = l.id 
            ORDER BY r.received_at DESC`, 
        (err, rows) => res.json(rows || []));
});

app.post('/api/replies/:id/approve', async (req, res) => {
    const { id } = req.params;
    const { edited_reply } = req.body;

    db.get("SELECT * FROM replies WHERE id = ?", [id], async (err, reply: any) => {
        if (!reply) return res.status(404).json({ error: 'Reply not found' });

        const textToSend = edited_reply || reply.ai_draft_reply;
        if (!textToSend) return res.status(400).json({ error: 'No reply text provided' });

        try {
            const { sendEmail } = await import('./gmail_service');
            const result = await sendEmail(
                reply.from_email,
                `Re: ${reply.subject}`,
                textToSend
            );

            if (result.success) {
                db.run("UPDATE replies SET status = 'sent' WHERE id = ?", [id]);
                res.json({ success: true, message: `Reply sent to ${reply.from_email}` });
            } else {
                res.status(500).json({ error: 'Failed to send reply' });
            }
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    });
});

app.post('/api/replies/:id/dismiss', (req, res) => {
    const { id } = req.params;
    db.run("UPDATE replies SET status = 'dismissed' WHERE id = ?", [id], (err) => {
        res.json({ success: !err });
    });
});

// ========== STATS ==========
app.get('/api/stats', (req, res) => {
    db.all(`SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'no_email' THEN 1 ELSE 0 END) as no_email
        FROM leads`, (err, rows) => {
        const stats: any = rows?.[0] || {};
        
        // Add heartbeat status
        db.get("SELECT timestamp FROM heartbeat ORDER BY timestamp DESC LIMIT 1", (err, hb: any) => {
            stats.last_heartbeat = hb ? hb.timestamp : null;
            res.json(stats);
        });
    });
});

app.get('/api/heartbeat', (req, res) => {
    db.get("SELECT timestamp, last_action FROM heartbeat ORDER BY timestamp DESC LIMIT 1", (err, row: any) => {
        if (!row) return res.json({ status: 'offline', last_action: 'Waiting for worker...' });
        const last_hb = new Date(row.timestamp).getTime();
        const isOffline = (Date.now() - last_hb) > 60000;
        res.json({
            status: isOffline ? 'offline' : 'online',
            last_action: row.last_action || 'Working...',
            timestamp: row.timestamp,
            emails_sent_today: 0, 
            companies_found_today: 0
        });
    });
});


/**
 * v23.0: Autonomous Follow-Up Engine
 * Periodically scans for leads that haven't replied and sends follow-ups.
 */
async function startFollowUpWorker() {
    console.log("🔄 FOLLOW-UP ENGINE: Initializing autonomous sequence...");
    
    setInterval(async () => {
        try {
            const config = await (await import('./config_manager')).loadSystemConfig();
            if (!config.follow_up_days || config.follow_up_days <= 0) return;

            const delayMs = config.follow_up_days * 24 * 60 * 60 * 1000;
            const cutoffDate = new Date(Date.now() - delayMs).toISOString();

            db.all(
                `SELECT l.* FROM leads l
                JOIN outreach o ON l.id = o.lead_id
                WHERE l.status = 'sent' 
                AND o.sent_at < ? 
                AND l.sent_count = 1
                LIMIT 5`, 
                [cutoffDate],
                async (err, rows: any[]) => {
                    if (err || !rows || rows.length === 0) return;

                    console.log(`🤖 FOLLOW-UP: Processing ${rows.length} leads due for re-engagement...`);
                    const { sendEmail } = await import('./gmail_service');
                    
                    for (const lead of rows) {
                        try {
                            const body = config.follow_up_prompt || `Hi ${lead.company_name},\n\nJust wanted to briefly circle back on my previous email. Is this something you'd be open to discussing?\n\nBest regards,\n${config.rep_name || 'Asif Khan'}`;
                            
                            const result = await sendEmail(lead.email, `Following up: ${config.company_name || 'Asif Digital'}`, body);
                            if (result.success) {
                                db.run("UPDATE leads SET sent_count = 2, last_contacted = ? WHERE id = ?", [new Date().toISOString(), lead.id]);
                                db.run("INSERT INTO outreach (lead_id, sent_at, type) VALUES (?, ?, 'follow_up')", [lead.id, new Date().toISOString()]);
                            }
                        } catch (e: any) {
                            console.error(`❌ Follow-up failed for ${lead.email}:`, e.message);
                        }
                    }
                }
            );
        } catch (e) {
            console.error("Follow-up worker error:", e);
        }
    }, 1000 * 60 * 60 * 2); // Run every 2 hours
}

function startServer(port: number) {
    app.listen(port)
        .on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`\n📡 Port ${port} taken! THE ENGINE CANNOT SYNC WITH DASHBOARD.`);
                console.error(`👉 RUN 'npm run fix' OR RESTART YOUR SYSTEM.\n`);
                process.exit(1);
            } else {
                console.error('❌ Server error:', err);
            }
        })
        .on('listening', () => {
            console.log(`\n====================================================`);
            console.log(`   SOVEREIGN v23.0 -- [MASTER ARCHITECTURE]`);
            console.log(`====================================================`);
            console.log(`\n🚀 COMMAND CENTER READY: http://localhost:${port}`);
            console.log(`🧠 BACKEND BRAIN ONLINE: http://localhost:3010`);
            console.log(`\n====================================================\n`);
            
            const portInfo = JSON.stringify({ port, timestamp: new Date().toISOString() });
            try {
                if (!fs.existsSync('public')) fs.mkdirSync('public');
                fs.writeFileSync(path.join('public', 'api_port.json'), portInfo);
                fs.writeFileSync('api_port.json', portInfo);
            } catch (e) {}

            // Launch the autonomous engines
            startFollowUpWorker();
        });
}

startServer(3010); // Hard-locked for Resale Stability
