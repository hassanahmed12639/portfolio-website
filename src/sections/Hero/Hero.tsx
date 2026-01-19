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
          className="h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
        >
          {/* Rating Badge */}
          <div
            ref={ratingBadgeRef}
            className="flex items-center gap-3 sm:gap-4 md:gap-[15px] lg:gap-5 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16"
          >
            <div className="hidden md:flex">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-[3px] border-white bg-[#E8E8E8]"></div>
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-[3px] border-white bg-[#9B9B9B] -ml-3 md:-ml-3 lg:-ml-4 xl:-ml-5"></div>
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-[3px] border-white bg-[#6B6B6B] -ml-3 md:-ml-3 lg:-ml-4 xl:-ml-5"></div>
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-[3px] border-white bg-[#3D4A5C] -ml-3 md:-ml-3 lg:-ml-4 xl:-ml-5"></div>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-[15px] md:text-base lg:text-lg xl:text-xl">
              <Star className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 fill-[#FFB800] text-[#FFB800]" />
              <span className="font-semibold">5.0</span>
              <span className="text-[#718096]">Rated on Clutch</span>
            </div>
          </div>

          {/* Animated Headline */}
          <h1
            ref={headlineRef}
            className="text-[clamp(32px,6vw,96px)] lg:text-[clamp(48px,6vw,120px)] xl:text-[clamp(64px,6vw,144px)] font-semibold leading-[1.2] lg:leading-[1.3] max-w-[90%] sm:max-w-[85%] md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px]"
          >
            <span className="block mb-2 lg:mb-4">Your Marketing Partner for</span>
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
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] text-sm sm:text-base md:text-[17px] lg:text-lg xl:text-xl 2xl:text-2xl leading-[1.6] md:leading-[1.7] text-[#4a5568]"
          >
            With Hassan, you can set ambitious growth targets, data-backed
            strategies, and drive results with optimized campaigns every month.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaButtonsRef}
            className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 flex-wrap justify-center"
          >
            <button className="bg-[#4169E1] text-white px-6 sm:px-9 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 rounded-[30px] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold hover:bg-[#3558c7] hover:-translate-y-0.5 transition-all">
              Schedule a Call
            </button>
            <button className="bg-transparent text-black px-6 sm:px-9 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 rounded-[30px] border-2 border-[#e2e8f0] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold hover:border-[#4169E1] hover:text-[#4169E1] hover:-translate-y-0.5 transition-all flex items-center gap-2">
              See Pricing
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
