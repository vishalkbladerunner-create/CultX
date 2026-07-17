import Link from "next/link";
import { GradientDome } from "@/components/background/GradientDome";
import { DashedLine } from "@/components/chrome/DashedLine";
import { UIButton } from "@/components/chrome/UIButton";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { FaqList } from "@/components/cinema/FaqList";
import { LetterReveal } from "@/components/cinema/LetterReveal";
import { StarCarousel } from "@/components/cinema/StarCarousel";
import type { StarSlide } from "@/components/cinema/StarCarousel";
import { FormatStage } from "./FormatStage";
import styles from "./HomePage.module.css";

/**
 * CultX home — "K-Cinema" design language (spec 2026-07-17).
 *
 * The page plays like a K-drama title sequence on ONE continuous
 * background canvas — every dome host bleeds past its section and
 * mask-fades at both edges; no solid panels anywhere:
 *
 *   1. Hero        — title sequence: LetterReveal H1 (M06), dual CTAs,
 *                    meta row, hover-expanding format rail
 *   2. Formats     — FormatStage sticky set piece (M09 + M15), id="formats"
 *   3. Tension     — full-viewport scroll-fill cinema panel (M07)
 *   4. Manifesto   — Create. Watch. Engage. Own. scroll-fill panel
 *   5. Monetize    — three revenue "screens" (M15), top dome host
 *   6. Star IPs    — StarCarousel autoplay (M19)
 *   7. FAQ         — accordion (M17)
 *   8. AI Center   — editorial beat before the footer dome
 *   9. Footer      — shared SiteFooter + waitlist
 *
 * Motion lives in ScrollDriver (GSAP + Lenis); copy verbatim from
 * cult/content-strategy/03-home.md (tagline + hero meta per spec §2).
 */

const RAIL = [
  {
    n: "01",
    label: "AI Comic",
    desc: "Finished webtoons become premium AI comic animation — fast, and at scale.",
    href: "/pillars#comic",
  },
  {
    n: "02",
    label: "Star IP Universe",
    desc: "Iconic characters brought to life with studio-level AI production and movie-length storytelling.",
    href: "/pillars#universe",
  },
  {
    n: "03",
    label: "AI Short",
    desc: "Viral short-form built for social platforms — TikTok, Reels, Shorts.",
    href: "/pillars#short",
  },
  {
    n: "04",
    label: "AI Drama",
    desc: "Cinematic long-form AI series with K-drama emotion and retention.",
    href: "/pillars#drama",
  },
];

const EARN = [
  {
    slot: "home-earn-sales",
    frameLabel: "SALES SCENE",
    label: "Sell content",
    title: "Direct sales",
    closer: "Earn from every sale.",
  },
  {
    slot: "home-earn-token",
    frameLabel: "TOKEN SCENE",
    label: "Community ownership",
    title: "Launch an IP token",
    closer: "Earn as your community grows.",
  },
  {
    slot: "home-earn-ads",
    frameLabel: "ADS SCENE",
    label: "Ad revenue",
    title: "Earn from attention",
    closer: "Earn from every view.",
  },
];

const HOME_STARS: readonly StarSlide[] = [
  {
    id: "pucca",
    name: "Pucca",
    badge: "25 years",
    body: "A 25-year iconic brand from Korea — beloved worldwide for charming characters and timeless stories.",
    role: "Flagship Korean character energy for the Star IP Universe.",
    slot: "home-star-pucca",
    frameLabel: "PUCCA PORTRAIT",
  },
  {
    id: "bduck",
    name: "B.Duck",
    badge: "20 years",
    body: "A 20-year global lifestyle brand with massive merchandise, licensing, and media presence.",
    role: "Lifestyle IP with broad global recognition.",
    slot: "home-star-bduck",
    frameLabel: "B.DUCK PORTRAIT",
  },
  {
    id: "ponke",
    name: "Ponke",
    badge: "Web3-native",
    body: "A popular Web3-native IP with a strong community and cultural influence across digital worlds.",
    role: "Bridge between crypto-native fandom and entertainment formats.",
    slot: "home-star-ponke",
    frameLabel: "PONKE PORTRAIT",
  },
  {
    id: "mew",
    name: "Mew",
    badge: "Rising",
    body: "An adorable cat IP with a rapidly growing global fanbase and huge digital engagement.",
    role: "Fast-growth character energy for shorts, merch, and community.",
    slot: "home-star-mew",
    frameLabel: "MEW PORTRAIT",
  },
];

const FAQ = [
  {
    q: "What is CultX?",
    a: "CultX is the all-in-one platform for AI-native IP creation and monetization. Create, publish, grow, and earn — one ecosystem for creators and fans.",
  },
  {
    q: "What can I create on CultX?",
    a: "Four entertainment formats: AI Comic / Webtoon, AI Star IP Universe, AI Short, and AI Drama — from finished webtoons to cinematic long-form series.",
  },
  {
    q: "How do creators earn?",
    a: "Three paths: direct sales of characters, comics and stories; community ownership through IP tokens; and ad revenue from attention on your content. Rewards can pay out in crypto, with USDT cards and merch in the ecosystem.",
  },
  {
    q: "Which star IPs are on CultX?",
    a: "Confirmed partner IPs from the deck: Pucca, B.Duck, Ponke, and Mew — with more to come.",
  },
  {
    q: "Where is CultX built?",
    a: "At the CultX AI Center in Gangnam, Seoul — a creator-first hub of roughly 300 specialists. Built in Korea, powered for the world.",
  },
];

export function HomePage() {
  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO — title sequence (M06 + M08 + hero intro) ============ */}
      <header className={styles.hero} data-theme-section="dark">
        {/* z0 — dome image bg, mask-faded at both edges (seam-free) */}
        <div className={styles.heroDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        {/* z1 — hero overlay vignette PNG */}
        <div className={styles.heroOverlay} aria-hidden />
        {/* z2 — content */}
        <div className={styles.heroContent}>
          <p className={styles.eyebrow} data-hero-intro>
            CultX Platform — Seoul
          </p>
          <LetterReveal
            as="h1"
            trigger="load"
            delay={0.2}
            text={"Made in Korea.\nBinged by the World."}
            className={styles.heroTitle}
          />
          <div className={styles.heroCtas} data-hero-intro>
            <UIButton href="#waitlist" label="Join the Waitlist" />
            <UIButton
              href="#formats"
              label="Explore the Platform"
              variant="secondary"
              withIcon={false}
            />
          </div>
        </div>
        <div className={styles.heroBottom}>
          <div className={styles.heroFooter} data-hero-intro>
            <p className={styles.heroMeta}>CultX AI Center · Gangnam, Seoul</p>
            <p className={styles.heroBlurb}>
              The all-in-one platform for AI-native IP creation and
              monetization. Create · Publish · Grow · Earn.
            </p>
          </div>
          {/* Format rail — hover-expanding strips (desktop) / 2×2 tiles
              (mobile); each links to its /pillars chapter */}
          <nav className={styles.formatRail} aria-label="Formats">
            {RAIL.map((r) => (
              <Link
                key={r.n}
                href={r.href}
                className={styles.railItem}
                data-hero-intro
              >
                <span className={styles.railNum}>{r.n}</span>
                <span className={styles.railLabel}>{r.label}</span>
                <span className={styles.railDesc}>{r.desc}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ============ 2. FORMATS — sticky stage set piece (M09 + M15) ============ */}
      <FormatStage />

      {/* ============ 3. TENSION — full-viewport scroll-fill panel (M07) ============ */}
      <section className={styles.cinemaPanel} data-theme-section="dark">
        <div className={styles.cinemaInner}>
          <p className={styles.fillLine} data-scroll-fill>
            {["Massive", "creation.", "Broken", "monetization."].map((w) => (
              <span key={w} className={styles.fillWord} data-fill-word>
                {w}
              </span>
            ))}
          </p>
          <p className={styles.cinemaLede} data-reveal>
            The AI creator economy is enormous — but discovery and
            monetization are broken. Most creators are never found. Almost
            none earn real income. CultX is the all-in-one platform where
            AI-native IP gets created, published, grown — and paid.
          </p>
        </div>
      </section>

      {/* ============ 4. MANIFESTO — full-viewport scroll-fill panel ============ */}
      <section className={styles.cinemaPanel} data-theme-section="dark">
        <div className={styles.cinemaInner}>
          <p className={styles.fillLine} data-scroll-fill>
            {["Create.", "Watch.", "Engage.", "Own."].map((w) => (
              <span key={w} className={styles.fillWord} data-fill-word>
                {w}
              </span>
            ))}
          </p>
          <p className={styles.cinemaSub} data-reveal>
            One loop. One ecosystem. Creators and fans, building legends
            together.
          </p>
        </div>
      </section>

      {/* ============ 5. MONETIZE — three revenue screens (M15) ============ */}
      <section
        className={styles.monetizeBand}
        id="monetize"
        data-theme-section="dark"
      >
        <div className={styles.monetizeDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              03 — MONETIZE
            </p>
            <div className={styles.maskH2} data-mask-reveal>
              <h2 className={styles.h2}>Turn AI creations into income.</h2>
            </div>
          </div>
          <div className={styles.screenRow} data-stagger>
            {EARN.map((e) => (
              <article key={e.slot} className={styles.screen}>
                <span className={styles.goldRule} aria-hidden />
                <MediaFrame
                  slot={e.slot}
                  label={e.frameLabel}
                  spec="Product scene · 1600×1200 PNG/WebP"
                  ratio="4/3"
                />
                <p className={styles.screenLabel}>{e.label}</p>
                <h3 className={styles.screenTitle}>{e.title}</h3>
                <p className={styles.screenCloser}>{e.closer}</p>
              </article>
            ))}
          </div>
          <p className={styles.microLine} data-reveal>
            Crypto rewards. USDT cards. Merch. The earn surface extends beyond
            the screen.
          </p>
          <div className={styles.linkRow} data-reveal>
            <Link className={styles.textLink} href="/monetize">
              How creators earn →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 6. STAR IPs — M19 carousel ============ */}
      <section className={styles.section} id="stars" data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              04 — STAR IPs
            </p>
            <div className={styles.maskH2} data-mask-reveal>
              <h2 className={styles.h2}>
                Iconic characters.
                <br />
                Global fans.
              </h2>
            </div>
          </div>
          <StarCarousel slides={HOME_STARS} />
          <p className={styles.licensing} data-reveal>
            Star IP appearances and partnerships are subject to licensing and
            brand approvals. Marketing presentation follows deck language.
          </p>
        </div>
      </section>

      {/* ============ 7. FAQ — M17 accordion ============ */}
      <section className={styles.section} id="faq" data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              05 — FAQ
            </p>
            <div className={styles.maskH2} data-mask-reveal>
              <h2 className={styles.h2}>Questions, answered.</h2>
            </div>
          </div>
          <div data-reveal>
            <FaqList items={FAQ} />
          </div>
          <div className={styles.linkRow} data-reveal>
            <Link className={styles.textLink} href="/faq">
              See all questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 8. AI CENTER — editorial beat before the footer dome ============ */}
      <section className={styles.section} id="about" data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              06 — THE HUB
            </p>
            <div className={styles.maskH2} data-mask-reveal>
              <h2 className={styles.h2}>
                From Korea
                <br />
                to the world.
              </h2>
            </div>
          </div>
          <p className={styles.lede} data-reveal>
            The CultX AI Center in Gangnam, Seoul — a creator-first hub of
            roughly 300 specialists, building a K-digital entertainment empire
            with its community. Inspired by Nonce community culture.
            K-culture, global impact.
          </p>
          <div className={styles.linkRow} data-reveal>
            <Link className={styles.textLink} href="/about">
              Inside the AI Center →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 9. FOOTER — shared backbone SiteFooter ============ */}
      <SiteFooter />
    </main>
  );
}
