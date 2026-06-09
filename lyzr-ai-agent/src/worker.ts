import db, { addLog } from './server/db';
import { Agent } from './framework/Agent';
import { Task } from './framework/Task';
import { Orchestrator } from './framework/Orchestrator';
import { BingSearchTool } from './tools/BingSearchTool';
import { WebScraperTool } from './tools/WebScraperTool';
import { JsonSchemaGuardrail, PIIFilterGuardrail } from './framework/Guardrails';

async function runLyzrPipeline() {
  const campaign = db.prepare('SELECT * FROM campaign_settings WHERE id = 1').get();
  if (!campaign || campaign.system_status !== 'ACTIVE') {
    return;
  }

  const llmConfig = {
    apiKey: campaign.openrouter_key,
    baseURL: campaign.openrouter_base_url,
    model: campaign.openrouter_model
  };

  // 1. Define Agents (Lyzr Persona Architecture)
  const scoutAgent = new Agent({
    role: 'Global Intelligence Scout',
    goal: 'Discover new high-intent B2B company domains from the internet.',
    backstory: 'An elite recon agent specializing in identifying untapped targets.',
    llmConfig
  });

  const profilerAgent = new Agent({
    role: 'Defense Intelligence Analyst',
    goal: 'Analyze company website text and categorize their specific niche.',
    backstory: 'A meticulous data analyst who filters out noise and precisely classifies targets based on complex taxonomies.',
    llmConfig
  });

  // 2. Define Tools
  const searchTool = new BingSearchTool();
  const scraperTool = new WebScraperTool();

  // 3. Define Tasks (Lyzr DAG Architecture)
  const discoveryTask = new Task({
    name: 'Discovery',
    description: 'Search for companies',
    agent: scoutAgent,
    expectedOutput: 'Array of company leads',
    executeTool: {
      tool: searchTool,
      inputFn: () => {
        const keywordList = (campaign.niche_keywords || 'Defense').split(',').map((k: string) => k.trim());
        const countryList = (campaign.target_countries || 'Global').split(',').map((c: string) => c.trim());
        const niche = keywordList[Math.floor(Math.random() * keywordList.length)];
        const country = countryList[Math.floor(Math.random() * countryList.length)];
        addLog('SCOUT', `IRONCLAD HUNT: [${niche}] in [${country}]...`, 'INFO');
        return `${niche} manufacturers companies ${country} list`;
      }
    }
  });

  // 4. Custom Execution Logic embedding Orchestration
  // We manually orchestrate the DB interaction between DAG steps to maintain UI state
  
  // STEP A: Discovery
  let discoveredEntities = [];
  try {
    discoveredEntities = await discoveryTask.run();
    addLog('SCOUT', `Direct Extraction Complete. Found ${discoveredEntities.length} entities.`, 'SUCCESS');
    
    let added = 0;
    const stmt = db.prepare('INSERT INTO leads (company_name, website, country, status, sector) VALUES (?, ?, ?, ?, ?)');
    for (const res of discoveredEntities.slice(0, 5)) {
      const domain = new URL(res.url).hostname;
      const cleanUrl = `https://${domain}`;
      const exists = db.prepare('SELECT id FROM leads WHERE website = ?').get(cleanUrl);
      if (!exists) {
        stmt.run(res.title.slice(0, 50).trim(), cleanUrl, 'Global', 'READY', 'PENDING OSINT');
        added++;
      }
    }
    if (added > 0) addLog('SCOUT', `Pipeline Fed. Added ${added} REAL verified domains.`, 'SUCCESS');
  } catch (e) {
    addLog('SCOUT', `Discovery Engine Failure.`, 'ERROR');
  }

  // STEP B: Profiling (Picking up from DB queue)
  const leadToProfile = db.prepare("SELECT * FROM leads WHERE status = 'READY' LIMIT 1").get();
  if (leadToProfile) {
    db.prepare("UPDATE leads SET status = 'PROFILING' WHERE id = ?").run(leadToProfile.id);
    addLog('PROFILER', `Analyzing ${leadToProfile.company_name} for Global Defense alignment...`, 'INFO');

    try {
      // Use tool directly for scraping
      const content = await scraperTool.execute(leadToProfile.website);

      // Create a specific LLM task for this lead
      const analyzeTask = new Task({
        name: 'AnalyzeEntity',
        description: `
          Analyze this website text:
          ---
          ${content}
          ---
          Targeting Niche: ${campaign.niche_keywords}
          Negative Keywords: ${campaign.negative_keywords}

          Tasks:
          1. Is this company a real defense/tech entity? (true/false)
          2. Does it match any negative keywords? (true/false)
          3. Which sector does it belong to? (Choose ONE that fits best: Defense Contractor, Unmanned Platforms, UAV/UGV/USV, C4ISR, Electronic Warfare, Maritime Security, Advanced Sensors & Radar, Air Defence Systems, Military Engineering, System Integration, ISR & Situational Awareness, Secure Communications, General Defense, Unknown)

          Respond ONLY in JSON format:
          { "isMatch": boolean, "isNegative": boolean, "sector": "Sector Name", "reason": "brief reason" }
        `,
        agent: profilerAgent,
        expectedOutput: 'JSON Object with evaluation.',
        guardrails: [new JsonSchemaGuardrail()] // Applying Guardrails here
      });

      const rawResult = await analyzeTask.run();
      const result = JSON.parse(rawResult);

      if (result.isMatch && !result.isNegative) {
        db.prepare("UPDATE leads SET status = 'JUDGING', sector = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?").run(
          result.sector || leadToProfile.sector || 'DEFENSE TECHNOLOGY', 
          leadToProfile.id
        );
        addLog('JUDGE', `${leadToProfile.company_name} labeled as [${result.sector || 'DEFENSE'}]. Ready for enrichment.`, 'SUCCESS');
      } else {
        db.prepare("UPDATE leads SET status = 'REJECTED', last_updated = CURRENT_TIMESTAMP WHERE id = ?").run(leadToProfile.id);
        addLog('JUDGE', `${leadToProfile.company_name} REJECTED: ${result.reason || 'Niche mismatch'}`, 'WARNING');
      }

    } catch (e: any) {
      addLog('PROFILER', `AI Profiling Failed for ${leadToProfile.company_name}: ${e.message}`, 'ERROR');
      db.prepare("UPDATE leads SET status = 'PROFILE_FAILED', last_updated = CURRENT_TIMESTAMP WHERE id = ?").run(leadToProfile.id);
    }
  }
}

async function main() {
  console.log('Starting GM Events "Lyzr Clone" Worker...');
  addLog('SYSTEM', 'Lyzr Architecture Migrated. Modular framework active.', 'SUCCESS');

  while (true) {
    await runLyzrPipeline();
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

main().catch(console.error);
