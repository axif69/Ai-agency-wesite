import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Code, Megaphone, PenTool, ArrowRight, Monitor, ShoppingCart, Server, HeadphonesIcon, Search, MousePointerClick, Share2, Bot, Palette, Image, Layers, Workflow, Languages, Target, Activity, Shield, Zap } from "lucide-react";

const categories = [
  {
    name: "Sovereign AI Hubs",
    icon: <Bot className="w-5 h-5" />,
    services: [
      { title: "Arabic AI Hub", desc: "Sovereign Khaleeji NLP and culturally-aligned Arabic intelligence for UAE government and enterprise. Beyond translation—neural alignment.", features: ["Khaleeji NLP", "Cultural Alignment", "Sovereign Compute", "Bilingual Swarms"], link: "/arabic-ai-hub", icon: <Languages className="w-8 h-8" /> },
      { title: "Sovereign Sales Agent", desc: "The ultimate B2B acquisition machine. Autonomous agents that hunt, qualify, and close high-ticket deals in the GCC with 25%+ reply rates.", features: ["Autonomous SDR", "OSINT Intelligence", "WhatsApp Closing", "24/7 Hunting"], link: "/sovereign-sales-agent", icon: <Target className="w-8 h-8" /> },
      { title: "Sovereign Command Center", desc: "Live, transparent monitoring of your AI swarms. Real-time reasoning logs, ROI metrics, and regional infrastructure health tracking.", features: ["Live Reasoning Logs", "ROI Analytics", "System Health", "Audit Trails"], link: "/sovereign-dashboard", icon: <Activity className="w-8 h-8" /> },
      { title: "AI Automation Dubai", desc: "Enterprise-grade agentic workflows that decouple growth from headcount. Architecting the 'Brain' of your organization.", features: ["Cognitive Workflows", "Private LLMs", "Process Mapping", "48-Hour Impact"], link: "/ai-automation-agency-dubai", icon: <Workflow className="w-8 h-8" /> },
    ]
  },
  {
    name: "Digital Architecture",
    icon: <Code className="w-5 h-5" />,
    services: [
      { title: "Enterprise Web Architecture", desc: "Premium, conversion-focused digital domains crafted for elite UAE brands. Every pixel is a calculated move toward market dominance.", features: ["Bespoke UI/UX", "GSAP Animations", "Core Web Vitals", "AEO-Ready"], link: "/services/web-design-dubai-sharjah", icon: <Monitor className="w-8 h-8" /> },
      { title: "Next-Gen Development", desc: "Scalable, high-performance web applications built on modern React and Next.js stacks with seamless Sovereign AI integrations.", features: ["React / Next.js", "AI Integration", "API Development", "Performance-First"], link: "/services/web-development-dubai-uae", icon: <Code className="w-8 h-8" /> },
      { title: "Headless Ecommerce", desc: "Powerful online stores for UAE businesses—Shopify, WooCommerce, or fully custom—with local payment gateways and conversion-optimized flows.", features: ["Shopify / WooCommerce", "Telr & PayFort", "Product Schema SEO", "Conversion-First"], link: "/services/ecommerce-website-development-dubai", icon: <ShoppingCart className="w-8 h-8" /> },
      { title: "Sovereign Hosting", desc: "UAE-based managed hosting with NVMe SSD servers, 99.99% uptime SLA, and UAE-North data residency compliance.", features: ["NVMe SSD Servers", "99.99% Uptime SLA", "G42 Compliance", "Daily Backups"], link: "/services/web-hosting-uae", icon: <Server className="w-8 h-8" /> },
    ]
  },
  {
    name: "Strategic Growth",
    icon: <Megaphone className="w-5 h-5" />,
    services: [
      { title: "AEO & Search Dominance", desc: "Dominating Answer Engines (AEO) and Google search for your most valuable UAE keywords through technical SEO and authority content.", features: ["AEO Strategy", "Local SEO (UAE)", "Content Authority", "Link Building"], link: "/services/seo-agency-dubai-sharjah-uae", icon: <Search className="w-8 h-8" /> },
      { title: "Precision PPC", desc: "High-ticket lead generation via Google and Meta Ads. Transparent reporting with a focus on high-intent conversion and ROAS.", features: ["Google Ads", "Meta Ads", "Landing Pages", "4.2x Avg. ROAS"], link: "/services/ppc-google-ads-agency-dubai", icon: <MousePointerClick className="w-8 h-8" /> },
      { title: "Social Authority", desc: "Full-service social media architecture—strategy, high-fidelity content creation, and community management across institutional channels.", features: ["Content Creation", "Community Mgmt", "Reels & TikTok", "Influencer Campaigns"], link: "/services/social-media-management-dubai-uae", icon: <Share2 className="w-8 h-8" /> },
    ]
  },
  {
    name: "Visual Authority",
    icon: <PenTool className="w-5 h-5" />,
    services: [
      { title: "Institutional Branding", desc: "Complete brand identity systems—logo design, comprehensive brand guidelines, and brand strategy for GCC market leaders.", features: ["Logo Design", "Brand Guidelines", "Brand Strategy", "Arabic/English"], link: "/services/branding-agency-dubai-sharjah", icon: <Palette className="w-8 h-8" /> },
      { title: "Strategic Design", desc: "Graphic design for institutional mediums—marketing collateral, social media templates, pitch decks, and annual reports.", features: ["Marketing Collateral", "Social Templates", "Pitch Decks", "Ad Creatives"], link: "/services/graphic-design-agency-dubai-sharjah", icon: <Image className="w-8 h-8" /> },
      { title: "Institutional UI/UX", desc: "Research-backed user experience design and pixel-perfect interfaces for complex SaaS and enterprise platforms.", features: ["UX Research", "Wireframing", "Figma Prototypes", "Design Systems"], link: "/services/ui-ux-design-agency-dubai", icon: <Layers className="w-8 h-8" /> },
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      <SEO
        title="Strategic Pillars | Asif Digital Sovereign AI"
        description="Comprehensive AI architectures and strategic digital pillars for GCC enterprises—Sovereign AI, Web Architecture, Growth, and Visual Authority."
      />
      
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-4xl"
        >
          <span className="micro-label block mb-4">Strategic Framework</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            Strategic <span className="italic text-white/50">Pillars.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            Our operations are categorized into four core intelligence hubs, each designed to architect unshakeable market dominance for your organization.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="mb-32 last:mb-0">
            <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/5">
              <span className="text-[#0066FF]">{cat.icon}</span>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">{cat.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cat.services.map((service, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-30px" }} 
                  transition={{ delay: i * 0.08 }} 
                  className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#0066FF]/30 transition-all duration-700 group flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 transform group-hover:scale-110 group-hover:rotate-12 text-[#0066FF]">
                    {service.icon}
                  </div>
                  <div className="mb-8 text-white/20 group-hover:text-[#0066FF] transition-colors duration-700">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-serif mb-4 group-hover:translate-x-1 transition-transform duration-500">{service.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed mb-8 flex-grow text-sm">{service.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {service.features.map((f, j) => (
                      <span key={j} className="px-3 py-1.5 rounded-full border border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link to={service.link} className="inline-flex items-center justify-between w-full py-5 border-t border-white/10 uppercase tracking-[0.2em] text-[10px] font-bold hover:text-[#0066FF] transition-all group-hover:border-[#0066FF]/20">
                    <span>Deploy Solution</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-3 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Institutional CTA */}
      <section className="px-6 md:px-12 py-32 bg-white/[0.02] border-y border-white/5 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <Shield className="w-16 h-16 text-[#0066FF] mx-auto mb-10 opacity-50" />
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Architectural Alignment</h2>
          <p className="text-xl text-white/50 font-light mb-12 leading-relaxed">
            Unsure which pillar matches your current friction point? Initiate a preliminary audit with our Strategic Intake Agent to determine your optimal deployment path.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#0066FF] hover:text-white transition-all duration-500 shadow-2xl">
              Initiate Corporate Audit
            </Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
              className="px-12 py-5 rounded-full border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3"
            >
              Consult Khalid Agent <Zap className="w-4 h-4 text-[#0066FF]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
