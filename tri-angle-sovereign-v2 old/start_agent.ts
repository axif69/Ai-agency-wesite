#!/usr/bin/env ts-node
/**
 * TRI-ANGLE Sovereign v17.0 — Sales Agent Launcher
 * Starts the autonomous sales closing engine with full logging
 */

import { spawn } from 'child_process';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`
╔════════════════════════════════════════════════════════════════╗
║     TRI-ANGLE SOVEREIGN v17.0 — SALES CLOSING ENGINE          ║
║                    Starting up...                              ║
╚════════════════════════════════════════════════════════════════╝
`);

// Pre-flight checks
const db = new sqlite3.Database('./sovereign_v5.db');

console.log('📊 Pre-flight Diagnostics:');
console.log('─'.repeat(60));

db.all(`
  SELECT
    (SELECT COUNT(*) FROM leads WHERE status = 'ready' OR status = 'priority_ready') as ready_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'new' AND email IS NULL) as new_leads_no_email,
    (SELECT COUNT(*) FROM leads WHERE sent_count = 0) as unsent_total,
    (SELECT COUNT(*) FROM leads WHERE sent_count = 1) as sent_once,
    (SELECT COUNT(*) FROM leads WHERE sent_count = 2) as sent_twice,
    (SELECT COUNT(*) FROM replies WHERE sentiment = 'pending') as pending_replies,
    (SELECT COUNT(*) FROM outreach) as total_outreach,
    COALESCE((SELECT emails_sent FROM analytics WHERE date = date('now')), 0) as emails_sent_today
`, (err, rows) => {
  if (err) {
    console.error('❌ Database error:', err.message);
    process.exit(1);
  }

  const stats = rows?.[0];
  console.log(`✅ Ready to send: ${stats?.ready_leads || 0} leads`);
  console.log(`📝 Awaiting enrichment: ${stats?.new_leads_no_email || 0} leads`);
  console.log(`📧 Total unsent: ${stats?.unsent_total || 0} leads`);
  console.log(`✔️  Sent once: ${stats?.sent_once || 0} leads`);
  console.log(`✔️✔️  Sent twice: ${stats?.sent_twice || 0} leads`);
  console.log(`💬 Pending replies: ${stats?.pending_replies || 0}`);
  console.log(`📊 Total outreach events: ${stats?.total_outreach || 0}`);
  console.log(`📈 Emails sent today: ${stats?.emails_sent_today || 0} / 250`);
  console.log('─'.repeat(60));

  // Sample of companies to be contacted
  db.all(`
    SELECT company_name, website, email, status
    FROM leads
    WHERE sent_count = 0
    LIMIT 5
  `, (err, rows) => {
    if (rows && rows.length > 0) {
      console.log('\n🎯 Sample companies ready for outreach:');
      rows.forEach((row: any) => {
        console.log(`   • ${row.company_name} → ${row.email}`);
      });
    }

    console.log('\n🚀 Launching worker process...\n');
    db.close();

    // Start the worker
    const worker = spawn('npx', ['ts-node', 'worker.ts'], {
      cwd: __dirname,
      stdio: 'inherit',
    });

    worker.on('error', (err) => {
      console.error('❌ Worker error:', err);
      process.exit(1);
    });

    worker.on('exit', (code) => {
      console.error(`\n⚠️  Worker exited with code ${code}`);
      process.exit(code || 1);
    });

    // Keep parent process alive
    process.on('SIGINT', () => {
      console.log('\n\n🛑 Shutting down gracefully...');
      worker.kill('SIGTERM');
      setTimeout(() => {
        console.log('Goodbye!');
        process.exit(0);
      }, 2000);
    });
  });
});
