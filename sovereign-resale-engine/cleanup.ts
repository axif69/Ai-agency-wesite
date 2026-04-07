import { db } from './db';

db.run(`
    DELETE FROM leads 
    WHERE website LIKE '%hidubai.com%' 
       OR website LIKE '%easyuae.com%' 
       OR website LIKE '%yellowpages-uae.com%' 
       OR website LIKE '%atninfo.com%' 
       OR website LIKE '%yello.ae%' 
       OR website LIKE '%dubaibizdirectory.com%' 
       OR website LIKE '%directory%'
       OR website LIKE '%kompass.com%'
`, function(err) {
    if (err) {
        console.error("Cleanup error:", err.message);
    } else {
        console.log(`🧹 Cleanup complete. Deleted ${this.changes} forbidden directory leads from the database.`);
    }
});
