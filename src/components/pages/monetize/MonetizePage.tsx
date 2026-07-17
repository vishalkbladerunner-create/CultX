import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { SceneRow } from "@/components/cinema/SceneRow";
import styles from "./MonetizePage.module.css";

/**
 * CultX /monetize — "The Payoff" (K-Cinema language).
 *
 * The revenue reel: title card → framing → three revenue screens → the
 * token growth loop as a scrub-drawn chain (data-chain) → the trading
 * terminal scene → real-world shelf → summary → credits. Entertainment
 * first, crypto second; both mandatory disclaimers ship verbatim.
 * Copy verbatim from cult/content-strategy/06-monetize.md.
 */

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
  { title: "Create IP", body: "Launch your unique character and story." },
  { title: "Build audience", body: "Content gains fans across formats." },
  { title: "More popular", body: "Higher demand for your IP token." },
  { title: "Buy & sell", body: "Trading increases on CultX exchange." },
  { title: "Token value up", body: "Price rises as demand and volume grow." },
  { title: "Creator earns", body: "You earn from trade activity and growth." },
];

const EARN_VECTORS = [
  {
    n: "01",
    title: "Trading fees",
    body: "Earn a share from buy & sell activity.",
  },
  {
    n: "02",
    title: "Token value",
    body: "As demand rises, so can your economic upside.",
  },
  {
    n: "03",
    title: "Rewards",
    body: "Unlock platform rewards, drops, and perks.",
  },
  {
    n: "04",
    title: "Monetization",
    body: "Profit from content, collabs, and licensing.",
  },
];

const TERMINAL_FEATURES = [
  {
    title: "Real-time trading",
    body: "Trade IP tokens with real-time charts and deep liquidity vision.",
  },
  {
    title: "Built for IP growth",
    body: "Every trade is meant to fuel visibility, community, and IP expansion.",
  },
  {
    title: "Transparent & secure",
    body: "On-chain, auditable, community-powered fairness as product principles.",
  },
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
      {/* ============ 1. HERO — title card ============ */}
      <CinemaHero
        eyebrow="CultX"
        title={"Turn AI creations\ninto income."}
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

      {/* ============ 2. CULTX FRAMING ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="01 — How you earn"
            accent="gold"
            title="CultX turns creations into income."
            lede="Value moves on CultX in three clear ways. Publish premium episodes. Launch a community token around a character. Earn when attention shows up. One ecosystem — not a maze of side hustles."
          />
        </div>
      </section>

      {/* ============ 3. THREE REVENUE SCREENS ============ */}
      <section className={styles.pathsBand} data-theme-section="dark">
        {/* Top dome bleeds 20% past the band, mask-faded edges */}
        <div className={styles.pathsDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — Three ways"
            accent="gold"
            title="Simple paths. Real revenue."
          />
          <div className={styles.screenRow} data-stagger>
            {PATHS.map((p) => (
              <article key={p.n} className={styles.screen}>
                <span className={styles.goldRule} aria-hidden />
                <MediaFrame
                  slot={p.slot}
                  label={p.frameLabel}
                  spec={p.frameSpec}
                  ratio="4/3"
                />
                <p className={styles.screenLabel}>{p.label}</p>
                <h3 className={styles.screenTitle}>{p.title}</h3>
                <p className={styles.screenBody}>{p.body}</p>
                <p className={styles.screenCloser}>{p.closer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. TOKEN GROWTH LOOP — scrub-drawn chain ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — Your IP, your token"
            accent="gold"
            title={
              <>
                Your IP. Your token.
                <br />
                Your success.
              </>
            }
            lede="Every IP on CultX can have its own token. More popularity. More trading. More value for creators who build real audiences."
          />
          <div className={styles.chain} data-chain>
            <span className={styles.chainTrack} aria-hidden>
              <span className={styles.chainLine} data-chain-line />
            </span>
            <ol className={styles.chainSteps}>
              {LOOP_STEPS.map((s, i) => (
                <li key={s.title} className={styles.chainStep} data-chain-step>
                  <span className={styles.chainDot} aria-hidden />
                  <span className={styles.chainNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.chainTitle}>{s.title}</h3>
                  <p className={styles.chainBody}>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.loopLine} data-reveal>
            More fans → more engagement → more demand → higher price pressure
            → creator earns more.
          </p>
          <ol className={styles.sceneRows} data-stagger>
            {EARN_VECTORS.map((v) => (
              <SceneRow
                key={v.n}
                n={v.n}
                title={v.title}
                body={v.body}
                accent="gold"
              />
            ))}
          </ol>
          <p className={styles.mantra} data-reveal>
            Your story. Your fans. Your token. Your wealth. Create. Grow.
            Earn.
          </p>
          <p className={styles.disclaimer}>
            IP tokens involve risk. Nothing on this site is financial advice.
            Illustrative charts and prices are marketing mocks, not live
            markets or guarantees of returns.
          </p>
        </div>
      </section>

      {/* ============ 5. TRADING TERMINAL — the scene ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="04 — IP trading terminal"
            accent="gold"
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
                      <stop offset="0%" stopColor="#4ddb00" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#4ddb00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[48, 96, 144, 192].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="600"
                      y2={y}
                      className={styles.chartGridLine}
                    />
                  ))}
                  <path
                    d="M0,190 L60,172 L120,178 L180,150 L240,158 L300,120 L360,128 L420,92 L480,100 L540,64 L600,72 L600,240 L0,240 Z"
                    fill="url(#ckChartFill)"
                  />
                  <path
                    d="M0,190 L60,172 L120,178 L180,150 L240,158 L300,120 L360,128 L420,92 L480,100 L540,64 L600,72"
                    fill="none"
                    stroke="#8be30b"
                    strokeWidth="2"
                  />
                </svg>
                <div className={styles.terminalStats}>
                  <div>
                    <span>24H CHANGE</span>
                    <strong className={styles.statUp}>+16.4%</strong>
                  </div>
                  <div>
                    <span>VOLUME</span>
                    <strong>$4.2M</strong>
                  </div>
                  <div>
                    <span>LIQUIDITY</span>
                    <strong>$18.7M</strong>
                  </div>
                  <div>
                    <span>HOLDERS</span>
                    <strong>12,408</strong>
                  </div>
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
          <ol className={styles.sceneRows} data-stagger>
            {TERMINAL_FEATURES.map((f, i) => (
              <SceneRow
                key={f.title}
                n={String(i + 1).padStart(2, "0")}
                title={f.title}
                body={f.body}
                accent="gold"
              />
            ))}
          </ol>
          <p className={styles.disclaimer}>
            Marketing mockup. Not a live trading product. Token names and
            figures are illustrative. Cryptocurrency and IP tokens can lose
            value.
          </p>
        </div>
      </section>

      {/* ============ 6. REAL-WORLD SHELF ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="05 — Beyond the screen"
            accent="gold"
            title="Digital IP. Real-world value."
            lede="Own it. Use it. Collect it. Live it. The CultX ecosystem extends into cards, robots, and merch."
          />
          <div className={styles.screenRow} data-stagger>
            {PRODUCTS.map((p) => (
              <article key={p.title} className={styles.screen}>
                <span className={styles.goldRule} aria-hidden />
                <MediaFrame
                  slot={p.slot}
                  label={p.title.toUpperCase()}
                  spec="Product render · 1200×900 PNG/WebP"
                  ratio="4/3"
                />
                <p className={styles.screenLabel}>{p.tag}</p>
                <h3 className={styles.screenTitle}>{p.title}</h3>
                <p className={styles.screenBody}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. SUMMARY STRIP ============ */}
      <section className={styles.summary} data-theme-section="dark">
        <div className={styles.layout}>
          <h2 className={styles.summaryTitle} data-reveal>
            From creation to compensation
          </h2>
          <p className={styles.summaryBody} data-reveal>
            Content sales. Community tokens. Ad attention. Physical drops.
            Crypto rewards. One platform designed so legends can pay their
            creators.
          </p>
        </div>
      </section>

      {/* ============ 8. CTA ============ */}
      <CtaBand
        title="Build the IP. Earn the upside."
        body="Waitlist for creators who want the full loop — not just another upload button."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/stars", label: "Meet star IPs" }}
      />

      {/* ============ 9. FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
