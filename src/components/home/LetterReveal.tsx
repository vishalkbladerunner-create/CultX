"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Idempotent — ScrollDriver registers it too, but this component
   must also work standalone (storybook-style mounts, future pages). */
gsap.registerPlugin(ScrollTrigger);

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

type Props = {
  /** Plain string; `\n` renders as separate block lines (two-line H1). */
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Seconds before the cascade starts (after mount / trigger). */
  delay?: number;
  /** "load" plays on mount; "viewport" plays once entering at top 85%. */
  trigger?: "load" | "viewport";
  /** Seconds between letters. */
  stagger?: number;
};

/**
 * LetterReveal — reference M06 (TextReveal) rebuilt for CultX.
 *
 * Words → letters as inline-block spans; GSAP cascade
 * `{ autoAlpha: 0, y: "0.6em", rotateX: -40 }` → visible,
 * 0.9s power3.out. Screen readers get the plain string via
 * `aria-label` on the container while the split layer is `aria-hidden`.
 * Reduced motion: plain unsplit text, no animation.
 */
export function LetterReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  trigger = "viewport",
  stagger = 0.028,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const lines = text.split("\n");

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;
    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    if (!letters.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        { autoAlpha: 0, y: "0.6em", rotateX: -40 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          ...(trigger === "viewport"
            ? {
                scrollTrigger: {
                  trigger: root,
                  start: "top 85%",
                  once: true,
                },
              }
            : {}),
        }
      );
    }, root);
    return () => ctx.revert();
  }, [text, delay, trigger, stagger, reduced]);

  if (reduced) {
    return (
      <Tag className={className} aria-label={text}>
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        rootRef.current = el;
      }}
      className={className}
      aria-label={text}
    >
      <span aria-hidden>
        {lines.map((line, li) => (
          <span key={li} style={{ display: "block" }}>
            {line.split(" ").map((word, wi, words) => (
              <span key={wi}>
                <span
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      data-letter=""
                      style={{ display: "inline-block" }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
