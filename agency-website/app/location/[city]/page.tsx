import { uaeLocations } from '../../../data/locations';
import Layout from '../../../src/components/Layout';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return uaeLocations.map((location) => ({
    city: location.slug,
  }));
}

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = uaeLocations.find((loc) => loc.slug === params.city) || uaeLocations[0];
  return {
    title: `Digital Marketing, AI & Web Design in ${location.name} | Asif Digital`,
    description: `Top-rated AI automation, SEO, and web design agency serving businesses in ${location.name}, ${location.emirate}. Scale your business with custom digital solutions today.`,
  };
}

export default function LocationPage({ params }: Props) {
  const location = uaeLocations.find((loc) => loc.slug === params.city) || uaeLocations[0];

  return (
    <div className="relative bg-[#050505] text-white min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              Sovereign Infrastructure in {location.name}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.0] tracking-tight mb-8 max-w-5xl mx-auto drop-shadow-2xl">
            Digital Transformation Agency <br /><span className="italic text-white/70">in {location.name}.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
            Empowering {location.emirate} enterprises with Sovereign AI, High-Performance Web Design, and Agentic Workflow Automation localized for {location.keyword}.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-[1.1]">
              Why Choose Us in <span className="italic text-white/70">{location.name}?</span>
            </h2>
            <div className="space-y-6 text-white/60 font-light leading-relaxed">
              <p>
                The digital landscape in {location.name} is fiercely competitive. To stand out, businesses need more than just a standard website—they need an intelligent, automated sales engine that runs 24/7 without human latency.
              </p>
              <p>
                At Asif Digital, we specialize in building custom AI chatbots, highly-optimized Next.js web platforms, and data-driven SEO campaigns designed specifically for the {location.emirate} market. Whether you're a startup in {location.keyword} or an established enterprise, our scalable architecture guarantees ROI.
              </p>
            </div>
            
            <ul className="space-y-4 mt-8 text-sm font-bold uppercase tracking-widest text-white/70">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center text-green-400">✓</div>
                Localized SEO strategies for {location.name}
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center text-green-400">✓</div>
                Autonomous AI Lead Generation
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center text-green-400">✓</div>
                High-Performance Web Architecture
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            {[
              { title: "Web Design & Development", desc: `Custom Next.js and React applications built to load instantly and convert visitors across ${location.emirate}.` },
              { title: "Agentic AI Workflows", desc: "Automate your customer service and logistics with secure, local AI models built for the GCC market." },
              { title: "Local SEO Domination", desc: `Rank #1 on Google maps and search results specifically for high-intent customers searching in ${location.name}.` }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-serif mb-3 text-white/90">{feature.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-[#0a0a0a] border border-white/10 p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Ready to dominate <span className="italic text-white/70">{location.name}?</span></h2>
            <p className="text-white/50 mb-10 max-w-2xl mx-auto font-light text-lg">
              Book a free technical consultation today and discover how our AI and web design solutions can scale your operations in {location.emirate}.
            </p>
            <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95">
              Book an Operational Audit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
