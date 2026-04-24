import sqlite3 from 'sqlite3';
import * as dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');
console.log(`[DB] Using Resale Database at: ${dbPath}`);
export const db = new sqlite3.Database(dbPath);

/**
 * Robust Database Initialization with Migration Guard.
 * Ensures all tables exist and all necessary columns are present across versions.
 */
export const initDB = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // 1. Core Tables — Create them first
      db.run(`CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT,
        website TEXT,
        domain TEXT,
        email TEXT,
        phone TEXT,
        category TEXT,
        type TEXT,
        location TEXT DEFAULT 'UAE',
        status TEXT DEFAULT 'new',
        pitch TEXT,
        about_summary TEXT,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_contacted DATETIME,
        sent_count INTEGER DEFAULT 0,
        reply_sentiment TEXT DEFAULT NULL,
        is_relevant INTEGER DEFAULT 1,
        analysis_notes TEXT,
        target_services TEXT
      )`);

      db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_domain ON leads(domain)`, () => {});

      db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS replies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER,
        from_email TEXT,
        from_name TEXT,
        subject TEXT,
        body TEXT,
        ai_draft_reply TEXT,
        sentiment TEXT DEFAULT 'pending',
        status TEXT DEFAULT 'pending',
        received_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        emails_sent INTEGER DEFAULT 0,
        emails_delivered INTEGER DEFAULT 0,
        replies_received INTEGER DEFAULT 0,
        positive_replies INTEGER DEFAULT 0,
        negative_replies INTEGER DEFAULT 0
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS outreach (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        company_name TEXT,
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS heartbeat (
        worker_id TEXT PRIMARY KEY,
        last_active DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS metrics (
        key TEXT PRIMARY KEY,
        value INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // 2. Sequential Column Upgrades with Existence Guards
      db.all("PRAGMA table_info(replies)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          
          if (!hasCol('from_email')) db.run('ALTER TABLE replies ADD COLUMN from_email TEXT');
          if (!hasCol('from_name')) db.run('ALTER TABLE replies ADD COLUMN from_name TEXT');
          if (!hasCol('subject')) db.run('ALTER TABLE replies ADD COLUMN subject TEXT');
          if (!hasCol('body')) db.run('ALTER TABLE replies ADD COLUMN body TEXT');
          if (!hasCol('status')) db.run("ALTER TABLE replies ADD COLUMN status TEXT DEFAULT 'pending'");
          if (!hasCol('sentiment')) db.run("ALTER TABLE replies ADD COLUMN sentiment TEXT DEFAULT 'pending'");
      });

      db.all("PRAGMA table_info(leads)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          if (!hasCol('is_relevant')) db.run('ALTER TABLE leads ADD COLUMN is_relevant INTEGER DEFAULT 1');
          if (!hasCol('analysis_notes')) db.run('ALTER TABLE leads ADD COLUMN analysis_notes TEXT');
          if (!hasCol('target_services')) db.run('ALTER TABLE leads ADD COLUMN target_services TEXT');
          
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('drip_followup_enabled', 'false')`);
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('drip_followup_days', '4')`);
          
          console.log("✅ Database initialized and schema synced.");
          resolve();
      });
    });
  });
};

// ─── Normalization (v17.1 Aggressive) ──────────────────────────────────────
const normalizeName = (name: string): string => {
    if (!name) return '';
    return name.toLowerCase()
        .replace(/\b(llc|fzc|fzco|fze|psc|pjsc|group|international|technical services|contracting|mep|electromechanical|and|&)\b/gi, '')
        .replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
};

// ─── Record Unique Lead ──────────────────────────────────────────────────────
export const dbInsertLead = async (lead: any): Promise<boolean> => {
    const domain = extractDomain(lead.website);
    if (await isDuplicateCompany(lead.website, lead.company_name)) return false;
    if (lead.email && await isAlreadyContacted(lead.email)) return false;
    
    return new Promise((resolve) => {
        db.run(
            `INSERT OR IGNORE INTO leads (company_name, website, domain, type, phone, location, category, status, email, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [lead.company_name, lead.website || 'N/A', domain, lead.type || 'auto_discovery', lead.phone || '', lead.location || 'UAE', lead.category || '', lead.email ? 'ready' : 'new', lead.email || null, lead.mobile_number || null],
            function(err) { resolve(!err && this.changes > 0); }
        );
    });
};

// ─── Deduplication Helper (v17.1 Aggressive Normalization) ───────────────────
export const isDuplicateCompany = (domain: string | null, name: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!domain && !name) return resolve(false);
        const normName = normalizeName(name);
        let cleanDomain = '';
        
        if (domain && domain !== 'N/A') {
            try {
                cleanDomain = new URL(domain.startsWith('http') ? domain : `https://${domain}`).hostname
                    .replace('www.', '').toLowerCase();
            } catch {
                cleanDomain = domain.toLowerCase().replace('www.', '');
            }
        }

        // Search by domain OR normalized name match
        const query = cleanDomain
            ? `SELECT id FROM leads WHERE domain = ? OR LOWER(company_name) = LOWER(?) OR id IN (SELECT id FROM leads WHERE LOWER(company_name) LIKE ?)`
            : `SELECT id FROM leads WHERE LOWER(company_name) = LOWER(?) OR id IN (SELECT id FROM leads WHERE LOWER(company_name) LIKE ?)`;
        
        const params = cleanDomain 
            ? [cleanDomain, name, `%${normName}%`] 
            : [name, `%${normName}%`];

        db.get(query, params, (err, row) => resolve(!!row));
    });
};

// ─── Outreach History Check ──────────────────────────────────────────────────
export const isAlreadyContacted = (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!email) return resolve(false);
        db.get('SELECT id FROM outreach WHERE email = ?', [email.toLowerCase()], (err, row) => resolve(!!row));
    });
};

// ─── Record Outreach ─────────────────────────────────────────────────────────
export const recordOutreach = (email: string, companyName: string): void => {
    if (!email) return;
    const today = new Date().toISOString().split('T')[0];
    
    db.serialize(() => {
        // 1. Log the individual outreach event
        db.run('INSERT OR IGNORE INTO outreach (email, company_name) VALUES (?, ?)', [email.toLowerCase(), companyName]);
        
        // 2. Sync Daily Analytics
        db.run('INSERT OR IGNORE INTO analytics (date, emails_sent) VALUES (?, 0)', [today]);
        db.run('UPDATE analytics SET emails_sent = emails_sent + 1 WHERE date = ?', [today]);
    });
};

// ─── Extract clean domain ────────────────────────────────────────────────────
export const extractDomain = (url: string): string => {
    if (!url || url === 'N/A') return '';
    try {
        return new URL(url.startsWith('http') ? url : `https://${url}`).hostname
            .replace('www.', '').toLowerCase();
    } catch {
        return url.toLowerCase().replace('www.', '');
    }
};


