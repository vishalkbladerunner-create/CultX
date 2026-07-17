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
    home/                  # HomePage sections · FaqList · WaitlistForm · BackToTop · CultXWordmark
    kit/                   # Shared marketing kit (do not rebuild ad-hoc):
                           #   PageHero · SectionHeading · Card · CtaBand · MediaFrame · kit.module.css
    pages/<route>/         # One page module per route (StarsPage, AboutPage, …)
                           #   CSS modules per page — never import HomePage.module.css
  lib/
    background/            # Pure stage math (tested)
    site/pages.test.ts     # Executable definition of done for routes
    wordmark/              # Wordmark grid helpers (tested)
  styles/tokens.css        # Brand tokens (purple atmosphere)
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

1. **Pack wins** — draft copy from `cult/content-strategy/`; mandatory disclaimers character-exact.
2. **No SubPage** — every route has its own `components/pages/<route>/*Page.tsx`.
3. **No `HomePage.module.css`** imports in page modules (per-page scroll budgets).
4. **Dome hosts** — size in **% of section** (`inset: 0`), never `vh` heights on `*Dome*` CSS classes.
5. **Cards** — no `data-reveal` on `Card`; parent grids use `data-stagger`.
6. **Kit assembly** — build pages from `components/kit/*`; don’t fork chrome.

## Background architecture (reference-faithful)

- Scroll color = document flow past **image domes** + fixed CSS wash — never a per-frame body recolor.
- `GradientDome` = 1:1 port of reference `.gradient-bg-dark`; parallax via GSAP ScrollTrigger in `ScrollDriver`.
- Hero = poppy transparent dome + homepage overlay mask-fade at the fold.
- Footer = shared waitlist + `CultXWordmark`.

## MediaFrame slot inventory (asset drops)

| Slot id | Spec (from page modules) |
|---------|--------------------------|
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

Background uses **only** void black + magenta + purple.  
Do not dump cyan/orange/gold onto the atmosphere. Reserve those for sparse UI accents.  
`FORBIDDEN_ON_BACKGROUND` in `stages.ts` encodes banned reference blues/beiges (including `#0e76ff`) for tests — not product chrome.

## Fonts

- Display/body: **Space Grotesk** (`--font-space-grotesk` → `--ck-font-display`)
- Labels: **Archivo Narrow** (`--font-archivo-narrow` → `--ck-font-label`)

## Quality bar

Every change: cross-check craft vs `../../scrap/sharplink-clone` (structure/motion), score ≥ 8/10 or redo. See root `AGENTS.md`.

Executable gates: `src/lib/site/pages.test.ts` (56 tests when full suite green).
