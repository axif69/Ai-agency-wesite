import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fix: Go up one level from scratch folder
const dbPath = path.resolve(__dirname, '..', 'sovereign_resale_v5.db');
console.log(`Checking DB at: ${dbPath}`);
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("--- Lead Status Counts ---");
    db.each("SELECT status, COUNT(*) as count FROM leads GROUP BY status", (err, row) => {
        if (err) console.error(err);
        else console.log(`${row.status}: ${row.count}`);
    }, (err, count) => {
        if (count === 0) console.log("No leads found.");
    });

    console.log("\n--- Latest Outreach (Last 5) ---");
    db.each("SELECT email, company_name, sent_at FROM outreach ORDER BY sent_at DESC LIMIT 5", (err, row) => {
        if (err) console.error(err);
        else console.log(`${row.sent_at} | ${row.email} | ${row.company_name}`);
    }, (err, count) => {
        if (count === 0) console.log("No outreach recorded.");
    });

    console.log("\n--- Daily Analytics (Last 5 Days) ---");
    db.each("SELECT date, emails_sent, positive_replies FROM analytics ORDER BY date DESC LIMIT 5", (err, row) => {
        if (err) console.error(err);
        else console.log(`${row.date} | Sent: ${row.emails_sent} | Positive: ${row.positive_replies}`);
    }, (err, count) => {
        if (count === 0) console.log("No analytics data.");
    });
});
