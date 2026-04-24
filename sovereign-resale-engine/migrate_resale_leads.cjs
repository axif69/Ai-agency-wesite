const sqlite3 = require('sqlite3').verbose();
const sourceDb = new sqlite3.Database('../tri-angle-sovereign-v2 old/sovereign-resale-engine/sovereign_v5.db');
const targetDb = new sqlite3.Database('sovereign_resale_v5.db');

console.log('Starting deep migration from nested Resale DB...');

sourceDb.all('SELECT company_name, website, domain, email, phone, category, type, location, pitch, status, sent_count FROM leads', (err, rows) => {
    if (err) {
        console.error('Source error:', err);
        return;
    }
    
    console.log(`Found ${rows.length} leads in nested Resale database.`);
    
    let count = 0;
    targetDb.serialize(() => {
        const stmt = targetDb.prepare(`
            INSERT OR IGNORE INTO leads 
            (company_name, website, domain, email, phone, category, type, location, status, sent_count, pitch) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        for (const row of rows) {
            stmt.run(
                row.company_name,
                row.website,
                row.domain,
                row.email,
                row.phone,
                row.category,
                row.type,
                row.location,
                row.status || 'new',
                row.sent_count || 0,
                row.pitch,
                (err) => {
                    if (!err) count++;
                }
            );
        }
        
        stmt.finalize(() => {
            console.log(`Successfully migrated ${count} additional leads from nested Resale DB.`);
            sourceDb.close();
            targetDb.close();
        });
    });
});
