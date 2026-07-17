import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { CtaBand } from "@/components/kit/CtaBand";
import { Card } from "@/components/kit/Card";
import { MediaFrame } from "@/components/kit/MediaFrame";
import kit from "@/components/kit/kit.module.css";
import styles from "./MonetizePage.module.css";

/* Verbatim copy — cult/content-strategy/06-monetize.md */

const PATHS = [
  {
    n: "01",
    label: "Sell content",
    title: "Direct sales",
    body: "Publish content like characters, comics, and stories. Fans pay to unlock and access. You earn from every sale.",
    closer: "Earn from every sale.",
    slot: "earn-path-sales",
    frameLabel: "SALES SCENE",
    frameSpec: "Premium episode unlock · illustrative UI · 1200×800",
  },
  {
    n: "02",
    label: "Community ownership",
    title: "Launch an IP token",
    body: "Launch a token for your character. Fans support, trade, and grow the IP together. You earn as your community grows.",
    closer: "Earn as your community grows.",
    slot: "earn-path-token",
    frameLabel: "TOKEN SCENE",
    frameSpec: "Character token ring · illustrative UI · 1200×800",
  },
  {
    n: "03",
    label: "Ad revenue",
    title: "Earn from attention",
    body: "Users watch your content. They can earn by watching ads. You earn from every view.",
    closer: "Earn from every view.",
    slot: "earn-path-ads",
    frameLabel: "AD SCENE",
    frameSpec: "Player with ad marker · illustrative UI · 1200×800",
  },
];

const LOOP_STEPS = [
  "Create IP",
  "Build audience",
  "More popular",
  "Buy & sell",
  "Token value up",
  "Creator earns",
];

const EARN_VECTORS = [
  { n: "01", title: "Trading fees", body: "Earn a share from buy & sell activity." },
  { n: "02", title: "Token value", body: "As demand rises, so can your economic upside." },
  { n: "03", title: "Rewards", body: "Unlock platform rewards, drops, and perks." },
  { n: "04", title: "Monetization", body: "Profit from content, collabs, and licensing." },
];

const TERMINAL_FEATURES = [
  { title: "Real-time trading", body: "Trade IP tokens with real-time charts and deep liquidity vision." },
  { title: "Built for IP growth", body: "Every trade is meant to fuel visibility, community, and IP expansion." },
  { title: "Transparent & secure", body: "On-chain, auditable, community-powered fairness as product principles." },
];

const GAINERS = [
  { ticker: "$MOCHI", change: "+24.6%" },
  { ticker: "$PUCCA", change: "+18.2%" },
  { ticker: "$B.DUCK", change: "+12.4%" },
  { ticker: "$PONKE", change: "+9.8%" },
];

const PRODUCTS = [
  {
    title: "USDT Cards",
    tag: "Collect, spend & trade",
    body: "Favorite IP designs on USDT cards — global usability, secure design language, exclusive drops.",
    slot: "product-cards",
  },
  {
    title: "IP Robots",
    tag: "Smart collectibles",
    body: "Bring characters into physical space with limited, interactive robots.",
    slot: "product-robots",
  },
  {
    title: "Merchandise",
    tag: "Wear the legend",
    body: "Hoodies, tees, bags, mugs — premium drops fans can hold.",
    slot: "product-merch",
  },
];

export function MonetizePage() {
  return (
    <main className={styles.main} id="top">
      {/* 1. HERO */}
      <PageHero
        eyebrow="CultX"
        title={
          <>
            Turn AI creations
            <br />
            into income.
          </>
        }
        blurb="An AI-native IP platform built for crypto-era ownership. Creators monetize characters, stories, and content in three simple ways."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/platform", label: "See the platform" }}
        meta="Earn from sales. Community. Attention."
        media={{
          slot: "hero-video-monetize",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />

      {/* 2. CULTX FRAMING */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="01 — How you earn"
            title="CultX turns creations into income."
            lede="Value moves on CultX in three clear ways. Publish premium episodes. Launch a community token around a character. Earn when attention shows up. One ecosystem — not a maze of side hustles."
            accent="gold"
          />
        </div>
      </section>

      {/* 3. THREE EARN PATHS */}
      <section className={styles.pathsBand} data-theme-section="dark">
        <div className={styles.pathsDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="02 — Three ways"
            title="Simple paths. Real revenue."
          />
          <div className={styles.pathsGrid} data-stagger>
            {PATHS.map((p) => (
              <article key={p.n} className={`${styles.pathCard} ${kit.hasPinTopLeft}`}>
                <span className={kit.cardNum}>{p.n}</span>
                <p className={styles.pathLabel}>{p.label}</p>
                <h3 className={kit.cardTitle}>{p.title}</h3>
                <p className={kit.cardBody}>{p.body}</p>
                <div className={styles.pathMedia}>
                  <MediaFrame slot={p.slot} label={p.frameLabel} spec={p.frameSpec} ratio="4/3" />
                </div>
                <p className={styles.pathCloser}>{p.closer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TOKEN GROWTH LOOP */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="03 — Your IP, your token"
            title={
              <>
                Your IP. Your token.
                <br />
                Your success.
              </>
            }
            lede="Every IP on CultX can have its own token. More popularity. More trading. More value for creators who build real audiences."
          />
          <ol className={styles.loopChain} data-stagger>
            {LOOP_STEPS.map((s, i) => (
              <li key={s} className={styles.loopStep}>
                <span className={styles.loopNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.loopLabel}>{s}</span>
              </li>
            ))}
          </ol>
          <div className={styles.vectorGrid} data-stagger>
            {EARN_VECTORS.map((v) => (
              <Card key={v.n} n={v.n} title={v.title} body={v.body} accent="gold" />
            ))}
          </div>
          <p className={styles.loopLine} data-reveal>
            More fans → more engagement → more demand → higher price pressure →
            creator earns more.
          </p>
          <p className={styles.mantra} data-reveal>
            Your story. Your fans. Your token. Your wealth. Create. Grow. Earn.
          </p>
          <p className={kit.disclaimer}>
            IP tokens involve risk. Nothing on this site is financial advice.
            Illustrative charts and prices are marketing mocks, not live markets
            or guarantees of returns.
          </p>
        </div>
      </section>

      {/* 5. TRADING TERMINAL MOCK */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="04 — IP trading terminal"
            title="Trade. Grow. Own your IP."
            lede="The all-in-one IP trading terminal vision on CultX — charts, top gainers, and community-driven markets around characters."
          />
          <div className={styles.terminal} data-reveal>
            <div className={styles.terminalBar}>
              <span className={styles.terminalTitle}>CULTX TERMINAL</span>
              <span className={styles.terminalBadge}>MARKETING MOCK</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalChart}>
                <svg viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <linearGradient id="ckChartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a100e8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#a100e8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[48, 96, 144, 192].map((y) => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} className={styles.chartGridLine} />
                  ))}
                  <path
                    d="M0,190 L60,172 L120,178 L180,150 L240,158 L300,120 L360,128 L420,92 L480,100 L540,64 L600,72 L600,240 L0,240 Z"
                    fill="url(#ckChartFill)"
                  />
                  <path
                    d="M0,190 L60,172 L120,178 L180,150 L240,158 L300,120 L360,128 L420,92 L480,100 L540,64 L600,72"
                    fill="none"
                    stroke="#d800e0"
                    strokeWidth="2"
                  />
                </svg>
                <div className={styles.terminalStats}>
                  <div><span>24H CHANGE</span><strong className={styles.statUp}>+16.4%</strong></div>
                  <div><span>VOLUME</span><strong>$4.2M</strong></div>
                  <div><span>LIQUIDITY</span><strong>$18.7M</strong></div>
                  <div><span>HOLDERS</span><strong>12,408</strong></div>
                </div>
              </div>
              <div className={styles.terminalSide}>
                <p className={styles.sideTitle}>Top gainers</p>
                <ul className={styles.gainerList}>
                  {GAINERS.map((g) => (
                    <li key={g.ticker} className={styles.gainerRow}>
                      <span>{g.ticker}</span>
                      <strong className={styles.statUp}>{g.change}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ul className={styles.terminalFeatures} data-stagger>
            {TERMINAL_FEATURES.map((f) => (
              <li key={f.title} className={styles.terminalFeature}>
                <h3 className={styles.terminalFeatureTitle}>{f.title}</h3>
                <p className={kit.body}>{f.body}</p>
              </li>
            ))}
          </ul>
          <p className={kit.disclaimer}>
            Marketing mockup. Not a live trading product. Token names and
            figures are illustrative. Cryptocurrency and IP tokens can lose
            value.
          </p>
        </div>
      </section>

      {/* 6. REAL-WORLD EARN */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="05 — Beyond the screen"
            title="Digital IP. Real-world value."
            lede="Own it. Use it. Collect it. Live it. The CultX ecosystem extends into cards, robots, and merch."
          />
          <div className={styles.productGrid} data-stagger>
            {PRODUCTS.map((p) => (
              <article key={p.title} className={`${styles.productCard} ${kit.hasPinTopLeft}`}>
                <MediaFrame slot={p.slot} label={p.title.toUpperCase()} spec="Product render · 1200×900 PNG/WebP" ratio="4/3" />
                <h3 className={kit.cardTitle}>{p.title}</h3>
                <p className={styles.productTag}>{p.tag}</p>
                <p className={kit.cardBody}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SUMMARY STRIP */}
      <section className={styles.summary} data-theme-section="dark">
        <div className={kit.layout}>
          <h2 className={kit.h3} data-reveal>From creation to compensation</h2>
          <p className={kit.lede} data-reveal>
            Content sales. Community tokens. Ad attention. Physical drops.
            Crypto rewards. One platform designed so legends can pay their
            creators.
          </p>
        </div>
      </section>

      {/* 8. CTA */}
      <CtaBand
        title="Build the IP. Earn the upside."
        body="Waitlist for creators who want the full loop — not just another upload button."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/stars", label: "Meet star IPs" }}
      />

      {/* 9. FOOTER */}
      <SiteFooter />
    </main>
  );
}
