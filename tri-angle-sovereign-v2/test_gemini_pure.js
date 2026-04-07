const API_KEY = 'AIzaSyBuEonIjBcd-JYzuuwmugcrQnAZM4dmAKA';
const MODEL = 'gemini-1.5-flash-latest';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function testGemini() {
  console.log('--- GEMINI API VERIFICATION START ---');
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Is this API key working? Respond with exactly one word: YES." }] }]
      })
    });

    const data = await response.json();

    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
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

testGemini();
