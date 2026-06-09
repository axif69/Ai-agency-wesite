import { useEffect, useState } from 'react';
import {
  Building2, Key, Mail, Target, Sliders, FileUp, Zap, Save, Trash2,
  PlayCircle, Activity, Eye, EyeOff, Send, Sparkles,
} from 'lucide-react';
import { colors, cardStyle, inputStyle, btnStyle, labelStyle } from '../../theme';

const API = 'http://localhost:3001/api';

interface Props {
  campaign: any;
  onChanged: () => void;
  onRefreshLeads?: () => void;
}

interface AgentHealth { agent: string; last_seen: string; status: string; seconds_ago: number; }

const Section: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode }> = ({ icon, title, subtitle, children }) => (
  <section style={{ ...cardStyle, padding: 28 }}>
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 800, color: colors.textMain, letterSpacing: '-0.3px' }}>
        {icon} {title}
      </div>
      {subtitle && <div style={{ fontSize: 12, color: colors.textDim, marginTop: 6, fontWeight: 500 }}>{subtitle}</div>}
    </div>
    {children}
  </section>
);

const Field: React.FC<{ label: string; children: React.ReactNode; col?: number }> = ({ label, children, col = 1 }) => (
  <div style={{ gridColumn: `span ${col}` }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

function PasswordInput({ name, value, onChange, placeholder }: { name: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <input
        name={name}
        type={show ? 'text' : 'password'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, paddingRight: 42, fontFamily: "'IBM Plex Mono', monospace" }}
      />
      <button type="button" onClick={() => setShow((s) => !s)} style={{ position: 'absolute', right: 10, top: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: colors.textDim }}>
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export default function ControlCenter({ campaign, onChanged, onRefreshLeads }: Props) {
  const [form, setForm] = useState<any>(campaign || {});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: 'ok' | 'err' } | null>(null);
  const [health, setHealth] = useState<AgentHealth[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load campaign data on mount, but don't reload after user edits
  useEffect(() => {
    if (campaign && !hasLoaded) {
      setForm(campaign);
      setHasLoaded(true);
    }
  }, [campaign, hasLoaded]);
  useEffect(() => {
    const load = () => fetch(`${API}/health`).then((r) => r.json()).then((d) => setHealth(d.agents || [])).catch(() => {});
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setToast({ msg: data.success ? 'Settings deployed' : 'Save failed', kind: data.success ? 'ok' : 'err' });
      if (data.success) onChanged();
    } catch (e: any) {
      setToast({ msg: e.message, kind: 'err' });
    }
    setSaving(false);
  };

  const trigger = async (stage: string) => {
    await fetch(`${API}/trigger/${stage}`, { method: 'POST' });
    setToast({ msg: `${stage.toUpperCase()} triggered`, kind: 'ok' });
  };

  const purge = async () => {
    if (!confirm('Purge all leads + logs? This cannot be undone.')) return;
    await fetch(`${API}/purge`, { method: 'POST' });
    setToast({ msg: 'Database purged', kind: 'ok' });
    onChanged();
    onRefreshLeads?.();
  };

  const cleanup = async () => {
    if (!confirm('Run junk cleanup? This deletes leads matching banned domains, freemail hosts, and orphaned REJECTED rows.')) return;
    try {
      const res  = await fetch(`${API}/cleanup`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: `Cleanup deleted ${data.deleted} junk leads`, kind: 'ok' });
        onChanged();
      } else {
        setToast({ msg: data.error || 'Cleanup failed', kind: 'err' });
      }
    } catch (e: any) {
      setToast({ msg: e.message, kind: 'err' });
    }
  };

  const testSmtp = async () => {
    const res = await fetch(`${API}/test-smtp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host: form.smtp_host, port: form.smtp_port, user: form.smtp_user, pass: form.smtp_pass }),
    });
    const data = await res.json();
    setToast({ msg: data.success ? 'SMTP OK' : (data.error || 'SMTP failed'), kind: data.success ? 'ok' : 'err' });
  };

  const agencyId = (form.agency_name || 'gm-events').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const designations = (form.target_designations || '').split(',').map((s: string) => s.trim()).filter(Boolean);

  return (
    <div style={{ width: '100%', maxWidth: 1200, paddingBottom: 80 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1.5px' }}>Control Center</h1>
          <p style={{ color: colors.textDim, margin: 0, fontSize: 15, fontWeight: 500 }}>System configuration · Agent triggers · SMTP · Purge.</p>
        </div>
        <button onClick={save} disabled={saving} style={{ ...btnStyle(colors.primary), padding: '14px 24px', fontSize: 13, opacity: saving ? 0.6 : 1 }}>
          <Save size={16} /> {saving ? 'Deploying…' : 'Deploy Settings'}
        </button>
      </div>

      {/* 1. Agency Identity + Active Campaign */}
      <Section icon={<Building2 size={18} color={colors.primary} />} title="Agency Identity & Active Campaign">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <Field label="Agency ID (auto)">
            <input value={agencyId} disabled style={{ ...inputStyle, background: '#f3f4f6', color: colors.textDim, fontFamily: "'IBM Plex Mono', monospace" }} />
          </Field>
          <Field label="Agency Name">
            <input value={form.agency_name || ''} onChange={(e) => set('agency_name', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Primary Representative">
            <input value={form.agency_rep || ''} onChange={(e) => set('agency_rep', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Agency Website">
            <input value={form.agency_website || ''} onChange={(e) => set('agency_website', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Contact Phone">
            <input value={form.agency_phone || ''} onChange={(e) => set('agency_phone', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Location">
            <input value={form.agency_location || ''} onChange={(e) => set('agency_location', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Active Campaign Name" col={2}>
            <input value={form.campaign_name || ''} onChange={(e) => set('campaign_name', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Campaign Strategy" col={2}>
            <textarea value={form.campaign_strategy || ''} onChange={(e) => set('campaign_strategy', e.target.value)} style={{ ...inputStyle, minHeight: 100 }} />
          </Field>
        </div>
      </Section>

      {/* 2. AI Provider Keys */}
      <Section icon={<Key size={18} color={colors.primary} />} title="AI Provider Keys">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <Field label="OpenAI Key">
            <PasswordInput name="openai_key" value={form.openai_key || ''} onChange={(v) => set('openai_key', v)} placeholder="sk-…" />
          </Field>
          <Field label="Anthropic Key">
            <PasswordInput name="anthropic_key" value={form.anthropic_key || ''} onChange={(v) => set('anthropic_key', v)} placeholder="sk-ant-…" />
          </Field>
          <Field label="Google Key">
            <PasswordInput name="google_key" value={form.google_key || ''} onChange={(v) => set('google_key', v)} placeholder="AIza…" />
          </Field>
          <Field label="Apollo Key">
            <PasswordInput name="apollo_key" value={form.apollo_key || ''} onChange={(v) => set('apollo_key', v)} placeholder="apollo…" />
          </Field>
          <Field label="OpenRouter Key">
            <PasswordInput name="openrouter_key" value={form.openrouter_key || ''} onChange={(v) => set('openrouter_key', v)} placeholder="sk-or-…" />
          </Field>
          <Field label="OpenRouter Model">
            <select value={form.openrouter_model || 'google/gemma-7b-it:free'} onChange={(e) => set('openrouter_model', e.target.value)} style={inputStyle}>
              <option value="google/gemma-7b-it:free">Gemma 7B (Free)</option>
              <option value="meta-llama/llama-3.1-8b-instruct:free">Llama 3.1 8B (Free)</option>
              <option value="openai/gpt-4o">GPT-4o (Premium)</option>
              <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet (Premium)</option>
            </select>
          </Field>
          <Field label="OpenRouter Base URL" col={2}>
            <input value={form.openrouter_base_url || ''} onChange={(e) => set('openrouter_base_url', e.target.value)} style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }} placeholder="https://openrouter.ai/api/v1" />
          </Field>
        </div>
      </Section>

      {/* 3. Target Designations */}
      <Section icon={<Target size={18} color={colors.primary} />} title="Target Designations" subtitle="Hunter prioritizes Top-6 titles + Global/EMEA boost.">
        <textarea
          value={form.target_designations || ''}
          onChange={(e) => set('target_designations', e.target.value)}
          style={{ ...inputStyle, minHeight: 70, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}
          placeholder="CEO, MD, Head of Marketing, Head of Sales, Export Manager, Business Development"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {designations.map((d: string, i: number) => (
            <span key={i} style={{ background: colors.primaryLight, color: colors.primary, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{d}</span>
          ))}
        </div>
      </Section>

      {/* 4. Strategic Filters */}
      <Section icon={<Sliders size={18} color={colors.primary} />} title="Strategic Filters">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <Field label="Niche Keywords" col={2}>
            <textarea value={form.niche_keywords || ''} onChange={(e) => set('niche_keywords', e.target.value)} style={{ ...inputStyle, minHeight: 60, fontFamily: "'IBM Plex Mono', monospace" }} />
          </Field>
          <Field label="Negative Keywords (auto-reject if found in scraped content)" col={2}>
            <textarea value={form.negative_keywords || ''} onChange={(e) => set('negative_keywords', e.target.value)} style={{ ...inputStyle, minHeight: 60, fontFamily: "'IBM Plex Mono', monospace" }} placeholder="hobbyist, toy, retail, gambling, adult" />
          </Field>
          <Field label="Banned Domains (hard-blocked at Scout pre-sniff)" col={2}>
            <textarea value={form.banned_domains || ''} onChange={(e) => set('banned_domains', e.target.value)} style={{ ...inputStyle, minHeight: 60, fontFamily: "'IBM Plex Mono', monospace" }} placeholder="hotmail.com, outlook.com, wetransfer.com, amazon.com" />
          </Field>
          <Field label="Target Countries">
            <input value={form.target_countries || ''} onChange={(e) => set('target_countries', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Sector Pillars">
            <input value={form.sector_pillars || ''} onChange={(e) => set('sector_pillars', e.target.value)} style={inputStyle} />
          </Field>
        </div>
      </Section>

      {/* 5. SMTP & Outreach */}
      <Section icon={<Mail size={18} color={colors.primary} />} title="SMTP & Outreach Engine">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <Field label="SMTP Host">
            <input value={form.smtp_host || ''} onChange={(e) => set('smtp_host', e.target.value)} style={inputStyle} placeholder="smtp.gmail.com" />
          </Field>
          <Field label="Port">
            <input value={form.smtp_port || ''} onChange={(e) => set('smtp_port', e.target.value)} style={inputStyle} placeholder="587" />
          </Field>
          <Field label="User / Email">
            <input value={form.smtp_user || ''} onChange={(e) => set('smtp_user', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Password / App Token">
            <PasswordInput name="smtp_pass" value={form.smtp_pass || ''} onChange={(v) => set('smtp_pass', v)} />
          </Field>
          <Field label="Daily Send Cap">
            <input type="number" value={form.daily_send_cap || 500} onChange={(e) => set('daily_send_cap', parseInt(e.target.value || '0', 10))} style={inputStyle} />
          </Field>
          <Field label="Creativity (0–1)">
            <input type="number" step="0.1" min="0" max="1" value={form.creativity_threshold || 0.7} onChange={(e) => set('creativity_threshold', parseFloat(e.target.value))} style={inputStyle} />
          </Field>
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={testSmtp} type="button" style={{ ...btnStyle(colors.bg, colors.primary), border: `1px solid ${colors.border}`, padding: '10px 16px', fontSize: 12 }}>
            <Send size={12} /> Test SMTP Connection
          </button>
        </div>
      </Section>

      {/* 6. Brochure */}
      <Section icon={<FileUp size={18} color={colors.primary} />} title="Brochure Knowledge Base">
        <BrochureUpload onUploaded={onChanged} brochurePath={form.brochure_path} brochureContent={form.brochure_content} />
      </Section>

      {/* 7. Manual Stage Triggers */}
      <Section icon={<PlayCircle size={18} color={colors.primary} />} title="Manual Stage Triggers" subtitle="Force a single agent cycle now (bypasses normal cadence).">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {(['scout', 'profiler', 'hunter', 'writer'] as const).map((s) => (
            <button key={s} onClick={() => trigger(s)} style={{ ...btnStyle(colors.primaryLight, colors.primary), justifyContent: 'center', padding: 14, fontSize: 12 }}>
              <Zap size={14} fill="currentColor" /> {s.toUpperCase()}
            </button>
          ))}
        </div>
      </Section>

      {/* 8. System Health */}
      <Section icon={<Activity size={18} color={colors.primary} />} title="System Health" subtitle="Last heartbeat from each agent process.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {(['SCOUT', 'PROFILER', 'HUNTER', 'WRITER', 'ORCHESTRATOR'] as const).map((agent) => {
            const h = health.find((x) => x.agent === agent);
            const ago = h?.seconds_ago ?? 9999;
            const dot = ago < 30 ? colors.green : ago < 120 ? colors.orange : colors.red;
            return (
              <div key={agent} style={{ background: '#f9fafb', borderRadius: 12, padding: 14, border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: dot, boxShadow: `0 0 6px ${dot}` }} />
                  <span style={{ fontWeight: 800, fontSize: 12, color: colors.textMain, letterSpacing: 0.5 }}>{agent}</span>
                </div>
                <div style={{ fontSize: 10, color: colors.textDim, fontWeight: 600 }}>
                  {h ? `${Math.round(ago)}s ago · ${h.status}` : 'Offline'}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 9. Danger zone */}
      <Section icon={<Trash2 size={18} color={colors.red} />} title="Maintenance & Danger Zone" subtitle="Junk Cleanup is non-destructive (only removes blocked-domain leads). Purge wipes everything.">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={cleanup} style={{ ...btnStyle(colors.primaryLight, colors.primary), padding: '12px 20px' }}>
            <Sparkles size={14} /> Run Junk Cleanup
          </button>
          <button onClick={purge} style={{ ...btnStyle(colors.redLight, colors.red), padding: '12px 20px' }}>
            <Trash2 size={14} /> Purge Database (Leads + Logs)
          </button>
        </div>
      </Section>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 100,
          background: toast.kind === 'ok' ? colors.green : colors.red, color: '#fff',
          padding: '14px 22px', borderRadius: 12, fontWeight: 700, fontSize: 13,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function BrochureUpload({ onUploaded, brochurePath, brochureContent }: { onUploaded: () => void; brochurePath?: string; brochureContent?: string }) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('brochure', file);
      await fetch(`${API}/upload`, { method: 'POST', body: fd });
      onUploaded();
    } catch {}
    setUploading(false);
  };
  return (
    <div>
      <label style={{ display: 'block', border: `2px dashed ${colors.border}`, borderRadius: 16, padding: 28, textAlign: 'center', cursor: 'pointer', background: '#f9fafb' }}>
        <input type="file" accept=".pdf" onChange={handleFile} style={{ display: 'none' }} />
        <FileUp size={24} color={colors.primary} style={{ marginBottom: 8 }} />
        <div style={{ fontWeight: 700, color: colors.textMain, fontSize: 13 }}>{uploading ? 'Uploading…' : 'Click to upload company brochure (PDF)'}</div>
        {brochurePath && <div style={{ fontSize: 11, color: colors.green, fontWeight: 700, marginTop: 6 }}>✓ {brochurePath.split(/[\\/]/).pop()}</div>}
      </label>
      {brochureContent && (
        <div style={{ marginTop: 14, padding: 14, background: '#fff', border: `1px solid ${colors.border}`, borderRadius: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: colors.textDim, letterSpacing: 1, marginBottom: 6 }}>KNOWLEDGE INGESTED</div>
          <div style={{ fontSize: 11, color: colors.textMain, lineHeight: 1.6, maxHeight: 100, overflowY: 'auto', fontFamily: "'IBM Plex Mono', monospace" }}>
            {brochureContent.slice(0, 600)}{brochureContent.length > 600 ? '…' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
