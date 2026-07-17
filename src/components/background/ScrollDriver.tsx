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
 * ScrollDriver — the reference motion stack, rebuilt for CultK.
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

      /* ---- M03 — section theme flip on the header ---- */
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      if (header) {
        gsap.utils
          .toArray<HTMLElement>("[data-theme-section]")
          .forEach((section) => {
            const theme =
              section.dataset.themeSection === "light" ? "light" : "dark";
            ScrollTrigger.create({
              trigger: section,
              start: `top ${HEADER_THEME_OFFSET}px`,
              end: `bottom ${HEADER_THEME_OFFSET}px`,
              onEnter: () => header.setAttribute("data-theme", theme),
              onEnterBack: () => header.setAttribute("data-theme", theme),
              onLeaveBack: () =>
                header.setAttribute(
                  "data-theme",
                  theme === "dark" ? "light" : "dark"
                ),
            });
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

      /* ---- M09 — journey scrolly: sticky stage frames crossfade per step ---- */
      const journey = document.querySelector<HTMLElement>("[data-journey]");
      if (journey && !reduced) {
        const frames = gsap.utils.toArray<HTMLElement>(
          "[data-journey-frame]",
          journey
        );
        const steps = gsap.utils.toArray<HTMLElement>(
          "[data-journey-step]",
          journey
        );
        if (frames.length && steps.length) {
          gsap.set(frames, { autoAlpha: 0 });
          gsap.set(frames[0], { autoAlpha: 1 });
          steps.forEach((step, i) => {
            const show = () =>
              gsap.to(frames, {
                autoAlpha: (f) => (f === i ? 1 : 0),
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            ScrollTrigger.create({
              trigger: step,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: show,
              onEnterBack: show,
            });
          });
        }
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
