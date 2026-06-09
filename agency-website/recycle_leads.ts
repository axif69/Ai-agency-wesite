import { db } from '../GM Events agent/db.js';

db.run(`UPDATE companies SET stage = 'discovered' WHERE stage = 'rejected'`, function(this: any, err: any) {
  if (err) { console.error('Error:', err); process.exit(1); }
  console.log(`✅ Recycled ${this.changes} rejected companies. Stage 3 will now re-categorize them with looser rules.`);
  process.exit(0);
});
