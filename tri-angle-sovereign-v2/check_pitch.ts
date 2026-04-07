import { db, initDB } from './db';
async function run() {
  await initDB();
  db.get("SELECT pitch FROM leads WHERE company_name LIKE '%Wade Adams%'", (err, row: any) => {
    if (row) {
        console.log("--- PITCH START ---");
        console.log(row.pitch);
        console.log("--- PITCH END ---");
    } else {
        console.log("Lead not found.");
    }
  });
}
run();
