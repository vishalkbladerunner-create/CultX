import Link from "next/link";
import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { SceneRow } from "@/components/cinema/SceneRow";
import styles from "./PillarsPage.module.css";

/**
 * CultX /pillars — "Four Channels" (K-Cinema language).
 *
 * Zapping between four cinema screens: title card → the index rail →
 * four chapters, each with its own masked intertitle, per-format accent
 * and scene (before/after morph, stage, phone trio, series player) —
 * benefits read as scene rows, never benefit cards. Copy verbatim from
 * cult/content-strategy/05-pillars.md.
 */

/* Verbatim copy — cult/content-strategy/05-pillars.md */

const OVERVIEW = [
  {
    n: "01",
    anchor: "comic",
    accent: "cyan",
    title: "AI Comic / Webtoon",
    line: "Finished pages → premium AI animation",
  },
  {
    n: "02",
    anchor: "universe",
    accent: "magenta",
    title: "Star IP Universe",
    line: "Iconic characters. Studio-grade AI. Movie-length stories.",
  },
  {
    n: "03",
    anchor: "short",
    accent: "purple",
    title: "AI Short",
    line: "Small format. Massive reach.",
  },
  {
    n: "04",
    anchor: "drama",
    accent: "orange",
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

const UNIVERSE_CHIPS = [
  {
    n: "01",
    title: "Studio-level quality",
    body: "Cinematic AI content that aims at the bar of top animation studios.",
  },
  {
    n: "02",
    title: "Fraction of the cost",
    body: "Produce at a tiny fraction of traditional animation cost.",
  },
  {
    n: "03",
    title: "10× faster ambition",
    body: "From months to days — content at the speed of AI.",
  },
  {
    n: "04",
    title: "World-class IP power",
    body: "Built on IPs with massive fanbases and proven reach.",
  },
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

const DRAMA_BENEFITS = [
  {
    n: "01",
    title: "High demand, high retention",
    body: "Long-form dramas keep viewers watching episode after episode.",
    micro: "More watch time. More loyalty.",
  },
  {
    n: "02",
    title: "Premium content, premium value",
    body: "Epic stories with drama, action, romance, and thrill.",
    micro: "Higher perceived value. Stronger monetization.",
  },
  {
    n: "03",
    title: "Global appeal, K-drama power",
    body: "Korean-style storytelling with global emotions.",
    micro: "Cross-border audience. Massive fandom.",
  },
  {
    n: "04",
    title: "AI-powered production",
    body: "Cinematic quality with faster production and lower cost.",
    micro: "More content. More revenue.",
  },
];

export function PillarsPage() {
  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO — title card ============ */}
      <CinemaHero
        eyebrow="Four Experiences"
        title={"Four formats.\nOne CultX."}
        blurb="One platform that transforms IP into every major AI entertainment format — comic animation, star universes, viral shorts, and cinematic drama."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
        media={{
          slot: "hero-video-pillars",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />

      {/* ============ 2. OVERVIEW — the index rail ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading eyebrow="00 — Map" title="Pick your stage." />
          <div className={styles.rail} data-stagger>
            {OVERVIEW.map((o) => (
              <a
                key={o.n}
                href={`#${o.anchor}`}
                className={styles.railRow}
                data-accent={o.accent}
              >
                <span className={styles.railNum}>{o.n}</span>
                <span className={styles.railTitle}>{o.title}</span>
                <span className={styles.railLine}>{o.line}</span>
                <span className={styles.railJump} aria-hidden>
                  ↓
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. CHAPTER 01 — AI COMIC / WEBTOON ============ */}
      <section
        className={styles.chapter}
        id="comic"
        data-theme-section="dark"
      >
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="01 — AI Comic / Webtoon"
            accent="cyan"
            title={
              <>
                From webtoon
                <br />
                to animation.
              </>
            }
            lede="We turn finished webtoons into high-quality AI comic animation — fast, simple, and at a fraction of traditional cost. Story, characters, world, and art are already there. We bring them to motion."
          />
          <div className={styles.chapterGrid}>
            <div className={styles.morphMedia} data-reveal>
              <MediaFrame
                slot="comic-before"
                label="WEBTOON PANEL"
                spec="Source art · 900×1200 PNG/WebP"
                ratio="4/5"
              />
              <MediaFrame
                slot="comic-after"
                label="ANIMATION STILL"
                spec="Output frame · 900×1200 PNG/WebP"
                ratio="4/5"
              />
            </div>
            <ol className={styles.sceneRows} data-stagger>
              {COMIC_STEPS.map((s) => (
                <SceneRow
                  key={s.n}
                  n={s.n}
                  title={s.title}
                  body={s.body}
                  accent="cyan"
                />
              ))}
            </ol>
          </div>
          <p className={styles.proofLine} data-reveal>
            Korea’s webtoon culture produced tens of thousands of complete
            stories — a massive head start for creators ready to move.
          </p>
          <ul className={styles.chipRow} data-stagger>
            {COMIC_WINS.map((w) => (
              <li key={w} className={styles.chip}>
                {w}
              </li>
            ))}
          </ul>
          <div className={styles.linkRow} data-reveal>
            <Link className={styles.textLink} href="/platform">
              See the full platform loop →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 4. CHAPTER 02 — STAR IP UNIVERSE ============ */}
      <section
        className={styles.chapter}
        id="universe"
        data-theme-section="dark"
      >
        {/* Top dome bleeds 20% past the chapter, mask-faded edges */}
        <div className={styles.universeDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — Star IP Universe"
            accent="magenta"
            title={
              <>
                Iconic characters.
                <br />
                Studio-grade AI.
              </>
            }
            lede="Bring beloved characters to life with studio-level AI production and movie-length storytelling. Partner energy. Global fans. Legends with a head start."
          />
          <p className={styles.badge} data-reveal>
            Studio-grade production
          </p>
          <div className={styles.stageMedia} data-reveal>
            <MediaFrame
              slot="universe-stage"
              label="STAR IP STAGE"
              spec="Character group on stage · 2160×960 PNG/WebP"
              ratio="21/9"
            />
          </div>
          <ol className={styles.sceneRows} data-stagger>
            {UNIVERSE_CHIPS.map((c) => (
              <SceneRow
                key={c.n}
                n={c.n}
                title={c.title}
                body={c.body}
                accent="magenta"
              />
            ))}
          </ol>
          <p className={styles.disclaimer}>
            Quality and cost comparisons are product vision from the deck —
            ambitious targets, not third-party audited guarantees.
          </p>
          <div className={styles.linkRow} data-reveal>
            <Link className={styles.textLink} href="/stars">
              Meet the confirmed star IPs — Pucca, B.Duck, Ponke, Mew. →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 5. CHAPTER 03 — AI SHORT ============ */}
      <section
        className={styles.chapter}
        id="short"
        data-theme-section="dark"
      >
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — AI Short"
            accent="purple"
            title={
              <>
                Small format.
                <br />
                Massive impact.
              </>
            }
            lede="We turn AI animation into short, viral-ready videos that grab attention in seconds. Short content. Big reach. Real growth for every IP."
          />
          <div className={styles.phonesGrid} data-stagger>
            {[1, 2, 3].map((i) => (
              <MediaFrame
                key={i}
                slot={`short-phone-${i}`}
                label={`PHONE FYP ${i}`}
                spec="Vertical short · 1080×1920"
                ratio="9/16"
              />
            ))}
          </div>
          <ol className={styles.sceneRows} data-stagger>
            {SHORT_BENEFITS.map((b) => (
              <SceneRow
                key={b.n}
                n={b.n}
                title={b.title}
                body={b.body}
                micro={b.micro}
                accent="purple"
              />
            ))}
          </ol>
          <p className={styles.footerLine} data-reveal>
            Short videos are the new normal. AI Shorts help your IP go viral,
            grow faster, and earn more.
          </p>
        </div>
      </section>

      {/* ============ 6. CHAPTER 04 — AI DRAMA ============ */}
      <section
        className={styles.chapter}
        id="drama"
        data-theme-section="dark"
      >
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="04 — AI Drama"
            accent="orange"
            title={
              <>
                Long format.
                <br />
                Endless possibilities.
              </>
            }
            lede="Cinematic, story-driven AI dramas that audiences love to watch — and keep coming back to. Bigger stories. Deeper emotions. Global impact."
          />
          <div className={styles.playerWrap} data-reveal>
            <MediaFrame
              slot="drama-player"
              label="SERIES PLAYER"
              spec="Episode player chrome · 1920×1080"
              ratio="16/9"
            />
            {/* Illustrative series card (marketing only) */}
            <div className={styles.seriesCard}>
              <p className={styles.seriesTitle}>REBORN</p>
              <p className={styles.seriesTagline}>Betrayal. Power. Revenge.</p>
              <p className={styles.seriesMeta}>Drama · 12 Episodes · HD</p>
              <p className={styles.seriesCta}>Play Episode 1</p>
            </div>
          </div>
          <ol className={styles.sceneRows} data-stagger>
            {DRAMA_BENEFITS.map((b) => (
              <SceneRow
                key={b.n}
                n={b.n}
                title={b.title}
                body={b.body}
                micro={b.micro}
                accent="orange"
              />
            ))}
          </ol>
          <p className={styles.footerLine} data-reveal>
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

      {/* ============ 8. FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
