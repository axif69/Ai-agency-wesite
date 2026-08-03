import { findLeads } from './search_service';
import { loadSystemConfig } from './config_manager';

async function testDiscovery() {
  console.log("=== 🔍 TESTING DISCOVERY SEARCH ENGINE ===");
  const config = await loadSystemConfig();
  console.log("Config loaded:", {
    groq: Boolean(config.groq_api_key || config.GROQ_API_KEY),
    mistral: Boolean(config.mistral_api_key || config.MISTRAL_API_KEY),
    niche: config.target_niches || config.DYNAMIC_NICHES
  });

  const query = "Digital Marketing Agencies Dubai";
  console.log(`Running findLeads for query: "${query}"...`);
  const leads = await findLeads(query);
  console.log(`✅ Discovery returned ${leads.length} leads!`);
  if (leads.length > 0) {
    console.log("First lead sample:", {
      company: leads[0].company_name,
      website: leads[0].website,
      email: leads[0].email
    });
  }
}

testDiscovery().catch(err => {
  console.error("❌ Discovery test error:", err);
});
