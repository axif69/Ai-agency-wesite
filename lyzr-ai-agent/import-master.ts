import Database from 'better-sqlite3';
import fs from 'fs';
import { initDb } from './src/server/db';

const db = new Database('sniper.db');

initDb();

// Import real_exhibitors.json
const exhibitors = JSON.parse(fs.readFileSync('real_exhibitors.json', 'utf-8'));
const insert = db.prepare('INSERT OR IGNORE INTO master_seeds (company_name, website, country, category, source) VALUES (?, ?, ?, ?, ?)');

let count = 0;
for (const company of exhibitors) {
  insert.run(company.company_name, company.website, company.country, company.category, company.source);
  count++;
}
console.log(`Imported ${count} companies from real_exhibitors.json`);

// Import defense_exhibitors.json
const defenseExhibitors = JSON.parse(fs.readFileSync('defense_exhibitors.json', 'utf-8'));
let defenseCount = 0;
for (const company of defenseExhibitors) {
  insert.run(company.company_name, company.website, company.country, company.category, company.source);
  defenseCount++;
}
console.log(`Imported ${defenseCount} companies from defense_exhibitors.json`);

console.log(`Total: ${count + defenseCount} companies imported into master_seeds table`);
