"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, CheckCircle2, ChevronDown, 
  HelpCircle, Layers, MessageSquare, 
  Shield, Sparkles, Target, Zap, 
  BarChart3, Calculator, TrendingUp, Cpu, 
  Database, RefreshCw, PhoneCall, ExternalLink
} from "lucide-react";

export default function AiMarketingDubai() {
  // Interactive Ad Spend Waste Calculator State
  const [adSpend, setAdSpend] = useState<number>(25000);
  const [responseTime, setResponseTime] = useState<string>("1-4 hours");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic calculations based on UAE market benchmarks
  const metrics = useMemo(() => {
    // Response time decay penalty
    let decayFactor = 0.25; // default for 1-4 hours
    if (responseTime === "under-5-mins") decayFactor = 0.05;
    else if (responseTime === "15-60-mins") decayFactor = 0.15;
    else if (responseTime === "same-day") decayFactor = 0.40;
    else if (responseTime === "next-day") decayFactor = 0.60;

    const estimatedWastedSpend = Math.round(adSpend * decayFactor);
    const potentialQualifiedLift = Math.round((adSpend * 0.35) / 180); // Estimated additional qualified leads
    const projectedCostReduction = Math.round(decayFactor * 60);

    return {
      wasted: estimatedWastedSpend,
      leadLift: potentialQualifiedLift,
      cplReduction: projectedCostReduction
    };
  }, [adSpend, responseTime]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* ── 1. Hero Section ── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-5xl relative z-10 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-white/70 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI Performance Marketing & Lead Automation • Dubai & UAE
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05] mb-8">
            AI Marketing & Lead Generation <br />
            <span className="text-white/60 italic font-light">Agency in Dubai</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            We replace fragmented ad retainers with closed-loop growth systems: predictive Google & Meta ads, sub-minute WhatsApp qualification, CRM lead scoring, and verifiable revenue attribution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-semibold uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Book Strategic Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/free-growth-audit" 
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-5 rounded-full font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
            >
              Request Performance Audit
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-serif font-bold text-white">&lt; 30s</div>
              <div className="text-xs text-white/50 font-light mt-1">WhatsApp Lead Intake</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white">Closed-Loop</div>
              <div className="text-xs text-white/50 font-light mt-1">CRM Revenue Attribution</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white">Multivariate</div>
              <div className="text-xs text-white/50 font-light mt-1">Algorithmic Ad Testing</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white">100% UAE</div>
              <div className="text-xs text-white/50 font-light mt-1">Bilingual Arabic & English</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Direct Answer Block (AEO / GEO Entity Citability) ── */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/15 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-4">
            <Sparkles className="w-4 h-4" />
            System Overview & Executive Definition
          </div>
          <h2 className="text-2xl md:text-3xl font-serif mb-4 text-white">
            What is an AI Marketing Agency?
          </h2>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-6">
            In the UAE market, an <strong>AI marketing agency</strong> integrates predictive advertising management (Google Ads, Meta Ads, TikTok) with immediate WhatsApp conversational qualification, automated CRM pipeline scoring, and closed-loop revenue attribution. 
          </p>
          <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
            Unlike traditional digital marketing agencies that manually tweak ad bids once a week and report vanity impressions, an AI marketing growth system connects your front-end ad spend directly to back-end closed deals. When an ad generates a click, AI handles instant qualification, filters spam, pushes scored leads to your sales reps, and sends verified deal revenue back to ad algorithms to continuously lower Customer Acquisition Cost (CAC).
          </p>
        </div>
      </section>

      {/* ── 3. Traditional Agency vs. Asif Digital AI System ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Comparative Performance Analysis
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Traditional Agency Retainer vs. AI Performance System
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm md:text-base">
            Why high-growth UAE businesses in real estate, professional services, and B2B are transitioning from manual agency retainers to automated growth systems.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-3xl bg-white/[0.01]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-5 px-6 font-semibold text-white/60 font-mono text-xs uppercase">Evaluation Dimension</th>
                <th className="py-5 px-6 font-semibold text-red-400/80 font-mono text-xs uppercase">Traditional Dubai Agency</th>
                <th className="py-5 px-6 font-semibold text-emerald-400 font-mono text-xs uppercase">Asif Digital AI Growth System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-white/80">
              <tr>
                <td className="py-5 px-6 font-medium text-white">Lead Follow-Up Speed</td>
                <td className="py-5 px-6 text-white/50">4 to 24 hours (manual sales desk forwarding)</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Instant &lt; 30 seconds via WhatsApp Cloud API</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Campaign Bid Optimization</td>
                <td className="py-5 px-6 text-white/50">Manual weekly or bi-weekly manual bid adjustments</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Continuous algorithmic budget reallocation 24/7</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Creative Testing & Iteration</td>
                <td className="py-5 px-6 text-white/50">2 to 4 static image ad variations per month</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Multivariate automated creative testing at scale</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Lead Quality & Filtering</td>
                <td className="py-5 px-6 text-white/50">Unqualified form fills; sales teams waste hours on spam</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Automated WhatsApp qualification & budget scoring before CRM routing</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Revenue Attribution</td>
                <td className="py-5 px-6 text-white/50">Vanity impressions, clicks, and disconnected CPL reports</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Offline Conversions (CAPI) tied directly to closed sales revenue</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Regional Languages</td>
                <td className="py-5 px-6 text-white/50">Literal translation agency handoffs with delays</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Native bilingual Arabic & English ad copy and conversational bot logic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. Four Core Commercial Pillars ── */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
              Full-Funnel Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              Our Core AI Marketing Pillars
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm md:text-base">
              Engineered specifically for Dubai and UAE commercial environments where speed-to-lead and attribution determine market share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6">
                  <Target className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif mb-4">
                  1. Predictive Paid Media (Google & Meta Ads)
                </h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                  We deploy automated bid management, predictive audience modeling, and Conversions API (CAPI) integrations. Stop wasting ad spend on clickers who never convert. Our systems feed CRM deal stages back to Google and Meta algorithms to find verified high-ticket buyers.
                </p>
                <ul className="space-y-2.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Google Search & Performance Max automated portfolio bidding
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Meta Ads Manager dynamic creative testing & CAPI offline tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Negative keyword and placement automation to cut wasted budget
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <Link href="/services/ppc-google-ads-agency-dubai" className="text-xs uppercase tracking-wider text-white font-medium hover:text-emerald-400 inline-flex items-center gap-1.5 transition-colors">
                  Explore UAE PPC Management <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif mb-4">
                  2. Sub-Minute WhatsApp Conversion Funnels
                </h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                  In Dubai, 85% of ad conversions drop off when forced to fill static forms or wait hours for a callback. We route traffic directly into verified WhatsApp Cloud API funnels that qualify budgets, collect requirements, and book appointments within 30 seconds.
                </p>
                <ul className="space-y-2.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Click-to-WhatsApp ad funnels on Instagram, Facebook & Google
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Instant qualification, brochure delivery, and calendar scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Real-time routing of qualified leads directly to senior sales brokers
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <Link href="/contact" className="text-xs uppercase tracking-wider text-white font-medium hover:text-emerald-400 inline-flex items-center gap-1.5 transition-colors">
                  Request WhatsApp Demo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6">
                  <Database className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif mb-4">
                  3. Predictive CRM Lead Scoring & Attribution
                </h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                  We bridge the gap between marketing platforms and your sales CRM (HubSpot, Salesforce, Zoho). Inbound leads are instantly scored based on intent signals, company size, or property budget, ensuring your sales team focuses 100% of their time on deal-ready prospects.
                </p>
                <ul className="space-y-2.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Automated synchronization with HubSpot, Salesforce & Zoho
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Real-time webhook pipelines via Make, n8n, and custom APIs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Full customer journey tracking from first ad impression to bank deposit
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <Link href="/workflow-automation-uae" className="text-xs uppercase tracking-wider text-white font-medium hover:text-emerald-400 inline-flex items-center gap-1.5 transition-colors">
                  Explore Workflow Automation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif mb-4">
                  4. Answer Engine Optimization (AEO & AI Search)
                </h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                  Buyers in Dubai are no longer just browsing 10 blue links on Google; C-level executives and investors are asking Perplexity, ChatGPT, and Google Gemini for recommendations. We architect semantic entity maps so your brand is cited as the authoritative answer.
                </p>
                <ul className="space-y-2.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Structured schema mapping and knowledge graph entity establishment
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Semantic content silos designed for LLM retrieval and citation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Combined organic search visibility across traditional Google & AI answers
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <Link href="/free-growth-audit" className="text-xs uppercase tracking-wider text-white font-medium hover:text-emerald-400 inline-flex items-center gap-1.5 transition-colors">
                  Analyze Your AEO Visibility <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Interactive Ad Waste & Lead Economics Calculator ── */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-12 border border-white/15 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-4">
            <Calculator className="w-4 h-4" />
            Interactive ROI Diagnostic
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Estimate Your Wasted Ad Spend & Speed-to-Lead Decay
          </h2>
          <p className="text-white/70 font-light text-sm md:text-base max-w-2xl mb-10">
            In the UAE, ad costs (CPCs) are high. When leads take more than 15 minutes to receive a response, over 50% of the acquired intent is permanently lost to competitors.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-mono mb-2">
                  Monthly UAE Ad Spend (AED): <span className="text-white font-bold text-sm">AED {adSpend.toLocaleString()}</span>
                </label>
                <input 
                  type="range" 
                  min={5000} 
                  max={150000} 
                  step={2500}
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full accent-white h-2 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-white/40 mt-1 font-mono">
                  <span>AED 5,000</span>
                  <span>AED 75,000</span>
                  <span>AED 150,000+</span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-mono mb-2">
                  Average Current Lead Response Time:
                </label>
                <select
                  value={responseTime}
                  onChange={(e) => setResponseTime(e.target.value)}
                  className="w-full p-4 rounded-xl border border-white/15 bg-black text-white text-sm focus:outline-none focus:border-white/40"
                >
                  <option value="under-5-mins">Under 5 minutes (Automated WhatsApp)</option>
                  <option value="15-60-mins">15 – 60 minutes</option>
                  <option value="1-4 hours">1 – 4 hours (Standard business hours)</option>
                  <option value="same-day">Same day (4 – 12 hours)</option>
                  <option value="next-day">Next day (24+ hours)</option>
                </select>
              </div>
            </div>

            {/* Live Metrics Display */}
            <div className="p-8 border border-white/10 bg-black rounded-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest font-mono">Estimated Monthly Ad Waste</div>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-red-400 mt-1">
                    AED {metrics.wasted.toLocaleString()}
                  </div>
                  <p className="text-xs text-white/50 mt-1">Budget spent on leads that drop off due to response delay & missing attribution.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[11px] text-white/50 uppercase font-mono">Qualified Lead Lift</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">+{metrics.leadLift} leads/mo</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-white/50 uppercase font-mono">Est. CPL Reduction</div>
                    <div className="text-xl font-bold text-emerald-400 mt-0.5">~{metrics.cplReduction}%</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link 
                  href="/tools/ad-spend-efficiency-analyzer" 
                  className="w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  Launch Full Ad Spend Efficiency Analyzer <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Step-by-Step UAE Implementation Roadmap ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Execution Protocol
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            How We Deploy Your AI Marketing System
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm md:text-base">
            A proven 4-stage rollout deployed across UAE businesses without disrupting ongoing sales operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 border border-white/10 bg-white/[0.01] rounded-2xl">
            <div className="text-3xl font-serif text-white/20 mb-4 font-bold">01</div>
            <h3 className="text-lg font-semibold mb-2">Tracking & Leak Audit</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We audit your Meta Pixel, Google tag setups, GA4 events, and CRM pipelines to find where ad clicks are slipping through unmeasured.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.01] rounded-2xl">
            <div className="text-3xl font-serif text-white/20 mb-4 font-bold">02</div>
            <h3 className="text-lg font-semibold mb-2">Campaign & Asset Build</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We architect high-converting Google Search, PMax, and Meta campaigns with culturally resonant Arabic and English copy assets.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.01] rounded-2xl">
            <div className="text-3xl font-serif text-white/20 mb-4 font-bold">03</div>
            <h3 className="text-lg font-semibold mb-2">WhatsApp Funnel Setup</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We connect ad campaigns directly to WhatsApp Cloud API bots that qualify buyers, share catalogs, and route live hot leads to sales desks.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.01] rounded-2xl">
            <div className="text-3xl font-serif text-white/20 mb-4 font-bold">04</div>
            <h3 className="text-lg font-semibold mb-2">Revenue Attribution</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We feed closed CRM deal values back into advertising algorithms via offline conversion APIs, training ad networks to bid for real revenue.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Transparent Pricing Variables ── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
              Commercial Transparency
            </span>
            <h2 className="text-3xl md:text-4xl font-serif">
              What Determines Your Investment
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
              We do not believe in arbitrary monthly retainers. Our commercial arrangements are scoped transparently based on 4 operational factors:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="text-base font-semibold mb-2 text-white">1. Monthly Advertising Spend Volume</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Accounts managing AED 15,000/mo require different automated monitoring frequencies than enterprises investing AED 100,000+/mo across multiple channels.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="text-base font-semibold mb-2 text-white">2. CRM & Pipeline Architecture</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Direct native integrations with HubSpot, Salesforce, or Zoho vs. custom multi-database synchronization, custom field mapping, and bespoke webhooks.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="text-base font-semibold mb-2 text-white">3. Conversational Funnel Scope</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Single-language qualification bots vs. bilingual Arabic (Khaleeji dialect) and English WhatsApp flows with dynamic calendar booking.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="text-base font-semibold mb-2 text-white">4. Geographic Campaign Targets</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Targeting Dubai and the UAE exclusively vs. multi-market GCC campaigns expanding into Saudi Arabia (Riyadh/Jeddah), Qatar, and Kuwait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7B. Intent Bridge: AI SEO & Search Visibility ── */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-emerald-400/20 bg-emerald-950/10 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest block mb-2 font-semibold">
              Organic Search &amp; AI Engine Visibility
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
              Looking specifically for Organic AI Search &amp; AEO?
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              While our marketing systems manage predictive paid ads and WhatsApp conversion pipelines, our specialized AI SEO agency division engineers Answer Engine Optimization (AEO), Google AI Overview visibility, and LLM citation readiness.
            </p>
          </div>
          <Link
            href="/ai-seo-agency-dubai"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-400 text-black text-xs uppercase tracking-wider font-bold hover:bg-emerald-300 transition-colors"
          >
            Explore AI SEO Agency Dubai <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 8. Frequently Asked Questions (GSC Intent Aligned) ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Clear Answers
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm">
            Everything you need to know about working with an AI marketing and lead generation agency in Dubai.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does an AI marketing agency differ from a traditional digital marketing agency in Dubai?",
              a: "Traditional marketing agencies in Dubai rely on manual ad optimizations, monthly static reporting, and slow creative turnaround times, often creating a 4 to 24-hour delay in lead follow-up. An AI marketing agency integrates predictive bid management, automated multi-variant creative testing, sub-minute WhatsApp lead qualification, and closed-loop CRM revenue attribution to optimize campaigns for closed revenue rather than vanity impressions."
            },
            {
              q: "Can AI automate our Google Ads and Meta Ads campaigns?",
              a: "Yes. We configure algorithmic budget reallocation, automated bid adjustments, dynamic creative variations, and offline conversion tracking (CAPI) that feeds qualified CRM stage updates back into Google Ads and Meta Ads Manager algorithms to target higher-intent buyers across the UAE."
            },
            {
              q: "How does WhatsApp automation increase ad conversion rates in the UAE?",
              a: "In the UAE and GCC, over 80% of consumer and B2B engagement occurs via WhatsApp. By connecting Meta and Google ads directly to official WhatsApp Cloud API conversational funnels, incoming leads receive instant qualification, property or catalog matching, and calendar booking within 30 seconds, dramatically reducing lead decay."
            },
            {
              q: "Which CRMs and marketing platforms do you integrate?",
              a: "We integrate with major enterprise and SME platforms including HubSpot, Salesforce, Zoho CRM, Google Ads, Meta Ads Manager, TikTok Ads, Make, n8n, and custom webhooks connecting directly to your internal sales databases."
            },
            {
              q: "What factors determine the pricing of AI marketing services in Dubai?",
              a: "Pricing depends on your monthly advertising spend volume, the number of target markets (Dubai, Abu Dhabi, Saudi Arabia, or broader GCC), the complexity of your CRM lead scoring integration, and whether custom multilingual Arabic and English conversational agents are required."
            }
          ].map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
              >
                <span className="text-base font-medium text-white/90">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Final CTA ── */}
      <section className="py-28 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight mb-6">
            Build Your Autonomous <br />
            <span className="text-white/50 italic font-light">Marketing Pipeline in Dubai</span>
          </h2>
          <p className="text-white/60 font-light text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop losing 50%+ of your ad spend to slow follow-up and disconnected tracking. Let us audit your current funnel and show you the exact revenue leakages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Schedule Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-5 rounded-full font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Topic Cluster Internal Navigation ── */}
      <section className="py-12 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Related AI & Automation Infrastructure
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/services/ppc-google-ads-agency-dubai" className="hover:text-white transition-colors">PPC & Google Ads Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-seo-agency-dubai" className="hover:text-white transition-colors text-emerald-400 font-medium">AI SEO Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">Workflow Automation UAE</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/tools/ad-spend-efficiency-analyzer" className="hover:text-white transition-colors">Ad Spend Efficiency Analyzer</Link>
            <span className="text-white/20">•</span>
            <Link href="/free-growth-audit" className="hover:text-white transition-colors">Free Growth Audit</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
