import { useEffect, useRef } from 'react';
import { colors, agentColor } from '../theme';

export interface LogEntry {
  id?: number;
  agent: string;
  message: string;
  type: string;
  timestamp: string;
}

interface Props {
  logs: LogEntry[];
  height?: number;
}

export default function IntelligenceStream({ logs, height = 340 }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [logs.length]);

  return (
    <div
      style={{
        background: '#f8f9fa',
        borderRadius: 16,
        padding: 20,
        height,
        overflowY: 'auto',
        fontFamily: "'IBM Plex Mono', 'Menlo', 'Consolas', monospace",
        fontSize: 12,
        border: `1px solid ${colors.border}`,
      }}
    >
      {logs.length === 0 && (
        <div style={{ color: colors.textMuted, padding: 40, textAlign: 'center', fontWeight: 500 }}>
          No logs yet. Activate the engine to begin discovery.
        </div>
      )}
      {logs.map((l, i) => {
        const t = (l.type || 'INFO').toUpperCase();
        const messageColor =
          t === 'ERROR'   ? colors.red    :
          t === 'WARNING' ? colors.orange :
          t === 'SUCCESS' ? colors.green  :
          colors.textMain;
        const time = (l.timestamp || '').slice(11, 19) || new Date().toLocaleTimeString();
        return (
          <div key={l.id ?? i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: colors.textMuted, whiteSpace: 'nowrap', fontWeight: 500, minWidth: 64 }}>{time}</span>
            <span style={{ color: agentColor(l.agent), fontWeight: 700, minWidth: 80 }}>[{(l.agent || 'SYSTEM').toUpperCase()}]</span>
            <span style={{ color: messageColor, lineHeight: 1.5, fontWeight: t === 'SUCCESS' || t === 'ERROR' ? 600 : 400, flex: 1 }}>
              {l.message}
            </span>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
