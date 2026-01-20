"use client";

import { useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const rotatingWords = ["Agencies", "Startups", "Enterprises", "Brands", "SaaS"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupAnimations = () => {
      if (!heroRef.current || !dynamicTextRef.current) {
        return;
      }

      try {
        // Initial entrance animations
        if (headlineRef.current) {
          gsap.from(headlineRef.current, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            delay: 0.5,
            ease: "power3.out",
          });
        }

        if (descriptionRef.current) {
          gsap.from(descriptionRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.7,
            ease: "power2.out",
          });
        }

        if (ctaButtonsRef.current) {
          gsap.from(ctaButtonsRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.9,
            ease: "power2.out",
          });
        }
      } catch (error) {
        // Silently fail - animations are non-critical
        if (process.env.NODE_ENV === "development") {
          console.warn("Animation setup failed:", error);
        }
      }
    };

    // Wait for DOM to be ready
    if (document.readyState === "complete") {
      setTimeout(setupAnimations, 100);
    } else {
      window.addEventListener("load", () => {
        setTimeout(setupAnimations, 100);
      });
    }
  }, []);

  // Scroll-based rotating text animation
  useEffect(() => {
    if (!dynamicTextRef.current || !heroRef.current) return;

    const triggers: ScrollTrigger[] = [];
    let currentWordIndex = 0;

    // Create scroll triggers for each word transition
    rotatingWords.forEach((word, index) => {
      if (index === 0) return; // Skip first word (already displayed)

      const trigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: `top+=${index * 300} top`,
        end: `top+=${(index + 1) * 300} top`,
        onEnter: () => {
          if (!dynamicTextRef.current || currentWordIndex === index) return;
          currentWordIndex = index;

          // Fade out and move up
          gsap.to(dynamicTextRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              // Set new text
              if (dynamicTextRef.current) {
                dynamicTextRef.current.textContent = word;
              }

              // Reset position and fade in
              gsap.set(dynamicTextRef.current, { y: 30 });
              gsap.to(dynamicTextRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            },
          });
        },
        onEnterBack: () => {
          if (!dynamicTextRef.current || currentWordIndex === index - 1) return;
          currentWordIndex = index - 1;
          const prevWord = rotatingWords[index - 1];

          // Fade out and move up
          gsap.to(dynamicTextRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              // Set previous text
              if (dynamicTextRef.current) {
                dynamicTextRef.current.textContent = prevWord;
              }

              // Reset position and fade in
              gsap.set(dynamicTextRef.current, { y: 30 });
              gsap.to(dynamicTextRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            },
          });
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10"
      aria-label="Hero section"
    >
      {/* Animated Headline */}
      <h1
        ref={headlineRef}
        className="text-[clamp(28px,6vw,96px)] xs:text-[clamp(32px,6vw,96px)] lg:text-[clamp(48px,6vw,120px)] xl:text-[clamp(64px,6vw,144px)] leading-[1.2] lg:leading-[1.3] max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px]"
      >
        <span className="block mb-2 lg:mb-4">
          <span className="font-bold not-italic">Your</span>{" "}
          <span className="font-semibold italic">Long-Term</span>{" "}
          <span className="font-bold not-italic">Design</span>
        </span>
        <span className="block ml-2 xs:ml-4 sm:ml-6 md:ml-8 lg:ml-10 xl:ml-12 2xl:ml-16">
          <span className="font-bold not-italic">Partner for</span>{" "}
          <span className="inline-flex min-w-[200px] xs:min-w-[240px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[380px] xl:min-w-[420px] 2xl:min-w-[480px] justify-start">
            <span
              ref={dynamicTextRef}
              className="font-semibold italic text-[#4169E1] min-h-[1.2em] will-change-transform inline-block"
              aria-live="polite"
              aria-atomic="true"
            >
              {rotatingWords[0]}
            </span>
          </span>
        </span>
      </h1>

      {/* Description */}
      <p
        ref={descriptionRef}
        className="mt-4 xs:mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] text-xs xs:text-sm sm:text-base md:text-[17px] lg:text-lg xl:text-xl 2xl:text-2xl leading-[1.6] md:leading-[1.7] text-[#4a5568]"
      >
        With Hassan, you can set ambitious growth targets, data-backed
        strategies, and drive results with optimized campaigns every month.
      </p>

      {/* CTA Buttons */}
      <div
        ref={ctaButtonsRef}
        className="flex gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-6 xs:mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 flex-wrap justify-center"
      >
        <button
          className="bg-[#4169E1] text-white px-5 xs:px-6 sm:px-9 md:px-12 lg:px-16 xl:px-20 py-2.5 xs:py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 rounded-[30px] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold hover:bg-[#3558c7] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:ring-offset-2 active:scale-95"
          aria-label="Schedule a call with us"
        >
          Schedule a Call
        </button>
        <button
          className="bg-transparent text-black px-5 xs:px-6 sm:px-9 md:px-12 lg:px-16 xl:px-20 py-2.5 xs:py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 rounded-[30px] border-2 border-[#e2e8f0] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold hover:border-[#4169E1] hover:text-[#4169E1] hover:-translate-y-0.5 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:ring-offset-2 active:scale-95"
          aria-label="View our pricing plans"
        >
          See Pricing
          <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
