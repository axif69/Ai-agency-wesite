// Sovereign v12.0 — Diagnostic Test
// Run: npx tsx test_search.ts
// Expected: Each engine should return > 0 URLs, total leads > 0

import { ddgSearch, bingSearch, yahooSearch, searxSearch, findLeads } from './search_service';

async function test() {
    console.log('\n========================================');
    console.log('   SOVEREIGN v12.0 ENGINE DIAGNOSTICS');
    console.log('========================================\n');

    const query = 'MEP contractors Dubai';

    // Test each engine individually
    console.log('--- Testing DDG (Fixed) ---');
    const ddgUrls = await ddgSearch(query);
    console.log(`DDG Result: ${ddgUrls.length} URLs →`, ddgUrls.slice(0, 3).join(', ') || '❌ NONE');

    console.log('\n--- Testing Bing (Fixed) ---');
    const bingUrls = await bingSearch(query);
    console.log(`Bing Result: ${bingUrls.length} URLs →`, bingUrls.slice(0, 3).join(', ') || '❌ NONE');

    console.log('\n--- Testing Yahoo (New) ---');
    const yahooUrls = await yahooSearch(query);
    console.log(`Yahoo Result: ${yahooUrls.length} URLs →`, yahooUrls.slice(0, 3).join(', ') || '❌ NONE');

    console.log('\n--- Testing SearXNG (New) ---');
    const searxUrls = await searxSearch(query);
    console.log(`SearX Result: ${searxUrls.length} URLs →`, searxUrls.slice(0, 3).join(', ') || '❌ NONE');

    const totalUrls = ddgUrls.length + bingUrls.length + yahooUrls.length + searxUrls.length;
    console.log(`\n📊 TOTAL URLs across all engines: ${totalUrls}`);

    if (totalUrls === 0) {
        console.log('\n❌ CRITICAL: All engines returned 0 URLs. Network may be blocked.');
    } else {
        console.log('\n✅ At least one engine is working! Running full findLeads...\n');
        const { leads, trace } = await findLeads(query);
        console.log(`\n🎯 FINAL RESULT: ${leads.length} qualified leads found`);
        console.log(`📡 Trace: DDG(${trace.ddg}) Bing(${trace.bing}) Yahoo(${trace.yahoo}) SearX(${trace.searx}) Dir(${trace.directory})`);
        if (leads.length > 0) {
            console.log('\n🏆 First 3 leads:');
            leads.slice(0, 3).forEach((l, i) => {
                console.log(`  ${i + 1}. ${l.company_name} — ${l.email || 'no email'} — ${l.website}`);
            });
        }
    }
}

test().catch(console.error);
