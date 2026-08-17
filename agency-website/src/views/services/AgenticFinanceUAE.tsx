"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, Calculator, FileCheck, Shield, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, PhoneCall, HelpCircle, 
  Cpu, Building2, BarChart3, Clock, RefreshCw, Layers
} from "lucide-react";
import Link from "next/link";

export default function AgenticFinanceUAE() {
  // Interactive Financial Hours & Cost Savings Simulator State
  const [monthlyInvoicesCount, setMonthlyInvoicesCount] = useState(350);
  const [avgAccountantHourlyRate, setAvgAccountantHourlyRate] = useState(120); // AED / hour
  const [currentManualProcessingMins, setCurrentManualProcessingMins] = useState(25); // mins per invoice

  // Calculations
  const totalManualHoursPerMonth = Math.round((monthlyInvoicesCount * currentManualProcessingMins) / 60);
  const manualLaborCostMonthly = totalManualHoursPerMonth * avgAccountantHourlyRate;
  
  const automatedTimeMinsPerInvoice = 0.5; // Agentic AI automated matching & OCR
  const automatedLaborCostMonthly = Math.round(((monthlyInvoicesCount * automatedTimeMinsPerInvoice) / 60) * avgAccountantHourlyRate);
  const monthlyCostSavings = Math.max(0, manualLaborCostMonthly - automatedLaborCostMonthly);
  const annualCostSavings = monthlyCostSavings * 12;
  const hoursSavedPerMonth = Math.round(totalManualHoursPerMonth * 0.95);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Agentic Finance & VAT AI UAE",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/agentic-finance-uae",
    "telephone": "+971545866094",
    "priceRange": "AED 8,500 - AED 45,000 / setup",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Autonomous AI Finance and Accounting Automation in Dubai and the UAE. Automated FTA 5% VAT invoice reconciliation, UAE 9% Corporate Tax data structuring, autonomous AR debt collection bots, and ERP integration."
  };

  const faqData = [
    {
      q: "What is Agentic Finance and how does it differ from standard accounting software?",
      a: "Traditional accounting software (like QuickBooks or Zoho) is merely a passive database where humans must manually type in invoice numbers, match bank statements, and chase late payments. Agentic Finance deploys autonomous AI agents that actively read incoming PDF invoices via computer vision, verify line-item tax numbers against UAE FTA rules, reconcile transactions with your bank feeds, and autonomously draft follow-up payment reminders without human intervention."
    },
    {
      q: "How does the AI ensure compliance with UAE Federal Tax Authority (FTA) 5% VAT and 9% Corporate Tax?",
      a: "Our AI models are programmed with the exact tax rules established by the UAE Federal Tax Authority (Federal Decree-Law No. 8 on VAT and Federal Decree-Law No. 47 on Corporate Tax). The AI verifies that supplier Tax Registration Numbers (TRNs) are valid on the FTA portal, verifies that 5% VAT calculations are mathematically exact, and categorizes deductible expenses to prepare clean audit-ready schedules for your 9% Corporate Tax returns."
    },
    {
      q: "Can the AI automate Accounts Receivable (AR) and chase overdue client payments?",
      a: "Yes! Our autonomous AR agents monitor outstanding invoices in your ERP. When an invoice approaches or exceeds its due date, the AI generates personalized, polite, and escalating follow-up notices via email and WhatsApp in both English and Arabic. The AI can also understand client reply emails (e.g. 'We will pay next Thursday') and automatically update your cash flow forecast."
    },
    {
      q: "Which ERP and accounting platforms can you integrate with?",
      a: "We natively integrate with all major UAE enterprise platforms: Odoo, SAP Business One, Oracle NetSuite, Microsoft Dynamics 365, Zoho Books, QuickBooks Online, Xero, Tally Prime, and custom SQL databases via secure private API connectors."
    },
    {
      q: "How does the system handle bank statement reconciliation?",
      a: "The AI agent ingests bank feed statements (or CSV/MT940 exports from Emirates NBD, ADCB, FAB, Mashreq, or Dubai Islamic Bank), matches incoming deposits to open sales invoices using fuzzy-logic matching algorithms, and flags anomalous transactions for 1-click human supervisor approval."
    },
    {
      q: "Where is our confidential financial data processed and stored?",
      a: "We strictly adhere to UAE Data Sovereignty guidelines. All OCR parsing and LLM inferencing are conducted either within local UAE cloud nodes (AWS UAE / Azure UAE North) or on private dedicated enterprise instances with strict zero-data-retention and zero-model-training policies. Your proprietary financial records are never used to train public AI models."
    },
    {
      q: "How accurate is the AI at reading scanned PDF invoices and handwritten receipts?",
      a: "Our multimodal document AI achieves 99.4%+ extraction accuracy across printed, scanned, and digital PDF invoices in both English and Arabic. If the AI encounters a degraded receipt with confidence below 95%, it routes the item to an exception queue for a 5-second human verification check."
    },
    {
      q: "Can human finance managers maintain final approval before payments are released?",
      a: "Yes, 100%. We enforce a Human-in-the-Loop (HITL) governance framework. While the AI prepares the invoice extraction, matching, and payment batch files automatically, final payment disbursement authorization remains strictly in the hands of your authorized CFO or financial controller."
    },
    {
      q: "What is the typical deployment timeline for an Agentic Finance system in the UAE?",
      a: "Standard invoice processing and VAT reconciliation pipelines are deployed and integrated with your ERP in 3 to 5 weeks. Complex multi-entity consolidations or custom enterprise approval workflows typically require 6 to 8 weeks."
    },
    {
      q: "How does this reduce auditing costs and corporate tax preparation time?",
      a: "Auditors often spend weeks manually sampling invoices and testing VAT reconciliations. With Agentic Finance, every transaction is automatically linked to its source PDF invoice, bank receipt, and FTA validation stamp, allowing external auditors to complete annual audits in a fraction of the time with zero audit fines."
    },
    {
      q: "How does Asif Digital's AI compare to generic off-the-shelf OCR software?",
      a: "Basic OCR software breaks when invoice formats change, cannot read Arabic tables, and lacks deep knowledge of UAE tax legislation. Asif Digital deploys reasoning LLM agents that understand semantic context, calculate multi-currency conversions (USD, EUR, GBP to AED), and adapt dynamically to new supplier layouts."
    },
    {
      q: "How do we get started with an automated finance workflow audit?",
      a: "Contact our AI finance solutions desk on +971 54 586 6094 or submit a request on our contact page. We will analyze your invoice volume and ERP stack, providing an interactive demo and ROI projection within 24 hours."
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
    "name": "How to Deploy Autonomous AI Accounting and Tax Automation in the UAE",
    "description": "The systematic 5-stage deployment protocol for implementing Agentic Finance workflows in Dubai.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Financial Workflow & ERP Mapping",
        "text": "We map your invoice intake channels (email, portal, WhatsApp), Chart of Accounts, and approval hierarchies."
      },
      {
        "@type": "HowToStep",
        "name": "Document AI & Multimodal Model Tuning",
        "text": "We configure vision models to extract line items, TRN numbers, and currency conversions in English and Arabic."
      },
      {
        "@type": "HowToStep",
        "name": "ERP & Bank Feed API Synchronization",
        "text": "We establish secure bi-directional connectors between your accounting software, bank accounts, and the AI engine."
      },
      {
        "@type": "HowToStep",
        "name": "Human-in-the-Loop Threshold Testing",
        "text": "We test 200+ historical invoices to validate 99.4%+ extraction accuracy and calibrate anomaly alert thresholds."
      },
      {
        "@type": "HowToStep",
        "name": "Live Autonomous Execution & Reporting",
        "text": "We activate autonomous matching, VAT reconciliation, and 24/7 financial telemetry reporting."
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
            <Cpu className="w-4 h-4 text-emerald-400" /> Agentic AI &bull; FTA VAT &bull; UAE Corporate Tax &bull; Dubai & GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Agentic Finance &amp; <br />
            <span className="italic text-white/50 font-normal">Compliance AI UAE.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Manual invoice data entry and slow bank reconciliations drain hundreds of finance hours every month. We deploy autonomous AI agents that extract invoice data, reconcile bank statements, verify FTA 5% VAT compliance, and accelerate AR debt recovery in real-time.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Finance AI Blueprint <ArrowRight className="w-4 h-4" />
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
            { metric: "99.4%", label: "Multimodal OCR Accuracy", sub: "English & Arabic Invoices" },
            { metric: "-95%", label: "Manual Data Entry Hours", sub: "Instant ERP Synchronization" },
            { metric: "100%", label: "FTA VAT & TRN Verification", sub: "Automated Tax Audit Trails" },
            { metric: "Zero Data", label: "Model Training Isolation", sub: "100% Private Cloud Security" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Finance Hours & Cost Savings Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Operational ROI Estimator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate Your Monthly Accounting Hours Saved
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Adjust your monthly invoice volume, current manual processing time, and internal accounting rate to calculate your direct financial savings with autonomous Agentic AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Invoices & Receipts Processed:</span>
                  <span className="text-white font-bold">{monthlyInvoicesCount} invoices</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="3000" 
                  step="50" 
                  value={monthlyInvoicesCount} 
                  onChange={(e) => setMonthlyInvoicesCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Current Manual Processing Time:</span>
                  <span className="text-white font-bold">{currentManualProcessingMins} minutes / invoice</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="45" 
                  step="5" 
                  value={currentManualProcessingMins} 
                  onChange={(e) => setCurrentManualProcessingMins(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Internal Accountant Hourly Cost:</span>
                  <span className="text-white font-bold">AED {avgAccountantHourlyRate} / hour</span>
                </div>
                <input 
                  type="range" 
                  min="60" 
                  max="250" 
                  step="10" 
                  value={avgAccountantHourlyRate} 
                  onChange={(e) => setAvgAccountantHourlyRate(Number(e.target.value))}
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
                  AED {monthlyCostSavings.toLocaleString()} <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Hours Reclaimed:</span>
                  <span className="text-white text-sm font-bold">~{hoursSavedPerMonth} hours / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Impact:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {annualCostSavings.toLocaleString()} / yr</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Schedule an AI Finance Demo <ArrowRight className="w-4 h-4" />
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
            Operational Model Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Agentic AI Transforms Accounting Efficiency
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Finance Operation</th>
                <th className="py-4 px-4 text-white/40">Manual Data Entry</th>
                <th className="py-4 px-4 text-white/40">Basic OCR Software</th>
                <th className="py-4 px-4 text-white/40">Offshore Bookkeeper</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Agentic Finance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Invoice Processing Speed</td>
                <td className="py-5 px-4 text-red-400">20-30 mins / invoice</td>
                <td className="py-5 px-4 text-yellow-400">5-10 mins (frequent errors)</td>
                <td className="py-5 px-4 text-yellow-400">24-48hr turnaround</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Under 15 seconds per document</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">FTA 5% VAT Verification</td>
                <td className="py-5 px-4 text-red-400">Manual TRN lookup</td>
                <td className="py-5 px-4 text-red-400">No verification</td>
                <td className="py-5 px-4 text-yellow-400">Sample checks only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Automated Live FTA TRN &amp; VAT Audit</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">AR Debt Follow-Up</td>
                <td className="py-5 px-4 text-red-400">Awkward manual calls</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-yellow-400">Generic email blasts</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Autonomous WhatsApp &amp; Email Chaser Bot</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bank Feed Reconciliation</td>
                <td className="py-5 px-4 text-red-400">End-of-month scramble</td>
                <td className="py-5 px-4 text-red-400">Not supported</td>
                <td className="py-5 px-4 text-yellow-400">Weekly reconciliation</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Continuous Real-Time 24/7 Matching</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Data Residency &amp; Security</td>
                <td className="py-5 px-4 text-yellow-400">Local desktop risk</td>
                <td className="py-5 px-4 text-red-400">US cloud processing</td>
                <td className="py-5 px-4 text-red-400">Data sent offshore</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% UAE Cloud Isolation &amp; Zero Retention</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Agentic Finance Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Solution Modules
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our Autonomous Finance Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileCheck className="w-6 h-6 text-emerald-400" />,
                title: "Multimodal Invoice Extraction",
                desc: "Autonomous visual AI that parses multi-page PDF invoices, receipts, and purchase orders in English and Arabic with 99.4%+ precision."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Automated FTA VAT & TRN Auditing",
                desc: "Validates supplier TRNs against the UAE Federal Tax Authority registry, confirms 5% VAT calculations, and formats tax-deductible schedules."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "Continuous Bank Reconciliation",
                desc: "Fuzzy-logic algorithms matching bank feed transactions with open accounts payable/receivable records, eliminating month-end bottlenecks."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Autonomous AR Debt Collection",
                desc: "Polite, escalating email and WhatsApp follow-up bots that negotiate payment dates and recover overdue cash flow automatically."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Native ERP & Accounting Sync",
                desc: "Bi-directional API integrations with Odoo, SAP, Oracle NetSuite, Microsoft Dynamics, Zoho Books, QuickBooks, and Xero."
              },
              {
                icon: <Building2 className="w-6 h-6 text-emerald-400" />,
                title: "9% Corporate Tax Data Structuring",
                desc: "Categorizes deductible and non-deductible operational expenses automatically to prepare audit-ready schedules for annual UAE Corporate Tax filings."
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
            Our 5-Stage Agentic Finance Deployment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Workflow Audit", text: "We map invoice channels, chart of accounts, approval thresholds, and current ERP structures." },
            { step: "02", title: "Model Tuning", text: "We calibrate multimodal vision models to extract line items, TRNs, and currency codes." },
            { step: "03", title: "ERP Connector", text: "We configure private API webhooks between your ERP, bank feeds, and the AI engine." },
            { step: "04", title: "Sandbox Testing", text: "We test 200+ historical invoices to validate 99.4%+ extraction accuracy and threshold triggers." },
            { step: "05", title: "Live Automation", text: "We deploy autonomous matching with human-in-the-loop oversight and 24/7 telemetry." }
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
              Deep Financial AI Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE CFOs and business leaders need to know about autonomous AI accounting, VAT compliance, and security.
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
            Reclaim Hundreds of Finance Hours
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Automate Your UAE Accounting Workflows.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Eliminate invoice data entry, automate FTA 5% VAT reconciliation, and accelerate overdue collections. Schedule a private technical demo with our AI solutions architect in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book Agentic Finance Demo <ArrowRight className="w-4 h-4" />
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
