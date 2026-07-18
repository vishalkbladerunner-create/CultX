import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  clamp01,
  damp,
  domeParallaxScale,
  elementScrollProgress,
  maxScaleStep,
  DOME_DEFAULTS,
  PALETTE,
  FORBIDDEN_ON_BACKGROUND,
} from "./stages.ts";

describe("DOME_DEFAULTS — reference GradientBgDark constants", () => {
  it("matches scrap _nuxt/C167zuj8.js props (1.3 / 0.8)", () => {
    assert.equal(DOME_DEFAULTS.parallaxInitialScale, 1.3);
    assert.equal(DOME_DEFAULTS.parallaxSpeed, 0.8);
  });
});

describe("domeParallaxScale — reference formula", () => {
  it("top: starts at initialScale and shrinks with progress", () => {
    const s0 = domeParallaxScale(0, "top");
    const s1 = domeParallaxScale(1, "top");
    assert.equal(s0, DOME_DEFAULTS.parallaxInitialScale);
    const expected =
      DOME_DEFAULTS.parallaxInitialScale - DOME_DEFAULTS.parallaxSpeed;
    assert.ok(Math.abs(s1 - expected) < 1e-9);
    assert.ok(s1 < s0);
  });

  it("bottom: starts at initialScale and grows with progress", () => {
    const s0 = domeParallaxScale(0, "bottom");
    const s1 = domeParallaxScale(1, "bottom");
    assert.equal(s0, DOME_DEFAULTS.parallaxInitialScale);
    const expected =
      DOME_DEFAULTS.parallaxInitialScale + DOME_DEFAULTS.parallaxSpeed;
    assert.ok(Math.abs(s1 - expected) < 1e-9);
    assert.ok(s1 > s0);
  });

  it("matches mid-progress samples from defaults", () => {
    assert.ok(Math.abs(domeParallaxScale(0.5, "top") - 0.9) < 1e-9);
    assert.ok(Math.abs(domeParallaxScale(0.25, "bottom") - 1.5) < 1e-9);
  });

  it("continuity: fine-grid steps stay small", () => {
    assert.ok(maxScaleStep("top", 100) < 0.02);
    assert.ok(maxScaleStep("bottom", 100) < 0.02);
  });
});

describe("elementScrollProgress — ref trigger semantics", () => {
  it("top: 0 when element top at viewport top", () => {
    const p = elementScrollProgress(
      { top: 0, bottom: 800, height: 800 },
      900,
      "top"
    );
    assert.equal(p, 0);
  });

  it("top: ~1 when element bottom at viewport top", () => {
    const p = elementScrollProgress(
      { top: -800, bottom: 0, height: 800 },
      900,
      "top"
    );
    assert.equal(p, 1);
  });

  it("top: mid when halfway scrolled past", () => {
    const p = elementScrollProgress(
      { top: -400, bottom: 400, height: 800 },
      900,
      "top"
    );
    assert.ok(Math.abs(p - 0.5) < 1e-9);
  });

  it("bottom: 0 when element top at viewport bottom", () => {
    const vh = 900;
    const p = elementScrollProgress(
      { top: vh, bottom: vh + 600, height: 600 },
      vh,
      "bottom"
    );
    assert.equal(p, 0);
  });

  it("progress is continuous and clamped", () => {
    let prev = elementScrollProgress(
      { top: 100, bottom: 900, height: 800 },
      900,
      "top"
    );
    for (let top = 100; top >= -900; top -= 20) {
      const cur = elementScrollProgress(
        { top, bottom: top + 800, height: 800 },
        900,
        "top"
      );
      assert.ok(cur >= 0 && cur <= 1);
      assert.ok(cur + 1e-9 >= prev - 0.05);
      prev = cur;
    }
  });
});

describe("palette constraints", () => {
  it("wash palette excludes forbidden off-family / neon fills", () => {
    const blob = JSON.stringify(PALETTE).toLowerCase();
    for (const f of FORBIDDEN_ON_BACKGROUND) {
      assert.equal(blob.includes(f.toLowerCase()), false, f);
    }
    assert.ok(blob.includes("#000000"));
  });
});

describe("helpers", () => {
  it("clamp / damp", () => {
    assert.equal(clamp01(2), 1);
    let v = 0;
    for (let i = 0; i < 50; i++) v = damp(v, 1, 10, 1 / 60);
    assert.ok(v > 0.95);
  });
});

/* ------------------------------------------------------------------ */
/* Shipped-code gates — the live components must carry reference DNA  */
/* ------------------------------------------------------------------ */

async function readWebFile(rel: string): Promise<string> {
  const { readFileSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const { dirname, join } = await import("node:path");
  const webRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..");
  return readFileSync(join(webRoot, rel), "utf8");
}

describe("shipped GradientDome — reference .gradient-bg-dark CSS", () => {
  it("carries the exact transform / sizing DNA", async () => {
    const css = await readWebFile(
      "src/components/background/GradientDome.module.css"
    );
    assert.match(css, /--parallax-scale:\s*1\.3/);
    assert.match(css, /width:\s*calc\(100% \+ 200px\)/);
    assert.match(css, /translate\(-50%\) scaleY\(var\(--parallax-scale\)\)/);
    assert.match(css, /rotate\(180deg\)/);
    assert.match(css, /top:\s*-1px/);
    assert.match(css, /bottom:\s*-1px/);
    /* CSS-only noir dome — no <img> rule left behind */
    assert.doesNotMatch(css, /\bimg\s*\{|url\(/);
  });

  it("ships the pure-CSS noir dome (zero image weight)", async () => {
    const tsx = await readWebFile(
      "src/components/background/GradientDome.tsx"
    );
    assert.match(tsx, /ck-dome/);
    assert.match(tsx, /data-dome-position/);
    assert.doesNotMatch(tsx, /\.png|<img/);
  });
});

describe("noir atmosphere — CSS-only background contract", () => {
  it("dome ramp is black-dominant with the bright action-green rim", async () => {
    const css = await readWebFile("src/styles/atmosphere.css");
    /* The rim hot color IS the header button green (--ck-action) */
    assert.match(css, /--ck-dome-hot:\s*#a6ff0d/i);
    /* Noir vignette kisses reuse the same bright green, alpha-capped */
    assert.match(css, /rgb\(166 255 13 \/ 0\.1[0-9]\)/);
    /* No image assets anywhere in the atmosphere system */
    assert.doesNotMatch(css, /url\([^)]*\.(png|avif|webp)/);
  });

  it("fixed wash tokens stay near-black (80–90% noir canvas)", async () => {
    const tokens = await readWebFile("src/styles/tokens.css");
    assert.match(tokens, /--ck-atmo-base:\s*#000000/i);
    /* tint/mid must be dark greens — luminance stays in the noir band */
    const tint = tokens.match(/--ck-atmo-tint:\s*#([0-9a-f]{6})/i);
    const mid = tokens.match(/--ck-atmo-mid:\s*#([0-9a-f]{6})/i);
    assert.ok(tint && mid, "atmo tint/mid tokens present");
    for (const m of [tint, mid]) {
      const n = parseInt(m![1], 16);
      const lum = ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114;
      assert.ok(lum < 32, `atmo stop #${m![1]} too bright for noir canvas`);
    }
  });
});

describe("shipped ScrollDriver — reference motion stack", () => {
  it("uses reference triggers, Lenis+ScrollTrigger wiring, 29px theme flip", async () => {
    const src = await readWebFile(
      "src/components/background/ScrollDriver.tsx"
    );
    // M05 triggers (ref GradientBgDark)
    assert.match(src, /"top top"/);
    assert.match(src, /"top bottom"/);
    assert.match(src, /"bottom top"/);
    assert.match(src, /"bottom center"/);
    // M03 header theme offset (ref BY-mI6BR.js: "top 29px")
    assert.match(src, /29/);
    // M01 Lenis ↔ ScrollTrigger (official integration)
    assert.match(src, /new Lenis\(\)/);
    assert.match(src, /ScrollTrigger\.update/);
    assert.match(src, /lagSmoothing\(0\)/);
    // Reduced-motion contract (M16)
    assert.match(src, /prefers-reduced-motion/);
    // Footer wordmark scrub (SiteFooter CfV00Epg: y 200→0, scrub 0.8)
    assert.match(src, /data-wordmark-slide/);
    assert.match(src, /y:\s*200/);
    assert.match(src, /scrub:\s*0\.8/);
    assert.match(src, /"bottom bottom"/);
  });
});

describe("shipped HomePage — K-Cinema section DNA", () => {
  it("carries the hero dome stack, seam-free canvas, K-Cinema primitives + locked tagline", async () => {
    const css = await readWebFile(
      "src/components/home/HomePage.module.css"
    );
    const tsx = await readWebFile("src/components/home/HomePage.tsx");
    // Hero dome: 200vh mobile / 110% desktop (ref index=0 + wrapped hero)
    assert.match(css, /height:\s*200vh/);
    assert.match(css, /height:\s*110%/);
    // Hero overlay = pure-CSS noir vignette (no PNG stack)
    assert.match(tsx, /ck-vignette-home/);
    assert.doesNotMatch(css, /heroOverlay.*\.png|url\(/);
    // Seam-free canvas: EVERY *DomeHost block mask-fades at both edges
    const domeBlocks = css.match(/\.\w*DomeHost\w*\s*\{[^}]+\}/g) ?? [];
    assert.ok(domeBlocks.length > 0, "expected at least one DomeHost class");
    for (const block of domeBlocks) {
      assert.match(block, /mask-image/, block.slice(0, 48));
    }
    // No solid opaque void panels — one continuous canvas
    assert.doesNotMatch(css, /background:\s*var\(--ck-black\)/);
    // K-Cinema primitives wired into the home page
    assert.match(tsx, /LetterReveal/);
    assert.match(tsx, /FormatStage/);
    assert.match(tsx, /StarCarousel/);
    // Locked tagline (spec §2)
    assert.match(tsx, /Binged by the World\./);
  });

  it("marks every section for the header theme system", async () => {
    const tsx = await readWebFile("src/components/home/HomePage.tsx");
    const count = (tsx.match(/data-theme-section=/g) || []).length;
    assert.ok(count >= 7, `expected ≥7 theme sections, got ${count}`);
  });

  it("home uses shared SiteFooter backbone", async () => {
    const tsx = await readWebFile("src/components/home/HomePage.tsx");
    assert.match(tsx, /SiteFooter/);
  });
});
