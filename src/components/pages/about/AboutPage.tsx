"use client";

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
 * CultX /about — AI Center Subpage.
 *
 * SharpLink Editorial Craft: Pitch Black Canvas (#000), Signature Action Green (#a6ff0d) Accents,
 * Custom Vector SVG Icons (zero emojis), Glassmorphism, and Vertical Timeline Scrub.
 *
 * Copy & disclaimers verbatim from cult/content-strategy/08-about-ai-center.md.
 */

const HUB_STATS = [
  {
    value: "Gangnam, Seoul",
    label: "Global K-Culture Epicenter",
    iconPath: <path d="M10 17.5s5-5.5 5-9a5 5 0 10-10 0c0 3.5 5 9 5 9z" />,
    iconSub: <circle cx="10" cy="8.5" r="2" />,
  },
  {
    value: "~300",
    label: "Elite Specialists Pod",
    iconPath: <path d="M11 2L3.5 11h6L8.5 18L16.5 9h-6L11 2z" />,
  },
  {
    value: "World-Class",
    label: "AI Production Environment",
    iconPath: <rect x="3" y="3" width="14" height="14" rx="2" />,
    iconSub: <path d="M7 7h6v6H7z" />,
  },
  {
    value: "Infinite",
    label: "Possibilities for IP",
    iconPath: <path d="M7 10c-2.5 0-4.5 1.5-4.5 3.5S4.5 17 7 17s4.5-1.5 5.5-3.5c1 2 3 3.5 5.5 3.5s4.5-1.5 4.5-3.5-2-3.5-4.5-3.5-4.5 1.5-5.5 3.5C11.5 11.5 9.5 10 7 10z" />,
  },
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
    title: "Creator First",
    body: "A community built for builders, by builders.",
    iconPath: <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />,
  },
  {
    title: "Co-Living & Co-Working",
    body: "Live and work together under one roof in Gangnam.",
    iconPath: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />,
  },
  {
    title: "Community Over Competition",
    body: "Share, support, and grow together every single day.",
    iconPath: (
      <>
        <circle cx="6" cy="14" r="3" />
        <circle cx="14" cy="14" r="3" />
        <circle cx="10" cy="6" r="3" />
      </>
    ),
  },
  {
    title: "Launch Together",
    body: "Ideas become startups, projects, and global movements.",
    iconPath: <path d="M4.5 16.5L12 3l7.5 13.5H4.5z" />,
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
    title: "Webtoon → Animation",
    body: "Global hits have already moved from webtoon pages to animated screens.",
  },
  {
    n: "02",
    title: "Webtoon Concepts → Worldwide Series",
    body: "Korean storytelling repeatedly wins global attention.",
  },
  {
    n: "03",
    title: "Webtoon → Netflix-Era Hits",
    body: "Multiple major Korean hits began as webtoons — proof of the foundation.",
  },
];

const KOREA_STRIP = [
  {
    n: "01",
    title: "K-Drama Power",
    body: "Emotion-first long form the world binge-watches.",
  },
  {
    n: "02",
    title: "K-Pop Power",
    body: "The planet’s most influential fandom machine.",
  },
  {
    n: "03",
    title: "Webtoon Leadership",
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
      {/* ============ 1. HERO — TITLE CARD ============ */}
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

      {/* ============ 2. THE HUB — EDITORIAL STAT PULLS & PILLARS ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="01 — The hub"
            accent="green"
            title="The CultX AI Center."
            lede="Our AI creative hub in Gangnam, Seoul — where roughly 300 elite specialists in AI, animation, storytelling, design, and technology build iconic IPs together."
          />

          {/* Editorial Stat Cards with Custom Vector SVGs */}
          <div className={styles.statGrid} data-stagger>
            {HUB_STATS.map((s) => (
              <div key={s.value} className={styles.statCard}>
                <span className={styles.statIconWrap} aria-hidden>
                  <svg className={styles.statSvg} viewBox="0 0 20 20" fill="none" stroke="var(--ck-action)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {s.iconPath}
                    {s.iconSub}
                  </svg>
                </span>
                <dt className={styles.statValue}>{s.value}</dt>
                <dd className={styles.statLabel}>{s.label}</dd>
              </div>
            ))}
          </div>

          <ol className={styles.sceneRows} data-stagger>
            {HUB_PILLARS.map((p) => (
              <SceneRow key={p.n} n={p.n} title={p.title} body={p.body} accent="green" />
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 3. CULTURE — CINEMA BAND & VALUES ============ */}
      <section className={styles.cultureBand} data-theme-section="dark">
        <div className={styles.cultureDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — Culture"
            accent="green"
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

          {/* Custom SVG Value Cards */}
          <div className={styles.valuesGrid} data-stagger>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIconWrap} aria-hidden>
                  <svg className={styles.valueSvg} viewBox="0 0 24 24" fill="none" stroke="var(--ck-action)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {v.iconPath}
                  </svg>
                </span>
                <h4 className={styles.valueTitle}>{v.title}</h4>
                <p className={styles.valueBody}>{v.body}</p>
              </div>
            ))}
          </div>

          <p className={styles.softLine} data-reveal>
            A proven community track record in Korea’s builder culture — events, startups, and shared roofs — now aimed at AI entertainment.
          </p>
          <p className={styles.closingLine} data-reveal>
            CultX adopts Nonce community culture to build a powerful AI creative community.
          </p>
        </div>
      </section>

      {/* ============ 4. WHY THE MODEL WORKS ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — The model"
            accent="green"
            title="Why this model works."
            lede="CultX is built on the power of community and the spirit that made Nonce a leading builder community in Korea."
          />
          <ol className={styles.sceneRows} data-stagger>
            {MODEL_STEPS.map((s) => (
              <SceneRow key={s.n} n={s.n} title={s.title} body={s.body} accent="green" />
            ))}
          </ol>

          <div className={styles.valuesBanner} data-reveal>
            <span className={styles.dashedSeparator} aria-hidden />
            <p className={styles.valuesText}>
              Nonce Inspired · Community Driven · Same Team Spirit · Bigger Vision · Limitless Impact
            </p>
            <span className={styles.dashedSeparator} aria-hidden />
          </div>

          <p className={styles.continuity} data-reveal>
            Built with the community DNA and veterans who helped make Nonce a leader — now focused on making CultX the best AI creative platform it can be.
          </p>
        </div>
      </section>

      {/* ============ 5. KOREA PIPELINE PROOF ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="04 — Why Korea"
            accent="green"
            title="Korea already proved the pipeline."
            lede="Webtoon stories became global entertainment hits. We’re building the AI-native version of that path — at scale, from Seoul to the world."
          />

          <div className={styles.proofGrid} data-stagger>
            {KOREA_CARDS.map((c) => (
              <div key={c.n} className={styles.proofCard}>
                <span className={styles.proofNum}>{c.n}</span>
                <h4 className={styles.proofTitle}>{c.title}</h4>
                <p className={styles.proofBody}>{c.body}</p>
              </div>
            ))}
          </div>

          <p className={styles.disclaimer}>
            These titles illustrate Korea’s export power. They are not CultX products or partners.
          </p>

          <ol className={styles.sceneRows} data-stagger>
            {KOREA_STRIP.map((c) => (
              <SceneRow key={c.n} n={c.n} title={c.title} body={c.body} accent="green" />
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 6. MISSION ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="05 — Mission"
            accent="green"
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
                Weeks-scale ambition. Fraction of traditional cost. AI production + CultX distribution.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Full-Viewport Cinema Panel Intertitle */}
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

      {/* ============ 7. ROADMAP — SCRUB-DRAWN TIMELINE ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="06 — Roadmap"
            accent="green"
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
                  <span className={styles.timelineBadge}>{m.date}</span>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineBody}>{m.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className={styles.disclaimer}>
            Dates and targets are forward-looking from the product deck. They are plans, not guarantees. Exchange listing is an application trajectory, not a confirmed listing.
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

      {/* ============ 9. SITE FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
