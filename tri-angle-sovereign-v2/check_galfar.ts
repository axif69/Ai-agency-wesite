import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('sovereign_v5.db');

db.all(`SELECT id, company_name, email, website, status, is_relevant, analysis_notes, category FROM leads WHERE company_name LIKE '%alfar%' OR company_name LIKE '%Galfar%'`, (err, rows: any[]) => {
    if (err) { console.error(err); db.close(); return; }
    if (!rows || rows.length === 0) { console.log('No Galfar leads found'); db.close(); return; }
    for (const r of rows) {
        console.log('\n=== GALFAR LEAD ===');
        console.log('ID:', r.id);
        console.log('Name:', r.company_name);
        console.log('Email:', r.email);
        console.log('Website:', r.website);
        console.log('Status:', r.status);
        console.log('is_relevant:', r.is_relevant);
        console.log('Notes:', r.analysis_notes);
        console.log('Category:', r.category);

        // Simulate isSafeLead check
        const d = (r.website || '').toLowerCase();
        const e = (r.email || '').toLowerCase();
        const name = (r.company_name || '').toLowerCase();
        
        const bad = [
            'news', 'media', 'publisher', 'real estate', 'property', 'research', 'academic',
            'professor', 'student', 'directory', 'portal', 'zawya', 'yellowpages', 'muqawlat',
            'hidubai', 'yello.ae', 'atninfo', 'dial4trade', 'dubizzle', 'magazine', 'events',
            'tenders', 'blog', 'offplan', 'developer', 'no.1', 'timeout', 'khaleej', 'gulfnews',
            'classified', 'job', 'vacancy', 'career', 'exhibition', 'summit', 'conference',
            'switchgear', 'electrical trading', 'electrical supplier', 'cable manufacturer',
            'transformer', 'electrical store', 'electrical wholesale', 'breakers', 'distribution boards',
            'auto parts', 'spare parts', 'garage', 'rent a car', 'salon', 'clinic', 'medical',
            'hospital', 'pharmacy', 'laundry', 'restaurant', 'cafe', 'grocery', 'supermarket'
        ];
        
        const trigger = bad.find(t => d.includes(t) || name.includes(t) || e.includes(t));
        if (trigger) {
            console.log(`\n❌ BLOCKED BY isSafeLead! Triggered by keyword: "${trigger}"`);
            console.log(`   Matched in: ${d.includes(trigger) ? 'WEBSITE' : name.includes(trigger) ? 'NAME' : 'EMAIL'}`);
        } else if (r.is_relevant === 0) {
            console.log(`\n❌ BLOCKED BY is_relevant === 0 (AI marked as irrelevant)`);
        } else {
            console.log(`\n✅ Would PASS isSafeLead filter`);
        }
    }
    db.close();
});
