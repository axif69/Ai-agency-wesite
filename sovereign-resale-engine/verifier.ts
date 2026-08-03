import net from 'net';
import axios from 'axios';

// ─── Global flag so worker.ts can detect Port 25 restriction mode ─────────────
export let isPort25Blocked = false;

// ─── Per-domain cache so we never retry a blocked domain repeatedly ───────────
const blockedDomainCache = new Set<string>();
const domainMxCache = new Map<string, boolean>();

export type MailboxVerificationResult = {
    exists: boolean;
    isCatchAll: boolean;
    portBlocked: boolean;
    mxValid: boolean;
    reason: 'accepted' | 'catch_all' | 'mailbox_rejected' | 'invalid_format' | 'no_mx' | 'port_blocked' | 'network_error' | 'mx_only';
};

/**
 * PERMANENT FIX v3.0: Smart email verification that NEVER hangs.
 * 
 * Strategy:
 * 1. Check syntax
 * 2. Check MX via Google DNS-over-HTTPS (no raw port 25 timeout)
 * 3. If Port 25 is globally blocked (ISP restriction) OR domain is in blockedDomainCache →
 *    SKIP SMTP entirely and trust MX-existence (mx_only mode)
 * 4. Only attempt SMTP socket if port 25 is NOT known-blocked
 * 5. Short 4s timeout (not 10s) to avoid enrichment hanging
 */
export async function verifyMailbox(email: string): Promise<MailboxVerificationResult> {
    const domain = email.split('@')[1];
    if (!domain) return { exists: false, isCatchAll: false, portBlocked: false, mxValid: false, reason: 'invalid_format' };

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return { exists: false, isCatchAll: false, portBlocked: false, mxValid: false, reason: 'invalid_format' };
    }

    // PERMANENT FIX: If we've already confirmed port 25 is blocked globally or for this domain → skip SMTP entirely
    if (isPort25Blocked || blockedDomainCache.has(domain)) {
        // Trust MX existence only — fast path with zero socket attempts
        const hasMx = await checkMxExists(domain);
        return {
            exists: hasMx,
            isCatchAll: hasMx, // Treat as catch-all when can't verify
            portBlocked: true,
            mxValid: hasMx,
            reason: 'mx_only'
        };
    }

    try {
        const hasMx = await checkMxExists(domain);
        if (!hasMx) {
            return { exists: false, isCatchAll: false, portBlocked: false, mxValid: false, reason: 'no_mx' };
        }

        // Get best MX server
        const dohRes = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`, { timeout: 5000 });
        const mxRecords: any[] = dohRes.data.Answer || [];
        if (mxRecords.length === 0) {
            return { exists: false, isCatchAll: false, portBlocked: false, mxValid: false, reason: 'no_mx' };
        }

        const servers = mxRecords
            .map((r: any) => { const p = r.data.split(' '); return { priority: parseInt(p[0], 10), exchange: p[p.length - 1].replace(/\.$/, '') }; })
            .sort((a, b) => a.priority - b.priority);
        const bestServer = servers[0].exchange;

        // SMTP socket with SHORT 4s timeout
        const smtpCheck = await checkAddressViaSMTP(email, domain, bestServer);

        if (smtpCheck.portBlocked) {
            // Mark globally + cache this domain so future calls skip SMTP instantly
            isPort25Blocked = true;
            blockedDomainCache.add(domain);
            console.log(`  📡 [SMTP] Port 25 blocked for ${domain}. Switching to MX-only mode permanently for this session.`);
            return { exists: hasMx, isCatchAll: hasMx, portBlocked: true, mxValid: true, reason: 'mx_only' };
        }

        if (smtpCheck.isCatchAll) {
            return { exists: true, isCatchAll: true, portBlocked: false, mxValid: true, reason: 'catch_all' };
        }

        return {
            exists: smtpCheck.success,
            isCatchAll: false,
            portBlocked: false,
            mxValid: true,
            reason: smtpCheck.success ? 'accepted' : 'mailbox_rejected'
        };

    } catch (e: any) {
        const isNetErr = ['ECONNREFUSED', 'ETIMEDOUT', 'ESERVFAIL', 'EREFUSED', 'EHOSTUNREACH'].includes(e.code);
        if (isNetErr) {
            isPort25Blocked = true;
            blockedDomainCache.add(domain);
        }
        return { exists: false, isCatchAll: false, portBlocked: isNetErr, mxValid: false, reason: isNetErr ? 'network_error' : 'no_mx' };
    }
}

async function checkMxExists(domain: string): Promise<boolean> {
    if (domainMxCache.has(domain)) return domainMxCache.get(domain)!;
    try {
        const res = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`, { timeout: 5000 });
        const hasMx = (res.data.Answer || []).length > 0;
        domainMxCache.set(domain, hasMx);
        return hasMx;
    } catch {
        return false;
    }
}

async function checkAddressViaSMTP(
    email: string,
    domain: string,
    mxServer: string
): Promise<{ success: boolean; portBlocked: boolean; isCatchAll: boolean }> {
    // First: catch-all probe
    const randomPrefix = `chk_${Math.random().toString(36).substring(7)}`;
    const catchAllResult = await smtpProbe(`${randomPrefix}@${domain}`, domain, mxServer);

    if (catchAllResult.portBlocked) return { success: false, portBlocked: true, isCatchAll: false };
    if (catchAllResult.accepted) return { success: true, portBlocked: false, isCatchAll: true };

    // Real address probe
    const realResult = await smtpProbe(email, domain, mxServer);
    if (realResult.portBlocked) return { success: false, portBlocked: true, isCatchAll: false };

    return { success: realResult.accepted, portBlocked: false, isCatchAll: false };
}

function smtpProbe(
    target: string,
    domain: string,
    mxServer: string
): Promise<{ accepted: boolean; portBlocked: boolean }> {
    return new Promise((resolve) => {
        const socket = net.createConnection(25, mxServer);
        let step = 0;
        let accepted = false;
        let portBlocked = false;

        // SHORT 4s timeout — no more hanging
        socket.setTimeout(4000);

        socket.on('data', (data) => {
            const response = data.toString();
            const hasCode = (code: string) => response.includes(`${code} `) || response.startsWith(code);

            if (hasCode('554') || hasCode('571') || hasCode('421')) {
                portBlocked = true;
                socket.destroy();
                return;
            }

            if (hasCode('220') && step === 0) {
                socket.write(`HELO verify.check\r\n`);
                step = 1;
            } else if (hasCode('250') && step === 1) {
                socket.write(`MAIL FROM:<check@verify.temp>\r\n`);
                step = 2;
            } else if (hasCode('250') && step === 2) {
                socket.write(`RCPT TO:<${target}>\r\n`);
                step = 3;
            } else if (step === 3) {
                accepted = hasCode('250') || hasCode('251');
                socket.write('QUIT\r\n');
                socket.end();
            }
        });

        socket.on('end', () => resolve({ accepted, portBlocked }));
        socket.on('error', (err: any) => {
            const isBlock = ['ECONNREFUSED', 'ETIMEDOUT', 'EHOSTUNREACH', 'ENOTFOUND'].includes(err.code);
            resolve({ accepted: false, portBlocked: isBlock });
        });
        socket.on('timeout', () => {
            socket.destroy();
            resolve({ accepted: false, portBlocked: true });
        });
    });
}
