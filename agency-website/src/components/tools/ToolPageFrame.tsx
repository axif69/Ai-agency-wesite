"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const fieldClass = "tool-field w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition focus:border-green-400/60 focus:ring-2 focus:ring-green-400/10 placeholder:text-white/30";
export const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-white/60";
export const panelClass = "rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-6 md:p-8";

type FAQ = { q: string; a: string };
type Related = { title: string; href: string; description: string };

interface ToolPageFrameProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  methodologyTitle: string;
  methodology: string[];
  guideTitle: string;
  guide: { title: string; text: string }[];
  faqs: FAQ[];
  related: Related[];
}

export default function ToolPageFrame({ eyebrow, title, description, children, methodologyTitle, methodology, guideTitle, guide, faqs, related }: ToolPageFrameProps) {
  return (
    <div className="bg-[#050505]">
      <section className="px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-white/45">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><span>/</span>
            <span className="text-white/70">{eyebrow}</span>
          </nav>
          <div className="max-w-5xl">
            <span className="micro-label mb-5 block text-green-400">{eyebrow}</span>
            <h1 className="max-w-5xl text-4xl font-serif font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">{description}</p>
            <div className="mt-7 flex flex-wrap gap-4 text-xs font-semibold text-white/60">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" /> Free immediate result</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-400" /> No account required</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" /> Transparent methodology</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#080808] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="micro-label mb-4 block text-green-400">Transparent by design</span>
            <h2 className="text-3xl font-serif tracking-tight md:text-5xl">{methodologyTitle}</h2>
            <p className="mt-6 leading-relaxed text-white/55">AI explains measured inputs and generates recommendations. It does not replace a full technical or advertising-account audit.</p>
          </div>
          <div className="space-y-4">
            {methodology.map((item, index) => (
              <div key={item} className="flex gap-5 rounded-2xl border border-white/5 bg-white/[0.025] p-5">
                <span className="font-serif text-2xl text-green-400/70">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed text-white/65">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#080808] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="micro-label mb-4 block text-green-400">Practical guidance</span>
          <h2 className="max-w-4xl text-3xl font-serif tracking-tight md:text-5xl">{guideTitle}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {guide.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-white/5 bg-black p-7 md:p-9">
                <h3 className="text-xl font-serif">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
        <span className="micro-label mb-4 block text-green-400">Questions answered</span>
        <h2 className="text-3xl font-serif tracking-tight md:text-5xl">Frequently Asked Questions</h2>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                {faq.q}<span className="text-green-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pt-4 text-sm leading-relaxed text-white/60">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><span className="micro-label mb-3 block text-green-400">Continue diagnosing</span><h2 className="text-3xl font-serif">Related free tools</h2></div>
            <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/55 hover:text-white">View all tools <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.05]">
                <h3 className="text-xl font-serif group-hover:text-green-300">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{item.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-16 border-t border-white/5 pt-8 text-xs leading-relaxed text-white/35">
            Methodology designed and reviewed by Asif Khan, Founder of Asif Digital. Last substantively reviewed July 2026. Results are directional and are not a guarantee of rankings, revenue or campaign performance.
          </div>
        </div>
      </section>
    </div>
  );
}
