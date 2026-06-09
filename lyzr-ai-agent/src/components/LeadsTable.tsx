import { useMemo } from 'react';
import { Search, CheckCircle2, Trash2, ExternalLink } from 'lucide-react';
import { colors, cardStyle, inputStyle, btnStyle, stageColors, stageLabels } from '../theme';

export interface Lead {
  id: number;
  company_name: string;
  website: string;
  country?: string;
  sector?: string;
  status: string;
  contact_name?: string;
  top_designation?: string;
  verified_email?: string;
  verified_mobile?: string;
  contact_linkedin?: string;
  pitch_draft?: string;
  last_updated?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
  onSearch: (v: string) => void;
  onPage: (p: number) => void;
  selectable?: boolean;
  selected?: Set<number>;
  onToggle?: (id: number) => void;
  onDeleteSelected?: () => void;
  rightActions?: React.ReactNode;
}

export default function LeadsTable({
  title, subtitle, leads, total, page, pageSize, search, onSearch, onPage,
  selectable, selected, onToggle, onDeleteSelected, rightActions,
}: Props) {
  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  return (
    <div style={{ width: '100%', maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, gap: 24, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1.5px', color: colors.textMain }}>{title}</h1>
          {subtitle && <p style={{ color: colors.textDim, margin: 0, fontSize: 15, fontWeight: 500 }}>{subtitle}</p>}
        </div>
        <div style={{ flex: 1, minWidth: 280, maxWidth: 440, position: 'relative' }}>
          <Search size={18} color={colors.primary} style={{ position: 'absolute', left: 14, top: 14 }} />
          <input
            placeholder="Search company, domain, contact, email…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 42 }}
          />
        </div>
        {rightActions}
      </div>

      {/* Bulk actions bar */}
      {selectable && selected && selected.size > 0 && (
        <div style={{ ...cardStyle, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: colors.textDim, fontSize: 14, fontWeight: 600 }}>{selected.size} selected</span>
          <button onClick={onDeleteSelected} style={{ ...btnStyle(colors.redLight, colors.red), padding: '8px 16px' }}>
            <Trash2 size={14} /> Delete Selected
          </button>
        </div>
      )}

      {/* Table */}
      <div style={cardStyle}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
            <thead>
              <tr>
                {selectable && <th style={th}>{}</th>}
                <th style={th}>COMPANY ENTITY</th>
                <th style={th}>CONTACT</th>
                <th style={th}>EMAIL</th>
                <th style={th}>PHONE</th>
                <th style={th}>LOCATION / SECTOR</th>
                <th style={th}>STATE</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((c) => {
                const stage = stageColors[c.status] || { bg: '#f3f4f6', text: '#9ca3af' };
                return (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${colors.bg}` }}>
                    {selectable && (
                      <td style={td}>
                        <input
                          type="checkbox"
                          checked={selected?.has(c.id) || false}
                          onChange={() => onToggle?.(c.id)}
                          style={{ width: 16, height: 16, cursor: 'pointer' }}
                        />
                      </td>
                    )}
                    <td style={td}>
                      <div style={{ fontWeight: 700, color: colors.textMain, fontSize: 15, marginBottom: 4 }}>{c.company_name}</div>
                      {c.website ? (
                        <a href={c.website} target="_blank" rel="noreferrer" style={{ color: colors.primary, fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                          <ExternalLink size={11} /> {c.website.replace(/^https?:\/\//, '')}
                        </a>
                      ) : <span style={{ color: colors.textMuted, fontSize: 12 }}>—</span>}
                    </td>
                    <td style={td}>
                      {c.contact_name ? (
                        <>
                          <div style={{ fontWeight: 700, color: colors.primary, fontSize: 13 }}>{c.contact_name}</div>
                          <div style={{ color: colors.textDim, fontSize: 11, fontWeight: 600 }}>{c.top_designation || '—'}</div>
                        </>
                      ) : <span style={{ color: colors.textMuted, fontSize: 13 }}>—</span>}
                    </td>
                    <td style={{ ...td, fontSize: 12, fontWeight: 600, color: c.verified_email ? colors.primary : colors.textMuted }}>
                      {c.verified_email || '—'}
                    </td>
                    <td style={{ ...td, fontSize: 12, fontWeight: 600, color: c.verified_mobile && c.verified_mobile !== 'N/A' ? colors.textMain : colors.textMuted }}>
                      {c.verified_mobile && c.verified_mobile !== 'N/A' ? c.verified_mobile : '—'}
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 700, color: colors.primary, fontSize: 13, marginBottom: 2 }}>📍 {c.country || '—'}</div>
                      <div style={{ color: c.sector ? colors.textMain : colors.textMuted, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {c.sector || 'Pending'}
                      </div>
                    </td>
                    <td style={td}>
                      <span style={{
                        background: stage.bg, color: stage.text,
                        padding: '6px 12px', borderRadius: 20,
                        fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}>
                        {c.status === 'COMPLETED' && <CheckCircle2 size={12} />}
                        {stageLabels[c.status] || c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {leads.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: colors.textDim, fontWeight: 500 }}>
              No entities yet. Activate the engine to start discovery.
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > pageSize && (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginTop: 28 }}>
            <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page <= 1} style={{ ...btnStyle(colors.bg, colors.textMain), border: `1px solid ${colors.border}`, opacity: page <= 1 ? 0.4 : 1 }}>← Prev</button>
            <span style={{ padding: '10px 16px', color: colors.textDim, fontSize: 13, fontWeight: 700, background: '#fff', borderRadius: 12, border: `1px solid ${colors.border}` }}>
              Page {page} of {pageCount}
            </span>
            <button onClick={() => onPage(Math.min(pageCount, page + 1))} disabled={page >= pageCount} style={{ ...btnStyle(colors.bg, colors.textMain), border: `1px solid ${colors.border}`, opacity: page >= pageCount ? 0.4 : 1 }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: '14px 12px',
  color: colors.textDim,
  fontWeight: 800,
  fontSize: 11,
  letterSpacing: 1,
  borderBottom: `2px solid ${colors.bg}`,
};
const td: React.CSSProperties = { padding: '18px 12px', verticalAlign: 'top' };
