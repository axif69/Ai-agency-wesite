import { db } from '../GM Events agent/db.js';

// 1. Recycle everything that isn't a high-quality contact yet
db.run(`UPDATE companies SET stage = 'discovered' WHERE stage IN ('contacts_found', 'complete', 'rejected')`, function(this: any, err: any) {
  if (err) { console.error(err); process.exit(1); }
  console.log(`✅ Recycled ${this.changes} leads back to Stage 3 for re-evaluation.`);
  
  // 2. Clear old contacts so we don't have duplicates
  db.run(`DELETE FROM contacts`, (err) => {
     console.log('✅ Purged old generic contacts. Ready for High-Intel hunt.');
     process.exit(0);
  });
});
