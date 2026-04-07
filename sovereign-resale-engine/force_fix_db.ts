import sqlite3 from 'sqlite3';
import { cleanName } from './personalizer';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/outreach_v2.db';
const db = new sqlite3.Database(dbPath);

async function forceCleanDB() {
    console.log("🛠️ STARTING DATABASE EMERGENCY HARDENING...");
    
    db.serialize(() => {
        // 1. Delete Absolute Junk (Wwww, tps://, etc.)
        db.run(`DELETE FROM leads WHERE 
            length(company_name) < 3 OR 
            company_name LIKE 'http%' OR 
            company_name LIKE 'www%' OR 
            company_name LIKE '%.com%' OR
            company_name = 'Wwww' OR
            company_name = 'alfuratgroup'`, (err) => {
            if (err) console.error("Error deleting junk:", err.message);
            else console.log("✅ Junk/URL leads purged.");
        });

        // 2. Fix the Al Furat Bottleneck
        // We find any lead that looks like Al Furat and ensure it is 'ready'
        db.run(`UPDATE leads SET 
            company_name = 'Al Furat Group (MEP)', 
            status = 'ready',
            is_relevant = 1 
            WHERE website LIKE '%alfurat%' OR email LIKE '%alfurat%'`, (err) => {
            if (err) console.error("Error kicking Al Furat:", err.message);
            else console.log("✅ Al Furat priority reset to READY.");
        });

        // 3. Re-clean EVERY name in the database using the new aggressive Logic
        db.all("SELECT id, company_name FROM leads WHERE status IN ('new', 'ready')", (err, rows: any[]) => {
            if (err) return;
            console.log(`🔎 Re-cleaning ${rows.length} pending names...`);
            rows.forEach(row => {
                const newName = cleanName(row.company_name);
                if (newName !== row.company_name) {
                    db.run("UPDATE leads SET company_name = ? WHERE id = ?", [newName, row.id]);
                }
            });
            console.log("✅ All pending names modernized.");
        });
    });

    setTimeout(() => {
        db.close();
        console.log("\n🚀 DB FIX COMPLETE. RESTART THE ENGINE NOW.");
    }, 5000);
}

forceCleanDB();
