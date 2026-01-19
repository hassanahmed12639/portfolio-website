"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function UnifyFinancesScroll() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const section = sectionRef.current as HTMLElement;
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;

      // Initial positions: cards start from outside screen corners
      // Add extra offset to ensure they're completely off-screen
      const offScreenOffset = 500;
      const cardPositions = [
        { x: -(sectionWidth / 2 + offScreenOffset), y: -(sectionHeight / 2 + offScreenOffset) }, // top-left - card 0
        { x: sectionWidth / 2 + offScreenOffset, y: -(sectionHeight / 2 + offScreenOffset) }, // top-right - card 1
        { x: -(sectionWidth / 2 + offScreenOffset), y: sectionHeight / 2 + offScreenOffset }, // bottom-left - card 2
        { x: sectionWidth / 2 + offScreenOffset, y: sectionHeight / 2 + offScreenOffset }, // bottom-right - card 3
        { x: sectionWidth / 2 + offScreenOffset, y: 0 }, // right-center - card 4
      ];

      // Set initial positions (off-screen and invisible) for all 5 cards
      cardsRef.current.forEach((card, i) => {
        if (card && cardPositions[i]) {
          gsap.set(card, {
            x: cardPositions[i].x,
            y: cardPositions[i].y,
            opacity: 0,
          });
        }
      });

      // Calculate when all animations finish
      // Cards finish around position 1.9, final stack at 3.0
      // Add 100% scroll distance after all animations (2 scroll wheel events)
      // Total: 250% for animations + 100% delay = 350% scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      /* Cards animate in from corners and stack in center - all 5 cards */
      cardsRef.current.forEach((card, i) => {
        if (card) {
          tl.to(
            card,
            {
              x: (i % 2) * 6, // slight offset for stacking (left/right)
              y: Math.floor(i / 2) * 6, // slight offset for stacking (top/bottom)
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            i * 0.15 // stagger slightly - each card starts after the previous
          );
        }
      });

      /* Text hides behind cards */
      tl.to(
        textRef.current,
        {
          scale: 0.45,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "<0.7"
      );

      /* Final stack positioning - all 5 cards */
      tl.to(
        cardsRef.current,
        {
          x: (i) => (i % 2) * 6,
          y: (i) => Math.floor(i / 2) * 6,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.7"
      );

      // Add empty timeline space after all animations finish (for 2 scroll events)
      // This creates scrollable space where nothing animates, just static final state
      // All animations finish around position 3.0, so delay starts after that
      tl.to({}, { duration: 0.5 }, ">");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-white"
    >
      {/* CENTER TEXT - Behind cards */}
      <h1
        ref={textRef}
        className="absolute text-center text-[clamp(2rem,6vw,8rem)] lg:text-[clamp(3rem,6vw,10rem)] xl:text-[clamp(4rem,6vw,12rem)] font-semibold tracking-tight z-0 px-4"
      >
        Accelerate Your Growth
      </h1>

      {/* CARDS - On top */}
      <div className="relative w-full h-full pointer-events-none z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 w-[150px] h-[143px] sm:w-[180px] sm:h-[172px] md:w-[200px] md:h-[191px] lg:w-[240px] lg:h-[230px] xl:w-[280px] xl:h-[268px] 2xl:w-[320px] 2xl:h-[306px] rounded-2xl sm:rounded-3xl shadow-xl bg-white"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Replace with real card UI or images */}
          </div>
        ))}
      </div>
    </section>
  );
}
