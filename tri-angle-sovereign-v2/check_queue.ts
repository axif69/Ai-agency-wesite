import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/tri-angle-sovereign-v2/sovereign_v5.db';
const db = new sqlite3.Database(dbPath);

console.log("🛠️ QUEUE CHECKER");

db.all(`SELECT id, company_name, email, status FROM leads WHERE status IN ('ready', 'priority_ready') ORDER BY added_at ASC LIMIT 10`, function(err, rows) {
    console.log("TOP 10 READY LEADS:", JSON.stringify(rows, null, 2));
    db.close();
});
