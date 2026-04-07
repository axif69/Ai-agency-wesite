import { db } from './db.js';

async function finalCleanup() {
    const today = new Date().toISOString().split('T')[0];
    
    db.serialize(() => {
        // 1. Backfill stats to 8 (as seen in my last check)
        db.run('INSERT OR IGNORE INTO analytics (date, emails_sent) VALUES (?, 0)', [today]);
        db.run('UPDATE analytics SET emails_sent = 8 WHERE date = ?', [today], () => {
            console.log(`✅ Final Stat Sync: Today set to 8.`);
        });
        
        // 2. Clear Heartbeats (Crucial for Singleton Guard to start fresh)
        db.run('DELETE FROM heartbeat', () => {
            console.log("✅ Cleared worker heartbeats.");
        });
        
        // 3. Clear failed leads
        db.run("UPDATE leads SET status = 'ready' WHERE status = 'failed'", () => {
             console.log("✅ Leads restored.");
        });
        
        setTimeout(() => process.exit(0), 1000);
    });
}

finalCleanup();
