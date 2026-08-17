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
     
     // full page desktop
     await page.setViewport({ width: 1440, height: 900 });
     await page.goto('http://localhost:3000' + u, {waitUntil: 'networkidle2'});
     await page.screenshot({ path: `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\${name}_desktop.png`, fullPage: true });

     // full page mobile
     await page.setViewport({ width: 390, height: 844 });
     await page.screenshot({ path: `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\${name}_mobile.png`, fullPage: true });
     
     console.log(`Done ${name}`);
  }
  await browser.close();
})();
