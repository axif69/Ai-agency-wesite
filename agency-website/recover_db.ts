import { db } from '../GM Events agent/db.js';

async function recoverDatabase() {
  console.log('🔄 Recovery Started...');

  // 1. Check what is actually in the database
  db.all("SELECT stage, COUNT(*) as count FROM companies GROUP BY stage", (err, rows) => {
    console.log('Current Database Counts:', rows);
  });

  // 2. If counts are 0, we need to re-import the backup
  // But first, let's try to see if they were just marked as 'REJECT'
  db.run("UPDATE companies SET stage = 'discovered' WHERE stage = 'REJECT'", (err) => {
    if (!err) console.log('✅ Restored rejected leads to discovered.');
  });

  console.log('🏁 Recovery Script Finished.');
}

recoverDatabase();
