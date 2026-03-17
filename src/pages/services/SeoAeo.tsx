import { motion } from "motion/react";
import SEO from "../../components/SEO";
import { Search, TrendingUp, Target, BarChart, Globe, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Technical SEO",
    description: "Optimizing website architecture, speed, and mobile-friendliness for better crawlability."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Local SEO (UAE)",
    description: "Targeting local search queries to dominate the UAE market and drive foot traffic."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "AEO Optimization",
    description: "Structuring content to answer specific questions, optimizing for AI engines like ChatGPT and Gemini."
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Data Analytics",
    description: "Continuous monitoring and reporting on keyword rankings, traffic, and conversion metrics."
  }
];

const process = [
  {
    step: "01",
    title: "Comprehensive Audit",
    description: "Analyzing your current website performance, backlink profile, and competitor landscape."
  },
  {
    step: "02",
    title: "Keyword Strategy",
    description: "Identifying high-intent keywords and questions your target audience is asking."
  },
  {
    step: "03",
    title: "On-Page & Technical Fixes",
    description: "Implementing structural changes, meta tags, and schema markup for optimal indexing."
  },
  {
    step: "04",
    title: "Content & Authority Building",
    description: "Creating authoritative content and acquiring high-quality backlinks to boost domain authority."
  }
];

export default function SeoAeo() {
  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "SEO & AEO Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Expert SEO and Answer Engine Optimization (AEO) services in Sharjah and Dubai. Rank higher on Google, Maps, and AI search engines.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED"
    }
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Best SEO & AEO Agency in Dubai & Sharjah | Peak Search Visibility" 
        description="Top-rated SEO and Answer Engine Optimization (AEO) services in Sharjah and Dubai. Dominate local Maps, Google Search, and AI Engines like ChatGPT."
        keywords="SEO Agency Dubai, Best SEO Services Sharjah, Answer Engine Optimization UAE, Local SEO Dubai, Technical SEO Expert"
        schema={serviceSchema}
      />
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent blur-3xl -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="micro-label">Search Visibility</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            Dubai & Sharjah<br />
            <span className="italic text-white/50">SEO & AEO</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed">
            Dominate UAE search results. From traditional Google Maps rankings in Sharjah to the new frontier of AI-driven Answer Engine Optimization.
          </p>
        </motion.div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-7xl font-serif text-white/90 tracking-tight text-center px-6">
            Be the <span className="italic">Answer</span>
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">Future-Proof Search in UAE</h2>
            <p className="text-white/60 font-light leading-relaxed text-lg mb-8">
              Search is evolving rapidly. While traditional SEO remains crucial for dominating Google Maps in Sharjah and Dubai, optimizing for AI models (AEO) ensures your brand is the definitive answer when users ask ChatGPT, Gemini, or Claude about services in the UAE.
            </p>
            <ul className="space-y-4">
              {['Schema Markup', 'Voice Search Optimization', 'Content Structuring', 'Authority Link Building'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 font-light">
                  <CheckCircle2 className="w-5 h-5 text-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-colors duration-500"
              >
                <div className="mb-6 text-white/80">{feature.icon}</div>
                <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center mb-20">
          <span className="micro-label block mb-4">Methodology</span>
          <h2 className="text-5xl font-serif tracking-tight">Optimization Process</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-serif text-white/10 mb-6">{step.step}</div>
              <h3 className="text-xl font-serif mb-4">{step.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{step.description}</p>
              
              {i < process.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
