import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./tri-angle-sovereign-v2/sovereign_v5.db');

db.run(
  "DELETE FROM leads WHERE email IS NULL AND status NOT IN ('sent', 'ready')",
  function(err) {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log(`✅ Deleted ${this.changes} stale no-email leads from the database.`);
    }
    db.close();
  }
);
