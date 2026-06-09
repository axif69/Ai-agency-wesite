import { Activity, Send, Download, Zap, Play } from 'lucide-react';
import { colors, cardStyle, btnStyle } from '../../theme';
import IntelligenceStream from '../IntelligenceStream';
import type { LogEntry } from '../IntelligenceStream';

interface Props {
  totalLeads: number;
  verifiedLeads: number;
  logs: LogEntry[];
  onTrigger: (stage: 'scout' | 'profiler' | 'hunter' | 'writer') => void;
  onExportCsv: () => void;
}

const Stat = ({ label, value, icon, accent }: { label: string; value: string | number; icon: React.ReactNode; accent: string }) => (
  <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: colors.textDim, letterSpacing: 1, display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span>
      <span style={{ color: accent }}>{icon}</span>
    </div>
    <div style={{ fontSize: 48, fontWeight: 800, marginTop: 12, color: colors.textMain, letterSpacing: '-1px' }}>
      {typeof value === 'number' ? value.toLocaleString() : value}
    </div>
  </div>
);

export default function Overview({ totalLeads, verifiedLeads, logs, onTrigger, onExportCsv }: Props) {
  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <Stat label="TARGETS RESOLVED" value={totalLeads} icon={<Activity size={16} />} accent={colors.primary} />

        <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.textDim, letterSpacing: 1, display: 'flex', justifyContent: 'space-between' }}>
            READY FOR OUTREACH <Send size={16} color={colors.green} />
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, marginTop: 12, color: colors.textMain, letterSpacing: '-1px' }}>
            {verifiedLeads.toLocaleString()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <div style={{ fontSize: 14, color: colors.textDim, fontWeight: 500 }}>Verified leads with contact</div>
            <button onClick={onExportCsv} style={{ background: colors.greenLight, color: colors.green, border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Download size={12} /> EXPORT CSV
            </button>
          </div>
        </div>

        <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.textDim, letterSpacing: 1 }}>
            COMMAND CENTER
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, marginBottom: 16 }}>
            <div className="pulse-dot" style={{ width: 14, height: 14, borderRadius: '50%', background: colors.green, boxShadow: `0 0 14px ${colors.green}` }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: colors.textMain, letterSpacing: '-0.5px' }}>Engine Running</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {(['scout', 'profiler', 'hunter', 'writer'] as const).map((s) => (
              <button
                key={s}
                onClick={() => onTrigger(s)}
                style={{ ...btnStyle(colors.primaryLight, colors.primary), justifyContent: 'center', padding: '10px 12px', fontSize: 11 }}
              >
                <Play size={12} fill="currentColor" /> {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence Stream */}
      <div style={{ ...cardStyle }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, color: colors.textMain, letterSpacing: '-0.5px' }}>
            <span style={{ color: colors.primary }}>&gt;_</span> Intelligence Stream
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: colors.green, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={12} fill={colors.green} /> LIVE FEED
          </div>
        </div>
        <IntelligenceStream logs={logs} height={380} />
      </div>
    </div>
  );
}
