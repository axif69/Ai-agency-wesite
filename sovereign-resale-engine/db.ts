import sqlite3 from 'sqlite3';
import * as dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { assessPersonName } from './contact_validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');
console.log(`[DB] Using Resale Database at: ${dbPath}`);
export const db = new sqlite3.Database(dbPath);

// Enable WAL mode for concurrent multi-process access (prevents SQLITE_BUSY errors)
db.serialize(() => {
    db.run("PRAGMA journal_mode=WAL;");
    db.run("PRAGMA busy_timeout=10000;");
    db.run("PRAGMA synchronous=NORMAL;");
});

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
        mobile_number TEXT,
        category TEXT,
        source TEXT,
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
        target_services TEXT,
        relevance_score INTEGER DEFAULT 0,
        person_identity_verified INTEGER DEFAULT 0,
        person_name_confidence INTEGER DEFAULT 0,
        role_confidence INTEGER DEFAULT 0,
        contact_source_evidence_json TEXT DEFAULT '[]',
        email_syntax_valid INTEGER DEFAULT 0,
        email_domain_valid INTEGER DEFAULT 0,
        email_mailbox_accepted INTEGER DEFAULT 0,
        email_domain_catch_all INTEGER DEFAULT 0,
        email_ownership_status TEXT DEFAULT 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
        email_ownership_verified INTEGER DEFAULT 0
      )`);

      db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_domain ON leads(domain)`, () => {});

      db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS replies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER,
        from_email TEXT,
        from_name TEXT,
        subject TEXT,
        body TEXT,
        message_id TEXT UNIQUE,
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
        delivery_status TEXT DEFAULT 'legacy_sent',
        smtp_message_id TEXT,
        smtp_response TEXT,
        smtp_sender TEXT,
        accepted_at DATETIME,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS outreach_drafts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER NOT NULL,
        recipient_email TEXT,
        subject TEXT NOT NULL,
        html_body TEXT,
        text_body TEXT NOT NULL,
        prospect_facts_json TEXT DEFAULT '[]',
        prompt_version TEXT,
        model TEXT,
        quality_score INTEGER DEFAULT 0,
        validation_warnings_json TEXT DEFAULT '[]',
        approval_status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        approved_at DATETIME,
        rejected_at DATETIME,
        sent_at DATETIME,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_test_fixture INTEGER DEFAULT 0,
        FOREIGN KEY (lead_id) REFERENCES leads(id)
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

      db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER,
        company_name TEXT,
        domain TEXT,
        full_name TEXT,
        job_title TEXT,
        seniority TEXT,
        department TEXT,
        email TEXT,
        phone TEXT,
        mobile_number TEXT,
        linkedin_url TEXT,
        linkedin_status TEXT DEFAULT 'unverified',
        source TEXT,
        confidence_score INTEGER DEFAULT 0,
        email_verified INTEGER DEFAULT 0,
        is_decision_maker INTEGER DEFAULT 0,
        person_identity_verified INTEGER DEFAULT 0,
        person_name_confidence INTEGER DEFAULT 0,
        role_confidence INTEGER DEFAULT 0,
        source_evidence_json TEXT DEFAULT '[]',
        email_syntax_valid INTEGER DEFAULT 0,
        email_domain_valid INTEGER DEFAULT 0,
        email_mailbox_accepted INTEGER DEFAULT 0,
        email_domain_catch_all INTEGER DEFAULT 0,
        email_ownership_status TEXT DEFAULT 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
        email_ownership_verified INTEGER DEFAULT 0,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_lead_id ON contacts(lead_id)`, () => {});
      db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_domain ON contacts(domain)`, () => {});
      db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)`, () => {});

      // 2. Sequential Column Upgrades with Existence Guards
      db.all("PRAGMA table_info(replies)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {});
          
          if (!hasCol('from_email')) silentRun('ALTER TABLE replies ADD COLUMN from_email TEXT');
          if (!hasCol('from_name')) silentRun('ALTER TABLE replies ADD COLUMN from_name TEXT');
          if (!hasCol('subject')) silentRun('ALTER TABLE replies ADD COLUMN subject TEXT');
          if (!hasCol('body')) silentRun('ALTER TABLE replies ADD COLUMN body TEXT');
          if (!hasCol('message_id')) silentRun('ALTER TABLE replies ADD COLUMN message_id TEXT');
          if (!hasCol('status')) silentRun("ALTER TABLE replies ADD COLUMN status TEXT DEFAULT 'pending'");
          if (!hasCol('sentiment')) silentRun("ALTER TABLE replies ADD COLUMN sentiment TEXT DEFAULT 'pending'");
      });

      db.all("PRAGMA table_info(leads)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {}); // Suppress unhandled error events
          
          if (!hasCol('is_relevant')) silentRun('ALTER TABLE leads ADD COLUMN is_relevant INTEGER DEFAULT 1');
          if (!hasCol('source')) silentRun('ALTER TABLE leads ADD COLUMN source TEXT');
          if (!hasCol('analysis_notes')) silentRun('ALTER TABLE leads ADD COLUMN analysis_notes TEXT');
          if (!hasCol('target_services')) silentRun('ALTER TABLE leads ADD COLUMN target_services TEXT');
          if (!hasCol('mobile_number')) silentRun('ALTER TABLE leads ADD COLUMN mobile_number TEXT');
          if (!hasCol('relevance_score')) silentRun('ALTER TABLE leads ADD COLUMN relevance_score INTEGER DEFAULT 0');
          if (!hasCol('contact_name')) silentRun('ALTER TABLE leads ADD COLUMN contact_name TEXT');
          if (!hasCol('linkedin_url')) silentRun('ALTER TABLE leads ADD COLUMN linkedin_url TEXT');
          if (!hasCol('delivery_status')) silentRun("ALTER TABLE leads ADD COLUMN delivery_status TEXT DEFAULT 'legacy_sent'");
          if (!hasCol('smtp_message_id')) silentRun('ALTER TABLE leads ADD COLUMN smtp_message_id TEXT');
          if (!hasCol('smtp_response')) silentRun('ALTER TABLE leads ADD COLUMN smtp_response TEXT');
          if (!hasCol('smtp_sender')) silentRun('ALTER TABLE leads ADD COLUMN smtp_sender TEXT');
        if (!hasCol('smtp_accepted_at')) silentRun('ALTER TABLE leads ADD COLUMN smtp_accepted_at DATETIME');
        if (!hasCol('email_source')) silentRun('ALTER TABLE leads ADD COLUMN email_source TEXT');
        if (!hasCol('email_is_fallback')) silentRun('ALTER TABLE leads ADD COLUMN email_is_fallback INTEGER DEFAULT 0');
        if (!hasCol('email_verified')) silentRun('ALTER TABLE leads ADD COLUMN email_verified INTEGER DEFAULT 0');
        if (!hasCol('email_source_url')) silentRun('ALTER TABLE leads ADD COLUMN email_source_url TEXT');
        if (!hasCol('email_confidence_score')) silentRun('ALTER TABLE leads ADD COLUMN email_confidence_score INTEGER DEFAULT 0');
        if (!hasCol('email_mx_valid')) silentRun('ALTER TABLE leads ADD COLUMN email_mx_valid INTEGER');
        if (!hasCol('person_identity_verified')) silentRun('ALTER TABLE leads ADD COLUMN person_identity_verified INTEGER DEFAULT 0');
        if (!hasCol('person_name_confidence')) silentRun('ALTER TABLE leads ADD COLUMN person_name_confidence INTEGER DEFAULT 0');
        if (!hasCol('role_confidence')) silentRun('ALTER TABLE leads ADD COLUMN role_confidence INTEGER DEFAULT 0');
        if (!hasCol('contact_source_evidence_json')) silentRun("ALTER TABLE leads ADD COLUMN contact_source_evidence_json TEXT DEFAULT '[]'");
        if (!hasCol('email_syntax_valid')) silentRun('ALTER TABLE leads ADD COLUMN email_syntax_valid INTEGER DEFAULT 0');
        if (!hasCol('email_domain_valid')) silentRun('ALTER TABLE leads ADD COLUMN email_domain_valid INTEGER DEFAULT 0');
        if (!hasCol('email_mailbox_accepted')) silentRun('ALTER TABLE leads ADD COLUMN email_mailbox_accepted INTEGER DEFAULT 0');
        if (!hasCol('email_domain_catch_all')) silentRun('ALTER TABLE leads ADD COLUMN email_domain_catch_all INTEGER DEFAULT 0');
        if (!hasCol('email_ownership_status')) silentRun("ALTER TABLE leads ADD COLUMN email_ownership_status TEXT DEFAULT 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED'");
        if (!hasCol('email_ownership_verified')) silentRun('ALTER TABLE leads ADD COLUMN email_ownership_verified INTEGER DEFAULT 0');
        if (!hasCol('phone_raw')) silentRun('ALTER TABLE leads ADD COLUMN phone_raw TEXT');
        if (!hasCol('phone_e164')) silentRun('ALTER TABLE leads ADD COLUMN phone_e164 TEXT');
        if (!hasCol('phone_is_valid')) silentRun('ALTER TABLE leads ADD COLUMN phone_is_valid INTEGER DEFAULT 0');
        if (!hasCol('enrichment_status')) silentRun("ALTER TABLE leads ADD COLUMN enrichment_status TEXT DEFAULT 'pending'");
        if (!hasCol('enrichment_started_at')) silentRun('ALTER TABLE leads ADD COLUMN enrichment_started_at DATETIME');
        if (!hasCol('enrichment_finished_at')) silentRun('ALTER TABLE leads ADD COLUMN enrichment_finished_at DATETIME');
        if (!hasCol('enrichment_attempt_count')) silentRun('ALTER TABLE leads ADD COLUMN enrichment_attempt_count INTEGER DEFAULT 0');
        if (!hasCol('next_retry_at')) silentRun('ALTER TABLE leads ADD COLUMN next_retry_at DATETIME');
        if (!hasCol('last_error_code')) silentRun('ALTER TABLE leads ADD COLUMN last_error_code TEXT');
        if (!hasCol('last_error_message')) silentRun('ALTER TABLE leads ADD COLUMN last_error_message TEXT');
        if (!hasCol('enrichment_worker_id')) silentRun('ALTER TABLE leads ADD COLUMN enrichment_worker_id TEXT');
        if (!hasCol('tech_stack')) silentRun('ALTER TABLE leads ADD COLUMN tech_stack TEXT');
        if (!hasCol('sequence_step')) silentRun('ALTER TABLE leads ADD COLUMN sequence_step INTEGER DEFAULT 1');
        if (!hasCol('next_drip_due_at')) silentRun('ALTER TABLE leads ADD COLUMN next_drip_due_at DATETIME');
        if (!hasCol('drip_status')) silentRun("ALTER TABLE leads ADD COLUMN drip_status TEXT DEFAULT 'active'");
        if (!hasCol('enrichment_tier')) silentRun("ALTER TABLE leads ADD COLUMN enrichment_tier TEXT DEFAULT 'tier_1_apollo'");
        // Loop-killer marker for the LinkedIn worker: set after ONE scan attempt so leads
        // that yield no executive are never re-scraped every cycle.
        if (!hasCol('linkedin_scanned_at')) silentRun('ALTER TABLE leads ADD COLUMN linkedin_scanned_at DATETIME');
      });

      db.all("PRAGMA table_info(contacts)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {});

          // TIER 2 / TIER 3 provenance tags: how the DM's email was obtained
          // ('decision_maker' | 'google_osint_hunt' | 'company_fallback' | ...) and
          // whether the address is the person's direct inbox or the company fallback.
          if (!hasCol('email_source')) silentRun("ALTER TABLE contacts ADD COLUMN email_source TEXT DEFAULT 'decision_maker'");
          if (!hasCol('email_type')) silentRun('ALTER TABLE contacts ADD COLUMN email_type TEXT');
          // Task3 deep-hunt queue: 'none' | 'queued' | 'hunting' | 'done' | 'failed'
          if (!hasCol('deep_hunt_status')) silentRun("ALTER TABLE contacts ADD COLUMN deep_hunt_status TEXT DEFAULT 'none'");
          if (!hasCol('deep_hunt_queued_at')) silentRun('ALTER TABLE contacts ADD COLUMN deep_hunt_queued_at DATETIME');
          if (!hasCol('deep_hunt_hunted_at')) silentRun('ALTER TABLE contacts ADD COLUMN deep_hunt_hunted_at DATETIME');
          // LinkedIn verification status
          if (!hasCol('linkedin_status')) silentRun("ALTER TABLE contacts ADD COLUMN linkedin_status TEXT DEFAULT 'unverified'");
      });

      db.all("PRAGMA table_info(outreach_drafts)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {});
          if (!hasCol('sequence_step')) silentRun('ALTER TABLE outreach_drafts ADD COLUMN sequence_step INTEGER DEFAULT 1');
          if (!hasCol('drip_delay_days')) silentRun('ALTER TABLE outreach_drafts ADD COLUMN drip_delay_days INTEGER DEFAULT 0');
      });

      db.run(`CREATE TABLE IF NOT EXISTS email_sender_accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        smtp_host TEXT,
        smtp_port INTEGER DEFAULT 587,
        spf_valid INTEGER DEFAULT 1,
        dkim_valid INTEGER DEFAULT 1,
        dmarc_valid INTEGER DEFAULT 1,
        daily_sent_count INTEGER DEFAULT 0,
        daily_limit INTEGER DEFAULT 50,
        warmup_status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
          
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('drip_followup_enabled', 'false')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('drip_followup_days', '4')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('auto_discovery', 'true')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('OUTREACH_ENABLED', 'true')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('HUMAN_APPROVAL_REQUIRED', 'true')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('AUTO_FOLLOWUPS', 'false')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('LICENSE_STATUS', 'inactive')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('company_name', 'Asif Digital Agency')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('rep_name', 'Asif')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('email', 'asif@youragency.com')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('target_location', 'Dubai, Abu Dhabi, New York, Toronto, London, Sydney')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('required_keywords', 'commercial projects, B2B services, turnkey solutions, corporate clients, custom software, office fitout, enterprise solutions')`, () => {});
          db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('negative_keywords', 'directory, yellow pages, job vacancy, careers, glassdoor, wikipedia, retail shop, consumer, e-commerce store')`, () => {});
          
          console.log("✅ Database initialized and schema synced.");
          resolve();
      });

      db.all("PRAGMA table_info(outreach)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {});
          if (!hasCol('delivery_status')) silentRun("ALTER TABLE outreach ADD COLUMN delivery_status TEXT DEFAULT 'legacy_sent'");
          if (!hasCol('smtp_message_id')) silentRun('ALTER TABLE outreach ADD COLUMN smtp_message_id TEXT');
          if (!hasCol('smtp_response')) silentRun('ALTER TABLE outreach ADD COLUMN smtp_response TEXT');
          if (!hasCol('smtp_sender')) silentRun('ALTER TABLE outreach ADD COLUMN smtp_sender TEXT');
          if (!hasCol('accepted_at')) silentRun('ALTER TABLE outreach ADD COLUMN accepted_at DATETIME');
          if (!hasCol('updated_at')) silentRun('ALTER TABLE outreach ADD COLUMN updated_at DATETIME');
          if (!hasCol('accepted_recipients')) silentRun("ALTER TABLE outreach ADD COLUMN accepted_recipients TEXT DEFAULT '[]'");
          if (!hasCol('rejected_recipients')) silentRun("ALTER TABLE outreach ADD COLUMN rejected_recipients TEXT DEFAULT '[]'");
          if (!hasCol('pending_recipients')) silentRun("ALTER TABLE outreach ADD COLUMN pending_recipients TEXT DEFAULT '[]'");
          if (!hasCol('error_code')) silentRun('ALTER TABLE outreach ADD COLUMN error_code TEXT');
          if (!hasCol('error_message')) silentRun('ALTER TABLE outreach ADD COLUMN error_message TEXT');
          if (!hasCol('idempotency_key')) silentRun('ALTER TABLE outreach ADD COLUMN idempotency_key TEXT');
      });

      db.all("PRAGMA table_info(outreach_drafts)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {});
          if (!hasCol('rejected_at')) silentRun('ALTER TABLE outreach_drafts ADD COLUMN rejected_at DATETIME');
          if (!hasCol('sent_at')) silentRun('ALTER TABLE outreach_drafts ADD COLUMN sent_at DATETIME');
          if (!hasCol('updated_at')) silentRun('ALTER TABLE outreach_drafts ADD COLUMN updated_at DATETIME');
          if (!hasCol('is_test_fixture')) silentRun('ALTER TABLE outreach_drafts ADD COLUMN is_test_fixture INTEGER DEFAULT 0');
      });

      db.all("PRAGMA table_info(settings)", (err, columns) => {
          if (err) return;
          if (!columns.some((c: any) => c.name === 'updated_at')) db.run('ALTER TABLE settings ADD COLUMN updated_at DATETIME', () => {});
      });

      db.all("PRAGMA table_info(contacts)", (err, columns) => {
          if (err) return;
          const hasCol = (name: string) => columns.some((c: any) => c.name === name);
          const silentRun = (sql: string) => db.run(sql, () => {});
          if (!hasCol('person_identity_verified')) silentRun('ALTER TABLE contacts ADD COLUMN person_identity_verified INTEGER DEFAULT 0');
          if (!hasCol('person_name_confidence')) silentRun('ALTER TABLE contacts ADD COLUMN person_name_confidence INTEGER DEFAULT 0');
          if (!hasCol('role_confidence')) silentRun('ALTER TABLE contacts ADD COLUMN role_confidence INTEGER DEFAULT 0');
          if (!hasCol('source_evidence_json')) silentRun("ALTER TABLE contacts ADD COLUMN source_evidence_json TEXT DEFAULT '[]'");
          if (!hasCol('email_syntax_valid')) silentRun('ALTER TABLE contacts ADD COLUMN email_syntax_valid INTEGER DEFAULT 0');
          if (!hasCol('email_domain_valid')) silentRun('ALTER TABLE contacts ADD COLUMN email_domain_valid INTEGER DEFAULT 0');
          if (!hasCol('email_mailbox_accepted')) silentRun('ALTER TABLE contacts ADD COLUMN email_mailbox_accepted INTEGER DEFAULT 0');
          if (!hasCol('email_domain_catch_all')) silentRun('ALTER TABLE contacts ADD COLUMN email_domain_catch_all INTEGER DEFAULT 0');
          if (!hasCol('email_ownership_status')) silentRun("ALTER TABLE contacts ADD COLUMN email_ownership_status TEXT DEFAULT 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED'");
          if (!hasCol('email_ownership_verified')) silentRun('ALTER TABLE contacts ADD COLUMN email_ownership_verified INTEGER DEFAULT 0');
          db.run(`UPDATE contacts SET
                    email_verified = 0,
                    email_ownership_verified = 0,
                    email_ownership_status = CASE
                      WHEN LOWER(COALESCE(source, '')) LIKE '%pattern%' THEN 'EMAIL_PATTERN_GUESSED'
                      WHEN LOWER(COALESCE(email, '')) GLOB 'info@*' OR LOWER(COALESCE(email, '')) GLOB 'sales@*' OR LOWER(COALESCE(email, '')) GLOB 'contact@*' THEN 'EMAIL_COMPANY_MAILBOX'
                      ELSE 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED'
                    END
                  WHERE COALESCE(email_ownership_verified, 0) != 1 OR LOWER(COALESCE(source, '')) LIKE '%pattern%'`, () => {});
          db.run(`UPDATE contacts SET status = 'quarantined', person_identity_verified = 0, email_verified = 0,
                    email_ownership_verified = 0, email_ownership_status = 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED'
                  WHERE LOWER(COALESCE(full_name, '')) LIKE '%bakery%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%restaurant%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%freight%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%logistics%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%licensed broker%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%gobuild%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '% view%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%countries%'
                     OR LOWER(COALESCE(full_name, '')) LIKE '%casablanca%'`, () => {});
          db.run(`UPDATE leads SET email_verified = 0, email_ownership_verified = 0,
                    email_ownership_status = CASE WHEN COALESCE(email_is_fallback, 0) = 1 THEN 'EMAIL_COMPANY_MAILBOX' ELSE 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED' END
                  WHERE COALESCE(email_ownership_verified, 0) != 1 OR LOWER(COALESCE(email_source, '')) IN ('pattern', 'osint')`, () => {});
          console.log("✅ Database initialized and schema synced.");
          resolve();
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
            `INSERT OR IGNORE INTO leads (company_name, website, domain, type, phone, mobile_number, location, category, status, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [lead.company_name, lead.website || 'N/A', domain, lead.type || 'auto_discovery', lead.phone || null, lead.mobile_number || null, lead.location || 'UAE', lead.category || '', lead.email ? 'ready' : 'new', lead.email || null],
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

export const getSetting = (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
        db.get("SELECT value FROM settings WHERE key = ?", [key], (err, row: any) => {
            if (err || !row) return resolve(null);
            resolve(row.value ?? null);
        });
    });
};

export const upsertContact = (contact: any): Promise<boolean> => {
    return new Promise((resolve) => {
        const email = contact.email ? String(contact.email).toLowerCase().trim() : null;
        const fullName = String(contact.full_name || contact.contact_name || '').replace(/\s+/g, ' ').trim() || null;
        const domain = contact.domain || extractDomain(contact.website || '');
        const nameAssessment = assessPersonName(fullName);
        if (contact.is_decision_maker && fullName && !nameAssessment.valid && Number(nameAssessment.confidence) < 50) return resolve(false);
        if (!email && !fullName && !contact.linkedin_url && !contact.phone && !contact.mobile_number) return resolve(false);

        const lookupSql = email
            ? "SELECT id FROM contacts WHERE email = ? AND (lead_id = ? OR domain = ?)"
            : "SELECT id FROM contacts WHERE full_name = ? AND domain = ? AND (lead_id = ? OR lead_id IS NULL)";
        const lookupParams = email
            ? [email, contact.lead_id || null, domain || null]
            : [fullName, domain || null, contact.lead_id || null];

        db.get(lookupSql, lookupParams, (lookupErr, existing: any) => {
            if (lookupErr) return resolve(false);
            const values = [
                contact.lead_id || null,
                contact.company_name || null,
                domain || null,
                fullName,
                contact.job_title || null,
                contact.seniority || null,
                contact.department || null,
                email,
                contact.phone || null,
                contact.mobile_number || null,
                contact.linkedin_url || null,
                contact.source || 'free_enrichment',
                Number(contact.confidence_score || 0),
                contact.email_ownership_verified ? 1 : 0,
                contact.is_decision_maker ? 1 : 0,
                contact.person_identity_verified ? 1 : 0,
                Number(contact.person_name_confidence || nameAssessment.confidence || 0),
                Number(contact.role_confidence || 0),
                JSON.stringify(Array.isArray(contact.source_evidence) ? contact.source_evidence : []),
                contact.email_syntax_valid ? 1 : 0,
                contact.email_domain_valid ? 1 : 0,
                contact.email_mailbox_accepted ? 1 : 0,
                contact.email_domain_catch_all ? 1 : 0,
                contact.email_ownership_status || 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
                contact.email_ownership_verified ? 1 : 0,
                contact.status || 'new',
                contact.email_source || 'decision_maker',
                contact.email_type || null,
                contact.deep_hunt_status || 'none'
            ];

            if (existing?.id) {
                db.run(
                    `UPDATE contacts SET
                        lead_id = COALESCE(?, lead_id),
                        company_name = COALESCE(?, company_name),
                        domain = COALESCE(?, domain),
                        full_name = COALESCE(?, full_name),
                        job_title = COALESCE(?, job_title),
                        seniority = COALESCE(?, seniority),
                        department = COALESCE(?, department),
                        email = COALESCE(?, email),
                        phone = COALESCE(?, phone),
                        mobile_number = COALESCE(?, mobile_number),
                        linkedin_url = COALESCE(?, linkedin_url),
                        source = COALESCE(?, source),
                        confidence_score = MAX(confidence_score, ?),
                        email_verified = ?,
                        is_decision_maker = MAX(is_decision_maker, ?),
                        person_identity_verified = ?,
                        person_name_confidence = ?,
                        role_confidence = ?,
                        source_evidence_json = ?,
                        email_syntax_valid = ?,
                        email_domain_valid = ?,
                        email_mailbox_accepted = ?,
                        email_domain_catch_all = ?,
                        email_ownership_status = ?,
                        email_ownership_verified = ?,
                        status = COALESCE(?, status),
                        email_source = COALESCE(?, email_source),
                        email_type = COALESCE(?, email_type),
                        deep_hunt_status = COALESCE(?, deep_hunt_status),
                        updated_at = CURRENT_TIMESTAMP
                     WHERE id = ?`,
                    [...values, existing.id],
                    function(err) { resolve(!err && this.changes > 0); }
                );
                return;
            }

            db.run(
                `INSERT INTO contacts (
                    lead_id, company_name, domain, full_name, job_title, seniority, department,
                    email, phone, mobile_number, linkedin_url, source, confidence_score,
                    email_verified, is_decision_maker, person_identity_verified, person_name_confidence,
                    role_confidence, source_evidence_json, email_syntax_valid, email_domain_valid,
                    email_mailbox_accepted, email_domain_catch_all, email_ownership_status,
                    email_ownership_verified, status, email_source, email_type, deep_hunt_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                values,
                function(err) { resolve(!err && this.changes > 0); }
            );
        });
    });
};

/**
 * Task3 — Mark a decision maker for background deep enrichment (LinkedIn / OSINT hunt)
 * when they have a name+title but no direct email yet. Only queues real DMs and only
 * once, so the LinkedIn worker has a clean queue to drain.
 */
export const queueContactForDeepHunt = (contactId: number, force: boolean = false): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!contactId) return resolve(false);
        const statusWhere = force ? '' : "AND deep_hunt_status = 'none'";
        db.run(
            `UPDATE contacts SET deep_hunt_status = 'queued', deep_hunt_queued_at = CURRENT_TIMESTAMP
             WHERE id = ? AND full_name IS NOT NULL AND full_name != ''
               AND job_title IS NOT NULL AND job_title != ''
               AND (email IS NULL OR email = '') ${statusWhere}`,
            [contactId],
            function(err) { resolve(!err && this.changes > 0); }
        );
    });
};

export const getQueuedDeepHuntContacts = (limit: number = 5): Promise<any[]> => {
    return new Promise((resolve) => {
        db.all(
            `SELECT * FROM contacts WHERE deep_hunt_status = 'queued'
             ORDER BY COALESCE(deep_hunt_queued_at, created_at) ASC LIMIT ?`,
            [limit],
            (err, rows) => resolve(err ? [] : rows || [])
        );
    });
};

export const getContactsForLead = (leadId: number): Promise<any[]> => {
    return new Promise((resolve) => {
        db.all(
            "SELECT * FROM contacts WHERE lead_id = ? ORDER BY email_ownership_verified DESC, person_identity_verified DESC, confidence_score DESC, created_at DESC",
            [leadId],
            (err, rows) => resolve(err ? [] : rows || [])
        );
    });
};

// ─── Record Outreach ─────────────────────────────────────────────────────────
export const recordOutreach = (email: string, companyName: string, receipt: any = {}): void => {
    if (!email) return;
    const today = new Date().toISOString().split('T')[0];
    
    db.serialize(() => {
        // 1. Log the individual outreach event
        const deliveryStatus = receipt.status || 'legacy_sent';
        db.run(`INSERT INTO outreach
            (email, company_name, delivery_status, smtp_message_id, smtp_response, smtp_sender,
             accepted_recipients, rejected_recipients, pending_recipients, error_code, error_message, accepted_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'smtp_accepted' THEN CURRENT_TIMESTAMP ELSE NULL END, CURRENT_TIMESTAMP)
            ON CONFLICT(email) DO UPDATE SET
              company_name = excluded.company_name,
              delivery_status = excluded.delivery_status,
              smtp_message_id = excluded.smtp_message_id,
              smtp_response = excluded.smtp_response,
              smtp_sender = excluded.smtp_sender,
              accepted_recipients = excluded.accepted_recipients,
              rejected_recipients = excluded.rejected_recipients,
              pending_recipients = excluded.pending_recipients,
              error_code = excluded.error_code,
              error_message = excluded.error_message,
              accepted_at = excluded.accepted_at,
              updated_at = CURRENT_TIMESTAMP`, [
                email.toLowerCase(), companyName, deliveryStatus,
                receipt.messageId || null, receipt.response || null,
                receipt.sender || null,
                JSON.stringify(receipt.accepted || []), JSON.stringify(receipt.rejected || []), JSON.stringify(receipt.pending || []),
                receipt.errorCode || null, receipt.error || null, deliveryStatus
            ]);
        
        // 2. Sync Daily Analytics
        db.run('INSERT OR IGNORE INTO analytics (date, emails_sent) VALUES (?, 0)', [today]);
        db.run('UPDATE analytics SET emails_sent = emails_sent + 1 WHERE date = ?', [today]);
    });
};

export const recordReply = (sentiment: string): void => {
    const today = new Date().toISOString().split('T')[0];
    db.serialize(() => {
        db.run('INSERT OR IGNORE INTO analytics (date, replies_received, positive_replies, negative_replies) VALUES (?, 0, 0, 0)', [today]);
        db.run('UPDATE analytics SET replies_received = replies_received + 1 WHERE date = ?', [today]);
        if (sentiment === 'positive') {
            db.run('UPDATE analytics SET positive_replies = positive_replies + 1 WHERE date = ?', [today]);
        } else if (sentiment === 'negative') {
            db.run('UPDATE analytics SET negative_replies = negative_replies + 1 WHERE date = ?', [today]);
        }
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


