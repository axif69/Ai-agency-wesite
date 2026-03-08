import { motion } from "motion/react";
import SEO from "../components/SEO";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce AI Platform",
    category: "Web App",
    description: "A fully immersive e-commerce platform with AI-driven product recommendations and a seamless checkout experience.",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "Fintech Dashboard",
    category: "SaaS",
    description: "A comprehensive SaaS dashboard for financial analytics, featuring real-time data visualization and predictive modeling.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Real Estate Marketing Campaign",
    category: "Digital Marketing",
    description: "A highly targeted Meta and Google Ads campaign that generated a 300% increase in qualified leads for a luxury property developer in Dubai.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 4,
    title: "Healthcare Mobile App",
    category: "Mobile App",
    description: "An AI-powered mobile application for patient monitoring and telehealth consultations, built with React Native.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 5,
    title: "Restaurant Booking System",
    category: "Web App",
    description: "A custom web application for a high-end restaurant chain, integrating table reservations, loyalty programs, and online ordering.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 6,
    title: "Automotive SEO Strategy",
    category: "SEO & AEO",
    description: "A comprehensive SEO and AEO strategy that ranked a leading car dealership on the first page of Google and AI search engines in the UAE.",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 7,
    title: "AI-Powered CRM for Ajman Real Estate",
    category: "SaaS",
    description: "A custom CRM solution with automated lead scoring and AI-driven follow-ups, specifically designed for the Northern Emirates market.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 8,
    title: "Luxury Hospitality Digital Presence",
    category: "Digital Marketing",
    description: "A multi-channel digital strategy for a 5-star resort in Abu Dhabi, integrating influencer marketing and AI-optimized ad spend.",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=90&w=2560&auto=format&fit=crop",
    link: "#"
  }
];

export default function Portfolio() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Portfolio" 
        description="View the portfolio of Asif Khan, featuring successful web development, digital marketing, and SaaS projects."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 text-center md:text-left"
      >
        <span className="micro-label block mb-4">Selected Works</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">Portfolio</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          A selection of recent projects demonstrating my expertise in web development, digital marketing, and AI solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {portfolioItems.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-8 border border-white/5">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                src={item.img} 
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                <a 
                  href={item.link}
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-serif tracking-tight">{item.title}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap ml-4">{item.category}</span>
              </div>
              <p className="text-white/60 font-light leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
