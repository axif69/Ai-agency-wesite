import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import PageLoader from "./PageLoader";
import WhatsAppButton from "./WhatsAppButton";
import KhalidChatbot from "./KhalidChatbot";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, Code, Megaphone, PenTool } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Sovereign AI", path: "#" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Case Studies", path: "/case-studies" },
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

      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12">
        <Link to="/" aria-label="Asif Digital Home" className="text-[26px] font-serif font-bold tracking-tight mix-blend-difference">
          Asif Khan.
        </Link>
        
        <button
          className="md:hidden z-50 p-2 mix-blend-difference"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className="hidden md:flex gap-8 text-[13px] font-semibold uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              <Link
                to={link.path}
                aria-label={`Go to ${link.name} page`}
                className="relative hover:text-white/60 transition-colors py-4 inline-block mix-blend-difference"
              >
                {link.name}
                <span className="absolute bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
              </Link>
              
              
              {/* Sovereign AI Dropdown */}
              {link.name === "Sovereign AI" && (
                <div style={{ mixBlendMode: 'normal' }} className="absolute left-1/2 -translate-x-1/2 top-full w-[350px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[100] pt-6">
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-sans normal-case tracking-normal text-left p-6 space-y-2">
                    <Link to="/services/agentic-finance-uae" className="text-white/80 hover:text-white transition-all text-[15px] font-medium block py-3 hover:pl-2 duration-200 border-b border-white/5">Agentic Finance & Compliance</Link>
                    <Link to="/services/ai-hr-emirates" className="text-white/80 hover:text-white transition-all text-[15px] font-medium block py-3 hover:pl-2 duration-200 border-b border-white/5">AI HR & Emiratization tracking</Link>
                    <Link to="/services/whatsapp-automation-gcc" className="text-white/80 hover:text-white transition-all text-[15px] font-medium block py-3 hover:pl-2 duration-200 border-b border-white/5">B2B Autonomous Sales Swarms</Link>
                    <Link to="/services/logistics-resilience" className="text-white/80 hover:text-white transition-all text-[15px] font-medium block py-3 hover:pl-2 duration-200">Logistics & Supply Chain AI</Link>
                  </div>
                </div>
              )}

              {/* Mega Menu Dropdown - isolated from blend mode */}
              {link.name === "Services" && (
                <div style={{ mixBlendMode: 'normal' }} className="absolute left-1/2 -translate-x-1/2 top-full w-[920px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[100] pt-6">
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex font-sans normal-case tracking-normal text-left">
                    
                    {/* Web Column */}
                    <div className="w-[37%] bg-[#111111] p-10 border-r border-white/5">
                      <h3 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                        <Code className="w-4 h-4" /> Web
                      </h3>
                      <ul className="space-y-5">
                        <li><Link to="/services/web-design-dubai-sharjah" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Web Design</Link></li>
                        <li><Link to="/services/web-development-dubai-uae" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Web Development</Link></li>
                        <li><Link to="/services/ecommerce-website-development-dubai" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Ecommerce Websites</Link></li>
                        <li><Link to="/services/web-hosting-uae" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Web Hosting</Link></li>
                        <li><Link to="/services/website-maintenance-support-dubai" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Website Support</Link></li>
                      </ul>
                    </div>
                    
                    {/* Digital Marketing Column */}
                    <div className="w-[33%] bg-[#0c0c0c] p-10 border-r border-white/5">
                      <h3 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                        <Megaphone className="w-4 h-4" /> Digital Marketing
                      </h3>
                      <ul className="space-y-5">
                        <li><Link to="/services/seo-agency-dubai-sharjah-uae" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">SEO</Link></li>
                        <li><Link to="/services/ppc-google-ads-agency-dubai" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">PPC</Link></li>
                        <li><Link to="/services/social-media-management-dubai-uae" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Social Media</Link></li>
                        <li><Link to="/services/ai-automation-chatbot-dubai" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">AI</Link></li>
                      </ul>
                    </div>

                    {/* Creative Column */}
                    <div className="w-[30%] bg-[#111111] p-10">
                      <h3 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                        <PenTool className="w-4 h-4" /> Creative
                      </h3>
                      <ul className="space-y-5">
                        <li><Link to="/services/branding-agency-dubai-sharjah" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Branding</Link></li>
                        <li><Link to="/services/graphic-design-agency-dubai-sharjah" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Design</Link></li>
                        <li><Link to="/services/ui-ux-design-agency-dubai" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">UI/UX</Link></li>
                        <li><Link to="/services/creative-web-design-dubai" className="text-white/80 hover:text-white transition-all text-sm font-medium block py-1 hover:pl-2 duration-200">Web Design</Link></li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-[#050505] md:hidden"
          >
            <nav className="flex flex-col gap-8 text-3xl font-serif tracking-tight text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-white/50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        id="main-content"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-24 min-h-screen outline-none"
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </motion.main>

      <footer className="py-32 px-6 md:px-12 border-t border-white/5 mt-20 bg-black relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            {/* Brand Section */}
            <div className="space-y-8">
              <Link to="/" className="text-4xl font-serif font-bold tracking-tight block">Asif Digital.</Link>
              <p className="text-white/40 font-light text-base max-w-xs leading-relaxed">
                Architecting the future of digital commerce through AI-driven precision and enterprise-grade software engineering.
              </p>
              <div className="flex gap-4 pt-4">
                {[
                  { name: 'LN', label: 'LinkedIn profile', icon: 'LinkedIn' },
                  { name: 'TW', label: 'Twitter profile', icon: 'Twitter' },
                  { name: 'IG', label: 'Instagram profile', icon: 'Instagram' }
                ].map((social) => (
                  <a key={social.name} href="#" aria-label={`Visit our ${social.label}`} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold group">
                    <span className="group-hover:scale-110 transition-transform">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Menu Section */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-10">Navigation</h4>
              <ul className="space-y-5">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/50 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium">
                      <span className="w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-6" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-10">Direct Contact</h4>
              <ul className="space-y-8 text-white/50 font-light">
                <li className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 font-black">Strategic Inquiry</span>
                  <a href="https://wa.me/971545866094" className="text-white/80 hover:text-white transition-colors text-lg font-serif italic">+971 54 586 6094</a>
                </li>
                <li className="flex flex-col gap-2 overflow-hidden">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 font-black">Email Correspondence</span>
                  <a href="mailto:Aiautomationdevelopement@gmail.com" className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm max-w-full break-all">Aiautomationdevelopement@gmail.com</a>
                </li>
                <li className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 font-black">Asif Digital Architecture</span>
                  <span className="text-white/80 text-sm leading-relaxed italic">Operating across the GCC territory.</span>
                </li>
              </ul>
            </div>

            {/* Quick Contact Form */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-10">Briefing</h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Quick Project Briefing Form">
                <div className="relative group">
                  <label htmlFor="footer-email" className="sr-only">Corporate Email</label>
                  <input 
                    id="footer-email"
                    type="email" 
                    placeholder="Corporate Email" 
                    autoComplete="email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-all duration-500 placeholder:text-white/20"
                  />
                </div>
                <div className="relative group">
                  <label htmlFor="footer-brief" className="sr-only">Project Brief</label>
                  <textarea 
                    id="footer-brief"
                    placeholder="Project Brief" 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-all duration-500 resize-none placeholder:text-white/20"
                  ></textarea>
                </div>
                <button type="submit" aria-label="Submit your project briefing" className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-white/90 transition-all duration-500 text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
                  Submit Brief
                </button>
              </form>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
              &copy; 2026 Asif Digital &mdash; Intelligent Systems.
            </div>
            <div className="flex gap-12 text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy Architecture</a>
              <a href="#" className="hover:text-white transition-colors">Legal Framework</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
