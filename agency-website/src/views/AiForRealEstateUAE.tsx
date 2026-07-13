"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, Key, Shield, Zap, Globe, MessageSquare, 
  Phone, Code, CheckCircle, Database, Server, Settings, Wrench, FileText, Star, Sparkles
} from "lucide-react";
import React from "react";

export default function AiForRealEstateUAE() {
  // Ingest hidden JSON-LD schema for AEO/GEO indexing
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is AI used in UAE real estate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI is used in UAE real estate to automate lead qualification, generate high-converting property listings, run bilingual WhatsApp client assistants, manage tenancy renewals, and predict property valuation trends using market data."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of AI for property developers in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property developers in Dubai use AI to identify high-intent overseas buyers, match investors with specific off-plan inventories, automate marketing assets, and draft legal compliance paperwork instantly."
        }
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      
      {/* Inject JSON-LD Schema (Hidden to humans, perfect for AI Crawlers) */}
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
            AI property Intelligence GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] font-serif leading-[1.05] tracking-tight mb-8">
            AI for Real Estate <br />
            <span className="italic text-white/50 font-light tracking-normal">in the UAE.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
            Unlock the power of artificial intelligence to generate premium property leads, qualify international buyers, and run your daily operations on autopilot. Simple, clear, and built to increase your sales.
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

      {/* ── 2. visual banner ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto my-12">
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.01] aspect-[21/9] relative group">
          <img 
            src="/images/dubai_real_estate_ai_dashboard.png" 
            alt="AI Real Estate visual telemetry layout by Asif Digital" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-[1.02] transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>
      </section>

      {/* ── 3. Simple, Layman Overview Cards ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Market Transformation</span>
          <h2 className="text-4xl md:text-6xl font-serif">How AI Helps You Sell More Property</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Find Active Investors",
              desc: "Instead of cold calling, our AI scans global digital footprints to identify high-net-worth investors in Europe, Asia, and the UK who are actively searching for UAE off-plan projects, putting your listings in front of them."
            },
            {
              title: "Qualify Buyers 24/7",
              desc: "Our AI systems chat with incoming buyers on WhatsApp in English or Arabic, answering payment questions, checking budgets, and booking viewings so your human agents only speak to serious, ready buyers."
            },
            {
              title: "Draft Listings Instantly",
              desc: "AI engines read property blueprints and generate high-converting, SEO-friendly descriptions for Property Finder and Dubizzle, saving your administrative team hours of manual copywriting."
            }
          ].map((card, i) => (
            <div key={i} className="p-10 border border-white/10 bg-white/[0.01] rounded-[2.5rem] hover:border-green-500/20 hover:scale-[1.02] transition-all duration-500 shadow-2xl">
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest block mb-4">Benefit 0{i+1}</span>
              <h3 className="text-2xl font-serif mb-4">{card.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Detailed Explanations (Layman Rich Copy) ── */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="border-l-4 border-green-500 pl-8">
            <h3 className="text-3xl font-serif mb-4">No Jargon. Just Clear Results for UAE Real Estate.</h3>
            <p className="text-lg text-white/70 font-light leading-relaxed">
              At Asif Digital, we believe technology should be simple. Real estate is about relationships and deals. We use AI to automate the boring, repetitive tasks—like qualifying raw web leads, formatting spreadsheet databases, and answering basic tenancy questions—so your sales team can spend their time doing what they do best: building trust and closing deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            <div className="p-8 border border-white/5 bg-black rounded-3xl">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                <Sparkles className="w-5 h-5" /> What You Get
              </h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Bespoke real estate landing pages that rank on Google</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Automated bilingual (Arabic/English) WhatsApp responders</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Custom CRM data connections with no manual copy-paste</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Full DLD regulation and personal data privacy compliance</li>
              </ul>
            </div>
            <div className="p-8 border border-white/5 bg-black rounded-3xl flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-400">Our Local UAE Experience</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
                  We have built digital solutions for top brokerages and developers across Dubai Marina, Business Bay, Downtown Dubai, and Yas Island. We understand the unique needs of the UAE property market.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl font-serif text-white">20+</span>
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold self-center">Agencies Served in Dubai & Abu Dhabi</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. FAQs ── */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Answers You Need</span>
          <h2 className="text-4xl font-serif text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: "How does AI help real estate agencies in Dubai and the UAE?",
              a: "AI automates the time-consuming tasks like replying to initial web inquiries, qualifying if a buyer has the budget for a specific listing, translating listing details into multiple languages, and mapping off-plan properties for international clients."
            },
            {
              q: "Do I need to hire an IT team to manage this AI system?",
              a: "No. We build, host, and configure everything for you. Our solutions connect directly to your existing systems (such as Salesforce, HubSpot, or WhatsApp Business) so your agents can use it with zero technical training."
            },
            {
              q: "Is client data kept safe and legal in the UAE?",
              a: "Yes. All our AI data pipelines are fully compliant with the UAE Federal Decree-Law No. 45 on Personal Data Protection, keeping your client and contract records secure, private, and within your control."
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
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 block mb-6">Connect With Our Team</span>
          <h2 className="text-4xl md:text-7xl font-serif tracking-tight mb-8">
            Ready to Automate Your <br />
            <span className="italic text-black/50 font-light tracking-normal">Real Estate Business?</span>
          </h2>
          <p className="text-black/60 font-light text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Book a 15-minute consultation. We will show you exactly how AI can qualify your leads, format your property databases, and save your agents hours of work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              Message Us on WhatsApp <MessageSquare className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+971545866094" 
              className="bg-transparent text-black border border-black/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3"
            >
              Call Us: +971 54 586 6094 <Phone className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
