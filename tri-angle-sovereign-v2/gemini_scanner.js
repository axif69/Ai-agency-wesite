const API_KEY = 'AIzaSyBuEonIjBcd-JYzuuwmugcrQnAZM4dmAKA';

async function findWorkingModel() {
  const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro', 'gemini-1.5-pro-latest'];
  const versions = ['v1beta', 'v1'];
  
  console.log('--- STARTING COMPREHENSIVE GEMINI KEY SCAN ---');
  
  for (const v of versions) {
    for (const m of models) {
      const url = `https://generativelanguage.googleapis.com/${v}/models/${m}:generateContent?key=${API_KEY}`;
      console.log(`Checking ${v}/${m}...`);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] })
        });
        const data = await response.json();
        if (response.ok) {
          console.log(`✅ SUCCESS on ${v}/${m}! Response: "${data.candidates[0].content.parts[0].text.trim()}"`);
          return;
        } else {
          console.log(`❌ ${v}/${m} failed: ${data.error?.message || response.statusText}`);
        }
      } catch (e) {
        console.log(`❌ ${v}/${m} Error: ${e.message}`);
      }
    }
  }
  console.log('--- SCAN FINISHED: NO WORKING COMBINATION FOUND ---');
  console.log('VERDICT: your API key is currently INACTIVE or restricted. Please check Google AI Studio for billing or region locks.');
}

findWorkingModel();
