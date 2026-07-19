import { describe, it } from "node:test";
import assert from "node:assert/strict";

/* Same helper pattern as src/lib/background/stages.test.ts */
async function readWebFile(rel: string): Promise<string> {
  const { readFileSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const { dirname, join } = await import("node:path");
  const webRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..");
  return readFileSync(join(webRoot, rel), "utf8");
}

const ROUTES = ["platform", "pillars", "monetize", "stars", "about", "faq"];

/* Routes rebuilt in the K-Cinema language (cinema/* primitives).
   All six subpages propagated; gates below keep the redesign honest. */
const K_CINEMA_ROUTES = ["platform", "pillars", "monetize", "stars", "about", "faq"];

describe("site routes — real pages, per-page architecture", () => {
  it("every route has a page.tsx wired to its own page component (no SubPage)", async () => {
    for (const route of ROUTES) {
      const tsx = await readWebFile(`src/app/${route}/page.tsx`);
      assert.match(tsx, /export const metadata/, route);
      assert.doesNotMatch(tsx, /SubPage/, route);
      assert.match(tsx, /components\/pages\//, route);
    }
  });

  it("no page module imports HomePage.module.css (per-page scroll budgets)", async () => {
    for (const route of ROUTES) {
      const dir = `src/components/pages/${route}`;
      const tsx = await readWebFile(
        `${dir}/${route[0].toUpperCase()}${route.slice(1)}Page.tsx`
      );
      assert.doesNotMatch(tsx, /HomePage\.module\.css/, route);
    }
  });

  it("no fixed-vh absolute dome hosts in page modules (short-page safety)", async () => {
    for (const route of ROUTES) {
      const css = await readWebFile(
        `src/components/pages/${route}/${route[0].toUpperCase()}${route.slice(1)}Page.module.css`
      );
      /* vh heights are fine for layout pieces (e.g. sticky journey stage);
         the hazard is only on dome hosts — they must size in % of section. */
      assert.doesNotMatch(
        css,
        /\.[\w-]*[Dd]ome[\w-]*\s*\{[^}]*height:\s*(?:\d+(?:\.\d+)?[a-z]*vh|calc\([^)]*vh)/,
        `${route} must size dome hosts in % of their section`
      );
    }
  });

  it("every page renders the shared SiteFooter and ≥3 theme sections", async () => {
    for (const route of ROUTES) {
      const tsx = await readWebFile(
        `src/components/pages/${route}/${route[0].toUpperCase()}${route.slice(1)}Page.tsx`
      );
      assert.match(tsx, /SiteFooter/, route);
      /* Theme sections live inline AND inside kit components:
         PageHero/CinemaHero and CtaBand each render one
         data-theme-section, SiteFooter renders one more.
         Count all sources. */
      const inline = (tsx.match(/data-theme-section=/g) || []).length;
      const total =
        inline +
        (tsx.match(/<PageHero/g) || []).length +
        (tsx.match(/<CinemaHero/g) || []).length +
        (tsx.match(/<CtaBand/g) || []).length +
        1; // SiteFooter
      assert.ok(
        total >= 3,
        `${route}: expected ≥3 theme sections, got ${total}`
      );
    }
  });
});

describe("compliance — mandatory disclaimers ship verbatim", () => {
  it("/monetize carries token-risk + terminal disclaimers", async () => {
    const tsx = await readWebFile(
      "src/components/pages/monetize/MonetizePage.tsx"
    );
    assert.match(tsx, /IP tokens involve risk\. Nothing on this site is financial advice\./);
    assert.match(tsx, /Marketing mockup\. Not a live trading product\./);
  });

  it("/stars carries the licensing line", async () => {
    const tsx = await readWebFile("src/components/pages/stars/StarsPage.tsx");
    assert.match(tsx, /subject to licensing and brand approval/);
  });

  it("/about carries the roadmap disclaimer", async () => {
    const tsx = await readWebFile("src/components/pages/about/AboutPage.tsx");
    assert.match(tsx, /Dates and targets are forward-looking/);
    assert.match(tsx, /application trajectory, not a confirmed listing/);
  });
});

describe("foundations — fonts, media slots, motion, nav", () => {
  it("layout loads Space Grotesk + Archivo Narrow; tokens consume them", async () => {
    const layout = await readWebFile("src/app/layout.tsx");
    assert.match(layout, /Space_Grotesk/);
    assert.match(layout, /--font-space-grotesk/);
    assert.match(layout, /Archivo_Narrow/);
    const tokens = await readWebFile("src/styles/tokens.css");
    assert.match(tokens, /--ck-font-display:\s*var\(--font-space-grotesk\)/);
    assert.match(tokens, /--ck-font-label:\s*var\(--font-archivo-narrow\)/);
  });

  it("no source file still references the old --font-archivo var", async () => {
    for (const rel of [
      "src/app/globals.css",
      "src/styles/tokens.css",
      "src/components/home/CultXWordmark.module.css",
      "src/components/chrome/SiteFooter.module.css",
      "src/components/home/WaitlistForm.module.css",
    ]) {
      const css = await readWebFile(rel);
      assert.doesNotMatch(css, /--font-archivo\)/, rel);
    }
  });

  it("MediaFrame exposes slot label + spec contract", async () => {
    const tsx = await readWebFile("src/components/kit/MediaFrame.tsx");
    assert.match(tsx, /data-media-slot/);
    assert.match(tsx, /label: string/);
    assert.match(tsx, /spec: string/);
  });

  it("ScrollDriver wires stagger + stage + chain + timeline bindings", async () => {
    const tsx = await readWebFile(
      "src/components/background/ScrollDriver.tsx"
    );
    assert.match(tsx, /\[data-stagger\]/);
    /* K-Cinema primitives: M15 masked reveal, atmosphere drift,
       generalized M09 stage scope (home FormatStage + platform journey),
       progressive chains (monetize token loop, about roadmap). */
    assert.match(tsx, /\[data-mask-reveal\]/);
    assert.match(tsx, /\[data-atmo\]/);
    assert.match(tsx, /\[data-stage-scope\]/);
    assert.match(tsx, /\[data-chain\]/);
    assert.match(tsx, /\[data-chain-step\]/);
    assert.match(tsx, /\[data-timeline\]/);
    assert.match(tsx, /\[data-timeline-step\]/);
    /* Route changes must recalculate Lenis' cached scroll limit,
       or wheel scrolling clamps to the previous page's height. */
    assert.match(tsx, /__lenis\?\.resize\(\)/);
  });

  it("route wipe template exists", async () => {
    const tsx = await readWebFile("src/app/template.tsx");
    assert.match(tsx, /template\.module\.css|veil/);
  });

  it("header + footer nav cover all six routes (incl. /about AI Center)", async () => {
    const hdr = await readWebFile("src/components/chrome/SiteHeader.tsx");
    const ftr = await readWebFile("src/components/chrome/SiteFooter.tsx");
    for (const route of ROUTES) {
      assert.match(hdr, new RegExp(`"/${route}"`), `header missing /${route}`);
      assert.match(ftr, new RegExp(`"/${route}"`), `footer missing /${route}`);
    }
  });
});

describe("K-Cinema subpage DNA (redesigned routes)", () => {
  it("title-card hero via CinemaHero; kit PageHero retired", async () => {
    for (const route of K_CINEMA_ROUTES) {
      const tsx = await readWebFile(
        `src/components/pages/${route}/${route[0].toUpperCase()}${route.slice(1)}Page.tsx`
      );
      if (route !== "platform") {
        assert.match(tsx, /<CinemaHero/, route);
      }
      assert.doesNotMatch(tsx, /<PageHero/, route);
    }
  });

  it("dome hosts carry mask-image (seam-free canvas)", async () => {
    for (const route of K_CINEMA_ROUTES) {
      const css = await readWebFile(
        `src/components/pages/${route}/${route[0].toUpperCase()}${route.slice(1)}Page.module.css`
      );
      const hosts = css.match(/\.[\w-]*[Dd]ome[\w-]*Host\s*\{[^}]*\}/g) || [];
      for (const block of hosts) {
        assert.match(
          block,
          /mask-image/,
          `${route}: dome host block missing mask-image`
        );
      }
    }
  });

  it("no solid black panels in page modules (canvas shows through)", async () => {
    for (const route of K_CINEMA_ROUTES) {
      const css = await readWebFile(
        `src/components/pages/${route}/${route[0].toUpperCase()}${route.slice(1)}Page.module.css`
      );
      assert.doesNotMatch(
        css,
        /background:\s*var\(--ck-black\)/,
        `${route}: solid opaque panel found`
      );
    }
  });
});
