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

function packRgba32(
  r: number,
  g: number,
  b: number,
  a: number,
  littleEndian: boolean
): number {
  if (littleEndian) {
    return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
  }
  return ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
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
  const fpsRef = useRef<number>(60);
  const activeParticlesRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
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

    // Bird.ae-style 2D ImageData pixel-buffer renderer at 1x CSS resolution:
    // eliminates WebGL context switches, shader stalls, SkPath overhead, and HiDPI buffer bloat
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isLittleEndian =
      new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
    const colWhite = packRgba32(255, 255, 255, 242, isLittleEndian);
    const colSoft = packRgba32(255, 255, 255, 140, isLittleEndian);
    const colEmerald = packRgba32(16, 185, 129, 217, isLittleEndian);

    let frameImageData: ImageData | null = null;
    let frameBuf32: Uint32Array | null = null;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => setReducedMotion(motionQuery.matches);
    checkMotion();
    motionQuery.addEventListener("change", checkMotion);

    let animationFrameId = 0;
    let isVisible = true;
    let particleCount = 0;

    // Structure-of-Arrays (SoA) typed buffers for zero-GC physics
    let posXY = new Float32Array(0);
    let targetXY = new Float32Array(0);
    let velXY = new Float32Array(0);
    let color32 = new Uint32Array(0);

    const SHIMMER_COUNT = 512;
    const SHIMMER_TABLE = new Float32Array(SHIMMER_COUNT);
    for (let s = 0; s < SHIMMER_COUNT; s++) {
      SHIMMER_TABLE[s] = Math.random() * 0.14 - 0.07;
    }

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let logoScale = 0;
    let lastWidth = 0;
    let lastHeight = 0;
    let initialized = false;

    // Micro-Particle High-Sensitivity Physics Configuration
    const mouseForce = 13000;
    const maxReach = 170;
    const maxReachSq = maxReach * maxReach;
    const softDist = 80;
    const baseDamping = 0.92;
    const gravityK = 0.009;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let tickCount = 0;
    let fpsFrames = 0;
    let fpsTimer = performance.now();
    let lastStepTime = performance.now();

    const getSampledPoints = (): PointTuple[] => {
      const isMobile = window.innerWidth < 768;
      const targetCount = isMobile ? maxParticlesMobile : maxParticlesDesktop;
      if (targetCount <= 0) return [];
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

    const drawPixelBuffer = (coords: Float32Array) => {
      if (!frameImageData || !frameBuf32 || width <= 0 || height <= 0) return;
      const buf = frameBuf32;
      const w = width;
      const h = height;

      buf.fill(0);

      for (let i = 0; i < particleCount; i++) {
        const i2 = i * 2;
        const ix = coords[i2] | 0;
        const iy = coords[i2 + 1] | 0;
        if (ix >= 0 && iy >= 0 && ix < w && iy < h) {
          buf[iy * w + ix] = color32[i];
        }
      }

      ctx.putImageData(frameImageData, 0, 0);
    };

    const initParticles = (isFirstInit = false) => {
      const points = getSampledPoints();
      const count = points.length;
      activeParticlesRef.current = count;

      const preserveMotion =
        initialized && count === particleCount && !isFirstInit;

      if (!preserveMotion) {
        posXY = new Float32Array(count * 2);
        targetXY = new Float32Array(count * 2);
        velXY = new Float32Array(count * 2);
        color32 = new Uint32Array(count);
      }

      particleCount = count;

      for (let i = 0; i < count; i++) {
        const pt = points[i];
        const i2 = i * 2;
        const tx = centerX + pt[0] * logoScale;
        const ty = centerY + pt[1] * logoScale;
        targetXY[i2] = tx;
        targetXY[i2 + 1] = ty;

        if (!preserveMotion) {
          let sx = tx;
          let sy = ty;

          if (isFirstInit && !motionQuery.matches) {
            const spawnAngle = Math.random() * Math.PI * 2;
            const spawnDist = logoScale * (0.8 + Math.random() * 1.2);
            sx = centerX + Math.cos(spawnAngle) * spawnDist;
            sy = centerY + Math.sin(spawnAngle) * spawnDist;
          }

          posXY[i2] = sx;
          posXY[i2 + 1] = sy;
          velXY[i2] = (Math.random() - 0.5) * 2;
          velXY[i2 + 1] = (Math.random() - 0.5) * 2;

          const rand = ((i * 9301 + 49297) % 233280) / 233280;
          if (rand < 0.03) {
            color32[i] = colEmerald;
          } else if (rand < 0.28) {
            color32[i] = colSoft;
          } else {
            color32[i] = colWhite;
          }
        }
      }

      initialized = true;
      drawPixelBuffer(motionQuery.matches ? targetXY : posXY);
    };

    actionsRef.current = {
      disperse: () => {
        for (let i = 0; i < particleCount; i++) {
          const i2 = i * 2;
          const angle = Math.random() * Math.PI * 2;
          const speed = 15 + Math.random() * 30;
          velXY[i2] += Math.cos(angle) * speed;
          velXY[i2 + 1] += Math.sin(angle) * speed;
        }
      },
      swirl: () => {
        for (let i = 0; i < particleCount; i++) {
          const i2 = i * 2;
          const dx = posXY[i2] - centerX;
          const dy = posXY[i2 + 1] - centerY;
          const angle = Math.atan2(dy, dx);
          const speed = 12 + Math.random() * 15;
          velXY[i2] += -Math.sin(angle) * speed;
          velXY[i2 + 1] += Math.cos(angle) * speed;
        }
      },
      assemble: () => {
        for (let i = 0; i < particleCount; i++) {
          const i2 = i * 2;
          velXY[i2] = (targetXY[i2] - posXY[i2]) * 0.15;
          velXY[i2 + 1] = (targetXY[i2 + 1] - posXY[i2 + 1]) * 0.15;
        }
      },
      reset: () => {
        for (let i = 0; i < particleCount; i++) {
          const i2 = i * 2;
          posXY[i2] = targetXY[i2];
          posXY[i2 + 1] = targetXY[i2 + 1];
          velXY[i2] = 0;
          velXY[i2 + 1] = 0;
        }
      },
    };

    const handleResize = (isFirstInit = false) => {
      const nextWidth = Math.round(container.clientWidth);
      const nextHeight = Math.round(container.clientHeight);

      if (nextWidth <= 0 || nextHeight <= 0) return;

      // Skip redundant reallocations when container size hasn't changed meaningfully
      if (
        !isFirstInit &&
        initialized &&
        Math.abs(nextWidth - lastWidth) < 2 &&
        Math.abs(nextHeight - lastHeight) < 2
      ) {
        return;
      }

      lastWidth = nextWidth;
      lastHeight = nextHeight;

      width = nextWidth;
      height = nextHeight;

      // 1x CSS pixel buffer matching Bird.ae's ParticleSlider (ptlSize = 1)
      canvas.width = width;
      canvas.height = height;

      frameImageData = ctx.createImageData(width, height);
      frameBuf32 = new Uint32Array(frameImageData.data.buffer);

      const isDesktop = width >= 768;
      centerX = isDesktop ? width * 0.58 : width * 0.5;
      centerY = height * 0.5;

      const minDim = Math.min(width, height);
      logoScale = isDesktop ? minDim * 0.72 : minDim * 0.58;

      initParticles(isFirstInit);
    };

    handleResize(true);

    const resizeObserver = new ResizeObserver(() => handleResize(false));
    resizeObserver.observe(container);

    const handlePointer = (e: PointerEvent) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      pointer.x = cw > 0 && cw !== width ? (e.offsetX * width) / cw : e.offsetX;
      pointer.y = ch > 0 && ch !== height ? (e.offsetY * height) / ch : e.offsetY;
      pointer.active = true;
      isHoveredRef.current = true;
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.active = false;
      isHoveredRef.current = false;
    };

    const handlePointerUp = (e: PointerEvent) => {
      // On touch/pen screens, lift releases the scatter field immediately instead of sticking
      if (e.pointerType !== "mouse") {
        handlePointerLeave();
      }
    };

    canvas.addEventListener("pointerdown", handlePointer, { passive: true });
    canvas.addEventListener("pointermove", handlePointer, { passive: true });
    canvas.addEventListener("pointerup", handlePointerUp, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    canvas.addEventListener("pointercancel", handlePointerLeave, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const nextVisible = entries[i].isIntersecting;
          if (nextVisible && !isVisible) {
            lastStepTime = performance.now();
          }
          isVisible = nextVisible;
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      const nextVisible = document.visibilityState === "visible";
      if (nextVisible && !isVisible) {
        lastStepTime = performance.now();
      }
      isVisible = nextVisible;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || particleCount === 0) return;

      const rawDt = currentTime - lastStepTime;
      // Cap active updates to ~60Hz (like Bird.ae's 15ms loop gate) so 120Hz–240Hz displays don't flood input/compositing
      if (rawDt < 12.5) return;

      lastStepTime = currentTime;
      const dtScale = Math.min(Math.max(rawDt / 16.66667, 0.75), 1.6);

      tickCount++;
      fpsFrames++;
      if (currentTime - fpsTimer >= 500) {
        fpsRef.current = Math.round((fpsFrames * 1000) / (currentTime - fpsTimer));
        fpsFrames = 0;
        fpsTimer = currentTime;
      }

      if (!motionQuery.matches) {
        const mx = pointer.x;
        const my = pointer.y;
        const hasPointer =
          pointer.active &&
          mx >= -maxReach &&
          mx <= width + maxReach &&
          my >= -maxReach &&
          my <= height + maxReach;

        const gStep = gravityK * dtScale;
        const dampStep = Math.pow(baseDamping, dtScale);
        const fStep = dtScale;
        const shimmerBase = tickCount;

        for (let i = 0; i < particleCount; i++) {
          const i2 = i * 2;
          const px = posXY[i2];
          const py = posXY[i2 + 1];

          const dx = targetXY[i2] - px;
          const dy = targetXY[i2 + 1] - py;
          const shimmer = SHIMMER_TABLE[(i + shimmerBase) & 511] * fStep;

          let vx = velXY[i2] + dx * gStep + shimmer;
          let vy = velXY[i2 + 1] + dy * gStep + shimmer;

          if (hasPointer) {
            const rx = px - mx;
            const ry = py - my;
            const distSq = rx * rx + ry * ry;

            if (distSq < maxReachSq) {
              const dist = Math.sqrt(distSq) || 1;
              const shatterForce =
                Math.min(mouseForce / (distSq + softDist), 105) * fStep;
              const invDist = 1 / dist;
              vx += shatterForce * rx * invDist;
              vy += shatterForce * ry * invDist;
            }
          }

          vx *= dampStep;
          vy *= dampStep;

          velXY[i2] = vx;
          velXY[i2 + 1] = vy;
          posXY[i2] = px + vx * fStep;
          posXY[i2 + 1] = py + vy * fStep;
        }
      }

      drawPixelBuffer(motionQuery.matches ? targetXY : posXY);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", checkMotion);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("pointerdown", handlePointer);
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointercancel", handlePointerLeave);
    };
  }, [maxParticlesDesktop, maxParticlesMobile]);

  return (
    <div
      ref={containerRef}
      style={{ contain: "layout paint" }}
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

      {reducedMotion && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md bg-white/10 text-white/70 text-xs font-mono">
          Reduced Motion: Static Monogram
        </div>
      )}
    </div>
  );
});

export default ParticleLogoCanvas;
