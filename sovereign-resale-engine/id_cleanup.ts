import { db, initDB } from './db.js';
import { enrichCompanyData } from './email_discovery.js';
import { analyzeLeadRelevance } from './personalizer.js';

async function cleanupIdentities() {
    await initDB();
    const genericKeywords = ['supplier', 'contractor', 'services', 'trading', 'mep', 'engineer', 'construction', 'provider', 'solutions', 'manufacturer'];
    
    db.all(`SELECT * FROM leads WHERE status IN ('ready', 'sent')`, async (err, rows: any[]) => {
        const potentialGeneric = rows.filter(r => 
            genericKeywords.some(k => r.company_name.toLowerCase().includes(k))
        );
        
        console.log(`🔍 Found ${potentialGeneric.length} potentially generic leads to verify.`);
        
        for (const lead of potentialGeneric) {
            console.log(`🛠️ Verifying: ${lead.company_name} (${lead.website})`);
            try {
                if (!lead.website || lead.website === 'N/A') continue;
                
                const enrichment = await enrichCompanyData(lead.company_name, lead.website);
                const analysis = await analyzeLeadRelevance(lead.company_name, enrichment.scrapedText || '');
                
                if (analysis.brand_name && analysis.brand_name.length > 3) {
                    const brandCandidate = analysis.brand_name.trim();
                    if (brandCandidate.toLowerCase() !== lead.company_name.toLowerCase()) {
                        console.log(`✅ Corrected: [${lead.company_name}] -> [${brandCandidate}]`);
                        db.run("UPDATE leads SET company_name = ? WHERE id = ?", [brandCandidate, lead.id]);
                    }
                }
                
                // If it's a supplier or manufacturer, demote it to irrelevant
                if (!analysis.is_relevant) {
                    console.log(`🚫 Demoted: [${lead.company_name}] is a competitor/supplier.`);
                    db.run("UPDATE leads SET status = 'irrelevant', is_relevant = 0 WHERE id = ?", [lead.id]);
                }
                
            } catch (e) {
                console.error(`❌ Skip ${lead.company_name}: ${e.message}`);
            }
        }
        console.log("🏁 Identity cleanup finished.");
        process.exit(0);
    });
}

cleanupIdentities();
