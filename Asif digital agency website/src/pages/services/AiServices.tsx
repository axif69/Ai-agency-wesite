import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Cpu, Zap, BarChart3, CheckCircle } from "lucide-react";

const features = [
  { icon: <Bot className="w-6 h-6" />, title: "AI Chatbots & Virtual Assistants", desc: "We deploy intelligent, context-aware chatbots on your website, WhatsApp, and social media that qualify leads, handle FAQs, and book appointments 24/7. Built on GPT-4 and Claude—these bots sound genuinely human and radically reduce your customer service overhead." },
  { icon: <Cpu className="w-6 h-6" />, title: "Business Process Automation (n8n & Make)", desc: "We map your repetitive manual workflows—data entry, lead routing, invoice generation, report delivery—and automate them completely. Our tools of choice include n8n, Make (Integromat), and custom Python scripts that integrate with your existing software stack." },
  { icon: <Zap className="w-6 h-6" />, title: "LLM & OpenAI API Development", desc: "We integrate GPT-4, Claude, Gemini, and open-source models directly into your applications, internal tools, and customer-facing products. From AI-powered search and content generators to intelligent data extraction systems—we architect an AI-native advantage for your business." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Predictive Analytics & Machine Learning", desc: "We build and deploy supervised machine learning models that forecast customer churn, predict lifetime value, identify optimal pricing opportunities, and surface sales signals buried in your operational data—giving your leadership team the intelligence to act before competitors." },
];

export default function AiServices() {
  return (
    <div className="pt-20">
      <SEO
        title="AI Automation & Chatbot Development Dubai | Asif Digital"
        description="Dubai's leading AI services company. We build intelligent chatbots, automation workflows, and custom LLM integrations that transform UAE business operations and reduce costs."
      />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">AI Services — Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            The Future of Business<br /><span className="italic text-white/40">is Intelligent.</span>
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
            AI is no longer the future—it is the present competitive advantage. Businesses that automate intelligently right now will be the ones that dominate their categories in 2026 and beyond. We make that transformation achievable, practical, and genuinely profitable for UAE enterprises of all sizes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Book An AI Strategy Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "60%", l: "Avg Cost Reduction via Automation" }, { n: "24/7", l: "AI Chatbot Availability" }, { n: "3 weeks", l: "Avg Chatbot Deployment Time" }, { n: "GPT-4", l: "Latest Models Used" }].map((s, i) => (
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
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our AI Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Intelligent Solutions for Every Business Function</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/60 mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Technologies We Deploy</h2>
            <ul className="space-y-4">
              {["OpenAI GPT-4 & Assistants API", "Anthropic Claude & AWS Bedrock", "Google Gemini & Vertex AI", "n8n, Make (Integromat) & Zapier", "LangChain & LlamaIndex frameworks", "Vector databases: Pinecone, Weaviate", "Python, FastAPI & Node.js backends", "WhatsApp Business API integration"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Book An AI Strategy Session</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">In 60 minutes, we will identify the highest-value AI automation opportunities in your specific business, estimate the time and cost savings, and outline an implementation roadmap with no obligation.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book Free Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
