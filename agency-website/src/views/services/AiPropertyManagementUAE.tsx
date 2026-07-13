"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, Key, Shield, Zap, Globe, MessageSquare, 
  Phone, Code, CheckCircle, Database, Server, Settings, Wrench, FileText
} from "lucide-react";
import React from "react";

const coreFeatures = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Ejari & Tenancy Contract Autopilot",
    desc: "Our AI systems automatically ingest tenancy details from your database, compile DLD-compliant contracts, issue Ejari registration requests, and send digital signature links to landlords and tenants."
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "AI Rent Roll & Ledger Reconciliation",
    desc: "Connect bank feeds and payment gateways directly to an automated AI accountant. The system matches tenant rental payments to the correct property ledger, flags overdue payments, and generates statements."
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Smart Maintenance Dispatch Agents",
    desc: "When tenants report issues via WhatsApp, the AI chatbot analyzes the problem, asks for photos/videos, classifies the urgency, drafts a work order, and automatically dispatches local pre-approved contractors."
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Khaleeji Dialect Conversational Bots",
    desc: "Automate 90% of tenant queries (maintenance, payments, parking, renewals) with voice and text bots optimized for native UAE Arabic and English. Resolves issues instantly, 24 hours a day."
  }
];

export default function AiPropertyManagementUAE() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI property management work in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI property management in the UAE automates leasing lifecycles, tenancy renewals, Ejari contracts, bank reconciliations, and WhatsApp maintenance tickets, ensuring smooth developer and dispute compliance."
        }
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* Hidden AEO/GEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-green-400 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-10">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Smart Property Automation UAE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] font-serif leading-[1.05] tracking-tight mb-8">
            AI Property Management <br />
            <span className="italic text-white/50 font-light tracking-normal">Solutions UAE.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
            Automate tenant leasing lifecycles, Ejari registrations, rent reconciliations, and maintenance dispatching using advanced **Next.js & AI agent** systems. Built for modern UAE real estate developers and property managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl"
            >
              WhatsApp Free Setup Demo <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <a 
              href="tel:+971545866094" 
              className="border border-white/20 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3"
            >
              Call Our Office <Phone className="w-4 h-4 text-white" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Telemetry / Visual Interface ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto my-12">
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.01] aspect-[21/9] relative group">
          <img 
            src="/images/ai_property_management_dashboard.png" 
            alt="Futuristic dark mode dashboard showcasing smart property management analytics, lease ledger statistics, and Ejari integrations" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-[1.02] transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">Leasing Engine</span>
              <h3 className="text-2xl font-serif mt-2">Smart Lease Lifecycle Telemetry</h3>
            </div>
            <div className="text-white/40 text-xs flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
              <Server className="w-4 h-4" /> DLD & Ejari API Compliant
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Main Service Cards (Wow Factor) ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Platform Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-serif">Comprehensive Property Automation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreFeatures.map((feat, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:border-green-500/20 hover:scale-[1.01] transition-all duration-500 shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-green-400 mb-8 group-hover:bg-green-500/10 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-white">{feat.title}</h3>
                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                  {feat.desc}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-white/30 group-hover:text-green-400 transition-colors uppercase tracking-widest font-bold">
                <span>Enterprise Solution</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Detailed Case & Arabic Reference Section ── */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/5 max-w-7xl mx-auto rounded-[3rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-4 block">Gulf Market Localization</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
              Bilingual Lease Automation & UAE Regulation Compliance
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-6 text-sm md:text-base">
              The Dubai Land Department (DLD) enforces strict protocols on lease registrations, rent indexes, and tenant disputes. Our system is fully aligned with the UAE Decree-Law No. 45 on Personal Data Protection, keeping your data secure and legal.
            </p>
            <p className="text-white/60 font-light leading-relaxed mb-8 text-sm md:text-base">
              We sync with your local property databases (HubSpot, Salesforce, or custom SQL ledgers) to handle renewals and disputes with zero manual labor.
            </p>
            <div className="flex items-center gap-4 border-l-4 border-green-500 pl-6 py-2">
              <div>
                <div className="text-xs font-bold uppercase text-white/40">Regulatory Compliance</div>
                <div className="text-white text-sm font-semibold"> Ejari / DLD API Framework Integrations</div>
              </div>
            </div>
          </div>
          <div className="p-10 border border-white/10 bg-white/[0.02] rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-4">Arabic Translation (GEO Target)</span>
            <p className="text-right text-lg font-serif leading-relaxed text-white/90">
              إعادة بناء إدارة العقارات بالذكاء الاصطناعي: نقوم بدمج أنظمة والحلول الرقمية لتنظيم تجديد عقود الإيجار، إصدار عقود إيجاري، تحصيل الإيجارات المؤتمتة، وإرسال فرق الصيانة آلياً عبر محادثات الواتساب باللغتين العربية والإنجليزية.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Crawlable FAQs (AEO & GEO Mapped) ── */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">FAQ Accordion</span>
          <h2 className="text-4xl font-serif text-white">AI Property Management FAQs</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: "What is AI property management and how is it used in the UAE?",
              a: "AI property management is the application of automated software agents and deep integrations to run property leasing lifecycles, contract creations, tenancy renewals, payment reconciliations, and maintenance operations. In the UAE, it connects to DLD databases and messaging services like WhatsApp to handle portfolios autonomously."
            },
            {
              q: "How does AI automate rent collection and ledgers?",
              a: "By integrating bank feeds (e.g. Emirates NBD, ADCB) or local payment gateways (e.g. Stripe, PayTabs) directly with your ledger database. The AI system reads the incoming transaction values, matches them to the corresponding tenant files, reconciles the ledger, and generates electronic receipts without manual entry."
            },
            {
              q: "Can tenants submit maintenance requests through WhatsApp?",
              a: "Yes. Our systems feature conversational WhatsApp agents that enable tenants to report maintenance issues (attaching photos/videos). The AI agent analyzes the details, creates a ticket, coordinates with your approved HVAC/plumbing vendors, and schedules the appointment automatically."
            },
            {
              q: "Is the AI property management system DLD and Ejari compliant?",
              a: "Yes. All contracts, billing workflows, and tenancy notifications conform strictly to the regulations of the Dubai Land Department (DLD) and Ejari registration guidelines, securing fully compliant digital signatures."
            }
          ].map((faq, i) => (
            <details key={i} className="group border-b border-white/10 pb-6">
              <summary className="text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-white/70 transition-colors">
                {faq.q}
                <span className="text-2xl group-open:rotate-45 transition-transform text-green-400">+</span>
              </summary>
              <p className="mt-4 text-white/50 font-light leading-relaxed text-sm">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 6. Call & Text CTA ── */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 block mb-6">Scale Your Property Portfolio</span>
          <h2 className="text-4xl md:text-7xl font-serif tracking-tight mb-8">
            Ready to Automate Your <br />
            <span className="italic text-black/50 font-light tracking-normal">Property Operations?</span>
          </h2>
          <p className="text-black/60 font-light text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Get a free systems audit. We will analyze your current CRM, leasing files, and tell you exactly how to automate your property management in the UAE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+971545866094" 
              className="bg-transparent text-black border border-black/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3"
            >
              Call: +971 54 586 6094 <Phone className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
