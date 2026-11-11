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

const VERTEX_SHADER_SRC = `
  attribute vec2 a_pos;
  attribute float a_group;
  uniform vec2 u_resolution;
  uniform float u_baseSize;
  uniform float u_accentSize;
  varying float v_group;
  void main() {
    vec2 clip = (a_pos / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    gl_PointSize = a_group > 1.5 ? u_accentSize : u_baseSize;
    v_group = a_group;
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying float v_group;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float distSq = dot(c, c);
    if (distSq > 0.25) discard;
    float feather = 1.0 - smoothstep(0.08, 0.25, distSq);
    if (v_group > 1.5) {
      gl_FragColor = vec4(0.0627, 0.7255, 0.5059, 0.85 * feather);
    } else if (v_group > 0.5) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 0.55 * feather);
    } else {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 0.95 * feather);
    }
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
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

    // Prefer GPU-accelerated WebGL point rendering; fall back cleanly to batched 2D Canvas
    const gl = (canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    }) ||
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      })) as WebGLRenderingContext | null;

    const ctx = gl ? null : canvas.getContext("2d", { alpha: true });
    if (!gl && !ctx) return;

    let program: WebGLProgram | null = null;
    let posBuffer: WebGLBuffer | null = null;
    let groupBuffer: WebGLBuffer | null = null;
    let uResolutionLoc: WebGLUniformLocation | null = null;
    let uBaseSizeLoc: WebGLUniformLocation | null = null;
    let uAccentSizeLoc: WebGLUniformLocation | null = null;
    let aPosLoc = -1;
    let aGroupLoc = -1;
    let glReady = false;

    const initWebGLPipeline = () => {
      if (!gl) return false;
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      if (!vs || !fs) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        program = null;
        return false;
      }

      aPosLoc = gl.getAttribLocation(program, "a_pos");
      aGroupLoc = gl.getAttribLocation(program, "a_group");
      uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
      uBaseSizeLoc = gl.getUniformLocation(program, "u_baseSize");
      uAccentSizeLoc = gl.getUniformLocation(program, "u_accentSize");

      posBuffer = gl.createBuffer();
      groupBuffer = gl.createBuffer();
      if (!posBuffer || !groupBuffer || aPosLoc < 0 || aGroupLoc < 0) {
        return false;
      }

      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      return true;
    };

    if (gl) {
      glReady = initWebGLPipeline();
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => setReducedMotion(motionQuery.matches);
    checkMotion();
    motionQuery.addEventListener("change", checkMotion);

    let animationFrameId = 0;
    let isVisible = true;
    let contextLost = false;
    let particleCount = 0;

    // Structure-of-Arrays (SoA) typed buffers for zero-GC, L1-cache-friendly physics
    let posXY = new Float32Array(0);
    let targetXY = new Float32Array(0);
    let velXY = new Float32Array(0);
    let groups = new Float32Array(0);

    // Fallback index buckets when rendering on Canvas2D
    let group0Indices = new Uint32Array(0);
    let group1Indices = new Uint32Array(0);
    let group2Indices = new Uint32Array(0);
    let group0Count = 0;
    let group1Count = 0;
    let group2Count = 0;

    const SHIMMER_COUNT = 512;
    const SHIMMER_TABLE = new Float32Array(SHIMMER_COUNT);
    for (let s = 0; s < SHIMMER_COUNT; s++) {
      SHIMMER_TABLE[s] = Math.random() * 0.14 - 0.07;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let centerX = 0;
    let centerY = 0;
    let logoScale = 0;
    let particleRadius = 0.52;
    let lastWidth = 0;
    let lastHeight = 0;
    let lastDpr = 0;
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
    let lastFrameTime = performance.now();

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

    const initParticles = (isFirstInit = false) => {
      const points = getSampledPoints();
      const count = points.length;
      const isMobile = window.innerWidth < 768;
      particleRadius = isMobile ? 0.45 : 0.52;
      activeParticlesRef.current = count;

      const preserveMotion = initialized && count === particleCount && !isFirstInit;

      if (!preserveMotion) {
        posXY = new Float32Array(count * 2);
        targetXY = new Float32Array(count * 2);
        velXY = new Float32Array(count * 2);
        groups = new Float32Array(count);
        group0Indices = new Uint32Array(count);
        group1Indices = new Uint32Array(count);
        group2Indices = new Uint32Array(count);
        group0Count = 0;
        group1Count = 0;
        group2Count = 0;
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

          let group = 0;
          const rand = ((i * 9301 + 49297) % 233280) / 233280;
          if (rand < 0.03) {
            group = 2;
            group2Indices[group2Count++] = i;
          } else if (rand < 0.28) {
            group = 1;
            group1Indices[group1Count++] = i;
          } else {
            group = 0;
            group0Indices[group0Count++] = i;
          }
          groups[i] = group;
        }
      }

      if (gl && glReady && posBuffer && groupBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, posXY, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aPosLoc);
        gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, groupBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, groups, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aGroupLoc);
        gl.vertexAttribPointer(aGroupLoc, 1, gl.FLOAT, false, 0, 0);
      }

      initialized = true;
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
      const rect = container.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

      if (nextWidth <= 0 || nextHeight <= 0) return;

      // Skip redundant reallocations & particle resets when dimensions haven't changed
      if (
        !isFirstInit &&
        initialized &&
        Math.abs(nextWidth - lastWidth) < 2 &&
        Math.abs(nextHeight - lastHeight) < 2 &&
        nextDpr === lastDpr
      ) {
        return;
      }

      lastWidth = nextWidth;
      lastHeight = nextHeight;
      lastDpr = nextDpr;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else if (gl && glReady && program) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);
        gl.uniform2f(uResolutionLoc, width, height);
        const pointScale = dpr;
        gl.uniform1f(uBaseSizeLoc, Math.max(1.5, (particleRadius * 2 + 0.75) * pointScale));
        gl.uniform1f(uAccentSizeLoc, Math.max(1.75, (particleRadius * 2.2 + 0.85) * pointScale));
      }

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

    const updatePointer = (clientX: number, clientY: number) => {
      const cr = canvas.getBoundingClientRect();
      pointer.x = clientX - cr.left;
      pointer.y = clientY - cr.top;
      pointer.active = true;
      isHoveredRef.current = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.active = false;
      isHoveredRef.current = false;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("pointerdown", handlePointerDown, { passive: true });
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handlePointerLeave);
    container.addEventListener("touchcancel", handlePointerLeave);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
    };

    const handleContextRestored = () => {
      contextLost = false;
      if (gl) {
        glReady = initWebGLPipeline();
        lastWidth = 0;
        lastHeight = 0;
        handleResize(false);
      }
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const nextVisible = entries[i].isIntersecting;
          if (nextVisible && !isVisible) {
            lastFrameTime = performance.now();
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
        lastFrameTime = performance.now();
      }
      isVisible = nextVisible;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const drawCanvas2D = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (motionQuery.matches) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        const r = particleRadius;
        const d = r * 2;
        for (let i = 0; i < particleCount; i++) {
          const i2 = i * 2;
          ctx.rect(targetXY[i2] - r, targetXY[i2 + 1] - r, d, d);
        }
        ctx.fill();
        return;
      }

      const r = particleRadius;
      const d = r * 2;

      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.beginPath();
      for (let i = 0; i < group0Count; i++) {
        const i2 = group0Indices[i] * 2;
        ctx.rect(posXY[i2] - r, posXY[i2 + 1] - r, d, d);
      }
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.beginPath();
      for (let i = 0; i < group1Count; i++) {
        const i2 = group1Indices[i] * 2;
        ctx.rect(posXY[i2] - r, posXY[i2 + 1] - r, d, d);
      }
      ctx.fill();

      const r2 = r * 1.1;
      const d2 = r2 * 2;
      ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
      ctx.beginPath();
      for (let i = 0; i < group2Count; i++) {
        const i2 = group2Indices[i] * 2;
        ctx.rect(posXY[i2] - r2, posXY[i2 + 1] - r2, d2, d2);
      }
      ctx.fill();
    };

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || contextLost || particleCount === 0) return;

      const rawDt = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      // Normalize physics to 60Hz baseline so 120Hz/144Hz monitors match 60Hz feel & never overshoot
      const dtScale = rawDt > 0 ? Math.min(Math.max(rawDt / 16.66667, 0.25), 2.5) : 1;

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
              const shatterForce = Math.min(mouseForce / (distSq + softDist), 105) * fStep;
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

      if (gl && glReady && posBuffer) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, motionQuery.matches ? targetXY : posXY);
        gl.drawArrays(gl.POINTS, 0, particleCount);
      } else {
        drawCanvas2D();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", checkMotion);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handlePointerLeave);
      container.removeEventListener("touchcancel", handlePointerLeave);
      if (gl && program) {
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(groupBuffer);
        gl.deleteProgram(program);
      }
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
        className="w-full h-full block cursor-crosshair touch-pan-y"
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
