import { db } from './db';

async function seedTargetNiches() {
  console.log("=== 🎯 SEEDING EXACT 6 B2B TARGET NICHES INTO SQLITE DB ===");

  const targetLocations = "Dubai, Abu Dhabi, New York, Toronto, London, Sydney";
  const targetNichesList = [
    "Digital Marketing Agencies",
    "Software Development Companies",
    "Commercial Interior Design Fitout Contractors",
    "Corporate Recruitment Staffing Agencies",
    "Logistics & Freight Forwarders",
    "Commercial Real Estate Brokers"
  ];
  const targetNichesJson = JSON.stringify(targetNichesList);
  const targetNichesCsv = targetNichesList.join(', ');

  const updates = [
    { key: 'target_location', value: targetLocations },
    { key: 'TARGET_LOCATION', value: targetLocations },
    { key: 'DYNAMIC_NICHES', value: targetNichesJson },
    { key: 'dynamic_niches', value: targetNichesJson },
    { key: 'REQUIRED_KEYWORDS', value: targetNichesCsv },
    { key: 'required_keywords', value: targetNichesCsv },
    { key: 'NEGATIVE_KEYWORDS', value: 'directory, yellow pages, job vacancy, careers, glassdoor, wikipedia, retail shop, consumer, e-commerce store' },
    { key: 'negative_keywords', value: 'directory, yellow pages, job vacancy, careers, glassdoor, wikipedia, retail shop, consumer, e-commerce store' }
  ];

  const stmt = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
  
  db.serialize(() => {
    updates.forEach(u => {
      stmt.run(u.key, u.value);
      console.log(`  ✅ Settings key updated: ${u.key} -> ${u.value.slice(0, 70)}...`);
    });

    // Delete directory / irrelevant lead entries like contrafinder.com
    db.run("DELETE FROM leads WHERE domain LIKE '%contrafinder%' OR domain LIKE '%directory%' OR domain LIKE '%yellowpages%' OR domain LIKE '%finder%'");
    console.log("  🧹 Cleaned directory portal leads from database.");
  });

  console.log("✨ Database successfully configured for exact 6 B2B buyer niches!");
  process.exit(0);
}

seedTargetNiches().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
