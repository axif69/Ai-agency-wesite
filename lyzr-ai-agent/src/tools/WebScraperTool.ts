import { chromium } from 'playwright';
import { Tool, ToolContext } from '../framework/Tool';

export class WebScraperTool extends Tool {
  constructor() {
    super('WebScraper', 'Scrapes the text content of a given URL using Playwright.');
  }

  async execute(url: string, context?: ToolContext): Promise<string> {
    const browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const browserContext = await browser.newContext();

    try {
      const page = await browserContext.newPage();
      await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf,otf,css}', route => route.abort());

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      const content = await page.evaluate(() => {
        return document.body.innerText.trim().slice(0, 4000);
      });

      return content;
    } finally {
      await browser.close();
    }
  }
}
