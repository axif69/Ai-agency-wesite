import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('sovereign_v5.db');
db.serialize(() => {
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('EMAIL_USER', 'digitaldaimond0@gmail.com')");
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('GMAIL_APP_PASS', 'pphm nyop kwoi etme')");
    console.log("✅ Database manually updated with new credentials.");
    process.exit(0);
});
