import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("DELETE FROM leads WHERE status != 'sent' AND status != 'sent_followup'", function(err) {
        if (err) console.error(err);
        else console.log(`SUCCESS: Wiped ${this.changes} unprocessed leads. Fresh start initiated.`);
    });
    db.close();
});
