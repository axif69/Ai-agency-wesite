import { motion } from "motion/react";
import SEO from "../components/SEO";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Scaling a Dubai Real Estate Firm with AI & Meta Ads",
    client: "Luxury Properties Dubai",
    challenge: "The client was struggling to generate high-quality leads in a highly competitive market.",
    solution: "Implemented a comprehensive Meta Ads strategy powered by AI audience targeting, coupled with a high-converting landing page.",
    results: ["300% Increase in Qualified Leads", "45% Reduction in Cost Per Acquisition", "12 High-Value Properties Sold in 3 Months"],
    img: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Revamping an E-Commerce Platform for a UAE Retailer",
    client: "TechGadgets UAE",
    challenge: "The existing website was slow, unresponsive on mobile, and had a high cart abandonment rate.",
    solution: "Rebuilt the platform using Next.js and integrated an AI-driven product recommendation engine.",
    results: ["2.5s Faster Page Load Time", "60% Increase in Mobile Conversions", "25% Boost in Average Order Value"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Dominating Local Search with AEO & Technical SEO",
    client: "Sharjah Auto Services",
    challenge: "The local auto repair shop was invisible on Google Maps and AI search engines.",
    solution: "Executed a comprehensive Technical SEO audit, optimized Google Business Profile, and implemented AEO strategies.",
    results: ["Ranked #1 for 'Auto Repair Sharjah'", "150% Increase in Organic Traffic", "40% More Phone Calls from Google"],
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=90&w=2560&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "AI-Driven SaaS Transformation for a Logistics Giant",
    client: "Global Logistics UAE",
    challenge: "Manual tracking and inefficient routing were causing significant delays and high operational costs.",
    solution: "Developed a custom SaaS platform with AI-powered route optimization and real-time predictive tracking.",
    results: ["30% Reduction in Fuel Costs", "99.9% On-Time Delivery Rate", "Automated 80% of Dispatching Tasks"],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=90&w=2560&auto=format&fit=crop"
  }
];

export default function CaseStudies() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Case Studies" 
        description="Read detailed case studies of how Asif Khan has helped businesses in the UAE achieve their digital goals through AI, web development, and marketing."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 text-center md:text-left"
      >
        <span className="micro-label block mb-4">Success Stories</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Case Studies</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          In-depth looks at how I've solved complex digital challenges for businesses across the UAE.
        </p>
      </motion.div>

      <div className="space-y-40">
        {caseStudies.map((study, i) => (
          <motion.div 
            key={study.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
          >
            <div className="w-full md:w-1/2">
              <div className="parallax-container rounded-3xl aspect-[4/5]">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  src={study.img} 
                  alt={study.title}
                  className="parallax-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-10">
              <div>
                <span className="micro-label block mb-4">Client: {study.client}</span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 leading-tight">{study.title}</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-3">The Challenge</h3>
                  <p className="text-white/70 font-light leading-relaxed">{study.challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-3">The Solution</h3>
                  <p className="text-white/70 font-light leading-relaxed">{study.solution}</p>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-6">The Results</h3>
                  <ul className="space-y-4">
                    {study.results.map((result, j) => (
                      <li key={j} className="flex items-start gap-4 text-white/90 font-light">
                        <ArrowRight className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                        <span className="text-lg">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
