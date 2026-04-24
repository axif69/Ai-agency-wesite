#!/usr/bin/env ts-node
/**
 * Real-time monitoring dashboard for the sales agent
 * Run in a separate terminal to monitor agent activity
 */

import sqlite3 from 'sqlite3';
import { spawn } from 'child_process';

const db = new sqlite3.Database('./sovereign_v5.db');

function clearScreen() {
  console.clear();
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║        TRI-ANGLE SOVEREIGN — REAL-TIME DASHBOARD              ║
║                    ${new Date().toLocaleTimeString()}                           ║
╚════════════════════════════════════════════════════════════════╝
  `);
}

function updateDashboard() {
  clearScreen();

  // Overall stats
  db.all(`
    SELECT
      (SELECT COUNT(*) FROM leads WHERE status IN ('ready', 'priority_ready')) as ready_leads,
      (SELECT COUNT(*) FROM leads WHERE status = 'new' AND email IS NULL) as new_no_email,
      (SELECT COUNT(*) FROM leads WHERE sent_count = 0) as unsent,
      (SELECT COUNT(*) FROM leads WHERE sent_count = 1) as sent_once,
      (SELECT COUNT(*) FROM leads WHERE sent_count = 2) as sent_twice,
      (SELECT COUNT(*) FROM replies WHERE sentiment = 'pending') as pending_replies,
      (SELECT COUNT(*) FROM replies WHERE sentiment = 'positive') as positive_replies,
      COALESCE((SELECT emails_sent FROM analytics WHERE date = date('now')), 0) as today_sent
  `, (err, rows) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    const stats = rows?.[0];
    const todaySent = stats?.today_sent || 0;
    const todayRemaining = Math.max(0, 250 - todaySent);

    console.log('📊 QUEUE STATUS');
    console.log('─'.repeat(60));
    console.log(`Ready to send.........: ${stats?.ready_leads || 0} leads`);
    console.log(`Awaiting enrichment...: ${stats?.new_no_email || 0} leads`);
    console.log(`Total unsent.........: ${stats?.unsent || 0} leads`);
    console.log(`Already sent (1x).....: ${stats?.sent_once || 0} leads`);
    console.log(`Already sent (2x).....: ${stats?.sent_twice || 0} leads`);

    console.log('\n📧 EMAIL CAPACITY');
    console.log('─'.repeat(60));
    const capacity = Math.round((todaySent / 250) * 100);
    const bar = '█'.repeat(Math.floor(capacity / 5)) + '░'.repeat(20 - Math.floor(capacity / 5));
    console.log(`Daily limit usage: ${bar} ${todaySent}/250`);
    console.log(`Remaining capacity: ${todayRemaining} emails`);

    console.log('\n💬 REPLY INSIGHTS');
    console.log('─'.repeat(60));
    console.log(`Pending analysis.....: ${stats?.pending_replies || 0} replies`);
    console.log(`Positive responses...: ${stats?.positive_replies || 0} replies 🔥`);

    // Recent activity
    db.all(`
      SELECT company_name, email, pitch, last_contacted, sent_count
      FROM leads
      WHERE sent_count > 0
      ORDER BY last_contacted DESC
      LIMIT 5
    `, (err, rows) => {
      console.log('\n✅ RECENT OUTREACH');
      console.log('─'.repeat(60));
      if (rows && rows.length > 0) {
        rows.forEach((row: any) => {
          const status = row.sent_count === 1 ? '📬 Sent' : '📬📬 Follow-up';
          const time = new Date(row.last_contacted).toLocaleTimeString();
          console.log(`${status} → ${row.company_name} (${time})`);
        });
      } else {
        console.log('No recent activity yet...');
      }

      console.log('\n' + '═'.repeat(60));
      console.log('Auto-refreshing every 10 seconds (Ctrl+C to exit)');
    });
  });
}

// Initial update
updateDashboard();

// Update every 10 seconds
setInterval(updateDashboard, 10000);

// Cleanup
process.on('SIGINT', () => {
  console.log('\n\nClosing dashboard...');
  db.close();
  process.exit(0);
});
