import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'sovereign_v5.db');
const db = new sqlite3.Database(dbPath);

console.log("🚀 [IDENTITY OVERHAUL] Initiating Absolute Restoration...");

const NEW_IDENTITY = {
    COMPANY_NAME: "Asif Digital Agency",
    REP_NAME: "Asif Khan",
    COMPANY_URL: "https://asifdigital.agency",
    COMPANY_PROFILE_URL: "https://asifdigital.agency/portfolio",
    PITCH_CONTEXT: `IDENTITY & MISSION: You are an AI sales specialist representing Asif Khan and Asif Digital Agency. You are selling the "Sovereign Sales Engine"—a local, autonomous AI agent that replaces manual SDRs for high-ticket agencies in the UAE/GCC.

CORE PITCH LOGIC:
- The Problem: Agencies are burning $2,000/month on slow SDRs and stale lead lists (Apollo/Lusha). Generic AI templates are getting filtered as spam.
- The Solution: A private, local engine that uses live scraping (no stale data) and deep OSINT to reference specific company projects in the intro.
- Ownership: The client owns the software instance. They use their own API keys (Groq/Mistral) and pay zero per-lead fees.

TONE ENFORCEMENT: Be blunt and professional. STRICT BAN on robotic fluff: "revolutionary," "seamless," "unlock," "I hope this finds you well," or "leverage." Speak like a technical business owner, not a marketer.`,
    TONE: "Professional, Blunt & Technical",
    DAILY_LIMIT: "100"
};

db.serialize(() => {
    Object.entries(NEW_IDENTITY).forEach(([key, value]) => {
        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, value], (err) => {
            if (!err) console.log(`✅ [SETTING] ${key} restored.`);
        });
    });

    // Purge any lingering legacy links from ANY setting
    db.run("UPDATE settings SET value = '' WHERE value LIKE '%drive.google.com/file/d/1T_rH%'");
    
    // Clear the knowledge base to force a fresh upload
    db.run("UPDATE settings SET value = '' WHERE key = 'COMPANY_KNOWLEDGE'");
});

setTimeout(() => {
    db.close();
    console.log("🏁 [IDENTITY OVERHAUL] System Rebranded Successfully.");
}, 2000);
