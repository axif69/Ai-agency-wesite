"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowRight, Shield, Cpu, Network, Zap, CheckCircle, Code2, MessageSquare, Search, Workflow } from "lucide-react";

const sovereignPillars = [
  { icon: <Code2 className="w-6 h-6" />, title: "Engineering Velocity & Clean Code", desc: "We build on modern Next.js, React, and TypeScript stacks engineered for fast loading speeds, clean component architecture, optimal Core Web Vitals, and complete client code ownership." },
  { icon: <Zap className="w-6 h-6" />, title: "Practical Business Automation", desc: "Direct integrations between your website, Meta's official WhatsApp Cloud API, and CRM pipelines. We reduce lead decay by routing incoming customer enquiries directly to your sales team automatically." },
  { icon: <Network className="w-6 h-6" />, title: "GCC Localization & Payment Gateways", desc: "Tailored for UAE commercial realities: natural Arabic/English RTL switching, local payment integrations (Stripe UAE, Telr, Network International), and regional hosting compliance." },
  { icon: <Shield className="w-6 h-6" />, title: "Direct Founder Engagement", desc: "You collaborate directly with founder Asif Khan on technical architecture, design, and milestone delivery — with zero account-manager telephone games." },
];

const evolution = [
  { year: "2020", title: "Inception in Sharjah", desc: "Asif Digital founded by Asif Khan in Sharjah, focusing on high-speed web engineering and digital infrastructure for UAE commercial businesses." },
  { year: "2022", title: "Workflow Automation", desc: "Expanded into backend process automation, CRM synchronization, and custom webhooks for SMEs across Dubai, Sharjah, and Abu Dhabi." },
  { year: "2024", title: "Meta WhatsApp Cloud API", desc: "Deployed official Meta WhatsApp Cloud API integrations and lead qualification pipelines, helping businesses respond to incoming inquiries in seconds." },
  { year: "Present", title: "Vertical Growth Systems", desc: "Delivering specialized digital ecosystems for UAE real estate agencies, professional service firms, and high-growth commercial enterprises." },
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
    link: "/services/web-design-dubai",
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
          <span className="micro-label block mb-4">About Asif Digital</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight mb-8">
            Engineering Digital Systems That Turn <span className="italic text-white/50">Visitors Into Clients.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            Asif Digital is an independent UAE digital engineering studio founded by Asif Khan. Based in Muwaileh Commercial, Sharjah, we build high-speed Next.js web applications, official WhatsApp Business automations, and CRM pipelines for growing businesses across Dubai, Sharjah, and Abu Dhabi.
          </p>
        </motion.div>
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
            <div className="absolute inset-0 bg-green-500/10 rounded-[3rem] blur-[100px] pointer-events-none" />
            <img
              src="/images/asif-khan.webp"
              alt="Asif Khan — Founder, Asif Digital"
              className="w-full h-auto rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 left-10 z-20 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-8 py-6">
              <div className="font-serif text-2xl text-white mb-1">Asif Khan</div>
              <div className="text-green-400 text-[10px] uppercase tracking-[0.3em] font-bold">Founder & Lead Engineer</div>
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
                  Founded by Asif Khan, Asif Digital began with a clear realization: UAE businesses were spending heavily on websites and marketing retainers that yielded slow pages, disconnected forms, and leads that went cold within hours.
                </p>
                <p>
                  Instead of operating like an ordinary marketing agency with generic templates, we operate as a dedicated engineering studio. We combine modern web architecture (Next.js, React, TypeScript) with official Meta WhatsApp Cloud API workflows and direct CRM synchronization.
                </p>
                <p>
                  Every system we build is designed for measurable commercial outcomes: high-performance page loads, automated enquiry qualification, and 100% client code ownership without proprietary lock-in.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[{ n: "Sharjah", l: "Physical Base in Muwaileh" }, { n: "100%", l: "Client Code Ownership" }, { n: "Rapid", l: "Lead Routing Target" }].map((s, i) => (
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
          <span className="micro-label block mb-4">Our Engineering Principles</span>
          <h2 className="text-4xl md:text-6xl font-serif">How We Engineer Digital Systems</h2>
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
              <div className="text-green-400 mb-8 group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
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
            <h2 className="text-4xl md:text-5xl font-serif">How Asif Digital Grew</h2>
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
                  <span className="text-green-400 text-xl font-serif">{m.year}</span>
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
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Ready to Upgrade Your <span className="italic">Digital Infrastructure?</span></h2>
          <p className="text-black/60 text-xl font-light max-w-2xl mx-auto mb-12">
            Whether you need a high-converting web application, automated WhatsApp lead routing, or a custom real estate CRM, we engineer systems that deliver measurable business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/free-growth-audit" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-all shadow-2xl">
              Claim Free Growth Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20would%20like%20to%20discuss%20a%20digital%20engineering%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-black/20 text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
