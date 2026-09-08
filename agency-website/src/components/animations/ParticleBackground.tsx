"use client";
import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animId: number | null = null;
    let isVisible = false;

    // Set canvas dimensions to match display size
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();

    // 25 lightweight floating particles
    const particleCount = 25;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * (canvas.clientWidth || 300),
      y: Math.random() * (canvas.clientHeight || 300),
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let lastTime = performance.now();

    const draw = (now: number) => {
      if (!isVisible) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const w = canvas.clientWidth || 300;
      const h = canvas.clientHeight || 300;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt * 30;
        p.y += p.vy * dt * 30;

        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
        ctx.shadowColor = "rgba(34, 197, 94, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    // IntersectionObserver halts animation 100% when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          if (!animId) {
            animId = requestAnimationFrame(draw);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[0]"
      aria-hidden="true"
    />
  );
}
