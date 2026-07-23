"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * KDramaAnimations — client-side motion for dedicated K-Drama subpage:
 * 1. Chapter Wipes: Full-viewport atmospheric green wipes on scroll
 * 2. Storyboard Console reveals & camera pan parallax
 * 3. Audio waveform frequency pulse animations
 */
export function KDramaAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 1. Chapter Wipes: Full-viewport atmospheric green wipes on scroll
      const chapters = document.querySelectorAll("[data-chapter-wipe]");
      chapters.forEach((chap) => {
        const wipeOverlay = chap.querySelector("[data-wipe-overlay]");
        if (wipeOverlay) {
          gsap.fromTo(
            wipeOverlay,
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              ease: "none",
              scrollTrigger: {
                trigger: chap,
                start: "top 95%",
                end: "top 40%",
                scrub: true,
                onLeave: () => {
                  gsap.to(wipeOverlay, { opacity: 0, duration: 0.3 });
                },
                onEnterBack: () => {
                  gsap.to(wipeOverlay, { opacity: 0.08, duration: 0.1 });
                },
              },
            }
          );
        }
      });

      // 2. Reveal text animations
      const reveals = document.querySelectorAll("[data-reveal]");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
