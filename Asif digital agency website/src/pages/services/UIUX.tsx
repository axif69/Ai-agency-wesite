import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MousePointer, Layout, Users, Zap, CheckCircle, BarChart3 } from "lucide-react";

const services = [
  { icon: <Users className="w-6 h-6" />, title: "UX Research & User Insight", desc: "We conduct user interviews, heuristic evaluations, heatmap analysis, session recording reviews, and usability testing with real UAE users. Every design decision is supported by evidence—not assumption—ensuring we solve the actual problems your users experience rather than the ones we imagine they have." },
  { icon: <Layout className="w-6 h-6" />, title: "Information Architecture & User Journey Mapping", desc: "We define the complete structural blueprint of your digital product—how content is categorised, how users navigate, and every micro-decision point in the journey from landing page to conversion. We eliminate confusion before it reaches the interface." },
  { icon: <MousePointer className="w-6 h-6" />, title: "Wireframing & Interactive Prototyping", desc: "Low-fidelity wireframes first, then high-fidelity clickable Figma prototypes that behave exactly like the final product. We test these prototypes with real users before a line of code is written—finding usability issues at the cheapest possible stage of development." },
  { icon: <Zap className="w-6 h-6" />, title: "High-Fidelity UI Design", desc: "We translate validated wireframes into stunning, pixel-perfect user interfaces. Every component—buttons, form fields, navigation, modals, empty states, loading states—is designed with obsessive care for visual detail and interaction design best practices." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Design System Creation", desc: "For larger digital products, we construct a comprehensive design system in Figma: a token-based component library covering typography, color, spacing, iconography, and every UI component. This system dramatically accelerates future product development and ensures perfect visual consistency at scale." },
  { icon: <Users className="w-6 h-6" />, title: "Usability Testing & Iteration", desc: "After development, we continue the work—A/B testing CTAs, running moderated usability sessions, and analyzing behavioral event data to identify friction points and continuously improve conversion rates. UX is never finished; it evolves with your users." },
];

const faqs = [
  { q: "What is the difference between UI and UX?", a: "UX (user experience) is the architecture and strategy—how the product works, how users navigate, and whether it achieves their goals. UI (user interface) is the visual execution—how it looks, the design of every element. Both must be excellent; one without the other fails." },
  { q: "Do you work with development teams?", a: "Yes. We produce Figma files with detailed developer specs, component documentation, and interactive prototypes. We work closely with your development team (or ours) to ensure the final product is built precisely to the approved design." },
  { q: "Can you audit our existing product?", a: "Absolutely. We offer standalone UX audits using heuristic evaluation, competitor benchmarking, and user testing that identify exactly why your current digital product or website isn't converting as well as it should." },
  { q: "How long does a UI/UX project take?", a: "A typical website or app UI/UX project takes 4-8 weeks for research, wireframing, and UI design. Larger product design systems can take 3-4 months. Standalone UX audits take 1-2 weeks." },
];

export default function UIUX() {
  return (
    <div className="pt-20">
      <SEO
        title="UI/UX Design Agency Dubai | User Experience Design | Asif Digital"
        description="Expert UI/UX design services in Dubai. Research-backed user experience design and pixel-perfect interface design that converts users into loyal customers."
      />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">UI/UX Design — Dubai</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            Experiences Users<br /><span className="italic text-white/40">Actually Love.</span>
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
            A beautiful interface built on poor UX foundations is a beautiful trap. Users get confused, frustrated, and leave. We design digital products that are both visually extraordinary and intuitively simple to use—because the best interface is one your users never have to think about.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Start Your UX Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Design Work
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "200%", l: "Avg Conversion Rate Lift" }, { n: "Figma", l: "Primary Design Tool" }, { n: "100+", l: "Products Designed" }, { n: "4-8 wks", l: "Typical Project Timeline" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-serif mb-2">{s.n}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Full UI/UX Service</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Research → Architecture → Design → Test</h2>
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

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Every Project Includes</h2>
            <ul className="space-y-4">
              {["Full UX research and competitor audit", "User persona development", "Complete site/app IA and journey maps", "Low & high fidelity Figma wireframes", "Clickable interactive prototype", "Developer-ready design specifications", "3 rounds of revisions included", "30-day post-launch design support"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-serif mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {faqs.slice(0, 3).map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                  <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                  <p className="text-white/40 text-xs font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's design something extraordinary.</h2>
          <Link to="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
            Book A Design Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
