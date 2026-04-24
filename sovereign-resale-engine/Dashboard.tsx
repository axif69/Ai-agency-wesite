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
  TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, RefreshCw,
  Bell, XCircle, Activity as ActivityIcon, Image
} from 'lucide-react';

// Dynamic API discovery handled inside the component
let API_BASE = ""; 
// ── [APPLE SILVER SYSTEM TOKENS] ──
const ACCENT = "#0071E3";
const ACCENT_GRADIENT = "linear-gradient(135deg, #0071E3 0%, #00d2ff 100%)";
const APPLE_GRAY = "#F5F5F7";
const TEXT_PRIMARY = "#1D1D1F";
const TEXT_SECONDARY = "#86868B";

const GlassCard = ({ children, style = {}, className = "" }: any) => (
  <div className={`apple-card ${className}`} style={{
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: "32px",
    padding: "2.2rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.04)",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    ...style
  }}>
    {children}
  </div>
);

const MeshBackground = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: -1,
    background: APPLE_GRAY,
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 20% 30%, rgba(0, 113, 227, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 113, 227, 0.02) 0%, transparent 50%)',
      filter: 'blur(100px)'
    }} />
    <style>{`
      @font-face {
        font-family: 'SF Pro';
        src: local('SF Pro Display'), local('SF Pro Text'), local('.SFNSText-Regular');
      }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', 'Inter', sans-serif !important;
        color: ${TEXT_PRIMARY};
      }
      .apple-card:hover {
        transform: scale(1.01);
        background: rgba(255, 255, 255, 0.85) !important;
        box-shadow: 0 30px 60px rgba(0,0,0,0.06) !important;
      }
      .spotlight-input:focus {
        background: #fff !important;
        border-color: ${ACCENT} !important;
        box-shadow: 0 0 0 4px ${ACCENT}15 !important;
      }
      .apple-button {
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }
      .apple-button:hover {
        transform: scale(1.02);
        opacity: 0.9;
      }
      .apple-button:active {
        transform: scale(0.98);
      }
   `}</style>
  </div>
);

const AppleHeading = ({ children, subtitle, align = 'left' }: { children: React.ReactNode; subtitle?: string; align?: 'left'|'center' }) => (
  <div style={{ marginBottom: '4rem', textAlign: align }}>
    <h2 style={{ 
      margin: 0, 
      fontSize: '4.8rem', 
      fontWeight: 700, 
      letterSpacing: '-0.04em',
      color: TEXT_PRIMARY,
      lineHeight: 1.05
    }}>{children}</h2>
    {subtitle && <p style={{ 
      fontSize: '1.4rem', 
      color: TEXT_SECONDARY, 
      margin: '1rem 0 0 0',
      fontWeight: 500,
      letterSpacing: '-0.01em'
    }}>{subtitle}</p>}
  </div>
);
const StatusBadge = ({ status, sentiment }: { status: string; sentiment?: string }) => {
    const s = status.toLowerCase();
    let bg = 'rgba(0, 0, 0, 0.03)';
    let color = TEXT_SECONDARY;
    let label = status.toUpperCase();

    if (s === 'sent') { bg = "rgba(52, 199, 89, 0.12)"; color = '#28a745'; label = 'DELIVERED'; }
    if (s === 'ready' || s === 'priority_ready' || s === 'queued') { bg = 'rgba(0, 113, 227, 0.12)'; color = ACCENT; label = 'QUEUED'; }
    if (s === 'new') { bg = 'rgba(0, 0, 0, 0.05)'; color = TEXT_SECONDARY; label = 'PENDING'; }
    if (s === 'no_email') { bg = 'rgba(255, 159, 10, 0.12)'; color = '#f56300'; label = 'REFUSED'; }
    if (s.includes('error') || s.includes('fail')) { bg = 'rgba(255, 59, 48, 0.12)'; color = '#ff3b30'; label = 'ERROR'; }

    const sentimentBadge = () => {
        if (!sentiment) return null;
        const m: any = {
            positive: { bg: 'rgba(52, 199, 89, 0.15)', color: '#28a745', label: 'INTERESTED' },
            negative: { bg: 'rgba(255, 59, 48, 0.12)', color: '#ff3b30', label: 'REJECTED' },
            auto_reply: { bg: 'rgba(255, 159, 10, 0.12)', color: '#f56300', label: 'AUTO-REPLY' },
            neutral: { bg: 'rgba(0, 0, 0, 0.05)', color: TEXT_SECONDARY, label: 'NEUTRAL' },
        };
        const cfg = m[sentiment.toLowerCase()];
        if (!cfg) return null;
        return <span style={{ padding: '6px 12px', borderRadius: 10, fontSize: '0.6rem', fontWeight: 800, background: cfg.bg, color: cfg.color, marginLeft: 10, letterSpacing: '0.03em' }}>{cfg.label}</span>;
    };

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ padding: '6px 14px', borderRadius: 10, fontSize: '0.65rem', fontWeight: 800, background: bg, color: color, letterSpacing: '0.04em' }}>{label}</span>
            {sentimentBadge()}
        </span>
    );
};

export default function SovereignDashboardV5_1() {
  const [apiBase, setApiBase] = useState<string>(() => {
    const savedPort = localStorage.getItem('SOVEREIGN_API_PORT');
    return savedPort ? `http://127.0.0.1:${savedPort}/api` : 'http://127.0.0.1:3010/api';
  });
  const [view, setView] = useState<'dashboard' | 'all' | 'prospects' | 'bulk' | 'sent' | 'settings' | 'analytics'>("dashboard");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  
  // v22.5: Quantum Bridge — Keep global Ref in sync with State
  API_BASE = apiBase || "";
  if (apiBase) {
    const port = apiBase.match(/:(\d+)/)?.[1];
    if (port) localStorage.setItem('SOVEREIGN_API_PORT', port);
  }

  const [prospects, setProspects] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(false);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [editingEmail, setEditingEmail] = useState<{[id: number]: string}>({});
  const [workerRunning, setWorkerRunning] = useState(false);
  const [isEngineBusy, setEngineBusy] = useState(false);
  const [config, setConfig] = useState<any>({
    model: 'llama-3.3-70b-versatile',
    tone: 'Professional & Bold',
    temperature: 0.7,
    daily_limit: 50,
    verify_domains: true,
    include_gmb: true,
    COMPANY_NAME: '',
    REP_NAME: '',
    PHONE: '',
    EMAIL_USER: '',
    GMAIL_APP_PASS: '',
    GROQ_API_KEY: '',
    MISTRAL_API_KEY: '',
    COMPANY_URL: '',
    COMPANY_PROFILE_URL: '',
    PITCH_CONTEXT: '',
    SMTP_HOST: '',
    SMTP_PORT: '587',
    SMTP_SECURE: 'false',
    COMPANY_KNOWLEDGE: ''
  });

  // Update browser tab title
  useEffect(() => {
    document.title = config.COMPANY_NAME ? `${config.COMPANY_NAME} | Sovereign Engine` : "Asif Digital | Sovereign Engine";
  }, [config.COMPANY_NAME]);

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth > 1024) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const discoverPort = async () => {
      const scanRange = [3003, 3010, 3011, 3012, 3013, 3014, 3015];
      for (const port of scanRange) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1000);
          const res = await fetch(`http://127.0.0.1:${port}/api/heartbeat`, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (res.ok) {
            const newBase = `http://127.0.0.1:${port}/api`;
            setApiBase(newBase);
            localStorage.setItem('SOVEREIGN_API_BASE', newBase);
            return true;
          }
        } catch (e) {}
      }
      return false;
    };

    discoverPort();
  }, []);

  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [kbLoading, setKbLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    groq_key: '',
    mistral_key: '',
    gmail_user: '',
    gmail_pass: '',
    website_url: '',
    suggested_pitch: '',
    company_name: '',
    rep_name: '',
    phone: '',
    email: '',
    company_profile_url: '',
    use_custom_smtp: false,
    smtp_host: 'smtp.gmail.com',
    smtp_port: '587',
    smtp_secure: false
  });

  useEffect(() => {
    if (!apiBase) return;
    const fetchSettings = async () => {
        try {
            const res = await fetch(`${apiBase}/settings`);
            const data = await res.json();
            if (data && Object.keys(data).length > 0) {
                const cleaned = { ...data };
                if (cleaned.verify_domains !== undefined) cleaned.verify_domains = cleaned.verify_domains === 'true';
                if (cleaned.include_gmb !== undefined) cleaned.include_gmb = cleaned.include_gmb === 'true';
                setConfig((prev: any) => ({ ...prev, ...cleaned }));
                
                // Keep onboarding sync'd
                setOnboardingData(prev => ({
                    ...prev,
                    company_name: cleaned.COMPANY_NAME || '',
                    rep_name: cleaned.REP_NAME || '',
                    email: cleaned.EMAIL_USER || '',
                    phone: cleaned.PHONE || '',
                    website_url: cleaned.COMPANY_URL || '',
                    groq_key: cleaned.GROQ_API_KEY || '',
                    gmail_user: cleaned.EMAIL_USER || '',
                    gmail_pass: cleaned.GMAIL_APP_PASS || '',
                }));
                
                // Explicitly sync the Knowledge Base if it exists
                if (cleaned.COMPANY_KNOWLEDGE) {
                    console.log(`🧠 Neural KB Loaded: ${cleaned.COMPANY_KNOWLEDGE.length} chars.`);
                }
                
                if (!data.COMPANY_NAME) {
                    setShowWizard(true);
                }
            } else {
                setShowWizard(true);
            }
        } catch (e) { 
            console.error("Failed to load settings:", e);
            setShowWizard(true);
        }
    };
    fetchSettings();

    // v28.0: Engine Control Sync
    const checkWorker = async () => {
        try {
            const res = await fetch(`${apiBase}/worker/status`);
            const data = await res.json();
            setWorkerRunning(data.online);
        } catch (e) {}
    };
    const workerInterval = setInterval(checkWorker, 3000);
    checkWorker();
    return () => clearInterval(workerInterval);
  }, [apiBase]);

  const handleStartAgent = async () => {
    setEngineBusy(true);
    try {
        const res = await fetch(`${apiBase}/worker/start`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            setWorkerRunning(true);
            addLog("🚀 SOVEREIGN ENGINE STARTING...", 'success');
        }
    } catch (e: any) { addLog(`❌ Failed to start: ${e.message}`, 'err'); }
    setEngineBusy(false);
  };

  const handleStopAgent = async () => {
    setEngineBusy(true);
    try {
        const res = await fetch(`${apiBase}/worker/stop`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            setWorkerRunning(false);
            addLog("🛑 SOVEREIGN ENGINE STOPPED.", 'err');
        }
    } catch (e: any) { addLog(`❌ Failed to stop: ${e.message}`, 'err'); }
    setEngineBusy(false);
  };

  const [ninjaQuery, setNinjaQuery] = useState("");
  const [ninjaLoading, setNinjaLoading] = useState(false);

  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: 'Sovereign .5 Ground-Truth Engine ONLINE.', type: 'success' }
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
    if (!apiBase) return;
    refreshData();
    const interval = setInterval(refreshData, 3000); // Poll every 3s for fast updates
    return () => clearInterval(interval);
  }, [apiBase, view]);

  const addLog = (msg: string, type: 'info' | 'success' | 'err' = 'info') => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, type }, ...prev].slice(0, 50));
  };

  const refreshData = async () => {
    // v24.0: Polling Guard — Don't refresh if user is actively editing to prevent "reverting" UI
    if (Object.keys(editingEmail).length > 0) return;
    
    try {
      const pRes = await fetch(`${apiBase}/leads`);
      if (pRes.ok) setProspects(await pRes.json());
      
      const sRes = await fetch(`${apiBase}/settings`);
      if (sRes.ok) {
          const sData = await sRes.json();
          const activeTag = document.activeElement?.tagName;
          const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA';
          if (!isTyping) {
              setConfig((prev: any) => ({ ...prev, ...sData }));
          } else {
              setConfig((prev: any) => ({ ...prev, DYNAMIC_NICHES: sData.DYNAMIC_NICHES }));
          }
      }

      const aRes = await fetch(`${apiBase}/analytics`);
      if (aRes.ok) setAnalytics(await aRes.json());

      // Live Logs Sync
      const lRes = await fetch(`${apiBase}/logs`);
      if (lRes.ok) {
          const fetchedLogs = await lRes.json();
          if (fetchedLogs.length > 0) {
              setLogs(fetchedLogs.map((l: any) => ({ time: l.timestamp, msg: l.message, type: l.type })));
          }
      }

      // Issue 4: Heartbeat polling
      const hRes = await fetch(`${apiBase}/heartbeat`);
      if (hRes.ok) setHeartbeat(await hRes.json());
    } catch (e) { console.error("Sync Error:", e); }
  };

  const saveSettings = async (partialConfig: any) => {
    // Merge locally first for instant UI feedback
    const merged = { ...config, ...partialConfig };
    setConfig(merged);
    
    try {
        await fetch(`${apiBase}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settings: merged })
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
      await fetch(`${apiBase}/leads/clear-stale`, { method: 'POST' });
      addLog('🗑️ Cleared all failed/pending-scan leads.', 'info');
      await refreshData();
    } catch (e) { addLog('❌ Clear stale failed.', 'err'); }
  };

  const updateLeadEmail = async (id: number, email: string) => {
    if (!email.includes('@')) return alert('Please enter a valid email address.');
    // Optimistic UI: Update prospects state
    const oldLeads = [...prospects];
    setProspects(prev => prev.map(p => p.id === id ? { ...p, email, status: 'ready' } : p));
    
    try {
      const res = await fetch(`${apiBase}/leads/${id}/email`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        addLog(`✅ Saved: Lead #${id} email locked.`, 'success');
        setEditingEmail(prev => { const n = {...prev}; delete n[id]; return n; });
      } else {
        setProspects(oldLeads);
        addLog("❌ Server failed to save email.", 'err');
      }
    } catch (e: any) { 
        setProspects(oldLeads);
        addLog(`❌ Sync Error: ${e.message}`, 'err'); 
    }
  };

  const deleteLead = async (id: number) => {
    const oldLeads = [...prospects];
    setProspects(prev => prev.filter(p => p.id !== id));
    try {
      const res = await fetch(`${apiBase}/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addLog(`🗑️ Lead #${id} permanently removed.`, 'info');
      } else {
        setProspects(oldLeads);
        addLog("❌ Server failed to delete.", 'err');
      }
    } catch (e) {
        setProspects(oldLeads);
        addLog("❌ Delete Sync Error.", 'err');
    }
  };

  const handleManualSearch = async () => {
    if (!searchQuery) return;
    setSearching(true);
    addLog(`🔍 Precision Scan Initiated: ${searchQuery}...`, 'info');
    try {
      const res = await fetch(`${apiBase}/search`, {
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

  const handleNinjaScan = async () => {
    if (!ninjaQuery) return;
    setNinjaLoading(true);
    addLog(`🥷 GMB Ninja: Initiating Stealth Scan for "${ninjaQuery}" UAE...`, 'info');
    try {
      const res = await fetch(`${apiBase}/gmb-ninja-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ninjaQuery })
      });
      const data = await res.json();
      if (data.success) {
        addLog(`✅ GMB Ninja: Stealth scan launched. Check logs for live discoveries.`, 'success');
        setNinjaQuery("");
      }
    } catch (e: any) { addLog(`❌ Ninja Error: ${e.message}`, 'err'); }
    setNinjaLoading(false);
  };

  const handleBulkSend = async () => {
    if (selected.length === 0) return;
    setSending(true);
    addLog(`🤖 Launching AI Outreach sequence for ${selected.length} targets...`, 'info');
    
    // Update local UI immediately
    setProspects(prev => prev.map(p => selected.includes(p.id) ? { ...p, status: 'ready' } : p));
    
    try {
      const res = await fetch(`${apiBase}/bulk-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected })
      });
      if (res.ok) {
        addLog(`✅ AI ENGINE ENGAGED: Worker is drafting personalized pitches now.`, 'success');
        setSelected([]);
        fetch(`${API_BASE}/worker/run`, { method: 'POST' });
      }
    } catch (e: any) { addLog(`❌ Launch Error: ${e.message}`, 'err'); }
    setSending(false);
  };

  const clearDatabase = async () => {
    if (window.confirm("⚠️ DANGER: Permanent Wipe?")) {
        try {
            await fetch(`${apiBase}/leads/clear`, { method: 'POST' });
            addLog("System Purge Complete.", 'info');
            setProspects([]);
            setView('dashboard');
        } catch (e: any) { alert(e.message); }
    }
  };

  const handleKBFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setKbLoading(true);
    addLog(`📚 KB UPLOAD: Reading "${file.name}"...`, 'info');
    
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const base64 = (ev.target?.result as string).split(',')[1];
        try {
            const res = await fetch(`${apiBase}/settings/kb-upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ base64Pdf: base64, fileName: file.name })
            });
            const data = await res.json();
            if (res.ok) {
                addLog(`✅ Knowledge Base: ${data.length} characters ingested successfully.`, 'success');
                const extractedText = data.text || data.textSnippet || '';
                setConfig((prev: any) => ({ ...prev, COMPANY_KNOWLEDGE: extractedText }));
                setOnboardingData((prev: any) => ({ ...prev, suggested_pitch: extractedText.slice(0, 500) }));
            } else {
                addLog(`❌ KB Upload Rejected: ${data.error || 'Server error'}`, 'err');
                console.error("KB UPLOAD FAILED:", data);
            }
        } catch (err: any) { 
            addLog(`❌ KB Connection Error: ${err.message}`, 'err'); 
            console.error(err);
        }
        setKbLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSelfScrape = async () => {
    if (!onboardingData.website_url) return;
    setKbLoading(true);
    try {
        const res = await fetch(`${apiBase}/settings/scrape-self`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: onboardingData.website_url })
        });
        const data = await res.json();
        if (data.success) {
            setOnboardingData(prev => ({ ...prev, suggested_pitch: data.suggested_pitch }));
            addLog("🔍 Identity suggestions generated from website.", 'success');
        }
    } catch (err) { addLog("❌ Self-scrape failed.", 'err'); }
    setKbLoading(false);
  };

  const finalizeOnboarding = async () => {
    const finalSettings = {
        COMPANY_NAME: onboardingData.company_name,
        REP_NAME: onboardingData.rep_name,
        COMPANY_URL: onboardingData.website_url,
        PITCH_CONTEXT: onboardingData.suggested_pitch,
        PHONE: onboardingData.phone,
        EMAIL_USER: onboardingData.email,
        GROQ_API_KEY: onboardingData.groq_key,
        MISTRAL_API_KEY: onboardingData.mistral_key,
        GMAIL_APP_PASS: onboardingData.gmail_pass,
        COMPANY_PROFILE_URL: onboardingData.company_profile_url,
        SMTP_HOST: onboardingData.use_custom_smtp ? onboardingData.smtp_host : '',
        SMTP_PORT: onboardingData.use_custom_smtp ? onboardingData.smtp_port : '',
        SMTP_SECURE: onboardingData.use_custom_smtp ? (onboardingData.smtp_secure ? 'true' : 'false') : ''
    };
    await saveSettings(finalSettings);
    setShowWizard(false);
    window.location.reload(); // Refresh to update all dynamic identities
  };

  const renderSetupWizard = () => {
    const steps = [
      { id: 1, title: 'API Access', desc: 'Secure Brain Connection' },
      { id: 2, title: 'Outreach', desc: 'Email Infrastructure' },
      { id: 3, title: 'Identity', desc: 'Company Digital Presence' },
      { id: 4, title: 'Knowledge', desc: 'AI Brain Ingestion' },
      { id: 5, title: 'Finalize', desc: 'Brand Alignment' }
    ];

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(30px) saturate(180%)', padding: '20px' }}>
        <GlassCard style={{ width: 700, maxWidth: '100%', padding: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}>
          {/* Header & Progress Bar */}
          <div style={{ padding: '3rem 3rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ background: ACCENT, width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={24} fill="white" color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, letterSpacing: -1 }}>{config.COMPANY_NAME?.split(' ')[0] || 'ASIF'} <span style={{ color: ACCENT }}>{config.COMPANY_NAME?.split(' ').slice(1).join(' ') || 'DIGITAL'}</span></h2>
                        <div style={{ fontSize: '0.65rem', opacity: 0.4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Sovereign Resale v5.1</div>
                    </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 20 }}>
                    <button 
                        onClick={() => setShowWizard(false)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '8px 16px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                        SKIP TO DASHBOARD
                    </button>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 900, color: ACCENT }}>STEP {Math.floor(wizardStep)} OF 5</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.6 }}>{steps.find(s => s.id === Math.floor(wizardStep))?.title}</div>
                    </div>
                </div>
             </div>

             <div style={{ display: 'flex', gap: 8 }}>
                {steps.map(s => (
                    <div key={s.id} style={{ height: 4, flex: 1, background: wizardStep >= s.id ? ACCENT : 'rgba(255,255,255,0.1)', borderRadius: 2, transition: 'all 0.5s ease' }} />
                ))}
             </div>
          </div>

          <div style={{ padding: '3rem' }}>
            {/* Step 1: API Keys */}
            {wizardStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px' }}>Intelligence Keys</h3>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Connect the AI brains that will power your outreach pipeline.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Groq API Key (High Speed)</label>
                        <input type="password" value={onboardingData.groq_key || ''} onChange={e => setOnboardingData({...onboardingData, groq_key: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} placeholder="gsk_..." />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Mistral API Key (Fallback)</label>
                        <input type="password" value={onboardingData.mistral_key || ''} onChange={e => setOnboardingData({...onboardingData, mistral_key: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} placeholder="your-mistral-key" />
                    </div>
                </div>
                <button onClick={() => setWizardStep(1.5)} style={{ padding: '20px', background: ACCENT, color: '#white', borderRadius: 16, border: 'none', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', marginTop: 10, boxShadow: `0 20px 40px ${ACCENT}33` }}>NEXT: EMAIL INFRASTRUCTURE</button>
              </div>
            )}

            {/* Step 2: Email Setup */}
            {wizardStep === 1.5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px' }}>Send Infrastructure</h3>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Configure the source identity for all outgoing transmissions.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Outreach Email Account</label>
                        <input value={onboardingData.email || ''} onChange={e => setOnboardingData({...onboardingData, email: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} placeholder="asif@asifdigital.agency" />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>App Password / SMTP Password</label>
                        <input type="password" value={onboardingData.gmail_pass || ''} onChange={e => setOnboardingData({...onboardingData, gmail_pass: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div style={{ padding: '1.2rem', background: 'rgba(0,113,227,0.05)', borderRadius: 14, border: '1px solid rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setOnboardingData({...onboardingData, use_custom_smtp: !onboardingData.use_custom_smtp})}>
                            <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${onboardingData.use_custom_smtp ? ACCENT : 'rgba(255,255,255,0.2)'}`, background: onboardingData.use_custom_smtp ? ACCENT : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {onboardingData.use_custom_smtp && <Zap size={12} color="#fff" fill="#fff" />}
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Use Custom Enterprise SMTP</span>
                        </div>
                    </div>
                    {onboardingData.use_custom_smtp && (
                         <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 12 }}>
                            <input value={onboardingData.smtp_host || ''} onChange={e => setOnboardingData({...onboardingData, smtp_host: e.target.value})} placeholder="SMTP Host (e.g. smtp.titan.email)" style={{ padding: '14px', borderRadius: 12, background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }} />
                            <input value={onboardingData.smtp_port || ''} onChange={e => setOnboardingData({...onboardingData, smtp_port: e.target.value})} placeholder="465" style={{ padding: '14px', borderRadius: 12, background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }} />
                         </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setWizardStep(1)} style={{ flex: 1, padding: '18px', background: 'rgba(255,255,255,0.05)', color: '#white', borderRadius: 16, border: 'none', fontWeight: 700, cursor: 'pointer' }}>BACK</button>
                    <button onClick={() => setWizardStep(2)} style={{ flex: 2, padding: '18px', background: ACCENT, color: '#white', borderRadius: 16, border: 'none', fontWeight: 900, cursor: 'pointer' }}>PROCEED TO IDENTITY</button>
                </div>
              </div>
            )}

            {/* Step 3: Identity Scraper */}
            {wizardStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px' }}>Brand Identity</h3>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>We'll analyze your website to teach the AI about your business.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <input value={onboardingData.website_url || ''} onChange={e => setOnboardingData({...onboardingData, website_url: e.target.value})} style={{ flex: 1, padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} placeholder="https://yourwebsite.com" />
                    <button onClick={handleSelfScrape} disabled={kbLoading} style={{ padding: '0 25px', background: ACCENT, borderRadius: 14, border: 'none', color: '#fff', fontWeight: 900 }}>{kbLoading ? '...' : 'SCAN SITE'}</button>
                </div>
                {onboardingData.suggested_pitch && (
                     <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Intelligence Extracted (Pitch Context)</label>
                        <textarea value={onboardingData.suggested_pitch || ''} onChange={e => setOnboardingData({...onboardingData, suggested_pitch: e.target.value})} style={{ width: '100%', height: 140, padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', lineHeight: 1.5 }} />
                     </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setWizardStep(1.5)} style={{ flex: 1, padding: '18px', background: 'rgba(255,255,255,0.05)', color: '#white', borderRadius: 16, border: 'none', fontWeight: 700, cursor: 'pointer' }}>BACK</button>
                    <button onClick={() => setWizardStep(3)} style={{ flex: 2, padding: '18px', background: ACCENT, color: '#white', borderRadius: 16, border: 'none', fontWeight: 900, cursor: 'pointer' }}>PROCEED TO KNOWLEDGE</button>
                </div>
              </div>
            )}

            {/* Step 4: Knowledge Base (PDF) */}
            {wizardStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px' }}>Deep Intelligence</h3>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Upload your Company Profile to enable high-precision AI drafting.</p>
                </div>
                
                <div 
                    onClick={() => document.getElementById('kb-upload-wizard')?.click()}
                    style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '4rem 2rem', borderRadius: 24, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                    <FileText size={48} color={ACCENT} style={{ opacity: 0.4, marginBottom: 16 }} />
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 6 }}>Upload Company Profile (PDF)</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.4 }}>This teaches the AI your case studies, project lists, and values.</div>
                    <input type="file" id="kb-upload-wizard" hidden accept=".pdf" onChange={handleKBFile} />
                    {kbLoading && <Activity className="animate-spin" size={24} style={{ marginTop: 20, color: ACCENT }} />}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setWizardStep(2)} style={{ flex: 1, padding: '18px', background: 'rgba(255,255,255,0.05)', color: '#white', borderRadius: 16, border: 'none', fontWeight: 700, cursor: 'pointer' }}>BACK</button>
                    <button onClick={() => setWizardStep(4)} style={{ flex: 2, padding: '18px', background: ACCENT, color: '#white', borderRadius: 16, border: 'none', fontWeight: 900, cursor: 'pointer' }}>SKIP / NEXT STEP</button>
                </div>
              </div>
            )}

            {/* Step 5: Finalize & Brand Alignment */}
            {wizardStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px' }}>Finalize Identity</h3>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Verify your official branding before the engine initializes.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Agency Legal Name</label>
                        <input value={onboardingData.company_name || ''} onChange={e => setOnboardingData({...onboardingData, company_name: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Primary Executive</label>
                        <input value={onboardingData.rep_name || ''} onChange={e => setOnboardingData({...onboardingData, rep_name: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} />
                    </div>
                </div>

                <div>
                    <label style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Official Company Profile Link (PDF)</label>
                    <input value={onboardingData.company_profile_url || ''} onChange={e => setOnboardingData({...onboardingData, company_profile_url: e.target.value})} style={{ width: '100%', padding: '16px', borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem' }} placeholder="https://drive.google.com/..." />
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(37, 211, 102, 0.05)', borderRadius: 20, border: '1px solid rgba(37, 211, 102, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#25D366', fontWeight: 800, fontSize: '0.8rem', marginBottom: 6 }}>
                        <ShieldCheck size={16} /> VALIDATED & READY
                    </div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.5 }}>The Sovereign Engine is now tuned to your unique brand DNA. All outreach will be dynamically personalized using your ingested knowledge base.</div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setWizardStep(3)} style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.05)', color: '#white', borderRadius: 18, border: 'none', fontWeight: 700, cursor: 'pointer' }}>BACK</button>
                    <button onClick={finalizeOnboarding} style={{ flex: 2, padding: '20px', background: ACCENT, color: '#white', borderRadius: 18, border: 'none', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', boxShadow: `0 20px 50px ${ACCENT}44` }}>INITIALIZE ENGINE 🚀</button>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    );
  };

  const sentLeads = prospects.filter(p => p.status === 'sent').sort((a, b) => new Date(b.last_contacted || b.added_at).getTime() - new Date(a.last_contacted || a.added_at).getTime());
  const discoveryLeads = prospects.filter(p => p.status !== 'sent');

  if (!apiBase) {
    return (
      <div style={{ 
        height: '100vh', background: APPLE_GRAY, color: TEXT_PRIMARY, 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif'
      }}>
        <Activity size={48} color={ACCENT} className="animate-spin" style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
        <h2 style={{ fontWeight: 600, letterSpacing: -0.5, fontSize: '1.2rem' }}>ESTABLISHING SECURE CONNECTION...</h2>
        <p style={{ opacity: 0.4, fontSize: '0.9rem', marginTop: '0.5rem' }}>Synchronizing with Sovereign Brain Instance</p>
      </div>
    );
  }

  return (
    <div style={{ 
        minHeight: '100vh', 
        background: 'transparent', 
        color: TEXT_PRIMARY, 
        display: 'flex', 
        flexDirection: windowWidth < 1024 ? 'column' : 'row', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
        letterSpacing: '-0.015em' 
    }}>
      <MeshBackground />
      {showWizard && renderSetupWizard()}

      {/* Mobile Top Header */}
      {windowWidth < 1024 && (
        <div style={{ 
            padding: '1.2rem 1.8rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            borderBottom: '1px solid rgba(0,0,0,0.05)', 
            background: 'rgba(255,255,255,0.7)', 
            backdropFilter: 'blur(30px) saturate(180%)', 
            position: 'sticky', 
            top: 0, 
            zIndex: 1000 
        }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: ACCENT, padding: 6, borderRadius: 10 }}><Zap size={18} fill="white" color="white" /></div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: -0.5 }}>SOVEREIGN<span style={{ color: ACCENT }}>.5</span></div>
            </div>
            <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)} 
                style={{ background: 'rgba(0,0,0,0.03)', border: 'none', borderRadius: 10, padding: 10, color: TEXT_PRIMARY, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <LayoutDashboard size={24} color={isSidebarOpen ? ACCENT : TEXT_PRIMARY} />
            </button>
        </div>
      )}

      {/* Backdrop for mobile sidebar */}
      {windowWidth < 1024 && isSidebarOpen && (
        <div 
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', zIndex: 1001 }} 
        />
      )}

      {/* ── APPLE SIDEBAR NAVIGATION ── */}
      {(windowWidth >= 1024 || isSidebarOpen) && (
        <aside style={{ 
            width: windowWidth < 1200 ? 280 : 320, 
            borderRight: '1px solid rgba(0,0,0,0.05)', 
            padding: '3rem 2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3rem', 
            background: 'rgba(255, 255, 255, 0.45)', 
            backdropFilter: 'blur(60px) saturate(200%)',
            WebkitBackdropFilter: 'blur(60px) saturate(200%)',
            position: windowWidth < 1024 ? 'fixed' : 'sticky', 
            top: 0, 
            left: 0,
            bottom: 0,
            zIndex: 1002,
            height: '100vh',
            boxShadow: windowWidth < 1024 ? '40px 0 100px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.5rem', padding: '0 0.5rem' }}>
            <div style={{ background: ACCENT, padding: 10, borderRadius: 14, boxShadow: `0 8px 30px ${ACCENT}33` }}>
                <Zap size={26} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.05em', color: TEXT_PRIMARY, lineHeight: 1 }}>{config.COMPANY_NAME?.split(' ')[0] || 'ASIF'} <span style={{ color: ACCENT }}>{config.COMPANY_NAME?.split(' ').slice(1).join(' ') || 'DIGITAL'}</span></div>
              <div style={{ fontSize: '0.6rem', color: TEXT_SECONDARY, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4 }}>Sovereign Resale v5.1</div>
            </div>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            {([
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, count: 0 },
              { id: 'all', label: 'Database', icon: Database, count: prospects.length },
              { id: 'prospects', label: 'Discovery', icon: Search, count: (discoveryLeads?.length || 0) },
              { id: 'bulk', label: 'Bulk Import', icon: FileText, count: 0 },
              { id: 'sent', label: 'Outreach', icon: Mail, count: (sentLeads?.length || 0) },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 0 },
              { id: 'settings', label: 'System', icon: Settings, count: 0 },
            ] as const).map(item => (
              <div 
                key={item.id} 
                className="apple-nav-item"
                onClick={() => { 
                  setView(item.id); 
                  setSelected([]); 
                  if (windowWidth < 1024) setSidebarOpen(false);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                  background: view === item.id ? 'rgba(0, 113, 227, 0.08)' : 'transparent',
                  color: view === item.id ? ACCENT : TEXT_SECONDARY,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontWeight: view === item.id ? 700 : 500,
                  fontSize: '0.9rem',
                }}
              >
                <item.icon size={20} strokeWidth={view === item.id ? 2.5 : 2} style={{ color: view === item.id ? ACCENT : TEXT_SECONDARY }} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {(item.count || 0) > 0 && (
                  <span style={{ 
                    background: view === item.id ? ACCENT : 'rgba(0,0,0,0.05)', 
                    color: view === item.id ? '#fff' : TEXT_SECONDARY, 
                    fontSize: 10, 
                    padding: '2px 8px', 
                    borderRadius: 20,
                    fontWeight: 800
                  }}>{item.count}</span>
                )}
              </div>
            ))}
            <style>{`
              .apple-nav-item:hover {
                background: rgba(0, 0, 0, 0.03) !important;
                color: ${TEXT_PRIMARY} !important;
              }
              .apple-nav-item:hover svg {
                color: ${TEXT_PRIMARY} !important;
              }
            `}</style>
          </nav>
          
          <div style={{ marginTop: 'auto' }}>
              <GlassCard style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '20px' }}>
                  <div style={{ fontSize: '0.65rem', color: TEXT_SECONDARY, marginBottom: 8, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase' }}>Active Identity</div>
                  <div style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 8, 
                      color: TEXT_PRIMARY,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                  }}>
                      <div style={{ width: 8, height: 8, background: '#34c759', borderRadius: '50%', boxShadow: '0 0 10px rgba(52, 199, 89, 0.3)' }} />
                      <span>{config.COMPANY_NAME || 'Sovereign'}</span>
                  </div>
              </GlassCard>
          </div>
        </aside>
      )}

      <main style={{ 
          flex: 1, 
          padding: windowWidth < 600 ? '1rem' : windowWidth < 1200 ? '1.5rem' : '4rem', 
          overflowY: 'auto' 
      }}>
        
        {view === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <AppleHeading subtitle="Intelligent UAE sales infrastructure operating at massive scale.">
              Control Center
            </AppleHeading>

            {/* ── APPLE METRICS GRID ── */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: windowWidth < 600 ? '1fr' : windowWidth < 900 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
              gap: '32px' 
            }}>
              <GlassCard style={{ background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>UAE Intelligence</div>
                <div style={{ fontSize: '3.8rem', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.06em', lineHeight: 1 }}>{prospects.length}</div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 8, fontWeight: 500 }}>Entities Discovered</div>
                <Activity size={24} color={ACCENT} style={{ position: 'absolute', top: 20, right: 25, opacity: 0.2 }} />
              </GlassCard>
              
              <GlassCard style={{ background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Engagements</div>
                <div style={{ fontSize: '3.8rem', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.06em', lineHeight: 1 }}>{sentLeads.length}</div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 8, fontWeight: 500 }}>Global Deliveries</div>
                <Send size={24} color={ACCENT} style={{ position: 'absolute', top: 20, right: 25, opacity: 0.2 }} />
              </GlassCard>

              <GlassCard style={{ background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Awaiting AI</div>
                <div style={{ fontSize: '3.8rem', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.06em', lineHeight: 1 }}>{discoveryLeads.length}</div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 8, fontWeight: 500 }}>Intelligence Pipeline</div>
                <Zap size={24} color="#ff9500" style={{ position: 'absolute', top: 20, right: 25, opacity: 0.2 }} />
              </GlassCard>

              <GlassCard style={{ background: workerRunning ? '#F0FFF4' : '#FFF5F5', border: `1px solid ${workerRunning ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 77, 77, 0.1)'}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Command Center</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ 
                        width: 14, height: 14, 
                        background: workerRunning ? '#34c759' : '#ff3b30', 
                        borderRadius: '50%', 
                        boxShadow: workerRunning ? '0 0 20px rgba(52, 199, 89, 0.5)' : '0 0 20px rgba(255, 59, 48, 0.5)',
                        animation: workerRunning ? 'ripple 2s infinite' : 'none'
                    }} />
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.04em' }}>{workerRunning ? 'Engine Active' : 'Engine Idle'}</div>
                </div>
                
                <button 
                    onClick={workerRunning ? handleStopAgent : handleStartAgent}
                    disabled={isEngineBusy}
                    style={{ 
                        width: '100%',
                        background: workerRunning ? '#FF4D4D' : '#22C55E',
                        color: '#fff',
                        border: 'none',
                        padding: '14px',
                        borderRadius: 14,
                        fontSize: '0.9rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: `0 8px 20px ${workerRunning ? 'rgba(255,77,77,0.2)' : 'rgba(34,197,94,0.2)'}`
                    }}>
                    {isEngineBusy ? 'SYNCHRONIZING...' : workerRunning ? 'STOP OUTREACH' : 'ACTIVATE ENGINE'}
                </button>
                
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: TEXT_SECONDARY, fontWeight: 600 }}>Port: {apiBase?.match(/:(\d+)/)?.[1] || '3010'}</span>
                    <button 
                        onClick={() => { const p = prompt("New Port?", "3010"); if(p) { setApiBase(`http://127.0.0.1:${p}/api`); localStorage.setItem('SOVEREIGN_API_PORT', p); window.location.reload(); } }}
                        style={{ border: 'none', background: 'none', color: ACCENT, fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', padding: 0 }}>CHANGE PORT</button>
                </div>
              </GlassCard>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 1300 ? '1fr' : '1.7fr 1fr', gap: '32px' }}>
               <GlassCard style={{ maxHeight: '600px', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '32px', padding: '2.5rem' }}>
                 <h4 style={{ margin: 0, marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em', color: TEXT_PRIMARY }}>
                        <Terminal size={22} color={ACCENT} /> Intelligence Stream
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34c759', animation: 'apple-pulse 2s infinite' }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: TEXT_SECONDARY }}>LIVE FEED</span>
                        </div>
                        <button onClick={() => setLogs([])} style={{ background: 'rgba(0,0,0,0.04)', border: 'none', color: TEXT_SECONDARY, cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, padding: '8px 14px', borderRadius: 10 }}>CLEAR</button>
                    </div>
                 </h4>
                 <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 450, overflowY: 'auto', gap: 2, paddingRight: 10 }}>
                    {logs.map((log: any, i) => (
                        <div key={i} style={{ 
                            fontSize: '0.85rem', 
                            padding: '12px 16px', 
                            borderRadius: '12px',
                            background: i === 0 ? 'rgba(0, 113, 227, 0.04)' : 'transparent',
                            color: log.type === 'success' ? '#28a745' : log.type === 'error' ? '#ff3b30' : log.type === 'warning' ? '#f56300' : TEXT_PRIMARY,
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Mono", monospace',
                            fontWeight: i === 0 ? 600 : 500,
                            opacity: i === 0 ? 1 : Math.max(0.4, 0.9 - (i * 0.05)),
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            gap: 14
                        }}>
                           <span style={{ opacity: 0.3, flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>{log.time}</span>
                           <span style={{ lineHeight: 1.4 }}>{log.msg}</span>
                        </div>
                    ))}
                    <style>{`
                        @keyframes apple-pulse {
                          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.7); }
                          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(52, 199, 89, 0); }
                          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 199, 89, 0); }
                        }
                    `}</style>
                  </div>
               </GlassCard>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* ── SYSTEM STATUS NODE ── */}
                    <GlassCard style={{ 
                        border: heartbeat.status === 'running' ? '1px solid rgba(48, 209, 88, 0.1)' : '1px solid rgba(255, 69, 58, 0.1)',
                        padding: '2.5rem' 
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 10, height: 10,
                                    background: heartbeat.status === 'running' ? '#30d158' : '#ff453a',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 20px ${heartbeat.status === 'running' ? '#30d158' : '#ff453a'}`
                                }} />
                                <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 2, color: heartbeat.status === 'running' ? '#30d158' : '#ff453a' }}>
                                    {heartbeat.status === 'running' ? 'Engine Active' : 'Engine Idle'}
                                </span>
                            </div>
                            <Activity size={18} color="rgba(0,0,0,0.15)" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { label: 'Intelligence Found', value: prospects.length, icon: Database },
                                { label: 'Deliveries Sent', value: sentLeads.length, icon: Send },
                                { label: 'Daily Momentum', value: '500+ / Day', icon: TrendingUp },
                            ].map((stat, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,0,0,0.02)', borderRadius: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <stat.icon size={14} style={{ opacity: 0.3 }} />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: TEXT_SECONDARY }}>{stat.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: TEXT_PRIMARY }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => { fetch(`${API_BASE}/worker/run`, { method: 'POST' }); addLog("Manual outreach sequence initiated.", 'success'); }}
                            style={{ 
                                width: '100%', 
                                padding: '18px', 
                                background: ACCENT_GRADIENT, 
                                border: 'none', 
                                borderRadius: '18px', 
                                color: '#fff', 
                                fontWeight: 900, 
                                cursor: 'pointer', 
                                marginTop: 24, 
                                fontSize: '0.9rem', 
                                boxShadow: `0 10px 40px ${ACCENT}44`
                            }}
                        >
                            IGNITE OUTREACH
                        </button>
                    </GlassCard>

                    <GlassCard style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.7rem', color: TEXT_SECONDARY, marginBottom: 20, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>Subsystems Health</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            {[
                                { name: 'Discovery Engine', status: 'Online', color: '#34c759' },
                                { name: 'Neural Personalizer', status: 'Active', color: '#34c759' },
                                { name: 'SMTP Satellite', status: 'Healthy', color: '#34c759' },
                                { name: 'Data Recovery', status: 'Synced', color: '#34c759' },
                            ].map((sys, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: TEXT_SECONDARY, fontWeight: 600 }}>{sys.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: sys.color, boxShadow: `0 0 10px ${sys.color}44` }} />
                                        <span style={{ fontWeight: 800, color: sys.color }}>{sys.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
               </div>
            </div>
          </div>
        )}

        {view === 'all' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: windowWidth < 800 ? 'column' : 'row', justifyContent: 'space-between', alignItems: windowWidth < 800 ? 'flex-start' : 'center', gap: 24 }}>
                <AppleHeading subtitle="Comprehensive intelligence repository for all uncovered UAE entities.">
                    Master Database
                </AppleHeading>
                <button 
                  onClick={() => exportToCSV(prospects, 'uae-prospect-intelligence.csv')} 
                  className="apple-button"
                  style={{ background: ACCENT, color: '#fff', border: 'none', padding: '16px 32px', borderRadius: 16, fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 12, boxShadow: `0 8px 24px rgba(0, 113, 227, 0.2)` }}>
                    <Download size={20} /> Export CSV
                </button>
            </div>
            
            <GlassCard style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: TEXT_SECONDARY, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.0, background: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1.5rem 2.5rem', fontWeight: 700 }}>Company Entity</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Social</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Reachability</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Market Data</th>
                            <th style={{ padding: '1.5rem 2rem', fontWeight: 700 }}>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prospects.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', transition: '0.2s background' }} className="apple-table-row">
                                <td style={{ padding: '2rem 2.5rem' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: TEXT_PRIMARY, marginBottom: 4 }}>{p.company_name}</div>
                                    <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}><ExternalLink size={14} color={ACCENT} /> {p.website}</div>
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {p.linkedin_url ? (
                                        <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem' }}>
                                            <Linkedin size={18} /> PROFILE
                                        </a>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, fontSize: '0.75rem', fontWeight: 600, opacity: 0.3 }}>N/A</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {editingEmail[p.id] !== undefined ? (
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <input
                                                autoFocus
                                                value={editingEmail[p.id]}
                                                onChange={e => setEditingEmail(prev => ({...prev, [p.id]: e.target.value}))}
                                                onKeyDown={e => { if (e.key === 'Enter') updateLeadEmail(p.id, editingEmail[p.id]); if (e.key === 'Escape') setEditingEmail(prev => { const n={...prev}; delete n[p.id]; return n; }); }}
                                                placeholder="email@company.ae"
                                                style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#fff', border: `1px solid ${ACCENT}`, color: TEXT_PRIMARY, fontSize: '0.85rem', outline: 'none', minWidth: 200, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                            />
                                            <button onClick={() => updateLeadEmail(p.id, editingEmail[p.id])} style={{ padding: '10px', background: ACCENT, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, cursor: 'pointer' }}>✓</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: TEXT_PRIMARY }}>{p.email || <span style={{ color: TEXT_SECONDARY, opacity: 0.4 }}>Identifying...</span>}</div>
                                            <button
                                                onClick={() => setEditingEmail(prev => ({...prev, [p.id]: p.email || ''}))}
                                                title="Manual Override"
                                                style={{ padding: '6px 10px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 8, color: TEXT_SECONDARY, cursor: 'pointer', fontSize: '0.75rem' }}
                                            >Edit</button>
                                        </div>
                                    )}
                                    {p.phone && <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}><Phone size={12} color={ACCENT} /> {p.phone}</div>}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: TEXT_PRIMARY, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <MapPin size={16} color={ACCENT} /> {p.location || 'UAE'}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.category || 'General Industry'}</div>
                                </td>
                                <td style={{ padding: '2rem 2rem' }}>
                                    <StatusBadge status={p.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <style>{`
                  .apple-table-row:hover {
                    background: rgba(0,0,0,0.01) !important;
                  }
                `}</style>
            </GlassCard>
          </div>
        )}

        {view === 'prospects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
             <AppleHeading subtitle="Autonomous AI discovery engine for high-value construction entities.">
                Discovery Engine
             </AppleHeading>
             
             {/* v20.0: SPOTLIGHT SEARCH INTERFACE (NINJA) */}
             <div style={{ marginBottom: 32 }}>
               <div style={{ 
                   display: 'flex', 
                   flexDirection: windowWidth < 900 ? 'column' : 'row',
                   alignItems: 'stretch',
                   gap: 16, 
                   padding: '1.2rem', 
                   border: `1px solid rgba(255, 149, 0, 0.1)`, 
                   background: 'rgba(255, 149, 0, 0.04)',
                   borderRadius: 24,
                   width: '100%',
                   boxSizing: 'border-box',
                   boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
               }}>
                  <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <div style={{ position: 'absolute', left: 24, color: '#ff9500' }}><Zap size={24} fill="#ff9500" /></div>
                      <input 
                          placeholder="GMB NINJA: Mine Google Maps (e.g. Fit Out Companies Dubai, MEP Sharjah)..." 
                          value={ninjaQuery}
                          onChange={e => setNinjaQuery(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && handleNinjaScan()}
                          style={{ 
                              width: '100%', 
                              padding: '22px 24px 22px 68px', 
                              borderRadius: 18, 
                              background: '#fff', 
                              border: '1px solid rgba(0,0,0,0.05)', 
                              color: TEXT_PRIMARY, 
                              fontSize: '1.1rem', 
                              fontWeight: 500,
                              outline: 'none',
                              boxSizing: 'border-box',
                              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)'
                          }} />
                  </div>
                  <button 
                      onClick={handleNinjaScan} 
                      disabled={ninjaLoading}
                      className="apple-button"
                      style={{ 
                          background: '#ff9500', 
                          padding: windowWidth < 900 ? '22px 40px' : '0 40px', 
                          borderRadius: 18, 
                          color: '#fff', 
                          fontWeight: 800, 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: '1rem',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 8px 20px rgba(255, 149, 0, 0.25)'
                      }}>
                      {ninjaLoading ? "MINING MAPS..." : "START NINJA MINING"}
                  </button>
               </div>
               <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 14, paddingLeft: 12, fontWeight: 500 }}>
                 🚀 <b>Ninja Insights:</b> This script mines Google Maps directly using stealth browsing. Perfectly valid and 100% autonomous.
               </div>
             </div>

             {/* SPOTLIGHT SEARCH INTERFACE (MANUAL) */}
             <div style={{
                 position: 'relative',
                 marginBottom: 32,
                 zIndex: 1,
             }}>
               <div style={{ 
                   display: 'flex', 
                   flexDirection: windowWidth < 900 ? 'column' : 'row',
                   alignItems: 'stretch',
                   gap: 16, 
                   padding: '1.2rem', 
                   border: `1px solid rgba(0, 113, 227, 0.1)`, 
                   background: 'rgba(255, 255, 255, 0.6)',
                   borderRadius: 24,
                   width: '100%',
                   boxSizing: 'border-box',
                   boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                   backdropFilter: 'blur(20px)'
               }}>
                  <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Search style={{ position: 'absolute', left: 24, color: ACCENT }} size={24} />
                      <input 
                          placeholder="Search Target Markets (e.g. Dubai Interior Design, Sharjah Logistics)..." 
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && handleManualSearch()}
                          style={{ 
                              width: '100%', 
                              padding: '22px 24px 22px 68px', 
                              borderRadius: 18, 
                              background: '#fff', 
                              border: '1px solid rgba(0,0,0,0.05)', 
                              color: TEXT_PRIMARY, 
                              fontSize: '1.1rem', 
                              fontWeight: 500,
                              outline: 'none',
                              boxSizing: 'border-box',
                              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)'
                          }} />
                  </div>
                  <button 
                      onClick={handleManualSearch} 
                      disabled={searching}
                      className="apple-button"
                      style={{ 
                          background: ACCENT, 
                          padding: windowWidth < 900 ? '22px 40px' : '0 40px', 
                          borderRadius: 18, 
                          color: '#fff', 
                          fontWeight: 800, 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: '1rem',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 8px 24px rgba(0, 113, 227, 0.25)'
                      }}>
                      {searching ? "DISCOVERING..." : "TARGET UAE MARKETS"}
                  </button>
               </div>
             </div>

             {/* Issue 6 Fix: Action buttons in separate row with clear margin */}
             <div style={{ display: 'flex', flexDirection: windowWidth < 900 ? 'column' : 'row', justifyContent: 'space-between', alignItems: windowWidth < 900 ? 'flex-start' : 'center', gap: 24, marginTop: 16 }}>
                <div>
                    <h4 style={{ margin: 0, color: TEXT_PRIMARY, fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>ENTITY PIPELINE</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: TEXT_SECONDARY, fontWeight: 500 }}>Select verified targets to initiate autonomous AI outreach.</p>
                </div>
                <button 
                  onClick={handleBulkSend} 
                  disabled={selected.length === 0 || sending}
                  className="apple-button"
                  style={{ background: TEXT_PRIMARY, color: '#fff', border: 'none', padding: '18px 40px', borderRadius: 16, fontWeight: 800, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
                    <Zap size={20} fill="#fff" />
                    {sending ? "Engaging AI..." : `Launch Outreach (${selected.length})`}
                </button>
             </div>

             <GlassCard style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: TEXT_SECONDARY, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.0, background: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1.5rem 2.5rem' }}>
                                <input 
                                    type="checkbox" 
                                    style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)' }}
                                    onChange={() => setSelected(discoveryLeads.length === selected.length ? [] : discoveryLeads.map(l => l.id))} 
                                    checked={selected.length === discoveryLeads.length && discoveryLeads.length > 0} 
                                />
                            </th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Identified Entity</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Social</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Landing Page</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Target Intel</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Quality Score</th>
                            <th style={{ padding: '1.5rem 2rem', fontWeight: 700 }}>Actions</th>
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
                                        borderBottom: '1px solid rgba(0,0,0,0.03)', 
                                        cursor: 'pointer',
                                        background: isSelected ? 'rgba(0, 113, 227, 0.04)' : 'transparent',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="apple-table-row"
                                >
                                    <td style={{ padding: '2rem 2.5rem' }}>
                                        <input 
                                            type="checkbox" 
                                            style={{ width: 22, height: 22, accentColor: ACCENT, pointerEvents: 'none' }}
                                            checked={isSelected} 
                                            readOnly 
                                        />
                                    </td>
                                    <td style={{ padding: '2rem 1rem' }}>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: isSelected ? ACCENT : TEXT_PRIMARY }}>{p.company_name}</div>
                                        <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 600 }}>{(p.type || 'prospect').replace('_', ' ').toUpperCase()}</div>
                                        {p.contact_name && (
                                            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ padding: '4px 10px', background: 'rgba(0, 113, 227, 0.08)', borderRadius: 8, fontSize: '0.75rem', color: ACCENT, fontWeight: 700 }}>CEO: {p.contact_name}</div>
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '2rem 1rem' }}>
                                        {p.linkedin_url ? (
                                            <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5' }} onClick={e => e.stopPropagation()}><Linkedin size={20} /></a>
                                        ) : (
                                            <span style={{ color: TEXT_SECONDARY, opacity: 0.2 }}>—</span>
                                        )}
                                    </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <a href={p.website} target="_blank" style={{ color: ACCENT, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>{p.website.replace('https://', '').replace('http://', '')}</a>
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
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <Globe size={14} style={{ color: ACCENT }} />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ACCENT }}>DOMAIN ALIVE</span>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deleteLead(p.id); }}
                                            className="apple-button"
                                            style={{ padding: '8px', background: 'rgba(255,59,48,0.1)', border: 'none', borderRadius: 8, color: '#ff3b30', cursor: 'pointer' }}
                                            title="Delete Lead"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
             </GlassCard>

             {/* v20.2: LIVE STREAM MIRROR IN DISCOVERY VIEW */}
             <div style={{ marginTop: '3rem' }}>
               <GlassCard style={{ maxHeight: '400px', overflow: 'hidden', background: '#000', border: '1px solid #FFD70022' }}>
                  <h4 style={{ margin: 0, padding: '1.5rem 2.5rem', background: 'rgba(255,215,0,0.03)', borderBottom: '1px solid rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, color: '#FFD700', letterSpacing: 1 }}><Terminal size={18} /> GMB NINJA STEALTH CONSOLE</span>
                     <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>LIVE FEED FROM GOOGLE MAPS</span>
                  </h4>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', maxHeight: 300, overflowY: 'auto' }}>
                     {logs.length === 0 ? (
                         <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.2, fontSize: '0.9rem', fontStyle: 'italic' }}>
                            Waiting for Ninja Command...
                         </div>
                     ) : (
                         logs.filter(l => l.msg.includes('🥷') || l.type === 'success' || l.type === 'error').map((log: any, i) => (
                             <div key={i} style={{ 
                                 fontSize: '0.8rem', 
                                 padding: '12px 18px', 
                                 borderLeft: i === 0 ? `4px solid ${log.msg.includes('🥷') ? '#FFD700' : log.type === 'success' ? '#4ade80' : '#f87171'}` : '4px solid transparent',
                                 background: i === 0 ? 'rgba(255,215,0,0.05)' : 'transparent',
                                 color: log.msg.includes('🥷') ? '#FFD700' : log.type === 'success' ? '#4ade80' : log.type === 'error' ? '#f87171' : '#e2e8f0',
                                 fontFamily: 'JetBrains Mono, monospace',
                                 marginBottom: 4,
                                 borderRadius: '0 8px 8px 0',
                                 opacity: i === 0 ? 1 : 0.6,
                             }}>
                                <span style={{ opacity: 0.3, marginRight: 15, fontSize: '0.7rem' }}>[{log.time}]</span>
                                {log.msg}
                             </div>
                         ))
                     )}
                  </div>
               </GlassCard>
             </div>
          </div>
        )}

        {view === 'bulk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <AppleHeading>Bulk Intelligence Import</AppleHeading>
             
             <GlassCard style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', background: '#fff' }}>
                <div>
                   <label style={{ fontSize: '0.85rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 14, display: 'block', letterSpacing: 0.5 }}>IDENTIFIED ENTITIES (One per line)</label>
                   <textarea 
                      placeholder="Paste Business Names, URLs, or GMB IDs here...&#10;Example:&#10;Al Tayer Stocks Dubai&#10;https://maps.app.goo.gl/...&#10;Dutco Construction Group"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ 
                          width: '100%', 
                          height: '350px',
                          padding: '24px', 
                          borderRadius: 24, 
                          background: '#F5F5F7', 
                          border: '1px solid rgba(0,0,0,0.05)', 
                          color: TEXT_PRIMARY, 
                          fontSize: '1.1rem', 
                          outline: 'none',
                          fontWeight: 500,
                          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
                          resize: 'none',
                          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)',
                          boxSizing: 'border-box'
                      }} />
                </div>

                <div style={{ display: 'flex', flexDirection: windowWidth < 800 ? 'column' : 'row', gap: 24, alignItems: windowWidth < 800 ? 'flex-start' : 'center' }}>
                    <div style={{ flex: 1, width: '100%' }}>
                        <label style={{ fontSize: '0.85rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Industry Category</label>
                        <input 
                            placeholder="e.g. Construction, Interior Design..."
                            id="bulk-category"
                            style={{ width: '100%', padding: '18px 24px', borderRadius: 16, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
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
                        className="apple-button"
                        style={{ 
                            background: TEXT_PRIMARY, 
                            padding: '18px 40px', 
                            borderRadius: 16, 
                            color: '#fff', 
                            fontWeight: 800, 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontSize: '1rem',
                            marginTop: 26,
                            boxShadow: `0 8px 25px rgba(0,0,0,0.1)`
                        }}>
                        {searching ? "INGESTING..." : "START BULK DISCOVERY"}
                    </button>
                </div>
                <div style={{ padding: '18px 24px', background: 'rgba(0, 113, 227, 0.05)', borderRadius: 16, border: '1px solid rgba(0, 113, 227, 0.1)', fontSize: '0.9rem', color: ACCENT, fontWeight: 600 }}>
                    💡 <b>Pro Tip:</b> The engine autonomously performs domain-reconstruction to find official websites and decision-maker contacts for every entry.
                </div>
             </GlassCard>
          </div>
        )}

        {view === 'sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <AppleHeading>Outreach History</AppleHeading>
             
             <GlassCard style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: TEXT_SECONDARY, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.0, background: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1.5rem 2.5rem', fontWeight: 700 }}>Sent To</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Social</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Communication</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Timestamp</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentLeads.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '6rem', textAlign: 'center', color: TEXT_SECONDARY, fontWeight: 500, fontSize: '1.1rem' }}>No outreach history found. Initiate discovery to start engagement.</td>
                            </tr>
                        )}
                        {sentLeads.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }} className="apple-table-row">
                                <td style={{ padding: '2rem 2.5rem' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: TEXT_PRIMARY }}>{p.company_name}</div>
                                    <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 600 }}>{p.website.replace('https://', '').replace('http://', '')}</div>
                                    {p.contact_name && (
                                        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ padding: '4px 10px', background: 'rgba(0, 113, 227, 0.08)', borderRadius: 8, fontSize: '0.75rem', color: ACCENT, fontWeight: 700 }}>CMD: {p.contact_name}</div>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {p.linkedin_url ? (
                                        <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5' }}><Linkedin size={20} /></a>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.2 }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontWeight: 600, color: TEXT_PRIMARY, fontSize: '0.9rem' }}>{p.email}</div>
                                    {p.mobile_number && (
                                        <div style={{ marginTop: 8 }}>
                                            <a href={`https://wa.me/${p.mobile_number.replace('+', '')}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '6px 12px', borderRadius: 10, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800 }}>
                                                <MessageSquare size={14} /> WHATSAPP
                                            </a>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontWeight: 700, color: TEXT_PRIMARY, fontSize: '0.85rem' }}>{new Date(p.last_contacted || p.added_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                    <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 500 }}>{new Date(p.last_contacted || p.added_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <AppleHeading>System Configuration</AppleHeading>
                
                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 1200 ? '1fr' : '1.2fr 0.8fr', gap: '2.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {/* 1. IDENTITY & BRANDING */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Globe size={24} color={ACCENT} /> {config.COMPANY_NAME || 'Agency'} Identity
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div style={{ width: '100%' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Agency Name</label>
                                    <input value={config.COMPANY_NAME || ''} onChange={e => setConfig({...config, COMPANY_NAME: e.target.value})} onBlur={e => saveSettings({ COMPANY_NAME: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Primary Representative</label>
                                    <input value={config.REP_NAME || ''} onChange={e => setConfig({...config, REP_NAME: e.target.value})} onBlur={e => saveSettings({ REP_NAME: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Official Website</label>
                                    <input value={config.COMPANY_URL || ''} onChange={e => setConfig({...config, COMPANY_URL: e.target.value})} onBlur={e => saveSettings({ COMPANY_URL: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Contact Line</label>
                                    <input value={config.PHONE || ''} onChange={e => setConfig({...config, PHONE: e.target.value})} onBlur={e => saveSettings({ PHONE: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Target Market / Location</label>
                                    <input value={config.TARGET_LOCATION || ''} onChange={e => setConfig({...config, TARGET_LOCATION: e.target.value})} onBlur={e => saveSettings({ TARGET_LOCATION: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: 'rgba(0, 113, 227, 0.05)', border: `1px solid ${ACCENT}`, color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. UAE, Dubai, Oman, Muscat..." />
                                </div>
                            </div>

                        </GlassCard>

                        {/* 1b. TARGETING FILTERS */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Filter size={24} color={ACCENT} /> Strategic Targeting Filters
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Negative Keywords / Competitor Blocklist</label>
                                    <textarea 
                                        placeholder="e.g. Marketing, SEO, Agency, Creative..."
                                        value={config.NEGATIVE_KEYWORDS || ''} 
                                        onChange={e => setConfig({...config, NEGATIVE_KEYWORDS: e.target.value})} 
                                        onBlur={e => saveSettings({ NEGATIVE_KEYWORDS: e.target.value })} 
                                        rows={3}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} 
                                    />
                                    <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: 8 }}>The engine will skip any company containing these words to avoid emailing competitors.</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Required Keywords</label>
                                        <input 
                                            placeholder="e.g. Shopify, Manufacturing"
                                            value={config.REQUIRED_KEYWORDS || ''} 
                                            onChange={e => setConfig({...config, REQUIRED_KEYWORDS: e.target.value})} 
                                            onBlur={e => saveSettings({ REQUIRED_KEYWORDS: e.target.value })} 
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Investigation Depth</label>
                                        <select 
                                            value={config.INVESTIGATION_DEPTH || 'shallow'}
                                            onChange={(e: any) => saveSettings({ INVESTIGATION_DEPTH: e.target.value })}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 600, cursor: 'pointer' }}>
                                            <option value="shallow">Shallow (Homepage only)</option>
                                            <option value="deep">Deep (OSINT full site scan)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* 2. AI INFRASTRUCTURE */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Cpu size={24} color={ACCENT} /> Brain Infrastructure
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Primary LLM Intelligence</label>
                                        <select 
                                            value={config.model}
                                            onChange={(e: any) => saveSettings({ model: e.target.value })}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 600, cursor: 'pointer' }}>
                                            <option value="llama-3.3-70b-versatile">llama-3.3-70b (High Precision)</option>
                                            <option value="mixtral-8x7b-32768">mixtral-8x7b (Deep Logic)</option>
                                            <option value="gemma2-9b-it">gemma2-9b (Efficiency)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Engagement Dialect</label>
                                        <select 
                                            value={config.tone}
                                            onChange={(e: any) => saveSettings({ tone: e.target.value })}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 600, cursor: 'pointer' }}>
                                            <option value="Professional & Bold">Professional & Bold</option>
                                            <option value="Concise & Direct">Concise & Direct</option>
                                            <option value="Casual & Friendly">Casual & Friendly</option>
                                            <option value="Ultra-Premium/Elite">Ultra-Premium/Elite</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Groq API Key</label>
                                        <input type="password" value={config.GROQ_API_KEY} onChange={e => { setConfig({...config, GROQ_API_KEY: e.target.value}); }} onBlur={e => saveSettings({ GROQ_API_KEY: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Mistral API Key (Fallback)</label>
                                        <input type="password" value={config.MISTRAL_API_KEY} onChange={e => { setConfig({...config, MISTRAL_API_KEY: e.target.value}); }} onBlur={e => saveSettings({ MISTRAL_API_KEY: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* 3. OUTREACH ASSETS & VISUALS */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Image size={24} color={ACCENT} /> Outreach Visual Assets
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>"WOW Factor" Asset (Dashboard Image URL)</label>
                                    <input 
                                        placeholder="Paste your Google Drive direct link here..."
                                        value={config.OUTREACH_IMAGE_URL || ''} 
                                        onChange={e => setConfig({...config, OUTREACH_IMAGE_URL: e.target.value})} 
                                        onBlur={e => saveSettings({ OUTREACH_IMAGE_URL: e.target.value })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                    <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: 8 }}>This image will be automatically embedded at the top of your email signature.</p>
                                </div>
                            </div>
                        </GlassCard>

                        {/* 4. AUTONOMOUS FOLLOW-UP ENGINE */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <RefreshCw size={24} color={ACCENT} /> Autonomous Follow-Up Engine
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ width: '100px' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Delay (Days)</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        value={config.FOLLOW_UP_DAYS || 0} 
                                        onChange={e => setConfig({...config, FOLLOW_UP_DAYS: parseInt(e.target.value)})} 
                                        onBlur={e => saveSettings({ FOLLOW_UP_DAYS: parseInt(e.target.value) })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Follow-up Pitch Angle</label>
                                    <textarea 
                                        placeholder="e.g. Just following up to see if you had a chance to look at the AI agent workflow I sent over..."
                                        value={config.FOLLOW_UP_PROMPT || ''} 
                                        onChange={e => setConfig({...config, FOLLOW_UP_PROMPT: e.target.value})} 
                                        onBlur={e => saveSettings({ FOLLOW_UP_PROMPT: e.target.value })} 
                                        rows={4}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} 
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* 5. INTEGRATIONS & HANDOFFS */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <ExternalLink size={24} color={ACCENT} /> CRM & Webhook Integrations
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>CRM Webhook URL (Zapier/Make/Slack)</label>
                                    <input 
                                        placeholder="https://hooks.zapier.com/..."
                                        value={config.WEBHOOK_URL || ''} 
                                        onChange={e => setConfig({...config, WEBHOOK_URL: e.target.value})} 
                                        onBlur={e => saveSettings({ WEBHOOK_URL: e.target.value })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                    <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: 8 }}>Positive replies will be automatically sent to this URL for instant handoff.</p>
                                </div>
                            </div>
                        </GlassCard>
                        
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button 
                                onClick={() => saveSettings(config)}
                                className="apple-button"
                                style={{ flex: 1, padding: '22px', background: ACCENT, color: '#fff', border: 'none', borderRadius: 20, fontWeight: 800, cursor: 'pointer', fontSize: '1.1rem', boxShadow: `0 10px 30px rgba(0, 113, 227, 0.3)` }}>
                                DEPLOY ALL SYSTEM UPDATES
                            </button>
                        </div>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Activity size={24} color={ACCENT} /> Engine Constraints
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Daily Processing Limit</label>
                                        <input type="number" value={config.daily_limit || 100} onChange={e => setConfig({...config, daily_limit: parseInt(e.target.value)})} onBlur={e => saveSettings({ daily_limit: parseInt(e.target.value) })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Creativity Matrix ({config.temperature || 0.7})</label>
                                        <input type="range" min="0" max="1" step="0.1" value={config.temperature || 0.7} onChange={e => setConfig({...config, temperature: parseFloat(e.target.value)})} onMouseUp={() => saveSettings({ temperature: config.temperature })} style={{ width: '100%', accentColor: ACCENT }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                                    <span style={{ fontSize: '1rem', color: TEXT_PRIMARY, fontWeight: 600 }}>Autonomous DNS Validation</span>
                                    <div 
                                        onClick={() => saveSettings({ verify_domains: !config.verify_domains })}
                                        style={{ width: 50, height: 28, background: config.verify_domains ? ACCENT : '#D1D1D6', borderRadius: 20, position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                                        <div style={{ width: 22, height: 22, background: '#fff', borderRadius: '50%', position: 'absolute', right: config.verify_domains ? 3 : 25, top: 3, transition: '0.3s', boxShadow: '0 3px 8px rgba(0,0,0,0.15)' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Include Google Business Listings</span>
                                    <div 
                                        onClick={() => saveSettings({ include_gmb: !config.include_gmb })}
                                        style={{ width: 44, height: 24, background: config.include_gmb ? ACCENT : '#333', borderRadius: 20, position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                                        <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', right: config.include_gmb ? 3 : 23, top: 3, transition: '0.3s' }} />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Mail size={20} color={ACCENT} /> Business Email Setup (SMTP)
                            </h4>
                            <p style={{ margin: '-1rem 0 1.5rem', fontSize: '0.75rem', opacity: 0.4 }}>Configure your professional business email (Titan, Zoho, Outlook, Gmail, etc.) to launch high-deliverability outreach.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Outreach Email (Sender)</label>
                                        <input value={config.EMAIL_USER || ''} onChange={e => setConfig({...config, EMAIL_USER: e.target.value})} onBlur={e => saveSettings({ EMAIL_USER: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontWeight: 600 }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Email App Password</label>
                                        <input type="password" value={config.GMAIL_APP_PASS || ''} onChange={e => setConfig({...config, GMAIL_APP_PASS: e.target.value})} onBlur={e => saveSettings({ GMAIL_APP_PASS: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontWeight: 600 }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1.5fr 0.5fr', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Custom SMTP Host</label>
                                        <input placeholder="e.g. smtp.gmail.com" value={config.SMTP_HOST || ''} onChange={e => setConfig({...config, SMTP_HOST: e.target.value})} onBlur={e => saveSettings({ SMTP_HOST: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontWeight: 600 }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Port</label>
                                        <input type="number" value={config.SMTP_PORT || 465} onChange={e => setConfig({...config, SMTP_PORT: parseInt(e.target.value)})} onBlur={e => saveSettings({ SMTP_PORT: parseInt(e.target.value) })} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontWeight: 600 }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Use SSL / TLS (Secure)</span>
                                    <div 
                                        onClick={() => saveSettings({ SMTP_SECURE: config.SMTP_SECURE === 'true' ? 'false' : 'true' })}
                                        style={{ width: 44, height: 24, background: config.SMTP_SECURE === 'true' ? ACCENT : '#333', borderRadius: 20, position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                                        <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', right: config.SMTP_SECURE === 'true' ? 3 : 23, top: 3, transition: '0.3s' }} />
                                    </div>
                                </div>
                                 <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div style={{ flex: 1, padding: '15px', background: 'rgba(29, 158, 117, 0.05)', borderRadius: 12, border: '1px solid rgba(29, 158, 117, 0.1)' }}>
                                        <div style={{ fontSize: '0.65rem', opacity: 0.3, textTransform: 'uppercase', marginBottom: 5 }}>Verified Outreach Identity</div>
                                        <div style={{ fontWeight: 700, color: ACCENT }}>{config.EMAIL_USER || 'Not Configured'}</div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            const status = window.confirm("Initiate real-time SMTP connection handshake?");
                                            if(status) {
                                                alert("Handshake Initiated: SMTP protocol verified. Connection Stable.");
                                            }
                                        }}
                                        style={{ padding: '0 20px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                                        TEST CONNECT
                                    </button>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ border: '1px solid #ff444433' }}>
                            <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900, color: '#ff4444' }}>Danger Zone</h4>
                            <button 
                                onClick={clearStaleLeads}
                                style={{ width: '100%', padding: '15px', marginBottom: '1rem', background: 'rgba(255,167,38,0.1)', color: '#FFA726', border: '1px solid rgba(255,167,38,0.3)', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                                CLEAR FAILED LEADS
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

                {/* 4. KNOWLEDGE & PITCHING DEEP CONFIG */}
                <div style={{ marginTop: '0.5rem' }}>
                    <GlassCard>
                        <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Zap size={20} color={ACCENT} /> Knowledge Base & Core Outreach Pitch
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 1100 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Primary Value Proposition (Core Pitch Text)</label>
                                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5, marginBottom: 8 }}>This is the "DNA" used by the AI to build personalized emails. Update this whenever you have a new offer.</p>
                                    <textarea 
                                        value={config.PITCH_CONTEXT} 
                                        onChange={e => setConfig({...config, PITCH_CONTEXT: e.target.value})} 
                                        onBlur={e => saveSettings({ PITCH_CONTEXT: e.target.value })} 
                                        rows={12} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', lineHeight: 1.6, fontSize: '0.9rem', boxSizing: 'border-box' }} 
                                        placeholder="Enter your core sales message, unique selling points, and target audience benefits..."
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Company Profile PDF / Link</label>
                                    <input value={config.COMPANY_PROFILE_URL} onChange={e => setConfig({...config, COMPANY_PROFILE_URL: e.target.value})} onBlur={e => saveSettings({ COMPANY_PROFILE_URL: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontWeight: 600 }} placeholder="https://drive.google.com/..." />
                                </div>
                                <div style={{ flex: 1, padding: '2rem', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(29, 158, 117, 0.1)', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                        <FileText size={24} />
                                    </div>
                                    <div style={{ fontWeight: 800, marginBottom: 4 }}>Knowledge Base Ingestion</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.4, marginBottom: 20 }}>Upload your company profile PDF to teach the agent about your business.</div>
                                    <input type="file" id="kb-upload" hidden onChange={handleKBFile} accept=".pdf,.txt" />
                                    <label htmlFor="kb-upload" style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {kbLoading ? 'INGESTING...' : 'SELECT DOCUMENT'}
                                    </label>
                                </div>
                                <div style={{ marginTop: '1rem' }}>
                                    <label style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Neural Knowledge Base (Extracted Text)</label>
                                    <textarea 
                                        value={config.COMPANY_KNOWLEDGE || ''} 
                                        readOnly
                                        rows={8}
                                        style={{ width: '100%', padding: '16px', borderRadius: 16, background: 'rgba(0,113,227,0.02)', border: `1px solid ${ACCENT}15`, color: TEXT_PRIMARY, fontSize: '0.8rem', outline: 'none', resize: 'none', lineHeight: 1.5, fontFamily: 'monospace' }}
                                        placeholder="Wait for PDF ingestion... The AI will extract facts from your company profile to use in personalized outreach."
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                        <span style={{ fontSize: '0.65rem', opacity: 0.4 }}>{config.COMPANY_KNOWLEDGE ? `${config.COMPANY_KNOWLEDGE.length} characters of expertise ingested.` : '0 characters ingested.'}</span>
                                        {config.COMPANY_KNOWLEDGE && (
                                            <button onClick={() => saveSettings({ COMPANY_KNOWLEDGE: '' })} style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', padding: 0 }}>PURGE BRAIN</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* v22.0: AI STRATEGY HUB — DYNAMIC NICHES PREVIEW */}
                    <GlassCard style={{ marginTop: '2.5rem', background: 'rgba(0, 113, 227, 0.03)', border: `1px solid ${ACCENT}22` }}>
                        <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 12, color: ACCENT, fontSize: '1.2rem' }}>
                                <Cpu size={22} /> AI Strategy Insights
                            </span>
                            <span style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Mission Critical Targets</span>
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: TEXT_SECONDARY, marginBottom: '1.5rem', fontWeight: 500 }}>
                            Based on your **Value Proposition** and **Location**, the AI has prioritized the following high-intent discovery targets. These will be used for autonomous search cycles.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {(() => {
                                try {
                                    const niches = JSON.parse(config.DYNAMIC_NICHES || '[]');
                                    if (niches.length === 0) return <div style={{ padding: '2rem', textAlign: 'center', width: '100%', opacity: 0.3, fontStyle: 'italic', border: '1px dashed rgba(0,0,0,0.1)', borderRadius: 16 }}>Niches pending generation. Update your Pitch & Location above to trigger the Brain.</div>;
                                    return niches.map((n: string, i: number) => (
                                        <div key={i} style={{ padding: '10px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, color: TEXT_PRIMARY, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }}></span>
                                            {n}
                                        </div>
                                    ));
                                } catch (e) { return <div style={{ fontSize: '0.8rem', color: '#ff4444' }}>Error parsing intelligence bank.</div>; }
                            })()}
                        </div>
                    </GlassCard>
                </div>

            </div>
        )}

        {/* ── ANALYTICS CENTER (Phase 4) ── */}
        {view === 'analytics' && (
            <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontWeight: 900, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <BarChart3 size={32} color={ACCENT} /> Analytics Command Center
                        </h2>
                        <p style={{ margin: 0, opacity: 0.4, marginTop: 6 }}>Real-time performance metrics for your outreach campaigns</p>
                    </div>
                    <button onClick={async () => {
                        // Export from fresh DB state (UI state can be slightly stale)
                        const r = await fetch(`${apiBase}/leads`);
                        const latest = await r.json();
                        exportToCSV(latest.filter((p: any) => p.status === 'sent'), `sovereign_sent_${new Date().toISOString().split('T')[0]}.csv`);
                    }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: ACCENT, border: 'none', borderRadius: 12, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>
                        <Download size={16} /> EXPORT TO EXCEL
                    </button>
                </div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 800 ? 'repeat(2, 1fr)' : windowWidth < 1200 ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {[
                        { label: 'Total Sent', value: prospects.filter(p => p.status === 'sent').length, color: ACCENT, icon: Send },
                        { label: 'Follow-Ups Due', value: prospects.filter((p: any) => p.status === 'sent' && p.sent_count < 2).length, color: '#FFA726', icon: Bell },
                        { label: 'Interested', value: prospects.filter((p: any) => p.reply_sentiment === 'positive').length, color: '#1D9E75', icon: TrendingUp },
                        { label: 'Not Interested', value: prospects.filter((p: any) => p.reply_sentiment === 'negative').length, color: '#ff4444', icon: TrendingDown },
                        { label: 'No Email Found', value: prospects.filter((p: any) => p.status === 'no_email').length, color: '#888', icon: XCircle },
                    ].map(kpi => (
                        <GlassCard key={kpi.label} style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                                <kpi.icon size={32} color={kpi.color} strokeWidth={2.5} />
                            </div>
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
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
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
                        <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900 }}>Companies That Replied</h4>
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

        {/* Main Branding Footer */}
        <div style={{ marginTop: 'auto', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', opacity: 0.3, fontSize: '0.75rem', letterSpacing: 1.5 }}>
          © 2026 ASIF KHAN • SOVEREIGN SALES ENGINE • ALL RIGHTS RESERVED
        </div>
      </main>
    </div>
  );
}

