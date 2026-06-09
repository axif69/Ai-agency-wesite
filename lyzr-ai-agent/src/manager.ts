import { spawn } from 'child_process';

const agents = [
  { name: 'Orchestrator', script: 'src/processes/orchestrator.ts' },
  { name: 'Scout', script: 'src/processes/scout.ts' },
  { name: 'Profiler', script: 'src/processes/profiler.ts' },
  { name: 'Hunter', script: 'src/processes/hunter.ts' },
  { name: 'Writer', script: 'src/processes/writer.ts' },
];

function spawnAgent(agent: { name: string; script: string }) {
  console.log(`[MANAGER] Launching ${agent.name} terminal...`);
  
  // On Windows, 'start' command opens a new terminal window
  // Using npx tsx explicitly and removing stdio ignore to ensure logs are visible
  const child = spawn('cmd.exe', ['/c', 'start', 'cmd', '/k', `npx tsx ${agent.script}`], {
    shell: true,
    detached: true,
  });

  child.unref();
}

console.log('--- GM Events Global Sniper: MAS Spawner ---');
agents.forEach(spawnAgent);
console.log('[MANAGER] All agent terminals deployed.');
