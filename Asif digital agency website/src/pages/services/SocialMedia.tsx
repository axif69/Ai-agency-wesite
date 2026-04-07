import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Megaphone, Video, BarChart3, Share2, Users, TrendingUp, Calendar } from "lucide-react";

const services = [
  { icon: <Megaphone className="w-6 h-6" />, title: "Social Media Strategy", desc: "A tailored content strategy aligned with your brand that resonates with UAE audiences across Instagram, TikTok, LinkedIn, and Twitter/X. We map your audience, competitors, and content pillars before a single post goes live." },
  { icon: <Video className="w-6 h-6" />, title: "Content Creation & Reels", desc: "Thumb-stopping Reels, branded static graphics, and compelling copywriting that builds a loyal community and drives real engagement. Our in-house designers and video editors handle everything from concept to publish." },
  { icon: <Instagram className="w-6 h-6" />, title: "Community Management", desc: "We respond to comments, DMs, and mentions in your brand's voice—building genuine relationships that translate to trust and sales. Average response time under 2 hours during UAE business hours." },
  { icon: <Share2 className="w-6 h-6" />, title: "Influencer Marketing", desc: "End-to-end influencer campaign management—from sourcing and vetting UAE micro and macro influencers, to contract negotiation, content briefing, and performance tracking across all collaboration types." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Paid Social Advertising", desc: "Meta Ads (Instagram & Facebook) and TikTok Ads campaigns designed to reach your ideal UAE customer with precision targeting by age, location, interest, and behaviour. Managed by certified specialists." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Analytics & Monthly Reporting", desc: "Transparent monthly reports detailing reach, impressions, follower growth, engagement rates, story views, and direct attribution to website traffic and leads—with clear explanations, not just numbers." },
];

const platforms = ["Instagram", "TikTok", "LinkedIn", "Facebook", "Twitter/X", "Snapchat", "YouTube Shorts", "Pinterest"];

const results = [
  { n: "28K", l: "Followers Gained in 12 Months", sub: "Aurum Café, Sharjah" },
  { n: "5×", l: "Revenue Increase", sub: "F&B client via social-driven footfall" },
  { n: "14K", l: "Avg. Post Reach (from 200)", sub: "Post organic optimisation" },
  { n: "AED 280K", l: "Social-Attributable Revenue", sub: "Noor Fashion, Dubai" },
];

const plans = [
  { name: "Starter", price: "AED 2,500", desc: "For new and small businesses building their first social presence", includes: ["2 platforms managed", "12 posts / month", "3 Reels / month", "Basic community management", "Monthly report"] },
  { name: "Growth", price: "AED 4,500", desc: "For established businesses ready to accelerate follower growth", includes: ["3 platforms managed", "20 posts / month", "8 Reels / month", "Full community management", "1 influencer collaboration / month", "Paid ads management (up to AED 3K spend)", "Bi-weekly report & call"] },
  { name: "Authority", price: "AED 8,500", desc: "For brands that want to dominate their category on social", includes: ["All platforms", "30+ posts / month", "16 Reels + TikToks / month", "24/7 community management", "3 influencer collaborations / month", "Full paid social management", "Weekly strategy call", "Dedicated account manager"] },
];

const faqs = [
  { q: "How long before we see results on social media?", a: "Community growth is a 3–6 month journey. Most clients see significant engagement improvement within 6–8 weeks, and meaningful follower growth milestones within 3 months. Paid social results (from Meta Ads) can be seen within days of campaign launch." },
  { q: "Do you create the content or do we need to supply it?", a: "We handle everything—graphic design, Reels scripting, copywriting, and scheduling. For businesses that want to show behind-the-scenes content, we can coordinate shooting days and provide detailed content briefs for your team to capture." },
  { q: "Do you manage posting or just create content?", a: "We handle the full cycle: strategy, creation, scheduling via professional tools, publishing at optimal times for UAE audiences, community management, and reporting. You approve content before it goes live." },
  { q: "Will you work in Arabic for UAE audiences?", a: "Yes. We have native Arabic and English copywriters on the team and can create bilingual content strategies tailored to both GCC and Western expatriate audiences in the UAE." },
];

export default function SocialMedia() {
  return (
    <div className="pt-20">
      <SEO
        title="Social Media Management Agency Dubai & UAE | Asif Digital"
        description="Professional social media management for Dubai and Sharjah businesses. We grow your Instagram, TikTok, and LinkedIn with compelling content, Reels, influencer campaigns, and Meta Ads."
      />

      {/* Hero */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Social Media — Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            A Social Presence<br /><span className="italic text-white/90">Worth Following.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-2xl mb-12">
            We manage your entire social media ecosystem—from strategy and content creation to community management and paid amplification—turning followers into loyal customers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" aria-label="Let's Grow Your Brand and Start Your Social Media Project" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Let's Grow Your Brand <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
            <Link to="/case-studies" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              See Our Results
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Results Strip */}
      <section className="px-6 md:px-12 py-16 bg-white/[0.02] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-serif mb-2">{r.n}</div>
              <div className="text-white/95 text-sm font-medium mb-1">{r.l}</div>
              <div className="text-white/90 text-xs">{r.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-serif max-w-2xl">Full-Service Social Media Management</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/25 transition-colors">
                <div className="text-white/95 mb-5" role="img" aria-label={`${s.title} Icon`}>{s.icon}</div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-white/95 font-light leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="px-6 md:px-12 py-16 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-8">Platforms We Manage</span>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p, i) => (
              <span key={i} className="border border-white/15 text-white/95 px-5 py-2.5 rounded-full text-sm font-medium">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Monthly Retainers</span>
            <h2 className="text-4xl md:text-5xl font-serif">Choose Your Plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-8 rounded-2xl border flex flex-col ${i === 1 ? "border-white/50 bg-white/[0.04]" : "border-white/10"}`}>
                {i === 1 && <span className="text-[10px] font-bold uppercase tracking-widest text-white/95 mb-4 block">Most Popular</span>}
                <h3 className="text-2xl font-serif mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}<span className="text-sm text-white/90 font-normal"> / mo</span></div>
                <p className="text-white/95 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-1 h-1 bg-white/50 rounded-full flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`w-full py-3 rounded-full font-bold uppercase tracking-widest text-xs text-center transition-colors ${i === 1 ? "bg-white text-black hover:bg-white/80" : "border border-white/20 hover:border-white text-white"}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-white/10 rounded-2xl p-8">
                <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-white/95 font-light text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Your audience is already scrolling.<br /><span className="italic text-white/40">Are they seeing you?</span></h2>
          <p className="text-white/50 text-lg font-light mb-10">Book a free strategy call and we'll audit your current presence and show you exactly how to grow.</p>
          <Link to="/contact" aria-label="Book Your Free Social Media Strategy Audit" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
            Book Free Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
