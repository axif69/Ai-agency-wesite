import { getSetting } from './db';

/**
 * Sovereign Config Manager v3.0
 * ALL configuration comes from the SQLite database.
 * .env is ONLY used as initial seed — once values exist in DB, .env is ignored.
 * Zero hardcoded identity. Zero hardcoded API keys.
 */
export interface SystemConfig {
    company_name: string;
    rep_name: string;
    company_url: string;
    phone: string;
    email: string;
    gmail_pass: string;
    company_knowledge: string;
    pitch_context: string;
    groq_api_key: string;
    mistral_api_key: string;
    tone: string;
    company_profile_url: string;
    smtp_host: string;
    smtp_port: number;
    smtp_secure: boolean;
    negative_keywords?: string;
    required_keywords?: string;
    outreach_image_url?: string;
    investigation_depth?: 'shallow' | 'deep';
    follow_up_days?: number;
    follow_up_prompt?: string;
    webhook_url?: string;
    daily_limit?: number;
    temperature?: number;
}

/**
 * Defaults are EMPTY. No fallback identities. No fallback keys.
 * The user MUST configure everything from the Dashboard.
 */
export const getDefaultConfig = (): SystemConfig => ({
    company_name: '',
    rep_name: '',
    company_url: '',
    phone: '',
    email: '',
    gmail_pass: '',
    company_knowledge: '',
    pitch_context: '',
    groq_api_key: '',
    mistral_api_key: '',
    tone: 'Professional & Bold',
    company_profile_url: '',
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_secure: false,
    negative_keywords: '',
    required_keywords: '',
    outreach_image_url: '',
    investigation_depth: 'shallow',
    follow_up_days: 0,
    follow_up_prompt: '',
    webhook_url: '',
    daily_limit: 100,
    temperature: 0.7
});

export const loadSystemConfig = async (): Promise<SystemConfig> => {
    const defaults = getDefaultConfig();
    try {
        const [
            name, rep, url, phone, email, pass, kb, pitch, groq, mistral, tone, profileUrl,
            sHost, sPort, sSecure, negKw, reqKw, imgUrl, depth, fUpDays, fUpPrompt, webhook, dLimit, temp
        ] = await Promise.all([
            getSetting('COMPANY_NAME'),
            getSetting('REP_NAME'),
            getSetting('COMPANY_URL'),
            getSetting('PHONE'),
            getSetting('EMAIL_USER'),
            getSetting('GMAIL_APP_PASS'),
            getSetting('COMPANY_KNOWLEDGE'),
            getSetting('PITCH_CONTEXT'),
            getSetting('GROQ_API_KEY'),
            getSetting('MISTRAL_API_KEY'),
            getSetting('TONE'),
            getSetting('COMPANY_PROFILE_URL'),
            getSetting('SMTP_HOST'),
            getSetting('SMTP_PORT'),
            getSetting('SMTP_SECURE'),
            getSetting('NEGATIVE_KEYWORDS'),
            getSetting('REQUIRED_KEYWORDS'),
            getSetting('OUTREACH_IMAGE_URL'),
            getSetting('INVESTIGATION_DEPTH'),
            getSetting('FOLLOW_UP_DAYS'),
            getSetting('FOLLOW_UP_PROMPT'),
            getSetting('WEBHOOK_URL'),
            getSetting('DAILY_LIMIT'),
            getSetting('TEMPERATURE')
        ]);

        return {
            company_name: name || defaults.company_name,
            rep_name: rep || defaults.rep_name,
            company_url: url || defaults.company_url,
            phone: phone || defaults.phone,
            email: email || defaults.email,
            gmail_pass: pass || defaults.gmail_pass,
            company_knowledge: kb || defaults.company_knowledge,
            pitch_context: pitch || defaults.pitch_context,
            groq_api_key: groq || defaults.groq_api_key,
            mistral_api_key: mistral || defaults.mistral_api_key,
            tone: tone || defaults.tone,
            company_profile_url: profileUrl || defaults.company_profile_url,
            smtp_host: sHost || defaults.smtp_host,
            smtp_port: sPort ? parseInt(sPort, 10) : defaults.smtp_port,
            smtp_secure: sSecure === 'true',
            negative_keywords: negKw || defaults.negative_keywords,
            required_keywords: reqKw || defaults.required_keywords,
            outreach_image_url: imgUrl || defaults.outreach_image_url,
            investigation_depth: (depth as any) || defaults.investigation_depth,
            follow_up_days: fUpDays ? parseInt(fUpDays, 10) : defaults.follow_up_days,
            follow_up_prompt: fUpPrompt || defaults.follow_up_prompt,
            webhook_url: webhook || defaults.webhook_url,
            daily_limit: dLimit ? parseInt(dLimit, 10) : defaults.daily_limit,
            temperature: temp ? parseFloat(temp) : defaults.temperature
        };
    } catch (e) {
        console.error("[CONFIG] Failed to load from DB, using defaults:", e);
        return defaults;
    }
};
