"use client";

import { useRef, useEffect } from "react";
import { Star, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const dynamicLayers = [
  "Scalable Data-Driven Growth",
  "Predictable Revenue at Scale",
  "Conversion-Focused Profit Systems",
  "High-Intent Customer Acquisition",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const ratingBadgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupAnimations = () => {
      if (
        !heroRef.current ||
        !scrollContainerRef.current ||
        !dynamicTextRef.current
      ) {
        return;
      }

      try {
        // Pin the hero section
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Create transitions for each layer using percentage-based scroll triggers
        dynamicLayers.forEach((layer, index) => {
          if (index < dynamicLayers.length - 1) {
            const nextLayer = dynamicLayers[index + 1];
            
            // Each transition at 25% intervals
            const startProgress = index * 25;
            const endProgress = (index + 1) * 25;

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: scrollContainerRef.current,
                  start: `${startProgress}% top`,
                  end: `${endProgress}% top`,
                  scrub: 1.5,
                },
              })
              .to(dynamicTextRef.current, {
                opacity: 0,
                y: -40,
                duration: 0.5,
                ease: "power2.in",
              })
              .call(() => {
                if (dynamicTextRef.current) {
                  dynamicTextRef.current.textContent = nextLayer;
                }
              })
              .fromTo(
                dynamicTextRef.current,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
          }
        });

        // Initial entrance animations
        if (ratingBadgeRef.current) {
          gsap.from(ratingBadgeRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
          });
        }

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

        ScrollTrigger.refresh();
      } catch (error) {
        console.error("Error setting up animations:", error);
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Scroll Container */}
      <div ref={scrollContainerRef} className="h-[250vh] relative">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="h-screen flex flex-col items-center justify-center text-center px-5"
        >
          {/* Rating Badge */}
          <div
            ref={ratingBadgeRef}
            className="flex items-center gap-[15px] mb-10"
          >
            <div className="hidden md:flex">
              <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#E8E8E8]"></div>
              <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#9B9B9B] -ml-3"></div>
              <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#6B6B6B] -ml-3"></div>
              <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#3D4A5C] -ml-3"></div>
            </div>
            <div className="flex items-center gap-2 text-[15px]">
              <Star className="w-[18px] h-[18px] fill-[#FFB800] text-[#FFB800]" />
              <span className="font-semibold">5.0</span>
              <span className="text-[#718096]">Rated on Clutch</span>
            </div>
          </div>

          {/* Animated Headline */}
          <h1
            ref={headlineRef}
            className="text-[clamp(36px,5vw,72px)] font-semibold leading-[1.3] max-w-[1200px]"
          >
            <span className="block mb-2">Your Marketing Partner for</span>
            <span
              ref={dynamicTextRef}
              className="block font-bold italic min-h-[1.2em] will-change-transform"
            >
              {dynamicLayers[0]}
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mt-8 max-w-[700px] text-[17px] leading-[1.7] text-[#4a5568]"
          >
            With Hassan, you can set ambitious growth targets, data-backed
            strategies, and drive results with optimized campaigns every month.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaButtonsRef}
            className="flex gap-5 mt-10 flex-wrap justify-center"
          >
            <button className="bg-[#4169E1] text-white px-9 py-4 rounded-[30px] text-base font-semibold hover:bg-[#3558c7] hover:-translate-y-0.5 transition-all">
              Schedule a Call
            </button>
            <button className="bg-transparent text-black px-9 py-4 rounded-[30px] border-2 border-[#e2e8f0] text-base font-semibold hover:border-[#4169E1] hover:text-[#4169E1] hover:-translate-y-0.5 transition-all flex items-center gap-2">
              See Pricing
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
