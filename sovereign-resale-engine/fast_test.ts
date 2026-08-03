import { findLeads } from './search_service';

async function fastTest() {
  console.log("=== 🚀 FAST DISCOVERY BENCHMARK TEST ===");
  const start = Date.now();
  const leads = await findLeads("Software Development Companies Dubai");
  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  console.log(`⏱️ Completed discovery in ${elapsed}s! Discovered ${leads.length} companies.`);
  leads.forEach((l, i) => {
    console.log(`  ${i+1}. ${l.company_name} | ${l.website} | ${l.email || 'No email'}`);
  });
  process.exit(0);
}

fastTest().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
