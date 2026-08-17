"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, Cpu, Sparkles, Layers, ShieldCheck, 
  CheckCircle2, ArrowRight, Zap, Globe, PhoneCall, 
  HelpCircle, Building2, BarChart3, Clock, Lock, RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function AiServices() {
  // Interactive Enterprise AI Operational Cost Reduction Simulator State
  const [employeeHeadcount, setEmployeeHeadcount] = useState(25);
  const [avgEmployeeMonthlyCost, setAvgEmployeeMonthlyCost] = useState(14000); // AED / month
  const [manualRepetitiveTaskPercent, setManualRepetitiveTaskPercent] = useState(35); // % of time spent on repetitive tasks

  // Calculations
  const currentTotalPayrollMonthly = employeeHeadcount * avgEmployeeMonthlyCost;
  const currentRepetitiveCostMonthly = Math.round(currentTotalPayrollMonthly * (manualRepetitiveTaskPercent / 100));
  const estimatedAutomationEfficiency = 0.75; // AI swarms automate ~75% of repetitive operational tasks
  const monthlyLaborCostSavings = Math.round(currentRepetitiveCostMonthly * estimatedAutomationEfficiency);
  const annualLaborCostSavings = monthlyLaborCostSavings * 12;
  const annualHoursReclaimed = Math.round((employeeHeadcount * 160 * (manualRepetitiveTaskPercent / 100) * estimatedAutomationEfficiency) * 12);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital AI Agents & Automation Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/ai-agents-dubai",
    "telephone": "+971545866094",
    "priceRange": "AED 12,000 - AED 85,000 / setup",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Enterprise Autonomous AI Agents and Multi-Agent Workflow Orchestration in Dubai and Sharjah. Custom on-premise private LLMs, Retrieval-Augmented Generation (RAG), n8n/Make automation pipelines, and human-in-the-loop governance."
  };

  const faqData = [
    {
      q: "What is an Autonomous AI Agent and how does it differ from a standard chatbot?",
      a: "A standard chatbot merely replies to text prompts with pre-scripted answers. An Autonomous AI Agent is an active digital worker equipped with memory, specialized tools, and reasoning capabilities: it can browse the web, parse incoming emails, query internal SQL databases, execute API calls, generate formatted PDF reports, update your CRM, and make multi-step decisions autonomously to accomplish complex business tasks."
    },
    {
      q: "How do Autonomous Multi-Agent Swarms work together in enterprise workflows?",
      a: "In a multi-agent swarm, specialized AI agents collaborate just like a human department. For example, in an insurance or real estate firm: Agent 1 extracts and validates incoming customer documents, Agent 2 checks underwriting criteria against internal databases, Agent 3 cross-references regulatory compliance rules, and Agent 4 drafts personalized client proposals—passing verified data seamlessly between each stage in seconds."
    },
    {
      q: "Where is our confidential company data stored, and are our files used to train public AI models?",
      a: "Never. We enforce strict enterprise data isolation. We deploy private LLM architectures on local UAE cloud servers (AWS UAE, Azure UAE North) or on-premise private hardware. All Retrieval-Augmented Generation (RAG) vector embeddings are encrypted with enterprise AES-256 keys, ensuring 100% compliance with UAE Federal Decree-Law No. 45 on Personal Data Protection."
    },
    {
      q: "Which enterprise software and ERP tools can your AI agents integrate with?",
      a: "Our AI agents integrate with your existing technology stack via secure APIs and Webhooks: Microsoft 365, Google Workspace, SAP, Oracle NetSuite, Odoo, Salesforce, HubSpot, Zoho, Jira, Slack, WhatsApp, and custom PostgreSQL/MySQL databases."
    },
    {
      q: "Do your AI agents support bilingual Gulf Arabic and English reasoning?",
      a: "Yes! We deploy bilingual language models fine-tuned on Khaleeji Arabic cultural context, regional business terminology, and formal Modern Standard Arabic (MSA) alongside polished corporate English."
    },
    {
      q: "How do you ensure AI accuracy and prevent hallucinations in high-stakes decisions?",
      a: "We implement Retrieval-Augmented Generation (RAG) with strict semantic grounding: the AI is constrained to only answer from your verified internal documentation and company policies. If the AI encounters ambiguous data below a 95% confidence threshold, it automatically routes the task to a human supervisor for 1-click verification."
    },
    {
      q: "What business processes in Dubai are best suited for AI agent automation?",
      a: "Ideal processes include: B2B Inbound Lead Qualification & Meeting Booking, Vendor Invoice & VAT Reconciliation, KYC & Customer Document Verification, Customer Support Ticket Resolution, Supply Chain & Customs Documentation Parsing, and Automated Competitor Intelligence Monitoring."
    },
    {
      q: "What is the typical development and deployment timeline for a custom AI agent system?",
      a: "A focused autonomous agent workflow (e.g. automated document processing or WhatsApp sales qualification) typically deploys in 3 to 5 weeks. Complex multi-agent enterprise architectures with deep ERP syncing take 6 to 10 weeks."
    },
    {
      q: "How do human employees interact with and oversee the AI agents?",
      a: "We build intuitive management dashboards where your team can view real-time agent execution logs, review pending approval queues, adjust business rules, and track operational metrics with complete transparency."
    },
    {
      q: "How does deploying AI agents compare to hiring additional full-time operational staff?",
      a: "Hiring operational staff in Dubai involves recruiting costs, visa fees, health insurance, gratuity, and ongoing management overhead. An autonomous AI agent operates 24/7/365 with zero fatigue, handles peak workloads instantaneously, and costs a fraction of an additional employee."
    },
    {
      q: "Do we own the intellectual property and code for the custom AI agents you build?",
      a: "Yes, 100%. All custom prompt architectures, automation workflows, vector database configurations, and deployment code are transferred entirely to your company upon project completion."
    },
    {
      q: "How do we get started with an Enterprise AI Automation consultation?",
      a: "Call our AI engineering desk directly on +971 54 586 6094 or submit your inquiry on our contact page. We will analyze your operational workflows and deliver an interactive feasibility roadmap and ROI model within 24 hours."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Deploy Autonomous AI Agents in a UAE Enterprise",
    "description": "The systematic 5-stage deployment protocol for implementing autonomous AI agents in Dubai.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Operational Bottleneck & Task Discovery",
        "text": "We identify repetitive human workflows, data ingestion points, and measurable efficiency KPIs."
      },
      {
        "@type": "HowToStep",
        "name": "Private LLM & RAG Vector Architecture",
        "text": "We configure private cloud vector databases grounded strictly in your company documentation."
      },
      {
        "@type": "HowToStep",
        "name": "Tool Calling & ERP Connector Development",
        "text": "We equip the AI agent with custom API tools to read/write from your CRM, ERP, and communication channels."
      },
      {
        "@type": "HowToStep",
        "name": "Human-in-the-Loop Threshold Validation",
        "text": "We stress-test 100+ complex decision scenarios to guarantee 99%+ accuracy and calibrate supervisor handoffs."
      },
      {
        "@type": "HowToStep",
        "name": "Production Deployment & 24/7 Monitoring",
        "text": "We roll out autonomous execution with real-time audit logging and continuous performance optimization."
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" /> Enterprise AI Agents &bull; Autonomous Swarms &bull; Dubai & GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Autonomous AI <br />
            <span className="italic text-white/50 font-normal">Agents Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Move beyond simple prompt-and-response chatbots. We engineer custom autonomous AI agents and multi-agent swarms that execute complex operational workflows, parse documents, synchronize with your ERP, and make intelligent decisions 24/7.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Enterprise AI Feasibility Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Performance Metrics Ribbon ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "24/7/365", label: "Autonomous Digital Workers", sub: "Zero Human Fatigue or Delay" },
            { metric: "Zero Training", label: "Private Cloud Data Isolation", sub: "100% UAE PDPL Compliant" },
            { metric: "Bilingual", label: "Khaleeji Arabic & English", sub: "Deep Semantic NLP Grounding" },
            { metric: "100%", label: "Human-in-the-Loop Control", sub: "Granular Supervisor Approvals" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive AI Automation & Savings Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Operational Efficiency Model
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Simulate Your Enterprise Labor Savings With AI Swarms
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Adjust your operational headcount, average employee cost, and estimated percentage of time spent on repetitive tasks to project your annual direct financial savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Operational &amp; Admin Headcount:</span>
                  <span className="text-white font-bold">{employeeHeadcount} employees</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="200" 
                  step="5" 
                  value={employeeHeadcount} 
                  onChange={(e) => setEmployeeHeadcount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Monthly Cost per Employee:</span>
                  <span className="text-white font-bold">AED {avgEmployeeMonthlyCost.toLocaleString()} / mo</span>
                </div>
                <input 
                  type="range" 
                  min="6000" 
                  max="35000" 
                  step="1000" 
                  value={avgEmployeeMonthlyCost} 
                  onChange={(e) => setAvgEmployeeMonthlyCost(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">% Time Spent on Repetitive Workflows:</span>
                  <span className="text-white font-bold">{manualRepetitiveTaskPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="60" 
                  step="5" 
                  value={manualRepetitiveTaskPercent} 
                  onChange={(e) => setManualRepetitiveTaskPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Labor Cost Savings
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  AED {monthlyLaborCostSavings.toLocaleString()} <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Annual Work Hours Reclaimed:</span>
                  <span className="text-white text-sm font-bold">~{annualHoursReclaimed.toLocaleString()} hrs / yr</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Financial Impact:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {annualLaborCostSavings.toLocaleString()} / yr</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Schedule Your AI Architecture Session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Comparison Benchmark ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Technology Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Sovereign AI Agents Outperform Generic Chatbots
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">AI Capability</th>
                <th className="py-4 px-4 text-white/40">Generic ChatGPT Wrapper</th>
                <th className="py-4 px-4 text-white/40">Offshore Freelance Script</th>
                <th className="py-4 px-4 text-white/40">Rigid Legacy RPA</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Autonomous AI Swarms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Tool Calling &amp; Action Execution</td>
                <td className="py-5 px-4 text-red-400">Text replies only</td>
                <td className="py-5 px-4 text-yellow-400">Basic webhook</td>
                <td className="py-5 px-4 text-yellow-400">Breaks on UI changes</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Autonomous Multi-Step API &amp; Database Actions</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Enterprise Data Sovereignty</td>
                <td className="py-5 px-4 text-red-400">Public OpenAI logs</td>
                <td className="py-5 px-4 text-red-400">Unknown shared server</td>
                <td className="py-5 px-4 text-white">On-premise only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% UAE Cloud Isolation + Zero Data Retention</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Semantic RAG Memory</td>
                <td className="py-5 px-4 text-red-400">Frequent hallucinations</td>
                <td className="py-5 px-4 text-red-400">Basic keyword search</td>
                <td className="py-5 px-4 text-red-400">No semantic reasoning</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Strict Hybrid Vector RAG with Document Grounding</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Human-in-the-Loop Control</td>
                <td className="py-5 px-4 text-red-400">Unmonitored bot</td>
                <td className="py-5 px-4 text-red-400">No approval UI</td>
                <td className="py-5 px-4 text-yellow-400">Rigid exception stop</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Confidence Threshold Routing &amp; 1-Click Approval</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Arabic Context</td>
                <td className="py-5 px-4 text-yellow-400">Robotic Modern Arabic</td>
                <td className="py-5 px-4 text-red-400">English only</td>
                <td className="py-5 px-4 text-red-400">English only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Khaleeji Dialects &amp; Arabic OCR Parsing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Enterprise AI Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete AI Agent Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our Autonomous AI Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="w-6 h-6 text-emerald-400" />,
                title: "Autonomous Multi-Agent Swarms",
                desc: "Interconnected AI agents collaborating across departments—extracting data, verifying compliance rules, querying databases, and executing transactions."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Private RAG Vector Embeddings",
                desc: "Semantic document search engines grounded strictly in your proprietary manuals, policies, and contracts with zero public data leakage."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "n8n & Make Workflow Orchestration",
                desc: "High-speed automation pipelines linking your ERP, CRM, communication channels, and internal SQL databases with sub-second execution."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Khaleeji & Arabic NLP Models",
                desc: "Fine-tuned language models fluent in Gulf Arabic dialects, business vernacular, and regional cultural nuance."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Human-in-the-Loop (HITL) Governance",
                desc: "Granular confidence thresholds that automatically route high-value decisions or edge cases to human managers for 1-click approval."
              },
              {
                icon: <Lock className="w-6 h-6 text-emerald-400" />,
                title: "UAE Cloud Data Sovereignty",
                desc: "Deployments in local Dubai and Abu Dhabi cloud data centers (AWS UAE / Azure UAE North) compliant with UAE Federal Data Protection laws."
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                <div className="mb-5">{f.icon}</div>
                <h3 className="text-xl font-serif text-white mb-3">{f.title}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Step-by-Step Delivery Roadmap ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Engineering Protocol
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage AI Agent Deployment Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Workflow Audit", text: "We analyze repetitive operational tasks, API endpoints, data inputs, and success metrics." },
            { step: "02", title: "RAG & Vector Setup", text: "We ingest and embed internal documentation into private, secure vector databases." },
            { step: "03", title: "Agent Tool Calling", text: "We program custom API toolsets allowing agents to query databases and execute ERP tasks." },
            { step: "04", title: "Threshold Validation", text: "We stress-test 100+ complex decision scenarios to guarantee 99%+ accuracy and calibrate handoffs." },
            { step: "05", title: "Live Production", text: "We activate autonomous agent execution with 24/7 telemetry monitoring and human audit controls." }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl font-serif text-emerald-400 mb-4 font-bold">{s.step}</div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions (12 FAQs) ── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Enterprise AI Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE enterprise leaders need to know about autonomous AI agents, security, and integration.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-lg md:text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-300 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-white/40 group-open:rotate-45 group-open:text-emerald-400 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Deploy Autonomous Digital Workers
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Scale Your Operations With AI Agents.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Eliminate operational bottlenecks, automate multi-step decisions, and protect your corporate data. Schedule a private technical consultation with our enterprise AI team in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Request Enterprise AI Blueprint <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
