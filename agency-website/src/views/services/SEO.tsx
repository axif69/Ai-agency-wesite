"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, TrendingUp, Compass, Globe, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, BarChart3, PhoneCall, 
  HelpCircle, Layers, Eye, RefreshCw, Cpu
} from "lucide-react";
import Link from "next/link";

export default function SEO() {
  // Interactive Organic Search Traffic & Value Simulator State
  const [targetKeywordsCount, setTargetKeywordsCount] = useState(35);
  const [avgSearchVolume, setAvgSearchVolume] = useState(1200); // monthly searches per keyword
  const [avgCustomerValue, setAvgCustomerValue] = useState(15000); // AED

  // Calculations
  const totalSearchPool = targetKeywordsCount * avgSearchVolume;
  const estimatedTop3Clicks = Math.round(totalSearchPool * 0.28); // 28% CTR for Top 3 rankings
  const estimatedInboundLeads = Math.round(estimatedTop3Clicks * 0.04); // 4% conversion to inquiry
  const estimatedClosedDeals = Math.round(estimatedInboundLeads * 0.2); // 20% close rate
  const annualOrganicRevenue = estimatedClosedDeals * avgCustomerValue * 12;
  const equivalentGoogleAdValue = Math.round(estimatedTop3Clicks * 6.5 * 12); // Assuming AED 6.50 CPC equivalent

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital SEO & AEO Agency Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/seo-agency-dubai-sharjah-uae",
    "telephone": "+971545866094",
    "priceRange": "AED 4,500 - AED 25,000 / month",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Enterprise SEO and Answer Engine Optimization (AEO) in Dubai and Sharjah. Entity-based semantic search, Knowledge Graph clustering, Perplexity & ChatGPT citation engineering, and bilingual Arabic/English search dominance."
  };

  const faqData = [
    {
      q: "What is the difference between traditional SEO and Answer Engine Optimization (AEO)?",
      a: "Traditional SEO focuses on ranking ten blue links in Google Search using keyword matching and backlinks. Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) engineer your content to be cited directly by AI search engines like ChatGPT Search, Perplexity AI, Google AI Overviews, and Gemini. We structure your website with semantic entities, data tables, and FAQ schemas so AI engines recognize your business as the definitive authority to recommend."
    },
    {
      q: "How long does it take to rank on the first page of Google in Dubai and the UAE?",
      a: "For low-to-medium competition local search terms (e.g. specialized B2B services or Sharjah industrial keywords), first-page rankings typically materialize within 60 to 90 days. For highly competitive Dubai commercial sectors (such as Real Estate, Corporate Legal, or E-Commerce), achieving top-3 rankings generally requires 4 to 6 months of disciplined technical SEO, entity content expansion, and authoritative local digital PR."
    },
    {
      q: "Do you guarantee #1 rankings on Google?",
      a: "No ethical SEO agency can guarantee a #1 ranking on Google, as search algorithms update thousands of times per year. What we guarantee is a proven, battle-tested engineering methodology: sub-second Core Web Vitals, semantic schema markup, 100% white-hat link acquisition, comprehensive keyword silo architectures, and transparent weekly rank tracking."
    },
    {
      q: "Is bilingual Arabic and English SEO included?",
      a: "Yes! Over 55% of commercial and government searches across the UAE and Saudi Arabia are conducted in Arabic. We optimize your website with native Arabic keyword research, localized Khaleeji search phrases, and proper hreflang language tags so your business captures high-intent traffic across both Arabic and English queries."
    },
    {
      q: "How do you optimize our Google Business Profile (GMB) for local Google Maps rankings?",
      a: "We execute complete Google Maps Local SEO: Name, Address, and Phone (NAP) synchronization across top UAE directories, Google Maps categories optimization, geotagged photo uploads, weekly strategic GMB posts, and automated 5-star customer review collection funnels."
    },
    {
      q: "What type of backlinks and digital PR do you acquire for our website?",
      a: "We strictly reject dangerous private blog networks (PBNs), automated link farms, and cheap spam links that risk Google manual penalties. We earn high-authority editorial backlinks through data-backed industry reports, guest commentary on respected UAE business publications (e.g. Arabian Business, Gulf News, Zawya), and verified local commercial directories."
    },
    {
      q: "How do you fix technical SEO issues like crawl errors and slow Core Web Vitals?",
      a: "We conduct deep technical audits resolving render-blocking JavaScript, database query bottlenecks, broken redirects, XML sitemap errors, canonical tag mismatches, and mobile layout shifts. We ensure your website scores 90+ on Google PageSpeed Insights."
    },
    {
      q: "How does your SEO strategy prevent traffic loss during Google Core algorithm updates?",
      a: "We build on Google's helpful content guidelines and E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness). By focusing on comprehensive 2,500+ word guides, original industry data, verified author credentials, and authentic user utility, our client websites consistently gain traffic when low-quality content sites get penalized."
    },
    {
      q: "Will we receive transparent monthly SEO reports and rank tracking dashboards?",
      a: "Yes. You receive real-time 24/7 access to a live Google Looker Studio dashboard tracking your exact Google organic keyword positions, organic traffic impressions, click-through rates, and inbound lead conversions. We also hold monthly strategic progress calls."
    },
    {
      q: "Can SEO replace our paid advertising (Google Ads) spend?",
      a: "SEO and PPC work best together. Google Ads delivers immediate traffic from day one, while SEO builds compounding, long-term organic equity. Over 6 to 12 months, as your organic rankings rise to top-3 positions, your customer acquisition cost drops dramatically, allowing you to reduce ad spend while increasing inbound leads."
    },
    {
      q: "How does your pricing structure work for SEO and AEO in the UAE?",
      a: "Our monthly SEO and AEO growth plans range from AED 4,500 per month for focused local businesses up to AED 18,000+ per month for competitive enterprise markets, extensive bilingual content clusters, and high-tier digital PR."
    },
    {
      q: "How do we get started with an SEO audit for our website?",
      a: "Contact our search strategy desk on +971 54 586 6094 or submit your website URL via our contact form. We will provide a comprehensive 35-Point Technical & Competitor Gap Audit within 24 hours."
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
    "name": "How to Achieve Google and AI Search Dominance in Dubai and the UAE",
    "description": "The systematic 5-stage organic search engineering roadmap for UAE businesses.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Technical Architecture & Core Web Vitals Audit",
        "text": "We eliminate indexing bottlenecks, fix broken redirects, and optimize mobile page speeds to sub-1.0s."
      },
      {
        "@type": "HowToStep",
        "name": "Semantic Entity & High-Intent Keyword Mapping",
        "text": "We map commercial search intent across Dubai, Sharjah, and Abu Dhabi in both English and Arabic."
      },
      {
        "@type": "HowToStep",
        "name": "Content Hub Expansion & AEO Structuring",
        "text": "We publish 2,500+ word authoritative guides with structured comparison tables and FAQPage schemas for Perplexity/ChatGPT citations."
      },
      {
        "@type": "HowToStep",
        "name": "Local GMB & UAE Citation Synchronization",
        "text": "We optimize Google Business Profile signals, local map pack rankings, and verified directory citations."
      },
      {
        "@type": "HowToStep",
        "name": "Digital PR & High-Authority Editorial Outreach",
        "text": "We secure legitimate editorial backlinks from leading UAE commercial media and industry journals."
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
            <Search className="w-4 h-4 text-emerald-400" /> Enterprise SEO &bull; AEO &bull; Dubai & Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            SEO &amp; Search <br />
            <span className="italic text-white/50 font-normal">Dominance Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Outrank competitors on Google Search and dominate AI answers on Perplexity and ChatGPT Search. We engineer semantic entity SEO, sub-second Core Web Vitals, and authoritative bilingual Arabic/English content hubs that generate continuous inbound organic leads.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Get Free 35-Point SEO Audit <ArrowRight className="w-4 h-4" />
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
            { metric: "Top-3", label: "Target Google Rankings", sub: "For High-Intent UAE Terms" },
            { metric: "AEO Ready", label: "Perplexity & ChatGPT Citations", sub: "Structured Schema Graph" },
            { metric: "Bilingual", label: "Native Arabic & English", sub: "Complete UAE Market Reach" },
            { metric: "100%", label: "White-Hat Digital PR", sub: "Zero Risk of Google Penalties" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Organic Search Value Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Organic Search ROI Valuation
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate the Commercial Value of Top-3 Rankings
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Ranking in the top 3 on Google for high-intent UAE search queries captures 28% to 35% of all commercial search volume for free. See the estimated business pipeline your company is currently leaving on the table.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Target Commercial Keywords:</span>
                  <span className="text-white font-bold">{targetKeywordsCount} keywords</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="150" 
                  step="5" 
                  value={targetKeywordsCount} 
                  onChange={(e) => setTargetKeywordsCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Monthly Search Volume / Keyword:</span>
                  <span className="text-white font-bold">{avgSearchVolume.toLocaleString()} searches</span>
                </div>
                <input 
                  type="range" 
                  min="300" 
                  max="5000" 
                  step="100" 
                  value={avgSearchVolume} 
                  onChange={(e) => setAvgSearchVolume(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Customer / Client Contract Value:</span>
                  <span className="text-white font-bold">AED {avgCustomerValue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="100000" 
                  step="2000" 
                  value={avgCustomerValue} 
                  onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Top-3 Organic Visitors
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {estimatedTop3Clicks.toLocaleString()} <span className="text-xs font-sans text-white/50">clicks / month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Equivalent Ad Value:</span>
                  <span className="text-white text-sm font-bold">AED {Math.round(equivalentGoogleAdValue / 12).toLocaleString()} / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Deal Pipeline:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {Math.round(annualOrganicRevenue).toLocaleString()} / yr</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Claim Your Top-3 SEO Roadmap <ArrowRight className="w-4 h-4" />
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
            SEO Methodology Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Why Entity-Based SEO Wins in the AI Era
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">SEO Approach</th>
                <th className="py-4 px-4 text-white/40">Cheap Freelancer / Fiverr</th>
                <th className="py-4 px-4 text-white/40">Outdated 2018 Agency</th>
                <th className="py-4 px-4 text-white/40">Automated AI Spam</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Entity &amp; AEO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Content Strategy</td>
                <td className="py-5 px-4 text-red-400">300-word spun articles</td>
                <td className="py-5 px-4 text-yellow-400">500-word basic blogs</td>
                <td className="py-5 px-4 text-red-400">Generic ChatGPT spam</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">2,500+ Word Authoritative Entity Hubs</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">AI Search Citation (AEO)</td>
                <td className="py-5 px-4 text-red-400">Zero optimization</td>
                <td className="py-5 px-4 text-red-400">No knowledge of AEO</td>
                <td className="py-5 px-4 text-red-400">Hallucinated content</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Structured Data &amp; Direct AI Engine Citations</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Backlink Quality</td>
                <td className="py-5 px-4 text-red-400">Toxic spam links</td>
                <td className="py-5 px-4 text-yellow-400">Low-tier web 2.0</td>
                <td className="py-5 px-4 text-red-400">Link farm networks</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Verified UAE Digital PR &amp; Media Mentions</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Technical Architecture</td>
                <td className="py-5 px-4 text-red-400">Ignored</td>
                <td className="py-5 px-4 text-yellow-400">Basic Yoast checklist</td>
                <td className="py-5 px-4 text-red-400">No technical depth</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Sub-1s Core Web Vitals + Triple Schema Graphs</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Arabic Capability</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-yellow-400">Google Translate</td>
                <td className="py-5 px-4 text-yellow-400">Unnatural syntax</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Khaleeji Keyword Siloing &amp; RTL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full SEO & AEO Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Comprehensive Search Engineering
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our 360° Search Dominance Methodology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-6 h-6 text-emerald-400" />,
                title: "Semantic Entity & Topic Siloing",
                desc: "We structure your website into clear thematic clusters and knowledge graphs, proving domain authority to Google's neural ranking algorithms."
              },
              {
                icon: <Cpu className="w-6 h-6 text-emerald-400" />,
                title: "Answer Engine Optimization (AEO)",
                desc: "Engineer content with direct FAQ schemas, bulleted steps, and structured tables so Perplexity, Gemini, and ChatGPT cite your brand as the primary source."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Core Web Vitals & Technical SEO",
                desc: "Sub-second server response times, proper XML sitemaps, canonical tags, clean robots.txt, and 100% crawl budget optimization."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Bilingual English & Arabic SEO",
                desc: "Capture the full UAE and GCC market with localized Arabic keyword indexing, dedicated hreflang tags, and culturally resonant search copy."
              },
              {
                icon: <Compass className="w-6 h-6 text-emerald-400" />,
                title: "Google Maps & Local GMB Dominance",
                desc: "Rank in the coveted Google 3-Pack Maps for high-intent 'near me' and local Dubai/Sharjah commercial search queries."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "High-Authority UAE Digital PR",
                desc: "Earn powerful contextual backlinks from top UAE business news outlets, industry journals, and regional commercial publications."
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
            Execution Protocol
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Search Domination Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Technical Audit", text: "We crawl your entire website, fix indexing errors, eliminate duplicate content, and accelerate mobile load speeds." },
            { step: "02", title: "Entity Mapping", text: "We map high-intent commercial keywords and competitor ranking gaps across Dubai and the UAE." },
            { step: "03", title: "Content Expansion", text: "We publish deep, authoritative 2,500+ word guides with structured comparison tables and FAQ schemas." },
            { step: "04", title: "Authority Building", text: "We execute white-hat digital PR and local UAE directory citations to build domain trust." },
            { step: "05", title: "Tracking & Growth", text: "We monitor keyword ranks daily via Looker Studio and refine strategy to capture top-3 search positions." }
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
              Strategic Search Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE business leaders need to know about organic search rankings, AEO, and return on investment.
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
            Claim Your Top-3 Search Positions
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Dominate Google &amp; AI Search in Dubai.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Stop losing qualified buyers to lower-quality competitors who simply rank higher. Let our search engineers craft your path to top-3 organic dominance.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Get Free 35-Point SEO Audit <ArrowRight className="w-4 h-4" />
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
