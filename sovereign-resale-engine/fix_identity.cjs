const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sovereign_resale_v5.db');

const settings = [
    ['COMPANY_NAME', 'Asif Digital Agency'],
    ['REP_NAME', 'Asif Khan'],
    ['company_name', 'Asif Digital Agency'],
    ['rep_name', 'Asif Khan'],
    ['sender_identity', 'Asif Digital Agency'],
    ['company_knowledge', 'We build autonomous AI Sales Engines that discover B2B leads and send personalized cold emails 24/7. Our clients use it to book more meetings without hiring a sales team.'],
    ['pitch_context', 'Would you be open to a 10-minute call to see how this could work for your team?'],
    ['phone', '+971 54 586 6094'],
    ['email', 'digitaldaimond0@gmail.com'],
    ['GROQ_API_KEY', 'YOUR_GROQ_KEY_HERE'],
    ['VITE_GROQ_API_KEY', 'YOUR_GROQ_KEY_HERE'],
];

db.serialize(() => {
    settings.forEach(([key, value]) => {
        db.run(
            'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
            [key, value],
            (err) => {
                if (err) console.error(`Failed to set ${key}:`, err.message);
                else console.log(`✅ Set ${key} = ${value.slice(0, 50)}`);
            }
        );
    });
    setTimeout(() => {
        db.get("SELECT value FROM settings WHERE key = 'COMPANY_NAME'", (err, row) => {
            console.log('\nVerification → COMPANY_NAME:', row?.value);
            db.close();
            console.log('Done. Restart the engine.');
        });
    }, 2000);
});
