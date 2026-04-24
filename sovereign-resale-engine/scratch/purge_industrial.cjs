const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sovereign_resale_v5.db');

const badKeywords = ['construction', 'contracting', 'mep', 'electrical', 'building', 'plumbing', 'mechanical', 'ac repair', 'chiller'];

db.serialize(() => {
    console.log("Cleaning legacy industrial leads...");
    
    db.run("BEGIN TRANSACTION");
    
    badKeywords.forEach(k => {
        db.run("DELETE FROM leads WHERE company_name LIKE ? OR category LIKE ?", [`%${k}%`, `%${k}%`], function(err) {
            if (this.changes > 0) {
                console.log(`Deleted ${this.changes} leads containing "${k}"`);
            }
        });
    });
    
    db.run("COMMIT", () => {
        console.log("Purge complete.");
        db.close();
    });
});
