/**
 * Pure helpers for CultX footer wordmark technical overlay.
 *
 * Port of reference LogoCanvas (scrap _nuxt/CfV00Epg.js):
 *   - 3 nearest grid-cell centers around cursor (own cell excluded)
 *   - aspect-corrected UV: x_aspect = uv.x * (width/height)
 *
 * Cell sizes are tuned so 70px dashed squares do not overlap on a
 * desktop wordmark aspect (~1440×269). Raw ref Lh=0.25 / Ph=0.15 maps to
 * ~67×40 CSS-px between neighbors — too tight for CultX's shorter wordmark.
 */

/** Desktop grid cell in aspect-corrected UV (x scaled by width/height). */
export const CELL_DESKTOP = { w: 0.42, h: 0.32 } as const;

/** Mobile grid cell (slightly coarser, matches ref Dh/Vh ratio bump). */
export const CELL_MOBILE = { w: 0.5, h: 0.38 } as const;

/** Half-size of dashed technical squares in CSS px at full wordmark width. */
export const SQUARE_HALF_PX = 35;

/** Full square edge in CSS px. */
export const SQUARE_SIZE_PX = SQUARE_HALF_PX * 2;

/**
 * Spotlight radius as a fraction of canvas width (ref c ≈ 0.2).
 * CSS --wm-r ≈ 290px ≈ middle ground (local hollow, letter dots still visible).
 */
export const SPOTLIGHT_RADIUS_FR = 0.2;

/**
 * Multi-stop radial mask stops for the solid fill punch-out.
 * Middle ground: clear hollow core without wiping most of the word.
 *
 * Format: [offset%, opacity] where opacity 0 = fully punched (transparent
 * in mask = hole), 1 = fully solid.
 */
export const SPOTLIGHT_SOLID_STOPS = [
  { offset: 0, opacity: 0 },
  { offset: 18, opacity: 0 },
  { offset: 45, opacity: 0.18 },
  { offset: 72, opacity: 0.65 },
  { offset: 100, opacity: 1 },
] as const;

export type GridPoint = { cx: number; cy: number; dist: number };

export function fract(x: number): number {
  return x - Math.floor(x);
}

/**
 * 3 nearest grid-cell centers to (x, y) in aspect-corrected space,
 * skipping the cursor's own cell — direct port of D() in the reference.
 */
export function nearestGridPoints(
  x: number,
  y: number,
  cw: number,
  ch: number
): [GridPoint, GridPoint, GridPoint] {
  const gi = Math.floor(x / cw);
  const gj = Math.floor(y / ch);
  const candidates: GridPoint[] = [];
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const cx = (gi + di + 0.5) * cw;
      const cy = (gj + dj + 0.5) * ch;
      candidates.push({ cx, cy, dist: Math.hypot(cx - x, cy - y) });
    }
  }
  candidates.sort((a, b) => a.dist - b.dist);
  return [candidates[1], candidates[2], candidates[3]];
}

/**
 * Map aspect-space point (cx, cy) back to wrapper UV fractions (0–1).
 * aspect = width / height.
 */
export function aspectPointToUv(
  cx: number,
  cy: number,
  aspect: number
): { fx: number; fy: number } {
  return { fx: cx / aspect, fy: cy };
}

/**
 * Screen-space pixel distance between two aspect-space points.
 * width/height are the wordmark wrapper CSS box dimensions.
 */
export function aspectPointScreenDist(
  a: { cx: number; cy: number },
  b: { cx: number; cy: number },
  width: number,
  height: number
): number {
  const aspect = width / height || 1;
  const ax = (a.cx / aspect) * width;
  const ay = (1 - a.cy) * height;
  const bx = (b.cx / aspect) * width;
  const by = (1 - b.cy) * height;
  return Math.hypot(ax - bx, ay - by);
}

/**
 * Pairwise screen separations for the three nearest grid points at a
 * cursor UV. Used by unit tests to guarantee 70px squares do not overlap.
 */
export function nearestPointsScreenSeparations(
  uvX: number,
  uvY: number,
  width: number,
  height: number,
  cell: { w: number; h: number } = CELL_DESKTOP
): number[] {
  const aspect = width / height || 1;
  const pts = nearestGridPoints(uvX * aspect, uvY, cell.w, cell.h);
  const seps: number[] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      seps.push(aspectPointScreenDist(pts[i], pts[j], width, height));
    }
  }
  return seps;
}

/** Minimum pairwise separation among the three nearest points. */
export function minNearestPointsSeparation(
  uvX: number,
  uvY: number,
  width: number,
  height: number,
  cell: { w: number; h: number } = CELL_DESKTOP
): number {
  return Math.min(
    ...nearestPointsScreenSeparations(uvX, uvY, width, height, cell)
  );
}

/**
 * CSS radial-gradient stops for the solid-layer punch-out mask.
 * black = keep solid fill; transparent = punch hole (show dotted).
 */
export function solidSpotlightMaskGradient(
  radiusPx: number = 300
): string {
  const stops = SPOTLIGHT_SOLID_STOPS.map((s) => {
    const alpha = s.opacity;
    // mask: black = visible solid, transparent = punched out
    const color =
      alpha <= 0
        ? "transparent"
        : alpha >= 1
          ? "black"
          : `rgba(0,0,0,${alpha})`;
    return `${color} ${s.offset}%`;
  }).join(", ");
  return `radial-gradient(circle ${radiusPx}px at var(--wm-x) var(--wm-y), ${stops})`;
}

/**
 * Inverse mask for the dotted outline layer (visible in the hollow core).
 */
export function dottedSpotlightMaskGradient(
  radiusPx: number = 300
): string {
  // Invert solid stops: black where solid is transparent
  const stops = SPOTLIGHT_SOLID_STOPS.map((s) => {
    const inv = 1 - s.opacity;
    const color =
      inv <= 0
        ? "transparent"
        : inv >= 1
          ? "black"
          : `rgba(0,0,0,${inv})`;
    return `${color} ${s.offset}%`;
  }).join(", ");
  return `radial-gradient(circle ${radiusPx}px at var(--wm-x) var(--wm-y), ${stops})`;
}
