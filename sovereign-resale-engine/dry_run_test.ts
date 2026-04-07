import { cleanName, sanitizeEmail } from './personalizer';
import sqlite3 from 'sqlite3';
import path from 'path';

const testNames = [
    "Digital Gravity | Best SEO Agency Dubai",
    "Al Furat Group (MEP) - Sharjah",
    "The Welcome to Tech Solutions LLC",
    "Expert in Digital Marketing Agency Abu Dhabi",
    "Global Logistics FZCO",
    "SIMBA"
];

console.log("🧪 [DRY RUN] Testing Brand Name Extraction...");
testNames.forEach(name => {
    console.log(`Input: "${name}" -> Output: "${cleanName(name)}"`);
});

console.log("\n🧪 [DRY RUN] Testing Tone Enforcement (Banned Words)...");
const roboticInput = "This revolutionary and seamless solution will unlock your success and leverage your growth.";
console.log(`Input: "${roboticInput}"`);
console.log(`Output: "${sanitizeEmail(roboticInput)}"`);

const dbPath = path.join(process.cwd(), 'sovereign_v5.db');
const db = new sqlite3.Database(dbPath);

console.log("\n🧪 [DRY RUN] Verifying Database Identity...");
db.get("SELECT value FROM settings WHERE key = 'COMPANY_NAME'", (err, row: any) => {
    console.log(`COMPANY_NAME: ${row?.value || 'NOT FOUND'}`);
    db.close();
});
