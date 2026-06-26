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
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Digital Transformation Agency in {location.name}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering {location.emirate} enterprises with Sovereign AI, High-Performance Web Design, and Agentic Workflow Automation localized for {location.keyword}.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Why Choose Us in {location.name}?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The digital landscape in {location.name} is fiercely competitive. To stand out, businesses need more than just a standard website—they need an intelligent, automated sales engine.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              At Asif Digital, we specialize in building custom AI chatbots, highly-optimized e-commerce platforms, and SEO campaigns designed specifically for the {location.emirate} market. Whether you're a startup in {location.keyword} or an established enterprise, our scalable solutions drive guaranteed ROI.
            </p>
            <ul className="space-y-3 mt-6 text-gray-300">
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">✓</span> Localized SEO strategies for {location.name}
              </li>
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">✓</span> AI-driven lead generation
              </li>
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">✓</span> Lightning-fast web design & development
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800/50 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-xl font-medium mb-2">Web Design & Development</h3>
              <p className="text-sm text-gray-400">Custom Next.js and React applications built to load instantly and convert visitors across {location.emirate}.</p>
            </div>
            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800/50 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-xl font-medium mb-2">Agentic AI Workflows</h3>
              <p className="text-sm text-gray-400">Automate your customer service and logistics with secure, local AI models built for the GCC market.</p>
            </div>
            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800/50 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-xl font-medium mb-2">Local SEO Domination</h3>
              <p className="text-sm text-gray-400">Rank #1 on Google maps and search results specifically for customers searching in {location.name}.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-black p-12 rounded-3xl border border-gray-800">
          <h2 className="text-3xl font-bold mb-4">Ready to dominate {location.name}?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Book a free technical consultation today and discover how our AI and web design solutions can scale your business.
          </p>
          <Link href="/contact" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 px-10 rounded-full transition-transform hover:scale-105">
            Book Free Consultation
          </Link>
        </div>

      </div>
    </div>
  );
}
