import { db, initDB } from './db';
async function run() {
  await initDB();
  db.run("UPDATE leads SET email = null, status = 'new' WHERE company_name LIKE '%ASGC%' OR email = 'asifk199707@gmail.com'", (err) => {
    if (err) console.error(err);
    else console.log('Database sanitized. Test emails removed.');
  });
}
run();
