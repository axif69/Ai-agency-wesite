import { motion } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Cpu, CheckCircle, Database, Server, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SaaSServices() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="SaaS & Software Development in Sharjah, UAE" 
        description="Scalable SaaS and custom software development services by Asif Khan in Sharjah. Architect robust platforms for modern businesses."
        keywords="SaaS Developer Sharjah, Custom Software Development UAE, Cloud Architecture Dubai, Web App Developer UAE"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <span className="micro-label block mb-4">Service Details</span>
        <div className="flex items-center gap-6 mb-8">
          <Cpu className="w-12 h-12 text-white/40" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight">SaaS Solutions</h1>
        </div>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Scalable software as a service platforms and custom software architecture for modern, forward-thinking businesses.
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
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=90&w=2560&auto=format&fit=crop" 
            alt="SaaS Solutions" 
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
            <h2 className="text-4xl font-serif tracking-tight mb-6">Robust Cloud Architecture</h2>
            <p className="text-white/60 font-light leading-relaxed">
              Transform your business idea into a scalable, subscription-based SaaS product. I handle the entire lifecycle—from database architecture and secure authentication to seamless payment integration and intuitive user dashboards. Built for scale, security, and speed to serve the dynamic UAE market and beyond.
            </p>
          </div>
          
          <ul className="space-y-6">
            {[
              "End-to-End SaaS Architecture",
              "Secure Authentication & Role Management",
              "Stripe/Payment Gateway Integration",
              "Scalable Cloud Databases (Firebase/Supabase)",
              "Real-time Data & Analytics Dashboards"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                <CheckCircle className="w-5 h-5 text-white/40" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link to="/contact?service=saas" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Discuss Architecture <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">SaaS Architecture</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Database />, title: "1. Data Modeling", desc: "Designing scalable, multi-tenant database schemas to ensure data isolation and performance." },
            { icon: <Server />, title: "2. Cloud Infrastructure", desc: "Setting up robust CI/CD pipelines and auto-scaling cloud environments." },
            { icon: <Lock />, title: "3. Security & Auth", desc: "Implementing enterprise-grade authentication (OAuth, SAML) and role-based access control." }
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
