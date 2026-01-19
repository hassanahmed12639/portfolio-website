"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function GrowthActionsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const words = wordsRef.current.filter(Boolean);
      if (words.length === 0) return;

      // Set initial state: all words start off-screen at the bottom
      gsap.set(words, {
        y: 600,
        opacity: 0,
      });

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        },
      });

      // Animate each word: slide up from bottom to its final position (y: 0)
      words.forEach((word, i) => {
        // Slide this word up from bottom to its final position
        tl.to(
          word,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          i * 0.5
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const actions = [
    { word: "Add" },
    { word: "Send" },
    { word: "Exchange" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center justify-center gap-24 w-full">
        {actions.map((action, i) => (
          <div
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="text-center"
          >
            <h2 className="text-[clamp(5rem,12vw,12rem)] font-bold tracking-tight leading-none">
              {action.word}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
