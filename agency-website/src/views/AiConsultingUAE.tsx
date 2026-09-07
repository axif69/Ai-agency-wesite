"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { 
  ArrowRight, Shield, Zap, Database, Cpu, Lock, 
  BarChart3, CheckCircle2, Bot, Layers, 
  HelpCircle, Sparkles, Scale, Server, FileText, 
  Sliders, ArrowUpRight, Check, X, Building, Users,
  Workflow, ChevronRight
} from "lucide-react";

export default function AiConsultingUAE() {
  const teamSizeId = useId();
  const manualHoursId = useId();
  const functionFocusId = useId();

  // Interactive AI Readiness & Business Case Estimator State
  const [teamSize, setTeamSize] = useState<number>(25);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(8);
  const [functionFocus, setFunctionFocus] = useState<string>("operations");

  // Dynamic calculations for illustrative business case
  const hourlyRateAED = 85; // conservative blended labor cost in UAE
  const annualWorkWeeks = 48;
  const totalAnnualManualHours = teamSize * manualHoursPerWeek * annualWorkWeeks;
  
  // Potential addressable efficiency range (30% to 55% typical in automated enterprise workflows)
  const addressableHoursMin = Math.round(totalAnnualManualHours * 0.30);
  const addressableHoursMax = Math.round(totalAnnualManualHours * 0.55);
  
  const laborValueMinAED = Math.round(addressableHoursMin * hourlyRateAED);
  const laborValueMaxAED = Math.round(addressableHoursMax * hourlyRateAED);

  const getComplexity = () => {
    if (teamSize > 100 || functionFocus === "enterprise") return { label: "Enterprise Phased", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" };
    if (teamSize > 30 || functionFocus === "operations") return { label: "Moderate Multi-System", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" };
    return { label: "Focused Streamlined", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" };
  };

  const complexity = getComplexity();

  // Structured Data Schemas
  const breadcrumbSchema = {
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
        "name": "Services",
        "item": "https://www.asifdigital.agency/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AI Consulting UAE",
        "item": "https://www.asifdigital.agency/ai-consulting-uae"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Asif Digital - Enterprise AI Consulting UAE",
    "url": "https://www.asifdigital.agency/ai-consulting-uae",
    "serviceType": "Enterprise AI Strategy, Readiness & Implementation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital Agency",
      "url": "https://www.asifdigital.agency",
      "telephone": "+971545866094",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Enterprise AI consulting in Dubai and the UAE. We deliver AI readiness audits, workflow mapping, vendor evaluation, build-vs-buy analysis, and implementation roadmaps."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does an enterprise AI readiness assessment examine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI readiness assessment evaluates your organization's data hygiene, existing software API accessibility, internal process bottlenecks, access control protocols, and infrastructure scalability to identify where AI will produce verifiable operational ROI."
        }
      },
      {
        "@type": "Question",
        "name": "How do you help organizations navigate the Build vs. Buy decision for AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We conduct an objective Total Cost of Ownership (TCO) analysis comparing commercial API ecosystems (such as OpenAI or Anthropic) against private open-weights deployments (such as Llama or Mistral on sovereign cloud). We assess software licensing, infrastructure latency, token economics, and custom fine-tuning requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How does your advisory address UAE PDPL data protection and privacy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our technical architectures are designed around UAE PDPL-aligned data handling, access controls, vendor assessment, cross-border data considerations, and client-specific residency requirements. We help clients evaluate VPC boundaries, pseudonymization layers, and local hosting options. This is a technical governance assessment, not legal certification."
        }
      },
      {
        "@type": "Question",
        "name": "What is the primary difference between strategy-first advisory and implementation-led AI consulting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional strategy-first advisory typically ends with slide decks and high-level recommendations. Implementation-led AI consulting delivers concrete architecture blueprints, vendor evaluations, and optional working proof-of-concept prototypes to test key workflows before wider implementation."
        }
      },
      {
        "@type": "Question",
        "name": "What typical timelines apply to an enterprise AI consulting engagement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typical timing depends on systems, data access, security review and integration complexity. Discovery and readiness assessments usually span 1 to 2 weeks, architecture and vendor evaluation takes 1 to 2 weeks, followed by proof-of-concept sandboxes and staged rollout phases."
        }
      },
      {
        "@type": "Question",
        "name": "Do you assist internal engineering and IT teams during the handoff?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We operate as an extension of your technical leadership. We deliver thorough system architecture documentation, API schemas, deployment runbooks, and staff enablement sessions to ensure your internal developers maintain full operational autonomy."
        }
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      {/* Structured Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. Hero Section ── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-white/[0.015] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
              Enterprise AI Strategy &amp; Execution
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] mb-8">
            Enterprise AI Consulting &amp; Implementation Strategy in the UAE
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Cut through the hype. We help UAE organizations identify where AI and automation could reduce repetitive work, improve response times or simplify internal processes, compare software vendors and build-vs-buy options using transparent technical and commercial criteria, and design secure implementation roadmaps before committing capital.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Schedule Strategy Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#framework"
              className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/15 text-white/80 font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-all text-center"
            >
              Explore Framework
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40 font-mono">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Vendor-Neutral Architecture
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Technical Governance Assessment
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Optional PoC Scoping
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Direct Answer / AEO Definition ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-4">
            Direct Commercial Overview
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
            What Does Implementation-Led AI Consulting Deliver in the UAE?
          </h2>
          <div className="space-y-4 text-base md:text-lg text-white/75 font-light leading-relaxed mb-8">
            <p>
              In the UAE’s enterprise environment, AI advisory should bridge the gap between executive strategy and everyday operational reality. Rather than theoretical slide decks, implementation-led consulting audits existing workflows, evaluates vendor models for real-world viability, and designs clear execution roadmaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Workflow &amp; Bottleneck Assessment
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Detailed mapping of manual handoffs, repetitive documentation, and operational delays to pinpoint high-potential areas for automation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Business Case &amp; Opportunity Prioritization
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                A prioritized assessment based on expected effort, operational value, implementation complexity and measurable business impact.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Build vs. Buy Evaluation
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Objective analysis comparing existing SaaS solutions against custom API integrations and private open-weights deployments.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Data Handling &amp; Governance Assessment
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Map data flows, access requirements, vendor handling practices, cross-border considerations and client-specific residency requirements with UAE PDPL-aligned principles. This is a technical governance assessment, not legal certification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Optional Proof of Concept (PoC)
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Where useful, a limited prototype can be scoped to test a high-priority workflow before wider implementation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Implementation Roadmap &amp; Vendor Scoping
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Clear system architecture specifications, integration timelines, and technical runbooks ready for internal developers or scoped partners.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-white/60 font-mono">
            <strong className="text-white/80">Scope Boundary:</strong> Consulting can cover workflow assessment, vendor evaluation, architecture and implementation planning. A PoC or production build is included only where specifically scoped.
          </div>
        </div>
      </section>

      {/* ── 3. The 4-Pillar Consulting Framework ── */}
      <section id="framework" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
            Structured Execution Blueprint
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            The 4-Pillar AI Advisory Framework
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            Our consulting methodology progresses methodically through four core phases to eliminate technical debt and ensure sustainable organizational adoption.
          </p>
          <div className="mt-4 inline-block p-3 px-5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/50 font-mono">
            Note: Typical timing depends on systems, data access, security review and integration complexity.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "Phase 01",
              title: "Readiness & Opportunity Assessment",
              icon: <Database className="w-6 h-6 text-emerald-400" />,
              points: [
                "Data quality, schema & vectorization audit",
                "API accessibility of legacy ERP & CRM stacks",
                "Process bottleneck and labor-hour mapping",
                "High-impact opportunity prioritization matrix",
                "Baseline KPI and ROI measurement plan"
              ]
            },
            {
              step: "Phase 02",
              title: "Architecture & Vendor Evaluation",
              icon: <Layers className="w-6 h-6 text-blue-400" />,
              points: [
                "Build-vs-buy model & platform analysis",
                "Proprietary APIs vs. private open-weights evaluation",
                "Infrastructure Total Cost of Ownership (TCO)",
                "UAE PDPL-aligned data flow design",
                "Latency, throughput & rate-limit modeling"
              ]
            },
            {
              step: "Phase 03",
              title: "Optional Proof of Concept (PoC)",
              icon: <Cpu className="w-6 h-6 text-purple-400" />,
              points: [
                "Where useful, a limited prototype is scoped",
                "Controlled sandbox testing on a priority workflow",
                "Prompt engineering & context window optimization",
                "Model latency & accuracy benchmarking",
                "Executive & technical stakeholder review"
              ]
            },
            {
              step: "Phase 04",
              title: "Implementation Roadmap & Adoption Guidance",
              icon: <Workflow className="w-6 h-6 text-amber-400" />,
              points: [
                "System architecture blueprints & API schemas",
                "Technical documentation and developer runbooks",
                "Employee workflow enablement & prompt guidelines",
                "Clear boundary handoff to internal IT or scoped engineering",
                "Ongoing governance & technical review checkpoints"
              ]
            }
          ].map((pillar, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-black border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/30">
                    {pillar.step}
                  </span>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                    {pillar.icon}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-white mb-4">{pillar.title}</h3>
                <ul className="space-y-3 mb-6">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 font-light leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Comparison Matrix: Traditional Advisory vs Implementation-Led ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
            Objective Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Traditional Strategy-First Advisory vs. Implementation-Led AI Consulting
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            Understand how technical execution advisory differs from theoretical management consulting when deploying AI into production.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-white/40">Capability</th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-white/40">Traditional Strategy-First Advisory</th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/20 rounded-t-xl">Implementation-Led AI Consulting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {[
                {
                  metric: "Deliverables",
                  trad: "High-level slide decks and conceptual frameworks",
                  impl: "System architecture blueprints, API specifications & optional prototype validation"
                },
                {
                  metric: "Technical Validation",
                  trad: "Theoretical estimates based on vendor marketing collateral",
                  impl: "Hands-on latency benchmarking, token cost modeling & sandbox testing"
                },
                {
                  metric: "PoC Involvement",
                  trad: "Delegated to third-party subcontractors or left to internal teams",
                  impl: "Where scoped, directly designed and tested in a controlled sandbox before wide deployment"
                },
                {
                  metric: "Vendor Neutrality",
                  trad: "Often constrained by enterprise cloud reseller partnerships",
                  impl: "Independent evaluation across open-source weights, commercial APIs & private hosting"
                },
                {
                  metric: "Engineering Handoff",
                  trad: "Advisory ends at report handoff; internal teams struggle with implementation",
                  impl: "Developer-to-developer code walkthroughs, API schemas & deployment runbooks"
                },
                {
                  metric: "ROI Measurement",
                  trad: "Vague enterprise efficiency ratios based on global case studies",
                  impl: "Prioritized assessment of operational effort, task duration, and business impact"
                },
                {
                  metric: "Deployment Support",
                  trad: "No integration architecture or technical runbooks",
                  impl: "Detailed technical runbooks and architecture handoff; full production build scoped as needed"
                }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.01]">
                  <td className="py-5 px-6 font-semibold text-white font-serif">{row.metric}</td>
                  <td className="py-5 px-6 text-white/60 font-light">{row.trad}</td>
                  <td className="py-5 px-6 text-white/90 font-light bg-emerald-950/10 border-l border-r border-emerald-500/10">
                    <span className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {row.impl}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. UAE Regulatory, Security & Data Handling Architecture ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-6">
              <Shield className="w-3.5 h-3.5" /> Technical Governance Assessment
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Enterprise Governance &amp; Data Residency
            </h2>
            <div className="space-y-4 text-white/70 font-light text-base leading-relaxed mb-8">
              <p>
                Our engagements deliver an <strong>AI architecture designed around UAE PDPL-aligned data handling, access controls, vendor assessment, cross-border data considerations, and client-specific residency requirements.</strong>
              </p>
              <p>
                We map data flows, access requirements, vendor handling practices, and cross-border considerations. This is a technical governance assessment, not legal certification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <Lock className="w-5 h-5 text-white/80 mb-2" />
                <h4 className="text-sm font-semibold text-white mb-1">Access &amp; Pseudonymization</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Strict Role-Based Access Controls (RBAC) and prompt data scrubbing before model ingestion.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <Server className="w-5 h-5 text-white/80 mb-2" />
                <h4 className="text-sm font-semibold text-white mb-1">Residency Options</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Evaluation of UAE-based cloud data center regions (Azure UAE Central, AWS UAE, or private VPCs).
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-black border border-white/10 space-y-6">
            <h3 className="text-xl font-serif text-white flex items-center gap-3">
              <Scale className="w-5 h-5 text-emerald-400" />
              Core Governance Assessment Areas
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Vendor Agreement Audits",
                  desc: "Verifying zero-data-retention (ZDR) clauses with API providers so your proprietary data is never used to train public models."
                },
                {
                  title: "Cross-Border Data Review",
                  desc: "Mapping data egress points to ensure cross-border transfers satisfy UAE Federal Decree-Law No. 45 transfer criteria."
                },
                {
                  title: "Model Transparency & Audit Logs",
                  desc: "Implementing centralized logging for every prompt, completion, latency metric, and user interaction for full auditability."
                },
                {
                  title: "Private Open-Weights Fallbacks",
                  desc: "Designing fallback architectures running open-source models inside your own sovereign cloud when external APIs are restricted."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Interactive AI Readiness & Business Case Estimator ── */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/5">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-xs font-mono mb-4">
              <Sliders className="w-3.5 h-3.5" /> Interactive Business Case Model
            </div>
            <h2 className="text-2xl md:text-4xl font-serif mb-4">
              AI Readiness &amp; Business Case Estimator
            </h2>
            <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
              Explore the potential operational impact of structured workflow automation on your team's routine manual tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <label htmlFor={teamSizeId} className="text-white/60">Knowledge Workers / Operations Staff</label>
                  <span className="text-emerald-400 font-bold">{teamSize} team members</span>
                </div>
                <input
                  id={teamSizeId}
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                  <span>5 members</span>
                  <span>150+ members</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <label htmlFor={manualHoursId} className="text-white/60">Manual / Repetitive Hours per Worker/Week</label>
                  <span className="text-emerald-400 font-bold">{manualHoursPerWeek} hrs / week</span>
                </div>
                <input
                  id={manualHoursId}
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                  <span>3 hrs (Light tasks)</span>
                  <span>20 hrs (Heavy documentation)</span>
                </div>
              </div>

              <div>
                <label htmlFor={functionFocusId} className="block text-xs font-mono text-white/60 mb-2">Primary Department Focus</label>
                <select
                  id={functionFocusId}
                  value={functionFocus}
                  onChange={(e) => setFunctionFocus(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white/40"
                >
                  <option value="operations">Operations &amp; Customer Support Triage</option>
                  <option value="documentation">Document Processing, Invoicing &amp; Contracts</option>
                  <option value="sales">Sales Qualification &amp; Lead Ingestion</option>
                  <option value="enterprise">Multi-Department Enterprise Rollout</option>
                </select>
              </div>
            </div>

            {/* Calculated Outputs */}
            <div className="p-6 md:p-8 rounded-2xl bg-black border border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                  Addressable Efficiency Range
                </span>
                <div className="text-3xl md:text-4xl font-serif text-white mb-1">
                  {addressableHoursMin.toLocaleString()} – {addressableHoursMax.toLocaleString()}
                  <span className="text-base font-sans font-light text-white/50 ml-2">hrs / year</span>
                </div>
                <p className="text-xs text-white/50 font-light">
                  Estimated manual hours addressable via structured automation and AI workflows.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                  Indicative Annual Labor-Value Range
                </span>
                <div className="text-2xl md:text-3xl font-serif text-emerald-400 mb-1">
                  AED {laborValueMinAED.toLocaleString()} – {laborValueMaxAED.toLocaleString()}
                </div>
                <p className="text-xs text-white/50 font-light">
                  Calculated based on conservative UAE knowledge-worker blended hourly values.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                    Implementation Complexity
                  </span>
                  <span className={`text-sm font-semibold ${complexity.color}`}>
                    {complexity.label}
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
                >
                  Discuss Scoping <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/40 font-light">
              <span className="font-semibold text-white/60">Disclaimer:</span> Illustrative estimate only. Actual savings depend on adoption, process design, data quality and implementation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Contextual Internal Linking (Strategic Ecosystem) ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
            Connected Technical Architecture
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            From Strategy to Production Capabilities
          </h2>
          <p className="text-sm text-white/60 font-light mt-2">
            Strategic consulting pairs directly with our operational engineering practices across the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/workflow-automation-uae"
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Workflow className="w-5 h-5 text-blue-400" />
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Workflow Automation UAE</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Connect legacy CRMs, ERPs, and document ingestion pipelines with resilient, multi-agent event workflows.
              </p>
            </div>
            <span className="text-[11px] font-mono text-blue-400 mt-6 inline-flex items-center gap-1">
              Explore Automation Workflows <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/arabic-ai-hub"
            className="p-6 rounded-2xl bg-white/[0.02] border border-emerald-500/20 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Bot className="w-5 h-5 text-emerald-400" />
                <ArrowUpRight className="w-4 h-4 text-emerald-400/40 group-hover:text-emerald-400 transition-colors" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Arabic &amp; GCC AI Hub</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Modern Standard Arabic and Gulf-dialect NLP pipelines, WhatsApp bots, and bilingual enterprise customer triage.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 mt-6 inline-flex items-center gap-1">
              Explore Arabic NLP Systems <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/hospitality-ai-automation-uae"
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Building className="w-5 h-5 text-purple-400" />
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Hospitality AI Automation</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Specialized operational consulting for UAE luxury hotels, resorts, and multi-unit F&amp;B groups.
              </p>
            </div>
            <span className="text-[11px] font-mono text-purple-400 mt-6 inline-flex items-center gap-1">
              Explore Hospitality AI <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Consulting Pathways to Media & Search */}
        <div className="mt-8 p-6 rounded-2xl bg-black border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold text-white">Looking to connect AI with customer acquisition?</h4>
            <p className="text-xs text-white/50 font-light mt-0.5">
              Consulting engagements often evaluate algorithmic acquisition channels:
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <Link href="/ai-ppc-agency-dubai" className="text-white/80 hover:text-white underline underline-offset-4">
              AI PPC &amp; Paid Media →
            </Link>
            <Link href="/ai-seo-agency-dubai" className="text-white/80 hover:text-white underline underline-offset-4">
              AI SEO &amp; AEO Architecture →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Visible FAQ Section ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Frequently Asked Questions</h2>
          <p className="text-sm text-white/50 font-light">
            Answers to common questions regarding enterprise AI strategy, scoping, and governance in the UAE.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "What does an enterprise AI readiness assessment examine?",
              a: "Our AI readiness assessment evaluates your organization's data hygiene, existing software API accessibility, internal process bottlenecks, access control protocols, and infrastructure scalability to identify where AI will produce verifiable operational ROI."
            },
            {
              q: "How do you help organizations navigate the Build vs. Buy decision for AI?",
              a: "We conduct an objective Total Cost of Ownership (TCO) analysis comparing commercial API ecosystems (such as OpenAI or Anthropic) against private open-weights deployments (such as Llama or Mistral on sovereign cloud). We assess software licensing, infrastructure latency, token economics, and custom fine-tuning requirements."
            },
            {
              q: "How does your advisory address UAE PDPL data protection and privacy?",
              a: "Our technical architectures are designed around UAE PDPL-aligned data handling, access controls, vendor assessment, cross-border data considerations, and client-specific residency requirements. We help clients evaluate VPC boundaries, pseudonymization layers, and local hosting options. This is a technical governance assessment, not legal certification."
            },
            {
              q: "What is the primary difference between strategy-first advisory and implementation-led AI consulting?",
              a: "Traditional strategy-first advisory typically ends with slide decks and high-level recommendations. Implementation-led AI consulting delivers concrete architecture blueprints, vendor evaluations, and optional working proof-of-concept prototypes to test key workflows before wider implementation."
            },
            {
              q: "What typical timelines apply to an enterprise AI consulting engagement?",
              a: "Typical timing depends on systems, data access, security review and integration complexity. Discovery and readiness assessments usually span 1 to 2 weeks, architecture and vendor evaluation takes 1 to 2 weeks, followed by proof-of-concept sandboxes and staged rollout phases."
            },
            {
              q: "Do you assist internal engineering and IT teams during the handoff?",
              a: "Yes. We operate as an extension of your technical leadership. We deliver thorough system architecture documentation, API schemas, deployment runbooks, and staff enablement sessions to ensure your internal developers maintain full operational autonomy."
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-7 rounded-2xl bg-black border border-white/10">
              <h3 className="text-base font-semibold text-white mb-3 flex items-start gap-3">
                <span className="text-emerald-400 font-mono text-sm font-bold">Q.</span>
                {faq.q}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed pl-6 border-l border-white/10">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. CTA Section ── */}
      <section className="py-28 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/10 bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-4 font-semibold">
            Confidential Technical Consultation
          </span>
          <h2 className="text-3xl md:text-6xl font-serif mb-6">
            Architect Your Organization’s AI Strategy
          </h2>
          <p className="text-white/60 font-light text-base md:text-lg mb-10 leading-relaxed">
            Discuss your enterprise systems, data architecture, and workflow requirements with our technical team in Dubai. We evaluate feasibility, infrastructure costs, and ROI before you commit capital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white text-black px-10 py-4.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Book Strategic Discovery Session
            </Link>
            <a
              href="tel:+971545866094"
              className="w-full sm:w-auto px-8 py-4.5 rounded-full border border-white/15 text-white/80 font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-all text-center"
            >
              Direct Line: +971 54 586 6094
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Semantic Cluster Footer Links ── */}
      <section className="py-12 border-t border-white/5 bg-black text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Enterprise Advisory &amp; Technical Solutions
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/ai-consulting-uae" className="hover:text-white transition-colors text-white font-medium underline underline-offset-4">
              AI Consulting UAE
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">
              Workflow Automation UAE
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/arabic-ai-hub" className="hover:text-white transition-colors text-emerald-400">
              Arabic AI Hub (Bilingual AI)
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/hospitality-ai-automation-uae" className="hover:text-white transition-colors">
              Hospitality AI Automation
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-ppc-agency-dubai" className="hover:text-white transition-colors">
              AI PPC Agency Dubai
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-seo-agency-dubai" className="hover:text-white transition-colors">
              AI SEO Agency Dubai
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
