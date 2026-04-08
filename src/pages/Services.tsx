import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Code, Megaphone, PenTool, ArrowRight, Monitor, ShoppingCart, Server, HeadphonesIcon, Search, MousePointerClick, Share2, Bot, Palette, Image, Layers } from "lucide-react";

const categories = [
  {
    name: "Web",
    icon: <Code className="w-5 h-5" />,
    services: [
      { title: "Web Design", desc: "Premium, conversion-focused websites crafted for Dubai and UAE brands. From brand discovery to launch, every pixel is purposeful.", features: ["Bespoke UI/UX", "Mobile Responsive", "Core Web Vitals", "SEO-Ready"], link: "/services/web-design-dubai-sharjah", icon: <Monitor className="w-8 h-8" /> },
      { title: "Web Development", desc: "Scalable, high-performance web applications built on modern React and Next.js stacks with AI integrations and enterprise-grade infrastructure.", features: ["React / Next.js", "AI Integration", "API Development", "Performance-First"], link: "/services/web-development-dubai-uae", icon: <Code className="w-8 h-8" /> },
      { title: "Ecommerce Websites", desc: "Powerful online stores for UAE businesses—Shopify, WooCommerce, or fully custom—with local payment gateways and conversion-optimized checkout flows.", features: ["Shopify / WooCommerce", "Telr & PayFort", "Product Schema SEO", "Abandoned Cart Recovery"], link: "/services/ecommerce-website-development-dubai", icon: <ShoppingCart className="w-8 h-8" /> },
      { title: "Web Hosting", desc: "UAE-based managed hosting with NVMe SSD servers, 99.99% uptime SLA, free SSL, daily backups, and a global CDN for blazing-fast load times.", features: ["NVMe SSD Servers", "99.99% Uptime SLA", "Free SSL + CDN", "Daily Backups"], link: "/services/web-hosting-uae", icon: <Server className="w-8 h-8" /> },
      { title: "Website Support", desc: "Ongoing maintenance care plans covering security monitoring, plugin updates, content changes, and 24/7 uptime tracking so your website never lets you down.", features: ["24/7 Monitoring", "CMS Updates", "Content Changes", "Security Scans"], link: "/services/website-maintenance-support-dubai", icon: <HeadphonesIcon className="w-8 h-8" /> },
    ]
  },
  {
    name: "Digital Marketing",
    icon: <Megaphone className="w-5 h-5" />,
    services: [
      { title: "SEO", desc: "Page 1 Google rankings for your most valuable UAE keywords through technical SEO, authority content, local SEO, and strategic link building.", features: ["Technical Audit", "Local SEO (UAE)", "Content Strategy", "Link Building"], link: "/services/seo-agency-dubai-sharjah-uae", icon: <Search className="w-8 h-8" /> },
      { title: "PPC", desc: "Certified Google Ads and Meta Ads management that generates qualified leads at the lowest possible cost per acquisition—with full transparent reporting.", features: ["Google Ads", "Meta Ads", "Landing Pages", "4.2x Avg. ROAS"], link: "/services/ppc-google-ads-agency-dubai", icon: <MousePointerClick className="w-8 h-8" /> },
      { title: "Social Media", desc: "Full-service social media management including strategy, content creation, community management, and paid amplification across Instagram, TikTok, and LinkedIn.", features: ["Content Creation", "Community Mgmt", "Reels & TikTok", "Influencer Campaigns"], link: "/services/social-media-management-dubai-uae", icon: <Share2 className="w-8 h-8" /> },
      { title: "AI", desc: "Intelligent business automation—AI chatbots, workflow automation, LLM integrations, and machine learning solutions that reduce costs and scale your operations.", features: ["GPT-4 Chatbots", "n8n Automation", "LangChain APIs", "Predictive Analytics"], link: "/services/ai-automation-chatbot-dubai", icon: <Bot className="w-8 h-8" /> },
    ]
  },
  {
    name: "Creative",
    icon: <PenTool className="w-5 h-5" />,
    services: [
      { title: "Branding", desc: "Complete brand identity systems—logo design, comprehensive brand guidelines, brand strategy, and the full collateral suite—for UAE businesses ready to lead their category.", features: ["Logo Design", "Brand Guidelines", "Brand Strategy", "Arabic/English"], link: "/services/branding-agency-dubai-sharjah", icon: <Palette className="w-8 h-8" /> },
      { title: "Design", desc: "Strategic graphic design for every medium—marketing collateral, social media templates, pitch decks, ad creatives, infographics, and annual reports.", features: ["Marketing Collateral", "Social Templates", "Pitch Decks", "Ad Creatives"], link: "/services/graphic-design-agency-dubai-sharjah", icon: <Image className="w-8 h-8" /> },
      { title: "UI/UX", desc: "Research-backed user experience design and pixel-perfect interfaces—from UX audit and wireframes to a full Figma design system with developer handoff.", features: ["UX Research", "Wireframing", "Figma Prototypes", "Design Systems"], link: "/services/ui-ux-design-agency-dubai", icon: <Layers className="w-8 h-8" /> },
      { title: "Creative Web Design", desc: "For premium brands that refuse to be ordinary—cinematic storytelling, custom animations, immersive scroll experiences, and digital art that earns industry recognition.", features: ["GSAP Animations", "Three.js / WebGL", "Scroll Storytelling", "Award-Level Quality"], link: "/services/creative-web-design-dubai", icon: <Monitor className="w-8 h-8" /> },
    ]
  }
];

export default function Services() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO
        title="Digital Services Dubai & Sharjah | Web Design, SEO, Branding | Asif Digital"
        description="Comprehensive digital services for UAE businesses—web design, web development, ecommerce, SEO, PPC, social media, AI, branding, graphic design, and UI/UX. Dubai & Sharjah."
      />
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center md:text-left">
        <span className="micro-label block mb-4">What We Offer</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Services</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">13 specialised services across web, digital marketing, and creative—delivering measurable results for businesses in Dubai, Sharjah, and across the UAE since 2020.</p>
      </motion.div>

      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="mb-20">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/5">
            <span className="text-white/40">{cat.icon}</span>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{cat.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cat.services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: i * 0.08 }} className="p-8 border border-white/5 rounded-2xl glass-panel hover:bg-white/5 hover:border-white/20 transition-all duration-500 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-[0.08] transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-6">{service.icon}</div>
                <div className="mb-6 text-white/30 group-hover:text-white/60 transition-colors duration-500">{service.icon}</div>
                <h3 className="text-2xl font-serif mb-3">{service.title}</h3>
                <p className="text-white/50 font-light leading-relaxed mb-6 flex-grow text-sm">{service.desc}</p>
                <ul className="grid grid-cols-2 gap-2 mb-8 text-[10px] text-white/30 uppercase tracking-widest font-semibold">
                  {service.features.map((f, j) => (<li key={j} className="flex items-center gap-1.5"><span className="w-1 h-1 bg-white/30 rounded-full" /> {f}</li>))}
                </ul>
                <Link to={service.link} className="inline-flex items-center justify-between w-full py-4 border-t border-white/10 uppercase tracking-widest text-xs font-semibold hover:text-white/60 transition-colors group-hover:border-white/30">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 p-14 border border-white/5 rounded-2xl text-center bg-white/[0.02]">
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Not sure which service you need?</h2>
        <p className="text-white/50 font-light mb-8">Book a free 30-minute consultation and we'll map out the right strategy for your specific goals.</p>
        <Link to="/contact" className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Book Free Consultation <ArrowRight className="w-4 h-4" /></Link>
      </motion.div>
    </div>
  );
}
