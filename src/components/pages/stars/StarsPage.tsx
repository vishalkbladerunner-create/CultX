import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { CtaBand } from "@/components/kit/CtaBand";
import { Card } from "@/components/kit/Card";
import { MediaFrame } from "@/components/kit/MediaFrame";
import kit from "@/components/kit/kit.module.css";
import styles from "./StarsPage.module.css";

/* Verbatim copy — cult/content-strategy/07-stars.md */

const STARS = [
  {
    name: "Pucca",
    badge: "25 years",
    body: "A 25-year iconic brand from Korea — beloved worldwide for charming characters and timeless stories.",
    role: "Flagship Korean character energy for the Star IP Universe.",
  },
  {
    name: "B.Duck",
    badge: "20 years",
    body: "A 20-year global lifestyle brand with massive merchandise, licensing, and media presence.",
    role: "Lifestyle IP with broad global recognition.",
  },
  {
    name: "Ponke",
    badge: "Web3-native",
    body: "A popular Web3-native IP with a strong community and cultural influence across digital worlds.",
    role: "Bridge between crypto-native fandom and entertainment formats.",
  },
  {
    name: "Mew",
    badge: "Rising",
    body: "An adorable cat IP with a rapidly growing global fanbase and huge digital engagement.",
    role: "Fast-growth character energy for shorts, merch, and community.",
  },
];

const QUALITY_CHIPS = [
  {
    n: "01",
    title: "Studio-level quality",
    body: "High-quality AI content aimed at the standard of top animation studios.",
  },
  {
    n: "02",
    title: "Fraction of traditional cost",
    body: "Dramatically lower production cost without abandoning excellence.",
  },
  {
    n: "03",
    title: "Faster production",
    body: "From months toward days — without celebrating corners cut.",
  },
  {
    n: "04",
    title: "World-class IP power",
    body: "Built on globally loved IPs with massive fanbases.",
  },
];

const PRODUCTS = [
  {
    title: "USDT Cards",
    body: "Collect, spend, and trade with your favorite IP USDT cards — exclusive designs for Pucca, B.Duck, Ponke, Mew, and more.",
    traits: ["Global usability", "Secure & trusted", "Exclusive designs"],
    slot: "stars-product-cards",
  },
  {
    title: "IP Robots",
    body: "Bring your favorite IP to life with smart collectible robots — interactive, limited, and always evolving.",
    traits: ["Smart & interactive", "Limited edition", "Always evolving"],
    slot: "stars-product-robots",
  },
  {
    title: "Merchandise",
    body: "Wear, display, and share the love with exclusive IP merch — premium quality, exclusive drops, unique collectibles.",
    traits: ["Premium quality", "Exclusive drops", "Unique & collectible"],
    slot: "stars-product-merch",
  },
];

export function StarsPage() {
  return (
    <main className={styles.main} id="top">
      {/* 1. HERO */}
      <PageHero
        eyebrow="Star IPs"
        title={
          <>
            Iconic characters.
            <br />
            Global fans.
          </>
        }
        blurb="We partner with iconic brands to create AI-native content at studio-grade quality — with a full fan economy attached."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "How Creators Earn" }}
        meta="Confirmed star IPs from the deck — more to come."
        media={{
          slot: "hero-video-stars",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />
      <p className={`${kit.disclaimer} ${styles.heroDisclaimer}`}>
        Character marks and partnerships are subject to licensing and brand approval. Presentation follows CultX deck language.
      </p>

      {/* 2. CONFIRMED STARS GRID */}
      <section className={styles.starsBand} data-theme-section="dark">
        <div className={styles.starsDomeHost} aria-hidden>
          <GradientDome position="bottom" />
        </div>
        <div className={kit.layout}>
          <SectionHeading eyebrow="01 — Confirmed" title="Meet the legends." />
          <div className={styles.starGrid} data-stagger>
            {STARS.map((s) => (
              <article
                key={s.name}
                className={`${styles.starCard} ${kit.hasPinTopLeft}`}
              >
                <MediaFrame
                  slot={`star-${s.name.toLowerCase().replace(/\./g, "")}`}
                  label={`${s.name.toUpperCase()} PORTRAIT`}
                  spec="Licensed character art · 900×1200 PNG/WebP"
                  ratio="4/5"
                />
                <div className={styles.starInfo}>
                  <span className={styles.starBadge}>{s.badge}</span>
                  <h3 className={styles.starName}>{s.name}</h3>
                  <p className={kit.cardBody}>{s.body}</p>
                  <p className={styles.starRole}>{s.role}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.closingLine} data-reveal>
            Four starting stars. A universe designed for more.
          </p>
        </div>
      </section>

      {/* 3. PRODUCTION QUALITY */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="02 — How we produce"
            title={
              <>
                Studio ambition.
                <br />
                AI speed.
              </>
            }
            lede="Star IP content is framed for cinematic quality — produced with specialist teams and AI systems built for speed and cost advantage."
          />
          <div className={styles.chipGrid} data-stagger>
            {QUALITY_CHIPS.map((c) => (
              <Card
                key={c.n}
                n={c.n}
                title={c.title}
                body={c.body}
                accent="magenta"
              />
            ))}
          </div>
          <p className={kit.disclaimer}>
            Quality, cost, and speed comparisons express product vision from
            our deck, not third-party audited benchmarks.
          </p>
        </div>
      </section>

      {/* 4. REAL-WORLD PRODUCTS */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="03 — In your world"
            title="From digital IP to real-world products."
            lede="Own it. Use it. Collect it. Live it."
          />
          <div className={styles.productGrid} data-stagger>
            {PRODUCTS.map((p) => (
              <article
                key={p.title}
                className={`${styles.productCard} ${kit.hasPinTopLeft}`}
              >
                <MediaFrame
                  slot={p.slot}
                  label={p.title.toUpperCase()}
                  spec="Product packshot · 1200×900 PNG/WebP"
                  ratio="4/3"
                />
                <h3 className={kit.cardTitle}>{p.title}</h3>
                <p className={kit.cardBody}>{p.body}</p>
                <ul className={styles.traitList}>
                  {p.traits.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.closingLine} data-reveal>
            Your favorite IPs, now in your world. The CultX ecosystem turns IP
            into something you can hold.
          </p>
        </div>
      </section>

      {/* 5. PARTNER CTA */}
      <CtaBand
        title="Have an IP that deserves a legend?"
        body="We're building a universe of characters with global fans. If you hold iconic IP — or you're building the next one — talk to us."
        primary={{ href: "#waitlist", label: "Partner With Us" }}
        secondary={{ href: "#waitlist", label: "Join the Waitlist" }}
      />

      {/* 6. FOOTER */}
      <SiteFooter />
    </main>
  );
}
