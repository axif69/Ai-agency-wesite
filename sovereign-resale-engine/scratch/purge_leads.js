import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../sovereign_resale_v5.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    const query = `
        DELETE FROM leads 
        WHERE LOWER(company_name) LIKE '%construction%' 
           OR LOWER(company_name) LIKE '%contracting%' 
           OR LOWER(company_name) LIKE '%mep%' 
           OR LOWER(company_name) LIKE '%engineering%' 
           OR LOWER(niche) LIKE '%contracting%' 
           OR LOWER(niche) LIKE '%electrical%' 
           OR LOWER(niche) LIKE '%electromechanical%'
           OR LOWER(niche) LIKE '%mep%'
    `;
    
    db.run(query, function(err) {
        if (err) console.error(err);
        else console.log(`Successfully purged ${this.changes} industrial/construction leads.`);
    });

    db.close();
});
