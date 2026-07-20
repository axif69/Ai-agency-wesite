"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowRight, Shield, Cpu, Network, Zap, CheckCircle, Code2, MessageSquare, Search, Workflow } from "lucide-react";

const sovereignPillars = [
  { icon: <Shield className="w-6 h-6" />, title: "Operational Resilience", desc: "We don't just build software; we engineer unshakeable systems. Our mission is to ensure your business remains dominant regardless of market volatility or technical shifts." },
  { icon: <Cpu className="w-6 h-6" />, title: "Neural Architecture", desc: "Every deployment is built on custom reasoning chains. We move beyond generic LLMs to create sovereign intelligence that belongs solely to your organization." },
  { icon: <Network className="w-6 h-6" />, title: "GCC Data Sovereignty", desc: "We are committed to UAE Federal Decree-Law No. 45. All intelligence layers are architected for G42/Azure UAE North residency, ensuring 100% regional compliance." },
  { icon: <Zap className="w-6 h-6" />, title: "Autonomous Yield", desc: "We engineer systems that operate 24/7. Our goal is to eliminate human latency in high-stakes acquisition, allowing your firm to scale at the speed of computation." },
];

const evolution = [
  { year: "2020", title: "Inception", desc: "Asif Digital founded by Asif Khan with a focus on high-performance digital infrastructure for the UAE market." },
  { year: "2022", title: "Agentic Pivot", desc: "Shifted focus from standard marketing to AI-driven automation and early-stage agentic reasoning models." },
  { year: "2024", title: "Sovereign Shift", desc: "Formalized the 'Sovereign AI' framework, prioritizing data residency and locally-hosted intelligence for GCC enterprises." },
  { year: "2025", title: "Architectural Dominance", desc: "Transitioned to an elite AI Architectural Firm, deploying autonomous sales swarms and resilience shields for UHNW and institutional clients." },
];

const teamMembers = [
  {
    name: "Khalfan Obaid",
    role: "Principal AI Architect & Director",
    desc: "Architecting custom AI workflows and leading digital transformation strategies for businesses across the GCC.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=85"
  },
  {
    name: "Tariq Mahmood",
    role: "Lead Web Developer",
    desc: "Specialist in building high-performance Next.js websites, digital storefronts, and reliable custom integrations.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&q=85"
  },
  {
    name: "Sarah Al-Mansoori",
    role: "AI Conversation Designer",
    desc: "Designing multilingual WhatsApp and website assistants that communicate clearly in Arabic and English.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&q=85"
  }
];

const capabilities = [
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "AI Automation & Agents",
    desc: "We map repetitive operational work, connect the right systems, and build governed AI workflows with clear human approval and escalation points.",
    link: "/ai-automation-agency-dubai",
    linkLabel: "Explore AI automation"
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Web Design & Development",
    desc: "Fast, search-ready websites designed to explain your offer, establish trust, and turn qualified visitors into real business enquiries.",
    link: "/services/web-design-dubai-sharjah",
    linkLabel: "Explore web services"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "WhatsApp, CRM & Lead Systems",
    desc: "Connected lead capture, qualification, routing, follow-up, and reporting across the website, WhatsApp, CRM, and sales team.",
    link: "/services/whatsapp-automation-gcc",
    linkLabel: "Explore WhatsApp automation"
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO, AEO & Paid Growth",
    desc: "Commercial content, technical search foundations, landing pages, and accountable campaigns built around qualified demand instead of vanity metrics.",
    link: "/services/seo-agency-dubai-sharjah-uae",
    linkLabel: "Explore search services"
  }
];

const deliverySteps = [
  { step: "01", title: "Discover", desc: "We clarify the business objective, current process, audience, data, systems, constraints, and the result that needs to improve." },
  { step: "02", title: "Architect", desc: "We turn the diagnosis into a practical plan covering customer journeys, integrations, ownership, safeguards, measurement, and delivery priorities." },
  { step: "03", title: "Build & Verify", desc: "Our team designs, develops, connects, and tests the system using real scenarios, documented acceptance criteria, and controlled launch checks." },
  { step: "04", title: "Launch & Improve", desc: "After release, we review usage, failures, conversion evidence, and team feedback so the system becomes more useful over time." }
];

const aboutFaqs = [
  { q: "Where is Asif Digital based?", a: "Asif Digital operates from the UAE and serves organizations across Dubai, Sharjah, Abu Dhabi, and the wider GCC. Project delivery can combine remote collaboration with scheduled local meetings where appropriate." },
  { q: "What types of companies do you work with?", a: "We support ambitious SMEs, professional-services firms, real estate businesses, ecommerce teams, healthcare operators, and enterprise departments that need stronger websites, lead systems, automation, or search visibility." },
  { q: "Do you only provide AI services?", a: "No. AI is one part of a complete digital system. We also design and develop websites, connect CRM and WhatsApp workflows, improve SEO and AI-search visibility, and support paid acquisition and conversion journeys." },
  { q: "Can you improve our existing systems instead of replacing everything?", a: "Yes. We normally begin by auditing what already works. When an existing website, CRM, analytics setup, or workflow can be improved safely, we integrate with it rather than recommending an unnecessary rebuild." },
  { q: "How does a project begin?", a: "Projects begin with a focused discovery conversation and an audit of the relevant customer journey or operational workflow. We then define scope, responsibilities, evidence, timeline, and success criteria before implementation." }
];

export default function About() {
  return (
    <div className="pt-20">
      

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="micro-label block mb-4">The Firm</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            The <span className="italic text-white/50">Architects</span> of Resilience.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            Asif Digital is a high-ticket Sovereign AI Architectural Firm. We engineer autonomous intelligence layers for the GCC's most ambitious enterprises, transforming legacy friction into unshakeable revenue domains.
          </p>
        </motion.div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-20">
          <span className="micro-label block mb-4">Who We Are</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Meet the Architects</h2>
          <p className="text-white/60 text-lg font-light max-w-3xl mx-auto leading-relaxed">
            A focused UAE team bringing together AI architecture, web engineering, conversation design, and growth strategy. Each discipline works as part of one delivery system, so clients are not left coordinating disconnected suppliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-green-500/30 transition-all duration-500 flex flex-col h-full"
            >
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={member.img}
                  alt={`${member.name}, ${member.role} at Asif Digital`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-8 flex flex-col flex-grow relative z-10 -mt-10 bg-[#050505]/90 backdrop-blur-sm rounded-t-[1.5rem] border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2">{member.role}</span>
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-green-400 transition-colors">{member.name}</h3>
                <p className="text-sm text-white/70 font-normal leading-relaxed">{member.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 md:px-12 py-32 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-36">
              <span className="micro-label block mb-4">What We Build</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">One team for the complete <span className="italic text-white/50">digital system.</span></h2>
              <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                Good technology should make the business easier to understand, contact, operate, and improve. We connect customer-facing experiences with the workflows and measurement behind them.
              </p>
              <Link href="/services" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-green-400 transition-colors">
                View all capabilities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilities.map((capability, i) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col min-h-[310px]"
                >
                  <div className="w-12 h-12 rounded-2xl border border-green-500/20 bg-green-500/5 text-green-400 flex items-center justify-center mb-8">{capability.icon}</div>
                  <h3 className="text-2xl font-serif mb-4">{capability.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed mb-8 flex-grow">{capability.desc}</p>
                  <Link href={capability.link} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 hover:text-green-400 transition-colors">
                    {capability.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="px-6 md:px-12 py-32 bg-white/[0.02] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#0066FF]/10 rounded-[3rem] blur-[100px] pointer-events-none" />
            <img
              src="https://lh3.googleusercontent.com/d/1ChELaq_hCpBMzUpw9Z7H1TBYZ9nW_JU0"
              alt="Asif Khan — Founder, Asif Digital"
              className="w-full h-auto rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 left-10 z-20 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-8 py-6">
              <div className="font-serif text-2xl text-white mb-1">Asif Khan</div>
              <div className="text-[#0066FF] text-[10px] uppercase tracking-[0.3em] font-bold">Founder & Principal Architect</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Beyond the Agency <span className="italic">Standard.</span></h2>
              <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
                <p>
                  Asif Digital was founded by Asif Khan with a single mission: to provide UAE enterprises with a level of digital certainty that standard agencies cannot match.
                </p>
                <p>
                  We have moved beyond the "Digital Marketing" label. Today, we function as a specialized architectural firm, designing the neural frameworks that allow companies in Dubai, Riyadh, and Abu Dhabi to operate autonomously.
                </p>
                <p>
                  Our commitment to <span className="text-white">Sovereign AI</span> means we prioritize your data residency above all else. In an era of global volatility, we ensure your intelligence remains your most guarded and productive asset.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[{ n: "150+", l: "GCC Clients" }, { n: "Sovereign", l: "Protocol" }, { n: "24/7", l: "Autonomous" }].map((s, i) => (
                <div key={i} className="p-6 border border-white/5 rounded-3xl text-center bg-white/[0.01]">
                  <div className="text-2xl font-serif mb-1">{s.n}</div>
                  <div className="text-white/40 text-[9px] uppercase tracking-widest font-bold">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sovereign Pillars */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="micro-label block mb-4">Our Methodology</span>
          <h2 className="text-4xl md:text-6xl font-serif">The Sovereign Protocol</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sovereignPillars.map((pillar, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group"
            >
              <div className="text-[#0066FF] mb-8 group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{pillar.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Delivery Process */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          <div>
            <span className="micro-label block mb-4">How We Work</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Clear decisions from first audit to <span className="italic text-white/50">measured launch.</span></h2>
          </div>
          <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
            <p>We do not begin with a predetermined tool. We begin with the customer journey or operational problem, define what evidence is available, and choose the smallest useful system that can be implemented responsibly.</p>
            <p>Clients remain involved at clear decision points, while our team owns the technical coordination between strategy, design, development, automation, and measurement.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/5 rounded-[2.5rem] overflow-hidden">
          {deliverySteps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 bg-white/[0.015] border-b md:border-r border-white/5 last:border-0"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-green-400 font-serif text-xl">{item.step}</span>
                <CheckCircle className="w-5 h-5 text-white/20" />
              </div>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="micro-label block mb-4">Our Evolution</span>
            <h2 className="text-4xl md:text-5xl font-serif">The Trajectory of Intelligence</h2>
          </div>
          <div className="space-y-0">
            {evolution.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className="flex flex-col md:flex-row gap-8 py-12 border-b border-white/5 last:border-0 items-start md:items-center"
              >
                <div className="flex-shrink-0 w-24">
                  <span className="text-[#0066FF] text-xl font-serif">{m.year}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-serif mb-2">{m.title}</h3>
                  <p className="text-white/50 font-light text-base leading-relaxed max-w-3xl">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About FAQ */}
      <section className="px-6 md:px-12 py-32 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="micro-label block mb-4">Working With Us</span>
          <h2 className="text-4xl md:text-5xl font-serif">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {aboutFaqs.map((faq) => (
            <details key={faq.q} className="group border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden">
              <summary className="p-7 md:p-8 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <span className="text-lg md:text-xl font-serif text-white pr-6">{faq.q}</span>
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-green-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-7 md:px-8 pb-8 text-white/65 font-light leading-relaxed text-base md:text-lg">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <div className="p-16 rounded-[4rem] bg-white text-black text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mt-32" />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Secure Your <span className="italic">Domain.</span></h2>
          <p className="text-black/60 text-xl font-light max-w-2xl mx-auto mb-12">
            The Agentic Shift is already underway in the UAE. Do not let your operations remain vulnerable to legacy friction. Speak with our Principal Architect today.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl">
            Book Strategic Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
