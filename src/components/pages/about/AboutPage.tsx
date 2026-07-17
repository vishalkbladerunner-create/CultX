import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { CtaBand } from "@/components/kit/CtaBand";
import { Card } from "@/components/kit/Card";
import { MediaFrame } from "@/components/kit/MediaFrame";
import kit from "@/components/kit/kit.module.css";
import styles from "./AboutPage.module.css";

/* Verbatim copy — cult/content-strategy/08-about-ai-center.md */

const HUB_STATS = [
  { k: "Gangnam, Seoul", v: "The place to create the future" },
  { k: "~300", v: "Elite specialists" },
  { k: "World-class", v: "AI production environment" },
  { k: "Infinite", v: "Possibilities for IP" },
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
    body: "We're building the next chapter together.",
  },
  {
    n: "04",
    title: "Bigger impact",
    body: "Stronger together — iconic IPs for the world.",
  },
];

const KOREA_CARDS = [
  {
    title: "Webtoon → animation",
    body: "Global hits have already moved from webtoon pages to animated screens.",
  },
  {
    title: "Webtoon-rooted concepts → worldwide series",
    body: "Korean storytelling repeatedly wins global attention.",
  },
  {
    title: "Webtoon → Netflix-era hits",
    body: "Multiple major Korean hits began as webtoons — proof of the foundation.",
  },
];

const KOREA_STRIP = [
  {
    title: "K-drama power",
    body: "Emotion-first long form the world binge-watches.",
  },
  {
    title: "K-pop power",
    body: "The planet's most influential fandom machine.",
  },
  {
    title: "Webtoon leadership",
    body: "Korea's platforms and creators set the global standard.",
  },
];

const ROADMAP = [
  {
    date: "Jun 2026",
    title: "Product build starts",
    body: "Platform development begins. AI Studio + Underdog Zone. Robotics and card infrastructure initiated.",
  },
  {
    date: "Sep 2026",
    title: "Product complete",
    body: "Full platform live. Founding IPs onboarded. Robots, cards & merch stores active.",
  },
  {
    date: "Dec 2026",
    title: "300 verified AI creators",
    body: "Professional verified creators live. Supply side proven. Leaderboard rankings live.",
  },
  {
    date: "Mar 2027",
    title: "300,000 users",
    body: "Registered users target. Robots, cards & merch sales active. First user IPs graduate to Star Market.",
  },
  {
    date: "Oct 2027",
    title: "Listing application",
    body: "Apply to list $CULTK on a major exchange trajectory. Revenue, user & IP data ready. Full IP portfolio for submission.",
  },
];

export function AboutPage() {
  return (
    <main className={styles.main} id="top">
      {/* 1. HERO */}
      <PageHero
        eyebrow="About · CultK AI Center"
        title={
          <>
            Built in Gangnam.
            <br />
            Powered for the world.
          </>
        }
        blurb="A state-of-the-art AI creative hub where specialists live, collaborate, and build the future of entertainment — inspired by Nonce community culture."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
        meta="Gangnam, Seoul · ~300 specialists · Creator-first"
        media={{
          slot: "hero-about-hub",
          label: "AI CENTER EXTERIOR",
          spec: "Night exterior / skyline · client art · 1920×1080",
        }}
      />

      {/* 2. AI CENTER OVERVIEW */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="01 — The hub"
            title="The CultK AI Center."
            lede="Our AI creative hub in Gangnam, Seoul — where roughly 300 elite specialists in AI, animation, storytelling, design, and technology build iconic IPs together."
          />
          <dl className={styles.statGrid} data-stagger>
            {HUB_STATS.map((s) => (
              <div key={s.k} className={styles.stat}>
                <dt className={styles.statKey}>{s.k}</dt>
                <dd className={styles.statValue}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. FOUR HUB PILLARS */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <div className={styles.chipGrid} data-stagger>
            {HUB_PILLARS.map((p) => (
              <Card
                key={p.n}
                n={p.n}
                title={p.title}
                body={p.body}
                accent="purple"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. NONCE CULTURE */}
      <section className={styles.cultureBand} data-theme-section="dark">
        <div className={styles.cultureDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="02 — Culture"
            title={
              <>
                Built on community.
                <br />
                Powered by experience.
              </>
            }
            lede="Nonce was created to empower blockchain and Web3 builders. Today, the same spirit — creator-first, community over competition — shapes how CultK builds. Same culture. Bigger mission."
          />
          <div className={styles.chipGrid} data-stagger>
            {VALUES.map((v) => (
              <Card key={v.title} title={v.title} body={v.body} />
            ))}
          </div>
          <p className={styles.softTrack} data-reveal>
            A proven community track record in Korea&apos;s builder culture —
            events, startups, and shared roofs — now aimed at AI entertainment.
          </p>
          <div className={styles.cultureMedia} data-reveal>
            <MediaFrame
              slot="about-community"
              label="COMMUNITY PHOTOS"
              spec="Rights-cleared photography · 2160×960"
              ratio="21/9"
            />
          </div>
        </div>
      </section>

      {/* 5. WHY THE MODEL WORKS */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="03 — The model"
            title="Why this model works."
            lede="CultK is built on the power of community and the spirit that made Nonce a leading builder community in Korea."
          />
          <div className={styles.chipGrid} data-stagger>
            {MODEL_STEPS.map((s) => (
              <Card key={s.n} n={s.n} title={s.title} body={s.body} />
            ))}
          </div>
          <p className={styles.valuesStrip} data-reveal>
            Nonce inspired · Community driven · Same team spirit · Bigger
            vision · Limitless impact (Korea → world)
          </p>
          <p className={styles.continuity} data-reveal>
            Built with the community DNA and veterans who helped make Nonce a
            leader — now focused on making CultK the best AI creative platform
            it can be.
          </p>
        </div>
      </section>

      {/* 6. KOREA PIPELINE PROOF */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="04 — Why Korea"
            title="Korea already proved the pipeline."
            lede="Webtoon stories became global entertainment hits. We're building the AI-native version of that path — at scale, from Seoul to the world."
          />
          <div className={styles.chipGrid3} data-stagger>
            {KOREA_CARDS.map((c) => (
              <Card key={c.title} title={c.title} body={c.body} />
            ))}
          </div>
          <p className={kit.disclaimer}>
            These titles illustrate Korea&apos;s export power. They are not
            CultK products or partners.
          </p>
          <div className={styles.chipGrid3} data-stagger>
            {KOREA_STRIP.map((c) => (
              <Card
                key={c.title}
                title={c.title}
                body={c.body}
                accent="purple"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. MISSION */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="05 — Mission"
            title="A K-digital entertainment empire — globally."
            lede="Same goal the industry always had: stories the world can't ignore. Smarter way: AI drama and multi-format IP. Less time. Lower cost. Ambition that stays cinematic."
          />
          <div className={styles.missionCompare} data-stagger>
            <div className={styles.missionCol}>
              <p className={styles.missionTag}>Old way</p>
              <p className={styles.missionText}>
                Years. High cost. Physical production bottlenecks.
              </p>
            </div>
            <div className={`${styles.missionCol} ${styles.missionColHot}`}>
              <p className={styles.missionTag}>CultK way</p>
              <p className={styles.missionText}>
                Weeks-scale ambition. Fraction of traditional cost. AI
                production + CultK distribution.
              </p>
            </div>
          </div>
          <p className={styles.missionBar} data-reveal>
            Build a K-digital culture entertainment empire for the world.
          </p>
        </div>
      </section>

      {/* 8. ROADMAP */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="06 — Roadmap"
            title="Build. Launch. List."
            lede="Five milestones. One destination. Timeline from the deck — subject to change."
          />
          <ol className={styles.timeline} data-stagger>
            {ROADMAP.map((m) => (
              <li key={m.date} className={styles.timelineItem}>
                <span className={styles.timelineDot} aria-hidden />
                <p className={styles.timelineDate}>{m.date}</p>
                <h3 className={styles.timelineTitle}>{m.title}</h3>
                <p className={kit.body}>{m.body}</p>
              </li>
            ))}
          </ol>
          <p className={kit.disclaimer}>
            Dates and targets are forward-looking from the product deck. They
            are plans, not guarantees. Exchange listing is an application trajectory, not a confirmed listing.
          </p>
        </div>
      </section>

      {/* 9. CTA */}
      <CtaBand
        title="Come build with us."
        body="Creators, specialists, partners, and fans — the hub is rising in Gangnam. The stories will travel everywhere."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/stars", label: "Meet the Star IPs" }}
      />

      {/* 10. FOOTER */}
      <SiteFooter />
    </main>
  );
}
