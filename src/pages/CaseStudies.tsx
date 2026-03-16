import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    service: "Web Design + SEO",
    client: "Zenith Properties Dubai",
    industry: "Real Estate",
    title: "How a New Website & SEO Strategy Generated AED 4.2M in Property Sales in 90 Days",
    challenge: "Zenith Properties had an outdated 2018 website that ranked on page 4 of Google for their core keywords, had no mobile experience, and a 78% bounce rate. Their competitors were capturing leads they should have been winning.",
    solution: "We redesigned the entire website in 5 weeks—creating dedicated landing pages for each property project with full SEO optimization (title tags, schema markup, Core Web Vitals). We simultaneously executed a Local SEO campaign targeting 'luxury apartments Dubai' and 'off-plan properties Dubai Marina'.",
    results: ["Ranked #1 for 'luxury apartments Dubai' in 11 weeks", "Bounce rate reduced from 78% to 34%", "312% increase in qualified organic leads", "AED 4.2M in attributable property sales within 90 days"],
    tags: ["Web Design", "SEO", "Local SEO"],
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 2,
    service: "Ecommerce + PPC",
    client: "TechGadgets UAE",
    industry: "E-Commerce / Retail",
    title: "Rebuilding an Ecommerce Platform That Increased Revenue by 340% in 6 Months",
    challenge: "The existing WooCommerce store had a 4.1-second mobile load time, a broken checkout flow on iOS, and a cost-per-acquisition of AED 87 on Google Shopping. Revenue growth had stalled for 14 months.",
    solution: "We migrated the store to a headless Next.js + Shopify architecture, redesigned the product pages with conversion CRO best practices, implemented structured data for all 2,400 SKUs, and rebuilt Google Shopping campaigns with smart bidding strategies and negative keyword sculpting.",
    results: ["Page load time reduced from 4.1s to 1.4s", "Mobile conversion rate up 187%", "Cost-per-acquisition reduced from AED 87 to AED 31", "Monthly revenue increased 340% from AED 145K to AED 636K"],
    tags: ["Ecommerce", "PPC", "Web Development"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 3,
    service: "Social Media + Branding",
    client: "Aurum Café — Sharjah",
    industry: "Food & Beverage",
    title: "How a Sharjah Café Grew from 800 to 28,000 Instagram Followers and 5x Revenue in 12 Months",
    challenge: "Aurum Café opened with a generic visual identity and no social media strategy. Despite excellent food quality, they were invisible online and relying entirely on walk-in traffic in a highly competitive location.",
    solution: "We created a complete brand identity from scratch—logo, typography, colour system, packaging design. We then executed a content strategy anchored on Reels showing the café's preparation process and ambiance, collaborated with 8 UAE micro-influencers, and ran targeted Instagram ads for a 5km radius of the café.",
    results: ["Instagram: 800 → 28,000 followers in 12 months", "Average post reach increased from 200 to 14,000", "Saturday revenue increased 5x versus pre-campaign", "Featured in 3 UAE food publications and Time Out Dubai"],
    tags: ["Social Media", "Branding", "Graphic Design"],
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 4,
    service: "AI Automation",
    client: "Gulf Logistics FZCO",
    industry: "Logistics & Supply Chain",
    title: "AI Automation That Saved 2,400 Employee Hours Per Month and Cut Operational Costs by 38%",
    challenge: "Gulf Logistics employed 8 full-time staff for manual data entry, route dispatch communication, and client shipment status updates via email and WhatsApp. Errors were frequent and client satisfaction scores were falling.",
    solution: "We built an n8n-powered automation ecosystem: an AI chatbot on WhatsApp that handled 90% of client shipment queries using real-time data from their WMS, automated route dispatch notifications via email and WhatsApp, and a GPT-4-powered email triage system that categorised and drafted responses for all incoming inquiries.",
    results: ["2,400 manual employee hours saved monthly", "Operational cost reduction of 38%", "Client query response time from 4 hours to under 2 minutes", "Customer satisfaction score improved from 6.2 to 9.1 / 10"],
    tags: ["AI Automation", "Chatbot Development", "Process Automation"],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 5,
    service: "UI/UX Design",
    client: "Meza Health — Dubai",
    industry: "HealthTech / SaaS",
    title: "UI/UX Redesign That Increased SaaS Trial-to-Paid Conversion by 210%",
    challenge: "Meza Health had built a solid telemedicine SaaS product but their onboarding flow confused new users—only 11% of free trial users were converting to paid plans within 30 days. Churn rates were high and support tickets were averaging 140/week.",
    solution: "We conducted 12 user interviews, analyzed 3 months of session recordings and heatmaps, and identified 7 critical friction points in the onboarding flow. We redesigned the entire in-app experience from the ground up in Figma, built a new onboarding wizard, and created a comprehensive component design system that the development team could scale.",
    results: ["Trial-to-paid conversion rate increased from 11% to 34% (+210%)", "Support tickets reduced from 140/week to 41/week (71% reduction)", "Net Promoter Score improved from 28 to 67", "Time-to-first-value in onboarding reduced from 17 minutes to 4 minutes"],
    tags: ["UI/UX Design", "SaaS", "User Research"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 6,
    service: "PPC + Landing Page",
    client: "AutoElite — Sharjah",
    industry: "Automotive",
    title: "Google Ads Overhaul That Reduced Cost Per Lead from AED 420 to AED 67",
    challenge: "AutoElite was spending AED 35,000/month on Google Ads with a cost-per-lead of AED 420. Their campaigns had no negative keyword list, twelve ad groups all going to the homepage, and zero conversion tracking implemented.",
    solution: "We rebuilt the entire account structure with tightly themed ad groups, created 6 dedicated landing pages for different car models, implemented server-side conversion tracking, set up smart bidding campaigns with 90-day conversion data windows, and added 1,200 negative keywords.",
    results: ["Cost-per-lead reduced from AED 420 to AED 67 (84% reduction)", "Monthly leads increased from 83 to 410", "Ad spend maintained at AED 35,000/month", "Test drive bookings increased 5x within 60 days"],
    tags: ["PPC", "Google Ads", "Landing Page Design"],
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=90&w=2560&auto=format&fit=crop"
  },
];

export default function CaseStudies() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO
        title="Case Studies | Digital Marketing & Web Design Results | Asif Digital Dubai"
        description="Real results for real UAE businesses. Read detailed case studies showing how Asif Digital delivered measurable ROI through web design, SEO, PPC, social media, and AI automation in Dubai and Sharjah."
      />

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center md:text-left">
        <span className="micro-label block mb-4">Proven Results</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Case Studies</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Six detailed case studies from real Dubai and Sharjah businesses—with real numbers, real challenges, and the strategies that produced extraordinary outcomes.
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {[{ n: "150+", l: "UAE Clients Served" }, { n: "340%", l: "Avg Revenue Growth" }, { n: "84%", l: "Avg CPA Reduction (PPC)" }, { n: "87%", l: "Clients on Page 1 Google" }].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/5 rounded-2xl text-center">
            <div className="text-3xl font-serif mb-2">{s.n}</div>
            <div className="text-white/40 text-xs uppercase tracking-widest">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-36">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-start`}
          >
            {/* Image */}
            <div className="w-full md:w-[45%] flex-shrink-0">
              <div className="rounded-2xl aspect-[4/5] overflow-hidden border border-white/5">
                <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} src={study.img} alt={study.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-[55%] space-y-8 pt-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {study.tags.map((tag, j) => <span key={j} className="text-[10px] font-bold uppercase tracking-widest border border-white/15 text-white/50 px-3 py-1.5 rounded-full">{tag}</span>)}
                </div>
                <span className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase block mb-3">{study.industry} — {study.client}</span>
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight mb-0">{study.title}</h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-3">The Challenge</h3>
                  <p className="text-white/60 font-light leading-relaxed text-sm">{study.challenge}</p>
                </div>
                <div className="p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-3">Our Solution</h3>
                  <p className="text-white/60 font-light leading-relaxed text-sm">{study.solution}</p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-5">The Results</h3>
                <ul className="space-y-3">
                  {study.results.map((result, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                      <span className="text-white/80 font-light">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-36 p-14 border border-white/5 rounded-2xl text-center bg-white/[0.02]">
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Your Business Could Be Our Next Case Study.</h2>
        <p className="text-white/50 font-light mb-8 max-w-xl mx-auto">Book a free strategy session and we'll identify the highest-impact opportunities in your specific business.</p>
        <Link to="/contact" className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Book Free Strategy Session <ArrowRight className="w-4 h-4" /></Link>
      </motion.div>
    </div>
  );
}
