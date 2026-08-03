import { db } from './db';
import { decryptLocalSecret } from './crypto_utils.js';


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
    openrouter_api_key?: string;
    openrouter_model?: string;
    openai_api_key?: string;
    openai_model?: string;
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
    ai_model?: string;
    ai_tone?: string;
    auto_discovery?: boolean;
    engine_paused?: boolean;
    outreach_enabled?: boolean;
    api_base_url?: string;
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
    openrouter_api_key: '',
    openrouter_model: 'openai/gpt-4o-mini',
    openai_api_key: '',
    openai_model: 'gpt-4o-mini',
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
    temperature: 0.7,
    ai_model: 'llama-3.3-70b-versatile',
    ai_tone: 'Professional & Bold',
    auto_discovery: true,
    engine_paused: false,
    outreach_enabled: false,
    api_base_url: ''
});

const isPresent = (value: any) => value !== undefined && value !== null && String(value).trim() !== '';

const pickSetting = (settings: Record<string, any>, ...keys: string[]) => {
    for (const key of keys) {
        if (isPresent(settings[key])) return settings[key];
    }
    return undefined;
};

const parseNumberSetting = (value: any, fallback: number): number => {
    const parsed = Number.parseFloat(String(value));
    return Number.isFinite(parsed) ? parsed : fallback;
};

const parseBooleanSetting = (value: any, fallback: boolean): boolean => {
    if (!isPresent(value)) return fallback;
    const normalized = String(value).trim().toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
    if (['false', '0', 'no', 'off'].includes(normalized)) return false;
    return fallback;
};

const tryDecrypt = (val: any): string => {
    if (!val) return '';
    const str = String(val).trim();
    // Encrypted strings in our AES-256-GCM wrapper are base64-encoded.
    // They are relatively long and do not contain whitespace.
    // We try to decrypt them; if decryption fails or returns null, we assume it's plaintext.
    if (str.length > 30 && !/\s/.test(str)) {
        const decrypted = decryptLocalSecret(str);
        if (decrypted !== null) return decrypted;
    }
    return str;
};

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

        const dbSettings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {} as Record<string, any>);

        const smtpPort = pickSetting(dbSettings, 'SMTP_PORT', 'smtp_port');
        const smtpSecure = parseBooleanSetting(pickSetting(dbSettings, 'SMTP_SECURE', 'smtp_secure'), defaults.smtp_secure);
        const smtpPortText = smtpPort == null ? '' : String(smtpPort).trim();
        const smtpPortValue = smtpPortText
            ? parseNumberSetting(smtpPortText, smtpSecure ? 465 : defaults.smtp_port)
            : (smtpSecure ? 465 : defaults.smtp_port);
        const followUpDays = pickSetting(dbSettings, 'FOLLOW_UP_DAYS', 'follow_up_days', 'drip_followup_days');
        const dailyLimit = pickSetting(dbSettings, 'DAILY_LIMIT', 'daily_limit', 'daily_sent_limit');
        const temperature = pickSetting(dbSettings, 'TEMPERATURE', 'temperature');

        const config = {
            ...defaults,
            ...dbSettings,
            company_name: pickSetting(dbSettings, 'COMPANY_NAME', 'company_name') || defaults.company_name,
            rep_name: pickSetting(dbSettings, 'REP_NAME', 'rep_name') || defaults.rep_name,
            company_url: pickSetting(dbSettings, 'COMPANY_URL', 'company_url') || defaults.company_url,
            phone: pickSetting(dbSettings, 'PHONE', 'phone') || defaults.phone,
            email: tryDecrypt(pickSetting(dbSettings, 'EMAIL_USER', 'email', 'gmail_user') || process.env.GMAIL_USER || defaults.email),
            gmail_pass: tryDecrypt(pickSetting(dbSettings, 'GMAIL_APP_PASS', 'gmail_pass', 'smtp_password') || process.env.GMAIL_APP_PASS || defaults.gmail_pass),
            company_knowledge: pickSetting(dbSettings, 'COMPANY_KNOWLEDGE', 'company_knowledge') || defaults.company_knowledge,
            pitch_context: pickSetting(dbSettings, 'PITCH_CONTEXT', 'pitch_context') || defaults.pitch_context,
            groq_api_key: tryDecrypt(pickSetting(dbSettings, 'GROQ_API_KEY', 'groq_api_key') || process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY || defaults.groq_api_key),
            mistral_api_key: tryDecrypt(pickSetting(dbSettings, 'MISTRAL_API_KEY', 'mistral_api_key') || process.env.MISTRAL_API_KEY || defaults.mistral_api_key),
            openrouter_api_key: tryDecrypt(pickSetting(dbSettings, 'OPENROUTER_API_KEY', 'openrouter_api_key') || process.env.OPENROUTER_API_KEY || defaults.openrouter_api_key),
            openrouter_model: pickSetting(dbSettings, 'OPENROUTER_MODEL', 'openrouter_model') || process.env.OPENROUTER_MODEL || defaults.openrouter_model,
            openai_api_key: tryDecrypt(pickSetting(dbSettings, 'OPENAI_API_KEY', 'openai_api_key') || process.env.OPENAI_API_KEY || defaults.openai_api_key),
            openai_model: pickSetting(dbSettings, 'OPENAI_MODEL', 'openai_model') || process.env.OPENAI_MODEL || defaults.openai_model,
            anthropic_api_key: tryDecrypt(pickSetting(dbSettings, 'ANTHROPIC_API_KEY', 'anthropic_api_key') || process.env.ANTHROPIC_API_KEY || defaults.anthropic_api_key),
            target_location: pickSetting(dbSettings, 'TARGET_LOCATION', 'target_location') || defaults.target_location,
            tone: pickSetting(dbSettings, 'TONE', 'tone', 'ai_tone') || defaults.tone,
            company_profile_url: pickSetting(dbSettings, 'COMPANY_PROFILE_URL', 'company_profile_url') || defaults.company_profile_url,
            smtp_host: pickSetting(dbSettings, 'SMTP_HOST', 'smtp_host') || defaults.smtp_host,
            smtp_port: smtpPortValue,
            smtp_secure: smtpPortValue === 465 ? true : (smtpPortValue === 587 ? false : smtpSecure),
            negative_keywords: pickSetting(dbSettings, 'NEGATIVE_KEYWORDS', 'negative_keywords') || defaults.negative_keywords,
            required_keywords: pickSetting(dbSettings, 'REQUIRED_KEYWORDS', 'required_keywords') || defaults.required_keywords,
            outreach_image_url: pickSetting(dbSettings, 'OUTREACH_IMAGE_URL', 'outreach_image_url') || defaults.outreach_image_url,
            investigation_depth: (pickSetting(dbSettings, 'INVESTIGATION_DEPTH', 'investigation_depth') as any) || defaults.investigation_depth,
            follow_up_days: isPresent(followUpDays) ? parseNumberSetting(followUpDays, defaults.follow_up_days || 0) : defaults.follow_up_days,
            follow_up_prompt: pickSetting(dbSettings, 'FOLLOW_UP_PROMPT', 'follow_up_prompt') || defaults.follow_up_prompt,
            webhook_url: tryDecrypt(pickSetting(dbSettings, 'WEBHOOK_URL', 'webhook_url') || defaults.webhook_url),
            daily_limit: isPresent(dailyLimit) ? parseNumberSetting(dailyLimit, defaults.daily_limit || 100) : defaults.daily_limit,
            temperature: isPresent(temperature) ? parseNumberSetting(temperature, defaults.temperature) : defaults.temperature,
            ai_model: pickSetting(dbSettings, 'AI_MODEL', 'ai_model', 'model') || defaults.ai_model,
            ai_tone: pickSetting(dbSettings, 'AI_TONE', 'ai_tone', 'tone', 'TONE') || defaults.ai_tone,
            auto_discovery: parseBooleanSetting(pickSetting(dbSettings, 'AUTO_DISCOVERY', 'auto_discovery'), defaults.auto_discovery || true),
            engine_paused: parseBooleanSetting(pickSetting(dbSettings, 'ENGINE_PAUSED', 'engine_paused'), defaults.engine_paused || false),
            outreach_enabled: parseBooleanSetting(pickSetting(dbSettings, 'OUTREACH_ENABLED', 'outreach_enabled'), defaults.outreach_enabled || false),
            api_base_url: pickSetting(dbSettings, 'API_BASE_URL', 'api_base_url') || defaults.api_base_url
        };
        return config;
    } catch (e) {
        console.error("[CONFIG] Failed to load from DB, using defaults:", e);
        return defaults;
    }
};
