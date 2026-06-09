// ─────────────────────────────────────────────────────────────────────────────
// Executive Sniper — Top-6 designation priority + Global/EMEA filter keywords
// ─────────────────────────────────────────────────────────────────────────────

export interface TitleRule {
  keywords: string[];
  score: number;
  label: string;
}

/**
 * Priority ranking — higher score = better target.
 * First match wins inside a candidate list; ties broken by Global-keyword hit.
 */
export const TOP_TITLES: TitleRule[] = [
  { label: 'CEO',             score: 100, keywords: ['ceo', 'chief executive officer', 'chief executive'] },
  { label: 'Managing Director', score: 95, keywords: ['managing director', 'md', 'general manager'] },
  { label: 'Head of Marketing', score: 90, keywords: ['head of marketing', 'cmo', 'chief marketing', 'marketing director', 'vp marketing'] },
  { label: 'Head of Sales',     score: 85, keywords: ['head of sales', 'cso', 'chief sales', 'sales director', 'vp sales', 'vice president sales'] },
  { label: 'Export Manager',    score: 80, keywords: ['export manager', 'head of export', 'international sales', 'export director'] },
  { label: 'Business Development', score: 75, keywords: ['business development', 'bd director', 'bd manager', 'head of business development', 'vp business development'] },
];

/**
 * Global-reach keywords — title or company-description mentions that escalate
 * priority so we bias toward decision-makers with international mandate.
 */
export const GLOBAL_FILTERS = [
  'global',
  'international',
  'emea',
  'worldwide',
  'overseas',
  'cross-border',
  'multinational',
];

/**
 * Score a candidate title. Returns 0 if no rule matches.
 * Adds a +10 boost if the title also hits a Global filter keyword.
 */
export function scoreTitle(title: string): number {
  if (!title) return 0;
  const t = title.toLowerCase();
  let base = 0;
  for (const rule of TOP_TITLES) {
    if (rule.keywords.some((k) => t.includes(k))) {
      base = Math.max(base, rule.score);
    }
  }
  if (base === 0) return 0;
  const globalBoost = GLOBAL_FILTERS.some((g) => t.includes(g)) ? 10 : 0;
  return base + globalBoost;
}

/**
 * Pick the best candidate from an Apollo / OSINT result list.
 */
export function pickBestCandidate<T extends { title?: string }>(candidates: T[]): T | null {
  if (!candidates || candidates.length === 0) return null;
  let best: T | null = null;
  let bestScore = -1;
  for (const c of candidates) {
    const s = scoreTitle(c.title || '');
    if (s > bestScore) {
      best = c;
      bestScore = s;
    }
  }
  return bestScore > 0 ? best : null;
}

/**
 * Parse user-supplied `target_designations` string into the Apollo title array.
 */
export function parseDesignations(raw?: string): string[] {
  if (!raw) return TOP_TITLES.map((t) => t.label);
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
