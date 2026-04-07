import axios from 'axios';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

export const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY });

export let heartbeatData = {
    status: 'running' as 'running' | 'idle' | 'offline',
    last_action: 'Initializing engine v17.0 Sales Closer...',
    emails_sent_today: 0,
    companies_found_today: 0,
    replies_today: 0,
    timestamp: new Date(),
};

export async function logToDashboard(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    heartbeatData.last_action = message;
    heartbeatData.timestamp = new Date();
    try { 
        await axios.post('http://localhost:3001/api/logs', { message, type }); 
        console.log(`[DASHBOARD] ${message}`); 
    } catch {
        // Dashboard might be offline
    }
}

export async function analyzeSentiment(replyBody: string): Promise<'positive' | 'negative' | 'auto_reply' | 'neutral'> {
    try {
        const prompt = `Classify this email reply: "${replyBody.slice(0, 500)}". Categories: positive/negative/auto_reply/neutral. Respond ONLY with the category word.`;
        const chat = await groqClient.chat.completions.create({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], temperature: 0, max_tokens: 10 });
        return (chat.choices[0]?.message?.content?.trim().toLowerCase() as any) || 'neutral';
    } catch { return 'neutral'; }
}
