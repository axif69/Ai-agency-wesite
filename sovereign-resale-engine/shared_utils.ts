import axios from 'axios';
import { loadSystemConfig } from './config_manager.js';

/**
 * Sovereign Shared Utils v3.0 — No .env, fully DB-driven.
 */

export let heartbeatData = {
    status: 'running' as 'running' | 'idle' | 'offline',
    last_action: 'Initializing Sovereign v3.0...',
    emails_sent_today: 0,
    companies_found_today: 0,
    replies_today: 0,
    timestamp: new Date(),
};

export async function logToDashboard(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    heartbeatData.last_action = message;
    heartbeatData.timestamp = new Date();
    try { 
        await axios.post('http://127.0.0.1:3010/api/logs', { message, type }); 
        console.log(`[DASHBOARD] ${message}`); 
    } catch {
        // Dashboard might be offline
    }
}

/**
 * AI-Driven Discovery Niche Generator — fetches Groq key from DB
 */
export async function generateDiscoveryNiches(companyName: string, pitch: string, location: string = 'UAE'): Promise<string[]> {
    try {
        const config = await loadSystemConfig();
        if (!config.groq_api_key) {
            console.warn('⚠️ Cannot generate niches: No GROQ_API_KEY in Dashboard Settings.');
            return [];
        }
        
        const { Groq } = await import('groq-sdk');
        const groq = new Groq({ apiKey: config.groq_api_key });
        
        console.log(`🤖 AI: Brainstorming discovery targets for "${companyName}" in ${location}...`);
        const prompt = `
            You are an elite B2B Lead Generation Strategist. 
            Company: ${companyName}
            Pitch: ${pitch}
            Target Audience/Location: ${location}

            Task: Generate 20 unique, concise Google/YellowPages search queries to find RAW TARGET CLIENTS for this company.
            
            CRITICAL RULES:
            1. DO NOT include the services we offer in the search query! If we sell "AI Automation", and you search "Real estate AI automation", the search engine will return our competitors (AI agencies).
            2. You must search for the generic business category of the target client.
            3. Keep the queries short and natural (2-5 words).
            4. Include a location keyword in the query based on the Target Audience/Location provided.
            
            Format: One query per line. No numbers. No commentary. 
            Example Query (GOOD): "Commercial Real Estate Brokers Dubai"
            Example Query (GOOD): "Logistics Companies Abu Dhabi"
            Example Query (BAD): "Real Estate Brokers Dubai AI Automation"
            Example Query (BAD): "Logistics Companies Abu Dhabi looking for custom agents"
        `;
        const chat = await groq.chat.completions.create({ 
            model: 'llama-3.3-70b-versatile', 
            messages: [{ role: 'user', content: prompt }], 
            temperature: 0.7, 
            max_tokens: 1000 
        });
        const content = chat.choices[0]?.message?.content || '';
        return content.split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 5 && !l.includes(':') && !l.toLowerCase().includes('here are'));
    } catch (e) {
        console.error("❌ AI Niche Generation Failed:", e);
        return [];
    }
}

export async function analyzeSentiment(replyBody: string): Promise<'positive' | 'negative' | 'auto_reply' | 'neutral'> {
    try {
        const config = await loadSystemConfig();
        if (!config.groq_api_key) return 'neutral';
        
        const { Groq } = await import('groq-sdk');
        const groq = new Groq({ apiKey: config.groq_api_key });
        
        const prompt = `Classify this email reply: "${replyBody.slice(0, 500)}". Categories: positive/negative/auto_reply/neutral. Respond ONLY with the category word.`;
        const chat = await groq.chat.completions.create({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], temperature: 0, max_tokens: 10 });
        return (chat.choices[0]?.message?.content?.trim().toLowerCase() as any) || 'neutral';
    } catch { return 'neutral'; }
}

/**
 * Create a Groq client dynamically from DB config.
 * This replaces the old hardcoded `groqClient` export.
 */
export async function getGroqClient() {
    const config = await loadSystemConfig();
    if (!config.groq_api_key) return null;
    const { Groq } = await import('groq-sdk');
    return new Groq({ apiKey: config.groq_api_key });
}

// Legacy export for backwards compat — will be lazy-initialized
export const groqClient: any = null;
