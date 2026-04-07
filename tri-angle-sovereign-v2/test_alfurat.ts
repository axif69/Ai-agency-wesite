import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

const SEARCH_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!png|jpg|jpeg|gif|svg|webp|js|css|pdf|ico)[a-zA-Z]{2,}/gi;

async function test() {
    console.log('🔓 Launching stealth browser for alfuratgroup.net/contact.php...');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.goto('https://www.alfuratgroup.net/contact.php', { waitUntil: 'networkidle2', timeout: 30000 });
    const html = await page.content();
    await browser.close();
    
    console.log(`✅ Got ${html.length} chars of HTML`);
    
    // Decode entities
    const decoded = html
        .replace(/&#64;/g, '@')
        .replace(/&#x40;/g, '@')
        .replace(/\[at\]/gi, '@')
        .replace(/\(at\)/gi, '@');
    
    const emails = decoded.match(SEARCH_REGEX) || [];
    console.log(`📧 Emails found: ${emails.length}`);
    emails.forEach(e => console.log(`  → ${e}`));
    
    // Also check mailto
    const mailtos = html.match(/mailto:([^\s"'>]+)/gi) || [];
    console.log(`📬 Mailto links: ${mailtos.length}`);
    mailtos.forEach(m => console.log(`  → ${m}`));
}

test().catch(e => console.error('ERROR:', e.message));
