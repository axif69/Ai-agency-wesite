// ─────────────────────────────────────────────────────────────────────────────
// Stealth throttle — enforces a mandatory 15-45 s randomized delay before any
// external agent call (Search engines, Apollo, Playwright scrape, OpenRouter).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Randomized sleep between `min` and `max` milliseconds (inclusive).
 * Default window = 15 s – 45 s per Operational Stealth spec.
 */
export function sleep(min = 15000, max = 45000): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Short jitter used *between* DB polls inside agent loops (not external calls).
 */
export function microJitter(min = 500, max = 1500): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Wraps a promise with a hard timeout.
 */
export function withTimeout<T>(p: Promise<T>, ms: number, label = 'op'): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    p.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); }
    );
  });
}

/**
 * Per-host cooldown map — lightweight in-memory guard to prevent hammering
 * the same domain twice within `cooldownMs`.
 */
const lastHit = new Map<string, number>();
export function canHit(host: string, cooldownMs = 30000): boolean {
  const now = Date.now();
  const prev = lastHit.get(host) || 0;
  if (now - prev < cooldownMs) return false;
  lastHit.set(host, now);
  return true;
}
