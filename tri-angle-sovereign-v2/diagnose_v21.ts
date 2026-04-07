import { validateEmailSafe, getSettings } from './worker.ts';
import { extractRealCompanyNameWithAI } from './search_service.ts';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function runDiagnostics() {
    console.log("🔍 STARTING SOVEREIGN v21.16 SYSTEM DIAGNOSTICS...");
    console.log("--------------------------------------------------");

    // 1. Check DB Settings
    try {
        const settings = await getSettings();
        console.log("✅ DB SETTINGS RETRIEVED:");
        console.log(`   - Model: ${settings.model}`);
        console.log(`   - Tone: ${settings.tone}`);
        console.log(`   - Verify Domains: ${settings.verify_domains}`);
    } catch (e: any) {
        console.error("❌ FAILED TO RETRIEVE SETTINGS:", e.message);
    }

    // 2. Test Email Validation (Bounce-Shield)
    const testEmails = [
        { email: 'info@alfuratme.com', expect: true, note: 'Real construction domain' },
        { email: 'fake-user@yellowpages.ae', expect: false, note: 'Directory placeholder' },
        { email: 'asif@gmail.com', expect: true, note: 'Personal but valid MX' }
    ];

    console.log("\n🛡️ TESTING EMAIL VALIDATION (BOUNCE-SHIELD)...");
    for (const test of testEmails) {
        const isValid = await validateEmailSafe(test.email, true);
        const status = isValid === test.expect ? "✅ PASS" : "❌ FAIL";
        console.log(`   - ${test.email} (${test.note}): ${status} (Result: ${isValid})`);
    }

    // 3. Test Identity Guard (Company Name Extraction)
    const testSites = [
        { url: 'https://mecaemep.com', domain: 'mecaemep.com', note: 'MEP Contractor' },
        { url: 'https://alfuratme.com', domain: 'alfuratme.com', note: 'Engineering Services' }
    ];

    console.log("\n🏢 TESTING IDENTITY GUARD (COMPANY NAME EXTRACTION)...");
    for (const site of testSites) {
        try {
            console.log(`   - Scraping ${site.url}...`);
            const res = await axios.get(site.url, { timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0' } });
            const name = await extractRealCompanyNameWithAI(res.data, site.domain);
            console.log(`   - ✅ Extracted: "${name}" (Expected professional entity name)`);
        } catch (e: any) {
            console.log(`   - ⚠️ Could not scrape ${site.url}: ${e.message}`);
        }
    }

    console.log("\n--------------------------------------------------");
    console.log("🏁 DIAGNOSTICS COMPLETE.");
    process.exit(0);
}

runDiagnostics();
