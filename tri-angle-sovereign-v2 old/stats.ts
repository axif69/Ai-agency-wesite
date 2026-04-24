import { db } from './db.js';

async function checkTodayAnalytics() {
    const today = new Date().toISOString().split('T')[0];
    db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row: any) => {
        console.log(`--- TODAY'S ANALYTICS (${today}) ---`);
        console.log(`EMAILS SENT TODAY: ${row ? row.emails_sent : 0}`);
        
        db.get('SELECT count(*) as total FROM leads WHERE status = "sent"', (err, rowSent: any) => {
            console.log(`TOTAL EMAILS SENT (ALL TIME): ${rowSent.total}`);
            process.exit(0);
        });
    });
}

checkTodayAnalytics();
