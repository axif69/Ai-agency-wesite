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
  Server, FileText, CheckCheck, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function AiAgentsDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Estimator State
  const [connectedSystems, setConnectedSystems] = useState(3);
  const [monthlyTasks, setMonthlyTasks] = useState(800);
  const [avgManualMins, setAvgManualMins] = useState(20);
  const [automatableShare, setAutomatableShare] = useState(60); // %

  const addressableHours = Math.round((monthlyTasks * avgManualMins * (automatableShare / 100)) / 60);

  const getArchitectureTier = () => {
    if (connectedSystems <= 2 && monthlyTasks < 500) return { tier: "Single Bounded Agent", desc: "Linear workflow, few API endpoints, simple approval chain." };
    if (connectedSystems <= 5 && monthlyTasks < 2000) return { tier: "Multi-Agent Workflow", desc: "Separated research, analysis, and draft-execution roles." };
    return { tier: "Enterprise Orchestration", desc: "Complex state graphs, role-based tool permissions, high-throughput retry queues." };
  };

  const archTier = getArchitectureTier();

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the fundamental difference between a standard chatbot and an AI agent?",
      a: "A standard chatbot operates primarily as a conversational interface: it matches user inputs against predefined scripts or generates conversational text responses. An enterprise AI agent possesses agency: it evaluates multi-step objectives, selects and calls external tools and APIs, maintains operational context across multiple sessions, and executes controlled business actions within bounded permission scopes under human-governed approval gates."
    },
    {
      q: "Can AI agents execute actions in our internal software (CRM, ERP, database)?",
      a: "Yes, provided the software exposes secure APIs, webhooks, or database interfaces. Our architectures use type-safe tool calling schemas to query records, draft communications, and trigger system updates. Crucially, high-risk or irreversible mutations (such as financial transactions or bulk data deletions) can be gated behind explicit human review before execution."
    },
    {
      q: "How do you prevent an AI agent from making unauthorized actions or errors in production?",
      a: "Production agent safety requires multiple layers: strict tool permission boundaries (least-privilege API tokens), schema-validated inputs, prompt-injection risk controls, and mandatory human-in-the-loop approval gates for sensitive actions. Furthermore, structured state transitions and defined fallback paths ensure that when an unexpected output or API failure occurs, the system safely halts and escalates to a human operator."
    },
    {
      q: "What is multi-agent orchestration and when is it required?",
      a: "Multi-agent orchestration is a pattern where complex workflows are decomposed across multiple specialized agents rather than relying on a single monolithic prompt. Each agent possesses bounded responsibilities and distinct tool permissions (e.g., one agent performs read-only research, another performs financial analysis, and a third prepares system drafts). Orchestration coordinates their state transitions and data passing."
    },
    {
      q: "How is corporate data secured during AI agent execution?",
      a: "We architect agent solutions with strict data governance aligned with UAE Federal Decree-Law No. 45 (PDPL). Data handling protocols ensure that client credentials never reside in LLM prompts, model training on customer data is disabled via enterprise API agreements, and deployments can be hosted on regional private cloud environments (such as Azure UAE North or AWS Middle East) to satisfy data residency requirements."
    },
    {
      q: "How long does it typically take to deploy a custom AI agent in Dubai?",
      a: "An indicative deployment follows a 4-week execution framework: Week 1 focuses on workflow mapping, state transition design, and security scoping; Week 2 on tool schema engineering and sandboxed prototyping; Week 3 on multi-agent orchestration, CRM/ERP connectivity, and approval gates; and Week 4 on supervised pilot testing, observability configuration, and staff training. Timelines vary based on API readiness."
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
              "name": "Asif Digital - AI Agent Development Dubai",
              "url": "https://www.asifdigital.agency/ai-agents-dubai",
              "description": "Custom AI agent development and multi-agent systems in Dubai. We engineer tool-calling agents, CRM/ERP integrations, document intelligence, and human-in-the-loop workflows.",
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
                "Custom AI Agent Development",
                "Multi-Agent Systems & Orchestration",
                "Tool Calling & API Integrations",
                "Document Intelligence & Review Assistance",
                "Workflow Execution & Approval Gate Systems"
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
                  "name": "AI Agent Development Dubai",
                  "item": "https://www.asifdigital.agency/ai-agents-dubai"
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
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-blue-500/[0.03] rounded-full blur-[160px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 font-semibold">
              ENTERPRISE AGENTIC SYSTEMS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-[1.05] mb-8">
            Custom AI Agents &amp; <br className="hidden sm:inline" />
            <span className="text-white/70 italic font-light">Multi-Agent Systems in Dubai.</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Engineering tool-calling AI agents, multi-agent orchestration, and controlled workflow execution for UAE organizations—grounded in memory architectures, enterprise integrations, and human approval gates.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Request Architecture Consultation
            </Link>
            <Link 
              href="/sovereign-sales-agent" 
              className="w-full sm:w-auto border border-white/20 text-white/90 hover:text-white hover:border-white/50 px-8 py-5 rounded-full font-medium uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 bg-white/[0.02]"
            >
              Explore Sales Agent System <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white/40 text-[11px] uppercase tracking-widest font-mono">
            <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Bounded Tool Permissions</span>
            <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Human Approval Gates</span>
            <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> UAE PDPL-Aligned Data Handling</span>
          </div>
        </motion.div>
      </section>

      {/* ── Direct Answer / Definition Block (Featured Snippet Optimized) ── */}
      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold block mb-1">
                EXECUTIVE SUMMARY &amp; DEFINITION
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">
                What is an Enterprise AI Agent?
              </h2>
            </div>
          </div>
          <p className="text-[16px] md:text-[17px] text-white/80 leading-relaxed font-light pl-0 md:pl-14">
            An <strong>enterprise AI agent</strong> is an autonomous software system powered by large language models that reasons through multi-step objectives, queries external APIs and databases via structured tool calling, maintains contextual state across interactions, and executes controlled business workflows under human-governed approval gates. Unlike static rules-based chatbots or simple question-answering interfaces, production AI agents take bounded operational actions across enterprise environments—such as reconciling ERP records, researching target accounts, drafting customer communications, and triaging support tickets.
          </p>
        </div>
      </section>

      {/* ── Core Section: One AI Agent vs. Multi-Agent System ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
            ARCHITECTURAL SELECTION CRITERIA
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            One AI Agent vs. Multi-Agent System: Which Architecture Do You Need?
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light">
            More agents are not automatically better; architecture should match workflow complexity, permissions, and reliability requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-8 md:p-10 border border-white/10 bg-black rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/80 font-mono text-sm font-bold">1</div>
              <h3 className="text-xl font-serif font-semibold text-white">When a Single Agent is Sufficient</h3>
            </div>
            <p className="text-xs text-white/50 font-light mb-6">
              Best suited for bounded, predictable workflows with focused scope and low coordination overhead.
            </p>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Linear, bounded workflows:</strong> A single process with a clear beginning, middle, and end (e.g., FAQ customer intake or parsing inbound invoices).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Few API endpoints:</strong> Operates against 1 to 3 well-defined tools without competing parameter sets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Unified permission scope:</strong> All required actions fall under a single security credential boundary.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Straightforward evaluation:</strong> Easy to test, benchmark, and monitor without inter-agent latency or state drift.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 md:p-10 border border-blue-500/20 bg-blue-500/[0.02] rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono text-sm font-bold">M</div>
              <h3 className="text-xl font-serif font-semibold text-white">When Multi-Agent Orchestration is Justified</h3>
            </div>
            <p className="text-xs text-white/50 font-light mb-6">
              Required when separation of concerns, tool permissions, or multi-stage reasoning demand specialized workers.
            </p>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Divergent permission boundaries:</strong> A researcher agent only requires read permissions, while a transactional agent requires specific write credentials with audit gates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Multi-stage pipelines:</strong> Complex workflows structured as Research → Synthesis → Risk Analysis → Draft → Approval.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Modular maintainability:</strong> Changes to one sub-agent's prompt or tools do not destabilize the entire system.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Governance &amp; observability:</strong> Clear visibility into which agent produced which intermediate output before human sign-off.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-white/50 font-mono">
          Pragmatic Engineering Principle: Start with a single bounded agent; only introduce multi-agent orchestration when security boundaries or task complexity strictly require it.
        </div>
      </section>

      {/* ── Section 2: The 5 Technical Pillars ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
              TECHNICAL SPECIFICATION
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              The 5 Pillars of Enterprise Agent Architecture.
            </h2>
            <p className="text-white/50 text-sm md:text-base font-light">
              How our engineering team designs robust, predictable agentic systems for enterprise production.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Controlled Workflow Routing & State Transitions",
                desc: "We engineer agent workflows using structured state transitions and graph-based execution. Rather than allowing an LLM to wander unconstrained, tasks are decomposed into discrete states with defined transitions, explicit exit conditions, and controlled routing between specialized sub-components.",
                tags: ["State Graphs", "Controlled Routing", "Task Decomposition"]
              },
              {
                step: "02",
                title: "Type-Safe Tool Calling & Bounded API Execution",
                desc: "Agents interact with internal systems strictly through type-safe JSON schema function definitions. Every parameter is validated before network dispatch. Tool scopes are strictly bounded: an analytics agent cannot trigger database mutations, and an intake agent cannot access financial ledger credentials.",
                tags: ["JSON Schemas", "Parameter Validation", "Bounded Scopes"]
              },
              {
                step: "03",
                title: "Three-Tier Memory & Context Architecture",
                desc: "We implement a clear, three-tier context architecture: 1) Session & conversation state for ephemeral working memory; 2) Persistent structured memory in relational databases for user profiles, historical interaction logs, and transactional states; and 3) Knowledge retrieval using RAG and vector search over approved corporate repositories.",
                tags: ["Session State", "Relational Memory", "Knowledge Retrieval RAG"]
              },
              {
                step: "04",
                title: "Tool Permission Boundaries & Human Approval Architecture",
                desc: "We enforce the core sequence: Read → Analyze → Draft → Human Approval → Execute. Low-risk data reads execute autonomously within defined rate limits, while high-risk operational actions—such as sending formal quotes, modifying CRM master records, or initiating payments—halt for explicit human approval.",
                tags: ["Approval Gates", "RBAC", "Audit Trails"]
              },
              {
                step: "05",
                title: "Observability, Telemetry & Defined Retry Paths",
                desc: "Every agent decision step, tool call, latency figure, and token expenditure is logged through comprehensive tracing infrastructure. If an external API returns a timeout or transient error, the agent utilizes structured exponential backoff and defined fallback paths rather than catastrophic failure.",
                tags: ["Trace Telemetry", "Fallback Paths", "Cost Monitoring"]
              }
            ].map((pillar, idx) => (
              <div key={idx} className="p-8 md:p-10 border border-white/5 bg-black/60 rounded-3xl hover:border-white/15 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-2 flex items-center gap-4">
                    <span className="text-3xl md:text-4xl font-serif text-white/30 font-light">{pillar.step}</span>
                    <div className="h-px flex-1 bg-white/10 lg:hidden" />
                  </div>
                  <div className="lg:col-span-7">
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">{pillar.title}</h3>
                    <p className="text-sm md:text-[15px] text-white/70 leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                  <div className="lg:col-span-3 flex flex-wrap gap-2 lg:justify-end">
                    {pillar.tags.map((tag, tIdx) => (
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

      {/* ── Section 3: Specialized Enterprise Agent Roles ── */}
      <section className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            DOMAIN-SPECIFIC IMPLEMENTATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Specialized Enterprise Agent Roles.
          </h2>
          <p className="text-white/50 text-sm md:text-base font-light">
            Engineered around realistic operational responsibilities across commercial verticals in Dubai and the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-6">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Operations &amp; Logistics Agents
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
              Assist warehouse, supply chain, and fleet operations across JAFZA, KIZAD, and Dubai industrial clusters. Agents query ERP inventory, track shipment milestones via carrier APIs, flag delivery discrepancies, and draft customer status updates.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-blue-400">
              <span>Key Capabilities:</span>
              <span className="text-white/50">ERP query tools, delivery tracking, discrepancy triage</span>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Sales Intelligence &amp; Research Agents
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
              Synthesize public company signals, executive announcements, and industry news into structured dossiers for Account Executives before discovery calls. Agents enrich CRM contact records and draft tailored outreach for human sales review.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-blue-400">
              <span>Key Capabilities:</span>
              <span className="text-white/50">Dossier generation, CRM contact enrichment, draft generation</span>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Customer Support &amp; Tier-2 Triage Agents
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
              Field inbound customer inquiries across WhatsApp, email, and web chat. Agents verify customer identity against CRM records, answer complex policy questions via RAG, open support tickets, and escalate complex issues directly to the appropriate team.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-blue-400">
              <span>Key Capabilities:</span>
              <span className="text-white/50">Identity verification, ticket creation, human escalation</span>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Document Intelligence &amp; Review Agents
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
              Provide policy and document review assistance by extracting key contract clauses, cross-referencing internal operational guidelines, and escalating flagged non-standard terms to internal legal and procurement officers in English and Arabic.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-blue-400">
              <span>Key Capabilities:</span>
              <span className="text-white/50">Clause extraction, guideline cross-referencing, review escalation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Tool Permission & Approval Architecture ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
              SECURITY &amp; CONTROL
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Tool Permission &amp; Approval Architecture.
            </h2>
            <p className="text-white/50 text-sm font-light">
              Protecting corporate assets by establishing strict operational boundaries between automated intelligence and transactional execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-12">
            {[
              { phase: "01. Read", desc: "Agent queries external APIs, documentation, or CRM records using read-only tokens." },
              { phase: "02. Analyze", desc: "Agent evaluates context against prompt objectives and checks business logic constraints." },
              { phase: "03. Draft", desc: "Agent prepares structured action payload (e.g., proposed email, CRM update, or database record)." },
              { phase: "04. Approval", desc: "For actions exceeding risk threshold, agent halts and requests human supervisor sign-off." },
              { phase: "05. Execute", desc: "Upon explicit human authorization, the bounded action executes with complete audit logging." }
            ].map((p, idx) => (
              <div key={idx} className="p-6 border border-white/10 bg-black rounded-2xl relative">
                <div className="text-xs font-mono text-blue-400 font-bold mb-2">{p.phase}</div>
                <p className="text-xs text-white/60 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-white font-medium text-sm">
                <KeyRound className="w-4 h-4 text-blue-400" />
                Least-Privilege API Credentials
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Agents operate with scoped API tokens restricted to specific endpoints, methods, and resource IDs, preventing lateral system access.
              </p>
            </div>

            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-white font-medium text-sm">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
                Prompt-Injection Risk Controls
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Input validation layers and parameter filtering prevent untrusted user inputs from overriding system instructions or manipulating tool arguments.
              </p>
            </div>

            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-white font-medium text-sm">
                <FileCheck className="w-4 h-4 text-blue-400" />
                Complete Audit Telemetry
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Every tool invocation, payload hash, human approval timestamp, and execution status is recorded for compliance and governance review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Comparison Table - Wrapper vs. Production Agent System ── */}
      <section className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            METHODOLOGY COMPARISON
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Simple LLM Wrapper vs. Production Agent System.
          </h2>
          <p className="text-white/50 text-sm font-light">
            Understanding the engineering divide between experimental chatbots and enterprise-grade agentic architectures.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm font-light">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-6">Evaluation Dimension</th>
                <th className="py-4 px-6 text-white/60">Generic LLM Wrapper / Basic Bot</th>
                <th className="py-4 px-6 text-blue-400 bg-blue-500/[0.04] rounded-t-2xl">Asif Digital Enterprise Agent Architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/75">
              <tr>
                <td className="py-5 px-6 font-medium text-white">Execution Model</td>
                <td className="py-5 px-6 text-white/60">Single-prompt text generation; no tool calling or state awareness</td>
                <td className="py-5 px-6 text-white/90 bg-blue-500/[0.04]">Controlled workflow routing with structured state transitions &amp; sub-agent delegation</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Tool &amp; API Permissions</td>
                <td className="py-5 px-6 text-white/60">None or unvalidated raw webhooks prone to injection</td>
                <td className="py-5 px-6 text-white/90 bg-blue-500/[0.04]">Type-safe JSON schemas, parameter validation &amp; bounded least-privilege tokens</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Context &amp; Memory Structure</td>
                <td className="py-5 px-6 text-white/60">Truncated conversational window; forgets data upon session reset</td>
                <td className="py-5 px-6 text-white/90 bg-blue-500/[0.04]">Three-tier architecture: session state, persistent relational memory &amp; RAG search</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Failure Recovery &amp; Retries</td>
                <td className="py-5 px-6 text-white/60">Silent failure or repetitive hallucinations when APIs error</td>
                <td className="py-5 px-6 text-white/90 bg-blue-500/[0.04]">Defined retry/fallback paths, exponential backoff &amp; graceful human escalation</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Governance &amp; Human Gates</td>
                <td className="py-5 px-6 text-white/60">Zero approval mechanisms; unmonitored text dispatches</td>
                <td className="py-5 px-6 text-white/90 bg-blue-500/[0.04]">Enforced Read → Analyze → Draft → Human Approval → Execute progression</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Enterprise Systems Connectivity</td>
                <td className="py-5 px-6 text-white/60">Isolated standalone chat widgets with no back-office ties</td>
                <td className="py-5 px-6 text-white/90 bg-blue-500/[0.04]">Direct bidirectional integration with CRM, ERP, databases &amp; WhatsApp Cloud API</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 6: Enterprise Integrations ── */}
      <section className="py-24 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
              CONNECTED ECOSYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Enterprise Systems &amp; Data Integration.
            </h2>
            <p className="text-white/60 text-sm font-light">
              Common integrations depend on API availability, permissions, and the client's existing environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2 font-semibold">CRM PLATFORMS</span>
              <h4 className="text-base font-medium text-white mb-2">Customer &amp; Pipeline</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Integration with systems such as HubSpot, Salesforce, Zoho CRM, or Microsoft Dynamics via REST and Webhook protocols.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2 font-semibold">ERP &amp; DATABASES</span>
              <h4 className="text-base font-medium text-white mb-2">Back-Office &amp; Data</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Interfacing with SAP, Oracle NetSuite, PostgreSQL, or SQL Server environments for inventory and financial record lookup.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2 font-semibold">MESSAGING CHANNELS</span>
              <h4 className="text-base font-medium text-white mb-2">Omnichannel Touchpoints</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Verified Meta WhatsApp Business Cloud API, corporate email (Exchange / Google Workspace), Slack, and Microsoft Teams.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2 font-semibold">CLOUD HOSTING</span>
              <h4 className="text-base font-medium text-white mb-2">Regional Tenancy</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Deployable on Azure UAE North, AWS Middle East, or isolated private virtual private clouds for regional data handling compliance.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-white/40 italic">
            *Note: Asif Digital constructs tailored API connectors based on client infrastructure and security protocols. Pre-built connectors are deployed subject to client licensing.
          </p>
        </div>
      </section>

      {/* ── Section 7: Illustrative Scope & Efficiency Estimator ── */}
      <section className="py-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
            ILLUSTRATIVE SCOPE ESTIMATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Agentic Scope &amp; Capacity Estimator.
          </h2>
          <p className="text-white/50 text-sm font-light">
            Model addressable manual workload and evaluate likely architectural tier based on workflow parameters.
          </p>
        </div>

        <div className="p-8 md:p-12 border border-white/10 bg-black rounded-[2.5rem] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-white/70 uppercase tracking-wider">Connected Systems / APIs:</span>
                  <span className="text-white font-bold text-sm">{connectedSystems} Systems</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  step="1"
                  value={connectedSystems}
                  onChange={(e) => setConnectedSystems(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-white/70 uppercase tracking-wider">Monthly Task Volume:</span>
                  <span className="text-white font-bold text-sm">{monthlyTasks.toLocaleString()} Tasks</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="4000" 
                  step="100"
                  value={monthlyTasks}
                  onChange={(e) => setMonthlyTasks(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-white/70 uppercase tracking-wider">Avg. Manual Minutes / Task:</span>
                  <span className="text-white font-bold text-sm">{avgManualMins} Minutes</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="5"
                  value={avgManualMins}
                  onChange={(e) => setAvgManualMins(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-white/70 uppercase tracking-wider">Estimated Automatable Share:</span>
                  <span className="text-white font-bold text-sm">{automatableShare}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="85" 
                  step="5"
                  value={automatableShare}
                  onChange={(e) => setAutomatableShare(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400"
                />
              </div>
            </div>

            <div className="lg:col-span-5 p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-center text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2 block">
                ADDRESSABLE WORKLOAD
              </span>
              <div className="text-3xl md:text-5xl font-serif font-bold text-white mb-1">
                ~ {addressableHours} hrs
              </div>
              <span className="text-xs font-mono text-white/50 mb-6">Addressable Manual Hours / Month</span>

              <div className="border-t border-white/10 pt-4 mb-6 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">RECOMMENDED ARCHITECTURE:</span>
                <span className="text-sm font-semibold text-white block">{archTier.tier}</span>
                <p className="text-[11px] text-white/60 font-light mt-1">{archTier.desc}</p>
              </div>
              
              <Link 
                href="/contact" 
                className="bg-white text-black py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all text-center"
              >
                Discuss Workflow Feasibility
              </Link>
            </div>
          </div>

          <p className="text-[11px] text-white/40 italic mt-8 text-center border-t border-white/5 pt-4">
            *Disclaimer: Illustrative model only. Actual efficiency depends on workflow design, API availability, data quality, adoption, and exception rates.
          </p>
        </div>
      </section>

      {/* ── Section 8: Indicative Implementation Roadmap ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
              EXECUTION TIMELINE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Typical 4-Week Deployment Framework.
            </h2>
            <p className="text-white/50 text-sm font-light">
              An indicative 4-week engineering methodology for technical scoping, development, and supervised rollout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-blue-400 font-bold block mb-2">WEEK 01</span>
              <h3 className="text-base font-semibold text-white mb-2">Scoping &amp; States</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Map business workflows, define state transitions, establish tool permission boundaries, and audit API availability.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-blue-400 font-bold block mb-2">WEEK 02</span>
              <h3 className="text-base font-semibold text-white mb-2">Schemas &amp; Tools</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Build type-safe tool schemas, configure private credentials, build RAG knowledge embeddings, and test sandbox logic.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-blue-400 font-bold block mb-2">WEEK 03</span>
              <h3 className="text-base font-semibold text-white mb-2">Orchestration &amp; Gates</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Assemble multi-agent orchestration graphs, wire up human approval checkpoints, and calibrate retry/fallback routines.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-xs font-mono text-blue-400 font-bold block mb-2">WEEK 04</span>
              <h3 className="text-base font-semibold text-white mb-2">Pilot &amp; Telemetry</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Deploy in a supervised staging pilot, monitor token and latency telemetry, train human reviewers, and transition to production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 9: Frequently Asked Questions ── */}
      <section className="py-28 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            TECHNICAL ANSWERS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-white/50 text-sm font-light">
            Clear technical answers regarding custom AI agents and multi-agent system architecture in Dubai.
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
                SYSTEM ECOSYSTEM
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-white">
                Related AI Systems &amp; Automation Infrastructure.
              </h2>
            </div>
            <Link 
              href="/workflow-automation-uae" 
              className="text-xs font-mono uppercase tracking-wider text-blue-400 hover:underline flex items-center gap-2"
            >
              View Operations Automation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/sovereign-sales-agent" 
              className="p-8 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group"
            >
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-4">Autonomous Sales</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-blue-300 transition-colors">
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
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-4">Operations</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-blue-300 transition-colors">
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
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-4">Advisory</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-blue-300 transition-colors">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-4 font-semibold">
            COMMENCE ARCHITECTURAL REVIEW
          </span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Build Controlled, Tool-Executing <br />
            <span className="italic font-light text-white/70">AI Agents in Dubai.</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Schedule a technical consultation with our engineering team to review your workflow state machines, API permissions, and human approval architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
            >
              Book Architecture Session
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto border border-white/20 text-white/80 hover:text-white px-8 py-5 rounded-full font-medium uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 12: Contextual Internal Links Swarm ── */}
      <section className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center text-white/50 text-xs font-mono">
            <Link href="/ai-consulting-uae" className="hover:text-white transition-colors">AI Consulting UAE</Link>
            <span>•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">Workflow Automation UAE</Link>
            <span>•</span>
            <Link href="/sovereign-sales-agent" className="hover:text-white transition-colors">Sovereign Sales Agent</Link>
            <span>•</span>
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span>•</span>
            <Link href="/ai-lead-generation-agency-dubai" className="hover:text-white transition-colors">AI Lead Generation Dubai</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
