"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, Cpu, Shield, Zap, Layers, CheckCircle2, 
  ArrowRight, Server, Database, Globe, RefreshCw, 
  Lock, PhoneCall, Terminal, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function WebDevelopment() {
  // Interactive Performance & Latency Simulator State
  const [dbQueriesPerSec, setDbQueriesPerSec] = useState(2500);
  const [concurrentUsers, setConcurrentUsers] = useState(800);
  const [serverStack, setServerStack] = useState<"legacy" | "asif_nextjs">("asif_nextjs");

  // Latency & TTFB Calculations
  const ttfbMs = serverStack === "legacy" ? Math.round(380 + (concurrentUsers * 0.45)) : Math.round(45 + (concurrentUsers * 0.03));
  const pageLoadSec = serverStack === "legacy" ? (3.8 + (concurrentUsers * 0.003)).toFixed(1) : (0.8 + (concurrentUsers * 0.0002)).toFixed(1);
  const uptimeSLA = serverStack === "legacy" ? "98.2%" : "99.99%";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Custom Web Development Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/web-development-dubai-uae",
    "telephone": "+971545866094",
    "priceRange": "AED 10,000 - AED 85,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Enterprise-grade custom web application development in Dubai and Sharjah. Specialist in Next.js, React, TypeScript, high-performance Node.js backends, secure API integrations, and UAE cloud infrastructure."
  };

  const faqData = [
    {
      q: "What programming languages and frameworks does Asif Digital specialize in?",
      a: "We specialize in modern, high-performance web engineering stacks: Next.js (React 19 / App Router), TypeScript, Tailwind CSS for frontend excellence, and Node.js, Python (FastAPI / Django), Go, and PostgreSQL for robust backend infrastructure. We build custom software from the ground up, avoiding fragile no-code page builders or bloated WordPress templates that slow down over time."
    },
    {
      q: "How does custom web development improve our Google Search and Core Web Vitals rankings?",
      a: "Google explicitly rewards websites with sub-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS). Our custom Next.js applications leverage Server-Side Rendering (SSR) and Static Site Generation (SSG), enabling pages to load in under 0.8 seconds across UAE mobile networks. This speed directly reduces bounce rates and gives your brand a massive competitive edge in both Google SEO and AI answer engines like Perplexity."
    },
    {
      q: "Can you build custom enterprise web portals with role-based access control (RBAC)?",
      a: "Yes. We regularly engineer complex internal portals, partner portals, and customer dashboards featuring multi-tier user authentication (OAuth2, SAML, JWT), granular permission hierarchies (Admin, Manager, Broker, Auditor), and end-to-end encrypted activity audit logs for enterprise compliance."
    },
    {
      q: "How do you handle third-party API integrations (CRMs, ERPs, Payment Gateways)?",
      a: "We architect clean, fault-tolerant API middleware layers. Whether connecting with Salesforce, HubSpot, Zoho, SAP, Odoo, custom SQL databases, or UAE payment gateways like Stripe and Tap, we build asynchronous webhooks with automated retry queues, rate-limiting, and error-handling telemetry."
    },
    {
      q: "Where will our web application be hosted to comply with UAE Data Residency regulations?",
      a: "For clients subject to UAE data sovereignty laws (such as government, financial, or healthcare sectors), we deploy infrastructure in local UAE cloud regions including AWS UAE (me-central-1 in Dubai/Abu Dhabi), Microsoft Azure UAE North, or G42 Khazna Cloud to ensure zero cross-border data leakage."
    },
    {
      q: "Do we own the full source code and intellectual property upon project completion?",
      a: "Yes, 100%. Upon final settlement, full ownership of the clean GitHub repository, database schemas, custom UI assets, and deployment documentation is transferred to your company. You are never locked into proprietary agency hosting."
    },
    {
      q: "What is the difference between a custom web application and a standard website?",
      a: "A standard website is static marketing content. A custom web application includes dynamic database interactions, user logins, real-time calculations, automated workflows, payment processing, and internal business logic tailored specifically to your company's operational workflow."
    },
    {
      q: "How do you ensure application security against DDoS, SQL injection, and data breaches?",
      a: "We implement defense-in-depth security architectures: automated Web Application Firewalls (WAF) via Cloudflare Enterprise, strict Content Security Policies (CSP), parameterized SQL queries to prevent injections, encrypted secrets management via environment variables, and routine penetration vulnerability scans."
    },
    {
      q: "What is the typical development timeline for an enterprise custom web application in Dubai?",
      a: "Depending on functional scope, custom web development projects generally range between 4 to 10 weeks. We work in 2-week agile sprints, providing interactive staging previews at every milestone so your team can test features in real-time."
    },
    {
      q: "Can you take over and refactor an existing legacy codebase built by another agency?",
      a: "Yes. We begin with a comprehensive Technical Debt & Security Audit of your current repository. We then establish a phased modernization roadmap to eliminate bugs, migrate to Next.js/TypeScript, and optimize database queries without causing operational downtime."
    },
    {
      q: "Do you provide bilingual English and Arabic capabilities in custom web applications?",
      a: "Yes. Every custom portal we engineer can be built with native bilingual architecture, dynamic Right-to-Left (RTL) state switching, localized number formatting (English/Arabic numerals), and timezone-aware scheduling calibrated for Gulf Standard Time (GST)."
    },
    {
      q: "How do we get started and receive an architectural scope for our web project?",
      a: "You can book a technical consultation directly with our principal strategist by calling +971 54 586 6094 or submitting your project brief. We will analyze your system requirements and deliver a detailed technical roadmap with milestone estimates within 24 hours."
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
    "name": "How to Architect and Build an Enterprise Custom Web Application in Dubai",
    "description": "The end-to-end engineering lifecycle for custom Next.js web applications in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "System Architecture & Database Schema Design",
        "text": "We map user personas, database relationships (PostgreSQL/Redis), API endpoints, and cloud infrastructure requirements."
      },
      {
        "@type": "HowToStep",
        "name": "High-Fidelity UI/UX & Responsive Prototyping",
        "text": "We craft pixel-perfect desktop and mobile component designs using modern Tailwind styling and intuitive interaction flows."
      },
      {
        "@type": "HowToStep",
        "name": "Full-Stack Development & TypeScript Typing",
        "text": "We build modular Next.js frontends and robust Node.js/Python microservices with 100% strict TypeScript type safety."
      },
      {
        "@type": "HowToStep",
        "name": "API Middleware & Security Hardening",
        "text": "We implement OAuth2 authentication, rate limiting, data encryption, and third-party CRM/payment webhooks."
      },
      {
        "@type": "HowToStep",
        "name": "CI/CD Pipeline & UAE Cloud Deployment",
        "text": "We configure automated GitHub Actions testing and deploy onto AWS UAE or Vercel Edge networks with 99.99% uptime SLAs."
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
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
            Enterprise Web Engineering &bull; Dubai & Sharjah &bull; UAE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Custom Web <br />
            <span className="italic text-white/50 font-normal">Development Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Generic website templates cannot support ambitious UAE enterprises. We engineer custom, high-concurrency web applications using Next.js, React, and TypeScript—built for sub-second speeds, unshakeable cloud security, and seamless API integrations.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Consult a Senior Architect <ArrowRight className="w-4 h-4" />
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

      {/* ── 2. Performance Metric Ribbons ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "sub-80ms", label: "Time to First Byte (TTFB)", sub: "On UAE Edge Nodes" },
            { metric: "100%", label: "TypeScript Type Safety", sub: "Zero Production Runtime Bugs" },
            { metric: "99.99%", label: "Cloud Uptime SLA", sub: "Multi-Zone Redundancy" },
            { metric: "100/100", label: "Google Lighthouse Score", sub: "Guaranteed Core Web Vitals" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Web Performance & Latency Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Live Architecture Diagnostic
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Simulate Server Response & Concurrency Latency
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Every 100ms of web latency costs UAE businesses 7% in conversion loss. Toggle between a legacy monolithic CMS and Asif Digital's Serverless Next.js architecture to see the performance difference under high traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-3 font-bold">
                  Select Architectural Stack:
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setServerStack("legacy")}
                    className={`py-3.5 px-5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${serverStack === "legacy" ? "bg-red-500/20 border border-red-400 text-red-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Legacy CMS / PHP Server
                  </button>
                  <button
                    onClick={() => setServerStack("asif_nextjs")}
                    className={`py-3.5 px-5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${serverStack === "asif_nextjs" ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Asif Digital Next.js Edge
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Concurrent Active Users:</span>
                  <span className="text-white font-bold">{concurrentUsers} users</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={concurrentUsers} 
                  onChange={(e) => setConcurrentUsers(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Database Queries / sec:</span>
                  <span className="text-white font-bold">{dbQueriesPerSec.toLocaleString()} QPS</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="20000" 
                  step="500" 
                  value={dbQueriesPerSec} 
                  onChange={(e) => setDbQueriesPerSec(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className={`p-8 rounded-2xl border transition-all space-y-6 ${serverStack === "legacy" ? "border-red-500/30 bg-red-950/10" : "border-emerald-500/30 bg-emerald-950/10"}`}>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold block mb-1 font-mono text-white/60">
                  Time to First Byte (TTFB)
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {ttfbMs} ms <span className="text-xs font-sans text-white/50">({serverStack === "asif_nextjs" ? "Optimal Speed" : "High Latency Bottleneck"})</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Full Mobile Render:</span>
                  <span className="text-white text-sm font-bold">{pageLoadSec} seconds</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-1">Reliability SLA:</span>
                  <span className={`text-sm font-bold ${serverStack === "asif_nextjs" ? "text-emerald-300" : "text-red-400"}`}>{uptimeSLA}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                  {serverStack === "asif_nextjs" 
                    ? "✓ Serverless Edge execution renders pages instantly, preventing server crashes during Dubai high-traffic campaigns."
                    : "⚠️ Monolithic server will bottleneck and slow down during concurrent traffic spikes, losing high-value customer inquiries."}
                </p>
                <Link 
                  href="/contact" 
                  className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/80 transition-colors"
                >
                  Request Architecture Consultation <ArrowRight className="w-4 h-4" />
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
            Technical Rigor & Delivery Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Custom Engineering Delivers 10x ROI
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Architecture Parameter</th>
                <th className="py-4 px-4 text-white/40">Standard WordPress / PHP</th>
                <th className="py-4 px-4 text-white/40">Offshore Low-Cost Team</th>
                <th className="py-4 px-4 text-white/40">Generic UAE Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Sovereign Engineering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Underlying Tech Stack</td>
                <td className="py-5 px-4 text-red-400">PHP 7.4 + 40 Plugins</td>
                <td className="py-5 px-4 text-red-400">Messy Spaghetti Code</td>
                <td className="py-5 px-4 text-yellow-400">Pre-built Theme Template</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Next.js 14, React 19 & TypeScript</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">API Integration Resilience</td>
                <td className="py-5 px-4 text-red-400">Fragile sync plugins</td>
                <td className="py-5 px-4 text-red-400">Zero error logging</td>
                <td className="py-5 px-4 text-yellow-400">Basic Zapier hooks</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Fault-Tolerant Async Queues & Retry Logic</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Security & Data Residency</td>
                <td className="py-5 px-4 text-red-400">Vulnerable to exploits</td>
                <td className="py-5 px-4 text-red-400">Unknown shared hosting</td>
                <td className="py-5 px-4 text-yellow-400">Generic overseas cloud</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">AWS UAE / Azure UAE + Cloudflare WAF</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Concurrency & Autoscaling</td>
                <td className="py-5 px-4 text-red-400">Crashes at 200 users</td>
                <td className="py-5 px-4 text-red-400">Manual restart needed</td>
                <td className="py-5 px-4 text-yellow-400">Requires bigger VPS</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Serverless Autoscaling (1 to 100k users)</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Codebase IP Ownership</td>
                <td className="py-5 px-4 text-yellow-400">GPL / Plugin licenses</td>
                <td className="py-5 px-4 text-red-400">Withheld code</td>
                <td className="py-5 px-4 text-yellow-400">Agency lock-in</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% Client GitHub Transfer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Core Development Capabilities ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Specialized Engineering Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Enterprise Web Solutions Engineered in the UAE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-6 h-6 text-emerald-400" />,
                title: "Custom Next.js & React Applications",
                desc: "Server-side rendered web applications with instantaneous navigation, SEO pre-rendering, and fluid micro-animations tailored to luxury and commercial aesthetics."
              },
              {
                icon: <Database className="w-6 h-6 text-emerald-400" />,
                title: "Scalable SQL & PostgreSQL Architecture",
                desc: "Clean relational schemas, indexing, connection pooling, and automated backups built to handle millions of records without query degradation."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Enterprise Internal Portals & CRMs",
                desc: "Custom operational software, employee dashboards, and inventory management systems engineered to automate manual business processes."
              },
              {
                icon: <Lock className="w-6 h-6 text-emerald-400" />,
                title: "Role-Based Access Control (RBAC)",
                desc: "Enterprise user management with multi-factor authentication (MFA), OAuth2 social logins, and granular permission enforcement across user roles."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "High-Speed RESTful & GraphQL APIs",
                desc: "Clean, documented API layers connecting your web app with mobile applications, external partner networks, and internal business tools."
              },
              {
                icon: <Server className="w-6 h-6 text-emerald-400" />,
                title: "UAE Cloud Deployment & DevOps",
                desc: "Automated CI/CD deployment pipelines on AWS UAE, Microsoft Azure, and Docker containerized infrastructure with 24/7 uptime monitoring."
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
            Engineering Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Web Application Delivery Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Architecture & Schema", text: "Database ERD design, API routing specifications, user stories, and security compliance review." },
            { step: "02", title: "Figma UI Prototyping", text: "Interactive component design, responsive breakpoints (Desktop, Tablet, Mobile), and brand alignment." },
            { step: "03", title: "Full-Stack Build", text: "Clean Next.js and TypeScript implementation, state management, and backend database integrations." },
            { step: "04", title: "Security & QA Testing", text: "Automated unit tests, OWASP vulnerability scanning, cross-browser audits, and load stress tests." },
            { step: "05", title: "Deployment & CI/CD", text: "Zero-downtime production rollout, Google Search Console indexing, and 30-day hyper-care monitoring." }
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
              Deep Strategic Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Key questions UAE enterprise leaders ask before commissioning custom web application development.
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
            Ready to Engineer Your Next Platform?
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Build Unshakeable Web Infrastructure.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's discuss your enterprise workflow, technical requirements, and scalability goals. Speak directly with our lead software architect in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book Technical Consultation <ArrowRight className="w-4 h-4" />
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
