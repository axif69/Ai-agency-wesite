import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');

const db = new sqlite3.Database(dbPath);

console.log("🛠️ Fixing Duplicates: Syncing leads status with outreach history...");

db.serialize(() => {
    // 1. Identify all leads whose email is already in the 'outreach' table
    // and mark them as 'sent' in the 'leads' table to stop repeats.
    db.run(`
        UPDATE leads 
        SET status = 'sent', sent_count = 1 
        WHERE email IN (SELECT email FROM outreach)
    `, function(err) {
        if (err) {
            console.error("❌ Error syncing outreach status:", err.message);
        } else {
            console.log(`✅ SUCCESS: ${this.changes} previously contacted leads marked as SENT and removed from queue.`);
        }
        
        // 2. Also, remove duplicates within the leads table just in case
        db.run(`
            DELETE FROM leads 
            WHERE id NOT IN (
                SELECT MIN(id) 
                FROM leads 
                GROUP BY email, company_name
            )
        `, function(err) {
            if (err) console.error("❌ Error cleaning lead duplicates:", err.message);
            else console.log(`✅ SUCCESS: ${this.changes} duplicate lead entries purged.`);
            
            db.close();
            process.exit(0);
        });
    });
});
