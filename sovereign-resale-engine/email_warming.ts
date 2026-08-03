import dns from 'dns/promises';
import { db } from './db';

export interface DomainHealthReport {
  domain: string;
  spf_valid: boolean;
  dkim_valid: boolean;
  dmarc_valid: boolean;
  health_score: number;
  recommendations: string[];
}

/**
 * 🩺 Checks DNS Health (SPF, DKIM, DMARC) for sending domain deliverability
 */
export async function checkSendingDomainHealth(domain: string): Promise<DomainHealthReport> {
  const recommendations: string[] = [];
  let spf = false;
  let dkim = false;
  let dmarc = false;

  // 1. Check SPF
  try {
    const txtRecords = await dns.resolveTxt(domain);
    const flatTxt = txtRecords.flat().join(' ');
    if (flatTxt.includes('v=spf1')) {
      spf = true;
    } else {
      recommendations.push(`Missing SPF record. Add 'v=spf1 include:... ~all' to DNS TXT.`);
    }
  } catch (err) {
    recommendations.push(`Failed to query SPF TXT record.`);
  }

  // 2. Check DMARC
  try {
    const dmarcRecords = await dns.resolveTxt(`_dmarc.${domain}`);
    const flatDmarc = dmarcRecords.flat().join(' ');
    if (flatDmarc.includes('v=DMARC1')) {
      dmarc = true;
    } else {
      recommendations.push(`Missing DMARC record. Add '_dmarc.${domain}' TXT record.`);
    }
  } catch (err) {
    recommendations.push(`Missing DMARC DNS record.`);
  }

  // 3. Check DKIM (Common default selector check)
  try {
    const dkimRecords = await dns.resolveTxt(`default._domainkey.${domain}`);
    if (dkimRecords.length > 0) dkim = true;
  } catch (err) {
    // Try google selector
    try {
      const gDkim = await dns.resolveTxt(`google._domainkey.${domain}`);
      if (gDkim.length > 0) dkim = true;
    } catch {
      recommendations.push(`DKIM selector not verified automatically on default/google subdomains.`);
    }
  }

  let healthScore = 50;
  if (spf) healthScore += 25;
  if (dmarc) healthScore += 25;

  return {
    domain,
    spf_valid: spf,
    dkim_valid: dkim,
    dmarc_valid: dmarc,
    health_score: Math.min(100, healthScore),
    recommendations
  };
}

/**
 * 🔄 Registers or gets active sender account with lowest daily volume
 */
export async function getOptimalSenderAccount(defaultSender: string): Promise<string> {
  return new Promise((resolve) => {
    db.get(
      `SELECT email FROM email_sender_accounts WHERE warmup_status = 'active' AND daily_sent_count < daily_limit ORDER BY daily_sent_count ASC LIMIT 1`,
      (err, row: any) => {
        if (err || !row) {
          resolve(defaultSender);
        } else {
          resolve(row.email);
        }
      }
    );
  });
}
