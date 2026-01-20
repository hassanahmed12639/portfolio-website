"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Plus, Send, ArrowLeftRight } from "lucide-react";

export default function GrowthActionsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const rows = rowsRef.current.filter(Boolean);
      if (rows.length === 0) return;

      // Set initial state: all rows start slightly below and invisible
      gsap.set(rows, {
        y: 40,
        opacity: 0,
      });

      // Create a single timeline with scroll trigger that pins the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.5,
          pin: true,
        },
      });

      // Each button appears on a separate scroll section
      // First scroll: Add (0-33%)
      tl.to(
        rows[0],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      // Second scroll: Send (33-66%)
      tl.to(
        rows[1],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.33
      );

      // Third scroll: Exchange (66-100%)
      tl.to(
        rows[2],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.66
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const actions = [
    { word: "Add", icon: Plus, color: "bg-green-500" },
    { word: "Send", icon: Send, color: "bg-blue-500" },
    { word: "Exchange", icon: ArrowLeftRight, color: "bg-red-500" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-white"
      aria-label="Growth actions section"
    >
      <div className="flex flex-col items-center justify-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 w-full max-w-[95%] xs:max-w-[90%] sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] px-3 xs:px-4 sm:px-5 md:px-8 lg:px-12 xl:px-16 mx-auto">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <div
              key={i}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="flex items-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"
            >
              <div
                className={`${action.color} w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-xl flex items-center justify-center flex-shrink-0`}
                aria-hidden="true"
              >
                <Icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-white" />
              </div>
              <h2 className="text-[clamp(1.5rem,5vw,6rem)] sm:text-[clamp(2rem,6vw,8rem)] lg:text-[clamp(3rem,6vw,10rem)] xl:text-[clamp(4rem,6vw,12rem)] font-bold tracking-tight leading-none">
                {action.word}
              </h2>
            </div>
          );
        })}
      </div>
    </section>
  );
}
