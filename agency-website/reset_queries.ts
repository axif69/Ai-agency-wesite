import { db } from '../GM Events agent/db.js';

db.run(`DELETE FROM pipeline_progress WHERE status = 'completed'`, function(this: any, err: any) {
  if (err) { console.error('Error:', err); process.exit(1); }
  console.log(`✅ Cleared ${this.changes} old completed queries. Discovery will re-scan all countries × pillars.`);
  process.exit(0);
});
