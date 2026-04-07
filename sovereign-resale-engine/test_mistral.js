const API_KEY = '30vyWK1Rre9pGezcbw0mr9SicIYWYJaU';
const URL = 'https://api.mistral.ai/v1/chat/completions';

async function testMistral() {
  console.log('--- MISTRAL API VERIFICATION START ---');
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [{ role: 'user', content: 'Say "YES, Mistral is working!"' }]
      })
    });

    const data = await response.json();

    if (response.ok) {
      const text = data.choices?.[0]?.message?.content?.trim();
      console.log(`STATUS: ${response.status} OK`);
      console.log(`RESPONSE: "${text}"`);
      console.log(`VERDICT: ✅ KEY IS WORKING!`);
    } else {
      console.log(`STATUS: ${response.status} ${response.statusText}`);
      console.log(`MESSAGE: ${data.error?.message || JSON.stringify(data)}`);
      console.log(`VERDICT: ❌ KEY NOT READY/WORKING`);
    }
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    console.log(`VERDICT: ❌ CONNECTION FAILED`);
  }
}

testMistral();
