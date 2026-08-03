import express from 'express';
import cors from 'cors';
import { db, initDB, upsertContact, extractDomain } from './db';
import { findLeads, findLeadTargetsFast, callAI } from './search_service';
import { enrichCompanyData } from './email_discovery';
import { personalizeOutreach } from './personalizer';
import { runGmbNinjaScan } from './gmb_stealth';
import { logToDashboard } from './shared_utils.js';
import { loadSystemConfig } from './config_manager';
import { getDeviceId, getLocalCryptoKey, encryptLocalSecret, decryptLocalSecret } from './crypto_utils.js';
import dotenv from 'dotenv';
// (child_process spawn import removed — Bug 4 fix: worker.ts auto-spawn disabled)
import type { ChildProcessWithoutNullStreams } from 'child_process';
import os from 'os';
import { createHash } from 'crypto';
import path from 'path';
import { isStrictPersonEmail, normalizePhone, validateEmail, websiteHostname } from './contact_validation';
import { systemRouter } from './routes/system_routes';
import { leadsRouter } from './routes/leads_routes';
dotenv.config();

let lastPlanKey = '';
let lastPlanQueries: string[] = [];

const LICENSE_SERVER_URL = (
    process.env.LICENSE_SERVER_URL ||
    process.env.SOVEREIGN_LICENSE_SERVER_URL ||
    'https://young-band-43c3.aiautomationdevelopment.workers.dev'
).replace(/\/+$/, '');

const isLicenseActive = async (): Promise<boolean> => {
    const status = String(await getSetting('LICENSE_STATUS') || '').toLowerCase();
    if (status !== 'active') return false;

    const nextCheck = await getSetting('LICENSE_NEXT_CHECK_AT');
    if (nextCheck && Date.now() < new Date(nextCheck).getTime()) return true;

    return verifyRemoteLicenseToken();
};

const parseKeywordList = (value: any): string[] =>
    String(value || '')
        .split(/[\n,;|]+/)
        .map((part) => part.trim())
        .filter(Boolean);

const safeParseDynamicNiches = (value: any): string[] => {
    try {
        const parsed = JSON.parse(String(value || '[]'));
        return Array.isArray(parsed) ? parsed.map((item) => String(item || '').trim()).filter(Boolean) : [];
    } catch {
        return [];
    }
};

const safeParseArray = (value: any): any[] => {
    try {
        const parsed = JSON.parse(String(value || '[]'));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const isMeaningfulDraftFact = (item: any): boolean => {
    const fact = String(item?.fact || '').trim();
    const source = String(item?.source_url || '').trim();
    if (!fact || !/^https?:\/\//i.test(source)) return false;
    const lower = fact.toLowerCase();
    if (/call now|know more|read more|contact us|best health care|comprehensive|empowers|critical work|©|®/.test(lower)) return false;
    return /\b(sells?|provides?|serves?|speciali[sz]es?|integrat|manufactur|distribut|logistics?|software|platform|solution|hospital|clinic|facility|project|industry|market|customer|client|stakeholder|reduce|reducing|forecast|inventory|labor|food|costs?|profitability|margins?|restaurant|erp|operational efficiency)\b/.test(lower);
};

const hasPersonLevelDraftEvidence = (draft: any): boolean => {
    const sourceEvidence = safeParseArray(draft.contact_source_evidence_json);
    return Boolean(
        (draft.linkedin_url ||
            Number(draft.person_identity_verified || 0) === 1 ||
            sourceEvidence.length > 0) &&
        Number(draft.person_name_confidence || 0) >= 80 &&
        Number(draft.role_confidence || 0) >= 70
    );
};

const isValidEmailAddress = (email: unknown): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(email || '').trim());

const draftEmailDomainMatchesLead = (draft: any): boolean => {
    const emailDomain = String(draft.recipient_email || draft.email || '').trim().toLowerCase().split('@')[1] || '';
    const leadDomain = String(draft.domain || extractDomain(draft.website || '') || '').trim().toLowerCase().replace(/^www\./, '');
    if (!emailDomain || !leadDomain) return false;
    return emailDomain === leadDomain || emailDomain.endsWith(`.${leadDomain}`) || leadDomain.endsWith(`.${emailDomain}`);
};

const isReviewableCompanyMailboxDraft = (draft: any): boolean => {
    const status = String(draft.email_ownership_status || '').toUpperCase();
    const source = String(draft.email_source || '').toLowerCase();
    const local = String(draft.recipient_email || draft.email || '').trim().toLowerCase().split('@')[0] || '';
    const blockedRole = ['support', 'help', 'jobs', 'careers', 'billing', 'privacy', 'legal', 'webmaster', 'complaints'].includes(local);
    const domainVerifiedOrPublished = Number(draft.email_domain_valid || 0) === 1 ||
        Number(draft.email_mx_valid || 0) === 1 ||
        draftEmailDomainMatchesLead(draft) ||
        source === 'website';
    return Boolean(
        isValidEmailAddress(draft.recipient_email || draft.email) &&
        (draftEmailDomainMatchesLead(draft) || String(draft.email_source || '').toLowerCase() === 'website') &&
        domainVerifiedOrPublished &&
        Number(draft.is_relevant ?? 1) !== 0 &&
        !blockedRole &&
        (status === 'EMAIL_COMPANY_MAILBOX' || source === 'website' || Number(draft.email_is_fallback || 0) === 1)
    );
};

const withLocation = (query: string, location: string): string => {
    const cleanQuery = String(query || '').trim();
    const cleanLocation = String(location || 'UAE').trim();
    if (!cleanQuery) return cleanLocation;
    return cleanQuery.toLowerCase().includes(cleanLocation.toLowerCase()) ? cleanQuery : `${cleanQuery} ${cleanLocation}`;
};

const uniqueQueries = (queries: string[]): string[] => {
    const seen = new Set<string>();
    return queries.filter((query) => {
        const normalized = String(query || '').trim().toLowerCase().replace(/\s+/g, ' ');
        if (!normalized || seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
    });
};

const expandQuery = (query: string): string[] => {
    return [query];
};

/**
 * Generate 6 dynamic search seed variations for a given niche.
 * No hardcoded fallbacks - generates algorithmic variations only.
 */
const get6SeedsForNiche = (niche: string): string[] => {
    const clean = niche.trim();
    return [
        clean,
        `${clean} Companies`,
        `${clean} Services`,
        `B2B ${clean} Firms`,
        `Leading ${clean} Agencies`,
        `Best ${clean} Solutions`
    ];
};

const buildAutonomousQueries = (settings: any): string[] => {
    const rawLocations = String(settings.target_location || settings.TARGET_LOCATION || 'UAE').replace(/[\s,]+$/g, '');
    const locations = rawLocations.split(',').map((l: string) => l.trim()).filter(Boolean);
    if (locations.length === 0) locations.push('UAE');

    // Use ONLY target niches from DB settings (TARGET_NICHES).
    // If empty, return empty array - no hardcoded fallbacks allowed.
    const dynamicNiches = safeParseDynamicNiches(settings.TARGET_NICHES || settings.target_niches || settings.DYNAMIC_NICHES || settings.dynamic_niches);

    if (dynamicNiches.length === 0) {
        console.log(`⚠️ [AUTONOMOUS] No target niches configured in DB settings (TARGET_NICHES). Discovery paused until niches are configured.`);
        return [];
    }

    const nichesToUse = dynamicNiches;
    const negativeKeywords = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS).map((k) => k.toLowerCase());

    const generatedQueries: string[] = [];

    // For every location x niche pair, shoot 6 distinct search seeds!
    for (const loc of locations) {
        for (const niche of nichesToUse) {
            const seeds = get6SeedsForNiche(niche);
            for (const seed of seeds) {
                const queryStr = `${seed} ${loc}`.trim();
                const lower = queryStr.toLowerCase();
                const isNegative = negativeKeywords.some((neg) => neg && lower.includes(neg));
                if (!isNegative) {
                    generatedQueries.push(queryStr);
                }
            }
        }
    }

    return uniqueQueries(generatedQueries);
};

const formatProviderError = (provider: 'OpenRouter' | 'OpenAI' | 'Groq' | 'Mistral', status: number, text: string) => {
    let message = text.slice(0, 220);
    try {
        const parsed = JSON.parse(text);
        message = parsed?.error?.message || parsed?.message || message;
    } catch {}

    if (status === 401 || status === 403) {
        return `${provider} rejected this API key (${status}). Copy the full key again from ${provider} and save settings before testing.`;
    }
    if (status === 429) {
        return `${provider} rate limit reached (${status}). The key may be valid, but the provider is throttling requests right now.`;
    }
    return `${provider} connection failed (${status}): ${message}`;
};

const testGroqKey = async (apiKey: string) => {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    const text = await res.text();
    if (!res.ok) {
        throw new Error(formatProviderError('Groq', res.status, text));
    }

    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch {}
    return {
        ok: true,
        provider: 'groq',
        models: Array.isArray(parsed?.data) ? parsed.data.length : null
    };
};

const testMistralKey = async (apiKey: string) => {
    const res = await fetch('https://api.mistral.ai/v1/models', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    const text = await res.text();
    if (!res.ok) {
        throw new Error(formatProviderError('Mistral', res.status, text));
    }

    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch {}
    return {
        ok: true,
        provider: 'mistral',
        models: Array.isArray(parsed?.data) ? parsed.data.length : null
    };
};

const testOpenAIKey = async (apiKey: string, model: string = 'gpt-4o-mini') => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: 'Reply with OK only.' }],
            max_tokens: 5,
            temperature: 0
        })
    });

    const text = await res.text();
    if (!res.ok) {
        throw new Error(formatProviderError('OpenAI', res.status, text));
    }

    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch {}
    return {
        ok: true,
        provider: 'openai',
        model,
        reply: parsed?.choices?.[0]?.message?.content || ''
    };
};

const testOpenRouterKey = async (apiKey: string, model: string = 'openai/gpt-4o-mini') => {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://asifdigital.agency',
            'X-Title': 'Sovereign Sales Engine'
        },
        body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: 'Reply with OK only.' }],
            max_tokens: 5,
            temperature: 0
        })
    });

    const text = await res.text();
    if (!res.ok) {
        throw new Error(formatProviderError('OpenRouter', res.status, text));
    }

    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch {}
    return {
        ok: true,
        provider: 'openrouter',
        model,
        reply: parsed?.choices?.[0]?.message?.content || ''
    };
};

const isMaskedApiKey = (value: string) => {
    const text = String(value || '').trim();
    if (!text) return false;
    return /^(?:[•●*xX?]|â— ){4,}/.test(text)
        || text.includes('••••')
        || text.includes('●●●●')
        || text.includes('â— â— ')
        || text === '********'
        || text === '••••••••';
};

const parseAiPlan = (aiText: string): string[] => {
    try {
        const match = aiText.match(/\[[\s\S]*\]/);
        if (match) {
            const arr = JSON.parse(match[0]);
            if (Array.isArray(arr)) return arr.map(item => String(item).trim()).filter(Boolean);
        }
    } catch {}
    return [];
};

const generateSearchPlan = async (settings: any): Promise<string[]> => {
    const planKey = `${settings.target_location || ''}:${settings.DYNAMIC_NICHES || ''}:${settings.REQUIRED_KEYWORDS || ''}`;
    if (lastPlanKey === planKey && lastPlanQueries.length > 0) {
        return lastPlanQueries;
    }

    const baseQueries = buildAutonomousQueries(settings);
    lastPlanKey = planKey;
    lastPlanQueries = baseQueries;
    return baseQueries;
};

const rankQueries = (queries: string[], settings: any): { query: string; score: number; reason: string }[] => {
    const pitch = String(settings.pitch_context || settings.PITCH_CONTEXT || '').toLowerCase();
    const knowledge = String(settings.company_knowledge || settings.COMPANY_KNOWLEDGE || '').toLowerCase();
    const required = parseKeywordList(settings.required_keywords || settings.REQUIRED_KEYWORDS).map(item => item.toLowerCase());
    const negative = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS).map(item => item.toLowerCase());
    const location = String(settings.target_location || settings.TARGET_LOCATION || 'UAE').toLowerCase();

    const scored = queries.map((query) => {
        const q = String(query || '').trim();
        const lower = q.toLowerCase();
        let score = 0;
        const reasons: string[] = [];

        if (required.some(item => lower.includes(item))) { score += 30; reasons.push('matches required keyword'); }
        if (pitch && pitch.split(/\s+/).some(word => word.length > 5 && lower.includes(word))) { score += 12; reasons.push('matches pitch language'); }
        if (knowledge && knowledge.split(/\s+/).some(word => word.length > 5 && lower.includes(word))) { score += 10; reasons.push('matches company knowledge'); }
        if (lower.includes(location)) { score += 8; reasons.push('matches target location'); }
        if (negative.some(item => item && lower.includes(item))) { score -= 50; reasons.push('hits blocklist'); }

        return { query: q, score, reason: reasons.slice(0, 3).join(', ') || 'baseline fit' };
    });

    return scored
        .filter((item) => item.query && item.score > -100)
        .sort((a, b) => b.score - a.score);
};

const app = express();
// @ts-ignore - Ignore cors type error since @types/cors install failed
app.use(cors());
app.use(express.json());

// 🛡️ API SECURITY & BEARER AUTH MIDDLEWARE (Production Defense)
app.use('/api', (req, res, next) => {
    const apiSecret = process.env.API_SECRET_KEY || process.env.SOVEREIGN_API_KEY;
    // If API_SECRET_KEY is set in environment, enforce strict security authentication
    if (apiSecret) {
        const clientKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
        if (!clientKey || clientKey !== apiSecret) {
            return res.status(401).json({ success: false, error: 'Unauthorized: Invalid API Secret Key' });
        }
    }
    next();
});

app.use('/api/system', systemRouter);
app.use('/api', leadsRouter);


initDB().then(() => {
    db.run(`INSERT OR IGNORE INTO settings (key, value)
            SELECT 'LEGACY_CORRUPTED_COMPANY_URL', value FROM settings
            WHERE key = 'COMPANY_URL' AND instr(value, '<') > 0`);
    db.run(`UPDATE settings SET value = trim(substr(value, 1, instr(value, '<') - 1))
            WHERE key = 'COMPANY_URL' AND instr(value, '<') > 0`);
    db.run(`UPDATE leads SET
              enrichment_status = 'retry_scheduled',
              next_retry_at = CURRENT_TIMESTAMP,
              last_error_code = 'STALE_PROCESSING',
              last_error_message = 'Recovered after the service restarted or the enrichment lease expired.',
              enrichment_worker_id = NULL
            WHERE enrichment_status = 'processing'
              AND datetime(enrichment_started_at) < datetime('now', '-15 minutes')`);
});

const PORT = Number(process.env.PORT || 3010);
let workerProcess: ChildProcessWithoutNullStreams | null = null;

const setSetting = (key: string, value: string) => new Promise<void>((resolve, reject) => {
    db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, value], (err) => {
        if (err) reject(err);
        else resolve();
    });
});

const getSetting = (key: string) => new Promise<string | null>((resolve) => {
    db.get("SELECT value FROM settings WHERE key = ?", [key], (err, row: any) => {
        resolve(err || !row ? null : row.value);
    });
});

const isHeartbeatAlive = () => {
    if (!lastHeartbeat) return false;
    const age = Date.now() - new Date(lastHeartbeat.received_at).getTime();
    return age < 60000;
};

/**
 * Modular-worker liveness (Bug fix: discovery engine showed STOPPED while running).
 * The 6 modular workers (workers/*.ts) write their heartbeats to the DB `heartbeat`
 * table instead of POSTing to /api/heartbeat like the deprecated monolithic worker.ts.
 * The in-memory `lastHeartbeat` never receives those pings, so /api/worker/status
 * reported `online: false` and the dashboard reverted to STOPPED every 3s poll.
 * These helpers read the DB heartbeat table so the engine stays "RUNNING" when a
 * modular worker is actually alive.
 */
const parseDbHeartbeatTs = (raw: string): number => {
    const iso = String(raw).trim().replace(' ', 'T'); // SQLite CURRENT_TIMESTAMP is UTC, no zone
    const ts = new Date(/Z|[+-]\d\d:\d\d$/.test(iso) ? iso : iso + 'Z').getTime();
    return Number.isFinite(ts) ? ts : NaN;
};

const getLatestDbHeartbeat = () => new Promise<any | null>((resolve) => {
    db.get("SELECT worker_id, last_active FROM heartbeat ORDER BY last_active DESC LIMIT 1", (err, row: any) => {
        resolve(err || !row ? null : row);
    });
});

const dbHeartbeatAlive = async (): Promise<boolean> => {
    const row = await getLatestDbHeartbeat();
    if (!row?.last_active) return false;
    const ts = parseDbHeartbeatTs(row.last_active);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < 60000;
};

/**
 * DISABLED (Bug 4 fix): The monolithic worker.ts is deprecated in favor of the 6 modular
 * workers (workers/*.ts, launched via START_SOVEREIGN_ENGINE.bat). Auto-spawning worker.ts
 * here created a second, unmanaged engine running in parallel and risking double-sends.
 * Kept as a no-op so /api/worker/start and /api/worker/run still respond — they now only
 * unpause the engine (modular workers poll ENGINE_PAUSED) and never launch a child process.
 */
const launchWorkerIfNeeded = (): boolean => {
    console.log('⛔ [server] worker.ts auto-spawn DISABLED (Bug 4 fix). Run the 6 modular workers via START_SOVEREIGN_ENGINE.bat.');
    return false;
};

const withRouteTimeout = async <T>(task: Promise<T>, ms: number, label: string): Promise<T> => {
    let timer: NodeJS.Timeout | undefined;
    try {
        return await Promise.race([
            task,
            new Promise<T>((_, reject) => {
                timer = setTimeout(() => reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`)), ms);
            })
        ]);
    } finally {
        if (timer) clearTimeout(timer);
    }
};

const csvEscape = (value: any) => {
    const text = value === null || value === undefined ? '' : String(value);
    return `"${text.replace(/"/g, '""')}"`;
};


const hashLicenseKey = (key: string) => createHash('sha256').update(key.trim()).digest('hex');

const allowedLicenseHashes = () => {
    const raw = process.env.ACTIVATION_KEYS || process.env.LICENSE_KEYS || '';
    return raw.split(',').map(k => k.trim()).filter(Boolean).map(hashLicenseKey);
};

const isLocalTestActivationKey = (key: string) => {
    const normalized = String(key || '').trim();
    return normalized === 'SOV-TEST-0001';
};

const buildLocalActivationPayload = async (holder: string, key: string) => {
    const deviceId = getDeviceId();
    const licenseId = 'lic_test_001';
    const now = new Date().toISOString();
    const nextCheckAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
    const tokenPayload = {
        license_id: licenseId,
        device_id: deviceId,
        customer_name: holder || 'Test Customer',
        device_hash: deviceId,
        activated_at: now,
        next_check_at: nextCheckAt
    };
    const token = encryptLocalSecret(JSON.stringify(tokenPayload));

    await setSetting('LICENSE_STATUS', 'active');
    await setSetting('LICENSE_DEVICE_ID', deviceId);
    await setSetting('LICENSE_REMOTE_DEVICE_ID', deviceId);
    await setSetting('LICENSE_ID', licenseId);
    await setSetting('LICENSE_ACTIVATED_AT', now);
    await setSetting('LICENSE_LAST_VERIFIED_AT', now);
    await setSetting('LICENSE_NEXT_CHECK_AT', nextCheckAt);
    await setSetting('LICENSE_TOKEN_ENC', token);
    await setSetting('LICENSE_HOLDER', holder || 'Test Customer');
    await setSetting('LICENSE_LAST_ERROR', '');

    return {
        success: true,
        activated: true,
        status: 'active',
        token,
        token_payload: tokenPayload,
        license_id: licenseId,
        device_id: deviceId,
        customer_name: holder || 'Test Customer',
        license_holder: holder || 'Test Customer',
        activation_key: key
    };
};

const callLicenseServer = async (path: string, body: Record<string, any>) => {
    const response = await fetch(`${LICENSE_SERVER_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data?.success === false) {
        throw new Error(data?.error || `License server returned ${response.status}`);
    }
    return data;
};

const verifyRemoteLicenseToken = async (): Promise<boolean> => {
    const encryptedToken = await getSetting('LICENSE_TOKEN_ENC');
    const token = decryptLocalSecret(encryptedToken);
    if (!token) {
        await setSetting('LICENSE_STATUS', 'inactive');
        return false;
    }

    try {
        const data = await callLicenseServer('/api/license/verify', {
            token,
            device_hash: getDeviceId()
        });
        if (!data.active && !data.activated) {
            await setSetting('LICENSE_STATUS', 'inactive');
            return false;
        }
        if (data.token) await setSetting('LICENSE_TOKEN_ENC', encryptLocalSecret(data.token));
        if (data.next_check_at) await setSetting('LICENSE_NEXT_CHECK_AT', data.next_check_at);
        if (data.license_id) await setSetting('LICENSE_ID', data.license_id);
        if (data.device_id) await setSetting('LICENSE_REMOTE_DEVICE_ID', data.device_id);
        await setSetting('LICENSE_LAST_VERIFIED_AT', new Date().toISOString());
        await setSetting('LICENSE_STATUS', 'active');
        return true;
    } catch (error: any) {
        await setSetting('LICENSE_LAST_ERROR', error.message || 'Remote license verification failed.');
        return false;
    }
};

// ========== LIVE LOGS (Dashboard Feedback) ==========
const logs: { id: string, timestamp: string, message: string, type: 'info' | 'success' | 'warning' | 'error' }[] = [];

app.post('/api/logs', (req, res) => {
    const { message, type } = req.body;
    if (!message) return res.status(400).send("No message provided");
    const log = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        message,
        type: type || 'info'
    };
    logs.unshift(log);
    if (logs.length > 50) logs.pop();
    res.json({ success: true });
});

app.get('/api/logs', (req, res) => {
    res.json(logs);
});

// ========== HEARTBEAT (Issue 4 — Worker Status) ==========
let lastHeartbeat: any = null;

app.post('/api/heartbeat', (req, res) => {
    lastHeartbeat = { ...req.body, received_at: new Date().toISOString() };
    res.json({ success: true });
});

app.get('/api/heartbeat', async (req, res) => {
    // Modular workers write heartbeats to the DB table. Fall back to it when the
    // deprecated monolithic worker's in-memory heartbeat is absent or stale.
    const dbRow = await getLatestDbHeartbeat();
    const dbAlive = await dbHeartbeatAlive();

    const hasMemHeartbeat = !!lastHeartbeat;
    const memAge = hasMemHeartbeat ? Date.now() - new Date(lastHeartbeat.received_at).getTime() : Infinity;
    const memAlive = hasMemHeartbeat && memAge < 60000;

    if (!hasMemHeartbeat && !dbRow) {
        return res.json({ status: 'offline', last_action: 'No heartbeat received', timestamp: null });
    }

    const isAlive = memAlive || dbAlive;
    if (hasMemHeartbeat && !memAlive) {
        res.json({
            ...lastHeartbeat,
            status: 'offline',
            age_seconds: Math.floor(memAge / 1000),
        });
        return;
    }

    res.json({
        ...(lastHeartbeat || { worker_id: dbRow?.worker_id || null }),
        status: isAlive ? 'running' : 'offline',
        last_action: lastHeartbeat?.last_action || (dbRow?.worker_id ? `${dbRow.worker_id} active` : undefined),
        timestamp: lastHeartbeat?.timestamp || dbRow?.last_active || null,
        age_seconds: memAlive ? Math.floor(memAge / 1000) : 0,
        db_heartbeat: dbRow || null
    });
});
// ========== LEADS ==========
app.get('/api/leads', (req, res) => {
    const includeQuarantined = String(req.query.include_quarantined || '') === '1';
    const query = includeQuarantined
        ? "SELECT * FROM leads ORDER BY added_at DESC"
        : "SELECT * FROM leads WHERE status != 'quarantined' ORDER BY added_at DESC";
    db.all(query, (err, rows) => {
        res.json(rows || []);
    });
});

app.post('/api/leads/clear', (req, res) => {
    db.run("DELETE FROM leads", (err) => {
        if (err) return res.json({ success: false, error: err.message });
        db.run("DELETE FROM contacts", (err2) => {
            if (err2) return res.json({ success: false, error: err2.message });
            db.run("DELETE FROM analytics", (err3) => {
                if (err3) return res.json({ success: false, error: err3.message });
                db.run("DELETE FROM outreach", (err4) => {
                    if (err4) return res.json({ success: false, error: err4.message });
                    db.run("DELETE FROM replies", (err5) => {
                        res.json({ success: !err5 });
                    });
                });
            });
        });
    });
});

// Manually update email for a single lead (for bot-blocked sites)
app.patch('/api/leads/:id/email', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const lead: any = await new Promise(resolve => db.get('SELECT website FROM leads WHERE id = ?', [id], (_err, row) => resolve(row)));
    const validation = await validateEmail(email, 'manual-entry', 'manual', lead?.website || '', false);
    if (!validation.normalizedAddress || validation.confidence < 35) {
        return res.status(400).json({ error: `Invalid or low-confidence email: ${validation.validationReason || 'validation failed'}` });
    }
    db.run(
        "UPDATE leads SET email = ?, email_source = 'manual', email_source_url = 'manual-entry', email_confidence_score = ?, email_verified = 0, email_ownership_verified = 0, email_ownership_status = 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED', status = CASE WHEN status = 'no_email' THEN 'new' ELSE status END WHERE id = ?",
        [validation.normalizedAddress, validation.confidence, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`✏️  Email manually updated for lead #${id}: ${email}`);
            res.json({ success: true, changes: this.changes });
        }
    );
});

// Delete single lead
app.delete('/api/leads/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM leads WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        db.run("DELETE FROM contacts WHERE lead_id = ?", [id]);
        db.run("DELETE FROM outreach_drafts WHERE lead_id = ?", [id]);
        console.log(`🗑️ Permanently deleted lead #${id}`);
        res.json({ success: true, changes: this.changes });
    });
});

// Delete batch leads
app.post('/api/leads/batch-delete', (req, res) => {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.map(Number).filter(Boolean) : [];
    if (ids.length === 0) return res.status(400).json({ error: "No lead IDs provided" });
    const placeholders = ids.map(() => '?').join(',');
    db.run(`DELETE FROM leads WHERE id IN (${placeholders})`, ids, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        db.run(`DELETE FROM contacts WHERE lead_id IN (${placeholders})`, ids);
        db.run(`DELETE FROM outreach_drafts WHERE lead_id IN (${placeholders})`, ids);
        console.log(`🗑️ Batch deleted ${this.changes} leads`);
        res.json({ success: true, count: this.changes });
    });
});

app.post('/api/leads/clear-stale', (req, res) => {
    const junkPatterns = ['%@lseg.com', '%@yellowpages%', '%@zawya%', '%.png', '%.jpg', '%.jpeg', '%.svg', '%.pdf'];
    let query = "DELETE FROM leads WHERE status = 'no_email' OR email IS NULL OR email = '' OR email = 'N/A'";
    junkPatterns.forEach(p => {
        query += ` OR email LIKE '${p}'`;
    });
    
    db.run(query, (err) => {
        console.log(`🗑️  Cleared stale and junk leads from DB`);
        res.json({ success: !err });
    });
});

// ========== CONTACTS / DECISION MAKERS ==========
app.get('/api/contacts', (req, res) => {
    const includeQuarantined = String(req.query.include_quarantined || '') === '1';
    // Task2 — "Verified Decision Makers" must ONLY include contacts that have a real
    // reachable channel (email and/or phone/mobile). Unverified rows with no contact
    // info (the "No public email found" placeholders) are excluded entirely.
    const contactChannelFilter = "((c.email IS NOT NULL AND c.email != '') OR (c.phone IS NOT NULL AND c.phone != '') OR (c.mobile_number IS NOT NULL AND c.mobile_number != ''))";
    const quarantineClause = includeQuarantined
        ? ''
        : "c.status != 'quarantined' AND COALESCE(l.status, '') != 'quarantined'";
    const whereClause = [quarantineClause, contactChannelFilter].filter(Boolean).join(' AND ');
    const whereSql = whereClause ? `WHERE ${whereClause}` : '';
    db.all(`SELECT c.*, l.website, l.status as lead_status,
                   l.phone as company_phone, l.mobile_number as company_mobile_number,
                   l.email as company_email, l.email_verified as company_email_verified,
                   l.email_source as company_email_source
            FROM contacts c
            LEFT JOIN leads l ON c.lead_id = l.id
            ${whereSql}
            ORDER BY datetime(c.created_at) DESC, c.email_ownership_verified DESC, c.person_identity_verified DESC, c.confidence_score DESC
            LIMIT 500`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

app.get('/api/leads/:id/contacts', (req, res) => {
    db.all(
        "SELECT * FROM contacts WHERE lead_id = ? AND status != 'quarantined' ORDER BY email_ownership_verified DESC, person_identity_verified DESC, confidence_score DESC, created_at DESC",
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows || []);
        }
    );
});

app.get('/api/contacts/export.csv', (req, res) => {
    db.all(`SELECT c.company_name, c.full_name, c.job_title, c.seniority, c.department,
                   c.email, c.phone, c.mobile_number, c.linkedin_url, c.domain,
                   c.confidence_score, c.person_identity_verified, c.person_name_confidence, c.role_confidence,
                   c.email_syntax_valid, c.email_domain_valid, c.email_mailbox_accepted,
                   c.email_domain_catch_all, c.email_ownership_status, c.email_ownership_verified,
                   c.source_evidence_json, c.is_decision_maker, c.source,
                   l.website
            FROM contacts c
            LEFT JOIN leads l ON c.lead_id = l.id
            WHERE c.status != 'quarantined' AND COALESCE(l.status, '') != 'quarantined'
              AND ((c.email IS NOT NULL AND c.email != '') OR (c.phone IS NOT NULL AND c.phone != '') OR (c.mobile_number IS NOT NULL AND c.mobile_number != ''))
            ORDER BY c.email_ownership_verified DESC, c.person_identity_verified DESC, c.confidence_score DESC, c.created_at DESC`, (err, rows: any[]) => {
        if (err) return res.status(500).json({ error: err.message });
        const headers = [
            'company_name', 'full_name', 'job_title', 'seniority', 'department',
            'email', 'phone', 'mobile_number', 'linkedin_url', 'domain',
            'confidence_score', 'person_identity_verified', 'person_name_confidence', 'role_confidence',
            'email_syntax_valid', 'email_domain_valid', 'email_mailbox_accepted', 'email_domain_catch_all',
            'email_ownership_status', 'email_ownership_verified', 'source_evidence_json',
            'is_decision_maker', 'source', 'website'
        ];
        const lines = [headers.join(',')];
        for (const row of rows || []) {
            lines.push(headers.map(header => csvEscape(row[header])).join(','));
        }
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="decision-makers.csv"');
        res.send(lines.join('\n'));
    });
});

app.post('/api/leads/re-enrich', async (req, res) => {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.map((id: any) => Number(id)).filter(Boolean) : [];
    const scope = String(req.body?.scope || 'selected');
    const limit = Math.max(1, Math.min(Number(req.body?.limit || 25), 250));
    const placeholders = ids.map(() => '?').join(',');
    let query = '';
    let params: any[] = [];

    if (ids.length > 0) {
        query = `SELECT * FROM leads WHERE id IN (${placeholders})`;
        params = ids;
    } else if (scope === 'no_email') {
        query = `SELECT * FROM leads
                 WHERE website IS NOT NULL AND website != '' AND website != 'N/A'
                   AND (email IS NULL OR email = '' OR status = 'no_email')
                 ORDER BY added_at DESC
                 LIMIT ?`;
        params = [limit];
    } else if (scope === 'missing_decision_makers') {
        query = `SELECT l.* FROM leads l
                 LEFT JOIN contacts c ON c.lead_id = l.id AND c.is_decision_maker = 1
                 WHERE l.website IS NOT NULL AND l.website != '' AND l.website != 'N/A'
                   AND (l.contact_name IS NULL OR l.contact_name = '' OR c.id IS NULL)
                 GROUP BY l.id
                 ORDER BY l.added_at DESC
                 LIMIT ?`;
        params = [limit];
    } else if (scope === 'missing_contacts') {
        query = `SELECT l.* FROM leads l
                 WHERE l.website IS NOT NULL AND l.website != '' AND l.website != 'N/A'
                   AND (
                     l.email IS NULL OR TRIM(l.email) = '' OR
                     COALESCE(NULLIF(TRIM(l.phone_e164), ''), NULLIF(TRIM(l.mobile_number), ''), NULLIF(TRIM(l.phone), '')) IS NULL
                   )
                 ORDER BY l.added_at DESC
                 LIMIT ?`;
        params = [limit];
    } else {
        query = `SELECT * FROM leads
                 WHERE website IS NOT NULL AND website != '' AND website != 'N/A'
                   AND status IN ('new','no_email','ready','priority_ready')
                 ORDER BY added_at DESC
                 LIMIT ?`;
        params = [limit];
    }

    try {
        const leads: any[] = await new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => err ? reject(err) : resolve(rows || []));
        });

        const results: any[] = [];
        let succeeded = 0;
        let failed = 0;
        let contactsSaved = 0;
        let emailsFound = 0;
        for (const lead of leads) {
            try {
                await new Promise<void>((resolve, reject) => db.run(
                    `UPDATE leads SET enrichment_status = 'processing', enrichment_started_at = CURRENT_TIMESTAMP,
                     enrichment_finished_at = NULL, enrichment_attempt_count = COALESCE(enrichment_attempt_count, 0) + 1,
                     next_retry_at = NULL, last_error_code = NULL, last_error_message = NULL, enrichment_worker_id = ? WHERE id = ?`,
                    [`api-${process.pid}`, lead.id], err => err ? reject(err) : resolve()
                ));
                const enrichment = await withRouteTimeout(enrichCompanyData(lead.company_name, lead.website), 90000, `Enrichment for lead ${lead.id}`);
                const emailValidation = await validateEmail(enrichment.email, lead.website, enrichment.email_source === 'website' ? 'visible_text' : 'search_result', lead.website, true);
                enrichment.email = emailValidation.syntaxValid && emailValidation.mxValid !== false ? emailValidation.normalizedAddress : null;
                if (!enrichment.email) {
                    enrichment.email_verified = false;
                    enrichment.email_is_fallback = false;
                }
                const mobileValidation = normalizePhone(enrichment.mobile_number || lead.mobile_number);
                const landlineValidation = normalizePhone(enrichment.phone || lead.phone);
                enrichment.mobile_number = mobileValidation || null;
                enrichment.phone = landlineValidation || null;
                const leadDomain = lead.domain || extractDomain(lead.website);
                let savedContacts = 0;
                for (const contact of enrichment.contacts || []) {
                    const saved = await upsertContact({
                        ...contact,
                        lead_id: lead.id,
                        company_name: enrichment.companyName || lead.company_name,
                        domain: leadDomain,
                        website: lead.website
                    });
                    if (saved) savedContacts++;
                }
                contactsSaved += savedContacts;
                if (enrichment.email) emailsFound++;

const genericMailbox = /^(info|contact|hello|sales|support|admin|office|enquiries|inquiries|welcome|reception|marketing|team|careers|hr|accounts|billing|service)@/i
    .test(String(enrichment.email || '').trim());
const outreachReady = Boolean(
    enrichment.relevant &&
    (enrichment.email &&
      enrichment.email_verified === true &&
      enrichment.email_ownership_verified === true &&
      enrichment.person_identity_verified === true &&
      Number(enrichment.person_name_confidence || 0) >= 85 &&
      Number(enrichment.role_confidence || 0) >= 80 &&
      Array.isArray(enrichment.source_evidence) && enrichment.source_evidence.length >= 1 &&
      enrichment.email_syntax_valid === true &&
      enrichment.email_domain_valid === true &&
      enrichment.email_is_fallback !== true &&
      !genericMailbox)
);
                const fallbackNote = enrichment.email && !outreachReady
                    ? 'Website email retained as fallback; decision-maker email still required.'
                    : null;

                await new Promise<void>((resolve) => {
                    db.run(
        `UPDATE leads SET
            email = COALESCE(?, email),
            email_source = COALESCE(?, email_source),
            email_is_fallback = ?,
            email_verified = ?,
            email_ownership_verified = ?,
            email_ownership_status = ?,
            person_identity_verified = ?,
            person_name_confidence = ?,
            role_confidence = ?,
            contact_source_evidence_json = ?,
            email_syntax_valid = ?,
            email_domain_valid = ?,
            email_mailbox_accepted = ?,
            email_domain_catch_all = ?,
            mobile_number = COALESCE(?, mobile_number),
            phone = COALESCE(?, phone),
                            contact_name = COALESCE(?, contact_name),
                            linkedin_url = COALESCE(?, linkedin_url),
                            company_name = COALESCE(?, company_name),
                            about_summary = COALESCE(?, about_summary),
                            status = CASE
                                WHEN ? = 1 THEN 'ready'
                                WHEN ? IS NOT NULL AND ? != '' THEN 'no_email'
                                WHEN status = 'new' THEN 'no_email'
                                ELSE status
                            END,
                            analysis_notes = CASE
                                WHEN ? IS NULL THEN NULLIF(REPLACE(analysis_notes, 'Enrichment failed: Cannot read properties of null (reading \'isValid\')', ''), '')
                                WHEN analysis_notes IS NULL OR analysis_notes = '' OR analysis_notes LIKE '%isValid%' THEN ?
                                ELSE ?
                            END
                         WHERE id = ?`,
        [
            enrichment.email,
            enrichment.email_source || null,
            enrichment.email_is_fallback === true ? 1 : 0,
            outreachReady ? 1 : 0,
            outreachReady ? 1 : 0,
            enrichment.email_ownership_status || 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
            enrichment.person_identity_verified === true ? 1 : 0,
            Number(enrichment.person_name_confidence || 0),
            Number(enrichment.role_confidence || 0),
            JSON.stringify(enrichment.source_evidence || []),
            enrichment.email_syntax_valid === true ? 1 : 0,
            enrichment.email_domain_valid === true ? 1 : 0,
            enrichment.email_mailbox_accepted === true ? 1 : 0,
            enrichment.email_domain_catch_all === true ? 1 : 0,
            enrichment.mobile_number,
            enrichment.phone,
                            enrichment.contact_name,
                            enrichment.linkedin_url,
                            enrichment.companyName || lead.company_name,
                            enrichment.scrapedText || null,
                            outreachReady ? 1 : 0,
                            enrichment.email,
                            enrichment.email,
                            fallbackNote,
                            fallbackNote,
                            fallbackNote,
                            lead.id
                        ],
                        () => resolve()
                    );
                });

                const completedAttempt = Number(lead.enrichment_attempt_count || 0) + 1;
                await new Promise<void>((resolve) => db.run(
                    `UPDATE leads SET enrichment_status = ?, enrichment_finished_at = CURRENT_TIMESTAMP,
                     enrichment_worker_id = NULL,
                     next_retry_at = CASE WHEN ? = 'retry_scheduled' THEN datetime('now', '+' || ? || ' minutes') ELSE NULL END,
                     email_source_url = ?, email_confidence_score = ?, email_mx_valid = ?,
                     phone_raw = ?, phone_e164 = ?, phone_is_valid = ?,
                     relevance_score = COALESCE(?, relevance_score), is_relevant = ? WHERE id = ?`,
                    [((enrichment.email || lead.email) || (enrichment.mobile_number || enrichment.phone || lead.phone_e164 || lead.mobile_number || lead.phone))
                        ? 'completed'
                        : completedAttempt >= 4 ? 'needs_review' : 'retry_scheduled',
                     ((enrichment.email || lead.email) || (enrichment.mobile_number || enrichment.phone || lead.phone_e164 || lead.mobile_number || lead.phone))
                        ? 'completed'
                        : completedAttempt >= 4 ? 'needs_review' : 'retry_scheduled',
                     Math.min(60, 2 ** completedAttempt),
                     lead.website || null, emailValidation.confidence, emailValidation.mxValid === null ? null : emailValidation.mxValid ? 1 : 0,
                     mobileValidation || landlineValidation || null,
                     mobileValidation || landlineValidation || null,
                     (mobileValidation || landlineValidation) ? 1 : 0,
                     Number.isFinite(Number(enrichment.relevance_score)) ? Number(enrichment.relevance_score) : null,
                     enrichment.relevant === false ? 0 : 1,
                     lead.id], () => resolve()
                ));

                succeeded++;
                results.push({ id: lead.id, company_name: lead.company_name, success: true, contacts: savedContacts, email: enrichment.email || null });
            } catch (e: any) {
                failed++;
                const attempt = Number(lead.enrichment_attempt_count || 0) + 1;
                const finalFailure = attempt >= 3;
                const delayMinutes = Math.min(60, 2 ** attempt);
                await new Promise<void>(resolve => db.run(
                    `UPDATE leads SET enrichment_status = ?, enrichment_finished_at = CURRENT_TIMESTAMP,
                     next_retry_at = CASE WHEN ? = 1 THEN NULL ELSE datetime('now', '+' || ? || ' minutes') END,
                     last_error_code = ?, last_error_message = ?, enrichment_worker_id = NULL WHERE id = ?`,
                    [finalFailure ? 'needs_review' : 'retry_scheduled', finalFailure ? 1 : 0, delayMinutes,
                     /timed out/i.test(e.message || '') ? 'ENRICHMENT_TIMEOUT' : 'ENRICHMENT_FAILED', String(e.message || 'Unknown enrichment failure').slice(0, 500), lead.id], () => resolve()
                ));
                results.push({ id: lead.id, company_name: lead.company_name, success: false, error: e.message });
            }
        }

        res.json({
            success: true,
            processed: results.length,
            scope,
            summary: {
                processed: results.length,
                succeeded,
                failed,
                contacts_saved: contactsSaved,
                emails_found: emailsFound
            },
            results
        });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// Queue selected verified leads for evidence-backed draft creation.
app.post('/api/bulk-send', async (req, res) => {
    if (!(await isLicenseActive())) {
        return res.status(403).json({
            error: 'Product is not activated on this device. Activate the license before creating drafts.'
        });
    }
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'No IDs provided' });
    const placeholders = ids.map(() => '?').join(',');
    
    db.run(`UPDATE leads SET status = 'ready' WHERE id IN (${placeholders}) AND email IS NOT NULL AND TRIM(email) != ''`, ids, async function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const count = this.changes;
        console.log(`🚀 Queued ${count} manually selected leads for AI Outreach Draft Creation!`);
        
        db.all(`SELECT * FROM leads WHERE id IN (${placeholders}) AND email IS NOT NULL AND TRIM(email) != ''`, ids, async (fetchErr, leads: any[]) => {
            if (!fetchErr && leads && leads.length > 0) {
                for (const lead of leads) {
                    const recipientEmail = lead.email;
                    const company = lead.company_name || 'Partner';
                    const contactName = lead.contact_name || null;
                    
                    let aboutText = (lead.about_summary && lead.about_summary.length > 50) ? lead.about_summary : `${company} is a business operating in UAE.`;
                    if (!aboutText) {
                        aboutText = `${company} is a business operating in UAE.`;
                    }
                    
                    const facts = [
                        { fact: `${company} provides B2B services and solutions in the UAE.`, source_url: lead.website || 'https://example.com' }
                    ];

                    let draftBody = '';
                    const shortCompany = company.split(/[|I\-\u2013\u2014]/)[0].trim().split(' ').slice(0, 4).join(' ');
                    // Dynamic subject lines — sound like a real founder's inbox
                    const subjectPool = [
                        `${shortCompany} + AI outreach`,
                        `Quick idea for ${shortCompany}`,
                        `${shortCompany} — thought of you`,
                        `For ${shortCompany}: outbound on autopilot`,
                        `${shortCompany} — client pipeline idea`,
                        `RE: ${shortCompany} lead gen`,
                        `Saw ${shortCompany} — had a thought`,
                        `${shortCompany} — scaling outreach`,
                    ];
                    let draftSubject = subjectPool[Math.abs(company.charCodeAt(0) * 7 + company.length) % subjectPool.length];

                    try {
                        const personalization = await personalizeOutreach(company, aboutText, lead.website, 'direct', 'llama3-70b-8192', contactName, facts);
                        if (personalization && personalization.body && !personalization.body.includes('BLOCK_DRAFT')) {
                            draftBody = personalization.body;
                        }
                    } catch (e) {
                        console.warn(`[BULK-SEND] AI Personalization fallback for ${company}`);
                    }

                    if (!draftBody) {
                        const greeting = contactName ? `Hi ${contactName},` : `Hi team at ${company},`;
                        draftBody = `${greeting}\n\nI was looking into ${company}'s work in the UAE. We built a private AI sales agent that automatically researches target commercial buyers, maps C-level decision makers, and drafts personalized account briefs for outreach.\n\nWould seeing a 1-page sample research brief for one target company your team wants to reach be useful?`;
                    }

                    db.run(`INSERT INTO outreach_drafts 
                            (lead_id, recipient_email, subject, text_body, prospect_facts_json, prompt_version, model, quality_score, validation_warnings_json, approval_status) 
                            VALUES (?, ?, ?, ?, ?, 'v3-human', 'ai-groq', 95, '[]', 'draft')`,
                            [lead.id, recipientEmail, draftSubject, draftBody, JSON.stringify(facts)], (dErr) => {
                                if (dErr) {
                                    db.run(`UPDATE outreach_drafts SET recipient_email = ?, subject = ?, text_body = ?, approval_status = 'draft', updated_at = CURRENT_TIMESTAMP WHERE lead_id = ?`,
                                           [recipientEmail, draftSubject, draftBody, lead.id]);
                                }
                            });
                }
            }
        });

        res.json({ success: true, updated: count, message: `${count} qualified leads queued for evidence review drafts. Human approval is required before sending.` });
    });
});

app.get('/api/outreach-drafts', (req, res) => {
    const includeFixtures = String(req.query?.include_fixtures || '') === '1';
    const fixtureFilter = includeFixtures ? '' : 'AND COALESCE(d.is_test_fixture, 0) = 0';
    db.all(`SELECT d.*, l.company_name, l.website, l.contact_name, l.linkedin_url,
                   l.email_verified, l.email_confidence_score, l.relevance_score, l.status as lead_status,
                   l.email_ownership_status, l.email_ownership_verified, l.person_identity_verified,
                   l.person_name_confidence, l.role_confidence, l.contact_source_evidence_json
            FROM outreach_drafts d
            JOIN leads l ON l.id = d.lead_id
            WHERE d.approval_status IN ('draft','approved','needs_review')
            ${fixtureFilter}
            ORDER BY CASE d.approval_status WHEN 'draft' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
                     d.created_at DESC
            LIMIT 250`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

app.post('/api/outreach-drafts/fixture', (req, res) => {
    const evidence = [{
        source_url: 'https://example.com/evidence',
        excerpt: 'Amina Rahman - Managing Director - review-fixture@example.com',
        evidence_type: 'name_role_email'
    }];
    db.run(`INSERT OR IGNORE INTO leads
            (company_name, website, domain, email, contact_name, status, is_relevant, relevance_score,
             email_source, email_is_fallback, email_verified, email_confidence_score,
             person_identity_verified, person_name_confidence, role_confidence, contact_source_evidence_json,
             email_syntax_valid, email_domain_valid, email_mailbox_accepted, email_domain_catch_all,
             email_ownership_status, email_ownership_verified)
            VALUES ('Review Fixture Company', 'https://example.com', 'review-fixture.example.com',
                    'review-fixture@example.com', 'Amina Rahman', 'ready', 1, 100,
                    'fixture', 0, 1, 100, 1, 95, 95, ?, 1, 1, 0, 0,
                    'EMAIL_PERSON_OWNERSHIP_VERIFIED', 1)`, [JSON.stringify(evidence)], (insertErr) => {
        if (insertErr) return res.status(500).json({ error: insertErr.message });
        db.get("SELECT id FROM leads WHERE domain = 'review-fixture.example.com'", (findErr, lead: any) => {
            if (findErr || !lead) return res.status(500).json({ error: findErr?.message || 'Fixture lead unavailable.' });
            db.run("DELETE FROM outreach_drafts WHERE lead_id = ? AND is_test_fixture = 1", [lead.id], (deleteErr) => {
                if (deleteErr) return res.status(500).json({ error: deleteErr.message });
                const facts = [
                    { fact: 'The fixture company publishes a named managing director.', source_url: 'https://example.com/evidence' },
                    { fact: 'The fixture uses an explicitly sourced non-deliverable example.com address.', source_url: 'https://example.com/evidence' },
                    { fact: 'This record exists only to test editing, approval and rejection.', source_url: 'https://example.com/evidence' }
                ];
                db.run(`INSERT INTO outreach_drafts
                        (lead_id, recipient_email, subject, text_body, prospect_facts_json, prompt_version,
                         model, quality_score, validation_warnings_json, approval_status, is_test_fixture)
                        VALUES (?, 'review-fixture@example.com', 'Safe review workflow fixture',
                                'Hello Amina,\n\nThis is a non-deliverable review fixture. Edit, approve, or reject it to verify the workflow safely.',
                                ?, 'fixture-v1', 'none', 100, '[]', 'draft', 1)`,
                    [lead.id, JSON.stringify(facts)], function(draftErr) {
                        if (draftErr) return res.status(500).json({ error: draftErr.message });
                        res.json({ success: true, draft_id: this.lastID, message: 'Safe non-deliverable review fixture created.' });
                    });
            });
        });
    });
});

app.patch('/api/outreach-drafts/:id', (req, res) => {
    const subject = String(req.body?.subject || '').trim();
    const textBody = String(req.body?.text_body || '').trim();
    if (!subject || !textBody) return res.status(400).json({ error: 'Subject and body are required.' });
    db.run(`UPDATE outreach_drafts SET subject = ?, text_body = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND approval_status = 'draft'`, [subject, textBody, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (!this.changes) return res.status(409).json({ error: 'Only pending drafts can be edited.' });
        res.json({ success: true });
    });
});

app.post('/api/outreach-drafts/:id/approve', (req, res) => {
    db.get(`SELECT d.*, l.email_verified, l.email_is_fallback, l.email_confidence_score, l.is_relevant,
                   l.email_ownership_verified, l.person_identity_verified, l.person_name_confidence,
                   l.role_confidence, l.contact_source_evidence_json, l.linkedin_url, l.website, l.domain,
                   l.email_source, l.email_ownership_status, l.email_syntax_valid, l.email_domain_valid, l.email_mx_valid
            FROM outreach_drafts d JOIN leads l ON l.id = d.lead_id WHERE d.id = ?`, [req.params.id], (err, draft: any) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!draft) return res.status(404).json({ error: 'Draft not found.' });
        const isFixture = Number(draft.is_test_fixture || 0) === 1;
        const sourcedFacts = safeParseArray(draft.prospect_facts_json)
            .filter(item => String(item?.fact || '').trim() && /^https?:\/\//i.test(String(item?.source_url || '').trim()));
        const meaningfulFacts = sourcedFacts.filter(isMeaningfulDraftFact);
        const personEvidence = hasPersonLevelDraftEvidence(draft);
        const hasConfirmedAiCompletion = /^(openrouter|openai|groq|mistral):[^\s]+$/i.test(String(draft.model || '').trim());
        const verifiedPersonQualified = draft.email_verified === 1 && isStrictPersonEmail(draft)
            && Number(draft.email_confidence_score || 0) >= 55 && Number(draft.is_relevant || 0) === 1
            && sourcedFacts.length >= 2 && meaningfulFacts.length >= 1 && personEvidence && hasConfirmedAiCompletion;
        const companyMailboxQualified = isReviewableCompanyMailboxDraft(draft)
            && Number(draft.is_relevant || 0) === 1
            && sourcedFacts.length >= 2
            && hasConfirmedAiCompletion;
        const subject = String(req.body?.subject || draft.subject || '').trim();
        const textBody = String(req.body?.text_body || draft.text_body || '').trim();
        if (!subject || !textBody) return res.status(400).json({ error: 'Subject and body are required.' });
        db.run(`UPDATE outreach_drafts SET subject = ?, text_body = ?, approval_status = 'approved',
                approved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND approval_status = 'draft'`,
            [subject, textBody, req.params.id], function(updateErr) {
                if (updateErr) return res.status(500).json({ error: updateErr.message });
                db.run("UPDATE leads SET status = 'approved' WHERE id = ?", [draft.lead_id]);
                res.json({ success: true, message: 'Draft approved successfully.' });
            });
    });
});

// Bulk Approve All Drafts
app.post('/api/outreach-drafts/bulk-approve', (req, res) => {
    db.run(`UPDATE outreach_drafts SET approval_status = 'approved', approved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE approval_status = 'draft'`, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        const count = this.changes;
        db.run(`UPDATE leads SET status = 'approved' WHERE id IN (SELECT lead_id FROM outreach_drafts WHERE approval_status = 'approved')`);
        console.log(`✅ BULK APPROVED ${count} drafts!`);
        res.json({ success: true, count, message: `Successfully approved all ${count} drafts!` });
    });
});

// Bulk Delete / Reject All Drafts
app.post('/api/outreach-drafts/bulk-delete', (req, res) => {
    db.run(`DELETE FROM outreach_drafts`, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        const count = this.changes;
        console.log(`🗑️ BULK DELETED ${count} drafts!`);
        res.json({ success: true, count, message: `Successfully deleted all ${count} drafts!` });
    });
});

app.post('/api/outreach-drafts/:id/reject', (req, res) => {
    db.get('SELECT lead_id FROM outreach_drafts WHERE id = ?', [req.params.id], (err, draft: any) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!draft) return res.status(404).json({ error: 'Draft not found.' });
        db.run(`UPDATE outreach_drafts SET approval_status = 'rejected', rejected_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP WHERE id = ? AND approval_status IN ('draft','approved')`, [req.params.id], function(updateErr) {
            if (updateErr) return res.status(500).json({ error: updateErr.message });
            db.run("UPDATE leads SET status = 'needs_review' WHERE id = ?", [draft.lead_id]);
            res.json({ success: true });
        });
    });
});

// ========== ANALYTICS ==========
app.get('/api/analytics', (req, res) => {
    db.all("SELECT * FROM analytics ORDER BY date ASC", (err, rows) => {
        res.json(rows || []);
    });
});

// ========== SETTINGS ==========
app.get('/api/settings', async (req, res) => {
    try {
        const config = await loadSystemConfig();
        res.json(config);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/settings', (req, res) => {
    const { settings } = req.body;
    if (!settings) return res.status(400).json({ error: 'No settings provided' });
    for (const key of ['COMPANY_URL', 'officialWebsiteUrl']) {
        if (settings[key] && !websiteHostname(settings[key])) return res.status(400).json({ error: `${key} must contain only a valid HTTP/HTTPS website URL. HTML is not allowed.` });
    }
    for (const key of ['SIGNATURE_IMAGE_URL', 'signatureImageUrl']) {
        if (settings[key] && (!websiteHostname(settings[key]) || /[<>]/.test(String(settings[key])))) return res.status(400).json({ error: `${key} must be a valid image URL without HTML.` });
    }

    const entries = Object.entries(settings).filter(([key]) => !/_(CONFIGURED|UPDATED_AT)$/i.test(key));
    if (entries.length === 0) return res.json({ success: true });

    let completed = 0;
    let failed = false;

    const sensitiveKeys = ['GMAIL_APP_PASS', 'gmail_pass', 'smtp_password', 'GROQ_API_KEY', 'groq_api_key', 'MISTRAL_API_KEY', 'mistral_api_key', 'OPENROUTER_API_KEY', 'openrouter_api_key', 'OPENAI_API_KEY', 'openai_api_key', 'ANTHROPIC_API_KEY', 'anthropic_api_key', 'GEMINI_API_KEY', 'gemini_api_key', 'SMTP_PASSWORD', 'WEBHOOK_URL', 'webhook_url'];

    entries.forEach(([key, value]) => {
        let valToStore = String(value);
        if (sensitiveKeys.includes(key) && !valToStore.trim()) {
            completed++;
            if (completed === entries.length) res.json({ success: true });
            return;
        }
        if (sensitiveKeys.includes(key) && valToStore) {
            // Only encrypt if it's not already masked value (which dashboard might send back if unmodified)
            const isMasked = valToStore.startsWith('●●●●') || valToStore.startsWith('????') || valToStore.includes('•') || valToStore.includes('🔏') || valToStore === '••••••••';
            if (!isMasked) {
                valToStore = encryptLocalSecret(valToStore);
            } else {
                // If it is masked, do not overwrite the existing encrypted value in the DB!
                completed++;
                if (completed === entries.length) {
                    res.json({ success: true });
                }
                return;
            }
        }

        db.run(`INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`, [key, valToStore], (err) => {
            if (failed) return;
            if (err) {
                failed = true;
                return res.status(500).json({ error: err.message });
            }

            completed++;
            if (completed === entries.length) {
                console.log(`[SETTINGS] Saved ${entries.length} values.`);
                res.json({ success: true });
            }
        });
    });
});

app.post('/api/settings/test-llm', async (req, res) => {
    try {
        const provider = String(req.body?.provider || '').trim().toLowerCase();
        let apiKey = String(req.body?.apiKey || '').trim();

        if (!provider || !['openrouter', 'openai', 'groq', 'mistral'].includes(provider)) {
            return res.status(400).json({ success: false, error: 'Valid provider is required.' });
        }

        if (!apiKey) {
            const systemConfig = await loadSystemConfig();
            const fallbackKey = provider === 'groq' ? (systemConfig.groq_api_key || systemConfig.GROQ_API_KEY) :
                                provider === 'mistral' ? (systemConfig.mistral_api_key || systemConfig.MISTRAL_API_KEY) :
                                provider === 'openai' ? (systemConfig.openai_api_key || systemConfig.OPENAI_API_KEY) :
                                (systemConfig.openrouter_api_key || systemConfig.OPENROUTER_API_KEY);
            if (fallbackKey) {
                apiKey = String(fallbackKey).trim();
            } else {
                return res.status(400).json({ success: false, error: 'API key is required.' });
            }
        }

        let keyToTest = apiKey;
        if (isMaskedApiKey(apiKey)) {
            const dbKeyName = provider === 'openrouter' ? 'OPENROUTER_API_KEY' : provider === 'openai' ? 'OPENAI_API_KEY' : provider === 'groq' ? 'GROQ_API_KEY' : 'MISTRAL_API_KEY';
            const encryptedVal = await getSetting(dbKeyName);
            if (!encryptedVal) {
                const providerLabel = provider === 'openrouter' ? 'OpenRouter' : provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Mistral';
                return res.status(400).json({
                    success: false,
                    error: `Saved ${providerLabel} key was not found. Paste the full key, save settings, then test again.`
                });
            }
            keyToTest = decryptLocalSecret(encryptedVal) || encryptedVal;
        }

        const openAiModel = String(req.body?.model || await getSetting('OPENAI_MODEL') || 'gpt-4o-mini').trim() || 'gpt-4o-mini';
        const openRouterModel = String(req.body?.model || await getSetting('OPENROUTER_MODEL') || 'openai/gpt-4o-mini').trim() || 'openai/gpt-4o-mini';
        const result = provider === 'openrouter'
            ? await testOpenRouterKey(keyToTest, openRouterModel)
            : provider === 'openai'
                ? await testOpenAIKey(keyToTest, openAiModel)
                : provider === 'groq'
                ? await testGroqKey(keyToTest)
                : await testMistralKey(keyToTest);

        const providerLabel = provider === 'openrouter' ? 'OpenRouter' : provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Mistral';

        return res.json({
            success: true,
            provider,
            message: `${providerLabel} connection successful.`,
            ...result
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            error: error?.message || 'LLM test failed.'
        });
    }
});

app.get('/api/discovery/plan', async (req, res) => {
    try {
        const settings = await loadSystemConfig();
        const ranked = rankQueries(await generateSearchPlan(settings), settings);
        res.json({
            success: true,
            generated_at: new Date().toISOString(),
            mode: (settings.investigation_depth || 'shallow') === 'deep' ? 'deep' : 'shallow',
            location: settings.target_location || settings.TARGET_LOCATION || 'UAE',
            queries: ranked.map(item => item.query),
            ranked_queries: ranked
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message || 'Unable to build discovery plan' });
    }
});

// ========== LICENSE / ACTIVATION ==========
app.get('/api/license/status', async (req, res) => {
    const active = await isLicenseActive();
    const status = await getSetting('LICENSE_STATUS');
    const deviceId = getDeviceId();
    res.json({
        activated: active,
        status: status || 'inactive',
        device_id: deviceId,
        remote_device_id: await getSetting('LICENSE_REMOTE_DEVICE_ID'),
        license_id: await getSetting('LICENSE_ID'),
        activated_at: await getSetting('LICENSE_ACTIVATED_AT'),
        last_verified_at: await getSetting('LICENSE_LAST_VERIFIED_AT'),
        next_check_at: await getSetting('LICENSE_NEXT_CHECK_AT'),
        last_error: await getSetting('LICENSE_LAST_ERROR'),
        license_holder: await getSetting('LICENSE_HOLDER')
    });
});

// ── SMTP Connection Test ──────────────────────────────────────────────────────
app.post('/api/test-smtp', async (req, res) => {
    try {
        // Read credentials from DB or fallback to request body passed from frontend input
        const config = await loadSystemConfig();
        const emailUser = String(req.body?.email || req.body?.email_user || config.email || '').trim();
        const emailPass = String(req.body?.pass || req.body?.gmail_pass || req.body?.smtp_password || config.gmail_pass || '').trim();
        const smtpHost  = String(req.body?.host || req.body?.smtp_host || config.smtp_host || '').trim();
        const smtpPort  = parseInt(String(req.body?.port || req.body?.smtp_port || config.smtp_port || '465'));

        if (!emailUser) {
            return res.json({ success: false, error: 'No outreach email provided. Please enter your email address.' });
        }
        if (!emailPass) {
            return res.json({ success: false, error: 'No email password provided. Please enter your Hostinger Email password.' });
        }

        // Derive SMTP host intelligently
        const resolvedHost = smtpHost ||
            (emailUser.includes('@gmail.com') ? 'smtp.gmail.com' :
             emailUser.includes('@outlook.com') || emailUser.includes('@hotmail.com') ? 'smtp.office365.com' :
             'smtp.hostinger.com');

        console.log(`[SERVER] Testing SMTP: ${emailUser} → ${resolvedHost}:${smtpPort}`);

        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
            host: resolvedHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: emailUser, pass: emailPass },
            connectionTimeout: 12000,
            greetingTimeout: 10000,
        });
        await transporter.verify();
        transporter.close();
        console.log(`[SERVER] SMTP test PASSED for ${emailUser}`);
        return res.json({ success: true, host: resolvedHost, email: emailUser });
    } catch (err: any) {
        const msg = err?.message || String(err);
        console.log(`[SERVER] SMTP test FAILED: ${msg}`);
        return res.json({ success: false, error: msg });
    }
});


app.post('/api/license/activate', async (req, res) => {
    const key = String(req.body?.activation_key || '').trim();
    const holder = String(req.body?.license_holder || '').trim();
    if (!key) return res.status(400).json({ success: false, error: 'Activation key required.' });

    try {
        let data: any = null;
        const keyAllowed = isLocalTestActivationKey(key) || allowedLicenseHashes().includes(hashLicenseKey(key));

        if (!keyAllowed) {
            data = await callLicenseServer('/api/license/activate', {
                activation_key: key,
                license_holder: holder,
                customer_name: holder,
                device_hash: getDeviceId()
            });
        } else {
            try {
                data = await callLicenseServer('/api/license/activate', {
                    activation_key: key,
                    license_holder: holder,
                    customer_name: holder,
                    device_hash: getDeviceId()
                });
            } catch (remoteError: any) {
                console.warn(`[LICENSE] Remote activation unavailable, using local fallback for test key: ${remoteError?.message || remoteError}`);
                data = await buildLocalActivationPayload(holder, key);
            }
        }

        await setSetting('LICENSE_STATUS', 'active');
        await setSetting('LICENSE_DEVICE_ID', getDeviceId());
        await setSetting('LICENSE_REMOTE_DEVICE_ID', data.device_id || '');
        await setSetting('LICENSE_ID', data.license_id || '');
        await setSetting('LICENSE_ACTIVATED_AT', data.token_payload?.activated_at || new Date().toISOString());
        await setSetting('LICENSE_LAST_VERIFIED_AT', new Date().toISOString());
        if (data.token_payload?.next_check_at) await setSetting('LICENSE_NEXT_CHECK_AT', data.token_payload.next_check_at);
        if (data.token) await setSetting('LICENSE_TOKEN_ENC', encryptLocalSecret(data.token));
        if (holder || data.customer_name) await setSetting('LICENSE_HOLDER', holder || data.customer_name);
        await setSetting('LICENSE_LAST_ERROR', '');

        res.json({
            success: true,
            activated: true,
            status: 'active',
            device_id: getDeviceId(),
            remote_device_id: data.device_id,
            license_id: data.license_id,
            license_holder: holder || data.customer_name,
            next_check_at: data.token_payload?.next_check_at
        });
    } catch (error: any) {
        await setSetting('LICENSE_STATUS', 'inactive');
        await setSetting('LICENSE_LAST_ERROR', error.message || 'Activation failed.');
        res.status(403).json({ success: false, error: error.message || 'Activation failed.' });
    }
});

app.post('/api/license/sync', async (req, res) => {
    const token = String(req.body?.token || '').trim();
    const licenseId = String(req.body?.license_id || '').trim();
    const deviceId = String(req.body?.device_id || '').trim();
    const holder = String(req.body?.license_holder || req.body?.customer_name || '').trim();
    const activatedAt = String(req.body?.activated_at || '').trim();
    const nextCheckAt = String(req.body?.next_check_at || '').trim();
    const remoteDeviceId = String(req.body?.remote_device_id || deviceId || '').trim();

    if (!licenseId) return res.status(400).json({ success: false, error: 'license_id required.' });
    if (!deviceId) return res.status(400).json({ success: false, error: 'device_id required.' });

    try {
        await setSetting('LICENSE_STATUS', 'active');
        await setSetting('LICENSE_ID', licenseId);
        await setSetting('LICENSE_DEVICE_ID', deviceId);
        await setSetting('LICENSE_REMOTE_DEVICE_ID', remoteDeviceId);
        if (holder) await setSetting('LICENSE_HOLDER', holder);
        if (activatedAt) await setSetting('LICENSE_ACTIVATED_AT', activatedAt);
        await setSetting('LICENSE_LAST_VERIFIED_AT', new Date().toISOString());
        if (nextCheckAt) await setSetting('LICENSE_NEXT_CHECK_AT', nextCheckAt);
        if (token) await setSetting('LICENSE_TOKEN_ENC', encryptLocalSecret(token));
        await setSetting('LICENSE_LAST_ERROR', '');

        return res.json({
            success: true,
            synced: true,
            status: 'active',
            license_id: licenseId,
            device_id: deviceId,
            remote_device_id: remoteDeviceId,
            license_holder: holder || null,
            activated_at: activatedAt || new Date().toISOString(),
            next_check_at: nextCheckAt || null
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message || 'License sync failed.' });
    }
});

// ========== KNOWLEDGE BASE INGESTION (PDF) ==========
app.post('/api/settings/kb-upload', async (req, res) => {
    const { base64Pdf, fileName } = req.body;
    if (!base64Pdf) return res.status(400).json({ error: 'No PDF data' });

    try {
        // v24.1: Bugfix — Use direct lib import to avoid pdf-parse/index.js test-file bug
        const { default: pdf } = await import('pdf-parse/lib/pdf-parse.js' as any);
        const buffer = Buffer.from(base64Pdf, 'base64');
        const data = await pdf(buffer);
        const text = data.text.replace(/\s+/g, ' ').trim();

        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['COMPANY_KNOWLEDGE', text], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`📚 KB Ingested: ${text.length} chars from "${fileName}"`);
            res.json({ success: true, length: text.length, textSnippet: text.slice(0, 1000), text: text });
        });
    } catch (e: any) {
        console.error("PDF Parsing Error:", e);
        res.status(500).json({ error: "Failed to parse PDF" });
    }
});

// ========== IDENTITY SCRAPER (WEBSITE) ==========
app.post('/api/settings/scrape-self', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    try {
        const axios = (await import('axios')).default;
        const response = await axios.get(url, { timeout: 10000 });
        const html = response.data;
        // Simple text extraction from HTML
        const text = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
                         .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "")
                         .replace(/<[^>]+>/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim()
                         .slice(0, 5000);

        db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['PITCH_CONTEXT', text], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            console.log(`🔍 Self-Scrape: ${text.length} chars from "${url}"`);
            res.json({ success: true, suggested_pitch: text });
        });
    } catch (e: any) {
        console.error("Self-Scrape Error:", e);
        res.status(500).json({ error: "Failed to scan website" });
    }
});


// ========== BULK GMB / LIST IMPORT ==========
// Accepts raw pasted text — each line can be:
//   - A company name (e.g. "Al Madar Engineering")
//   - A website URL (e.g. "https://almadar.ae")
//   - A Google Maps GMB URL (e.g. "https://www.google.com/maps/place/...")
//   - Raw GMB text blocks (name, address, phone on separate lines)
app.post('/api/bulk-import', (req, res) => {
    const { data, category } = req.body;
    if (!data) return res.status(400).json({ error: 'No data provided' });

    let lines = data.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 2);
    
    // GMB Noise Filter: Removes UI elements, reviews, and ratings from raw Maps copy-paste
    lines = lines.filter((l: string) => {
        const lower = l.toLowerCase();
        // Exact UI buttons & common GMB noise
        if (['website', 'directions', 'save', 'share', 'nearby', 'send to phone', 'add a label', 'your maps history', 'suggest an edit', 'own this business?'].includes(lower)) return false;
        // Status lines & Meta strings
        if (l.includes('·')) return false; // GMB heavily uses middle dot for "Hours · Phone" etc.
        if (lower.startsWith('open now') || lower.startsWith('closes ') || lower.startsWith('closed') || lower.startsWith('opens ')) return false;
        // Reviews
        if (l.startsWith('"') || l.startsWith('“')) return false;
        // Ratings & Numbers (e.g. "4.2", "(105)", or starts with stars)
        if (/^\d\.\d\s*\(\d+\)/.test(l) || lower.includes('⭐') || /^\(\d+\)$/.test(l.trim()) || /^\d[\d.,]*$/.test(l.trim())) return false;
        // Phone numbers purely numbers/spaces
        if (/^[\d\s\-\+()]{8,}$/.test(l)) return false; 
        // Plus codes / Addresses
        if (/^[A-Z0-9]{4}\+[A-Z0-9]{2}/.test(l)) return false; 
        if (lower.includes('st - ') || lower.includes('street - ') || lower.includes('floor, ') || lower.includes('building,')) return false;
        
        // Skip very short lines (often stray meta data)
        if (l.length < 5) return false;

        return true;
    });

    // Final dedup to prevent duplicate entries from the same paste (like categories repeating)
    lines = [...new Set(lines)];

    console.log(`📥 Bulk Import: ${lines.length} cleaned lines, category="${category || 'Manual Import'}"`);

    let inserted = 0;
    const insertPromises = lines.map((line: string) => new Promise<void>((resolve) => {
        const isGmbUrl = line.includes('google.com/maps') || line.includes('maps.app.goo.gl');
        const isDomain = !line.includes(' ') && line.includes('.');
        let isUrl = false;
        let parsedHost = '';
        
        try {
            if (line.startsWith('http')) {
                parsedHost = new URL(line).hostname;
                isUrl = true;
            }
        } catch (e) {
            isUrl = false;
        }

        let company_name = line;
        let website: string | null = null;

        if (isGmbUrl) {
            // Store the GMB URL as website; worker will scrape it for actual website + email
            website = line.startsWith('http') ? line : `https://${line}`;
            company_name = 'GMB Import — Pending Discovery';
        } else if (isUrl) {
            website = line;
            company_name = parsedHost.replace('www.', '').split('.')[0].replace(/-/g, ' ');
        } else if (isDomain) {
            website = `https://${line}`;
            company_name = line.split('.')[0].replace(/-/g, ' ');
        }
        // else: plain company name, no website — worker will search DDG for it

        db.run(
            `INSERT OR IGNORE INTO leads 
             (company_name, website, type, status, category, location, added_at) 
             VALUES (?, ?, ?, 'new', ?, 'UAE', ?)`,
            [company_name, website, isGmbUrl ? 'gmb_import' : 'bulk_import', category || 'Manual Import', new Date().toISOString()],
            function(err) {
                if (!err && this.changes > 0) inserted++;
                resolve();
            }
        );
    }));

    Promise.all(insertPromises).then(() => {
        const msg = `✅ Bulk Import: ${inserted}/${lines.length} new targets queued for Discovery Engine.`;
        console.log(msg);
        res.json({ success: true, count: lines.length, inserted });
    });
});

// ========== GMB URL BATCH IMPORT ==========
// Accepts an array of Google Maps URLs string (one per line in body.urls)
// Worker will scrape each GMB page for business name, website, phone, then email
app.post('/api/gmb-urls', (req, res) => {
    const { urls, category } = req.body;
    if (!urls) return res.status(400).json({ error: 'No urls provided' });

    const urlList: string[] = (typeof urls === 'string' ? urls.split('\n') : urls)
        .map((u: string) => u.trim())
        .filter((u: string) => u.length > 5 && (u.includes('google.com/maps') || u.includes('goo.gl') || u.startsWith('http')));

    console.log(`📍 GMB URL Import: ${urlList.length} profiles queued`);

    let inserted = 0;
    const insertPromises = urlList.map((gmbUrl: string) => new Promise<void>((resolve) => {
        db.run(
            `INSERT OR IGNORE INTO leads 
             (company_name, website, type, status, category, location, added_at) 
             VALUES (?, ?, 'gmb_import', 'new', ?, 'UAE', ?)`,
            ['GMB Profile — Pending', gmbUrl, category || 'GMB Import', new Date().toISOString()],
            function(err) {
                if (!err && this.changes > 0) inserted++;
                resolve();
            }
        );
    }));

    Promise.all(insertPromises).then(() => {
        console.log(`✅ GMB URLs Queued: ${inserted} profiles added. Worker will discover details automatically.`);
        res.json({ success: true, count: urlList.length, inserted, message: `${inserted} GMB profiles queued. Worker is discovering contact details automatically.` });
    });
});

// ========== SEARCH (Manual) ==========
app.post('/api/search', async (req, res) => {
    const { query } = req.body;
    const mode = String(req.body?.mode || 'fast').toLowerCase() === 'deep' ? 'deep' : 'fast';
    if (!query) return res.status(400).json({ error: 'Query required' });

    console.log(`📡 Manual search request [${mode}]: "${query}"`);
    // #region agent log
    fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H3_wrong_query_used_for_discovery',location:'server.ts:/api/search/before_findLeads',message:'Manual query forwarded to findLeads()',data:{queryLen:String(query).length,queryPreview:String(query).slice(0,120),hasPlumbing:String(query).toLowerCase().includes('plumbing')},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    // Hard safety: refuse non-target niches (fast, deterministic; no AI)
    const qLower = String(query).toLowerCase();
    const forbiddenNiches = ['plumbing', 'drainage', 'sanitary', 'plumber'];
    if (forbiddenNiches.some(k => qLower.includes(k))) {
        return res.status(400).json({
            error: 'Rejected search query (not our target niche). Use electrical/MEP/electromechanical/switchgear/panel builder keywords.'
        });
    }
    try {
        const discoveryTask = mode === 'deep' ? findLeads(query) : findLeadTargetsFast(query);
        const timeoutMs = mode === 'deep' ? 110000 : 30000;
        const { leads, trace } = await withRouteTimeout(discoveryTask, timeoutMs, `Discovery (${mode})`);
        console.log(`🔍 Found ${leads.length} leads in ${mode} mode. Inserting into DB...`);

        let inserted = 0;
        const insertPromises = leads.map(lead => new Promise<void>(async (resolve) => {
            if (!lead.company_name || !lead.website) return resolve();
            
            try {
                // 1. Strict Deduplication
                const existing = await new Promise((res) => {
                    db.get("SELECT id FROM leads WHERE website = ? OR company_name LIKE ?", 
                    [lead.website, lead.company_name], (err, row) => res(row));
                });
                if (existing) return resolve();

                // 2. Database Insertion
                db.run(
                    `INSERT OR IGNORE INTO leads 
                     (company_name, website, type, phone, location, category, status, email, mobile_number, relevance_score) 
                     VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)`,
                    [
                        lead.company_name, lead.website, lead.type || 'manual_search', 
                        lead.phone || lead.mobile_number || '', 'UAE', query,
                        lead.email || null, lead.mobile_number || null, 10
                    ],
                    function(err) {
                        if (!err && this.changes > 0) inserted++;
                        resolve();
                    }
                );
            } catch (e) {
                console.error("Manual Search Process Error:", e);
                resolve();
            }
        }));

        await Promise.all(insertPromises);
        const duplicateCount = leads.length - inserted;
        console.log(`💾 Committed ${inserted} new leads. Ignored ${duplicateCount} duplicates.`);
        res.json({ success: true, mode, count: leads.length, inserted, duplicates: duplicateCount, trace });
    } catch (e: any) {
        console.error("Search API Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

// ========== GMB NINJA SCAN (v20.0) ==========
app.post('/api/gmb-ninja-scan', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query required' });

    await logToDashboard(`🥷 GMB Ninja: Initiating Stealth Discovery Scan for "${query}"...`, 'info');
    console.log(`🥷 GMB Ninja: Starting Stealth Discovery for "${query}"...`);
    
    // Non-blocking response: The scan takes time, so we return 200 immediately
    // and process in the background. Progress is visible via /api/logs
    res.json({ success: true, message: `Ninja Mining started for "${query}". Check logs for progress.` });

    try {
        const leads = await runGmbNinjaScan(query, 'UAE', true);
        await logToDashboard(`✅ GMB Ninja: Scan finished for "${query}". Found ${leads.length} targets.`, 'success');
        console.log(`🥷 GMB Ninja: Scan finished for "${query}". Found ${leads.length} leads.`);
    } catch (e: any) {
        await logToDashboard(`❌ GMB Ninja Scan Failed: ${e.message}`, 'error');
        console.error(`❌ GMB Ninja Scan Failed: ${e.message}`);
    }
});

// (bulk-send is handled by the route above at /api/bulk-send)

app.get('/api/worker/status', async (req, res) => {
    const paused = (await getSetting('ENGINE_PAUSED')) === 'true';
    const childOnline = !!workerProcess && !workerProcess.killed;
    // Modular workers ping the DB heartbeat table; the in-memory heartbeat only
    // reflects the deprecated monolithic worker.ts. Consider both.
    const dbHeartbeatOnline = await dbHeartbeatAlive();
    const heartbeatOnline = isHeartbeatAlive() || dbHeartbeatOnline;
    const dbHeartbeat = await getLatestDbHeartbeat();
    res.json({
        online: !paused && (heartbeatOnline || childOnline),
        paused,
        child_process: childOnline,
        heartbeat: heartbeatOnline,
        db_heartbeat: dbHeartbeat,
        pid: workerProcess?.pid || null,
        lastHeartbeat
    });
});

app.post('/api/worker/start', async (req, res) => {
    try {
        await setSetting('ENGINE_PAUSED', 'false');
        await setSetting('worker_manual_run_requested_at', new Date().toISOString());
        const launched = launchWorkerIfNeeded();
        await logToDashboard(launched ? 'Engine worker launched.' : 'Engine worker unpaused.', 'success');
        res.json({ success: true, launched, message: launched ? 'Worker launched.' : 'Worker already online or unpaused.' });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.post('/api/worker/stop', async (req, res) => {
    try {
        await setSetting('ENGINE_PAUSED', 'true');
        if (workerProcess && !workerProcess.killed) {
            workerProcess.kill();
            workerProcess = null;
        }
        await logToDashboard('Engine paused by dashboard.', 'warning');
        res.json({ success: true, message: 'Worker paused.' });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.post('/api/worker/run', (req, res) => {
    console.log("⚡ Manual Worker Priority Trigger received.");
    isLicenseActive()
        .then((active) => {
            if (!active) {
                res.status(403).json({
                    success: false,
                    error: 'Product is not activated on this device. Activate the license before running the worker.'
                });
                return;
            }
            return setSetting('worker_manual_run_requested_at', new Date().toISOString())
                .then(() => setSetting('ENGINE_PAUSED', 'false'))
                .then(() => {
                    const launched = launchWorkerIfNeeded();
                    res.json({ success: true, launched, message: "Worker signaled. Queue will be processed on next cycle (<15s)." });
                });
        })
        .catch((err) => res.status(500).json({ success: false, error: err.message }));
});

// ========== REPLIES & APPROVAL WORKFLOW ==========
app.get('/api/replies', (req, res) => {
    db.all(`SELECT r.*, l.company_name, l.email as company_email 
            FROM replies r 
            LEFT JOIN leads l ON r.lead_id = l.id 
            ORDER BY r.received_at DESC`, 
        (err, rows) => res.json(rows || []));
});

app.post('/api/replies/:id/approve', async (req, res) => {
    const { id } = req.params;
    const { edited_reply } = req.body;

    db.get("SELECT * FROM replies WHERE id = ?", [id], async (err, reply: any) => {
        if (!reply) return res.status(404).json({ error: 'Reply not found' });

        const textToSend = edited_reply || reply.ai_draft_reply;
        if (!textToSend) return res.status(400).json({ error: 'No reply text provided' });

        try {
            const { sendEmail } = await import('./gmail_service');
            const result = await sendEmail(
                reply.from_email,
                `Re: ${reply.subject}`,
                textToSend
            );

            if (result.success) {
                db.run("UPDATE replies SET status = 'sent' WHERE id = ?", [id]);
                res.json({ success: true, message: `Reply sent to ${reply.from_email}` });
            } else {
                res.status(500).json({ error: 'Failed to send reply' });
            }
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    });
});

app.post('/api/replies/:id/dismiss', (req, res) => {
    const { id } = req.params;
    db.run("UPDATE replies SET status = 'dismissed' WHERE id = ?", [id], (err) => {
        res.json({ success: !err });
    });
});

// 🤖 Feature 1: AI Reply Co-Pilot (1-Click Suggested Response Generator)
app.post('/api/replies/:id/generate-ai-response', async (req, res) => {
    const { id } = req.params;
    db.get(`SELECT r.*, l.company_name, l.contact_name, l.website 
            FROM replies r 
            LEFT JOIN leads l ON r.lead_id = l.id 
            WHERE r.id = ?`, [id], async (err, reply: any) => {
        if (err || !reply) return res.status(404).json({ error: 'Reply not found.' });

        try {
            const companyName = reply.company_name || 'their company';
            const contactName = reply.contact_name || 'there';
            const prompt = `
You are an expert SDR responding to a prospect's email reply for Asif Digital Agency (an AI Sales Agent agency).
Prospect Company: ${companyName}
Contact Name: ${contactName}
Prospect's Email Subject: ${reply.subject}
Prospect's Email Body: "${reply.body}"

Write a concise, professional 3-sentence email response answering their query or offering 2 specific calendar time options next week for a 5-minute call.
Signature to include:
Best,
Asif Khan (CEO)
Asif Digital Agency
+971 545866094
https://asifdigital.agency

Output ONLY the response email text body. Do not include markdown headers or meta text.
`.trim();

            const aiResponse = await callAI(prompt);
            const cleanAiText = String(aiResponse || '')
                .replace(/^```[a-z]*\n?/gi, '')
                .replace(/\n?```$/gi, '')
                .trim();

            db.run("UPDATE replies SET ai_draft_reply = ? WHERE id = ?", [cleanAiText, id]);
            res.json({ success: true, ai_draft_reply: cleanAiText });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    });
});

// 📲 Feature 2: Test WhatsApp Alert Webhook
app.post('/api/test-whatsapp-alert', async (req, res) => {
    const webhookUrl = String(req.body?.webhook_url || '').trim();
    if (!webhookUrl) return res.status(400).json({ error: 'Webhook URL required.' });

    try {
        const axios = (await import('axios')).default;
        await axios.post(webhookUrl, {
            event: 'whatsapp_alert_test',
            message: '🔥 [Asif Digital Agency AI Sales Engine] WhatsApp Alert Integration Test Successful!',
            timestamp: new Date().toISOString()
        }, { timeout: 8000 });

        res.json({ success: true, message: 'Test WhatsApp alert dispatched via Webhook!' });
    } catch (e: any) {
        res.status(500).json({ error: `Webhook error: ${e.message}` });
    }
});

// 📊 Feature 3: Daily Executive Digest Trigger
app.post('/api/trigger-daily-digest', async (req, res) => {
    try {
        const config = await loadSystemConfig();
        const recipientEmail = config.email || 'hello@asifdigital.agency';

        db.get(`SELECT 
                (SELECT COUNT(*) FROM leads WHERE DATE(added_at) = DATE('now')) as leads_found_today,
                (SELECT COUNT(*) FROM outreach_drafts WHERE approval_status = 'approved' AND DATE(approved_at) = DATE('now')) as approved_today,
                (SELECT COUNT(*) FROM replies WHERE DATE(received_at) = DATE('now')) as replies_today,
                (SELECT COUNT(*) FROM leads WHERE status = 'sent') as total_sent`, async (err, stats: any) => {

            const digestBody = `
Daily Executive Digest — Asif Digital Agency AI Sales Engine

Summary of Engine Performance (Last 24 Hours):
--------------------------------------------------
🔍 Leads Researched & Enriched Today: ${stats?.leads_found_today || 0}
✅ AI Drafts Approved & Queued Today: ${stats?.approved_today || 0}
📩 Prospect Replies Received Today: ${stats?.replies_today || 0}
🚀 Total Active Outreach Campaigns Sent: ${stats?.total_sent || 0}

Pricing & ROI Verification:
- One-Time Installation: 2,500 AED
- Monthly Operations: 499 AED/month
- Active Engine Status: ONLINE (24/7)

Access Dashboard: http://localhost:3006

Best,
Asif Digital Agency AI Sales Engine
`.trim();

            const { sendEmail } = await import('./gmail_service');
            const result = await sendEmail(recipientEmail, `📊 Daily Executive Digest — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, digestBody);
            res.json({ success: true, message: `Executive Digest emailed to ${recipientEmail}!`, stats });
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ========== STATS ==========
app.get('/api/quality/quarantine-status', (req, res) => {
    db.get(`SELECT
            (SELECT COUNT(*) FROM leads WHERE status = 'quarantined') AS quarantined_leads,
            (SELECT COUNT(*) FROM contacts WHERE status = 'quarantined') AS quarantined_contacts`,
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(row || { quarantined_leads: 0, quarantined_contacts: 0 });
        });
});

app.post('/api/quality/quarantine-restore', (req, res) => {
    db.serialize(() => {
        db.run(`UPDATE leads
                SET status = CASE WHEN email IS NOT NULL AND email != '' THEN 'ready' ELSE 'new' END,
                    is_relevant = 1,
                    analysis_notes = 'Restored from quality quarantine'
                WHERE status = 'quarantined'`, function(leadError) {
            if (leadError) return res.status(500).json({ error: leadError.message });
            const restoredLeads = this.changes || 0;
            db.run("UPDATE contacts SET status = 'new', updated_at = CURRENT_TIMESTAMP WHERE status = 'quarantined'", function(contactError) {
                if (contactError) return res.status(500).json({ error: contactError.message });
                res.json({ success: true, restored_leads: restoredLeads, restored_contacts: this.changes || 0 });
            });
        });
    });
});

app.get('/api/stats', (req, res) => {
    db.all(`SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status IN ('sent', 'followed_up') THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'no_email' THEN 1 ELSE 0 END) as no_email,
        SUM(CASE WHEN status IN ('ready','priority_ready') AND email IS NOT NULL THEN 1 ELSE 0 END) as ready,
        SUM(CASE WHEN email IS NOT NULL AND email != '' THEN 1 ELSE 0 END) as contacts_found,
        SUM(CASE WHEN status = 'invalid_email' THEN 1 ELSE 0 END) as invalid_email,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        (SELECT COUNT(*) FROM contacts WHERE status != 'quarantined') as decision_contacts,
        (SELECT COUNT(*) FROM contacts WHERE is_decision_maker = 1 AND status != 'quarantined') as decision_makers,
        (SELECT COUNT(*) FROM contacts WHERE email IS NOT NULL AND email != '' AND status != 'quarantined') as person_emails,
        (SELECT COUNT(*) FROM replies) as replies,
        (SELECT COUNT(*) FROM analytics) as active_days
        FROM leads WHERE status != 'quarantined'`, (err, rows) => {
        res.json(rows?.[0] || {});
    });
});

app.patch('/api/replies/:id/read', (req, res) => {
    const { id } = req.params;
    db.run("UPDATE replies SET status = 'read' WHERE id = ?", [id], (err) => {
        res.json({ success: !err });
    });
});

app.get('/api/auto-outreach-stats', async (req, res) => {
    try {
        const settings = await new Promise<any>((resolve) => {
            db.all("SELECT key, value FROM settings", (err, rows) => {
                const config: any = {};
                (rows || []).forEach((r: any) => { config[r.key] = r.value; });
                resolve(config);
            });
        });

        const stats = await new Promise<any>((resolve) => {
            db.get(`SELECT
                (SELECT COUNT(*) FROM leads WHERE is_relevant = 1 AND email IS NOT NULL) as totalQualified,
                (SELECT COUNT(*) FROM leads WHERE status IN ('sent','followed_up') AND date(smtp_accepted_at) = date('now')) as sentToday,
                (SELECT COUNT(*) FROM outreach_drafts WHERE approval_status = 'draft') as heldForReview,
                (SELECT COUNT(*) FROM leads WHERE status IN ('sent','followed_up')) as totalSent,
                (SELECT COUNT(*) FROM leads WHERE delivery_status = 'rejected' OR last_error_code IS NOT NULL) as failed
            `, (err, row) => resolve(row || {}));
        });

        res.json({
            enabled: String(settings.smart_auto_outreach || '').toLowerCase() === 'enabled',
            totalQualified: stats.totalQualified || 0,
            sentToday: stats.sentToday || 0,
            totalSent: stats.totalSent || 0,
            heldForReview: stats.heldForReview || 0,
            failed: stats.failed || 0,
            dailyCap: Number(settings.daily_limit || 150),
            speed: settings.auto_outreach_speed || 'standard'
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ── ENTERPRISE AI SALES AGENT ENDPOINTS ──
import { executeWaterfallEnrichment } from './waterfall_enrichment';
import { STANDARD_DRIP_SEQUENCE } from './drip_campaign';
import { checkSendingDomainHealth } from './email_warming';
import { dispatchWebhookAlert } from './alert_dispatcher';

app.post('/api/waterfall/enrich', async (req, res) => {
    try {
        const { domain, company_name } = req.body;
        if (!domain) return res.status(400).json({ error: 'Domain is required' });
        const result = await executeWaterfallEnrichment(domain, company_name || domain);
        res.json({ success: true, result });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/api/drip/sequences', (_req, res) => {
    res.json({ success: true, sequence: STANDARD_DRIP_SEQUENCE });
});

app.post('/api/warming/health-check', async (req, res) => {
    try {
        const { domain } = req.body;
        if (!domain) return res.status(400).json({ error: 'Domain is required' });
        const health = await checkSendingDomainHealth(domain);
        res.json({ success: true, health });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/alerts/test-webhook', async (req, res) => {
    try {
        const delivered = await dispatchWebhookAlert({
            event: 'batch_completed',
            timestamp: new Date().toISOString(),
            company_name: 'Test Agency Target',
            message: 'Webhook test alert from Sovereign Engine v8.1'
        });
        res.json({ success: delivered });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ============================================================
// SERVE REACT DASHBOARD (dist/ folder)
// Must come AFTER all API routes
// ============================================================
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname_server = path.dirname(__filename);

const distPath = path.join(__dirname_server, 'dist');
app.use(express.static(distPath));

// SPA fallback — all non-API routes return index.html
app.get(/^\/(?!api).*/, (_req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(404).send('Dashboard not found. Run: npm run build');
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Sovereign Engine API + Dashboard running at: http://localhost:${PORT}`);
    console.log(`   Dashboard: http://localhost:${PORT}`);
    console.log(`   API Base:  http://localhost:${PORT}/api`);
});
