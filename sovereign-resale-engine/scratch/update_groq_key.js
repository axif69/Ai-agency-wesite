import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = path.resolve(__dirname, '..', 'sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

const NEW_GROQ_KEY = 'YOUR_GROQ_KEY_HERE';

const updates = [
  ['GROQ_API_KEY', NEW_GROQ_KEY],
  ['groq_api_key', NEW_GROQ_KEY],
  ['VITE_GROQ_API_KEY', NEW_GROQ_KEY],
];

db.serialize(() => {
  for (const [key, value] of updates) {
    db.run(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`, [key, value], function(err) {
      if (err) console.error(`Failed to set ${key}:`, err.message);
      else console.log(`✅ Updated ${key} in DB`);
    });
  }
  console.log('\n✅ New Groq API key saved to database.\n');
});

setTimeout(() => db.close(), 1000);
