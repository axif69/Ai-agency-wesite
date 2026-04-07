import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('sovereign_v5.db');
db.all("SELECT * FROM settings", (err, rows) => {
    if (err) console.error(err);
    else console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
});
