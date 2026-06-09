// ═══════════════════════════════════════════════════════════════════════════════
// GM Events — Active Email Verifier (Adapted for new agent)
// ═══════════════════════════════════════════════════════════════════════════════
import dns from 'dns/promises';
import { setServers } from 'node:dns';
import axios from 'axios';
import { addLog } from '../server/db';
import { renderPage } from './browserScraper';

// Force public DNS resolvers
try {
  setServers(['1.1.1.1', '8.8.8.8', '1.0.0.1', '8.8.4.4']);
} catch { /* noop */ }

export type EmailConfidence = 'verified-smtp' | 'verified-public' | 'pattern-guess' | 'unverified';

export interface EmailCandidate {
  email: string;
  confidence: EmailConfidence;
  source: string;
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ─── MX existence ────────────────────────────────────────────────────────────
const checkMX = async (domain: string): Promise<boolean> => {
  try {
    const records = await dns.resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch {
    return false;
  }
};

const getPrimaryMx = async (domain: string): Promise<string | null> => {
  try {
    const records = await dns.resolveMx(domain);
    if (!records || records.length === 0) return null;
    records.sort((a, b) => a.priority - b.priority);
    return records[0].exchange;
  } catch { return null; }
};

// ─── SMTP handshake (RCPT TO probe — no DATA, no message sent) ──────────────
const probeMx = (mxHost: string, sender: string, recipient: string, timeoutMs = 8000): Promise<number | null> => {
  return new Promise((resolve) => {
    let buf = '';
    let step = 0;
    let lastCode: number | null = null;
    const sock = require('net').createConnection({ host: mxHost, port: 25 });
    let done = false;
    const finish = (code: number | null) => {
      if (done) return; done = true;
      try { sock.write('QUIT\r\n'); } catch {}
      try { sock.destroy(); } catch {}
      resolve(code);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);
    sock.setEncoding('utf8');
    sock.on('error', () => { clearTimeout(timer); finish(null); });
    sock.on('end', () => { clearTimeout(timer); finish(lastCode); });
    sock.on('data', (chunk: string) => {
      buf += chunk;
      let nl;
      while ((nl = buf.indexOf('\n')) !== -1) {
        const line = buf.slice(0, nl + 1).trim();
        buf = buf.slice(nl + 1);
        const m = /^(\d{3})([\s-])/.exec(line);
        if (!m) continue;
        const code = parseInt(m[1], 10);
        const isFinal = m[2] === ' ';
        if (!isFinal) continue;
        lastCode = code;
        try {
          if (step === 0 && code === 220) { sock.write(`EHLO mailprobe.local\r\n`); step = 1; }
          else if (step === 1) { sock.write(`MAIL FROM:<${sender}>\r\n`); step = 2; }
          else if (step === 2 && code === 250) { sock.write(`RCPT TO:<${recipient}>\r\n`); step = 3; }
          else if (step === 3) { clearTimeout(timer); finish(code); }
          else { clearTimeout(timer); finish(code); }
        } catch { clearTimeout(timer); finish(code); }
      }
    });
  });
};

interface DomainProbeState { mx: string | null; catchAll: boolean; reachable: boolean; }
const _domainProbeCache = new Map<string, DomainProbeState>();

const getDomainProbeState = async (domain: string): Promise<DomainProbeState> => {
  const cached = _domainProbeCache.get(domain);
  if (cached) return cached;
  const mx = await getPrimaryMx(domain);
  if (!mx) {
    const state = { mx: null, catchAll: false, reachable: false };
    _domainProbeCache.set(domain, state);
    return state;
  }
  const sender = `probe@gmevents-probe.com`;
  const fake = `nobody-${Math.random().toString(36).slice(2, 10)}@${domain}`;
  const fakeCode = await probeMx(mx, sender, fake, 5000);
  const state: DomainProbeState = {
    mx,
    catchAll: fakeCode === 250,
    reachable: fakeCode !== null,
  };
  _domainProbeCache.set(domain, state);
  return state;
};

export const smtpVerify = async (email: string, domain: string): Promise<{ deliverable: boolean | null; catchAll: boolean }> => {
  const st = await getDomainProbeState(domain);
  if (!st.mx) return { deliverable: null, catchAll: false };
  if (!st.reachable) return { deliverable: null, catchAll: false };
  if (st.catchAll) return { deliverable: null, catchAll: true };
  const sender = `probe@gmevents-probe.com`;
  const realCode = await probeMx(st.mx, sender, email, 5000);
  if (realCode === null) return { deliverable: null, catchAll: false };
  if (realCode === 250) return { deliverable: true, catchAll: false };
  if (realCode >= 500 && realCode < 600) return { deliverable: false, catchAll: false };
  return { deliverable: null, catchAll: false };
};

// ─── Email pattern generation ────────────────────────────────────────────────
const buildPatterns = (firstName: string, lastName: string, domain: string): string[] => {
  const f = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const l = lastName.toLowerCase().replace(/[^a-z]/g, '');
  if (!f || !l) return [];
  const fi = f[0];
  const li = l[0];
  return Array.from(new Set([
    `${f}.${l}@${domain}`,
    `${f}${l}@${domain}`,
    `${fi}${l}@${domain}`,
    `${f}${li}@${domain}`,
    `${f}_${l}@${domain}`,
    `${f}-${l}@${domain}`,
    `${fi}.${l}@${domain}`,
    `${fi}${l}@${domain}`,
    `${f}.${li}@${domain}`,
    `${f}${li}@${domain}`,
    `${f}@${domain}`,
    `${l}@${domain}`,
  ]));
};

// ─── Public email scraping ───────────────────────────────────────────────────
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

const JUNK_LOCAL_PARTS = new Set([
  'info', 'sales', 'support', 'contact', 'admin', 'office', 'hello', 'marketing',
  'enquiry', 'enquiries', 'careers', 'jobs', 'hr', 'media', 'press',
]);

const isJunkEmail = (email: string, companyName: string): boolean => {
  const [local, domain] = email.toLowerCase().split('@');
  if (!local || !domain) return true;
  if (JUNK_LOCAL_PARTS.has(local)) return true;
  const cleanCompany = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanLocal = local.replace(/[^a-z0-9]/g, '');
  if (cleanLocal === cleanCompany) return true;
  if (cleanLocal.includes(cleanCompany) && cleanLocal.length < cleanCompany.length + 5) return true;
  return false;
};

const scrapePublicEmails = async (
  firstName: string,
  lastName: string,
  domain: string,
  company: string
): Promise<EmailCandidate[]> => {
  const found = new Map<string, EmailCandidate>();
  const pages = ['', '/contact', '/contact-us', '/about', '/about-us', '/team', '/leadership'];
  const homeUrl = domain.startsWith('http') ? domain : `https://${domain}`;

  for (const p of pages) {
    try {
      const url = homeUrl.replace(/\/$/, '') + p;
      const res = await axios.get(url, { headers: { 'User-Agent': UA }, timeout: 6000, validateStatus: s => s < 500 });
      if (!res.data) continue;
      const text = typeof res.data === 'string' ? res.data : '';
      const matches = text.match(EMAIL_RE) || [];
      for (const e of matches) {
        const lc = e.toLowerCase();
        if (!lc.includes(domain.toLowerCase())) continue;
        const isMatch = lc.includes(firstName.toLowerCase()) || lc.includes(lastName.toLowerCase());
        found.set(lc, {
          email: lc,
          confidence: isMatch ? 'verified-public' : 'unverified',
          source: `website_scrape:${p || '/'}`,
        });
      }
    } catch { /* ignore */ }
  }

  return Array.from(found.values());
};

// ─── Public API ──────────────────────────────────────────────────────────────
export const findEmail = async (
  fullName: string,
  domain: string,
  company: string
): Promise<EmailCandidate | null> => {
  if (!fullName || !domain) return null;
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  if (!firstName || !lastName || firstName === lastName) return null;

  addLog('EMAIL_VERIFIER', `Checking MX for ${domain}...`, 'INFO');
  const has_mx = await checkMX(domain);
  if (!has_mx) {
    addLog('EMAIL_VERIFIER', `No MX records for ${domain}`, 'WARNING');
    return null;
  }

  addLog('EMAIL_VERIFIER', `Scraping public sources for ${fullName}@${domain}...`, 'INFO');
  const publicHits = await scrapePublicEmails(firstName, lastName, domain, company);
  const verified = publicHits.find(h => h.confidence === 'verified-public' && !isJunkEmail(h.email, company));

  if (verified) {
    addLog('EMAIL_VERIFIER', `Found verified email: ${verified.email}`, 'SUCCESS');
    return verified;
  }

  addLog('EMAIL_VERIFIER', `No verified email found for ${fullName}`, 'WARNING');
  return null;
};
