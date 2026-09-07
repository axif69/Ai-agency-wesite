"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, Code, Megaphone, PenTool, ChevronDown } from "lucide-react";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const KhalidChatbot = dynamic(() => import("./KhalidChatbot"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenMobileAccordion((prev) => (prev === name ? null : name));
  };

  const [footerEmail, setFooterEmail] = useState("");
  const [footerBrief, setFooterBrief] = useState("");
  const [isBriefSubmitting, setIsBriefSubmitting] = useState(false);
  const [isBriefSuccess, setIsBriefSuccess] = useState(false);

  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim() || !footerBrief.trim() || isBriefSubmitting) return;
    
    setIsBriefSubmitting(true);
    
    try {
      const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "").trim();
      if (accessKey) {
        const submissionData = new FormData();
        submissionData.append("access_key", accessKey);
        submissionData.append("email", footerEmail);
        submissionData.append("message", footerBrief);
        submissionData.append("subject", `New Project Brief from Footer`);
        submissionData.append("from_name", "Asif Digital Brief Intake");

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: submissionData
        });
      }

      setIsBriefSuccess(true);
      setFooterEmail("");
      setFooterBrief("");
      setTimeout(() => setIsBriefSuccess(false), 6000);
    } catch (error) {
      console.error("Brief Error:", error);
      setIsBriefSuccess(true);
    } finally {
      setIsBriefSubmitting(false);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileAccordion(null);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Sovereign AI", path: "/sovereign-sales-agent" },
    { name: "Strategic Pillars", path: "/services" },
    { name: "Arabic AI", path: "/arabic-ai-hub" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Free Tools", path: "/tools" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-green-500/30 overflow-x-hidden font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:rounded-full focus:font-bold">
        Skip to Content
      </a>
      <WhatsAppButton />
      <KhalidChatbot />

      {/* Sovereign Status Bar */}
      <div className="bg-[#0a0a0a] border-b border-white/5 py-2 px-6 md:px-12 flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 z-[60] relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-green-500/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Sovereign Network: Active
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline italic">Dubai Node: DXB-PRIME</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' })} GST</span>
          <span className="text-white/20">|</span>
          <Link href="/contact" className="hover:text-white transition-colors">Project Intake</Link>
        </div>
      </div>

      <header className="fixed top-9 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" aria-label="Asif Digital Home" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/asif-digital-ad-mark.png"
            alt=""
            width={36}
            height={36}
            priority
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
          />
          <span className="text-[20px] sm:text-[23px] leading-none font-serif font-bold tracking-tight mix-blend-difference">
            Asif Digital.
          </span>
        </Link>
        
        <button
          className="md:hidden z-50 p-2 mix-blend-difference"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className="hidden md:flex gap-5 lg:gap-7 text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.16em]">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              <Link
                href={link.path}
                aria-label={`Navigate to ${link.name}`}
                className="relative hover:text-white transition-colors py-4 inline-block mix-blend-difference"
              >
                {link.name}
                <span className="absolute bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
              </Link>
              
              {/* Sovereign AI Dropdown - 3-Column Curated Mega Menu */}
              {link.name === "Sovereign AI" && (
                <div style={{ mixBlendMode: 'normal' }} className="absolute left-1/2 -translate-x-1/2 top-full w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[100] pt-6">
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden font-sans normal-case tracking-normal text-left p-6 grid grid-cols-3 gap-6">
                    {/* Column 1: Enterprise AI */}
                    <div className="space-y-1 border-r border-white/10 pr-5">
                      <div className="pb-2.5 mb-2 border-b border-white/5">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">Enterprise AI</span>
                      </div>
                      <Link href="/ai-consulting-uae" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI Consulting</Link>
                      <Link href="/ai-automation-agency-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI Automation Agency</Link>
                      <Link href="/ai-agents-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Custom AI Agents</Link>
                      <Link href="/workflow-automation-uae" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Workflow Automation</Link>
                      <Link href="/arabic-ai-hub" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Arabic AI</Link>
                      <Link href="/hospitality-ai-automation-uae" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Hospitality AI</Link>
                      <Link href="/services" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">View All AI Services →</Link>
                    </div>

                    {/* Column 2: Growth & Performance */}
                    <div className="space-y-1 border-r border-white/10 pr-5">
                      <div className="pb-2.5 mb-2 border-b border-white/5">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">Growth &amp; Performance</span>
                      </div>
                      <Link href="/ai-marketing-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI Marketing</Link>
                      <Link href="/ai-lead-generation-agency-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI Lead Generation</Link>
                      <Link href="/ai-seo-agency-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI SEO &amp; AEO</Link>
                      <Link href="/ai-ppc-agency-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI PPC</Link>
                      <Link href="/free-growth-audit" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Free Growth Audit</Link>
                      <Link href="/tools/ad-spend-efficiency-analyzer" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Ad Spend Analyzer</Link>
                      <Link href="/services" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">View Growth Services →</Link>
                    </div>

                    {/* Column 3: Real Estate AI */}
                    <div className="space-y-1">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">Real Estate AI</span>
                        <Link href="/real-estate" className="text-[10px] font-mono text-white/50 hover:text-emerald-300">Pillar Hub</Link>
                      </div>
                      <Link href="/real-estate" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Real Estate AI Hub</Link>
                      <Link href="/ai-real-estate-agencies-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI for Real Estate Agencies</Link>
                      <Link href="/real-estate-crm-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Real Estate CRM</Link>
                      <Link href="/ai-property-management-uae" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Property Management AI</Link>
                      <Link href="/real-estate/portal-lead-integration-dubai" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">Portal Lead Integration</Link>
                      <Link href="/real-estate/ai-lead-dashboard" className="text-white/85 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2 hover:pl-1.5 duration-200 border-b border-white/5">AI Lead Dashboard</Link>
                      <Link href="/real-estate" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">View Real Estate Solutions →</Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mega Menu Dropdown - Strategic Pillars */}
              {link.name === "Strategic Pillars" && (
                <div style={{ mixBlendMode: 'normal' }} className="absolute left-1/2 -translate-x-1/2 top-full w-[940px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[100] pt-6">
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex font-sans normal-case tracking-normal text-left">
                    
                    {/* Web Column */}
                    <div className="w-[34%] bg-[#111111] p-8 border-r border-white/5">
                      <h3 className="text-white/95 text-[11px] font-bold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                        <Code className="w-4 h-4 text-emerald-400" role="img" aria-label="Code Icon" /> Web &amp; Systems
                      </h3>
                      <ul className="space-y-4">
                        <li><Link href="/services/web-design-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Web Design Dubai</Link></li>
                        <li><Link href="/web-design-sharjah" className="text-emerald-400 hover:text-emerald-300 transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Web Design Sharjah</Link></li>
                        <li><Link href="/services/web-development-dubai-uae" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Web Development</Link></li>
                        <li><Link href="/services/ecommerce-website-development-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Ecommerce Websites</Link></li>
                        <li><Link href="/services/web-hosting-uae" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Web Hosting</Link></li>
                        <li><Link href="/services/website-maintenance-support-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Website Support</Link></li>
                      </ul>
                    </div>
                    
                    {/* Digital Marketing Column */}
                    <div className="w-[36%] bg-[#0c0c0c] p-8 border-r border-white/5">
                      <h3 className="text-white/95 text-[11px] font-bold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-emerald-400" role="img" aria-label="Megaphone Icon" /> AI &amp; Performance Media
                      </h3>
                      <ul className="space-y-4">
                        <li><Link href="/ai-ppc-agency-dubai" className="text-emerald-400 hover:text-emerald-300 transition-all text-sm font-semibold block py-0.5 hover:pl-1.5 duration-200">AI PPC Agency</Link></li>
                        <li><Link href="/ai-seo-agency-dubai" className="text-emerald-400 hover:text-emerald-300 transition-all text-sm font-semibold block py-0.5 hover:pl-1.5 duration-200">AI SEO &amp; AEO Agency</Link></li>
                        <li><Link href="/services/ppc-google-ads-agency-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Traditional PPC Ads</Link></li>
                        <li><Link href="/services/seo-agency-dubai-sharjah-uae" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Traditional SEO</Link></li>
                        <li><Link href="/services/social-media-management-dubai-uae" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Social Media Management</Link></li>
                        <li><Link href="/ai-chatbots-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">AI Chatbots Dubai</Link></li>
                      </ul>
                    </div>

                    {/* Creative Column */}
                    <div className="w-[30%] bg-[#111111] p-8">
                      <h3 className="text-white/95 text-[11px] font-bold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-emerald-400" role="img" aria-label="Pen Tool Icon" /> Creative &amp; Brand
                      </h3>
                      <ul className="space-y-4">
                        <li><Link href="/services/branding-agency-dubai-sharjah" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Brand Strategy</Link></li>
                        <li><Link href="/services/graphic-design-agency-dubai-sharjah" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Graphic Design</Link></li>
                        <li><Link href="/services/ui-ux-design-agency-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">UI/UX Design</Link></li>
                        <li><Link href="/services/creative-web-design-dubai" className="text-white/85 hover:text-white transition-all text-sm font-medium block py-0.5 hover:pl-1.5 duration-200">Creative Web Design</Link></li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      {/* Dedicated Mobile Navigation Drawer (Zero Emojis, Single-Open Accordions, Min 44-48px Touch Targets) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#070707] flex flex-col md:hidden overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          {/* Mobile Drawer Top Bar */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0a0a0a] shrink-0">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5"
              aria-label="Asif Digital Home"
            >
              <Image
                src="/images/asif-digital-ad-mark.png"
                alt=""
                width={32}
                height={32}
                className="w-7 h-7 object-contain"
              />
              <span className="text-[19px] leading-none font-serif font-bold tracking-tight text-white">
                Asif Digital.
              </span>
            </Link>
            
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setOpenMobileAccordion(null);
              }}
              className="p-2.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 overscroll-contain">
            {/* Quick Links */}
            <div className="space-y-1 pb-3 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>

            {/* AI Solutions Accordions (Single-Open Controlled State) */}
            <div className="space-y-2 pb-3 border-b border-white/10">
              <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold mb-2">
                AI Systems &amp; Solutions
              </div>

              {/* Accordion 1: Enterprise AI */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("enterprise")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "enterprise"}
                >
                  <span>Enterprise AI</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "enterprise" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "enterprise" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/ai-consulting-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI Consulting
                    </Link>
                    <Link href="/ai-automation-agency-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI Automation Agency
                    </Link>
                    <Link href="/ai-agents-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Custom AI Agents
                    </Link>
                    <Link href="/workflow-automation-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Workflow Automation
                    </Link>
                    <Link href="/arabic-ai-hub" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Arabic AI
                    </Link>
                    <Link href="/hospitality-ai-automation-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Hospitality AI
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View All AI Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 2: Growth & Performance */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("growth")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "growth"}
                >
                  <span>Growth &amp; Performance</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "growth" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "growth" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/ai-marketing-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI Marketing
                    </Link>
                    <Link href="/ai-lead-generation-agency-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI Lead Generation
                    </Link>
                    <Link href="/ai-seo-agency-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI SEO &amp; AEO
                    </Link>
                    <Link href="/ai-ppc-agency-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI PPC
                    </Link>
                    <Link href="/free-growth-audit" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Free Growth Audit
                    </Link>
                    <Link href="/tools/ad-spend-efficiency-analyzer" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Ad Spend Analyzer
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View Growth Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 3: Real Estate AI */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("realestate")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "realestate"}
                >
                  <span>Real Estate AI</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "realestate" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "realestate" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/real-estate" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Real Estate AI Hub
                    </Link>
                    <Link href="/ai-real-estate-agencies-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI for Real Estate Agencies
                    </Link>
                    <Link href="/real-estate-crm-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Real Estate CRM
                    </Link>
                    <Link href="/ai-property-management-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Property Management AI
                    </Link>
                    <Link href="/real-estate/portal-lead-integration-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Portal Lead Integration
                    </Link>
                    <Link href="/real-estate/ai-lead-dashboard" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI Lead Dashboard
                    </Link>
                    <Link href="/real-estate" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View Real Estate Solutions →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 4: Strategic Pillars */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("pillars")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "pillars"}
                >
                  <span>Strategic Pillars</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "pillars" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "pillars" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/services/web-design-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Web Design Dubai
                    </Link>
                    <Link href="/web-design-sharjah" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      Web Design Sharjah
                    </Link>
                    <Link href="/services/web-development-dubai-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Web Development
                    </Link>
                    <Link href="/services/ecommerce-website-development-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Ecommerce Websites
                    </Link>
                    <Link href="/services/seo-agency-dubai-sharjah-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      SEO &amp; Performance Media
                    </Link>
                    <Link href="/services/branding-agency-dubai-sharjah" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Branding &amp; Design
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View All Pillars →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Links */}
            <div className="space-y-1 pb-3 border-b border-white/10">
              <Link
                href="/arabic-ai-hub"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Arabic AI Hub
              </Link>
              <Link
                href="/case-studies"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Case Studies
              </Link>
              <Link
                href="/tools"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Free Tools
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Insights &amp; Blog
              </Link>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-2 pb-6 space-y-3">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full min-h-[48px] bg-white text-black font-bold rounded-xl flex items-center justify-center text-[12px] uppercase tracking-wider hover:bg-white/90 transition-all shadow-xl"
              >
                Book Strategic Consultation
              </Link>
              <a
                href="https://wa.me/971545866094"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] border border-white/15 bg-white/[0.03] text-white/80 hover:text-white rounded-xl flex items-center justify-center text-[12px] font-mono tracking-wider transition-colors"
              >
                Direct WhatsApp: +971 54 586 6094
              </a>
            </div>
          </div>
        </div>
      )}

      <main
        id="main-content"
        key={pathname}
        className="pt-24 min-h-screen outline-none"
      >
        <Suspense fallback={<div className="min-h-[40vh]" />}>
          {children}
        </Suspense>
      </main>

      <footer className="py-32 px-6 md:px-12 border-t border-white/5 mt-20 bg-black relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            {/* Brand Section */}
            <div className="space-y-8">
              <Link href="/" aria-label="Asif Digital Home" className="inline-flex items-center gap-3">
                <Image
                  src="/images/asif-digital-ad-mark.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain shrink-0"
                />
                <span className="text-4xl leading-none font-serif font-bold tracking-tight">Asif Digital.</span>
              </Link>
              <p className="text-white/95 font-light text-base max-w-xs leading-relaxed">
                Architecting the future of digital commerce through AI-driven precision and enterprise-grade software engineering.
              </p>
              <div className="flex gap-4 pt-4">
                {[
                  { name: 'LN', label: 'LinkedIn profile', href: 'https://www.linkedin.com' },
                  { name: 'TW', label: 'X profile', href: 'https://x.com' },
                  { name: 'IG', label: 'Instagram profile', href: 'https://www.instagram.com' }
                ].map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Visit our ${social.label}`} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold group">
                    <span className="group-hover:scale-110 transition-transform">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Menu Section */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/95 font-bold mb-10">Navigation</h4>
              <ul className="space-y-5">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-white/95 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium">
                      <span className="w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-6" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/95 font-bold mb-10">Direct Contact</h4>
              <ul className="space-y-8 text-white/95 font-light">
                <li className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/90 font-black">Strategic Inquiry</span>
                  <a href="https://wa.me/971545866094" className="text-white/95 hover:text-white transition-colors text-lg font-serif italic">+971 54 586 6094</a>
                </li>
                <li className="flex flex-col gap-2 overflow-hidden">
                  <span className="text-[9px] uppercase tracking-widest text-white/90 font-black">Email Correspondence</span>
                  <a href="mailto:hello@asifdigital.agency" className="text-white/95 hover:text-white transition-colors text-xs sm:text-sm max-w-full break-all">hello@asifdigital.agency</a>
                </li>
                <li className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/90 font-black">Registered Location</span>
                  <span className="text-white/95 text-sm leading-relaxed italic">Muwaileh Commercial - Industrial Area, Sharjah, UAE</span>
                  <Link href="/ai-automation-sharjah" className="text-[11px] font-mono text-emerald-400/90 hover:underline inline-flex items-center gap-1.5 mt-0.5">
                    Sharjah AI Automation Team →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Contact Form */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/95 font-bold mb-10">Briefing</h4>
              {isBriefSuccess ? (
                <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 text-center text-sm font-light text-green-400">
                  Briefing Received. Our team will review and contact you within 12 hours.
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleBriefSubmit} aria-label="Quick Project Briefing Form">
                  <div className="relative group">
                    <label htmlFor="footer-email" className="sr-only">Corporate Email</label>
                    <input 
                      id="footer-email"
                      type="email" 
                      placeholder="Corporate Email" 
                      autoComplete="email"
                      required
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      disabled={isBriefSubmitting}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/50 transition-all duration-500 placeholder:text-white/90"
                    />
                  </div>
                  <div className="relative group">
                    <label htmlFor="footer-brief" className="sr-only">Project Brief</label>
                    <textarea 
                      id="footer-brief"
                      placeholder="Project Brief" 
                      rows={4}
                      required
                      value={footerBrief}
                      onChange={(e) => setFooterBrief(e.target.value)}
                      disabled={isBriefSubmitting}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/50 transition-all duration-500 resize-none placeholder:text-white/90"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isBriefSubmitting}
                    aria-label="Submit your project briefing" 
                    className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-white/90 transition-all duration-500 text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBriefSubmitting ? "Sending..." : "Submit Brief"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] text-white/95 uppercase tracking-[0.3em] font-bold">
              &copy; 2026 Asif Digital &mdash; Intelligent Systems.
            </div>
            <div className="flex gap-12 text-[10px] text-white/95 uppercase tracking-[0.3em] font-bold">
              <Link href="/privacy-policy" className="hover:text-white transition-colors" aria-label="Read our Privacy Architecture">Privacy Architecture</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors" aria-label="Review our Legal Framework">Legal Framework</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
