"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function UnifyFinancesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            force3D: true,
            transformOrigin: "center center",
          });
        }
      });

      // Set initial state for text: fully visible and normal size by default
      // Use xPercent and yPercent for proper centering via transforms
      if (textRef.current) {
        gsap.set(textRef.current, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          y: 0,
          opacity: 1,
          scale: 1,
          force3D: true,
          smoothOrigin: true,
        });
      }

      // Calculate when all animations finish
      // Cards finish around position 1.9, final stack at 3.0
      // Add 100% scroll distance after all animations (2 scroll wheel events)
      // Total: 250% for animations + 100% delay = 350% scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 3,
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
              duration: 3,
              ease: "sine.out",
              force3D: true,
              immediateRender: false,
            },
            i * 0.3 // stagger slightly - each card starts after the previous
          );
        }
      });

      /* Text gradually shrinks as cards approach */
      tl.to(
        textRef.current,
        {
          scale: 0.45,
          opacity: 0,
          duration: 3.5,
          ease: "none",
          force3D: true,
          smoothOrigin: true,
        },
        0 // Start shrinking as soon as scrolling begins
      );

      // Cards are already in final stacked position, no additional animation needed

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
      aria-label="Unify your finances section"
    >
      {/* CENTER TEXT - Behind cards */}
      <h1
        ref={textRef}
        className="absolute text-center text-[clamp(3.25rem,8.5vw,10.5rem)] md:text-[clamp(4.25rem,10.5vw,14.5rem)] lg:text-[clamp(5.25rem,12.5vw,18.5rem)] xl:text-[clamp(6.25rem,14.5vw,22.5rem)] 2xl:text-[clamp(7.25rem,16.5vw,26.5rem)] font-semibold tracking-tight z-0 px-4 leading-none"
        style={{ 
          willChange: "transform, opacity", 
          color: "#FF4B3A",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)"
        }}
      >
        <span className="block">Unify your</span>
        <span className="block mt-[0.35em]">finances</span>
      </h1>

      {/* CARDS - On top */}
      <div className="relative w-full h-full pointer-events-none z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 w-[120px] h-[115px] xs:w-[150px] xs:h-[143px] sm:w-[180px] sm:h-[172px] md:w-[200px] md:h-[191px] lg:w-[240px] lg:h-[230px] xl:w-[280px] xl:h-[268px] 2xl:w-[320px] 2xl:h-[306px] rounded-2xl sm:rounded-3xl shadow-xl bg-white"
            style={{
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity",
            }}
            aria-hidden="true"
          >
            {/* Replace with real card UI or images */}
          </div>
        ))}
      </div>
    </section>
  );
}
