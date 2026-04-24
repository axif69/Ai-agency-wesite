const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('C:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.all("SELECT id, company_name, website, status FROM leads ORDER BY id DESC LIMIT 15", (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("📊 [DATABASE CHECK] Latest Leads:");
    console.table(rows);
    db.close();
});
