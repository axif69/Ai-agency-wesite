import React, { useState, useEffect } from "react";
import { 
  Users, Send, MessageSquare, Activity, 
  LayoutDashboard, Zap, History, Settings, 
  Search, Eye, CheckCircle, RotateCcw,
  ArrowUpRight, Clock, ShieldCheck, Mail,
  Check, X, FileText, BarChart3, Download,
  ExternalLink, Filter, Trash2, Database,
  Cpu, Terminal, HelpCircle, Info, MapPin, Phone,
  ChevronRight, Globe, AlertTriangle, Linkedin,
  TrendingUp, ThumbsUp, ThumbsDown, RefreshCw
} from 'lucide-react';

const API_BASE = "http://localhost:3001/api";
const ACCENT = "#1D9E75";

const GlassCard = ({ children, style = {} }: any) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "1.5rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    ...style
  }}>
    {children}
  </div>
);

const StatusBadge = ({ status, sentiment }: { status: string; sentiment?: string }) => {
    const s = status.toLowerCase();
    let bg = 'rgba(255,255,255,0.05)';
    let color = 'rgba(255,255,255,0.4)';
    let label = status.toUpperCase();

    if (s === 'sent') { bg = ACCENT; color = '#fff'; label = 'DELIVERED ✅'; }
    if (s === 'ready' || s === 'priority_ready' || s === 'queued') { bg = 'rgba(29, 158, 117, 0.1)'; color = ACCENT; label = 'IN QUEUE...'; }
    if (s === 'new') { bg = 'rgba(255,255,255,0.08)'; color = '#fff'; label = 'UNPROCESSED'; }
    if (s === 'no_email') { bg = 'rgba(255, 167, 38, 0.1)'; color = '#FFA726'; label = 'DOMAIN REFUSED'; }
    if (s.includes('error') || s.includes('fail')) { bg = 'rgba(255, 68, 68, 0.1)'; color = '#ff4444'; label = 'SYSTEM ERROR'; }

    const sentimentBadge = () => {
        if (!sentiment) return null;
        const m: any = {
            positive: { bg: 'rgba(29,158,117,0.2)', color: '#1D9E75', label: '🟩 INTERESTED' },
            negative: { bg: 'rgba(255,68,68,0.15)', color: '#ff4444', label: '🟥 NOT INTERESTED' },
            auto_reply: { bg: 'rgba(255,167,38,0.15)', color: '#FFA726', label: '🟧 AUTO-REPLY' },
            neutral: { bg: 'rgba(255,255,255,0.05)', color: '#aaa', label: '⬜ NEUTRAL' },
        };
        const cfg = m[sentiment.toLowerCase()];
        if (!cfg) return null;
        return <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: '0.6rem', fontWeight: 800, background: cfg.bg, color: cfg.color, marginLeft: 6 }}>{cfg.label}</span>;
    };

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: '0.65rem', fontWeight: 800, background: bg, color: color, letterSpacing: 0.5 }}>{label}</span>
            {sentimentBadge()}
        </span>
    );
};

export default function SovereignDashboardV5_1() {
  const [view, setView] = useState("dashboard");
  const [prospects, setProspects] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(false);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [editingEmail, setEditingEmail] = useState<{[id: number]: string}>({});
  const [config, setConfig] = useState({
    model: 'llama-3.3-70b-versatile',
    tone: 'Professional & Bold',
    temperature: 0.7,
    daily_limit: 50
  });

  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: 'Sovereign v13.0 Ground-Truth Engine ONLINE.', type: 'success' }
  ]);

  // Issue 4: Heartbeat state
  const [heartbeat, setHeartbeat] = useState<any>({
    status: 'offline',
    last_action: 'Waiting for worker...',
    emails_sent_today: 0,
    companies_found_today: 0,
    timestamp: null
  });

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000); // Poll every 3s for fast updates
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string, type: 'info' | 'success' | 'err' = 'info') => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, type }, ...prev].slice(0, 50));
  };

  const refreshData = async () => {
    try {
      const pRes = await fetch(`${API_BASE}/leads`);
      if (pRes.ok) setProspects(await pRes.json());
      
      const sRes = await fetch(`${API_BASE}/settings`);
      if (sRes.ok) setConfig(await sRes.json());

      const aRes = await fetch(`${API_BASE}/analytics`);
      if (aRes.ok) setAnalytics(await aRes.json());

      // Live Logs Sync
      const lRes = await fetch(`${API_BASE}/logs`);
      if (lRes.ok) {
          const fetchedLogs = await lRes.json();
          if (fetchedLogs.length > 0) {
              setLogs(fetchedLogs.map((l: any) => ({ time: l.timestamp, msg: l.message, type: l.type })));
          }
      }

      // Issue 4: Heartbeat polling
      const hRes = await fetch(`${API_BASE}/heartbeat`);
      if (hRes.ok) setHeartbeat(await hRes.json());
    } catch (e) { console.error("Sync Error:", e); }
  };

  const saveSettings = async (newConfig: any) => {
    setConfig(newConfig);
    try {
        await fetch(`${API_BASE}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settings: newConfig })
        });
        addLog("⚙️ System Configuration Synchronized.", 'success');
    } catch (e) { addLog("❌ Settings Sync Error.", 'err'); }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return alert("No data to export!");
    // Excel-friendly columns
    const cols = ['company_name','website','email','phone','mobile_number','contact_name','linkedin_url','status','reply_sentiment','category','location','added_at','last_contacted','sent_count'];
    const header = cols.join(',');
    const rows = data.map(obj => cols.map(c => `"${(obj[c] ?? '').toString().replace(/"/g, '""')}"`).join(','));
    const csvString = "\uFEFF" + header + "\n" + rows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addLog(`📊 Exported ${data.length} records to ${filename}`, 'success');
  };

  const clearStaleLeads = async () => {
    try {
      await fetch(`${API_BASE}/leads/clear-stale`, { method: 'POST' });
      addLog('🗑️ Cleared all failed/pending-scan leads.', 'info');
      await refreshData();
    } catch (e) { addLog('❌ Clear stale failed.', 'err'); }
  };

  const updateLeadEmail = async (id: number, email: string) => {
    if (!email.includes('@')) return alert('Please enter a valid email address.');
    try {
      const res = await fetch(`${API_BASE}/leads/${id}/email`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        addLog(`✅ Email updated for lead #${id}: ${email}`, 'success');
        setEditingEmail(prev => { const n = {...prev}; delete n[id]; return n; });
        await refreshData();
      }
    } catch (e: any) { addLog(`❌ Failed to update email: ${e.message}`, 'err'); }
  };

  const handleManualSearch = async () => {
    if (!searchQuery) return;
    setSearching(true);
    addLog(`🔍 Precision Scan Initiated: ${searchQuery}...`, 'info');
    try {
      const res = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await res.json();
      if (data.success) {
        if (data.inserted > 0) {
            addLog(`✅ SUCCESS: Found ${data.count} UAE targets. ${data.inserted} are NEW!`, 'success');
        } else {
            addLog(`⚠️ Found ${data.count} targets, but all ${data.duplicates} were already in your database.`, 'info');
            addLog(`💡 Tip: Try the same search again! The engine will now pick a DIFFERENT page of results for you automatically.`, 'info');
        }
        setSearchQuery("");
        await new Promise(r => setTimeout(r, 1000));
        await refreshData();
      }
    } catch (e: any) { addLog(`❌ Discovery Error: ${e.message}`, 'err'); }
    setSearching(false);
  };

  const handleBulkSend = async () => {
    if (selected.length === 0) return;
    setSending(true);
    addLog(`🤖 Launching AI Outreach sequence for ${selected.length} targets...`, 'info');
    
    // Update local UI immediately
    setProspects(prev => prev.map(p => selected.includes(p.id) ? { ...p, status: 'ready' } : p));
    
    try {
      const res = await fetch(`${API_BASE}/bulk-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected })
      });
      if (res.ok) {
        addLog(`✅ AI ENGINE ENGAGED: Worker is drafting personalized pitches now.`, 'success');
        setSelected([]);
        fetch(`${API_BASE}/worker/run`, { method: 'POST' });
      }
    } catch (e) { addLog(`❌ Launch Error: ${e.message}`, 'err'); }
    setSending(false);
  };

  const clearDatabase = async () => {
    if (window.confirm("⚠️ DANGER: Permanent Wipe?")) {
        try {
            await fetch(`${API_BASE}/leads/clear`, { method: 'POST' });
            addLog("🧹 System Purge Complete.", 'info');
            setProspects([]);
            setView('dashboard');
        } catch (e) { alert(e.message); }
    }
  };

  const sentLeads = prospects.filter(p => p.status === 'sent');
  const discoveryLeads = prospects.filter(p => p.status !== 'sent');

  return (
    <div style={{ minHeight: '100vh', background: '#020202', color: '#fff', display: 'flex', fontFamily: 'Inter, sans-serif', letterSpacing: -0.2 }}>
      {/* Sidebar */}
      <aside style={{ width: 320, borderRight: '1px solid rgba(255,255,255,0.03)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem', background: 'rgba(0,0,0,0.4)', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div style={{ background: ACCENT, padding: 10, borderRadius: 14, boxShadow: `0 0 20px ${ACCENT}33` }}><Zap size={24} fill="white" /></div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: -1 }}>SOVEREIGN<span style={{ color: ACCENT }}>.5</span></div>
            <div style={{ fontSize: '0.6rem', opacity: 0.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>Elite UAE Intelligence</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard size={20} /> },
            { id: 'all', label: 'Master UAE Database', icon: <Database size={20} />, count: prospects.length },
            { id: 'prospects', label: 'Discovery Engine', icon: <Search size={20} />, count: discoveryLeads.length },
            { id: 'bulk', label: 'Bulk GMB Import', icon: <FileText size={20} /> },
            { id: 'sent', label: 'Outreach History', icon: <Send size={20} />, count: sentLeads.length },
            { id: 'analytics', label: 'Analytics Center', icon: <TrendingUp size={20} /> },
            { id: 'settings', label: 'System Configuration', icon: <Settings size={20} /> },
          ].map(item => (
            <div 
              key={item.id} 
              onClick={() => { setView(item.id); setSelected([]); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 15, padding: '16px 22px', borderRadius: 16, cursor: 'pointer',
                background: view === item.id ? 'rgba(29, 158, 117, 0.08)' : 'transparent',
                color: view === item.id ? ACCENT : 'rgba(255,255,255,0.3)',
                transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: view === item.id ? `1px solid ${ACCENT}22` : '1px solid transparent'
              }}
            >
              {item.icon}
              <span style={{ flex: 1, fontWeight: view === item.id ? 800 : 500, fontSize: '0.9rem' }}>{item.label}</span>
              {item.count > 0 && <span style={{ background: view === item.id ? ACCENT : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 20 }}>{item.count}</span>}
            </div>
          ))}
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
            <GlassCard style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
                <div style={{ fontSize: '0.65rem', opacity: 0.3, marginBottom: 12, fontWeight: 900, letterSpacing: 1 }}>SENDER IDENTITY</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: ACCENT }}>
                    <div style={{ width: 8, height: 8, background: ACCENT, borderRadius: '50%' }} />
                    TRI ANGLE ELECT
                </div>
                <div style={{ fontSize: '0.7rem', marginTop: 6, opacity: 0.3 }}>Official Enterprise Channel</div>
            </GlassCard>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '4rem', overflowY: 'auto' }}>
        
        {view === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <GlassCard><div style={{ fontSize: '0.75rem', opacity: 0.3, marginBottom: 12, fontWeight: 800 }}>UAE TARGETS</div><div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{prospects.length}</div></GlassCard>
              <GlassCard><div style={{ fontSize: '0.75rem', opacity: 0.3, marginBottom: 12, fontWeight: 800 }}>ACTIVE EMAILS</div><div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{sentLeads.length}</div></GlassCard>
              <GlassCard><div style={{ fontSize: '0.75rem', opacity: 0.3, marginBottom: 12, fontWeight: 800 }}>PENDING AI</div><div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{discoveryLeads.length}</div></GlassCard>
              <GlassCard><div style={{ fontSize: '0.75rem', opacity: 0.3, marginBottom: 12, fontWeight: 800 }}>DAILY CAPACITY</div><div style={{ fontSize: '2.5rem', fontWeight: 900, color: ACCENT }}>500+</div></GlassCard>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '2rem' }}>
               <GlassCard style={{ maxHeight: '550px', overflowY: 'auto', background: '#000', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <h4 style={{ margin: 0, marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 }}><Terminal size={18} /> Engine Intelligence Stream</span>
                    <button onClick={() => setLogs([])} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '0.7rem' }}>CLEAR STREAM</button>
                 </h4>
                 <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 400, overflowY: 'auto' }}>
                    {logs.map((log: any, i) => (
                        <div key={i} style={{ 
                            fontSize: '0.85rem', 
                            padding: '12px 18px', 
                            borderLeft: i === 0 ? `3px solid ${log.type === 'success' ? '#4ade80' : log.type === 'error' ? '#f87171' : ACCENT}` : '3px solid transparent',
                            background: i === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                            color: log.type === 'success' ? '#4ade80' : log.type === 'error' ? '#f87171' : log.type === 'warning' ? '#fbbf24' : '#e2e8f0',
                            fontFamily: 'JetBrains Mono, monospace',
                            opacity: i === 0 ? 1 : Math.max(0.2, 0.8 - (i * 0.05)),
                            transition: 'all 0.3s ease'
                        }}>
                           <span style={{ opacity: 0.3, marginRight: 15, fontSize: '0.7rem' }}>[{log.time}]</span>
                           {log.msg}
                        </div>
                    ))}
                  </div>
               </GlassCard>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Issue 4: Real Heartbeat Status */}
                    <GlassCard style={{ border: `1px solid ${heartbeat.status === 'running' ? ACCENT + '33' : '#ff444433'}`, background: heartbeat.status === 'running' ? 'rgba(29, 158, 117, 0.03)' : 'rgba(255, 68, 68, 0.03)', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 12, height: 12,
                                background: heartbeat.status === 'running' ? ACCENT : '#ff4444',
                                borderRadius: '50%',
                                animation: heartbeat.status === 'running' ? 'pulse 2s infinite' : 'none',
                                boxShadow: `0 0 12px ${heartbeat.status === 'running' ? ACCENT : '#ff4444'}`
                            }} />
                            <span style={{
                                fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1,
                                color: heartbeat.status === 'running' ? ACCENT : '#ff4444'
                            }}>
                                {heartbeat.status === 'running' ? 'Agent Active' : 'Agent Offline'}
                            </span>
                        </div>
                        {heartbeat.last_action && (
                            <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: 16, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontFamily: 'JetBrains Mono, monospace' }}>
                                {heartbeat.last_action}
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.5 }}>Total Targets in DB</span>
                                <span style={{ color: ACCENT, fontWeight: 900 }}>{prospects.length}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.5 }}>Emails Sent Today</span>
                                <span style={{ fontWeight: 700 }}>{heartbeat.emails_sent_today || 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.5 }}>Companies Found Today</span>
                                <span style={{ fontWeight: 700 }}>{heartbeat.companies_found_today || 0}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.5 }}>Total Emails Sent</span>
                                <span style={{ fontWeight: 700 }}>{sentLeads.length}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.5 }}>Awaiting Outreach</span>
                                <span style={{ fontWeight: 700 }}>{discoveryLeads.length}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => { fetch(`${API_BASE}/worker/run`, { method: 'POST' }); addLog("⚡ Outreach cycle triggered manually.", 'success'); }}
                            style={{ width: '100%', padding: '14px', background: ACCENT, border: 'none', borderRadius: 14, color: '#fff', fontWeight: 900, cursor: 'pointer', marginTop: 16, fontSize: '0.85rem', boxShadow: `0 4px 15px ${ACCENT}44` }}>
                            ⚡ FORCE OUTREACH NOW
                        </button>
                    </GlassCard>

                    <GlassCard>
                        <h4 style={{ margin: 0, marginBottom: '1.5rem', opacity: 0.4, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}>Engine Health</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.4 }}>Discovery</span> <span style={{ color: ACCENT, fontWeight: 800 }}>YP + Bing + DDG ✅</span></div>
                            <div style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.4 }}>AI Personalization</span> <span style={{ color: ACCENT, fontWeight: 800 }}>GROQ AI ✅</span></div>
                            <div style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.4 }}>Email Service</span> <span style={{ color: ACCENT, fontWeight: 800 }}>GMAIL ✅</span></div>
                            <div style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.4 }}>Worker</span> <span style={{ fontWeight: 800, color: heartbeat.status === 'running' ? ACCENT : '#ff4444' }}>{heartbeat.status === 'running' ? 'RUNNING ✅' : 'OFFLINE ❌'}</span></div>
                        </div>
                    </GlassCard>
               </div>
            </div>
          </div>
        )}

        {view === 'all' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, letterSpacing: -2, fontSize: '2.5rem', fontWeight: 900 }}>Master UAE Database</h2>
                <button onClick={() => exportToCSV(prospects, 'uae-prospect-intelligence.csv')} style={{ background: ACCENT, color: '#fff', border: 'none', padding: '14px 30px', borderRadius: 16, fontWeight: 900, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Download size={20} /> EXPORT CSV
                </button>
            </div>
            
            <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.01)' }}>
                        <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                            <th style={{ padding: '1.5rem 2.5rem' }}>Company Entity</th>
                            <th style={{ padding: '1.5rem 1rem' }}>LinkedIn</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Reachability</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Market Data</th>
                            <th style={{ padding: '1.5rem 1.5rem' }}>Current State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prospects.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: '0.2s hover' }}>
                                <td style={{ padding: '2rem 2.5rem' }}>
                                    <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: 4 }}>{p.company_name}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.3, display: 'flex', alignItems: 'center', gap: 6 }}><ExternalLink size={12} /> {p.website}</div>
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {p.linkedin_url ? (
                                        <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontWeight: 800, fontSize: '0.8rem' }}>
                                            <Linkedin size={16} /> PROFILE
                                        </a>
                                    ) : (
                                        <span style={{ opacity: 0.1, fontSize: '0.7rem' }}>NOT FOUND</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {editingEmail[p.id] !== undefined ? (
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                            <input
                                                autoFocus
                                                value={editingEmail[p.id]}
                                                onChange={e => setEditingEmail(prev => ({...prev, [p.id]: e.target.value}))}
                                                onKeyDown={e => { if (e.key === 'Enter') updateLeadEmail(p.id, editingEmail[p.id]); if (e.key === 'Escape') setEditingEmail(prev => { const n={...prev}; delete n[p.id]; return n; }); }}
                                                placeholder="paste@email.ae"
                                                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: `1px solid ${ACCENT}`, color: '#fff', fontSize: '0.8rem', outline: 'none', minWidth: 0 }}
                                            />
                                            <button onClick={() => updateLeadEmail(p.id, editingEmail[p.id])} style={{ padding: '8px 12px', background: ACCENT, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>✓</button>
                                            <button onClick={() => setEditingEmail(prev => { const n={...prev}; delete n[p.id]; return n; })} style={{ padding: '8px 10px', background: 'rgba(255,68,68,0.2)', border: 'none', borderRadius: 8, color: '#ff4444', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>✗</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.email || <span style={{ opacity: 0.2 }}>PENDING AI SCAN</span>}</div>
                                            <button
                                                onClick={() => setEditingEmail(prev => ({...prev, [p.id]: p.email || ''}))}
                                                title="Edit email manually"
                                                style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.7rem', flexShrink: 0 }}
                                            >✏️</button>
                                        </div>
                                    )}
                                    {p.phone && <div style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}><Phone size={10} /> {p.phone}</div>}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.6 }}>
                                        <MapPin size={14} style={{ color: ACCENT }} /> {p.location || 'UAE'}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', opacity: 0.2, marginTop: 4 }}>{p.category || 'General Industry'}</div>
                                </td>
                                <td style={{ padding: '2rem 1.5rem' }}>
                                    <StatusBadge status={p.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>
          </div>
        )}

        {view === 'prospects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <h2 style={{ margin: 0, letterSpacing: -2, fontSize: '2.5rem', fontWeight: 900 }}>Sovereign v7.1 Enterprise Discovery</h2>
             
             {/* Issue 6 Fix: Search bar in own relative container */}
             <div style={{
                 position: 'relative',
                 marginBottom: 16,
                 zIndex: 1,
             }}>
               <div style={{ 
                   display: 'flex', 
                   alignItems: 'stretch',
                   gap: 12, 
                   padding: '1rem', 
                   border: `1px solid ${ACCENT}22`, 
                   background: 'rgba(0,0,0,0.5)',
                   borderRadius: 24,
                   width: '100%',
                   boxSizing: 'border-box'
               }}>
                  <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Search style={{ position: 'absolute', left: 20, opacity: 0.3 }} size={22} />
                      <input 
                          placeholder="Search UAE Industries (e.g. MEP contractors Dubai, fit out companies Sharjah)..." 
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && handleManualSearch()}
                          style={{ 
                              width: '100%', 
                              padding: '18px 20px 18px 60px', 
                              borderRadius: 18, 
                              background: '#0a0a0a', 
                              border: '1px solid rgba(255,255,255,0.05)', 
                              color: '#fff', 
                              fontSize: '1rem', 
                              outline: 'none',
                              boxSizing: 'border-box'
                          }} />
                  </div>
                  <button 
                      onClick={handleManualSearch} 
                      disabled={searching}
                      style={{ 
                          background: ACCENT, 
                          padding: '0 40px', 
                          borderRadius: 18, 
                          color: '#fff', 
                          fontWeight: 900, 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: '1rem',
                          whiteSpace: 'nowrap',
                          transition: '0.2s transform'
                      }}>
                      {searching ? "DISCOVERING..." : "TARGET UAE MARKETS"}
                  </button>
               </div>
             </div>

             {/* Issue 6 Fix: Action buttons in separate row with clear margin */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div>
                    <h4 style={{ margin: 0, opacity: 0.3, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 2 }}>IDENTIFIED TARGETS ({discoveryLeads.length})</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.4, marginTop: 6 }}>Select verified businesses to launch AI-personalized outreach.</p>
                </div>
                <button 
                  onClick={handleBulkSend} 
                  disabled={selected.length === 0 || sending}
                  style={{ background: '#fff', color: '#000', border: 'none', padding: '16px 36px', borderRadius: 18, fontWeight: 900, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 15 }}>
                    {sending ? "Engaging AI..." : `LAUNCH AI OUTREACH (${selected.length})`}
                </button>
             </div>

             <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', background: 'rgba(255,255,255,0.01)' }}>
                            <th style={{ padding: '1.5rem 2.5rem' }}>
                                <input 
                                    type="checkbox" 
                                    style={{ width: 18, height: 18 }}
                                    onChange={() => setSelected(discoveryLeads.length === selected.length ? [] : discoveryLeads.map(l => l.id))} 
                                    checked={selected.length === discoveryLeads.length && discoveryLeads.length > 0} 
                                />
                            </th>
                            <th style={{ padding: '1.5rem 1rem' }}>Verified Entity</th>
                            <th style={{ padding: '1.5rem 1rem' }}>LinkedIn</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Target Domain</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Target Email</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Discovery Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discoveryLeads.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', opacity: 0.2 }}>No pending targets found. Launch a new search above.</td>
                            </tr>
                        )}
                        {discoveryLeads.map(p => {
                            const isSelected = selected.includes(p.id);
                            return (
                                <tr 
                                    key={p.id} 
                                    onClick={() => setSelected(s => s.includes(p.id) ? s.filter(id => id !== p.id) : [...s, p.id])} 
                                    style={{ 
                                        borderBottom: '1px solid rgba(255,255,255,0.03)', 
                                        cursor: 'pointer',
                                        background: isSelected ? 'rgba(0, 230, 118, 0.08)' : 'transparent',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <td style={{ padding: '1.8rem 2.5rem' }}>
                                        <input 
                                            type="checkbox" 
                                            style={{ width: 22, height: 22, accentColor: ACCENT, pointerEvents: 'none' }}
                                            checked={isSelected} 
                                            readOnly 
                                        />
                                    </td>
                                    <td style={{ padding: '1.8rem 1rem' }}>
                                        <div style={{ fontWeight: 800, fontSize: '1rem', color: isSelected ? ACCENT : '#fff' }}>{p.company_name}</div>
                                        <div style={{ fontSize: '0.65rem', opacity: 0.3, marginTop: 4 }}>{p.type.replace('_', ' ').toUpperCase()}</div>
                                        {p.contact_name && (
                                            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span style={{ fontSize: '0.75rem', color: ACCENT, fontWeight: 700 }}>CEO: {p.contact_name}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.8rem 1rem' }}>
                                        {p.linkedin_url ? (
                                            <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5' }} onClick={e => e.stopPropagation()}><Linkedin size={18} /></a>
                                        ) : (
                                            <span style={{ opacity: 0.1 }}>—</span>
                                        )}
                                    </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                    <a href={p.website} target="_blank" style={{ color: ACCENT, textDecoration: 'none', fontSize: '0.85rem' }}>{p.website}</a>
                                </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                    {editingEmail[p.id] !== undefined ? (
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                            <input
                                                autoFocus
                                                value={editingEmail[p.id]}
                                                onChange={e => setEditingEmail(prev => ({...prev, [p.id]: e.target.value}))}
                                                onKeyDown={e => { if (e.key === 'Enter') updateLeadEmail(p.id, editingEmail[p.id]); if (e.key === 'Escape') setEditingEmail(prev => { const n={...prev}; delete n[p.id]; return n; }); }}
                                                placeholder="paste@email.ae"
                                                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: `1px solid ${ACCENT}`, color: '#fff', fontSize: '0.8rem', outline: 'none', minWidth: 0 }}
                                            />
                                            <button onClick={() => updateLeadEmail(p.id, editingEmail[p.id])} style={{ padding: '8px 12px', background: ACCENT, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>✓</button>
                                            <button onClick={() => setEditingEmail(prev => { const n={...prev}; delete n[p.id]; return n; })} style={{ padding: '8px 10px', background: 'rgba(255,68,68,0.2)', border: 'none', borderRadius: 8, color: '#ff4444', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>✗</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {p.email ? (
                                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{p.email}</div>
                                            ) : p.status === 'no_email' ? (
                                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ff4444' }}>Extraction Failed</div>
                                            ) : (
                                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: ACCENT, opacity: 0.7 }}>Extracting Email...</div>
                                            )}
                                            <button
                                                onClick={() => setEditingEmail(prev => ({...prev, [p.id]: p.email || ''}))}
                                                title="Edit email manually"
                                                style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.7rem', flexShrink: 0 }}
                                            >✏️</button>
                                        </div>
                                    )}
                                    {p.mobile_number && (
                                        <div style={{ marginTop: 8 }}>
                                            <a href={`https://wa.me/${p.mobile_number.replace('+', '')}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', padding: '4px 8px', borderRadius: 6, textDecoration: 'none', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                                                <MessageSquare size={12} /> WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <Globe size={14} style={{ color: ACCENT }} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ACCENT }}>DOMAIN ALIVE</span>
                                    </div>
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
             </GlassCard>
          </div>
        )}

        {view === 'bulk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <h2 style={{ margin: 0, letterSpacing: -2, fontSize: '2.5rem', fontWeight: 900 }}>Bulk GMB Intelligence Import</h2>
             
             <GlassCard style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                   <label style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 900, marginBottom: 12, display: 'block' }}>GMB Profiles / Business Names / URLs (One per line)</label>
                   <textarea 
                      placeholder="Paste GMB Profile names, URLs, or business names here...&#10;Example:&#10;Al Tayer Stocks Dubai&#10;https://maps.app.goo.gl/...&#10;Dutco Construction Group"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ 
                          width: '100%', 
                          height: '300px',
                          padding: '20px', 
                          borderRadius: 20, 
                          background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          color: '#fff', 
                          fontSize: '1rem', 
                          outline: 'none',
                          fontFamily: 'monospace',
                          resize: 'none'
                      }} />
                </div>

                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 900, marginBottom: 8, display: 'block' }}>Industry Category</label>
                        <input 
                            placeholder="e.g. Construction, Interior Design..."
                            id="bulk-category"
                            style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}
                        />
                    </div>
                    <button 
                        onClick={async () => {
                            if (!searchQuery) return;
                            setSearching(true);
                            const cat = (document.getElementById('bulk-category') as HTMLInputElement)?.value || 'Bulk Import';
                            addLog(`📥 Processing bulk ingestion for ${searchQuery.split('\n').length} entries...`, 'info');
                            try {
                                const res = await fetch(`${API_BASE}/bulk-import`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ data: searchQuery, category: cat })
                                });
                                const data = await res.json();
                                if (data.success) {
                                    addLog(`✅ SUCCESS: ${data.inserted} new targets queued for AI Discovery.`, 'success');
                                    setSearchQuery("");
                                    setView('prospects');
                                }
                            } catch (e: any) { addLog(`❌ Import Error: ${e.message}`, 'err'); }
                            setSearching(false);
                        }}
                        disabled={searching || !searchQuery}
                        style={{ 
                            background: ACCENT, 
                            padding: '16px 40px', 
                            borderRadius: 16, 
                            color: '#fff', 
                            fontWeight: 900, 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontSize: '1rem',
                            marginTop: 22,
                            boxShadow: `0 8px 24px ${ACCENT}33`
                        }}>
                        {searching ? "INGESTING..." : "🚀 START BULK DISCOVERY"}
                    </button>
                </div>
                <div style={{ padding: '15px', background: 'rgba(29, 158, 117, 0.05)', borderRadius: 12, border: '1px solid rgba(29, 158, 117, 0.1)', fontSize: '0.8rem', color: ACCENT }}>
                    💡 <b>Tip:</b> The agent will automatically find the official websites and contact details for every company you paste here.
                </div>
             </GlassCard>
          </div>
        )}

        {view === 'sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <h2 style={{ margin: 0, letterSpacing: -2, fontSize: '2.5rem', fontWeight: 900 }}>Outreach History</h2>
             
             <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', background: 'rgba(255,255,255,0.01)' }}>
                            <th style={{ padding: '1.5rem 2.5rem' }}>Sent To</th>
                            <th style={{ padding: '1.5rem 1rem' }}>LinkedIn</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Target Email</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Timestamp</th>
                            <th style={{ padding: '1.5rem 1rem' }}>Delivery Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentLeads.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', opacity: 0.2 }}>No emails sent yet. Select targets in Discovery Engine to start.</td>
                            </tr>
                        )}
                        {sentLeads.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '1.8rem 2.5rem' }}>
                                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>{p.company_name}</div>
                                    <div style={{ fontSize: '0.65rem', opacity: 0.3, marginTop: 4 }}>{p.website}</div>
                                    {p.contact_name && (
                                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: '0.75rem', color: ACCENT, fontWeight: 700 }}>CEO: {p.contact_name}</span>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                    {p.linkedin_url ? (
                                        <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5' }}><Linkedin size={18} /></a>
                                    ) : (
                                        <span style={{ opacity: 0.1 }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.email}</div>
                                    {p.mobile_number && (
                                        <div style={{ marginTop: 8 }}>
                                            <a href={`https://wa.me/${p.mobile_number.replace('+', '')}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', padding: '4px 8px', borderRadius: 6, textDecoration: 'none', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                                                <MessageSquare size={12} /> WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '1.8rem 1rem', opacity: 0.4, fontSize: '0.8rem' }}>
                                    {new Date(p.added_at).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                    <StatusBadge status="sent" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </GlassCard>
          </div>
        )}

        {view === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <h2 style={{ margin: 0, letterSpacing: -2, fontSize: '2.5rem', fontWeight: 900 }}>System Configuration</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Cpu size={20} color={ACCENT} /> AI Parameters
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Primary LLM Model</label>
                                    <select 
                                        value={config.model}
                                        onChange={e => setConfig({...config, model: e.target.value})}
                                        style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}>
                                        <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Highly Accurate)</option>
                                        <option value="mixtral-8x7b-32768">mixtral-8x7b-32768 (Creative & Fast)</option>
                                        <option value="gemma2-9b-it">gemma2-9b-it (Efficient)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Pitch Language Tone</label>
                                    <select 
                                        value={config.tone}
                                        onChange={e => setConfig({...config, tone: e.target.value})}
                                        style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}>
                                        <option value="Professional & Bold">Professional & Bold</option>
                                        <option value="Concise & Direct">Concise & Direct</option>
                                        <option value="Casual & Friendly">Casual & Friendly</option>
                                        <option value="Ultra-Premium/Elite">Ultra-Premium/Elite</option>
                                    </select>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Globe size={20} color={ACCENT} /> Market Scope
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Auto-Verify Domains (DNS)</span>
                                    <div style={{ width: 44, height: 24, background: ACCENT, borderRadius: 20, position: 'relative' }}>
                                        <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', right: 3, top: 3 }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Include Google Business Listings</span>
                                    <div style={{ width: 44, height: 24, background: ACCENT, borderRadius: 20, position: 'relative' }}>
                                        <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', right: 3, top: 3 }} />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Mail size={20} color={ACCENT} /> Sender Intelligence
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.65rem', opacity: 0.3, textTransform: 'uppercase', marginBottom: 5 }}>Verified Account</div>
                                    <div style={{ fontWeight: 700 }}>asifk199707@gmail.com</div>
                                </div>
                                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.65rem', opacity: 0.3, textTransform: 'uppercase', marginBottom: 5 }}>SMTP Status</div>
                                    <div style={{ color: ACCENT, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 5 }}><CheckCircle size={14} /> CONNECTED</div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ border: '1px solid #ff444433' }}>
                            <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900, color: '#ff4444' }}>Danger Zone</h4>
                            <button 
                                onClick={clearStaleLeads}
                                style={{ width: '100%', padding: '15px', marginBottom: '1rem', background: 'rgba(255,167,38,0.1)', color: '#FFA726', border: '1px solid rgba(255,167,38,0.3)', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                                🗑️ CLEAR FAILED LEADS
                            </button>
                            <button 
                                onClick={clearDatabase}
                                style={{ width: '100%', padding: '15px', background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', border: '1px solid #ff444433', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                                WIPE MASTER DATABASE
                            </button>
                            <p style={{ fontSize: '0.7rem', opacity: 0.3, marginTop: 12, textAlign: 'center' }}>Permanently deletes all leads and outreach history.</p>
                        </GlassCard>
                    </div>
                </div>
            </div>
        )}

        {/* ── ANALYTICS CENTER (Phase 4) ── */}
        {view === 'analytics' && (
            <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontWeight: 900, fontSize: '2rem' }}>📊 Analytics Command Center</h2>
                        <p style={{ margin: 0, opacity: 0.4, marginTop: 6 }}>Real-time performance metrics for your outreach campaigns</p>
                    </div>
                    <button onClick={async () => {
                        // Export from fresh DB state (UI state can be slightly stale)
                        const r = await fetch(`${API_BASE}/leads`);
                        const latest = await r.json();
                        exportToCSV(latest.filter((p: any) => p.status === 'sent'), `sovereign_sent_${new Date().toISOString().split('T')[0]}.csv`);
                    }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: ACCENT, border: 'none', borderRadius: 12, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>
                        <Download size={16} /> EXPORT TO EXCEL
                    </button>
                </div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {[
                        { label: 'Total Sent', value: prospects.filter(p => p.status === 'sent').length, color: ACCENT, icon: '📤' },
                        { label: 'Follow-Ups Due', value: prospects.filter((p: any) => p.status === 'sent' && p.sent_count < 2).length, color: '#FFA726', icon: '🔔' },
                        { label: 'Interested', value: prospects.filter((p: any) => p.reply_sentiment === 'positive').length, color: '#1D9E75', icon: '🟩' },
                        { label: 'Not Interested', value: prospects.filter((p: any) => p.reply_sentiment === 'negative').length, color: '#ff4444', icon: '🟥' },
                        { label: 'No Email Found', value: prospects.filter((p: any) => p.status === 'no_email').length, color: '#888', icon: '❌' },
                    ].map(kpi => (
                        <GlassCard key={kpi.label} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{kpi.icon}</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginTop: 4 }}>{kpi.label}</div>
                        </GlassCard>
                    ))}
                </div>

                {/* Analytics log table */}
                <GlassCard>
                    <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <BarChart3 size={20} color={ACCENT} /> Daily Activity Log
                    </h4>
                    {analytics.length === 0 ? (
                        <p style={{ opacity: 0.3, textAlign: 'center', padding: '2rem' }}>
                            No analytics data yet. Send your first emails to start tracking performance.
                        </p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {['Date','Sent','Delivered','Follow-ups','Replies','Positive','Negative'].map(h => (
                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.65rem', opacity: 0.4, fontWeight: 800, textTransform: 'uppercase' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.map((row: any) => (
                                    <tr key={row.date} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '14px 16px', fontWeight: 700 }}>{row.date}</td>
                                        <td style={{ padding: '14px 16px', color: ACCENT, fontWeight: 800 }}>{row.emails_sent}</td>
                                        <td style={{ padding: '14px 16px' }}>{row.emails_delivered}</td>
                                        <td style={{ padding: '14px 16px', color: '#FFA726' }}>{row.followups_sent}</td>
                                        <td style={{ padding: '14px 16px' }}>{row.replies_received}</td>
                                        <td style={{ padding: '14px 16px', color: '#1D9E75' }}>{row.positive_replies}</td>
                                        <td style={{ padding: '14px 16px', color: '#ff4444' }}>{row.negative_replies}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    
                    {/* Mini bar chart of sent per day */}
                    {analytics.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ fontSize: '0.7rem', opacity: 0.3, textTransform: 'uppercase', fontWeight: 800, marginBottom: '1rem' }}>Emails Sent Per Day</div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                                {analytics.slice(-14).map((row: any) => {
                                    const max = Math.max(...analytics.map((r: any) => r.emails_sent), 1);
                                    const h = Math.max(4, (row.emails_sent / max) * 80);
                                    return (
                                        <div key={row.date} title={`${row.date}: ${row.emails_sent} sent`}
                                            style={{ flex: 1, height: h, background: ACCENT, borderRadius: '4px 4px 0 0', opacity: 0.85, cursor: 'pointer' }} />
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                <span style={{ fontSize: '0.6rem', opacity: 0.3 }}>{analytics[Math.max(0, analytics.length-14)]?.date}</span>
                                <span style={{ fontSize: '0.6rem', opacity: 0.3 }}>{analytics[analytics.length-1]?.date}</span>
                            </div>
                        </div>
                    )}
                </GlassCard>

                {/* Replied companies list */}
                {prospects.filter((p: any) => p.reply_sentiment).length > 0 && (
                    <GlassCard style={{ marginTop: '2rem' }}>
                        <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900 }}>💬 Companies That Replied</h4>
                        {prospects.filter((p: any) => p.reply_sentiment).map((p: any) => (
                            <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>{p.company_name}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.4 }}>{p.email}</div>
                                </div>
                                <StatusBadge status={p.status} sentiment={p.reply_sentiment} />
                            </div>
                        ))}
                    </GlassCard>
                )}
            </div>
        )}

      </main>
    </div>
  );
}

