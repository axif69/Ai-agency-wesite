import db, { addLog, heartbeat } from '../server/db';

/**
 * Orchestrator — pure SUPERVISOR (no inline pipeline work).
 *
 * Responsibilities:
 *  1. Heartbeat for the System Health panel.
 *  2. Recover stuck leads (in PROFILING/HUNTING/WRITING for > N minutes).
 *  3. Promote PROFILE_FAILED → JUDGING after a cool-off (deep OSINT fallback).
 *  4. Enforce daily_send_cap (mark surplus DRAFTING leads as PAUSED).
 *
 * The actual pipeline runs in `src/processes/{scout,profiler,hunter,writer}.ts`
 * — one terminal per agent, all reading the same SQLite DB.
 */
export class Orchestrator {
  private isRunning = false;

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    addLog('SYSTEM', 'Orchestrator (Supervisor) online. Monitoring agent pool.', 'SUCCESS');

    while (this.isRunning) {
      try {
        heartbeat('ORCHESTRATOR', 'RUNNING');
        await this.supervise();
      } catch (error: any) {
        addLog('SYSTEM', `Supervisor error: ${error.message}`, 'ERROR');
      }
      await new Promise((r) => setTimeout(r, 30000)); // 30s supervisory tick
    }
  }

  stop() {
    this.isRunning = false;
  }

  private async supervise() {
    const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
    if (!campaign) return;

    // ── 1. Recover stuck leads (>10 min in a transient state) ──────────────
    const stuckProfiling = db
      .prepare(
        "UPDATE leads SET status = 'READY' " +
        "WHERE status = 'PROFILING' " +
        "AND (julianday('now') - julianday(last_updated)) * 24 * 60 > 10"
      )
      .run();
    const stuckHunting = db
      .prepare(
        "UPDATE leads SET status = 'JUDGING' " +
        "WHERE status = 'HUNTING' " +
        "AND (julianday('now') - julianday(last_updated)) * 24 * 60 > 10"
      )
      .run();
    const stuckWriting = db
      .prepare(
        "UPDATE leads SET status = 'DRAFTING' " +
        "WHERE status = 'WRITING' " +
        "AND (julianday('now') - julianday(last_updated)) * 24 * 60 > 10"
      )
      .run();
    const recovered = (stuckProfiling.changes || 0) + (stuckHunting.changes || 0) + (stuckWriting.changes || 0);
    if (recovered > 0) {
      addLog('SYSTEM', `Recovered ${recovered} stuck leads.`, 'WARNING');
    }

    // ── 2. Deep OSINT fallback: re-queue PROFILE_FAILED leads after 30 min ─
    const requeue = db
      .prepare(
        "UPDATE leads SET status = 'JUDGING' " +
        "WHERE status = 'PROFILE_FAILED' " +
        "AND (julianday('now') - julianday(last_updated)) * 24 * 60 > 30"
      )
      .run();
    if (requeue.changes > 0) {
      addLog('SYSTEM', `Promoted ${requeue.changes} PROFILE_FAILED leads to JUDGING (deep OSINT pass).`, 'INFO');
    }

    // ── 3. Garbage-collect old consumed triggers ───────────────────────────
    db.prepare("DELETE FROM triggers WHERE consumed = 1 AND created_at < datetime('now', '-1 hour')").run();
  }
}

