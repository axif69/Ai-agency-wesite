import { analyzeLeadRelevance, personalizeDeepOutreach } from './personalizer';
import dotenv from 'dotenv';
dotenv.config();

const testSites = [
    {
        name: "Al Furat Group",
        text: "We are a leading MEP contracting company in Dubai specializing in electrical, plumbing and HVAC systems for high-rise buildings."
    },
    {
        name: "Aisha's Organic Bakery",
        text: "Welcome to our organic bakery! We sell the best sourdough bread, cakes, and pastries in Sharjah. Come visit our shop for a fresh coffee."
    }
];

async function runTest() {
    console.log("🚀 STARTING SOVEREIGN v21.0 INTELLIGENCE TEST...");
    
    for (const site of testSites) {
        console.log(`\n🔍 ANALYZING: ${site.name}...`);
        const analysis = await analyzeLeadRelevance(site.name, site.text);
        
        if (analysis.is_relevant) {
            console.log(`✅ VERDICT: RELEVANT!`);
            console.log(`📝 NOTES: ${analysis.notes}`);
            console.log(`🛠️ SERVICES: ${analysis.services}`);
            
            console.log(`\n✍️ GENERATING DEEP PERSONALIZED EMAIL...`);
            const email = await personalizeDeepOutreach(site.name, analysis);
            console.log("------------------------------------------");
            console.log(email);
            console.log("------------------------------------------");
        } else {
            console.log(`❌ VERDICT: IRRELEVANT (Filtered)`);
            console.log(`📝 REASON: ${analysis.notes}`);
        }
    }
    
    console.log("\n✅ TEST COMPLETE.");
}

runTest();
