import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { CinemaPanel } from "@/components/cinema/CinemaPanel";
import { SceneRow } from "@/components/cinema/SceneRow";
import styles from "./AboutPage.module.css";

/**
 * CultX /about — "The Studio" (K-Cinema language).
 *
 * A dark editorial origin story: title card → the hub in numbers →
 * four pillars → the culture cinema band → why the model works →
 * Korea pipeline proof (inspiration, not affiliation) → mission →
 * the roadmap as a scrub-drawn timeline (data-timeline) → credits.
 * Copy verbatim from cult/content-strategy/08-about-ai-center.md.
 */

/* Verbatim copy — cult/content-strategy/08-about-ai-center.md */

const HUB_STATS = [
  { value: "Gangnam, Seoul", label: "The place to create the future" },
  { value: "~300", label: "Elite specialists" },
  { value: "World-class", label: "AI production environment" },
  { value: "Infinite", label: "Possibilities for IP" },
];

const HUB_PILLARS = [
  {
    n: "01",
    title: "AI Production Hub",
    body: "World-class studios and cutting-edge tools for AI-powered content creation.",
  },
  {
    n: "02",
    title: "300 Elite Specialists",
    body: "Top talent in AI, animation, storytelling, design, and technology.",
  },
  {
    n: "03",
    title: "Live. Build. Collaborate.",
    body: "A co-living, co-working environment that fuels creativity and teamwork.",
  },
  {
    n: "04",
    title: "One Shared Mission",
    body: "Create iconic IPs that entertain billions and shape culture.",
  },
];

const VALUES = [
  {
    title: "Creator first",
    body: "A community built for builders, by builders.",
  },
  {
    title: "Co-living & co-working",
    body: "Live and work together under one roof.",
  },
  {
    title: "Community over competition",
    body: "Share, support, and grow together every day.",
  },
  {
    title: "Launch together",
    body: "Ideas become startups, projects, and movements.",
  },
];

const MODEL_STEPS = [
  {
    n: "01",
    title: "Proven formula",
    body: "Built on the power of community that Nonce made real.",
  },
  {
    n: "02",
    title: "Same spirit",
    body: "Inspired by Nonce community culture.",
  },
  {
    n: "03",
    title: "Next chapter",
    body: "We’re building the next chapter together.",
  },
  {
    n: "04",
    title: "Bigger impact",
    body: "Stronger together — iconic IPs for the world.",
  },
];

const KOREA_CARDS = [
  {
    n: "01",
    title: "Webtoon → animation",
    body: "Global hits have already moved from webtoon pages to animated screens.",
  },
  {
    n: "02",
    title: "Webtoon-rooted concepts → worldwide series",
    body: "Korean storytelling repeatedly wins global attention.",
  },
  {
    n: "03",
    title: "Webtoon → Netflix-era hits",
    body: "Multiple major Korean hits began as webtoons — proof of the foundation.",
  },
];

const KOREA_STRIP = [
  {
    n: "01",
    title: "K-drama power",
    body: "Emotion-first long form the world binge-watches.",
  },
  {
    n: "02",
    title: "K-pop power",
    body: "The planet’s most influential fandom machine.",
  },
  {
    n: "03",
    title: "Webtoon leadership",
    body: "Korea’s platforms and creators set the global standard.",
  },
];

const ROADMAP = [
  {
    date: "Jun 2026",
    title: "Product build starts",
    body: "Platform development begins · AI Studio + Underdog Zone · Robotics + card infrastructure initiated",
  },
  {
    date: "Sep 2026",
    title: "Product complete",
    body: "Full platform live · Founding IPs onboarded · Robots, cards & merch stores active",
  },
  {
    date: "Dec 2026",
    title: "300 verified AI creators",
    body: "Professional verified creators live · Supply side proven · Leaderboard rankings live",
  },
  {
    date: "Mar 2027",
    title: "300,000 users",
    body: "Registered users target · Robots/cards/merch sales active · First user IPs graduate to Star Market",
  },
  {
    date: "Oct 2027",
    title: "Listing application",
    body: "Apply to list $CULTX on major exchange trajectory · Revenue, user & IP data ready · Full IP portfolio for submission",
  },
];

export function AboutPage() {
  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO — title card ============ */}
      <CinemaHero
        eyebrow="About · CultX AI Center"
        title={"Built in Gangnam.\nPowered for the world."}
        blurb="A state-of-the-art AI creative hub where specialists live, collaborate, and build the future of entertainment — inspired by Nonce community culture."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
        meta="Gangnam, Seoul · ~300 specialists · Creator-first"
        media={{
          slot: "hero-about-hub",
          label: "HUB EXTERIOR",
          spec: "Night exterior / skyline · 1920×1080 PNG/WebP",
        }}
      />

      {/* ============ 2. THE HUB — stat pull + pillars ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="01 — The hub"
            title="The CultX AI Center."
            lede="Our AI creative hub in Gangnam, Seoul — where roughly 300 elite specialists in AI, animation, storytelling, design, and technology build iconic IPs together."
          />
          <dl className={styles.statGrid} data-stagger>
            {HUB_STATS.map((s) => (
              <div key={s.value} className={styles.stat}>
                <dt className={styles.statValue}>{s.value}</dt>
                <dd className={styles.statLabel}>{s.label}</dd>
              </div>
            ))}
          </dl>
          <ol className={styles.sceneRows} data-stagger>
            {HUB_PILLARS.map((p) => (
              <SceneRow key={p.n} n={p.n} title={p.title} body={p.body} />
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 3. CULTURE — cinema band + values ============ */}
      <section className={styles.cultureBand} data-theme-section="dark">
        {/* Bottom dome bleeds past the band, mask-faded edges */}
        <div className={styles.cultureDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — Culture"
            title={
              <>
                Built on community.
                <br />
                Powered by experience.
              </>
            }
            lede="Nonce was created to empower blockchain and Web3 builders. Today, the same spirit — creator-first, community over competition — shapes how CultX builds. Same culture. Bigger mission."
          />
          <div className={styles.cultureMedia} data-reveal>
            <MediaFrame
              slot="about-community"
              label="COMMUNITY PHOTOGRAPHY"
              spec="Rights-cleared photography · 2160×960 PNG/WebP"
              ratio="21/9"
            />
          </div>
          <ol className={styles.sceneRows} data-stagger>
            {VALUES.map((v, i) => (
              <SceneRow
                key={v.title}
                n={String(i + 1).padStart(2, "0")}
                title={v.title}
                body={v.body}
              />
            ))}
          </ol>
          <p className={styles.softLine} data-reveal>
            A proven community track record in Korea’s builder culture —
            events, startups, and shared roofs — now aimed at AI
            entertainment.
          </p>
          <p className={styles.closingLine} data-reveal>
            CultX adopts Nonce community culture to build a powerful AI
            creative community.
          </p>
        </div>
      </section>

      {/* ============ 4. WHY THE MODEL WORKS ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — The model"
            title="Why this model works."
            lede="CultX is built on the power of community and the spirit that made Nonce a leading builder community in Korea."
          />
          <ol className={styles.sceneRows} data-stagger>
            {MODEL_STEPS.map((s) => (
              <SceneRow key={s.n} n={s.n} title={s.title} body={s.body} />
            ))}
          </ol>
          <p className={styles.valuesStrip} data-reveal>
            Nonce inspired · Community driven · Same team spirit · Bigger
            vision · Limitless impact (Korea → world)
          </p>
          <p className={styles.continuity} data-reveal>
            Built with the community DNA and veterans who helped make Nonce
            a leader — now focused on making CultX the best AI creative
            platform it can be.
          </p>
        </div>
      </section>

      {/* ============ 5. KOREA PIPELINE PROOF ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="04 — Why Korea"
            title="Korea already proved the pipeline."
            lede="Webtoon stories became global entertainment hits. We’re building the AI-native version of that path — at scale, from Seoul to the world."
          />
          <ol className={styles.sceneRows} data-stagger>
            {KOREA_CARDS.map((c) => (
              <SceneRow key={c.n} n={c.n} title={c.title} body={c.body} />
            ))}
          </ol>
          <p className={styles.disclaimer}>
            These titles illustrate Korea’s export power. They are not CultX
            products or partners.
          </p>
          <ol className={styles.sceneRows} data-stagger>
            {KOREA_STRIP.map((c) => (
              <SceneRow key={c.n} n={c.n} title={c.title} body={c.body} />
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 6. MISSION ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="05 — Mission"
            title="A K-digital entertainment empire — globally."
            lede="Same goal the industry always had: stories the world can’t ignore. Smarter way: AI drama and multi-format IP. Less time. Lower cost. Ambition that stays cinematic."
          />
          <div className={styles.missionCompare} data-stagger>
            <p className={styles.compareRow}>
              <span className={styles.compareTag}>Old way</span>
              <span className={styles.compareText}>
                Years. High cost. Physical production bottlenecks.
              </span>
            </p>
            <p className={`${styles.compareRow} ${styles.compareRowHot}`}>
              <span className={styles.compareTag}>CultX way</span>
              <span className={styles.compareText}>
                Weeks-scale ambition. Fraction of traditional cost. AI
                production + CultX distribution.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Mission bar as the page's intertitle (M07) — the emotional peak
          gets its own full-viewport beat before the roadmap set piece. */}
      <CinemaPanel
        words={[
          "Build",
          "a",
          "K-digital",
          "culture",
          "entertainment",
          "empire",
          "for",
          "the",
          "world.",
        ]}
      />

      {/* ============ 7. ROADMAP — scrub-drawn timeline ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="06 — Roadmap"
            title="Build. Launch. List."
            lede="Five milestones. One destination. Timeline from the deck — subject to change."
          />
          <div className={styles.timeline} data-timeline>
            <span className={styles.timelineTrack} aria-hidden>
              <span className={styles.timelineLine} data-timeline-line />
            </span>
            <ol className={styles.timelineSteps}>
              {ROADMAP.map((m) => (
                <li
                  key={m.date}
                  className={styles.timelineStep}
                  data-timeline-step
                >
                  <span className={styles.timelineDot} aria-hidden />
                  <p className={styles.timelineDate}>{m.date}</p>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineBody}>{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
          {/* Gated phrases stay on one source line (test reads source). */}
          <p className={styles.disclaimer}>
            {"Dates and targets are forward-looking from the product deck. They are plans, not guarantees. Exchange listing is an application trajectory, not a confirmed listing."}
          </p>
        </div>
      </section>

      {/* ============ 8. CTA ============ */}
      <CtaBand
        title="Come build with us."
        body="Creators, specialists, partners, and fans — the hub is rising in Gangnam. The stories will travel everywhere."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "#waitlist", label: "Partner With Us" }}
      />

      {/* ============ 9. FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
