import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CELL_DESKTOP,
  CELL_MOBILE,
  SQUARE_SIZE_PX,
  SPOTLIGHT_RADIUS_FR,
  SPOTLIGHT_SOLID_STOPS,
  nearestGridPoints,
  nearestPointsScreenSeparations,
  minNearestPointsSeparation,
  aspectPointToUv,
  solidSpotlightMaskGradient,
  dottedSpotlightMaskGradient,
} from "./grid.ts";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readWeb(rel: string): string {
  return readFileSync(join(webRoot, rel), "utf8");
}

/** Desktop wordmark box used by CultX (matches .wordmark-placeholder aspect). */
const DESKTOP = { width: 1440, height: 269 };

describe("CELL sizes — non-overlapping 70px squares", () => {
  it("desktop cell is coarser than raw ref Lh/Ph (0.25/0.15)", () => {
    assert.ok(CELL_DESKTOP.w > 0.25);
    assert.ok(CELL_DESKTOP.h > 0.15);
  });

  it("mobile cell is coarser than desktop", () => {
    assert.ok(CELL_MOBILE.w >= CELL_DESKTOP.w);
    assert.ok(CELL_MOBILE.h >= CELL_DESKTOP.h);
  });

  it("SQUARE_SIZE_PX is 70 (ref half=35)", () => {
    assert.equal(SQUARE_SIZE_PX, 70);
  });
});

describe("nearestGridPoints — ref D() port", () => {
  it("returns 3 points, never the cursor cell center", () => {
    const cw = CELL_DESKTOP.w;
    const ch = CELL_DESKTOP.h;
    // Cursor near center of cell (2.5, 1.5) → cell indices 2,1
    const x = 2.5 * cw;
    const y = 1.5 * ch;
    const pts = nearestGridPoints(x, y, cw, ch);
    assert.equal(pts.length, 3);
    for (const p of pts) {
      // own cell center is (2.5*cw, 1.5*ch) — must not appear
      assert.ok(
        Math.hypot(p.cx - x, p.cy - y) > 1e-9,
        "must skip cursor cell"
      );
    }
  });

  it("points are sorted by distance ascending", () => {
    const pts = nearestGridPoints(0.55, 0.4, CELL_DESKTOP.w, CELL_DESKTOP.h);
    assert.ok(pts[0].dist <= pts[1].dist);
    assert.ok(pts[1].dist <= pts[2].dist);
  });
});

describe("screen-space separation — 70px squares must not overlap", () => {
  const cursors: [number, number][] = [
    [0.15, 0.35],
    [0.35, 0.45],
    [0.5, 0.5],
    [0.65, 0.4],
    [0.8, 0.55],
    [0.25, 0.2],
    [0.75, 0.7],
  ];

  for (const [ux, uy] of cursors) {
    it(`cursor (${ux}, ${uy}) — min pairwise ≥ SQUARE_SIZE_PX`, () => {
      const minSep = minNearestPointsSeparation(
        ux,
        uy,
        DESKTOP.width,
        DESKTOP.height,
        CELL_DESKTOP
      );
      assert.ok(
        minSep >= SQUARE_SIZE_PX - 0.5,
        `expected ≥ ${SQUARE_SIZE_PX}px, got ${minSep.toFixed(2)}px at uv (${ux},${uy})`
      );
    });
  }

  it("all pairwise seps at (0.5, 0.5) are finite and positive", () => {
    const seps = nearestPointsScreenSeparations(
      0.5,
      0.5,
      DESKTOP.width,
      DESKTOP.height
    );
    assert.equal(seps.length, 3);
    for (const s of seps) {
      assert.ok(s > 0 && Number.isFinite(s));
    }
  });
});

describe("aspectPointToUv", () => {
  it("divides cx by aspect, keeps cy", () => {
    const aspect = 1440 / 269;
    const { fx, fy } = aspectPointToUv(aspect * 0.5, 0.4, aspect);
    assert.ok(Math.abs(fx - 0.5) < 1e-9);
    assert.equal(fy, 0.4);
  });
});

describe("spotlight mask — strong hollow core", () => {
  it("solid stops keep fully-transparent core through ~18%", () => {
    const core = SPOTLIGHT_SOLID_STOPS.filter((s) => s.offset <= 18);
    assert.ok(core.length >= 2);
    for (const s of core) {
      assert.equal(s.opacity, 0, "core must be fully punched out");
    }
  });

  it("mid-radius solid stays mostly punched (stronger than old linear 50%)", () => {
    const mid = SPOTLIGHT_SOLID_STOPS.find((s) => s.offset >= 40 && s.offset <= 50);
    assert.ok(mid, "expected a stop near 40–50%");
    assert.ok(
      mid!.opacity < 0.35,
      `mid-radius solid opacity ${mid!.opacity} should be well under 0.5`
    );
  });

  it("spotlight radius fraction matches ref c≈0.2 middle ground", () => {
    assert.ok(
      Math.abs(SPOTLIGHT_RADIUS_FR - 0.2) < 0.03,
      `SPOTLIGHT_RADIUS_FR ${SPOTLIGHT_RADIUS_FR} should be ~0.2`
    );
  });

  it("solidSpotlightMaskGradient is a radial-gradient with transparent core", () => {
    const g = solidSpotlightMaskGradient(300);
    assert.match(g, /^radial-gradient\(/);
    assert.match(g, /transparent/);
    assert.match(g, /circle 300px/);
    assert.match(g, /var\(--wm-x\)/);
  });

  it("dottedSpotlightMaskGradient is inverse (black core)", () => {
    const g = dottedSpotlightMaskGradient(280);
    assert.match(g, /^radial-gradient\(/);
    assert.match(g, /black 0%/);
    assert.match(g, /circle 280px/);
  });
});

/* ------------------------------------------------------------------ */
/* Shipped-code gates — footer CTAs + wordmark must carry the fix DNA  */
/* ------------------------------------------------------------------ */

/**
 * Ref .ui-button > .icon DNA: flex-column tile + each stack child height:100%
 * so translateY(±100%) is tile-relative. Rest shows child 0; hover slides both
 * up by one full cell — only one arrow fully visible at a time (AC1).
 */
function assertFullHeightIconStack(css: string, tileSel: string, hoverSel: string) {
  // Tile: column flex + overflow clip + fixed height
  assert.match(
    css,
    new RegExp(
      `${tileSel}\\s*\\{[^}]*flex-direction:\\s*column[^}]*overflow:\\s*hidden`,
      "s"
    ),
    `${tileSel} must be flex-column + overflow hidden`
  );
  assert.match(
    css,
    new RegExp(`${tileSel}\\s*\\{[^}]*height:\\s*44px`, "s"),
    `${tileSel} must have fixed 44px height`
  );
  // Each direct child is full tile height (critical for -100% to clear the clip)
  assert.match(
    css,
    new RegExp(
      `${tileSel}\\s*>\\s*span\\s*\\{[^}]*height:\\s*100%`,
      "s"
    ),
    `${tileSel} > span must be height:100% (not glyph-sized)`
  );
  assert.match(
    css,
    new RegExp(
      `${tileSel}\\s*>\\s*span\\s*\\{[^}]*flex-shrink:\\s*0`,
      "s"
    ),
    `${tileSel} > span must flex-shrink:0 so stack is 200% tall`
  );
  // Hover: ALL children translateY(-100%) of their (full-tile) height
  assert.match(
    css,
    new RegExp(
      `${hoverSel}\\s*\\{[^}]*translateY\\(-100%\\)`,
      "s"
    ),
    `${hoverSel} must translateY(-100%) on all stack children`
  );
  // Must NOT use the old 16px-relative 120% bug or absolute half-stack
  assert.doesNotMatch(css, /translateY\(120%\)/);
  assert.doesNotMatch(css, /\.iconStack/);
}

describe("shipped WaitlistForm — single arrow at rest AND hover", () => {
  it("icon tile uses ref full-height dual stack (height:100% children)", () => {
    const css = readWeb("components/home/WaitlistForm.module.css");
    const tsx = readWeb("components/home/WaitlistForm.tsx");

    assertFullHeightIconStack(
      css,
      "\\.iconTile",
      "\\.submit:hover\\s+\\.iconTile\\s*>\\s*span"
    );
    // Markup: two sibling spans inside iconTile
    assert.match(tsx, /className=\{styles\.iconTile\}/);
    assert.doesNotMatch(tsx, /iconStack/);
    // Two ArrowRight renders in the tile
    const tileBlock = tsx.slice(tsx.indexOf("iconTile"));
    const arrows = (tileBlock.match(/<ArrowRight/g) || []).length;
    assert.equal(arrows, 2, "iconTile must hold two ArrowRight copies");
  });
});

describe("shipped BackToTop — single arrow at rest AND hover", () => {
  it("cta uses ref full-height dual stack (height:100% children)", () => {
    const css = readWeb("components/home/BackToTop.module.css");
    const tsx = readWeb("components/home/BackToTop.tsx");

    assertFullHeightIconStack(
      css,
      "\\.cta",
      "\\.cta:hover\\s*>\\s*span"
    );
    assert.match(tsx, /className=\{styles\.cta\}/);
    assert.doesNotMatch(tsx, /iconStack/);
    const arrows = (tsx.match(/<ArrowUp/g) || []).length;
    assert.equal(arrows, 2, "cta must hold two ArrowUp copies");
  });
});

describe("shipped CultXWordmark — grid + strong hollow", () => {
  it("imports grid helpers (not inline Lh=0.25 / Ph=0.15)", () => {
    const tsx = readWeb("components/home/CultXWordmark.tsx");
    assert.match(tsx, /from ["']@\/lib\/wordmark\/grid["']/);
    assert.match(tsx, /CELL_DESKTOP/);
    assert.match(tsx, /nearestGridPoints/);
    assert.doesNotMatch(tsx, /CELL_DESKTOP\s*=\s*\{\s*w:\s*0\.25/);
  });

  it("solid mask has multi-stop hollow core + mid-ground spotlight size", () => {
    const css = readWeb("components/home/CultXWordmark.module.css");
    assert.match(css, /transparent\s+18%/);
    assert.match(css, /--wm-r:\s*290px/);
    assert.match(css, /font-size:\s*318px/);
    assert.doesNotMatch(css, /transparent 0%,\s*\n\s*black 68%/);
  });

  it("squares are solid mid-bright; letter dots readable mid-weight", () => {
    const css = readWeb("components/home/CultXWordmark.module.css");
    const sqBlock = css.match(/\.sq\s*\{[^}]+\}/s)?.[0] ?? "";
    assert.match(sqBlock, /stroke-dasharray:\s*none/);
    const dots = css.match(/\.wmDots\s*\{[^}]+\}/s)?.[0] ?? "";
    assert.match(dots, /stroke-width:\s*2/);
    assert.match(dots, /stroke-dasharray:/);
    // Hover dotted layer on shell (expanded hit) readable (≥0.7)
    assert.match(
      css,
      /\.shell\[data-hover\]\s+\.dotted\s*\{[^}]*opacity:\s*0\.(7|8|9)/s
    );
    const tri = css.match(/\.tri\s*\{[^}]+\}/s)?.[0] ?? "";
    assert.match(tri, /stroke-dasharray:/);
  });

  it("clips bottom, moderate blur, expanded hit shell + soft leave", () => {
    const css = readWeb("components/home/CultXWordmark.module.css");
    const tsx = readWeb("components/home/CultXWordmark.tsx");
    // Expanded hit shell through dashed-line padding
    assert.match(css, /\.shell\s*\{/s);
    assert.match(css, /margin-top:\s*-48px/);
    assert.match(css, /padding-top:\s*48px/);
    // Visual glyph box still clips bottom
    assert.match(css, /\.visual\s*\{[^}]*overflow:\s*hidden/s);
    // Overlay hairline top fade (~5px only, not a tall dissolve)
    assert.match(css, /\.overlay\s*\{[^}]*mask-image:\s*linear-gradient/s);
    assert.match(css, /black\s+5px/);
    assert.match(css, /transition:\s*opacity\s*0\.55s/);
    const blurDevs = [...tsx.matchAll(/feGaussianBlur[^>]*stdDeviation="([\d.]+)"/g)].map(
      (m) => parseFloat(m[1])
    );
    assert.ok(blurDevs.length >= 2, "expected ≥2 blur layers");
    assert.ok(
      Math.max(...blurDevs) >= 5 && Math.max(...blurDevs) <= 9,
      `heavy blur should be mid-range 5–9, got ${Math.max(...blurDevs)}`
    );
    assert.match(tsx, /y="248"/);
    assert.match(tsx, /GEOMETRY_ALPHA\s*=\s*0\.52/);
    assert.match(tsx, /TOP_EDGE_FADE_PX\s*=\s*5/);
    // Soft leave (not instant hard clear of overlay)
    assert.match(tsx, /beginLeave|LEAVE_RESET_MS/);
    assert.match(tsx, /pointerleave/);
    assert.match(tsx, /dataset\.hover/);
  });
});
