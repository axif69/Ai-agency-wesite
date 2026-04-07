import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/outreach_v2.db');

db.get('SELECT COUNT(*) as count FROM sent_emails WHERE date(timestamp) = date("now")', (err1, row1) => {
    db.all('SELECT id, company_name, email, status, is_relevant FROM leads WHERE status="ready" LIMIT 20', (err2, rows) => {
        console.log("--- WORKER DIAGNOSTIC ---");
        console.log("SENT TODAY:", row1 ? row1.count : 0);
        console.log("READY LEADS IN QUEUE:", rows ? rows.length : 0);
        
        const alfurat = rows?.find(r => r.company_name.toLowerCase().includes('alfurat') || (r.email || '').includes('alfurat'));
        if (alfurat) {
            console.log("FOUND AL FURAT IN QUEUE:", JSON.stringify(alfurat, null, 2));
            const index = rows.indexOf(alfurat);
            console.log(`POSITION IN QUEUE: ${index + 1}`);
        } else {
            console.log("AL FURAT NOT IN THE TOP 20 'READY' LEADS.");
        }
        
        db.close();
    });
});
