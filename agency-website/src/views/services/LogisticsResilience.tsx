"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Truck, Ship, Anchor, AlertTriangle, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, PhoneCall, HelpCircle, 
  Cpu, Building2, BarChart3, Clock, Layers, RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function LogisticsResilience() {
  // Interactive Demurrage & Freight Delay Risk Simulator State
  const [monthlyShipments, setMonthlyShipments] = useState(60); // containers/shipments
  const [avgDemurrageFeePerDay, setAvgDemurrageFeePerDay] = useState(450); // AED / container / day
  const [avgDelayDays, setAvgDelayDays] = useState(3.5); // days delay per delayed container
  const [delayedShipmentRate, setDelayedShipmentRate] = useState(25); // % of shipments delayed due to manual paperwork

  // Calculations
  const delayedShipmentsCount = Math.round(monthlyShipments * (delayedShipmentRate / 100));
  const monthlyDemurrageLoss = Math.round(delayedShipmentsCount * avgDelayDays * avgDemurrageFeePerDay);
  
  const automatedDelayedRate = 4; // Reduced to 4% with autonomous document parsing & JAFZA customs AI
  const automatedDelayedCount = Math.round(monthlyShipments * (automatedDelayedRate / 100));
  const automatedDemurrageLoss = Math.round(automatedDelayedCount * 1.0 * avgDemurrageFeePerDay);
  const monthlyDemurrageSavings = Math.max(0, monthlyDemurrageLoss - automatedDemurrageLoss);
  const annualDemurrageSavings = monthlyDemurrageSavings * 12;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Logistics & Supply Chain AI Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/logistics-resilience",
    "telephone": "+971545866094",
    "priceRange": "AED 10,000 - AED 65,000 / setup",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "JAFZA", "Dubai South", "Sharjah", "Abu Dhabi", "Khalifa Port", "GCC"],
    "description": "Autonomous AI Logistics, Supply Chain Telemetry, and Customs Document Automation in JAFZA, Dubai South, and Khalifa Port. Automated Bill of Lading parsing, demurrage prevention, and multimodal freight routing."
  };

  const faqData = [
    {
      q: "How does AI automation prevent port demurrage fees and container detention penalties in Dubai?",
      a: "Port demurrage occurs when shipping documentation (Bills of Lading, Packing Lists, Certificates of Origin, Delivery Orders) contains clerical errors or gets delayed in manual review queues, leaving containers stuck at Jebel Ali Port (DP World) or Khalifa Port beyond free detention periods. Our AI agent ingests shipping documents instantly via computer vision, validates HS codes and consignee details against Dubai Customs / Mirsal II requirements, and triggers automated customs clearances before vessels berth, virtually eliminating demurrage penalties."
    },
    {
      q: "Can the AI parse complex Multimodal Bills of Lading, Airway Bills, and Commercial Invoices?",
      a: "Yes! Our multimodal document models are trained on thousands of international shipping layouts across major ocean carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd) and air cargo lines (Emirates SkyCargo, Qatar Airways Cargo). The AI extracts container numbers, seal numbers, gross weights, HS codes, and port codes with 99.5%+ accuracy in both English and Arabic."
    },
    {
      q: "Does the system integrate with Dubai Customs, Mirsal II, and Dubai Trade platforms?",
      a: "Yes. We configure secure robotic process automation (RPA) and API connectors that interface directly with Dubai Trade, Mirsal II, and Mawani portals, automating customs declaration submissions, duty fee calculations, and clearance status polling without manual operator data entry."
    },
    {
      q: "How does the AI handle predictive supply chain disruption and freight route optimization?",
      a: "Our logistics agents continuously ingest global AIS vessel tracking telemetry, weather radar, port congestion indices, and regional geopolitical risk data. If a shipping route or transit canal faces delays, the AI automatically models alternative routing options (e.g. sea-to-air multimodal shifts via Dubai South DWC or road freight through Saudi/Oman border crossings) and calculates cost-time trade-offs."
    },
    {
      q: "Can the system send automated real-time shipment updates to clients via WhatsApp?",
      a: "Yes! The system automatically notifies consignees and logistics managers via WhatsApp and email whenever key milestones occur: Vessel Departure, Customs Clearance Approved, Container Discharged, Driver Assigned, and Proof of Delivery (POD) Signed."
    },
    {
      q: "Which Transportation Management Systems (TMS) and ERPs do you support?",
      a: "We integrate with all leading freight forwarding and enterprise systems: CargoWise, Magaya, Descartes, SAP TM, Oracle Transportation Management (OTM), Odoo, and custom SQL databases."
    },
    {
      q: "How does the AI assist with UAE Certificate of Origin and SASO compliance for GCC trade?",
      a: "The AI verifies that manufacturer declarations, Chamber of Commerce digital stamps, and SASO Saber certificates comply with regional GCC customs union standards, preventing cross-border shipment rejections at Ghuwaifat, Hatta, or King Fahd Causeway."
    },
    {
      q: "What security and data privacy safeguards protect our confidential cargo manifests?",
      a: "All logistics telematics and cargo manifests are encrypted in transit (TLS 1.3) and at rest (AES-256). We deploy within isolated UAE cloud regions (AWS UAE / Azure UAE North) with strict access controls, ensuring your proprietary commercial pricing and supplier networks remain 100% confidential."
    },
    {
      q: "What is the typical deployment timeframe for our logistics operations?",
      a: "Core document parsing and automated WhatsApp/email alert pipelines are operational in 3 to 4 weeks. Full end-to-end integration with customs portals and TMS software typically requires 6 to 8 weeks."
    },
    {
      q: "How does Asif Digital's Logistics AI compare to standard freight forwarding software?",
      a: "Standard freight software only stores static records that humans must manually input and track. Asif Digital deploys proactive reasoning AI agents that actively detect document discrepancies, resolve customs bottlenecks, predict arrival delays, and dispatch notifications autonomously."
    },
    {
      q: "Can the AI automate driver dispatching and local UAE warehouse truck scheduling?",
      a: "Yes. The AI connects with warehouse management systems (WMS) to automate loading dock appointments, assign transport jobs to local UAE fleet drivers based on location, and capture digital proof-of-delivery signatures."
    },
    {
      q: "How do we get started with a logistics automation consultation?",
      a: "Call our supply chain technology desk on +971 54 586 6094 or submit your inquiry through our contact page. We will analyze your container volume and present a detailed demurrage reduction roadmap."
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
    "name": "How to Deploy Autonomous Logistics and Demurrage Prevention AI in Dubai",
    "description": "The 5-stage deployment protocol for implementing automated freight and customs AI in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Freight Pipeline & Customs Workflow Audit",
        "text": "We analyze your documentation flows (Bills of Lading, Packing Lists), customs clearing bottlenecks, and port penalty history."
      },
      {
        "@type": "HowToStep",
        "name": "Document Vision AI Configuration",
        "text": "We configure multimodal models to extract HS codes, container numbers, and consignee details with 99.5%+ accuracy."
      },
      {
        "@type": "HowToStep",
        "name": "Customs Portal & TMS Integration",
        "text": "We establish secure API connectors between your TMS, Dubai Trade, and shipping line tracking telemetry."
      },
      {
        "@type": "HowToStep",
        "name": "Automated Demurrage & Exception Alerting",
        "text": "We program real-time WhatsApp alerts that notify operations teams 48 hours before free detention windows expire."
      },
      {
        "@type": "HowToStep",
        "name": "Live Autonomous Execution & Tracking",
        "text": "We activate automated clearance filing, consignee notifications, and 24/7 fleet telemetry dashboards."
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
            <Anchor className="w-4 h-4 text-emerald-400" /> JAFZA &bull; Dubai South &bull; Khalifa Port &bull; GCC Logistics
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Logistics &amp; Supply <br />
            <span className="italic text-white/50 font-normal">Chain AI Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Manual paperwork errors and customs bottlenecks cost UAE freight forwarders hundreds of thousands in demurrage and detention fines. We deploy autonomous AI agents that parse shipping documents in seconds, automate Dubai Trade clearances, and predict freight delays in real-time.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Logistics AI Blueprint <ArrowRight className="w-4 h-4" />
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
            { metric: "99.5%", label: "Bill of Lading Extraction", sub: "Instant Multimodal OCR" },
            { metric: "-85%", label: "Port Demurrage Fines", sub: "Pre-Berth Customs Clearance" },
            { metric: "24/7", label: "Automated WhatsApp Alerts", sub: "Real-Time Consignee Tracking" },
            { metric: "100%", label: "Dubai Trade & Mirsal II", sub: "Automated Portal Connectors" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Demurrage & Delay Risk Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Port Penalty Cost Estimator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate Demurrage Penalty Savings
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When documents are delayed, port storage and container detention penalties accumulate at alarming daily rates. Adjust your monthly shipping volume to see the direct financial impact of autonomous document automation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Import/Export Containers:</span>
                  <span className="text-white font-bold">{monthlyShipments} TEUs / month</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="5" 
                  value={monthlyShipments} 
                  onChange={(e) => setMonthlyShipments(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Daily Demurrage/Detention Fee:</span>
                  <span className="text-white font-bold">AED {avgDemurrageFeePerDay} / day</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="1200" 
                  step="50" 
                  value={avgDemurrageFeePerDay} 
                  onChange={(e) => setAvgDemurrageFeePerDay(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">% of Containers Experiencing Paperwork Delay:</span>
                  <span className="text-white font-bold">{delayedShipmentRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  step="5" 
                  value={delayedShipmentRate} 
                  onChange={(e) => setDelayedShipmentRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Demurrage Savings
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  AED {monthlyDemurrageSavings.toLocaleString()} <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Prevented Delayed TEUs:</span>
                  <span className="text-white text-sm font-bold">~{delayedShipmentsCount - automatedDelayedCount} containers / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Cost Avoidance:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {annualDemurrageSavings.toLocaleString()} / yr</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Request Logistics AI Demo <ArrowRight className="w-4 h-4" />
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
            How Autonomous Logistics AI Prevents Critical Bottlenecks
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Logistics Operation</th>
                <th className="py-4 px-4 text-white/40">Manual Paperwork Teams</th>
                <th className="py-4 px-4 text-white/40">Standard TMS Software</th>
                <th className="py-4 px-4 text-white/40">Outsourced Clearing Agent</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Autonomous Logistics AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bill of Lading Extraction</td>
                <td className="py-5 px-4 text-red-400">Manual re-typing (45 mins)</td>
                <td className="py-5 px-4 text-yellow-400">Basic template OCR</td>
                <td className="py-5 px-4 text-yellow-400">Next-day processing</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Sub-10s Multimodal AI Extraction</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Dubai Trade &amp; Customs Filing</td>
                <td className="py-5 px-4 text-red-400">Manual portal logins</td>
                <td className="py-5 px-4 text-red-400">No automation</td>
                <td className="py-5 px-4 text-yellow-400">Business hours only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Autonomous Pre-Berth Filing (24/7)</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Demurrage Penalty Alerts</td>
                <td className="py-5 px-4 text-red-400">Discovered after invoice</td>
                <td className="py-5 px-4 text-yellow-400">Manual spreadsheet tracking</td>
                <td className="py-5 px-4 text-yellow-400">Reactive notification</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Predictive 48hr Pre-Expiry WhatsApp Escalation</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Consignee Milestone Updates</td>
                <td className="py-5 px-4 text-red-400">Frequent 'Where is my cargo?' calls</td>
                <td className="py-5 px-4 text-yellow-400">Generic email blast</td>
                <td className="py-5 px-4 text-yellow-400">Phone updates</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Automated WhatsApp Live Tracking Links</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Multimodal Rerouting</td>
                <td className="py-5 px-4 text-red-400">None (waits for delay)</td>
                <td className="py-5 px-4 text-red-400">No predictive modeling</td>
                <td className="py-5 px-4 text-yellow-400">Manual broker search</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">AI Cost-Time Optimization (Sea/Air/Road)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Logistics AI Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Logistics AI Suite
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our Supply Chain Automation Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Ship className="w-6 h-6 text-emerald-400" />,
                title: "Multimodal Shipping Document Parsing",
                desc: "Instant computer vision extraction of Bills of Lading, Packing Lists, Certificates of Origin, and Commercial Invoices across all global ocean and air carriers."
              },
              {
                icon: <Building2 className="w-6 h-6 text-emerald-400" />,
                title: "Dubai Trade & Mirsal II Integration",
                desc: "Automated customs declaration preparation, HS code validation, duty calculations, and real-time clearance status synchronization."
              },
              {
                icon: <AlertTriangle className="w-6 h-6 text-emerald-400" />,
                title: "Predictive Demurrage Prevention Engine",
                desc: "Real-time container detention countdown timers that trigger high-priority alerts to dispatch teams before free port storage expires."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Automated WhatsApp Consignee Updates",
                desc: "Direct WhatsApp notifications dispatching container discharge timestamps, customs clearance approvals, and live delivery tracking links."
              },
              {
                icon: <Truck className="w-6 h-6 text-emerald-400" />,
                title: "Fleet Dispatch & Digital POD Capture",
                desc: "Automated driver job assignment based on real-time UAE traffic and digital glass-signature Proof of Delivery (POD) archiving."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "GCC Cross-Border SASO & Saber Compliance",
                desc: "Automates SASO Saber compliance verification and GCC customs union paperwork for frictionless transport through Saudi and Oman borders."
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
            Implementation Lifecycle
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Logistics AI Deployment Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Operations Audit", text: "We inspect your shipping document pipelines, customs clearing bottlenecks, and port penalty history." },
            { step: "02", title: "Document AI Setup", text: "We train vision models on your specific carrier Bills of Lading, Packing Lists, and customs invoices." },
            { step: "03", title: "Portal Integration", text: "We configure secure connectors between your TMS, Dubai Trade, and shipping tracking webhooks." },
            { step: "04", title: "Alert Telemetry", text: "We calibrate real-time WhatsApp alerts for customs approvals, vessel delays, and demurrage countdowns." },
            { step: "05", title: "Live Deployment", text: "We activate autonomous processing with human supervisor oversight and 24/7 tracking dashboards." }
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
              Supply Chain AI Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE logistics and freight executives need to know about autonomous supply chain automation and demurrage prevention.
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
            Eliminate Demurrage &amp; Delays
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Automate Your UAE Freight Operations.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Eliminate manual document entry, automate Dubai Trade customs clearances, and keep containers moving without penalty. Speak directly with our supply chain AI specialist in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book Logistics AI Demo <ArrowRight className="w-4 h-4" />
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
