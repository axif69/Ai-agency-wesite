import { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { colors, cardStyle, inputStyle, btnStyle, labelStyle } from '../../theme';

const API = 'http://localhost:3001/api';

export default function BulkImport() {
  const [text, setText] = useState('');
  const [country, setCountry] = useState('Global');
  const [sector, setSector] = useState('IMPORTED');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ added: number; requested: number } | null>(null);

  const handleImport = async () => {
    const domains = text.split(/[\n,;\s]+/).map((s) => s.trim()).filter(Boolean);
    if (domains.length === 0) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch(`${API}/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains, country, sector }),
      });
      const data = await res.json();
      setResult({ added: data.added || 0, requested: data.requested || 0 });
      setText('');
    } catch {
      setResult({ added: 0, requested: 0 });
    }
    setBusy(false);
  };

  return (
    <div style={{ width: '100%', maxWidth: 980 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1.5px' }}>Bulk Import</h1>
        <p style={{ color: colors.textDim, margin: 0, fontSize: 15, fontWeight: 500 }}>
          Paste a list of company domains — Scout will queue them for profiling.
        </p>
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>Domains (one per line, or comma-separated)</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'lockheedmartin.com\nrtx.com\nbaesystems.com'}
          style={{ ...inputStyle, minHeight: 220, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, lineHeight: 1.6 }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
          <div>
            <label style={labelStyle}>Country Tag</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Sector Label</label>
            <input value={sector} onChange={(e) => setSector(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: colors.textDim, fontSize: 12, fontWeight: 600 }}>
            {text.split(/[\n,;\s]+/).filter(Boolean).length} domain(s) ready
          </span>
          <button onClick={handleImport} disabled={busy || !text.trim()} style={{ ...btnStyle(colors.primary), opacity: busy || !text.trim() ? 0.5 : 1 }}>
            <UploadCloud size={16} /> {busy ? 'Importing…' : 'Queue for Scout'}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: 20, padding: 16, background: colors.greenLight, borderRadius: 12, color: colors.green, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} /> Added {result.added} of {result.requested} domains to the pipeline.
          </div>
        )}
      </div>
    </div>
  );
}
