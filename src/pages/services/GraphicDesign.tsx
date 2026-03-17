import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { PenTool, Layers, Image as ImageIcon, MonitorSmartphone, Palette, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Brand Identity",
    description: "Creating cohesive visual identities that resonate with your target audience and stand out in the market."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "UI/UX Design",
    description: "Designing intuitive and engaging user interfaces for web and mobile applications."
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: "Marketing Materials",
    description: "Crafting compelling graphics for social media, ad campaigns, and print collateral."
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Digital Assets",
    description: "Developing high-quality digital assets including icons, illustrations, and 3D elements."
  }
];

const process = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "Understanding your brand values, target audience, and design objectives."
  },
  {
    step: "02",
    title: "Concept Development",
    description: "Exploring creative directions and developing initial design concepts."
  },
  {
    step: "03",
    title: "Refinement",
    description: "Iterating on the chosen concept based on your feedback to achieve perfection."
  },
  {
    step: "04",
    title: "Final Delivery",
    description: "Providing all necessary design files in the required formats for various applications."
  }
];

export default function GraphicDesign() {
  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "Graphic Design",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Premium brand identity, UI/UX, and creative graphic design services for agencies and businesses in the UAE.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED"
    }
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Premium Graphic Design & Branding Agency in Dubai & Sharjah" 
        description="Elevate your brand with award-winning Graphic Design, UI/UX, and Social Media Creatives. Top graphic design agency in Sharjah and Dubai."
        keywords="Graphic Design Agency Dubai, Best Graphic Designer Sharjah, UI/UX Design UAE, Branding Agency Dubai, Logo Design Sharjah"
        schema={serviceSchema}
        faqSchema={[
          {
            question: "How long does a branding project typically take?",
            answer: "A complete brand identity project, including logo design, color palette, and typography, usually takes 2 to 4 weeks for research, concepts, and refinement."
          },
          {
            question: "Do you provide source files for the designs?",
            answer: "Yes. Upon completion and final payment, we provide all source files (AI, PSD, Figma) along with high-resolution exports and a brand style guide."
          },
          {
            question: "Can you create social media graphics for my UAE business?",
            answer: "Absolutely. We design high-engagement social media creatives tailored for UAE audiences on platforms like Instagram, LinkedIn, and TikTok, ensuring your brand stays consistent and relevant."
          },
          {
            question: "Do you handle print design?",
            answer: "Yes. From business cards and brochures to large-format signage and event collateral, we provide print-ready designs that meet high professional standards."
          }
        ]}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="micro-label mb-8 block text-white/70">Creative Visual Strategy</span>
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-tight">
              Dubai & Sharjah <br />
              <span className="italic text-white/50">Graphic Design</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <img 
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Award Winning Graphic Design and Brand Identity Agency Dubai" 
          className="sr-only"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-7xl font-serif text-white/90 tracking-tight text-center px-6">
            Visuals that <span className="italic">Speak</span>
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">Creative Excellence</h2>
            <p className="text-white/60 font-light leading-relaxed text-lg mb-8">
              In the visually driven markets of Dubai and Sharjah, exceptional design is your competitive advantage. I create visual experiences that capture attention, communicate your brand's unique message clearly, and leave a lasting impression on your UAE audience.
            </p>
            <ul className="space-y-4">
              {['Logo & Branding', 'Web & App UI', 'Social Media Graphics', 'Print Design'].map((item, i) => (
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
          <h2 className="text-5xl font-serif tracking-tight">Design Process</h2>
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
      {/* Hidden SEO Image */}
      <img 
        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format,compress&fm=webp&q=75&w=1200" 
        alt="Top Graphic Design and Branding Agency Dubai Sharjah | Award Winning Designers" 
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
              { title: "Creative Web Design", link: "/services/creative-web-design-agency-dubai", desc: "Bring your brand to life with award-winning digital experiences." },
              { title: "UI/UX Design", link: "/services/ui-ux-design-agency-dubai", desc: "Impeccable product interfaces that bridge the gap between beauty and function." },
              { title: "Social Media", link: "/services/social-media-management-uae", desc: "High-engagement social creatives for Dubai's most ambitious brands." }
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
