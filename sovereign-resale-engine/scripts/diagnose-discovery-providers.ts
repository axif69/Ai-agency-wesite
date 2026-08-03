import { bingSearch, ddgSearch, yahooSearch, yellowPagesSearch } from '../search_service.js';

const query = process.argv.slice(2).join(' ') || 'enterprise event management agencies UAE';
const startedAt = Date.now();
const providers = await Promise.allSettled([
  yellowPagesSearch(query),
  bingSearch(query),
  ddgSearch(query),
  yahooSearch(query)
]);
const names = ['yellowpages', 'bing', 'ddg', 'yahoo'];
const results = providers.map((result, index) => result.status === 'fulfilled'
  ? { provider: names[index], count: result.value.length, sample: result.value.slice(0, 3) }
  : { provider: names[index], count: 0, error: String(result.reason?.message || result.reason) });
console.log(JSON.stringify({ query, duration_ms: Date.now() - startedAt, results }, null, 2));
