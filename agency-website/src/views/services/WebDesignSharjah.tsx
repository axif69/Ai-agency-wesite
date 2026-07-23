"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, MessageSquare, Search, Smartphone, X, Zap } from "lucide-react";

const features = [
  {
    title: "Local service pages",
    copy: "Pages written around the exact services and areas you want enquiries from, without duplicate doorway-page content."
  },
  {
    title: "WhatsApp-first conversion",
    copy: "Clear call, WhatsApp and form CTAs so visitors can contact you quickly from mobile."
  },
  {
    title: "Fast mobile experience",
    copy: "Clean layouts, compressed assets and responsive sections built for UAE mobile users."
  },
  {
    title: "Search-friendly structure",
    copy: "Page titles, headings, internal links, FAQs and schema basics prepared for Google and AI search visibility."
  }
];

const showcase = [
  {
    title: "Modern AI agency website",
    copy: "Sharp hero, service proof, FAQs, booking CTA and lead magnets for high-trust service businesses.",
    image: "/images/showcase/ai-agency-website-mockup.png"
  },
  {
    title: "Lead-generation service website",
    copy: "Property, clinic, consultant or contractor-style pages with local trust blocks and WhatsApp enquiry flow.",
    image: "/images/showcase/lead-generation-website-mockup.png"
  },
  {
    title: "Premium corporate website",
    copy: "Clean authority pages with case-study sections, motion-ready layouts and conversion-focused forms.",
    image: "/images/showcase/corporate-website-mockup.png"
  }
];

const faqs = [
  {
    q: "How much does website design cost in Sharjah?",
    a: "A basic business website usually starts from AED 2,500 to AED 5,000. A stronger lead-generation website with service pages, SEO structure, WhatsApp CTAs and custom sections can cost more depending on content, design depth and integrations."
  },
  {
    q: "Can you make my website rank in Sharjah searches?",
    a: "We can build the technical and content foundation for local SEO: fast pages, proper titles, service sections, FAQs, internal links and local intent copy. Rankings also depend on competition, backlinks, reviews, Google Business Profile strength and consistent content."
  },
  {
    q: "Can you add WhatsApp and lead forms?",
    a: "Yes. We can add WhatsApp buttons, enquiry forms, quote request forms and a simple lead routing process so enquiries reach your email, WhatsApp or CRM."
  },
  {
    q: "Do you build websites for Dubai and Sharjah businesses?",
    a: "Yes. We work with businesses across Sharjah, Dubai, Ajman and the wider UAE. This page is focused on companies looking specifically for a web design company in Sharjah."
  },
  {
    q: "How long does a website take?",
    a: "A small service website can usually be planned and built in 2 to 4 weeks. Larger websites with many service pages, bilingual Arabic/English layouts, ecommerce or custom integrations take longer."
  }
];

export default function WebDesignSharjah() {
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24">
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <p className="micro-label mb-5">Web Design Company Sharjah</p>
          <h1 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-tight">
            Web Design Company Sharjah for local leads, calls and WhatsApp enquiries.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
            Asif Digital builds fast, modern, SEO-ready websites for Sharjah businesses that need clearer services, stronger trust, mobile performance and simple enquiry funnels.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link href="/free-growth-audit" className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
              Book Free Website Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/web-design-dubai-sharjah" className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/15 px-7 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
              See Dubai Web Design Page
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <Image
            src="/images/showcase/lead-generation-website-mockup.png"
            alt="High quality website mockup for a lead generation landing page"
            width={1800}
            height={1200}
            priority
            className="rounded-2xl border border-white/10 object-cover"
          />
          <p className="mt-4 text-sm text-white/50">Example website visual. Clickable showcase images are available below.</p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="micro-label mb-4">The real problem</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">A website should explain, prove and convert — not just look pretty.</h2>
            <p className="mt-6 text-white/65 leading-relaxed">
              Many Sharjah businesses rely on referrals, WhatsApp and repeat customers. That works until competitors start appearing above you on Google with clearer pages, stronger proof and easier enquiry buttons.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black p-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-4" />
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-white text-black rounded-[2rem] mx-4 md:mx-10">
        <div className="max-w-7xl mx-auto">
          <p className="micro-label text-black/50 mb-4">Website showcase</p>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight max-w-4xl">
            Website styles we can build around your offer.
          </h2>
          <p className="mt-5 text-black/60 max-w-2xl">
            These are original example mockups, not client websites and not external brand links. Click any image to zoom and inspect the visual direction.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {showcase.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setZoomImage(item.image)}
                className="group text-left rounded-3xl border border-black/10 bg-black/[0.03] overflow-hidden hover:-translate-y-1 transition"
              >
                <Image src={item.image} alt={item.title} width={1800} height={1200} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                  <p className="text-black/65 leading-relaxed">{item.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/50">
                    Open image zoom <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <p className="micro-label mb-4">Who this is for</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">Built for Sharjah service businesses that need more enquiries.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {["Clinics, salons and wellness businesses", "Real estate, maintenance and contracting companies", "Trading, industrial and B2B suppliers", "Consultants, training centres and professional services"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <Search className="w-5 h-5 text-emerald-400 mb-4" />
              <p className="text-white/70 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <div>
            <p className="micro-label mb-4">What we build</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">A full landing page system, not just a homepage.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              [Zap, "Fast pages", "Performance-focused pages that feel quick on mobile."],
              [MessageSquare, "Lead capture", "WhatsApp buttons, quote forms and clear booking CTAs."],
              [Smartphone, "Mobile-first UX", "Layouts designed for visitors who decide from their phone."]
            ].map(([Icon, title, copy]) => {
              const TypedIcon = Icon as typeof Zap;
              return (
                <div key={title as string} className="rounded-2xl border border-white/10 bg-black p-6">
                  <TypedIcon className="w-5 h-5 text-emerald-400 mb-4" />
                  <h3 className="font-semibold mb-3">{title as string}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{copy as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <p className="micro-label mb-4">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Questions people ask before hiring a web design company in Sharjah.</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <summary className="cursor-pointer font-semibold">{faq.q}</summary>
              <p className="mt-4 text-white/65 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 text-center border-t border-white/5">
        <h2 className="text-4xl md:text-6xl font-serif max-w-3xl mx-auto leading-tight">Want to know why your website is not getting leads?</h2>
        <p className="mt-6 text-white/60 max-w-2xl mx-auto">
          Send your website. We will review the page structure, mobile experience, CTA clarity and obvious local SEO gaps.
        </p>
        <Link href="/free-growth-audit" className="mt-9 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
          Book Free Website Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {zoomImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-10 flex items-center justify-center" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setZoomImage(null)}
            className="absolute right-5 top-5 rounded-full bg-white text-black p-3"
            aria-label="Close image zoom"
          >
            <X className="w-5 h-5" />
          </button>
          <Image src={zoomImage} alt="Zoomed website mockup" width={1800} height={1200} className="max-h-[90vh] w-auto rounded-2xl object-contain" />
        </div>
      )}
    </main>
  );
}
