import { chromium, type Browser, type BrowserContext } from 'playwright';

let browserPromise: Promise<Browser> | null = null;
let activeCount = 0;
const MAX_CONCURRENT = 3;
const queue: Array<() => void> = [];

const acquireSlot = (): Promise<void> => new Promise((res) => {
  if (activeCount < MAX_CONCURRENT) {
    activeCount++;
    res();
  } else {
    queue.push(() => { activeCount++; res(); });
  }
});

const releaseSlot = () => {
  activeCount--;
  const next = queue.shift();
  if (next) next();
};

const getBrowser = async (): Promise<Browser> => {
  if (!browserPromise) {
    browserPromise = chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    }).catch((err) => {
      browserPromise = null;
      throw err;
    });
  }
  return browserPromise;
};

export interface RenderedPage {
  url: string;
  finalUrl: string;
  text: string;
  html: string;
  links: Array<{ href: string; text: string }>;
}

export const renderPage = async (url: string, timeoutMs = 15000): Promise<RenderedPage | null> => {
  await acquireSlot();
  let context: BrowserContext | null = null;
  try {
    const browser = await getBrowser();
    context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 900 },
      ignoreHTTPSErrors: true,
      javaScriptEnabled: true,
    });
    const page = await context.newPage();

    await page.route('**/*', (route) => {
      const t = route.request().resourceType();
      const u = route.request().url();
      if (t === 'image' || t === 'font' || t === 'media' || t === 'stylesheet') {
        return route.abort();
      }
      if (t === 'script' && /google-analytics|googletagmanager|gtm|facebook|hotjar|intercom|drift|hubspot|zendesk|segment|mixpanel|fullstory|clarity|gtag/i.test(u)) {
        return route.abort();
      }
      return route.continue();
    });

    const response = await page.goto(url, {
      waitUntil: 'load',
      timeout: timeoutMs,
    }).catch(() => null);

    await page.waitForTimeout(1500);

    const consentButtons = [
      'button:has-text("Accept all")',
      'button:has-text("I agree")',
      'button:has-text("Accept")',
      'button:has-text("Allow")',
      'button:has-text("Agree")',
      'button:has-text("OK")',
      '#L2AGLb',
      '#bnp_btn_accept',
      '.cookie-consent-accept',
      '.accept-cookies'
    ];
    for (const selector of consentButtons) {
      try {
        if (await page.isVisible(selector)) {
          await page.click(selector, { timeout: 2000 });
          await page.waitForLoadState('networkidle', { timeout: 3000 });
        }
      } catch {}
    }

    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight / 2);
      await new Promise(r => setTimeout(r, 500));
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1500);

    if (url.includes('search') || url.includes('q=')) {
      await Promise.any([
        page.waitForSelector('h3', { timeout: 5000 }),
        page.waitForSelector('a[href*="linkedin.com/in/"]', { timeout: 5000 }),
        page.waitForTimeout(2000)
      ]).catch(() => {});
    }

    await page.waitForTimeout(500);

    const finalUrl = page.url();

    const text = await page.evaluate(() => {
      const skip = ['script', 'style', 'noscript'];
      for (const s of skip) document.querySelectorAll(s).forEach(n => n.remove());
      return document.body?.innerText || '';
    }).catch(() => '');

    const html = await page.content().catch(() => '');

    const links = await page.$$eval('a', (els) =>
      els.map((a: any) => ({
        href: a.href || '',
        text: (a.innerText || '').trim().slice(0, 100),
      })).filter((l: any) => l.href)
    ).catch(() => []);

    return { url, finalUrl, text, html, links };
  } catch (err: any) {
    console.error(`[BROWSER ERROR] ${url}: ${err.message?.slice(0, 120)}`);
    return null;
  } finally {
    if (context) await context.close().catch(() => {});
    releaseSlot();
  }
};

export const closeBrowser = async (): Promise<void> => {
  if (!browserPromise) return;
  try {
    const b = await browserPromise;
    await b.close();
  } catch { /* ignore */ }
  browserPromise = null;
};

process.once('SIGINT', () => { closeBrowser().finally(() => process.exit(0)); });
process.once('SIGTERM', () => { closeBrowser().finally(() => process.exit(0)); });
