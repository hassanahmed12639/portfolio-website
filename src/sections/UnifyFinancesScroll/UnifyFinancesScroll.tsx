"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function UnifyFinancesScroll() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);
  const wordsRef = useRef([]);

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
        { x: -(sectionWidth / 2 + offScreenOffset), y: -(sectionHeight / 2 + offScreenOffset) }, // top-left
        { x: sectionWidth / 2 + offScreenOffset, y: -(sectionHeight / 2 + offScreenOffset) }, // top-right
        { x: -(sectionWidth / 2 + offScreenOffset), y: sectionHeight / 2 + offScreenOffset }, // bottom-left
        { x: sectionWidth / 2 + offScreenOffset, y: sectionHeight / 2 + offScreenOffset }, // bottom-right
      ];

      // Set initial positions (off-screen and invisible)
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, {
            x: cardPositions[i].x,
            y: cardPositions[i].y,
            opacity: 0,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      /* Cards animate in from corners and stack in center */
      cardsRef.current.forEach((card, i) => {
        if (card) {
          tl.to(
            card,
            {
              x: (i % 2) * 6, // slight offset for stacking (left/right)
              y: Math.floor(i / 2) * 6, // slight offset for stacking (top/bottom)
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            i * 0.1 // stagger slightly
          );
        }
      });

      /* Text hides behind cards */
      tl.to(
        textRef.current,
        {
          scale: 0.45,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<0.5"
      );

      /* Final stack positioning */
      tl.to(
        cardsRef.current,
        {
          x: (i) => (i % 2) * 6,
          y: (i) => Math.floor(i / 2) * 6,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      /* Words animation - starts immediately after card stacking */
      const words = wordsRef.current.filter(Boolean);
      if (words.length > 0) {
        // Set initial state: words start off-screen at the bottom
        gsap.set(words, {
          y: 600,
          opacity: 0,
        });

        // Animate each word: slide up from bottom
        words.forEach((word, i) => {
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
      }
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
        className="absolute text-center text-[clamp(3rem,6vw,6rem)] font-semibold tracking-tight z-0"
      >
        Accelerate Your Growth
      </h1>

      {/* CARDS - On top */}
      <div className="relative w-full h-full pointer-events-none z-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 w-[450px] h-[550px] rounded-3xl shadow-xl bg-white"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Replace with real card UI or images */}
          </div>
        ))}
      </div>

      {/* WORDS - ADD, SEND, EXCHANGE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-24 z-20 pointer-events-none">
        {["ADD", "SEND", "EXCHANGE"].map((word, i) => (
          <div
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="text-center"
          >
            <h2 className="text-[clamp(5rem,12vw,12rem)] font-bold tracking-tight leading-none">
              {word}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
