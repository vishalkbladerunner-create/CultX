import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { UIButton } from "@/components/chrome/UIButton";
import { CtaBand } from "@/components/kit/CtaBand";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { PlatformAnimations } from "./PlatformAnimations";
import styles from "./PlatformPage.module.css";

const MOCK_LABELS = [
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
    slot: "journey-step-01",
    spec: "Product/UI still · 1200×900",
    imageSrc: "/images/platform/journey-01.jpg",
  },
  {
    n: "02",
    title: "Publish Content",
    body: "Turn ideas into animations, webtoons, shorts, or dramas.",
    slot: "journey-step-02",
    spec: "Product/UI still · 1200×900",
    imageSrc: "/images/platform/journey-02.jpg",
  },
  {
    n: "03",
    title: "Grow Audience",
    body: "Fans discover, follow, and support your IP. Top IPs rise together.",
    slot: "journey-step-03",
    spec: "Product/UI still · 1200×900",
    imageSrc: "/images/platform/journey-03.jpg",
  },
  {
    n: "04",
    title: "Engage Community",
    body: "Build a loyal community. Fans interact, support, and help your IP grow.",
    slot: "journey-step-04",
    spec: "Product/UI still · 1200×900",
    imageSrc: "/images/platform/journey-04.jpg",
  },
  {
    n: "05",
    title: "Monetize & Earn",
    body: "Earn through content sales, IP tokens, and ads. Get rewarded in crypto.",
    slot: "journey-step-05",
    spec: "Product/UI still · 1200×900",
    imageSrc: "/images/platform/journey-05.jpg",
  },
];

const WEBTOON_POINTS = [
  {
    n: "01",
    title: "Everything is ready",
    body: "Story, characters, world, and art — a finished foundation.",
    depth: "1"
  },
  {
    n: "02",
    title: "Untapped libraries",
    body: "Out of tens of thousands of webtoons ever created, only a small fraction break through. Complete work is waiting for an audience.",
    depth: "2"
  },
  {
    n: "03",
    title: "Speed advantage",
    body: "Skip months of original character and story development that a greenfield IP requires.",
    depth: "3"
  },
];

const ARSENAL_NODES = [
  { label: "AI Tools" },
  { label: "Content Hub" },
  { label: "Community" },
  { label: "Analytics" },
  { label: "Crypto Rewards" },
];

export function PlatformPage() {
  // Words list helper for scroll-fill manifesto text
  const getManifestoSpans = (text: string) => {
    return text.split(" ").map((word, idx) => (
      <span key={idx} className={styles.coreWord} data-fill-word>
        {word}
      </span>
    ));
  };

  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO — "The Gateway" ============ */}
      <section className={styles.hero} data-platform-hero data-theme-section="dark">
        {/* Top atmospheric dome, mask-faded at both edges (seam-free) */}
        <div className={styles.heroDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>

        {/* Gateway key visual — unique to /platform: the portal into every
            world, no character (home owns the heroine). Bottom mask-fade. */}
        <div className={styles.heroMedia} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/platform/hero-gateway.jpg" alt="" />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow} data-hero-intro>
            The Platform
          </p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine} data-from="left">
              One platform.
            </span>
            <span className={styles.heroLine} data-from="right" style={{ color: "var(--ck-action)" }}>
              Infinite possibilities.
            </span>
          </h1>
          <p className={styles.heroBlurb} data-hero-intro>
            Everything you need to build AI-native IP — then publish it, grow it, and earn from it — in one place.
          </p>
          <div className={styles.heroCtas} data-hero-intro>
            <UIButton href="#waitlist" label="Join the Waitlist" />
            <UIButton href="/pillars" label="Explore Pillars" variant="secondary" withIcon={false} />
          </div>
        </div>
      </section>

      {/* ============ 2. DEFINITION — "The Core" ============ */}
      <section className={styles.coreSection} data-platform-fill data-theme-section="dark">
        <div className={styles.layout}>
          <div className={styles.coreInner}>
            <p className={styles.coreEyebrow}>
              01 — What is CultX
            </p>
            <p className={styles.coreCopy}>
              {getManifestoSpans(
                "CultX is the all-in-one platform for AI-native IP. Create characters, stories, and worlds. Publish as comic animation, star series, shorts, or drama. Grow an audience. Engage a community. Monetize — and earn."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ============ 3. UI VISION — "The Surface" ============ */}
      <section className={styles.surfaceSection} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={styles.surfaceHeader}>
            <p className={styles.surfaceEyebrow}>02 — The experience</p>
            <h2 className={styles.surfaceTitle} data-reveal>A home for every format.</h2>
            <p className={styles.surfaceLede} data-reveal>
              Continue watching. Trending now. Star IP. AI Shorts. AI Drama. IP Token.
              The CultX surface feels like a premium entertainment hub — because legends need a stage, not a spreadsheet.
            </p>
          </div>

          <div className={styles.surfaceMockWrap}>
            <div className={styles.surfaceMockTilt} data-perspective-tilt>
              <MediaFrame
                slot="platform-ui-mock"
                label="Platform UI"
                spec="App surface mock · 2100×900"
                ratio="21/9"
                imageSrc="/images/platform/ui-mock.jpg"
                alt="CultX platform surface — streaming hub with AI Animation, AI Drama, AI Shorts, Star IP Universe and IP Token"
              />
            </div>
          </div>

          {/* Floated capability labels */}
          <ul className={styles.surfaceLabels} data-stagger>
            {MOCK_LABELS.map((label, idx) => (
              <li key={idx} className={styles.surfaceLabel}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 4. JOURNEY — "The Engine" ============ */}
      <section className={styles.engineSection} data-h-timeline data-theme-section="dark">
        <div className={styles.engineSticky}>
          <div className={styles.layout}>
            {/* Engine Header */}
            <div className={styles.engineHeader}>
              <p className={styles.engineEyebrow}>03 — The loop</p>
              <h2 className={styles.engineStepTitle} style={{ margin: 0 }}>The creator journey.</h2>
            </div>

            {/* Background huge step counter */}
            <div className={styles.engineCounter} data-h-timeline-counter>
              01
            </div>

            {/* Horizontal progress bar */}
            <div className={styles.engineProgressWrap}>
              <div className={styles.engineProgressFill} data-h-timeline-progress />
            </div>

            {/* Horizontal timeline track */}
            <div className={styles.engineViewport}>
              <div className={styles.engineTrack} data-h-timeline-track>
                {JOURNEY.map((step, idx) => (
                  <div
                    key={step.n}
                    className={styles.engineStep}
                    data-h-timeline-step
                    {...(idx === 0 ? { "data-active": "true" } : {})}
                  >
                    <div className={styles.engineStepAsset}>
                      <MediaFrame
                        slot={step.slot}
                        label="UI Still"
                        spec={step.spec}
                        ratio="16/9"
                        imageSrc={step.imageSrc}
                      />
                    </div>
                    <span className={styles.engineStepNum}>{step.n}</span>
                    <h3 className={styles.engineStepTitle}>{step.title}</h3>
                    <p className={styles.engineStepBody}>{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative closing line */}
      <div className={styles.layout} style={{ position: "relative" }}>
        <p className={styles.engineClosing} data-reveal>
          One platform. Endless possibilities. CultX empowers creators to build iconic IPs, connect with fans, and earn real income.
        </p>
      </div>

      {/* ============ 5. WEBTOON — "The Fuel" ============ */}
      <section className={styles.fuelSection} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={styles.fuelHeader}>
            <p className={styles.fuelEyebrow}>04 — The foundation</p>
            <h2 className={styles.fuelTitle} data-reveal>Why webtoon is the perfect start.</h2>
            <p className={styles.fuelLede} data-reveal>
              A finished webtoon already has a complete character, a written story, and finished art.
              That means we can skip months of blank-page development and move straight into premium AI animation — better, faster, and at scale.
            </p>
          </div>

          {/* Parallax staircase — opaque noir cards, no text overlap */}
          <div className={styles.fuelStack} data-depth-stack>
            {WEBTOON_POINTS.map((pt) => (
              <div key={pt.n} className={styles.fuelCard} data-depth-card data-depth={pt.depth}>
                <span className={styles.fuelCardNum}>{pt.n}</span>
                <h3 className={styles.fuelCardTitle}>{pt.title}</h3>
                <p className={styles.fuelCardBody}>{pt.body}</p>
              </div>
            ))}
            {/* Star IP cameos — Ponke + Mew enter the staircase bottom-left,
                Pucca + B.Duck arrive top-right (desktop only, decorative;
                appended after the cards so :nth-child staircase is intact) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/platform/fuel-enter.jpg"
              alt=""
              aria-hidden
              className={`${styles.fuelCameo} ${styles.fuelCameoEnter}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/platform/fuel-arrive.jpg"
              alt=""
              aria-hidden
              className={`${styles.fuelCameo} ${styles.fuelCameoArrive}`}
            />
            <span className={styles.fuelGlow} aria-hidden />
          </div>

          <p className={styles.fuelSoftLine} data-reveal>
            Korea leads global webtoon culture — a ready-made engine of stories the world already loves.
          </p>
          <p className={styles.fuelPipeline} data-reveal>
            Finished webtoon → Specialist + AI production → High quality, fraction of traditional cost.
          </p>
        </div>
      </section>

      {/* ============ 6. VERSUS — "The Leap" ============ */}
      <section className={styles.leapSection} data-curtain-wipe data-theme-section="dark">
        <div className={styles.leapSticky}>
          <div className={styles.leapGrid}>
            {/* Static Section Header */}
            <div className={styles.leapHeader}>
              <p className={styles.leapEyebrow}>05 — The leap</p>
              <h2 className={styles.leapTitle}>
                Same Ambition<br />Smarter Path
              </h2>
              <p className={styles.leapLede}>
                Korea already proved the webtoon → global hit pipeline. Our mission is to run that path with AI — less time, lower cost, same cinematic ambition.
              </p>
            </div>

            <div className={styles.leapCanvas}>
              {/* Old Way Panel */}
              <div className={styles.leapOld} data-curtain-old>
                <p className={styles.leapTag}>Old way</p>
                <p className={styles.leapLead}>Slower. Expensive. Outdated.</p>
                <ol className={styles.leapSteps}>
                  <li>Webtoon</li>
                  <li>Physical drama</li>
                  <li>Traditional platforms</li>
                  <li>Global hit</li>
                </ol>
                <p className={styles.leapMeta}>Years · Millions in cost</p>
              </div>

              {/* CultX Way Panel (Swept on top of Old Way — no divider line) */}
              <div className={styles.leapNew} data-curtain-new>
                <div className={styles.leapNewContent}>
                  <p className={`${styles.leapTag} ${styles.leapNewTag}`}>CultX way</p>
                  <p className={styles.leapLead}>Faster. Smarter. Game changer.</p>
                  <ol className={styles.leapSteps}>
                    <li>Webtoon</li>
                    <li>AI drama</li>
                    <li>CultX</li>
                    <li>Viral global reach</li>
                  </ol>
                  <p className={styles.leapMeta}>Weeks-scale ambition · Fraction of traditional cost</p>
                </div>
              </div>

              {/* Glowing curtain line */}
              <div className={styles.leapDivider} data-curtain-divider />
            </div>
          </div>
        </div>
      </section>

      {/* Mission banner */}
      <div className={styles.layout} style={{ position: "relative" }}>
        <p className={styles.leapMission} data-reveal>
          Our mission is to create a K-digital culture entertainment empire — globally.
        </p>
      </div>

      {/* ============ 7. CAPABILITY KIT — "The Arsenal" ============ */}
      <section className={styles.arsenalSection} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={styles.arsenalHeader}>
            <p className={styles.arsenalEyebrow}>06 — Inside the platform</p>
            <h2 className={styles.arsenalTitle} data-reveal>Tools for legends.</h2>
            <p className={styles.arsenalLede} data-reveal>
              AI tools to create. A content hub to publish. Community to engage. Analytics to grow. Crypto rewards to earn. Not five separate apps — one CultX surface.
            </p>
          </div>

          {/* Pentagon Constellation Diagram (Desktop Only)
              Node elements come FIRST so :nth-child positions line up
              with the SVG spoke order (center is stacked above via z). */}
          <div className={styles.arsenalDiagram} data-constellation>
            {/* Node elements */}
            {ARSENAL_NODES.map((node, idx) => (
              <div key={idx} className={styles.arsenalNode} data-constellation-node>
                <div className={styles.arsenalNodeDot} />
                <span className={styles.arsenalNodeLabel}>{node.label}</span>
              </div>
            ))}

            {/* Connecting SVG Lines — exact pentagon spokes, pointing exactly to the centers of the dots */}
            <svg className={styles.arsenalLines} width="100%" height="100%" viewBox="0 0 640 640" aria-hidden>
              <line className={styles.arsenalLine} x1="320" y1="320" x2="320" y2="100" data-constellation-line />
              <line className={styles.arsenalLine} x1="320" y1="320" x2="529.2" y2="252" data-constellation-line />
              <line className={styles.arsenalLine} x1="320" y1="320" x2="449.3" y2="498" data-constellation-line />
              <line className={styles.arsenalLine} x1="320" y1="320" x2="190.7" y2="498" data-constellation-line />
              <line className={styles.arsenalLine} x1="320" y1="320" x2="110.8" y2="252" data-constellation-line />
            </svg>

            <div className={styles.arsenalCenter}>CultX</div>
          </div>

          {/* Simple list fallback (Mobile Only) */}
          <ul className={styles.arsenalList}>
            {ARSENAL_NODES.map((node, idx) => (
              <li key={idx} className={styles.arsenalListItem}>
                <div className={styles.arsenalListItemDot} />
                <span className={styles.arsenalListItemLabel}>{node.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 8. CTA BAND ============ */}
      <CtaBand
        title="Ready to build your IP?"
        body="Join the waitlist for creator access and early universe updates."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "How Creators Earn" }}
      />

      {/* ============ 9. FOOTER ============ */}
      <SiteFooter />

      {/* Client-side animations trigger script */}
      <PlatformAnimations />
    </main>
  );
}
