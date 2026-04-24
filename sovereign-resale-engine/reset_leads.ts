import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');

const db = new sqlite3.Database(dbPath);

console.log("🛠️ Aligining all leads to the new Humanized Pitch Tone...");

// 1. Reset all leads that are 'ready' or 'sent' back to 'ready'
// This ensures they are all re-processed with the latest prompt logic.
db.serialize(() => {
    // Reset analytics for today to allow re-sending if needed
    const today = new Date().toISOString().split('T')[0];
    db.run("DELETE FROM analytics WHERE date = ?", [today], (err) => {
        if (err) console.error("❌ Error resetting analytics:", err.message);
        else console.log("✅ Daily analytics reset for fresh start.");
    });

    // Reset leads: 'sent' -> 'ready', reset counts
    db.run(
        "UPDATE leads SET status = 'ready', sent_count = 0, last_contacted = NULL WHERE status IN ('ready', 'sent', 'priority_ready') AND email IS NOT NULL", 
        function(err) {
            if (err) {
                console.error("❌ Error aligning leads:", err.message);
            } else {
                console.log(`✅ SUCCESS: ${this.changes} leads aligned and moved to READY queue.`);
            }
            db.close();
            process.exit(0);
        }
    );
});
