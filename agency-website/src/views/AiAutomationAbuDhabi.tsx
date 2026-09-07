"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Shield, Zap, Database, Cpu, Lock, 
  BarChart3, CheckCircle2, Bot, Layers, 
  HelpCircle, Sparkles, Scale, Server, FileText, 
  Sliders, ArrowUpRight, Check, X, Building, Users,
  Workflow, ChevronRight, Landmark, Factory, Plane,
  FileCheck, AlertCircle, Clock, Eye
} from "lucide-react";

export default function AiAutomationAbuDhabi() {
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
        "name": "AI Automation Abu Dhabi",
        "item": "https://www.asifdigital.agency/ai-automation-abu-dhabi"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Asif Digital - Enterprise AI Automation Abu Dhabi",
    "url": "https://www.asifdigital.agency/ai-automation-abu-dhabi",
    "serviceType": "Enterprise AI Automation & Systems Integration",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital Agency",
      "url": "https://www.asifdigital.agency",
      "telephone": "+971545866094",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abu Dhabi",
        "addressRegion": "Abu Dhabi",
        "addressCountry": "AE"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "AdministrativeArea", "name": "Abu Dhabi Global Market (ADGM)" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Enterprise AI automation and systems integration in Abu Dhabi. We engineer ADGM-compliant workflows, energy & industrial process automation, and ERP integrations."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does enterprise AI automation differ for Abu Dhabi organizations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Abu Dhabi organizations operate in institutional, energy, financial, and trade sectors that demand rigorous data governance, bilingual Arabic/English accuracy, integration with enterprise ERPs (such as SAP and Oracle), and explicit human approval checkpoints before downstream actions execute."
        }
      },
      {
        "@type": "Question",
        "name": "Can workflows be deployed inside private VPCs or on-premises environments in Abu Dhabi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Where client-specific compliance or internal IT policies require isolated infrastructure, we architect automation layers to run within dedicated client Virtual Private Clouds (such as Azure UAE Central or AWS UAE) or deploy containerized open-weights models with zero external data egress."
        }
      },
      {
        "@type": "Question",
        "name": "How are human approval checkpoints enforced in automated workflows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every automated workflow is configured with strict threshold triggers. Routine data extraction proceeds automatically, while edge cases, high-value transactions, or compliance flags generate structured review tickets in existing ERP or CRM dashboards requiring manual authorization before execution."
        }
      },
      {
        "@type": "Question",
        "name": "Do you support bilingual Arabic and English document intelligence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our document intelligence pipelines handle dual-language Arabic and English corporate records, legal filings, and trade documentation, normalizing character sets and extracting structured entities with high fidelity."
        }
      },
      {
        "@type": "Question",
        "name": "What timeline should an Abu Dhabi enterprise expect for an automation rollout?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typical timelines depend on systems, data access, security review and integration complexity. Discovery and architecture mapping typically take 2 to 3 weeks, followed by a 3 to 4 week pilot phase before staged production integration."
        }
      },
      {
        "@type": "Question",
        "name": "How are consulting and automation implementation fees determined?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fees are structured based on scope variables: the number of systems integrated, data throughput volumes, custom document parsing models, and infrastructure hosting requirements. We define clear pilot milestones before scaling to full enterprise rollouts."
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
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
              Institutional &amp; Enterprise Systems Architecture
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] mb-8">
            Enterprise AI Automation &amp; Systems Integration in Abu Dhabi
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Engineering resilient, audit-compliant AI workflows for Abu Dhabi’s financial institutions, energy operators, trade authorities, and enterprises. We integrate modern machine intelligence directly with your core ERP and CRM databases under strict human governance.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Initiate Enterprise Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#workflows"
              className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/15 text-white/80 font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-all text-center"
            >
              View Production Workflows
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40 font-mono">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-400" /> ADGM &amp; Institutional Governance
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-400" /> Dedicated VPC &amp; Isolated Hosting
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-400" /> Mandatory Human-in-the-Loop Signoff
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Direct Answer / AEO Definition ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-4">
            System Overview &amp; Regional Context
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
            What Defines Enterprise AI Automation in Abu Dhabi?
          </h2>
          <div className="space-y-4 text-base md:text-lg text-white/75 font-light leading-relaxed">
            <p>
              In Abu Dhabi’s highly structured regulatory and industrial economy, AI automation is not about autonomous generative experimentation. It is about systems integration: binding legacy enterprise record stores (SAP, Oracle, Microsoft Dynamics 365) to specialized machine intelligence layers that extract, validate, and route operational data with verifiable accuracy.
            </p>
            <p>
              Our systems prioritize deterministic business logic, strict role-based access control (RBAC), bilingual Arabic and English document extraction, and controlled cloud environments (such as UAE-based Azure or AWS regions or isolated VPCs). Critical business operations always retain explicit human oversight checkpoints prior to final database commitment.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Production Workflows (Input -> Automation -> System -> Approval) ── */}
      <section id="workflows" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
            Grounded Technical Blueprints
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Enterprise Automation Workflows
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            Every production workflow we design follows a structured four-stage architecture ensuring data integrity, traceability, and human control.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              sector: "Financial Services & ADGM",
              title: "Investor Onboarding & Compliance Extraction",
              icon: <Landmark className="w-6 h-6 text-emerald-400" />,
              input: "Multipage corporate registry filings, passport scans, UBO declarations & proof of address (PDF / scanned images).",
              layer: "Bilingual OCR extraction, entity resolution, sanctions list cross-referencing & risk scoring matrix.",
              system: "Core banking CRM, compliance audit repository & internal deal room pipeline.",
              approval: "Senior Compliance Officer reviews flagged discrepancies and executes 1-click verification before account provisioning."
            },
            {
              sector: "Energy, Utilities & Industrial Operations",
              title: "Field Incident & Telemetry Anomaly Triage",
              icon: <Factory className="w-6 h-6 text-amber-400" />,
              input: "Daily site technician logs, handwritten maintenance reports & SCADA alarm telemetry alerts.",
              layer: "Arabic/English technical text normalization, severity classification & failure pattern clustering.",
              system: "Enterprise Asset Management (SAP PM / IBM Maximo) & preventative maintenance schedules.",
              approval: "Operations Engineering Lead authorizes parts procurement and technician dispatch directly from mobile briefing."
            },
            {
              sector: "Trade, Logistics & Aviation",
              title: "Customs Declarations & Bill of Lading Processing",
              icon: <Plane className="w-6 h-6 text-blue-400" />,
              input: "Inbound commercial invoices, multilingual packing lists, certificates of origin & carrier airway bills.",
              layer: "Line-item extraction, automated Harmonized System (HS) tariff code prediction & currency conversion.",
              system: "Customs brokerage portal, freight ERP & warehouse inventory management system.",
              approval: "Licensed Customs Broker validates duty calculations and signs off on export/import filing submission."
            },
            {
              sector: "Corporate & Enterprise Procurement",
              title: "Vendor RFQ & Tender Matrix Evaluation",
              icon: <FileCheck className="w-6 h-6 text-purple-400" />,
              input: "Unstructured supplier bids, technical compliance matrices & multi-currency commercial pricing sheets.",
              layer: "Specification gap analysis, cost-per-unit normalization & contractual deviation flagging.",
              system: "Procurement ERP (SAP Ariba / Oracle Cloud Procurement) & vendor master records.",
              approval: "Procurement Committee receives comparative executive scorecard with audit trail before contract award."
            },
            {
              sector: "Institutional Citizen & Vendor Relations",
              title: "Bilingual Enterprise Inquiry Triage & Routing",
              icon: <Users className="w-6 h-6 text-cyan-400" />,
              input: "High-volume correspondence via secure web portals, corporate email & verified WhatsApp Business API.",
              layer: "Dialect-aware Arabic (Khaleeji / Modern Standard) & English intent parsing, entitlement verification.",
              system: "Enterprise CRM (Microsoft Dynamics 365 / Salesforce) & department service queue.",
              approval: "Department Case Specialist reviews synthesized response draft and context summary before client transmission."
            }
          ].map((wf, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 rounded-3xl bg-black border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                    {wf.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                      {wf.sector}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-white">{wf.title}</h3>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-[11px] font-mono text-white/60">
                  <Shield className="w-3.5 h-3.5 text-blue-400" /> Audit Logged
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block mb-2 font-semibold">
                      01. Input Source
                    </span>
                    <p className="text-xs text-white/70 font-light leading-relaxed">{wf.input}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-2 font-semibold">
                      02. Automation Layer
                    </span>
                    <p className="text-xs text-white/70 font-light leading-relaxed">{wf.layer}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                      03. Business System
                    </span>
                    <p className="text-xs text-white/70 font-light leading-relaxed">{wf.system}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 block mb-2 font-semibold flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> 04. Human Approval
                    </span>
                    <p className="text-xs text-white/80 font-light leading-relaxed">{wf.approval}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Comparison Table: Manual Operations vs Integrated AI Automation ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
            Systematic Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Manual / Fragmented Operations vs. Integrated AI Automation
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            How architectural automation resolves common administrative friction points across Abu Dhabi enterprises.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-white/40">Operational Dimension</th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-white/40">Manual / Fragmented Operations</th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950/20 rounded-t-xl">Integrated AI Automation Layer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {[
                {
                  metric: "Ingestion & Extraction Speed",
                  trad: "Manual data entry taking 24–72 hours across email inboxes and paper documents.",
                  impl: "Near real-time OCR parsing and schema validation within minutes of receipt."
                },
                {
                  metric: "Cross-System Synchronization",
                  trad: "Employees manually re-keying records between CRMs, ERPs, and spreadsheets.",
                  impl: "Direct bidirectional API event triggers with verified schema reconciliation."
                },
                {
                  metric: "Multilingual Accuracy",
                  trad: "Delays and translation errors when processing mixed Arabic and English documentation.",
                  impl: "Native bilingual models preserving legal and technical nuance across dialects."
                },
                {
                  metric: "Governance & Audit Trails",
                  trad: "Fragmented email threads without centralized logging or version tracking.",
                  impl: "Immutable audit logs capturing every prompt, extraction confidence score, and approval timestamp."
                },
                {
                  metric: "Infrastructure Control",
                  trad: "Shadow AI tool adoption where staff paste proprietary data into public cloud services.",
                  impl: "Controlled private endpoints, client-managed VPCs, and zero-data-retention agreements."
                },
                {
                  metric: "Operational Scalability",
                  trad: "Linear hiring required to manage incremental paperwork and inquiry spikes.",
                  impl: "Handles transaction volume surges without expanding routine clerical overhead."
                }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.01]">
                  <td className="py-5 px-6 font-semibold text-white font-serif">{row.metric}</td>
                  <td className="py-5 px-6 text-white/60 font-light">{row.trad}</td>
                  <td className="py-5 px-6 text-white/90 font-light bg-blue-950/10 border-l border-r border-blue-500/10">
                    <span className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      {row.impl}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Implementation Roadmap (Discovery -> Architecture -> Pilot -> Rollout) ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
            Phased Engineering Deployment
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Abu Dhabi Enterprise Implementation Roadmap
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            A risk-managed engineering process designed to secure stakeholder confidence before committing production systems.
          </p>
          <div className="mt-4 inline-block p-3 px-5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/50 font-mono">
            Note: Typical timing depends on systems, data access, security review and integration complexity.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "Stage 01",
              title: "Discovery & Technical Audit",
              desc: "Deep-dive mapping of existing software architecture, database access boundaries, API availability, and compliance requirements.",
              items: ["Process workflow time-audit", "API authentication inventory", "Data residency assessment", "Security scope definition"]
            },
            {
              step: "Stage 02",
              title: "Architecture & Security Review",
              desc: "Formulating technical blueprints, schema definitions, private VPC setup, and human-in-the-loop review criteria.",
              items: ["VPC / endpoint isolation design", "Data dictionary & schema mapping", "Threshold alert logic", "IT security stakeholder review"]
            },
            {
              step: "Stage 03",
              title: "Pilot Validation",
              desc: "Deploying a contained prototype processing historical or synthetic data to benchmark accuracy, latency, and operational ease.",
              items: ["Sandbox model integration", "Confidence score calibration", "User interface testing", "Executive validation report"]
            },
            {
              step: "Stage 04",
              title: "Production Rollout & Enablement",
              desc: "Phased cutover to live event streams, CI/CD pipeline integration, monitoring setup, and technical team handoff.",
              items: ["Production API activation", "Centralized observability logging", "Staff enablement sessions", "Post-deployment review"]
            }
          ].map((stage, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-black border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-4 font-semibold">
                  {stage.step}
                </span>
                <h3 className="text-xl font-serif text-white mb-3">{stage.title}</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed mb-6">{stage.desc}</p>
                <ul className="space-y-2.5 pt-4 border-t border-white/5">
                  {stage.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-white/70 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Pricing Variables & Engagement Scoping ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
              Commercial Transparency
            </span>
            <h2 className="text-2xl md:text-4xl font-serif mb-4">
              Engagement Scoping &amp; Pricing Variables
            </h2>
            <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
              Enterprise integrations require tailored scoping rather than arbitrary fixed pricing. Engagements are structured based on verified technical complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-black border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" /> System Integration Scope
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Determined by the number of legacy software platforms connected (e.g. standalone CRM vs. complex bidirectional SAP ERP synchronization).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-400" /> Infrastructure Architecture
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Reflects whether workflows leverage managed enterprise APIs or require dedicated Virtual Private Cloud (VPC) deployment in UAE data centers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" /> Document Intelligence Complexity
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Based on volume and variability: standard digital invoices vs. dense multilingual contracts, technical engineering drawings, or scanned registries.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white">Pilot Validation Before Enterprise Commitment</h4>
              <p className="text-xs text-white/50 font-light mt-1">
                We frequently execute contained, milestone-based proof-of-concept sprints to demonstrate technical feasibility and ROI prior to full deployment.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
            >
              Request Scoping Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Operational Boundaries & Governance Disclaimers ── */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/5">
        <div className="p-8 rounded-2xl bg-black border border-white/10">
          <h3 className="text-base font-serif text-white mb-4 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-400" />
            Operational Boundaries &amp; Governance Statement
          </h3>
          <div className="space-y-3 text-xs text-white/60 font-light leading-relaxed">
            <p>
              • <strong>Human Accountability:</strong> Our AI automation solutions serve to accelerate data ingestion, categorization, and routing. High-stakes legal, financial, and regulatory decisions remain subject to authorized human review and final approval.
            </p>
            <p>
              • <strong>Third-Party Dependencies:</strong> Workflow uptime and latency are dependent on the underlying availability of external API providers and client-hosted infrastructure.
            </p>
            <p>
              • <strong>Data Quality Constraints:</strong> Extraction accuracy depends on the resolution, format consistency, and hygiene of input documentation. We conduct thorough data validation during initial discovery.
            </p>
            <p>
              • <strong>No Unsubstantiated Guarantees:</strong> We do not claim government endorsement, blanket sovereign cloud status, or guaranteed response times. All architectures are engineered to verified engineering specifications.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. Contextual Internal Linking ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
            Regional &amp; Technical Capabilities
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            Connected Engineering Practices
          </h2>
          <p className="text-sm text-white/60 font-light mt-2">
            Explore our specialized advisory and operational practices across the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/ai-consulting-uae"
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Landmark className="w-5 h-5 text-emerald-400" />
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">AI Consulting UAE</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Strategic readiness audits, build-vs-buy evaluations, and UAE PDPL governance roadmaps.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 mt-6 inline-flex items-center gap-1">
              Explore AI Consulting <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

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
              <h3 className="text-lg font-serif text-white mb-2">Arabic Intelligence Hub</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Modern Standard Arabic and Gulf-dialect NLP pipelines, WhatsApp bots, and bilingual customer triage.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 mt-6 inline-flex items-center gap-1">
              Explore Arabic NLP Systems <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── 9. Visible FAQ Section ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Frequently Asked Questions</h2>
          <p className="text-sm text-white/50 font-light">
            Answers to common questions regarding enterprise automation, system integration, and data controls in Abu Dhabi.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "How does enterprise AI automation differ for Abu Dhabi organizations?",
              a: "Abu Dhabi organizations operate in institutional, energy, financial, and trade sectors that demand rigorous data governance, bilingual Arabic/English accuracy, integration with enterprise ERPs (such as SAP and Oracle), and explicit human approval checkpoints before downstream actions execute."
            },
            {
              q: "Can workflows be deployed inside private VPCs or on-premises environments in Abu Dhabi?",
              a: "Yes. Where client-specific compliance or internal IT policies require isolated infrastructure, we architect automation layers to run within dedicated client Virtual Private Clouds (such as Azure UAE Central or AWS UAE) or deploy containerized open-weights models with zero external data egress."
            },
            {
              q: "How are human approval checkpoints enforced in automated workflows?",
              a: "Every automated workflow is configured with strict threshold triggers. Routine data extraction proceeds automatically, while edge cases, high-value transactions, or compliance flags generate structured review tickets in existing ERP or CRM dashboards requiring manual authorization before execution."
            },
            {
              q: "Do you support bilingual Arabic and English document intelligence?",
              a: "Yes. Our document intelligence pipelines handle dual-language Arabic and English corporate records, legal filings, and trade documentation, normalizing character sets and extracting structured entities with high fidelity."
            },
            {
              q: "What timeline should an Abu Dhabi enterprise expect for an automation rollout?",
              a: "Typical timelines depend on systems, data access, security review and integration complexity. Discovery and architecture mapping typically take 2 to 3 weeks, followed by a 3 to 4 week pilot phase before staged production integration."
            },
            {
              q: "How are consulting and automation implementation fees determined?",
              a: "Fees are structured based on scope variables: the number of systems integrated, data throughput volumes, custom document parsing models, and infrastructure hosting requirements. We define clear pilot milestones before scaling to full enterprise rollouts."
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-7 rounded-2xl bg-black border border-white/10">
              <h3 className="text-base font-semibold text-white mb-3 flex items-start gap-3">
                <span className="text-blue-400 font-mono text-sm font-bold">Q.</span>
                {faq.q}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed pl-6 border-l border-white/10">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. CTA Section ── */}
      <section className="py-28 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/10 bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-4 font-semibold">
            Confidential Technical Evaluation
          </span>
          <h2 className="text-3xl md:text-6xl font-serif mb-6">
            Initiate Your Abu Dhabi Systems Audit
          </h2>
          <p className="text-white/60 font-light text-base md:text-lg mb-10 leading-relaxed">
            Consult with our engineering team regarding your enterprise ERP, document processing workflows, and regulatory parameters in Abu Dhabi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white text-black px-10 py-4.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Schedule Systems Consultation
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

      {/* ── 11. Semantic Cluster Footer Links ── */}
      <section className="py-12 border-t border-white/5 bg-black text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Abu Dhabi &amp; UAE Enterprise Systems
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/ai-automation-abu-dhabi" className="hover:text-white transition-colors text-white font-medium underline underline-offset-4">
              AI Automation Abu Dhabi
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-consulting-uae" className="hover:text-white transition-colors">
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
            <Link href="/services/whatsapp-automation-gcc" className="hover:text-white transition-colors">
              WhatsApp Automation GCC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
