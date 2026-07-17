/**
 * Pure math for SharpLink-style GradientBgDark parallax.
 *
 * Reference (scrap GradientBgDark):
 *   top:    scale = initialScale - progress * parallaxSpeed
 *   bottom: scale = initialScale + progress * parallaxSpeed
 *   defaults: initialScale=1.3, parallaxSpeed=0.8
 *
 * progress is the ScrollTrigger progress of the gradient element itself
 * (0 at start, 1 at end) — NOT global page scroll fraction alone.
 */

export function clamp01(t: number): number {
  if (Number.isNaN(t) || t <= 0) return 0; // also normalizes -0
  if (t > 1) return 1;
  return t;
}

export function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * clamp01(u);
}

export function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return target + (current - target) * Math.exp(-lambda * dt);
}

/**
 * Defaults — reference GradientBgDark exact values (verified in scrap
 * `_nuxt/C167zuj8.js`: props parallaxSpeed 0.8, parallaxInitialScale 1.3).
 */
export const DOME_DEFAULTS = {
  parallaxInitialScale: 1.3,
  parallaxSpeed: 0.8,
} as const;

export type DomePosition = "top" | "bottom";

/**
 * Exact scale formula from reference onUpdate:
 *   top:    -progress * speed + initialScale
 *   bottom:  initialScale + progress * speed
 */
export function domeParallaxScale(
  progress: number,
  position: DomePosition,
  initialScale: number = DOME_DEFAULTS.parallaxInitialScale,
  parallaxSpeed: number = DOME_DEFAULTS.parallaxSpeed
): number {
  const p = clamp01(progress);
  if (position === "top") {
    return -p * parallaxSpeed + initialScale;
  }
  return initialScale + p * parallaxSpeed;
}

/**
 * Compute ScrollTrigger-equivalent progress for a gradient element.
 *
 * Reference triggers:
 *   top:    start "top top", end "bottom top"
 *           → progress 0 when el.top hits viewport top
 *           → progress 1 when el.bottom hits viewport top
 *   bottom: start "top bottom", end "bottom center"
 *           → progress 0 when el.top hits viewport bottom
 *           → progress 1 when el.bottom hits viewport center
 */
export function elementScrollProgress(
  rect: { top: number; bottom: number; height: number },
  viewportHeight: number,
  position: DomePosition
): number {
  if (position === "top") {
    // start: top top → rect.top === 0 (p=0)
    // end:   bottom top → rect.bottom === 0 → rect.top = -height (p=1)
    if (rect.height <= 0) return 0;
    return clamp01(-rect.top / rect.height);
  }
  // bottom: start top bottom → rect.top === vh
  //         end bottom center → rect.bottom === vh/2
  // When rect.top = vh, p=0
  // When rect.bottom = vh/2, p=1 → rect.top = vh/2 - height
  const startTop = viewportHeight;
  const endTop = viewportHeight / 2 - rect.height;
  const span = startTop - endTop; // positive
  if (span <= 0) return 0;
  return clamp01((startTop - rect.top) / span);
}

/**
 * CultK purple-only atmosphere tokens (muted cinema — wash only).
 * Hot neon / blue / beige / multi-accent forbidden on wash.
 */
export const PALETTE = {
  void: "#000000",
  purpleDeep: "#0c0018",
  purpleMid: "#30105a",
  purple: "#5c2888",
  purpleSoft: "#b8a0d4",
  surface: "#05000c",
} as const;

export const FORBIDDEN_ON_BACKGROUND = [
  "#0e76ff",
  "#f4efe9",
  "#c4d5e7",
  "#f7f7f5",
  "#00d4ff",
  "#ff6a00",
  "#ffd000",
  "#00e676",
  "#2b6bff",
  "#ff2d9b",
  "#a100e8",
  "#b84dff",
] as const;

/** Continuity helper for tests: max |Δscale| across a fine progress grid */
export function maxScaleStep(
  position: DomePosition,
  steps: number = 100
): number {
  let max = 0;
  let prev = domeParallaxScale(0, position);
  for (let i = 1; i <= steps; i++) {
    const cur = domeParallaxScale(i / steps, position);
    max = Math.max(max, Math.abs(cur - prev));
    prev = cur;
  }
  return max;
}
