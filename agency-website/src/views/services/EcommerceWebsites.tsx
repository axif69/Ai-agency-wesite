"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, CreditCard, Truck, BarChart3, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, Smartphone,
  Layers, RefreshCw, Lock, HelpCircle, PhoneCall
} from "lucide-react";
import Link from "next/link";

export default function EcommerceWebsites() {
  // Interactive Simulator State: Abandoned Cart & GCC Conversion Recovery
  const [monthlyVisitors, setMonthlyVisitors] = useState(15000);
  const [avgOrderValue, setAvgOrderValue] = useState(350); // AED
  const [currentConversionRate, setCurrentConversionRate] = useState(1.4); // %

  // Calculations
  const currentMonthlyRevenue = (monthlyVisitors * (currentConversionRate / 100)) * avgOrderValue;
  const optimizedConversionRate = 3.6; // Industry benchmark with Asif Digital headless/Shopify optimization
  const optimizedMonthlyRevenue = (monthlyVisitors * (optimizedConversionRate / 100)) * avgOrderValue;
  const monthlyRevenueLift = Math.max(0, optimizedMonthlyRevenue - currentMonthlyRevenue);
  const annualRevenueLift = monthlyRevenueLift * 12;

  // Schema Definitions
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital E-Commerce Solutions Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/ecommerce-website-development-dubai",
    "telephone": "+971545866094",
    "priceRange": "AED 8,000 - AED 65,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "High-conversion E-commerce website development in Dubai and Sharjah. Custom Shopify Plus, headless Next.js commerce, regional GCC payment gateway integration, and automated UAE courier fulfillment."
  };

  const faqData = [
    {
      q: "Which e-commerce platform is best for my business in Dubai and the UAE?",
      a: "For fast-scaling retail and direct-to-consumer brands, Shopify Plus is our primary recommendation due to its rock-solid 99.99% cloud uptime, native multi-currency support (AED, SAR, KWD, QAR), and seamless regional payment gateway plugins. For luxury brands, B2B wholesale portals, or enterprises with complex bespoke inventory rules, we architect headless e-commerce using Next.js, MedusaJS, or custom Node.js backends to ensure sub-second page loads and zero monthly software bloat."
    },
    {
      q: "Which regional UAE payment gateways do you integrate?",
      a: "We natively integrate all tier-1 UAE and GCC payment systems including Stripe UAE, Tap Payments, Telr, Checkout.com, Network International (N-Genius), and PayCaps. Furthermore, we configure Buy Now Pay Later (BNPL) providers like Tabby and Tamara, which consistently increase average order value (AOV) by 25% to 40% across Dubai and Saudi shoppers."
    },
    {
      q: "How do you automate logistics and shipping across the UAE and GCC?",
      a: "We connect your store directly with local courier APIs including Aramex, Emirates Post, DHL Express UAE, Fetchr, and Shipa Delivery. When an order is confirmed, airway bills (AWB) and shipping labels generate automatically, pickup requests dispatch to the courier, and real-time WhatsApp tracking links are texted directly to your customer."
    },
    {
      q: "Is full Arabic Right-to-Left (RTL) localization included?",
      a: "Yes. In the UAE and GCC, bilingual fluency is critical for high conversions. We do not use automated broken widget translators. We engineer proper bilingual layouts with dedicated Right-to-Left (RTL) CSS stylesheets, tailored Arabic typography, localized checkout copy, and language switches that preserve SEO ranking on both Arabic and English queries."
    },
    {
      q: "Are the stores compliant with UAE Federal Tax Authority (FTA) 5% VAT rules?",
      a: "Yes. Every online store we build is fully configured for UAE FTA tax regulations. We program automated 5% VAT calculation at checkout, tax-inclusive or tax-exclusive price toggles, compliant tax invoice generation with TRN registration numbers, and exportable monthly sales reports for your accountant."
    },
    {
      q: "What is the typical timeframe to launch a custom e-commerce store in Dubai?",
      a: "A custom-designed, fully integrated Shopify store typically launches within 3 to 5 weeks, including payment gateway approval, shipping integrations, and bilingual product setups. Large-scale headless custom e-commerce applications or complex ERP-synced B2B catalogs generally require 6 to 10 weeks."
    },
    {
      q: "How do you optimize checkout speed to reduce cart abandonment on mobile?",
      a: "Over 82% of UAE online purchases occur on smartphones. We optimize every mobile touchpoint: 1-click Apple Pay and Google Pay checkouts, instant OTP WhatsApp verification, lightweight asset compression for sub-second 4G/5G loading, auto-complete address fields for Dubai/Sharjah neighborhoods, and automated abandoned cart recovery sequences via WhatsApp."
    },
    {
      q: "Can you connect our online store to our physical retail POS and warehouse inventory?",
      a: "Yes. We integrate Shopify POS, Lightspeed, Vend, or custom ERP databases (such as Odoo, SAP, or Microsoft Dynamics) to sync physical showroom stock with online inventory in real-time, preventing overselling and eliminating manual stock adjustments."
    },
    {
      q: "Do you provide post-launch support, maintenance, and conversion optimization?",
      a: "Yes. We provide comprehensive 30-day post-launch hyper-care standard with every project, followed by monthly managed growth plans that cover security updates, speed monitoring, A/B checkout split-testing, and promotional campaign landing page launches."
    },
    {
      q: "Can we sell to Saudi Arabia (KSA) and other GCC markets through the same store?",
      a: "Absolutely. We build multi-region GCC commerce engines that automatically display local currencies (AED, SAR, BHD, KWD, OMR), calculate accurate cross-border customs and GCC shipping fees, and support Saudi-specific payment methods like Mada and SADAD."
    },
    {
      q: "How does your build compare to hiring an off-shore freelancer or cheap agency?",
      a: "Off-shore freelancers often use bloated pre-made templates with dozens of slow plugins, broken Arabic RTL layouts, and zero understanding of UAE bank approvals. Asif Digital builds custom, high-speed architectures with direct local UAE strategist access on +971 54 586 6094, strict security standards, and measurable revenue-first design."
    },
    {
      q: "What is the starting investment for a professional e-commerce store with Asif Digital?",
      a: "Our professional UAE e-commerce development packages start from AED 8,500 for high-converting custom Shopify stores, scaling up to AED 35,000+ for enterprise headless architectures with ERP syncing, multi-warehouse routing, and bespoke custom features."
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
    "name": "How to Build and Launch a High-Converting UAE E-Commerce Website",
    "description": "The step-by-step engineering roadmap for launching a scalable, bilingual, and payment-integrated online store in Dubai and Sharjah.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Commercial Architecture & UX Wireframing",
        "text": "We map out your product categories, bilingual user journey, mobile checkout flow, and average order value optimization triggers."
      },
      {
        "@type": "HowToStep",
        "name": "Custom UI Design & Arabic RTL Styling",
        "text": "We design high-impact visuals and responsive interfaces tailored for UAE luxury and commercial retail aesthetics."
      },
      {
        "@type": "HowToStep",
        "name": "Payment Gateway & Logistics API Integration",
        "text": "We integrate Stripe UAE, Tap, Telr, Tabby, Tamara, Apple Pay, and automated courier APIs like Aramex and DHL."
      },
      {
        "@type": "HowToStep",
        "name": "VAT Compliance & Inventory Syncing",
        "text": "We program 5% UAE FTA VAT invoices, warehouse stock syncing, and automated WhatsApp order tracking."
      },
      {
        "@type": "HowToStep",
        "name": "Rigorous QA, Speed Testing & Launch",
        "text": "We conduct 100+ live test transactions, stress-test mobile checkout speeds, and deploy on high-performance cloud servers."
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
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
            E-Commerce Architecture &bull; Dubai, Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            E-Commerce Website <br />
            <span className="italic text-white/50 font-normal">Development Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            A standard template store will leave 70% of your UAE visitors bouncing before checkout. We engineer lightning-fast, bilingual Shopify Plus and custom headless stores built specifically for high average order values, local payment trust, and automated courier fulfillment.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request E-Commerce Blueprint <ArrowRight className="w-4 h-4" />
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

      {/* ── 2. UAE Market Performance Metrics ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "sub-1.2s", label: "Mobile Page Load Time", sub: "Over 5G UAE Networks" },
            { metric: "+42%", label: "Average Checkout Uplift", sub: "With 1-Click Apple Pay" },
            { metric: "100%", label: "FTA VAT & TRN Compliant", sub: "Automated Tax Invoicing" },
            { metric: "24/7", label: "Automated Order Tracking", sub: "Via Direct WhatsApp API" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Revenue & Cart Recovery Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Interactive ROI Estimator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate Your UAE E-Commerce Revenue Potential
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Most UAE online stores suffer from sub-1.5% conversion rates caused by slow mobile checkout speeds, missing local payment methods (Tabby/Apple Pay), and lack of WhatsApp recovery. See how optimizing your store lifts your bottom line.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Store Visitors:</span>
                  <span className="text-white font-bold">{monthlyVisitors.toLocaleString()} sessions</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="100000" 
                  step="1000" 
                  value={monthlyVisitors} 
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Order Value (AOV):</span>
                  <span className="text-white font-bold">AED {avgOrderValue}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="3000" 
                  step="50" 
                  value={avgOrderValue} 
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Current Store Conversion Rate:</span>
                  <span className="text-white font-bold">{currentConversionRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3.0" 
                  step="0.1" 
                  value={currentConversionRate} 
                  onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Display Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Revenue Lift
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  +AED {Math.round(monthlyRevenueLift).toLocaleString()} <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Current Revenue:</span>
                  <span className="text-white text-sm font-bold">AED {Math.round(currentMonthlyRevenue).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Optimized Revenue:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {Math.round(optimizedMonthlyRevenue).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-white/60 block mb-3 font-light">
                  Annual Incremental Growth Potential: <strong className="text-white font-bold">AED {Math.round(annualRevenueLift).toLocaleString()} / year</strong>
                </span>
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Claim Your Store Audit <ArrowRight className="w-4 h-4" />
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
            UAE Market Standard Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Asif Digital Compares to Other Options
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Feature / Capability</th>
                <th className="py-4 px-4 text-white/40">Basic Off-the-Shelf Theme</th>
                <th className="py-4 px-4 text-white/40">Offshore Freelancer</th>
                <th className="py-4 px-4 text-white/40">Generic UAE Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Sovereign Store</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Mobile Speed & Core Web Vitals</td>
                <td className="py-5 px-4 text-red-400">Slow (4-8s load time)</td>
                <td className="py-5 px-4 text-red-400">Inconsistent</td>
                <td className="py-5 px-4 text-yellow-400">Moderate (2.5-4s)</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Sub-1.2s on UAE 5G</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Arabic RTL Experience</td>
                <td className="py-5 px-4 text-red-400">Broken auto-translate</td>
                <td className="py-5 px-4 text-red-400">Poor alignment</td>
                <td className="py-5 px-4 text-yellow-400">Basic plugin</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native RTL CSS + Khaleeji Copy</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">UAE Payment Gateways & BNPL</td>
                <td className="py-5 px-4 text-yellow-400">Credit card only</td>
                <td className="py-5 px-4 text-red-400">Manual setup errors</td>
                <td className="py-5 px-4 text-yellow-400">Standard Stripe/Telr</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Tap, Telr, Stripe, Tabby, Tamara & Apple Pay</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Automated Shipping & Labeling</td>
                <td className="py-5 px-4 text-red-400">Manual copy-paste</td>
                <td className="py-5 px-4 text-red-400">Not configured</td>
                <td className="py-5 px-4 text-yellow-400">Basic Aramex plugin</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Direct API (Aramex, DHL, Emirates Post)</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">VAT & Legal Compliance</td>
                <td className="py-5 px-4 text-red-400">Generic tax engine</td>
                <td className="py-5 px-4 text-red-400">Risk of non-compliance</td>
                <td className="py-5 px-4 text-yellow-400">Basic 5% setting</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">FTA TRN Invoicing + Monthly Export</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Local Technical Support</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-red-400">Disappears post-launch</td>
                <td className="py-5 px-4 text-yellow-400">Slow ticket system</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Direct UAE Strategist Phone & WhatsApp</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Core Architectural Pillars ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Engineering Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Built for Commercial Scale in Dubai & the GCC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingBag className="w-6 h-6 text-emerald-400" />,
                title: "Shopify Plus & Headless Next.js",
                desc: "We build custom themes with zero layout bloat or high-performance headless Next.js frontends connected to MedusaJS, Shopify, or custom backends for unlimited architectural flexibility."
              },
              {
                icon: <CreditCard className="w-6 h-6 text-emerald-400" />,
                title: "Frictionless GCC Payment Gateways",
                desc: "Full integration with Checkout.com, Tap Payments, Telr, Stripe UAE, Tabby, and Tamara. We configure 1-click Apple Pay to maximize conversion among mobile shoppers."
              },
              {
                icon: <Truck className="w-6 h-6 text-emerald-400" />,
                title: "Automated Courier APIs & AWBs",
                desc: "Connect your warehouse directly to Aramex, Fetchr, DHL, and Emirates Post. Generate airway bills and shipping stickers automatically upon order confirmation."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Bilingual English & Arabic RTL",
                desc: "Native Arabic Right-to-Left styling crafted for regional cultural nuance. Separate typography hierarchies for Arabic and English to preserve brand elegance."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "FTA 5% VAT Invoicing Engine",
                desc: "Automated UAE Tax Registration Number (TRN) integration, compliant PDF invoice generation, and tax breakdown reports ready for your monthly FTA tax filings."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "Automated WhatsApp Recovery",
                desc: "Direct integration with the WhatsApp Business API to recover abandoned checkouts, dispatch delivery status alerts, and handle customer re-orders effortlessly."
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
            Execution Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage E-Commerce Launch Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Commercial Scoping", text: "Product catalog analysis, payment gateway approvals, shipping carrier mapping, and average order value target setting." },
            { step: "02", title: "Wireframing & UI", text: "Mobile-first layout design, bilingual English/Arabic RTL typography, and frictionless checkout pathway creation." },
            { step: "03", title: "Core Engineering", text: "Clean theme development, database structuring, API middleware setup, and payment gateway sandbox validation." },
            { step: "04", title: "Logistics & VAT Sync", text: "Aramex/DHL webhook integration, automated invoice generation, and real-time inventory synchronization." },
            { step: "05", title: "QA & Live Deployment", text: "End-to-end payment stress tests, 5G speed benchmarks, analytics tagging, and 30-day post-launch hyper-care." }
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
              Deep Strategic Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE business owners need to know about e-commerce development, payments, logistics, and ROI.
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
            Ready to Build Your Store?
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Stop Losing Sales to Slow Checkout Flows.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's architect a high-speed, bilingual e-commerce store designed to dominate the UAE and GCC markets. Reach out to discuss your catalog and receive a detailed roadmap.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book Technical Consultation <ArrowRight className="w-4 h-4" />
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
