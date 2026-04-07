import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/tri-angle-sovereign-v2/sovereign_v5.db';
const db = new sqlite3.Database(dbPath);

console.log("🛠️ EMERGENCY DATABASE PURGE INITIATED");

const badKeywords = [
    '%directory%', '%portal%', '%magazine%', '%news%', '%events%', '%tenders%',
    '%publisher%', '%blog%', '%offplan%', '%real estate%', '%developer in dubai%',
    '%no.1 solution%', '%data center hawk%', '%timeout%', '%timeoutdubai%',
    '%whatson%', '%khaleej%', '%gulfnews%', '%supplier in dubai%', '%&amp; sell property%'
];

db.serialize(() => {
    let queries = 0;
    for (const kw of badKeywords) {
        db.run(`UPDATE leads SET status = 'unsafe' WHERE company_name LIKE ? OR website LIKE ?`, [kw, kw], function(err) {
            if (!err && this.changes > 0) {
                console.log(`✅ Purged ${this.changes} leads containing bad keyword: ${kw}`);
            }
            queries++;
            if (queries === badKeywords.length) db.close();
        });
    }
});
