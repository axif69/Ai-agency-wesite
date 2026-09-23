"use client";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize custom smooth scrolling on desktop devices with fine pointer
    if (typeof window === "undefined" || window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let lenisInstance: any = null;
    let tickerCallback: any = null;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      lenisInstance = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
      });

      lenisInstance.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (tickerCallback) {
        import("gsap").then(({ default: gsap }) => gsap.ticker.remove(tickerCallback));
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
