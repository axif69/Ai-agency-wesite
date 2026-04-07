import sqlite3 from 'sqlite3';

const dbPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/sovereign-resale-engine/sovereign_v5.db';
const db = new sqlite3.Database(dbPath);

db.all("SELECT id, company_name, email, status, is_relevant, last_contacted FROM leads WHERE company_name LIKE '%Furat%'", (err, rows) => {
    console.log("AL FURAT DB STATUS:");
    console.log(JSON.stringify(rows, null, 2));
    
    // Test the isSafeLead function
    const isSafeLead = (lead: any): boolean => {
        const d = (lead.website || '').toLowerCase();
        const e = (lead.email || '').toLowerCase();
        const forbiddenDomains = ['.edu', '.gov', '.org', 'researchgate', 'academia.edu', 'wikipedia', 'github.com', 'microsoft.com', 'google.com', 'scientific', 'journal'];
        if (forbiddenDomains.some(t => d.includes(t) || e.includes(t))) return false;
        
        const name = (lead.company_name || '').toLowerCase();
        if (name.length < 3 || name.startsWith('http') || name.startsWith('www') || name.includes('.com')) return false;
        
        const bad = ['news', 'media', 'publisher', 'real estate', 'property', 'research', 'academic', 'professor', 'student'];
        return !bad.some(t => d.includes(t) || name.includes(t) || e.includes(t));
    };
    
    if (rows && rows.length > 0) {
        console.log("IS SAFE LEAD?", isSafeLead(rows[0]));
    }
    db.close();
});
