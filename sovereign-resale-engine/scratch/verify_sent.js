import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("--- Last 5 SENT Emails Audit ---");
    db.all("SELECT id, company_name, email, last_contacted, status FROM leads WHERE status = 'sent' ORDER BY last_contacted DESC LIMIT 5", (err, rows) => {
        if (err) console.error(err);
        else console.log(rows);
    });

    console.log("\n--- New Discovery Keywords Check ---");
    db.all("SELECT category, count(*) as count FROM leads WHERE added_at >= datetime('now', '-30 minutes') GROUP BY category", (err, rows) => {
        if (err) console.error(err);
        else console.log(rows);
    });
    
    setTimeout(() => db.close(), 2000);
});
