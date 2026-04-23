import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

import { CASE_STUDIES } from "../data/caseStudyData";

export default function CaseStudies() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO
        title="Case Studies | Digital Marketing & Web Design Results | Asif Digital Dubai"
        description="Real results for real UAE businesses. Read detailed case studies showing how Asif Digital delivered measurable ROI through web design, SEO, PPC, social media, and AI automation in Dubai and Sharjah."
      />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-24 text-center md:text-left">
        <span className="micro-label block mb-4">Proven Results</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Case Studies</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Detailed technical case studies from real Dubai and Sharjah businesses—with real numbers, real challenges, and the sovereign strategies that produced extraordinary outcomes.
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {[{ n: "150+", l: "UAE Clients Served" }, { n: "340%", l: "Avg Revenue Growth" }, { n: "84%", l: "Avg CPA Reduction (PPC)" }, { n: "87%", l: "Clients on Page 1 Google" }].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/5 rounded-2xl text-center">
            <div className="text-3xl font-serif mb-2">{s.n}</div>
            <div className="text-white/70 text-xs uppercase tracking-widest">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-36">
        {CASE_STUDIES.map((study, i) => (
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
                <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} src={study.img} alt={study.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-[55%] space-y-8 pt-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {study.tags.map((tag, j) => <span key={j} className="text-[10px] font-bold uppercase tracking-widest border border-white/15 text-white/80 px-3 py-1.5 rounded-full">{tag}</span>)}
                </div>
                <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase block mb-3">{study.industry} — {study.client}</span>
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight mb-0">{study.title}</h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-3">The Challenge</h3>
                  <p className="text-white/90 font-light leading-relaxed text-sm">{study.challenge}</p>
                </div>
                <div className="p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-3">Our Solution</h3>
                  <p className="text-white/90 font-light leading-relaxed text-sm">{study.solution}</p>
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
