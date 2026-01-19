"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin and set defaults
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Set GSAP defaults for better performance
  gsap.config({
    nullTargetWarn: false,
  });

  // ScrollTrigger defaults for consistent behavior
  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    start: "top 80%",
    end: "bottom 20%",
  });
}

// Export GSAP with ScrollTrigger registered
export { gsap, ScrollTrigger };
