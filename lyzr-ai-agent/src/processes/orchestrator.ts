import { initDb, addLog } from '../server/db';
import { Orchestrator } from '../agents/Orchestrator';
import dotenv from 'dotenv';

dotenv.config();
initDb();

addLog('SYSTEM', 'Orchestrator Terminal Active. Supervisor mode.', 'SUCCESS');

new Orchestrator().start();
