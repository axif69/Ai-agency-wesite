import { motion } from "motion/react";
import SEO from "../components/SEO";

export default function About() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="About Asif Khan" 
        description="Learn more about Asif Khan, a digital marketing expert and AI web developer based in Sharjah, UAE with 8 years of experience."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 text-center md:text-left"
      >
        <span className="micro-label block mb-4">The Persona</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">About Me</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          I am Asif Khan, a passionate Digital Marketing Expert and AI Web Developer based in Sharjah, UAE. With over 8 years of experience, I specialize in building immersive, high-performance web applications and executing data-driven marketing campaigns.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl transform -rotate-3 scale-105" />
          <img 
            src="https://images.unsplash.com/photo-1507005311169-0a1dd7228f2d?q=90&w=2560&auto=format&fit=crop" 
            alt="Asif Khan" 
            className="w-full h-auto rounded-3xl object-cover grayscale hover:grayscale-0 transition-all duration-1000 relative z-10 border border-white/10"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center space-y-16"
        >
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">My Journey</h2>
            <p className="text-white/60 font-light leading-relaxed text-lg">
              Starting my career in digital marketing, I quickly realized the power of combining strategic outreach with cutting-edge technology. Over the past 8 years, I have honed my skills in both frontend development and AI integration, allowing me to offer comprehensive solutions that not only look stunning but also drive tangible business results.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl border border-white/5">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40 mb-8">Core Skills</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/80 font-light">
              <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" /> AI Web Development</li>
              <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" /> Meta & Google Ads</li>
              <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" /> Social Media Management</li>
              <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" /> SEO & AEO Optimization</li>
              <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" /> Graphic Design</li>
              <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" /> SaaS Architecture</li>
            </ul>
          </div>

          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">Location</h2>
            <p className="text-white/60 font-light leading-relaxed text-lg">
              Based in Muwaileh, Industrial Area, Maliha Rd, Sharjah, UAE. I work with clients locally and globally to transform their digital presence.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
