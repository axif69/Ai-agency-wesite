import db, { initDb, addLog, heartbeat, consumeTrigger } from '../server/db';
import { AIDiscovery } from '../agents/AIDiscovery';
import dotenv from 'dotenv';

dotenv.config();
initDb();

addLog('SCOUT', 'AI Discovery Terminal Active. Continuous Discovery...', 'SUCCESS');

async function loop() {
  while (true) {
    heartbeat('SCOUT');
    const manual = consumeTrigger('scout');
    const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
    if (campaign) {
      if (manual) addLog('SCOUT', 'Manual trigger received — running discovery now.', 'INFO');
      await AIDiscovery.discover(campaign);
    }
    // Poll triggers every 2s
    await new Promise((r) => setTimeout(r, 2000));
  }
}

loop();
