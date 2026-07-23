"use client";

import { useState } from "react";
import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { MonetizeAnimations } from "./MonetizeAnimations";
import styles from "./MonetizePage.module.css";

/**
 * CultX /monetize — Ground-Up Redesigned Monetize Subpage.
 *
 * Distinct scroll narrative focused on revenue, creator economics, and value flow.
 * Signature Action Green (#a6ff0d) palette accents over pitch-black cinema canvas.
 * Interactive value stream matrix, IP token growth flywheel, live trading terminal,
 * and 3D physical asset vault.
 *
 * Copy & disclaimers verbatim from cult/content-strategy/06-monetize.md.
 */

const PATHS = [
  {
    n: "01",
    label: "Sell content",
    title: "Direct sales",
    body: "Publish content like characters, comics, and stories. Fans pay to unlock and access. You earn from every sale.",
    closer: "Earn from every sale.",
    slot: "earn-path-sales",
    frameLabel: "SALES SCENE",
    frameSpec: "Premium episode unlock · 1200×800",
    simType: "sales",
    simTag: "DIRECT UNLOCK",
    simTitle: "Episode 12: Cyber Awakening",
    simMetric: "$2.99 USD",
    simAction: "UNLOCKED",
  },
  {
    n: "02",
    label: "Community ownership",
    title: "Launch an IP token",
    body: "Launch a token for your character. Fans support, trade, and grow the IP together. You earn as your community grows.",
    closer: "Earn as your community grows.",
    slot: "earn-path-token",
    frameLabel: "TOKEN SCENE",
    frameSpec: "Character token ring · 1200×800",
    simType: "token",
    simTag: "IP TOKEN VELOCITY",
    simTitle: "$PUCCA Community Pool",
    simMetric: "+148% VOL",
    simAction: "STAKED",
  },
  {
    n: "03",
    label: "Ad revenue",
    title: "Earn from attention",
    body: "Users watch your content. They can earn by watching ads. You earn from every view.",
    closer: "Earn from every view.",
    slot: "earn-path-ads",
    frameLabel: "AD SCENE",
    frameSpec: "Player with ad marker · 1200×800",
    simType: "ads",
    simTag: "ATTENTION ENGINE",
    simTitle: "Global Viewer Stream",
    simMetric: "1.4M VIEWS",
    simAction: "PAYOUT ACTIVE",
  },
];

const LOOP_STEPS = [
  { n: "01", title: "Create IP", body: "Launch your unique character and story." },
  { n: "02", title: "Build audience", body: "Content gains fans across formats." },
  { n: "03", title: "More popular", body: "Higher demand for your IP token." },
  { n: "04", title: "Buy & sell", body: "Trading increases on CultX exchange." },
  { n: "05", title: "Token value up", body: "Price rises as demand and volume grow." },
  { n: "06", title: "Creator earns", body: "You earn from trade activity and growth." },
];

const EARN_VECTORS = [
  { n: "01", title: "Trading fees", body: "Earn a share from buy & sell activity." },
  { n: "02", title: "Token value", body: "As demand rises, so can your economic upside." },
  { n: "03", title: "Rewards", body: "Unlock platform rewards, drops, and perks." },
  { n: "04", title: "Monetization", body: "Profit from content, collabs, and licensing." },
];

const TICKERS = [
  { symbol: "$MOCHI", change: "+24.6%", vol: "$1.8M", chartPeak: "82%" },
  { symbol: "$PUCCA", change: "+18.2%", vol: "$1.2M", chartPeak: "74%" },
  { symbol: "$B.DUCK", change: "+12.4%", vol: "$850K", chartPeak: "66%" },
  { symbol: "$PONKE", change: "+9.8%", vol: "$620K", chartPeak: "58%" },
];

const TERMINAL_FEATURES = [
  {
    n: "01",
    title: "Real-time trading",
    body: "Trade IP tokens with real-time charts and deep liquidity vision.",
  },
  {
    n: "02",
    title: "Built for IP growth",
    body: "Every trade is meant to fuel visibility, community, and IP expansion.",
  },
  {
    n: "03",
    title: "Transparent & secure",
    body: "On-chain, auditable, community-powered fairness as product principles.",
  },
];

const PRODUCTS = [
  {
    title: "USDT Cards",
    tag: "Collect, spend & trade",
    body: "Favorite IP designs on USDT cards — global usability, secure design language, exclusive drops.",
    slot: "product-cards",
    spec: "Global Crypto Card · Metal Finish",
  },
  {
    title: "IP Robots",
    tag: "Smart collectibles",
    body: "Bring characters into physical space with limited, interactive robots.",
    slot: "product-robots",
    spec: "AI Companion · Animatronic Hardware",
  },
  {
    title: "Merchandise",
    tag: "Wear the legend",
    body: "Hoodies, tees, bags, mugs — premium drops fans can hold.",
    slot: "product-merch",
    spec: "Limited Edition Apparel · NFC Authenticated",
  },
];

export function MonetizePage() {
  const [activeTicker, setActiveTicker] = useState(0);

  return (
    <main className={styles.main} id="top">
      <MonetizeAnimations />

      {/* ============ 1. HERO — TITLE CARD ============ */}
      <section data-monetize-hero>
        <CinemaHero
          eyebrow="CultX Platform"
          title={"Turn AI creations\ninto income."}
          blurb="An AI-native IP platform built for crypto-era ownership. Creators monetize characters, stories, and content in three simple ways."
          primary={{ href: "#waitlist", label: "Join the Waitlist" }}
          secondary={{ href: "/platform", label: "See the platform" }}
          meta="Earn from sales. Community. Attention."
          media={{
            slot: "hero-video-monetize",
            label: "REVENUE FLOW ATMOSPHERE",
            spec: "Clean Layout Frame · Ambient Motion Space",
          }}
        />
      </section>

      {/* ============ 2. CULTX FRAMING — VALUE STREAM MATRIX ============ */}
      <section className={styles.section} data-theme-section="dark" data-value-matrix>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="01 — How you earn"
            accent="green"
            title="CultX turns creations into income."
            lede="Value moves on CultX in three clear ways. Publish premium episodes. Launch a community token around a character. Earn when attention shows up. One ecosystem — not a maze of side hustles."
          />

          {/* Symmetrical Centerpiece Callout Banner */}
          <div className={styles.centerpieceBanner} data-reveal>
            <span className={styles.dashedSeparator} aria-hidden />
            <p className={styles.centerpieceText}>
              The first AI-native IP platform in crypto.
            </p>
            <span className={styles.dashedSeparator} aria-hidden />
          </div>

          {/* Interactive Value Stream Matrix Nodes */}
          <div className={styles.matrixContainer}>
            <svg className={styles.matrixSvg} viewBox="0 0 900 120" preserveAspectRatio="none" aria-hidden>
              <path
                data-matrix-line
                d="M 150,60 L 450,60 L 750,60"
                fill="none"
                stroke="var(--ck-action)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
            <div className={styles.matrixGrid}>
              <div className={styles.matrixNode} data-matrix-node>
                <div className={styles.nodeIcon}>✦</div>
                <span className={styles.nodeTag}>STREAM 01</span>
                <h4 className={styles.nodeTitle}>Direct Sales</h4>
                <p className={styles.nodeDesc}>Unlockable Episodes & Comics</p>
              </div>
              <div className={styles.matrixNode} data-matrix-node>
                <div className={styles.nodeIcon}>⚡</div>
                <span className={styles.nodeTag}>STREAM 02</span>
                <h4 className={styles.nodeTitle}>IP Token Pool</h4>
                <p className={styles.nodeDesc}>Community Ownership & Trading</p>
              </div>
              <div className={styles.matrixNode} data-matrix-node>
                <div className={styles.nodeIcon}>◈</div>
                <span className={styles.nodeTag}>STREAM 03</span>
                <h4 className={styles.nodeTitle}>Ad Attention</h4>
                <p className={styles.nodeDesc}>Viewer Engagement Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. THREE REVENUE STAGES — INTERACTIVE CARDS ============ */}
      <section className={styles.pathsBand} data-theme-section="dark">
        <div className={styles.pathsDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — Three ways"
            accent="green"
            title="Simple paths. Real revenue."
          />

          <div className={styles.pathStageGrid} data-stagger>
            {PATHS.map((p) => (
              <article key={p.n} className={styles.pathCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>{p.n}</span>
                  <span className={styles.cardLabel}>{p.label}</span>
                </div>
                
                {/* Media frame with live UI micro-simulator */}
                <div className={styles.mediaWrap}>
                  <MediaFrame
                    slot={p.slot}
                    label={p.frameLabel}
                    spec={p.frameSpec}
                    ratio="16/9"
                  />
                  <div className={styles.microSim}>
                    <div className={styles.simBadge}>{p.simTag}</div>
                    <div className={styles.simTitle}>{p.simTitle}</div>
                    <div className={styles.simFooter}>
                      <span className={styles.simMetric}>{p.simMetric}</span>
                      <span className={styles.simAction}>{p.simAction}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.pathTitle}>{p.title}</h3>
                  <p className={styles.pathBody}>{p.body}</p>
                  <div className={styles.closerBadge}>{p.closer}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. TOKEN GROWTH LOOP — SCROLLYTELLING FLYWHEEL ============ */}
      <section className={styles.section} data-theme-section="dark" data-flywheel-scope>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — Your IP, your token"
            accent="green"
            title={
              <>
                Your IP. Your token.
                <br />
                Your success.
              </>
            }
            lede="Every IP on CultX can have its own token. More popularity. More trading. More value for creators who build real audiences."
          />

          <div className={styles.flywheelLayout}>
            {/* Sticky Orbital Token Engine (Left Column) */}
            <div className={styles.flywheelVisualContainer}>
              <div className={styles.orbitalEngine}>
                <svg className={styles.orbitalSvg} viewBox="0 0 320 320" aria-hidden>
                  <circle cx="160" cy="160" r="140" fill="none" stroke="var(--ck-white-10)" strokeWidth="1.5" />
                  <circle
                    data-flywheel-ring
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke="var(--ck-action)"
                    strokeWidth="3"
                    strokeDasharray="40 20 80 20"
                  />
                </svg>
                <div className={styles.engineCore}>
                  <span className={styles.coreTag}>STEP ENGINE</span>
                  <span className={styles.coreNum} data-flywheel-active-num>01</span>
                  <span className={styles.coreStatus}>ACTIVE LOOP</span>
                </div>
              </div>
            </div>

            {/* Growth Steps & Earn Vectors (Right Column) */}
            <div className={styles.flywheelContentContainer}>
              <h3 className={styles.columnSubhead}>6-Step Token Velocity Loop</h3>
              <ol className={styles.flywheelStepList}>
                {LOOP_STEPS.map((s) => (
                  <li key={s.n} className={styles.flywheelStepItem} data-flywheel-step>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepDot} aria-hidden />
                      <span className={styles.stepNum}>{s.n}</span>
                      <h4 className={styles.stepTitle}>{s.title}</h4>
                    </div>
                    <p className={styles.stepBody}>{s.body}</p>
                  </li>
                ))}
              </ol>

              <h3 className={styles.columnSubhead} style={{ marginTop: "48px" }}>
                How Creators Earn
              </h3>
              <div className={styles.vectorGrid}>
                {EARN_VECTORS.map((v) => (
                  <div key={v.n} className={styles.vectorCard} data-flywheel-vector>
                    <div className={styles.vectorNum}>{v.n}</div>
                    <h4 className={styles.vectorTitle}>{v.title}</h4>
                    <p className={styles.vectorBody}>{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Symmetrical Centerpiece Mantra */}
          <div className={styles.mantraContainer} data-reveal>
            <p className={styles.loopLine}>
              More fans → more engagement → more demand → higher price pressure → creator earns more.
            </p>
            <div className={styles.mantraBanner}>
              <span className={styles.dashedSeparator} aria-hidden />
              <p className={styles.mantraText}>
                Your story. Your fans. Your token. Your wealth. Create. Grow. Earn.
              </p>
              <span className={styles.dashedSeparator} aria-hidden />
            </div>
          </div>

          <p className={styles.disclaimerText}>
            IP tokens involve risk. Nothing on this site is financial advice. Illustrative charts and prices are marketing mocks, not live markets or guarantees of returns.
          </p>
        </div>
      </section>

      {/* ============ 5. TRADING TERMINAL — INTERACTIVE DARK CONSOLE ============ */}
      <section className={styles.section} data-theme-section="dark" data-terminal-scope>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="04 — IP trading terminal"
            accent="green"
            title="Trade. Grow. Own your IP."
            lede="The all-in-one IP trading terminal vision on CultX — charts, top gainers, and community-driven markets around characters."
          />

          <div className={styles.terminalConsole} data-reveal>
            {/* Console Header Bar */}
            <div className={styles.terminalHeader}>
              <div className={styles.terminalBrand}>
                <span className={styles.greenPulseDot} aria-hidden />
                <span className={styles.terminalTitle}>CULTX IP TERMINAL</span>
              </div>
              <span className={styles.terminalMockBadge}>MARKETING MOCKUP</span>
            </div>

            {/* Main Console Body */}
            <div className={styles.terminalGrid}>
              {/* Chart & Metrics Left Pane */}
              <div className={styles.chartPane}>
                {/* Ticker Selector Tabs */}
                <div className={styles.tickerTabs}>
                  {TICKERS.map((t, idx) => (
                    <button
                      key={t.symbol}
                      type="button"
                      className={`${styles.tickerTab} ${activeTicker === idx ? styles.activeTab : ""}`}
                      onClick={() => setActiveTicker(idx)}
                    >
                      <span className={styles.tabSymbol}>{t.symbol}</span>
                      <span className={styles.tabChange}>{t.change}</span>
                    </button>
                  ))}
                </div>

                {/* SVG Chart Display */}
                <div className={styles.chartContainer}>
                  <svg viewBox="0 0 600 220" preserveAspectRatio="none" className={styles.chartSvg}>
                    <defs>
                      <linearGradient id="monetizeChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--ck-action)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--ck-action)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[44, 88, 132, 176].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} className={styles.chartGrid} />
                    ))}
                    <path
                      data-chart-fill
                      d="M0,180 L60,165 L120,172 L180,140 L240,152 L300,110 L360,122 L420,80 L480,95 L540,50 L600,60 L600,220 L0,220 Z"
                      fill="url(#monetizeChartGrad)"
                    />
                    <path
                      data-chart-path
                      d="M0,180 L60,165 L120,172 L180,140 L240,152 L300,110 L360,122 L420,80 L480,95 L540,50 L600,60"
                      fill="none"
                      stroke="var(--ck-action)"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                {/* Live Counter Metrics Strip */}
                <div className={styles.statsStrip}>
                  <div className={styles.statCell}>
                    <span className={styles.statLabel}>24H CHANGE</span>
                    <strong className={styles.statGreen}>{TICKERS[activeTicker].change}</strong>
                  </div>
                  <div className={styles.statCell}>
                    <span className={styles.statLabel}>24H VOLUME</span>
                    <strong className={styles.statValue} data-count-target="4.2" data-count-prefix="$" data-count-suffix="M" data-count-decimals="1">$4.2M</strong>
                  </div>
                  <div className={styles.statCell}>
                    <span className={styles.statLabel}>POOL LIQUIDITY</span>
                    <strong className={styles.statValue} data-count-target="18.7" data-count-prefix="$" data-count-suffix="M" data-count-decimals="1">$18.7M</strong>
                  </div>
                  <div className={styles.statCell}>
                    <span className={styles.statLabel}>TOTAL HOLDERS</span>
                    <strong className={styles.statValue} data-count-target="12408" data-count-prefix="" data-count-suffix="" data-count-decimals="0">12,408</strong>
                  </div>
                </div>
              </div>

              {/* Terminal Features Right Pane */}
              <div className={styles.featurePane}>
                <h4 className={styles.paneTitle}>TERMINAL ARCHITECTURE</h4>
                <div className={styles.featureList}>
                  {TERMINAL_FEATURES.map((f) => (
                    <div key={f.n} className={styles.featureItem}>
                      <span className={styles.featureNum}>{f.n}</span>
                      <div className={styles.featureBody}>
                        <h5 className={styles.featureTitle}>{f.title}</h5>
                        <p className={styles.featureDesc}>{f.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className={styles.disclaimerText}>
            Marketing mockup. Not a live trading product. Token names and figures are illustrative. Cryptocurrency and IP tokens can lose value.
          </p>
        </div>
      </section>

      {/* ============ 6. REAL-WORLD ASSET VAULT — 3D DEPTH STACK ============ */}
      <section className={styles.section} data-theme-section="dark" data-vault-scope>
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="05 — Beyond the screen"
            accent="green"
            title="Digital IP. Real-world value."
            lede="Own it. Use it. Collect it. Live it. The CultX ecosystem extends into cards, robots, and merch."
          />

          <div className={styles.vaultGrid} data-stagger>
            {PRODUCTS.map((prod) => (
              <article key={prod.title} className={styles.vaultCard} data-vault-card>
                <div className={styles.vaultMediaWrap}>
                  <MediaFrame
                    slot={prod.slot}
                    label={prod.title.toUpperCase()}
                    spec={prod.spec}
                    ratio="4/3"
                  />
                  <span className={styles.vaultCornerPin} aria-hidden />
                </div>
                <div className={styles.vaultContent}>
                  <span className={styles.vaultTag}>{prod.tag}</span>
                  <h3 className={styles.vaultTitle}>{prod.title}</h3>
                  <p className={styles.vaultBody}>{prod.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. SUMMARY STRIP ============ */}
      <section className={styles.summarySection} data-theme-section="dark">
        <div className={styles.layout}>
          <div className={styles.summaryContainer} data-reveal>
            <span className={styles.dashedSeparator} aria-hidden />
            <h2 className={styles.summaryTitle}>From creation to compensation</h2>
            <p className={styles.summaryBody}>
              Content sales. Community tokens. Ad attention. Physical drops. Crypto rewards. One platform designed so legends can pay their creators.
            </p>
            <span className={styles.dashedSeparator} aria-hidden />
          </div>
        </div>
      </section>

      {/* ============ 8. CTA BAND ============ */}
      <CtaBand
        title="Build the IP. Earn the upside."
        body="Waitlist for creators who want the full loop — not just another upload button."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/stars", label: "Meet star IPs" }}
      />

      {/* ============ 9. SITE FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
