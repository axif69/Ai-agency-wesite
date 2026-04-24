import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("--- Analytics Summary ---");
    const today = new Date().toISOString().split('T')[0];
    db.get("SELECT * FROM analytics WHERE date = ?", [today], (err, row) => {
        if (err) console.error(err);
        else console.log("Today's Analytics:", row);
    });

    console.log("\n--- Lead Status Summary ---");
    db.all("SELECT status, count(*) as count FROM leads GROUP BY status", (err, rows) => {
        if (err) console.error(err);
        else console.log(rows);
    });

    console.log("\n--- 5 Samples of 'ready' Leads ---");
    db.all("SELECT id, company_name, website, email FROM leads WHERE status = 'ready' LIMIT 5", (err, rows) => {
        if (err) console.error(err);
        else console.log(rows);
    });
    
    setTimeout(() => db.close(), 2000);
});
