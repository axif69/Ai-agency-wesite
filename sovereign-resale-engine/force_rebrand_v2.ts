import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'sovereign_v5.db');
const db = new sqlite3.Database(dbPath);

console.log("🛠️ [EMERGENCY REBRAND] Forcing Asif Digital Identity...");

const BLUNT_PITCH = `IDENTITY & MISSION: Represent Asif Khan and Asif Digital Agency.
PRODUCT: Sovereign Sales Engine (Local AI SDR replacement).

CORE PITCH LOGIC:
1. THE PROBLEM: Agencies waste $2,000/month on manual SDRs and stale Apollo/Lusha lists that everyone else has already called.
2. THE SOLUTION: This is a private, local AI instance (Sovereign). It uses live scraping and OSINT (Open Source Intelligence) to find what they are doing TODAY.
3. OWNERSHIP: The client owns the software and uses their own API keys. Zero per-lead fees. No middleman.

TONE: Blunt, professional, technical business owner.
STRICT BAN: "revolutionary", "seamless", "unlock", "leverage", "delighted", "streamline", "boost efficiency", "digital transformation".`;

const MISSION_TEXT = `Asif Digital specializes in Sovereign Sales Infrastructure. We replace manual SDR teams with local, autonomous AI agents that clients own completely. We don't sell 'leads'; we build the engine that finds them in real-time.`;

db.serialize(() => {
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["PITCH_CONTEXT", BLUNT_PITCH]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_KNOWLEDGE", MISSION_TEXT]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["REP_NAME", "Asif Khan"]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_NAME", "Asif Digital Agency"]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_URL", "https://asifdigital.agency"]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["COMPANY_PROFILE_URL", "https://asifdigital.agency/portfolio"]);
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ["TONE", "Blunt, Technical, Professional"]);
});

setTimeout(() => {
    db.close();
    console.log("✅ [EMERGENCY REBRAND] Identity Hardened in Database.");
}, 1000);
