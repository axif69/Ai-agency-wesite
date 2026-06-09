import { db } from '../GM Events agent/db.js';

async function repairSpecificLeads() {
  console.log('🛠 Repairing broken LinkedIn links...');

  // 1. Fix TII (Technology Innovation Institute)
  db.run(`UPDATE contacts SET 
          contact_name = 'Dr. Najwa Aaraj',
          designation = 'Chief Executive Officer',
          linkedin_url = 'https://www.linkedin.com/in/najwaaaraj/',
          email = 'najwa.aaraj@tii.ae'
          WHERE company_id IN (SELECT id FROM companies WHERE company_name LIKE '%Technology Innovation Institute%')`, (err) => {
    if (!err) console.log('✅ Repaired TII (Dr. Najwa Aaraj)');
  });

  // 2. Fix Lockheed Martin (if broken)
  db.run(`UPDATE contacts SET 
          contact_name = 'James Taiclet',
          designation = 'Chairman, President and CEO',
          linkedin_url = 'https://www.linkedin.com/in/james-taiclet/',
          email = 'james.d.taiclet@lmco.com'
          WHERE company_id IN (SELECT id FROM companies WHERE company_name LIKE '%Lockheed Martin%')`, (err) => {
    if (!err) console.log('✅ Repaired Lockheed Martin');
  });

  console.log('🏁 Data repair complete.');
}

repairSpecificLeads();
