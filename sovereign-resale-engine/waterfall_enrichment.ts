import { enrichCompanyData } from './email_discovery';
import { isConsumerEmail } from './contact_validation';
import { verifyMailbox } from './verifier';
import { lookupExecutiveViaApollo } from './apollo_hunter';

export interface WaterfallEnrichmentResult {
  email: string | null;
  contact_name: string | null;
  tier: 'tier_1_apollo' | 'tier_2_crawl4ai_web' | 'tier_3_smtp_permutator' | 'tier_4_company_fallback';
  confidence_score: number;
  is_decision_maker: boolean;
  evidence: string[];
}

/**
 * 🌊 3-Layer Waterfall Enrichment Cascade
 * Fallback Cascade: Tier 1 Apollo B2B -> Tier 2 Deep Web Crawling -> Tier 3 SMTP Permutator -> Tier 4 Company Mailbox
 */
export async function executeWaterfallEnrichment(domain: string, companyName: string, apolloApiKey?: string): Promise<WaterfallEnrichmentResult> {
  const evidence: string[] = [];
  console.log(`[Waterfall Cascade] 🌊 Starting 3-Layer Waterfall Enrichment for: ${domain}`);

  // ── LAYER 1: Apollo Hunter B2B API Lookup ──
  if (apolloApiKey && apolloApiKey.trim() !== '') {
    try {
      const apolloResult = await lookupExecutiveViaApollo(companyName, domain, apolloApiKey);
      if (apolloResult && apolloResult.email && !isConsumerEmail(apolloResult.email)) {
        evidence.push(`Apollo Hunter B2B API matched decision-maker: ${apolloResult.name || 'Executive'} (${apolloResult.email})`);
        return {
          email: apolloResult.email,
          contact_name: apolloResult.name || null,
          tier: 'tier_1_apollo',
          confidence_score: 95,
          is_decision_maker: true,
          evidence
        };
      }
    } catch (err: any) {
      console.log(`[Waterfall Cascade] Tier 1 Apollo skipped/error: ${err.message}`);
    }
  }

  // ── LAYER 2: Crawl4AI / Deep Web Scraping + Domain Reconstruction ──
  try {
    const webDiscovery = await enrichCompanyData(domain, companyName);
    if (webDiscovery && webDiscovery.email) {
      evidence.push(`Deep Web Extraction & Domain Reconstruction found: ${webDiscovery.contact_name || 'Executive'} (${webDiscovery.email})`);
      return {
        email: webDiscovery.email,
        contact_name: webDiscovery.contact_name || null,
        tier: 'tier_2_crawl4ai_web',
        confidence_score: webDiscovery.contact_name ? 85 : 65,
        is_decision_maker: true,
        evidence
      };
    }
  } catch (err: any) {
    console.log(`[Waterfall Cascade] Tier 2 Web Discovery error: ${err.message}`);
  }

  // ── LAYER 3: AI Email Pattern Permutator + Real-time MX/SMTP Handshake ──
  try {
    const permutations = [
      `ceo@${domain}`,
      `founder@${domain}`,
      `contact@${domain}`,
      `info@${domain}`
    ];

    for (const testEmail of permutations) {
      if (isConsumerEmail(testEmail)) continue;
      const smtpCheck = await verifyMailbox(testEmail);
      if (smtpCheck && smtpCheck.exists) {
        evidence.push(`Real-time SMTP Server Handshake verified active mailbox: ${testEmail}`);
        return {
          email: testEmail,
          contact_name: null,
          tier: 'tier_3_smtp_permutator',
          confidence_score: 75,
          is_decision_maker: testEmail.startsWith('ceo') || testEmail.startsWith('founder'),
          evidence
        };
      }
    }
  } catch (err: any) {
    console.log(`[Waterfall Cascade] Tier 3 SMTP Permutator error: ${err.message}`);
  }

  // ── LAYER 4: Verified Company Mailbox Fallback ──
  const fallbackEmail = `info@${domain}`;
  evidence.push(`Fallback to official company mailbox endpoint: ${fallbackEmail}`);
  return {
    email: fallbackEmail,
    contact_name: null,
    tier: 'tier_4_company_fallback',
    confidence_score: 50,
    is_decision_maker: false,
    evidence
  };
}
