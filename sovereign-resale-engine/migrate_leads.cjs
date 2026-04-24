const sqlite3 = require('sqlite3').verbose();
const sourceDb = new sqlite3.Database('sovereign_v5.db');
const targetDb = new sqlite3.Database('sovereign_resale_v5.db');

console.log('Starting migration...');

sourceDb.all('SELECT company_name, website, domain, email, phone, category, type, location FROM leads', (err, rows) => {
    if (err) {
        console.error('Source error:', err);
        return;
    }
    
    console.log(`Found ${rows.length} leads in source database.`);
    
    let count = 0;
    targetDb.serialize(() => {
        const stmt = targetDb.prepare('INSERT OR IGNORE INTO leads (company_name, website, domain, email, phone, category, type, location, status, sent_count, pitch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "new", 0, NULL)');
        
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
                (err) => {
                    if (!err) count++;
                }
            );
        }
        
        stmt.finalize(() => {
            console.log(`Successfully migrated ${count} unique leads to Resale DB.`);
            sourceDb.close();
            targetDb.close();
        });
    });
});
