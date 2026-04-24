import { initDB } from './db.js';
import { db } from './db.js';

async function migrate() {
    console.log("🚀 STARTING ONE-TIME SCHEMA MIGRATION...");
    await initDB();
    console.log("⏳ Waiting 3 seconds for async ALTER TABLE commands...");
    await new Promise(r => setTimeout(r, 3000));
    console.log("✅ MIGRATION TRIGGERED.");
    db.close();
    process.exit(0);
}

migrate();
