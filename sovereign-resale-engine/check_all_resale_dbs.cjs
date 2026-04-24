const sqlite3 = require('sqlite3').verbose();

const databases = [
    'C:/Users/USER/Desktop/Asif Agency Website/AI AGENT NEW CURSOR/tri-angle-sovereign-v2/sovereign_resale_v5.db',
    'C:/Users/USER/Desktop/Asif Agency Website/sovereign-resale-engine (2)/sovereign-resale-engine/sovereign_resale_v5.db',
    'C:/Users/USER/Desktop/Asif Agency Website/sovereign-resale-engine (2)/sovereign-resale-engine/backup_corrupted/sovereign_resale_v5.db',
    'sovereign_resale_v5.db', // current working one
];

async function checkDb(path) {
    return new Promise((resolve) => {
        const db = new sqlite3.Database(path, sqlite3.OPEN_READONLY, (err) => {
            if (err) return resolve({ path, error: err.message });
        });

        db.get('SELECT count(*) as count FROM leads', (err, countRow) => {
            if (err) {
                db.close();
                return resolve({ path, error: err.message });
            }

            db.all('SELECT DISTINCT category FROM leads ORDER BY category LIMIT 30', (err2, rows) => {
                db.close();
                resolve({
                    path,
                    count: countRow.count,
                    sample_categories: (rows || []).map(r => r.category)
                });
            });
        });
    });
}

(async () => {
    for (const dbPath of databases) {
        const result = await checkDb(dbPath);
        console.log('\n====================================');
        console.log('DB:', result.path);
        if (result.error) {
            console.log('ERROR:', result.error);
        } else {
            console.log('LEADS:', result.count);
            console.log('SAMPLE CATEGORIES:');
            result.sample_categories.forEach(c => console.log(' -', c));
        }
    }
    console.log('\n====================================');
    console.log('DONE');
})();
