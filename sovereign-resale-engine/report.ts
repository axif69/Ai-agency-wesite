import { db, initDB } from './db';
async function run() {
  await initDB();
  db.all("SELECT status, count(*) as count FROM leads GROUP BY status", (err, rows) => {
    console.log("--- DB STATUS REPORT ---");
    console.log(rows);
    console.log("--- END REPORT ---");
  });
}
run();
