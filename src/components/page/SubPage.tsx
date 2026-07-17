import { GradientDome } from "@/components/background/GradientDome";
import { DashedLine } from "@/components/chrome/DashedLine";
import { UIButton } from "@/components/chrome/UIButton";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { FaqList } from "@/components/home/FaqList";
import styles from "@/components/home/HomePage.module.css";

export type SubPageProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

/**
 * Sub-page shell — **identical scroll architecture to HomePage**:
 * same section order, min-heights, dome hosts (hero / pillars / monetize /
 * footer), theme sections, reveals, and scroll-fill banner.
 *
 * Only the copy is placeholder so each route keeps the home scroll length,
 * dome parallax, and background wash story until real content lands.
 */
export function SubPage({
  title,
  eyebrow = "CultK Platform",
  description = "Placeholder page — same scroll backbone as home. Real section content will replace these blocks.",
}: SubPageProps) {
  const label = title;

  return (
    <main className={styles.main} id="top">
      {/* 1. HERO — same 100vh + top dome 200vh/110% + overlay as home */}
      <header className={styles.hero} data-theme-section="dark">
        <div className={styles.heroDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow} data-hero-intro>
            {eyebrow}
          </p>
          <h1 className={styles.heroTitle} data-hero-intro>
            {label}
          </h1>
          <div className={styles.heroCtas} data-hero-intro>
            <UIButton href="#waitlist" label="Join the Waitlist" />
            <UIButton
              href="/"
              label="Back to Home"
              variant="secondary"
              withIcon={false}
            />
          </div>
        </div>
        <div className={styles.heroFooter} data-hero-intro>
          <p className={styles.heroMeta}>Built in Korea — Powered for the World</p>
          <p className={styles.heroBlurb}>{description}</p>
        </div>
      </header>

      {/* 2. Editorial wash zone (same .section padding as home problem) */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              01 — {label}
            </p>
            <h2 className={styles.h2} data-reveal>
              Placeholder section.
              <br />
              Same scroll rhythm.
            </h2>
          </div>
          <p className={styles.lede} data-reveal>
            This block matches the home “problem / editorial wash” section
            height and motion. Content for {label} will replace this copy —
            the atmosphere and section spacing stay identical to home.
          </p>
        </div>
      </section>

      {/* 3. Pillars band — bottom dome 100% (same host as home) */}
      <section className={styles.pillarsBand} data-theme-section="dark">
        <div className={styles.pillarsDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              02 — Structure
            </p>
            <h2 className={styles.h2} data-reveal>
              Same tall band. Same dome field.
            </h2>
          </div>
          <ul className={styles.pillarList}>
            {["01", "02", "03", "04"].map((n) => (
              <li key={n} className={styles.pillarRow} data-reveal>
                <span className={styles.pillarNum}>{n}</span>
                <div className={styles.pillarText}>
                  <h3 className={styles.pillarTitle}>
                    {label} block {n}
                  </h3>
                  <p className={styles.pillarBody}>
                    Placeholder row — preserves the home pillars list rhythm
                    and dashed separators for scroll length parity.
                  </p>
                </div>
                <DashedLine className={styles.lineRow} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Banner — solid void + scroll-fill (M07) identical to home */}
      <section className={styles.banner} data-theme-section="dark">
        <div className={styles.layout}>
          <p className={styles.bannerManifesto} data-scroll-fill>
            {["Create.", "Watch.", "Engage.", "Own."].map((w) => (
              <span key={w} className={styles.fillWord} data-fill-word>
                {w}
              </span>
            ))}
          </p>
          <p className={styles.bannerSub}>
            Same manifesto panel as home — scroll-scrubbed word fill included.
          </p>
        </div>
      </section>

      {/* 5. Monetize band — top dome 110% (same host as home) */}
      <section className={styles.monetizeBand} data-theme-section="dark">
        <div className={styles.monetizeDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              03 — Detail
            </p>
            <h2 className={styles.h2} data-reveal>
              Same monetize dome stack.
            </h2>
          </div>
          <div className={styles.earnGrid}>
            {["01", "02", "03"].map((n) => (
              <article
                key={n}
                className={`${styles.earnCard} ${styles.hasPinTopLeft}`}
                data-reveal
              >
                <span className={styles.pillarNum}>{n}</span>
                <h3 className={styles.earnTitle}>
                  {label} card {n}
                </h3>
                <p className={styles.earnBody}>
                  Placeholder card matching home earn-grid geometry so this
                  band keeps the same height and scroll story.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial wash (stars slot) */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              04 — Grid
            </p>
            <h2 className={styles.h2} data-reveal>
              Same card grid spacing.
            </h2>
          </div>
          <div className={styles.starGrid}>
            {["Alpha", "Beta", "Gamma", "Delta"].map((name) => (
              <div
                key={name}
                className={`${styles.starCard} ${styles.hasPinBottomRight}`}
                data-reveal
              >
                <span className={styles.starName}>{name}</span>
                <span className={styles.starNote}>
                  Placeholder tile for {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ slot — same accordion height as home */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              05 — FAQ
            </p>
            <h2 className={styles.h2} data-reveal>
              Same FAQ accordion band.
            </h2>
          </div>
          <div data-reveal>
            <FaqList
              items={[
                {
                  q: `What is the ${label} page?`,
                  a: "A placeholder that reuses the exact home-page section stack so scroll length, domes, and background motion match home.",
                },
                {
                  q: "Why is the scroll so long?",
                  a: "By design — every sub-page mirrors the home surface architecture until real content is written into these shells.",
                },
                {
                  q: "What is shared across pages?",
                  a: "Header, fixed atmosphere, ScrollDriver (Lenis + GSAP), section domes, theme flips, reveals, scroll-fill, and SiteFooter.",
                },
                {
                  q: "What changes per route?",
                  a: "Only the hero title / eyebrow / description and the placeholder copy inside the shared shells.",
                },
                {
                  q: "Where is real content going?",
                  a: "Into these same section hosts — no change to scroll architecture when product copy lands.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 8. AI Center / about beat before footer dome */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>
              06 — The Hub
            </p>
            <h2 className={styles.h2} data-reveal>
              Same pre-footer beat.
            </h2>
          </div>
          <p className={styles.lede} data-reveal>
            Placeholder closing section matching the home AI Center band so
            the footer dome rises on the same scroll distance as home.
          </p>
        </div>
      </section>

      {/* 9. Shared footer — bottom dome calc(120% + 420px) */}
      <SiteFooter />
    </main>
  );
}
