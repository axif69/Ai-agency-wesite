import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, FileText, MapPin, TrendingUp, Link2, BarChart3, CheckCircle } from "lucide-react";

const pillars = [
  { icon: <Search className="w-6 h-6" />, title: "Technical SEO Audits & Remediation", desc: "We crawl your website the same way Googlebot does and produce an exhaustive technical audit identifying every crawl error, broken link, duplicate content issue, slow page, and missing schema markup. We then systematically fix every blocker—not just flag them in a PDF report." },
  { icon: <FileText className="w-6 h-6" />, title: "Content Strategy & Authority Writing", desc: "Ranking requires becoming the authoritative expert source on your topic. We research high-intent keywords your ideal UAE customers search, create comprehensive content strategy roadmaps, and produce expert-authored long-form content that earns Google's trust and your ideal client's attention." },
  { icon: <MapPin className="w-6 h-6" />, title: "Local SEO for Dubai & Sharjah", desc: "Appearing in the Google Maps 'Local Pack' for Dubai, Sharjah, and UAE searches is often more valuable than a page-1 ranking. We optimize your Google Business Profile, build consistent NAP citations across UAE business directories, and create hyperlocal landing pages that dominate the map pack." },
  { icon: <Link2 className="w-6 h-6" />, title: "Link Building & Domain Authority", desc: "Links remain the single most powerful ranking factor. We execute white-hat digital PR campaigns, guest post outreach on authoritative UAE and global publications, and broken-link building to steadily elevate your domain authority and outrank well-established competitors." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "On-Page & E-E-A-T Optimization", desc: "Every page is precisely optimized for its target keywords—title tags, headings, content depth, internal linking, image alt attributes, and readability scores. We align every page with Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Monthly Rank Tracking & Reporting", desc: "We provide full transparency with monthly keyword ranking reports, traffic analytics, backlink acquisition summaries, and competitive analysis. You always know exactly where you stand and what is driving your growth." },
];

export default function SEOPage() {
  return (
    <div className="pt-20">
      <SEO
        title="SEO Agency Dubai & Sharjah | Rank #1 on Google | Asif Digital"
        description="Dubai's most results-focused SEO agency. We rank businesses on page 1 of Google for high-value UAE search terms using technical SEO, content authority, and link building. Free audit available."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "SEO & Organic Growth Services",
          "description": "Premium SEO services in Dubai and Sharjah focusing on technical audits, content authority, and link building for UAE enterprises.",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" },
            { "@type": "City", "name": "Abu Dhabi" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "SEO Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audit" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO & GMB Optimization" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Authority Strategy" } }
            ]
          }
        }}
        faqSchema={[
          {
            question: "How long does it take to rank on page 1 of Google in Dubai?",
            answer: "Most UAE businesses see significant ranking improvements within 90 days. Competitive keywords in the Dubai market typically take 4-6 months to reach the top 3 positions using our authority-building methodology."
          },
          {
            question: "What is the difference between SEO and AEO?",
            answer: "SEO optimizes for traditional search engines like Google, whereas AEO (Answer Engine Optimization) optimizes for AI-driven platforms like Gemini, ChatGPT, and Perplexity. We implement both to ensure your brand is cited as the primary answer across all platforms."
          },
          {
            question: "Do you provide local SEO for Sharjah and Abu Dhabi businesses?",
            answer: "Yes, we specialize in multi-location UAE SEO. We optimize your Google Business Profiles and create geo-targeted landing pages to ensure you dominate the 'Local Pack' in Dubai, Sharjah, Abu Dhabi, and beyond."
          },
          {
            question: "Is your SEO work compliant with Google's latest AI updates?",
            answer: "Absolutely. We focus on Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines, which are specifically designed to reward high-quality, expert-authored content in the age of AI search."
          }
        ]}
      />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">SEO — Dubai & Sharjah UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            Page 1 of Google.<br /><span className="italic text-white/90">Guaranteed Results.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-2xl mb-12">
            91.5% of Google traffic goes to page 1 results. If your business isn't ranking there for your most valuable keywords, you are invisible to the customers who are right now actively searching for what you sell. We change that, permanently.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" aria-label="Get A Free SEO Audit and Start Your SEO Project" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get A Free SEO Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
            <Link to="/case-studies" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View SEO Case Studies
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Visibility <span className="italic">Redefined</span>
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Expert SEO and Search Engine Marketing Agency Dubai" 
          className="sr-only"
          loading="lazy"
        />
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "87%", l: "of Clients Reach Page 1" }, { n: "90 days", l: "Avg. Time to First Rankings" }, { n: "320%", l: "Avg Organic Traffic Growth" }, { n: "5+", l: "Years UAE SEO Experience" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-serif mb-2">{s.n}</div>
              <div className="text-white/95 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our SEO Methodology</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">A Comprehensive, Multi-Layer Approach</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/95 mb-5" role="img" aria-label={`${p.title} Icon`}>{p.icon}</div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/95 font-light leading-relaxed text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Your Monthly SEO Retainer Includes</h2>
            <ul className="space-y-4">
              {["Full technical audit and implementation", "10+ pages of expert SEO content monthly", "Google Business Profile management", "50+ quality backlinks per month", "Weekly keyword rank tracking", "Google Analytics & Search Console monitoring", "Monthly performance report with strategy notes", "Competitor ranking gap analysis"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/95 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/90 flex-shrink-0 mt-0.5" role="img" aria-label="Feature Included" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Stop Watching Competitors Rank Above You</h3>
            <p className="text-white/95 font-light text-sm leading-relaxed mb-8">Every day you are not on page 1, a competitor is getting the phone call, the inquiry, and the sale that should have been yours. Our free SEO audit tells you exactly what it will take to overtake them.</p>
            <Link to="/contact" aria-label="Book Your Free SEO Audit with Asif Digital" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book Free Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hidden SEO Image */}
      <img 
        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format,compress&fm=webp&q=75&w=1200" 
        alt="Best SEO Agency Dubai Sharjah | Rank 1 on Google UAE" 
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
              { title: "SEO + AEO", link: "/services/seo-aeo-specialist-dubai", desc: "The future of search: optimizing for AI-driven answer engines." },
              { title: "PPC Ads", link: "/services/ppc-google-meta-ads-agency-dubai", desc: "Instant traffic and leads while your organic authority builds." },
              { title: "SaaS Dev", link: "/services/saas-development-specialist-uae", desc: "Build unshakeable platforms that search engines love to rank." }
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
