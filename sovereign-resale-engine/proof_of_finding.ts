import { findLeads } from './search_service';
import { dbInsertLead, initDB } from './db';

async function proofOfFinding() {
    console.log("🔍 PROOF OF FINDING: Scanning a fresh niche...");
    await initDB();
    const niche = "Cold Room Construction LLC Fujairah";
    
    const { leads, trace } = await findLeads(niche, true);
    console.log(`✅ FOUND ${leads.length} LEADS!`);
    
    let newFound = 0;
    for (const lead of leads.slice(0, 5)) {
        if (await dbInsertLead({ ...lead, category: niche })) {
            console.log(`✨ NEWLY ADDED: ${lead.company_name} (${lead.website})`);
            newFound++;
        } else {
            console.log(`⏭️  SKIPPED (Duplicate): ${lead.company_name}`);
        }
    }
    
    console.log(`\n🎉 PROOF COMPLETE: ${newFound} BRAND NEW companies added to your database.`);
    process.exit(0);
}

proofOfFinding();
