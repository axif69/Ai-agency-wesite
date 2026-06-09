import db from './src/server/db';

async function check() {
  const logs = db.prepare('SELECT * FROM system_logs ORDER BY timestamp DESC LIMIT 5').all();
  console.log('Recent Agent Logs:', JSON.stringify(logs, null, 2));
  
  const leads = db.prepare('SELECT country, COUNT(*) as count FROM leads GROUP BY country').all();
  console.log('Leads by Country:', JSON.stringify(leads, null, 2));
}

check();
