import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import HeroParticles from "../components/HeroParticles";
import SocialPostGenerator from "../components/SocialPostGenerator";
import { ArrowRight, Code, Megaphone, PenTool, Star, Monitor, ShoppingCart, Server, HeadphonesIcon, Search, MousePointerClick, Share2, Bot, Palette, Image, Layers, TrendingUp, CheckCircle } from "lucide-react";

/* ─────────────── DATA ─────────────── */

const serviceCategories = [
  {
    name: "Web",
    icon: <Code className="w-4 h-4" />,
    items: [
      { title: "Web Design", link: "/services/web-design-dubai-sharjah", icon: <Monitor className="w-5 h-5" /> },
      { title: "Web Development", link: "/services/web-development-dubai-uae", icon: <Code className="w-5 h-5" /> },
      { title: "Ecommerce", link: "/services/ecommerce-website-development-dubai", icon: <ShoppingCart className="w-5 h-5" /> },
      { title: "Web Hosting", link: "/services/web-hosting-uae", icon: <Server className="w-5 h-5" /> },
      { title: "Website Support", link: "/services/website-maintenance-support-dubai", icon: <HeadphonesIcon className="w-5 h-5" /> },
    ]
  },
  {
    name: "Digital Marketing",
    icon: <Megaphone className="w-4 h-4" />,
    items: [
      { title: "SEO", link: "/services/seo-agency-dubai-sharjah-uae", icon: <Search className="w-5 h-5" /> },
      { title: "PPC", link: "/services/ppc-google-ads-agency-dubai", icon: <MousePointerClick className="w-5 h-5" /> },
      { title: "Social Media", link: "/services/social-media-management-dubai-uae", icon: <Share2 className="w-5 h-5" /> },
      { title: "AI & Automation", link: "/services/ai-automation-chatbot-dubai", icon: <Bot className="w-5 h-5" /> },
    ]
  },
  {
    name: "Creative",
    icon: <PenTool className="w-4 h-4" />,
    items: [
      { title: "Branding", link: "/services/branding-agency-dubai-sharjah", icon: <Palette className="w-5 h-5" /> },
      { title: "Graphic Design", link: "/services/graphic-design-agency-dubai-sharjah", icon: <Image className="w-5 h-5" /> },
      { title: "UI/UX Design", link: "/services/ui-ux-design-agency-dubai", icon: <Layers className="w-5 h-5" /> },
      { title: "Creative Web Design", link: "/services/creative-web-design-dubai", icon: <Monitor className="w-5 h-5" /> },
    ]
  }
];

const caseStudyPreviews = [
  {
    tag: "Web Design + SEO",
    client: "Zenith Properties Dubai",
    title: "AED 4.2M in Property Sales in 90 Days",
    stat: "312% increase in qualified organic leads",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=90&w=2560&auto=format&fit=crop"
  },
  {
    tag: "Ecommerce + PPC",
    client: "TechGadgets UAE",
    title: "Monthly Revenue Increased 340% in 6 Months",
    stat: "Mobile conversion rate up 187%",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=90&w=2560&auto=format&fit=crop"
  },
  {
    tag: "Social Media + Branding",
    client: "Aurum Café, Sharjah",
    title: "800 to 28,000 Instagram Followers in 12 Months",
    stat: "5× Saturday revenue increase",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=90&w=2560&auto=format&fit=crop"
  },
];

const testimonials = [
  { name: "Dr. Aisha A.", role: "Clinic Director, Sharjah", text: "Asif Digital's SEO strategy took our clinic from invisible to Page 1 for our most important keywords in under 3 months. Qualified appointments have doubled." },
  { name: "Omar K.", role: "Restaurant Owner, Dubai", text: "The WhatsApp AI chatbot they built handles 90% of our customer inquiries automatically. Our team now focuses entirely on serving guests instead of answering the same questions." },
  { name: "Fatima S.", role: "Fashion Boutique, Ajman", text: "Our Instagram engagement tripled and our social-attributable sales are AED 40K per month now. The content quality is extraordinary." },
  { name: "Rashed M.", role: "Real Estate Developer, Dubai", text: "We tried 3 agencies before Asif Digital. Nobody else understood the premium Dubai property market like they do. The website they delivered is truly world-class." },
  { name: "Sara H.", role: "CEO, Tech Startup UAE", text: "The UI/UX redesign increased our SaaS trial-to-paid conversion from 11% to 34%. That single project paid for an entire year of their fees within 60 days." },
  { name: "Ahmed T.", role: "GM, Logistics FZCO Dubai", text: "2,400 hours per month saved. That's what the AI automation they built achieved for us. The ROI is simply staggering." },
];

const differentiators = [
  { title: "Full-Service Under One Roof", desc: "Web, marketing, creative, and AI—all from one team. No coordination gaps, no finger-pointing between vendors. One strategy, one voice, one accountable partner." },
  { title: "UAE Market Specialists", desc: "We live and work in the UAE market. We understand Ramadan campaigns, Arabic bilingual content, Telr and PayFort payment gateways, and what actually converts a UAE audience." },
  { title: "Data-Driven, Never Guesswork", desc: "Every decision is backed by analytics, heat maps, A/B test results, and conversion data. We optimize towards revenue outcomes—not vanity metrics." },
  { title: "Transparent Reporting", desc: "You get full access to your dashboards, monthly reporting calls, and clear attribution of every dirham spent to business outcomes. No black boxes." },
  { title: "5-Year Track Record", desc: "Over 150 UAE businesses served since 2020. We have documented proof of results across real estate, F&B, healthcare, retail, logistics, and tech." },
  { title: "Senior Team on Your Account", desc: "Your work is handled by senior specialists—not junior account managers. The person who pitches you is the person who builds your strategy." },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Asif Digital — Web Design & Digital Marketing Agency Dubai",
    "@id": "https://asifdigital.agency",
    "url": "https://asifdigital.agency",
    "telephone": "+971545866094",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh, Ind area, Maliha Rd",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 25.3463, "longitude": 55.4209 },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00", "closes": "18:00"
    },
    "priceRange": "$$",
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "City", "name": "Abu Dhabi" }
    ]
  };

  return (
    <div ref={containerRef} className="relative bg-[#050505]">
      <SEO
        title="Web Design & Digital Marketing Agency Dubai & Sharjah | Asif Digital"
        description="Asif Digital is a full-service digital agency in Dubai and Sharjah offering web design, SEO, PPC, social media, branding, UI/UX, and AI automation for UAE businesses. 150+ clients. Proven results."
        keywords="web design agency Dubai, digital marketing agency Sharjah, SEO agency UAE, PPC Google Ads Dubai, social media management Dubai, branding agency UAE"
        schema={localBusinessSchema}
      />

      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 sm:pt-0">
        <motion.div style={{ y, opacity }} className="text-center z-10 flex flex-col items-center -mt-20 md:-mt-32">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="micro-label mb-4 text-white/40">
            Full-Service Digital Agency — Dubai & Sharjah, UAE
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight mb-6 max-w-6xl mx-auto">
            We Build Brands That <span className="italic text-white/40">Dominate</span><br />the UAE Market.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="text-lg md:text-xl lg:text-2xl text-white/60 font-light max-w-4xl mx-auto font-sans leading-relaxed mb-8">
            Web design, development, ecommerce, SEO, PPC, social media, AI automation, branding, and UI/UX—all under one roof. Trusted by 150+ UAE businesses since 2020.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
            <Link to="/contact" className="btn-premium btn-primary flex justify-center items-center gap-3 w-full sm:w-auto">
              Book Free Strategy Session <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-premium btn-secondary flex justify-center items-center gap-3 w-full sm:w-auto">
              View All 13 Services
            </Link>
          </motion.div>
        </motion.div>
        <HeroParticles />
      </section>

      {/* ── Key Stats ── */}
      <section className="py-12 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { label: "UAE Clients Served", value: "150+" },
            { label: "Services Offered", value: "13" },
            { label: "Years in the UAE Market", value: "5+" },
            { label: "Avg. Client ROI Growth", value: "3.7×" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{stat.value}</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About / Agency Intro ── */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="micro-label block mb-8">The Agency</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.1] mb-10">
              Dubai's Most<br /><span className="italic text-white/40">Complete Digital Partner.</span>
            </h2>
            <div className="space-y-6 text-white/60 font-light text-xl leading-relaxed">
              <p>Asif Digital is a full-service digital agency based in Sharjah and serving businesses across Dubai, Abu Dhabi, and the wider UAE. We cover every pillar of your digital presence—from your website and online store to your Google rankings, paid ads, social media, branding, and AI automation.</p>
              <p>Unlike generalist freelancers or single-service agencies, we deploy specialist teams for each discipline—with a single, unified strategy designed to drive compounding growth. Everything working together, not in silos.</p>
            </div>
            <div className="mt-10">
              <Link to="/about" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:text-white/60 transition-colors">
                About the Agency <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=90&w=2560&auto=format&fit=crop" alt="Asif Digital Agency Office Dubai" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
              <div className="text-3xl font-serif italic text-white mb-2">"Results, not promises."</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Asif Khan &mdash; Founder & CEO</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Client Marquee ── */}
      <section className="py-16 bg-[#0a0a0a] overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 text-center mb-10">
          <h2 className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-white/30">Trusted by UAE Businesses Across Industries</h2>
        </div>
        <div className="flex whitespace-nowrap relative">
          <motion.div className="flex gap-16 px-8 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 25, repeat: Infinity }}>
            {[
              "Real Estate", "E-Commerce", "Healthcare", "Hospitality", "Logistics", "Finance",
              "F&B Brands", "Fashion", "Architecture", "Education", "Tech Startups", "Automotive",
              "Real Estate", "E-Commerce", "Healthcare", "Hospitality", "Logistics", "Finance",
              "F&B Brands", "Fashion", "Architecture", "Education", "Tech Startups", "Automotive",
            ].map((client, i) => (
              <div key={i} className="text-2xl md:text-3xl font-serif font-bold text-white/30 hover:text-white/70 transition-colors cursor-default">{client}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 13 Services Overview ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="micro-label block mb-4">What We Do</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight">13 Services.<br /><span className="italic text-white/40">One Agency.</span></h2>
          </div>
          <p className="text-white/60 max-w-md text-lg font-light">Every digital discipline your business needs—strategy, execution, and optimization—delivered by specialist teams.</p>
        </motion.div>

        <div className="space-y-10">
          {serviceCategories.map((cat, catIdx) => (
            <motion.div key={catIdx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIdx * 0.1 }}>
              <div className="flex items-center gap-2 mb-5 text-white/30">
                {cat.icon}
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{cat.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {cat.items.map((item, i) => (
                  <Link key={i} to={item.link} className="flex items-center gap-3 p-4 border border-white/5 rounded-xl hover:border-white/25 hover:bg-white/5 transition-all duration-300 group">
                    <span className="text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{item.title}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:text-white/60 transition-colors">
            Explore All Services in Detail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20 max-w-3xl">
            <span className="micro-label block mb-4">Why Asif Digital</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight">What Makes Us<br /><span className="italic text-white/40">Different.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-8 border border-white/5 rounded-2xl glass-panel hover:border-white/15 transition-colors">
                <CheckCircle className="w-5 h-5 text-white/30 mb-5" />
                <h3 className="text-xl font-serif mb-3">{d.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology Stack Marquee ── */}
      <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap relative">
          <motion.div className="flex gap-20 px-10 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>
            {[
              "React", "Next.js", "Shopify", "WordPress", "Figma", "GSAP", "Framer", "Three.js",
              "Google Ads", "Meta Ads", "HubSpot", "n8n", "GPT-4", "LangChain", "AWS", "Vercel",
              "React", "Next.js", "Shopify", "WordPress", "Figma", "GSAP", "Framer", "Three.js",
              "Google Ads", "Meta Ads", "HubSpot", "n8n", "GPT-4", "LangChain", "AWS", "Vercel",
            ].map((tech, i) => (
              <div key={i} className="text-4xl md:text-6xl font-serif font-black text-white/20 hover:text-white/60 transition-colors cursor-default uppercase tracking-tighter">{tech}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Case Study Previews ── */}
      <section className="py-40 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
            <div>
              <span className="micro-label block mb-6">Proven Results</span>
              <h2 className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9]">
                Real Results.<br /><span className="italic text-white/40">Real Numbers.</span>
              </h2>
            </div>
            <Link to="/case-studies" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-black hover:text-white/60 transition-all duration-500 group flex-shrink-0">
              All Case Studies <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudyPreviews.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.12, duration: 0.8 }} className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-6 border border-white/5">
                  <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }} src={cs.img} alt={cs.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-all duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest">{cs.tag}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                      <TrendingUp className="w-3 h-3" /> {cs.stat}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{cs.client}</p>
                  <h3 className="text-2xl font-serif tracking-tight leading-tight">{cs.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20 text-center">
            <span className="micro-label block mb-4">Client Voices</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08 }} className="p-8 border border-white/5 rounded-2xl glass-panel flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-white/60 text-white/60" />)}
                </div>
                <p className="text-white/65 font-light italic text-base leading-relaxed mb-6 flex-grow">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <span className="text-[10px] text-white/35 uppercase tracking-widest">{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Social Post Generator (Interactive Tool) ── */}
      <SocialPostGenerator />

      {/* ── Final CTA ── */}
      <section className="py-60 px-6 md:px-12 bg-white text-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#eeeeee_0%,_#ffffff_100%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl md:text-[10rem] font-serif tracking-tighter leading-[0.8] mb-20">
            Ready to<br /><span className="italic opacity-30">Grow?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
            <p className="text-black/60 text-xl font-light max-w-xl mx-auto">Book a free 30-minute strategy session. We'll audit your current digital presence and show you exactly where the biggest growth opportunities are.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contact" className="btn-premium btn-primary inline-flex items-center gap-2 justify-center">
                Book Free Strategy Session <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-premium btn-secondary inline-flex items-center gap-2 justify-center !text-black !border-black/30 hover:!border-black">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
