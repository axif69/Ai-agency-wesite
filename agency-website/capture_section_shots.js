const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  const artifactDir = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e879662-5cc0-4f10-8e85-ff40c16e4b97\\artifacts\\`;

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000/sovereign-sales-agent', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Section 4: Workflow
  const workflowEl = await page.$('#planned-workflow');
  if (workflowEl) await workflowEl.screenshot({ path: `${artifactDir}section_workflow.png` });

  // Section 5 & 6: Evidence & Fit Scoring
  const evidenceSec = await page.$('section:nth-of-type(5)');
  if (evidenceSec) await evidenceSec.screenshot({ path: `${artifactDir}section_evidence_fit.png` });

  // Section 7: Contact Confidence
  const confidenceSec = await page.$('section:nth-of-type(7)');
  if (confidenceSec) await confidenceSec.screenshot({ path: `${artifactDir}section_confidence.png` });

  // Section 12: Integrations
  const integrationsSec = await page.$('section:nth-of-type(12)');
  if (integrationsSec) await integrationsSec.screenshot({ path: `${artifactDir}section_integrations.png` });

  // Section 15: Roadmap
  const roadmapSec = await page.$('section:nth-of-type(15)');
  if (roadmapSec) await roadmapSec.screenshot({ path: `${artifactDir}section_roadmap.png` });

  // Section 17: FAQ
  const faqSec = await page.$('section:nth-of-type(17)');
  if (faqSec) await faqSec.screenshot({ path: `${artifactDir}section_faq.png` });

  // Section 16: Final CTA
  const ctaSec = await page.$('section:nth-of-type(16)');
  if (ctaSec) await ctaSec.screenshot({ path: `${artifactDir}section_cta.png` });

  await browser.close();
  console.log('Section screenshots captured successfully');
})();
