import { useEffect, useState } from 'react';
import { BarChart2, Globe, Activity } from 'lucide-react';
import { colors, cardStyle, stageColors, stageLabels } from '../../theme';

const API = 'http://localhost:3001/api';

interface Data {
  stages:    { stage: string; count: number }[];
  sectors:   { sector: string; count: number }[];
  countries: { country: string; count: number }[];
  daily:     { day: string; count: number }[];
}

const BarRow = ({ label, count, max, color }: { label: string; count: number; max: number; color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 60px', alignItems: 'center', gap: 12, padding: '8px 0' }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMain, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
    <div style={{ height: 10, background: '#f3f4f6', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${max ? (count / max) * 100 : 0}%`, background: color, borderRadius: 8, transition: 'width 0.4s' }} />
    </div>
    <div style={{ fontSize: 12, fontWeight: 800, color: colors.textDim, textAlign: 'right' }}>{count.toLocaleString()}</div>
  </div>
);

const PANEL_TITLE: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 800, color: colors.textMain, letterSpacing: '-0.3px', marginBottom: 18 };

export default function Analytics() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const load = () => fetch(`${API}/analytics`).then((r) => r.json()).then(setData).catch(() => {});
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  const sectorMax  = Math.max(1, ...(data?.sectors  || []).map((s) => s.count));
  const countryMax = Math.max(1, ...(data?.countries || []).map((s) => s.count));

  // Funnel order
  const funnelOrder = ['READY', 'PROFILING', 'JUDGING', 'HUNTING', 'DRAFTING', 'COMPLETED'];
  const funnel = funnelOrder.map((s) => ({ stage: s, count: data?.stages.find((x) => x.stage === s)?.count || 0 }));
  const funnelMax = Math.max(1, ...funnel.map((f) => f.count));

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1.5px' }}>Analytics</h1>
        <p style={{ color: colors.textDim, margin: 0, fontSize: 15, fontWeight: 500 }}>Pipeline health & global distribution.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        <div style={cardStyle}>
          <div style={PANEL_TITLE}><Activity size={16} color={colors.primary} /> Pipeline Funnel</div>
          {funnel.map((f) => (
            <BarRow
              key={f.stage}
              label={stageLabels[f.stage] || f.stage}
              count={f.count}
              max={funnelMax}
              color={stageColors[f.stage]?.text || colors.primary}
            />
          ))}
        </div>

        <div style={cardStyle}>
          <div style={PANEL_TITLE}><BarChart2 size={16} color={colors.primary} /> Sector Breakdown</div>
          {(data?.sectors || []).map((s) => (
            <BarRow key={s.sector} label={s.sector} count={s.count} max={sectorMax} color={colors.purple} />
          ))}
          {(!data || data.sectors.length === 0) && <div style={{ color: colors.textMuted, fontSize: 13 }}>No data yet.</div>}
        </div>

        <div style={cardStyle}>
          <div style={PANEL_TITLE}><Globe size={16} color={colors.primary} /> Country Distribution</div>
          {(data?.countries || []).map((s) => (
            <BarRow key={s.country} label={s.country} count={s.count} max={countryMax} color={colors.primary} />
          ))}
          {(!data || data.countries.length === 0) && <div style={{ color: colors.textMuted, fontSize: 13 }}>No data yet.</div>}
        </div>

        <div style={cardStyle}>
          <div style={PANEL_TITLE}><Activity size={16} color={colors.primary} /> Daily Velocity (14 days)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180, paddingTop: 20 }}>
            {(data?.daily || []).map((d) => {
              const max = Math.max(1, ...(data?.daily || []).map((x) => x.count));
              const h = (d.count / max) * 140;
              return (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: colors.textDim }}>{d.count}</div>
                  <div style={{ width: '100%', height: h, background: colors.primary, borderRadius: 4, opacity: 0.85 }} />
                  <div style={{ fontSize: 9, color: colors.textMuted, fontWeight: 600 }}>{d.day.slice(5)}</div>
                </div>
              );
            })}
            {(!data || data.daily.length === 0) && <div style={{ color: colors.textMuted, fontSize: 13, alignSelf: 'center', width: '100%', textAlign: 'center' }}>No data yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
