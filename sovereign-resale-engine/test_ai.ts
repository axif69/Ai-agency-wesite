import { callAI } from './search_service';

async function testCallAI() {
  console.log("=== 🤖 TESTING AI CALL PROVIDER CHAIN ===");
  const start = Date.now();
  const response = await callAI("Say 'Sovereign Engine AI Active' in 5 words.");
  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  console.log(`⏱️ Response in ${elapsed}s: "${response.trim()}"`);
  process.exit(0);
}

testCallAI().catch(err => {
  console.error("AI call test error:", err);
  process.exit(1);
});
