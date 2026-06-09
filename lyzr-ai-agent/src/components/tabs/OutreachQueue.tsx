import { useState } from 'react';
import { Mail, Send, Copy, Check } from 'lucide-react';
import { colors, cardStyle, btnStyle } from '../../theme';
import type { Lead } from '../LeadsTable';

const API = 'http://localhost:3001/api';

interface Props {
  leads: Lead[];
  dailyCap?: number;
}

export default function OutreachQueue({ leads, dailyCap = 500 }: Props) {
  const [sending, setSending] = useState<number | null>(null);
  const [sentIds, setSentIds] = useState<Set<number>>(new Set());
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const verified = leads.filter((l) => l.status === 'COMPLETED' && l.verified_email);

  const send = async (leadId: number) => {
    setSending(leadId);
    try {
      const res = await fetch(`${API}/outreach/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });
      const data = await res.json();
      if (data.success) setSentIds((s) => new Set(s).add(leadId));
      else alert(data.error || 'Send failed');
    } catch (e: any) {
      alert(e.message);
    }
    setSending(null);
  };

  const copy = (leadId: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(leadId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div style={{ width: '100%', maxWidth: 1200 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1.5px' }}>Outreach Queue</h1>
          <p style={{ color: colors.textDim, margin: 0, fontSize: 15, fontWeight: 500 }}>
            {verified.length} verified leads ready · {sentIds.size} sent today · daily cap {dailyCap}
          </p>
        </div>
      </div>

      {verified.length === 0 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: 60, color: colors.textDim }}>
          <Mail size={28} style={{ marginBottom: 12, opacity: 0.5 }} />
          <div style={{ fontWeight: 600 }}>No verified leads in queue.</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Wait for the Hunter and Ghostwriter to complete the pipeline.</div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 20 }}>
        {verified.map((lead) => {
          const sent = sentIds.has(lead.id);
          return (
            <div key={lead.id} style={{ ...cardStyle, padding: 24, marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: colors.textMain }}>{lead.company_name}</div>
                  <div style={{ fontSize: 12, color: colors.primary, fontWeight: 600 }}>{lead.contact_name} · {lead.top_designation}</div>
                  <div style={{ fontSize: 11, color: colors.textDim, marginTop: 4 }}>{lead.verified_email}</div>
                </div>
                {sent && <span style={{ background: colors.greenLight, color: colors.green, padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800 }}>SENT</span>}
              </div>
              <div style={{ background: '#f9fafb', border: `1px solid ${colors.border}`, borderRadius: 12, padding: 14, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, lineHeight: 1.6, color: colors.textMain, maxHeight: 180, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                {lead.pitch_draft || '— No pitch drafted yet —'}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button onClick={() => copy(lead.id, lead.pitch_draft || '')} style={{ ...btnStyle(colors.bg, colors.textMain), border: `1px solid ${colors.border}`, padding: '8px 14px', fontSize: 12 }}>
                  {copiedId === lead.id ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
                <button onClick={() => send(lead.id)} disabled={sent || sending === lead.id} style={{ ...btnStyle(sent ? colors.greenLight : colors.primary, sent ? colors.green : '#fff'), padding: '8px 14px', fontSize: 12, marginLeft: 'auto', opacity: sending === lead.id ? 0.5 : 1 }}>
                  <Send size={12} /> {sending === lead.id ? 'Sending…' : sent ? 'Sent' : 'Send via SMTP'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
