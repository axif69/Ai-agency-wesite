import { db } from '../GM Events agent/db.js';

db.all(`SELECT stage, count(*) as count FROM companies GROUP BY stage`, (err, rows) => {
  if (err) { console.error(err); process.exit(1); }
  console.log('\n--- PIPELINE DISTRIBUTION ---');
  rows.forEach(r => {
    console.log(`${r.stage.toUpperCase().padEnd(15)}: ${r.count}`);
  });
  
  db.get(`SELECT count(*) as count FROM contacts`, (err, row: any) => {
    console.log(`${'CONTACTS'.padEnd(15)}: ${row.count}`);
    console.log('-----------------------------\n');
    process.exit(0);
  });
});
