# CultX web app

This is the **real marketing site** (`cult/web/`). Root project rules live in `../../AGENTS.md`.

## Commands

```bash
cd cult/web
npm run dev      # http://localhost:3000
npm run build
npm test         # stages + wordmark + pages.test.ts (route/disclaimer/nav gates)
npm run lint
```

## Structure

```
src/
  app/                     # Next.js App Router routes
    page.tsx               # Home
    platform|pillars|monetize|stars|about|faq/page.tsx
    template.tsx           # Route wipe (M18)
  components/
    background/            # FixedAtmosphere · GradientDome · ScrollDriver (Lenis+GSAP)
    chrome/                # SiteHeader · SiteFooter · UIButton · DashedLine
    cinema/                # Shared K-Cinema primitives (subpages + home):
                           #   CinemaHero (title card) · CinemaPanel (M07 intertitle)
                           #   CinemaHeading (masked H2) · SceneRow (hairline rows)
                           #   LetterReveal (M06) · StarCarousel (M19, slides prop) · FaqList (M17)
    home/                  # HomePage (K-Cinema) · FormatStage (M09 set piece)
                           #   WaitlistForm · BackToTop · CultXWordmark
    kit/                   # Remaining shared kit: CtaBand · MediaFrame · kit.module.css
    pages/<route>/         # One page module per route (StarsPage, AboutPage, …)
                           #   CSS modules per page — never import HomePage.module.css
  lib/
    background/            # Pure stage math (tested)
    site/pages.test.ts     # Executable definition of done for routes
    wordmark/              # Wordmark grid helpers (tested)
  styles/tokens.css        # Brand tokens (green atmosphere)
public/images/             # Poppy image set
```

## Routes (live)

| Route | Component | Content pack |
|-------|-----------|--------------|
| `/` | `HomePage` | `cult/content-strategy/03-home.md` |
| `/platform` | `PlatformPage` | `04-platform.md` |
| `/pillars` | `PillarsPage` | `05-pillars.md` |
| `/monetize` | `MonetizePage` | `06-monetize.md` |
| `/stars` | `StarsPage` | `07-stars.md` |
| `/about` | `AboutPage` | `08-about-ai-center.md` |
| `/faq` | `FaqPage` | `09-faq-cta-waitlist.md` |

Header/footer NAV: Platform · Pillars · Monetize · Star IPs · **AI Center** (`/about`) · FAQ.

## Architecture rules (test-gated)

1. **Pack wins** — draft copy from `cult/content-strategy/`; mandatory disclaimers character-exact (and on **one source line** — tests read source).
2. **No SubPage** — every route has its own `components/pages/<route>/*Page.tsx`.
3. **No `HomePage.module.css`** imports in page modules (per-page scroll budgets).
4. **Dome hosts** — size in **% of section**, never `vh` heights on `*Dome*` CSS classes; every `*DomeHost*` block carries `mask-image` edge fades.
5. **No solid opaque panels** — no `background: var(--ck-black)` in page modules; the canvas shows through.
6. **Scenes, not cards** — content blocks are scene rows / revenue screens / set pieces via `components/cinema/*`; parent lists use `data-stagger`, rows never self-reveal.
7. **Motion via bindings only** — pages emit `data-*` attributes; ScrollDriver owns all GSAP. Never page-local GSAP.

## Background architecture (reference-faithful)

- Scroll color = document flow past **image domes** + fixed CSS wash — never a per-frame body recolor.
- `GradientDome` = 1:1 port of reference `.gradient-bg-dark`; parallax via GSAP ScrollTrigger in `ScrollDriver`.
- **Seam-free canvas (all pages):** every dome host carries `mask-image` vertical edge fades and bleeds past its section; no solid opaque panels (test-gated in `stages.test.ts` for home, `pages.test.ts` for subpages).
- **Living atmosphere:** the fixed wash (`data-atmo`) drifts with scroll — gradient center `-30% → -14%` and hue `0 → 14deg`, scrubbed in `ScrollDriver`.
- **Stage binding (M09):** one generalized `[data-stage-scope]` + `[data-stage-frame]`/`[data-stage-step]` (+ `[data-stage-caption]`) contract — home FormatStage + platform journey.
- **Progressive chains:** `[data-chain]` (horizontal, monetize token loop) + `[data-timeline]` (vertical, about roadmap) — scrub draws the line, steps activate as it passes.
- Hero = poppy transparent dome + homepage overlay mask-fade at the fold.
- Footer = shared waitlist + `CultXWordmark`.

## Home (K-Cinema) — current design language

- Tagline: **"Made in Korea. Binged by the World."** (LetterReveal letter-cascade, M06).
- Hero = title card + **format rail** (4 strips, hover-expand, → `/pillars#…`).
- `FormatStage` = M09 sticky stage + M15 masked titles (poster slots `format-comic/universe/short/drama`).
- Tension + manifesto = full-viewport transparent M07 fill panels (no solid black panels).
- Monetize = 3 revenue screens (M15). Stars = `StarCarousel` (M19, 5s autoplay + progress + hover-pause). FAQ = M17 measured-height GSAP.
- Spec: `docs/superpowers/specs/2026-07-17-home-redesign-k-cinema.md`. Subpages are propagated (below).

## Subpages (K-Cinema propagated)

All six subpages use the `cinema/*` primitives — `CinemaHero` title cards (LetterReveal H1), `CinemaHeading` masked section heads, `SceneRow` hairline rows instead of card grids, `CinemaPanel` intertitles where needed:

- `/platform` "The Loop" — five-step journey as the centerpiece M09 stage (same binding as home FormatStage) + versus cinema moment (no table cards).
- `/pillars` "Four Channels" — index rail + four chapters with per-format accents (cyan/magenta/purple/orange); comic morph, universe stage + dome, phone trio, series player.
- `/monetize` "The Payoff" — three revenue screens + token loop as `data-chain` scrub-drawn chain + terminal scene; both disclaimers verbatim.
- `/stars` "The Cast" — full-bleed `StarCarousel` (props, `star-*` slots) as the set piece + quality rows + product shelf; licensing line verbatim.
- `/about` "The Studio" — stat pull + culture cinema band + roadmap as `data-timeline` scrub-drawn timeline; roadmap disclaimer verbatim.
- `/faq` — type-led title card + masked group headings + grouped M17 accordion (short-page contract).

## MediaFrame slot inventory (asset drops)

| Slot id | Spec (from page modules) |
|---------|--------------------------|
| `format-comic` / `format-universe` / `format-short` / `format-drama` | Home FormatStage posters · 1200×1800 (2:3) PNG/WebP |
| `home-earn-sales` / `home-earn-token` / `home-earn-ads` | Home revenue scenes · 1600×1200 PNG/WebP |
| `home-star-pucca` / `home-star-bduck` / `home-star-ponke` / `home-star-mew` | Home carousel portraits · 1200×1800 (2:3) |
| `hero-video-stars` | 1920×1080 · WebM + MP4 · muted loop ≤8s |
| `star-pucca` / `star-bduck` / `star-ponke` / `star-mew` | Licensed character art · 900×1200 |
| `stars-product-cards` / `stars-product-robots` / `stars-product-merch` | Product packshot · 1200×900 |
| `hero-about-hub` | Night exterior / skyline · 1920×1080 |
| `about-community` | Rights-cleared photography · 2160×960 |
| `platform-ui-mock` | Streaming hub mock |
| `journey-step-01`…`05` | Journey step frames |
| `webtoon-before` / `webtoon-after` | Webtoon → animation stills |
| `comic-before` / `comic-after` | Pillars comic chapter |
| `universe-stage` | Star IP stage |
| `short-phone-1`…`3` | Short-form phone mocks |
| `drama-player` | Drama series player chrome |
| earn path / product slots on monetize | See `MonetizePage.tsx` |

## Color discipline

Background uses **only** void black + the green family (`--ck-green-*` ramp, pixel-measured from the green poppy assets in `public/images/`).  
`--ck-chartreuse` is the hot sparse accent (CTAs, progress fills, wordmark tails) — never a wash fill.  
Do not dump cyan/orange/gold onto the atmosphere. Reserve those for sparse UI accents.  
`FORBIDDEN_ON_BACKGROUND` in `stages.ts` encodes banned reference blues/beiges (including `#0e76ff`) plus the retired magenta/neon-purple accents for tests — not product chrome.

## Fonts

- Display/body: **Space Grotesk** (`--font-space-grotesk` → `--ck-font-display`)
- Labels: **Archivo Narrow** (`--font-archivo-narrow` → `--ck-font-label`)

## Quality bar

Every change: cross-check craft vs `../../scrap/sharplink-clone` (structure/motion), score ≥ 8/10 or redo. See root `AGENTS.md`.

Executable gates: `src/lib/site/pages.test.ts` (59 tests when full suite green).
