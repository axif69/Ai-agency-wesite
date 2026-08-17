"use client";
import React from "react";
import { motion } from "framer-motion";
import { Scale, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-green-400 block mb-3">Commercial Terms & SLA</span>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4">Legal Framework & Terms of Engagement</h1>
        <p className="text-white/60 text-sm font-sans">
          Last Updated: August 2026 | Operating under United Arab Emirates Commercial Law.
        </p>
      </motion.div>

      <div className="space-y-12 text-white/80 font-sans font-light leading-relaxed text-sm md:text-base">
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <Scale className="w-5 h-5 text-green-400 shrink-0" />
            1. Scope of Engagement & Delivery
          </h2>
          <p>
            These Terms govern all digital services, web development, custom AI integrations, and automation workflows engineered by <strong>Asif Digital: AI Automation, Web & Graphic Design</strong>. All project deliverables, timelines, milestone sign-offs, and service-level agreements (SLAs) are defined within individual client Statements of Work (SOW).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <Cpu className="w-5 h-5 text-green-400 shrink-0" />
            2. Intellectual Property & Code Ownership
          </h2>
          <p>
            Upon receipt of full contract settlement:
          </p>
          <ul className="space-y-2 list-disc list-inside text-white/70 pl-2">
            <li><strong>Client Ownership:</strong> The client retains 100% intellectual property ownership over custom front-end code, client-specific database schemas, branding collateral, and custom UI components created for their business.</li>
            <li><strong>Proprietary Tooling:</strong> Pre-existing sovereign software libraries, general agent orchestrators, and agency base templates remain the underlying IP of Asif Digital, licensed perpetually to the client for their dedicated operational use.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-green-400 shrink-0" />
            3. Third-Party API Integrations & SLA Realities
          </h2>
          <p>
            Our systems integrate with third-party platforms (including Meta WhatsApp Cloud API, OpenAI API, Anthropic, Google Cloud, Bayut, and Property Finder). While Asif Digital guarantees clean, fault-tolerant integration code and sub-60-second webhook responsiveness, overall system availability is subject to third-party provider infrastructure uptime.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            4. Dispute Resolution & Jurisdiction
          </h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising in connection with agency agreements shall be subject to the exclusive jurisdiction of the competent courts of Sharjah or Dubai, UAE.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs">
        <Link href="/" className="text-white/60 hover:text-white transition-colors">← Return to Home</Link>
        <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">View Privacy Architecture →</Link>
      </div>
    </div>
  );
}
