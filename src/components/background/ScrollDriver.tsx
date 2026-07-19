"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  DOME_DEFAULTS,
  domeParallaxScale,
  type DomePosition,
} from "@/lib/background/stages";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const HEADER_THEME_OFFSET = 29; // ref BY-mI6BR.js: start/end "top 29px"

/**
 * ScrollDriver — the reference motion stack, rebuilt for CultX.
 *
 * - M01 Lenis smooth scroll (mounted once for the app shell)
 * - M05 / M03 / M06 / M07 re-bind on every route so sub-pages get the same
 *   backbone motion as home (domes, theme flip, reveals, scroll-fill)
 */
export function ScrollDriver() {
  const pathname = usePathname();

  /* Lenis once — survives client navigations between sub-pages */
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const lenis = new Lenis();
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  /* ScrollTriggers + reveals — re-run when the route changes */
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // New page: jump scroll to top so Lenis + ST start clean
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      /* ---- M05 — dome parallax ---- */
      gsap.utils.toArray<HTMLElement>("[data-dome]").forEach((el) => {
        const position = (el.dataset.domePosition || "top") as DomePosition;
        gsap.set(el, {
          "--parallax-scale": DOME_DEFAULTS.parallaxInitialScale,
        });
        if (reduced) return;
        ScrollTrigger.create({
          trigger: el,
          start: position === "top" ? "top top" : "top bottom",
          end: position === "top" ? "bottom top" : "bottom center",
          refreshPriority: -1,
          onUpdate: (self) => {
            el.style.setProperty(
              "--parallax-scale",
              String(domeParallaxScale(self.progress, position))
            );
          },
        });
      });

      /* ---- M03 — section theme flip on the header ----
         Never guess from one section's leave direction (that stranded the
         header in "light" on dark pages → invisible logo text). On every
         scroll update, recompute the theme from the section actually under
         the 29px line; nested sections resolve to the deepest match. */
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      if (header) {
        const themeSections = gsap.utils.toArray<HTMLElement>(
          "[data-theme-section]"
        );
        const applyHeaderTheme = () => {
          let theme: "dark" | "light" = "dark";
          const y = HEADER_THEME_OFFSET;
          for (const section of themeSections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= y && rect.bottom >= y) {
              theme =
                section.dataset.themeSection === "light" ? "light" : "dark";
            }
          }
          if (header.getAttribute("data-theme") !== theme) {
            header.setAttribute("data-theme", theme);
          }
        };
        ScrollTrigger.create({
          trigger: document.body,
          start: 0,
          end: "max",
          onUpdate: applyHeaderTheme,
          onRefresh: applyHeaderTheme,
          onToggle: applyHeaderTheme,
        });
      }

      /* ---- M06 — viewport reveals ---- */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (reduced) {
          gsap.set(el, { autoAlpha: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      /* ---- M11 — staggered list reveals: direct children of [data-stagger] ---- */
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        const items = Array.from(wrap.children) as HTMLElement[];
        if (!items.length) return;
        if (reduced) {
          gsap.set(items, { autoAlpha: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: wrap, start: "top 82%" },
          }
        );
      });

      /* ---- M15 — masked title reveal: inner slides up out of its mask ---- */
      gsap.utils.toArray<HTMLElement>("[data-mask-reveal]").forEach((wrap) => {
        const inner = wrap.firstElementChild as HTMLElement | null;
        if (!inner) return;
        if (reduced) {
          gsap.set(inner, { yPercent: 0, autoAlpha: 1 });
          return;
        }
        gsap.fromTo(
          inner,
          { yPercent: 100, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
          }
        );
      });

      /* ---- M09 — sticky-stage scrolly: frames crossfade per step ----
         One generalized contract:
           [data-stage-scope]  + [data-stage-frame]/[data-stage-step]
         (home FormatStage, platform journey). Optional
         [data-stage-caption] items under the poster swap via
         data-active (kept off the art so titles never fight the visual). */
      const bindStage = (
        scope: HTMLElement,
        frameSelector: string,
        stepSelector: string
      ) => {
        if (reduced) return;
        const frames = gsap.utils.toArray<HTMLElement>(
          scope.querySelectorAll(frameSelector)
        );
        const steps = gsap.utils.toArray<HTMLElement>(
          scope.querySelectorAll(stepSelector)
        );
        /* Prefer querySelectorAll — reliable under sticky/nested scope */
        const captions = Array.from(
          scope.querySelectorAll<HTMLElement>("[data-stage-caption]")
        );
        if (!frames.length || !steps.length) return;
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[0], { autoAlpha: 1 });
        const setCaption = (i: number) => {
          captions.forEach((cap, ci) => {
            if (ci === i) cap.setAttribute("data-active", "");
            else cap.removeAttribute("data-active");
          });
        };
        setCaption(0);
        steps.forEach((step, i) => {
          const show = () => {
            gsap.to(frames, {
              autoAlpha: (f) => (f === i ? 1 : 0),
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
            setCaption(i);
            const title =
              frames[i]?.querySelector<HTMLElement>("[data-stage-title]");
            if (title) {
              gsap.fromTo(
                title,
                { yPercent: 100 },
                {
                  yPercent: 0,
                  duration: 0.5,
                  ease: "power3.out",
                  overwrite: "auto",
                }
              );
            }
          };
          ScrollTrigger.create({
            trigger: step,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: show,
            onEnterBack: show,
          });
        });
      };

      gsap.utils
        .toArray<HTMLElement>("[data-stage-scope]")
        .forEach((scope) =>
          bindStage(scope, "[data-stage-frame]", "[data-stage-step]")
        );

      /* ---- Progressive chains — steps activate as a line draws past ----
         Two axis variants of one mechanism:
           [data-chain]     + [data-chain-step]    + [data-chain-line]    (x)
           [data-timeline]  + [data-timeline-step] + [data-timeline-line] (y)
         Monetize token loop (horizontal) + about roadmap (vertical).
         Reduced motion: all steps active, line full. */
      const bindProgressChain = (
        scope: HTMLElement,
        stepSelector: string,
        lineSelector: string,
        axis: "x" | "y"
      ) => {
        const steps = gsap.utils.toArray<HTMLElement>(
          scope.querySelectorAll(stepSelector)
        );
        const line = scope.querySelector<HTMLElement>(lineSelector);
        if (!steps.length) return;
        if (reduced) {
          steps.forEach((s) => s.setAttribute("data-active", ""));
          return;
        }
        const setActive = (p: number) => {
          steps.forEach((s, i) => {
            const threshold =
              steps.length === 1 ? 0 : i / (steps.length - 1);
            if (p >= threshold - 0.001) s.setAttribute("data-active", "");
            else s.removeAttribute("data-active");
          });
        };
        setActive(0);
        ScrollTrigger.create({
          trigger: scope,
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
          onUpdate: (self) => {
            if (line) {
              line.style.transform =
                axis === "x"
                  ? `scaleX(${self.progress})`
                  : `scaleY(${self.progress})`;
            }
            setActive(self.progress);
          },
        });
      };

      gsap.utils
        .toArray<HTMLElement>("[data-chain]")
        .forEach((el) =>
          bindProgressChain(el, "[data-chain-step]", "[data-chain-line]", "x")
        );
      gsap.utils
        .toArray<HTMLElement>("[data-timeline]")
        .forEach((el) =>
          bindProgressChain(
            el,
            "[data-timeline-step]",
            "[data-timeline-line]",
            "y"
          )
        );

      /* ---- Atmosphere drift — scrubbed CSS vars on the fixed wash ----
         Gradient center sinks (-30% → -14%) and a faint hue tint
         (0deg → 14deg) as the page scrolls. One fixed layer, cheap. */
      const atmo = document.querySelector<HTMLElement>("[data-atmo]");
      if (atmo && !reduced) {
        const atmoY = gsap.utils.interpolate(-30, -14);
        const atmoHue = gsap.utils.interpolate(0, 14);
        const writeAtmo = (progress: number) => {
          atmo.style.setProperty("--ck-atmo-y", `${atmoY(progress)}%`);
          atmo.style.setProperty("--ck-atmo-hue", `${atmoHue(progress)}deg`);
        };
        writeAtmo(0);
        ScrollTrigger.create({
          trigger: document.body,
          start: 0,
          end: "max",
          scrub: true,
          onUpdate: (self) => writeAtmo(self.progress),
        });
      }

      /* ---- M07 — scroll-scrubbed word fill ---- */
      gsap.utils.toArray<HTMLElement>("[data-scroll-fill]").forEach((block) => {
        const words = block.querySelectorAll<HTMLElement>("[data-fill-word]");
        if (!words.length) return;
        if (reduced) {
          gsap.set(words, { opacity: 1 });
          return;
        }
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );
      });

      /* ---- Hero intro (plays once per route) ---- */
      const intro = document.querySelectorAll<HTMLElement>("[data-hero-intro]");
      if (intro.length && !reduced) {
        gsap.fromTo(
          intro,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.09,
            delay: 0.15,
          }
        );
      } else if (intro.length) {
        gsap.set(intro, { autoAlpha: 1, y: 0 });
      }

      /*
       * Footer wordmark slide-in — exact SiteFooter DNA (CfV00Epg.js):
       *   gsap.set(placeholder, { y: 200 })
       *   gsap.to(placeholder, { y: 0 })
       *   ScrollTrigger: trigger=wordmark-wrapper,
       *     start "top bottom", end "bottom bottom", scrub: 0.8
       */
      const wmTrigger = document.querySelector<HTMLElement>(
        "[data-wordmark-trigger]"
      );
      const wmSlide = document.querySelector<HTMLElement>(
        "[data-wordmark-slide]"
      );
      if (wmTrigger && wmSlide) {
        if (reduced) {
          gsap.set(wmSlide, { y: 0 });
        } else {
          const tl = gsap.timeline({ paused: true });
          tl.set(wmSlide, { y: 200 });
          tl.to(wmSlide, { y: 0, ease: "none" });
          ScrollTrigger.create({
            animation: tl,
            trigger: wmTrigger,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          });
        }
      }
    });

    /*
     * Route change = new page height. Lenis caches its scroll `limit`
     * internally, so without an explicit resize it clamps wheel scrolling
     * to the PREVIOUS page's height (users got "stuck" before the bottom
     * on any page longer than the one they came from). Recalculate on
     * every navigation and again after content settles.
     */
    window.__lenis?.resize();
    const refreshAll = () => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
    };
    const t1 = window.setTimeout(refreshAll, 50);
    const t2 = window.setTimeout(refreshAll, 300);
    const t3 = window.setTimeout(refreshAll, 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
