import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import nodemailer from 'nodemailer';
import db, { initDb, addLog, cleanupJunkLeads } from './db';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

initDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /g, '_'));
  }
});
const upload = multer({ storage });

app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number };
  const completed = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'VERIFIED'").get() as { count: number };
  const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
  const smtpReady = !!(campaign?.smtp_host && campaign?.smtp_user && campaign?.smtp_pass);
  res.json({ totalLeads: total.count, completedLeads: completed.count, activeCampaign: { ...campaign, smtp_ready: smtpReady } });
});

app.post('/api/upload', upload.single('brochure'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const brochurePath = `/uploads/${req.file.filename}`;
  const filePath = req.file.path;

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const content = data.text || '';
    
    db.prepare(`UPDATE campaign_settings SET brochure_path = ?, brochure_content = ? WHERE id = (SELECT id FROM campaign_settings ORDER BY id DESC LIMIT 1)`).run(brochurePath, content);
    
    res.json({ success: true, path: brochurePath, content });
  } catch (error: any) {
    console.error('[UPLOAD ERROR]', error.message);
    res.status(500).json({ error: 'Failed to parse PDF: ' + error.message });
  }
});

// Correct Purge Endpoint (Lead + Intel)
app.post('/api/purge', (req, res) => {
  db.prepare('DELETE FROM leads').run();
  db.prepare('DELETE FROM system_logs').run();
  db.prepare('UPDATE campaign_settings SET brochure_path = NULL, brochure_content = NULL WHERE id = (SELECT id FROM campaign_settings ORDER BY id DESC LIMIT 1)').run();
  res.json({ success: true });
});

app.get('/api/leads', (req, res) => {
  const status      = (req.query.status as string) || '';
  const includeRej  = (req.query.includeRejected as string) === '1';
  const limit       = Math.min(parseInt((req.query.limit as string) || '500', 10) || 500, 5000);
  const search      = (req.query.search as string) || '';
  const where: string[] = [];
  const params: any[] = [];
  if (status) {
    where.push('status = ?'); params.push(status);
  } else if (!includeRej) {
    // Pillar-Validation Gate: hide REJECTED from Master Database by default
    where.push("status != 'REJECTED'");
  }
  if (search) { where.push('(company_name LIKE ? OR website LIKE ? OR contact_name LIKE ? OR verified_email LIKE ?)'); const q = `%${search}%`; params.push(q,q,q,q); }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const leads = db.prepare(`SELECT * FROM leads ${whereSql} ORDER BY last_updated DESC LIMIT ?`).all(...params, limit);
  const totalRow = db.prepare(`SELECT COUNT(*) as count FROM leads ${whereSql}`).get(...params) as { count: number };
  res.json({ leads, total: totalRow.count });
});

// ── Junk-lead cleanup (manual trigger from Control Center) ──────────────
app.post('/api/cleanup', async (_req, res) => {
  try {
    const result = await cleanupJunkLeads();
    res.json({ success: true, ...result });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ── Manual stage trigger — wakes the corresponding agent process ────────
app.post('/api/trigger/:stage', (req, res) => {
  const stage = String(req.params.stage || '').toLowerCase();
  if (!['scout','profiler','hunter','writer'].includes(stage)) {
    return res.status(400).json({ error: 'Invalid stage' });
  }
  db.prepare('INSERT INTO triggers (stage) VALUES (?)').run(stage);
  res.json({ success: true, stage });
});

// ── Bulk import: paste a list of domains → seed Scout pipeline ──────────
app.post('/api/import', (req, res) => {
  const list: string[] = Array.isArray(req.body?.domains) ? req.body.domains : [];
  const country: string = req.body?.country || 'Global';
  const sector:  string = (req.body?.sector || 'IMPORTED').toUpperCase();
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO leads (company_name, website, country, status, sector) VALUES (?, ?, ?, ?, ?)'
  );
  let added = 0;
  for (const raw of list) {
    if (!raw) continue;
    const host = String(raw).trim().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
    if (!host || !host.includes('.')) continue;
    const info = stmt.run(host, `https://${host}`, country, 'READY', sector);
    if (info.changes > 0) added++;
  }
  res.json({ success: true, added, requested: list.length });
});

// ── Analytics: aggregations for the Analytics tab ────────────────────────
app.get('/api/analytics', (_req, res) => {
  const stages   = db.prepare('SELECT status as stage, COUNT(*) as count FROM leads GROUP BY status').all();
  const sectors  = db.prepare('SELECT sector, COUNT(*) as count FROM leads WHERE sector IS NOT NULL GROUP BY sector ORDER BY count DESC LIMIT 12').all();
  const countries= db.prepare('SELECT country, COUNT(*) as count FROM leads WHERE country IS NOT NULL GROUP BY country ORDER BY count DESC LIMIT 12').all();
  const daily    = db.prepare("SELECT date(last_updated) as day, COUNT(*) as count FROM leads WHERE last_updated > datetime('now','-14 day') GROUP BY day ORDER BY day").all();
  res.json({ stages, sectors, countries, daily });
});

// ── Agent health ─────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  const agents = db.prepare("SELECT agent, last_seen, status, (julianday('now') - julianday(last_seen)) * 86400 as seconds_ago FROM agent_heartbeat").all();
  res.json({ agents });
});

// ── Outreach send (single lead via SMTP) ─────────────────────────────────
app.post('/api/outreach/send', async (req, res) => {
  const leadId = parseInt(req.body?.leadId, 10);
  if (!leadId) return res.status(400).json({ error: 'leadId required' });
  const lead     = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId) as any;
  const campaign = db.prepare('SELECT * FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as any;
  if (!lead || !lead.verified_email) return res.status(400).json({ error: 'No verified email for this lead' });
  if (!campaign?.smtp_host || !campaign?.smtp_user) return res.status(400).json({ error: 'SMTP not configured' });
  try {
    const transporter = nodemailer.createTransport({
      host: campaign.smtp_host,
      port: parseInt(campaign.smtp_port, 10) || 587,
      secure: parseInt(campaign.smtp_port, 10) === 465,
      auth: { user: campaign.smtp_user, pass: campaign.smtp_pass },
    });
    await transporter.sendMail({
      from: `"${campaign.agency_rep || 'GM Events'}" <${campaign.smtp_user}>`,
      to: lead.verified_email,
      subject: `${campaign.agency_name || 'GM Events'} — ${lead.company_name}`,
      text: lead.pitch_draft || '',
    });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ── Lead delete (single + batch) ─────────────────────────────────────────
app.delete('/api/leads/:id', (req, res) => {
  db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});
app.post('/api/leads/batch-delete', (req, res) => {
  const ids: number[] = req.body?.ids || [];
  if (!ids.length) return res.json({ success: true, deleted: 0 });
  const placeholders = ids.map(() => '?').join(',');
  const info = db.prepare(`DELETE FROM leads WHERE id IN (${placeholders})`).run(...ids);
  res.json({ success: true, deleted: info.changes });
});

app.get('/api/logs', (req, res) => {
  const logs = db.prepare('SELECT * FROM system_logs ORDER BY timestamp DESC LIMIT 50').all();
  res.json(logs);
});

app.post('/api/test-smtp', async (req, res) => {
  const { host, port, user, pass } = req.body;
  const transporter = nodemailer.createTransport({ host, port: parseInt(port) || 587, secure: parseInt(port) === 465, auth: { user, pass }, timeout: 10000 });
  try {
    await transporter.verify();
    res.json({ success: true, message: 'SMTP Connection Successful' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/settings', (req, res) => {
  const s = req.body || {};
  const current = db.prepare('SELECT id FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as { id: number } | undefined;
  if (!current) return res.status(500).json({ error: 'No campaign row' });

  // Whitelist of editable columns — ignore unknown fields the UI may post
  const COLS = [
    'agency_name','agency_rep','agency_website','agency_phone','agency_location',
    'campaign_name','campaign_strategy',
    'openai_key','anthropic_key','google_key','openrouter_key','openrouter_base_url','openrouter_model','apollo_key',
    'model_discovery','model_categorization','model_enrichment','model_personalization',
    'target_designations','niche_keywords','target_countries','sector_pillars','negative_keywords','banned_domains',
    'follow_up_delay','follow_up_pitch','creativity_threshold',
    'smtp_host','smtp_port','smtp_user','smtp_pass',
    'discovery_concurrency','enrichment_concurrency','personalization_concurrency',
    'scrape_timeout','retry_count','daily_send_cap'
  ];
  const updates: string[] = [];
  const values: any[] = [];
  for (const col of COLS) {
    if (s[col] !== undefined) { updates.push(`${col} = ?`); values.push(s[col]); }
  }
  if (updates.length === 0) return res.json({ success: true, changed: 0 });
  values.push(current.id);
  db.prepare(`UPDATE campaign_settings SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  res.json({ success: true, changed: updates.length });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
