"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cpu, Lock, 
  BarChart3, LineChart, CheckCircle2, Bot, Layers, 
  HelpCircle, Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AiConsultingUAE() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const faqs = [
    {
      q: "What does your AI consulting in the UAE include?",
      a: "Our AI consulting services include a comprehensive AI readiness assessment, process mapping audits, tool selection guidance, custom LLM strategy, and a detailed implementation roadmap tailored to your Dubai or Abu Dhabi business operations."
    },
    {
      q: "How does an AI readiness assessment benefit my UAE business?",
      a: "An AI readiness assessment analyzes your current data structure, employee workflows, and legacy systems to identify exactly where AI can save costs, automate customer responses, or optimize lead acquisition in Dubai."
    },
    {
      q: "Do you consult on AI security and compliance under UAE law?",
      a: "Yes. Our AI consulting in Dubai includes reviewing your data sovereignty setup to ensure your models comply with UAE Federal Decree-Law No. 45 on Personal Data Protection."
    },
    {
      q: "What is the typical duration of an AI consulting engagement?",
      a: "Our initial AI strategy consulting sprints in Dubai take between 1 to 2 weeks, during which we deliver a complete, actionable AI roadmap for your business."
    },
    {
      q: "How do you help us choose the right AI tools?",
      a: "We assess available software options (from open-source LLMs to SaaS products) based on your budget, privacy needs, and system requirements in the UAE, recommending the exact stack that delivers the highest ROI."
    }
  ];

  const consultingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Consulting UAE",
    "serviceType": "AI Consulting & Strategy",
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
    "description": "Bespoke AI consulting in the UAE. We provide AI readiness audits, tool selection, compliance checks, and operational roadmaps for Dubai businesses."
  };

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="AI Consulting UAE | Custom AI Strategy & Roadmaps | Asif Digital"
        description="Get strategic AI consulting in the UAE. We deliver AI readiness assessments, custom tool selection, and implementation roadmaps for businesses in Dubai."
        canonical="https://www.asifdigital.agency/ai-consulting-uae"
        schema={consultingSchema}
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
            Operational Strategy & Audits
          </span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            AI Consulting<br/>
            <span className="text-white/60 italic font-light tracking-normal">UAE.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Stop guessing. Build a clear, structured roadmap for operational growth. We provide expert <strong>AI consulting in the UAE</strong> to guide Dubai businesses in tool selection, custom model training, and workflow automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Book Your Free AI Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* What AI Consulting Includes */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              What AI Consulting<br/>Includes.
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-6">Strategic Alignment</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              Many businesses deploy AI tools without a clear plan, wasting time and resources. Our specialized <strong>ai consulting uae</strong> service guides your organization through a structured framework, starting with process mapping and data readiness audits in Dubai.
            </p>
            <p>
              We evaluate your existing infrastructure, employee workflows, and CRM systems, determining where AI integrations can save the most operational hours.
            </p>
            <p>
              Whether you need to design a custom LLM strategy in Abu Dhabi or deploy automated WhatsApp customer support agents, our AI consultants ensure your project is built on solid architectural foundations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Strategic Pillars</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-8">AI Strategy Dubai.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">We deliver tactical AI consultation and actionable blueprints for Dubai companies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <BarChart3 className="w-8 h-8 text-white/60" />, 
                title: "AI Readiness Assessments", 
                desc: "We analyze your business data, software stack, and workflows to map exactly how and where AI can be integrated to increase margins in the UAE." 
              },
              { 
                icon: <Layers className="w-8 h-8 text-white/60" />, 
                title: "AI Tool Selection & Stack Design", 
                desc: "Choose the right technologies. We guide you in selecting models, vector databases, API platforms, and security options suitable for Dubai businesses." 
              },
              { 
                icon: <LineChart className="w-8 h-8 text-white/60" />, 
                title: "AI Roadmaps", 
                desc: "Get an actionable, step-by-step roadmap to guide your team's development sprints. We outline timelines, cost projections, and expected ROI in the UAE." 
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

      {/* SMEs vs Enterprise in Dubai */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="micro-label block mb-6">Target Segments</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">AI Consulting for<br/>SMEs & Enterprise</h2>
            <div className="space-y-8 text-white/50 font-light text-lg leading-relaxed">
              <p>
                A small real estate firm has different automation needs than a major logistics provider in the GCC. Our <strong>ai consulting dubai</strong> team designs custom strategies optimized for your specific size and industry vertical.
              </p>
              <p>
                For SMEs in the UAE, we prioritize low-code setups and fast ROI. For enterprises, we design robust sovereign cloud databases, fine-tune models locally, and focus on deep CRM integrations.
              </p>
            </div>
          </div>
          <div className="p-10 border border-white/5 bg-black rounded-3xl">
            <h3 className="text-2xl font-serif mb-8">What ROI to Expect</h3>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              When you invest in custom AI consulting in the UAE, you lay the foundation for huge operational savings:
            </p>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500/70" />
                <span>Up to 70% reduction in customer response times</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500/70" />
                <span>Automated lead scoring and qualification</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500/70" />
                <span>Unified data pipelines for business intelligence</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <HelpCircle className="w-12 h-12 text-white/25 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Frequently Asked Questions</h2>
            <p className="text-white/40">Answers to common questions about AI strategy and roadmaps in the UAE.</p>
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
          <h2 className="text-4xl md:text-7xl font-serif mb-8">Formulate Your AI Strategy</h2>
          <p className="text-white/50 font-light text-lg mb-12 max-w-xl mx-auto">
            Book your free AI consultation with Asif Digital. Let us help you assess your systems, choose the right tools, and construct a detailed AI roadmap for your UAE business.
          </p>
          <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            Book your free AI consultation with Asif Digital
          </Link>
        </div>
      </section>
    </div>
  );
}
