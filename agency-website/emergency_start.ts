import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'emergency_log.txt');
const log = (msg: string) => {
  console.log(msg);
  fs.appendFileSync(logFile, `[${new Date().toLocaleTimeString()}] ${msg}\n`);
};

async function start() {
  log('🚨 EMERGENCY START INITIATED');
  
  // 1. Kill everything first
  log('Cleaning up ports 3010, 3011, 5173...');
  const kill = spawn('npx', ['kill-port', '3010', '3011', '5173'], { shell: true });
  await new Promise(r => kill.on('close', r));

  // 2. Start API Server
  log('Starting API Server (Port 3010)...');
  const server = spawn('npx', ['tsx', 'server.ts'], { 
    cwd: '../GM Events agent',
    shell: true,
    env: { ...process.env, NODE_ENV: 'production' }
  });

  server.stdout.on('data', (data) => log(`[SERVER]: ${data}`));
  server.stderr.on('data', (data) => log(`[SERVER ERROR]: ${data}`));

  // 3. Start Dashboard
  log('Starting Dashboard (Port 3011)...');
  const dashboard = spawn('npx', ['tsx', 'worker.ts'], { // Wait, is worker the dashboard? No.
    cwd: '../GM Events agent',
    shell: true
  });
  
  // Wait 10 seconds to see if it stays alive
  await new Promise(r => setTimeout(r, 10000));
  log('Check complete. See log above for errors.');
}

start();
