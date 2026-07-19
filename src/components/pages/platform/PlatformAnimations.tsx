"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PlatformAnimations — handles platform-specific premium animations:
 * 1. Hero Split-Slide: Words/lines slide in from left/right on load
 * 2. Perspective Tilt: UI mock flattens and scales up on scroll
 * 3. Horizontal Timeline: Journey steps translate horizontally on scroll
 * 4. Parallax Depth Stack: Overlapping webtoon cards spread out
 * 5. Curtain Wipe: Swipe divider reveals CultX pipeline
 * 6. Constellation: Orbit nodes light up and trigger SVG line highlights
 */
export function PlatformAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. HERO SPLIT-SLIDE (Runs on load)
      // -------------------------------------------------------------
      const hero = document.querySelector("[data-platform-hero]");
      if (hero) {
        const leftLines = hero.querySelectorAll('[data-from="left"]');
        const rightLines = hero.querySelectorAll('[data-from="right"]');
        const introElements = hero.querySelectorAll("[data-hero-intro]");

        gsap.set([leftLines, rightLines], { autoAlpha: 0 });
        gsap.set(leftLines, { x: -60 });
        gsap.set(rightLines, { x: 60 });

        // Let standard intro animations complete, then slide titles in
        gsap.to(leftLines, {
          x: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.35,
          stagger: 0.1,
        });

        gsap.to(rightLines, {
          x: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.35,
          stagger: 0.1,
        });
      }

      // -------------------------------------------------------------
      // 2. PERSPECTIVE TILT
      // -------------------------------------------------------------
      const tiltElement = document.querySelector("[data-perspective-tilt]");
      if (tiltElement) {
        gsap.fromTo(
          tiltElement,
          { rotateX: 6, scale: 0.93 },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: tiltElement,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      // -------------------------------------------------------------
      // 3. HORIZONTAL TIMELINE SCRUB (Desktop Only >= 800px)
      // -------------------------------------------------------------
      const timelineScope = document.querySelector("[data-h-timeline]");
      if (timelineScope && window.innerWidth >= 800) {
        const track = timelineScope.querySelector("[data-h-timeline-track]");
        const progressFill = timelineScope.querySelector("[data-h-timeline-progress]");
        const counter = timelineScope.querySelector("[data-h-timeline-counter]");
        const steps = timelineScope.querySelectorAll("[data-h-timeline-step]");
        const stepCount = steps.length;

        if (track && stepCount > 0) {
          // Track horizontal translation (scroll vertically, slide horizontally)
          // 5 steps: translate by (stepCount - 1) * 100% of container width
          const totalSlidePercent = -(stepCount - 1) * 100;

          gsap.fromTo(
            track,
            { xPercent: 0 },
            {
              xPercent: totalSlidePercent,
              ease: "none",
              scrollTrigger: {
                trigger: timelineScope,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          // Progress bar fill (0 -> 1)
          if (progressFill) {
            gsap.fromTo(
              progressFill,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: timelineScope,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                },
              }
            );
          }

          // Step active tags & huge counter update
          ScrollTrigger.create({
            trigger: timelineScope,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              // Determine active step index (0 to stepCount-1)
              const activeIndex = Math.min(
                stepCount - 1,
                Math.floor(progress * stepCount)
              );

              // Update data-active attribute on steps
              steps.forEach((step, idx) => {
                if (idx === activeIndex) {
                  step.setAttribute("data-active", "true");
                } else {
                  step.removeAttribute("data-active");
                }
              });

              // Update counter text
              if (counter) {
                const countStr = String(activeIndex + 1).padStart(2, "0");
                if (counter.textContent !== countStr) {
                  counter.textContent = countStr;
                }
              }
            },
          });
        }
      }

      // -------------------------------------------------------------
      // 4. PARALLAX DEPTH STACK
      // -------------------------------------------------------------
      const stackScope = document.querySelector("[data-depth-stack]");
      if (stackScope) {
        const cards = stackScope.querySelectorAll("[data-depth-card]");
        
        cards.forEach((card) => {
          const depth = parseFloat(card.getAttribute("data-depth") || "1");
          // Cards split apart: deeper cards translate down faster
          const targetY = -40 * depth;

          gsap.fromTo(
            card,
            { y: 40 * depth },
            {
              y: targetY,
              ease: "none",
              scrollTrigger: {
                trigger: stackScope,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }

      // -------------------------------------------------------------
      // 5. CURTAIN WIPE (Desktop Only >= 800px)
      // -------------------------------------------------------------
      const wipeScope = document.querySelector("[data-curtain-wipe]");
      if (wipeScope && window.innerWidth >= 800) {
        const newPanel = wipeScope.querySelector("[data-curtain-new]");
        const divider = wipeScope.querySelector("[data-curtain-divider]");
        const oldContent = wipeScope.querySelector("[data-curtain-old]");

        if (newPanel && divider) {
          // Swipe divider left to right (0% to 100%)
          gsap.fromTo(
            divider,
            { left: "0%" },
            {
              left: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: wipeScope,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          // Wipe new panel clip path to reveal it
          gsap.fromTo(
            newPanel,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: wipeScope,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          // Dim old panel content as new sweeps in
          if (oldContent) {
            gsap.fromTo(
              oldContent,
              { opacity: 1 },
              {
                opacity: 0.35,
                ease: "none",
                scrollTrigger: {
                  trigger: wipeScope,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                },
              }
            );
          }
        }
      }

      // -------------------------------------------------------------
      // 6. CONSTELLATION DIAGRAM (Desktop Only >= 800px)
      // -------------------------------------------------------------
      const constellationScope = document.querySelector("[data-constellation]");
      if (constellationScope && window.innerWidth >= 800) {
        const nodes = constellationScope.querySelectorAll("[data-constellation-node]");
        const lines = constellationScope.querySelectorAll("[data-constellation-line]");

        // Animate node appearance (scale + fade in)
        gsap.fromTo(
          nodes,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            ease: "back.out(1.5)",
            duration: 0.8,
            scrollTrigger: {
              trigger: constellationScope,
              start: "top 75%",
              once: true,
            },
          }
        );

        // Scrub active state on scroll
        ScrollTrigger.create({
          trigger: constellationScope,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const nodeCount = nodes.length;

            nodes.forEach((node, idx) => {
              // Active threshold spaced evenly across progress
              const threshold = idx / (nodeCount - 0.5);
              const line = lines[idx];

              if (progress >= threshold) {
                node.setAttribute("data-active", "true");
                line?.setAttribute("data-active", "true");
              } else {
                node.removeAttribute("data-active");
                line?.removeAttribute("data-active");
              }
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
