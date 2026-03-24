import { motion } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Smartphone, CheckCircle, Cpu, Layers, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function AiMobileApps() {
  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "Mobile App Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "High-performance AI Mobile Apps for iOS and Android tailored for businesses in Dubai and Sharjah.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED"
    }
  };

  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Top AI Mobile App Development Agency in Dubai & Sharjah" 
        description="Build premium, intelligent mobile applications with AI integration. Top rated iOS and Android app developers serving Sharjah, Dubai and the UAE."
        keywords="App Development Agency Dubai, Mobile App Developer Sharjah, iOS Developer UAE, Android App Development Dubai, AI Mobile Apps"
        schema={serviceSchema}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <span className="micro-label block mb-4">Service Details</span>
        <div className="flex items-center gap-6 mb-8">
          <Smartphone className="w-12 h-12 text-white/40" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight">Dubai & Sharjah<br/><span className="text-white/50 italic">AI Mobile Apps</span></h1>
        </div>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Intelligent, cross-platform iOS and Android applications that leverage machine learning to dominate the competitive UAE mobile market.
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
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format,compress&fm=webp&q=75&w=800" 
            alt="AI Mobile Apps UAE" 
            width="800"
            height="1000"
            loading="lazy"
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
            <h2 className="text-4xl font-serif tracking-tight mb-6">Smarter Mobile Experiences</h2>
            <p className="text-white/60 font-light leading-relaxed">
              We build intelligent, high-performance iOS and Android applications integrated with cutting-edge AI features like computer vision, NLP, and predictive algorithms. Whether you are a startup in Dubai or an established enterprise in Sharjah, our mobile solutions are designed to engage users and streamline operations.
            </p>
          </div>
          
          <ul className="space-y-6">
            {[
              "Cross-Platform Development (React Native)",
              "On-Device Machine Learning Integration",
              "Intelligent Push Notifications",
              "Seamless API & Backend Connectivity",
              "App Store Optimization (ASO)"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                <CheckCircle className="w-5 h-5 text-white/40" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link to="/contact?service=mobile-app" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Build Your App <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">App Development Lifecycle</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Layers />, title: "1. UI/UX & Prototyping", desc: "Designing intuitive interfaces and interactive prototypes tailored for mobile users." },
            { icon: <Cpu />, title: "2. Native & AI Dev", desc: "Building robust cross-platform code and integrating machine learning models." },
            { icon: <ShieldCheck />, title: "3. App Store Launch", desc: "Handling the rigorous submission processes for both Apple App Store and Google Play." }
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
