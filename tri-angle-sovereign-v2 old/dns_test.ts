import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

async function testMx() {
    const domains = ['jpmgroupuae.com', 'manco.ae', 'ahcdglobal.com', 'gmail.com'];
    for (const domain of domains) {
        try {
            const mx = await resolveMx(domain);
            console.log(`✅ MX for ${domain}:`, JSON.stringify(mx, null, 2));
        } catch (e: any) {
            console.log(`❌ MX FAILED for ${domain}:`, e.message);
        }
    }
    process.exit(0);
}

testMx();
