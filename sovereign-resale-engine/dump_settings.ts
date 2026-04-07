import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'sovereign_v5.db');
const db = new sqlite3.Database(dbPath);

console.log("--- SYSTEM SETTINGS DUMP ---");
db.all("SELECT * FROM settings", (err, rows) => {
    if (err) {
        console.error("Error reading settings:", err);
    } else {
        rows.forEach(row => {
            console.log(`[${row.key}]: ${row.value?.slice(0, 500)}${row.value?.length > 500 ? '...' : ''}`);
        });
    }
    db.close();
});
