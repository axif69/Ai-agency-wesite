import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('C:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/sovereign_resale_v5.db');

const db = new sqlite3.Database(dbPath);

console.log('🧼 Resetting PITCH_CONTEXT to ensure no prompt residue...');

const sanePitch = "Our agency builds autonomous AI agents that find leads, analyze their websites, and handle initial outreach automatically to scale your pipeline.";

db.run("UPDATE settings SET value = ? WHERE key = 'PITCH_CONTEXT'", [sanePitch], (err) => {
    if (err) {
        console.error('❌ Reset failed:', err.message);
    } else {
        console.log('✅ PITCH_CONTEXT reset to elite baseline.');
    }
    db.close();
});
