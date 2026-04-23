import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Globe, Zap, Sparkles, CheckCircle, Code } from "lucide-react";

const features = [
  { icon: <Sparkles className="w-6 h-6" />, title: "Award-Winning Visual Concept", desc: "Creative web design goes beyond beautiful—it is strategically arresting. We use editorial-grade typography, cinematic imagery, motion-driven storytelling, and interaction design that makes visitors feel the premium quality of your brand before they read a single word." },
  { icon: <Layers className="w-6 h-6" />, title: "Custom Animations & Micro-Interactions", desc: "Page transitions, parallax scroll effects, text reveals, cursor interactions, and hover states are all custom-coded to create a seamless, immersive digital experience. These details signal craft and investment—and they make visitors stay significantly longer." },
  { icon: <Globe className="w-6 h-6" />, title: "Storytelling Through Scroll", desc: "We design websites where the scroll itself tells your brand story. As users move through the page, content, imagery, and data reveal progressively—creating a narrative journey that builds desire and guides visitors inevitably toward your call to action." },
  { icon: <Zap className="w-6 h-6" />, title: "Performance Without Compromise", desc: "Grand visual ambitions often come at the cost of website speed. We use advanced optimisation techniques—lazy loading, sprite sheets, WebP images, code splitting, and CDN delivery—to ensure your visually spectacular website still loads fast and scores well on Core Web Vitals." },
  { icon: <Code className="w-6 h-6" />, title: "React & Next.js Creative Development", desc: "Our frontend engineers are fluent in the latest creative development techniques: Three.js 3D scenes, GSAP timeline animations, Lottie animations, WebGL shaders, and custom cursor experiences. We bring creative direction to life with clean, maintainable code." },
  { icon: <Layers className="w-6 h-6" />, title: "Fully Responsive & Cross-Device", desc: "Creative web experiences must translate beautifully from 27-inch monitors to iPhone screens. We design and test meticulously across every device, ensuring your creative vision is preserved and impactful regardless of how your audience finds you." },
];

const clientTypes = ["Luxury Real Estate (Dubai)", "Premium Hospitality & Hotels", "Fashion & Lifestyle Brands", "Architecture & Interior Design Studios", "Investment & Private Equity Firms", "Creative Agencies & Studios", "Luxury F&B Concepts", "Tech Startups & SaaS Products"];

const faqs = [
  { q: "What makes creative web design different from standard web design?", a: "Standard web design prioritises usability and conversion within established templates and conventions. Creative web design pushes the boundaries of what a website can feel like—using advanced animations, experimental layouts, immersive scroll experiences, and visual storytelling to create a work of digital art that also drives business results." },
  { q: "Will a heavily animated website hurt my Google rankings?", a: "Not if it's built correctly. We adhere to Core Web Vitals standards and ensure all animations are performance-optimised. Your creative website will load fast, score well on Google PageSpeed, and maintain strong technical SEO foundations." },
  { q: "How long does a creative web design project take?", a: "Creative web design projects typically take 8-12 weeks due to the elevated level of design craft and custom development involved. This timeline ensures the final product is truly exceptional rather than merely adequate." },
  { q: "Do you build creative websites on CMS platforms like WordPress?", a: "Yes. We build on headless CMS platforms including Sanity, Contentful, and Strapi, as well as custom WordPress implementations. This gives you creative freedom in design combined with the ease of content management you need." },
];

export default function CreativeWebDesign() {
  return (
    <div className="pt-20">
      <SEO 
        title="Creative Web Design Agency Dubai | Award-Winning Websites | Asif Digital" 
        description="Bespoke creative web design for premium Dubai brands. Advanced animations, immersive scroll experiences, and visually extraordinary websites that make your brand unforgettable."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Creative Web Design",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" },
            { "@type": "Country", "name": "UAE" }
          ],
          "description": "Bespoke creative web design for premium brands in Dubai, featuring advanced animations, immersive scroll experiences, and cinematic storytelling."
        }}
        faqSchema={[
          {
            question: "What makes creative web design different from standard web design?",
            answer: "Standard web design prioritises usability and conversion within established templates. Creative web design pushes boundaries with advanced animations, experimental layouts, and immersive storytelling to create a work of digital art."
          },
          {
            question: "Will a heavily animated website hurt my Google rankings?",
            answer: "Not if it's built correctly. We adhere to Core Web Vitals standards and ensure all animations are performance-optimised for fast load times and strong technical SEO foundations."
          },
          {
            question: "How long does a creative web design project take?",
            answer: "Creative web design projects typically take 8-12 weeks due to the elevated level of design craft and custom development involved in creating an exceptional digital experience."
          },
          {
            question: "Do you build creative websites on CMS platforms like WordPress?",
            answer: "Yes. We build on headless CMS platforms including Sanity, Contentful, and Strapi, as well as custom WordPress implementations for easy content management."
          }
        ]}
      />

      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="micro-label mb-8 block">Creative Web Design — Dubai</span>
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-tight">
              Beyond Design.<br /><span className="italic text-white/40">Into Experience.</span>
            </h1>
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">Start Your Project <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">View Creative Work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Art Meets <span className="italic">Logic</span>
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Bespoke Creative Web Design and Cinematic Experiences Dubai" 
          className="sr-only"
          loading="lazy"
        />
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16"><span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Creative Capabilities</span><h2 className="text-4xl md:text-5xl font-serif max-w-2xl">Where Art Meets Conversion Science</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/60 mb-5">{f.icon}</div>
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-8">Who This Is For</h2>
            <p className="text-white/50 font-light mb-8 leading-relaxed">Creative web design is for brands for whom ordinary is not an option. If your business commands a premium price point and needs a digital presence that reflects that premium positioning, this is your service.</p>
            <div className="grid grid-cols-2 gap-3">
              {clientTypes.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" /> {c}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[{ n: "8-12 wks", l: "Typical Project Duration" }, { n: "3", l: "Design Concepts Presented" }, { n: "95+", l: "PageSpeed Score Target" }, { n: "Award", l: "Quality Standard" }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/10 rounded-2xl flex justify-between items-center">
                <span className="text-white/50 text-sm">{s.l}</span>
                <span className="text-2xl font-serif">{s.n}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden SEO Image */}
      <img 
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200" 
        alt="Bespoke Creative Web Design and Cinematic Experiences Dubai | Award Winning Agency" 
        className="sr-only"
        loading="lazy"
      />

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to be unforgettable?</h2>
          <p className="text-white/50 text-lg font-light mb-10">Let's create a digital experience your industry has never seen before.</p>
          <Link to="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Start The Conversation <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
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
              { title: "UI/UX Design", link: "/services/ui-ux-design-agency-dubai", desc: "User-centric interaction patterns for complex digital ecosystems." },
              { title: "Graphic Design", link: "/services/graphic-design-agency-dubai", desc: "Comprehensive brand assets and visual collateral for multi-channel impact." },
              { title: "Web Hosting", link: "/services/premium-web-hosting-uae", desc: "Ultra-fast, secure infrastructure for your creative digital storefront." }
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
