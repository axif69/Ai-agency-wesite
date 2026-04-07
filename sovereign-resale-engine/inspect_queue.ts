import sqlite3 from 'sqlite3';
import fs from 'fs';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/sovereign_v5.db';
const db = new sqlite3.Database(dbPath);

console.log("🛠️ INSPECTING DANGEROUS QUEUE");

db.all(`SELECT id, company_name, email, website FROM leads WHERE status IN ('ready', 'priority_ready') LIMIT 150`, function(err, rows) {
    if (err) console.error(err);
    else {
        let out = '';
        rows.forEach((r: any) => out += `[${r.id}] Name: ${r.company_name} | Email: ${r.email} | URL: ${r.website}\n`);
        fs.writeFileSync('clean_queue_inspection.txt', out, 'utf8');
        console.log("Done");
    }
    db.close();
});
