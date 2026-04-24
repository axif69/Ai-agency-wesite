import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('auto_discovery', 'true')");
    db.all("SELECT * FROM settings", (err, rows) => {
        if (err) console.error(err);
        else console.log("Final Settings:", rows);
    });
    db.close();
});
