"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  RotateCcw,
  Zap,
  Layers,
  CheckCircle2,
} from "lucide-react";
import MagneticButton from "../animations/MagneticButton";
import ParticleLogoCanvas, {
  ParticleLogoCanvasHandle,
} from "./ParticleLogoCanvas";

export default function ParticleHeroSection() {
  const canvasRef = useRef<ParticleLogoCanvasHandle>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleDisperse = () => {
    canvasRef.current?.disperse();
  };

  const handleSwirl = () => {
    canvasRef.current?.swirl();
  };

  const handleAssemble = () => {
    canvasRef.current?.assemble();
  };

  const handleReset = () => {
    canvasRef.current?.reset();
  };

  return (
    <section className="relative min-h-[calc(100svh-var(--header-height,5.75rem))] w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-center px-6 sm:px-10 lg:px-14 pt-16 pb-12 sm:pt-20 md:pt-24 md:pb-16">
      {/* Clean high-contrast deep black backdrop */}
      <div className="absolute inset-0 bg-[#050505] pointer-events-none" />

      {/* ── 1. Top Centered Status Badge Capsule (Shifted Higher) ── */}
      <div className="w-full flex justify-center mb-3 sm:mb-5 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em]">
            Websites, WhatsApp Assistants & AI Automation in the UAE
          </span>
        </motion.div>
      </div>

      {/* ── 2. Broad 2-Column Split Hero Frame (Max-w-1440px) ── */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
        {/* Left Column: Hero Title & Value Proposition (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left pr-0 lg:pr-6">
          {/* Main Large Authority Headline (Expanded Scale & Lifted Up) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.2vw] xl:text-[4.8vw] font-serif font-bold leading-[1.04] tracking-tight mb-5 drop-shadow-2xl"
          >
            Websites and AI Automation, <br />
            <span className="italic text-white/70 tracking-normal pr-2">
              Built to Turn Visitors Into Enquiries.
            </span>
          </motion.h1>

          {/* Supporting Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/80 font-normal max-w-2xl font-sans leading-relaxed mb-7 drop-shadow-md"
          >
            Asif Digital Agency builds conversion-focused websites, improves search
            visibility, and creates WhatsApp and AI automation systems that help
            UAE businesses manage enquiries and follow up more effectively.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
          >
            <MagneticButton>
              <Link
                href="/free-growth-audit"
                aria-label="Book Free Growth Audit"
                className="bg-white text-black px-8 py-4 sm:px-9 sm:py-4.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-all flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer group"
              >
                <span>Book Free Growth Audit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-chatbot"));
                  }
                }}
                aria-label="See How It Works"
                className="bg-white/5 text-white border border-white/10 px-8 py-4 sm:px-9 sm:py-4.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md cursor-pointer"
              >
                <span>See How It Works</span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </button>
            </MagneticButton>
          </motion.div>

          {/* Micro Trust Proof Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs font-mono text-white/55 pt-3 border-t border-white/10 w-full max-w-xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Next.js Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sub-second Lead Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bilingual AR / EN</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Prominent, Larger Particle Logo Canvas (5 cols on lg, aligned right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="lg:col-span-5 relative flex items-center justify-end w-full min-h-[560px] sm:min-h-[660px] lg:min-h-[740px] pl-0 lg:pl-2"
        >
          {/* Particle Logo Canvas (scaled up, right-aligned) */}
          <ParticleLogoCanvas
            ref={canvasRef}
            className="w-full h-full"
            maxParticlesDesktop={20122}
            maxParticlesMobile={10000}
            showReferenceOverlay={showOverlay}
          />
        </motion.div>
      </div>

      {/* Interactive Physics Testing Sandbox Bar */}
      <div className="max-w-[1440px] mx-auto w-full mt-10 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-white/80 font-semibold">
            Particle Logo Physics Sandbox:
          </span>
          <span className="hidden md:inline text-white/40">
            Hover or touch the AD monogram on the right to interact in real time
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDisperse}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
            title="Disperse particles outward radially"
          >
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>Disperse / Blast</span>
          </button>

          <button
            type="button"
            onClick={handleSwirl}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
            title="Impart liquid rotational vortex"
          >
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>Swirl Vortex</span>
          </button>

          <button
            type="button"
            onClick={handleAssemble}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
            title="Spring pull back to target coordinates"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Re-assemble</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
            title="Reset to home positions immediately"
          >
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={() => setShowOverlay(!showOverlay)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
              showOverlay
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white/70"
            }`}
            title="Toggle faint silhouette overlay from asif_logoSIGNATURE.png to verify exact letter contour alignment"
          >
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>{showOverlay ? "Hide Mask Overlay" : "Verify Logo Mask (1:1)"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
