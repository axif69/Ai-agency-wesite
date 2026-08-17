"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Download,
  FileSpreadsheet,
  Flame,
  Globe,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  PieChart,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  XCircle,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";

const faqs = [
  {
    q: "How does Dubai Real Estate CRM Lead Heat Scoring categorize buyers?",
    a: "Dubai Real Estate CRM Lead Heat Scoring analyzes every incoming message, voice note, and requirement field to grade buyers instantly: HOT (Budget confirmed within inventory range, timeline under 90 days, viewing requested), WARM (Budget indicated, timeline 3-12 months, active engagement), and COLD (Budget below inventory threshold or non-responsive). Heat scores auto-update after every conversation turn in your Supabase CRM database.",
  },
  {
    q: "How does the Bayut and Property Finder WhatsApp Lead Control Panel work?",
    a: "The control panel connects direct API webhooks from Bayut, Property Finder, Dubizzle, Meta Ads, and Google Search into a single unified WhatsApp inbox. When an inquiry arrives from Bayut or Property Finder, the system logs the exact listing ID, property location, budget, and UTM parameters into your lead matrix within 0.85 seconds.",
  },
  {
    q: "How does the AI Lead Dashboard track attribution across Meta, Google, and portals like Bayut?",
    a: "Every lead channel — Meta Ads, Google Search, TikTok campaigns, Bayut listings, Property Finder inquiries, and direct WhatsApp — is tagged using UTM parameters that fire at the moment of first contact. When a buyer clicks on a Meta ad and messages you on WhatsApp, the system captures: campaign name, ad set, creative version, and the timestamp of first contact. This event is pushed to Google Analytics 4 via a custom event and to the dashboard's attribution engine simultaneously.",
  },
  {
    q: "What is the 1-Click Executive Reply Co-Pilot and how does it work?",
    a: "When the AI hands a conversation to a human broker, the broker opens the WhatsApp dashboard and sees the full conversation transcript, the AI-generated lead brief, the heat score, and three ready-to-send reply options: Option A (Direct Close), Option B (Investment ROI), and Option C (VIP Presentation). The broker selects one option and sends it with a single tap.",
  },
  {
    q: "Can we export sanitised lead data for audit and reporting?",
    a: "Yes. The 1-click CSV export generates a clean, structured file containing all lead fields in a format suitable for external auditors, RERA compliance records, investor reporting, HubSpot or Salesforce import, and BI tool analysis (Power BI, Tableau, Google Looker Studio).",
  },
];

export default function AiLeadDashboardView() {
  const [activeTab, setActiveTab] = useState<"overview" | "matrix" | "conversations" | "vip" | "analytics" | "alerts">("overview");
  const [adSpend, setAdSpend] = useState(75000);
  const [monthlyLeads, setMonthlyLeads] = useState(342);
  const [avgCommission, setAvgCommission] = useState(60000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const estimatedDealsLost = Math.max(1, Math.round(monthlyLeads * 0.0255));
  const estimatedRevenueLost = estimatedDealsLost * avgCommission;

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real Estate AI Lead Dashboard Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate AI Lead Dashboard & Multi-Channel Attribution",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Unified Real Estate Command Dashboard: Track Every Lead From Ad Click to Closed Deal. Multi-channel attribution (Meta, Google, TikTok, Bayut, Property Finder), real-time Kanban pipeline, HOT/WARM/COLD scoring, and interactive lead loss calculator.",
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-400/30">
      {/* Head JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden px-6 md:px-12 pt-28 pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
              Enterprise Real Estate Command Dashboard · Dubai & UAE
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-4">
              Unified Real Estate Command Dashboard
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              Track Every Lead From Ad Click to Closed Deal.
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              Gain complete visibility into multi-channel lead attribution (Meta, Google, TikTok, Bayut, Property Finder), AI deal heat scoring, 1-click broker reply suggestions, audio voice note transcription, and off-plan payment calculators.
            </p>

            {/* BUSY DIRECTORS EXECUTIVE SNAPSHOT CALLOUT */}
            <div className="mb-8 rounded-2xl border border-emerald-400/30 bg-emerald-950/20 p-4 max-w-3xl flex items-start gap-3 text-left">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase block tracking-wider">
                  EXECUTIVE SNAPSHOT FOR BUSY DIRECTORS
                </span>
                <p className="text-xs text-white/80 font-light leading-relaxed mt-1">
                  Designed as an instant executive snapshot for busy sales directors to see the whole picture of inbound leads, ad traffic channels, broker SLA response times, and pipeline revenue in one single view.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book a Command Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#lead-loss-calculator"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Calculate Lead Loss →
              </a>
            </div>
          </motion.div>

          {/* ── REAL ESTATE COMMAND DASHBOARD INTERACTIVE MOCKUP ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2.5rem] border border-white/10 bg-[#090A0C] overflow-hidden shadow-2xl"
          >
            {/* Top Navigation Bar */}
            <div className="bg-[#0F1012] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold text-xs font-serif">
                  RE
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase block">
                    SOVEREIGN COMMAND CENTER
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">UAE Luxury & Off-Plan Desks</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <span className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 text-[10px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> WhatsApp Concierge ACTIVE
                </span>
                <span className="text-[10px] text-white/40 font-mono hidden sm:inline-block">
                  Supabase DB Sync: Operational
                </span>
              </div>
            </div>

            {/* Dashboard Sidebar + Main Area Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[540px]">
              {/* Sidebar Navigation */}
              <div className="bg-[#0A0B0D] border-r border-white/10 p-4 space-y-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition ${
                    activeTab === "overview"
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" /> Overview
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("matrix")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition ${
                    activeTab === "matrix"
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-400" /> Lead Matrix
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("conversations")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition ${
                    activeTab === "conversations"
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" /> Conversations
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("vip")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition ${
                    activeTab === "vip"
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Calendar className="w-4 h-4 text-emerald-400" /> VIP Bookings
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition ${
                    activeTab === "analytics"
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-400" /> Analytics & Export
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("alerts")}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition ${
                    activeTab === "alerts"
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Bell className="w-4 h-4 text-emerald-400" /> Alert Settings
                </button>
              </div>

              {/* Main Content Area Based on Active Tab */}
              <div className="p-6 bg-[#090A0C] space-y-6">
                {/* TAB 1: OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Welcome Banner */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-2xl text-white">Welcome back, Sales Director</h2>
                        <p className="text-xs text-white/50 font-mono mt-1">
                          AI Sales Concierge is actively serving Sobha, Emaar, Danube, and Binghatti off-plan inquiries.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("conversations")}
                        className="bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 text-xs font-mono px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-400/20"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> View Active WhatsApp Chats
                      </button>
                    </div>

                    {/* 4 Scorecard KPI Tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left font-mono">
                      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                        <span className="text-[10px] text-white/40 uppercase block">TOTAL LEADS INGESTED</span>
                        <div className="text-2xl font-serif font-bold text-white mt-1">342</div>
                        <span className="text-[9px] text-emerald-400 mt-1 block">100% Phone Deduplicated</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                        <span className="text-[10px] text-white/40 uppercase block">AI QUALIFIED LEADS</span>
                        <div className="text-2xl font-serif font-bold text-emerald-400 mt-1">301</div>
                        <span className="text-[9px] text-white/50 mt-1 block">Budget & Location Auto-Parsed</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                        <span className="text-[10px] text-white/40 uppercase block">HUMAN HANDOFFS</span>
                        <div className="text-2xl font-serif font-bold text-rose-400 mt-1">3</div>
                        <span className="text-[9px] text-rose-400/80 mt-1 block">Requires Broker Attention</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                        <span className="text-[10px] text-white/40 uppercase block">VIP BOOKINGS</span>
                        <div className="text-2xl font-serif font-bold text-white mt-1">7</div>
                        <span className="text-[9px] text-emerald-400 mt-1 block">Calendar Synced</span>
                      </div>
                    </div>

                    {/* Recent Inquiries & Developer Portfolios Grid */}
                    <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] text-left">
                      {/* Recent WhatsApp Inquiries */}
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <h3 className="font-serif text-lg text-white">Recent WhatsApp Inquiries</h3>
                          <span className="text-[10px] font-mono text-emerald-400">Live DB Feed</span>
                        </div>
                        <div className="space-y-3 text-xs">
                          {[
                            { name: "Alexander V.", phone: "+44 77XX XXX077", budget: "AED 10,000,000", status: "MEETING BOOKED", badge: "bg-blue-500/20 text-blue-300" },
                            { name: "Tariq S.", phone: "+971 56XX XXX898", budget: "AED 10,000,000", status: "MEETING BOOKED", badge: "bg-blue-500/20 text-blue-300" },
                            { name: "Dr. Fatima A.", phone: "+971 50XX XXX543", budget: "AED 4,000,000", status: "AI ENGAGED", badge: "bg-white/10 text-white/70" },
                            { name: "Richard M.", phone: "+44 79XX XXX456", budget: "AED 7,800,000", status: "QUALIFIED", badge: "bg-emerald-400/20 text-emerald-300" },
                          ].map((lead) => (
                            <div key={lead.name} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                              <div>
                                <div className="font-serif text-sm text-white">{lead.name}</div>
                                <div className="text-[10px] font-mono text-white/40">{lead.phone}</div>
                              </div>
                              <div className="text-right font-mono">
                                <div className="text-xs text-white font-bold">{lead.budget}</div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full inline-block mt-0.5 ${lead.badge}`}>{lead.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Developer Portfolios */}
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <h3 className="font-serif text-lg text-white">Developer Portfolios</h3>
                          <span className="text-[10px] font-mono text-white/40">Official Specs Active</span>
                        </div>
                        <div className="space-y-3 text-xs">
                          {[
                            { name: "Danube Properties", tag: "1% Monthly Plan Engine" },
                            { name: "Sobha Realty", tag: "UK & GCC Investor Hook" },
                            { name: "Binghatti Developers", tag: "Skyrise Off-Plan Specs" },
                            { name: "Emaar Properties", tag: "Dubai Hills & Creek Specs" },
                          ].map((dev) => (
                            <div key={dev.name} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                              <span className="font-serif text-white">{dev.name}</span>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{dev.tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: LEAD MATRIX */}
                {activeTab === "matrix" && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h2 className="font-serif text-2xl text-white">Lead Matrix System</h2>
                        <p className="text-xs text-white/50 font-mono mt-0.5">Real-time deduplicated WhatsApp lead directory</p>
                      </div>
                      <button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2">
                        <Download className="w-3.5 h-3.5 text-emerald-400" /> Export CSV
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-white/[0.04] text-[#A1A1AA] border-b border-white/10">
                          <tr>
                            <th className="p-3.5">LEAD CONTACT</th>
                            <th className="p-3.5">TRAFFIC SOURCE</th>
                            <th className="p-3.5">STATUS</th>
                            <th className="p-3.5">BUYER LOCATION</th>
                            <th className="p-3.5">BUDGET RANGE</th>
                            <th className="p-3.5 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/80">
                          {[
                            { name: "Alexander V.", phone: "+44 77XX XXX077", source: "FACEBOOK ADS", status: "MEETING BOOKED", loc: "London, UK", budget: "AED 10,000,000" },
                            { name: "Tariq S.", phone: "+971 56XX XXX898", source: "WHATSAPP DIRECT", status: "MEETING BOOKED", loc: "Dubai Marina", budget: "AED 10,000,000" },
                            { name: "Dr. Fatima A.", phone: "+971 50XX XXX543", source: "INSTAGRAM ADS", status: "AI ENGAGED", loc: "Abu Dhabi, UAE", budget: "AED 4,000,000" },
                            { name: "Richard M.", phone: "+44 79XX XXX456", source: "FACEBOOK ADS", status: "QUALIFIED", loc: "London, UK", budget: "AED 7,800,000" },
                          ].map((row) => (
                            <tr key={row.name}>
                              <td className="p-3.5">
                                <div className="font-bold text-white font-serif">{row.name}</div>
                                <div className="text-[10px] text-white/40">{row.phone}</div>
                              </td>
                              <td className="p-3.5 text-emerald-400">{row.source}</td>
                              <td className="p-3.5">
                                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px]">{row.status}</span>
                              </td>
                              <td className="p-3.5 text-white/60">{row.loc}</td>
                              <td className="p-3.5 text-white font-bold">{row.budget}</td>
                              <td className="p-3.5 text-right">
                                <button className="px-3 py-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-[10px]">Lead Dossier</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: CONVERSATIONS (LIVE WHATSAPP CHAT + EXECUTIVE REPLY CO-PILOT) */}
                {activeTab === "conversations" && (
                  <div className="grid gap-6 md:grid-cols-[1.1fr_1.9fr] text-left">
                    {/* Chat Threads */}
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
                      <div className="text-xs font-serif text-white border-b border-white/10 pb-2">Active WhatsApp Threads</div>
                      <div className="space-y-2 text-xs">
                        {[
                          { name: "Richard M.", snippet: "Investment, I prefer high rental yield...", status: "AI ACTIVE", time: "18:00" },
                          { name: "Tariq S.", snippet: "Welcome Tariq! Generated your exclusive...", status: "HUMAN CONTROL", time: "16:02" },
                          { name: "Dr. Fatima A.", snippet: "River Cove waterfront villa specs...", status: "AI ACTIVE", time: "15:00" },
                        ].map((thread) => (
                          <div key={thread.name} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-serif text-white">{thread.name}</span>
                              <span className="text-[10px] text-white/40">{thread.time}</span>
                            </div>
                            <p className="text-[10px] text-white/50 truncate">{thread.snippet}</p>
                            <span className="text-[9px] font-mono text-emerald-400 block">• {thread.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main Chat Feed & Co-Pilot */}
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between border-b border-white/10 pb-2 text-white/60 font-mono">
                          <span>Richard M. (+44 79XX XXX456)</span>
                          <span className="text-emerald-400">AI Active</span>
                        </div>

                        <div className="bg-white/5 p-3 rounded-xl max-w-[85%] border border-white/10">
                          <span className="text-[9px] font-mono text-white/40 block">LEAD (Facebook Ads)</span>
                          <p>Hi, I saw your Facebook ad for Sobha City. Are 3-bedroom waterfront villas available?</p>
                        </div>

                        <div className="bg-emerald-950/30 border border-emerald-400/20 p-3 rounded-xl max-w-[85%] ml-auto text-right">
                          <span className="text-[9px] font-mono text-emerald-400 block">AI CONCIERGE</span>
                          <p>Hello! We have exclusive 3-bedroom waterfront villas starting from AED 3.8M with a 60/40 payment plan. Are you looking to invest or move in?</p>
                        </div>

                        <div className="bg-white/5 p-3 rounded-xl max-w-[85%] border border-white/10">
                          <span className="text-[9px] font-mono text-white/40 block">LEAD (Voice Note Transcribed)</span>
                          <p>Investment. I prefer high rental yield. Can we schedule a meeting at your presentation desk when I land next Tuesday?</p>
                        </div>
                      </div>

                      {/* AI Executive Reply Co-Pilot Input Bar */}
                      <div className="border-t border-white/10 pt-3 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
                          <span className="flex items-center gap-1.5 text-emerald-400"><Sparkles className="w-3.5 h-3.5" /> AI EXECUTIVE REPLY CO-PILOT</span>
                          <div className="flex gap-2">
                            <button className="px-2 py-1 rounded bg-white/5 hover:bg-white/10">Generate 48h Nudge</button>
                            <button className="px-2 py-1 rounded bg-emerald-400/20 text-emerald-300">Generate 1-Click Replies</button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type or select an AI Co-Pilot reply above..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                          />
                          <button className="bg-white text-black font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 hover:bg-emerald-300">
                            <Send className="w-3.5 h-3.5" /> Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: VIP BOOKINGS */}
                {activeTab === "vip" && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h2 className="font-serif text-2xl text-white">VIP Presentation Bookings</h2>
                        <p className="text-xs text-white/50 font-mono mt-0.5">Scheduled client presentations at Executive Lounge & DIFC Office</p>
                      </div>
                      <button className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-4 py-2 rounded-xl text-xs font-mono">
                        + Simulate Test AI Booking
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-white/[0.04] text-[#A1A1AA] border-b border-white/10">
                          <tr>
                            <th className="p-3.5">CLIENT CONTACT</th>
                            <th className="p-3.5">PRESENTATION LOCATION</th>
                            <th className="p-3.5">SCHEDULED DATE & TIME</th>
                            <th className="p-3.5 text-right">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/80">
                          <tr>
                            <td className="p-3.5">
                              <div className="font-bold text-white font-serif">Alexander V.</div>
                              <div className="text-[10px] text-white/40">+44 77XX XXX077</div>
                            </td>
                            <td className="p-3.5 text-white/80">Private Executive Lounge, Downtown Dubai</td>
                            <td className="p-3.5 text-emerald-400">16/08/2026, 18:00:00</td>
                            <td className="p-3.5 text-right">
                              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px]">CONFIRMED</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 5: EXECUTIVE ANALYTICS & DATA EXPORT */}
                {activeTab === "analytics" && (
                  <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h2 className="font-serif text-2xl text-white">System Analytics & Executive Snapshot</h2>
                        <p className="text-xs text-white/70 font-mono mt-1 text-emerald-400 font-bold uppercase tracking-wider">
                          Executive Snapshot: Designed for busy directors to see the whole picture of inbound leads, ad traffic channels, broker SLA performance, and closed deal attribution in one single view.
                        </p>
                      </div>
                      <button className="bg-white text-black font-bold px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 hover:bg-emerald-300 shrink-0">
                        <Download className="w-3.5 h-3.5" /> Download Full CSV Export
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-400/30 bg-emerald-950/20 text-xs font-mono flex flex-wrap justify-between items-center gap-3">
                      <span className="flex items-center gap-2 text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Engine Status: Operational (100% SLA)
                      </span>
                      <div className="flex gap-4 text-white/70 text-[11px]">
                        <span>AVG LATENCY: 0.85s</span>
                        <span>MULTILINGUAL DETECT: 100%</span>
                        <span>SUPABASE DB SYNC: Active</span>
                      </div>
                    </div>

                    {/* Multi-Platform Attribution Cards */}
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4">
                      <h3 className="font-serif text-lg text-white">Lead Traffic Source Attribution</h3>
                      <div className="grid gap-4 md:grid-cols-4 text-xs font-mono">
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                          <div className="text-white/60">META ADS (IG/FB)</div>
                          <div className="text-xl font-serif font-bold text-white">142 (41.5%)</div>
                          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full w-[41.5%]" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                          <div className="text-white/60">GOOGLE SEARCH PPC</div>
                          <div className="text-xl font-serif font-bold text-white">89 (26.0%)</div>
                          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-400 h-full w-[26%]" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                          <div className="text-white/60">BAYUT & PORTALS</div>
                          <div className="text-xl font-serif font-bold text-white">68 (19.9%)</div>
                          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-400 h-full w-[19.9%]" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                          <div className="text-white/60">WHATSAPP DIRECT</div>
                          <div className="text-xl font-serif font-bold text-white">43 (12.6%)</div>
                          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#C5A059] h-full w-[12.6%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: NOTIFICATION & ALERT SETTINGS */}
                {activeTab === "alerts" && (
                  <div className="space-y-6 text-left">
                    <div className="border-b border-white/10 pb-4">
                      <h2 className="font-serif text-2xl text-white">Notification & Alert Settings</h2>
                      <p className="text-xs text-white/50 font-mono mt-0.5">
                        Configure target WhatsApp numbers, email dispatchers, and test booking alerts
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-6">
                      <h3 className="font-serif text-lg text-white">Booking Alert & Notification Recipients</h3>

                      <div className="grid gap-6 md:grid-cols-2 text-xs font-mono">
                        <div className="space-y-2">
                          <label className="text-white/60 block uppercase">NOTIFICATION PHONE NUMBER (WHATSAPP / SMS)</label>
                          <input
                            type="text"
                            value="+971 50 XXX XXXX"
                            readOnly
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                          />
                          <span className="text-[10px] text-white/40 block">Receives direct WhatsApp alert pings for new meeting bookings.</span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-white/60 block uppercase">NOTIFICATION EMAIL ADDRESS</label>
                          <input
                            type="text"
                            value="director@agency.ae"
                            readOnly
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                          />
                          <span className="text-[10px] text-white/40 block">Receives Google Calendar event invitations and booking confirmations.</span>
                        </div>
                      </div>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between items-center">
                          <label className="text-white/60 uppercase">RESEND EMAIL DISPATCH API KEY (OPTIONAL)</label>
                          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                            LIVE RESEND ENGINE ACTIVE
                          </span>
                        </div>
                        <input
                          type="password"
                          value="••••••••••••••••••••••••••••••••"
                          readOnly
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white">
                          Send Test Email
                        </button>
                        <button className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white">
                          Send Test WhatsApp Ping
                        </button>
                        <button className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs font-mono hover:bg-emerald-300 ml-auto">
                          Save Notification Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE LEAD LOSS CALCULATOR ── */}
      <section id="lead-loss-calculator" className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 shadow-2xl">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-2">
              Interactive Revenue Audit
            </span>
            <h2 className="font-serif text-3xl text-white">Real Estate Lead Loss Calculator</h2>
            <p className="mt-2 text-sm text-white/60 font-light">
              See estimated revenue lost each month due to response delays exceeding 30 minutes (based on 85% lead decay market data).
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Sliders & Inputs */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="text-white/60">Monthly Marketing Ad Spend:</span>
                  <span className="text-emerald-400 font-bold">AED {adSpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="text-white/60">Monthly Inbound Inquiries:</span>
                  <span className="text-emerald-400 font-bold">{monthlyLeads} leads/mo</span>
                </div>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="text-white/60">Average Agency Commission Per Deal:</span>
                  <span className="text-emerald-400 font-bold">AED {avgCommission.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={avgCommission}
                  onChange={(e) => setAvgCommission(Number(e.target.value))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Output Box */}
            <div className="rounded-2xl border border-emerald-400/30 bg-black/40 p-6 text-center space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-white/50">ESTIMATED LEADS LOST</div>
              <div className="text-3xl font-serif font-bold text-white">
                {estimatedDealsLost} <span className="text-sm font-normal text-white/50">Deals / Month</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 pt-2">REVENUE AT RISK PER MONTH</div>
              <div className="text-3xl font-serif font-bold text-emerald-400">
                AED {estimatedRevenueLost.toLocaleString()}
              </div>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors w-full shadow-lg mt-2"
              >
                Schedule Demo to Recover Revenue →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OPERATIONAL COMPARISON ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Operational Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              Stop Un-Tracked Lead Sprawl.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="font-serif text-xl text-rose-400 mb-6 font-bold uppercase tracking-wide">
                The Untracked Agency Reality
              </h3>
              <ul className="space-y-4 text-sm text-white/60 font-light leading-relaxed">
                <li className="flex items-start gap-3"><XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> Ad spend wasted on unknown origins (Meta vs Google vs Portals)</li>
                <li className="flex items-start gap-3"><XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> Brokers taking 6–12 hours to reply to off-plan buyers</li>
                <li className="flex items-start gap-3"><XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> Scattered Excel sheets and un-tracked WhatsApp conversations</li>
                <li className="flex items-start gap-3"><XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> Zero visibility into individual broker response SLAs</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="font-serif text-xl text-emerald-400 mb-6 font-bold uppercase tracking-wide">
                Asif Digital Command Control
              </h3>
              <ul className="space-y-4 text-sm text-white/60 font-light leading-relaxed">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Precise UTM source attribution logging down to exact ad creatives</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Brokers alerted in 10 seconds via WhatsApp when leads are AI-qualified</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Live visual Kanban pipeline tracking (New → Closed Deal)</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> HOT/WARM/COLD lead heat scores updated automatically per turn</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. COMMAND CAPABILITIES (FULL 60-80 WORD BODY MINIMUM) ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Command Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              6 Built-In Modules for Sales Directors.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: PieChart,
                title: "Multi-Channel Source Attribution",
                body: "Every inbound lead is tagged at first touch with precise UTM source data: Meta, Google, TikTok, Bayut, Property Finder, Dubizzle, or direct WhatsApp. Attribution is not approximate — it logs the exact campaign name, ad set, and creative version. When your sales director asks \"which campaign brought our last 10 deals,\" the dashboard answers in two clicks. Scale what works. Kill what doesn't. Stop guessing.",
              },
              {
                icon: LayoutDashboard,
                title: "Real-Time Pipeline Kanban",
                body: "A live visual pipeline showing every active lead across five stages: NEW, AI ENGAGED, QUALIFIED, VIEWING BOOKED, and DEAL CLOSED. Filter by: assigned broker, property developer, area, lead source, or heat score. Bottlenecks become visible immediately — if 60 leads are sitting in \"AI Engaged\" for 48 hours, that signals a qualification flow problem your director can fix today, not next quarter.",
              },
              {
                icon: MessageSquare,
                title: "1-Click Executive Reply Co-Pilot",
                body: "When a broker takes over a WhatsApp conversation from the AI, they receive three contextual reply options generated from the lead's conversation history — calibrated to intent signals: Option A: Direct Close (\"Shall we book a viewing at 6PM today?\"), Option B: Investment Focus (rental yield, capital appreciation, ROI), Option C: VIP Presentation (\"Our director will personally walk you through this off-plan project.\"). Brokers pick one and send in a single tap.",
              },
              {
                icon: Flame,
                title: "AI Lead Briefing & Deal Heat Score",
                body: "Every lead in the pipeline has an auto-generated brief updated after each conversation turn — not a static form submission: Intent Summary: \"Buyer researching off-plan in JVC, budget AED 900K, investor purchase, Russian-speaking, wants handover in Q4 2026.\" Heat Score: HOT (book viewing today) / WARM (nurture 7–30 days) / COLD (long-cycle). Recommended Action: \"Assign to Russian-speaking senior broker.\"",
              },
              {
                icon: Clock,
                title: "Sub-10s SLA Response Monitor",
                body: "Real-time monitoring of every inbound lead's first-response time. If an inquiry exceeds the configured SLA threshold (default: 10 seconds for AI response; 15 minutes for human escalation), a red badge fires on the dashboard and a push notification is sent to the team lead via WhatsApp. No lead silently dies in a shared inbox. SLA performance is tracked per broker, per day, per campaign.",
              },
              {
                icon: Download,
                title: "Sanitised 1-Click CSV Export",
                body: "Export a clean, structured lead matrix in one click — formatted for audit compliance, investor reporting, or BI tool import. Each row contains: lead source, campaign tag, inquiry date and time, AI qualification status, heat score, assigned broker, response time, viewing outcome, and deal stage. No manual data cleaning required. Suitable for quarterly board reports, RERA compliance records, and external auditor review.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-emerald-400/30 transition-all flex flex-col justify-between">
                  <div>
                    <Icon className="h-6 w-6 text-emerald-400 mb-4" />
                    <h3 className="font-serif text-xl text-white mb-3">{card.title}</h3>
                    <p className="text-sm text-white/65 font-light leading-relaxed">{card.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              AI Command Dashboard FAQ.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-serif text-lg text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-emerald-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-white/60 font-light border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-10 md:p-16 text-center shadow-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
            Command Your Marketing Spend
          </span>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white max-w-3xl mx-auto mb-6">
            Get Complete Visibility Into Your Real Estate Pipeline.
          </h2>
          <p className="text-base text-white/65 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect Meta, Google, Bayut, Property Finder, and WhatsApp into a single real-time dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
            >
              Book a Command Demo <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              Contact Agency
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
