import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, Target, DollarSign, BarChart3, Layers, CheckCircle, TrendingUp } from "lucide-react";

const features = [
  { icon: <Target className="w-6 h-6" />, title: "Google Ads (Search, Display & PMax)", desc: "Our certified Google Ads specialists design and manage campaigns at every stage of your funnel. Search campaigns capture high-intent buyers, Display campaigns build retargeted awareness, and Performance Max campaigns leverage Google's AI to find your highest-converting audiences automatically." },
  { icon: <Layers className="w-6 h-6" />, title: "Meta Ads (Facebook & Instagram)", desc: "We create data-driven Meta campaigns that precisely target your ideal customers across Dubai and Sharjah using demographic, interest, behavioral, and lookalike audience targeting. Our creative team produces thumb-stopping ad visuals and copy that demand attention in a crowded feed." },
  { icon: <DollarSign className="w-6 h-6" />, title: "Landing Page Design & Optimization", desc: "A great ad is only half the equation. We design and optimize dedicated landing pages with persuasive copy, clear value propositions, and frictionless conversion paths. Our landing pages consistently achieve 8-15% conversion rates—far above the industry average of 2-3%." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Bid Strategy & Budget Management", desc: "We use advanced automated bidding strategies (ROAS, CPA, Maximize Conversions) calibrated against your specific business economics. Your budget is allocated dynamically to the campaigns, ad groups, and keywords generating the lowest cost per acquisition." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Conversion Tracking Setup", desc: "You can't manage what you can't measure. We implement server-side conversion tracking via Google Tag Manager, Meta Pixel, and Google Analytics 4—capturing every form fill, phone call, WhatsApp click, and purchase to give you bulletproof attribution data." },
  { icon: <Target className="w-6 h-6" />, title: "Retargeting & Audience Sequencing", desc: "We build sophisticated retargeting sequences that re-engage your website visitors with tailored ads based on which pages they visited and how far through the funnel they progressed—turning warm leads into closed deals." },
];

export default function PPC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Which platform is best for my UAE business?",
      a: "It depends on your audience. For B2B, Google Search and LinkedIn typically yield the best enterprise leads. For B2C and retail, Meta (Instagram/Facebook) and TikTok are the drivers of volume in the UAE market."
    },
    {
      q: "What is the recommended minimum ad spend?",
      a: "For the competitive Dubai and Abu Dhabi markets, we typically recommend a minimum starting budget of AED 5,000 per month per platform to ensure enough data is generated for our AI optimization to take effect."
    },
    {
      q: "How soon will I see results from PPC?",
      a: "PPC is immediate traffic. While we see clicks instantly, the first 14 days are the 'learning phase.' You can expect stabilized ROI and performance scaling after the first month of continuous optimization."
    },
    {
      q: "What is your management fee?",
      a: "Our management fee is typically 15–20% of your monthly ad spend (minimum AED 1,500/month). This covers full campaign management, creative production, landing page optimization, and reporting."
    }
  ];

  return (
    <div ref={containerRef} className="pt-20">
      <SEO
        title="PPC Agency Dubai | Google Ads & Meta Ads Management | Asif Digital"
        description="Expert PPC management in Dubai and UAE. Certified Google Ads and Meta Ads specialists who generate qualified leads and sales with measurable, transparent ROI."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "PPC & Paid Advertising Management",
          "provider": { "@type": "LocalBusiness", "@id": "https://asifdigital.agency" },
          "areaServed": [{ "@type": "City", "name": "Dubai" }, { "@type": "City", "name": "Sharjah" }],
          "description": "Google Ads and Meta Ads management for UAE businesses with transparent ROI reporting and certified specialists."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Pay-Per-Click Advertising — Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            Every Dirham.<br /><span className="italic text-white/90">Maximum Return.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-2xl mb-12">
            Poorly managed PPC campaigns silently drain your budget on irrelevant clicks. Our certified Google and Meta Ads specialists build precision campaigns that send the right message to the right person at exactly the right moment—generating qualified leads, not just clicks.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" aria-label="Get A Free PPC Audit and Start Your PPC Management Project" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get A Free PPC Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.h2 style={{ y, opacity }} className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Precision <span className="italic">Amplified</span>
          </motion.h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Performance Focused PPC and Google Ads Management Dubai" 
          className="sr-only"
          loading="lazy"
        />
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "4.2x", l: "Avg. Return on Ad Spend" }, { n: "40%", l: "Avg Cost-Per-Lead Reduction" }, { n: "72hr", l: "Campaign Go-Live Time" }, { n: "100%", l: "Transparent Reporting" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-serif mb-2">{s.n}</div>
              <div className="text-white/95 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">What We Manage</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Full-Funnel Paid Advertising That Converts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/95 mb-5" role="img" aria-label={`${f.title} Icon`}>{f.icon}</div>
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-white/95 font-light leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Your Monthly PPC Management Includes</h2>
            <ul className="space-y-4">
              {["Full campaign structure setup and optimization", "Weekly bid adjustments and negative keyword review", "Ad copy split testing (minimum 3 variants per ad group)", "Audience segmentation and lookalike creation", "Landing page creation and A/B testing", "Phone call & conversion tracking implementation", "Monthly ROI & analytics report", "Direct WhatsApp access to your account manager"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/95 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/90 flex-shrink-0 mt-0.5" role="img" aria-label="Feature Included" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Stop Wasting Ad Spend</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">Most businesses waste 40-60% of their PPC budget on poorly targeted keywords, weak ad copy, and unoptimized landing pages. A free 30-minute audit call reveals exactly where your budget is leaking and how to fix it.</p>
            <Link to="/contact" aria-label="Book Your Free PPC Audit Call with Asif Digital" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book Free Audit Call <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40 font-bold tracking-[0.3em] uppercase">Common Inquiries</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">PPC Performance FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-white/70 transition-colors">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/70 font-light leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Synergy Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "SEO Strategy", link: "/services/seo-aeo-specialist-dubai", desc: "Balance instant PPC traffic with long-term organic growth." },
              { title: "Digital Marketing", link: "/services/digital-marketing-agency-dubai-sharjah", desc: "Multi-channel marketing strategies for maximum UAE brand reach." },
              { title: "Social Media", link: "/services/social-media-management-uae", desc: "Build high-engagement communities to lower your retargeting costs." }
            ].map((s, i) => (
              <Link key={i} to={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <h3 className="text-xl font-serif mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-6">{s.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white">Explore Solution</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
