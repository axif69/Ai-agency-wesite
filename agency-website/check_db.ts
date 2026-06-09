import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('../GM Events agent/defense_intel.db');

db.all("SELECT stage, COUNT(*) as count FROM companies GROUP BY stage", (err, rows) => {
  if (err) console.error(err);
  console.log('Database Status:', rows);
  db.close();
});
