import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/tri-angle-sovereign-v2/sovereign_v5.db';
const db = new sqlite3.Database(dbPath);

console.log("🛠️ FINAL SECURITY AUDIT: VENDORS AND AUTO PARTS");

db.serialize(() => {
    // 1. Audit current 'ready' and 'priority_ready' leads
    db.all(`SELECT id, company_name, email, status FROM leads WHERE status IN ('ready', 'priority_ready')`, (err, rows) => {
        if (err) return console.error(err);
        
        const keywords = ['ghalib', 'spare parts', 'auto parts', 'trading', 'spare', 'switchgear', 'transformers', 'cable manufacturers'];
        const badLeads = rows.filter((r: any) => 
            keywords.some(kw => (r.company_name || '').toLowerCase().includes(kw))
        );
        
        console.log(`Found ${badLeads.length} potentially dangerous leads currently in queue.`);
        badLeads.forEach((l: any) => console.log(`[BLOCKING] ID: ${l.id} | Name: ${l.company_name} | Email: ${l.email}`));
        
        if (badLeads.length > 0) {
            const ids = badLeads.map((l: any) => l.id);
            db.run(`UPDATE leads SET status = 'unsafe' WHERE id IN (${ids.join(',')})`, function(err) {
                console.log(`✅ Permanently blocked ${this.changes} vendor/auto-parts leads from sending.`);
            });
        }
        db.close();
    });
});
