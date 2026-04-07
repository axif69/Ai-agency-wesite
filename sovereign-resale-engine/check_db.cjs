
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sovereign_v5.db');

db.all("SELECT * FROM settings WHERE key IN ('PITCH_CONTEXT', 'COMPANY_KNOWLEDGE', 'COMPANY_PROFILE_URL')", (err, rows) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(JSON.stringify(rows, null, 2));
    db.close();
});
