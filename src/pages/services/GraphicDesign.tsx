import { motion } from "motion/react";
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
  return (
    <div className="pt-20">
      <SEO 
        title="Graphic Design Services | Asif Khan" 
        description="Premium graphic design services in Sharjah, UAE. Specializing in brand identity, UI/UX, and marketing materials."
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
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="micro-label">Creative Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            Graphic <br />
            <span className="italic text-white/50">Design</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed">
            Elevating brands through striking visual communication. From logo design to comprehensive brand identities.
          </p>
        </motion.div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1561070791-2526d30994b5?q=90&w=2560&auto=format&fit=crop)' }}
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
    </div>
  );
}
