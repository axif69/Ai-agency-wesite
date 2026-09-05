"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Target, BarChart3, TrendingUp, DollarSign, Users, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, 
  PhoneCall, HelpCircle, Layers, Eye, RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function PPC() {
  // Interactive Paid Ads ROAS & Lead Cost Forecaster State
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(15000); // AED
  const [targetCostPerClick, setTargetCostPerClick] = useState(4.5); // AED
  const [landingPageConversionRate, setLandingPageConversionRate] = useState(3.5); // %
  const [avgClientContractValue, setAvgClientContractValue] = useState(25000); // AED

  // Calculations
  const estimatedClicks = Math.round(monthlyAdSpend / targetCostPerClick);
  const estimatedQualifiedLeads = Math.round(estimatedClicks * (landingPageConversionRate / 100));
  const costPerLead = estimatedQualifiedLeads > 0 ? Math.round(monthlyAdSpend / estimatedQualifiedLeads) : 0;
  const estimatedClosedDeals = Math.round(estimatedQualifiedLeads * 0.15); // Assuming 15% lead-to-close rate
  const estimatedPipelineValue = estimatedClosedDeals * avgClientContractValue;
  const projectedROAS = monthlyAdSpend > 0 ? (estimatedPipelineValue / monthlyAdSpend).toFixed(1) : "0";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Google Ads & PPC Agency Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/ppc-google-ads-agency-dubai",
    "telephone": "+971545866094",
    "priceRange": "AED 4,000 - AED 25,000 / month management",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "High-ROAS Google Ads, Meta Ads (Instagram/Facebook), and LinkedIn PPC management in Dubai and Sharjah. Server-side CAPI tracking, high-intent B2B lead generation, negative keyword pruning, and custom landing page optimization."
  };

  const faqData = [
    {
      q: "Why do most UAE businesses waste money on Google and Meta Ads?",
      a: "Most UAE companies waste 40% to 60% of their ad spend due to three fatal mistakes: sending expensive ad clicks to slow generic homepages instead of dedicated high-converting landing pages, failing to filter out broad negative keywords that attract irrelevant tire-kickers, and relying on broken browser pixels rather than server-side conversion tracking (Meta CAPI / GA4 Server-Side). We eliminate ad waste with rigorous negative keyword exclusions and custom-built conversion funnels."
    },
    {
      q: "What ad platforms do you specialize in for Dubai and GCC campaigns?",
      a: "We manage high-intent campaigns across Google Search, Performance Max (PMax), Google Display, Meta Ads (Instagram & Facebook Lead Generation), LinkedIn Ads for enterprise B2B sales, TikTok Ads for high-volume retail/ecommerce, and YouTube video advertising targeting high-net-worth GCC investors."
    },
    {
      q: "How does server-side conversion tracking (CAPI) improve our ROAS in the UAE?",
      a: "Modern privacy updates (iOS 14.5+ and browser ad-blockers) block up to 35% of standard browser cookie tracking. By deploying Meta Conversions API (CAPI) and Google Tag Manager Server-Side via cloud containers, we feed 100% of confirmed purchase and lead data directly back to ad algorithms, training them to target higher-quality buyers at lower acquisition costs."
    },
    {
      q: "Do you design custom landing pages for our advertising campaigns?",
      a: "Yes! High ROAS is 50% ad targeting and 50% landing page conversion rate. We never send paid traffic to your homepage. We design and build dedicated, lightning-fast landing pages with sticky 1-tap WhatsApp buttons, instant click-to-call triggers, social proof badges, and friction-free inquiry forms tailored to your ad messaging."
    },
    {
      q: "What is the recommended minimum monthly ad budget for advertising in Dubai?",
      a: "For Google Search or Meta lead generation in Dubai and the UAE, we recommend a minimum media budget of AED 5,000 to AED 10,000 per month paid directly to Google/Meta. This budget allows the ad algorithms to exit the learning phase quickly and gather sufficient conversion data to optimize your cost per lead (CPL)."
    },
    {
      q: "How quickly can we expect qualified leads once our campaigns launch?",
      a: "With Google Search and Meta Ads, qualified inbound inquiries typically begin generating within 24 to 48 hours of campaign launch. Over the first 30 days, we conduct daily bid adjustments, search query audits, and A/B ad creative testing to systematically lower your Cost Per Lead."
    },
    {
      q: "Do we pay the ad spend directly to Google/Meta, or through your agency?",
      a: "You retain 100% direct ownership of your Google Ads and Meta Business Manager accounts. Your company credit card is linked directly to the ad platforms, ensuring complete financial transparency with zero hidden markups or budget skimming."
    },
    {
      q: "How do you filter out spam, irrelevant job seekers, and unqualified leads?",
      a: "We implement rigorous lead qualification layers: exact-match and phrase-match keyword bidding, daily negative keyword additions, qualifying drop-down questions on lead forms (e.g. minimum project budget, company size), reCAPTCHA v3 anti-bot verification, and automatic IP blocking."
    },
    {
      q: "Will we receive regular reporting on our campaign performance?",
      a: "Yes. You receive real-time access to an interactive 24/7 Google Looker Studio dashboard tracking your exact Ad Spend, Clicks, Cost Per Click (CPC), Leads, Cost Per Lead (CPL), and estimated Pipeline ROAS. We also conduct bi-weekly strategy review calls."
    },
    {
      q: "Do you manage bilingual English and Arabic advertising campaigns?",
      a: "Yes. In the UAE and GCC, bilingual campaigns are essential. We write localized Arabic ad copy tailored for Khaleeji cultural resonance alongside crisp English business copy, ensuring maximum reach across local nationals and expatriate decision-makers."
    },
    {
      q: "How does your agency fee structure work?",
      a: "We charge a transparent flat monthly management fee based on campaign complexity and ad spend tiers, starting from AED 4,000 per month. There are no surprise percentage penalties when you scale your ad budget."
    },
    {
      q: "How do we get started with a PPC campaign audit or new account setup?",
      a: "Contact our digital advertising desk on +971 54 586 6094 or submit a request on our contact page. If you have an existing ad account, we will provide a complimentary 20-Point Ad Waste Audit showing exactly where budget is being lost and how to fix it."
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
    "name": "How to Launch a High-ROAS Google and Meta Ads Campaign in Dubai",
    "description": "The step-by-step performance marketing methodology for generating high-intent B2B and consumer leads in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Market Intent & Keyword Mining",
        "text": "We identify high-commercial-intent search queries and competitor bid strategies across Dubai, Sharjah, and Abu Dhabi."
      },
      {
        "@type": "HowToStep",
        "name": "Dedicated Landing Page Engineering",
        "text": "We build fast, responsive landing pages with friction-free lead capture forms and 1-tap WhatsApp consultation triggers."
      },
      {
        "@type": "HowToStep",
        "name": "Server-Side Tracking (CAPI & GA4)",
        "text": "We configure Google Tag Manager Server-Side and Meta Conversions API for 100% verified lead data attribution."
      },
      {
        "@type": "HowToStep",
        "name": "Ad Creative & Copywriting Rollout",
        "text": "We craft compelling bilingual English and Arabic ad copy, visual carousel banners, and short-form video assets."
      },
      {
        "@type": "HowToStep",
        "name": "Daily Bid Optimization & Negative Keyword Pruning",
        "text": "We monitor search queries daily, exclude irrelevant terms, and scale winning keyword sets to maximize ROAS."
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
            <Target className="w-4 h-4 text-emerald-400" /> Google Ads &bull; Meta Ads &bull; Dubai & Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            PPC &amp; Google Ads <br />
            <span className="italic text-white/50 font-normal">Agency Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Stop burning marketing budget on unqualified clicks. We engineer surgical Google Search, Performance Max, and Meta Ads campaigns paired with custom high-converting landing pages and server-side tracking to maximize your UAE return on ad spend (ROAS).
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Claim Free 20-Point PPC Audit <ArrowRight className="w-4 h-4" />
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
            { metric: "4.8x", label: "Average Client ROAS", sub: "Verified Pipeline Value" },
            { metric: "-38%", label: "Reduction in Cost Per Lead", sub: "Via Negative Keyword Mining" },
            { metric: "100%", label: "Direct Ad Account Ownership", sub: "Zero Agency Budget Skimming" },
            { metric: "Server-Side", label: "Meta CAPI & GA4 Tracking", sub: "100% Accurate Data Attribution" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Paid Ads ROAS & Pipeline Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Live Campaign Forecaster
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Forecast Your Paid Ads Lead Flow &amp; ROAS
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Adjust your monthly media spend, target cost per click, and average deal size below to see estimated qualified inquiries and projected pipeline revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Ad Budget (Media Spend):</span>
                  <span className="text-white font-bold">AED {monthlyAdSpend.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="3000" 
                  max="100000" 
                  step="1000" 
                  value={monthlyAdSpend} 
                  onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Estimated Cost Per Click (CPC):</span>
                  <span className="text-white font-bold">AED {targetCostPerClick.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="1.5" 
                  max="15.0" 
                  step="0.5" 
                  value={targetCostPerClick} 
                  onChange={(e) => setTargetCostPerClick(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Landing Page Conversion Rate:</span>
                  <span className="text-white font-bold">{landingPageConversionRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1.0" 
                  max="8.0" 
                  step="0.5" 
                  value={landingPageConversionRate} 
                  onChange={(e) => setLandingPageConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Client Contract / Sale Value:</span>
                  <span className="text-white font-bold">AED {avgClientContractValue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="5000" 
                  value={avgClientContractValue} 
                  onChange={(e) => setAvgClientContractValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Qualified Inquiries / Month
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {estimatedQualifiedLeads} Leads <span className="text-xs font-sans text-white/50">(@ ~AED {costPerLead}/lead)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Estimated Closed Deals:</span>
                  <span className="text-white text-sm font-bold">{estimatedClosedDeals} deals</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Projected Pipeline Value:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {estimatedPipelineValue.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-white/60 block mb-3 font-light">
                  Estimated Campaign Return on Ad Spend: <strong className="text-white font-bold">{projectedROAS}x ROAS</strong>
                </span>
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Schedule Your Paid Ads Strategy Call <ArrowRight className="w-4 h-4" />
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
            PPC Agency Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Asif Digital Delivers Higher Quality Leads
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">PPC Management Area</th>
                <th className="py-4 px-4 text-white/40">DIY / In-House Guesswork</th>
                <th className="py-4 px-4 text-white/40">Cheap Freelancer</th>
                <th className="py-4 px-4 text-white/40">Generic Big Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Performance Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Ad Traffic Destination</td>
                <td className="py-5 px-4 text-red-400">Generic Homepage</td>
                <td className="py-5 px-4 text-red-400">Standard Contact Page</td>
                <td className="py-5 px-4 text-yellow-400">Basic Unbounce Page</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Custom Next.js 1-Tap Landing Pages</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Negative Keyword Mining</td>
                <td className="py-5 px-4 text-red-400">Never configured</td>
                <td className="py-5 px-4 text-red-400">Monthly check only</td>
                <td className="py-5 px-4 text-yellow-400">Basic list</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Daily Search Term Audit & Exclusions</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Conversion Tracking Layer</td>
                <td className="py-5 px-4 text-red-400">Broken / Pageviews</td>
                <td className="py-5 px-4 text-red-400">Basic browser pixel</td>
                <td className="py-5 px-4 text-yellow-400">Standard GA4</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Meta CAPI + GA4 Server-Side Container</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Ad Copy Localization</td>
                <td className="py-5 px-4 text-red-400">English only</td>
                <td className="py-5 px-4 text-red-400">Google Translate Arabic</td>
                <td className="py-5 px-4 text-yellow-400">Standard templates</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Khaleeji Arabic + High-Intent B2B Copy</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Ad Account Ownership</td>
                <td className="py-5 px-4 text-white">Client owned</td>
                <td className="py-5 px-4 text-yellow-400">Mixed</td>
                <td className="py-5 px-4 text-red-400">Agency holds account hostage</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% Client-Owned Direct Billing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full PPC Management Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Full-Funnel Management
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our UAE Paid Advertising Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-6 h-6 text-emerald-400" />,
                title: "Google Search & PMax Mastery",
                desc: "Capture active buyers searching for your exact solutions across Dubai and the UAE with high-intent exact match keywords and automated smart bidding."
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-400" />,
                title: "Meta Ads (Instagram & Facebook)",
                desc: "Target affluent GCC demographics, business owners, and expatriates with high-converting video reels, carousels, and instant lead capture forms."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
                title: "LinkedIn B2B Account Targeting",
                desc: "Reach verified C-level executives, procurement directors, and business owners across UAE free zones and multinational headquarters."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Custom High-Speed Landing Pages",
                desc: "We engineer dedicated, sub-second landing pages tailored to each ad group, featuring friction-free WhatsApp and phone consultation triggers."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Server-Side Tracking (CAPI & GA4)",
                desc: "Bypass iOS ad blockers and cookie restrictions with server-to-server conversion telemetry, maximizing algorithm optimization accuracy."
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
                title: "24/7 Live Looker Studio Dashboards",
                desc: "Access real-time, transparent reporting tracking every dirham of ad spend, cost per lead, and revenue generated without manual PDFs."
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
            Execution Roadmap
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage PPC Launch &amp; Scaling Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Commercial Audit", text: "We inspect your competitor bids, past ad data, search query waste, and determine target Cost Per Acquisition (CPA)." },
            { step: "02", title: "Landing Page Build", text: "We design and deploy high-speed mobile landing pages with 1-click WhatsApp and call conversion tracking." },
            { step: "03", title: "Tracking & CAPI", text: "We set up Google Tag Manager Server-Side and Meta Conversions API for 100% verified conversion telemetry." },
            { step: "04", title: "Campaign Launch", text: "We launch structured ad groups with localized English and Arabic copy, exact match keywords, and negative lists." },
            { step: "05", title: "Daily Optimization", text: "We review search terms daily, eliminate non-converting queries, and scale winning bids to increase ROAS." }
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
              Strategic Advertising Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Key questions UAE business owners ask before hiring a Google Ads and Meta PPC agency.
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
            Stop Wasting Ad Budget
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Scale Your UAE Lead Flow With Surgical PPC.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let our performance marketing team audit your current campaigns or design a high-converting launch strategy. Speak directly with our senior strategist in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Get Free 20-Point PPC Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 text-xs text-white/50 font-mono">
            <span>Looking for AI-assisted bidding, server-side CAPI &amp; CRM revenue attribution?</span>
            <Link href="/ai-ppc-agency-dubai" className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
              Explore Dedicated AI PPC Agency Desk <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
