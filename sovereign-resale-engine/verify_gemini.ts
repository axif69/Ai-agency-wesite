import axios from 'axios';

const GEMINI_KEY = 'AIzaSyBuEonIjBcd-JYzuuwmugcrQnAZM4dmAKA';

async function testGemini() {
    console.log('Testing Gemini API Key...');
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
                contents: [{ parts: [{ text: 'Say "Hello, your Gemini key is working!"' }] }]
            }
        );
        
        const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (answer) {
            console.log('✅ SUCCESS!');
            console.log('Gemini says:', answer.trim());
        } else {
            console.log('❌ FAILED: Unexpected response format');
            console.log(JSON.stringify(response.data, null, 2));
        }
    } catch (error: any) {
        console.log('❌ FAILED!');
        if (error.response) {
            console.error('Error Code:', error.response.status);
            console.error('Error Message:', error.response.data.error?.message || 'Unknown error');
        } else {
            console.error('Error:', error.message);
        }
    }
}

testGemini();
