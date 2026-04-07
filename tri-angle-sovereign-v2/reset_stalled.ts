import { db } from './db.js';

async function resetFailed() {
    db.run("UPDATE leads SET status = 'ready' WHERE status = 'failed'", (err) => {
        if (err) {
            console.error("❌ Reset failed:", err.message);
        } else {
            console.log("✅ Reset completed. All 'System Error' leads are now 'ready' for outreach.");
        }
        process.exit(0);
    });
}

resetFailed();
