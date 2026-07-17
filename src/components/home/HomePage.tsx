import { GradientDome } from "@/components/background/GradientDome";
import { DashedLine } from "@/components/chrome/DashedLine";
import { UIButton } from "@/components/chrome/UIButton";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { FaqList } from "./FaqList";
import styles from "./HomePage.module.css";

/**
 * CultK home — reference Surface A architecture rebuilt with CultK content
 * and the poppy image set (verified twins of the reference assets):
 *
 *   1. Hero        — top dome (110%/200vh) + poster + heroOverlay PNG (M08)
 *   2. Problem     — editorial wash zone (fixed M04 radial shows through)
 *   3. Pillars     — tall band, bottom dome 100% (ref propositions field)
 *   4. Banner      — solid void panel + scroll-fill manifesto (L05 + M07)
 *   5. Monetize    — top dome 110% (ref opportunity-wrapper)
 *   6. Star IPs    — editorial wash zone
 *   7. FAQ         — accordion (M17)
 *   8. AI Center   — editorial beat (dome band rises beneath it)
 *   9. Footer      — bottom dome calc(120% + 420px) + waitlist (L12)
 *
 * Scroll story = document flow past image domes + fixed wash (never a
 * per-frame body recolor). Motion lives in ScrollDriver (GSAP + Lenis).
 */

const PILLARS = [
  {
    n: "01",
    title: "AI Comic / Webtoon",
    body: "Finished webtoons become premium AI comic animation — fast, and at scale.",
  },
  {
    n: "02",
    title: "AI Star IP Universe",
    body: "Iconic characters brought to life with studio-level AI production and movie-length storytelling.",
  },
  {
    n: "03",
    title: "AI Short",
    body: "Viral short-form built for social platforms — TikTok, Reels, Shorts.",
  },
  {
    n: "04",
    title: "AI Drama",
    body: "Cinematic long-form AI series with K-drama emotion and retention.",
  },
];

const EARN = [
  {
    n: "01",
    title: "Direct sales",
    body: "Sell characters, comics, and stories. Fans unlock paid content directly from creators.",
  },
  {
    n: "02",
    title: "Community IP tokens",
    body: "Launch a token for a character or IP. Fans support, trade, and grow the legend together.",
  },
  {
    n: "03",
    title: "Ad revenue",
    body: "Earn from attention — when fans watch ads on your content, you get paid.",
  },
];

const STARS = [
  { name: "Pucca", note: "~25-year Korean iconic brand" },
  { name: "B.Duck", note: "~20-year global lifestyle brand" },
  { name: "Ponke", note: "Web3-native IP, strong community" },
  { name: "Mew", note: "Fast-growing cat IP" },
];

const FAQ = [
  {
    q: "What is CultK?",
    a: "CultK is the all-in-one platform for AI-native IP creation and monetization. Create, publish, grow, and earn — one ecosystem for creators and fans.",
  },
  {
    q: "What can I create on CultK?",
    a: "Four entertainment formats: AI Comic / Webtoon, AI Star IP Universe, AI Short, and AI Drama — from finished webtoons to cinematic long-form series.",
  },
  {
    q: "How do creators earn?",
    a: "Three paths: direct sales of characters, comics and stories; community ownership through IP tokens; and ad revenue from attention on your content. Rewards can pay out in crypto, with USDT cards and merch in the ecosystem.",
  },
  {
    q: "Which star IPs are on CultK?",
    a: "Confirmed partner IPs from the deck: Pucca, B.Duck, Ponke, and Mew — with more to come.",
  },
  {
    q: "Where is CultK built?",
    a: "At the CultK AI Center in Gangnam, Seoul — a creator-first hub of roughly 300 specialists. Built in Korea, powered for the world.",
  },
];

export function HomePage() {
  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO — dome image bg + overlay PNG (M08 + M05) ============ */}
      <header className={styles.hero} data-theme-section="dark">
        {/* z0 — hero background IS the poppy dome image (also the future
            backdrop under the hero video slot; ref wraps video in this field) */}
        <div className={styles.heroDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        {/* z1 — hero overlay vignette PNG (twin of ref heroOverlay_homepage) */}
        <div className={styles.heroOverlay} aria-hidden />
        {/* z2 — content */}
        <div className={styles.heroContent}>
          <p className={styles.eyebrow} data-hero-intro>
            CultK Platform
          </p>
          <h1 className={styles.heroTitle} data-hero-intro>
            Where IPs
            <br />
            Become Legends.
          </h1>
          <div className={styles.heroCtas} data-hero-intro>
            <UIButton href="#waitlist" label="Join the Waitlist" />
            <UIButton href="#platform" label="Explore the Platform" variant="secondary" withIcon={false} />
          </div>
        </div>
        <div className={styles.heroFooter} data-hero-intro>
          <p className={styles.heroMeta}>Built in Korea — Powered for the World</p>
          <p className={styles.heroBlurb}>
            The all-in-one platform for AI-native IP creation and monetization.
            Create · Publish · Grow · Earn.
          </p>
        </div>
      </header>

      {/* ============ 2. PROBLEM — editorial wash zone ============ */}
      <section
        className={styles.section}
        id="platform"
        data-theme-section="dark"
      >
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              01 — The Market
            </p>
            <h2 className={styles.h2} data-reveal>
              Massive creation.
              <br />
              Broken monetization.
            </h2>
          </div>
          <p className={styles.lede} data-reveal>
            The AI creator economy is enormous — but discovery and monetization
            are broken. Most creators are never found, and almost none earn real
            income. CultK is the all-in-one platform where AI-native IP gets
            created, published, grown — and paid.
          </p>
        </div>
      </section>

      {/* ============ 3. PILLARS — tall band, bottom dome 100% ============ */}
      <section
        className={styles.pillarsBand}
        id="pillars"
        data-theme-section="dark"
      >
        <div className={styles.pillarsDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              02 — Four Experiences
            </p>
            <h2 className={styles.h2} data-reveal>
              Every major AI entertainment format.
            </h2>
          </div>
          <ul className={styles.pillarList}>
            {PILLARS.map((p) => (
              <li key={p.n} className={styles.pillarRow} data-reveal>
                <span className={styles.pillarNum}>{p.n}</span>
                <div className={styles.pillarText}>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarBody}>{p.body}</p>
                </div>
                <DashedLine className={styles.lineRow} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 4. BANNER — solid void panel + scroll fill (M07) ============ */}
      <section
        className={styles.banner}
        id="banner"
        data-theme-section="dark"
      >
        <div className={styles.layout}>
          <p className={styles.bannerManifesto} data-scroll-fill>
            {["Create.", "Watch.", "Engage.", "Own."].map((w) => (
              <span key={w} className={styles.fillWord} data-fill-word>
                {w}
              </span>
            ))}
          </p>
          <p className={styles.bannerSub}>
            One loop. One ecosystem. Creators and fans, building legends
            together.
          </p>
        </div>
      </section>

      {/* ============ 5. MONETIZE — top dome 110% ============ */}
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
              03 — Monetize
            </p>
            <h2 className={styles.h2} data-reveal>
              Turn AI creations into income.
            </h2>
          </div>
          <div className={styles.earnGrid}>
            {EARN.map((e) => (
              <article
                key={e.n}
                className={`${styles.earnCard} ${styles.hasPinTopLeft}`}
                data-reveal
              >
                <span className={styles.pillarNum}>{e.n}</span>
                <h3 className={styles.earnTitle}>{e.title}</h3>
                <p className={styles.earnBody}>{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. STAR IPs — editorial wash zone ============ */}
      <section className={styles.section} id="stars" data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              04 — Star IPs
            </p>
            <h2 className={styles.h2} data-reveal>
              Iconic characters.
              <br />
              Global fans.
            </h2>
          </div>
          <div className={styles.starGrid}>
            {STARS.map((s) => (
              <div
                key={s.name}
                className={`${styles.starCard} ${styles.hasPinBottomRight}`}
                data-reveal
              >
                <span className={styles.starName}>{s.name}</span>
                <span className={styles.starNote}>{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. FAQ ============ */}
      <section className={styles.section} id="faq" data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              05 — FAQ
            </p>
            <h2 className={styles.h2} data-reveal>
              Questions, answered.
            </h2>
          </div>
          <div data-reveal>
            <FaqList items={FAQ} />
          </div>
        </div>
      </section>

      {/* ============ 8. AI CENTER — editorial beat before the footer dome ============ */}
      <section className={styles.section} id="about" data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              06 — The Hub
            </p>
            <h2 className={styles.h2} data-reveal>
              From Korea
              <br />
              to the world.
            </h2>
          </div>
          <p className={styles.lede} data-reveal>
            The CultK AI Center in Gangnam, Seoul — a creator-first hub of
            roughly 300 specialists, building the K-digital entertainment
            empire with its community. K-culture, global impact.
          </p>
        </div>
      </section>

      {/* ============ 9. FOOTER — shared backbone SiteFooter ============ */}
      <SiteFooter />
    </main>
  );
}
