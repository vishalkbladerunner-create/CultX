"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * MonetizeAnimations — dedicated custom motion physics for /monetize:
 * 1. Hero Reveal & Value Counter Pulse
 * 2. Value Stream Matrix: scroll-driven laser path connecting revenue streams
 * 3. IP Growth Flywheel (Scrollytelling): rotating orbital ring synced to 6-step loop
 * 4. Interactive IP Trading Terminal: live chart SVG line draw, metric increment counters
 * 5. 3D Physical Asset Vault: perspective depth stack with edge conduction lighting
 */
export function MonetizeAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. HERO REVEAL & VALUE COUNTER PULSE
      // -------------------------------------------------------------
      const hero = document.querySelector("[data-monetize-hero]");
      if (hero) {
        const badge = hero.querySelector("[data-hero-badge]");
        const title = hero.querySelector("[data-hero-title]");
        const blurb = hero.querySelector("[data-hero-blurb]");
        const ctas = hero.querySelector("[data-hero-ctas]");
        const ticker = hero.querySelector("[data-hero-ticker]");

        gsap.fromTo(
          [badge, title, blurb, ctas, ticker].filter(Boolean),
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.15,
          }
        );
      }

      // -------------------------------------------------------------
      // 2. VALUE STREAM MATRIX — Laser stream connect on scroll
      // -------------------------------------------------------------
      const matrixScope = document.querySelector("[data-value-matrix]");
      if (matrixScope) {
        const nodes = matrixScope.querySelectorAll("[data-matrix-node]");
        const line = matrixScope.querySelector<SVGPathElement>("[data-matrix-line]");

        if (line) {
          const length = line.getTotalLength();
          line.style.strokeDasharray = String(length);
          line.style.strokeDashoffset = String(length);

          gsap.to(line, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: matrixScope,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          });
        }

        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0.3, scale: 0.95 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // -------------------------------------------------------------
      // 3. IP GROWTH FLYWHEEL — Pinned Scrollytelling Orbit (>= 800px)
      // -------------------------------------------------------------
      const flywheelScope = document.querySelector("[data-flywheel-scope]");
      if (flywheelScope && window.innerWidth >= 800) {
        const wheel = flywheelScope.querySelector("[data-flywheel-ring]");
        const steps = flywheelScope.querySelectorAll("[data-flywheel-step]");
        const vectors = flywheelScope.querySelectorAll("[data-flywheel-vector]");
        const activeNum = flywheelScope.querySelector("[data-flywheel-active-num]");

        const totalSteps = steps.length;

        ScrollTrigger.create({
          trigger: flywheelScope,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            const stepIndex = Math.min(totalSteps - 1, Math.floor(p * totalSteps));

            // Rotate central orbital ring
            if (wheel) {
              gsap.set(wheel, { rotation: p * 360 });
            }

            // Highlight current step & vector
            steps.forEach((step, i) => {
              if (i === stepIndex) {
                step.setAttribute("data-active", "true");
              } else {
                step.removeAttribute("data-active");
              }
            });

            vectors.forEach((v, i) => {
              if (i === stepIndex % vectors.length) {
                v.setAttribute("data-active", "true");
              } else {
                v.removeAttribute("data-active");
              }
            });

            if (activeNum) {
              activeNum.textContent = String(stepIndex + 1).padStart(2, "0");
            }
          },
        });
      }

      // -------------------------------------------------------------
      // 4. INTERACTIVE TRADING TERMINAL — Chart draw & Live counters
      // -------------------------------------------------------------
      const terminalScope = document.querySelector("[data-terminal-scope]");
      if (terminalScope) {
        const chartPath = terminalScope.querySelector<SVGPathElement>("[data-chart-path]");
        const chartGradient = terminalScope.querySelector<SVGPathElement>("[data-chart-fill]");
        const counters = terminalScope.querySelectorAll<HTMLElement>("[data-count-target]");

        if (chartPath) {
          const pathLen = chartPath.getTotalLength();
          chartPath.style.strokeDasharray = String(pathLen);
          chartPath.style.strokeDashoffset = String(pathLen);

          gsap.to(chartPath, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: terminalScope,
              start: "top 70%",
              once: true,
            },
          });
        }

        if (chartGradient) {
          gsap.fromTo(
            chartGradient,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.2,
              delay: 0.4,
              scrollTrigger: {
                trigger: terminalScope,
                start: "top 70%",
                once: true,
              },
            }
          );
        }

        // Counter scrubbers
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-count-target") || "0");
          const prefix = counter.getAttribute("data-count-prefix") || "";
          const suffix = counter.getAttribute("data-count-suffix") || "";
          const decimals = parseInt(counter.getAttribute("data-count-decimals") || "0", 10);

          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              counter.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
            },
          });
        });
      }

      // -------------------------------------------------------------
      // 5. 3D PHYSICAL ASSET VAULT — Fan-Out Depth Stack
      // -------------------------------------------------------------
      const vaultScope = document.querySelector("[data-vault-scope]");
      if (vaultScope) {
        const cards = vaultScope.querySelectorAll("[data-vault-card]");

        cards.forEach((card, idx) => {
          const depth = idx + 1;
          gsap.fromTo(
            card,
            {
              rotateY: (idx - 1) * 8,
              rotateX: 12,
              z: -30 * depth,
              y: 40 * depth,
              autoAlpha: 0,
            },
            {
              rotateY: 0,
              rotateX: 0,
              z: 0,
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: vaultScope,
                start: "top 75%",
                once: true,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
