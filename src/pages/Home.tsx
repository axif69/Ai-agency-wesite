import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SocialPostGenerator from "../components/SocialPostGenerator";
import { ArrowRight, Code, Megaphone, Smartphone, Cpu, Star, PenTool, BarChart3, Settings, Target } from "lucide-react";

const clients = [
  "Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix", "Tesla", "Adobe"
];

const services = [
  { 
    title: "Enterprise AI & Mobile Solutions", 
    icon: <Smartphone className="w-8 h-8" />, 
    desc: "Architecting intelligent, high-performance iOS and Android applications that leverage neural networks to automate complex business workflows." 
  },
  { 
    title: "Scalable SaaS Architecture", 
    icon: <Code className="w-8 h-8" />, 
    desc: "Engineering robust, cloud-native software ecosystems designed for global scale, security, and seamless integration with existing enterprise stacks." 
  },
  { 
    title: "Data-Driven Performance Marketing", 
    icon: <Megaphone className="w-8 h-8" />, 
    desc: "Precision-targeted growth strategies utilizing AI-driven audience segmentation to maximize conversion rates across the UAE's competitive digital landscape." 
  },
  { 
    title: "Strategic Search Dominance", 
    icon: <PenTool className="w-8 h-8" />, 
    desc: "Advanced SEO and AEO strategies that ensure your brand dominates local and global search intent, capturing high-value leads at the point of discovery." 
  },
];

const works = [
  { id: 1, title: "E-commerce Sales Boost", category: "Digital Marketing", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=90&w=2560&auto=format&fit=crop" },
  { id: 2, title: "Lead Generation for B2B", category: "SaaS & Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=90&w=2560&auto=format&fit=crop" },
  { id: 3, title: "Brand Awareness Campaign", category: "Social Media", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=90&w=2560&auto=format&fit=crop" },
  { id: 4, title: "Chatbot Implementation", category: "AI Solutions", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=90&w=2560&auto=format&fit=crop" },
];

const testimonials = [
  { name: "Dr. Aisha A.", role: "Clinic Director, Sharjah", text: "Asif's SEO work for our Sharjah-based clinic was phenomenal. We are now ranking on the first page of Google for our main keywords!" },
  { name: "Omar K.", role: "Restaurant Owner, Dubai", text: "The WhatsApp chatbot they built for our Dubai restaurant has been a game-changer. Customer orders are smoother and we've saved so much time." },
  { name: "Fatima S.", role: "Boutique Owner, Ajman", text: "Incredible social media management. Our Instagram engagement has tripled since we started working with Asif Digital." }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#050505]">
      <SEO 
        title="Home" 
        description="Asif Khan - Expert AI Web Developer & Digital Marketer in Sharjah, UAE. Specializing in Web Apps, SEO, Meta/Google Ads, and SaaS."
        keywords="AI Web Developer UAE, Digital Marketing Expert Sharjah, SEO Services UAE, Meta Ads Expert, SaaS Developer Dubai"
      />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 sm:pt-0">
        
        <motion.div style={{ y, opacity }} className="text-center z-10 flex flex-col items-center -mt-20 md:-mt-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="micro-label mb-4 text-white/40"
          >
            Strategic Digital Partner &mdash; UAE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight mb-6 max-w-6xl mx-auto"
          >
            Architecting <span className="italic text-white/40">Intelligent</span><br/>Digital Ecosystems
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-white/60 font-light max-w-4xl mx-auto font-sans leading-relaxed mb-8"
          >
            We bridge the gap between complex AI technology and business convenience. Delivering high-performance software and data-driven marketing strategies that scale enterprise growth across Sharjah, Dubai, and the Northern Emirates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link to="/contact" className="btn-premium btn-primary flex justify-center items-center gap-3 w-full sm:w-auto">
              Request Strategy Session <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-premium btn-secondary flex justify-center items-center gap-3 w-full sm:w-auto">
              Explore Capabilities
            </Link>
          </motion.div>
        </motion.div>

        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-zinc-800 to-transparent rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { label: "Enterprise Deployments", value: "260+" },
            { label: "Strategic Partners", value: "180+" },
            { label: "Industry Expertise", value: "8+ Yrs" },
            { label: "Global Recognition", value: "12+" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{stat.value}</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="micro-label block mb-8">The Agency</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.1] mb-10">
              Where AI Precision Meets <span className="italic text-white/40">Business Convenience.</span>
            </h2>
            <div className="space-y-6 text-white/60 font-light text-xl leading-relaxed">
              <p>
                Asif Digital is not just a service provider; we are your strategic technology partner. Based in the heart of Sharjah, we specialize in translating the power of Artificial Intelligence into tangible business outcomes for organizations across the UAE.
              </p>
              <p>
                Our philosophy is simple: technology should serve the business, not the other way around. We remove the friction of digital transformation, providing end-to-end solutions from high-performance cloud architecture to sophisticated, data-backed marketing funnels.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=90&w=2560&auto=format&fit=crop" 
              alt="Asif Digital Office" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
              <div className="text-4xl font-serif italic text-white mb-2">"Innovation is the standard."</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Asif Khan &mdash; Founder</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Clients */}
      <section className="py-16 bg-[#0a0a0a] overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 text-center mb-10">
          <h2 className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-white/40">Featured Clients</h2>
        </div>
        
        <div className="flex whitespace-nowrap relative">
          <motion.div 
            className="flex gap-16 px-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {/* Double the list for seamless loop */}
            {[
              "Highlight Technologies", "Chainlink Labs", "Mercury", "Chegg", "Drata", "Loop Returns",
              "Stripe", "Vercel", "Notion", "Figma", "Linear", "Airbnb", "Shopify", "Retool", "Postman",
              "Highlight Technologies", "Chainlink Labs", "Mercury", "Chegg", "Drata", "Loop Returns",
              "Stripe", "Vercel", "Notion", "Figma", "Linear", "Airbnb", "Shopify", "Retool", "Postman"
            ].map((client, i) => (
              <div key={i} className="text-2xl md:text-3xl font-serif font-bold text-white/20 hover:text-white/60 transition-colors cursor-default">
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="micro-label block mb-4">What I Do</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight">Expertise</h2>
          </div>
          <p className="text-white/60 max-w-md text-lg font-light">
            8 years of experience delivering high-impact digital solutions that drive growth and engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-white/5 rounded-3xl glass-panel hover:bg-white/5 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                {service.icon}
              </div>
              <div className="mb-8 text-white/40 group-hover:text-white transition-colors duration-500">{service.icon}</div>
              <h3 className="text-3xl font-serif mb-4">{service.title}</h3>
              <p className="text-white/50 font-light leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:text-white/60 transition-colors">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <span className="micro-label block mb-4">The AI Advantage</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Why Choose Asif Digital?</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              In the fast-paced markets of Dubai and Sharjah, you don't just need a website; you need a digital growth engine. We leverage Artificial Intelligence and modern software architecture to revolutionize your business, driving efficiency, personalization, and superior results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Cognitive Automation", desc: "We deploy advanced AI agents that handle complex decision-making processes, reducing operational overhead and allowing your team to focus on high-value strategic initiatives." },
              { title: "Predictive Intelligence", desc: "Our models analyze vast datasets to forecast market shifts and consumer behavior, giving your business a significant competitive edge in the dynamic UAE economy." },
              { title: "Regional Market Mastery", desc: "With deep roots in Sharjah and Dubai, we combine global technology standards with local cultural intelligence to ensure your brand resonates across the Middle East." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-white/5 rounded-3xl glass-panel bg-black/50"
              >
                <h3 className="text-2xl font-serif mb-4">{feature.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Marquee */}
      <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap relative">
          <motion.div 
            className="flex gap-20 px-10 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[
              "TensorFlow", "PyTorch", "React Native", "Next.js", "AWS", "Google Cloud", "Kubernetes", "Docker", "Node.js", "Python", "TypeScript", "GraphQL",
              "TensorFlow", "PyTorch", "React Native", "Next.js", "AWS", "Google Cloud", "Kubernetes", "Docker", "Node.js", "Python", "TypeScript", "GraphQL"
            ].map((tech, i) => (
              <div key={i} className="text-4xl md:text-6xl font-serif font-black text-white/5 hover:text-white/20 transition-colors cursor-default uppercase tracking-tighter">
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI-Powered Marketing Solutions */}
      <section className="py-40 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div className="max-w-3xl">
              <span className="micro-label block mb-6">Innovation</span>
              <h2 className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9]">
                AI-Powered <br/>
                <span className="italic text-white/40">Marketing Solutions.</span>
              </h2>
            </div>
            <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm">
              We deploy advanced neural architectures to automate and optimize every facet of your digital presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI Content Generation",
                desc: "Automate high-quality, engaging content for blogs and social media that resonates with your UAE audience.",
                icon: <PenTool className="w-8 h-8 text-[#f5f5f5]" />
              },
              {
                title: "Predictive Analytics",
                desc: "Utilize AI to analyze data, predict trends, and personalize customer experiences in the competitive Dubai market.",
                icon: <BarChart3 className="w-8 h-8 text-[#f5f5f5]" />
              },
              {
                title: "Marketing Automation",
                desc: "Streamline repetitive tasks, automate email campaigns, and optimize ad bidding for your Sharjah business.",
                icon: <Settings className="w-8 h-8 text-[#f5f5f5]" />
              },
              {
                title: "Customer Segmentation",
                desc: "Segment your audience in Ajman with precision for hyper-targeted messaging and campaigns.",
                icon: <Target className="w-8 h-8 text-[#f5f5f5]" />
              }
            ].map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-white/5 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="mb-8 group-hover:scale-110 transition-transform duration-500">{solution.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{solution.title}</h3>
                <p className="text-white/40 font-light leading-relaxed">{solution.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-40 px-6 md:px-12 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 text-center max-w-4xl mx-auto"
          >
            <span className="micro-label block mb-8">Methodology</span>
            <h2 className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9] mb-12">
              The Strategic <span className="italic text-white/40">Framework.</span>
            </h2>
            <p className="text-white/40 text-xl font-light leading-relaxed">
              We don't just build; we engineer. Our approach is rooted in three core pillars that ensure every digital ecosystem we architect is scalable, intelligent, and business-centric.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Cognitive Intelligence", 
                desc: "Integrating advanced neural networks into the core of your business operations to automate decision-making and unlock hidden efficiencies.",
                icon: <Cpu className="w-10 h-10" />
              },
              { 
                title: "Enterprise Scalability", 
                desc: "Engineering cloud-native architectures that grow with your ambitions, ensuring zero-downtime performance even under extreme global demand.",
                icon: <Code className="w-10 h-10" />
              },
              { 
                title: "Data-Backed Strategy", 
                desc: "Moving beyond intuition. We use predictive analytics and real-time data harvesting to inform every marketing move and product iteration.",
                icon: <PenTool className="w-10 h-10" />
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-12 border border-white/5 rounded-[3rem] bg-white/5 hover:bg-white/10 transition-all duration-700 group"
              >
                <div className="mb-10 text-white/20 group-hover:text-white transition-colors duration-700">
                  {pillar.icon}
                </div>
                <h3 className="text-3xl font-serif mb-6">{pillar.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-40 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12"
          >
            <div className="max-w-2xl">
              <span className="micro-label block mb-8">Case Studies</span>
              <h2 className="text-6xl md:text-9xl font-serif tracking-tight leading-[0.85]">
                Selected <span className="italic text-white/40">Impact.</span>
              </h2>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-black hover:text-white/60 transition-all duration-500 group">
              Full Archive <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {works.map((work, i) => (
              <motion.div 
                key={work.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] mb-12">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    src={work.img} 
                    alt={work.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700" />
                  <div className="absolute top-12 left-12">
                    <span className="px-6 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest">
                      {work.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-serif tracking-tight">{work.title}</h3>
                  <p className="text-white/30 text-lg font-light">Strategic digital transformation for global enterprise.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <span className="micro-label block mb-4">Client Feedback</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight">Testimonials</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-white/5 rounded-3xl glass-panel flex flex-col"
              >
                <div className="flex gap-1 mb-6 text-yellow-500/80">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-white/70 font-light italic text-lg leading-relaxed mb-8 flex-grow">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <span className="text-xs text-white/40 uppercase tracking-widest">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-40 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <span className="micro-label block">Global Footprint</span>
              <h2 className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9]">
                UAE Roots. <br/>
                <span className="italic text-white/40">Global Impact.</span>
              </h2>
              <p className="text-white/40 text-xl font-light leading-relaxed max-w-xl">
                While our headquarters are in Sharjah, our digital ecosystems power businesses from Dubai to London and New York to Singapore. We bridge local cultural intelligence with global technology standards.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-8">
                <div>
                  <h4 className="text-4xl font-serif mb-2">12+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Countries Reached</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif mb-2">45M+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Users Impacted</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px] animate-pulse" />
              <div className="relative z-10 w-full h-full border border-white/10 rounded-full flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 group-hover:scale-150 transition-transform duration-1000" />
                <div className="text-center space-y-4">
                  <span className="text-8xl block">🌍</span>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Network Scale</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Social Post Generator */}
      <SocialPostGenerator />

      {/* Final CTA */}
      <section className="py-60 px-6 md:px-12 bg-white text-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#eeeeee_0%,_#ffffff_100%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[10rem] font-serif tracking-tighter leading-[0.8] mb-20"
          >
            Let's Build <br/>
            <span className="italic opacity-30">The Future.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-premium btn-primary inline-block">
              Initiate Partnership
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
