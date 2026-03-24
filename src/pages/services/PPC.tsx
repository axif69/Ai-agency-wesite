import SEO from "../../components/SEO";
import { motion } from "motion/react";
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
  return (
    <div className="pt-20">
      <SEO
        title="PPC Agency Dubai | Google Ads & Meta Ads Management | Asif Digital"
        description="Expert PPC management in Dubai and UAE. Certified Google Ads and Meta Ads specialists who generate qualified leads and sales with measurable, transparent ROI."
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
    </div>
  );
}
