"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "./gsap";

/**
 * Initialize Lenis smooth scrolling
 * Syncs with GSAP ticker for smooth ScrollTrigger integration
 */
export function initLenis() {
  if (typeof window === "undefined") return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  let rafId: number | null = null;

  // Sync Lenis with GSAP ticker
  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  // Update ScrollTrigger on scroll
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  // Handle resize
  const handleResize = () => {
    lenis.resize();
  };

  window.addEventListener("resize", handleResize);

  // Return cleanup function
  return {
    lenis,
    destroy: () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      window.removeEventListener("resize", handleResize);
      try {
        lenis.destroy();
      } catch (error) {
        // Silently handle destroy errors
        if (process.env.NODE_ENV === "development") {
          console.warn("Lenis destroy error:", error);
        }
      }
    },
  };
}
