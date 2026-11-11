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

// Output premultiplied RGBA so WebGL matches premultipliedAlpha compositor blending cleanly
const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying float v_group;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float distSq = dot(c, c);
    if (distSq > 0.25) discard;
    float feather = 1.0 - smoothstep(0.08, 0.25, distSq);
    if (v_group > 1.5) {
      float a = 0.85 * feather;
      gl_FragColor = vec4(0.0627 * a, 0.7255 * a, 0.5059 * a, a);
    } else if (v_group > 0.5) {
      float a = 0.55 * feather;
      gl_FragColor = vec4(a, a, a, a);
    } else {
      float a = 0.95 * feather;
      gl_FragColor = vec4(a, a, a, a);
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

function packRgba32(r: number, g: number, b: number, a: number, littleEndian: boolean): number {
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

    // Prefer GPU-accelerated WebGL point rendering; fall back to direct ImageData pixel buffer
    const gl = (canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    }) ||
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      })) as WebGLRenderingContext | null;

    const ctx = gl ? null : canvas.getContext("2d", { alpha: true });
    if (!gl && !ctx) return;

    let program: WebGLProgram | null = null;
    const posBuffers: [WebGLBuffer | null, WebGLBuffer | null] = [null, null];
    let activePosBuf = 0;
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

      posBuffers[0] = gl.createBuffer();
      posBuffers[1] = gl.createBuffer();
      groupBuffer = gl.createBuffer();
      if (
        !posBuffers[0] ||
        !posBuffers[1] ||
        !groupBuffer ||
        aPosLoc < 0 ||
        aGroupLoc < 0
      ) {
        return false;
      }

      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      return true;
    };

    if (gl) {
      glReady = initWebGLPipeline();
    }

    // 2D direct pixel framebuffer state (used only when WebGL is unavailable)
    const isLittleEndian =
      new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
    const colWhite = packRgba32(255, 255, 255, 242, isLittleEndian);
    const colSoft = packRgba32(255, 255, 255, 140, isLittleEndian);
    const colEmerald = packRgba32(16, 185, 129, 217, isLittleEndian);
    let fallbackImageData: ImageData | null = null;
    let fallbackBuf32: Uint32Array | null = null;

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
    let color32 = new Uint32Array(0);

    const SHIMMER_COUNT = 512;
    const SHIMMER_TABLE = new Float32Array(SHIMMER_COUNT);
    for (let s = 0; s < SHIMMER_COUNT; s++) {
      SHIMMER_TABLE[s] = Math.random() * 0.14 - 0.07;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let pixelW = 0;
    let pixelH = 0;
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

          let group = 0;
          const rand = ((i * 9301 + 49297) % 233280) / 233280;
          if (rand < 0.03) {
            group = 2;
            color32[i] = colEmerald;
          } else if (rand < 0.28) {
            group = 1;
            color32[i] = colSoft;
          } else {
            group = 0;
            color32[i] = colWhite;
          }
          groups[i] = group;
        }
      }

      if (gl && glReady && posBuffers[0] && posBuffers[1] && groupBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffers[0]);
        gl.bufferData(gl.ARRAY_BUFFER, posXY, gl.STREAM_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffers[1]);
        gl.bufferData(gl.ARRAY_BUFFER, posXY, gl.STREAM_DRAW);
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
      pixelW = Math.max(1, Math.floor(width * dpr));
      pixelH = Math.max(1, Math.floor(height * dpr));

      canvas.width = pixelW;
      canvas.height = pixelH;

      if (ctx) {
        fallbackImageData = ctx.createImageData(pixelW, pixelH);
        fallbackBuf32 = new Uint32Array(fallbackImageData.data.buffer);
      } else if (gl && glReady && program) {
        gl.viewport(0, 0, pixelW, pixelH);
        gl.useProgram(program);
        gl.uniform2f(uResolutionLoc, width, height);
        gl.uniform1f(uBaseSizeLoc, Math.max(1.5, (particleRadius * 2 + 0.75) * dpr));
        gl.uniform1f(uAccentSizeLoc, Math.max(1.75, (particleRadius * 2.2 + 0.85) * dpr));
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

    // Unified Pointer Events on <canvas>: zero duplicate callbacks and zero getBoundingClientRect reflows
    const handlePointer = (e: PointerEvent) => {
      pointer.x = e.offsetX;
      pointer.y = e.offsetY;
      pointer.active = true;
      isHoveredRef.current = true;
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.active = false;
      isHoveredRef.current = false;
    };

    canvas.addEventListener("pointerdown", handlePointer, { passive: true });
    canvas.addEventListener("pointermove", handlePointer, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    canvas.addEventListener("pointercancel", handlePointerLeave, { passive: true });

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

    // Zero-SkPath CPU framebuffer fallback (single putImageData per frame)
    const drawCanvas2DFast = (coords: Float32Array) => {
      if (!ctx || !fallbackImageData || !fallbackBuf32) return;
      const buf = fallbackBuf32;
      const pw = pixelW;
      const ph = pixelH;
      const scale = dpr;
      const dot2x2 = scale >= 1.4;

      buf.fill(0);

      for (let i = 0; i < particleCount; i++) {
        const i2 = i * 2;
        const ix = (coords[i2] * scale) | 0;
        const iy = (coords[i2 + 1] * scale) | 0;
        if (ix >= 0 && iy >= 0 && ix < pw - 1 && iy < ph - 1) {
          const col = color32[i];
          const idx = iy * pw + ix;
          buf[idx] = col;
          if (dot2x2) {
            buf[idx + 1] = col;
            buf[idx + pw] = col;
            buf[idx + pw + 1] = col;
          }
        }
      }

      ctx.putImageData(fallbackImageData, 0, 0);
    };

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || contextLost || particleCount === 0) return;

      const rawDt = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      // Smooth delta normalization across 60Hz–240Hz displays
      const dtScale = rawDt > 0 ? Math.min(Math.max(rawDt / 16.66667, 0.15), 2.0) : 1;

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

      const activeCoords = motionQuery.matches ? targetXY : posXY;
      if (gl && glReady && posBuffers[0] && posBuffers[1]) {
        const buf = posBuffers[activePosBuf];
        activePosBuf ^= 1;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, activeCoords, gl.STREAM_DRAW);
        gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, particleCount);
      } else {
        drawCanvas2DFast(activeCoords);
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
      canvas.removeEventListener("pointerdown", handlePointer);
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointercancel", handlePointerLeave);
      if (gl && program) {
        gl.deleteBuffer(posBuffers[0]);
        gl.deleteBuffer(posBuffers[1]);
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
