"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PillarsAnimationsProps {
  onOpenDrawer: () => void;
}

/**
 * PillarsAnimations — client-side premium motion:
 * 1. Map/Overview Anchor Smooth Scrolls
 * 2. Orbital Step Sequence (Chapter 1) — clean sequential reveals
 * 3. Magnetic Parallax Grid (Chapter 3) — Phone reels float/scale/rotate at varying speeds on scroll
 * 4. Chapter Wipes — Cinematic brand-green overlays
 */
export function PillarsAnimations({ onOpenDrawer }: PillarsAnimationsProps) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. Map/Overview Anchor Smooth Scrolls
      // -------------------------------------------------------------
      const anchors = document.querySelectorAll("[data-pillar-anchor]");
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute("href");
          if (!targetId) return;
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            if (window.__lenis) {
              window.__lenis.scrollTo(targetEl as HTMLElement, { offset: -60 });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      });

      // -------------------------------------------------------------
      // 2. Chapter 1: Orbital Step Sequence (AI Comic / Webtoon)
      //    We animate step items with clean sequential reveals to preserve readability.
      // -------------------------------------------------------------
      const orbitalContainer = document.querySelector("[data-orbital-steps]");
      if (orbitalContainer) {
        const nodes = orbitalContainer.querySelectorAll("[data-orbital-node]");
        if (nodes.length > 0) {
          gsap.fromTo(
            nodes,
            { 
              opacity: 0.15,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: orbitalContainer,
                start: "top 85%",
                end: "bottom 65%",
                scrub: true,
              }
            }
          );
        }
      }

      // -------------------------------------------------------------
      // 3. Chapter 3: Magnetic Parallax Grid (AI Short)
      //    Phones drift, scale, and rotate slightly at different speeds on scroll.
      // -------------------------------------------------------------
      const phoneGrid = document.querySelector("[data-phone-reel]");
      if (phoneGrid) {
        const phones = phoneGrid.querySelectorAll("[data-phone-frame]");
        phones.forEach((phone, idx) => {
          const depth = (idx + 1) * 1.5;
          const rotateDirection = idx === 0 ? -6 : idx === 2 ? 6 : -2;

          gsap.fromTo(
            phone,
            {
              y: 60 * depth,
              rotate: rotateDirection * 1.5,
              scale: 0.95
            },
            {
              y: -50 * depth,
              rotate: rotateDirection * 0.5,
              scale: 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: phoneGrid,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
      }

      // -------------------------------------------------------------
      // 4. Chapter Wipes: Full-viewport color wipes on scroll (Pure Green)
      // -------------------------------------------------------------
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
                }
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
