// ═══════════════════════════════════════════════════════════════════════════════
// GM Events — Worldwide Phone Extractor (Adapted for new agent)
// ═══════════════════════════════════════════════════════════════════════════════
import axios from 'axios';
import * as cheerio from 'cheerio';
import { findPhoneNumbersInText } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { addLog } from '../server/db';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const PAGES = ['', '/contact', '/about', '/team', '/leadership', '/imprint', '/legal', '/contact-us', '/about-us'];

const COUNTRY_ISO: Record<string, CountryCode> = {
  usa: 'US', 'united states': 'US', america: 'US',
  uk: 'GB', 'united kingdom': 'GB', britain: 'GB', england: 'GB',
  germany: 'DE', deutschland: 'DE',
  france: 'FR',
  uae: 'AE', 'united arab emirates': 'AE',
  'saudi arabia': 'SA', ksa: 'SA',
  singapore: 'SG',
  india: 'IN',
  japan: 'JP',
  australia: 'AU',
};

export const toIso = (country: string | null): CountryCode | undefined => {
  if (!country) return undefined;
  return COUNTRY_ISO[country.toLowerCase()];
};

export interface PhoneHit {
  phone: string;
  country: string;
  source: string;
  proximityScore: number;
}

const fetchPage = async (url: string): Promise<string | null> => {
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': UA },
      timeout: 8000,
      validateStatus: s => s < 500,
      maxRedirects: 3,
    });
    return typeof res.data === 'string' ? res.data : null;
  } catch {
    return null;
  }
};

export const findPhones = async (
  website: string,
  country: string | null,
  executiveName?: string
): Promise<PhoneHit[]> => {
  if (!website) return [];
  const iso = toIso(country);
  const home = website.startsWith('http') ? website : `https://${website}`;
  const out: PhoneHit[] = [];
  const seen = new Set<string>();

  for (const p of PAGES) {
    const html = await fetchPage(home.replace(/\/$/, '') + p);
    if (!html) continue;
    const $ = cheerio.load(html);
    const text = $('body').text().replace(/\s+/g, ' ');
    let hits;
    try {
      hits = findPhoneNumbersInText(text, iso);
    } catch {
      continue;
    }
    for (const h of hits) {
      const e164 = h.number.format('E.164');
      if (seen.has(e164)) continue;
      seen.add(e164);
      let proximityScore = 0.3;
      if (executiveName) {
        const idx = h.startsAt;
        const nameIdx = text.toLowerCase().indexOf(executiveName.toLowerCase());
        if (nameIdx >= 0) {
          const dist = Math.abs(idx - nameIdx);
          if (dist <= 200) proximityScore = 1 - dist / 200;
        }
      }
      out.push({
        phone: e164,
        country: h.number.country || iso || '',
        source: `website${p || '/'}`,
        proximityScore,
      });
    }
    if (out.length >= 10) break;
  }

  out.sort((a, b) => b.proximityScore - a.proximityScore);
  if (out.length > 0) addLog('PHONE_EXTRACTOR', `Found ${out.length} phone(s) on ${website}`, 'INFO');
  return out;
};
