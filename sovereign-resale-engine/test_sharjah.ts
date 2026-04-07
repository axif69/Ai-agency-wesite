import { findLeads, ddgSearch } from './search_service.js';
import { initDB } from './db.js';

async function test() {
    try {
        const query = 'construction companies Sharjah Industrial Area';
        console.log(`\n🚀 TESTING BROAD QUERY: "${query}"`);
        
        const urls = await ddgSearch(query);
        console.log(`\n🌐 Raw URLs found by DDG: ${urls.length}`);
        urls.forEach(u => console.log(`   - ${u}`));
        
        const leads = await findLeads(query);
        console.log(`\n📊 Found ${leads.length} leads total.`);
        
        const targets = ['Intermass', 'Madar', 'Hamad'];
        targets.forEach(t => {
            const found = leads.find(l => l.company_name.toLowerCase().includes(t.toLowerCase()));
            if (found) {
                console.log(`✅ ${t}: FOUND (${found.website})`);
            } else {
                console.log(`❌ ${t}: STILL MISSING`);
            }
        });
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
test();
