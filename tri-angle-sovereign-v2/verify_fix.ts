import { db, initDB } from './db.js';

async function verify() {
    await initDB();
    db.all("SELECT id, company_name, email, website, status, is_relevant FROM leads WHERE website LIKE '%vangroup%' OR company_name LIKE '%Van Group%' OR company_name LIKE '%Sandwich Panel%'", (err, rows) => {
        if (err) console.error(err);
        console.log("--- VERIFICATION RESULTS ---");
        console.log(JSON.stringify(rows, null, 2));

        db.get("SELECT COUNT(*) as count FROM leads WHERE is_relevant = 0 AND (company_name LIKE '%Supplier%' OR company_name LIKE '%Manufacturer%')", (err, row: any) => {
            console.log(`--- VENDOR REJECTION STATS: ${row?.count || 0} suppliers blocked. ---`);
            process.exit(0);
        });
    });
}

verify();
