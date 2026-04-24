import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = path.resolve(__dirname, '..', 'sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

const NEW_PITCH = "Would you be open to a quick 2-minute video showing how this would work specifically for your team?";
const NEW_KNOWLEDGE = `Asif Digital Agency is an Elite AI Automation consultancy based in the UAE. We build custom, autonomous AI sales engines that handle lead discovery and personalized outreach automatically. Our system scrapes the web 24/7, identifies decision-maker emails, and drafts hyper-personalized emails based on each prospect's actual website content. One-time build fee, no monthly subscriptions.`;

db.serialize(() => {
    // 1. Fix the Pitch Context (was dumping instructions into email)
    db.run("UPDATE settings SET value = ? WHERE key = 'PITCH_CONTEXT' OR key = 'pitch_context'", [NEW_PITCH]);
    
    // 2. Fix Company Knowledge (compact and instructional)
    db.run("UPDATE settings SET value = ? WHERE key = 'COMPANY_KNOWLEDGE' OR key = 'company_knowledge'", [NEW_KNOWLEDGE]);

    console.log("✅ Database settings cleaned. Instructions moved out of the email body.");
});

setTimeout(() => db.close(), 1000);
