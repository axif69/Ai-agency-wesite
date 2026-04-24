import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, '..', 'sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("--- System Settings ---");
    db.each("SELECT * FROM settings", (err, row) => {
        if (err) console.error(err);
        else console.log(`${row.key}: ${row.value}`);
    });
});
