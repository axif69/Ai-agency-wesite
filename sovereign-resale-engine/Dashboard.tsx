import React, { useState, useEffect } from "react";
import { 
  Users, Send, MessageSquare, Activity, 
  LayoutDashboard, Zap, History, Settings, 
  Search, Eye, CheckCircle, RotateCcw, Target,
  ArrowUpRight, Clock, ShieldCheck, Mail,
  Check, X, FileText, BarChart3, Download,
  ExternalLink, Filter, Trash2, Database, Sliders,
  Cpu, Terminal, HelpCircle, Info, MapPin, Phone,
  ChevronRight, Globe, AlertTriangle, Linkedin,
  TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, RefreshCw,
  Bell, XCircle, Activity as ActivityIcon, Image, Shield, User, Key
} from 'lucide-react';
import { websiteHostname } from './contact_validation';
const whatsappUrl = (phone: string) => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.length >= 7 ? `https://wa.me/${digits}` : null;
};

// ── [OFFICIAL ASIF DIGITAL AD MONOGRAM LOGO SVG] ──
const AdLogoIcon = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))', flexShrink: 0 }}>
    <circle cx="100" cy="100" r="96" fill="#000000" stroke="#333333" strokeWidth="4" />
    {/* Stylized Geometric 'A' */}
    <path d="M100 30 L32 170 H64 L78 135 H100 Z M76 102 L100 48 V102 Z" fill="#FFFFFF" />
    <path d="M78 135 H100 V170 H64 Z" fill="#FFFFFF" />
    {/* Stylized Geometric 'D' */}
    <path d="M106 30 H142 C172 30 192 56 192 100 C192 144 172 170 142 170 H106 V30 Z M134 140 C154 140 164 124 164 100 C164 76 154 60 134 60 H130 V140 H134 Z" fill="#FFFFFF" />
  </svg>
);

// Dynamic API discovery handled inside the component
let API_BASE = ""; 
const LICENSE_SERVER_URL = "https://young-band-43c3.iautomationdevelopement.workers.dev";
// ── [APPLE SILVER SYSTEM TOKENS] ──
const ACCENT = "#0071E3";
const ACCENT_GRADIENT = "linear-gradient(135deg, #0071E3 0%, #00d2ff 100%)";
const APPLE_GRAY = "#F5F5F7";
const TEXT_PRIMARY = "#000000";
const TEXT_SECONDARY = "#86868B";

const parseJsonList = (value: unknown): any[] => {
  try {
    const parsed = JSON.parse(String(value || '[]'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const isMeaningfulDraftFact = (item: any): boolean => {
  const fact = String(item?.fact || '').toLowerCase();
  const source = String(item?.source_url || '');
  if (!fact || !/^https?:\/\//i.test(source)) return false;
  if (/call now|know more|read more|contact us|best health care|comprehensive|empowers|critical work|©|®/.test(fact)) return false;
  return /\b(sells?|provides?|serves?|speciali[sz]es?|integrat|manufactur|distribut|logistics?|software|platform|solution|hospital|clinic|facility|project|industry|market|customer|client|stakeholder|reduce|reducing|forecast|inventory|labor|food|costs?|profitability|margins?|restaurant|erp|operational efficiency)\b/.test(fact);
};

const GlassCard = ({ children, style = {}, className = "" }: any) => (
  <div className={`apple-card ${className}`} style={{
    position: 'relative',
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    ...style
  }}>
    {children}
  </div>
);

const getValidLinkedInUrl = (url: any): string | null => {
  if (!url) return null;
  const s = String(url).trim();
  if (!s || s === 'null' || s === 'undefined' || s === 'N/A' || s.includes('unavailable')) return null;
  if (s.includes('linkedin.com/in/') || s.includes('linkedin.com/company/')) {
    return s.startsWith('http') ? s : `https://${s}`;
  }
  return null;
};

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
      background: 'radial-gradient(circle at 20% 30%, rgba(0, 113, 227, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.05) 0%, transparent 50%)',
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
        background-color: ${APPLE_GRAY};
      }
      .apple-card:hover {
        transform: translateY(-2px) scale(1.01);
        border-color: rgba(0, 240, 255, 0.3) !important;
        box-shadow: 0 25px 50px rgba(0, 113, 227, 0.15) !important;
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

const AppleHeading = ({ children, subtitle, align = 'left', action }: { children: React.ReactNode; subtitle?: React.ReactNode; align?: 'left'|'center'; action?: React.ReactNode }) => (
  <div style={{ marginBottom: '3.5rem', textAlign: align, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
    <div>
      <h2 style={{ 
        margin: 0, 
        fontSize: '4.2rem', 
        fontWeight: 800, 
        letterSpacing: '-0.04em',
        color: TEXT_PRIMARY,
        lineHeight: 1.05
      }}>{children}</h2>
      {subtitle && (typeof subtitle === 'string' ? <p style={{ 
        fontSize: '1.25rem', 
        color: TEXT_SECONDARY, 
        margin: '10px 0 0 0',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        maxWidth: 720
      }}>{subtitle}</p> : <div style={{ fontSize: '1.25rem', color: TEXT_SECONDARY, margin: '10px 0 0 0', fontWeight: 500, maxWidth: 720 }}>{subtitle}</div>)}
    </div>
    {action && <div style={{ marginTop: 12 }}>{action}</div>}
  </div>
);
const StatusBadge = ({ status, sentiment }: { status: string; sentiment?: string }) => {
    const s = (status || '').toLowerCase();
    let bg = 'rgba(0, 0, 0, 0.03)';
    let color = TEXT_SECONDARY;
    let label = status.toUpperCase();

    if (s === 'sent' || s === 'legacy_sent') { bg = "rgba(255, 159, 10, 0.12)"; color = '#c65d00'; label = 'SENT (NO RECEIPT)'; }
    if (s === 'smtp_accepted') { bg = "rgba(52, 199, 89, 0.12)"; color = '#28a745'; label = 'SMTP ACCEPTED'; }
    if (s === 'smtp_rejected') { bg = 'rgba(255, 59, 48, 0.12)'; color = '#ff3b30'; label = 'SMTP REJECTED'; }
    if (s === 'send_error') { bg = 'rgba(255, 59, 48, 0.12)'; color = '#ff3b30'; label = 'SEND ERROR'; }
    if (s === 'followed_up') { bg = 'rgba(0, 113, 227, 0.12)'; color = ACCENT; label = 'FOLLOW-UP RECORDED'; }
    if (s === 'ready' || s === 'priority_ready' || s === 'queued') { bg = 'rgba(0, 113, 227, 0.12)'; color = ACCENT; label = 'QUEUED'; }
    if (s === 'blocked_by_safety_mode') { bg = 'rgba(255, 159, 10, 0.12)'; color = '#c65d00'; label = 'BLOCKED BY SAFETY MODE'; }
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
  const fallbackApiBases = [
    typeof window !== 'undefined' && window.location.origin ? `${window.location.origin}/api` : '/api',
    'http://127.0.0.1:3010/api',
    'http://localhost:3010/api',
    'http://127.0.0.1:3006/api',
    'http://localhost:3006/api'
  ];
  const [apiBase, setApiBase] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && window.location.protocol.startsWith('http')) {
      return `${window.location.origin}/api`;
    }
    const savedBase = localStorage.getItem('SOVEREIGN_API_BASE');
    return savedBase || 'http://127.0.0.1:3010/api';
  });
  const [view, setView] = useState<'dashboard' | 'all' | 'contacts' | 'prospects' | 'bulk' | 'sent' | 'settings' | 'analytics' | 'replies'>("dashboard");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  
  // v22.5: Quantum Bridge — Keep global Ref in sync with State
  API_BASE = apiBase || "";
  if (apiBase) {
    const port = apiBase.match(/:(\d+)/)?.[1];
    if (port) {
      localStorage.setItem('SOVEREIGN_API_PORT', port);
      localStorage.setItem('SOVEREIGN_API_BASE', apiBase);
    }
  }

  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [introFadingOut, setIntroFadingOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroFadingOut(true), 2400);
    const timer2 = setTimeout(() => setShowIntroScreen(false), 3200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const [prospects, setProspects] = useState<any[]>([]);
  const [autoStats, setAutoStats] = useState<any>({
    enabled: false,
    totalQualified: 0,
    sentToday: 0,
    totalSent: 0,
    heldForReview: 0,
    failed: 0,
    dailyCap: 150,
    speed: 'standard'
  });
  const [contacts, setContacts] = useState<any[]>([]);
  const [license, setLicense] = useState<any>({ activated: false, status: 'inactive' });
  const [activationKey, setActivationKey] = useState('');
  const [licenseHolder, setLicenseHolder] = useState('');
  const [showAllInsights, setShowAllInsights] = useState(false);
  const [discoveryMode, setDiscoveryMode] = useState<'web' | 'maps'>('web');
  const [searchDepth, setSearchDepth] = useState<'fast' | 'deep'>('fast');
  const [showDiscoveryConsole, setShowDiscoveryConsole] = useState(false);
  const [discoveryPlan, setDiscoveryPlan] = useState<string[]>([]);
  const [discoveryPlanRanked, setDiscoveryPlanRanked] = useState<{ query: string; score: number; reason: string }[]>([]);
  const [discoveryPlanMeta, setDiscoveryPlanMeta] = useState<{ generated_at?: string; mode?: string; location?: string } | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [reEnrichScope, setReEnrichScope] = useState<'selected' | 'current_page' | 'no_email' | 'missing_decision_makers' | 'missing_contacts'>('selected');
  const [reEnrichReport, setReEnrichReport] = useState<any | null>(null);
  const [contactQuery, setContactQuery] = useState('');
  const [contactsVerifiedOnly, setContactsVerifiedOnly] = useState(false);
  const [contactsExecutiveOnly, setContactsExecutiveOnly] = useState(false);
  const [contactsLinkedInOnly, setContactsLinkedInOnly] = useState(false);
  const [contactsPhoneOnly, setContactsPhoneOnly] = useState(false);
  const [contactsBestPerCompany, setContactsBestPerCompany] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [activatingLicense, setActivatingLicense] = useState(false);
  const [llmTestState, setLlmTestState] = useState<{
    openrouter: { loading: boolean; message: string; ok: boolean | null; status: 'idle' | 'testing' | 'connected' | 'failed' };
    openai: { loading: boolean; message: string; ok: boolean | null; status: 'idle' | 'testing' | 'connected' | 'failed' };
    groq: { loading: boolean; message: string; ok: boolean | null; status: 'idle' | 'testing' | 'connected' | 'failed' };
    mistral: { loading: boolean; message: string; ok: boolean | null; status: 'idle' | 'testing' | 'connected' | 'failed' };
    apollo: { loading: boolean; message: string; ok: boolean | null; status: 'idle' | 'testing' | 'connected' | 'failed' };
    hunter: { loading: boolean; message: string; ok: boolean | null; status: 'idle' | 'testing' | 'connected' | 'failed' };
  }>({
    openrouter: { loading: false, message: '', ok: null, status: 'idle' },
    openai: { loading: false, message: '', ok: null, status: 'idle' },
    groq: { loading: false, message: '', ok: null, status: 'idle' },
    mistral: { loading: false, message: '', ok: null, status: 'idle' },
    apollo: { loading: false, message: '', ok: null, status: 'idle' },
    hunter: { loading: false, message: '', ok: null, status: 'idle' }
  });
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);
  const [outreachDrafts, setOutreachDrafts] = useState<any[]>([]);
  const [draftEdits, setDraftEdits] = useState<Record<number, { subject: string; text_body: string }>>({});
  const [userRole, setUserRole] = useState<'owner' | 'sales_rep'>('owner');
  const [generatingAiReply, setGeneratingAiReply] = useState<number | null>(null);
  const [sendingDigest, setSendingDigest] = useState(false);
  const [testingWhatsapp, setTestingWhatsapp] = useState(false);
  const [editingEmail, setEditingEmail] = useState<{[id: number]: string}>({});
  const [workerRunning, setWorkerRunning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [isEngineBusy, setEngineBusy] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<any>({
    update_available: false,
    latest_version: '5.1.0',
    current_version: '5.1.0',
    download_url: '',
    release_notes: ''
  });
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
    OPENROUTER_API_KEY: '',
    OPENROUTER_MODEL: 'openai/gpt-4o-mini',
    OPENAI_API_KEY: '',
    OPENAI_MODEL: 'gpt-4o-mini',
    GROQ_API_KEY: '',
    MISTRAL_API_KEY: '',
    COMPANY_URL: '',
    COMPANY_PROFILE_URL: '',
    SIGNATURE_IMAGE_URL: '',
    OUTREACH_ENABLED: 'false',
    PITCH_CONTEXT: '',
    SMTP_HOST: '',
    SMTP_PORT: '587',
    SMTP_SECURE: 'false',
    COMPANY_KNOWLEDGE: '',
    smart_auto_outreach: 'disabled',
    auto_outreach_speed: 'standard'
  });

  const mergeSettingsWithoutBlankSecrets = (prev: any, incoming: any) => {
    const sensitive = [
      'OPENROUTER_API_KEY', 'OPENAI_API_KEY', 'GROQ_API_KEY', 'MISTRAL_API_KEY',
      'GMAIL_APP_PASS', 'SMTP_PASSWORD', 'WEBHOOK_URL'
    ];
    const cleaned = { ...(incoming || {}) };
    for (const key of sensitive) {
      if (cleaned[key] === '') delete cleaned[key];
    }
    return { ...prev, ...cleaned };
  };

  const compactLabel = (label: string) => {
    const clean = String(label || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    const replacements: Record<string, string> = {
      'and': '&',
      'services': 'Svc',
      'service': 'Svc',
      'companies': 'Co.',
      'company': 'Co.',
      'consulting': 'Consult.',
      'development': 'Dev.',
      'management': 'Mgmt.',
      'administration': 'Admin.',
      'technology': 'Tech',
      'technologies': 'Tech',
      'international': 'Intl.',
      'solutions': 'Sol.',
      'providers': 'Prov.',
      'production': 'Prod.'
    };

    let short = clean
      .replace(/\b(and|services|service|companies|company|consulting|development|management|administration|technology|technologies|international|solutions|providers|production)\b/gi, (m) => replacements[m.toLowerCase()] || m)
      .replace(/\b(of|for|the|and)\b/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const words = short.split(' ');
    if (words.length > 5) short = `${words.slice(0, 4).join(' ')}...`;
    if (short.length > 34) short = `${short.slice(0, 31).trim()}...`;
    return short;
  };

  const [targetFilter, setTargetFilter] = useState<'all' | 'executives' | 'company_email' | 'has_phone' | 'awaiting'>('all');
  const [settingsTab, setSettingsTab] = useState<'identity' | 'targeting' | 'brain' | 'outreach' | 'suppression' | 'integrations' | 'system'>('identity');

  // Update browser tab title
  useEffect(() => {
    document.title = config.COMPANY_NAME ? `${config.COMPANY_NAME} | Sovereign Engine` : "Asif Digital | Sovereign Engine";
  }, [config.COMPANY_NAME]);

  useEffect(() => {
    if (!apiBase) return;
    fetch(`${apiBase}/system/check-updates`)
      .then(res => res.json())
      .then(data => {
        if (data && data.current_version) {
          setUpdateInfo(data);
        }
      })
      .catch(() => {});
  }, [apiBase]);

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth > 1024) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const discoverPort = async () => {
      const scanRange = [3010, 3003, 3011, 3012, 3013, 3014, 3015];
      for (const port of scanRange) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1200);
          const res = await fetch(`http://127.0.0.1:${port}/api/heartbeat`, { signal: controller.signal });
          clearTimeout(timeoutId);
          const heartbeat = await res.json().catch(() => null);
          const age = Number(heartbeat?.age_seconds ?? 9999);
          if (res.ok && heartbeat?.status === 'running' && age < 30) {
            const newBase = `http://127.0.0.1:${port}/api`;
            setApiBase(newBase);
            localStorage.setItem('SOVEREIGN_API_BASE', newBase);
            return true;
          }
        } catch (e) {}
      }
      // Fallback default to 3010
      const defaultBase = 'http://127.0.0.1:3010/api';
      setApiBase(defaultBase);
      localStorage.setItem('SOVEREIGN_API_BASE', defaultBase);
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
                setConfig((prev: any) => mergeSettingsWithoutBlankSecrets(prev, cleaned));
                
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
            // Quiet fallback: if the backend is still starting or one request fails,
            // keep the current UI state instead of spamming the dashboard log.
            console.warn("Failed to load settings:", e);
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

  const getApiCandidates = () =>
    Array.from(new Set([...fallbackApiBases, apiBase].filter(Boolean)));

  const rememberApiBase = (base: string) => {
    setApiBase(base);
    API_BASE = base;
    localStorage.setItem('SOVEREIGN_API_BASE', base);
    const port = base.match(/:(\d+)/)?.[1];
    if (port) localStorage.setItem('SOVEREIGN_API_PORT', port);
  };

  const resolveHealthyApiBase = async () => {
    const originBase = typeof window !== 'undefined' && window.location.origin ? `${window.location.origin}/api` : '/api';
    const candidates = Array.from(new Set([originBase, apiBase, ...fallbackApiBases].filter(Boolean)));
    for (const base of candidates) {
      try {
        const res = await fetch(`${base}/settings`);
        if (res.ok) {
          if (base !== apiBase) {
            rememberApiBase(base);
          }
          return base;
        }
      } catch {
        // try next base
      }
    }
    return apiBase || originBase;
  };

  const fetchApiWithFallback = async (path: string, init?: RequestInit) => {
    let lastError: any = null;
    for (const base of getApiCandidates()) {
      try {
        const res = await fetch(`${base}${path}`, init);
        const contentType = res.headers.get('content-type') || '';
        const looksLikeFrontendFallback = res.status === 404 && !contentType.includes('json');

        if (looksLikeFrontendFallback) {
          lastError = new Error(`No API found on ${base}.`);
          continue;
        }

        if (base !== apiBase && res.ok) {
          rememberApiBase(base);
        }
        return res;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('Backend API is unreachable.');
  };

  const changeApiPort = () => {
    const currentPort = apiBase?.match(/:(\d+)/)?.[1] || '3003';
    const nextPort = prompt("Backend API Port?", currentPort);
    if (!nextPort) return;
    const cleanPort = nextPort.trim();
    const nextBase = `http://127.0.0.1:${cleanPort}/api`;
    setApiBase(nextBase);
    API_BASE = nextBase;
    localStorage.setItem('SOVEREIGN_API_PORT', cleanPort);
    localStorage.setItem('SOVEREIGN_API_BASE', nextBase);
    localStorage.setItem('SOVEREIGN_API_PORT_MANUAL', 'true');
    addLog(`Backend API port changed to ${cleanPort}.`, 'success');
  };

  const refreshData = async () => {
    // v24.0: Polling Guard — Don't refresh if user is actively editing to prevent "reverting" UI
    if (Object.keys(editingEmail).length > 0) return;
    
    const safeJson = async <T,>(path: string, setter?: (data: T) => void) => {
      try {
        const res = await fetchApiWithFallback(path);
        if (!res.ok) return null;
        const data = await res.json();
        if (setter) setter(data);
        return data as T;
      } catch (e) {
        console.warn(`Refresh skipped for ${path}:`, e);
        return null;
      }
    };

    await safeJson<any>('/leads', (data) => {
        const list = Array.isArray(data) ? data : Array.isArray(data?.leads) ? data.leads : null;
        if (list) setProspects(list);
    });
    await safeJson<any[]>('/contacts', (data) => Array.isArray(data) && setContacts(data));
    await safeJson<any>('/license/status', (data) => data && typeof data === 'object' && setLicense(data));

    const sData = await safeJson<any>('/settings');
    if (sData && typeof sData === 'object' && !Array.isArray(sData)) {
        const activeTag = document.activeElement?.tagName;
        const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA';
        if (!isTyping) {
            setConfig((prev: any) => mergeSettingsWithoutBlankSecrets(prev, sData));
        } else {
            setConfig((prev: any) => ({ ...prev, DYNAMIC_NICHES: sData.DYNAMIC_NICHES }));
        }
    }

    await safeJson<any[]>('/analytics', (data) => Array.isArray(data) && setAnalytics(data));
    await safeJson<any[]>('/replies', (data) => Array.isArray(data) && setReplies(data));
    await safeJson<any[]>('/outreach-drafts', (data) => Array.isArray(data) && setOutreachDrafts(data));
    await safeJson<any>('/auto-outreach-stats', setAutoStats);

    const fetchedLogs = await safeJson<any[]>('/logs');
    if (Array.isArray(fetchedLogs) && fetchedLogs.length > 0) {
        const cleaned = fetchedLogs
          .filter((l: any) => !/failed to fetch|backend is not reachable|license activation failed/i.test(String(l.message || '')))
          .map((l: any) => ({ time: l.timestamp, msg: l.message, type: l.type }));
        setLogs(cleaned);
    }

    await safeJson<any>('/heartbeat', setHeartbeat);

    const planData = await safeJson<any>('/discovery/plan');
    if (planData) {
        setDiscoveryPlan(Array.isArray(planData.queries) ? planData.queries : []);
        setDiscoveryPlanRanked(Array.isArray(planData.ranked_queries) ? planData.ranked_queries : []);
        setDiscoveryPlanMeta({
          generated_at: planData.generated_at,
          mode: planData.mode,
          location: planData.location
        });
    }
  };

  useEffect(() => {
    let cancelled = false;

    const healApiBase = async () => {
      try {
        const base = await resolveHealthyApiBase();
        if (cancelled) return;
        if (base !== apiBase) rememberApiBase(base);
      } catch {
        // leave current state alone
      }
    };

    void healApiBase();
    return () => { cancelled = true; };
  }, []);
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

  const testLlmConnection = async (provider: 'openrouter' | 'openai' | 'groq' | 'mistral' | 'apollo' | 'hunter') => {
    const apiKey = provider === 'openrouter' ? config.OPENROUTER_API_KEY : provider === 'openai' ? config.OPENAI_API_KEY : provider === 'groq' ? config.GROQ_API_KEY : provider === 'mistral' ? config.MISTRAL_API_KEY : provider === 'apollo' ? config.APOLLO_API_KEY : config.HUNTER_API_KEY;
    const providerLabel = provider === 'openrouter' ? 'OpenRouter' : provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : provider === 'mistral' ? 'Mistral' : provider === 'apollo' ? 'Apollo.io' : 'Hunter.io';

    if (!apiKey) {
      setLlmTestState((prev) => ({
        ...prev,
        [provider]: { loading: false, ok: false, message: 'Enter API key first.' }
      }));
      return;
    }

    setLlmTestState((prev) => ({
      ...prev,
      [provider]: { loading: true, ok: null, status: 'testing', message: 'Testing connection...' }
    }));

    try {
      const healthyBase = await resolveHealthyApiBase();
      const keySetting = provider === 'openrouter'
        ? { OPENROUTER_API_KEY: apiKey, OPENROUTER_MODEL: config.OPENROUTER_MODEL || 'openai/gpt-4o-mini' }
        : provider === 'openai'
          ? { OPENAI_API_KEY: apiKey, OPENAI_MODEL: config.OPENAI_MODEL || 'gpt-4o-mini' }
          : provider === 'groq'
            ? { GROQ_API_KEY: apiKey }
            : provider === 'mistral'
              ? { MISTRAL_API_KEY: apiKey }
              : provider === 'apollo'
                ? { APOLLO_API_KEY: apiKey }
                : { HUNTER_API_KEY: apiKey };
      await fetch(`${healthyBase}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: keySetting })
      });
      const res = await fetch(`${healthyBase}/settings/test-llm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey, model: provider === 'openrouter' ? config.OPENROUTER_MODEL : provider === 'openai' ? config.OPENAI_MODEL : undefined })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || `Connection test failed (${res.status}).`);
      }

      setLlmTestState((prev) => ({
        ...prev,
        [provider]: {
          loading: false,
          ok: true,
          status: 'connected',
          message: data?.message || `${providerLabel} connection successful.`
        }
      }));
      addLog(`${providerLabel} key verified successfully.`, 'success');
    } catch (error: any) {
      setLlmTestState((prev) => ({
        ...prev,
        [provider]: {
          loading: false,
          ok: false,
          status: 'failed',
          message: error?.message || 'Connection failed. Check backend port or provider key.'
        }
      }));
      addLog(`${providerLabel} key test failed: ${error?.message || 'Unknown error'}`, 'err');
    }
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
      const res = await fetchApiWithFallback(`/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addLog(`🗑️ Lead #${id} permanently removed.`, 'info');
        setSelected(prev => prev.filter(sId => sId !== id));
        await refreshData();
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
    addLog(`🔍 ${searchDepth === 'deep' ? 'Deep Discovery' : 'Fast Scan'} initiated: ${searchQuery}...`, 'info');
    try {
      const controller = new AbortController();
      const timeoutMs = searchDepth === 'deep' ? 125000 : 65000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(`${apiBase}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, mode: searchDepth }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (data.success) {
        if (data.inserted > 0) {
            addLog(`✅ ${data.mode === 'deep' ? 'Deep Discovery' : 'Fast Scan'} found ${data.count} UAE targets. ${data.inserted} are new.`, 'success');
        } else {
            addLog(`⚠️ ${data.mode === 'deep' ? 'Deep Discovery' : 'Fast Scan'} found ${data.count} targets, but all ${data.duplicates} were already in your database.`, 'info');
            addLog(`💡 Tip: Try the same search again! The engine will now pick a DIFFERENT page of results for you automatically.`, 'info');
        }
        if (data.trace) {
          addLog(`Trace: YP ${data.trace.yellowpages || 0} | Bing ${data.trace.bing || 0} | Yahoo ${data.trace.yahoo || 0}${data.trace.ddg ? ` | DDG ${data.trace.ddg}` : ''}`, 'info');
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

  const runDiscovery = () => {
    if (discoveryMode === 'maps') {
      void handleNinjaScan();
      return;
    }
    void handleManualSearch();
  };

  const handleBulkSend = async () => {
    if (selected.length === 0) return;
    setSending(true);
    addLog(`Preparing evidence-backed review drafts for ${selected.length} targets...`, 'info');
    
    // Update local UI immediately
    setProspects(prev => prev.map(p => selected.includes(p.id) ? { ...p, status: 'ready' } : p));
    
    try {
      const res = await fetch(`${apiBase}/bulk-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected })
      });
      if (res.ok) {
        const data = await res.json();
        addLog(`${data.updated || 0} qualified leads queued for evidence review drafts.`, 'success');
        setSelected([]);
        fetch(`${apiBase}/worker/run`, { method: 'POST' });
      } else {
        const data = await res.json().catch(() => ({}));
        addLog(data.error || 'No selected leads passed the verified-contact gate.', 'err');
      }
    } catch (e: any) { addLog(`Draft queue error: ${e.message}`, 'err'); }
    setSending(false);
  };

  const handleBatchDelete = async () => {
    if (selected.length === 0) return;
    if (!window.confirm(`Permanently delete ${selected.length} selected lead(s)?`)) return;
    const oldLeads = [...prospects];
    const deleteIds = [...selected];
    setProspects(prev => prev.filter(p => !deleteIds.includes(p.id)));
    try {
      const res = await fetchApiWithFallback(`/leads/batch-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: deleteIds })
      });
      if (res.ok) {
        addLog(`🗑️ Batch deleted ${deleteIds.length} lead(s).`, 'info');
        setSelected([]);
        await refreshData();
      } else {
        setProspects(oldLeads);
        addLog('❌ Server failed batch deletion.', 'err');
      }
    } catch (e: any) {
      setProspects(oldLeads);
      addLog(`❌ Batch Delete Error: ${e.message}`, 'err');
    }
  };

  const handleDraftAction = async (draft: any, action: 'approve' | 'reject' | 'save') => {
    const edit = draftEdits[draft.id] || { subject: draft.subject, text_body: draft.text_body };
    const path = action === 'save' ? `/outreach-drafts/${draft.id}` : `/outreach-drafts/${draft.id}/${action}`;
    const res = await fetch(`${apiBase}${path}`, {
      method: action === 'save' ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edit)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      addLog(data.error || `Draft ${action} failed.`, 'err');
      return;
    }
    addLog(action === 'approve' ? 'Draft approved. Sending still depends on Outreach Safety Mode.' : `Draft ${action}d.`, 'success');
    setDraftEdits(prev => { const next = { ...prev }; delete next[draft.id]; return next; });
    await refreshData();
  };

  const handleCreateReviewFixture = async () => {
    const res = await fetch(`${apiBase}/outreach-drafts/fixture`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return addLog(data.error || 'Could not create the safe review fixture.', 'err');
    addLog('Safe example.com review fixture created. It can never enter SMTP delivery.', 'success');
    await refreshData();
  };

  const handleReEnrich = async (scope: 'selected' | 'current_page' | 'no_email' | 'missing_decision_makers' | 'missing_contacts' = reEnrichScope) => {
    const ids = scope === 'selected'
      ? selected
      : scope === 'current_page'
        ? currentDiscoveryPageLeadIds
        : [];
    const scopeLimits: Record<string, number> = {
      selected: ids.length,
      current_page: ids.length,
      no_email: 20,
      missing_decision_makers: 10,
      missing_contacts: 10
    };

    if ((scope === 'selected' || scope === 'current_page') && ids.length === 0) {
      addLog('Select some leads first, or switch the re-enrichment scope.', 'info');
      return;
    }

    const scopeLabels: Record<string, string> = {
      selected: `${ids.length} selected leads`,
      current_page: `${ids.length} leads on this page`,
      no_email: 'companies with no email yet',
      missing_decision_makers: 'companies missing decision-makers',
      missing_contacts: 'companies with no saved contacts'
    };

    setEnriching(true);
    setReEnrichScope(scope);
    setReEnrichReport(null);
    addLog(`Finding decision-makers for ${scopeLabels[scope]}...`, 'info');

    try {
      const res = await fetch(`${apiBase}/leads/re-enrich`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scope,
          ids,
          limit: scopeLimits[scope] || 10
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Re-enrichment failed');
      setReEnrichReport(data.summary || null);
      addLog(
        `Decision-maker enrichment complete. ${data.summary?.contacts_saved || 0} contacts saved across ${data.summary?.processed || 0} companies.`,
        'success'
      );
      if (scope === 'selected' || scope === 'current_page') setSelected([]);
      refreshData();
    } catch (e: any) {
      addLog(`Decision-maker enrichment failed: ${e.message}`, 'err');
    }
    setEnriching(false);
  };

  const retryLeadEnrichment = async (id: number) => {
    setEnriching(true);
    try {
      const res = await fetch(`${apiBase}/leads/re-enrich`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope: 'selected', ids: [id], limit: 1 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Retry failed');
      addLog(`Enrichment retry finished for lead #${id}.`, 'success');
      await refreshData();
    } catch (e: any) {
      addLog(`Enrichment retry failed: ${e.message}`, 'err');
    }
    setEnriching(false);
  };

  const regenerateDiscoveryPlan = async () => {
    setPlanLoading(true);
    addLog('🧠 Regenerating autonomous discovery plan...', 'info');
    try {
      const res = await fetch(`${apiBase}/discovery/plan?force=1`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to regenerate discovery plan');
      setDiscoveryPlan(Array.isArray(data.queries) ? data.queries : []);
      setDiscoveryPlanRanked(Array.isArray(data.ranked_queries) ? data.ranked_queries : []);
      setDiscoveryPlanMeta({
        generated_at: data.generated_at,
        mode: data.mode,
        location: data.location
      });
      addLog(`✅ Discovery plan refreshed with ${Array.isArray(data.queries) ? data.queries.length : 0} query phrases.`, 'success');
    } catch (e: any) {
      addLog(`❌ Discovery plan refresh failed: ${e.message}`, 'err');
    }
    setPlanLoading(false);
  };

  const handleActivateLicense = async () => {
    setActivatingLicense(true);
    try {
      await resolveHealthyApiBase();
      const res = await fetchApiWithFallback('/license/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activation_key: activationKey,
          device_hash: license.device_id || 'device-local',
          customer_name: licenseHolder,
          license_holder: licenseHolder
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === false) {
        throw new Error(data?.error || 'Activation failed');
      }

      setLicense(data);
      setActivationKey('');
      setLogs(prev => prev.filter((l: any) => !/failed to fetch|backend is not reachable|license activation failed/i.test(String(l.msg || ''))));
      addLog("License activated for this device.", 'success');
      refreshData();
    } catch (e: any) {
      addLog(`License activation failed: ${e.message}`, 'err');
    }
    setActivatingLicense(false);
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

  const sentLeads = prospects.filter(p => ['sent', 'followed_up', 'blocked_by_safety_mode'].includes(p.status)).sort((a, b) => new Date(b.last_contacted || b.added_at).getTime() - new Date(a.last_contacted || a.added_at).getTime());
  const reviewDrafts = outreachDrafts.filter(draft => !draft.is_test_fixture && ['draft', 'approved', 'needs_review'].includes(draft.approval_status));
  const pendingDraftCount = reviewDrafts.filter(draft => draft.approval_status === 'draft').length;
  const allTargetLeads = prospects.filter(p => 
    !['rejected', 'refused', 'quarantined', 'sent'].includes(String(p.status || '').toLowerCase()) && 
    p.is_relevant !== 0
  );
  const discoveryLeads = allTargetLeads.filter(p => {
    if (targetFilter === 'executives') return Boolean(p.contact_name);
    if (targetFilter === 'company_email') return Boolean(p.email && String(p.email).trim() !== '') && !p.contact_name;
    if (targetFilter === 'has_phone') return String(p.phone || p.mobile_number || p.contact_phone || p.direct_number || '').replace(/\D/g, '').length >= 7;
    if (targetFilter === 'awaiting') return !p.email || String(p.email).trim() === '';
    return true;
  });
  const currentDiscoveryPageLeadIds = discoveryLeads
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((lead: any) => lead.id);

  const executiveKeywords = ['ceo', 'chief', 'founder', 'owner', 'director', 'head', 'vp', 'president', 'managing', 'partner'];
  const filteredContactsBase = contacts.filter((contact: any) => {
    const haystack = [
      contact.company_name,
      contact.full_name,
      contact.job_title,
      contact.department,
      contact.domain,
      contact.email
    ].join(' ').toLowerCase();
    const matchesQuery = !contactQuery.trim() || haystack.includes(contactQuery.trim().toLowerCase());
    const isExecutive = Boolean(contact.is_decision_maker) || executiveKeywords.some(keyword =>
      String(contact.job_title || '').toLowerCase().includes(keyword) ||
      String(contact.seniority || '').toLowerCase().includes(keyword)
    );
    const hasPhone = Boolean(contact.mobile_number || contact.phone);
    // Task2 — "Verified Decision Makers" only includes contacts with a real reachable
    // channel (email and/or phone/mobile). Rows with no contact info are filtered out
    // client-side too, so the card/tab counts never include blank placeholders.
    const hasReachableChannel = Boolean(
      (contact.email && String(contact.email).trim() !== '') ||
      (contact.phone && String(contact.phone).trim() !== '') ||
      (contact.mobile_number && String(contact.mobile_number).trim() !== '')
    );
    return matchesQuery
      && hasReachableChannel
      && (!contactsVerifiedOnly || Boolean(contact.email_ownership_verified))
      && (!contactsExecutiveOnly || isExecutive)
      && (!contactsLinkedInOnly || (Boolean(contact.linkedin_url) && Number(contact.person_identity_verified || 0) === 1))
      && (!contactsPhoneOnly || hasPhone);
  });
  const filteredContacts = contactsBestPerCompany
    ? Array.from(
        filteredContactsBase.reduce((map, contact: any) => {
          const key = String(contact.company_name || contact.domain || contact.website || contact.lead_id || contact.id);
          const existing = map.get(key);
          const score = Number(contact.confidence_score || 0) + (contact.email_ownership_verified ? 20 : 0) + (contact.person_identity_verified ? 15 : 0);
          const existingScore = existing
            ? Number(existing.confidence_score || 0) + (existing.email_ownership_verified ? 20 : 0) + (existing.person_identity_verified ? 15 : 0)
            : -1;
          if (!existing || score > existingScore) map.set(key, contact);
          return map;
        }, new Map<string, any>()).values()
      )
    : filteredContactsBase;

  const parseList = (value: any): string[] => String(value || '').split(/[\n,;|]+/).map((item: string) => item.trim()).filter(Boolean);
  const parseDynamicNiches = (value: any): string[] => {
    try {
      const parsed = JSON.parse(String(value || '[]'));
      return Array.isArray(parsed) ? parsed.map((item: any) => String(item || '').trim()).filter(Boolean) : [];
    } catch {
      return [];
    }
  };
  const location = String(config.TARGET_LOCATION || 'UAE').trim();
  const discoverySeeds = Array.from(new Set([
    ...parseDynamicNiches(config.DYNAMIC_NICHES),
    ...parseList(config.REQUIRED_KEYWORDS),
    ...(config.investigation_depth === 'deep'
      ? ['B2B services', 'companies', 'contractors', 'consultants']
      : ['business services'])
  ].filter(Boolean)));
  const autonomousPreview = discoverySeeds.slice(0, 8).map(seed => {
    const text = String(seed).trim();
    return text.toLowerCase().includes(location.toLowerCase()) ? text : `${text} ${location}`;
  });

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

      {/* ── LOGO INTRO / OUTRO BRAND ANIMATION SCREEN ── */}
      {showIntroScreen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 99999,
          background: 'radial-gradient(circle at 50% 45%, #0a0a0a 0%, #050505 80%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
          animation: introFadingOut ? 'introFadeOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #22C55E 0%, #4ADE80 100%)'
          }} />

          {/* Ambient Background Energy Aura */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'ambientPulse 4s ease-in-out infinite alternate'
          }} />

          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #22C55E 50%, transparent 100%)',
            animation: 'topRibbonGlow 2s ease-in-out infinite'
          }} />

          {/* Real Agency Logo with Double Expanding Emerald Wave Ring & Bloom Animation */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="emerald-wave-ring" />
            <div className="emerald-wave-ring delay" />

            <div style={{ 
              position: 'relative', 
              width: 140, 
              height: 140, 
              borderRadius: '50%', 
              overflow: 'hidden', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 50px rgba(34, 197, 94, 0.5), 0 0 100px rgba(34, 197, 94, 0.25)',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              animation: 'logoBloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both'
            }}>
              <img 
                src="/asif_sales_agent_logo.png" 
                alt="Asif Digital Agency Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.18)',
                  filter: 'contrast(1.18) brightness(1.08)'
                }} 
              />
            </div>
          </div>

          {/* Brand Name & Tagline matching asifdigital.agency */}
          <h1 className="shimmer-title" style={{
            marginTop: '2.2rem',
            fontSize: '4.2rem',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            margin: '1.8rem 0 0 0',
            animation: 'introFadeUp 0.8s ease-out 0.4s both'
          }}>
            Asif Digital Agency
          </h1>

          <div style={{
            marginTop: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            animation: 'introFadeUp 0.8s ease-out 0.7s both'
          }}>
            <span style={{ color: '#22C55E', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 12px #22C55E', display: 'inline-block' }} />
              SOVEREIGN SALES ENGINE
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Autonomous B2B Lead Intelligence</span>
          </div>

          <div style={{
            marginTop: '2.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.4rem',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.45)',
            animation: 'introFadeUp 0.6s ease-out 1s both'
          }}>
            <span>asifdigital.agency</span>
            <span>•</span>
            <span>Dubai Node: DXB-PRIME</span>
            <span>•</span>
            <span>2026</span>
          </div>

          <style>{`
            @keyframes logoBloom {
              0% { opacity: 0; transform: scale(0.5); filter: drop-shadow(0 0 0 transparent); }
              60% { opacity: 0.9; transform: scale(1.06); filter: drop-shadow(0 0 50px rgba(34, 197, 94, 0.8)); }
              100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.6)); }
            }

            .emerald-wave-ring {
              position: absolute;
              width: 140px;
              height: 140px;
              border-radius: 50%;
              border: 1px solid rgba(34, 197, 94, 0.6);
              animation: waveExpand 2.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
            }
            .emerald-wave-ring.delay {
              animation-delay: 1.2s;
            }

            @keyframes waveExpand {
              0% { transform: scale(1); opacity: 0.8; }
              100% { transform: scale(2.2); opacity: 0; }
            }

            @keyframes ambientPulse {
              0% { transform: scale(0.9); opacity: 0.6; }
              100% { transform: scale(1.15); opacity: 1; }
            }

            .shimmer-title {
              background: linear-gradient(120deg, #ffffff 20%, #4ADE80 50%, #ffffff 80%);
              background-size: 200% 100%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: titleShimmer 3s ease-in-out infinite;
            }

            @keyframes titleShimmer {
              0% { background-position: -100% 0; }
              100% { background-position: 100% 0; }
            }

            @keyframes introFadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes introFadeOut {
              0% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(1.05); visibility: hidden; }
            }
          `}</style>
        </div>
      )}

      {/* Mobile Top Header */}
      {windowWidth < 1024 && (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.2rem 1.5rem', 
            background: 'rgba(255,255,255,0.85)', 
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            position: 'sticky', 
            top: 0, 
            zIndex: 1000 
        }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: ACCENT, padding: 7, borderRadius: 10, boxShadow: `0 4px 15px ${ACCENT}33` }}>
                  <Zap size={18} fill="white" color="white" />
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.15rem', letterSpacing: -0.5, color: TEXT_PRIMARY }}>Asif <span style={{ color: ACCENT }}>Digital Agency</span></div>
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
            <div style={{ background: ACCENT, padding: 10, borderRadius: 14, boxShadow: `0 8px 30px ${ACCENT}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={26} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.05em', color: TEXT_PRIMARY, lineHeight: 1.1 }}>Asif <span style={{ color: ACCENT }}>Digital Agency</span></div>
              <div style={{ fontSize: '0.62rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }}></span>
                SOVEREIGN RESALE V5.1
              </div>
            </div>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            {([
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, count: 0 },
              { id: 'all', label: 'Discovered Companies', icon: Database, count: prospects.length },
              { id: 'prospects', label: 'AI Qualified Targets', icon: Search, count: discoveryLeads.length },
              { id: 'contacts', label: 'Verified Decision Makers', icon: Users, count: contacts.length },
              { id: 'bulk', label: 'Bulk Import', icon: FileText, count: 0 },
              { id: 'sent', label: 'Review & Outreach', icon: Mail, count: pendingDraftCount },
              { id: 'replies', label: 'Inbox', icon: MessageSquare, count: (replies?.length || 0) },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 0 },
              ...(userRole === 'owner' ? [{ id: 'settings', label: 'System', icon: Settings, count: 0 }] : []),
            ] as const).map(item => (
              <div 
                key={item.id} 
                className="apple-nav-item"
                onClick={() => { 
                  setView(item.id as any); 
                  setSelected([]); 
                  setCurrentPage(1);
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
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Apple-Grade Segmented Role Control */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.04)',
                borderRadius: 14,
                padding: 3,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <button
                  onClick={() => setUserRole('owner')}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: userRole === 'owner' ? '#ffffff' : 'transparent',
                    color: userRole === 'owner' ? ACCENT : TEXT_SECONDARY,
                    borderRadius: 11,
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: userRole === 'owner' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Shield size={13} color={userRole === 'owner' ? ACCENT : TEXT_SECONDARY} /> Owner View
                </button>
                <button
                  onClick={() => setUserRole('sales_rep')}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: userRole === 'sales_rep' ? '#ffffff' : 'transparent',
                    color: userRole === 'sales_rep' ? '#B45309' : TEXT_SECONDARY,
                    borderRadius: 11,
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: userRole === 'sales_rep' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <User size={13} color={userRole === 'sales_rep' ? '#B45309' : TEXT_SECONDARY} /> Sales Rep
                </button>
              </div>

              <GlassCard style={{ padding: '1rem 1.2rem', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '18px' }}>
                  <div style={{ fontSize: '0.65rem', color: TEXT_SECONDARY, marginBottom: 4, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase' }}>Active Identity</div>
                  <div style={{ 
                      fontSize: '0.88rem', 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 8, 
                      color: TEXT_PRIMARY,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                  }}>
                      <div style={{ width: 8, height: 8, background: '#34c759', borderRadius: '50%', boxShadow: '0 0 10px rgba(52, 199, 89, 0.4)' }} />
                      <span>{config.COMPANY_NAME || 'Sovereign'}</span>
                  </div>
              </GlassCard>
          </div>
        </aside>
      )}

      <main style={{ 
          flex: 1, 
          padding: windowWidth < 600 ? '1rem' : windowWidth < 1200 ? '1.5rem' : '4rem', 
          overflowY: 'auto',
          maxWidth: '95vw',
          margin: '0 auto'
      }}>
        
        {/* 🚀 AUTO-UPDATE NOTIFICATION BANNER */}
        {updateInfo.update_available && (
          <div style={{
            marginBottom: '2.5rem',
            padding: '20px 28px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, #0071E3 0%, #147CE5 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 35px rgba(0, 113, 227, 0.35)',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCw size={26} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                  New Engine Update Available (v{updateInfo.latest_version})
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 4, fontWeight: 500 }}>
                  {updateInfo.release_notes}
                </div>
              </div>
            </div>
            <a
              href={updateInfo.download_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 24px',
                background: '#fff',
                color: '#0071E3',
                borderRadius: 14,
                fontWeight: 900,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              Click to Download Update (.exe)
            </a>
          </div>
        )}

        {view === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <AppleHeading subtitle="Autonomous B2B market discovery, OSINT contact enrichment, and human-controlled outreach engine.">
              Control Center
            </AppleHeading>

            {/* ── WORKER STATUS MATRIX BAR ── */}
            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 800 ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: 14, padding: '20px 24px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              {[
                { label: 'Autonomous Discovery', value: workerRunning ? 'RUNNING' : 'STOPPED', active: workerRunning, icon: Search },
                { label: 'OSINT Enrichment', value: prospects.some(p => p.enrichment_status === 'processing') ? 'PROCESSING' : 'READY', active: true, icon: Database },
                { label: 'LLM Draft Engine', value: workerRunning ? 'ACTIVE' : 'IDLE', active: workerRunning, icon: Cpu },
                { label: 'SMTP Gateway', value: config.OUTREACH_ENABLED === 'true' ? 'ENABLED' : 'PAUSED', active: config.OUTREACH_ENABLED === 'true', icon: Mail },
                { label: 'Follow-up Matrix', value: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? 'ACTIVE' : 'IDLE', active: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true', icon: RefreshCw }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '4px 8px' }}>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ItemIcon size={12} color={TEXT_SECONDARY} />
                      {item.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.active ? '#22C55E' : '#F97316' }} />
                      <span style={{ color: item.active ? '#166534' : '#C2410C', fontWeight: 900, fontSize: '0.82rem', letterSpacing: 0.5 }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── HERO METRICS & COMMAND CENTER GRID ── */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: windowWidth < 700 ? '1fr' : windowWidth < 1100 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
              gap: '24px' 
            }}>
              {/* Card 1 */}
              <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: '0.78rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Target Entities</div>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(0, 113, 227, 0.08)', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Globe size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '3.6rem', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.05em', lineHeight: 1 }}>{prospects.length}</div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#22C55E', fontWeight: 800 }}>LIVE</span> Discovered Companies
                </div>
              </GlassCard>

              {/* Card 2 */}
              <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: '0.78rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Verified Contacts</div>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(34, 197, 94, 0.08)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '3.6rem', fontWeight: 800, color: '#16a34a', letterSpacing: '-0.05em', lineHeight: 1 }}>{contacts.length}</div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#16a34a', fontWeight: 800 }}>REAL</span> Decision Makers w/ Contact Channel
                </div>
              </GlassCard>

              {/* Card 3 */}
              <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: '0.78rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>AI Qualified Targets</div>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255, 149, 0, 0.08)', color: '#ff9500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '3.6rem', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.05em', lineHeight: 1 }}>{discoveryLeads.length}</div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#ff9500', fontWeight: 800 }}>98%</span> High Precision Target Match
                </div>
              </GlassCard>

              {/* Card 4: Master Execution Control */}
              <GlassCard style={{ background: workerRunning ? 'linear-gradient(135deg, #F0FFF4 0%, #FFFFFF 100%)' : '#ffffff', border: workerRunning ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: '0.78rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Command Node</div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: TEXT_SECONDARY }}>Port: {apiBase?.match(/:(\d+)/)?.[1] || '3010'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: workerRunning ? '#22C55E' : '#EF4444', boxShadow: workerRunning ? '0 0 12px #22C55E' : 'none' }} />
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: TEXT_PRIMARY }}>
                      {workerRunning ? 'Discovery Engine Active' : 'Engine Idle / Paused'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={workerRunning ? handleStopAgent : handleStartAgent}
                  disabled={isEngineBusy}
                  style={{ 
                    width: '100%',
                    background: workerRunning ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '16px',
                    borderRadius: 16,
                    fontSize: '0.88rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    letterSpacing: 0.5,
                    boxShadow: workerRunning ? '0 8px 24px rgba(239,68,68,0.25)' : '0 8px 24px rgba(34,197,94,0.25)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                  {isEngineBusy ? 'UPDATING NODE...' : workerRunning ? 'STOP DISCOVERY WORKER' : 'START DISCOVERY WORKER'}
                </button>
              </GlassCard>
            </div>

            {/* ── VISUAL ANALYTICS CHARTS ── */}
            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 1000 ? '1fr' : '1.4fr 1fr', gap: '24px' }}>
              <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: TEXT_PRIMARY, letterSpacing: '-0.02em' }}>Pipeline Lead Conversion Curve</div>
                    <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 500 }}>Conversion efficiency across discovery, qualification, decision-maker extraction, and outreach phases.</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: ACCENT, background: 'rgba(0, 113, 227, 0.08)', padding: '6px 12px', borderRadius: 999 }}>LIVE REAL-TIME DATA</span>
                </div>
                {(() => {
                  const totalLeads = prospects.length;
                  const qualifiedCount = prospects.filter((p: any) => Number(p.is_relevant ?? 1) === 1).length;
                  const decisionMakerCount = contacts.length;
                  const readyDraftsCount = pendingDraftCount;

                  const maxVal = Math.max(totalLeads, 1);
                  const calcY = (val: number) => {
                      if (totalLeads === 0) return 120; // Flat baseline when database is empty
                      const ratio = Math.min(1, val / maxVal);
                      return Math.round(120 - ratio * 100); // 120 = bottom baseline, 20 = peak
                  };

                  const y1 = calcY(totalLeads);
                  const y2 = calcY(qualifiedCount);
                  const y3 = calcY(decisionMakerCount);
                  const y4 = calcY(readyDraftsCount);

                  return (
                    <>
                      <svg viewBox="0 0 500 140" style={{ width: '100%', height: 140, overflow: 'visible' }}>
                        <defs>
                          <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={`M 30 ${y1} Q 150 ${y2} 270 ${y3} T 470 ${y4} L 470 135 L 30 135 Z`} fill="url(#curveGrad)" />
                        <path d={`M 30 ${y1} Q 150 ${y2} 270 ${y3} T 470 ${y4}`} fill="none" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx="30" cy={y1} r="5" fill={ACCENT} />
                        <text x="30" y={Math.max(10, y1 - 10)} textAnchor="middle" fontSize="10" fontWeight="800" fill={TEXT_PRIMARY}>{totalLeads}</text>
                        <circle cx="170" cy={y2} r="5" fill={ACCENT} />
                        <text x="170" y={Math.max(10, y2 - 10)} textAnchor="middle" fontSize="10" fontWeight="800" fill={TEXT_PRIMARY}>{qualifiedCount}</text>
                        <circle cx="310" cy={y3} r="5" fill={ACCENT} />
                        <text x="310" y={Math.max(10, y3 - 10)} textAnchor="middle" fontSize="10" fontWeight="800" fill={TEXT_PRIMARY}>{decisionMakerCount}</text>
                        <circle cx="470" cy={y4} r="5" fill={ACCENT} />
                        <text x="470" y={Math.max(10, y4 - 10)} textAnchor="middle" fontSize="10" fontWeight="800" fill={TEXT_PRIMARY}>{readyDraftsCount}</text>
                      </svg>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '0.78rem', color: TEXT_SECONDARY, fontWeight: 700 }}>
                        <span>Discovered ({totalLeads})</span>
                        <span>AI Qualified ({qualifiedCount})</span>
                        <span>Decision Makers ({decisionMakerCount})</span>
                        <span>Outreach Ready ({readyDraftsCount})</span>
                      </div>
                    </>
                  );
                })()}
              </GlassCard>

              {/* Dynamic Sector Concentration */}
              <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: TEXT_PRIMARY, letterSpacing: '-0.02em' }}>Sector Concentration</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: ACCENT, background: 'rgba(0, 113, 227, 0.08)', padding: '6px 12px', borderRadius: 999 }}>DYNAMIC DB</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginBottom: 20, fontWeight: 500 }}>Live distribution of discovered business sectors across {prospects.length} total leads.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {(() => {
                    if (!prospects || prospects.length === 0) {
                      return (
                        <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: TEXT_SECONDARY, fontSize: '0.85rem', fontWeight: 600, background: '#F9F9FB', borderRadius: 16 }}>
                          Awaiting lead discovery... (0 leads in database)
                        </div>
                      );
                    }
                    const counts: Record<string, number> = {};
                    for (const p of prospects) {
                        const rawCat = String(p.category || 'Commercial Services').trim();
                        const clean = rawCat.replace(/\b(uae|dubai|abu dhabi|qatar|saudi arabia)\b/gi, '').trim() || 'Commercial Services';
                        const catName = clean.charAt(0).toUpperCase() + clean.slice(1);
                        counts[catName] = (counts[catName] || 0) + 1;
                    }
                    const total = prospects.length;
                    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
                    const colors = ['#0071E3', '#00d2ff', '#34c759', '#ff9500', '#af52de'];

                    return sorted.map(([name, count], i) => {
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 6 }}>
                            <span>{name} ({count})</span>
                            <span style={{ color: colors[i % colors.length] }}>{pct}%</span>
                          </div>
                          <div style={{ height: 7, background: '#F5F5F7', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: colors[i % colors.length], borderRadius: 4, transition: 'width 0.4s ease' }} />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </GlassCard>
            </div>

            {/* ── TERMINAL STREAM & ENRICHMENT ACTION ── */}
            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 1200 ? '1fr' : '1.7fr 1fr', gap: '32px' }}>
               <GlassCard style={{ maxHeight: '600px', background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '2.5rem', color: '#F8FAFC' }}>
                 <h4 style={{ margin: 0, marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>
                        <Terminal size={22} color={ACCENT} /> Intelligence Stream Log
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', letterSpacing: 1 }}>LIVE FEED</span>
                        </div>
                        <button onClick={() => setLogs([])} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 800, padding: '8px 14px', borderRadius: 10 }}>CLEAR LOGS</button>
                    </div>
                 </h4>
                 <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 420, overflowY: 'auto', gap: 6, paddingRight: 10 }}>
                    {logs.map((log: any, i) => (
                        <div key={i} style={{ 
                            fontSize: '0.84rem', 
                            padding: '12px 16px', 
                            borderRadius: '10px',
                            background: i === 0 ? 'rgba(0, 113, 227, 0.15)' : 'rgba(255,255,255,0.03)',
                            color: log.type === 'success' ? '#4ADE80' : log.type === 'error' ? '#F87171' : log.type === 'warning' ? '#FBBF24' : '#E2E8F0',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontWeight: i === 0 ? 600 : 400,
                            display: 'flex',
                            gap: 14
                        }}>
                           <span style={{ color: '#64748B', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>{log.time}</span>
                           <span style={{ lineHeight: 1.4 }}>{log.msg}</span>
                        </div>
                    ))}
                  </div>
               </GlassCard>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                    width: 10, height: 10,
                                    background: heartbeat.status === 'running' ? '#22C55E' : '#EF4444',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 12px ${heartbeat.status === 'running' ? '#22C55E' : '#EF4444'}`
                                }} />
                                <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.5, color: heartbeat.status === 'running' ? '#166534' : '#DC2626' }}>
                                    {heartbeat.status === 'running' ? 'Worker Status: Active' : 'Worker Status: Offline'}
                                </span>
                            </div>
                            <Activity size={18} color={TEXT_SECONDARY} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { label: 'Intelligence Found', value: prospects.length, icon: Database },
                                { label: 'Deliveries Sent', value: sentLeads.length, icon: Send },
                                { label: 'Inbox Replies', value: analytics.reduce((acc, row) => acc + (row.replies_received || 0), 0), icon: MessageSquare },
                                { label: 'Drafts Pending', value: pendingDraftCount, icon: FileText },
                            ].map((stat, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#F8F9FA', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <stat.icon size={15} color={TEXT_SECONDARY} />
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: TEXT_SECONDARY }}>{stat.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: TEXT_PRIMARY }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleReEnrich('no_email')}
                            style={{ 
                                width: '100%', 
                                padding: '18px', 
                                background: ACCENT_GRADIENT, 
                                border: 'none', 
                                borderRadius: '16px', 
                                color: '#fff', 
                                fontWeight: 900, 
                                cursor: 'pointer',
                                fontSize: '0.92rem',
                                letterSpacing: 0.5,
                                boxShadow: '0 8px 24px rgba(0, 113, 227, 0.25)',
                                marginTop: 22
                            }}
                        >
                            RUN FULL ENRICHMENT CYCLE
                        </button>
                    </GlassCard>
               </div>
            </div>
          </div>
        )}

        {view === 'all' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
            <AppleHeading 
              subtitle="Complete intelligence database of all discovered target companies."
              action={
                <button onClick={() => exportToCSV(prospects, 'uae-prospect-intelligence.csv')}
                   style={{ background: ACCENT, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 4px 16px rgba(0, 113, 227, 0.2)` }}>
                    <Download size={18} /> Export CSV
                </button>
              }
            >
              Master Target Database
            </AppleHeading>
            
            <GlassCard style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: TEXT_SECONDARY, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.0, background: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1.5rem 2.5rem', fontWeight: 700 }}>Company Entity</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700, textAlign: 'center' }}>Social</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Email Address</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Phone / WA</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Category</th>
                            <th style={{ padding: '1.5rem 2rem', fontWeight: 700 }}>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prospects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', transition: '0.2s background' }} className="apple-table-row">
                                <td style={{ padding: '2rem 2.5rem' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: TEXT_PRIMARY, marginBottom: 4 }}>{p.company_name}</div>
                                    <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}><ExternalLink size={14} color={ACCENT} /> {p.website}</div>
                                </td>
                                <td style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                                    {p.linkedin_url ? (
                                        <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem' }}>
                                            <Linkedin size={22} />
                                        </a>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, fontSize: '0.75rem', fontWeight: 600, opacity: 0.3 }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: TEXT_PRIMARY }}>
                                            {p.email || (
                                                <span style={{ color: TEXT_SECONDARY, opacity: 0.55 }}>
                                                    {['rejected', 'refused', 'quarantined'].includes(String(p.status || '').toLowerCase())
                                                        ? 'Skipped: not relevant'
                                                        : String(p.status || '').toLowerCase() === 'new'
                                                            ? 'Pending enrichment'
                                                            : 'No email found'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {p.phone || p.mobile_number ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: TEXT_PRIMARY }}>{p.phone || p.mobile_number}</div>
                                            {whatsappUrl(p.mobile_number || p.phone) && (
                                                <a href={whatsappUrl(p.mobile_number || p.phone)!} target="_blank" rel="noreferrer" style={{ color: '#25D366', fontSize: '0.7rem', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <MessageSquare size={12} /> WHATSAPP
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.3 }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.category || 'General'}</div>
                                    <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, opacity: 0.6 }}>{p.location || 'UAE'}</div>
                                </td>
                                <td style={{ padding: '2rem 2rem' }}>
                                    <StatusBadge status={p.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* PAGINATION CONTROLS */}
                <div style={{ padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.01)' }}>
                    <div style={{ fontSize: '0.85rem', color: TEXT_SECONDARY, fontWeight: 600 }}>
                        Showing <span style={{ color: TEXT_PRIMARY }}>{Math.min(itemsPerPage, prospects.length - (currentPage-1)*itemsPerPage)}</span> of <span style={{ color: TEXT_PRIMARY }}>{prospects.length}</span> entities
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => Math.max(1, p-1)); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', background: currentPage === 1 ? 'transparent' : '#fff', color: TEXT_PRIMARY, fontWeight: 700, cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.3 : 1 }}
                        >Previous</button>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0 15px', fontSize: '0.9rem', fontWeight: 800, color: ACCENT }}>
                            PAGE {currentPage}
                        </div>
                        <button 
                            disabled={currentPage * itemsPerPage >= (view === 'all' ? prospects.length : discoveryLeads.length)}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', background: '#fff', color: TEXT_PRIMARY, fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
                <style>{`
                  .apple-table-row:hover {
                    background: rgba(0,0,0,0.01) !important;
                  }
                `}</style>
            </GlassCard>
          </div>
        )}

        {view === 'contacts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
            <AppleHeading 
              subtitle="Verified decision-makers with confirmed identity, job titles, and direct contact details."
              action={
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => handleReEnrich('missing_decision_makers')}
                    disabled={enriching}
                    className="apple-button"
                    style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '14px 22px', borderRadius: 14, fontWeight: 800, cursor: 'pointer', fontSize: '0.88rem' }}>
                    {enriching && reEnrichScope === 'missing_decision_makers' ? 'Re-Enriching...' : 'Re-Enrich Missing DMs'}
                  </button>
                  <button 
                    onClick={() => window.open(`${apiBase}/contacts/export.csv`, '_blank')} 
                    className="apple-button"
                    style={{ background: ACCENT, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 14, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 4px 16px rgba(0, 113, 227, 0.2)` }}>
                      <Download size={18} /> Export Contacts
                  </button>
                </div>
              }
            >
              Verified Decision Makers
            </AppleHeading>

            <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: 18, background: 'rgba(255,255,255,0.76)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', flexDirection: windowWidth < 960 ? 'column' : 'row', gap: 14, alignItems: windowWidth < 960 ? 'stretch' : 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, minWidth: 260 }}>
                        <div style={{ fontSize: '0.78rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Find Contacts</div>
                        <input
                            value={contactQuery}
                            onChange={e => setContactQuery(e.target.value)}
                            placeholder="Search company, person, title, domain, email..."
                            className="spotlight-input"
                            style={{ width: '100%', padding: '16px 18px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {[
                          { label: 'Best per company', active: contactsBestPerCompany, onClick: () => setContactsBestPerCompany(v => !v) },
                          { label: 'Executives', active: contactsExecutiveOnly, onClick: () => setContactsExecutiveOnly(v => !v) },
                          { label: 'Ownership verified', active: contactsVerifiedOnly, onClick: () => setContactsVerifiedOnly(v => !v) },
                          { label: 'LinkedIn', active: contactsLinkedInOnly, onClick: () => setContactsLinkedInOnly(v => !v) },
                          { label: 'Phone/WhatsApp', active: contactsPhoneOnly, onClick: () => setContactsPhoneOnly(v => !v) }
                        ].map(filterChip => (
                          <button
                            key={filterChip.label}
                            onClick={filterChip.onClick}
                            style={{
                              border: '1px solid rgba(0,0,0,0.08)',
                              background: filterChip.active ? ACCENT : '#fff',
                              color: filterChip.active ? '#fff' : TEXT_SECONDARY,
                              borderRadius: 999,
                              padding: '11px 14px',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            {filterChip.label}
                          </button>
                        ))}
                    </div>
                </div>
                {reEnrichReport && (
                    <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 840 ? '1fr 1fr' : 'repeat(5, minmax(0, 1fr))', gap: 12 }}>
                        {[
                          { label: 'Processed', value: reEnrichReport.processed || 0 },
                          { label: 'Succeeded', value: reEnrichReport.succeeded || 0 },
                          { label: 'Failed', value: reEnrichReport.failed || 0 },
                          { label: 'Contacts Saved', value: reEnrichReport.contacts_saved || 0 },
                          { label: 'Emails Found', value: reEnrichReport.emails_found || 0 }
                        ].map(metric => (
                          <div key={metric.label} style={{ background: 'rgba(0,0,0,0.02)', borderRadius: 18, padding: '14px 16px' }}>
                            <div style={{ fontSize: '0.72rem', color: TEXT_SECONDARY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>{metric.label}</div>
                            <div style={{ fontSize: '1.6rem', color: TEXT_PRIMARY, fontWeight: 900, marginTop: 4 }}>{metric.value}</div>
                          </div>
                        ))}
                    </div>
                )}
                <div style={{ fontSize: '0.82rem', color: TEXT_SECONDARY, fontWeight: 600 }}>
                    Re-enrichment runs in small batches now: `Missing DMs` and `No Contacts` process up to 10 companies per click, and `No Email` processes up to 20.
                </div>
            </GlassCard>

            <GlassCard style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1050 }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: TEXT_SECONDARY, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.0, background: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1.5rem 2rem', fontWeight: 700 }}>Company</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Person</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Role</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Email</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Phone / WA</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>LinkedIn</th>
                            <th style={{ padding: '1.5rem 2rem', fontWeight: 700 }}>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ padding: '3rem', color: TEXT_SECONDARY, fontWeight: 700, textAlign: 'center' }}>
                                    No decision-maker contacts yet. Select leads in Discovery or Database, then run Find Decision Makers.
                                </td>
                            </tr>
                        )}
                        {filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(c => {
                            const directNumber = c.mobile_number || c.phone;
                            const companyNumber = c.company_mobile_number || c.company_phone;
                            const displayedNumber = directNumber || companyNumber;
                            const directEmail = c.email;
                            const companyEmail = c.company_email;
                            const displayedEmail = directEmail || companyEmail;
                            return (
                            <tr key={c.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }} className="apple-table-row">
                                <td style={{ padding: '1.6rem 2rem' }}>
                                    <div style={{ fontWeight: 800, color: TEXT_PRIMARY, display: 'flex', alignItems: 'center', gap: 8 }}>
                                      <span>{c.company_name || 'Unknown Company'}</span>
                                      {contactsBestPerCompany ? <span style={{ fontSize: '0.66rem', color: ACCENT, fontWeight: 900, textTransform: 'uppercase' }}>Best</span> : null}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY }}>{c.domain || c.website || ''}</div>
                                </td>
                                <td style={{ padding: '1.6rem 1rem', fontWeight: 700, color: TEXT_PRIMARY }}>{c.full_name || 'Decision maker'}</td>
                                <td style={{ padding: '1.6rem 1rem' }}>
                                    <div style={{ fontWeight: 700, color: TEXT_PRIMARY }}>{c.job_title || 'Leadership'}</div>
                                    <div style={{ fontSize: '0.72rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800 }}>{c.department || c.seniority || ''}</div>
                                </td>
                                <td style={{ padding: '1.6rem 1rem' }}>
                                    <div style={{ fontWeight: 700, color: displayedEmail ? TEXT_PRIMARY : TEXT_SECONDARY }}>{displayedEmail || 'No public email found'}</div>
                                    {directEmail && c.email_ownership_verified ? <div style={{ fontSize: '0.7rem', color: '#22C55E', fontWeight: 900 }}>PERSON OWNERSHIP VERIFIED</div>
                                        : directEmail ? <div style={{ fontSize: '0.7rem', color: '#B45309', fontWeight: 900 }}>{String(c.email_ownership_status || 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED').replaceAll('_', ' ')}</div>
                                        : companyEmail ? <div style={{ fontSize: '0.7rem', color: '#B45309', fontWeight: 900 }}>COMPANY MAILBOX</div>
                                        : null}
                                </td>
                                <td style={{ padding: '1.6rem 1rem' }}>
                                    {displayedNumber ? (
                                        <div>
                                            {whatsappUrl(displayedNumber) ? <a href={whatsappUrl(displayedNumber)!} target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 800, textDecoration: 'none' }}>{displayedNumber}</a> : <span style={{ color: TEXT_PRIMARY, fontWeight: 800 }}>{displayedNumber}</span>}
                                            {!directNumber ? <div style={{ fontSize: '0.66rem', color: TEXT_SECONDARY, fontWeight: 800 }}>COMPANY NUMBER</div> : null}
                                        </div>
                                    ) : <span style={{ color: TEXT_SECONDARY, opacity: 0.4 }}>No public number found</span>}
                                </td>
                                <td style={{ padding: '1.6rem 1rem' }}>
                                    {c.linkedin_url ? (
                                        <a href={c.linkedin_url} target="_blank" rel="noreferrer" style={{ color: '#0077b5', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <Linkedin size={22} color="#0077b5" />
                                        </a>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.4, fontSize: '0.75rem', fontWeight: 600 }}>Unverified</span>
                                    )}
                                </td>
                                <td style={{ padding: '1.6rem 2rem' }}>
                                    <div style={{ fontWeight: 900, color: TEXT_PRIMARY }}>{c.confidence_score || 0}%</div>
                                    <div style={{ fontSize: '0.7rem', color: TEXT_SECONDARY, fontWeight: 700 }}>{c.source || 'free_enrichment'}</div>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </GlassCard>

            {/* PAGINATION CONTROLS */}
            {filteredContacts.length > 0 && (
                <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 20, padding: '1.2rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ fontSize: '0.82rem', color: TEXT_SECONDARY, fontWeight: 700 }}>
                        Showing <span style={{ color: TEXT_PRIMARY, fontWeight: 800 }}>{Math.min(filteredContacts.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredContacts.length, currentPage * itemsPerPage)}</span> of <span style={{ color: ACCENT, fontWeight: 900 }}>{filteredContacts.length}</span> Verified Decision Makers
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => Math.max(1, p-1)); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', background: currentPage === 1 ? 'rgba(0,0,0,0.02)' : '#fff', color: currentPage === 1 ? TEXT_SECONDARY : TEXT_PRIMARY, fontWeight: 800, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', opacity: currentPage === 1 ? 0.4 : 1 }}
                        >
                            PREVIOUS
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 900, color: ACCENT, padding: '0 8px' }}>
                            PAGE {currentPage} / {Math.ceil(filteredContacts.length / itemsPerPage) || 1}
                        </span>
                        <button
                            disabled={currentPage * itemsPerPage >= filteredContacts.length}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', background: currentPage * itemsPerPage >= filteredContacts.length ? 'rgba(0,0,0,0.02)' : ACCENT, color: currentPage * itemsPerPage >= filteredContacts.length ? TEXT_SECONDARY : '#fff', fontWeight: 800, cursor: currentPage * itemsPerPage >= filteredContacts.length ? 'not-allowed' : 'pointer', fontSize: '0.8rem', opacity: currentPage * itemsPerPage >= filteredContacts.length ? 0.4 : 1, boxShadow: currentPage * itemsPerPage < filteredContacts.length ? `0 4px 14px ${ACCENT}33` : 'none' }}
                        >
                            NEXT PAGE →
                        </button>
                    </div>
                </GlassCard>
            )}
          </div>
        )}

        {view === 'prospects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <AppleHeading subtitle="Find target companies, extract decision-maker contacts, and prepare personalized outreach drafts.">
                AI Qualified Targets
             </AppleHeading>

             {/* ── SPOTLIGHT SEARCH CONTROL BAR ── */}
             <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '1.8rem', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
                 <div style={{ fontSize: '0.82rem', fontWeight: 800, color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                   <Globe size={16} color={ACCENT} />
                   {discoveryMode === 'maps' ? 'Google Maps Intelligence' : 'Web Search Market Intelligence'}
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                   {/* Mode Selector */}
                   <div style={{ display: 'inline-flex', padding: 4, background: '#F5F5F7', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
                     <button
                       onClick={() => setDiscoveryMode('web')}
                       style={{ border: 'none', background: discoveryMode === 'web' ? ACCENT : 'transparent', color: discoveryMode === 'web' ? '#fff' : TEXT_SECONDARY, borderRadius: 9, padding: '7px 14px', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                     >
                       Web Search
                     </button>
                     <button
                       onClick={() => setDiscoveryMode('maps')}
                       style={{ border: 'none', background: discoveryMode === 'maps' ? '#ff9500' : 'transparent', color: discoveryMode === 'maps' ? '#fff' : TEXT_SECONDARY, borderRadius: 9, padding: '7px 14px', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                     >
                       Google Maps
                     </button>
                   </div>

                   {/* Depth Selector */}
                   <div style={{ display: 'inline-flex', padding: 4, background: '#F5F5F7', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
                     <button
                       onClick={() => setSearchDepth('fast')}
                       style={{ border: 'none', background: searchDepth === 'fast' ? ACCENT : 'transparent', color: searchDepth === 'fast' ? '#fff' : TEXT_SECONDARY, borderRadius: 9, padding: '7px 14px', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                     >
                       Fast
                     </button>
                     <button
                       onClick={() => setSearchDepth('deep')}
                       style={{ border: 'none', background: searchDepth === 'deep' ? TEXT_PRIMARY : 'transparent', color: searchDepth === 'deep' ? '#fff' : TEXT_SECONDARY, borderRadius: 9, padding: '7px 14px', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                     >
                       Deep
                     </button>
                   </div>
                 </div>
               </div>

               {/* Search Input Bar */}
               <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: windowWidth < 800 ? 'wrap' : 'nowrap' }}>
                 <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                   <Search size={20} color={ACCENT} style={{ position: 'absolute', left: 18 }} />
                   <input
                     placeholder={discoveryMode === 'maps' ? "Search Google Maps (e.g. Fit Out Companies Dubai, MEP Sharjah)..." : "Search company keyword (e.g. Interior Design Dubai, MEP Contracting UAE)..."}
                     value={discoveryMode === 'maps' ? ninjaQuery : searchQuery}
                     onChange={e => discoveryMode === 'maps' ? setNinjaQuery(e.target.value) : setSearchQuery(e.target.value)}
                     onKeyPress={e => e.key === 'Enter' && runDiscovery()}
                     style={{
                       width: '100%',
                       padding: '16px 20px 16px 52px',
                       borderRadius: 16,
                       background: '#F8F9FA',
                       border: '1px solid rgba(0,0,0,0.08)',
                       color: TEXT_PRIMARY,
                       fontSize: '0.95rem',
                       fontWeight: 600,
                       outline: 'none',
                       boxSizing: 'border-box'
                     }}
                   />
                 </div>

                 <button
                   onClick={runDiscovery}
                   disabled={searching || ninjaLoading}
                   className="apple-button"
                   style={{
                     background: discoveryMode === 'maps' ? '#ff9500' : ACCENT,
                     color: '#fff',
                     border: 'none',
                     padding: '16px 32px',
                     borderRadius: 16,
                     fontWeight: 800,
                     fontSize: '0.88rem',
                     cursor: 'pointer',
                     whiteSpace: 'nowrap',
                     boxShadow: '0 4px 16px rgba(0, 113, 227, 0.2)'
                   }}>
                   {searching || ninjaLoading ? "DISCOVERING..." : "DISCOVER TARGETS"}
                 </button>
               </div>
             </GlassCard>

             {/* ── FILTER SEGMENTED BAR ── */}
             <div style={{
               display: 'flex',
               alignItems: 'center',
               gap: 8,
               padding: '6px',
               background: '#F5F5F7',
               borderRadius: 16,
               border: '1px solid rgba(0,0,0,0.05)',
               flexWrap: 'wrap'
             }}>
               <button
                 onClick={() => { setTargetFilter('all'); setCurrentPage(1); }}
                 style={{
                   border: 'none',
                   background: targetFilter === 'all' ? ACCENT : 'transparent',
                   color: targetFilter === 'all' ? '#fff' : TEXT_SECONDARY,
                   borderRadius: 12,
                   padding: '10px 18px',
                   fontWeight: 800,
                   fontSize: '0.82rem',
                   cursor: 'pointer',
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: 8,
                   transition: 'all 0.2s ease'
                 }}>
                 <Globe size={15} /> All Relevant ({allTargetLeads.length})
               </button>
               <button
                 onClick={() => { setTargetFilter('executives'); setCurrentPage(1); }}
                 style={{
                   border: 'none',
                   background: targetFilter === 'executives' ? ACCENT : 'transparent',
                   color: targetFilter === 'executives' ? '#fff' : TEXT_SECONDARY,
                   borderRadius: 12,
                   padding: '10px 18px',
                   fontWeight: 800,
                   fontSize: '0.82rem',
                   cursor: 'pointer',
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: 8,
                   transition: 'all 0.2s ease'
                 }}>
                 <User size={15} /> Has Executive Contact ({allTargetLeads.filter(p => p.contact_name).length})
               </button>
               <button
                 onClick={() => { setTargetFilter('company_email'); setCurrentPage(1); }}
                 style={{
                   border: 'none',
                   background: targetFilter === 'company_email' ? ACCENT : 'transparent',
                   color: targetFilter === 'company_email' ? '#fff' : TEXT_SECONDARY,
                   borderRadius: 12,
                   padding: '10px 18px',
                   fontWeight: 800,
                   fontSize: '0.82rem',
                   cursor: 'pointer',
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: 8,
                   transition: 'all 0.2s ease'
                 }}>
                 <Mail size={15} /> Has Company Email ({allTargetLeads.filter(p => p.email && String(p.email).trim() !== '' && !p.contact_name).length})
               </button>
               <button
                 onClick={() => { setTargetFilter('has_phone'); setCurrentPage(1); }}
                 style={{
                   border: 'none',
                   background: targetFilter === 'has_phone' ? '#22C55E' : 'transparent',
                   color: targetFilter === 'has_phone' ? '#fff' : TEXT_SECONDARY,
                   borderRadius: 12,
                   padding: '10px 18px',
                   fontWeight: 800,
                   fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s ease'
                  }}>
                  <Phone size={15} /> Has Phone / WA ({allTargetLeads.filter(p => String(p.phone || p.mobile_number || p.contact_phone || p.direct_number || '').replace(/\D/g, '').length >= 7).length})
                </button>
                <button
                  onClick={() => { setTargetFilter('awaiting'); setCurrentPage(1); }}
                  style={{
                    border: 'none',
                    background: targetFilter === 'awaiting' ? ACCENT : 'transparent',
                    color: targetFilter === 'awaiting' ? '#fff' : TEXT_SECONDARY,
                    borderRadius: 12,
                    padding: '10px 18px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s ease'
                  }}>
                  <Zap size={15} /> Awaiting Enrichment ({allTargetLeads.filter(p => !p.email || String(p.email).trim() === '').length})
                </button>
              </div>

             {/* Issue 6 Fix: Action buttons in separate row with clear margin */}
             <div style={{ display: 'flex', flexDirection: windowWidth < 900 ? 'column' : 'row', justifyContent: 'space-between', alignItems: windowWidth < 900 ? 'flex-start' : 'center', gap: 24, marginTop: 16 }}>
                <div>
                    <h4 style={{ margin: 0, color: TEXT_PRIMARY, fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>ENTITY PIPELINE</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: TEXT_SECONDARY, fontWeight: 500 }}>Enrich contacts here, then prepare qualified leads for evidence review.</p>
                    <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: TEXT_SECONDARY, fontWeight: 500, opacity: 0.8 }}>
                      Select targets and create review drafts. Approval and sending remain separate controls.
                    </p>
                    {reEnrichReport && (
                      <div style={{ marginTop: 10, fontSize: '0.82rem', color: TEXT_SECONDARY, fontWeight: 700 }}>
                        Last run: {reEnrichReport.processed || 0} processed, {reEnrichReport.contacts_saved || 0} contacts saved, {reEnrichReport.emails_found || 0} emails found.
                      </div>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: windowWidth < 900 ? '100%' : 'auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: windowWidth < 900 ? 'flex-start' : 'flex-end' }}>
                      <button
                        onClick={() => handleReEnrich('selected')}
                        disabled={selected.length === 0 || enriching}
                        className="apple-button"
                        style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '14px 18px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' }}>
                        {enriching && reEnrichScope === 'selected' ? 'Running...' : `Selected (${selected.length})`}
                      </button>
                      <button
                        onClick={() => handleReEnrich('current_page')}
                        disabled={currentDiscoveryPageLeadIds.length === 0 || enriching}
                        className="apple-button"
                        style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '14px 18px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' }}>
                        {enriching && reEnrichScope === 'current_page' ? 'Running...' : `This Page (${currentDiscoveryPageLeadIds.length})`}
                      </button>
                      <button
                        onClick={() => handleReEnrich('no_email')}
                        disabled={enriching}
                        className="apple-button"
                        style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '14px 18px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' }}>
                        {enriching && reEnrichScope === 'no_email' ? 'Running...' : 'No Email'}
                      </button>
                      <button
                        onClick={() => handleReEnrich('missing_decision_makers')}
                        disabled={enriching}
                        className="apple-button"
                        style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '14px 18px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' }}>
                        {enriching && reEnrichScope === 'missing_decision_makers' ? 'Running...' : 'Missing DMs'}
                      </button>
                      <button
                        onClick={() => handleReEnrich('missing_contacts')}
                        disabled={enriching}
                        className="apple-button"
                        style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '14px 18px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' }}>
                        {enriching && reEnrichScope === 'missing_contacts' ? 'Running...' : 'No Contacts'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: windowWidth < 700 ? 'column' : 'row', gap: 12, justifyContent: windowWidth < 900 ? 'flex-start' : 'flex-end' }}>
                    <button 
                      onClick={() => handleReEnrich('selected')} 
                      disabled={selected.length === 0 || enriching}
                      className="apple-button"
                      style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}33`, padding: '18px 28px', borderRadius: 16, fontWeight: 800, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 25px rgba(0,113,227,0.08)' }}>
                        <Users size={20} />
                        {enriching && reEnrichScope === 'selected' ? "Enriching..." : `Find Decision Makers (${selected.length})`}
                    </button>
                    <button 
                      onClick={handleBulkSend} 
                      disabled={selected.length === 0 || sending}
                      className="apple-button"
                      style={{ background: TEXT_PRIMARY, color: '#fff', border: 'none', padding: '18px 30px', borderRadius: 16, fontWeight: 800, cursor: selected.length ? 'pointer' : 'not-allowed', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
                        <FileText size={20} />
                        {sending ? "Queueing..." : `Create Review Drafts (${selected.length})`}
                    </button>
                    <button 
                      onClick={handleBatchDelete} 
                      disabled={selected.length === 0}
                      className="apple-button"
                      style={{ background: selected.length ? 'rgba(255,59,48,0.12)' : '#F5F5F7', color: selected.length ? '#EF4444' : TEXT_SECONDARY, border: selected.length ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(0,0,0,0.05)', padding: '18px 24px', borderRadius: 16, fontWeight: 800, cursor: selected.length ? 'pointer' : 'not-allowed', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Trash2 size={20} />
                        {`Delete Selected (${selected.length})`}
                    </button>
                    </div>
                </div>
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
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700, textAlign: 'center' }}>Social</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Landing Page</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Email Intel</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Phone / WA</th>
                            <th style={{ padding: '1.5rem 2rem', fontWeight: 700 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discoveryLeads.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', opacity: 0.2 }}>No pending targets found. Launch a new search above.</td>
                            </tr>
                        )}
                        {discoveryLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(p => {
                            const isSelected = selected.includes(p.id);
                            const safeWebsite = typeof p.website === 'string' ? p.website : '';
                            const displayWebsite = safeWebsite
                                .replace(/^https?:\/\//, '')
                                .replace(/^www\./, '');
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
                                    <td style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                                        {getValidLinkedInUrl(p.linkedin_url) ? (
                                            <a href={getValidLinkedInUrl(p.linkedin_url)!} target="_blank" style={{ color: '#0077b5' }} onClick={e => e.stopPropagation()}><Linkedin size={22} /></a>
                                        ) : (
                                            <span style={{ color: TEXT_SECONDARY, opacity: 0.2 }}>—</span>
                                        )}
                                    </td>
                                <td style={{ padding: '2rem 1rem', maxWidth: 220 }}>
                                    {safeWebsite ? (
                                        <a href={safeWebsite} target="_blank" rel="noreferrer" title={safeWebsite} style={{ color: ACCENT, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
                                            {displayWebsite || safeWebsite}
                                        </a>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.35 }}>No website</span>
                                    )}
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
                                                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.03)', border: `1px solid ${ACCENT}`, color: TEXT_PRIMARY, fontSize: '0.8rem', outline: 'none', minWidth: 0 }}
                                            />
                                            <button onClick={() => updateLeadEmail(p.id, editingEmail[p.id])} style={{ padding: '8px 12px', background: ACCENT, border: 'none', borderRadius: 8, color: '#fff', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>✓</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ minWidth: 0 }}>
                                              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: TEXT_PRIMARY }}>
                                                {p.email || <span style={{ color: p.enrichment_status === 'failed' || p.enrichment_status === 'needs_review' ? '#EF4444' : TEXT_SECONDARY, opacity: 0.6 }}>{p.enrichment_status === 'processing' ? 'Identifying...' : p.enrichment_status === 'completed' ? 'No Email Discovered' : (p.enrichment_status || 'pending').replaceAll('_', ' ')}</span>}
                                              </div>
                                              {p.last_error_message && <div title={p.last_error_message} style={{ marginTop: 4, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#EF4444', fontSize: '0.68rem' }}>{p.last_error_message}</div>}
                                            </div>
                                            {['failed', 'retry_scheduled', 'needs_review'].includes(p.enrichment_status) && (
                                              <button onClick={(e) => { e.stopPropagation(); retryLeadEnrichment(p.id); }} disabled={enriching} title="Retry enrichment" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid rgba(0,113,227,0.25)', background: 'rgba(0,113,227,0.08)', color: ACCENT, cursor: enriching ? 'wait' : 'pointer', fontSize: '0.68rem', fontWeight: 800 }}>RETRY</button>
                                            )}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setEditingEmail(prev => ({...prev, [p.id]: p.email || ''})); }}
                                                title="Edit email manually"
                                                style={{ padding: '4px 8px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 6, color: 'rgba(0,0,0,0.6)', cursor: 'pointer', fontSize: '0.7rem', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}
                                            ><FileText size={12} /></button>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '1.8rem 1rem' }}>
                                                       {whatsappUrl(p.mobile_number) ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: TEXT_PRIMARY }}>{p.mobile_number}</div>
                                            <a href={whatsappUrl(p.mobile_number)!} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', padding: '4px 8px', borderRadius: 6, textDecoration: 'none', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(37, 211, 102, 0.3)', width: 'fit-content' }}>
                                                <MessageSquare size={12} /> WhatsApp
                                            </a>
                                        </div>
                                    ) : (p.phone || p.phone_e164) ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: TEXT_PRIMARY }}>{p.phone_e164 || p.phone}</div>
                                            <a href={`tel:${p.phone_e164 || p.phone}`} onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0, 113, 227, 0.12)', color: ACCENT, padding: '4px 8px', borderRadius: 6, textDecoration: 'none', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(0, 113, 227, 0.25)', width: 'fit-content' }}>
                                                <Phone size={12} /> Phone
                                            </a>
                                        </div>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.2 }}>N/A</span>
                                    )}
                                </td>
                                <td style={{ padding: '1.8rem 2rem' }}>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); deleteLead(p.id); }}
                                        className="apple-button"
                                        style={{ padding: '8px', background: 'rgba(255,59,48,0.1)', border: 'none', borderRadius: 8, color: '#ff3b30', cursor: 'pointer' }}
                                        title="Delete Lead"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
                
                {/* PAGINATION CONTROLS */}
                <div style={{ padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.01)' }}>
                    <div style={{ fontSize: '0.85rem', color: TEXT_SECONDARY, fontWeight: 600 }}>
                        Showing <span style={{ color: TEXT_PRIMARY }}>{Math.min(itemsPerPage, discoveryLeads.length - (currentPage-1)*itemsPerPage)}</span> of <span style={{ color: TEXT_PRIMARY }}>{discoveryLeads.length}</span> entities
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => Math.max(1, p-1)); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', background: currentPage === 1 ? 'transparent' : '#fff', color: TEXT_PRIMARY, fontWeight: 700, cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.3 : 1 }}
                        >Previous</button>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0 15px', fontSize: '0.9rem', fontWeight: 800, color: ACCENT }}>
                            PAGE {currentPage}
                        </div>
                        <button 
                            disabled={currentPage * itemsPerPage >= discoveryLeads.length}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', background: '#fff', color: TEXT_PRIMARY, fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
             </GlassCard>
             {/* v20.2: LIVE STREAM MIRROR IN DISCOVERY VIEW */}
             <div style={{ marginTop: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                  <button
                    onClick={() => setShowDiscoveryConsole(v => !v)}
                    style={{ border: '1px solid rgba(0,0,0,0.08)', background: '#fff', color: TEXT_SECONDARY, borderRadius: 999, padding: '10px 16px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    {showDiscoveryConsole ? 'Hide Discovery Console' : 'Show Discovery Console'}
                  </button>
               </div>
               {showDiscoveryConsole && (
               <GlassCard style={{ maxHeight: '400px', overflow: 'hidden', background: '#000', border: '1px solid #FFD70022' }}>
                  <h4 style={{ margin: 0, padding: '1.5rem 2.5rem', background: 'rgba(255,215,0,0.03)', borderBottom: '1px solid rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, color: '#FFD700', letterSpacing: 1 }}><Terminal size={18} /> DISCOVERY CONSOLE</span>
                     <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>OPTIONAL LIVE LOGS</span>
                  </h4>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', maxHeight: 300, overflowY: 'auto' }}>
                     {logs.length === 0 ? (
                         <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.2, fontSize: '0.9rem', fontStyle: 'italic' }}>
                            Waiting for discovery activity...
                         </div>
                     ) : (
                         logs.map((log: any, i: number) => (
                             <div key={i} style={{ fontSize: '0.8rem', color: '#e2e8f0', padding: '6px 0' }}>[{log.time}] {log.msg}</div>
                         ))
                     )}
                  </div>
               </GlassCard>
               )}
             </div>
         </div>
       )}

       {view === 'bulk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <AppleHeading subtitle="Directly import company names, web domain URLs, or Google Maps locations for automated background extraction.">
                Bulk Intelligence Import
             </AppleHeading>
             <GlassCard style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', background: '#fff' }}>
                 <div>
                    <label style={{ fontSize: '0.85rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 14, display: 'block', letterSpacing: 0.5 }}>IDENTIFIED ENTITIES (One per line)</label>
                    <textarea 
                       placeholder="Paste Business Names, URLs, or GMB IDs here..."
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
                             boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                         }}>
                         {searching ? "INGESTING..." : "START BULK DISCOVERY"}
                     </button>
                 </div>
             </GlassCard>
          </div>
        )}

        {view === 'sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <AppleHeading subtitle="Approve AI-generated cold email drafts before delivery to verified prospects.">
                Review & Outreach
             </AppleHeading>
             {config.OUTREACH_ENABLED !== 'true' && (
               <div style={{ padding: '16px 20px', borderRadius: 14, background: '#FFF7ED', border: '1px solid rgba(249,115,22,0.3)', color: '#9A3412', fontWeight: 800 }}>
                 Sending is disabled. Research and draft approval remain available; approved drafts will stay queued.
               </div>
             )}
             <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: 6 }}>Human Approval</div>
                    <h2 style={{ margin: 0, color: TEXT_PRIMARY, fontSize: '1.6rem', fontWeight: 900 }}>Draft Review Queue</h2>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ color: pendingDraftCount ? '#B45309' : '#22C55E', fontWeight: 900, marginRight: 8 }}>{pendingDraftCount} pending</div>
                    {pendingDraftCount > 0 && (
                      <>
                        <button 
                          onClick={async () => {
                            if (!window.confirm(`Approve all ${pendingDraftCount} drafts for outreach?`)) return;
                            try {
                              const res = await fetch(`${API_BASE}/outreach-drafts/bulk-approve`, { method: 'POST' });
                              const data = await res.json();
                              if (data.success) {
                                addLog(`✅ Bulk Approved ${data.count} drafts for outreach!`, 'success');
                                const updated = await fetch(`${API_BASE}/outreach-drafts`);
                                setOutreachDrafts(await updated.json());
                              }
                            } catch (e: any) { addLog(`Bulk Approve Error: ${e.message}`, 'err'); }
                          }}
                          style={{ border: 'none', background: '#22C55E', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(34,197,94,0.2)' }}>
                          <Check size={16} /> APPROVE ALL ({pendingDraftCount})
                        </button>
                        <button 
                          onClick={async () => {
                            if (!window.confirm(`Delete all ${reviewDrafts.length} drafts from database?`)) return;
                            try {
                              const res = await fetch(`${API_BASE}/outreach-drafts/bulk-delete`, { method: 'POST' });
                              const data = await res.json();
                              if (data.success) {
                                addLog(`Deleted all drafts from database.`, 'info');
                                setOutreachDrafts([]);
                              }
                            } catch (e: any) { addLog(`Bulk Delete Error: ${e.message}`, 'err'); }
                          }}
                          style={{ border: 'none', background: '#FEE2E2', color: '#B91C1C', padding: '10px 18px', borderRadius: 10, fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <X size={16} /> DELETE ALL
                        </button>
                      </>
                    )}
                  </div>
                </div>

               {reviewDrafts.length === 0 ? (
                 <div style={{ padding: '26px 0', borderTop: '1px solid rgba(0,0,0,0.08)', color: TEXT_SECONDARY, fontWeight: 700 }}>
                   No AI outreach drafts are awaiting review yet. The worker drafts for verified person emails first; when no person email is found, it can use the official website/company email as a fallback draft.
                 </div>
               ) : reviewDrafts.map(draft => {
                 const edit = draftEdits[draft.id] || { subject: draft.subject || '', text_body: draft.text_body || '' };
                  const facts = parseJsonList(draft.prospect_facts_json);
                  const warnings = parseJsonList(draft.validation_warnings_json);
                  const pending = draft.approval_status === 'draft';
                  const confirmedAiCompletion = Boolean(draft.model && String(draft.model).trim() !== '' && draft.model !== 'none');
                  const meaningfulFacts = facts.filter(isMeaningfulDraftFact);
                  const companyMailboxReview = warnings.some((warning: any) => /company mailbox/i.test(String(warning || '')));
                  const blockingWarnings = warnings.filter((warning: any) => /meaningful commercial trigger/i.test(String(warning || '')));
                  const hardWarnings = warnings.filter((warning: any) => /company mailbox|linkedIn profile is missing|person-level evidence|meaningful commercial trigger|decision-maker name is missing/i.test(String(warning || '')));
                  const adjustedQualityScore = Math.max(0, Math.min(100, Number(draft.quality_score || 0) - blockingWarnings.length * 10 - Math.max(0, 2 - meaningfulFacts.length) * 8));
                  // Human founder always has 100% override authority to approve any pending draft
                  const approvalReady = pending;
                  return (
                   <article key={draft.id} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: 20, display: 'grid', gridTemplateColumns: windowWidth < 1000 ? '1fr' : 'minmax(0, 1.35fr) minmax(300px, 0.65fr)', gap: 22 }}>
                     <div style={{ minWidth: 0 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                         <div>
                           <div style={{ color: TEXT_PRIMARY, fontWeight: 900, fontSize: '1.05rem' }}>{draft.company_name}</div>
                           <div style={{ color: TEXT_SECONDARY, fontSize: '0.78rem', marginTop: 4 }}>{draft.recipient_email}</div>
                         </div>
                         <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <span style={{ color: adjustedQualityScore >= 70 ? '#22C55E' : '#B45309', fontWeight: 900 }}>{adjustedQualityScore}% evidence quality</span>
                           <span style={{ padding: '5px 8px', borderRadius: 6, background: confirmedAiCompletion ? '#E8F5E9' : '#FEE2E2', color: confirmedAiCompletion ? '#15803D' : '#B91C1C', fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase' }}>
                             {confirmedAiCompletion ? `AI ${draft.model}` : 'AI completion unconfirmed'}
                           </span>
                           <span style={{ padding: '5px 8px', borderRadius: 6, background: pending ? '#FFF7ED' : '#F0FFF4', color: pending ? '#B45309' : '#15803D', fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase' }}>{draft.approval_status}</span>
                         </div>
                       </div>
                       <input
                         value={edit.subject}
                         disabled={!pending}
                         onChange={event => setDraftEdits(prev => ({ ...prev, [draft.id]: { ...edit, subject: event.target.value } }))}
                         style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 6, color: TEXT_PRIMARY, fontWeight: 700, background: pending ? '#fff' : '#F5F5F7', marginBottom: 10 }}
                       />
                       <textarea
                         value={edit.text_body}
                         disabled={!pending}
                         onChange={event => setDraftEdits(prev => ({ ...prev, [draft.id]: { ...edit, text_body: event.target.value } }))}
                         rows={10}
                         style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: '14px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 6, color: TEXT_PRIMARY, lineHeight: 1.55, background: pending ? '#fff' : '#F5F5F7' }}
                       />
                       {pending ? <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                          <button disabled={!approvalReady} title={!approvalReady ? 'Approval requires a verified person email or official company-mailbox fallback, sourced facts, commercial trigger, and confirmed AI.' : 'Approve this AI-generated draft'} onClick={() => handleDraftAction(draft, 'approve')} style={{ border: 'none', borderRadius: 6, padding: '11px 16px', background: approvalReady ? '#22C55E' : '#D1D5DB', color: '#fff', fontWeight: 900, cursor: approvalReady ? 'pointer' : 'not-allowed', display: 'inline-flex', alignItems: 'center', gap: 7 }}><Check size={16} /> Approve</button>
                         <button onClick={() => handleDraftAction(draft, 'save')} style={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: 6, padding: '11px 16px', background: '#fff', color: TEXT_PRIMARY, fontWeight: 900, cursor: 'pointer' }}>Save Draft</button>
                         <button onClick={() => handleDraftAction(draft, 'reject')} style={{ border: 'none', borderRadius: 6, padding: '11px 16px', background: '#FEE2E2', color: '#B91C1C', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 }}><X size={16} /> Reject</button>
                       </div> : null}
                     </div>
                     <aside style={{ borderLeft: windowWidth < 1000 ? 'none' : '1px solid rgba(0,0,0,0.08)', paddingLeft: windowWidth < 1000 ? 0 : 20 }}>
                       <div style={{ color: TEXT_SECONDARY, fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: 10 }}>Source Evidence ({facts.length})</div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                         {facts.map((item: any, index: number) => <div key={index} style={{ color: TEXT_PRIMARY, fontSize: '0.82rem', lineHeight: 1.45 }}>
                           <div>{item.fact}</div>
                           <a href={item.source_url} target="_blank" rel="noreferrer" style={{ color: ACCENT, fontSize: '0.72rem', fontWeight: 800 }}>View source</a>
                         </div>)}
                       </div>
                       {warnings.length > 0 ? <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                         <div style={{ color: '#B45309', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: 8 }}>Review Flags</div>
                         {warnings.map((warning: string) => <div key={warning} style={{ color: '#92400E', fontSize: '0.78rem', marginBottom: 6 }}>{warning}</div>)}
                       </div> : null}
                     </aside>
                   </article>
                 );
               })}
             </section>

             <GlassCard style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: TEXT_SECONDARY, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.0, background: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '1.5rem 2.5rem', fontWeight: 700 }}>Sent To</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700, textAlign: 'center' }}>Social</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Target Email</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Phone / WA</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Timestamp</th>
                            <th style={{ padding: '1.5rem 1rem', fontWeight: 700 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentLeads.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: '6rem', textAlign: 'center', color: TEXT_SECONDARY, fontWeight: 500, fontSize: '1.1rem' }}>No outreach history found. Initiate discovery to start engagement.</td>
                            </tr>
                        )}
                        {sentLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(p => (
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
                                <td style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                                    {p.linkedin_url ? (
                                        <a href={p.linkedin_url} target="_blank" style={{ color: '#0077b5' }}><Linkedin size={22} /></a>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.2 }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontWeight: 600, color: TEXT_PRIMARY, fontSize: '0.9rem' }}>{p.email}</div>
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    {whatsappUrl(p.mobile_number) ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: TEXT_PRIMARY }}>{p.mobile_number}</div>
                                            <a href={whatsappUrl(p.mobile_number)!} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '6px 12px', borderRadius: 10, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800 }}>
                                                <MessageSquare size={14} /> WHATSAPP
                                            </a>
                                        </div>
                                    ) : (
                                        <span style={{ color: TEXT_SECONDARY, opacity: 0.2 }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <div style={{ fontWeight: 700, color: TEXT_PRIMARY, fontSize: '0.85rem' }}>{new Date(p.last_contacted || p.added_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                    <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 500 }}>{new Date(p.last_contacted || p.added_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </td>
                                <td style={{ padding: '2rem 1rem' }}>
                                    <StatusBadge status={p.delivery_status || 'legacy_sent'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION CONTROLS */}
                <div style={{ padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.01)' }}>
                    <div style={{ fontSize: '0.85rem', color: TEXT_SECONDARY, fontWeight: 600 }}>
                        Showing <span style={{ color: TEXT_PRIMARY }}>{Math.min(itemsPerPage, sentLeads.length - (currentPage-1)*itemsPerPage)}</span> of <span style={{ color: TEXT_PRIMARY }}>{sentLeads.length}</span> sent outreach
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => Math.max(1, p-1)); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', background: currentPage === 1 ? 'transparent' : '#fff', color: TEXT_PRIMARY, fontWeight: 700, cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.3 : 1 }}
                        >Previous</button>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0 15px', fontSize: '0.9rem', fontWeight: 800, color: ACCENT }}>
                            PAGE {currentPage}
                        </div>
                        <button 
                            disabled={currentPage * itemsPerPage >= sentLeads.length}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({top:0, behavior:'smooth'}); }}
                            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', background: '#fff', color: TEXT_PRIMARY, fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
             </GlassCard>
          </div>
        )}

        {view === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: windowWidth < 900 ? 'column' : 'row', alignItems: windowWidth < 900 ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 20, marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: windowWidth < 900 ? '2.2rem' : '3.6rem', fontWeight: 900, letterSpacing: '-0.04em', color: TEXT_PRIMARY, whiteSpace: 'nowrap' }}>System Configuration</h2>
                    
                    {/* Apple Segmented Control Navigation */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: 6,
                        background: '#E5E5EA',
                        borderRadius: 16,
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { id: 'identity', label: 'Agency Identity', icon: Globe },
                            { id: 'targeting', label: 'Dynamic Targeting', icon: Target },
                            { id: 'brain', label: 'AI Engine & Keys', icon: Cpu },
                            { id: 'outreach', label: 'Business Email (SMTP)', icon: Mail },
                            { id: 'suppression', label: 'Suppression & Quality', icon: ShieldCheck },
                            { id: 'integrations', label: 'Webhooks & Export', icon: Zap },
                            { id: 'system', label: 'License & System', icon: Key },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const active = settingsTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setSettingsTab(tab.id as any)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '10px 18px',
                                        borderRadius: 12,
                                        border: 'none',
                                        background: active ? '#FFFFFF' : 'transparent',
                                        color: active ? TEXT_PRIMARY : TEXT_SECONDARY,
                                        fontWeight: active ? 800 : 600,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                        boxShadow: active ? '0 4px 14px rgba(0,0,0,0.08)' : 'none',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    <Icon size={16} color={active ? ACCENT : TEXT_SECONDARY} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── SUB-TAB 1: AGENCY & RESALE IDENTITY ── */}
                {settingsTab === 'identity' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Globe size={24} color={ACCENT} /> {config.COMPANY_NAME || 'Agency'} Identity & Resale Profile
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Agency / Company Name</label>
                                    <input value={config.COMPANY_NAME || ''} onChange={e => setConfig({...config, COMPANY_NAME: e.target.value})} onBlur={e => saveSettings({ COMPANY_NAME: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="Asif Digital Agency" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Primary Representative</label>
                                    <input value={config.REPRESENTATIVE_NAME || config.REP_NAME || ''} onChange={e => setConfig({...config, REPRESENTATIVE_NAME: e.target.value, REP_NAME: e.target.value})} onBlur={e => saveSettings({ REPRESENTATIVE_NAME: e.target.value, REP_NAME: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="Asif (Founder & CEO)" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Official Website</label>
                                    <input value={config.COMPANY_URL || ''} onChange={e => setConfig({...config, COMPANY_URL: e.target.value})} onBlur={e => websiteHostname(e.target.value) ? saveSettings({ COMPANY_URL: e.target.value }) : addLog('Official Website must be a valid URL without HTML.', 'err')} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="https://asifdigital.agency" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Contact Line / Phone</label>
                                    <input value={config.PHONE || ''} onChange={e => setConfig({...config, PHONE: e.target.value})} onBlur={e => saveSettings({ PHONE: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="+971 50 123 4567" />
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Booking Calendar URL (Calendly / Cal.com)</label>
                                    <input value={config.calendar_url || config.meeting_link || config.CALENDAR_URL || ''} onChange={e => setConfig({...config, calendar_url: e.target.value, meeting_link: e.target.value, CALENDAR_URL: e.target.value})} onBlur={e => saveSettings({ calendar_url: e.target.value, meeting_link: e.target.value, CALENDAR_URL: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="https://calendly.com/your-agency" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Signature Image / Logo URL</label>
                                    <input value={config.SIGNATURE_IMAGE_URL || ''} onChange={e => setConfig({...config, SIGNATURE_IMAGE_URL: e.target.value})} onBlur={e => saveSettings({ SIGNATURE_IMAGE_URL: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="https://your-agency.com/logo.png" />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {/* ── SUB-TAB 2: DYNAMIC TARGETING & FILTERS ── */}
                {settingsTab === 'targeting' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Sliders size={24} color={ACCENT} /> Strategic Targeting Filters
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: ACCENT, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Globe size={16} /> Target Regions / Cities (Multi-Location Target Input)
                                    </label>
                                    <input 
                                        placeholder="e.g. Dubai, Abu Dhabi, New York, Toronto, London, Sydney"
                                        value={config.target_location || config.TARGET_LOCATION || ''} 
                                        onChange={e => setConfig({...config, target_location: e.target.value, TARGET_LOCATION: e.target.value})} 
                                        onBlur={e => saveSettings({ target_location: e.target.value, TARGET_LOCATION: e.target.value })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                    <p style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 8, fontWeight: 500 }}>Separate multiple target locations by comma. The AI agent will discover companies across all specified cities concurrently.</p>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Negative Keywords / Exclusions (Comma Separated)</label>
                                    <textarea 
                                        rows={4}
                                        placeholder="e.g. retail shop, furniture retail, wallpaper fixing, handyman, beauty salon, residential tower..."
                                        value={config.NEGATIVE_KEYWORDS || ''} 
                                        onChange={e => setConfig({...config, NEGATIVE_KEYWORDS: e.target.value})} 
                                        onBlur={e => saveSettings({ NEGATIVE_KEYWORDS: e.target.value })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box', lineHeight: 1.5 }} 
                                    />
                                    <p style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 8, fontWeight: 500 }}>The AI engine will strictly reject any candidate company or link matching these terms at intake.</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Required Keywords</label>
                                        <input 
                                            placeholder="e.g. IT Solutions, Contracting, Logistics"
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
                                            onChange={(e: any) => {
                                                setConfig({ ...config, INVESTIGATION_DEPTH: e.target.value });
                                                saveSettings({ INVESTIGATION_DEPTH: e.target.value });
                                            }}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 600, cursor: 'pointer' }}>
                                            <option value="shallow">Shallow (Homepage only)</option>
                                            <option value="deep">Deep (OSINT full site scan)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem' }}>
                                <Zap size={24} color={ACCENT} /> Knowledge Base & Core Outreach Pitch
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 1100 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Primary Value Proposition (Core Pitch Text)</label>
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
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Company Profile PDF / Link</label>
                                        <input value={config.COMPANY_PROFILE_URL} onChange={e => setConfig({...config, COMPANY_PROFILE_URL: e.target.value})} onBlur={e => saveSettings({ COMPANY_PROFILE_URL: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: TEXT_PRIMARY, fontWeight: 600 }} placeholder="https://drive.google.com/..." />
                                    </div>
                                    <div style={{ flex: 1, padding: '2rem', border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#F9F9FB' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${ACCENT}15`, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                            <FileText size={24} />
                                        </div>
                                        <div style={{ fontWeight: 800, marginBottom: 4, color: TEXT_PRIMARY }}>Knowledge Base Ingestion</div>
                                        <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginBottom: 20 }}>Upload your company profile PDF to teach the agent about your business.</div>
                                        <input type="file" id="kb-upload" hidden onChange={handleKBFile} accept=".pdf,.txt" />
                                        <label htmlFor="kb-upload" style={{ padding: '12px 26px', background: ACCENT, color: '#fff', borderRadius: 12, fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}>
                                            {kbLoading ? 'INGESTING...' : 'SELECT DOCUMENT'}
                                        </label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Booking Calendar URL (Calendly / Cal.com)</label>
                                        <input 
                                            value={config.calendar_url || config.meeting_link || config.CALENDAR_URL || ''} 
                                            onChange={e => setConfig({...config, calendar_url: e.target.value, meeting_link: e.target.value, CALENDAR_URL: e.target.value})} 
                                            onBlur={e => saveSettings({ calendar_url: e.target.value, meeting_link: e.target.value, CALENDAR_URL: e.target.value })} 
                                            style={{ width: '100%', padding: '14px 18px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                            placeholder="https://calendly.com/asifdigitalagency" 
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Neural Knowledge Base (Company Profile & Fact Ingestion)</label>
                                        <textarea 
                                            value={config.COMPANY_KNOWLEDGE || config.company_knowledge || ''} 
                                            onChange={e => setConfig({...config, COMPANY_KNOWLEDGE: e.target.value, company_knowledge: e.target.value})}
                                            onBlur={e => saveSettings({ COMPANY_KNOWLEDGE: e.target.value, company_knowledge: e.target.value })}
                                            rows={8}
                                            style={{ width: '100%', padding: '16px', borderRadius: 16, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontSize: '0.85rem', outline: 'none', lineHeight: 1.5, fontWeight: 500, boxSizing: 'border-box' }}
                                            placeholder="Paste your company background, service descriptions, target markets, or let PDF Ingestion extract it automatically..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {/* ── SUB-TAB 2: SMTP & OUTREACH ── */}
                {settingsTab === 'outreach' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard style={{ background: config.OUTREACH_ENABLED === 'true' ? '#F0FFF4' : '#FFF7ED', border: `1px solid ${config.OUTREACH_ENABLED === 'true' ? 'rgba(34,197,94,0.2)' : 'rgba(249,115,22,0.25)'}`, padding: '2.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: windowWidth < 800 ? 'column' : 'row', alignItems: windowWidth < 800 ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 20 }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: TEXT_PRIMARY, display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <ShieldCheck size={26} color={config.OUTREACH_ENABLED === 'true' ? '#22C55E' : '#F97316'} /> Outreach Safety Mode
                                    </h4>
                                    <p style={{ margin: '8px 0 0 0', color: TEXT_SECONDARY, fontWeight: 600, maxWidth: 760 }}>
                                        Discovery, enrichment, and draft review remain active. SMTP accepts only human-approved drafts tied to verified person emails.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                      const enabling = config.OUTREACH_ENABLED !== 'true';
                                      if (enabling && !window.confirm('Enable live outreach? Validated and approved leads may be sent through your configured SMTP account.')) return;
                                      saveSettings({ OUTREACH_ENABLED: enabling ? 'true' : 'false' });
                                    }}
                                    style={{
                                        border: 'none',
                                        borderRadius: 14,
                                        padding: '16px 26px',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        color: '#fff',
                                        background: config.OUTREACH_ENABLED === 'true' ? '#EF4444' : '#22C55E',
                                        minWidth: 210,
                                        boxShadow: config.OUTREACH_ENABLED === 'true' ? '0 8px 22px rgba(239,68,68,0.18)' : '0 8px 22px rgba(34,197,94,0.18)'
                                    }}
                                >
                                    {config.OUTREACH_ENABLED === 'true' ? 'DISABLE SMTP OUTREACH' : 'ENABLE SMTP OUTREACH'}
                                </button>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Mail size={24} color={ACCENT} /> Business Email Relay (SMTP)
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Sender Email / Username</label>
                                    <input value={config.EMAIL_USER || config.SMTP_USER || ''} onChange={e => setConfig({...config, EMAIL_USER: e.target.value, SMTP_USER: e.target.value})} onBlur={e => saveSettings({ EMAIL_USER: e.target.value, SMTP_USER: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="asif@asifdigital.agency" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>SMTP Host</label>
                                    <input value={config.SMTP_HOST || ''} onChange={e => setConfig({...config, SMTP_HOST: e.target.value})} onBlur={e => saveSettings({ SMTP_HOST: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="smtp.gmail.com" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>SMTP Port</label>
                                    <input value={config.SMTP_PORT || '465'} onChange={e => setConfig({...config, SMTP_PORT: e.target.value})} onBlur={e => saveSettings({ SMTP_PORT: e.target.value })} style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="465 or 587" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Sender App Password</label>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <input type="password" value={config.GMAIL_APP_PASS || config.SMTP_PASS || ''} onChange={e => setConfig({...config, GMAIL_APP_PASS: e.target.value, SMTP_PASS: e.target.value})} onBlur={e => saveSettings({ GMAIL_APP_PASS: e.target.value, SMTP_PASS: e.target.value })} style={{ flex: 1, padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} placeholder="••••••••••••••••" />
                                        <button 
                                            onClick={async () => {
                                                const emailUser = (config.EMAIL_USER || config.SMTP_USER || '').trim();
                                                const emailPass = (config.GMAIL_APP_PASS || config.SMTP_PASS || '').trim();
                                                if (!emailUser || !emailPass) {
                                                    alert('Please enter SMTP User and Password first.');
                                                    return;
                                                }
                                                try {
                                                    const healthyBase = await resolveHealthyApiBase();
                                                    const res = await fetch(`${healthyBase}/test-smtp`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ email: emailUser, pass: emailPass, host: config.SMTP_HOST || config.smtp_host || '', port: config.SMTP_PORT || config.smtp_port || '465' })
                                                    });
                                                    const data = await res.json();
                                                    if (data.success) {
                                                        alert('SMTP CONNECTED\n\nAccount: ' + emailUser + '\nReady to send outreach emails.');
                                                    } else {
                                                        alert('SMTP RESPONSE:\n\n' + (data.error || 'Authentication failed. Make sure to use an App Password.'));
                                                    }
                                                } catch (e) {
                                                    alert('Could not reach server. Make sure the backend is running.');
                                                }
                                            }}
                                            style={{ padding: '0 20px', borderRadius: 12, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.15)', color: '#1d1d1f', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                                            TEST CONNECT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Image size={24} color={ACCENT} /> Outreach Visual Assets
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Signature Image URL</label>
                                    <input 
                                        placeholder="Paste your Google Drive direct link here..."
                                        value={config.SIGNATURE_IMAGE_URL || ''} 
                                        onChange={e => setConfig({...config, SIGNATURE_IMAGE_URL: e.target.value})} 
                                        onBlur={e => !e.target.value || websiteHostname(e.target.value) ? saveSettings({ SIGNATURE_IMAGE_URL: e.target.value, OUTREACH_IMAGE_URL: e.target.value }) : addLog('Signature Image must be a valid URL without HTML.', 'err')} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                    <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: 8 }}>This image will be automatically embedded at the top of your email signature.</p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <RefreshCw size={24} color={ACCENT} /> Automatic Follow-ups
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', marginBottom: 20, borderRadius: 14, background: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? 'rgba(52, 199, 89, 0.08)' : 'rgba(0,0,0,0.03)', border: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? '1px solid rgba(52, 199, 89, 0.2)' : '1px solid rgba(0,0,0,0.05)' }}>
                                <div>
                                    <div style={{ fontWeight: 800, color: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? '#166534' : TEXT_PRIMARY, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <CheckCircle size={16} color={config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? '#22C55E' : TEXT_SECONDARY} />
                                        {config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? 'ENABLED (Active Automatic Follow-up Sequencing)' : 'PAUSED'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: 4 }}>Automatically schedules polite follow-ups if prospect does not reply within set delay.</div>
                                </div>
                                <button
                                    onClick={() => {
                                        const nextVal = config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? 'false' : 'true';
                                        setConfig({ ...config, ENABLE_AUTOMATIC_FOLLOWUPS: nextVal });
                                        saveSettings({ ENABLE_AUTOMATIC_FOLLOWUPS: nextVal });
                                    }}
                                    style={{ border: 'none', background: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? '#22C55E' : '#E5E7EB', color: config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? '#fff' : TEXT_PRIMARY, padding: '10px 20px', borderRadius: 12, fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>
                                    {config.ENABLE_AUTOMATIC_FOLLOWUPS === 'true' ? 'ACTIVE' : 'ENABLE'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ width: '140px' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Delay (Days)</label>
                                    <input 
                                        type="number"
                                        min="1"
                                        value={config.FOLLOW_UP_DAYS || 3} 
                                        onChange={e => setConfig({...config, FOLLOW_UP_DAYS: parseInt(e.target.value) || 3})} 
                                        onBlur={e => saveSettings({ FOLLOW_UP_DAYS: parseInt(e.target.value) || 3 })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Follow-up Pitch Hook</label>
                                    <textarea 
                                        value={config.FOLLOW_UP_PITCH_HOOK || ''} 
                                        onChange={e => setConfig({...config, FOLLOW_UP_PITCH_HOOK: e.target.value})} 
                                        onBlur={e => saveSettings({ FOLLOW_UP_PITCH_HOOK: e.target.value })} 
                                        rows={3} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                        placeholder="e.g. Just following up on my previous message regarding our AI sales infrastructure for UAE companies..."
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Zap size={24} color="#ff9500" /> Smart Auto Outreach
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', marginBottom: 20, borderRadius: 14, background: config.smart_auto_outreach === 'enabled' ? 'rgba(52, 199, 89, 0.08)' : 'rgba(0,0,0,0.03)', border: config.smart_auto_outreach === 'enabled' ? '1px solid rgba(52, 199, 89, 0.2)' : '1px solid rgba(0,0,0,0.05)' }}>
                                <div>
                                    <div style={{ fontWeight: 800, color: config.smart_auto_outreach === 'enabled' ? '#166534' : TEXT_PRIMARY, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <CheckCircle size={16} color={config.smart_auto_outreach === 'enabled' ? '#22C55E' : TEXT_SECONDARY} />
                                        {config.smart_auto_outreach === 'enabled' ? 'ENABLED (Auto-approve and send qualified drafts)' : 'DISABLED (Manual Approval Required)'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: 4 }}>Automatically quality-checks, approves, and queues drafts for sending. Safety-fails are held.</div>
                                </div>
                                <button
                                    onClick={() => {
                                        const nextVal = config.smart_auto_outreach === 'enabled' ? 'disabled' : 'enabled';
                                        setConfig({ ...config, smart_auto_outreach: nextVal });
                                        saveSettings({ smart_auto_outreach: nextVal });
                                    }}
                                    style={{ border: 'none', background: config.smart_auto_outreach === 'enabled' ? '#22C55E' : '#E5E7EB', color: config.smart_auto_outreach === 'enabled' ? '#fff' : TEXT_PRIMARY, padding: '10px 20px', borderRadius: 12, fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>
                                    {config.smart_auto_outreach === 'enabled' ? 'ACTIVE' : 'ENABLE'}
                                </button>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                <div style={{ minWidth: '200px' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Outreach Throttle Speed</label>
                                    <select
                                        value={config.auto_outreach_speed || 'standard'}
                                        onChange={(e) => {
                                            setConfig({ ...config, auto_outreach_speed: e.target.value });
                                            saveSettings({ auto_outreach_speed: e.target.value });
                                        }}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                                    >
                                        <option value="conservative">Conservative (30/hr)</option>
                                        <option value="standard">Standard (50/hr)</option>
                                        <option value="aggressive">Aggressive (100/hr)</option>
                                    </select>
                                </div>
                                <div style={{ minWidth: '140px' }}>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Daily Send Cap</label>
                                    <input 
                                        type="number"
                                        min="1"
                                        max="1000"
                                        value={config.daily_limit || 150} 
                                        onChange={e => setConfig({...config, daily_limit: parseInt(e.target.value) || 150})} 
                                        onBlur={e => saveSettings({ daily_limit: parseInt(e.target.value) || 150 })} 
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} 
                                    />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {/* ── SUB-TAB 3: AI BRAIN & INTELLIGENCE ── */}
                {settingsTab === 'brain' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Primary AI Provider Card */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Cpu size={24} color={ACCENT} /> Primary AI Intelligence Provider
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: TEXT_SECONDARY, marginBottom: '2rem', fontWeight: 500 }}>
                                Select your main AI LLM engine for lead evaluation, personalizing cold outreach, and generating pitch drafts.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 800 ? '1fr' : '1fr 1fr', gap: '1.8rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Primary AI Provider</label>
                                        <select 
                                            value={config.primary_ai_provider || 'groq'}
                                            onChange={(e) => {
                                                const provider = e.target.value;
                                                const defaultModels: Record<string, string> = {
                                                    groq: 'llama-3.3-70b-versatile',
                                                    openai: 'gpt-4o-mini',
                                                    openrouter: 'openai/gpt-4o-mini',
                                                    mistral: 'mistral-large-latest',
                                                    custom: 'llama3'
                                                };
                                                const model = defaultModels[provider] || 'llama-3.3-70b-versatile';
                                                setConfig({ ...config, primary_ai_provider: provider, model });
                                                saveSettings({ primary_ai_provider: provider, model });
                                            }}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 700, cursor: 'pointer' }}>
                                            <option value="groq">Groq AI (Fastest & Free Tier)</option>
                                            <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                                            <option value="openrouter">OpenRouter (Multi-Model Router)</option>
                                            <option value="mistral">Mistral AI (Ultra Reasoning)</option>
                                            <option value="custom">Custom API / Ollama / Local LLM</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Primary Model Name</label>
                                        <input 
                                            value={config.model || 'llama-3.3-70b-versatile'} 
                                            onChange={e => setConfig({...config, model: e.target.value})} 
                                            onBlur={e => saveSettings({ model: e.target.value })} 
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 700, outline: 'none', boxSizing: 'border-box' as const }} 
                                            placeholder="llama-3.3-70b-versatile" 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Primary Provider API Key</label>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                                        <input 
                                            type="password" 
                                            placeholder="Enter API key for selected primary provider..." 
                                            value={
                                                (config.primary_ai_provider || 'groq') === 'groq' ? (config.GROQ_API_KEY || config.groq_api_key || '') :
                                                (config.primary_ai_provider || 'groq') === 'openai' ? (config.OPENAI_API_KEY || config.openai_api_key || '') :
                                                (config.primary_ai_provider || 'groq') === 'openrouter' ? (config.OPENROUTER_API_KEY || config.openrouter_api_key || '') :
                                                (config.primary_ai_provider || 'groq') === 'mistral' ? (config.MISTRAL_API_KEY || config.mistral_api_key || '') :
                                                (config.CUSTOM_AI_API_KEY || '')
                                            } 
                                            onChange={e => {
                                                const val = e.target.value;
                                                const prov = config.primary_ai_provider || 'groq';
                                                const keyMap: Record<string, string> = {
                                                    groq: 'groq_api_key',
                                                    openai: 'openai_api_key',
                                                    openrouter: 'openrouter_api_key',
                                                    mistral: 'mistral_api_key',
                                                    custom: 'CUSTOM_AI_API_KEY'
                                                };
                                                setConfig({ ...config, [keyMap[prov]]: val, [keyMap[prov].toUpperCase()]: val });
                                            }} 
                                            onBlur={e => {
                                                const val = e.target.value;
                                                const prov = config.primary_ai_provider || 'groq';
                                                const keyMap: Record<string, string> = {
                                                    groq: 'groq_api_key',
                                                    openai: 'openai_api_key',
                                                    openrouter: 'openrouter_api_key',
                                                    mistral: 'mistral_api_key',
                                                    custom: 'CUSTOM_AI_API_KEY'
                                                };
                                                saveSettings({ [keyMap[prov]]: val, [keyMap[prov].toUpperCase()]: val });
                                            }} 
                                            style={{ flex: 1, width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const }} 
                                        />
                                        <button
                                            onClick={() => testLlmConnection((config.primary_ai_provider || 'groq') as any)}
                                            disabled={llmTestState[(config.primary_ai_provider || 'groq') as keyof typeof llmTestState]?.loading}
                                            style={{ border: 'none', borderRadius: 14, padding: '0 24px', background: ACCENT, color: '#fff', fontWeight: 800, cursor: 'pointer', minWidth: 110 }}
                                        >
                                            {llmTestState[(config.primary_ai_provider || 'groq') as keyof typeof llmTestState]?.loading ? 'Testing...' : 'Test Connection'}
                                        </button>
                                    </div>
                                    {llmTestState[(config.primary_ai_provider || 'groq') as keyof typeof llmTestState]?.message && (
                                        <div style={{ marginTop: 10, fontSize: '0.82rem', fontWeight: 700, color: llmTestState[(config.primary_ai_provider || 'groq') as keyof typeof llmTestState]?.ok ? '#16a34a' : '#dc2626' }}>
                                            {llmTestState[(config.primary_ai_provider || 'groq') as keyof typeof llmTestState]?.message}
                                        </div>
                                    )}
                                </div>

                                {(config.primary_ai_provider === 'custom') && (
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Custom API Base URL (Ollama / Local LLM / vLLM)</label>
                                        <input 
                                            value={config.CUSTOM_AI_BASE_URL || ''} 
                                            onChange={e => setConfig({...config, CUSTOM_AI_BASE_URL: e.target.value})} 
                                            onBlur={e => saveSettings({ CUSTOM_AI_BASE_URL: e.target.value })} 
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const }} 
                                            placeholder="http://localhost:11434/v1" 
                                        />
                                    </div>
                                )}
                            </div>
                        </GlassCard>

                        {/* Fallback AI Provider Card */}
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <RefreshCw size={24} color="#6366F1" /> Fallback AI Provider (Auto Failover)
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: TEXT_SECONDARY, marginBottom: '2rem', fontWeight: 500 }}>
                                If your primary provider hits free-tier rate limits (429) or goes offline, the agent automatically fails over to this secondary provider seamlessly.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 800 ? '1fr' : '1fr 1fr', gap: '1.8rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Fallback AI Provider</label>
                                        <select 
                                            value={config.fallback_ai_provider || 'mistral'}
                                            onChange={(e) => {
                                                const provider = e.target.value;
                                                setConfig({ ...config, fallback_ai_provider: provider });
                                                saveSettings({ fallback_ai_provider: provider });
                                            }}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', color: TEXT_PRIMARY, border: '1px solid rgba(0,0,0,0.05)', outline: 'none', fontWeight: 700, cursor: 'pointer' }}>
                                            <option value="disabled">Disabled (No Fallback)</option>
                                            <option value="mistral">Mistral AI (Recommended Fallback)</option>
                                            <option value="groq">Groq AI</option>
                                            <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                                            <option value="openrouter">OpenRouter</option>
                                            <option value="custom">Custom API / Local LLM</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Fallback Model Name</label>
                                        <input 
                                            value={config.fallback_model || 'mistral-large-latest'} 
                                            onChange={e => setConfig({...config, fallback_model: e.target.value})} 
                                            onBlur={e => saveSettings({ fallback_model: e.target.value })} 
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 700, outline: 'none', boxSizing: 'border-box' as const }} 
                                            placeholder="mistral-large-latest" 
                                        />
                                    </div>
                                </div>

                                {config.fallback_ai_provider !== 'disabled' && (
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 10, display: 'block' }}>Fallback Provider API Key</label>
                                        <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                                            <input 
                                                type="password" 
                                                placeholder="Enter API key for secondary fallback provider..." 
                                                value={
                                                    (config.fallback_ai_provider || 'mistral') === 'mistral' ? (config.MISTRAL_API_KEY || config.mistral_api_key || '') :
                                                    (config.fallback_ai_provider || 'mistral') === 'groq' ? (config.GROQ_API_KEY || config.groq_api_key || '') :
                                                    (config.fallback_ai_provider || 'mistral') === 'openai' ? (config.OPENAI_API_KEY || config.openai_api_key || '') :
                                                    (config.fallback_ai_provider || 'mistral') === 'openrouter' ? (config.OPENROUTER_API_KEY || config.openrouter_api_key || '') :
                                                    (config.FALLBACK_CUSTOM_AI_API_KEY || '')
                                                } 
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    const prov = config.fallback_ai_provider || 'mistral';
                                                    const keyMap: Record<string, string> = {
                                                        mistral: 'mistral_api_key',
                                                        groq: 'groq_api_key',
                                                        openai: 'openai_api_key',
                                                        openrouter: 'openrouter_api_key',
                                                        custom: 'FALLBACK_CUSTOM_AI_API_KEY'
                                                    };
                                                    setConfig({ ...config, [keyMap[prov]]: val, [keyMap[prov].toUpperCase()]: val });
                                                }} 
                                                onBlur={e => {
                                                    const val = e.target.value;
                                                    const prov = config.fallback_ai_provider || 'mistral';
                                                    const keyMap: Record<string, string> = {
                                                        mistral: 'mistral_api_key',
                                                        groq: 'groq_api_key',
                                                        openai: 'openai_api_key',
                                                        openrouter: 'openrouter_api_key',
                                                        custom: 'FALLBACK_CUSTOM_AI_API_KEY'
                                                    };
                                                    saveSettings({ [keyMap[prov]]: val, [keyMap[prov].toUpperCase()]: val });
                                                }} 
                                                style={{ flex: 1, width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const }} 
                                            />
                                            <button
                                                onClick={() => testLlmConnection((config.fallback_ai_provider || 'mistral') as any)}
                                                disabled={llmTestState[(config.fallback_ai_provider || 'mistral') as keyof typeof llmTestState]?.loading}
                                                style={{ border: 'none', borderRadius: 14, padding: '0 24px', background: '#6366F1', color: '#fff', fontWeight: 800, cursor: 'pointer', minWidth: 110 }}
                                            >
                                                {llmTestState[(config.fallback_ai_provider || 'mistral') as keyof typeof llmTestState]?.loading ? 'Testing...' : 'Test Connection'}
                                            </button>
                                        </div>
                                        {llmTestState[(config.fallback_ai_provider || 'mistral') as keyof typeof llmTestState]?.message && (
                                            <div style={{ marginTop: 10, fontSize: '0.82rem', fontWeight: 700, color: llmTestState[(config.fallback_ai_provider || 'mistral') as keyof typeof llmTestState]?.ok ? '#16a34a' : '#dc2626' }}>
                                                {llmTestState[(config.fallback_ai_provider || 'mistral') as keyof typeof llmTestState]?.message}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </GlassCard>

                        {/* Autonomous AI Target Radar Grid */}
                        <GlassCard style={{ background: '#ffffff', border: '1px solid rgba(0, 113, 227, 0.15)', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0, 113, 227, 0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0, 113, 227, 0.08)', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Cpu size={22} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontWeight: 800, color: TEXT_PRIMARY, fontSize: '1.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 10 }}>
                                            Autonomous Target Intelligence Radar
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'rgba(34, 197, 94, 0.1)', color: '#166534', fontSize: '0.72rem', fontWeight: 800 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} /> ACTIVE RADAR
                                            </span>
                                        </h4>
                                        <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 4, fontWeight: 500 }}>
                                            The AI engine dynamically evaluates your core pitch and ranks high-intent commercial sectors for automated discovery.
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={regenerateDiscoveryPlan}
                                    disabled={planLoading}
                                    style={{ border: `1px solid ${ACCENT}33`, background: 'rgba(0, 113, 227, 0.04)', color: ACCENT, borderRadius: 12, padding: '10px 20px', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
                                >
                                    <RefreshCw size={14} className={planLoading ? 'animate-spin' : ''} />
                                    {planLoading ? 'Recalculating Strategy...' : 'Regenerate Strategy'}
                                </button>
                            </div>

                            {/* Plan Metadata Strip */}
                            <div style={{ padding: '12px 18px', borderRadius: 14, background: '#F8F9FA', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem', flexWrap: 'wrap', gap: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: '0.8rem', fontWeight: 700, color: TEXT_PRIMARY }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Target size={15} color={ACCENT} /> Mode: <strong style={{ color: ACCENT }}>{String(config.INVESTIGATION_DEPTH || 'shallow').toLowerCase() === 'deep' ? 'Deep OSINT Scan' : 'Shallow Search'}</strong>
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Globe size={15} color={ACCENT} /> Region: <strong>{location || 'UAE'}</strong>
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    {(discoveryPlanRanked.length || discoveryPlan.length)} Priority Target Sectors Identified
                                </div>
                            </div>

                            {/* Target Cards Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 700 ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                {(discoveryPlanRanked.length > 0 ? discoveryPlanRanked : discoveryPlan.map((query) => ({ query, score: 90, reason: '' }))).slice(0, 12).map((item, i) => {
                                    const rawQuery = String(item.query || '');
                                    const cleanTitle = rawQuery.replace(new RegExp(`\\b${location || 'UAE'}\\b`, 'gi'), '').trim() || rawQuery;
                                    const fitPercent = Math.min(99, Math.max(75, Math.round((item.score || 90) * 0.85)));
                                    const isTop3 = i < 3;

                                    return (
                                        <div 
                                            key={i} 
                                            title={item.reason || rawQuery}
                                            style={{
                                                padding: '1.2rem',
                                                borderRadius: 16,
                                                background: isTop3 ? 'linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)' : '#F9F9FB',
                                                border: isTop3 ? `1px solid ${ACCENT}33` : '1px solid rgba(0,0,0,0.06)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                gap: 12,
                                                position: 'relative',
                                                boxShadow: isTop3 ? '0 4px 14px rgba(0,113,227,0.06)' : 'none'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ 
                                                    fontSize: '0.7rem', 
                                                    fontWeight: 900, 
                                                    padding: '3px 9px', 
                                                    borderRadius: 999, 
                                                    background: isTop3 ? ACCENT : '#E5E5EA', 
                                                    color: isTop3 ? '#fff' : TEXT_PRIMARY 
                                                }}>
                                                    RANK #{i + 1} {isTop3 ? '🔥 TOP FIT' : ''}
                                                </span>
                                                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: ACCENT }}>
                                                    {fitPercent}% AI Match
                                                </span>
                                            </div>

                                            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: TEXT_PRIMARY, textTransform: 'capitalize', lineHeight: 1.3 }}>
                                                {cleanTitle}
                                            </div>

                                            {/* Progress Bar */}
                                            <div>
                                                <div style={{ width: '100%', height: 6, borderRadius: 999, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                                                    <div style={{ width: `${fitPercent}%`, height: '100%', borderRadius: 999, background: isTop3 ? ACCENT : '#34C759', transition: 'width 0.4s ease' }} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.7rem', color: TEXT_SECONDARY, fontWeight: 600 }}>
                                                    <span>Target Sector</span>
                                                    <span>{location || 'UAE'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassCard>
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Cpu size={24} color="#6366F1" /> Contact Enrichment APIs
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: TEXT_SECONDARY, marginBottom: '1.5rem', fontWeight: 500, lineHeight: 1.6 }}>
                                Connect Apollo.io or Hunter.io to automatically discover C-level executive contact details for your target companies.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 900 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Apollo.io API Key</label>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                                        <input type="password" placeholder={config.APOLLO_API_KEY_CONFIGURED ? 'Configured - enter new key to replace' : 'Enter Apollo.io API key'} value={config.APOLLO_API_KEY || ''} onChange={e => setConfig({...config, APOLLO_API_KEY: e.target.value})} onBlur={e => saveSettings({ APOLLO_API_KEY: e.target.value })} style={{ flex: 1, width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const }} />
                                        <button onClick={() => testLlmConnection('apollo')} disabled={llmTestState.apollo?.loading} style={{ border: 'none', borderRadius: 14, padding: '0 18px', background: '#6366F1', color: '#fff', fontWeight: 800, cursor: 'pointer', minWidth: 96 }}>
                                            {llmTestState.apollo?.loading ? 'Testing' : 'Test'}
                                        </button>
                                    </div>
                                    <div style={{ marginTop: 8, fontSize: '0.72rem', color: config.APOLLO_API_KEY_CONFIGURED ? '#15803D' : TEXT_SECONDARY, fontWeight: 800 }}>{config.APOLLO_API_KEY_CONFIGURED ? 'Configured' : 'Not configured'}</div>
                                    {llmTestState.apollo?.message && (
                                        <div style={{ marginTop: 10, fontSize: '0.82rem', fontWeight: 700, color: llmTestState.apollo.ok ? '#16a34a' : '#dc2626' }}>
                                            {llmTestState.apollo.message}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Hunter.io API Key</label>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                                        <input type="password" placeholder={config.HUNTER_API_KEY_CONFIGURED ? 'Configured - enter new key to replace' : 'Enter Hunter.io API key'} value={config.HUNTER_API_KEY || ''} onChange={e => setConfig({...config, HUNTER_API_KEY: e.target.value})} onBlur={e => saveSettings({ HUNTER_API_KEY: e.target.value })} style={{ flex: 1, width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const }} />
                                        <button onClick={() => testLlmConnection('hunter')} disabled={llmTestState.hunter?.loading} style={{ border: 'none', borderRadius: 14, padding: '0 18px', background: '#6366F1', color: '#fff', fontWeight: 800, cursor: 'pointer', minWidth: 96 }}>
                                            {llmTestState.hunter?.loading ? 'Testing' : 'Test'}
                                        </button>
                                    </div>
                                    <div style={{ marginTop: 8, fontSize: '0.72rem', color: config.HUNTER_API_KEY_CONFIGURED ? '#15803D' : TEXT_SECONDARY, fontWeight: 800 }}>{config.HUNTER_API_KEY_CONFIGURED ? 'Configured' : 'Not configured'}</div>
                                    {llmTestState.hunter?.message && (
                                        <div style={{ marginTop: 10, fontSize: '0.82rem', fontWeight: 700, color: llmTestState.hunter.ok ? '#16a34a' : '#dc2626' }}>
                                            {llmTestState.hunter.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {/* ── SUB-TAB 5: DOMAIN SUPPRESSION & BLACKLIST SHIELD ── */}
                {settingsTab === 'suppression' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <ShieldCheck size={24} color="#EF4444" /> Domain Suppression & Quality Shield
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: TEXT_SECONDARY, marginBottom: '1.5rem', fontWeight: 500, lineHeight: 1.6 }}>
                                Block consumer emails, generic mailboxes, and specific domains from receiving outreach.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800 }}>Block Consumer Emails</span>
                                        <button
                                            onClick={() => { const v = config.block_consumer_emails === 'enabled' ? 'disabled' : 'enabled'; setConfig({...config, block_consumer_emails: v}); saveSettings({ block_consumer_emails: v }); }}
                                            style={{ border: 'none', background: config.block_consumer_emails === 'enabled' ? '#22C55E' : '#E5E7EB', color: config.block_consumer_emails === 'enabled' ? '#fff' : TEXT_PRIMARY, padding: '10px 20px', borderRadius: 12, fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>
                                            {config.block_consumer_emails === 'enabled' ? 'ACTIVE' : 'ENABLE'}
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800 }}>Block Generic Mailboxes</span>
                                        <button
                                            onClick={() => { const v = config.block_generic_mailboxes === 'enabled' ? 'disabled' : 'enabled'; setConfig({...config, block_generic_mailboxes: v}); saveSettings({ block_generic_mailboxes: v }); }}
                                            style={{ border: 'none', background: config.block_generic_mailboxes === 'enabled' ? '#22C55E' : '#E5E7EB', color: config.block_generic_mailboxes === 'enabled' ? '#fff' : TEXT_PRIMARY, padding: '10px 20px', borderRadius: 12, fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>
                                            {config.block_generic_mailboxes === 'enabled' ? 'ACTIVE' : 'ENABLE'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Suppressed Domains (one per line)</label>
                                    <textarea
                                        placeholder="competitor.com&#10;client-already-signed.com"
                                        value={config.suppressed_domains || ''}
                                        onChange={e => setConfig({...config, suppressed_domains: e.target.value})}
                                        onBlur={e => saveSettings({ suppressed_domains: e.target.value })}
                                        rows={4}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const, fontFamily: 'monospace', fontSize: '0.82rem' }}
                                    />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {/* ── SUB-TAB 6: WEBHOOK & CRM INTEGRATIONS ── */}
                {settingsTab === 'integrations' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 14, color: TEXT_PRIMARY, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                                <Zap size={24} color="#F59E0B" /> Webhook & CRM Integration
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: TEXT_SECONDARY, marginBottom: '1.5rem', fontWeight: 500, lineHeight: 1.6 }}>
                                Send real-time notifications when leads convert. Connect to Zapier, Make.com, or any webhook endpoint.
                            </p>
                            <div>
                                <label style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'block' }}>Webhook URL</label>
                                <input
                                    type="url"
                                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                                    value={config.webhook_url || ''}
                                    onChange={e => setConfig({...config, webhook_url: e.target.value})}
                                    onBlur={e => saveSettings({ webhook_url: e.target.value })}
                                    style={{ width: '100%', padding: '16px 20px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' as const }}
                                />
                                <div style={{ marginTop: 14 }}>
                                    <button 
                                        onClick={async () => {
                                            try {
                                                const res = await fetch(`${API_BASE}/alerts/test-webhook`, { method: 'POST' });
                                                const data = await res.json();
                                                if (data.success) addLog(`🔔 Webhook Test Alert sent successfully!`, 'success');
                                                else addLog(`⚠️ Webhook Test failed. Check URL.`, 'err');
                                            } catch (e: any) { addLog(`❌ Webhook error: ${e.message}`, 'err'); }
                                        }}
                                        style={{ border: 'none', background: 'rgba(0,113,227,0.08)', color: ACCENT, padding: '10px 18px', borderRadius: 10, fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
                                        🔔 TEST WEBHOOK ALERT DISPATCH
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {/* ── SUB-TAB 4: LICENSE & DANGER ── */}
                {settingsTab === 'system' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: TEXT_PRIMARY, display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <ShieldCheck size={24} color={license.activated ? '#22C55E' : TEXT_SECONDARY} /> Product Activation
                                        </h4>
                                        <p style={{ margin: '8px 0 0 0', color: TEXT_SECONDARY, fontWeight: 600 }}>
                                            Status: <b style={{ color: license.activated ? '#22C55E' : '#EF4444' }}>{license.activated ? 'Activated' : 'Inactive'}</b>
                                            {license.device_id ? ` | Device ${license.device_id}` : ''}
                                        </p>
                                    </div>
                                </div>
                                {!license.activated && (
                                    <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 900 ? '1fr' : '1fr 1fr auto', gap: 12 }}>
                                        <input value={licenseHolder} onChange={e => setLicenseHolder(e.target.value)} placeholder="Customer / business name" style={{ width: '100%', padding: '16px 18px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                        <input value={activationKey} onChange={e => setActivationKey(e.target.value)} placeholder="Activation key" type="password" style={{ width: '100%', padding: '16px 18px', borderRadius: 14, background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)', color: TEXT_PRIMARY, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                                        <button onClick={handleActivateLicense} disabled={!activationKey || activatingLicense} style={{ border: 'none', borderRadius: 14, padding: '16px 24px', background: ACCENT, color: '#fff', fontWeight: 900, cursor: activationKey ? 'pointer' : 'not-allowed' }}>
                                            {activatingLicense ? 'ACTIVATING...' : 'ACTIVATE'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </GlassCard>

                        <GlassCard style={{ background: '#fff', border: '1px solid rgba(239,68,68,0.2)', padding: '2.5rem' }}>
                            <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <AlertTriangle size={24} color="#EF4444" /> System Maintenance & Danger Zone
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 600 ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                                <button 
                                    onClick={clearStaleLeads}
                                    style={{ padding: '16px', background: 'rgba(255,167,38,0.1)', color: '#FFA726', border: '1px solid rgba(255,167,38,0.3)', borderRadius: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <RefreshCw size={18} /> CLEAR FAILED LEADS
                                </button>
                                <button 
                                    onClick={clearDatabase}
                                    style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <Trash2 size={18} /> WIPE MASTER DATABASE
                                </button>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 14, textAlign: 'center', fontWeight: 600 }}>Permanently resets local engine state and lead discovery history.</p>
                        </GlassCard>
                    </div>
                )}
            </div>
        )}

        {/* ── INBOX & REPLIES (Phase 5) ── */}
        {view === 'replies' && (
            <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <AppleHeading subtitle="Read responses and manage high-intent leads in real-time.">
                        Leads Inbox
                    </AppleHeading>
                </div>

                <GlassCard style={{ padding: '0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
                            <tr>
                                {['Date', 'Company', 'Sentiment', 'Message & AI Co-Pilot'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '16px', fontSize: '0.75rem', color: TEXT_SECONDARY, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.0 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {replies.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', opacity: 0.4, fontWeight: 600 }}>
                                        No replies received yet. Keep your engine running!
                                    </td>
                                </tr>
                            ) : (
                                replies.map((row: any) => (
                                  <tr key={row.id} style={{ borderTop: '1px solid rgba(0,0,0,0.05)', background: row.status === 'unread' ? 'rgba(0,113,227,0.05)' : 'transparent' }}>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', opacity: 0.7, color: TEXT_PRIMARY, verticalAlign: 'top' }}>{new Date(row.received_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px', fontWeight: 800, fontSize: '1rem', color: TEXT_PRIMARY, verticalAlign: 'top' }}>
                                      {row.company_name || 'Direct Contact'}
                                      <div style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, marginTop: 4 }}>{row.from_email}</div>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}><StatusBadge status={row.status || 'read'} sentiment={row.sentiment} /></td>
                                    <td style={{ padding: '16px', verticalAlign: 'top', width: '50%' }}>
                                      <div style={{ fontSize: '0.9rem', color: TEXT_PRIMARY, fontWeight: 600, background: '#F5F5F7', padding: '12px 16px', borderRadius: 12, marginBottom: 12, lineHeight: 1.5 }}>{row.body}</div>
                                      
                                      {/* 🤖 AI REPLY CO-PILOT CARD */}
                                      <div style={{ background: 'rgba(0, 113, 227, 0.04)', border: '1px solid rgba(0, 113, 227, 0.15)', borderRadius: 14, padding: 14 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: ACCENT, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6 }}>🤖 AI Reply Co-Pilot</span>
                                          <button 
                                            onClick={async () => {
                                              setGeneratingAiReply(row.id);
                                              try {
                                                const res = await fetch(`${API_BASE}/replies/${row.id}/generate-ai-response`, { method: 'POST' });
                                                const data = await res.json();
                                                if (data.success) {
                                                  setDraftEdits(prev => ({ ...prev, [row.id]: { subject: `Re: ${row.subject}`, text_body: data.ai_draft_reply } }));
                                                  addLog(`🤖 AI Co-Pilot generated counter response for ${row.from_email}!`, 'success');
                                                }
                                              } catch (e: any) { addLog(`❌ AI Co-Pilot Error: ${e.message}`, 'err'); }
                                              setGeneratingAiReply(null);
                                            }}
                                            style={{ border: 'none', background: ACCENT, color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>
                                            {generatingAiReply === row.id ? 'GENERATING RESPONSE...' : '✨ GENERATE AI RESPONSE'}
                                          </button>
                                        </div>
                                        
                                        {draftEdits[row.id]?.text_body && (
                                          <div style={{ marginTop: 10 }}>
                                            <textarea 
                                              value={draftEdits[row.id].text_body} 
                                              onChange={e => setDraftEdits(prev => ({ ...prev, [row.id]: { ...prev[row.id], text_body: e.target.value } }))} 
                                              rows={4}
                                              style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: '#fff', fontSize: '0.85rem', color: TEXT_PRIMARY, outline: 'none', boxSizing: 'border-box' }}
                                            />
                                            <button 
                                              onClick={async () => {
                                                try {
                                                  const res = await fetch(`${API_BASE}/replies/${row.id}/approve`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ edited_reply: draftEdits[row.id].text_body })
                                                  });
                                                  const data = await res.json();
                                                  if (data.success) {
                                                    addLog(`✅ Response dispatched to ${row.from_email}!`, 'success');
                                                    refreshData();
                                                  }
                                                } catch (e: any) { addLog(`❌ Send Error: ${e.message}`, 'err'); }
                                              }}
                                              style={{ marginTop: 8, border: 'none', background: '#22C55E', color: '#fff', padding: '8px 18px', borderRadius: 8, fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>
                                              ✓ SEND RESPONSE NOW
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </GlassCard>
            </div>
        )}

        {/* ── ANALYTICS CENTER (Phase 4) ── */}
        {view === 'analytics' && (
            <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <AppleHeading subtitle="Real-time performance metrics for your outreach campaigns">
                        Analytics Command Center
                    </AppleHeading>
                    <button onClick={async () => {
                        const r = await fetch(`${API_BASE}/leads`);
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
                            <div style={{ fontSize: '3.8rem', fontWeight: 800, color: kpi.color, letterSpacing: '-0.06em', lineHeight: 1 }}>{kpi.value}</div>
                            <div style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{kpi.label}</div>
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
                                    <th key={h} style={{ textAlign: 'left', padding: '16px', fontSize: '0.75rem', color: TEXT_SECONDARY, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.0 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.map((row: any) => (
                                <tr key={row.date} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                    <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.9rem', color: TEXT_PRIMARY }}>{row.date}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '0.9rem', color: ACCENT, fontWeight: 800 }}>{row.emails_sent}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '0.9rem', color: TEXT_PRIMARY }}>{row.emails_delivered}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '0.9rem', color: '#FFA726' }}>{row.followups_sent || 0}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '0.9rem', color: TEXT_PRIMARY }}>{row.replies_received}</td>
                                    <td style={{ padding: '14px 16px', color: '#1D9E75', fontSize: '0.9rem', fontWeight: 700 }}>{row.positive_replies}</td>
                                    <td style={{ padding: '14px 16px', color: '#ff4444', fontSize: '0.9rem', fontWeight: 700 }}>{row.negative_replies}</td>
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
                      <h4 style={{ margin: 0, marginBottom: '1.5rem', fontWeight: 900 }}>Activity Feed</h4>
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          {logs.length === 0 ? (
                              <div style={{ opacity: 0.4, fontSize: '0.8rem', padding: '10px 0' }}>No recent activity.</div>
                          ) : (
                              logs.map((log: any, i: number) => (
                                  <div key={i} style={{ fontSize: '0.8rem', color: '#e2e8f0', padding: '6px 0' }}>[{log.time}] {log.msg}</div>
                              ))
                          )}
                      </div>
                  </GlassCard>
                )}
            </div>
        )}

        {/* Main Branding Footer */}
        <div style={{ marginTop: 'auto', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', opacity: 0.3, fontSize: '0.75rem', letterSpacing: 1.5 }}>
          © 2026 {(config.COMPANY_NAME || 'ASIF DIGITAL AGENCY').toUpperCase()} • SOVEREIGN SALES ENGINE • ALL RIGHTS RESERVED
        </div>
      </main>
    </div>
  );
}
