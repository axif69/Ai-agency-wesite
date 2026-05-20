"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cpu, Lock, 
  MessageSquare, LayoutGrid, CheckCircle2, Bot, Languages, 
  HelpCircle, Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AiChatbotsDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const faqs = [
    {
      q: "What is the difference between a website chatbot and a WhatsApp chatbot in Dubai?",
      a: "A website chatbot lives directly on your landing pages and handles web-based user queries, pricing FAQs, and support tickets. A WhatsApp chatbot in Dubai operates inside the WhatsApp Business API, allowing UAE customers to text your business directly, check order status, browse catalogues, and buy products."
    },
    {
      q: "How do your chatbots support both Arabic and English?",
      a: "Our chatbots are powered by advanced LLMs trained on local dialects. This ensures your arabic chatbot in dubai understands Khaleeji Arabic slang, business phrasing, and formatting, switching between English and Arabic dynamically."
    },
    {
      q: "Do you integrate the chatbot with HubSpot or Salesforce CRMs?",
      a: "Yes. Our chatbot development in the UAE includes direct integrations into major CRM systems like Salesforce, HubSpot, Zoho, and custom ERP databases to sync lead data automatically."
    },
    {
      q: "What is the typical development cost for a custom AI chatbot in Dubai?",
      a: "The cost depends on the workflow complexity and required integrations. We provide a custom quote for every chatbot development project in Dubai. Book your free AI consultation with Asif Digital for a personalized estimate."
    },
    {
      q: "Do your chatbots support human-in-the-loop fallback?",
      a: "Yes. If the AI chatbot encounters a highly complex query or a VIP lead in Dubai, it can flag the conversation and seamlessly hand it off to one of your human agents via email or CRM notifications."
    }
  ];

  const chatbotSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Chatbot Development Dubai",
    "serviceType": "AI Chatbot Development & Multilingual Conversational Solutions",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital Agency",
      "url": "https://www.asifdigital.agency"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Custom AI chatbot development in Dubai, specializing in WhatsApp chatbots, website customer support bots, and bilingual English/Arabic setups."
  };

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="AI Chatbot Development Dubai | Custom WhatsApp & Web Bots | Asif Digital"
        description="Get custom AI chatbot development in Dubai. Build multilingual Arabic & English chatbots, website support bots, and WhatsApp chatbots in the UAE."
        canonical="https://www.asifdigital.agency/ai-chatbots-dubai"
        schema={chatbotSchema}
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
            Multilingual Conversational AI
          </span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            AI Chatbot<br/>
            <span className="text-white/60 italic font-light tracking-normal">Development Dubai.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Engage your customers instantly in English and Arabic. We offer bespoke <strong>AI chatbot development in Dubai</strong> to build high-performance website chatbots and WhatsApp bots for UAE businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Book Your Free AI Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* WhatsApp Chatbot Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              WhatsApp Chatbots<br/>for UAE Business
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-6">Channel Authority</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              In Dubai, relationships and fast communication are key. Deploying a custom <strong>whatsapp chatbot in dubai</strong> puts your brand directly into your customers' mobile messaging app, where they spend most of their time.
            </p>
            <p>
              Our chatbot systems can automatically answer FAQs, qualify potential leads, send brochures, and book viewings or appointments. By automating these tasks, you capture and convert high-intent customers instantly in the UAE.
            </p>
            <p>
              We hook up the WhatsApp Business API directly to your systems, ensuring fully compliant and secure messaging under UAE guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Website Support Chatbots */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="micro-label block mb-6">Web Optimization</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Website Chatbots for Support</h2>
              <div className="space-y-8 text-white/50 font-light text-lg leading-relaxed">
                <p>
                  A standard website chatbot in Dubai keeps your sales and support desk active 24/7. When a user lands on your site, our custom AI chatbot engages them within 5 seconds, answering questions about your services, pricing, or locations.
                </p>
                <p>
                  By using real-time retrieval-augmented generation (RAG), the bot answers queries based purely on your company documents, ensuring zero hallucinations and highly accurate customer support.
                </p>
              </div>
            </div>
            <div className="p-10 border border-white/5 bg-black rounded-3xl">
              <h3 className="text-2xl font-serif mb-8 flex items-center gap-3">
                <Languages className="w-6 h-6 text-white/60" /> Multilingual Capabilities
              </h3>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                Our builds support native <strong>arabic chatbot dubai</strong> solutions alongside English, switching languages in real-time as the customer writes.
              </p>
              <div className="flex gap-4">
                <span className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white/40">English Support</span>
                <span className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white/40">Arabic (Khaleeji) Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verticals Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="micro-label block mb-4">Vertical Focus</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Built for UAE Verticals.</h2>
          <p className="text-white/40 max-w-2xl mx-auto">We provide tailored chatbot development in the UAE for specific sectors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Real Estate Chatbots", desc: "Automate real estate lead capture in Dubai. Capture investor budgets, share floor plans, and book property viewings instantly." },
            { title: "Retail & E-commerce", desc: "Enable automated customer order tracking, handle shipping FAQs, and process shopping inquiries directly inside WhatsApp." },
            { title: "Hospitality & Clinics", desc: "Manage bookings, confirm appointments, and send directions to clinics or hotels automatically in Dubai." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-white/5 bg-black rounded-3xl">
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Build Process */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Our Methodology</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Chatbot Build Process.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">From scoping to integration, we handle the entire build lifecycle in Dubai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Intake & Strategy", desc: "We define user intents, collect training documents, and establish connection scopes." },
              { step: "02", title: "Prompt Engineering", desc: "We write instructions, set guardrails, and train LLMs to represent your UAE brand voice." },
              { step: "03", title: "CRM Integration", desc: "We connect the chatbot to Salesforce, HubSpot, or custom databases for direct syncs." },
              { step: "04", title: "Testing & Launch", desc: "We run quality checks, verify security compliance, and deploy live in Dubai." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/5 bg-black rounded-3xl">
                <div className="text-3xl font-serif mb-4 opacity-30">{item.step}</div>
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <HelpCircle className="w-12 h-12 text-white/25 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Frequently Asked Questions</h2>
            <p className="text-white/40">Answers to common questions about custom chatbot development in Dubai.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl">
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
          <h2 className="text-4xl md:text-7xl font-serif mb-8">Deploy Your Custom Bot</h2>
          <p className="text-white/50 font-light text-lg mb-12 max-w-xl mx-auto">
            Book your free AI consultation with Asif Digital. Let us engineer a powerful website or WhatsApp chatbot for your Dubai business to boost your customer response times.
          </p>
          <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            Book your free AI consultation with Asif Digital
          </Link>
        </div>
      </section>
    </div>
  );
}
