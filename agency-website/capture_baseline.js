const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  // Baseline Homepage Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\baseline_homepage_desktop.png`, fullPage: false });

  // Baseline Sovereign Page Desktop
  await page.goto('http://127.0.0.1:3000/sovereign-sales-agent', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\baseline_sovereign_desktop.png`, fullPage: false });

  // Baseline Mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:3000/sovereign-sales-agent', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\baseline_sovereign_mobile.png`, fullPage: false });

  await browser.close();
  console.log('Baseline screenshots captured successfully');
})();
