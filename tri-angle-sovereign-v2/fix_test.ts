import { db, initDB } from './db';
async function run() {
  await initDB();
  db.run("UPDATE leads SET status = 'ready', email = 'asifk199707@gmail.com', pitch = null WHERE company_name LIKE '%ASGC%'", (err) => {
    if (err) console.error(err);
    else console.log('ASGC reset successfully.');
  });
}
run();
