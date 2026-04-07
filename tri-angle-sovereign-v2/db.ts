import sqlite3 from 'sqlite3';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const dbPath = process.env.OUTREACH_DB_PATH || path.join(path.resolve(), 'sovereign_v5.db');
export const db = new sqlite3.Database(dbPath);
console.log(`📦 [DATABASE] V2 Core restored to: ${dbPath}`);

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

      // 2. Sequential Column Upgrades
      // We manually add new columns to existing v5+ tables for resilience
      db.run(`ALTER TABLE replies ADD COLUMN from_email TEXT`, () => {});
      db.run(`ALTER TABLE replies ADD COLUMN from_name TEXT`, () => {});
      db.run(`ALTER TABLE replies ADD COLUMN subject TEXT`, () => {});
      db.run(`ALTER TABLE replies ADD COLUMN body TEXT`, () => {});
      db.run(`ALTER TABLE replies ADD COLUMN status TEXT DEFAULT 'pending'`, () => {});
      db.run(`ALTER TABLE replies ADD COLUMN sentiment TEXT DEFAULT 'pending'`, () => {});
      db.run(`ALTER TABLE leads ADD COLUMN is_relevant INTEGER DEFAULT 1`, () => {});
      db.run(`ALTER TABLE leads ADD COLUMN analysis_notes TEXT`, () => {});
      db.run(`ALTER TABLE leads ADD COLUMN target_services TEXT`, () => {});
      db.run(`ALTER TABLE analytics ADD COLUMN positive_replies INTEGER DEFAULT 0`, () => {});
      db.run(`ALTER TABLE analytics ADD COLUMN negative_replies INTEGER DEFAULT 0`, () => {
          // Resolve ONLY after the final alteration statement finishes its callback
          console.log("✅ Database initialized and schema synced.");
          resolve();
      });
    });
  });
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

// ─── Deduplication Helper ─────────────────────────────────────────────────────
export const isDuplicateCompany = (domain: string | null, name: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!domain && !name) return resolve(false);
        let cleanDomain = '';
        if (domain && domain !== 'N/A') {
            try {
                cleanDomain = new URL(domain.startsWith('http') ? domain : `https://${domain}`).hostname
                    .replace('www.', '').toLowerCase();
            } catch {
                cleanDomain = domain.toLowerCase().replace('www.', '');
            }
        }
        const query = cleanDomain
            ? `SELECT id FROM leads WHERE domain = ? OR LOWER(company_name) = LOWER(?)`
            : `SELECT id FROM leads WHERE LOWER(company_name) = LOWER(?)`;
        const params = cleanDomain ? [cleanDomain, name] : [name];
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
