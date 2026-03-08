import { motion } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Megaphone, CheckCircle, Target, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function DigitalMarketing() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Digital Marketing & SEO Services in Sharjah, UAE" 
        description="Data-driven Digital Marketing, Meta Ads, Google Ads, and SEO/AEO services by Asif Khan in Sharjah, UAE. Dominate search and social media."
        keywords="Digital Marketing Sharjah, Meta Ads Expert UAE, Google Ads Specialist Dubai, SEO Services Sharjah, Social Media Management UAE"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <span className="micro-label block mb-4">Service Details</span>
        <div className="flex items-center gap-6 mb-8">
          <Megaphone className="w-12 h-12 text-white/40" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight">Digital Marketing</h1>
        </div>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Data-driven marketing strategies that maximize ROI, elevate brand visibility, and dominate the UAE digital landscape.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="parallax-container rounded-3xl aspect-[4/5]"
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=90&w=2560&auto=format&fit=crop" 
            alt="Digital Marketing" 
            className="parallax-img"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center space-y-10"
        >
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">Strategic Growth in the UAE</h2>
            <p className="text-white/60 font-light leading-relaxed">
              With over 5 years of experience in the UAE market, I understand what it takes to convert clicks into clients in Dubai, Sharjah, and Ajman. From highly targeted Meta and Google Ads campaigns to comprehensive Social Media Management and advanced AEO (Answer Engine Optimization), I provide end-to-end marketing solutions that drive real, measurable ROI.
            </p>
          </div>
          
          <ul className="space-y-6">
            {[
              "High-Converting Meta & Google Ads",
              "Advanced SEO & AEO (AI Search Optimization)",
              "Comprehensive Social Media Management",
              "Data Analytics & Conversion Tracking",
              "Content Strategy & Brand Positioning"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                <CheckCircle className="w-5 h-5 text-white/40" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link to="/contact?service=marketing" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Grow Your Business <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Process Section */}
      <section className="py-20 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="micro-label block mb-4">Methodology</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Campaign Lifecycle</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target />, title: "1. Audit & Strategy", desc: "Analyzing your current presence, identifying target audiences, and formulating a data-backed plan." },
            { icon: <Users />, title: "2. Execution & Engagement", desc: "Deploying campaigns, managing communities, and creating content that resonates." },
            { icon: <BarChart />, title: "3. Analysis & Optimization", desc: "Continuous monitoring, A/B testing, and refining strategies for maximum ROI." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 glass-panel rounded-3xl border border-white/5"
            >
              <div className="text-white/40 mb-6">{step.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
              <p className="text-white/50 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
