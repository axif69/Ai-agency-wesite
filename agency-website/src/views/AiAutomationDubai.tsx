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
  Clock, Award, Sliders, Briefcase, FileCheck, DollarSign,
  Workflow, GitFork, KeyRound, Terminal, Eye, ShieldAlert,
  Server, FileText, CheckCheck, ArrowUpRight, CheckCircle,
  ExternalLink, Layers3
} from "lucide-react";
import Link from "next/link";

export default function AiAutomationDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Scoping Estimator State
  const [departments, setDepartments] = useState(3);
  const [weeklyTasks, setWeeklyTasks] = useState(450);
  const [minsPerTask, setMinsPerTask] = useState(15);
  const [automatableShare, setAutomatableShare] = useState(60); // %

  const monthlyTasks = weeklyTasks * 4.33;
  const addressableMonthlyHours = Math.round((monthlyTasks * minsPerTask * (automatableShare / 100)) / 60);

  const getScopeTier = () => {
    if (departments <= 2 && weeklyTasks < 300) {
      return {
        name: "Targeted Workflow Automation",
        desc: "Focused single-department integration (e.g., CRM routing or invoice intake) with standard API connectors and basic approval gates.",
        complexity: "Standard Complexity"
      };
    }
    if (departments <= 4 && weeklyTasks < 1000) {
      return {
        name: "Cross-Departmental Pipeline Integration",
        desc: "Multi-system data orchestration bridging sales, operations, and finance with human-in-the-loop exception queues and audit logging.",
        complexity: "Medium-High Complexity"
      };
    }
    return {
      name: "Enterprise Business Process Orchestration",
      desc: "Multi-entity architecture coordinating complex ERP/CRM states, document intelligence pipelines, custom LLM tool-calling agents, and dedicated private cloud deployment.",
      complexity: "Enterprise Complexity"
    };
  };

  const currentScope = getScopeTier();

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What does an enterprise AI automation agency actually do?",
      a: "An enterprise AI automation agency designs, builds, and maintains software integrations that automate repetitive business operations. Rather than delivering isolated no-code bots or conceptual slide decks, we engineer resilient backend pipelines, custom API middleware, document extraction systems, and human-in-the-loop workflows that connect your CRM, ERP, databases, and communication channels into a unified, auditable operational backbone."
    },
    {
      q: "How does Asif Digital differ from generic Zapier/Make freelancers?",
      a: "Freelancer setups typically rely on fragile webhook chains without failure recovery, schema validation, or data governance. Asif Digital engineers enterprise-grade automation: we build with decoupled microservices, idempotent retry queues, comprehensive error alerting, human verification checkpoints for sensitive data, and governance architectures aligned with UAE Federal Decree-Law No. 45 (PDPL)."
    },
    {
      q: "Which systems and software platforms can you integrate with?",
      a: "Common integrations may include HubSpot, Salesforce, Zoho, SAP, Oracle NetSuite, Dynamics and other systems depending on API availability, permissions and the client's environment. We also engineer custom REST, GraphQL, and webhook adapters for proprietary in-house databases and legacy on-premise systems."
    },
    {
      q: "How does Asif Digital handle data privacy and UAE regulatory compliance?",
      a: "We design our data architectures around UAE PDPL-aligned data handling, strict access controls, vendor assessment, cross-border data considerations, and client-specific residency requirements. We offer regional cloud and private deployment options where appropriate to the client's governance and infrastructure requirements, ensuring proprietary corporate data is never used to train public foundational models."
    },
    {
      q: "What is the difference between workflow automation, AI agents, and AI consulting?",
      a: "Workflow automation focuses on deterministic, rules-based data movement between APIs and databases. AI agents introduce bounded reasoning, unstructured information extraction, and tool-calling autonomy within supervised operational boundaries. AI consulting provides the strategic readiness audits, architecture design, and governance frameworks that precede multi-system engineering. As an umbrella agency, Asif Digital delivers across all three disciplines."
    },
    {
      q: "What does an indicative deployment timeline look like?",
      a: "A typical engagement follows an indicative 4-to-6 week deployment framework: Week 1 focuses on workflow discovery and technical scoping; Weeks 2-3 on API integration and schema engineering; Weeks 4-5 on human-in-the-loop validation and security review; and Week 6 on monitored production rollout and team handoff. Actual delivery depends on system access, integration complexity, security review and business scope."
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
              "name": "Asif Digital - AI Automation Agency Dubai",
              "url": "https://www.asifdigital.agency/ai-automation-agency-dubai",
              "description": "Enterprise AI automation agency in Dubai. We architect business process automation, CRM/ERP integrations, document intelligence, and human-in-the-loop workflows for UAE companies.",
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
                "Enterprise AI Automation",
                "Business Process Automation",
                "CRM and ERP System Integration",
                "Document Intelligence & Data Extraction",
                "Human-in-the-Loop Workflow Engineering"
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
                  "name": "AI Automation Agency Dubai",
                  "item": "https://www.asifdigital.agency/ai-automation-agency-dubai"
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

      {/* ── 1. Hero Section with Clear Agency Definition ── */}
      <section className="relative px-6 pt-12 pb-20 md:pt-20 md:pb-28 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest text-emerald-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial Automation Hub • Dubai, UAE</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.15] text-white">
            Enterprise AI Automation Agency in Dubai
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
            We engineer high-reliability business process automation, CRM and ERP integrations, document intelligence pipelines, and human-in-the-loop operational workflows for established UAE organizations.
          </p>

          {/* Definition Clarification Card */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-left max-w-3xl mx-auto mt-6">
            <div className="flex items-start gap-4">
              <Layers3 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-sm font-mono uppercase tracking-wider text-white/90">What We Deliver As An Automation Agency</h3>
                <p className="text-sm text-white/75 font-light leading-relaxed">
                  We bridge the divide between brittle no-code tools and enterprise systems engineering. Our solutions automate mission-critical data flows between customer touchpoints, internal business logic, and backend databases—reinforced with automated error-recovery, immutable auditability, and supervised human approval controls.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition shadow-lg shadow-white/10 text-sm"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 transition text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Specialist Discipline Navigation Router (Hub-and-Spoke) ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Umbrella Navigation Router</span>
          <h2 className="text-2xl md:text-4xl font-serif">Specialist Automation Disciplines</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Every enterprise has unique operational friction. Explore our dedicated technical discipline hubs depending on your immediate engineering requirements:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spoke 1: Workflow Automation */}
          <Link
            href="/workflow-automation-uae"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Workflow Automation UAE</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                API integrations, webhook orchestration, backend middleware, and deterministic data synchronization across enterprise software stacks.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-emerald-400/90 group-hover:underline">Explore API &amp; Middleware &rarr;</span>
          </Link>

          {/* Spoke 2: AI Agents */}
          <Link
            href="/ai-agents-dubai"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>AI Agents Dubai</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Autonomous reasoning agents, multi-agent systems, structured tool calling, and state-machine decision workflows under human approval.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-blue-400/90 group-hover:underline">Explore Multi-Agent Systems &rarr;</span>
          </Link>

          {/* Spoke 3: AI Consulting */}
          <Link
            href="/ai-consulting-uae"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>AI Consulting UAE</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Operational readiness audits, executive AI roadmaps, vendor technical evaluations, and UAE PDPL-aligned governance frameworks.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-purple-400/90 group-hover:underline">Explore Advisory &amp; Audits &rarr;</span>
          </Link>

          {/* Spoke 4: WhatsApp Automation */}
          <Link
            href="/services/whatsapp-automation-gcc"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-green-400 transition-colors flex items-center justify-between">
                <span>WhatsApp Automation GCC</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Official Meta Cloud API integrations, bilingual CRM lead routing, automated document dispatch, and high-velocity customer workflows.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-green-400/90 group-hover:underline">Explore WhatsApp Systems &rarr;</span>
          </Link>

          {/* Spoke 5: Lead Generation */}
          <Link
            href="/ai-lead-generation-agency-dubai"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>AI Lead Generation Dubai</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                B2B outbound pipeline automation, firmographic intent triggers, inbox deliverability infrastructure, and verified prospect workflows.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-amber-400/90 group-hover:underline">Explore Lead Generation &rarr;</span>
          </Link>

          {/* Spoke 6: Regional & Language Specialization */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white">Regional &amp; Language Hubs</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Looking for regional jurisdiction or language-specific models? Review our specialized hubs:
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-white/5 text-xs font-mono">
              <Link href="/ai-automation-abu-dhabi" className="flex items-center justify-between text-white/80 hover:text-cyan-400 transition-colors py-1">
                <span>Abu Dhabi Industrial &amp; Regulated &rarr;</span>
              </Link>
              <Link href="/arabic-ai-hub" className="flex items-center justify-between text-white/80 hover:text-cyan-400 transition-colors py-1">
                <span>Arabic AI &amp; Multilingual LLMs &rarr;</span>
              </Link>
              <Link href="/ai-automation-sharjah" className="flex items-center justify-between text-white/80 hover:text-cyan-400 transition-colors py-1">
                <span>Sharjah Commercial Automation &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Five Core Automation Pillars ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Engineering Capabilities</span>
          <h2 className="text-2xl md:text-4xl font-serif">5 Core Automation Pillars for Dubai Businesses</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            We architect end-to-end automation pipelines designed to eliminate friction across your core commercial workflows:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">CRM &amp; Revenue Operations</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Automate lead capture across web forms, WhatsApp, and advertising platforms. Enrich prospect profiles, route enquiries by industry or territory, and synchronize deal pipeline stages without manual data entry.
            </p>
            <ul className="space-y-2 text-xs text-white/60 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Immediate lead intake &amp; deduplication</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Rep assignment &amp; round-robin routing</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automated deal hygiene &amp; activity logging</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">Document Intelligence &amp; Ingestion</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Extract structured, schema-validated JSON from messy PDFs, trade invoices, customs declarations, contracts, and scanned receipts using vision-capable models and optical character verification.
            </p>
            <ul className="space-y-2 text-xs text-white/60 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Multi-format commercial invoice extraction</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Tenancy contract &amp; Emirates ID parsing</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Automated validation against accounting systems</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">ERP &amp; Operational Middleware</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Connect disparate software islands. Build resilient synchronization layers that update inventory counts, generate billing orders, sync purchase requests, and keep accounting databases harmonious.
            </p>
            <ul className="space-y-2 text-xs text-white/60 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Real-time 2-way data reconciliation</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Asynchronous queued retry architecture</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Idempotent order &amp; invoice processing</li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">Conversational AI &amp; Triaging</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Deploy intelligent front-line support on WhatsApp and web chat. Automatically resolve routine service enquiries, qualify customer intent in Arabic and English, and cleanly route complex cases to specialists.
            </p>
            <ul className="space-y-2 text-xs text-white/60 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Official Meta Cloud API compliance</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Dual Arabic &amp; English language processing</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Context-preserving live agent handover</li>
            </ul>
          </div>

          {/* Pillar 5 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4 md:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">Human-in-the-Loop Decision Gates</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              We strictly reject uncontrolled, autonomous execution for high-stakes business actions. Our systems incorporate supervisory approval queues where AI prepares drafts, extracts structured insights, and proposes transactions—requiring authorized human sign-off before executing irreversible database mutations or financial events.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/60 font-mono pt-2 border-t border-white/5">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Slack / Teams interactive approval prompts</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Financial threshold mutation limits</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Detailed discrepancy &amp; confidence flagging</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Full operational rollback capabilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Comparison Matrix: Fragile Scripts vs Enterprise Engineering ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Architectural Standards</span>
          <h2 className="text-2xl md:text-4xl font-serif">Ad-Hoc Automation vs. Enterprise Engineering</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Why serious Dubai organizations avoid brittle no-code templates in favor of production-grade systems architecture:
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-wider p-4">
            <div className="text-white/60">Evaluation Dimension</div>
            <div className="text-red-400/90 mt-2 md:mt-0">Ad-Hoc / Zapier-Style Scripts</div>
            <div className="text-emerald-400 mt-2 md:mt-0">Asif Digital Engineered Systems</div>
          </div>

          <div className="divide-y divide-white/5 text-sm font-light">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 md:gap-4 items-center">
              <div className="font-medium text-white/90 text-xs font-mono uppercase">System Architecture</div>
              <div className="text-white/60 text-xs leading-relaxed">Tightly-coupled single triggers; any field change or API hiccup breaks the entire workflow silently.</div>
              <div className="text-white/90 text-xs leading-relaxed">Decoupled microservices with stateful message queues, schema validation, and isolated worker threads.</div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 md:gap-4 items-center bg-white/[0.01]">
              <div className="font-medium text-white/90 text-xs font-mono uppercase">Failure Handling &amp; Fallbacks</div>
              <div className="text-white/60 text-xs leading-relaxed">No error recovery; failed runs drop customer data or stop execution without human notification.</div>
              <div className="text-white/90 text-xs leading-relaxed">Deterministic retry queues with exponential backoff, dead-letter storage, and instant Slack/Email alerts.</div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 md:gap-4 items-center">
              <div className="font-medium text-white/90 text-xs font-mono uppercase">Data Handling &amp; Privacy</div>
              <div className="text-white/60 text-xs leading-relaxed">Multi-tenant SaaS clouds passing customer data through unvetted international servers without encryption controls.</div>
              <div className="text-white/90 text-xs leading-relaxed">UAE PDPL-aligned data handling, least-privilege tokens, and regional private cloud deployment options.</div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 md:gap-4 items-center bg-white/[0.01]">
              <div className="font-medium text-white/90 text-xs font-mono uppercase">Governance &amp; Auditability</div>
              <div className="text-white/60 text-xs leading-relaxed">Zero activity logs or version control; changes cannot be tracked, audited, or attributed to users.</div>
              <div className="text-white/90 text-xs leading-relaxed">Comprehensive audit logs, role-based access control (RBAC), and full payload telemetry for every event.</div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 md:gap-4 items-center">
              <div className="font-medium text-white/90 text-xs font-mono uppercase">Scalability &amp; Throughput</div>
              <div className="text-white/60 text-xs leading-relaxed">Severe rate limits, concurrent run caps, and high usage bills that spike under operational volume.</div>
              <div className="text-white/90 text-xs leading-relaxed">High-throughput asynchronous batch processing capable of handling tens of thousands of records predictably.</div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 md:gap-4 items-center bg-white/[0.01]">
              <div className="font-medium text-white/90 text-xs font-mono uppercase">Long-Term Maintenance &amp; SLAs</div>
              <div className="text-white/60 text-xs leading-relaxed">Freelancer hands off a black box and disappears; broken when third-party software updates UI or API.</div>
              <div className="text-white/90 text-xs leading-relaxed">Monitored support agreements, versioned API maintenance, regression testing, and local Dubai engineering access.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Integration Ecosystem (Safeguarded) ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Interoperability</span>
          <h2 className="text-2xl md:text-4xl font-serif">Enterprise Software Ecosystem</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            We integrate across your existing commercial software landscape to build seamless operational pipelines.
          </p>
          <p className="text-xs text-white/50 italic max-w-2xl mx-auto pt-1">
            Common integrations may include HubSpot, Salesforce, Zoho, SAP, Oracle NetSuite, Dynamics and other systems depending on API availability, permissions and the client&apos;s environment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-xs font-mono text-white/80 block mb-1">CRM Platforms</span>
            <span className="text-sm font-medium text-white">HubSpot / Salesforce</span>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-xs font-mono text-white/80 block mb-1">Regional CRM</span>
            <span className="text-sm font-medium text-white">Zoho CRM / One</span>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-xs font-mono text-white/80 block mb-1">ERP Systems</span>
            <span className="text-sm font-medium text-white">SAP / NetSuite</span>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-xs font-mono text-white/80 block mb-1">Enterprise Ops</span>
            <span className="text-sm font-medium text-white">MS Dynamics 365</span>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-xs font-mono text-white/80 block mb-1">Messaging</span>
            <span className="text-sm font-medium text-white">WhatsApp Cloud API</span>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-xs font-mono text-white/80 block mb-1">Data Warehouses</span>
            <span className="text-sm font-medium text-white">PostgreSQL / BigQuery</span>
          </div>
        </div>
      </section>

      {/* ── 6. Interactive Automation Scoping Estimator ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Operational Scoping Tool</span>
          <h2 className="text-2xl md:text-4xl font-serif">Automation Impact &amp; Architecture Scoping Model</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Calibrate your organization&apos;s manual repetitive task volume to evaluate addressable engineering scope and recommended architecture tier:
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Departments */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70">Departments in Scope</span>
                <span className="text-emerald-400 font-semibold">{departments} Departments</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={departments}
                onChange={(e) => setDepartments(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <span className="text-[11px] text-white/40 block">E.g., Sales, Operations, Finance, Logistics, HR</span>
            </div>

            {/* Slider 2: Weekly Tasks */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70">Weekly Repetitive Tasks</span>
                <span className="text-emerald-400 font-semibold">{weeklyTasks} tasks/wk</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={weeklyTasks}
                onChange={(e) => setWeeklyTasks(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <span className="text-[11px] text-white/40 block">Enquiries, document copies, data reconciliations</span>
            </div>

            {/* Slider 3: Minutes Per Task */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70">Avg. Manual Minutes / Task</span>
                <span className="text-emerald-400 font-semibold">{minsPerTask} mins</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="5"
                value={minsPerTask}
                onChange={(e) => setMinsPerTask(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <span className="text-[11px] text-white/40 block">Time spent reviewing, copying, and re-entering data</span>
            </div>

            {/* Slider 4: Automatable Share */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70">Estimated Automatable Share</span>
                <span className="text-emerald-400 font-semibold">{automatableShare}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={automatableShare}
                onChange={(e) => setAutomatableShare(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <span className="text-[11px] text-white/40 block">Realistic repetitive task portion suitable for automation</span>
            </div>
          </div>

          {/* Results Output */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/90">Addressable Operational Capacity</span>
              <div className="text-3xl md:text-4xl font-serif text-white">~{addressableMonthlyHours.toLocaleString()} hrs<span className="text-sm font-sans font-light text-white/60"> / month</span></div>
              <p className="text-xs text-white/60 pt-1">Estimated monthly manual effort candidates for automated processing</p>
            </div>

            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03] space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-white/60">Recommended Architecture</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-400">{currentScope.complexity}</span>
              </div>
              <h4 className="text-base font-medium text-white">{currentScope.name}</h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">{currentScope.desc}</p>
            </div>
          </div>

          <p className="text-[11px] text-white/40 italic text-center">
            Note: This scoping model is an illustrative operational guide, not a commercial commitment. Precise engineering requirements and hours depend on API access, document complexity, and security governance requirements.
          </p>
        </div>
      </section>

      {/* ── 7. Typical 4-to-6 Week Deployment Framework ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Delivery Methodology</span>
          <h2 className="text-2xl md:text-4xl font-serif">Typical 4-to-6 Week Deployment Framework</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            We apply a disciplined engineering approach to design, integrate, test, and deploy resilient business automations:
          </p>
          <div className="inline-block px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mt-2">
            Indicative timeline only. Actual delivery depends on system access, integration complexity, security review and business scope.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Phase 1 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
            <span className="text-2xl font-serif text-emerald-400">01</span>
            <h3 className="text-base font-medium text-white">Discovery &amp; Scoping</h3>
            <span className="text-xs font-mono text-white/50 block">Week 1</span>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Map manual process bottlenecks, examine API documentation and endpoints, define error recovery protocols, and document operational data requirements.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
            <span className="text-2xl font-serif text-emerald-400">02</span>
            <h3 className="text-base font-medium text-white">Schema &amp; Integration</h3>
            <span className="text-xs font-mono text-white/50 block">Weeks 2 – 3</span>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Develop backend webhook receivers, configure schema validation, connect CRM/ERP endpoints, and implement asynchronous event queues with retry logic.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
            <span className="text-2xl font-serif text-emerald-400">03</span>
            <h3 className="text-base font-medium text-white">Human Gates &amp; Review</h3>
            <span className="text-xs font-mono text-white/50 block">Weeks 4 – 5</span>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Implement human-in-the-loop exception approval queues in Slack or Teams, execute regression stress tests, and verify data handling boundaries.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
            <span className="text-2xl font-serif text-emerald-400">04</span>
            <h3 className="text-base font-medium text-white">Rollout &amp; Monitoring</h3>
            <span className="text-xs font-mono text-white/50 block">Week 6</span>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Supervised production cutover, operational dashboard setup, telemetry alerting configuration, and staff training documentation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. Regional Cloud & Governance Infrastructure ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent space-y-6 text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl md:text-2xl font-serif text-white">Data Governance &amp; Regional Cloud Deployment</h2>
          </div>
          <p className="text-sm md:text-base text-white/75 font-light leading-relaxed">
            Enterprise automation often handles commercially sensitive data including customer records, financial ledgers, and operational contracts. We engineer our automation pipelines with strict compliance safeguards:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <h3 className="text-xs font-mono uppercase text-emerald-400">UAE PDPL Alignment</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                AI architecture designed around UAE PDPL-aligned data handling, access controls, vendor assessment, cross-border data considerations, and client-specific residency requirements.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <h3 className="text-xs font-mono uppercase text-emerald-400">Regional Cloud Options</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Regional cloud and private deployment options where appropriate to the client&apos;s governance and infrastructure requirements.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <h3 className="text-xs font-mono uppercase text-emerald-400">Zero Foundational Training</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Contractually enforced enterprise API configurations guaranteeing client business payloads are never retained to train public foundational LLMs.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <h3 className="text-xs font-mono uppercase text-emerald-400">Least-Privilege API Scopes</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Granular, read-scoped, or stage-bounded authentication tokens ensuring automation processes never possess unnecessary administrative access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Why Work With Asif Digital ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Partnership Value</span>
          <h2 className="text-2xl md:text-4xl font-serif">Why Dubai Enterprises Choose Asif Digital</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            We combine high-level operational consulting with hands-on systems engineering:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="text-base font-medium text-white">Local UAE Engineering Presence</h3>
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed pl-8">
              Direct access to our senior engineering team in Dubai. We work alongside your IT and operational leaders to map workflows accurately.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="text-base font-medium text-white">Engineered For Production Reliability</h3>
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed pl-8">
              No fragile single-step hacks. Every workflow is designed with queue persistence, schema-level validation, and automated failover alerting.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="text-base font-medium text-white">Supervised Human Oversight</h3>
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed pl-8">
              We build architectures that empower your staff rather than replacing critical human judgment. High-risk actions require authorized sign-off.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="text-base font-medium text-white">Zero Vendor Lock-In</h3>
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed pl-8">
              All custom integration logic, API schemas, and deployment pipelines belong 100% to your organization, with full technical handover documentation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 10. Frequently Asked Questions (Accordion) ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Got Questions?</span>
          <h2 className="text-2xl md:text-4xl font-serif">Frequently Asked Questions</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Direct answers on our AI automation agency services, technical integrations, and operational delivery:
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition"
              >
                <span className="text-sm md:text-base font-medium text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs md:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. Final CTA Section ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-white/10">
        <div className="p-8 md:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-transparent space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Begin Your Automation Discovery</span>
          <h2 className="text-2xl md:text-4xl font-serif text-white">Ready to Eliminate Manual Operational Friction?</h2>
          <p className="text-sm md:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Book a workflow architecture audit with our Dubai engineering team. We will review your current systems, map manual bottlenecks, and provide an actionable integration blueprint.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition shadow-lg shadow-white/10 text-sm"
            >
              <span>Book Workflow Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 transition text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us (+971 54 586 6094)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
