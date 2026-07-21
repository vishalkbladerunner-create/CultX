"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { DashedLine } from "@/components/chrome/DashedLine";
import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { PillarsAnimations } from "./PillarsAnimations";
import styles from "./PillarsPage.module.css";

const OVERVIEW = [
  {
    n: "01",
    anchor: "comic",
    accent: "green",
    title: "AI Comic / Webtoon",
    line: "Finished pages → premium AI animation",
  },
  {
    n: "02",
    anchor: "universe",
    accent: "green",
    title: "Star IP Universe",
    line: "Iconic characters. Studio-grade AI. Movie-length stories.",
  },
  {
    n: "03",
    anchor: "short",
    accent: "green",
    title: "AI Short",
    line: "Small format. Massive reach.",
  },
  {
    n: "04",
    anchor: "drama",
    accent: "green",
    title: "AI Drama",
    line: "Long form. Deep emotion. Global binge.",
  },
] as const;

const COMIC_STEPS = [
  {
    n: "01",
    title: "Finished webtoon",
    body: "Everything is ready — story, characters, world, and art.",
  },
  {
    n: "02",
    title: "Production",
    body: "Specialists convert the webtoon into stunning AI animation — very fast, very efficient.",
  },
  {
    n: "03",
    title: "Cinematic result",
    body: "High quality without the traditional time or budget.",
  },
];

const COMIC_WINS = [
  "Ready-made character design and plot",
  "Skip months of original IP development",
  "Built for scale without abandoning craft",
];

const UNIVERSE_STATS = [
  { number: "10x", label: "Faster Ambition" },
  { number: "<0.5%", label: "Traditional Cost" },
  { number: "100%", label: "Studio-Grade Quality" },
  { number: "4+", label: "Confirmed Star IPs" },
];

const SHORT_BENEFITS = [
  {
    n: "01",
    title: "Built for virality",
    body: "Short videos grab attention in seconds and spread like wildfire.",
    micro: "More views. Faster growth.",
  },
  {
    n: "02",
    title: "Lower cost, higher output",
    body: "Create hundreds of shorts at a fraction of the cost and time.",
    micro: "Save time. Scale faster.",
  },
  {
    n: "03",
    title: "Stronger engagement",
    body: "Shorts keep audiences hooked and coming back.",
    micro: "More likes. Stronger community.",
  },
  {
    n: "04",
    title: "More value per IP",
    body: "One story. Endless shorts. Maximum surface area.",
    micro: "More content. More revenue.",
  },
];

const DRAMA_EPISODES = [
  { n: "01", title: "The Spark of Rebellion", duration: "42 min" },
  { n: "02", title: "Shadow Play", duration: "38 min" },
  { n: "03", title: "The Gangnam Connection", duration: "45 min" },
];

export function PillarsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const handleCardClick = (idx: number, anchor: string) => {
    if (emblaApi) {
      emblaApi.scrollTo(idx);
    }
    const targetEl = document.getElementById(anchor);
    if (targetEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, { offset: -60 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO ============ */}
      <CinemaHero
        eyebrow="Four Experiences"
        title={"Four formats.\nOne CultX."}
        blurb="One platform that transforms IP into every major AI entertainment format — comic animation, star universes, viral shorts, and cinematic drama."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
        media={{
          slot: "hero-video-pillars",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 · muted loop ≤8s",
        }}
      />

      {/* ============ 2. OVERVIEW ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading eyebrow="00 — Map" title="Pick your stage." />
          
          <div className={styles.carouselContainer}>
            <div className={styles.viewport} ref={emblaRef}>
              <div className={styles.container}>
                {OVERVIEW.map((o, idx) => (
                  <div
                    key={o.n}
                    className={`${styles.slide} ${idx === activeSlide ? styles.activeSlide : ""}`}
                    onClick={() => handleCardClick(idx, o.anchor)}
                  >
                    <div className={styles.formatCard} data-accent={o.accent}>
                      <div className={styles.cardContent}>
                        <span className={styles.cardNum}>{o.n}</span>
                        <h3 className={styles.cardTitle}>{o.title}</h3>
                        <p className={styles.cardLine}>{o.line}</p>
                        <span className={styles.cardAction}>Jump to chapter →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. CHAPTER 01 — AI COMIC / WEBTOON (Split Header & Balanced Stack) ============ */}
      <section
        className={`${styles.chapter} ${styles.comicBg}`}
        id="comic"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.layout}>
          {/* Split Header: H2 left, lede right */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>01 — AI Comic / Webtoon</p>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                From webtoon
                <br />
                to animation.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                We turn finished webtoons into high-quality AI comic animation — fast, simple, and at a fraction of traditional cost. Story, characters, world, and art are already there. We bring them to motion.
              </p>
            </div>
          </div>

          <div className={styles.chapterVisualSection}>
            {/* Visual block sits directly below heading, spanning the width */}
            <div className={styles.wideMediaWrapper}>
              <div className={styles.ambientMediaBackground} />
              <div className={styles.morphMedia}>
                <MediaFrame
                  slot="comic-before"
                  label="WEBTOON PANEL"
                  spec="Source art · 900×1200"
                  ratio="4/5"
                />
                <MediaFrame
                  slot="comic-after"
                  label="ANIMATION STILL"
                  spec="Output frame · 900×1200"
                  ratio="4/5"
                />
              </div>
            </div>

            {/* Horizontal Steps Row: 3 horizontal columns, borderless */}
            <div className={styles.stepsRow}>
              {COMIC_STEPS.map((s) => (
                <div key={s.n} className={styles.stepColumn}>
                  <span className={styles.stepNum}>{s.n}</span>
                  <h4 className={styles.stepTitle}>{s.title}</h4>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              ))}
            </div>

            {/* Wins Split Block (Left: Proof Text & Link, Right: Bullet Points) */}
            <div className={styles.winsSplitBlock}>
              <div className={styles.winsSplitLeft}>
                <p className={styles.proofLine}>
                  Korea’s webtoon culture produced tens of thousands of complete
                  stories — a massive head start for creators ready to move.
                </p>
                <div className={styles.linkRow}>
                  <Link className={styles.textLink} href="/platform">
                    See the full platform loop →
                  </Link>
                </div>
              </div>
              
              <div className={styles.winsSplitRight}>
                <div className={styles.winsRow}>
                  {COMIC_WINS.map((w, idx) => (
                    <div key={idx} className={styles.winItem}>
                      <span className={styles.winBullet}>✦</span>
                      <span className={styles.winText}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. CHAPTER 02 — STAR IP UNIVERSE (Split Header & Symmetrical Metrics) ============ */}
      <section
        className={`${styles.chapter} ${styles.universeBg}`}
        id="universe"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.universeDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          {/* Split Header: H2 left, lede right */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>02 — Star IP Universe</p>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                Iconic characters.
                <br />
                Studio-grade AI.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                Bring beloved characters to life with studio-level AI production and movie-length storytelling. Partner energy. Global fans. Legends with a head start.
              </p>
            </div>
          </div>
          
          <div className={styles.spotlightStage}>
            <div className={styles.badgeWrapper}>
              <p className={styles.badge}>Studio-grade production</p>
            </div>
            
            <div className={styles.stageMedia}>
              <div className={styles.ambientMediaBackground} />
              <MediaFrame
                slot="universe-stage"
                label="STAR IP STAGE"
                spec="Character group on stage · 2160×960"
                ratio="21/9"
              />
            </div>

            {/* Symmetrical stats grid (spanning the full width) */}
            <div className={styles.statsGrid}>
              {UNIVERSE_STATS.map((stat, idx) => (
                <div key={idx} className={styles.statItem}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Symmetrical footer layout */}
            <div className={styles.statsFooterRow}>
              <p className={styles.disclaimer}>
                Quality and cost comparisons are product vision from the deck —
                ambitious targets, not third-party audited guarantees.
              </p>
              <div className={styles.starsLinkWrapper}>
                <Link className={styles.textLink} href="/stars">
                  Meet the confirmed star IPs — Pucca, B.Duck, Ponke, Mew. →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. CHAPTER 03 — AI SHORT (Restored Redesign & Horizontal Grid) ============ */}
      <section
        className={`${styles.chapter} ${styles.shortBg}`}
        id="short"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — AI Short"
            accent="gold"
            title={
              <>
                Small format.
                <br />
                Massive impact.
              </>
            }
            lede="We turn AI animation into short, viral-ready videos that grab attention in seconds. Short content. Big reach. Real growth for every IP."
          />

          {/* Magnetic Parallax Grid */}
          <div className={styles.phoneReel} data-phone-reel>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.phoneFrame} data-phone-frame>
                <MediaFrame
                  slot={`short-phone-${i}`}
                  label={`PHONE FYP ${i}`}
                  spec="Vertical short · 1080×1920"
                  ratio="9/16"
                />
              </div>
            ))}
          </div>

          {/* Symmetrical 4-Column Benefits Grid (No Numbers) */}
          <div className={styles.shortsGrid}>
            {SHORT_BENEFITS.map((b) => (
              <div key={b.n} className={styles.shortBenefitItem}>
                <div className={styles.shortBenefitHeader}>
                  <span className={styles.shortBenefitBullet}>✦</span>
                  <h4 className={styles.shortBenefitTitle}>{b.title}</h4>
                </div>
                <p className={styles.shortBenefitBody}>{b.body}</p>
                <span className={styles.shortBenefitMicro}>{b.micro}</span>
              </div>
            ))}
          </div>

          {/* Premium Centerpiece Callout Banner */}
          <div className={styles.shortsCallout}>
            <DashedLine className={styles.calloutLineTop} />
            <p className={styles.shortsCalloutText}>
              Short videos are the new normal. AI Shorts help your IP go viral,
              grow faster, and earn more.
            </p>
            <DashedLine className={styles.calloutLineBottom} />
          </div>
        </div>
      </section>

      {/* ============ 6. CHAPTER 04 — AI DRAMA (Split Header & Editorial Narrative Prose) ============ */}
      <section
        className={`${styles.chapter} ${styles.dramaBg}`}
        id="drama"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.layout}>
          {/* Split Header: H2 left, lede right */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <p className={styles.eyebrow} data-reveal>04 — AI Drama</p>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                Long format.
                <br />
                Endless possibilities.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                Cinematic, story-driven AI dramas that audiences love to watch — and keep coming back to. Bigger stories. Deeper emotions. Global impact.
              </p>
            </div>
          </div>

          <div className={styles.playerStage}>
            {/* Rounded player container - ONLY contains the widescreen player */}
            <div className={styles.playerWrap}>
              <div className={styles.ambientMediaBackground} />
              <MediaFrame
                slot="drama-player"
                label="SERIES PLAYER"
                spec="Episode player chrome · 1920×1080"
                ratio="16/9"
              />
            </div>
            
            {/* Illustrative series card (marketing only) - moved outside player container for continuous background glow */}
            <div className={styles.seriesCard}>
              <p className={styles.seriesTitle}>REBORN</p>
              <p className={styles.seriesTagline}>Betrayal. Power. Revenge.</p>
              <p className={styles.seriesMeta}>Drama · 12 Episodes · HD</p>
              
              <button
                onClick={() => setDrawerOpen(true)}
                className={styles.drawerTrigger}
              >
                Explore Details & Episodes →
              </button>
            </div>
          </div>

          {/* Editorial 2-Column Narrative Prose: No numbered points or scene rows */}
          <div className={styles.proseRow}>
            <div className={styles.proseColumn}>
              <h4 className={styles.proseTitle}>Binge Culture & Audience Retention</h4>
              <p className={styles.proseText}>
                Modern audiences thrive on continuity and depth. Long-form AI dramas capture attention
                and foster deep community loyalty, keeping viewers hooked episode after episode. By building
                premium stories rich in drama, action, romance, and suspense, CultX creators capture the highly
                coveted global audience attention, driving superior watch time and community engagement.
              </p>
            </div>
            
            <div className={styles.proseColumn}>
              <h4 className={styles.proseTitle}>Global Appeal & AI-Powered Scaling</h4>
              <p className={styles.proseText}>
                Leveraging the global K-drama phenomenon, CultX combines Korean-style emotional hooks with
                universal themes to build cross-border fandoms. By scaling production through specialized
                AI pipelines, creators can publish cinematic-quality episodic series at a fraction of traditional
                Hollywood costs, dramatically reducing time-to-market and unlocking higher monetization paths.
              </p>
            </div>
          </div>

          <p className={styles.footerLine}>
            Stories that stay with people. AI Drama turns imagination into
            unforgettable experiences.
          </p>
        </div>
      </section>

      {/* ============ 7. CROSS-FORMAT CTA ============ */}
      <CtaBand
        title="One IP. Every format."
        body="Start in webtoon. Expand into shorts. Land a drama. Grow a star universe. CultX is the stage where formats reinforce each other."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "Turn creations into income" }}
      />

      {/* ============ 8. M14 SIDE DRAWER ============ */}
      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.drawerClose}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close details"
            >
              ✕ CLOSE
            </button>
            
            <div className={styles.drawerContent}>
              <span className={styles.drawerEyebrow}>Drama Showcase</span>
              <h3 className={styles.drawerTitle}>REBORN</h3>
              <p className={styles.drawerTagline}>Betrayal. Power. Revenge.</p>
              
              <div className={styles.drawerDivider} />
              
              <h4 className={styles.drawerSectionHeader}>EPISODES</h4>
              <ul className={styles.episodeList}>
                {DRAMA_EPISODES.map((ep) => (
                  <li key={ep.n} className={styles.episodeItem}>
                    <span className={styles.episodeNum}>{ep.n}</span>
                    <div className={styles.episodeInfo}>
                      <span className={styles.episodeTitle}>{ep.title}</span>
                      <span className={styles.episodeDuration}>{ep.duration}</span>
                    </div>
                    <button className={styles.episodePlay} aria-label="Play episode">
                      ▶
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.drawerDivider} />

              <h4 className={styles.drawerSectionHeader}>FORMAT VALUES</h4>
              <ul className={styles.drawerBenefits}>
                <li className={styles.drawerBenefit}>
                  <span className={styles.benefitNum}>01</span>
                  <div>
                    <span className={styles.benefitTitle}>High demand, high retention</span>
                    <p className={styles.benefitBody}>Long-form dramas keep viewers watching episode after episode. More watch time. More loyalty.</p>
                  </div>
                </li>
                <li className={styles.drawerBenefit}>
                  <span className={styles.benefitNum}>02</span>
                  <div>
                    <span className={styles.benefitTitle}>Premium content, premium value</span>
                    <p className={styles.benefitBody}>Epic stories with drama, action, romance, and thrill. Higher perceived value. Stronger monetization.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============ 9. FOOTER ============ */}
      <SiteFooter />

      {/* Client-side animations trigger script */}
      <PillarsAnimations onOpenDrawer={() => setDrawerOpen(true)} />
    </main>
  );
}
