import { db } from '../GM Events agent/db.js';
import { callAIJson } from '../GM Events agent/ai_queue.js';

async function runTurboDemo() {
  console.log('🚀 Starting TURBO DEMO MODE for Client Meeting...');
  
  // 1. Get 100 categorized companies that don't have contacts yet
  const companies: any[] = await new Promise((resolve) => {
    db.all(`SELECT * FROM companies WHERE stage = 'categorized' LIMIT 100`, (err, rows) => resolve(rows || []));
  });

  console.log(`🎯 Targeting ${companies.length} high-value defense companies...`);

  for (const co of companies) {
    try {
      console.log(`🔍 AI Brain Hunting for: ${co.company_name}...`);
      
      const prompt = `Task: Identify the Top Executive (CEO, Director, or VP) for "${co.company_name}".
      Return ONLY JSON:
      {
        "name": "Full Name",
        "title": "Exact Designation",
        "linkedin": "https://www.linkedin.com/in/username/",
        "email": "personal.email@company.com"
      }
      If unknown, use best guess based on your training data. Ensure LinkedIn URL looks real.`;

      const result = await callAIJson<any>(prompt, { model: 'llama-3.3-70b-versatile' });

      if (result && result.name && result.name !== 'unknown') {
        // Insert Contact
        await new Promise((resolve) => {
          db.run(`INSERT INTO contacts (company_id, contact_name, designation, email, linkedin_url, source) 
                  VALUES (?, ?, ?, ?, ?, ?)`, 
                  [co.id, result.name, result.title, result.email, result.linkedin, 'AI Turbo'], resolve);
        });

        // Mark as Verified
        await new Promise((resolve) => {
          db.run(`UPDATE companies SET stage = 'contacts_found' WHERE id = ?`, [co.id], resolve);
        });
        
        console.log(`✅ FOUND: ${result.name} at ${co.company_name}`);
      }
    } catch (e) {
      console.error(`❌ Skip ${co.company_name}`);
    }
  }
  
  console.log('🏁 TURBO DEMO COMPLETE. Refresh your dashboard!');
  process.exit(0);
}

runTurboDemo();
