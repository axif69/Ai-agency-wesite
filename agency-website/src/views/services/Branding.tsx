"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, Palette, Eye, Compass, Layers, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, 
  PhoneCall, HelpCircle, Award, PenTool, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function Branding() {
  // Interactive Brand Pricing Power & Authority Simulator State
  const [currentAnnualRevenue, setCurrentAnnualRevenue] = useState(1200000); // AED
  const [brandPerceptionTier, setBrandPerceptionTier] = useState<"generic" | "established" | "luxury_sovereign">("established");

  // Calculations
  const pricingPowerPremiumPercent = brandPerceptionTier === "generic" ? 0 : brandPerceptionTier === "established" ? 15 : 35;
  const potentialAnnualRevenueGain = Math.round(currentAnnualRevenue * (pricingPowerPremiumPercent / 100));
  const newProjectedAnnualRevenue = currentAnnualRevenue + potentialAnnualRevenueGain;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Corporate Branding Agency Dubai Sharjah",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/branding-agency-dubai-sharjah",
    "telephone": "+971545866094",
    "priceRange": "AED 7,500 - AED 45,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Premium Corporate Branding and Visual Identity Design in Dubai and Sharjah. Bilingual Arabic/English typography systems, luxury brand guidelines, executive stationery, investor pitch decks, and brand positioning."
  };

  const faqData = [
    {
      q: "What is the difference between a simple logo design and a complete corporate brand identity?",
      a: "A logo is just a single graphic mark. A complete corporate brand identity is an interconnected visual and strategic operating system: bilingual Arabic/English typography hierarchies, cohesive color psychology palettes, tone-of-voice guidelines, corporate stationery systems, investor pitch deck templates, signage specifications, and a 60+ page Brand Guidelines manual ensuring your company projects authority across every customer touchpoint."
    },
    {
      q: "How does premium branding increase our company's pricing power in Dubai?",
      a: "In the affluent UAE and GCC markets, buyers associate high visual refinement with superior operational competence and reliability. When your brand looks elite and established, prospective clients do not negotiate on price—they accept premium fees because your visual authority eliminates perceived risk. Premium branding consistently unlocks a 20% to 40% pricing premium."
    },
    {
      q: "Do you design bilingual Arabic and English logos and typography systems?",
      a: "Yes. In the UAE and GCC, bilingual brand harmony is critical. We do not simply slap a generic Arabic font next to an English wordmark. We custom-craft Arabic calligraphic elements (Kufic, Thuluth, or modern geometric styles) that perfectly mirror the weight, curves, and visual essence of your English typography."
    },
    {
      q: "What is included in your Brand Guidelines Book (Brand Bible)?",
      a: "Our comprehensive Brand Guidelines document covers: Logo usage rules and exclusion zones, primary and secondary color formulas (CMYK, RGB, Pantone, Hex), bilingual typography pairings, photography art direction, iconographic sets, corporate stationery templates (business cards, letterheads, invoice templates), digital social media grids, and vehicle/signage mockups."
    },
    {
      q: "What is the typical timeframe to develop a full corporate brand identity?",
      a: "A full brand identity system typically takes 3 to 5 weeks. This includes initial discovery and market positioning, mood board curation, 3 distinct visual concept presentations, iterative refinement, bilingual typography development, and final master asset export."
    },
    {
      q: "Can you rebrand an established UAE company without losing existing brand equity?",
      a: "Yes. We specialize in Strategic Brand Evolution. We preserve the recognizable core elements that your existing clients trust while modernizing typography, refining color palettes, and creating a cohesive digital-first aesthetic that positions your company for expansion into new GCC markets."
    },
    {
      q: "What file formats will we receive upon project completion?",
      a: "You receive 100% complete master source files across all vector and digital formats: AI (Adobe Illustrator), EPS, SVG, high-resolution Print PDF (CMYK with crop marks), transparent PNGs for digital use, and web-optimized SVG/WebP assets."
    },
    {
      q: "Do we own the full intellectual property (IP) and copyright for our brand assets?",
      a: "Yes, 100%. Upon final settlement, full legal copyright and commercial usage rights are transferred to your company. You have complete freedom to trademark and register your brand with the UAE Ministry of Economy."
    },
    {
      q: "Do you design commercial brochures, company profiles, and investor pitch decks?",
      a: "Yes. Beyond core visual identity, we design high-impact investor pitch decks, bilingual corporate company profiles, exhibition booth graphics for Dubai World Trade Centre (DWTC) events, and luxury product packaging."
    },
    {
      q: "How does Asif Digital's branding process compare to cheap online marketplaces?",
      a: "Cheap online marketplaces use recycled clip art, stolen templates, and non-licensed fonts that can lead to trademark rejection and legal copyright disputes. Asif Digital conducts original research, understands local UAE commercial dynamics, and creates 100% bespoke, trademark-ready visual assets with direct strategist collaboration on +971 54 586 6094."
    },
    {
      q: "What industries in Dubai and Sharjah do you specialize in for branding?",
      a: "We have built commanding brand identities across UAE Real Estate Developers, Luxury Retail, Industrial & Manufacturing Groups, Healthcare Clinics, Corporate Law & Financial Consultancies, High-Tech SaaS, and Hospitality Ventures."
    },
    {
      q: "How do we get started with a branding consultation?",
      a: "Contact our creative strategy desk on +971 54 586 6094 or submit an inquiry through our contact form. We will schedule a discovery call to understand your vision, market competitors, and growth objectives."
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
    "name": "How to Build a High-Authority Corporate Brand Identity in Dubai",
    "description": "The strategic 5-stage branding and visual identity protocol for UAE enterprises.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Strategic Discovery & Market Positioning",
        "text": "We analyze your commercial competitors, target customer psychology, and define your brand archetype and core value proposition."
      },
      {
        "@type": "HowToStep",
        "name": "Concept Development & Bilingual Crafting",
        "text": "We design 3 unique visual concepts with bespoke English/Arabic typography pairings and balanced geometry."
      },
      {
        "@type": "HowToStep",
        "name": "Concept Review & Iterative Refinement",
        "text": "We present concepts applied to real-world touchpoints (stationery, signage, digital apps) and refine the chosen direction."
      },
      {
        "@type": "HowToStep",
        "name": "Complete Brand Collateral & Stationery Suite",
        "text": "We design business cards, letterheads, invoice templates, social media design systems, and company profiles."
      },
      {
        "@type": "HowToStep",
        "name": "Brand Guidelines Manual & Master Asset Export",
        "text": "We compile your 60+ page Brand Bible and deliver all vector, print, and digital master files with full IP transfer."
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
            <Sparkles className="w-4 h-4 text-emerald-400" /> Corporate Brand Identity &bull; Dubai & Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Branding &amp; Visual <br />
            <span className="italic text-white/50 font-normal">Identity Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            In the UAE, your visual identity either commands respect or invites price haggling. We engineer prestigious, bilingual Arabic/English brand identities that establish instant market authority, unlock pricing power, and leave an indelible impression.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Brand Discovery Call <ArrowRight className="w-4 h-4" />
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
            { metric: "100%", label: "Custom Vector Crafting", sub: "Trademark-Ready Originals" },
            { metric: "Bilingual", label: "Arabic & English Harmony", sub: "Bespoke Calligraphic Flow" },
            { metric: "60+ Page", label: "Brand Guidelines Book", sub: "Complete Corporate System" },
            { metric: "+35%", label: "Pricing Power Uplift", sub: "Eliminate Price Resistance" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Brand Pricing Power Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Commercial Valuation Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Simulate Your Brand Pricing Power Premium
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When prospective enterprise clients evaluate your proposals, does your branding look like a discount commodity or an elite market leader? See how visual authority directly expands your annual revenue potential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-3 font-bold">
                  Select Visual Brand Positioning Tier:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setBrandPerceptionTier("generic")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${brandPerceptionTier === "generic" ? "bg-white/20 border border-white text-white" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Generic / Dated (0%)
                  </button>
                  <button
                    onClick={() => setBrandPerceptionTier("established")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${brandPerceptionTier === "established" ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Established (+15%)
                  </button>
                  <button
                    onClick={() => setBrandPerceptionTier("luxury_sovereign")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${brandPerceptionTier === "luxury_sovereign" ? "bg-emerald-500/30 border border-emerald-300 text-emerald-200" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Elite / Sovereign (+35%)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Current Annual Company Revenue:</span>
                  <span className="text-white font-bold">AED {currentAnnualRevenue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="200000" 
                  max="10000000" 
                  step="100000" 
                  value={currentAnnualRevenue} 
                  onChange={(e) => setCurrentAnnualRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Brand Authority Revenue Expansion
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  +AED {potentialAnnualRevenueGain.toLocaleString()} <span className="text-xs font-sans text-white/50">/ year</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Pricing Power Lift:</span>
                  <span className="text-white text-sm font-bold">+{pricingPowerPremiumPercent}% margin</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Projected Annual Run-Rate:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {newProjectedAnnualRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Commission Your Brand Identity <ArrowRight className="w-4 h-4" />
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
            Brand Identity Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Why Strategic Branding Outperforms Cheap Logo Design
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Brand Dimension</th>
                <th className="py-4 px-4 text-white/40">Fiverr / Cheap Logo</th>
                <th className="py-4 px-4 text-white/40">Print Shop Designer</th>
                <th className="py-4 px-4 text-white/40">Generic Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Sovereign Branding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Originality &amp; IP Protection</td>
                <td className="py-5 px-4 text-red-400">Recycled stock clipart</td>
                <td className="py-5 px-4 text-red-400">Non-trademarkable</td>
                <td className="py-5 px-4 text-yellow-400">Template-based</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% Bespoke Trademark-Ready Vector Files</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Arabic / English Typography</td>
                <td className="py-5 px-4 text-red-400">Generic computer font</td>
                <td className="py-5 px-4 text-red-400">Mismatched weights</td>
                <td className="py-5 px-4 text-yellow-400">Basic Arabic match</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Custom Calligraphic Geometry &amp; Flow</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Brand Guidelines Scope</td>
                <td className="py-5 px-4 text-red-400">1-page PNG file</td>
                <td className="py-5 px-4 text-red-400">None provided</td>
                <td className="py-5 px-4 text-yellow-400">10-page basic PDF</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">60+ Page Master Brand Bible &amp; Design System</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Collateral &amp; Stationery</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-yellow-400">Standard business card only</td>
                <td className="py-5 px-4 text-yellow-400">Basic stationery</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Complete Suite: Decks, Profiles, Signage &amp; Web</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Commercial Value</td>
                <td className="py-5 px-4 text-red-400">Low-trust perception</td>
                <td className="py-5 px-4 text-red-400">Commodity look</td>
                <td className="py-5 px-4 text-yellow-400">Average positioning</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">High-Authority Premium Pricing Power</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Branding Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Deliverable Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our Corporate Branding Deliverables
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="w-6 h-6 text-emerald-400" />,
                title: "Bilingual Logo Architecture",
                desc: "Original visual marks engineered in full vector precision with balanced English and Arabic typography systems crafted for regional cultural prestige."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "60+ Page Brand Guidelines Manual",
                desc: "A comprehensive operational Brand Bible defining exact color formulas (Pantone, CMYK, RGB, Hex), typography scales, and incorrect usage exclusions."
              },
              {
                icon: <PenTool className="w-6 h-6 text-emerald-400" />,
                title: "Executive Corporate Stationery",
                desc: "Luxury business cards with foil/emboss specs, official bilingual letterheads, invoice templates, corporate presentation folders, and email signatures."
              },
              {
                icon: <Award className="w-6 h-6 text-emerald-400" />,
                title: "Investor Pitch Decks & Profiles",
                desc: "High-impact PowerPoint and Keynote pitch decks and corporate company profile PDFs designed to close multi-million dirham enterprise contracts."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Digital & Social Design Systems",
                desc: "Modular Figma design systems, social media post templates, video intro motion stingers, and high-resolution digital banners."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Signage & Exhibition Environmental UI",
                desc: "Building facade signage specifications, vehicle fleet branding, and high-impact exhibition booth designs for Dubai World Trade Centre expos."
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
            Brand Creation Lifecycle
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Corporate Identity Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Discovery & Strategy", text: "We analyze your target market, competitors, value propositions, and define your brand archetype." },
            { step: "02", title: "Visual Ideation", text: "We craft 3 distinct visual directions with bespoke bilingual typography and balanced geometry." },
            { step: "03", title: "Touchpoint Review", text: "We present concepts rendered onto real-world collateral (stationery, digital apps, signage)." },
            { step: "04", title: "Collateral Suite", text: "We design complete stationery suites, presentation decks, and social media template kits." },
            { step: "05", title: "Guidelines & Export", text: "We compile your 60+ page Brand Bible and deliver all master vector files with full IP rights." }
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
              Strategic Brand Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE executives need to know about corporate branding, trademarking, and visual positioning.
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
            Elevate Your Market Status
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Build a Brand That Commands Authority.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's design a prestigious, bilingual corporate identity that unlocks pricing power and positions your company for long-term dominance across the UAE and GCC.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book Brand Discovery Session <ArrowRight className="w-4 h-4" />
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
