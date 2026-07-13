"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, Key, Shield, Zap, Globe, MessageSquare, 
  Phone, Code, CheckCircle, Database, Server, Settings, Wrench, FileText, Star, Cpu, HeartHandshake
} from "lucide-react";
import React from "react";

export default function RealEstateDigitalSolutionsUAE() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are digital solutions for real estate agencies in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Digital solutions for real estate include custom CRM setups (like HubSpot or Salesforce), automated lead routing, off-plan portal developments, SMS and WhatsApp integrations, and high-performance agency websites."
        }
      },
      {
        "@type": "Question",
        "name": "How do CRM integrations help real estate brokers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CRM integrations automatically capture leads from property portals like Dubizzle and Property Finder, assign them to the correct agent instantly, and track client interactions in one centralized system, eliminating manual copy-pasting."
        }
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      
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
            Digital Infrastructure UAE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] font-serif leading-[1.05] tracking-tight mb-8">
            Real Estate Digital <br />
            <span className="italic text-white/50 font-light tracking-normal">Solutions UAE.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
            Connect your property listings, customer databases, and automated workflows into one simple, fast digital system. Scale your UAE brokerage with custom technology built to generate revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl"
            >
              WhatsApp Free consultation <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <a 
              href="tel:+971545866094" 
              className="border border-white/20 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3"
            >
              Call Our Strategist <Phone className="w-4 h-4 text-white" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Visual Banner ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto my-12">
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.01] aspect-[21/9] relative group">
          <img 
            src="/images/sharjah_web_design_hero.png" 
            alt="Sleek real estate portal UI representation by Asif Digital" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-[1.02] transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>
      </section>

      {/* ── 3. Simple, Layman Solution Cards ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Deliverables</span>
          <h2 className="text-4xl md:text-6xl font-serif">Unified Tech for Modern Brokerages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Portal Integrations",
              desc: "Automatically route incoming leads from Property Finder, Dubizzle, Bayut, and your website directly into your CRM. No more manual copy-pasting or delayed follow-ups."
            },
            {
              title: "Custom CRM Setups",
              desc: "We configure Salesforce, HubSpot, or custom databases specifically for the UAE real estate model—tracking landlords, tenants, off-plan inventories, and agent commissions."
            },
            {
              title: "Interactive Web Portals",
              desc: "High-performance agency websites featuring interactive off-plan project maps, direct developer pricing feeds, and smart filtration to keep visitors browsing on your site."
            },
            {
              title: "Workflow Automation",
              desc: "Automate task creation, lease notifications, invoice generations, and marketing broadcasts using custom backend automation tools like n8n and Zapier."
            }
          ].map((card, i) => (
            <div key={i} className="p-8 border border-white/10 bg-white/[0.01] rounded-[2.5rem] hover:border-green-500/20 hover:scale-[1.02] transition-all duration-500 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-4">Solution 0{i+1}</span>
                <h3 className="text-xl font-serif mb-4 text-white">{card.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">{card.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-[9px] uppercase tracking-wider font-bold text-white/20">
                Custom Built
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Detailed Layman Copy ── */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="border-l-4 border-green-500 pl-8">
            <h3 className="text-3xl font-serif mb-4">No Coding Knowledge Required. We Handle Everything.</h3>
            <p className="text-lg text-white/70 font-light leading-relaxed">
              Managing a brokerage is busy enough without dealing with API connections, server setups, or web databases. We act as your outsourced chief technology partner. We connect all your tools together so everything works in harmony, allowing your agents to focus entirely on closing deals and servicing clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            <div className="p-8 border border-white/5 bg-black rounded-3xl">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                <HeartHandshake className="w-5 h-5" /> Why Brokerages Work With Us
              </h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Zero manual copy-pasting between portals and CRM</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Automatic lead assignment based on agent specialization</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Fast, beautiful websites that build authority and trust</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Local support and maintenance based right here in the UAE</li>
              </ul>
            </div>
            <div className="p-8 border border-white/5 bg-black rounded-3xl flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-400">GCC Digital Transformation</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
                  The UAE is leading the world in digital government and paperless transactions. We ensure your business is fully equipped with digital infrastructure that keeps you ahead of market demands and developer updates.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl font-serif text-white">100%</span>
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold self-center">Custom Code & Zero Slow Templates</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. FAQs ── */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">FAQ</span>
          <h2 className="text-4xl font-serif text-white">Digital Solutions FAQs</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: "Can you connect our lead forms directly to our WhatsApp?",
              a: "Yes. We set up automated lead capture that triggers instant notifications to your agents via WhatsApp the second a lead fills out a form on Dubizzle, Property Finder, or your website."
            },
            {
              q: "Which CRMs do you support?",
              a: "We build custom integrations for all major CRMs including HubSpot, Salesforce, Zoho CRM, Property Finder Manager, and custom internal SQL database setups."
            },
            {
              q: "How long does a digital system setup typically take?",
              a: "A standard CRM integration and lead routing automation setup takes between 2 to 4 weeks, depending on the number of portals and agents being configured."
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

      {/* ── 6. CTA Section ── */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 block mb-6">Build Your Digital Moat</span>
          <h2 className="text-4xl md:text-7xl font-serif tracking-tight mb-8">
            Ready to Connect Your <br />
            <span className="italic text-black/50 font-light tracking-normal">Property Systems?</span>
          </h2>
          <p className="text-black/60 font-light text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Speak directly with our digital strategist. We will analyze your current portal layouts, database setups, and tell you exactly how to streamline your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              WhatsApp Our Strategist <MessageSquare className="w-4 h-4 text-white" />
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
