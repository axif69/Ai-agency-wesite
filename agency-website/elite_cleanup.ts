import { db } from '../GM Events agent/db.js';

async function deepCleanup() {
  console.log('🧹 Starting Elite Cleanup...');

  // 1. Delete Logistics & Transport False Positives
  db.run(`DELETE FROM companies WHERE 
          company_name LIKE '%Logistics%' OR 
          company_name LIKE '%Transport%' OR 
          company_name LIKE '%Supply Service%' OR 
          category = 'Logistics'`, (err) => {
    if (!err) console.log('✅ Purged Logistics/Transport leads.');
  });

  // 2. Delete contacts associated with deleted companies
  db.run(`DELETE FROM contacts WHERE company_id NOT IN (SELECT id FROM companies)`, (err) => {
    if (!err) console.log('✅ Cleaned up orphan contacts.');
  });

  // 3. Reset the "Verified Leads" list to only show the BEST ones
  // We will mark companies that don't have a valid person as 'complete' (hide from verified)
  db.run(`UPDATE companies SET stage = 'complete' 
          WHERE stage = 'contacts_found' 
          AND id NOT IN (SELECT company_id FROM contacts WHERE contact_name != 'Corporate HQ')`, (err) => {
    if (!err) console.log('✅ Hidden generic leads from Verified list.');
  });

  console.log('🏁 Elite Cleanup Complete.');
}

deepCleanup();
