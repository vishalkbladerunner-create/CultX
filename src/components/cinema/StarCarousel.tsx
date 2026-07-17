"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { MediaFrame } from "@/components/kit/MediaFrame";
import styles from "./StarCarousel.module.css";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

export type StarSlide = {
  id: string;
  name: string;
  badge: string;
  body: string;
  role: string;
  /** MediaFrame slot id for the portrait */
  slot: string;
  /** MediaFrame role label (uppercase) */
  frameLabel: string;
};

export type StarCarouselProps = {
  slides: readonly StarSlide[];
  /** Region aria-label */
  ariaLabel?: string;
  /** Deliverable spec shown in the portrait MediaFrame */
  portraitSpec?: string;
};

/**
 * StarCarousel — reference M19 rebuilt for CultX (spec §3-P5).
 *
 * RAF autoplay at 5000ms/slide; a `.progress-fill` per slide sweeps
 * 0→100% then advances (modulo). Hover pauses the clock and resumes
 * with the remaining time; prev/next square icon-tile controls (UIButton
 * visual family) reset progress. Only the `.active` slide is visible
 * (0.5s crossfade via grid-stacked slides). The slide name does a masked
 * yPercent swap on each activation.
 *
 * A11y: real <button> controls, slides carry aria-roledescription="slide",
 * region labelled. Reduced motion: no autoplay, first slide static,
 * controls still switch slides instantly.
 * Data: star IP cards verbatim (03-home.md §6 / 07-stars.md) — home
 * passes `home-star-*` slots, /stars passes `star-*` slots.
 */
const DURATION = 5000;
const DEFAULT_SPEC = "Character portrait · 1200×1800 PNG/WebP";

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8.76 12.99L6.78 12.99L1.75 7.86L7.01 2.5L8.78 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M14.74 7.77L1.74 7.81" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M7.24 12.99L9.22 12.99L14.25 7.86L8.99 2.5L7.22 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M1.26 7.77L14.26 7.81" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function StarCarousel({
  slides,
  ariaLabel = "Star IPs",
  portraitSpec = DEFAULT_SPEC,
}: StarCarouselProps) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const clock = useRef({ elapsed: 0, hovering: false });
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  /* Masked name swap on every activation (M15 mechanics, per P5). */
  useEffect(() => {
    activeRef.current = active;
    if (reduced) return;
    const name = nameRefs.current[active];
    if (!name) return;
    gsap.fromTo(
      name,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" }
    );
  }, [active, reduced]);

  /* RAF autoplay + progress sweep. Progress is written straight to the
     fill nodes — no per-frame React re-render. */
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      const c = clock.current;
      if (!c.hovering) {
        c.elapsed += dt;
        if (c.elapsed >= DURATION) {
          c.elapsed = 0;
          setActive((a) => (a + 1) % slides.length);
        }
      }
      const pct = Math.min(100, (c.elapsed / DURATION) * 100);
      fillRefs.current.forEach((el, i) => {
        if (el) el.style.width = i === activeRef.current ? `${pct}%` : "0%";
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, slides.length]);

  function goTo(next: number) {
    clock.current.elapsed = 0;
    fillRefs.current.forEach((el) => {
      if (el) el.style.width = "0%";
    });
    setActive(((next % slides.length) + slides.length) % slides.length);
  }

  return (
    <div
      className={styles.root}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => {
        clock.current.hovering = true;
      }}
      onMouseLeave={() => {
        clock.current.hovering = false;
      }}
    >
      <div className={styles.viewport}>
        {slides.map((s, i) => {
          const isActive = i === active;
          return (
            <article
              key={s.id}
              className={`${styles.slide} ${isActive ? styles.active : ""}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!isActive}
            >
              <div className={styles.portraitHost}>
                <MediaFrame
                  slot={s.slot}
                  label={s.frameLabel}
                  spec={portraitSpec}
                  fill
                />
              </div>
              <div className={styles.slideMeta}>
                <div className={styles.nameMask}>
                  <h3
                    className={styles.name}
                    ref={(el) => {
                      nameRefs.current[i] = el;
                    }}
                  >
                    {s.name}
                  </h3>
                </div>
                <span className={styles.badge}>{s.badge}</span>
                <p className={styles.body}>{s.body}</p>
                <p className={styles.role}>{s.role}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.controls}>
        <div className={styles.progress} aria-hidden>
          {slides.map((s, i) => (
            <span key={s.id} className={styles.progressTrack}>
              <span
                className={styles.progressFill}
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.controlBtn}
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
          >
            <span className={styles.controlStack}>
              <span>
                <ArrowLeft />
              </span>
              <span aria-hidden>
                <ArrowLeft />
              </span>
            </span>
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
          >
            <span className={styles.controlStack}>
              <span>
                <ArrowRight />
              </span>
              <span aria-hidden>
                <ArrowRight />
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
