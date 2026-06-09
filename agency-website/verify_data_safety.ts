import { db } from '../GM Events agent/db.js';

db.serialize(() => {
  db.get(`SELECT count(*) as count FROM companies`, (err, row: any) => {
    if (err) { console.error('Error:', err); process.exit(1); }
    console.log(`✅ DATA IS SAFE: ${row.count} companies found in database.`);
    
    db.get(`SELECT count(*) as count FROM contacts`, (err, contactRow: any) => {
      console.log(`✅ CONTACTS SAFE: ${contactRow.count} contacts found.`);
      process.exit(0);
    });
  });
});
