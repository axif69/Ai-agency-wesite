import { motion } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Code, CheckCircle, Layers, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function WebDevelopment() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="AI Web Development Services in Sharjah, UAE" 
        description="Expert AI Web Development services by Asif Khan in Sharjah. Build immersive, high-performance, and AI-powered web applications tailored for your business."
        keywords="AI Web Development Sharjah, Web Developer UAE, React Developer Dubai, Next.js Expert UAE, AI Integration Website"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <span className="micro-label block mb-4">Service Details</span>
        <div className="flex items-center gap-6 mb-8">
          <Code className="w-12 h-12 text-white/40" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight">AI Web Dev</h1>
        </div>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Transform your digital presence with immersive, high-performance web applications powered by Artificial Intelligence.
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
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=90&w=2560&auto=format&fit=crop" 
            alt="AI Web Development" 
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
            <h2 className="text-4xl font-serif tracking-tight mb-6">Next-Gen Web Experiences for UAE Businesses</h2>
            <p className="text-white/60 font-light leading-relaxed">
              In the competitive markets of Dubai and Sharjah, a standard website isn't enough. I build intelligent web platforms that adapt to user behavior, automate customer interactions, and provide seamless, immersive experiences. Using modern frameworks like React and Next.js combined with AI APIs, your website becomes a powerful business tool designed to convert local traffic into loyal customers.
            </p>
          </div>
          
          <ul className="space-y-6">
            {[
              "Custom React & Next.js Applications",
              "AI Chatbot & Assistant Integration",
              "Dynamic Content Personalization",
              "Immersive 3D & WebGL Interfaces",
              "High-Performance & SEO Optimized Architecture"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                <CheckCircle className="w-5 h-5 text-white/40" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link to="/contact?service=web-dev" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Start Your Project <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Development Process</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Layers />, title: "1. Architecture & Design", desc: "Planning the tech stack, database schema, and creating high-fidelity UI/UX prototypes." },
            { icon: <Code />, title: "2. Development & AI Integration", desc: "Writing clean, scalable code and integrating intelligent AI features tailored to your needs." },
            { icon: <ShieldCheck />, title: "3. Testing & Deployment", desc: "Rigorous performance, security, and SEO testing before a seamless launch." }
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
