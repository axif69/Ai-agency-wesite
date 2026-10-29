"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import rawCoordinates from "./logoCoordinates.json";

// Uniform grid coordinate format: [normX, normY, 0]
type PointTuple = [number, number, number];
const LOGO_POINTS = rawCoordinates as PointTuple[];

interface Particle {
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  group: 0 | 1 | 2; // 0 = crisp white, 1 = stardust white, 2 = subtle emerald
}

export interface ParticleLogoCanvasHandle {
  disperse: () => void;
  swirl: () => void;
  assemble: () => void;
  reset: () => void;
}

export interface ParticleLogoCanvasProps {
  className?: string;
  maxParticlesDesktop?: number;
  maxParticlesMobile?: number;
  showReferenceOverlay?: boolean;
}

const ParticleLogoCanvas = forwardRef<
  ParticleLogoCanvasHandle,
  ParticleLogoCanvasProps
>(function ParticleLogoCanvas(
  {
    className = "",
    maxParticlesDesktop = 20122,
    maxParticlesMobile = 10000,
    showReferenceOverlay = false,
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [activeParticles, setActiveParticles] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const actionsRef = useRef<{
    disperse: () => void;
    swirl: () => void;
    assemble: () => void;
    reset: () => void;
  }>({
    disperse: () => {},
    swirl: () => {},
    assemble: () => {},
    reset: () => {},
  });

  useImperativeHandle(ref, () => ({
    disperse: () => actionsRef.current.disperse(),
    swirl: () => actionsRef.current.swirl(),
    assemble: () => actionsRef.current.assemble(),
    reset: () => actionsRef.current.reset(),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => setReducedMotion(motionQuery.matches);
    checkMotion();
    motionQuery.addEventListener("change", checkMotion);

    let animationFrameId: number;
    let isVisible = true;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let logoScale = 0;

    // Bird.ae ParticleSlider Physics Parameters:
    // - mouseForce = 13,000 for explosive shattering and distant escape
    // - damping = 0.92 for low-friction cosmic glide (particles fully detach and float far)
    // - gravityK = 0.009 for gentle, natural celestial return
    const mouseForce = 13000;
    const maxReach = 170;
    const maxReachSq = maxReach * maxReach;
    const softDist = 80;
    const damping = 0.92;
    const gravityK = 0.009;

    const pointer = {
      x: -9999,
      y: -9999,
    };

    let frameCount = 0;
    let fpsTimer = performance.now();

    const getSampledPoints = () => {
      const isMobile = window.innerWidth < 768;
      const targetCount = isMobile ? maxParticlesMobile : maxParticlesDesktop;
      if (targetCount >= LOGO_POINTS.length) {
        return LOGO_POINTS;
      }

      const step = LOGO_POINTS.length / targetCount;
      const sampled: PointTuple[] = [];
      for (let i = 0; i < LOGO_POINTS.length; i += step) {
        sampled.push(LOGO_POINTS[Math.floor(i)]);
      }
      return sampled;
    };

    const initParticles = (isFirstInit = false) => {
      const points = getSampledPoints();
      setActiveParticles(points.length);

      const isMobile = window.innerWidth < 768;

      particles = points.map((pt, idx) => {
        const targetX = centerX + pt[0] * logoScale;
        const targetY = centerY + pt[1] * logoScale;

        let startX = targetX;
        let startY = targetY;

        if (isFirstInit && !motionQuery.matches) {
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnDist = logoScale * (0.8 + Math.random() * 1.2);
          startX = centerX + Math.cos(spawnAngle) * spawnDist;
          startY = centerY + Math.sin(spawnAngle) * spawnDist;
        }

        // Color group allocation:
        // Group 0 (72%): Crisp pure white matching title typography
        // Group 1 (25%): Soft white giving stardust depth
        // Group 2 (3%): Subtle emerald accent glints
        let group: 0 | 1 | 2 = 0;
        const rand = (idx * 9301 + 49297) % 233280 / 233280;
        if (rand < 0.03) {
          group = 2;
        } else if (rand < 0.28) {
          group = 1;
        } else {
          group = 0;
        }

        // Bird.ae ptlSize 1: pure micro-point stardust (0.5px radius)
        const radius = isMobile ? 0.45 : 0.52;

        return {
          targetX,
          targetY,
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius,
          group,
        };
      });
    };

    actionsRef.current = {
      disperse: () => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const angle = Math.random() * Math.PI * 2;
          const speed = 15 + Math.random() * 30;
          p.vx += Math.cos(angle) * speed;
          p.vy += Math.sin(angle) * speed;
        }
      },
      swirl: () => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const angle = Math.atan2(dy, dx);
          const speed = 12 + Math.random() * 15;
          p.vx += -Math.sin(angle) * speed;
          p.vy += Math.cos(angle) * speed;
        }
      },
      assemble: () => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.vx = (p.targetX - p.x) * 0.15;
          p.vy = (p.targetY - p.y) * 0.15;
        }
      },
      reset: () => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0;
          p.vy = 0;
        }
      },
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDesktop = width >= 768;
      // Position center more to the right side on desktop
      centerX = isDesktop ? width * 0.58 : width * 0.5;
      centerY = height * 0.5;

      const minDim = Math.min(width, height);
      // Increased size: 0.72 minDim on desktop for large, prominent authority presence
      logoScale = isDesktop ? minDim * 0.72 : minDim * 0.58;

      initParticles(false);
    };

    handleResize();
    initParticles(true);

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      setIsHovered(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      setIsHovered(false);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handlePointerLeave);
    container.addEventListener("touchcancel", handlePointerLeave);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      frameCount++;
      if (currentTime - fpsTimer >= 500) {
        setFps(Math.round((frameCount * 1000) / (currentTime - fpsTimer)));
        frameCount = 0;
        fpsTimer = currentTime;
      }

      ctx.clearRect(0, 0, width, height);

      // Reduced motion fallback
      if (motionQuery.matches) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.moveTo(p.targetX + p.radius, p.targetY);
          ctx.arc(p.targetX, p.targetY, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
        return;
      }

      const pass0: Particle[] = [];
      const pass1: Particle[] = [];
      const pass2: Particle[] = [];

      const mx = pointer.x;
      const my = pointer.y;
      const hasPointer = mx >= 0 && my >= 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Direct vector celestial gravity + living restless jitter (0 sqrt calls!)
        const c = p.targetX - p.x;
        const d = p.targetY - p.y;
        const shimmer = (Math.random() * 0.14 - 0.07);

        p.vx += c * gravityK + shimmer;
        p.vy += d * gravityK + shimmer;

        // 2. Bird.ae Inverse-Square Shatter & Distant Flight
        if (hasPointer) {
          const j = p.x - mx;
          const k = p.y - my;
          const distSq = j * j + k * k;

          if (distSq < maxReachSq) {
            const dist = Math.sqrt(distSq) || 1;
            const shatterForce = Math.min(mouseForce / (distSq + softDist), 105);

            p.vx += shatterForce * (j / dist);
            p.vy += shatterForce * (k / dist);
          }
        }

        // 3. Low-Friction Cosmic Gliding (0.92 Damping)
        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        // Group into draw pass
        if (p.group === 0) pass0.push(p);
        else if (p.group === 1) pass1.push(p);
        else pass2.push(p);
      }

      // ── BATCHED DRAW PASS 0: Pure Crisp White Micro-Stardust (No Outline / Border) ──
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.beginPath();
      for (let i = 0; i < pass0.length; i++) {
        const p = pass0[i];
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      // ── BATCHED DRAW PASS 1: Soft White Stardust Depth ──
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.beginPath();
      for (let i = 0; i < pass1.length; i++) {
        const p = pass1[i];
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      // ── BATCHED DRAW PASS 2: Subtle Emerald Accent Glints (3%) ──
      ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
      ctx.beginPath();
      for (let i = 0; i < pass2.length; i++) {
        const p = pass2[i];
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius * 1.1, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", checkMotion);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handlePointerLeave);
      container.removeEventListener("touchcancel", handlePointerLeave);
    };
  }, [maxParticlesDesktop, maxParticlesMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[560px] sm:min-h-[660px] lg:min-h-[740px] flex items-center justify-center select-none ${className}`}
      aria-label="Interactive micro-particle animation of Asif Digital AD logo"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair touch-none"
      />

      {/* Optical 1:1 overlay comparison */}
      {showReferenceOverlay && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: 0.18 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/asif_logo_transparent.png"
            alt="Reference Monogram Silhouette"
            className="w-[82%] h-[82%] object-contain filter invert opacity-50"
          />
        </div>
      )}

      {/* Floating telemetry / interaction status pill */}
      <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-black/75 backdrop-blur-md text-[11px] font-mono text-white/60 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isHovered ? "bg-emerald-400 animate-pulse" : "bg-white/40"
            }`}
          />
          <span className="hidden sm:inline">
            {isHovered ? "Fully Detached / Flying" : "Bird.ae Engine Active"}
          </span>
        </span>
        <span className="text-white/20">•</span>
        <span>{activeParticles.toLocaleString()} Particles</span>
        <span className="text-white/20">•</span>
        <span className={fps < 45 ? "text-amber-400" : "text-emerald-400"}>
          {fps} FPS
        </span>
      </div>

      {reducedMotion && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md bg-white/10 text-white/70 text-xs font-mono">
          Reduced Motion: Static Monogram
        </div>
      )}
    </div>
  );
});

export default ParticleLogoCanvas;
