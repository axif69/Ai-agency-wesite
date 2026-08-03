import { bingSearch, yahooSearch, ddgSearch, yellowPagesSearch } from './search_service';

async function testEngines() {
  console.log("=== 🔎 SEARCH ENGINES BENCHMARK TEST ===");
  
  const query = "Software Development Companies Dubai";

  console.log("\n1. Testing Yellow Pages Scraper...");
  const yp = await yellowPagesSearch(query);
  console.log(`   ✅ Yellow Pages: Discovered ${yp.length} companies:`);
  yp.forEach(item => console.log(`      • ${item.name} (${item.website})`));

  console.log("\n2. Testing Bing Search...");
  const bing = await bingSearch(query);
  console.log(`   ✅ Bing: ${bing.length} URLs returned.`);
  bing.slice(0, 5).forEach(u => console.log(`      • ${u}`));

  console.log("\n3. Testing Yahoo Search...");
  const yahoo = await yahooSearch(query);
  console.log(`   ✅ Yahoo: ${yahoo.length} URLs returned.`);
  yahoo.slice(0, 5).forEach(u => console.log(`      • ${u}`));

  console.log("\n4. Testing DuckDuckGo Search...");
  const ddg = await ddgSearch(query);
  console.log(`   ✅ DuckDuckGo: ${ddg.length} URLs returned.`);
  ddg.slice(0, 5).forEach(u => console.log(`      • ${u}`));

  process.exit(0);
}

testEngines().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
