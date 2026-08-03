import axios from 'axios';

async function testGemini() {
  const GEMINI_KEY = "AIzaSyAiAJadyHJaC1DdnszigPvUFNurDMG0yVg";
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-exp'];
  for (const model of models) {
    try {
      console.log(`Testing Gemini model ${model}...`);
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
        { contents: [{ parts: [{ text: "Hello" }] }] },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );
      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`✅ SUCCESS on ${model}: "${text?.trim()}"`);
      return;
    } catch (err: any) {
      console.log(`❌ ${model} failed: ${err.response?.data?.error?.message || err.message}`);
    }
  }
}

testGemini();
