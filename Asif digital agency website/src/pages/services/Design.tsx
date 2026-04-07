import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, PenTool, Image, Layout, Film, CheckCircle } from "lucide-react";

const services = [
  { icon: <PenTool className="w-6 h-6" />, title: "Marketing Collateral Design", desc: "Brochures, company profiles, flyers, leaflets, trade show materials, and print ads that cut through the noise and tell your story with visual authority. We design for both digital distribution (interactive PDFs) and high-quality print production." },
  { icon: <Image className="w-6 h-6" />, title: "Social Media Content Design", desc: "A consistent, on-brand library of social media templates for Instagram posts, Stories, LinkedIn articles, and TikTok overlays. We design systems—not one-off pieces—so your in-house team can produce on-brand content at scale without needing a designer every time." },
  { icon: <Layout className="w-6 h-6" />, title: "Pitch Decks & Presentation Design", desc: "Investor presentations, corporate decks, and company profiles transformed from dense text slides into visually compelling narratives. Our presentations have supported businesses in raising investment from Dubai venture funds and closing enterprise contracts." },
  { icon: <Film className="w-6 h-6" />, title: "Digital Ad Creatives", desc: "High-CTR Google Display banners, Meta ad images and carousels, LinkedIn Sponsored Content, and programmatic ad formats—designed with conversion psychology baked in. We produce creative sets in all required dimensions and test variants." },
  { icon: <PenTool className="w-6 h-6" />, title: "Infographics & Data Visualisation", desc: "Complex data, processes, and statistics transformed into beautiful, shareable infographics that communicate your authority, drive website engagement, and earn natural backlinks from industry publications." },
  { icon: <Image className="w-6 h-6" />, title: "Annual Reports & Corporate Documents", desc: "Professional annual reports, ESG reports, and corporate governance documents designed to the highest standard—reflecting the credibility and sophistication that institutional stakeholders, government partners, and investors require." },
];

const tools = ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "Figma", "After Effects", "Canva Pro (Templates)"];

const faqs = [
  { q: "What file formats will I receive?", a: "For print, you receive press-ready PDF, AI, and EPS files. For digital use, we provide PNG, SVG, and JPEG files at multiple resolutions. Source files are included on request." },
  { q: "Do you offer ongoing monthly design retainers?", a: "Yes. Our design retainers starting at AED 2,500/month give you a bank of design hours each month for social media graphics, ad creatives, and ad-hoc requests with 48-hour turnaround." },
  { q: "Can you match our existing brand guidelines?", a: "Absolutely. If you have an existing brand identity, we study your guidelines meticulously and produce new assets that are perfectly aligned with your established visual system." },
  { q: "How many revisions do I get?", a: "Your project includes 3 rounds of revisions per deliverable. Additional revision rounds can be accommodated for an agreed hourly rate." },
];

export default function Design() {
  return (
    <div className="pt-20">
      <SEO
        title="Graphic Design Services Dubai & Sharjah | Creative Agency | Asif Digital"
        description="Professional graphic design services in Dubai and Sharjah. Marketing materials, social media graphics, presentations, ad creatives, infographics, and annual reports."
      />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Graphic Design — Dubai & Sharjah</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            Design That Demands<br /><span className="italic text-white/40">Attention.</span>
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
            In a world where every brand competes for the same audience's limited attention, exceptional graphic design is not a luxury—it is your most powerful sales tool. We create visual communication that makes your audience stop, read, and act.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get A Design Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Design Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "500+", l: "Design Projects Completed" }, { n: "48hr", l: "Standard Turnaround" }, { n: "100%", l: "Brand Consistency Guaranteed" }, { n: "3", l: "Revision Rounds Included" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-serif mb-2">{s.n}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">What We Design</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Visual Communication for Every Medium</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/60 mb-5">{s.icon}</div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif mb-8">Tools We Master</h2>
          <div className="flex flex-wrap gap-4">
            {tools.map((t, i) => <span key={i} className="px-6 py-3 border border-white/10 rounded-full text-sm text-white/70 hover:border-white/40 transition-colors">{t}</span>)}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-white/10 rounded-2xl p-8">
                <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-white/50 font-light text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
