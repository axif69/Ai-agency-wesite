"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Share2, Video, Sparkles, MessageCircle, BarChart3, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, 
  PhoneCall, HelpCircle, Layers, Eye, Users, TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function SocialMedia() {
  // Interactive Reach & Organic vs Paid Simulator State
  const [monthlyContentPieces, setMonthlyContentPieces] = useState(16); // Reels / Posts
  const [platformFocus, setPlatformFocus] = useState<"b2b_linkedin" | "luxury_instagram" | "tiktok_viral">("luxury_instagram");
  const [paidBoostBudget, setPaidBoostBudget] = useState(3000); // AED

  // Calculations
  const baseOrganicViews = platformFocus === "tiktok_viral" ? monthlyContentPieces * 8500 : platformFocus === "luxury_instagram" ? monthlyContentPieces * 4200 : monthlyContentPieces * 2800;
  const paidViewsPerAED = 35;
  const paidBoostViews = paidBoostBudget * paidViewsPerAED;
  const totalEstimatedImpressions = baseOrganicViews + paidBoostViews;
  const estimatedQualifiedEngagements = Math.round(totalEstimatedImpressions * 0.038); // 3.8% engagement rate benchmark

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Social Media Management Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/social-media-management-dubai-uae",
    "telephone": "+971545866094",
    "priceRange": "AED 4,500 - AED 22,000 / month",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "High-authority Social Media Management, Short-Form Video Production, and LinkedIn B2B Thought Leadership in Dubai and Sharjah. Bilingual Arabic & English storytelling, Reel editing, and community growth."
  };

  const faqData = [
    {
      q: "Why do standard social media agency posts fail to generate real business leads in Dubai?",
      a: "Most traditional social media agencies in the UAE post generic stock image graphics with useless hashtag lists that get zero algorithmic distribution. Today's GCC audiences only engage with high-production short-form video (Instagram Reels and TikTok) and authentic executive thought leadership on LinkedIn. We focus on narrative-driven video, local Khaleeji cultural context, and direct lead generation funnels."
    },
    {
      q: "Which social media platforms should my UAE company focus on?",
      a: "For B2B companies, industrial firms, and corporate consultancies, LinkedIn and WhatsApp are the undisputed revenue drivers in the UAE. For real estate, luxury lifestyle, retail, hospitality, and aesthetics, Instagram Reels and TikTok generate unmatched brand awareness and inbound buyer inquiries across Dubai and the GCC."
    },
    {
      q: "Do you shoot and produce short-form video (Reels, TikToks, Shorts)?",
      a: "Yes! Short-form vertical video is at the core of our social strategy. We script, edit, sound-design, and add cinematic motion captions to high-retention video reels. We can direct on-location video shoots in Dubai and Sharjah or transform your raw smartphone footage into viral, premium content."
    },
    {
      q: "Is bilingual Arabic and English content creation included?",
      a: "Yes. The UAE and GCC markets require genuine bilingual fluency. We craft authentic Arabic copy and video voiceovers tailored to Gulf/Khaleeji cultural nuances alongside polished international English, ensuring your brand resonates with both local nationals and expatriate business leaders."
    },
    {
      q: "How does LinkedIn Executive Thought Leadership work for our CEO / Founders?",
      a: "We ghostwrite authoritative, data-driven LinkedIn posts for your key executives. By sharing proprietary industry insights, company milestones, and strategic commentary, we position your leadership as industry authorities, directly attracting high-value B2B inquiries and enterprise partnerships."
    },
    {
      q: "Do you handle daily community management and Direct Message (DM) lead qualification?",
      a: "Yes. Social media moves at lightning speed in Dubai. We monitor comments and direct messages daily, filtering out spam and routing qualified commercial inquiries directly to your sales team via WhatsApp within minutes."
    },
    {
      q: "Can you run paid boosted posts and Meta advertising alongside organic management?",
      a: "Yes. Relying solely on organic reach limits your growth. We strategically amplify your top-performing organic reels and posts with targeted paid media spend to ensure maximum exposure among high-net-worth individuals and corporate decision-makers in Dubai, Abu Dhabi, and Saudi Arabia."
    },
    {
      q: "What is your content approval and publishing workflow?",
      a: "Every month, we develop a comprehensive Content Calendar containing planned video hooks, graphic mockups, captions, and publication schedules. Your team reviews and approves everything in advance via an interactive preview portal before anything goes live."
    },
    {
      q: "How do you measure ROI from social media management?",
      a: "We measure social media success through commercial metrics, not just vanity follower counts: Verified Profile Link Clicks, Direct Message (DM) Lead Inquiries, Inbound WhatsApp Chats, Video Watch-Time Retention, and Website Referral Traffic."
    },
    {
      q: "What is the typical monthly investment for social media management with Asif Digital?",
      a: "Our monthly social media growth packages range from AED 4,500 for focused B2B LinkedIn and Instagram management up to AED 18,000+ for full-scale video production, bilingual content, and dedicated paid amplification."
    },
    {
      q: "Do we retain full ownership of all raw video files and creative assets?",
      a: "Yes, 100%. All custom graphics, raw video footage, finalized video reels, and copywriting assets created during our engagement belong entirely to your company."
    },
    {
      q: "How do we get started and review a sample content strategy for our brand?",
      a: "Call our strategy team directly on +971 54 586 6094 or submit an inquiry on our contact page. We will audit your current social channels and deliver a customized 30-day content blueprint for your industry."
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
    "name": "How to Build a High-Authority Social Media Brand in Dubai and the GCC",
    "description": "The strategic content production protocol for transforming social channels into revenue-generating assets in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Brand Positioning & Audience Persona Mapping",
        "text": "We define your brand visual voice, core content pillars, and high-value target demographics across Dubai and the GCC."
      },
      {
        "@type": "HowToStep",
        "name": "Short-Form Video Scripting & Production",
        "text": "We script high-hook video concepts and produce engaging Instagram Reels, TikToks, and YouTube Shorts."
      },
      {
        "@type": "HowToStep",
        "name": "Bilingual Arabic & English Copywriting",
        "text": "We craft compelling captions with localized Khaleeji cultural nuances, structured call-to-actions, and targeted hashtags."
      },
      {
        "@type": "HowToStep",
        "name": "Publishing, Story Scheduling & Community Moderation",
        "text": "We publish content at peak GCC engagement hours and actively monitor comments and direct message inquiries."
      },
      {
        "@type": "HowToStep",
        "name": "Paid Amplification & Performance Review",
        "text": "We boost top organic performers to reach verified decision-makers and deliver monthly ROI executive reports."
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
            <Share2 className="w-4 h-4 text-emerald-400" /> Social Media &bull; Video Reels &bull; Dubai & Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Social Media <br />
            <span className="italic text-white/50 font-normal">Management Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Generic stock photo posts are dead. We build commanding brand authority through cinematic short-form video reels, bilingual Khaleeji storytelling, and LinkedIn executive thought leadership designed to capture attention and drive direct commercial inquiries.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Custom Social Blueprint <ArrowRight className="w-4 h-4" />
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
            { metric: "100%", label: "Custom Video Production", sub: "Cinematic 4K Short-Form Reels" },
            { metric: "Bilingual", label: "Native Arabic & English", sub: "Khaleeji Cultural Resonance" },
            { metric: "Daily", label: "Community Moderation", sub: "Fast DM Lead Routing" },
            { metric: "B2B & B2C", label: "LinkedIn & Meta Focus", sub: "Direct Commercial Impact" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Social Reach & Engagement Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Campaign Reach Simulator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Estimate Your Monthly GCC Audience Reach
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Select your primary platform focus, monthly video output, and optional paid boost budget to project your monthly brand impressions across the UAE and GCC.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-3 font-bold">
                  Select Primary Platform Focus:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPlatformFocus("luxury_instagram")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${platformFocus === "luxury_instagram" ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    📸 Instagram Reels
                  </button>
                  <button
                    onClick={() => setPlatformFocus("b2b_linkedin")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${platformFocus === "b2b_linkedin" ? "bg-blue-500/20 border border-blue-400 text-blue-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    💼 LinkedIn B2B
                  </button>
                  <button
                    onClick={() => setPlatformFocus("tiktok_viral")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${platformFocus === "tiktok_viral" ? "bg-purple-500/20 border border-purple-400 text-purple-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    🎵 TikTok Viral
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Video & Content Assets:</span>
                  <span className="text-white font-bold">{monthlyContentPieces} assets / month</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="32" 
                  step="4" 
                  value={monthlyContentPieces} 
                  onChange={(e) => setMonthlyContentPieces(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Paid Boost Amplification:</span>
                  <span className="text-white font-bold">AED {paidBoostBudget.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20000" 
                  step="1000" 
                  value={paidBoostBudget} 
                  onChange={(e) => setPaidBoostBudget(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Impressions
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {totalEstimatedImpressions.toLocaleString()} <span className="text-xs font-sans text-white/50">views / mo</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Organic Distribution:</span>
                  <span className="text-white text-sm font-bold">{baseOrganicViews.toLocaleString()} views</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Engagements & Inquiries:</span>
                  <span className="text-emerald-300 text-sm font-bold">~{estimatedQualifiedEngagements.toLocaleString()} actions</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Book Your Social Strategy Session <ArrowRight className="w-4 h-4" />
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
            Service Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Authority Storytelling Outperforms Basic Posting
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Strategy Dimension</th>
                <th className="py-4 px-4 text-white/40">In-House Junior / Intern</th>
                <th className="py-4 px-4 text-white/40">Cheap Freelancer</th>
                <th className="py-4 px-4 text-white/40">Traditional UAE Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Authority Media</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Content Format</td>
                <td className="py-5 px-4 text-red-400">Canva templates</td>
                <td className="py-5 px-4 text-red-400">Stock images</td>
                <td className="py-5 px-4 text-yellow-400">Basic graphic flyers</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Cinematic Short-Form Video Reels & Carousels</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Localization</td>
                <td className="py-5 px-4 text-red-400">English only</td>
                <td className="py-5 px-4 text-red-400">Machine translated</td>
                <td className="py-5 px-4 text-yellow-400">Standard Egyptian/Levantine</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Khaleeji Arabic + High-Level English</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">LinkedIn Executive Growth</td>
                <td className="py-5 px-4 text-red-400">Zero expertise</td>
                <td className="py-5 px-4 text-red-400">Not supported</td>
                <td className="py-5 px-4 text-yellow-400">Generic company page only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">CEO Thought Leadership & B2B Inbound</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Community DM Routing</td>
                <td className="py-5 px-4 text-red-400">Slow / Missed leads</td>
                <td className="py-5 px-4 text-red-400">No moderation</td>
                <td className="py-5 px-4 text-yellow-400">24hr turnaround</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Daily Active DM Qualification & WhatsApp Routing</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Commercial Focus</td>
                <td className="py-5 px-4 text-red-400">Vanity likes only</td>
                <td className="py-5 px-4 text-red-400">Hashtag stuffing</td>
                <td className="py-5 px-4 text-yellow-400">Follower count only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Pipeline Revenue & Inbound Deal Flow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Social Media Management Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Comprehensive Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Full-Spectrum Social Authority Management
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="w-6 h-6 text-emerald-400" />,
                title: "Cinematic Short-Form Video Reels",
                desc: "High-hook video scripting, professional pacing, sound design, and animated typography tailored for Instagram Reels, TikTok, and YouTube Shorts."
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-400" />,
                title: "LinkedIn Executive Ghostwriting",
                desc: "Turn your company founders into recognized industry authorities with data-backed thought leadership articles and strategic B2B commentary."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Khaleeji & Arabic Storytelling",
                desc: "Culturally resonant bilingual content written by native Gulf copywriters to engage Emirati and GCC high-net-worth audiences."
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
                title: "DM Lead Triage & WhatsApp Sync",
                desc: "Active daily comment and message monitoring, qualifying prospective buyers and dispatching direct WhatsApp alerts to your sales team."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
                title: "Paid Amplification Strategy",
                desc: "Precision boosting of organic top-performers to target verified decision-makers across Dubai, Abu Dhabi, and Riyadh."
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
                title: "Monthly ROI & Executive Reports",
                desc: "Transparent monthly analytics breaking down audience demographics, engagement growth, website referral traffic, and inbound leads."
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
            Workflow Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Monthly Content Cadence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Strategy & Pillars", text: "We define monthly themes, commercial offers, and target audience hooks across Dubai and the GCC." },
            { step: "02", title: "Production & Scripting", text: "We script video reels, design carousels, and write bilingual English and Arabic captions." },
            { step: "03", title: "Calendar Approval", text: "You review and approve the complete visual calendar via an interactive portal before publication." },
            { step: "04", title: "Publishing & DMs", text: "We publish at peak UAE engagement hours and actively triage comments and inbound direct messages." },
            { step: "05", title: "Amplification & ROI", text: "We boost high-performing posts and deliver executive reporting on lead generation metrics." }
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
              Strategic Social Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE business executives need to know about professional social media management and video production.
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
            Dominate Your Industry's Feed
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Build Unshakeable Social Authority.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's elevate your social channels with cinematic video reels, bilingual storytelling, and executive thought leadership. Speak directly with our creative strategist in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Get Free Social Media Audit <ArrowRight className="w-4 h-4" />
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
