"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";

interface RealEstateRoiCalculatorProps {
  id?: string;
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  ctaTargetId?: string;
}

export default function RealEstateRoiCalculator({
  id = "roi-calculator",
  title = "Real Estate Lead Decay & Revenue Leakage Calculator",
  subtitle = "Estimate how slow response times and after-hours delays impact monthly deal conversion in Dubai's high-speed market.",
  showCta = true,
  ctaTargetId = "crm-enquiry",
}: RealEstateRoiCalculatorProps) {
  const [monthlyLeads, setMonthlyLeads] = useState(300);
  const [avgCommission, setAvgCommission] = useState(50000);
  const [avgResponseTimeMinutes, setAvgResponseTimeMinutes] = useState(45);

  // Transparent, empirical speed-to-lead decay calculation
  const decayFactor = Math.min(0.35, (avgResponseTimeMinutes / 60) * 0.15 + 0.05);
  const estimatedDealsLost = Math.max(1, Math.round(monthlyLeads * decayFactor * 0.08));
  const estimatedMonthlyRevenueLost = estimatedDealsLost * avgCommission;
  const estimatedAnnualRevenueLost = estimatedMonthlyRevenueLost * 12;

  return (
    <div
      id={id}
      className="rounded-3xl border border-red-500/20 bg-black/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-white">{title}</h3>
            <p className="text-[11px] text-white/60 font-light mt-0.5">{subtitle}</p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-red-400/30 bg-red-500/10 text-red-300">
          Interactive Model
        </span>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-5 text-xs font-sans">
        <div>
          <div className="flex justify-between text-white/70 mb-1.5">
            <span>Monthly Portal &amp; Ad Inquiries:</span>
            <span className="font-mono font-bold text-white text-sm">
              {monthlyLeads.toLocaleString()} Leads/mo
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={monthlyLeads}
            onChange={(e) => setMonthlyLeads(Number(e.target.value))}
            aria-label="Monthly portal and ad leads"
            className="w-full accent-red-400 bg-white/10 rounded-lg cursor-pointer h-2"
          />
        </div>

        <div>
          <div className="flex justify-between text-white/70 mb-1.5">
            <span>Average Commission Per Closed Deal (AED):</span>
            <span className="font-mono font-bold text-white text-sm">
              AED {avgCommission.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="15000"
            max="250000"
            step="5000"
            value={avgCommission}
            onChange={(e) => setAvgCommission(Number(e.target.value))}
            aria-label="Average commission per deal in AED"
            className="w-full accent-red-400 bg-white/10 rounded-lg cursor-pointer h-2"
          />
        </div>

        <div>
          <div className="flex justify-between text-white/70 mb-1.5">
            <span>Average First-Response Delay:</span>
            <span className="font-mono font-bold text-red-400 text-sm">
              {avgResponseTimeMinutes} Minutes
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="180"
            step="5"
            value={avgResponseTimeMinutes}
            onChange={(e) => setAvgResponseTimeMinutes(Number(e.target.value))}
            aria-label="Average broker response delay in minutes"
            className="w-full accent-red-400 bg-white/10 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Output Metrics Card */}
        <div className="p-5 rounded-2xl bg-red-950/25 border border-red-500/30 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-white/80">
            <span>Estimated Deals Lost Monthly:</span>
            <span className="text-red-400 font-bold text-sm">{estimatedDealsLost} Deals</span>
          </div>
          <div className="flex justify-between items-center text-white/80">
            <span>Estimated Monthly Commission Lost:</span>
            <span className="text-red-400 font-bold text-sm">
              AED {estimatedMonthlyRevenueLost.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-white/90 pt-3 border-t border-white/10">
            <span className="font-sans text-xs">Projected Annual Opportunity Loss:</span>
            <span className="text-red-300 font-bold text-base sm:text-lg">
              AED {estimatedAnnualRevenueLost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Recovery Highlight Banner */}
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-400/20 text-[11px] text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Target: Sub-60-second automated WhatsApp qualification</span>
          </span>
          <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase">
            Recoverable Pipeline
          </span>
        </div>

        {/* Disclaimer Note */}
        <p className="text-[10px] text-white/40 leading-relaxed italic">
          *Illustrative Model: Figures are calculated estimates based on entered parameters and typical UAE brokerage response curves. Actual conversion results depend on lead source quality, inventory availability, and sales team execution.
        </p>

        {/* Optional Action Anchor */}
        {showCta && (
          <div className="pt-2 text-center">
            <a
              href={`#${ctaTargetId}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full transition-colors"
            >
              <span>Stop Lead Decay — Request Custom Setup Audit</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
