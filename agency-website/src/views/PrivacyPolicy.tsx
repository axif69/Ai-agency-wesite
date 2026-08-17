"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-green-400 block mb-3">Compliance & Data Governance</span>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4">Privacy Architecture & Data Policy</h1>
        <p className="text-white/60 text-sm font-sans">
          Last Updated: August 2026 | Compliant with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL).
        </p>
      </motion.div>

      <div className="space-y-12 text-white/80 font-sans font-light leading-relaxed text-sm md:text-base">
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400 shrink-0" />
            1. Enterprise Data Custodianship
          </h2>
          <p>
            At <strong>Asif Digital: AI Automation, Web & Graphic Design</strong> (headquartered at Muwaileh Commercial - Industrial Area, Sharjah, UAE), we engineer sovereign digital infrastructure, web applications, and AI integrations. We respect the confidentiality and privacy of our enterprise partners, clients, and website visitors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <Lock className="w-5 h-5 text-green-400 shrink-0" />
            2. Scope of Collected Information
          </h2>
          <p>We collect only operational data necessary to scope and deliver digital and AI automation projects:</p>
          <ul className="space-y-2 list-disc list-inside text-white/70 pl-2">
            <li><strong>Contact Credentials:</strong> Full name, professional corporate email, phone/WhatsApp number, company name.</li>
            <li><strong>Technical Requirements:</strong> Project brief specifications, tech stack parameters, and integration preferences submitted via our audit intake tools.</li>
            <li><strong>Telemetry & Usage Data:</strong> Anonymized web interaction analytics to improve server responsiveness and UX performance across the UAE.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <Eye className="w-5 h-5 text-green-400 shrink-0" />
            3. AI Data Handling & Sovereign Isolation
          </h2>
          <p>
            When building custom AI chatbots, workflow automations, or WhatsApp agents:
          </p>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-1" />
              <p><strong>Zero Model Training:</strong> Client proprietary data, private CRM lead records, and customer communications are never used to train public LLM models.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-1" />
              <p><strong>UAE Data Residency Options:</strong> Enterprise deployments can be architected on local UAE cloud servers (AWS UAE, Azure UAE, G42 Khazna) in compliance with local regulations.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-1" />
              <p><strong>End-to-End Encryption:</strong> All API communications utilize TLS 1.3 encryption in transit and AES-256 at rest.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-white flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-400 shrink-0" />
            4. Direct Inquiries & Data Rights
          </h2>
          <p>
            Under UAE PDPL, you hold the right to review, rectify, or request erasure of your submitted corporate credentials. For any data inquiries, reach our Data Governance Officer directly:
          </p>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.01] text-xs font-mono space-y-1">
            <p>Direct Phone / WhatsApp: +971 54 586 6094</p>
            <p>Office: Muwaileh Commercial - Industrial Area, Sharjah, United Arab Emirates</p>
          </div>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs">
        <Link href="/" className="text-white/60 hover:text-white transition-colors">← Return to Home</Link>
        <Link href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">View Terms of Service →</Link>
      </div>
    </div>
  );
}
