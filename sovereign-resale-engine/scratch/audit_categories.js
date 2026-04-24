import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("--- Global Lead Categories ---");
    db.all("SELECT category, count(*) as count FROM leads GROUP BY category ORDER BY count DESC", (err, rows) => {
        if (err) console.error(err);
        else console.log(rows);
    });

    console.log("\n--- Verification of New Niches ---");
    const newNiches = ['business setup services dubai', 'iso consultancy uae', 'solar energy companies dubai', 'insurance brokers dubai'];
    db.all(`SELECT category, count(*) as count FROM leads WHERE category IN (${newNiches.map(n => `'${n}'`).join(',')}) GROUP BY category`, (err, rows) => {
        if (err) console.error(err);
        else console.log(rows);
    });
    
    setTimeout(() => db.close(), 2000);
});
