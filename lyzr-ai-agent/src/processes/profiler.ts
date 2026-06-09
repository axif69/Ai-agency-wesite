import db, { initDb, addLog, heartbeat, consumeTrigger } from '../server/db';
import { Profiler } from '../agents/Profiler';
import dotenv from 'dotenv';

dotenv.config();
initDb();

addLog('PROFILER', 'Researcher Terminal Active. Analyzing Entities...', 'SUCCESS');

async function loop() {
  while (true) {
    heartbeat('PROFILER');
    consumeTrigger('profiler');
    const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
    if (campaign) {
      const leads = db.prepare("SELECT * FROM leads WHERE status = 'READY' LIMIT ?").all(campaign.discovery_concurrency || 5) as any[];
      for (const lead of leads) {
        await Profiler.process(lead, campaign);
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
}

loop();
