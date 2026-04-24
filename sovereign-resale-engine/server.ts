import express from 'express';
import cors from 'cors';
import { db, initDB } from './db';
import { findLeads } from './search_service';
import { runGmbNinjaScan } from './gmb_stealth';
import { logToDashboard } from './shared_utils.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// @ts-ignore - Ignore cors type error since @types/cors install failed
app.use(cors());
app.use(express.json());

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
app.get('/api/settings', (req, res) => {
    db.all('SELECT * FROM settings', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const settings = (rows || []).reduce((acc: any, row: any) => ({ ...acc, [row.key]: row.value }), {});
        res.json(settings);
    });
});

app.post('/api/settings', (req, res) => {
    const { settings } = req.body;
    if (!settings) return res.status(400).send("No settings provided.");
    db.serialize(() => {
        Object.entries(settings).forEach(([key, value]) => {
            db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
        });
        res.json({ success: true });
    });
});

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

// Manually update email for a single lead (for bot-blocked sites)
app.patch('/api/leads/:id/email', (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
    db.run(
        "UPDATE leads SET email = ?, status = CASE WHEN status = 'no_email' THEN 'new' ELSE status END WHERE id = ?",
        [email.trim(), id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`✏️  Email manually updated for lead #${id}: ${email}`);
            res.json({ success: true, changes: this.changes });
        }
    );
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

// Launch manual AI outreach for selected leads
app.post('/api/bulk-send', (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'No IDs provided' });
    
    const placeholders = ids.map(() => '?').join(',');
    db.run(`UPDATE leads SET status = 'ready' WHERE id IN (${placeholders}) AND email IS NOT NULL AND email != ''`, ids, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        console.log(`🚀 Queued ${this.changes} manually selected leads for AI Outreach!`);
        res.json({ success: true, updated: this.changes });
    });
});

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

    const entries = Object.entries(settings);
    if (entries.length === 0) return res.json({ success: true });

    let completed = 0;
    entries.forEach(([key, value]) => {
        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, String(value)], () => {
            completed++;
            if (completed === entries.length) {
                console.log(`⚙️ System Settings Updated: ${entries.length} fields sync'd.`);
                res.json({ success: true });
            }
        });
    });
});

// ========== KNOWLEDGE BASE INGESTION (PDF) ==========
app.post('/api/settings/kb-upload', async (req, res) => {
    const { base64Pdf, fileName } = req.body;
    if (!base64Pdf) return res.status(400).json({ error: 'No PDF data' });

    try {
        // v24.1: Bugfix — Use direct lib import to avoid pdf-parse/index.js test-file bug
        const { default: pdf } = await import('pdf-parse/lib/pdf-parse.js' as any);
        const buffer = Buffer.from(base64Pdf, 'base64');
        const data = await pdf(buffer);
        const text = data.text.replace(/\s+/g, ' ').trim();

        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['COMPANY_KNOWLEDGE', text], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`📚 KB Ingested: ${text.length} chars from "${fileName}"`);
            res.json({ success: true, length: text.length, textSnippet: text.slice(0, 1000), text: text });
        });
    } catch (e: any) {
        console.error("PDF Parsing Error:", e);
        res.status(500).json({ error: "Failed to parse PDF" });
    }
});

// ========== IDENTITY SCRAPER (WEBSITE) ==========
app.post('/api/settings/scrape-self', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    try {
        const axios = (await import('axios')).default;
        const response = await axios.get(url, { timeout: 10000 });
        const html = response.data;
        // Simple text extraction from HTML
        const text = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
                         .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "")
                         .replace(/<[^>]+>/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim()
                         .slice(0, 5000);

        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['PITCH_CONTEXT', text], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`🔍 Self-Scrape: ${text.length} chars from "${url}"`);
            res.json({ success: true, suggested_pitch: text });
        });
    } catch (e: any) {
        console.error("Self-Scrape Error:", e);
        res.status(500).json({ error: "Failed to scan website" });
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
    // #region agent log
    fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H3_wrong_query_used_for_discovery',location:'server.ts:/api/search/before_findLeads',message:'Manual query forwarded to findLeads()',data:{queryLen:String(query).length,queryPreview:String(query).slice(0,120),hasPlumbing:String(query).toLowerCase().includes('plumbing')},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

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
        const insertPromises = leads.map(lead => new Promise<void>(async (resolve) => {
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
        const duplicateCount = leads.length - inserted;
        console.log(`💾 Committed ${inserted} new leads. Ignored ${duplicateCount} duplicates.`);
        res.json({ success: true, count: leads.length, inserted, duplicates: duplicateCount });
    } catch (e: any) {
        console.error("Search API Error:", e.message);
        res.status(500).json({ error: e.message });
    }
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
        res.json(rows?.[0] || {});
    });
});

// ========== REPLIES (IMAP TRAPPED) ==========
app.get('/api/replies', (req, res) => {
    db.all("SELECT r.*, l.company_name FROM replies r LEFT JOIN leads l ON r.lead_id = l.id ORDER BY r.received_at DESC", (err, rows) => {
        res.json(rows || []);
    });
});

app.patch('/api/replies/:id/read', (req, res) => {
    const { id } = req.params;
    db.run("UPDATE replies SET status = 'read' WHERE id = ?", [id], (err) => {
        res.json({ success: !err });
    });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Resale v5.1 Server running on port ${PORT}`));


