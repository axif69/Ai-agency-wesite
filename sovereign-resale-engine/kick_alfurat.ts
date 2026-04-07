import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/outreach_v2.db';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // 1. Force Clean & Priority for Al Furat
    db.run(`UPDATE leads SET 
        company_name = 'Al Furat Group (MEP)', 
        status = 'ready', 
        is_relevant = 1,
        last_contacted = NULL 
        WHERE email LIKE '%alfurat%' OR website LIKE '%alfurat%'`, (err) => {
        if (err) console.error("Error updating Al Furat:", err.message);
        else console.log("✅ Al Furat priority RESET to 'ready'.");
    });

    // 2. Clear any 'processing' hang-ups
    db.run("UPDATE leads SET status = 'ready' WHERE status = 'processing'", (err) => {
        if (err) console.error("Error clearing processing:", err.message);
        else console.log("✅ Cleared any 'stuck' processing leads.");
    });

    // 3. Verify exactly what the worker sees
    db.all("SELECT id, company_name, email, status FROM leads WHERE status = 'ready' ORDER BY id ASC LIMIT 5", (err, rows) => {
        console.log("--- NEXT 5 LEADS TO BE SENT ---");
        console.log(JSON.stringify(rows, null, 2));
        db.close();
    });
});
