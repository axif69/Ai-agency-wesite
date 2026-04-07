import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'sovereign_v5.db');
const db = new sqlite3.Database(dbPath);

console.log("🛠️ [SNIPER REBRAND] Forcing AI Outreach Agent Identity...");

const SNIPER_PITCH = `IDENTITY & MISSION: Represent Asif Khan and Asif Digital Agency.
PRODUCT: AI Outreach Engine (24/7 Autonomous SDR replacement).

CORE PITCH LOGIC:
1. THE PROBLEM: Agencies are burning cash on manual SDRs who send generic templates to stale lists.
2. THE SOLUTION: A private, 24/7 AI agent that finds companies in real-time, scrapes their latest projects, and sends hyper-personalized emails on your behalf.
3. AUTONOMY: The agent runs 24/7 without human supervision.

TONE: Blunt, professional, technical.
STRICT BAN: "revolutionary", "seamless", "unlock", "leverage", "delighted", "streamline", "boost efficiency", "solutions", "services", "portfolio".`;

const MISSION_TEXT = `Asif Digital builds 24/7 Autonomous AI Agents for high-ticket agencies. Our agents find relevant companies, scrape their latest case studies, and initiate professional outreach on your behalf, 24/7. This replaces the need for manual SDR teams and stale lead lists.`;

db.serialize(() => {
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["PITCH_CONTEXT", SNIPER_PITCH]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_KNOWLEDGE", MISSION_TEXT]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["REP_NAME", "Asif Khan"]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_NAME", "Asif Digital Agency"]);
});

setTimeout(() => {
    db.close();
    console.log("✅ [SNIPER REBRAND] Identity Sniped in Database.");
}, 1000);
