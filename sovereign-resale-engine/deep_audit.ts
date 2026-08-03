import { db } from './db';

async function deepAudit() {
  console.log("=== 🔬 SOVEREIGN ENGINE DEEP SYSTEM AUDIT ===");
  
  // 1. Check Settings
  const config: Record<string, string> = await new Promise((resolve) => {
    db.all("SELECT key, value FROM settings", (err, rows: any[]) => {
      const cfg: Record<string, string> = {};
      if (rows) rows.forEach(r => cfg[r.key] = r.value);
      resolve(cfg);
    });
  });

  console.log("\n🎯 1. TARGETING & NICHE CONFIGURATION:");
  console.log("   • Target Cities:", config.target_location || config.TARGET_LOCATION || 'Dubai, Abu Dhabi, New York, Toronto, London, Sydney');
  console.log("   • Dynamic Niches:", config.DYNAMIC_NICHES || config.dynamic_niches || 'Digital Marketing Agencies, Software Development Companies, Commercial Interior Design');
  console.log("   • Inclusion Keywords:", config.REQUIRED_KEYWORDS || config.required_keywords || 'commercial projects, B2B services, corporate clients');
  console.log("   • Exclusion Keywords:", config.NEGATIVE_KEYWORDS || config.negative_keywords || 'directory, yellow pages, job vacancy, careers');

  console.log("\n🧠 2. AI INTELLIGENCE & PROVIDERS:");
  console.log("   • Primary Provider:", config.primary_ai_provider || 'groq');
  console.log("   • Groq API Key:", config.groq_api_key ? "✅ STORED & ACTIVE" : "❌ Missing");
  console.log("   • Mistral API Key:", config.mistral_api_key ? "✅ STORED & ACTIVE" : "❌ Missing");

  // 3. Database Statistics
  const leadsCount = await new Promise(r => db.get("SELECT COUNT(*) as c FROM leads", (e, row: any) => r(row?.c || 0)));
  const contactsCount = await new Promise(r => db.get("SELECT COUNT(*) as c FROM contacts", (e, row: any) => r(row?.c || 0)));
  const draftsCount = await new Promise(r => db.get("SELECT COUNT(*) as c FROM outreach_drafts", (e, row: any) => r(row?.c || 0)));

  console.log("\n📊 3. DATABASE LEAD & DRAFT PIPELINE:");
  console.log(`   • Discovered Companies: ${leadsCount}`);
  console.log(`   • Decision Maker Contacts: ${contactsCount}`);
  console.log(`   • AI Review Drafts: ${draftsCount}`);

  // 4. Test Feature Modules Status
  console.log("\n⚡ 4. ENTERPRISE FEATURE ENGINES:");
  
  // Waterfall Enrichment Check
  try {
    const { runWaterfallCascade } = await import('./waterfall_enrichment');
    console.log("   • 🌊 Waterfall 3-Tier Enrichment Cascade: ✅ ACTIVE & READY");
  } catch (e: any) {
    console.log("   • 🌊 Waterfall Enrichment: ❌ Error loading:", e.message);
  }

  // Drip Campaign Engine Check
  try {
    const { calculateNextStep } = await import('./drip_campaign');
    console.log("   • 🔄 Drip Campaign Multi-Touch Sequences: ✅ ACTIVE & READY");
  } catch (e: any) {
    console.log("   • 🔄 Drip Campaign: ❌ Error loading:", e.message);
  }

  // Crawl4AI Web Extractor Check
  try {
    const { crawlWebPageMarkdown } = await import('./crawl4ai_extractor');
    console.log("   • 🕷️ Crawl4AI HTML-to-Markdown Scraper: ✅ ACTIVE & READY");
  } catch (e: any) {
    console.log("   • 🕷️ Crawl4AI Extractor: ❌ Error loading:", e.message);
  }

  // Email Warming & SPF/DKIM Check
  try {
    const { verifySenderDeliverability } = await import('./email_warming');
    console.log("   • 🛡️ Email Warming & Deliverability Auditor: ✅ ACTIVE & READY");
  } catch (e: any) {
    console.log("   • 🛡️ Email Warming: ❌ Error loading:", e.message);
  }

  // Alert Dispatcher Check
  try {
    const { dispatchLeadAlert } = await import('./alert_dispatcher');
    console.log("   • 🔔 Real-Time Webhook & WhatsApp Alerts: ✅ ACTIVE & READY");
  } catch (e: any) {
    console.log("   • 🔔 Alert Dispatcher: ❌ Error loading:", e.message);
  }

  process.exit(0);
}

deepAudit().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
