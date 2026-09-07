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
      q: "What is the practical difference between a basic chatbot and an AI agent?",
      a: "A basic chatbot only answers questions using pre-written answers or generic text. An AI agent has the ability to take bounded actions across your business software: querying your CRM, looking up inventory in your ERP, preparing email or proposal drafts, and alerting your team for final approval before anything is sent."
    },
    {
      q: "Can AI agents connect directly to our existing CRM or ERP software?",
      a: "Yes, provided your software provides secure APIs or database access. We build connectors for common platforms including HubSpot, Salesforce, Zoho, Microsoft Dynamics, SAP, and custom PostgreSQL/SQL databases. High-risk actions like financial transactions always require human sign-off."
    },
    {
      q: "How do you ensure an AI agent doesn't make mistakes or take unauthorized actions?",
      a: "Every agent is built with strict operational boundaries: read-only access where appropriate, input validation to prevent manipulation, and mandatory human approval checkpoints for sensitive tasks (such as sending formal quotes or modifying customer records). The agent prepares the work; your team retains final approval."
    },
    {
      q: "When should a business use a single agent versus a multi-agent system?",
      a: "A single agent is best for focused, linear tasks such as customer enquiry intake or reading invoices. A multi-agent system is recommended when a workflow has distinct stages that require separated security permissions—for example, one agent conducts research with read-only access, another drafts proposals, and a third checks the output against defined business rules before human review."
    },
    {
      q: "How is company data protected during AI agent workflows?",
      a: "We design agent workflows with strict data privacy controls. Client credentials never live in model prompts, model training on customer data is disabled via enterprise API agreements, and deployment can be designed around UAE data-residency, private-cloud and governance requirements depending on the organization's infrastructure and compliance needs."
    },
    {
      q: "What does a typical deployment timeline look like?",
      a: "A standard deployment follows a structured 4-week framework: Week 1 focuses on workflow mapping and security scoping; Week 2 on API tool schemas and sandboxed testing; Week 3 on CRM/ERP integration and approval checkpoints; and Week 4 on supervised pilot rollout and staff training."
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

      {/* ── Hero Section (80% Business Language / 20% Credibility) ── */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/[0.03] rounded-full blur-[160px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 font-semibold">
              AI AGENTS FOR UAE BUSINESSES
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.08] mb-8">
            Custom AI Agents &amp; <br className="hidden sm:inline" />
            <span className="text-white/70 italic font-light">Multi-Agent Systems in Dubai.</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Build custom AI agents that handle repetitive business tasks—qualifying incoming enquiries, checking information, preparing drafts, updating your CRM, and sending work to your team for approval.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Discuss Your Automation Use Case
            </Link>
            <a 
              href="#workflows" 
              className="w-full sm:w-auto border border-white/20 text-white/90 hover:text-white hover:border-white/50 px-8 py-5 rounded-full font-medium uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 bg-white/[0.02]"
            >
              Explore Example Workflows <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/60 text-xs font-sans">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Your Team Retains Final Approval</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Connects With Your Existing CRM &amp; Tools</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Deployment Options for Data-Residency &amp; Security Requirements</span>
          </div>
        </motion.div>
      </section>

      {/* ── Direct Answer / Executive Definition Block ── */}
      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold block mb-1">
                BUSINESS EXPLANATION
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">
                What is an AI Agent? (In Plain Business Terms)
              </h2>
            </div>
          </div>
          <div className="text-[16px] md:text-[17px] text-white/80 leading-relaxed font-light pl-0 md:pl-14 space-y-3">
            <p>
              A standard chatbot only answers customer questions using pre-written text. An <strong>AI Agent</strong> can actually take action across your business tools.
            </p>
            <p>
              For example, when a prospective client submits an enquiry, an agent can check availability in your scheduling system, look up inventory or pricing in your database, draft a personalized proposal, and notify your sales manager on WhatsApp for final sign-off.
            </p>
            <p className="text-white/60 text-sm">
              It acts like a digital team member handling the tedious research and preparation before a human makes the decision.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section: Example AI Agent Workflows ── */}
      <section id="workflows" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
            PRACTICAL AUTOMATION SCENARIOS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Example AI Agent Workflows.
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light">
            Illustrative scenarios showing how custom AI agents handle repeatable operational tasks for UAE teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-10 border border-white/10 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Sales &amp; Inquiry Triage Agent
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
              Reads incoming WhatsApp and web enquiries, confirms budget and requirements, logs contact records in your CRM (HubSpot, Salesforce, or Zoho), and alerts the right sales specialist with a ready briefing.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>Business Benefit:</span>
              <span className="text-white/60">Zero dropped leads, instant initial reply, clean CRM records</span>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-white/10 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Document &amp; Invoice Assistant
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
              Reads incoming supplier invoices or contracts, matches extracted invoice details against purchase-order records and routes exceptions for staff review.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>Business Benefit:</span>
              <span className="text-white/60">Hours of manual data entry saved; human staff approves payments</span>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-white/10 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Customer Operations Agent
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
              Answers multi-step client questions by looking up live order or inventory status, scheduling appointments, and preparing support tickets with full context for senior agents.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>Business Benefit:</span>
              <span className="text-white/60">Fast resolution for common requests; complex cases escalated</span>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-white/10 bg-black rounded-3xl hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
              Research &amp; Briefing Agent
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
              Compiles market pricing, competitor updates, or regulatory notices into concise executive briefings for senior leadership before major decisions or client meetings.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>Business Benefit:</span>
              <span className="text-white/60">Saves senior staff research hours; grounded in verified sources</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Single Agent vs. Multi-Agent Systems ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
            PRACTICAL SELECTION CRITERIA
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Single AI Agent vs. Multi-Agent Systems: Which Does Your Business Need?
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light">
            We do not overcomplicate systems. We choose the simplest architecture that gets the job done reliably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-8 md:p-10 border border-white/10 bg-black rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/80 font-mono text-sm font-bold">1</div>
              <h3 className="text-xl font-serif font-semibold text-white">When a Single Agent is Sufficient</h3>
            </div>
            <p className="text-xs text-white/50 font-light mb-6">
              Best for focused, linear workflows with clear scope and low coordination overhead.
            </p>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Linear, bounded tasks:</strong> A single process with defined steps (e.g. customer intake or parsing standard invoices).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Few software connections:</strong> Operates across 1 to 3 tools without complex inter-departmental handoffs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Unified security permissions:</strong> All required actions fall under a single user role or credential.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Faster deployment:</strong> Simple to test, monitor, and maintain with fast implementation times.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 md:p-10 border border-blue-500/20 bg-blue-500/[0.02] rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono text-sm font-bold">M</div>
              <h3 className="text-xl font-serif font-semibold text-white">When Multi-Agent Orchestration is Justified</h3>
            </div>
            <p className="text-xs text-white/50 font-light mb-6">
              Recommended when complex workflows require separated responsibilities and different security credentials.
            </p>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Separated security roles:</strong> A researcher agent operates with read-only access, while another prepares draft records with audit checkpoints.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Multi-stage pipelines:</strong> Complex workflows structured as Research → Synthesis → a third checks the output against defined business rules before human review.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Modular maintenance:</strong> Updates to one sub-agent prompt or tool do not break the rest of the operational flow.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Clear governance:</strong> Full visibility into which agent drafted which piece of information before final approval.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-white/50 font-mono">
          Pragmatic Principle: Start with a single bounded agent; only introduce multi-agent orchestration when workflow complexity or security boundaries strictly require it.
        </div>
      </section>

      {/* ── Section: For Technical Teams (20% Engineering Depth) ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
              TECHNICAL SPECIFICATION FOR CTOS &amp; ENGINEERING TEAMS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Architecture &amp; Governance Specifications.
            </h2>
            <p className="text-white/60 text-sm md:text-base font-light">
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

      {/* ── Section: Security & Human Approval Gate Progression ── */}
      <section className="py-28 bg-black px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
              HUMAN-IN-THE-LOOP CONTROLS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Tool Permission &amp; Approval Architecture.
            </h2>
            <p className="text-white/60 text-sm font-light">
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

      {/* ── Section: Connected Ecosystem & Data Residency ── */}
      <section className="py-24 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
              CONNECTED ECOSYSTEM &amp; INFRASTRUCTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Enterprise Systems &amp; Data Integration.
            </h2>
            <p className="text-white/60 text-sm font-light">
              Common integrations depend on API availability, permissions, and your organization's existing environment.
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
                Interfacing with SAP, Oracle NetSuite, PostgreSQL, or SQL Server environments for inventory and operational records.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2 font-semibold">MESSAGING CHANNELS</span>
              <h4 className="text-base font-medium text-white mb-2">Omnichannel Touchpoints</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                WhatsApp Business Platform, corporate email (Google Workspace / Microsoft 365), Slack, and Microsoft Teams.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2 font-semibold">DATA RESIDENCY</span>
              <h4 className="text-base font-medium text-white mb-2">Data Residency &amp; Private Deployment Options</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Deployment can be designed around UAE data-residency, private-cloud and governance requirements depending on the organization's infrastructure and compliance needs.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-white/40 italic">
            *Note: Asif Digital constructs tailored API connectors based on client infrastructure and security protocols. Pre-built connectors are deployed subject to client licensing.
          </p>
        </div>
      </section>

      {/* ── Section: Illustrative Scope & Capacity Estimator ── */}
      <section className="py-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
            ILLUSTRATIVE SCOPE ESTIMATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Agentic Scope &amp; Capacity Estimator.
          </h2>
          <p className="text-white/60 text-sm font-light">
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
            *Disclaimer: Illustrative model only. Actual capacity recovery depends on workflow design, API availability, data quality, and exception rates.
          </p>
        </div>
      </section>

      {/* ── Section: Typical 4-Week Deployment Framework ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3 font-semibold">
              EXECUTION TIMELINE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">
              Typical 4-Week Deployment Framework.
            </h2>
            <p className="text-white/60 text-sm font-light">
              A structured engineering methodology for technical scoping, development, and supervised rollout.
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

      {/* ── Section: Frequently Asked Questions ── */}
      <section className="py-28 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
            PRACTICAL CLARIFICATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-white/60 text-sm font-light">
            Clear answers regarding custom AI agents and multi-agent system architecture for UAE companies.
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

      {/* ── Section: Strategic Ecosystem & Related Intelligence ── */}
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
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-4">B2B Outreach</span>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-blue-300 transition-colors">
                Sovereign Sales Agent
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Enterprise command center for B2B target discovery, prospect research, draft outreach, and review queues.
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
                Connect your CRM, ERP, and operational messaging to reduce repetitive manual administrative data entry.
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
                Strategic readiness audits, architecture evaluation, and working automation validation for UAE business leaders.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section: Final Call to Action ── */}
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

      {/* ── Section: Contextual Internal Links Swarm ── */}
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
