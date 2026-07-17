import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { CtaBand } from "@/components/kit/CtaBand";
import { Card, type CardAccent } from "@/components/kit/Card";
import { MediaFrame } from "@/components/kit/MediaFrame";
import kit from "@/components/kit/kit.module.css";
import styles from "./PillarsPage.module.css";

/* Verbatim copy — cult/content-strategy/05-pillars.md */

const OVERVIEW: { n: string; title: string; body: string; accent: CardAccent; href: string }[] = [
  { n: "01", title: "AI Comic / Webtoon", body: "Finished pages → premium AI animation", accent: "cyan", href: "#comic" },
  { n: "02", title: "Star IP Universe", body: "Iconic characters. Studio-grade AI. Movie-length stories.", accent: "magenta", href: "#universe" },
  { n: "03", title: "AI Short", body: "Small format. Massive reach.", accent: "purple", href: "#short" },
  { n: "04", title: "AI Drama", body: "Long form. Deep emotion. Global binge.", accent: "orange", href: "#drama" },
];

const COMIC_STEPS = [
  { n: "01", title: "Finished webtoon", body: "Everything is ready — story, characters, world, and art." },
  { n: "02", title: "Production", body: "Specialists convert the webtoon into stunning AI animation — very fast, very efficient." },
  { n: "03", title: "Cinematic result", body: "High quality without the traditional time or budget." },
];

const COMIC_WINS = [
  "Ready-made character design and plot",
  "Skip months of original IP development",
  "Built for scale without abandoning craft",
];

const UNIVERSE_CHIPS = [
  { n: "01", title: "Studio-level quality", body: "Cinematic AI content that aims at the bar of top animation studios." },
  { n: "02", title: "Fraction of the cost", body: "Produce at a tiny fraction of traditional animation cost." },
  { n: "03", title: "10× faster ambition", body: "From months to days — content at the speed of AI." },
  { n: "04", title: "World-class IP power", body: "Built on IPs with massive fanbases and proven reach." },
];

const SHORT_BENEFITS = [
  { n: "01", title: "Built for virality", body: "Short videos grab attention in seconds and spread like wildfire.", micro: "More views. Faster growth." },
  { n: "02", title: "Lower cost, higher output", body: "Create hundreds of shorts at a fraction of the cost and time.", micro: "Save time. Scale faster." },
  { n: "03", title: "Stronger engagement", body: "Shorts keep audiences hooked and coming back.", micro: "More likes. Stronger community." },
  { n: "04", title: "More value per IP", body: "One story. Endless shorts. Maximum surface area.", micro: "More content. More revenue." },
];

const DRAMA_BENEFITS = [
  { n: "01", title: "High demand, high retention", body: "Long-form dramas keep viewers watching episode after episode.", micro: "More watch time. More loyalty." },
  { n: "02", title: "Premium content, premium value", body: "Epic stories with drama, action, romance, and thrill.", micro: "Higher perceived value. Stronger monetization." },
  { n: "03", title: "Global appeal, K-drama power", body: "Korean-style storytelling with global emotions.", micro: "Cross-border audience. Massive fandom." },
  { n: "04", title: "AI-powered production", body: "Cinematic quality with faster production and lower cost.", micro: "More content. More revenue." },
];

export function PillarsPage() {
  return (
    <main className={styles.main} id="top">
      {/* 1. HERO */}
      <PageHero
        eyebrow="Four Experiences"
        title={
          <>
            Four formats.
            <br />
            One CultX.
          </>
        }
        blurb="One platform that transforms IP into every major AI entertainment format — comic animation, star universes, viral shorts, and cinematic drama."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
        media={{
          slot: "hero-video-pillars",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />

      {/* 2. OVERVIEW FOUR-UP */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading eyebrow="00 — Map" title="Pick your stage." />
          <div className={styles.overviewGrid}>
            {OVERVIEW.map((o) => (
              <a key={o.n} href={o.href} className={styles.overviewLink}>
                <Card n={o.n} title={o.title} body={o.body} accent={o.accent} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CHAPTER — AI COMIC / WEBTOON */}
      <section className={styles.chapter} id="comic" data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
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
            <div className={styles.chapterMedia} data-reveal>
              <MediaFrame slot="comic-before" label="WEBTOON PANEL" spec="Source art · 900×1200" ratio="4/5" />
              <MediaFrame slot="comic-after" label="ANIMATION STILL" spec="Output frame · 900×1200" ratio="4/5" />
            </div>
            <div>
              <ol className={styles.stepList} data-stagger>
                {COMIC_STEPS.map((s) => (
                  <li key={s.n}>
                    <span className={kit.cardNum}>{s.n}</span>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={kit.body}>{s.body}</p>
                  </li>
                ))}
              </ol>
              <ul className={styles.winList} data-stagger>
                {COMIC_WINS.map((w) => (
                  <li key={w} className={styles.winItem}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.proofLine} data-reveal>
            Korea&apos;s webtoon culture produced tens of thousands of complete
            stories — a massive head start for creators ready to move.
          </p>
        </div>
      </section>

      {/* 4. CHAPTER — STAR IP UNIVERSE */}
      <section className={styles.chapter} id="universe" data-theme-section="dark">
        <div className={styles.chapterDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={kit.layout}>
          <SectionHeading
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
          <div className={styles.stageMedia} data-reveal>
            <MediaFrame
              slot="universe-stage"
              label="CHARACTER STAGE"
              spec="Group key visual · 2160×960 PNG/WebP"
              ratio="21/9"
            />
          </div>
          <div className={styles.chipGrid} data-stagger>
            {UNIVERSE_CHIPS.map((c) => (
              <Card key={c.n} n={c.n} title={c.title} body={c.body} accent="magenta" />
            ))}
          </div>
          <p className={kit.disclaimer}>
            Quality and cost comparisons are product vision from the deck —
            ambitious targets, not third-party audited guarantees.
          </p>
        </div>
      </section>

      {/* 5. CHAPTER — AI SHORT */}
      <section className={styles.chapter} id="short" data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
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
          <div className={styles.phoneRow} data-stagger>
            {["01", "02", "03"].map((n) => (
              <MediaFrame
                key={n}
                slot={`short-phone-${n}`}
                label={`SHORT ${n}`}
                spec="9:16 vertical loop · 1080×1920 WebM+MP4"
                ratio="9/16"
              />
            ))}
          </div>
          <div className={styles.benefitGrid} data-stagger>
            {SHORT_BENEFITS.map((b) => (
              <Card key={b.n} n={b.n} title={b.title} body={b.body} accent="purple">
                <p className={styles.cardMicro}>{b.micro}</p>
              </Card>
            ))}
          </div>
          <p className={styles.proofLine} data-reveal>
            The global short-video market is exploding — CultX is built for
            that feed.
          </p>
        </div>
      </section>

      {/* 6. CHAPTER — AI DRAMA */}
      <section className={styles.chapter} id="drama" data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
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
              spec="Episode video · 1920×1080 WebM+MP4"
              ratio="16/9"
            />
            <div className={styles.seriesCard}>
              <p className={styles.seriesTitle}>REBORN</p>
              <p className={styles.seriesTag}>Betrayal. Power. Revenge.</p>
              <p className={styles.seriesMeta}>Drama · 12 Episodes · HD</p>
              <span className={styles.seriesCta}>Play Episode 1</span>
            </div>
          </div>
          <div className={styles.benefitGrid} data-stagger>
            {DRAMA_BENEFITS.map((b) => (
              <Card key={b.n} n={b.n} title={b.title} body={b.body} accent="orange">
                <p className={styles.cardMicro}>{b.micro}</p>
              </Card>
            ))}
          </div>
          <p className={styles.proofLine} data-reveal>
            Stories that stay with people. AI Drama turns imagination into
            unforgettable experiences.
          </p>
        </div>
      </section>

      {/* 7. CROSS-FORMAT CTA */}
      <CtaBand
        title="One IP. Every format."
        body="Start in webtoon. Expand into shorts. Land a drama. Grow a star universe. CultX is the stage where formats reinforce each other."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "Turn creations into income" }}
      />

      {/* 8. FOOTER */}
      <SiteFooter />
    </main>
  );
}
