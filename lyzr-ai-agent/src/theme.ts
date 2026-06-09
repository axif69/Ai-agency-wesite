import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// GM Events Sniper — Design Tokens (1:1 parity with GM Events agent Dashboard)
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  bg: '#f5f5f8',
  sidebar: '#f5f5f8',
  sidebarActiveBg: '#e5f0fa',
  sidebarActiveText: '#0066cc',
  card: '#ffffff',
  border: '#eef0f5',
  primary: '#0071e3',
  primaryLight: '#e8f2fc',
  green: '#34c759',
  greenLight: '#eafff0',
  red: '#ff3b30',
  redLight: '#ffebe9',
  orange: '#ff9500',
  orangeLight: '#fff4e5',
  purple: '#af52de',
  purpleLight: '#f3e8ff',
  gold: '#d4af37',
  goldLight: '#fdf6d3',
  textMain: '#111827',
  textDim: '#6b7280',
  textMuted: '#9ca3af',
};

export const baseStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  background: colors.bg,
  color: colors.textMain,
  minHeight: '100vh',
  display: 'flex',
};

export const cardStyle: React.CSSProperties = {
  background: colors.card,
  borderRadius: 20,
  padding: 32,
  boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
  marginBottom: 24,
  border: `1px solid ${colors.border}`,
};

export const inputStyle: React.CSSProperties = {
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: '12px 16px',
  color: colors.textMain,
  fontSize: 14,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit',
};

export const btnStyle = (bg: string, color: string = '#fff'): React.CSSProperties => ({
  background: bg,
  color,
  border: 'none',
  borderRadius: 12,
  padding: '12px 24px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: 13,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  transition: 'transform 0.1s, opacity 0.2s',
  letterSpacing: '0.3px',
  fontFamily: 'inherit',
});

export const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 800,
  color: colors.textDim,
  letterSpacing: 1,
  marginBottom: 8,
  textTransform: 'uppercase',
};

export const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  background: bg,
  color,
  padding: '4px 10px',
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
});

// ── Stage pill colors/labels ────────────────────────────────────────────────
export const stageColors: Record<string, { bg: string; text: string }> = {
  READY:          { bg: colors.bg,           text: colors.textDim },
  PROFILING:      { bg: colors.primaryLight, text: colors.primary },
  PROFILE_FAILED: { bg: colors.redLight,     text: colors.red },
  JUDGING:        { bg: colors.purpleLight,  text: colors.purple },
  HUNTING:        { bg: colors.goldLight,    text: colors.gold },
  HUNT_FAILED:    { bg: colors.redLight,     text: colors.red },
  DRAFTING:       { bg: colors.orangeLight,  text: colors.orange },
  WRITING:        { bg: colors.orangeLight,  text: colors.orange },
  COMPLETED:      { bg: colors.greenLight,   text: colors.green },
  REJECTED:       { bg: colors.redLight,     text: colors.red },
};

export const stageLabels: Record<string, string> = {
  READY:          'Ready',
  PROFILING:      'Profiling',
  PROFILE_FAILED: 'Profile Failed',
  JUDGING:        'Judging',
  HUNTING:        'Hunting',
  HUNT_FAILED:    'Hunt Failed',
  DRAFTING:       'Drafting',
  WRITING:        'Writing',
  COMPLETED:      'Completed',
  REJECTED:       'Rejected',
};

// ── Per-agent color map for Intelligence Stream ─────────────────────────────
export const agentColor = (agent: string): string => {
  const map: Record<string, string> = {
    SCOUT:    colors.primary,
    HUNTER:   colors.gold,
    PROFILER: colors.purple,
    JUDGE:    colors.purple,
    WRITER:   '#af52de',
    SYSTEM:   colors.green,
  };
  return map[agent?.toUpperCase()] || colors.textMain;
};

export const pulseKeyframes = `
  @keyframes pulse-opacity {
    0%   { opacity: 1; transform: scale(1); }
    50%  { opacity: 0.4; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  .pulse-dot { animation: pulse-opacity 2s infinite ease-in-out; }
`;
