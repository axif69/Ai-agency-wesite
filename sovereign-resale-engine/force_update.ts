import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('sovereign_v5.db');

db.serialize(() => {
    db.run("DELETE FROM settings WHERE key='EMAIL_USER'");
    db.run("DELETE FROM settings WHERE key='GMAIL_APP_PASS'");
    db.run("INSERT INTO settings (key, value) VALUES ('EMAIL_USER', 'digitaldaimond0@gmail.com')");
    db.run("INSERT INTO settings (key, value) VALUES ('GMAIL_APP_PASS', 'pphm nyop kwoi etme')");
    
    db.all("SELECT * FROM settings WHERE key IN ('EMAIL_USER', 'GMAIL_APP_PASS')", (err, rows) => {
        if (err) console.error("Read Error:", err);
        else console.log("Current state in DB:", JSON.stringify(rows, null, 2));
        process.exit(0);
    });
});
