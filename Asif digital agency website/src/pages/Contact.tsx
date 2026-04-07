import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import SEO from "../components/SEO";
import { Mail, Globe, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Using Web3Forms for easy serverless email delivery
      const submissionData = new FormData();
      submissionData.append("access_key", (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim());
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("service", formData.service);
      submissionData.append("message", formData.message);
      submissionData.append("subject", `New Inquiry: ${formData.service} from ${formData.name}`);
      submissionData.append("from_name", "Asif Digital Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", service: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000); // Hide success after 5 seconds
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form Error:", error);
      alert("Forgive me, my neural link is experiencing minor latency. Please try again or reach out via WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Contact Asif Digital" 
        description="Get in touch with Asif Digital for AI Web Development, Digital Marketing, and SaaS solutions across the GCC territory."
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
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-2">Location</h3>
                  <p className="text-xl font-light text-white/80 italic">Operating across the GCC territory.</p>
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
          className="glass-panel p-10 md:p-12 rounded-3xl border border-white/5 relative"
        >
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/95 rounded-3xl p-8 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-3xl font-serif mb-4">Message Sent</h3>
                <p className="text-white/60 font-light">I've received your data. Expect a response shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Return to form
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="name" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors font-light"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="service" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Service Interested In</label>
                <select
                id="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-[#050505] border-b border-white/20 px-0 py-3 text-white/80 focus:outline-none focus:border-white transition-colors font-light"
              >
                <option value="" className="bg-[#050505]">Select a service...</option>
                <optgroup label="— Web" className="bg-[#050505]">
                  <option value="web-design" className="bg-[#050505]">Web Design</option>
                  <option value="web-development" className="bg-[#050505]">Web Development</option>
                  <option value="ecommerce" className="bg-[#050505]">Ecommerce Websites</option>
                  <option value="web-hosting" className="bg-[#050505]">Web Hosting</option>
                  <option value="website-support" className="bg-[#050505]">Website Support</option>
                </optgroup>
                <optgroup label="— Digital Marketing" className="bg-[#050505]">
                  <option value="seo" className="bg-[#050505]">SEO</option>
                  <option value="ppc" className="bg-[#050505]">PPC (Google & Meta Ads)</option>
                  <option value="social-media" className="bg-[#050505]">Social Media Management</option>
                  <option value="ai" className="bg-[#050505]">AI & Automation</option>
                </optgroup>
                <optgroup label="— Creative" className="bg-[#050505]">
                  <option value="branding" className="bg-[#050505]">Branding & Identity</option>
                  <option value="design" className="bg-[#050505]">Graphic Design</option>
                  <option value="ui-ux" className="bg-[#050505]">UI/UX Design</option>
                  <option value="creative-web" className="bg-[#050505]">Creative Web Design</option>
                </optgroup>
              </select>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="message" className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Message</label>
              <textarea 
                id="message" 
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none font-light"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold uppercase tracking-widest py-5 rounded-full flex items-center justify-center gap-3 hover:bg-white/90 transition-colors text-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  Sending... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
