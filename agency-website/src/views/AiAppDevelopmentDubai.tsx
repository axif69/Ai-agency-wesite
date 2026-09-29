"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cpu, Smartphone, Globe, ShieldCheck, Zap, Database, 
  Layers, Code2, ArrowRight, CheckCircle2, Server, Lock, 
  Sparkles, Terminal, FileText, BarChart3, Building2, 
  Workflow, Check, MessageSquare, ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function AiAppDevelopmentDubai() {
  // Interactive App Architecture Sizer State
  const [appType, setAppType] = useState<"saas" | "mobile" | "internal" | "micro">("saas");
  const [aiCapability, setAiCapability] = useState<"nlp" | "vision" | "predictive" | "agents">("nlp");
  const [userScale, setUserScale] = useState<"seed" | "growth" | "enterprise">("growth");

  // Dynamic Sizer Calculations
  const getArchitectureSpecs = () => {
    switch (appType) {
      case "saas":
        return {
          title: "Multi-Tenant AI SaaS Web Platform",
          frontend: "Next.js 14 / TypeScript / Tailwind CSS",
          backend: "Python (FastAPI) + Node.js Microservices",
          database: "PostgreSQL with pgvector + Redis Cache",
          hosting: "AWS UAE (me-central-1) or Azure UAE North",
          delivery: "6 - 10 Weeks (Indicative MVP)",
          leadTime: "Sub-100ms API response latency"
        };
      case "mobile":
        return {
          title: "Intelligent Cross-Platform Mobile App (iOS & Android)",
          frontend: "React Native / Expo with Native Bridges",
          backend: "FastAPI / Node.js Serverless Edge",
          database: "Supabase / PostgreSQL with Secure Offline Storage",
          hosting: "Local UAE Edge Cloud with CDN Acceleration",
          delivery: "8 - 12 Weeks (Indicative MVP)",
          leadTime: "On-device + Cloud Hybrid Inference"
        };
      case "internal":
        return {
          title: "Enterprise Operational AI Portal & Dashboard",
          frontend: "Next.js Enterprise Portal with Role-Based Access (RBAC)",
          backend: "Python Async Architecture + Webhook Ingestion Engine",
          database: "Dedicated Encrypted PostgreSQL + Document Store",
          hosting: "Private UAE VPC / G42 Khazna / AWS UAE",
          delivery: "4 - 8 Weeks (Indicative MVP)",
          leadTime: "Direct ERP & CRM Middleware Telemetry"
        };
      case "micro":
        return {
          title: "AI Valuation Engine & Interactive Micro-Tool",
          frontend: "Ultra-Lightweight Next.js SSG / Tailwind",
          backend: "Serverless Cloud Functions (Python / Go)",
          database: "In-Memory Redis + Lead Attribution DB",
          hosting: "Cloudflare Edge / Vercel Enterprise",
          delivery: "2 - 4 Weeks (Indicative MVP)",
          leadTime: "Sub-50ms Global Edge Compute"
        };
    }
  };

  const currentSpecs = getArchitectureSpecs();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom AI App Development Dubai & UAE",
    "serviceType": "AI Application Development & Custom Software Engineering",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital: AI Automation, Web & Graphic Design",
      "telephone": "+971545866094",
      "url": "https://www.asifdigital.agency",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Muwaileh Commercial - Industrial Area",
        "addressLocality": "Sharjah",
        "addressRegion": "Sharjah",
        "addressCountry": "AE"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "GeoShape", "name": "GCC" }
    ],
    "description": "Enterprise-grade custom AI application development in Dubai and across the UAE. We architect custom AI web apps, SaaS products, iOS/Android mobile applications, and internal business tools with local data sovereignty."
  };

  const faqData = [
    {
      q: "What types of custom AI applications does Asif Digital build?",
      a: "We engineer four primary categories of AI software: 1) Multi-tenant AI SaaS and web platforms, 2) Intelligent cross-platform mobile apps (iOS & Android via React Native), 3) Enterprise internal portals for automated triage and CRM sync, and 4) High-converting AI micro-tools such as quotation engines, calculators, and audit tools."
    },
    {
      q: "How do you ensure UAE data residency and PDPL compliance for AI applications?",
      a: "All application databases, user records, and sensitive operational logs can be deployed to UAE-region data centers (such as AWS me-central-1 in the UAE, Azure UAE North in Dubai, or private cloud environments). We design strictly in accordance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL), enforcing end-to-end encryption at rest (AES-256) and in transit (TLS 1.3)."
    },
    {
      q: "Can the AI app process bilingual Arabic (Khaleeji) and English data?",
      a: "Yes. Our applications are engineered from the foundation with native right-to-left (RTL) interfaces and bilingual natural language models. We fine-tune and prompt conversational layers to understand Modern Standard Arabic, regional Gulf (Khaleeji) terminology, Arabizi, and technical English without context loss."
    },
    {
      q: "What is the typical timeline and process for developing an AI application MVP?",
      a: "An indicative Minimum Viable Product (MVP) typically takes 4 to 10 weeks depending on architectural complexity. The delivery cycle comprises: 1) Technical scoping & API audit, 2) UI/UX prototyping & database modeling, 3) Core engine development & LLM integration, and 4) Security audit, staging deployment, and production launch."
    },
    {
      q: "Do you integrate AI applications with our existing CRM, ERP, or legacy databases?",
      a: "Yes. We build robust RESTful and GraphQL middleware with secure webhooks. We regularly connect custom AI applications to Salesforce, HubSpot, Zoho, SAP, Microsoft Dynamics 365, Oracle NetSuite, and custom SQL databases, ensuring real-time bidirectional synchronization."
    },
    {
      q: "What programming languages and frameworks power your AI applications?",
      a: "We avoid fragile no-code builders. Our production stack relies on Next.js 14 (React) and TypeScript for web frontends, React Native for mobile applications, Python (FastAPI / PyTorch / LangChain) and Node.js for backend computation, and PostgreSQL with pgvector for structured and vector data storage."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#050505] text-white min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
              }
            }))
          })
        }}
      />

      {/* ── 1. Hero Section (AEO & Entity Optimized) ── */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-[11px] font-mono uppercase tracking-widest mb-6">
            <Cpu className="w-3.5 h-3.5" />
            <span>Sovereign Software Engineering • UAE Wide</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] mb-8">
            Custom AI App Development in <span className="italic text-white/70">Dubai & Across the UAE.</span>
          </h1>
          
          {/* Direct-Answer AEO Block */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 mb-10 text-white/80 text-lg md:text-xl font-light leading-relaxed">
            <p>
              Asif Digital architects custom, enterprise-grade AI applications — from multi-tenant SaaS platforms and cross-platform mobile apps to internal business automation portals. We combine modern full-stack engineering (<strong className="text-white font-medium">Next.js, TypeScript, Python FastAPI</strong>) with Large Language Models, computer vision, and local UAE cloud infrastructure to build software that scales reliably.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://wa.me/971545866094?text=Hi%20Asif,%20I%20would%20like%20to%20discuss%20a%20custom%20AI%20app%20development%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Discuss Your App on WhatsApp
            </Link>
            <Link
              href="/contact?service=custom-ai-app"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all"
            >
              Submit Project Brief <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Technical Signals Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/5">
          <div>
            <div className="text-2xl font-serif text-white mb-1">UAE PDPL</div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-wider">Local Data Sovereignty</div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white mb-1">Sub-100ms</div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-wider">Edge API Latency</div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white mb-1">iOS & Android</div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-wider">Cross-Platform Builds</div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white mb-1">Custom Code</div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-wider">Zero No-Code Lock-In</div>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive Architecture Sizer ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-green-400 block mb-3">Architectural Planning</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">Interactive App Stack Sizer</h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto font-light">
            Select your target software profile to inspect recommended tech frameworks, hosting locations, and indicative delivery models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8 p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-white/10">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-3">1. Application Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "saas", label: "SaaS Web Platform" },
                  { id: "mobile", label: "Mobile AI App" },
                  { id: "internal", label: "Internal Portal" },
                  { id: "micro", label: "AI Micro-Tool" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAppType(item.id as any)}
                    className={`py-3 px-4 rounded-xl text-xs font-medium text-left transition-all ${
                      appType === item.id
                        ? "bg-white text-black font-semibold shadow-md"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-3">2. Core AI Capability</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "nlp", label: "Conversational NLP" },
                  { id: "vision", label: "Computer Vision & OCR" },
                  { id: "predictive", label: "Predictive Analytics" },
                  { id: "agents", label: "Autonomous Workflows" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAiCapability(item.id as any)}
                    className={`py-3 px-4 rounded-xl text-xs font-medium text-left transition-all ${
                      aiCapability === item.id
                        ? "bg-green-500 text-black font-semibold"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-3">3. Deployment Scale</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "seed", label: "< 5k Users" },
                  { id: "growth", label: "5k - 50k" },
                  { id: "enterprise", label: "50k+ Enterprise" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setUserScale(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium text-center transition-all ${
                      userScale === item.id
                        ? "bg-white/20 text-white font-semibold border border-white/40"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-black border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.05)]">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-green-400 block mb-1">Architectural Blueprint</span>
                <h3 className="text-xl md:text-2xl font-serif text-white">{currentSpecs.title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-mono">{currentSpecs.delivery}</span>
            </div>

            <div className="space-y-4 text-sm font-sans mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-white/50 text-xs font-mono uppercase">Frontend Framework</span>
                <span className="text-white font-mono text-xs sm:text-sm mt-1 sm:mt-0">{currentSpecs.frontend}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-white/50 text-xs font-mono uppercase">AI Backend & Microservices</span>
                <span className="text-white font-mono text-xs sm:text-sm mt-1 sm:mt-0">{currentSpecs.backend}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-white/50 text-xs font-mono uppercase">Database & Vector Storage</span>
                <span className="text-white font-mono text-xs sm:text-sm mt-1 sm:mt-0">{currentSpecs.database}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-white/50 text-xs font-mono uppercase">Regional Cloud Host</span>
                <span className="text-green-400 font-mono text-xs sm:text-sm mt-1 sm:mt-0">{currentSpecs.hosting}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-white/50 text-xs font-mono uppercase">Performance Profile</span>
                <span className="text-white/80 font-mono text-xs sm:text-sm mt-1 sm:mt-0">{currentSpecs.leadTime}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center justify-between">
              <span className="text-xs text-white/80">Ready to scope this architecture with our principal engineer?</span>
              <Link
                href="https://wa.me/971545866094?text=Hi%20Asif,%20I%20tested%20your%20App%20Architecture%20Sizer%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-green-500 text-black text-xs font-semibold hover:bg-green-400 transition-colors shrink-0 ml-4"
              >
                Inquire on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Four Core AI App Archetypes ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-20">
          <span className="text-[11px] font-mono uppercase tracking-widest text-green-400 block mb-3">Software Spectrum</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">Four AI Application Archetypes We Build</h2>
          <p className="text-white/60 text-base max-w-3xl mx-auto font-light leading-relaxed">
            Every business has distinct operational requirements. We build tailored software models adapted to your specific user base, compliance mandates, and computational scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.015] border border-white/10 hover:border-green-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3 text-white">1. Multi-Tenant AI SaaS Web Platforms</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                Complete commercial SaaS applications engineered for regional and global distribution. Includes multi-tenant data partitioning, tier-based subscription billing (Stripe, Telr, Tap), vector search indexing, and customer usage dashboards.
              </p>
              <ul className="space-y-2.5 text-xs text-white/80 font-mono mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Next.js 14 App Router & React Server Components</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> PostgreSQL with pgvector for Semantic Search</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> OAuth2, Magic Links, and Role-Based Permissions</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/50">Ideal for: Startups & Digital Products</span>
              <Link href="/contact?service=saas-platform" className="text-xs font-semibold text-green-400 hover:underline inline-flex items-center gap-1">
                Scope SaaS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.015] border border-white/10 hover:border-green-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3 text-white">2. Intelligent Mobile Apps (iOS & Android)</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                Cross-platform mobile applications powered by React Native and Flutter. Designed for field agents, mobile consumers, and executive teams needing voice note transcription, on-device document capture, and push notification automation.
              </p>
              <ul className="space-y-2.5 text-xs text-white/80 font-mono mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> React Native & Expo for iOS/Android Unified Code</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Bilingual Arabic & English Conversational Interfaces</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Biometric Authentication & Secure Keychain Storage</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/50">Ideal for: Consumer & On-Field Operations</span>
              <Link href="/contact?service=mobile-ai-app" className="text-xs font-semibold text-green-400 hover:underline inline-flex items-center gap-1">
                Scope Mobile <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.015] border border-white/10 hover:border-green-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3 text-white">3. Enterprise Operations & Triage Portals</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                Bespoke internal dashboards built to eliminate manual clerical bottlenecks. Features automated invoice data extraction, customs classification matching, property portfolio triage, and CRM lead routing telemetry.
              </p>
              <ul className="space-y-2.5 text-xs text-white/80 font-mono mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Document OCR & Structured Schema Validation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Human-in-the-Loop Exception & Approval Queues</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Two-Way Sync with SAP, Salesforce & Zoho</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/50">Ideal for: Logistics, Real Estate & Clinics</span>
              <Link href="/contact?service=internal-portal" className="text-xs font-semibold text-green-400 hover:underline inline-flex items-center gap-1">
                Scope Portal <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.015] border border-white/10 hover:border-green-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3 text-white">4. AI Micro-Tools & Algorithmic Engines</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                Specialized calculation tools designed for client qualification and automated assessment. Similar to our live Ad Spend Analyzer and Lead Dashboard, these tools generate high-intent inbound leads by solving immediate client calculations.
              </p>
              <ul className="space-y-2.5 text-xs text-white/80 font-mono mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Real Estate Yield & Mortgage Estimators</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Automated Insurance & Logistics Quote Calculators</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Automated PDF Audit Report Generation</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/50">Ideal for: Lead Acquisition & Authority Assets</span>
              <Link href="/contact?service=ai-micro-tool" className="text-xs font-semibold text-green-400 hover:underline inline-flex items-center gap-1">
                Scope Tool <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. UAE Data Sovereignty & Security Architecture ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-green-400 block mb-3">Security & Compliance</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-6">UAE Data Sovereignty & Enterprise Governance</h2>
            <div className="space-y-6 text-white/70 text-base font-light leading-relaxed">
              <p>
                In the GCC enterprise market, where customer information, financial metrics, and intellectual property are highly sensitive, using consumer AI wrappers is a severe risk.
              </p>
              <p>
                We build dedicated, isolated infrastructure designed to comply with <strong className="text-white">UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL)</strong>. All databases and AI pipelines can be provisioned in local UAE data centers:
              </p>
              <ul className="space-y-3 font-mono text-xs text-white/90">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>AWS UAE Region (me-central-1) & Azure UAE North (Dubai)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Zero Data Training: Client records are never used to train public LLMs</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>End-to-End Encryption at Rest (AES-256) & In Transit (TLS 1.3)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Granular Role-Based Access Control (RBAC) and Immutable Audit Trails</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-white/[0.015] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-serif text-white mb-6">Technical Delivery Checklist</h3>
            <div className="space-y-4">
              {[
                { title: "Discovery & API Audit", time: "Week 1 - 2", desc: "Detailed mapping of database schemas, user permissions, and external integrations." },
                { title: "Architecture & Prototyping", time: "Week 3 - 4", desc: "Interactive Figma design systems, database modeling, and LLM prompt testing." },
                { title: "Engine Build & Verification", time: "Week 5 - 8", desc: "Clean code development, automated CI/CD pipeline, and stress testing." },
                { title: "Security Audit & UAE Launch", time: "Week 9+", desc: "Vulnerability scanning, PDPL checklist signoff, and local cloud go-live." },
              ].map((step, i) => (
                <div key={i} className="p-4 rounded-xl bg-black border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-white">{step.title}</span>
                    <span className="text-[10px] font-mono text-green-400 uppercase">{step.time}</span>
                  </div>
                  <p className="text-xs text-white/60 font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Multi-Emirate Geo Coverage Matrix ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-green-400 block mb-3">Regional Footprint</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">Serving Enterprises Across the UAE</h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto font-light">
            We support founders, operators, and enterprise teams across all major commercial and free-zone jurisdictions in the United Arab Emirates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/10">
            <h3 className="text-lg font-serif text-white mb-2">Dubai</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              DIFC, Business Bay, Downtown Dubai, Dubai Internet City, and DMCC. High-frequency AI apps for real estate, finance, and trading.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/10">
            <h3 className="text-lg font-serif text-white mb-2">Abu Dhabi</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              ADGM, Masdar City, and Khalifa Industrial Zone. Institutional-grade compliance, energy telemetry, and government-adjacent apps.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/10">
            <h3 className="text-lg font-serif text-white mb-2">Sharjah</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Muwaileh Commercial, SAIF Zone, and Shams. Logistics automation, wholesale trade workflows, and educational platforms.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/10">
            <h3 className="text-lg font-serif text-white mb-2">Northern Emirates</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Ajman, Ras Al Khaimah (RAK DAO), and Fujairah. Free-zone software, manufacturing portals, and maritime logistics applications.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Comprehensive AEO Direct-Answer FAQs ── */}
      <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-green-400 block mb-3">Direct Answers</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-white/60 text-sm font-light">
            Clear, transparent answers regarding custom AI application engineering, pricing models, and regional hosting.
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((faq, i) => (
            <div key={i} className="p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-white/10">
              <h3 className="text-lg md:text-xl font-serif text-white mb-3">{faq.q}</h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Founder Consultation CTA ── */}
      <section className="px-6 md:px-12 py-24 max-w-5xl mx-auto text-center">
        <div className="p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-black border border-white/10 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            Architect Your Custom AI Application
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Speak directly with our principal AI systems architect to evaluate your technical scope, database requirements, and delivery milestones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://wa.me/971545866094?text=Hi%20Asif,%20I%20would%20like%20to%20schedule%20a%20technical%20scoping%20session%20for%20a%20custom%20AI%20app."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500 text-black font-semibold text-sm hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <MessageSquare className="w-4 h-4" />
              Schedule Architecture Call
            </Link>
            <Link
              href="/contact?service=custom-ai-app"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            >
              Submit Project Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
