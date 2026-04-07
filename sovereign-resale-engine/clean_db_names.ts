import sqlite3 from 'sqlite3';
const db = new (sqlite3.verbose().Database)('./sovereign_v5.db');

function cleanName(raw: string): string {
    if (!raw) return '';
    let name = raw;
    name = name.split(/[\|–—\/]/)[0].trim();
    name = name.replace(/^(welcome to|leading|the best|best|top|expert in|standard|official|buy|cheap|affordable|premium|trusted|certified|licensed|quality|professional|since 19\d{2}|since 20\d{2}|over \d+ years?\s*\w*)\s*/gi, '');
    name = name.replace(/\s+(in\s+)?(dubai|abu\s?dhabi|sharjah|ajman|uae|rak|fujairah|al\s?ain|saudi|gcc|middle\s?east|qatar|oman|bahrain)$/gi, '');
    name = name.replace(/\s*(company|supplier|distributor|dealer|manufacturer|provider|services?|solutions?|installation|expertise|contractor|trading|enterprises?)$/gi, '');
    name = name.replace(/\s*[-–—,&|:]\s*$/, '').trim();
    if (name.length < 3) name = raw.split(/[-–—,]/)[0].trim();
    return name;
}

db.all('SELECT id, company_name FROM leads', (err, rows: any[]) => {
    if (err) { console.error(err); return; }
    let updated = 0;
    const stmt = db.prepare('UPDATE leads SET company_name = ? WHERE id = ?');
    
    for (const row of rows) {
        const cleaned = cleanName(row.company_name);
        if (cleaned !== row.company_name) {
            stmt.run(cleaned, row.id);
            console.log(`  ✏️  "${row.company_name}" → "${cleaned}"`);
            updated++;
        }
    }
    
    stmt.finalize(() => {
        console.log(`\n✅ Cleaned ${updated} / ${rows.length} company names in database.`);
        db.close();
    });
});
