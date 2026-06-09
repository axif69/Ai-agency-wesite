import {
  LayoutDashboard, Database, Search, FileText, Mail, BarChart2, SlidersHorizontal, Zap,
} from 'lucide-react';
import { colors } from '../theme';

export type TabId =
  | 'overview' | 'database' | 'discovery'
  | 'bulk_import' | 'outreach' | 'analytics' | 'control';

interface Props {
  active: TabId;
  onChange: (id: TabId) => void;
  totalLeads: number;
  verifiedLeads: number;
  agencyName?: string;
  agencyWebsite?: string;
}

const items: Array<{ id: TabId; icon: any; label: string; countKey?: 'totalLeads' | 'verifiedLeads' }> = [
  { id: 'overview',    icon: LayoutDashboard,    label: 'Overview' },
  { id: 'database',    icon: Database,           label: 'Master Database', countKey: 'totalLeads' },
  { id: 'discovery',   icon: Search,             label: 'Verified Leads',  countKey: 'verifiedLeads' },
  { id: 'bulk_import', icon: FileText,           label: 'Bulk Import' },
  { id: 'outreach',    icon: Mail,               label: 'Outreach Queue', countKey: 'verifiedLeads' },
  { id: 'analytics',   icon: BarChart2,          label: 'Analytics' },
  { id: 'control',     icon: SlidersHorizontal,  label: 'Control Center' },
];

export default function Sidebar({ active, onChange, totalLeads, verifiedLeads, agencyName, agencyWebsite }: Props) {
  return (
    <div style={{ width: 280, background: colors.sidebar, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '32px 24px', flex: 1, overflowY: 'auto' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, paddingLeft: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 14px rgba(0,113,227,0.3)' }}>
            <Zap size={22} fill="currentColor" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: colors.textMain, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Asif <span style={{ color: colors.primary }}>Digital</span><br />Agency
            </div>
            <div style={{ fontSize: 9, color: colors.textDim, fontWeight: 700, letterSpacing: 0.8, marginTop: 4 }}>
              SOVEREIGN RESALE V5.1
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            const count = item.countKey === 'totalLeads' ? totalLeads : item.countKey === 'verifiedLeads' ? verifiedLeads : undefined;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 14, border: 'none',
                  background: isActive ? colors.sidebarActiveBg : 'transparent',
                  color: isActive ? colors.sidebarActiveText : colors.textDim,
                  cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  transition: 'all 0.2s ease', textAlign: 'left',
                  fontFamily: 'inherit',
                }}
                onMouseOver={(e) => !isActive && (e.currentTarget.style.background = '#f0f2f5')}
                onMouseOut={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </span>
                {count !== undefined && (
                  <span style={{ background: isActive ? 'transparent' : '#f0f2f5', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: isActive ? colors.sidebarActiveText : colors.textDim }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Identity footer */}
      <div style={{ padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 4px 14px rgba(0,0,0,0.02)', border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 10, color: colors.textDim, fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>
            Active Identity
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: colors.textMain }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.green, boxShadow: `0 0 8px ${colors.green}` }} />
            {agencyName || 'GM Events'}
          </div>
          <div style={{ fontSize: 10, color: colors.primary, marginTop: 4, fontWeight: 500 }}>
            <a href={agencyWebsite || 'https://www.gmevents.ae'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {(agencyWebsite || 'www.gmevents.ae').replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
