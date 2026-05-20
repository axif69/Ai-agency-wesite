"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cpu, Lock, 
  MessageSquare, Users, Phone, CheckCircle2, Bot, Target, 
  HelpCircle, Sparkles, Terminal
} from "lucide-react";
import Link from "next/link";

export default function AiAgentsDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const faqs = [
    {
      q: "What is an AI agent and how does it differ from a standard chatbot?",
      a: "A standard chatbot follows static, rules-based programming to answer pre-determined questions. An AI agent is autonomous: it uses advanced large language models (LLMs) to reason, make decisions, use external tools (like checking a CRM or sending an email), and execute multi-step workflows to solve complex customer inquiries in Dubai."
    },
    {
      q: "Can AI agents speak and write in Arabic?",
      a: "Yes. Our AI agents are built with advanced multilingual support, specifically optimized for Khaleeji Arabic and English. They can switch languages seamlessly in real-time, making them perfect for businesses in Dubai and the wider UAE."
    },
    {
      q: "Which systems and CRMs can your AI agents integrate with?",
      a: "We integrate AI agents directly into your existing software stack. This includes popular CRMs like Salesforce, HubSpot, Zoho, and properties databases, as well as communication channels like WhatsApp, email, Instagram, and custom web platforms."
    },
    {
      q: "How long does it take to deploy an AI agent for my Dubai business?",
      a: "A standard custom AI agent deployment in Dubai takes between 2 to 4 weeks. We start with a rapid prototype within the first week so you can test its logic before it goes live to your customers."
    },
    {
      q: "What is the cost of running an AI agent compared to a human employee in the UAE?",
      a: "While a mid-level office employee in Dubai costs thousands of dirhams monthly, an AI agent operates 24/7 for a fraction of the cost, with zero overhead, zero visa costs, and instant scaling capabilities."
    }
  ];

  const agentSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Agents Dubai",
    "serviceType": "Autonomous AI Agent Development & Workflow Automation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital Agency",
      "url": "https://www.asifdigital.agency"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Deploy autonomous B2B sales agents, WhatsApp AI bots, and custom lead qualification agents designed for Dubai businesses."
  };

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="AI Agents Dubai | Autonomous Sales & Support Agents | Asif Digital"
        description="Deploy autonomous B2B sales agents, WhatsApp bots, and custom AI agents in Dubai. Automate support, voice calling, and lead qualification 24/7 in the UAE."
        canonical="https://www.asifdigital.agency/ai-agents-dubai"
        schema={agentSchema}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.01] rounded-full blur-[150px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-6xl relative z-10">
          <span className="micro-label block mb-8 text-white/30 tracking-[1em] uppercase text-[10px] font-bold">
            Autonomous Digital Workforce
          </span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            AI Agents<br/>
            <span className="text-white/60 italic font-light tracking-normal">Dubai.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Scale your UAE operations 24/7 without growing your payroll. Deploy intelligent <strong>AI agents in Dubai</strong> that handle B2B sales, WhatsApp customer responses, and automated phone calls.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Book Your Free AI Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* What are AI Agents Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              What are<br/>AI Agents?
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-6">Autonomous Reasoning</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              Unlike old, basic chatbots that only answer from pre-written menus, modern <strong>AI agents in Dubai</strong> operate autonomously. They can think, search your databases, check inventory, and write responses.
            </p>
            <p>
              By leveraging custom integrations, an AI agent can log into your CRM, update lead statuses, schedule meetings, and email proposals. We build these systems in Dubai to handle the repetitive operational tasks of your business.
            </p>
            <p>
              This means your UAE business can scale without limits, responding to customer leads in less than 30 seconds, day or night.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Core Capabilities</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-8">Capabilities.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">We architect AI agent solutions in Dubai that cover every major communication channel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <MessageSquare className="w-8 h-8 text-white/60" />, 
                title: "WhatsApp AI Agents", 
                desc: "Turn your WhatsApp chatbot in Dubai into an active sales closer. Respond instantly, share project PDFs, and qualify leads in English and Arabic." 
              },
              { 
                icon: <Phone className="w-8 h-8 text-white/60" />, 
                title: "AI Voice Agents", 
                desc: "Scale your phone outreach with an AI voice agent in Dubai. Handle customer follow-ups, confirm booking details, and run outbound calls naturally." 
              },
              { 
                icon: <Users className="w-8 h-8 text-white/60" />, 
                title: "AI Lead Qualification", 
                desc: "Our AI lead qualification agents filter real estate and retail leads in the UAE. Instantly identify high-intent prospects and transfer them to your human team." 
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group">
                <div className="mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Protocol */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="micro-label block mb-4">Our Process</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Deploy in 2 Weeks.</h2>
          <p className="text-white/40 max-w-2xl mx-auto">We take your business from manual processes to AI-powered automation in a fortnight.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Map Workflows", desc: "We sit down with your Dubai team to document your manual bottlenecks and outline how the AI agent will solve them." },
            { step: "02", title: "Train and Integrate", desc: "We train the AI model on your documents, hook it up to your UAE database, and configure custom tool integrations." },
            { step: "03", title: "Launch and Scale", desc: "We run final tests and deploy the AI agent live. You see instant operational efficiency gains in your Dubai business." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl">
              <div className="text-4xl font-serif mb-6 opacity-30">{item.step}</div>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <HelpCircle className="w-12 h-12 text-white/25 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Frequently Asked Questions</h2>
            <p className="text-white/40">Answers to common questions about deploying AI agents in Dubai.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-8 border border-white/5 bg-black rounded-3xl">
                <h4 className="text-lg font-bold mb-4 flex items-start gap-4">
                  <span className="text-white/30 font-serif">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-sm text-white/40 leading-relaxed font-light pl-8 border-l border-white/10">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5 bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif mb-8">Ready to Automate?</h2>
          <p className="text-white/50 font-light text-lg mb-12 max-w-xl mx-auto">
            Book your free AI consultation with Asif Digital. Let us help you select, build, and deploy the perfect AI agent for your Dubai business.
          </p>
          <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            Book your free AI consultation with Asif Digital
          </Link>
        </div>
      </section>
    </div>
  );
}
