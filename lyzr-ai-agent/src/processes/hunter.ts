import db, { initDb, addLog, heartbeat, consumeTrigger } from '../server/db';
import { Hunter } from '../agents/Hunter';
import dotenv from 'dotenv';

dotenv.config();
initDb();

addLog('HUNTER', 'Executive Hunter Terminal Active. Sniping C-Suite...', 'SUCCESS');

async function loop() {
  while (true) {
    heartbeat('HUNTER');
    consumeTrigger('hunter');
    const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
    if (campaign) {
      const leads = db.prepare("SELECT * FROM leads WHERE status = 'VERIFIED' LIMIT ?").all(campaign.enrichment_concurrency || 5) as any[];
      for (const lead of leads) {
        await Hunter.process(lead, campaign);
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
}

loop();
