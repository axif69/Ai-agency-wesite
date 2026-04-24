const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sovereign_resale_v5.db');

// These are Tri-Angle industrial keywords — purge any leads with these in their category
const INDUSTRIAL_KEYWORDS = [
    'electrical', 'switchgear', 'panel builder', 'mep contractor', 'cctv', 'elv',
    'cable', 'distribution board', 'lighting contractor', 'plumbing', 'hvac',
    'fire alarm', 'fire fighting', 'civil engineer', 'steel structure',
    'infrastructure contractor', 'epc contractor', 'prefab', 'cold room',
    'cold storage', 'refrigeration', 'swimming pool', 'aluminum & glass',
    'building construction', 'warehouse construction', 'waterproofing',
    'interior fit-out', 'automation & controls', 'data center',
    'commercial kitchen', 'security systems', 'real estate developers uae',
    'automotive', 'bulk import'
];

console.log('Scanning Resale DB for industrial leads to purge...');

db.get('SELECT count(*) as total FROM leads', (err, row) => {
    console.log(`Total leads before purge: ${row.total}`);
    
    const conditions = INDUSTRIAL_KEYWORDS.map(() => `LOWER(category) LIKE ?`).join(' OR ');
    const params = INDUSTRIAL_KEYWORDS.map(k => `%${k}%`);
    
    db.get(`SELECT count(*) as count FROM leads WHERE ${conditions}`, params, (err, countRow) => {
        console.log(`Industrial leads to remove: ${countRow.count}`);
        
        db.run(`DELETE FROM leads WHERE ${conditions}`, params, function(err) {
            if (err) {
                console.error('Error during purge:', err);
            } else {
                console.log(`Successfully deleted ${this.changes} industrial leads.`);
            }
            
            db.get('SELECT count(*) as total FROM leads', (err2, finalRow) => {
                console.log(`Total leads after purge: ${finalRow.total}`);
                console.log('Resale DB is now clean and ready for SaaS/Agency prospecting!');
                db.close();
            });
        });
    });
});
