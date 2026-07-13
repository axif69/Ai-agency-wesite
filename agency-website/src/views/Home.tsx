"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import MagneticButton from "../components/animations/MagneticButton";
import LazySection from "../components/LazySection";
import { Network, Database, Brain, Globe, Shield, Activity, ChevronRight, Play, Server, ArrowRight, TrendingUp, MessageSquare, Briefcase, Zap, Workflow, Languages, Phone } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudyData";
import { BLOG_POSTS } from "../data/blogData";

const Scene3D = dynamic(() => import("../components/Scene3D"), { ssr: false });
const HeroParticles = dynamic(() => import("../components/HeroParticles"), { ssr: false });
const ParticleBackground = dynamic(() => import("../components/animations/ParticleBackground"), { ssr: false });
const TextGenerateEffect = dynamic(() => import("../components/animations/TextGenerateEffect").then(mod => mod.TextGenerateEffect), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── DATA ─── */

const sovereignSolutions = [
  {
    title: "AI Automation Agency",
    desc: "We build custom AI workflows that handle your repetitive daily tasks automatically, saving your team hundreds of hours a month.",
    icon: <Workflow className="w-6 h-6" role="img" aria-label="Workflow Icon" />,
    link: "/ai-automation-agency-dubai",
  },
  {
    title: "Sovereign AI Marketing",
    desc: "Smart marketing campaigns that get your business to the top of Google Maps and search results in the UAE.",
    icon: <Zap className="w-6 h-6" role="img" aria-label="Marketing Flash Icon" />,
    link: "/ai-marketing-dubai",
  },
  {
    title: "Autonomous Sales Swarms",
    desc: "AI Chatbots that live on your website and WhatsApp, answering customer questions and booking sales 24/7 without ever taking a break.",
    icon: <MessageSquare className="w-6 h-6" role="img" aria-label="Sales Swarm Icon" />,
    link: "/sovereign-sales-agent",
  },
  {
    title: "Arabic Intelligence Hub",
    desc: "Our AI systems speak perfect Khaleeji Arabic and English, ensuring you never miss a lead from any part of the UAE market.",
    icon: <Languages className="w-6 h-6" role="img" aria-label="Arabic Language Icon" />,
    link: "/arabic-ai-hub",
  }
];

const realEstateSolutions = [
  {
    title: "AI Real Estate UAE Hub",
    desc: "A practical guide to how UAE property teams can use AI for enquiries, listings, support, and day-to-day operations.",
    icon: <Globe className="w-6 h-6" role="img" aria-label="Real Estate Hub Icon" />,
    link: "/ai-real-estate-uae",
  },
  {
    title: "AI for Real Estate Agencies",
    desc: "Dubai agency workflows for faster response times, better qualification, and cleaner CRM handoffs across every channel.",
    icon: <MessageSquare className="w-6 h-6" role="img" aria-label="Agency Leads Icon" />,
    link: "/ai-real-estate-agencies-dubai",
  },
  {
    title: "AI Property Management UAE",
    desc: "Tenant communication, maintenance intake, renewals, and operational reminders for property management teams.",
    icon: <Phone className="w-6 h-6" role="img" aria-label="Property Management Icon" />,
    link: "/ai-property-management-uae",
  },
  {
    title: "Real Estate Digital Solutions",
    desc: "The connected website, portal, CRM, and WhatsApp foundation that powers real estate automation and lead flow.",
    icon: <Server className="w-6 h-6" role="img" aria-label="Digital Solutions Icon" />,
    link: "/real-estate-digital-solutions-uae",
  },
  {
    title: "Lead Generation for Real Estate",
    desc: "SEO, AEO, and conversion-focused lead capture built to bring in property enquiries that are worth following up.",
    icon: <TrendingUp className="w-6 h-6" role="img" aria-label="Lead Generation Icon" />,
    link: "/ai-lead-generation-agency-dubai",
  }
];

const foundationalServices = [
  {
    title: "Web & Ecommerce Development",
    desc: "Lightning-fast, premium websites engineered specifically to turn your casual visitors into paying customers.",
    icon: <Briefcase className="w-5 h-5" role="img" aria-label="Ecommerce Icon" />,
    link: "/services/ecommerce-website-development-dubai",
  },
  {
    title: "Custom Web App & Software Development",
    desc: "We build secure portal software, customer dashboards, and custom SaaS platforms tailored for your business.",
    icon: <Server className="w-5 h-5" role="img" aria-label="Server Icon" />,
    link: "/services/web-development-dubai-uae",
  },
  {
    title: "Corporate Branding",
    desc: "Professional logos and brand identities designed to make your local business look like an elite global enterprise.",
    icon: <Shield className="w-5 h-5" role="img" aria-label="Branding Shield Icon" />,
    link: "/services/branding-agency-dubai-sharjah",
  },
  {
    title: "Search & Paid Media (SEO/PPC)",
    desc: "Data-driven Google and Meta ads designed to get you the highest possible return on your marketing budget.",
    icon: <TrendingUp className="w-5 h-5" role="img" aria-label="Growth Chart Icon" />,
    link: "/services/ppc-google-ads-agency-dubai",
  }
];

const TEAM_MEMBERS = [
  {
    name: "Khalfan Obaid",
    role: "Principal AI Architect & Director",
    desc: "Architecting custom AI workflows and leading digital transformation strategies for businesses across the GCC.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
  },
  {
    name: "Tariq Mahmood",
    role: "Lead Web Developer",
    desc: "Specialist in building high-performance, lightning-fast Next.js storefronts and custom integrations.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80"
  },
  {
    name: "Sarah Al-Mansoori",
    role: "AI Conversation Designer",
    desc: "Crafting multi-lingual WhatsApp and web chatbots that communicate perfectly in Arabic (Khaleeji) and English.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [showDecor, setShowDecor] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ROI Calculator State
  const [employees, setEmployees] = useState(5);
  const humanCostPerYear = 120000; // AED per average employee (salary + visa)
  const agentCostPerYear = 15000; // Average AI Software yearly cost
  
  const totalHumanCost = employees * humanCostPerYear;
  const totalAgentCost = employees * agentCostPerYear;
  const totalSavings = totalHumanCost - totalAgentCost;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateViewport = () => setIsCompactViewport(window.innerWidth < 768);
    updateViewport();
    const timer = window.setTimeout(() => setShowDecor(true), 1200);
    window.addEventListener("resize", updateViewport);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useGSAP(() => {
    // Reveal animations for headings/paragraphs
    const reveals = gsap.utils.toArray(".gsap-reveal");
    reveals.forEach((elem: any) => {
      gsap.fromTo(
        elem,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Why Now section GSAP animations
    gsap.fromTo(
      ".why-now-text",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-now-text",
          start: "top 80%",
        },
      }
    );

    const whyNowTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".why-now-graphic",
        start: "top 75%",
      },
    });

    whyNowTl.fromTo(
      ".why-now-graphic",
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(
      ".legacy-card",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(
      ".arrow-graphic",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .fromTo(
      ".automated-card",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // ROI Calculator animations
    gsap.fromTo(
      ".roi-card-left",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roi-card-left",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".roi-card-right",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roi-card-right",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".roi-savings-container",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".roi-savings-container",
          start: "top 90%",
        },
      }
    );

    // Horizontal Scroll Trigger for Services Section
    const scrollEl = horizontalScrollRef.current;
    const triggerEl = triggerRef.current;
    if (scrollEl && triggerEl) {
      const getScrollAmount = () => {
        let scrollWidth = scrollEl.scrollWidth;
        let windowWidth = window.innerWidth;
        return -(scrollWidth - windowWidth);
      };

      const tween = gsap.fromTo(
        scrollEl,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollEl.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        }
      );

      return () => {
        tween.kill();
      };
    }
  }, { dependencies: [] });

  return (
    <div ref={containerRef} className="relative bg-[#050505] overflow-hidden">
      {/* 3D Interactive Background */}
      {showDecor && !isCompactViewport ? <Scene3D /> : null}
      
      {/* ── 1. The "Authority" Hero Section ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 sm:pt-0">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center flex flex-col items-center -mt-24 md:-mt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-3 flex items-center justify-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              Dubai's Premier AI Automation & Digital Architects
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl sm:text-6xl md:text-7xl lg:text-[6vw] xl:text-[5.5vw] font-serif font-bold leading-[1.1] tracking-tight mb-4 max-w-6xl mx-auto drop-shadow-2xl">
            Turn Your Digital Presence <br /><span className="italic text-white/70 tracking-normal pr-2">Into an AI Revenue Engine.</span>
          </motion.h1>
          
          <TextGenerateEffect 
            words="We build high-performance digital storefronts powered by intelligent AI agents. Capture leads, answer complex queries in English and Arabic, and book meetings on autopilot, 24/7."
            className="text-base md:text-lg lg:text-xl text-white/95 font-normal max-w-3xl mx-auto font-sans leading-relaxed mb-6 drop-shadow-md"
          />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0 justify-center z-10">
            <MagneticButton>
              <Link href="/contact" aria-label="Deploy My AI Agent" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer">
                Deploy My AI Agent <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <div onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} aria-label="See the AI in Action" className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md cursor-pointer">
                See the AI in Action <MessageSquare className="w-4 h-4" role="img" aria-label="Message icon" />
              </div>
            </MagneticButton>
          </motion.div>
        </motion.div>
        {showDecor ? <HeroParticles /> : null}
      </section>

      {/* ── Trust Signals Bar ── */}
      <section className="py-8 bg-black border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-white/70" role="img" aria-label="Sovereignty Shield icon" /> 100% Data Security</div>
          <div className="flex items-center gap-2"><Database className="w-4 h-4 text-white/70" role="img" aria-label="Database storage icon" /> Fast UAE Hosting</div>
          <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-white/70" role="img" aria-label="AI reasoning brain icon" /> AI Automation</div>
          <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-white/70" role="img" aria-label="Global networking icon" /> Proven ROI</div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 block mb-3 gsap-reveal">Start Here</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight gsap-reveal">Choose what you need right now.</h2>
          </div>
          <p className="text-white/55 text-sm max-w-xl gsap-reveal">
            If you came here with a specific intent, these paths get you to the right page faster than a full homepage scroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {[
            { title: "Need More Leads", desc: "SEO, PPC, and AI sales capture.", href: "/ai-lead-generation-agency-dubai" },
            { title: "Need a Better Website", desc: "Fast design, development, and support.", href: "/services/web-design-dubai-sharjah" },
            { title: "Need AI for Real Estate", desc: "Property leads, tenant support, and workflows.", href: "/ai-real-estate-uae" },
            { title: "Need WhatsApp Automation", desc: "Faster replies and lead qualification.", href: "/services/whatsapp-automation-gcc" },
            { title: "Need AEO / GEO Visibility", desc: "Content built for search and answer engines.", href: "/services/seo-agency-dubai-sharjah-uae" }
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group relative block p-6 rounded-[1.75rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-green-500/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out flex flex-col min-h-[190px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60"
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-400 mb-4">{item.title}</span>
              <p className="text-white/65 text-sm leading-relaxed flex-grow">{item.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-green-300 transition-colors">
                Open Path <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. The Problem / Market Context ("Why Now") ── */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="why-now-text opacity-0">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] mb-10">
              A standard website is a brochure. <br/><span className="italic text-white/70">You need an active employee.</span>
            </h2>
            <div className="space-y-6 text-white/80 font-normal xl:text-lg leading-relaxed">
              <p>In the UAE, your customers are searching online at all hours. If your website is a static, slow-loading brochure, and your human sales team clocks out at 6 PM, you are losing money to your competitors every single night.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 py-2">
                We build Digital Storefronts powered by AI Employees. Our premium websites rank on Google to bring in traffic, while our integrated AI Chatbots talk to your customers in English and Arabic, answering questions and booking sales 24/7.
              </p>
            </div>
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-4xl font-serif text-white mb-2">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Always Online Chatbots</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-white mb-2">#1</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Google Ranking Web Design</div>
              </div>
            </div>
          </div>

          <div className="why-now-graphic relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-10 flex flex-col justify-center opacity-0">
             {showDecor ? <ParticleBackground /> : null}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 z-[1]" />
             
             <div className="relative z-10 space-y-8">
                <div className="legacy-card p-6 border border-red-500/20 bg-red-500/5 rounded-xl opacity-0">
                  <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2">The Legacy Model</h4>
                  <p className="text-white/80 font-normal text-sm">Static websites that don't sell, and human sales teams that sleep.</p>
                </div>
                <div className="arrow-graphic flex justify-center opacity-0"><ArrowRight className="w-6 h-6 rotate-90 text-white/20" /></div>
                <div className="automated-card p-6 border border-green-500/30 bg-green-500/10 rounded-xl opacity-0">
                  <h4 className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">The Automated Model</h4>
                  <p className="text-white/90 font-normal text-sm">High-speed websites staffed by AI Chatbots that close sales around the clock.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 3. Horizontal Scroll Services Section ── */}
      <section ref={triggerRef} className="relative min-h-screen bg-[#080808] border-y border-white/5 flex flex-col justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none opacity-50" />
        
        <div className="w-full flex flex-col justify-center relative z-10">
          <div className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 block mb-2 gsap-reveal">Our Services</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-white gsap-reveal">Strategic Capabilities</h2>
            </div>
            <p className="text-white/50 text-sm max-w-sm gsap-reveal">
              Scroll down to explore our AI automation and foundational digital services designed for GCC market leaders.
            </p>
          </div>

          {/* Horizontal scroll container */}
          <div ref={horizontalScrollRef} data-cursor="drag" className="flex gap-8 px-6 md:px-12 w-max flex-nowrap pb-12">
            
            {/* Introductory Panel */}
            <div className="w-[300px] md:w-[450px] h-[400px] md:h-[450px] rounded-3xl border border-white/10 bg-white/[0.01] p-10 flex flex-col justify-between flex-shrink-0 backdrop-blur-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">Asif Digital</span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mt-4 leading-snug">
                  We build the high-speed foundation, and power it with intelligent automation.
                </h3>
              </div>
              <div className="text-xs uppercase font-bold tracking-widest text-green-500 flex items-center gap-2">
                Scroll to Explore <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* AI Solutions Panels */}
            {sovereignSolutions.map((sol, i) => (
              <div key={i} className="w-[300px] md:w-[400px] h-[400px] md:h-[450px] rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-8 md:p-10 flex flex-col justify-between flex-shrink-0 transition-all group backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-colors duration-300">
                    {sol.icon}
                  </div>
                  <span className="text-xs uppercase font-bold tracking-[0.2em] text-green-500/60">Sovereign AI</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-green-400 transition-colors">{sol.title}</h3>
                  <p className="text-white/70 font-normal text-sm leading-relaxed">{sol.desc}</p>
                </div>
                <Link href={sol.link} aria-label={`Explore ${sol.title}`} className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white/40 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

            {realEstateSolutions.map((sol, i) => (
              <div key={`re-${i}`} className="w-[300px] md:w-[400px] h-[400px] md:h-[450px] rounded-3xl border border-green-500/10 bg-gradient-to-b from-white/[0.03] to-white/[0.015] hover:bg-white/[0.06] hover:border-green-500/25 p-8 md:p-10 flex flex-col justify-between flex-shrink-0 transition-all group backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-colors duration-300">
                    {sol.icon}
                  </div>
                  <span className="text-xs uppercase font-bold tracking-[0.2em] text-green-500/60">Real Estate</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-green-300 transition-colors">{sol.title}</h3>
                  <p className="text-white/70 font-normal text-sm leading-relaxed">{sol.desc}</p>
                </div>
                <Link href={sol.link} aria-label={`Explore ${sol.title}`} className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white/40 group-hover:text-green-300 transition-colors pt-4 border-t border-white/5">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

            {/* Core Infrastructure Panels */}
            {foundationalServices.map((sol, i) => (
              <div key={i} className="w-[300px] md:w-[400px] h-[400px] md:h-[450px] rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-8 md:p-10 flex flex-col justify-between flex-shrink-0 transition-all group backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-white/5 text-white/50 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    {sol.icon}
                  </div>
                  <span className="text-xs uppercase font-bold tracking-[0.2em] text-white/30">Infrastructure</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-green-400 transition-colors">{sol.title}</h3>
                  <p className="text-white/65 font-normal text-sm leading-relaxed">{sol.desc}</p>
                </div>
                <Link href={sol.link} aria-label={`Explore ${sol.title}`} className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white/30 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

            {/* Closing / Contact Panel */}
            <div className="w-[300px] md:w-[400px] h-[400px] md:h-[450px] rounded-3xl border border-green-500/20 bg-green-500/5 p-8 md:p-10 flex flex-col justify-between flex-shrink-0 backdrop-blur-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-green-400 tracking-[0.2em]">Next Step</span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mt-4 leading-snug">
                  Ready to deploy these capabilities in your business?
                </h3>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors w-full">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      <LazySection className="contents" placeholderClassName="block min-h-[3200px] bg-[#050505] border-t border-white/5" rootMargin="300px">
      {/* ── Testimonials Section ── */}
      <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 block mb-4 gsap-reveal">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 gsap-reveal">What Our Clients Say</h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto gsap-reveal">
              Read real feedback from business owners and directors in Dubai, Sharjah, and Abu Dhabi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Since deploying Asif Digital's Sales Agent on our new website, we capture leads at 2 AM and our booking rate increased by 314%. It's like having a top-performing salesperson who never sleeps.",
                author: "Tariq Mahmood",
                role: "Dubai Real Estate Director",
                img: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "Our law firm's outbound pipeline was zero. Asif Digital built a high-speed, modern booking site and integrated an AI assistant that qualifies leads. Outbound meetings increased by 5.5x in Month 1.",
                author: "Faisal Al-Suwaidi",
                role: "Managing Partner, Legal Firm",
                img: "https://randomuser.me/api/portraits/men/44.jpg"
              },
              {
                quote: "As a smaller business, we can't afford a massive sales team. The WhatsApp AI agent gave us the firepower of a massive enterprise on a small budget. Setup was incredibly fast.",
                author: "Mariam Al-Mansoori",
                role: "Founder, Specialized Services",
                img: "https://randomuser.me/api/portraits/women/44.jpg"
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/80 font-normal text-sm leading-relaxed mb-8">
                    "{item.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.author} className="w-10 h-10 rounded-full border border-white/10" />
                  <div>
                    <h4 className="text-white font-bold text-xs">{item.author}</h4>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Automate ── */}
      <section className="relative z-20 py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 block mb-4 gsap-reveal">Bespoke Solutions</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 gsap-reveal text-white">Industries We Automate</h2>
            <p className="text-white/60 text-lg font-light max-w-2xl mx-auto gsap-reveal">
              We design custom AI workflows and high-speed software tailored to the unique operational demands of GCC businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                industry: "Real Estate & Property Development",
                desc: "Qualify prospective buyers, automate brochure delivery via WhatsApp, sync lead profiles to Salesforce/HubSpot, and capture international inquiries 24/7.",
                features: ["OSINT Prospect Mapping", "WhatsApp Brochure Bots", "Bilingual Lead Qualification"]
              },
              {
                industry: "Professional Services (Legal & Consulting)",
                desc: "Remove the admin overhead. Auto-calculate quotes based on client parameters, schedule consultations directly into partners' calendars, and automate retainer onboarding.",
                features: ["Interactive Client Onboarding", "Automated Billing Flows", "CRM Sync (Salesforce/HubSpot)"]
              },
              {
                industry: "E-commerce & Local Services",
                desc: "Convert high-ticket traffic instantly. Standard websites lose after-hours leads; our automated stores use conversational agents to close sales around the clock.",
                features: ["Instant Cart Recovery", "WhatsApp Sales Swarms", "Technician Dispatch Routing"]
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 flex flex-col justify-between h-full group hover:border-green-500/20">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-green-400 transition-colors">{item.industry}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-8">{item.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {item.features.map((f, j) => (
                    <span key={j} className="text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/5">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations Section ── */}
      <section className="relative z-20 py-24 px-6 md:px-12 bg-[#080808] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 block mb-4 gsap-reveal">Unified Ecosystem</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8 gsap-reveal text-white">Seamless Integration With Your Tech Stack</h2>
              <p className="text-white/70 leading-relaxed text-sm mb-6">
                Our AI agents don't live in isolation. We connect them directly to your existing systems—from CRMs and email suites to payment processors and team messaging apps.
              </p>
              <p className="text-white/50 text-xs">
                We are official integration partners for leading automation engines like n8n, Make.com, and Zapier, ensuring clean API setups without downtime.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "n8n & Make.com", type: "Automation Engines" },
                { name: "Salesforce", type: "CRM Ecosystem" },
                { name: "HubSpot", type: "Sales & Marketing" },
                { name: "OpenAI / Anthropic", type: "LLM Orchestration" },
                { name: "WhatsApp Business API", type: "Customer Messaging" },
                { name: "Zapier Portal", type: "Cloud Workflows" }
              ].map((stack, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all text-center">
                  <div className="text-white font-bold text-sm mb-1">{stack.name}</div>
                  <div className="text-white/40 text-[9px] uppercase tracking-widest font-black">{stack.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Intelligence Arbitrage ROI Calculator ── */}
      <section className="relative z-20 py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#050505]">
        <div className="text-center mb-16">
          <span className="micro-label block mb-4">Intelligence Arbitrage</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Human vs. AI: <span className="italic text-white/40">Calculate Savings.</span></h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto font-normal">Compare the cost of hiring human sales and support staff vs. deploying an AI Chatbot directly onto your new website.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl">
            <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label htmlFor="roi-employees" className="text-xs uppercase tracking-widest font-bold text-white/60">Number of Customer Support/Sales Staff</label>
              <span className="text-3xl font-serif text-white">{employees}</span>
            </div>
            <input 
              id="roi-employees"
              type="range" 
              min="1" max="50" 
              value={employees} 
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div className="roi-card-left p-6 rounded-2xl border border-red-500/20 bg-red-500/5 opacity-0">
                <h4 className="text-[10px] uppercase tracking-widest text-red-500/80 font-bold mb-4">Current Human Overhead</h4>
                <div className="text-3xl font-serif text-white mb-2">AED {(totalHumanCost).toLocaleString()} <span className="text-sm font-sans text-white/40">/ yr</span></div>
                <ul className="text-xs font-normal text-white/60 space-y-2 mt-4">
                  <li>• Salaries & UAE Visa Fees</li>
                  <li>• Office Space & Allowances</li>
                  <li>• Only available 8 hours a day</li>
                </ul>
             </div>
             
             <div className="roi-card-right p-6 rounded-2xl border border-green-500/20 bg-green-500/5 opacity-0">
                <h4 className="text-[10px] uppercase tracking-widest text-green-500/80 font-bold mb-4">Our Solution: AI Chatbot on Your Website</h4>
                <div className="text-3xl font-serif text-white mb-2">AED {(totalAgentCost).toLocaleString()} <span className="text-sm font-sans text-white/40">/ yr</span></div>
                 <ul className="text-xs font-normal text-white/80 space-y-2 mt-4">
                  <li>• No visa costs, no housing allowance needed</li>
                  <li>• Answers customers 24 hours a day, 7 days a week</li>
                  <li>• Handles unlimited conversations at once</li>
                </ul>
             </div>
          </div>

          <div className="roi-savings-container text-center pt-8 border-t border-white/10 opacity-0">
            <div className="text-[12px] uppercase tracking-widest text-white/60 font-bold mb-2">You Could Save Every Year</div>
            <div id="roi-savings-value" className="text-5xl md:text-7xl font-serif text-green-400">AED {(totalSavings).toLocaleString()}</div>
            <p className="text-white/40 text-sm mt-4 font-normal">Based on average UAE staff costs. Book a free call to see your exact numbers.</p>
          </div>
        </div>
      </section>
      
      {/* ── Case Studies ── */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 block mb-4">Proof It Works</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight mb-6">
                Real Results for <span className="italic text-white/60">UAE Businesses.</span>
              </h2>
              <p className="text-white/60 text-lg font-normal leading-relaxed">
                Here are real results we have delivered for businesses in Dubai, Sharjah, and across the UAE.
              </p>
            </div>
            <Link href="/case-studies" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px] font-bold">
              View All Results <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.slice(0, 3).map((study, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-cursor="view"
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] hover:border-white/20 transition-all duration-500 flex flex-col h-full cursor-pointer"
              >
                <div className="aspect-video overflow-hidden border-b border-white/5">
                  <img src={study.img} alt={study.title || study.client} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">{study.industry} — {study.client}</span>
                  <h3 className="text-xl font-serif mb-4 leading-tight text-white">{study.title || study.client}</h3>
                  <p className="text-white/60 font-normal text-sm mb-6 leading-relaxed flex-grow">{study.desc || study.challenge}</p>
                  <div className="space-y-3 mt-auto pt-6 border-t border-white/5">
                    {study.results ? study.results.slice(0, 2).map((res, j) => (
                      <div key={j} className="flex items-start gap-3 text-xs text-green-400 font-bold">
                        <TrendingUp className="w-3 h-3 mt-0.5 text-green-500" />
                        <span>{res}</span>
                      </div>
                    )) : study.highlights.slice(0,2).map((hl, j) => (
                      <div key={j} className="flex items-start gap-3 text-xs text-green-400 font-bold">
                        <TrendingUp className="w-3 h-3 mt-0.5 text-green-500" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Chatbot Highlight ── */}
      <section className="py-40 px-6 md:px-12 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="micro-label block mb-4 text-green-500/80">AI Chatbot for Your Website & WhatsApp</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.05] mb-8">
                Never Miss a<br /><span className="italic text-white/60">Customer Again.</span>
              </h2>
              <p className="text-white/80 font-normal leading-relaxed mb-10 text-lg max-w-xl">
                Imagine having a smart assistant on your website and WhatsApp that answers every customer question in English and Arabic, collects their contact details, and books them into your calendar — automatically, 24 hours a day.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { stat: "3–4 Days", label: "Setup Time" },
                  { stat: "24/7", label: "Always Online" },
                  { stat: "Arabic & English", label: "Both Languages" },
                  { stat: "No Monthly Fees", label: "You Own It" },
                ].map((item, i) => (
                  <div key={i} className="p-5 border border-white/5 bg-white/[0.02] rounded-2xl">
                    <div className="text-2xl font-serif text-white mb-1">{item.stat}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{item.label}</div>
                  </div>
                ))}
              </div>
              <div 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                aria-label="See the AI Chatbot in Action"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                See It in Action <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="space-y-4">
              {[
                { title: "Answers Customer Questions Instantly", desc: "Trained on your business, it knows your prices, services, and FAQs. Customers get answers in seconds — in English or Arabic." },
                { title: "Works on WhatsApp Too", desc: "Customers can message your AI assistant on WhatsApp — the most popular app in the UAE — making it incredibly easy for them to reach you." },
                { title: "Captures Every Lead Automatically", desc: "It collects customer names and phone numbers, then sends them straight to you so you never miss a potential sale." },
                { title: "Books Appointments for You", desc: "It connects to your calendar and lets customers book consultations or service appointments automatically — no back-and-forth needed." },
              ].map((f, i) => (
                <div key={i} className="flex gap-5 p-6 border border-white/5 bg-white/[0.02] rounded-2xl group hover:border-white/20 transition-all duration-500">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 font-serif font-bold text-sm">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-white">{f.title}</h4>
                    <p className="text-sm text-white/70 font-normal leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="micro-label block mb-4 text-[#0066FF]">Free Tips & Guides</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Our Blog</h2>
          </div>
          <a href="/blog" aria-label="Explore all blog articles" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] border border-white/10 transition-all flex items-center gap-2 group">
            Read All Articles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" role="img" aria-label="Chevron Right icon" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <a key={i} href={`/blog/${post.slug}`} aria-label={`Read Article: ${post.title}`} className="group block p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 flex flex-col h-full">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF] mb-6">
                {post.category}
              </div>
              <h3 className="text-2xl font-serif mb-6 text-white leading-tight flex-grow">
                {post.title}
              </h3>
              <p className="text-sm text-white/70 font-normal leading-relaxed mb-8 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                Read Article <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="micro-label block mb-4">Our Simple Process</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                How It Works. <span className="italic">Simple & Fast.</span>
              </h2>
            </div>
            <p className="text-white/60 font-normal max-w-sm mb-2 text-sm leading-relaxed">
              No technical jargon, no confusion. Just a clear process that gets your business online and growing fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                phase: "Step 01",
                title: "Free Discovery Call",
                desc: "We start with a free 15-minute call to understand your business, your goals, and what's not working right now. No pressure, just a conversation.",
                tags: ["Free Consultation", "No Obligation"]
              },
              {
                phase: "Step 02",
                title: "We Plan Everything",
                desc: "We design your website structure, write your marketing copy in plain English, and plan exactly how your AI chatbot will work for your business.",
                tags: ["Design", "Strategy"]
              },
              {
                phase: "Step 03",
                title: "We Build It",
                desc: "Our team builds your fast, professional website and sets up all your digital tools. Most projects are fully ready within 2 to 4 weeks.",
                tags: ["Development", "Testing"]
              },
              {
                phase: "Step 04",
                title: "Go Live & Grow",
                desc: "We launch your website and immediately start your SEO campaign so customers start finding you on Google as quickly as possible.",
                tags: ["Launch", "Marketing"]
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/50 transition-all duration-700 group"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0066FF] mb-12">
                  {step.phase}
                </div>
                <h3 className="text-2xl font-serif mb-6 text-white group-hover:translate-x-2 transition-transform duration-500">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 font-normal leading-relaxed mb-10">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Team Section ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 block mb-4 gsap-reveal">Who We Are</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 gsap-reveal">Meet the Architects</h2>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto gsap-reveal">
            A small team of dedicated AI architects, web engineers, and conversation designers based in the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-green-500/30 transition-all duration-500 flex flex-col h-full"
            >
              {/* Profile Image with zoom effect */}
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </div>
              
              {/* Member Details */}
              <div className="p-8 flex flex-col flex-grow relative z-10 -mt-10 bg-[#050505]/90 backdrop-blur-sm rounded-t-[1.5rem] border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2">{member.role}</span>
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-green-400 transition-colors">{member.name}</h3>
                <p className="text-sm text-white/70 font-normal leading-relaxed">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="micro-label block mb-4">Common Questions</span>
          <h2 className="text-4xl md:text-5xl font-serif">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "Do I need a new website to get an AI chatbot?", a: "No — we can install our AI chatbot on your existing website. However, if your current site is slow or outdated, we strongly recommend our full Web + AI package for the best results. A fast website combined with an AI chatbot is our most powerful offering." },
            { q: "How does the AI chatbot actually work?", a: "We train it on your specific business information — your services, prices, FAQs, and location. It then sits on your website and WhatsApp, answering customer questions in English and Arabic, collecting their contact details, and booking appointments — all automatically." },
            { q: "How much does a website and AI chatbot cost?", a: "Our packages range from AED 2,000 to AED 10,000 depending on the size of your website and how advanced the AI chatbot needs to be. Contact us for a free, no-obligation quote tailored to your business." },
            { q: "How long does it take to build my website?", a: "Most websites are ready to launch within 2 to 4 weeks from the day we agree on the design. The AI chatbot setup takes an additional 3 to 4 business days after the website is ready." },
            { q: "Will my website show up on Google?", a: "Yes — every website we build is fully optimised for Google from day one. We also offer monthly SEO packages that actively work to move your business up the Google rankings for the exact keywords your customers are searching." }
          ].map((faq, i) => (
            <details key={i} className="group border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden">
              <summary className="p-8 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <span className="text-lg font-serif text-white pr-4">{faq.q}</span>
                <ChevronRight className="w-5 h-5 text-white/30 group-open:rotate-90 transition-transform flex-shrink-0" role="img" aria-label="Toggle Answer icon" />
              </summary>
              <div className="px-8 pb-8 text-white/70 font-normal leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-6 md:px-12 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-black rounded-full flex items-center justify-center text-white shadow-2xl">
            <Phone className="w-8 h-8" role="img" aria-label="Phone icon" />
          </div>
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-serif tracking-tighter leading-tight mb-8">
            Ready to Grow <span className="italic opacity-40">Your Business?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-black/70 font-normal text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Get a free strategy call with our team. We will look at your current website and digital presence and tell you exactly what needs to be improved — at no cost, with no obligation.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton>
              <Link 
                href="/contact"
                className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs border border-white/20 hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95"
              >
                Book My Free Strategy Call <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="https://wa.me/971545866094" target="_blank" rel="noopener noreferrer"
                className="bg-transparent text-black border border-black/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3"
              >
                WhatsApp Us Now <MessageSquare className="w-4 h-4" role="img" aria-label="WhatsApp icon" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      {/* Footer SEO Link Swarm */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
            <Link href="/services/web-design-dubai-sharjah" className="hover:text-white transition-colors">Web Design Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/services/seo-agency-dubai-sharjah-uae" className="hover:text-white transition-colors">SEO Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/sovereign-sales-agent" className="hover:text-white transition-colors">AI Chatbot Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/services/ppc-google-ads-agency-dubai" className="hover:text-white transition-colors">Google Ads Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/services/branding-agency-dubai-sharjah" className="hover:text-white transition-colors">Branding Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/services/social-media-management-dubai-uae" className="hover:text-white transition-colors">Social Media Dubai</Link>
          </div>
        </div>
      </section>
      </LazySection>
    </div>
  );
}



