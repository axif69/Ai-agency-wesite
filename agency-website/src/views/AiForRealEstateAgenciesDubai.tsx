"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, Key, Shield, Zap, Globe, MessageSquare, 
  Phone, Code, CheckCircle, Database, Server, Settings, Wrench, FileText, Star, Cpu, Megaphone
} from "lucide-react";
import React from "react";

export default function AiForRealEstateAgenciesDubai() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can AI help Dubai real estate agencies generate leads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI helps Dubai real estate agencies generate leads by running micro-targeted ad campaigns, capturing leads instantly from property portals, and qualifying buyers using automated WhatsApp agents."
        }
      },
      {
        "@type": "Question",
        "name": "What is AI virtual staging for Dubai properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI virtual staging uses advanced image generation models to furnish empty or shell-and-core properties in Dubai, allowing international buyers to visualize luxury finished interiors."
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
            Dubai Agency Growth Systems
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] font-serif leading-[1.05] tracking-tight mb-8">
            AI for Real Estate <br />
            <span className="italic text-white/50 font-light tracking-normal">Agencies in Dubai.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
            Accelerate your sales pipeline, automate listing creation, and engage international investors instantly. We build easy-to-use AI tools designed specifically for Dubai real estate agencies.
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
            src="/images/ai_whatsapp_broker_chat.png" 
            alt="AI WhatsApp Broker Chat system representation by Asif Digital" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-[1.02] transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>
      </section>

      {/* ── 3. Simple, Layman Card Modules ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Core Agency Tools</span>
          <h2 className="text-4xl md:text-6xl font-serif">Simple AI Features For Your Agents</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "AI WhatsApp Lead Qualifier",
              desc: "Incoming leads from Property Finder, Bayut, and Facebook are immediately qualified via WhatsApp. The AI checks their budget, area preferences, and readiness before passing them to your sales agents."
            },
            {
              title: "AI Listing Generator",
              desc: "Upload a property blueprint or layout, and our AI writes high-converting, localized property listings tailored for Dubai real estate portals, saving hours of manual data entry."
            },
            {
              title: "AI Virtual Staging & Video",
              desc: "Showcase empty shell-and-core units as fully staged luxury apartments in seconds. Generate cinematic tour videos to secure deposits from overseas buyers without requiring a physical visit."
            }
          ].map((card, i) => (
            <div key={i} className="p-10 border border-white/10 bg-white/[0.01] rounded-[2.5rem] hover:border-green-500/20 hover:scale-[1.02] transition-all duration-500 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest block mb-4">Tool 0{i+1}</span>
                <h3 className="text-2xl font-serif mb-4 text-white">{card.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{card.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-xs text-white/30">
                100% Automatic
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Detailed Layman Copy ── */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="border-l-4 border-green-500 pl-8">
            <h3 className="text-3xl font-serif mb-4">Increase Lead Inquiries and Call Volume.</h3>
            <p className="text-lg text-white/70 font-light leading-relaxed">
              Real estate clients in Dubai expect immediate replies. If an agent takes an hour to reply, the client has already messaged three other agencies. Our AI tools ensure your agency responds in under 60 seconds, 24 hours a day, qualifying leads and booking viewings on autopilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            <div className="p-8 border border-white/5 bg-black rounded-3xl">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                <Megaphone className="w-5 h-5" /> How it grows your agency
              </h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Immediate response to late-night and international leads</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Focus agent time on pre-qualified, high-intent buyers</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Stand out as a premium, technology-forward Dubai agency</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> Higher conversion rates from your monthly advertising budget</li>
              </ul>
            </div>
            <div className="p-8 border border-white/5 bg-black rounded-3xl flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-400">Built for Dubai Agents</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
                  Our systems are designed to be extremely easy to use. No complicated software, logins, or codes. Everything integrates into your current CRM and WhatsApp numbers so agents see updates instantly.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl font-serif text-white">24/7</span>
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold self-center">Lead Coverage & Automated Booking</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. FAQs ── */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">FAQ</span>
          <h2 className="text-4xl font-serif text-white">Agency AI FAQs</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: "How does the WhatsApp qualifier bot assign leads to agents?",
              a: "Once a lead is qualified (checking budget and area), the system assigns the lead to the specialized agent for that neighborhood (e.g. Dubai Hills, Palm Jumeirah) and sends a notification directly to the agent's phone."
            },
            {
              q: "Can the AI write listings in different languages?",
              a: "Yes. The AI listing generator automatically formats listings in both English and Arabic, optimizing keywords for UAE portal search engines."
            },
            {
              q: "Do we need Meta approval for the WhatsApp automation?",
              a: "Yes, we handle the entire official Meta Business API setup, verification, and template approvals so you don't have to worry about the technical setup."
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
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 block mb-6">Scale Your Agency Sales</span>
          <h2 className="text-4xl md:text-7xl font-serif tracking-tight mb-8">
            Ready to Automate Your <br />
            <span className="italic text-black/50 font-light tracking-normal">Lead Capture?</span>
          </h2>
          <p className="text-black/60 font-light text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Get a free demo and consultation. We will show you exactly how AI can qualify your leads and increase your agency's closing rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              WhatsApp Our Team <MessageSquare className="w-4 h-4 text-white" />
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
