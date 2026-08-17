"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Layout, Smartphone, Eye, Sparkles, Layers, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, 
  PhoneCall, HelpCircle, Compass, Users, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function UIUX() {
  // Interactive UI/UX Friction & Funnel Drop-off Simulator State
  const [funnelSteps, setFunnelSteps] = useState(4);
  const [currentStepDropOffRate, setCurrentStepDropOffRate] = useState(45); // % drop-off per step
  const [initialFunnelVisitors, setInitialFunnelVisitors] = useState(10000);

  // Calculations
  const retentionPerStep = (100 - currentStepDropOffRate) / 100;
  const currentFinalCompletions = Math.round(initialFunnelVisitors * Math.pow(retentionPerStep, funnelSteps));
  
  const optimizedDropOffRate = 18; // Optimized with Asif Digital frictionless UX design
  const optimizedRetentionPerStep = (100 - optimizedDropOffRate) / 100;
  const optimizedFinalCompletions = Math.round(initialFunnelVisitors * Math.pow(optimizedRetentionPerStep, funnelSteps));
  const additionalCompletions = Math.max(0, optimizedFinalCompletions - currentFinalCompletions);
  const completionRateUpliftPercent = currentFinalCompletions > 0 ? Math.round(((optimizedFinalCompletions - currentFinalCompletions) / currentFinalCompletions) * 100) : 0;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital UI/UX Design Agency Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/ui-ux-design-agency-dubai",
    "telephone": "+971545866094",
    "priceRange": "AED 8,000 - AED 55,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Premium UI/UX Design, Mobile App Wireframing, Figma Design Systems, and User Journey Optimization in Dubai and Sharjah. Sub-second friction audits, bilingual Arabic/English UX, and high-conversion prototypes."
  };

  const faqData = [
    {
      q: "What is the difference between visual web design and comprehensive UI/UX engineering?",
      a: "Visual design focuses merely on aesthetics—how a website looks. UI/UX (User Interface / User Experience) engineering is psychological and structural science: mapping user mental models, eliminating cognitive friction in checkout flows, optimizing micro-interactions, structuring information architecture, and testing prototypes with real users to maximize task completion rates and commercial conversions."
    },
    {
      q: "How does superior UI/UX design directly increase business revenue in the UAE?",
      a: "Every unnecessary form field, confusing navigation menu, or slow-loading modal causes prospective UAE buyers to abandon the funnel. By streamlining the user journey into 1-to-2 tap interactions, designing mobile-first touch targets, and introducing intuitive visual cues, we consistently increase conversion rates by 40% to 150% without requiring additional marketing ad spend."
    },
    {
      q: "Do you design Figma prototypes with full design systems and component libraries?",
      a: "Yes! Every project is delivered with a production-ready, auto-layout Figma design system: typography tokens, color variables, reusable UI components (buttons, input fields, modals, cards), dark/light mode states, and interactive clickable prototypes ready for developer handoff."
    },
    {
      q: "How do you approach bilingual Arabic and English UI/UX design?",
      a: "Designing for Right-to-Left (RTL) Arabic interfaces requires more than mirroring elements. We account for Arabic reading eye-tracking patterns, adjust typography line-heights and kerning for maximum legibility, and maintain balanced iconographic orientations so the application feels completely native to Khaleeji users."
    },
    {
      q: "What is your UI/UX design process from start to finish?",
      a: "Our process spans 5 structured phases: 1) User Research & Competitor Benchmarking, 2) Information Architecture & Low-Fidelity Wireframes, 3) High-Fidelity UI Design & Design System Creation, 4) Interactive Prototype Testing & Heatmap Auditing, and 5) Clean Developer Handoff with detailed design tokens."
    },
    {
      q: "Can you audit and redesign our existing mobile app or web platform to fix low conversion rates?",
      a: "Yes! We conduct comprehensive UX Friction & Heuristic Audits. We analyze user drop-off bottlenecks, heatmaps, and session recordings, delivering an actionable wireframe roadmap to eliminate UX friction and recover lost revenue."
    },
    {
      q: "Do you design for both mobile (iOS / Android) and desktop web applications?",
      a: "Yes. In the UAE, over 80% of digital traffic is mobile. We design mobile-first responsive interfaces that adapt fluidly across all screen sizes: iPhone, Android smartphones, iPad tablets, laptops, and ultra-wide desktop monitors."
    },
    {
      q: "What deliverables will our development team receive?",
      a: "Your developers receive organized Figma project files with organized component variants, interactive micro-interaction prototypes, exportable SVG icons, CSS typography tokens, and detailed developer handoff documentation explaining exact responsive behaviors."
    },
    {
      q: "How long does a typical UI/UX design engagement take?",
      a: "A standard corporate website or e-commerce UI/UX project takes 3 to 5 weeks. Complex SaaS web application dashboards or native mobile apps typically range between 5 to 9 weeks."
    },
    {
      q: "Do you conduct user testing and prototype validation before development begins?",
      a: "Yes. We create clickable Figma prototypes that simulate the real application experience. We test these prototypes on target user demographics to identify and resolve usability friction before your developers write a single line of code, saving thousands of dirhams in wasted engineering hours."
    },
    {
      q: "How does Asif Digital's UI/UX approach compare to standard digital agencies in Dubai?",
      a: "Most agencies deliver pretty static picture mockups that break during actual development. Asif Digital builds functional, tokenized design systems rooted in engineering reality, ensuring seamless translation from Figma to high-speed Next.js or mobile code."
    },
    {
      q: "How do we get started with a UI/UX audit or new project consultation?",
      a: "Call our design studio on +971 54 586 6094 or submit an inquiry on our contact page. We will review your current platform and provide a complimentary UX Friction teardown within 24 hours."
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
    "name": "How to Architect and Design a High-Conversion Digital Product UI/UX in Dubai",
    "description": "The systematic 5-stage UI/UX engineering lifecycle for digital products in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "User Research & Mental Model Analysis",
        "text": "We map user personas, commercial goals, competitor friction points, and key conversion actions."
      },
      {
        "@type": "HowToStep",
        "name": "Information Architecture & Wireframing",
        "text": "We engineer clean site navigation hierarchies and low-fidelity user flow wireframes."
      },
      {
        "@type": "HowToStep",
        "name": "Figma Design System & Tokenization",
        "text": "We craft reusable UI component libraries, color palettes, and bilingual typography scales."
      },
      {
        "@type": "HowToStep",
        "name": "High-Fidelity Interactive Prototyping",
        "text": "We assemble clickable desktop and mobile prototypes with realistic micro-animations."
      },
      {
        "@type": "HowToStep",
        "name": "Developer Handoff & Implementation QA",
        "text": "We deliver structured Figma tokens and conduct design reviews during the frontend build."
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
            <Layout className="w-4 h-4 text-emerald-400" /> UI/UX Engineering &bull; Figma Systems &bull; Dubai & Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            UI / UX Design <br />
            <span className="italic text-white/50 font-normal">Agency Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            A beautiful interface is useless if users get confused and abandon their journey. We engineer frictionless, mobile-first UI/UX design systems and interactive Figma prototypes that turn complex digital products into effortless, high-converting customer experiences.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request UI/UX Friction Audit <ArrowRight className="w-4 h-4" />
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
            { metric: "100%", label: "Figma Component Systems", sub: "Modular Design Tokens" },
            { metric: "+85%", label: "Average Checkout Conversion Lift", sub: "Via Friction Elimination" },
            { metric: "Bilingual", label: "English & Arabic RTL", sub: "Culturally Native UX" },
            { metric: "1-to-1", label: "Developer Handoff Accuracy", sub: "Zero Broken Implementation" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive UI/UX Funnel Friction Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Conversion Optimization Simulator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Simulate Friction Drop-Off Across User Journeys
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Every unnecessary step or confusing element in your digital application compounds user drop-off. See how removing friction and optimizing your UI/UX dramatically increases completed transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Number of Steps in User Funnel:</span>
                  <span className="text-white font-bold">{funnelSteps} steps</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="7" 
                  step="1" 
                  value={funnelSteps} 
                  onChange={(e) => setFunnelSteps(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Current Drop-Off Rate per Step:</span>
                  <span className="text-white font-bold">{currentStepDropOffRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="70" 
                  step="5" 
                  value={currentStepDropOffRate} 
                  onChange={(e) => setCurrentStepDropOffRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Funnel Entrants:</span>
                  <span className="text-white font-bold">{initialFunnelVisitors.toLocaleString()} users</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="50000" 
                  step="1000" 
                  value={initialFunnelVisitors} 
                  onChange={(e) => setInitialFunnelVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Optimized Final Conversions
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {optimizedFinalCompletions.toLocaleString()} <span className="text-xs font-sans text-white/50">users/month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Current Completions:</span>
                  <span className="text-white text-sm font-bold">{currentFinalCompletions.toLocaleString()} users</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Conversion Uplift:</span>
                  <span className="text-emerald-300 text-sm font-bold">+{completionRateUpliftPercent}% growth</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-white/60 block mb-3 font-light">
                  Incremental Completed Leads/Sales: <strong className="text-white font-bold">+{additionalCompletions.toLocaleString()} customers / month</strong>
                </span>
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Request UX Architecture Session <ArrowRight className="w-4 h-4" />
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
            UI/UX Methodology Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Engineering-Driven UX Outperforms Static Mockups
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Design Discipline</th>
                <th className="py-4 px-4 text-white/40">Visual-Only Designer</th>
                <th className="py-4 px-4 text-white/40">Pre-Made UI Template</th>
                <th className="py-4 px-4 text-white/40">Generic Digital Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital UI/UX Engineering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Design System &amp; Tokens</td>
                <td className="py-5 px-4 text-red-400">Messy ungrouped layers</td>
                <td className="py-5 px-4 text-yellow-400">Inflexible kit</td>
                <td className="py-5 px-4 text-yellow-400">Basic color palette</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Modular Auto-Layout Figma Tokens &amp; Variants</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Mobile-First Touch Ergonomics</td>
                <td className="py-5 px-4 text-red-400">Desktop shrunk down</td>
                <td className="py-5 px-4 text-yellow-400">Basic responsive</td>
                <td className="py-5 px-4 text-yellow-400">Cluttered mobile UI</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Thumb-Zone Touch Targets &amp; 1-Tap Flows</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Arabic RTL Layouts</td>
                <td className="py-5 px-4 text-red-400">Ignored</td>
                <td className="py-5 px-4 text-red-400">Broken alignments</td>
                <td className="py-5 px-4 text-yellow-400">Basic mirrored text</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Khaleeji Reading Flow &amp; Arabic Kerning</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Interactive Prototyping</td>
                <td className="py-5 px-4 text-red-400">Static PNG images</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-yellow-400">Basic click-through</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Realistic Micro-Interactions &amp; State Changes</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Developer Handoff Quality</td>
                <td className="py-5 px-4 text-red-400">Frequent build errors</td>
                <td className="py-5 px-4 text-yellow-400">Code mismatches</td>
                <td className="py-5 px-4 text-yellow-400">Vague specs</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Production-Ready CSS &amp; React Component Mapping</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full UI/UX Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete UX Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Enterprise UI/UX Design Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout className="w-6 h-6 text-emerald-400" />,
                title: "Figma Design Systems & Tokens",
                desc: "Complete component libraries with standardized spacing tokens, typography hierarchies, input fields, and dark/light mode variants."
              },
              {
                icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
                title: "Native Mobile App UI/UX",
                desc: "Pixel-perfect iOS and Android interface architectures engineered for thumb ergonomics, swift navigation, and tactile feedback."
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
                title: "Complex Web Application Dashboards",
                desc: "Intuitive data visualization dashboards, analytics tables, and admin controls that turn massive datasets into actionable clarity."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Bilingual English & Arabic RTL Systems",
                desc: "Seamless Right-to-Left component transformations with customized Arabic typography weights for maximum legibility."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
                title: "Micro-Interactions & Animation Specs",
                desc: "Fluid hover states, button transitions, loading skeletons, and interactive states that make your application feel alive."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "UX Friction & Heuristic Audits",
                desc: "Comprehensive diagnostic teardowns of existing apps to identify conversion drop-offs, accessibility flaws, and usability bottlenecks."
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
            Design Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage UI/UX Engineering Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "User Research", text: "We analyze target user psychology, competitor friction points, and commercial conversion milestones." },
            { step: "02", title: "Architecture", text: "We map out navigation flowcharts, user journey paths, and low-fidelity structural wireframes." },
            { step: "03", title: "Design System", text: "We craft the complete component library, typography tokens, and high-fidelity interface screens." },
            { step: "04", title: "Interactive QA", text: "We assemble clickable Figma prototypes and stress-test usability across mobile and desktop." },
            { step: "05", title: "Dev Handoff", text: "We deliver organized Figma tokens and conduct design reviews throughout the engineering build." }
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
              UI/UX Strategic Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE product leaders need to know about user experience design, design systems, and developer handoff.
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
            Eliminate Digital Friction
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Engineer Effortless Digital Products.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's design high-conversion UI/UX systems that delight your users and accelerate business growth. Speak directly with our senior product designer in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Get Free UI/UX Audit <ArrowRight className="w-4 h-4" />
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
