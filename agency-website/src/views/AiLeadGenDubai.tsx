"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cog, Search, 
  BarChart3, TrendingUp, Monitor, MessageSquare, 
  Target, Cpu, Network, Lock, Sparkles, Languages,
  Rocket, Layers, PieChart, Users, Building2, UserPlus,
  Mail, Phone, Share2, MousePointer2, Bot, CheckCircle2,
  ChevronDown, HelpCircle, Check, AlertCircle, RefreshCw,
  Clock, Award, Sliders, Briefcase, FileCheck, DollarSign
} from "lucide-react";
import Link from "next/link";

export default function AiLeadGenDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Illustrative Pipeline Calculator
  const [targetAccounts, setTargetAccounts] = useState(300);
  const [dealValue, setDealValue] = useState(45000); // AED
  const [estQualifiedRate, setEstQualifiedRate] = useState(3.5); // 3.5%
  
  const estQualifiedMeetings = Math.max(1, Math.round(targetAccounts * (estQualifiedRate / 100)));
  const estPipelineValue = estQualifiedMeetings * dealValue;

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What does an AI lead generation agency do differently from a traditional lead gen company?",
      a: "Traditional lead generation companies typically rely on buying outdated static contact lists, blasting mass generic email templates, or manual cold calling with low efficiency. An AI lead generation agency engineers continuous, data-driven outbound pipelines. We use AI models to detect real-time market trigger signals (executive hiring, corporate expansion, tech stack changes), synthesize deep account dossiers, generate hyper-personalized value propositions, and automate qualification across Email, LinkedIn, and WhatsApp while protecting your domain deliverability."
    },
    {
      q: "How do you prevent outbound emails from landing in spam?",
      a: "Deliverability is the foundation of outbound sales. We deploy isolated secondary domains configured with strict DNS authentication protocols (SPF, DKIM, DMARC, and custom tracking domains). We implement gradual automated mailbox warmup schedules, throttle daily sending volumes to conservative limits, conduct continuous spam score audits, and dynamically vary message phrasing so emails are never flagged as repetitive automated blasts by Google Workspace or Microsoft 365 filters."
    },
    {
      q: "Can AI lead generation book meetings automatically without human intervention?",
      a: "While AI agents can classify incoming prospect intent, answer preliminary technical questions, and share booking calendar links in real-time, high-value B2B deals in Dubai and the GCC require human oversight. We configure systems with human-in-the-loop governance: AI handles the heavy lifting of prospect research, initial outreach, and inquiry triage, while your senior sales executives retain full control over relationship-building, custom proposal reviews, and final negotiations."
    },
    {
      q: "Is B2B lead generation and outreach compliant with UAE privacy regulations (PDPL)?",
      a: "Yes. Our pipeline architectures are designed around UAE Federal Decree-Law No. 45 on Personal Data Protection (PDPL). We focus strictly on public business-to-business corporate data, verified business email addresses, and professional corporate profiles. Every communication includes clear opt-out mechanisms, sender identification, and respect for do-not-contact requests. We do not engage in unauthorized consumer data scraping or invasive consumer spam."
    },
    {
      q: "How long does it take to see qualified sales meetings from an AI pipeline?",
      a: "A typical deployment follows a 4-week ramp-up: Week 1-2 are dedicated to technical infrastructure setup, secondary domain warmup, ICP parameterization, and intent signal calibration. Phased outreach begins in Week 3, with initial prospect responses and qualified discovery meetings typically generating in Weeks 3 to 4. As response data accumulates, AI models continuously refine messaging angles, leading to stabilized pipeline flow by Month 2."
    },
    {
      q: "How does pricing work for AI lead generation services in Dubai?",
      a: "Pricing is structured around engineering scope, addressable market scale, and channel complexity. We do not sell cheap static lead lists. Engagements typically involve an initial pipeline architecture and technical setup fee (covering secondary domain infrastructure, data sourcing pipelines, CRM integrations, and sequence engineering), followed by an ongoing monthly management and optimization retainer. Contact our team for a tailored diagnostic scope."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Asif Digital - AI Lead Generation Agency Dubai",
              "url": "https://www.asifdigital.agency/ai-lead-generation-agency-dubai",
              "description": "AI powered B2B lead generation agency in Dubai. We engineer automated outbound pipeline systems, account research, lead qualification, and CRM enrichment.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.2048",
                "longitude": "55.2708"
              },
              "priceRange": "$$$",
              "serviceType": [
                "AI Lead Generation",
                "B2B Sales Pipeline Automation",
                "Account Research & Enrichment",
                "Lead Qualification & CRM Routing",
                "Omnichannel WhatsApp & Email Outreach"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.asifdigital.agency"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "AI Lead Generation Agency Dubai",
                  "item": "https://www.asifdigital.agency/ai-lead-generation-agency-dubai"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            }
          ])
        }}
      />

      {/* ── Hero Section ── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-emerald-500/[0.03] rounded-full blur-[160px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-300 font-semibold">
              B2B ACQUISITION &amp; PIPELINE AUTOMATION
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-[1.05] mb-8">
            AI Lead Generation &amp; <br className="hidden sm:inline" />
            <span className="text-white/70 italic font-light">B2B Sales Automation in Dubai.</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Engineering intelligent outbound acquisition systems, account research workflows, verified contact enrichment, and CRM qualification for Dubai and UAE B2B growth teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Request Pipeline Architecture Session
            </Link>
            <Link 
              href="/sovereign-sales-agent" 
              className="w-full sm:w-auto border border-white/20 text-white/90 hover:text-white hover:border-white/50 px-8 py-5 rounded-full font-medium uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 bg-white/[0.02]"
            >
              Explore Sales Agent System <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white/40 text-[11px] uppercase tracking-widest font-mono">
            <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Ground-Truth Public OSINT</span>
            <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Multi-Touch Cold Email &amp; LinkedIn</span>
            <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> UAE PDPL Aligned Workflows</span>
          </div>
        </motion.div>
      </section>

      {/* ── Direct Answer / Definition Block (Featured Snippet Optimized) ── */}
      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                EXECUTIVE SUMMARY &amp; DEFINITION
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">
                What is an AI Lead Generation Agency in Dubai?
              </h2>
            </div>
          </div>
          <p className="text-[16px] md:text-[17px] text-white/80 leading-relaxed font-light pl-0 md:pl-14">
            An <strong>AI lead generation agency in Dubai</strong> designs, builds, and manages automated B2B acquisition engines that unite Ideal Customer Profile (ICP) intelligence, verified corporate intent triggers, multi-channel outreach sequences (Email, LinkedIn, WhatsApp), and CRM qualification. Rather than purchasing static, decaying lead databases or deploying indiscriminate spam blasts, AI lead generation leverages machine-speed intelligence to research target accounts, verify executive contacts, and initiate relevant, compliance-aware business dialogues that empower human sales teams to close high-value deals.
          </p>
        </div>
      </section>

      {/* ── Section 1: The Problem with Traditional Outbound in Dubai ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-4">
              Pillar 01: Market Reality
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              The 2% Reply Rate Trap in the GCC.
            </h2>
            <div className="h-px w-16 bg-emerald-500/40 mb-6" />
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Dubai and GCC executives receive dozens of unsolicited, generic pitches every single day. Traditional volume-heavy outbound methods no longer generate qualified revenue.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8 text-white/75 font-light text-[16px] md:text-[17px] leading-relaxed">
            <p>
              In competitive markets across Dubai, DIFC, and Abu Dhabi, the era of scraping random lists from general directories and sending mass template blasts is over. When businesses broadcast identical generic emails, two things happen immediately: response rates plummet below 1%, and corporate email servers blacklist the sender’s primary domain.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-6 border border-red-500/20 bg-red-500/[0.02] rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-semibold text-white text-base">The Scraping Trap</h3>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Purchased broker lists and untargeted directories feature up to 35% bounced or defunct contacts, damaging sender score permanently.
                </p>
              </div>

              <div className="p-6 border border-red-500/20 bg-red-500/[0.02] rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-semibold text-white text-base">Cultural Disconnect</h3>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  High-net-worth UAE executives and enterprise leaders ignore generic templates that lack local market awareness and industry context.
                </p>
              </div>
            </div>

            <p>
              Asif Digital engineers intelligent outbound systems built for the Gulf region. We replace blind volume with precision targeting: detecting specific buying signals, verifying decision-maker details, contextualizing outreach with corporate intelligence, and ensuring seamless hand-offs to your account executives.
            </p>

            <div className="p-6 border border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl">
              <h4 className="font-serif text-lg text-white mb-2 font-semibold">The Asif Digital Approach: Relevance at Scale</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                We combine technical email deliverability infrastructure with automated public research so your sales communications read as thoughtful, well-researched advisory inquiries rather than robotic cold spam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: The 5-Stage AI B2B Pipeline Architecture ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-3 font-semibold">
              ENGINEERING SPECIFICATION
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              The 5-Stage AI Acquisition Pipeline.
            </h2>
            <p className="text-white/50 text-sm md:text-base font-light">
              How our automated outbound architecture transforms raw market data into qualified B2B sales meetings.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "ICP Definition & Dynamic Signal Detection",
                desc: "We define precise Ideal Customer Profiles across industry, company headcount, revenue bands, and geography. Rather than targeting static lists, our systems monitor dynamic intent triggers: executive leadership appointments, regional hiring surges, office relocations in DIFC/Business Bay, new commercial licensing, and announced tech investments.",
                tags: ["Trigger Events", "Technographic Filters", "Regional Targeting"]
              },
              {
                step: "02",
                title: "Account Research & Multi-Source Contact Enrichment",
                desc: "For each identified account, our research workflows aggregate publicly available business data (corporate filings, press announcements, corporate websites, and professional social profiles). We resolve verified direct business email addresses, direct phone extensions, and verify MX records in real time to guarantee near-zero bounce rates.",
                tags: ["Public OSINT", "SMTP Ping Verification", "Dossier Synthesis"]
              },
              {
                step: "03",
                title: "Personalized Multi-Channel Touchpoints",
                desc: "We deploy isolated secondary sending domains with dedicated warmup schedules to preserve your primary corporate domain. AI models synthesize account-specific value propositions that cite real business context. Sequences run across coordinated channels—custom email cadences, LinkedIn relationship touchpoints, and verified WhatsApp business follow-ups.",
                tags: ["Secondary Domain Infra", "Contextual Snippets", "Warmup Cadence"]
              },
              {
                step: "04",
                title: "Intelligent Lead Qualification & Objection Triage",
                desc: "When prospects respond, our conversational triage layer classifies intent: distinguishing between out-of-office replies, soft objections, technical inquiries, and high-intent requests for discovery. Routine scheduling queries are handled instantly, and qualified responses are routed directly to your calendars.",
                tags: ["Sentiment Classification", "Calendar Routing", "Triage Rules"]
              },
              {
                step: "05",
                title: "Bi-Directional CRM Synchronization & AE Handoff",
                desc: "Every interaction, prospect note, engagement timestamp, and synthesized research dossier is automatically synced into your existing CRM (HubSpot, Salesforce, Zoho, Pipedrive). Your Account Executives enter the sales meeting fully briefed with complete conversational context.",
                tags: ["CRM Auto-Sync", "Account Executive Briefing", "Pipeline Hygiene"]
              }
            ].map((stage, idx) => (
              <div key={idx} className="p-8 md:p-10 border border-white/5 bg-black/60 rounded-3xl hover:border-white/15 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2 flex items-center gap-4">
                    <span className="text-3xl md:text-4xl font-serif text-white/30 font-light">{stage.step}</span>
                    <div className="h-px flex-1 bg-white/10 lg:hidden" />
                  </div>
                  <div className="lg:col-span-7">
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">{stage.title}</h3>
                    <p className="text-sm md:text-[15px] text-white/70 leading-relaxed font-light">{stage.desc}</p>
                  </div>
                  <div className="lg:col-span-3 flex flex-wrap gap-2 lg:justify-end">
                    {stage.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Comparison Table - Manual vs. AI-Assisted Pipeline ── */}
      <section className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            METHODOLOGY COMPARISON
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Manual Prospecting vs. AI-Assisted Pipeline.
          </h2>
          <p className="text-white/50 text-sm font-light">
            Evaluating operational efficiency, data fidelity, and domain risk across outbound models.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm font-light">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-6">Evaluation Dimension</th>
                <th className="py-4 px-6 text-white/60">Traditional Manual Prospecting</th>
                <th className="py-4 px-6 text-emerald-400 bg-emerald-500/[0.04] rounded-t-2xl">Asif Digital AI Outbound Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/75">
              <tr>
                <td className="py-5 px-6 font-medium text-white">Prospect Research</td>
                <td className="py-5 px-6 text-white/60">25–45 minutes per lead, manual LinkedIn searches, incomplete data</td>
                <td className="py-5 px-6 text-white/90 bg-emerald-500/[0.04]">Real-time public OSINT data synthesis across thousands of target accounts</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Personalization Quality</td>
                <td className="py-5 px-6 text-white/60">Surface-level variables ({`{FirstName}`}, {`{Company}`}) that feel generic</td>
                <td className="py-5 px-6 text-white/90 bg-emerald-500/[0.04]">Multi-variable contextual relevance citing hiring trends, recent news &amp; tech stack</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Outreach Cadence</td>
                <td className="py-5 px-6 text-white/60">Irregular, inconsistent follow-ups depending on SDR schedule</td>
                <td className="py-5 px-6 text-white/90 bg-emerald-500/[0.04]">Calibrated multi-touch schedule across Email, LinkedIn, and WhatsApp</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Response Time (Speed to Lead)</td>
                <td className="py-5 px-6 text-white/60">4–24 hours average response time; leads turn cold rapidly</td>
                <td className="py-5 px-6 text-white/90 bg-emerald-500/[0.04]">Sub-5-minute intent classification, triage, and instant calendar routing</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">CRM &amp; Pipeline Hygiene</td>
                <td className="py-5 px-6 text-white/60">Scattered spreadsheets, missing phone numbers, untracked interactions</td>
                <td className="py-5 px-6 text-white/90 bg-emerald-500/[0.04]">Automatic bi-directional synchronization with complete activity dossiers</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Domain Safety &amp; Deliverability</td>
                <td className="py-5 px-6 text-white/60">High risk: blasts sent from primary company domains, causing blacklist penalties</td>
                <td className="py-5 px-6 text-white/90 bg-emerald-500/[0.04]">Zero primary domain risk: isolated secondary domains, SPF/DKIM/DMARC &amp; warmup</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 4: Industry & Vertical Specialization ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
              MARKET APPLICATION
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Engineered for High-Value UAE Sectors.
            </h2>
            <p className="text-white/50 text-sm md:text-base font-light">
              We design specialized acquisition workflows tailored to the exact decision-making dynamics of key commercial verticals across the Emirates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
                Enterprise Technology &amp; B2B SaaS
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                Map complex enterprise buying units across GCC tech hubs. Identify CIOs, CTOs, and Head of Infrastructure, engaging them with pain points tied to software modernization, cloud migration, and operational efficiency.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span>Key Targets:</span>
                <span className="text-white/50">Tech Founders, CTOs, Enterprise IT Directors</span>
              </div>
            </div>

            <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
                Corporate &amp; Professional Services
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                Support corporate service providers, tax advisors, legal firms, and audit practices targeting companies setting up or restructuring in DIFC, ADGM, and UAE mainland jurisdictions.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span>Key Targets:</span>
                <span className="text-white/50">CFOs, Managing Directors, In-House Counsel</span>
              </div>
            </div>

            <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
                Commercial &amp; Off-Plan Real Estate
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                Qualify institutional commercial investors, family office buyers, and high-ticket off-plan prospects with rapid response landing pages and WhatsApp lead capture systems.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span>Specialized Hub:</span>
                  <span className="text-white/50">Developer &amp; Brokerage Systems</span>
                </div>
                <Link href="/real-estate/ai-lead-dashboard" className="text-xs text-white/80 hover:text-white underline inline-flex items-center gap-1 font-medium">
                  View Real Estate AI Dashboard →
                </Link>
              </div>
            </div>

            <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
                Industrial Trade, Logistics &amp; Wholesale
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                Connect B2B manufacturers, industrial equipment distributors, and freight operators with supply chain leaders, procurement heads, and warehouse operations directors across JAFZA, KIZAD, and Sharjah industrial clusters.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span>Key Targets:</span>
                <span className="text-white/50">Procurement Managers, Supply Chain Heads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: The GCC WhatsApp & Omnichannel Playbook ── */}
      <section className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-4 font-semibold">
              REGIONAL COMMUNICATION PLAYBOOK
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Where GCC Deals Move: <br />
              <span className="italic font-light text-white/70">Omnichannel &amp; WhatsApp.</span>
            </h2>
            <div className="space-y-6 text-white/70 font-light text-[15px] md:text-[16px] leading-relaxed">
              <p>
                In the UAE and broader Gulf region, email functions as the ledger of record, but <strong>WhatsApp is where relationships and rapid decisions materialize</strong>. B2B acquisition engines that omit professional messaging forfeit massive conversion momentum.
              </p>
              <p>
                We architect consent-aware, policy-compliant WhatsApp engagement layers for business communications. Operating through verified Meta Business API credentials, our conversational intake agents field inbound inquiries, answer preliminary questions, confirm meeting times, and route warm leads directly to your team.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-2xl font-serif font-bold text-white block mb-1">&lt; 3 mins</span>
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Inquiry Response Time</span>
                </div>
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <span className="text-2xl font-serif font-bold text-white block mb-1">100%</span>
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Meta Policy Alignment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative bg-black border border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Khalid — B2B Intake Agent</h4>
                    <span className="text-[10px] font-mono text-emerald-400">Asif Digital Sales Pipeline</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded-full">B2B INTAKE</span>
              </div>

              <div className="space-y-4 text-xs font-light">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-white/80">
                  <p>Marhaba Tariq. We noticed your logistics firm recently expanded warehouse operations in Dubai South. Are you currently reviewing automated dispatch management or ERP integration for that facility?</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/20 text-white p-4 rounded-2xl rounded-tr-none ml-auto max-w-[85%]">
                  <p className="font-normal">Yes, we are evaluating dispatch automation for Q3. What integrations do you support?</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-white/80">
                  <p>We connect directly with SAP, Oracle NetSuite, and custom REST APIs. Would you like a 15-minute briefing with our technical lead this Thursday at 11 AM?</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>Verified Meta Cloud API</span>
                <span>CRM Synced: HubSpot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Illustrative Pipeline Sizing & ROI Calculator ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-3 font-semibold">
              ILLUSTRATIVE MODEL
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              B2B Pipeline Sizing Model.
            </h2>
            <p className="text-white/50 text-sm font-light">
              Explore potential pipeline generation based on target account volume and average contract values.
            </p>
          </div>

          <div className="p-8 md:p-12 border border-white/10 bg-black rounded-[2.5rem] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-3">
                    <span className="text-white/70 uppercase tracking-wider">Monthly Researched Accounts:</span>
                    <span className="text-white font-bold text-base">{targetAccounts} Accounts</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    step="50"
                    value={targetAccounts}
                    onChange={(e) => setTargetAccounts(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                    <span>100 accounts</span>
                    <span>1,000 accounts</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-3">
                    <span className="text-white/70 uppercase tracking-wider">Average Deal / ACV (AED):</span>
                    <span className="text-white font-bold text-base">AED {dealValue.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="15000" 
                    max="150000" 
                    step="5000"
                    value={dealValue}
                    onChange={(e) => setDealValue(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                    <span>AED 15,000</span>
                    <span>AED 150,000</span>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white/60 font-light flex items-start gap-3">
                  <Sliders className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Model parameters assume calibrated 3.5% benchmark meeting booking rate across researched accounts with verified decision-maker emails.</span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-center text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
                  ESTIMATED MONTHLY PIPELINE
                </span>
                <div className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                  AED {estPipelineValue.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-white/50 mb-6">
                  ~ {estQualifiedMeetings} Qualified Discovery Meetings / Month
                </div>
                
                <Link 
                  href="/contact" 
                  className="bg-white text-black py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all text-center"
                >
                  Verify Feasibility For Your Niche
                </Link>
              </div>
            </div>

            <p className="text-[11px] text-white/40 italic mt-8 text-center border-t border-white/5 pt-4">
              *Disclaimer: Figures are illustrative projections based on historical B2B response bands. Actual pipeline outcomes depend on product-market fit, TAM, offer competitiveness, and internal sales closing velocity.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 7: Operational Boundaries, Compliance & Safety ── */}
      <section className="py-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            GOVERNANCE &amp; ETHICS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Operational Boundaries &amp; Data Ethics.
          </h2>
          <p className="text-white/50 text-sm font-light">
            We operate transparent, compliance-first acquisition systems that protect your brand and infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 border border-white/5 bg-black rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">No Fake Meeting Guarantees</h3>
            </div>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              We do not promise “guaranteed 50 meetings this month.” Outbound sales performance is inextricably linked to offer economics, pricing, target TAM, and commercial credibility. We guarantee the rigor of the pipeline infrastructure.
            </p>
          </div>

          <div className="p-8 border border-white/5 bg-black rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">UAE PDPL Alignment</h3>
            </div>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              Architected around UAE Federal Decree-Law No. 45 on Personal Data Protection. We handle public corporate data, respect opt-out preferences instantly, and maintain clean audit trails for client contact interactions.
            </p>
          </div>

          <div className="p-8 border border-white/5 bg-black rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">Domain &amp; Infrastructure Isolation</h3>
            </div>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              Outbound sequences are never dispatched from your primary corporate email domain. We configure isolated secondary domains with dedicated SPF, DKIM, DMARC, and custom tracking protocols to eliminate deliverability risk.
            </p>
          </div>

          <div className="p-8 border border-white/5 bg-black rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">Human-in-the-Loop Oversight</h3>
            </div>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              AI accelerates intelligence mining and first-draft generation, but your sales leadership maintains oversight. Sensitive communications and high-value strategic accounts receive human approval before transmission.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 8: Implementation Roadmap ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-3 font-semibold">
              EXECUTION TIMELINE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              4-Week Pipeline Deployment.
            </h2>
            <p className="text-white/50 text-sm font-light">
              A structured, measurable roadmap to bringing your automated B2B acquisition engine online.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">WEEK 01</span>
              <h3 className="text-base font-semibold text-white mb-2">Setup &amp; Domains</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Provision secondary domains, configure SPF/DKIM/DMARC DNS records, initiate automated warmup routines, and define initial ICP parameters.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">WEEK 02</span>
              <h3 className="text-base font-semibold text-white mb-2">Signals &amp; Lists</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Configure data scraping flows, verify contact email servers, filter for dynamic buying triggers, and build target account lists.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">WEEK 03</span>
              <h3 className="text-base font-semibold text-white mb-2">Copy &amp; CRM Sync</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Calibrate personalized copy sequences, connect CRM bi-directional syncing, test lead notification webhooks, and start initial sends.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">WEEK 04</span>
              <h3 className="text-base font-semibold text-white mb-2">Scale &amp; Meetings</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Analyze open and reply sentiment, optimize messaging angles, triage incoming discovery calls, and scale daily send volume safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 9: Frequently Asked Questions ── */}
      <section className="py-28 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            CLEAR ANSWERS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-white/50 text-sm font-light">
            Everything you need to know about implementing AI lead generation and sales automation in Dubai.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-base md:text-lg font-serif font-medium text-white">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-white" : ""
                  }`} 
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-2 text-sm md:text-[15px] text-white/70 font-light leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 10: Strategic Ecosystem & Related Intelligence ── */}
      <section className="py-24 bg-white/[0.015] border-t border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-2 font-semibold">
                CROSS-DISCIPLINARY ARCHITECTURE
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-white">
                Related AI Systems &amp; Technical Capabilities.
              </h2>
            </div>
            <Link 
              href="/blog" 
              className="text-xs font-mono uppercase tracking-wider text-emerald-400 hover:underline flex items-center gap-2"
            >
              View Research Publications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/sovereign-sales-agent" 
              className="p-8 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-4">Autonomous Sales</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Sovereign Sales Agent
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Enterprise command center for B2B target discovery, AI qualification, draft outreach, and lead inbox workflows.
              </p>
            </Link>

            <Link 
              href="/workflow-automation-uae" 
              className="p-8 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-4">Operations</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Workflow Automation UAE
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Connect your CRM, ERP, and operational messaging to eliminate manual administrative data entry.
              </p>
            </Link>

            <Link 
              href="/ai-consulting-uae" 
              className="p-8 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-4">Advisory</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-emerald-300 transition-colors">
                AI Consulting UAE
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Strategic readiness audits, architecture evaluation, and working PoC validation for UAE enterprise leaders.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 11: Final Call to Action ── */}
      <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block mb-4 font-semibold">
            COMMENCE PIPELINE DIAGNOSTIC
          </span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Build a Predictable B2B <br />
            <span className="italic font-light text-white/70">Acquisition Pipeline.</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Schedule an initial pipeline architecture consultation with our technical strategists to audit your addressable TAM, ICP triggers, and outbound deliverability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
            >
              Book Strategic Consultation
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto border border-white/20 text-white/80 hover:text-white px-8 py-5 rounded-full font-medium uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 12: Contextual Internal Links Swarm ── */}
      <section className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center text-white/50 text-xs font-mono">
            <Link href="/ai-marketing-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
            <span>•</span>
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span>•</span>
            <Link href="/ai-chatbots-dubai" className="hover:text-white transition-colors">AI Chatbots Dubai</Link>
            <span>•</span>
            <Link href="/ai-consulting-uae" className="hover:text-white transition-colors">AI Consulting UAE</Link>
            <span>•</span>
            <Link href="/real-estate/ai-lead-dashboard" className="hover:text-white transition-colors">Real Estate AI Lead Dashboard</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
