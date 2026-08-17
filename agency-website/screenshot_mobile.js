const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const urls = [
    '/ai-real-estate-uae',
    '/ai-real-estate-agencies-dubai',
    '/ai-property-management-uae',
    '/real-estate-digital-solutions-uae',
    '/web-design-sharjah'
  ];

  for (const u of urls) {
     const name = u.slice(1);
     console.log(`Processing ${name}...`);
     
     // Full page mobile at 390px
     await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
     await page.goto('http://localhost:3000' + u, { waitUntil: 'networkidle2', timeout: 30000 });
     await new Promise(r => setTimeout(r, 1000));
     await page.screenshot({ path: `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\${name}_mobile_390.png`, fullPage: true });
     console.log(`Done mobile ${name}`);
  }
  await browser.close();
  console.log('All done');
})();
