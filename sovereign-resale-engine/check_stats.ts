import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');

const db = new sqlite3.Database(dbPath);

const today = new Date().toISOString().split('T')[0];

console.log(`📊 [SYSTEM AUDIT] Date: ${today}`);

db.serialize(() => {
    // 1. Total Sent Today
    db.get('SELECT COUNT(*) as count FROM outreach WHERE sent_at LIKE ?', [today + '%'], (err, row) => {
        if (err) console.error(err);
        console.log(`✅ TRUE TOTAL SENT TODAY (PER LOGS): ${row.count}`);
    });

    // 2. Leads Ready
    db.get("SELECT COUNT(*) as count FROM leads WHERE status IN ('ready', 'priority_ready')", (err, row) => {
        if (err) console.error(err);
        console.log(`🎯 LEADS WAITING IN QUEUE: ${row.count}`);
    });

    // 3. Analytics table value
    db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row) => {
        if (err) console.error(err);
        console.log(`📈 ENGINE COUNTER (ANALYTICS): ${row ? row.emails_sent : 0}`);
        db.close();
    });
});
