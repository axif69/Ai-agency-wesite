import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Code, Megaphone, Smartphone, Cpu, PenTool, Search, ArrowRight } from "lucide-react";

const services = [
  {
    id: "web-development",
    title: "AI Web Development",
    icon: <Code className="w-10 h-10" />,
    desc: "Building immersive, high-performance web applications powered by AI. From responsive landing pages to complex web portals, I ensure your digital presence is cutting-edge and user-centric.",
    features: ["React/Next.js", "AI Integration", "Performance Optimization", "Immersive UI/UX"],
    link: "/services/web-development"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <Megaphone className="w-10 h-10" />,
    desc: "Data-driven Meta & Google Ads, comprehensive social media management, and strategic campaigns designed to maximize ROI and brand visibility in the UAE market.",
    features: ["Meta Ads", "Google Ads", "Social Media Management", "Analytics & Reporting"],
    link: "/services/digital-marketing"
  },
  {
    id: "ai-mobile-apps",
    title: "AI Mobile Apps",
    icon: <Smartphone className="w-10 h-10" />,
    desc: "Developing intelligent cross-platform mobile applications that leverage machine learning for personalized user experiences and advanced functionality.",
    features: ["React Native", "AI Features", "Cross-Platform", "App Store Optimization"],
    link: "/services/ai-mobile-apps"
  },
  {
    id: "saas-services",
    title: "SaaS Solutions",
    icon: <Cpu className="w-10 h-10" />,
    desc: "Scalable software as a service platforms for modern businesses. I architect and build robust SaaS products that solve real-world problems efficiently.",
    features: ["Cloud Architecture", "Subscription Models", "Scalable Backend", "API Integration"],
    link: "/services/saas-services"
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: <PenTool className="w-10 h-10" />,
    desc: "Creating visually stunning brand identities, marketing materials, and UI designs that resonate with your target audience and elevate your brand.",
    features: ["Brand Identity", "UI/UX Design", "Marketing Collateral", "Social Media Graphics"],
    link: "/services/graphic-design"
  },
  {
    id: "seo-aeo",
    title: "SEO & AEO Optimization",
    icon: <Search className="w-10 h-10" />,
    desc: "Full SEO and AEO (Answer Engine Optimization) to rank your website in Google and AI GPT searches in the UAE, driving organic traffic and leads.",
    features: ["On-Page SEO", "Technical SEO", "AI Search Optimization", "Local SEO (UAE)"],
    link: "/services/seo-aeo"
  }
];

export default function Services() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Services" 
        description="Explore the comprehensive digital services offered by Asif Khan, including AI Web Development, Digital Marketing, SEO, and SaaS Solutions."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center md:text-left"
      >
        <span className="micro-label block mb-4">What I Offer</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Services</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Comprehensive digital solutions tailored to elevate your brand and drive measurable growth.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="p-10 border border-white/5 rounded-3xl glass-panel hover:bg-white/5 transition-all duration-500 group flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
              {service.icon}
            </div>
            <div className="mb-8 text-white/40 group-hover:text-white transition-colors duration-500">{service.icon}</div>
            <h2 className="text-3xl font-serif mb-4">{service.title}</h2>
            <p className="text-white/50 font-light leading-relaxed mb-8 flex-grow">{service.desc}</p>
            
            <ul className="grid grid-cols-2 gap-3 mb-10 text-xs text-white/40 uppercase tracking-widest font-semibold">
              {service.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/40 rounded-full" /> {feature}
                </li>
              ))}
            </ul>

            <Link 
              to={service.link}
              className="inline-flex items-center justify-between w-full py-4 border-t border-white/10 uppercase tracking-widest text-xs font-semibold hover:text-white/60 transition-colors group-hover:border-white/30"
            >
              <span>{service.link.startsWith('/contact') ? 'Inquire Now' : 'Learn More'}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
