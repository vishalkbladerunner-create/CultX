import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { SceneRow } from "@/components/cinema/SceneRow";
import styles from "./PlatformPage.module.css";

/**
 * CultX /platform — "The Loop" (K-Cinema language).
 *
 * The five-step creator journey is the spine: title card → definition →
 * the screen (UI vision) → THE JOURNEY centerpiece (M09 sticky stage,
 * same generalized binding as home FormatStage) → the foundation
 * (webtoon before/after + scene rows) → the versus intertitle →
 * capability kit → credits. Copy verbatim from
 * cult/content-strategy/04-platform.md.
 */

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
    body: "Story, characters, world, and art — a finished foundation.",
  },
  {
    n: "02",
    title: "Untapped libraries",
    body: "Out of tens of thousands of webtoons ever created, only a small fraction break through. Complete work is waiting for an audience.",
  },
  {
    n: "03",
    title: "Speed advantage",
    body: "Skip months of original character and story development that a greenfield IP requires.",
  },
];

const KIT_STRIP = [
  "AI Tools",
  "Content Hub",
  "Community",
  "Analytics",
  "Crypto Rewards",
];

export function PlatformPage() {
  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO — title card (M06 cascade) ============ */}
      <CinemaHero
        eyebrow="Create · Publish · Grow · Earn"
        title={"One platform.\nInfinite IP possibilities."}
        blurb="Everything you need to build AI-native IP — then publish it, grow it, and earn from it — in one place."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/pillars", label: "See the Four Experiences" }}
        meta="Built in Korea — Powered for the World"
        media={{
          slot: "hero-video-platform",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />

      {/* ============ 2. DEFINITION ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="01 — What is CultX"
            title={
              <>
                AI-native IP creation
                <br />
                and monetization.
              </>
            }
            lede="CultX is the all-in-one platform for AI-native IP. Create characters, stories, and worlds. Publish as comic animation, star series, shorts, or drama. Grow an audience. Engage a community. Monetize — and earn."
          />
        </div>
      </section>

      {/* ============ 3. UI VISION — the screen moment ============ */}
      <section className={styles.uiBand} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — The experience"
            title="A home for every format."
            lede="Continue watching. Trending now. Star IP. AI Shorts. AI Drama. IP Token. The CultX surface feels like a premium entertainment hub — because legends need a stage, not a spreadsheet."
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

      {/* ============ 4. JOURNEY — centerpiece stage (M09 + M15) ============ */}
      <section
        className={styles.journeyBand}
        data-theme-section="dark"
        data-stage-scope
      >
        {/* Bottom dome bleeds 20% past the band, mask-faded at both
            edges — one continuous canvas, no seam. */}
        <div className={styles.journeyDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — The loop"
            title="Create. Publish. Grow. Earn."
            lede="Five beats. One continuous path from blank page to income."
          />
          <div className={styles.journeyGrid}>
            {/* Sticky stage — desktop only (aria-hidden decor; steps carry
                the same content for all users). */}
            <div className={styles.stageWrap} aria-hidden>
              <div className={styles.stage}>
                <div className={styles.frameStack}>
                  {JOURNEY.map((s) => (
                    <div
                      key={s.n}
                      className={styles.frame}
                      data-stage-frame
                    >
                      <div className={styles.frameHost}>
                        <MediaFrame
                          slot={`journey-step-${s.n}`}
                          label={`JOURNEY VISUAL ${s.n}`}
                          spec="Product/UI still · 1200×900 PNG/WebP"
                          fill
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Caption under the stage — swaps with scroll, never
                    painted on the art */}
                <div className={styles.stageCaption} aria-hidden>
                  {JOURNEY.map((s, i) => (
                    <p
                      key={s.n}
                      className={styles.stageCaptionItem}
                      data-stage-caption
                      {...(i === 0 ? { "data-active": "" } : {})}
                    >
                      <span className={styles.stageCaptionNum}>{s.n}</span>
                      <span className={styles.stageCaptionTitle}>
                        {s.title}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <ol className={styles.steps}>
              {JOURNEY.map((s) => (
                <li key={s.n} className={styles.step} data-stage-step>
                  <div className={styles.stepFrameHost}>
                    <MediaFrame
                      slot={`journey-step-${s.n}`}
                      label={`JOURNEY VISUAL ${s.n}`}
                      spec="Product/UI still · 1200×900 PNG/WebP"
                      fill
                    />
                  </div>
                  <span className={styles.stepNum}>{s.n}</span>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.journeyClosing} data-reveal>
            One platform. Endless possibilities. CultX empowers creators to
            build iconic IPs, connect with fans, and earn real income.
          </p>
        </div>
      </section>

      {/* ============ 5. WEBTOON — before/after scene + scene rows ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
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
            <ol className={styles.sceneRows} data-stagger>
              {WEBTOON_POINTS.map((p) => (
                <SceneRow key={p.n} n={p.n} title={p.title} body={p.body} />
              ))}
            </ol>
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

      {/* ============ 6. VERSUS — cinema moment (no cards) ============ */}
      <section className={styles.versusBand} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="05 — The leap"
            title={
              <>
                Same ambition.
                <br />A smarter path.
              </>
            }
            lede="Korea already proved the webtoon → global hit pipeline. Our mission is to run that path with AI — less time, lower cost, same cinematic ambition."
          />
          <div className={styles.versus} data-stagger>
            <div className={styles.versusCol}>
              <p className={styles.versusTag}>Old way</p>
              <p className={styles.versusLead}>Slower. Expensive. Outdated.</p>
              <ol className={styles.versusSteps}>
                <li>Webtoon</li>
                <li>Physical drama</li>
                <li>Traditional platforms</li>
                <li>Global hit</li>
              </ol>
              <p className={styles.versusMeta}>Years · Millions in cost</p>
            </div>
            <span className={styles.versusDivider} aria-hidden />
            <div className={`${styles.versusCol} ${styles.versusColHot}`}>
              <p className={styles.versusTag}>CultX way</p>
              <p className={styles.versusLead}>
                Faster. Smarter. Game changer.
              </p>
              <ol className={styles.versusSteps}>
                <li>Webtoon</li>
                <li>AI drama</li>
                <li>CultX</li>
                <li>Viral global reach</li>
              </ol>
              <p className={styles.versusMeta}>
                Weeks-scale ambition · Fraction of traditional cost
              </p>
            </div>
          </div>
          <p className={styles.missionBar} data-reveal>
            Our mission is to create a K-digital culture entertainment empire
            — globally.
          </p>
        </div>
      </section>

      {/* ============ 7. CAPABILITY KIT ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="06 — Inside the platform"
            title="Tools for legends."
            lede="AI tools to create. A content hub to publish. Community to engage. Analytics to grow. Crypto rewards to earn. Not five separate apps — one CultX surface."
          />
          <ul className={styles.chipRow} data-stagger>
            {KIT_STRIP.map((k) => (
              <li key={k} className={styles.chip}>
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 8. CTA ============ */}
      <CtaBand
        title="Ready to build your IP?"
        body="Join the waitlist for creator access and early universe updates."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "How Creators Earn" }}
      />

      {/* ============ 9. FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
