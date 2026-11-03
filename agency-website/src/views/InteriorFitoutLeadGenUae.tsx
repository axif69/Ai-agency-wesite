"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, CheckCircle2, 
  MessageSquare, Building2, Home, Hammer, 
  Search, Video, MessageCircle, ChevronDown, Phone,
  AlertCircle, ShieldCheck, MapPin, Briefcase
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

export default function InteriorFitoutLeadGenUae() {
  const handleCTA = (ctaText: string, ctaLocation: string) => {
    trackEvent("fitout_cta_click", {
      service_name: "Interior Fitout Lead Generation UAE",
      cta_location: ctaLocation,
      cta_text: ctaText
    });
  };

  const whoWeHelp = [
    {
      icon: <Building2 className="w-6 h-6 text-emerald-400" />,
      title: "Commercial Fitout Contractors",
      desc: "Connect with business owners and corporate tenants looking for turnkey office, retail, and hospitality fitouts across Dubai, Abu Dhabi, and Sharjah."
    },
    {
      icon: <Home className="w-6 h-6 text-emerald-400" />,
      title: "Residential Renovation Companies",
      desc: "Reach property owners planning full villa revamps, majlis upgrades, structural extensions, and luxury apartment renovations."
    },
    {
      icon: <Hammer className="w-6 h-6 text-emerald-400" />,
      title: "Joinery & Interior Specialists",
      desc: "Receive direct enquiries for custom cabinetry, architectural woodwork, luxury upholstery, and bespoke curtains from clients seeking specialized craftsmanship."
    }
  ];

  const pitfalls = [
    {
      icon: <AlertCircle className="w-6 h-6 text-amber-400" />,
      badge: "COMMON PITFALL 01",
      title: "Wasting Ad Spend on Low-Budget Searches",
      desc: "Most generalist ad agencies run broad keywords that attract handyman requests, minor furniture repairs, or small budget jobs that waste your estimating team's valuable time.",
      solution: "We build precise negative-keyword filters and commercial-intent terms so your budget focuses exclusively on full turnkey projects."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-amber-400" />,
      badge: "COMMON PITFALL 02",
      title: "Losing Projects to Slow Speed-to-Lead",
      desc: "In Dubai, prospective commercial tenants submit 2–3 enquiries when looking for contractors. If your team takes 24 hours to reply, a competitor has already booked the site visit.",
      solution: "Enquiries land directly on your sales team's WhatsApp with full project details so you can call or message back within minutes."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-amber-400" />,
      badge: "COMMON PITFALL 03",
      title: "Using Generic Stock Photos Instead of Real Proof",
      desc: "UAE property owners and procurement managers can spot generic 3D renders and stock photos instantly. They want to see real finished craftsmanship in local UAE communities.",
      solution: "We produce clean, high-end video ads showcasing your real completed projects, highlighting custom joinery and turnkey finishes."
    }
  ];

  const projectScopes = [
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
      title: "Commercial Workspaces & Offices",
      locations: "Business Bay • DIFC • Downtown • JLT • Dubai Media City",
      desc: "Cat A and Cat B office fitouts, executive boardrooms, corporate headquarters, and commercial coworking spaces."
    },
    {
      icon: <Home className="w-6 h-6 text-emerald-400" />,
      title: "Luxury Villa Renovations",
      locations: "Palm Jumeirah • Emirates Hills • Arabian Ranches • Saadiyat • Al Zahia",
      desc: "Full architectural interior remodeling, kitchen and master suite revamps, outdoor majlis pavilions, and villa extensions."
    },
    {
      icon: <Building2 className="w-6 h-6 text-emerald-400" />,
      title: "Retail Boutiques & F&B Fitouts",
      locations: "Al Wasl • City Walk • Major UAE Malls • Prime High Streets",
      desc: "High-spec retail store interiors, bespoke restaurant dining rooms, cafe revamps, and hospitality turnkey delivery."
    },
    {
      icon: <Hammer className="w-6 h-6 text-emerald-400" />,
      title: "Bespoke Joinery & Custom Woodwork",
      locations: "Delivered Across Dubai, Abu Dhabi & Sharjah",
      desc: "Custom architectural millwork, bespoke wall panelling, luxury wardrobes, reception desks, and hotel-grade furniture."
    }
  ];

  const whatWeDo = [
    {
      icon: <Search className="w-6 h-6 text-emerald-400" />,
      title: "Google Search Advertising",
      desc: "Show up at the top of search results when companies and property owners actively search for fitout contractors and renovation companies in the UAE."
    },
    {
      icon: <Video className="w-6 h-6 text-emerald-400" />,
      title: "Social Media Project Showcases",
      desc: "Turn your completed projects into professional video ads that showcase your real craftsmanship directly to decision-makers on Instagram and LinkedIn."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      title: "Enquiry Management",
      desc: "Route new enquiries straight to your sales WhatsApp or email with project location, size, and requirements so your team can reply quickly."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Understand Your Focus",
      desc: "We review the specific types of contracts you want more of—commercial offices, private villas, or custom joinery—and your target areas in the UAE."
    },
    {
      step: "02",
      title: "Launch Targeted Campaigns",
      desc: "We build and manage ad campaigns on Google and social media featuring your completed portfolio, highlighting your experience and credentials."
    },
    {
      step: "03",
      title: "Direct Enquiries to Your Team",
      desc: "New enquiries land straight on your phone or email so your estimators can review requirements, provide preliminary estimates, and schedule site visits."
    }
  ];

  const faqs = [
    {
      q: "How do you help attract relevant fitout enquiries?",
      a: "We build targeted search campaigns on Google for high-intent search terms (such as commercial office fitout, retail fitout, and villa renovation contractors in Dubai and Abu Dhabi) and social media ads in both Arabic and English. We highlight your specific project focus so prospects understand what you do before reaching out."
    },
    {
      q: "Do you charge a commission on signed contracts?",
      a: "No. We work on a fixed monthly management retainer. You keep 100% of your project contract value and profit margin."
    },
    {
      q: "How do new enquiries reach our team?",
      a: "Enquiries are sent directly to your designated WhatsApp number or email address. Notifications arrive immediately with the prospect's contact details and project overview so your team can respond quickly."
    },
    {
      q: "What ad budget is needed to get started?",
      a: "For the UAE market, we generally recommend starting with AED 4,000 to AED 7,000 per month paid directly to Google or Meta. This provides sufficient reach to test local commercial and residential audiences."
    },
    {
      q: "What do you need from our team to begin?",
      a: "We need photos or video clips of your completed projects, your company trade license, the types and sizes of projects you handle, and the WhatsApp number or email where you want enquiries delivered."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-500/30 font-sans relative overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent blur-[140px] pointer-events-none z-0" />

      {/* 1. Breadcrumb */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/50 font-mono">
        <Link href="/" className="hover:text-green-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/30">&gt;</span>
        <Link href="/services" className="hover:text-green-400 transition-colors">SERVICES</Link>
        <span className="mx-2 text-white/30">&gt;</span>
        <span className="text-white/90">INTERIOR FITOUT MARKETING</span>
      </div>

      {/* 2. Hero Section - Two-Column Layout */}
      <section className="relative z-10 px-6 md:px-12 pt-6 pb-20 md:pt-10 md:pb-28">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pr-0 lg:pr-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>MARKETING &amp; LEAD SYSTEMS FOR UAE FITOUT COMPANIES</span>
            </div>

            {/* Playfair Serif Headline with Natural Balanced Line Breaks */}
            <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-[3.5vw] xl:text-[3.2vw] font-serif font-bold leading-[1.12] tracking-tight mb-6 drop-shadow-2xl max-w-3xl">
              Get More Enquiries for Your <br className="hidden sm:inline" />
              <span className="italic text-white/70 tracking-normal pr-2">Fitout &amp; Renovation Business.</span>
            </h1>

            {/* Plain-English Supporting Copy */}
            <p className="text-base sm:text-lg text-white/80 font-normal max-w-xl font-sans leading-relaxed mb-8 drop-shadow-md">
              We help UAE fitout and renovation companies reach people looking for their services through Google and social media ads. We can also help organize enquiries and follow-ups, so your team can focus on the right projects.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto items-center sm:items-start mb-8">
              <a
                href="https://wa.me/971545866094?text=Hello%20Asif%20Digital,%20I%20run%20a%20fitout%20and%20renovation%20company%20in%20the%20UAE%20and%20want%20to%20discuss%20our%20enquiries."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTA("Discuss Your Business", "Hero")}
                className="bg-white text-black px-9 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.25)] h-[52px] w-full sm:w-auto cursor-pointer"
              >
                <span>DISCUSS YOUR BUSINESS</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </a>
              <Link
                href="/contact"
                onClick={() => handleCTA("Send An Enquiry", "Hero")}
                className="border border-white/20 text-white/90 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center justify-center gap-3 h-[52px] w-full sm:w-auto"
              >
                <span>SEND AN ENQUIRY</span>
              </Link>
            </div>

            {/* Grounded Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Google Search &amp; Meta Ads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bilingual AR &amp; EN</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0% Commission</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clear, Enlarged Enquiry System Visual (5 cols on lg) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Ambient background glow */}
            <div className="absolute -inset-1 bg-emerald-500/10 rounded-[2.5rem] blur-2xl pointer-events-none" />
            
            <div className="relative w-full max-w-lg bg-zinc-950/90 border border-white/10 rounded-3xl p-8 sm:p-9 backdrop-blur-xl shadow-2xl">
              
              {/* Card Header: Plain English, No Fake Telemetry */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                      How Your Enquiries Flow
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60">
                      Direct from ads to your estimation team
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 font-semibold">
                  Direct Route
                </span>
              </div>

              {/* Step-by-Step System Flow */}
              <div className="space-y-4 mb-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                    1. Targeted Ads
                  </span>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-normal">
                    Search and social ads target UAE businesses and homeowners actively seeking fitout or renovation services.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                    2. Direct Delivery
                  </span>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-normal">
                    Enquiries with project location, size, and scope arrive straight on your sales WhatsApp or email.
                  </p>
                </div>
              </div>

              {/* Card Footer: Simple, Genuine Guarantee */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct client contact</span>
                </span>
                <span className="font-mono text-emerald-400 font-semibold">
                  0% Commission
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Who We Help */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            WHO WE WORK WITH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
            For UAE Fitout &amp; Renovation Companies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {whoWeHelp.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Commercial Reality: Why Standard Contractor Ads Fail */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5 bg-white/[0.01]">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            INDUSTRY REALITY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Why Typical Fitout Advertising Bleeds Budget in the UAE
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Many contractors test agency marketing once, get burned on low-quality leads, and go back to word-of-mouth. Here is why that happens and how we fix it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pitfalls.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-white/10 bg-black/40 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400/90 block mb-3">
                  {p.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-normal">
                  {p.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  How We Solve It:
                </span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                  {p.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Project Scopes & UAE Locations We Target */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            TARGETED MARKETS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Project Scopes &amp; Locations We Target
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            We configure ad sets tailored to your specific commercial licensing, workshop capabilities, and geographic coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {projectScopes.map((scope, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {scope.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {scope.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-emerald-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{scope.locations}</span>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {scope.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. What We Do */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
            How We Help You Find Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {whatWeDo.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. How It Works */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            OUR PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
            How It Works in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-4">
                STEP {s.step}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                {s.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex justify-between items-center text-base sm:text-lg font-serif font-medium text-white group-hover:text-emerald-300 transition-colors">
                <span>{faq.q}</span>
                <span className="ml-4 flex-shrink-0 text-white/40 group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed pt-4 border-t border-white/5 font-normal">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Bottom Call to Action */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/5 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <Phone className="w-5 h-5" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-white">
          Ready to grow your fitout and renovation enquiries?
        </h2>
        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
          Get in touch with us to discuss your current projects, target services, and how we can set up campaigns for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
          <a
            href="https://wa.me/971545866094?text=Hello%20Asif%20Digital,%20I%20run%20a%20fitout%20and%20renovation%20company%20in%20the%20UAE%20and%20want%20to%20discuss%20our%20enquiries."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("Discuss Your Business", "Bottom CTA")}
            className="bg-white text-black px-9 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-colors flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] h-[52px] w-full sm:w-auto cursor-pointer"
          >
            <span>DISCUSS YOUR BUSINESS</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>
          <Link
            href="/contact"
            onClick={() => handleCTA("Send An Enquiry", "Bottom CTA")}
            className="border border-white/20 text-white/90 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors flex items-center justify-center gap-3 h-[52px] w-full sm:w-auto"
          >
            <span>SEND AN ENQUIRY</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
