/**
 * DB Reset Script — Purges corrupted/stale data for a clean restart
 * 
 * Run this BEFORE starting the agent after system logic rewrites.
 * It clears all leads and drafts so the new pipeline logic processes fresh data.
 * 
 * Usage: npx tsx scripts/reset_db.ts
 */
import { db, initDB } from '../db.js';

async function resetDatabase() {
    await initDB();

    console.log('🧹 Starting Database Reset...\n');

    const counts: Record<string, number> = {};

    // Count current records
    const tables = ['leads', 'outreach_drafts', 'contacts'];
    for (const table of tables) {
        const row: any = await new Promise((res, rej) => 
            db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, r) => err ? rej(err) : res(r))
        );
        counts[table] = row?.count || 0;
        console.log(`   📊 ${table}: ${counts[table]} records`);
    }

    console.log('\n🗑️  Purging corrupted data...\n');

    // Option 1: Full reset — clear everything
    for (const table of tables) {
        await new Promise<void>((res) => db.run(`DELETE FROM ${table}`, () => res()));
        console.log(`   ✅ Cleared: ${table} (${counts[table]} records removed)`);
    }

    // Reset any auto-increment counters
    await new Promise<void>((res) => 
        db.run(`DELETE FROM sqlite_sequence WHERE name IN ('leads', 'outreach_drafts', 'contacts')`, () => res())
    );

    console.log('\n🎯 Database reset complete. Ready for fresh pipeline run.');
    console.log('   Next step: Start the agent with `npm run dev`\n');

    process.exit(0);
}

resetDatabase().catch(err => {
    console.error('❌ Reset failed:', err.message);
    process.exit(1);
});
