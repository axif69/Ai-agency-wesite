import { db, getSetting } from './db';

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
    openai_api_key?: string;
    anthropic_api_key?: string;
    target_location?: string;
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
    // v24.6: Dynamic & System Keys
    DYNAMIC_NICHES?: string;
    LAST_AI_CALL?: string;
    [key: string]: any; 
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
    openai_api_key: '',
    anthropic_api_key: '',
    target_location: 'UAE',
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
        // v24.6: Dynamic Decoder — Fetches ALL settings rows at once
        const rows: any[] = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM settings", (err: any, data: any) => {
                if (err) reject(err);
                else resolve(data || []);
            });
        });

        const dbSettings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

        // Map values with fallbacks and type conversion
        return {
            ...defaults,
            ...dbSettings,
            company_name: dbSettings.COMPANY_NAME || defaults.company_name,
            rep_name: dbSettings.REP_NAME || defaults.rep_name,
            company_url: dbSettings.COMPANY_URL || defaults.company_url,
            phone: dbSettings.PHONE || defaults.phone,
            email: dbSettings.EMAIL_USER || process.env.GMAIL_USER || defaults.email,
            gmail_pass: dbSettings.GMAIL_APP_PASS || process.env.GMAIL_APP_PASS || defaults.gmail_pass,
            company_knowledge: dbSettings.COMPANY_KNOWLEDGE || defaults.company_knowledge,
            pitch_context: dbSettings.PITCH_CONTEXT || defaults.pitch_context,
            groq_api_key: dbSettings.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || defaults.groq_api_key,
            mistral_api_key: dbSettings.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY || defaults.mistral_api_key,
            openai_api_key: dbSettings.OPENAI_API_KEY || process.env.OPENAI_API_KEY || defaults.openai_api_key,
            anthropic_api_key: dbSettings.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || defaults.anthropic_api_key,
            target_location: dbSettings.TARGET_LOCATION || defaults.target_location,
            tone: dbSettings.TONE || defaults.tone,
            company_profile_url: dbSettings.COMPANY_PROFILE_URL || defaults.company_profile_url,
            smtp_host: dbSettings.SMTP_HOST || defaults.smtp_host,
            smtp_port: dbSettings.SMTP_PORT ? parseInt(dbSettings.SMTP_PORT, 10) : defaults.smtp_port,
            smtp_secure: dbSettings.SMTP_SECURE === 'true',
            negative_keywords: dbSettings.NEGATIVE_KEYWORDS || defaults.negative_keywords,
            required_keywords: dbSettings.REQUIRED_KEYWORDS || defaults.required_keywords,
            outreach_image_url: dbSettings.OUTREACH_IMAGE_URL || defaults.outreach_image_url,
            investigation_depth: (dbSettings.INVESTIGATION_DEPTH as any) || defaults.investigation_depth,
            follow_up_days: dbSettings.FOLLOW_UP_DAYS ? parseInt(dbSettings.FOLLOW_UP_DAYS, 10) : defaults.follow_up_days,
            follow_up_prompt: dbSettings.FOLLOW_UP_PROMPT || defaults.follow_up_prompt,
            webhook_url: dbSettings.WEBHOOK_URL || defaults.webhook_url,
            daily_limit: dbSettings.DAILY_LIMIT ? parseInt(dbSettings.DAILY_LIMIT, 10) : defaults.daily_limit,
            temperature: dbSettings.TEMPERATURE ? parseFloat(dbSettings.TEMPERATURE) : defaults.temperature
        };
    } catch (e) {
        console.error("[CONFIG] Failed to load from DB, using defaults:", e);
        return defaults;
    }
};
