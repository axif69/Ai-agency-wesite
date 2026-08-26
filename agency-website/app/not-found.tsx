"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, Home, Search, Bot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center space-y-8">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
          404 &bull; Page Not Found
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif tracking-tight">
          Looking for Something Specific?
        </h1>
        <p className="text-white/70 font-light text-base leading-relaxed max-w-lg mx-auto">
          The page you are looking for might have been relocated or upgraded. Explore our core service hubs below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto pt-2">
          <Link
            href="/services"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-bold text-white">All Agency Services</div>
              <div className="text-xs text-white/50">AI, Web & Design Systems</div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
          <Link
            href="/real-estate-digital-solutions-uae"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-bold text-white">Real Estate Digital AI</div>
              <div className="text-xs text-white/50">CRM & WhatsApp Workflows</div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
          <Link
            href="/ai-chatbots-dubai"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-bold text-white">AI Chatbots Dubai</div>
              <div className="text-xs text-white/50">24/7 Virtual Assistants</div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
          <Link
            href="/contact"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-bold text-white">Contact & Support</div>
              <div className="text-xs text-white/50">Dubai & Sharjah Office</div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap justify-center items-center gap-4">
          <Link
            href="/"
            className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <a
            href="https://wa.me/971545866094"
            className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
          </a>
        </div>
      </div>
    </div>
  );
}
