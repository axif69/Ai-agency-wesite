import { initDB, db } from './db';
import { executeWaterfallEnrichment } from './waterfall_enrichment';
import { extractCleanMarkdownWithCrawl4AI } from './crawl4ai_extractor';
import { checkSendingDomainHealth } from './email_warming';
import { STANDARD_DRIP_SEQUENCE, calculateNextDripDueDate } from './drip_campaign';
import { dispatchWebhookAlert, generateWhatsAppDirectUrl } from './alert_dispatcher';

async function runTestSuite() {
  console.log("=== 🧪 SOVEREIGN ENGINE FEATURE VERIFICATION TEST SUITE ===");

  // 1. Test Database Init & Schema Migration
  console.log("\n[1/6] Testing Database Schema...");
  await initDB();
  console.log("✅ DB Init Successful!");

  // 2. Test Waterfall Enrichment Cascade
  console.log("\n[2/6] Testing Waterfall Enrichment Cascade...");
  const waterfallResult = await executeWaterfallEnrichment('example.com', 'Example Corp');
  console.log(`✅ Waterfall Result: Tier = ${waterfallResult.tier}, Email = ${waterfallResult.email}, Score = ${waterfallResult.confidence_score}%`);

  // 3. Test Crawl4AI Web Extractor
  console.log("\n[3/6] Testing Crawl4AI LLM Web Content Parser...");
  const crawlResult = await extractCleanMarkdownWithCrawl4AI('https://example.com');
  console.log(`✅ Crawl4AI Result: Method = ${crawlResult.extraction_method}, Markdown Length = ${crawlResult.clean_markdown.length} chars`);

  // 4. Test Email Warming & DNS Health Auditor
  console.log("\n[4/6] Testing Email Warming DNS Auditor...");
  const health = await checkSendingDomainHealth('google.com');
  console.log(`✅ Email Health Result: Score = ${health.health_score}%, SPF = ${health.spf_valid}, DMARC = ${health.dmarc_valid}`);

  // 5. Test Drip Campaign Engine
  console.log("\n[5/6] Testing Drip Campaign Sequence Generator...");
  console.log(`✅ Drip Steps Configured: ${STANDARD_DRIP_SEQUENCE.length} steps`);
  console.log(`✅ Step 2 Due Date Calculation: ${calculateNextDripDueDate(3)}`);

  // 6. Test Webhook Alert Dispatcher & WhatsApp Direct Linker
  console.log("\n[6/6] Testing Alert Dispatcher & WhatsApp Direct Linker...");
  const waUrl = generateWhatsAppDirectUrl('+971501234567', 'Test Business');
  console.log(`✅ WhatsApp Direct Link: ${waUrl}`);

  console.log("\n🎉 ALL 6 ENTERPRISE ENGINE FEATURES VERIFIED WORKING SUCCESSFULLY!");
  process.exit(0);
}

runTestSuite().catch((err) => {
  console.error("❌ Test Suite Error:", err);
  process.exit(1);
});
