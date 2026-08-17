const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  const artifactDir = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\`;

  // Desktop Screenshots (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000/sovereign-sales-agent', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Hero 1440px
  await page.screenshot({ path: `${artifactDir}final_hero_1440.png`, fullPage: false });

  // Full Page Desktop
  await page.screenshot({ path: `${artifactDir}final_full_desktop.png`, fullPage: true });

  // Mobile Screenshots (390px)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:3000/sovereign-sales-agent', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Mobile Hero
  await page.screenshot({ path: `${artifactDir}final_mobile_hero.png`, fullPage: false });

  // Mobile Full Page
  await page.screenshot({ path: `${artifactDir}final_mobile_full.png`, fullPage: true });

  await browser.close();
  console.log('Final screenshots captured successfully');
})();
