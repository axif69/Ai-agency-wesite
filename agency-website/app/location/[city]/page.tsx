import { uaeLocations } from '../../../data/locations';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, MessageSquare, Monitor, Search, MapPin, Phone } from 'lucide-react';

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
  const seoLocationName = location.name.match(/\(([^)]+)\)/)?.[1] || location.name;
  return {
    title: `Web Design, WhatsApp Automation & SEO ${seoLocationName} | Asif Digital`,
    description: `High-conversion Next.js web development, official WhatsApp Business API automation, and local SEO for businesses in ${location.name}, ${location.emirate}. Transparent pricing and fast UAE delivery.`,
    alternates: {
      canonical: `https://www.asifdigital.agency/location/${location.slug}`,
    },
    openGraph: {
      title: `Web Design, WhatsApp Automation & SEO in ${location.name} | Asif Digital`,
      description: `Bespoke websites and WhatsApp automation systems engineered to capture and qualify customer enquiries across ${location.name} and ${location.emirate}.`,
      url: `https://www.asifdigital.agency/location/${location.slug}`,
      siteName: "Asif Digital",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: "https://www.asifdigital.agency/images/showcase/lead-generation-website-mockup.png",
          width: 1800,
          height: 1200,
          alt: `Asif Digital Web Design and Automation Services in ${location.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Web Design & AI Automation ${location.name} | Asif Digital`,
      description: `Fast Next.js websites and WhatsApp lead automation for businesses in ${location.name}, ${location.emirate}.`,
      images: ["https://www.asifdigital.agency/images/showcase/lead-generation-website-mockup.png"]
    }
  };
}

export default function LocationPage({ params }: Props) {
  const location = uaeLocations.find((loc) => loc.slug === params.city) || uaeLocations[0];

  return (
    <div className="relative bg-[#050505] text-white min-h-screen pt-28 pb-20 overflow-hidden font-sans">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Hero Section ── */}
        <div className="py-12 md:py-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/80 font-semibold">
              UAE Service Coverage &mdash; {location.emirate} &bull; {location.name}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.08] tracking-tight mb-6">
            Web Design, WhatsApp Automation &amp; SEO for Businesses in <span className="italic text-white/70">{location.name}.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 font-light leading-relaxed mb-8 max-w-3xl">
            Asif Digital builds conversion-focused Next.js websites and automated WhatsApp qualification workflows for businesses across {location.name}. We help commercial firms, real estate brokerages, and service providers in {location.emirate} turn search traffic into qualified enquiries.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Link
              href="/free-growth-audit"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-neutral-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2 min-h-[48px]"
            >
              <span>Book Free Growth Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/971545866094?text=${encodeURIComponent(`Hi Asif, I am enquiring about web design and digital systems for my business in ${location.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/[0.06] transition-all flex items-center gap-2 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* ── 2. Regional Delivery Model ── */}
        <section className="py-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold block mb-3">
                REGIONAL DELIVERY &amp; SERVICE MODEL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mb-6">
                Direct Technical Engineering &mdash; <span className="italic text-white/70">No Outsource Markups.</span>
              </h2>
              <div className="space-y-4 text-white/70 font-light leading-relaxed text-base">
                <p>
                  As a digital engineering studio based in Muwaileh Commercial, Sharjah, Asif Digital works directly with business owners, founders, and operations directors across {location.emirate}. Whether your physical team is located in {location.name} or your campaigns target commercial clients in this district, we deliver tailored digital infrastructure built for UAE customer behavior.
                </p>
                <p>
                  UAE customers expect immediate responses. If a prospect from {location.name} reaches out via Google Search, Instagram, or a property portal and waits hours for a reply, they contact your competitor. We solve this by coupling fast Next.js websites directly to official WhatsApp Cloud API assistants designed to qualify inquiries automatically.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="text-2xl font-serif font-bold text-white mb-1">2–4 Wks</div>
                  <div className="text-xs text-white/60">Standard Delivery Timeline</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="text-2xl font-serif font-bold text-emerald-400 mb-1">Instant</div>
                  <div className="text-xs text-white/60">Automated Bot Intake Target</div>
                </div>
              </div>
            </div>

            {/* Core Solutions Grid */}
            <div className="space-y-5">
              {[
                {
                  title: "High-Speed Next.js Websites",
                  desc: `Bespoke web applications built on React and Next.js. Engineered with semantic HTML5, optimized Core Web Vitals, minimal layout shift, and mobile-first navigation to turn local ${location.emirate} visitors into qualified telephone calls and WhatsApp leads.`,
                  icon: <Monitor className="w-5 h-5 text-blue-400" />,
                  link: "/services/web-design-dubai",
                  linkLabel: "View Web Design Services"
                },
                {
                  title: "Official WhatsApp Cloud API Automation",
                  desc: "Connect your official WhatsApp Business number directly to automated intake workflows. Our assistants handle bilingual English & Arabic inquiries, answer FAQs, qualify budgets, and immediately notify your sales team.",
                  icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
                  link: "/services/whatsapp-automation-gcc",
                  linkLabel: "Explore WhatsApp Automation"
                },
                {
                  title: "Local UAE Google Search Visibility",
                  desc: `Technical SEO and structured Schema.org markup designed to capture commercial-intent searches in ${location.name} and across the UAE, ensuring your brand appears prominently on Google Search and AI answer engines.`,
                  icon: <Search className="w-5 h-5 text-purple-400" />,
                  link: "/services/seo-agency-dubai-sharjah-uae",
                  linkLabel: "Learn About Local SEO"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/65 font-light leading-relaxed mb-4">{item.desc}</p>
                  <Link href={item.link} className="text-xs font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors">
                    {item.linkLabel} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Operating Commitments & Pricing ── */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold block mb-2">
              TRANSPARENT COMMERCIAL PARAMETERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mb-4">
              Clear Expectations &mdash; <span className="italic text-white/70">No Surprises.</span>
            </h2>
            <p className="text-white/70 font-light text-base">
              We operate on transparent, fixed-scope proposals tailored to your specific business requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Typical Investment</div>
              <div className="text-2xl font-serif font-bold text-white mb-3">AED 2,500 – 10,000+</div>
              <p className="text-xs text-white/65 leading-relaxed font-light">
                Depends on website scale, bespoke system integrations, and CRM complexity. We confirm a fixed-cost quote during our free initial discovery audit.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Implementation Speed</div>
              <div className="text-2xl font-serif font-bold text-white mb-3">2 to 4 Weeks</div>
              <p className="text-xs text-white/65 leading-relaxed font-light">
                Standard corporate landing pages and WhatsApp assistant workflows are deployed within 2 to 4 weeks, with live milestone reviews throughout.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Technical Ownership</div>
              <div className="text-2xl font-serif font-bold text-white mb-3">100% Client-Owned</div>
              <p className="text-xs text-white/65 leading-relaxed font-light">
                You retain complete ownership of all repository code, domains, Meta Cloud API assets, and analytics accounts. Zero proprietary vendor lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. Related Hubs Navigation ── */}
        <section className="py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-serif text-white mb-1">Explore Core Solution Hubs</h3>
              <p className="text-xs text-white/60">Navigate to our in-depth regional architectures and specialized industry systems.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Link href="/services/web-design-dubai" className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] transition-colors">
                Web Design Dubai
              </Link>
              <Link href="/web-design-sharjah" className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] transition-colors">
                Web Design Sharjah
              </Link>
              <Link href="/real-estate-crm-dubai" className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] transition-colors">
                Real Estate CRM
              </Link>
              <Link href="/free-growth-audit" className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors">
                Free Growth Audit
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. Call to Action ── */}
        <div className="mt-8 text-center bg-gradient-to-b from-[#0d0d0d] to-[#050505] border border-white/10 p-12 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
              Need More Inquiries From Your Website in <span className="italic text-white/70">{location.name}?</span>
            </h2>
            <p className="text-white/60 mb-8 font-light text-base leading-relaxed">
              Claim a complimentary diagnostic review of your website speed, advertising landing pages, and WhatsApp response workflows. We will provide an actionable 1-page roadmap within 2 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/free-growth-audit"
                className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-neutral-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>Request Your Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/971545866094"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call / WhatsApp +971 54 586 6094</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
