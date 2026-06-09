import db, { initDb, addLog, heartbeat, consumeTrigger } from '../server/db';
import { Ghostwriter } from '../agents/Ghostwriter';
import dotenv from 'dotenv';

dotenv.config();
initDb();

addLog('WRITER', 'Ghostwriter Terminal Active. Drafting Pitches...', 'SUCCESS');

async function loop() {
  while (true) {
    heartbeat('WRITER');
    consumeTrigger('writer');
    const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
    if (campaign) {
      const leads = db.prepare("SELECT * FROM leads WHERE status = 'DRAFTING' LIMIT ?").all(campaign.personalization_concurrency || 5) as any[];
      for (const lead of leads) {
        await Ghostwriter.process(lead, campaign);
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
}

loop();
