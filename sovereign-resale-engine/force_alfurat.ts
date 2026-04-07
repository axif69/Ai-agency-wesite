import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/sovereign_v5.db';
const db = new sqlite3.Database(dbPath);

console.log("🛠️ FORCE AL FURAT TO FRONT");

db.serialize(() => {
    db.run(`UPDATE leads SET status = 'priority_ready' WHERE company_name LIKE '%Furat%'`, function(err) {
        if (err) console.error(err);
        else console.log(`✅ Reset Al Furat to 'priority_ready'. Rows affected: ${this.changes}`);
    });
});
