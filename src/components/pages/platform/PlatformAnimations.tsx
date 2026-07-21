"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PlatformAnimations — platform-specific premium animations:
 * 1. Hero Split-Slide: lines slide in from left/right on load
 * 2. Definition fill: word-by-word fill with a SHORT, EARLY window
 *    (page-local — the shared M07 window is tuned for 100vh home panels;
 *    this section is taller, so the fill must complete while the text is
 *    still mid-viewport, not after it has scrolled to the top)
 * 3. Perspective Tilt: UI mock flattens and scales up on scroll
 * 4. Horizontal Timeline: journey steps translate horizontally on scroll
 * 5. Parallax Depth Stack: webtoon cards drift at different speeds
 * 6. Curtain Wipe: new panel reveals over old (no hard divider line)
 * 7. Constellation: lines draw center→node, nodes activate in sequence
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

        gsap.set([leftLines, rightLines], { autoAlpha: 0 });
        gsap.set(leftLines, { x: -60 });
        gsap.set(rightLines, { x: 60 });

        gsap.to([leftLines, rightLines], {
          x: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.35,
          stagger: 0.1,
        });
      }

      // -------------------------------------------------------------
      // 2. DEFINITION FILL — unpinned scroll window
      //    Fills the words sequentially as the section scrolls normally.
      // -------------------------------------------------------------
      const coreSection = document.querySelector("[data-platform-fill]");
      if (coreSection) {
        const coreCopy = coreSection.querySelector("p:not([class*='coreEyebrow'])") || coreSection;
        const words = coreSection.querySelectorAll("[data-fill-word]");
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: coreCopy,
                start: "top 75%",
                end: "bottom 52%",
                scrub: true,
              },
            }
          );
        }
      }

      // -------------------------------------------------------------
      // 3. PERSPECTIVE TILT
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
      // 4. HORIZONTAL TIMELINE SCRUB (Desktop Only >= 800px)
      // -------------------------------------------------------------
      const timelineScope = document.querySelector("[data-h-timeline]");
      if (timelineScope && window.innerWidth >= 800) {
        const track = timelineScope.querySelector("[data-h-timeline-track]");
        const progressFill = timelineScope.querySelector("[data-h-timeline-progress]");
        const counter = timelineScope.querySelector("[data-h-timeline-counter]");
        const steps = timelineScope.querySelectorAll("[data-h-timeline-step]");
        const stepCount = steps.length;

        if (track && stepCount > 0) {
          const totalSlidePercent = -(stepCount - 1) * 100;

          // Set initial card opacities and blur
          gsap.set(steps, { opacity: 0.1, filter: "blur(6px)" });
          gsap.set(steps[0], { opacity: 1, filter: "blur(0px)" });

          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: timelineScope,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            }
          });

          // Hold the first slide for the first 8% of scroll distance
          mainTimeline.to(track, {
            xPercent: 0,
            duration: 0.08,
          });

          // Animate track sliding and card opacity step-by-step
          const transitionDuration = 0.92 / (stepCount - 1);
          for (let i = 0; i < stepCount - 1; i++) {
            const nextIdx = i + 1;
            const slideEndPercent = -(nextIdx * 100);

            // Move the track
            mainTimeline.to(track, {
              xPercent: slideEndPercent,
              ease: "none",
              duration: transitionDuration,
            }, `step-${i}`);

            // Fade out and blur current step card quickly (first 30% of transition)
            mainTimeline.to(steps[i], {
              opacity: 0.1,
              filter: "blur(6px)",
              ease: "power1.out",
              duration: transitionDuration * 0.3,
            }, `step-${i}`);

            // Fade in and sharpen next step card (starts after 35% of transition, takes 40% duration)
            mainTimeline.fromTo(steps[nextIdx],
              { opacity: 0.1, filter: "blur(6px)" },
              {
                opacity: 1,
                filter: "blur(0px)",
                ease: "power2.inOut",
                duration: transitionDuration * 0.4,
              },
              `step-${i}+=${transitionDuration * 0.35}`
            );
          }

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
              let activeIndex = 0;
              if (progress > 0.08) {
                const slideProgress = (progress - 0.08) / 0.92;
                activeIndex = Math.min(
                  stepCount - 1,
                  Math.round(slideProgress * (stepCount - 1))
                );
              }

              steps.forEach((step, idx) => {
                if (idx === activeIndex) {
                  step.setAttribute("data-active", "true");
                } else {
                  step.removeAttribute("data-active");
                }
              });

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
      // 5. PARALLAX DEPTH STACK
      // -------------------------------------------------------------
      const stackScope = document.querySelector("[data-depth-stack]");
      if (stackScope) {
        const cards = stackScope.querySelectorAll("[data-depth-card]");

        cards.forEach((card) => {
          const depth = parseFloat(card.getAttribute("data-depth") || "1");
          // Gentle drift — enough for depth, never enough to cover text
          const targetY = -24 * depth;

          gsap.fromTo(
            card,
            { y: 24 * depth },
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
      // 6. CURTAIN WIPE (Desktop Only >= 800px) — vertical swipe up;
      //    the new panel wipes up from the bottom with a glowing divider line,
      //    completing 90% of the transition before the section unpins.
      // -------------------------------------------------------------
      const wipeScope = document.querySelector("[data-curtain-wipe]");
      if (wipeScope && window.innerWidth >= 800) {
        const newPanel = wipeScope.querySelector("[data-curtain-new]");
        const oldPanel = wipeScope.querySelector("[data-curtain-old]");
        const divider = wipeScope.querySelector("[data-curtain-divider]");

        const wipeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: wipeScope,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });

        if (newPanel && oldPanel && divider) {
          // Slide old panel out slightly (vertically) and dim it
          wipeTimeline.fromTo(oldPanel,
            { opacity: 1, y: 0 },
            { opacity: 0.25, y: -30, duration: 0.8, ease: "none" },
            0
          );

          // Wipe new panel up to 90% at 80% progress
          wipeTimeline.fromTo(newPanel,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(10% 0 0 0)", duration: 0.8, ease: "none" },
            0
          );

          // Move glowing divider to 90% at 80% progress
          wipeTimeline.fromTo(divider,
            { top: "100%" },
            { top: "10%", duration: 0.8, ease: "none" },
            0
          );

          // Complete the remaining 10% from progress 0.8 to 1.0
          wipeTimeline.to(newPanel, {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.2,
            ease: "none"
          }, 0.8);

          wipeTimeline.to(divider, {
            top: "0%",
            duration: 0.2,
            ease: "none"
          }, 0.8);

          const newContent = newPanel.firstElementChild;
          if (newContent) {
            // Slide content in vertically
            wipeTimeline.fromTo(newContent,
              { y: 40 },
              { y: 0, duration: 0.8, ease: "none" },
              0
            );
          }
        }
      }

      // -------------------------------------------------------------
      // 7. CONSTELLATION (Desktop Only >= 800px) — lines draw from the
      //    center outward; nodes activate as their line completes
      // -------------------------------------------------------------
      const constellationScope = document.querySelector("[data-constellation]");
      if (constellationScope && window.innerWidth >= 800) {
        const nodes = Array.from(
          constellationScope.querySelectorAll<HTMLElement>("[data-constellation-node]")
        );
        const lines = Array.from(
          constellationScope.querySelectorAll<SVGLineElement>("[data-constellation-line]")
        );

        // Prime lines for the draw-in effect
        lines.forEach((line) => {
          const len = line.getTotalLength();
          line.style.strokeDasharray = String(len);
          line.style.strokeDashoffset = String(len);
        });

        // Nodes enter softly first
        gsap.fromTo(
          nodes,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.08,
            ease: "power2.out",
            duration: 0.7,
            scrollTrigger: {
              trigger: constellationScope,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Scrub: each line draws, then its node lights
        ScrollTrigger.create({
          trigger: constellationScope,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;

            nodes.forEach((node, idx) => {
              const line = lines[idx];
              const local = p; // All lines grow simultaneously from center to outer edge
              if (line) {
                line.style.strokeDashoffset = String(
                  line.getTotalLength() * (1 - local)
                );
                if (local >= 0.95) line.setAttribute("data-active", "true");
                else line.removeAttribute("data-active");
              }
              if (local >= 0.95) node.setAttribute("data-active", "true");
              else node.removeAttribute("data-active");
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
