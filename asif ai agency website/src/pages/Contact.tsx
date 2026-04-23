import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import SEO from "../components/SEO";
import { Mail, Shield, Phone, Send, CheckCircle2, Loader2, Bot, ArrowRight } from "lucide-react";

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
      const submissionData = new FormData();
      submissionData.append("access_key", (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim());
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("service", formData.service);
      submissionData.append("message", formData.message);
      submissionData.append("subject", `Sovereign Inquiry: ${formData.service} from ${formData.name}`);
      submissionData.append("from_name", "Asif Digital Sovereign Intake");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", service: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form Error:", error);
      alert("Operational Latency Detected. Please reach out directly via WhatsApp for priority handling.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Strategic Intake | Asif Digital Sovereign AI" 
        description="Initiate your operational resilience audit. Connect with Asif Digital for Sovereign AI architecture and high-ticket digital transformation in the GCC."
      />
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="micro-label block mb-4">Operational Intake</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            Initiate <span className="italic text-white/50">Audit.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            Ready to architect your sovereign domain? Reach out to begin a clinical deep-dive into your operational friction points.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <h2 className="text-3xl font-serif mb-10">Strategic Access</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Priority WhatsApp</h3>
                    <a href="https://wa.me/971545866094" className="text-2xl font-serif text-white/80 hover:text-white transition-colors">0545866094</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Secure Intelligence</h3>
                    <a href="mailto:aiautomationdevelopement@gmail.com" className="text-2xl font-serif text-white/80 hover:text-white transition-colors">aiautomationdevelopement@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Khalid Pivot */}
            <div className="p-10 rounded-[3rem] border border-[#0066FF]/20 bg-[#0066FF]/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot className="w-20 h-20" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Prefer an Instant Audit?</h3>
              <p className="text-white/60 font-light mb-8 text-sm leading-relaxed">
                Khalid, our Strategic Intake Agent, can perform a preliminary resilience audit on your operations in under 5 minutes.
              </p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0066FF] hover:text-white transition-colors"
              >
                Launch Khalid Agent <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-10 border-t border-white/5 flex items-center gap-4">
              <Shield className="w-10 h-10 text-[#0066FF]" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Data Residency Guarantee</div>
                <div className="text-sm font-light text-white/60">G42/Azure UAE North Residency Compliant</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-12 rounded-[3rem] border border-white/5 relative bg-white/[0.01]"
          >
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/98 rounded-[3rem] p-8 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-[#0066FF] mb-6" />
                  <h3 className="text-3xl font-serif mb-4">Inquiry Recorded</h3>
                  <p className="text-white/60 font-light leading-relaxed">I have received your operational data. A Strategic Architect will review and respond via your provided channel.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                  >
                    Close Log
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em]">Full Name / Title</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-[#0066FF] transition-colors font-light text-lg"
                      placeholder="e.g. Sultan Al-Maktoum"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em]">Corporate Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-[#0066FF] transition-colors font-light text-lg"
                      placeholder="corporate@firm.ae"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="service" className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em]">Intelligence Pillar</label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border-b border-white/10 px-0 py-4 text-white/80 focus:outline-none focus:border-[#0066FF] transition-colors font-light text-lg"
                  >
                    <option value="" className="bg-[#050505]">Select Inquiry Scope...</option>
                    <optgroup label="— Sovereign AI Architectures" className="bg-[#050505]">
                      <option value="sovereign-sales" className="bg-[#050505]">Sovereign Sales Agent (B2B)</option>
                      <option value="agentic-finance" className="bg-[#050505]">Agentic Finance & Compliance</option>
                      <option value="arabic-nlp" className="bg-[#050505]">Arabic/Khaleeji NLP Hub</option>
                      <option value="logistics-ai" className="bg-[#050505]">Logistics Resilience AI</option>
                    </optgroup>
                    <optgroup label="— Strategic Pillars" className="bg-[#050505]">
                      <option value="web-architecture" className="bg-[#050505]">Enterprise Web Architecture</option>
                      <option value="aeo-seo" className="bg-[#050505]">AEO & Search Dominance</option>
                      <option value="branding-identity" className="bg-[#050505]">Branding & Visual Authority</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em]">Briefing Details</label>
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-[#0066FF] transition-colors resize-none font-light text-lg"
                    placeholder="Describe your current operational bottlenecks..."
                  ></textarea>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-bold uppercase tracking-widest py-6 rounded-full flex items-center justify-center gap-3 hover:bg-[#0066FF] hover:text-white transition-all duration-500 text-xs disabled:opacity-50 shadow-2xl"
              >
                {isLoading ? (
                  <>
                    Processing Intelligence... <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Initiate Audit <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
