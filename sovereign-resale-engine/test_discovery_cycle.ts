import { findLeads } from './search_service';
import { db } from './db';
import { executeWaterfallEnrichment } from './waterfall_enrichment';
import { personalizeOutreach } from './personalizer';

async function runLiveDiscoveryCycle() {
  console.log("=== 🚀 EXECUTING LIVE DISCOVERY & ENRICHMENT AUDIT CYCLE ===");
  
  // 1. Search for real Software / Tech companies in Dubai
  console.log("🔍 Stage 1: Searching for target companies in Dubai...");
  const discovered = await findLeads("Software Development Companies Dubai");
  console.log(`✅ Discovered ${discovered.length} candidate websites.`);

  if (discovered.length === 0) {
    console.log("⚠️ No candidates returned in test query.");
    process.exit(0);
  }

  const sampleLead = discovered[0];
  console.log(`\n🏢 Stage 2: Processing Top Candidate Lead:`);
  printObj(sampleLead);

  // 2. Save Lead into SQLite DB
  const stmt = db.prepare(`
    INSERT INTO leads (company_name, website, domain, email, phone, is_relevant, relevance_score, reasoning)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const leadId: number = await new Promise((resolve) => {
    stmt.run(
      sampleLead.company_name,
      sampleLead.website,
      sampleLead.website ? new URL(sampleLead.website).hostname : '',
      sampleLead.email || '',
      sampleLead.phone || '',
      1,
      95,
      "Qualified B2B Tech Company",
      function(err: any) {
        resolve(this.lastID);
      }
    );
  });

  console.log(`\n💾 Saved Lead #${leadId} to SQLite Database.`);

  // 3. Run Waterfall Enrichment Cascade
  console.log("\n🌊 Stage 3: Running Waterfall 3-Tier Contact Enrichment Cascade...");
  const domain = sampleLead.website ? new URL(sampleLead.website).hostname : '';
  const cascadeResult = await executeWaterfallEnrichment(
    domain,
    sampleLead.company_name || 'Target Company'
  );

  console.log("✅ Waterfall Cascade Result:");
  printObj(cascadeResult);

  // 4. Generate CEO-to-CEO Cold Outreach Draft
  console.log("\n✍️ Stage 4: Generating 100% Human CEO-to-CEO Outreach Draft...");
  const pitch = await personalizeOutreach(
    sampleLead.company_name || 'Target Company',
    'Leading B2B technology services provider in Dubai delivering enterprise custom software solutions.',
    sampleLead.website || 'https://example.com'
  );

  console.log("✅ Generated CEO-to-CEO Draft:");
  console.log("--------------------------------------------------");
  console.log(`BRAND: ${pitch.brandName}`);
  console.log(`PROVIDER: ${pitch.provider} (${pitch.model})`);
  console.log(`BODY:\n${pitch.body}`);
  console.log("--------------------------------------------------");

  process.exit(0);
}

function printObj(obj: any) {
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] !== 'function') {
      console.log(`   • ${k}: ${JSON.stringify(obj[k])}`);
    }
  });
}

runLiveDiscoveryCycle().catch(err => {
  console.error("Discovery error:", err);
  process.exit(1);
});
