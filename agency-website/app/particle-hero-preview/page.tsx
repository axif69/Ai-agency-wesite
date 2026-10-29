import type { Metadata } from "next";
import ParticleHeroSection from "../../src/components/particle-hero/ParticleHeroSection";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Particle Logo Hero Preview (Isolated) | Asif Digital Agency",
  description:
    "Isolated QA preview for the interactive particle logo hero animation derived from the authentic Asif Digital AD monogram signature asset.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ParticleHeroPreviewPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-black">
      {/* ── Top Isolated QA Notice Bar ── */}
      <div className="relative z-30 px-4 sm:px-6 py-2.5 border-b border-white/10 bg-black/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ISOLATED PROTOTYPE PREVIEW</span>
          </div>
          <span className="text-white/60 hidden sm:inline">
            Interactive AD Particle Monogram • Single Source of Truth
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-white/50">
          <span>Route: /particle-hero-preview</span>
          <span>•</span>
          <span className="text-emerald-400">Live Homepage Untouched</span>
        </div>
      </div>

      {/* ── Hero Section Under Test ── */}
      <ParticleHeroSection />

      {/* ── Technical QA & Logo Verification Details Section ── */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Asset & Architecture Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Logo Mask Extraction & Physics Integrity
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-3xl leading-relaxed">
              The particle animation is derived directly from the master asset{" "}
              <code className="text-emerald-400 bg-white/5 px-1.5 py-0.5 rounded">
                asif_logoSIGNATURE.png
              </code>
              . No third-party logos, redrawn shapes, or approximations were
              used. The normalized coordinate system preserves letterforms,
              spacing, and the circular silhouette at any resolution.
            </p>
          </div>

          {/* Grid of QA Proof Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Asset Fidelity */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  1:1 Mask Extraction
                </h3>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4">
                  Circle radius at 621.2px was isolated via PIL and NumPy. 4,050
                  high-precision coordinates were sampled across letter fill
                  (2,800), contour edges (900), and circular rim boundary (350).
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Coordinates:</span>
                <span>4,050 Normalized</span>
              </div>
            </div>

            {/* Card 2: Fluid Physics */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Spring-Damper Dynamics
                </h3>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4">
                  Hooke&apos;s law spring force (k=0.048, damping=0.84) ensures
                  crisp return-to-home behavior. Pointer disturbance triggers
                  tangential swirl vortexing with velocity flare.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Physics:</span>
                <span>Dynamic k=0.048</span>
              </div>
            </div>

            {/* Card 3: Performance & Accessibility */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  High-DPI & Accessibility
                </h3>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4">
                  Canvas DPR is capped at 2 for optimal GPU fill-rate. The loop
                  automatically pauses when off-screen or tab is hidden, and
                  renders a crisp static monogram for reduced-motion users.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Framerate:</span>
                <span>60 - 120 FPS</span>
              </div>
            </div>
          </div>

          {/* Master Logo Reference Verification Showcase */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Source Asset Cross-Verification</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-3 text-xs sm:text-sm text-white/70">
                <p>
                  <strong>Original Master Asset:</strong>{" "}
                  <code className="text-white bg-white/10 px-1 py-0.5 rounded">
                    public/images/asif_logoSIGNATURE.png
                  </code>
                </p>
                <p>
                  <strong>Derived Transparent Mask:</strong>{" "}
                  <code className="text-white bg-white/10 px-1 py-0.5 rounded">
                    public/images/asif_logo_transparent.png
                  </code>
                </p>
                <p>
                  <strong>Vector Coordinate Matrix:</strong>{" "}
                  <code className="text-white bg-white/10 px-1 py-0.5 rounded">
                    src/components/particle-hero/logoCoordinates.json
                  </code>
                </p>
                <p className="pt-2 text-white/50 text-xs">
                  When the particles are at rest, the silhouette and monogram
                  contours match the original signature asset with sub-pixel
                  accuracy. Use the &ldquo;Verify Logo Mask (1:1)&rdquo; toggle
                  in the sandbox bar above to see the overlaid silhouette.
                </p>
              </div>

              <div className="flex items-center justify-center p-6 bg-black/50 rounded-xl border border-white/5">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                  <Image
                    src="/images/asif_logoSIGNATURE.png"
                    alt="Master Asif Digital Logo Asset"
                    width={208}
                    height={208}
                    className="rounded-full shadow-2xl border border-white/10"
                  />
                  <div className="absolute -bottom-3 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
                    Master Single Source of Truth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
