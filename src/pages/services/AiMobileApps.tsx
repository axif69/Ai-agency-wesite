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
        faqSchema={[
          {
            question: "What is the typical cost of AI mobile app development in the UAE?",
            answer: "The cost varies depending on complexity, but a premium AI-integrated mobile app typically starts from AED 35,000 for a cross-platform (iOS & Android) MVP with basic AI functionality."
          },
          {
            question: "How long does it take to build an AI mobile app?",
            answer: "A standard AI mobile application takes between 12 to 16 weeks from discovery and UI/UX design to final App Store and Play Store launch."
          },
          {
            question: "Do you handle App Store and Play Store submissions?",
            answer: "Yes. We manage the entire submission process, ensuring your app meets all technical and design guidelines for both Apple and Google platforms."
          },
          {
            question: "Can you integrate custom AI models into mobile apps?",
            answer: "Absolutely. We specialize in integrating advanced AI features like computer vision, NLP, and predictive algorithms directly into mobile experiences for a competitive edge."
          }
        ]}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="micro-label mb-8 block">Intelligence on the Move</span>
            <h1 className="text-4xl md:text-8xl font-serif text-white tracking-tight leading-tight">
              Dubai & Sharjah<br/><span className="italic text-white/80">AI Mobile Apps</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="parallax-container rounded-3xl aspect-[4/5]"
        >
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format,compress&fm=webp&q=75&w=1200" 
            alt="AI Mobile App Development Agency Dubai and Sharjah" 
            className="parallax-img"
            referrerPolicy="no-referrer"
            loading="lazy"
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
            <p className="text-white/90 font-light leading-relaxed">
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
              <li key={i} className="flex items-center gap-4 text-white/95 font-light">
                <CheckCircle className="w-5 h-5 text-white/90" role="img" aria-label="Feature Checkmark" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link to="/contact?service=mobile-app" aria-label="Start Your AI Mobile App Development Project with Asif Digital" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Build Your App <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
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
            { icon: <Layers className="w-6 h-6" role="img" aria-label="Architecture Icon" />, title: "1. UI/UX & Prototyping", desc: "Designing intuitive interfaces and interactive prototypes tailored for mobile users." },
            { icon: <Cpu className="w-6 h-6" role="img" aria-label="CPU Integration Icon" />, title: "2. Native & AI Dev", desc: "Building robust cross-platform code and integrating machine learning models." },
            { icon: <ShieldCheck className="w-6 h-6" role="img" aria-label="Security Icon" />, title: "3. App Store Launch", desc: "Handling the rigorous submission processes for both Apple App Store and Google Play." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 glass-panel rounded-3xl border border-white/5"
            >
              <div className="text-white/90 mb-6">{step.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
              <p className="text-white/90 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Hidden SEO Image */}
      <img 
        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format,compress&fm=webp&q=75&w=1200" 
        alt="Top AI Mobile App Development Agency Dubai Sharjah | iOS & Android Developers" 
        className="sr-only"
        loading="lazy"
      />
      {/* Strategic Synergy Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Web Development", link: "/services/website-development-dubai-sharjah", desc: "Convert your mobile users with a high-performance, responsive web presence." },
              { title: "SaaS Development", link: "/services/saas-development-specialist-uae", desc: "Build unshakeable cloud-native backends to power your mobile ecosystem." },
              { title: "AI Automation", link: "/services/ai-automation-agency-dubai-uae", desc: "Integrate intelligent backend agents to automate mobile user workflows." }
            ].map((s, i) => (
              <Link key={i} to={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <h3 className="text-xl font-serif mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-6">{s.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white">Explore Solution</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
