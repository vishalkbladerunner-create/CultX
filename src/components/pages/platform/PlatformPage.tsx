import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { CtaBand } from "@/components/kit/CtaBand";
import { MediaFrame } from "@/components/kit/MediaFrame";
import kit from "@/components/kit/kit.module.css";
import styles from "./PlatformPage.module.css";

/* Verbatim copy — cult/content-strategy/04-platform.md */

const CHIPS = [
  "All Formats",
  "Star IP Universe",
  "Create with AI",
  "Cinematic Quality",
  "IP Token",
  "One Ecosystem",
];

const JOURNEY = [
  {
    n: "01",
    title: "Create IP",
    body: "Build your characters, stories, and worlds using AI tools.",
  },
  {
    n: "02",
    title: "Publish Content",
    body: "Turn ideas into animations, webtoons, shorts, or dramas.",
  },
  {
    n: "03",
    title: "Grow Audience",
    body: "Fans discover, follow, and support your IP. Top IPs rise together.",
  },
  {
    n: "04",
    title: "Engage Community",
    body: "Build a loyal community. Fans interact, support, and help your IP grow.",
  },
  {
    n: "05",
    title: "Monetize & Earn",
    body: "Earn through content sales, IP tokens, and ads. Get rewarded in crypto.",
  },
];

const WEBTOON_POINTS = [
  {
    n: "01",
    title: "Everything is ready",
    body: "A finished webtoon already has a complete character, a written story, and finished art.",
  },
  {
    n: "02",
    title: "Untapped libraries",
    body: "Out of tens of thousands of webtoons ever created, only a small fraction break through. Complete work is waiting for an audience.",
  },
  {
    n: "03",
    title: "Speed advantage",
    body: "Skip months of blank-page development and move straight into premium AI animation.",
  },
];

const KIT_STRIP = ["AI Tools", "Content Hub", "Community", "Analytics", "Crypto Rewards"];

export function PlatformPage() {
  return (
    <main className={styles.main} id="top">
      {/* 1. HERO */}
      <PageHero
        eyebrow="Create · Publish · Grow · Earn"
        title={
          <>
            One platform.
            <br />
            Infinite IP possibilities.
          </>
        }
        blurb="Everything you need to build AI-native IP — then publish it, grow it, and earn from it — in one place."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/pillars", label: "See the Four Experiences" }}
        media={{
          slot: "hero-video-platform",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />

      {/* 2. DEFINITION */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="01 — What is CultK"
            title={
              <>
                AI-native IP creation
                <br />
                and monetization.
              </>
            }
            lede="CultK is the all-in-one platform for AI-native IP. Create characters, stories, and worlds. Publish as comic animation, star series, shorts, or drama. Grow an audience. Engage a community. Monetize — and earn."
          />
        </div>
      </section>

      {/* 3. PRODUCT UI VISION */}
      <section className={styles.uiBand} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="02 — The experience"
            title="A home for every format."
            lede="Continue watching. Trending now. Star IP. AI Shorts. AI Drama. IP Token. The CultK surface feels like a premium entertainment hub — because legends need a stage, not a spreadsheet."
          />
          <div className={styles.uiMock} data-reveal>
            <MediaFrame
              slot="platform-ui-mock"
              label="STREAMING HUB MOCK"
              spec="Deck p3 style · rebuilt original · 2160×960 PNG/WebP"
              ratio="21/9"
            />
          </div>
          <ul className={styles.chipRow} data-stagger>
            {CHIPS.map((c) => (
              <li key={c} className={styles.chip}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. FIVE-STEP JOURNEY — M09 scrollytelling set piece */}
      <section className={styles.journeyBand} data-theme-section="dark" data-journey>
        <div className={styles.journeyDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="03 — The loop"
            title="Create. Publish. Grow. Earn."
            lede="Five beats. One continuous path from blank page to income."
          />
          <div className={styles.journeyGrid}>
            <div className={styles.journeyStageWrap} aria-hidden>
              <div className={styles.journeyStage}>
                {JOURNEY.map((s) => (
                  <div key={s.n} className={styles.journeyFrame} data-journey-frame>
                    <MediaFrame
                      slot={`journey-step-${s.n}`}
                      label={`JOURNEY VISUAL ${s.n}`}
                      spec="Product/UI still · 1200×900 PNG/WebP"
                      fill
                    />
                  </div>
                ))}
              </div>
            </div>
            <ol className={styles.journeySteps}>
              {JOURNEY.map((s) => (
                <li key={s.n} className={styles.journeyStep} data-journey-step>
                  <span className={styles.journeyNum}>{s.n}</span>
                  <h3 className={styles.journeyTitle}>{s.title}</h3>
                  <p className={styles.journeyBody}>{s.body}</p>
                  <div className={styles.stepFrame}>
                    <MediaFrame
                      slot={`journey-step-${s.n}`}
                      label={`JOURNEY VISUAL ${s.n}`}
                      spec="Product/UI still · 1200×900 PNG/WebP"
                      ratio="4/3"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.journeyClosing} data-reveal>
            One platform. Endless possibilities. CultK empowers creators to
            build iconic IPs, connect with fans, and earn real income.
          </p>
          <ul className={styles.kitStrip} data-stagger>
            {KIT_STRIP.map((k) => (
              <li key={k} className={styles.kitStripItem}>
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. WHY WEBTOON */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="04 — The foundation"
            title="Why webtoon is the perfect start."
            lede="A finished webtoon already has a complete character, a written story, and finished art. That means we can skip months of blank-page development and move straight into premium AI animation — better, faster, and at scale."
          />
          <div className={styles.webtoonGrid}>
            <div className={styles.webtoonMedia} data-reveal>
              <MediaFrame
                slot="webtoon-before"
                label="WEBTOON PANEL"
                spec="Source art · 900×1200 PNG/WebP"
                ratio="4/5"
              />
              <MediaFrame
                slot="webtoon-after"
                label="ANIMATION STILL"
                spec="Output frame · 900×1200 PNG/WebP"
                ratio="4/5"
              />
            </div>
            <ul className={styles.webtoonPoints} data-stagger>
              {WEBTOON_POINTS.map((p) => (
                <li key={p.n}>
                  <span className={kit.cardNum}>{p.n}</span>
                  <h3 className={styles.webtoonPointTitle}>{p.title}</h3>
                  <p className={kit.body}>{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.softLine} data-reveal>
            Korea leads global webtoon culture — a ready-made engine of
            stories the world already loves.
          </p>
          <p className={styles.pipelineMicro} data-reveal>
            Finished webtoon → Specialist + AI production → High quality,
            fraction of traditional cost.
          </p>
        </div>
      </section>

      {/* 6. PIPELINE CONTRAST */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="05 — The leap"
            title={
              <>
                Same ambition.
                <br />A smarter path.
              </>
            }
            lede="Korea already proved the webtoon → global hit pipeline. Our mission is to run that path with AI — less time, lower cost, same cinematic ambition."
          />
          <div className={styles.compareGrid} data-stagger>
            <div className={styles.compareCol}>
              <p className={styles.compareTag}>Old way</p>
              <p className={styles.compareLead}>Slower. Expensive. Outdated.</p>
              <ol className={styles.compareSteps}>
                <li>Webtoon</li>
                <li>Physical drama</li>
                <li>Traditional platforms</li>
                <li>Global hit</li>
              </ol>
              <p className={styles.compareMeta}>Years · Millions in cost</p>
            </div>
            <div className={`${styles.compareCol} ${styles.compareColHot}`}>
              <p className={styles.compareTag}>CultK way</p>
              <p className={styles.compareLead}>Faster. Smarter. Game changer.</p>
              <ol className={styles.compareSteps}>
                <li>Webtoon</li>
                <li>AI drama</li>
                <li>CultK</li>
                <li>Viral global reach</li>
              </ol>
              <p className={styles.compareMeta}>
                Weeks-scale ambition · Fraction of traditional cost
              </p>
            </div>
          </div>
          <p className={styles.missionBar} data-reveal>
            Our mission is to create a K-digital culture entertainment empire —
            globally.
          </p>
        </div>
      </section>

      {/* 7. CAPABILITY KIT */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="06 — Inside the platform"
            title="Tools for legends."
            lede="AI tools to create. A content hub to publish. Community to engage. Analytics to grow. Crypto rewards to earn. Not five separate apps — one CultK surface."
          />
        </div>
      </section>

      {/* 8. CTA */}
      <CtaBand
        title="Ready to build your IP?"
        body="Join the waitlist for creator access and early universe updates."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "How Creators Earn" }}
      />

      {/* 9. FOOTER */}
      <SiteFooter />
    </main>
  );
}
