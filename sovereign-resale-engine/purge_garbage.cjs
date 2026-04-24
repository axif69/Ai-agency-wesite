const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

console.log("🧹 [DB-PURGE] Cleaning up garbage data...");

db.serialize(() => {
    // 1. Delete leads with 'N/A' company name or 'N/A' website
    db.run("DELETE FROM leads WHERE company_name = 'N/A' OR company_name = 'uae business entity' OR website = 'N/A' OR website IS NULL", function(err) {
        if (err) console.error("❌ Purge Error:", err.message);
        else console.log(`✅ Removed ${this.changes} garbage leads.`);
    });

    // 2. Reset leads that were stuck in 'no_email' but might have valid websites
    db.run("UPDATE leads SET status = 'new' WHERE status = 'no_email' AND website != 'N/A' AND website IS NOT NULL", function(err) {
        if (err) console.error("❌ Reset Error:", err.message);
        else console.log(`✅ Reset ${this.changes} leads for re-enrichment.`);
    });
});

db.close();
