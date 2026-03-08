import { motion } from "motion/react";
import SEO from "../components/SEO";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Contact Asif Khan" 
        description="Get in touch with Asif Khan for AI Web Development, Digital Marketing, and SaaS solutions in Sharjah, UAE."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 text-center md:text-left"
      >
        <span className="micro-label block mb-4">Get In Touch</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Let's Talk</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Ready to elevate your digital presence? Reach out to discuss your next project.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-10">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-2">Phone / WhatsApp</h3>
                  <a href="https://wa.me/971545866094" className="text-xl font-light text-white/80 hover:text-white transition-colors">0545866094</a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-2">Email</h3>
                  <a href="mailto:aiautomationdevelopement@gmail.com" className="text-xl font-light text-white/80 hover:text-white transition-colors">aiautomationdevelopement@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-2">Address</h3>
                  <p className="text-xl font-light text-white/80">Muwaileh, Ind area, Maliha Rd, Sharjah, UAE</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-6">Connect on Social</h2>
            <div className="flex gap-4">
              {['IN', 'TW', 'IG'].map((social) => (
                <a key={social} href="#" className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-sm font-semibold tracking-widest">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-10 md:p-12 rounded-3xl border border-white/5"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="name" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="service" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Service Interested In</label>
              <select 
                id="service" 
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white/80 focus:outline-none focus:border-white transition-colors appearance-none font-light"
              >
                <option value="" className="bg-[#050505]">Select a service...</option>
                <option value="web-dev" className="bg-[#050505]">AI Web Development</option>
                <option value="marketing" className="bg-[#050505]">Digital Marketing</option>
                <option value="mobile-app" className="bg-[#050505]">AI Mobile Apps</option>
                <option value="saas" className="bg-[#050505]">SaaS Solutions</option>
                <option value="seo" className="bg-[#050505]">SEO & AEO</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="message" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none font-light"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-white text-black font-semibold uppercase tracking-widest py-5 rounded-full flex items-center justify-center gap-3 hover:bg-white/90 transition-colors text-xs"
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
