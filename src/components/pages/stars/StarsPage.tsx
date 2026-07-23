import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { SceneRow } from "@/components/cinema/SceneRow";
import { StarCarousel } from "@/components/cinema/StarCarousel";
import type { StarSlide } from "@/components/cinema/StarCarousel";
import styles from "./StarsPage.module.css";

/**
 * CultX /stars — "The Cast" (K-Cinema language).
 *
 * A film's ensemble roll: title card → licensing line → the full-bleed
 * StarCarousel as the hero-adjacent set piece (star-* licensed slots) →
 * production quality as masked rows → the real-world shelf → partner
 * CTA. Careful partnership language throughout — confirmed deck IPs,
 * subject to licensing. Copy verbatim from cult/content-strategy/07-stars.md.
 */

/* Verbatim copy — cult/content-strategy/07-stars.md */

const STARS: readonly StarSlide[] = [
  {
    id: "pucca",
    name: "Pucca",
    badge: "25 years",
    body: "A 25-year iconic brand from Korea — beloved worldwide for charming characters and timeless stories.",
    role: "Flagship Korean character energy for the Star IP Universe.",
    slot: "star-pucca",
    frameLabel: "PUCCA PORTRAIT",
    imageSrc: "/images/stars/pucca.png",
  },
  {
    id: "bduck",
    name: "B.Duck",
    badge: "20 years",
    body: "A 20-year global lifestyle brand with massive merchandise, licensing, and media presence.",
    role: "Lifestyle IP with broad global recognition.",
    slot: "star-bduck",
    frameLabel: "B.DUCK PORTRAIT",
    imageSrc: "/images/stars/bduck.png",
  },
  {
    id: "ponke",
    name: "Ponke",
    badge: "Web3-native",
    body: "A popular Web3-native IP with a strong community and cultural influence across digital worlds.",
    role: "Bridge between crypto-native fandom and entertainment formats.",
    slot: "star-ponke",
    frameLabel: "PONKE PORTRAIT",
    imageSrc: "/images/stars/ponke.png",
  },
  {
    id: "mew",
    name: "Mew",
    badge: "Rising",
    body: "An adorable cat IP with a rapidly growing global fanbase and huge digital engagement.",
    role: "Fast-growth character energy for shorts, merch, and community.",
    slot: "star-mew",
    frameLabel: "MEW PORTRAIT",
    imageSrc: "/images/stars/mew.png",
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
      {/* ============ 1. HERO — title card ============ */}
      <CinemaHero
        eyebrow="Star IPs"
        title={"Iconic characters.\nGlobal fans."}
        blurb="We partner with iconic brands to create AI-native content at studio-grade quality — with a full fan economy attached."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/monetize", label: "How creators earn" }}
        meta="Confirmed star IPs from the deck — more to come."
        media={{
          slot: "hero-video-stars",
          label: "HERO VIDEO",
          spec: "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s",
        }}
      />

      {/* Partnership disclaimer — visible, calm, right off the hero.
          Gated phrase stays on one source line (test reads source). */}
      <p className={styles.licensing} data-reveal>
        {"Character marks and partnerships are subject to licensing and brand approval. Presentation follows CultX deck language."}
      </p>

      {/* ============ 2. CONFIRMED STARS — full-bleed carousel ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading eyebrow="01 — Confirmed" title="Meet the legends." />
          <StarCarousel
            slides={STARS}
            portraitSpec="Licensed character art · 900×1200 PNG/WebP"
          />
          <p className={styles.closingLine} data-reveal>
            Four starting stars. A universe designed for more.
          </p>
        </div>
      </section>

      {/* ============ 3. PRODUCTION QUALITY — masked rows ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="02 — How we produce"
            accent="magenta"
            title={
              <>
                Studio ambition.
                <br />
                AI speed.
              </>
            }
            lede="Star IP content is framed for cinematic quality — produced with specialist teams and AI systems built for speed and cost advantage."
          />
          <ol className={styles.sceneRows} data-stagger>
            {QUALITY_CHIPS.map((c) => (
              <SceneRow
                key={c.n}
                n={c.n}
                title={c.title}
                body={c.body}
                accent="magenta"
              />
            ))}
          </ol>
          <p className={styles.disclaimer}>
            Quality and cost comparisons are product vision from the deck —
            ambitious targets, not third-party audited guarantees.
          </p>
        </div>
      </section>

      {/* ============ 4. REAL-WORLD PRODUCTS — the shelf ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="03 — In your world"
            title="From digital IP to real-world products."
            lede="Own it. Use it. Collect it. Live it."
          />
          <div className={styles.screenRow} data-stagger>
            {PRODUCTS.map((p) => (
              <article key={p.title} className={styles.screen}>
                <span className={styles.rule} aria-hidden />
                <MediaFrame
                  slot={p.slot}
                  label={p.title.toUpperCase()}
                  spec="Product packshot · 1200×900 PNG/WebP"
                  ratio="4/3"
                />
                <h3 className={styles.screenTitle}>{p.title}</h3>
                <p className={styles.screenBody}>{p.body}</p>
                <ul className={styles.traitList}>
                  {p.traits.map((t) => (
                    <li key={t} className={styles.trait}>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.ecosystemLine} data-reveal>
            Your favorite IPs, now in your world. The CultX ecosystem turns
            IP into something you can hold.
          </p>
        </div>
      </section>

      {/* ============ 5. PARTNER CTA ============ */}
      <CtaBand
        title="Have an IP that deserves a legend?"
        body="We’re building a universe of characters with global fans. If you hold iconic IP — or you’re building the next one — talk to us."
        primary={{ href: "#waitlist", label: "Partner With Us" }}
        secondary={{ href: "#waitlist", label: "Join the Waitlist" }}
      />

      {/* ============ 6. FOOTER ============ */}
      <SiteFooter />
    </main>
  );
}
