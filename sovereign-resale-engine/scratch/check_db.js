const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sovereign_resale_v5.db');

db.all("SELECT status, count(*) as count FROM leads GROUP BY status", (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Lead Status Counts:");
    rows.forEach(row => {
        console.log(`${row.status}: ${row.count}`);
    });
    db.close();
});
