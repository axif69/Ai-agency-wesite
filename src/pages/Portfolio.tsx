import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ExternalLink, ArrowRight } from "lucide-react";

const categories = ["All", "Web Design", "Ecommerce", "SEO", "PPC", "Social Media", "Branding", "UI/UX", "AI", "Creative"];

const portfolioItems = [
  { id: 1, title: "Zenith Properties — Luxury Real Estate Website", category: "Web Design", location: "Dubai, UAE", desc: "A premium real estate website for a Dubai luxury developer featuring immersive property galleries, bilingual Arabic/English toggle, lead capture flows, and full Local SEO optimization. Ranked #1 on Google in 11 weeks.", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 2, title: "TechGadgets UAE — Headless Ecommerce Platform", category: "Ecommerce", location: "Sharjah, UAE", desc: "2,400-SKU headless ecommerce store built on Next.js + Shopify with Telr payment gateway, product schema for every listing, and an AI-powered recommendation engine. Revenue increased 340% in 6 months.", img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 3, title: "Gulf Logistics — AI WhatsApp Automation System", category: "AI", location: "Dubai, UAE", desc: "n8n-powered AI automation ecosystem including a GPT-4 WhatsApp bot for 24/7 shipment tracking, automated dispatch notifications, and an email triage system. Saved 2,400 employee hours per month.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 4, title: "AutoElite Sharjah — Google Ads Overhaul", category: "PPC", location: "Sharjah, UAE", desc: "Complete Google Ads account rebuild with 1,200 negative keywords, 6 custom landing pages, and smart bidding. Cost-per-lead reduced from AED 420 to AED 67 in 60 days.", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 5, title: "Aurum Café — Brand Identity & Social Media", category: "Branding", location: "Sharjah, UAE", desc: "Complete brand identity from scratch—logo, typography, colour palette, packaging—plus a 12-month social media strategy that grew Instagram from 800 to 28,000 followers and 5x Saturday revenue.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 6, title: "Meza Health — SaaS UI/UX Redesign", category: "UI/UX", location: "Dubai, UAE", desc: "Complete telemedicine SaaS redesign in Figma based on 12 user interviews and heatmap analysis. Trial-to-paid conversion rate increased from 11% to 34% and NPS improved from 28 to 67.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 7, title: "Sharjah Auto Services — Local SEO Domination", category: "SEO", location: "Sharjah, UAE", desc: "Technical SEO audit + Google Business Profile optimization + AEO strategy. Ranked #1 in Google Maps 'auto repair Sharjah' within 8 weeks. 150% organic traffic increase and 40% more phone calls.", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 8, title: "Noor Fashion — Instagram & TikTok Growth", category: "Social Media", location: "Dubai, UAE", desc: "12-month social media strategy for a modest fashion brand. Content calendar, 24 Reels/month, 6 influencer partnerships. Grew from 1,200 to 41,000 followers and drove AED 280K in social-attributable revenue.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 9, title: "Vertex Consulting — Corporate Website Redesign", category: "Creative", location: "Abu Dhabi, UAE", desc: "Award-level creative web design for a management consultancy—cinematic hero with GSAP text animations, scroll-triggered case study reveals, and a custom Three.js particle background. Built in 5 weeks.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 10, title: "PrimeEats — Food Delivery Ecommerce + SEO", category: "Ecommerce", location: "Dubai, UAE", desc: "Custom Next.js food delivery platform with real-time order tracking, restaurant management dashboard, and an SEO strategy targeting 'food delivery Dubai' that reached page 1 in 14 weeks.", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 11, title: "Atlas Investment Group — Brand Identity", category: "Branding", location: "Dubai, UAE", desc: "Premium brand identity for a Dubai private equity firm. Logo mark, 72-page brand guidelines, pitch deck template, and bilingual English/Arabic stationery suite. Completed in 4 weeks.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=90&w=2560&auto=format&fit=crop", link: "#" },
  { id: 12, title: "HealthFirst Clinic — Google Ads + Landing Page", category: "PPC", location: "Sharjah, UAE", desc: "Healthcare Google Ads campaign with 4 specialty-specific landing pages. Cost-per-booked-appointment reduced from AED 210 to AED 58, generating 320+ new patient appointments per month.", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=90&w=2560&auto=format&fit=crop", link: "#" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO
        title="Portfolio | Web Design, SEO & Digital Marketing Projects | Asif Digital Dubai"
        description="Browse our portfolio of web design, ecommerce, SEO, PPC, social media, branding, UI/UX, and AI projects for businesses in Dubai, Sharjah, and across the UAE."
      />

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center md:text-left">
        <span className="micro-label block mb-4">Selected Works</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Portfolio</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          12 selected projects across web design, ecommerce, SEO, PPC, social media, branding, UI/UX, and AI—for businesses throughout Dubai, Sharjah, and the UAE.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeFilter === cat ? "bg-white text-black" : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white/80"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 border border-white/5">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <a href={item.link} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-2xl font-serif tracking-tight leading-tight">{item.title}</h3>
                  <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-white/40 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">{item.category}</span>
                </div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">{item.location}</p>
                <p className="text-white/55 font-light leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-28 p-14 border border-white/5 rounded-2xl text-center bg-white/[0.02]">
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Liked What You Saw?</h2>
        <p className="text-white/50 font-light mb-8">Let's create something remarkable for your business. Free consultation, no obligation.</p>
        <Link to="/contact" className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
          Start A Project <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
