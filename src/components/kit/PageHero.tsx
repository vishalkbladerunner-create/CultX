import { GradientDome } from "@/components/background/GradientDome";
import { UIButton } from "@/components/chrome/UIButton";
import { MediaFrame } from "./MediaFrame";
import styles from "./kit.module.css";

export type HeroCta = { href: string; label: string };

export type PageHeroProps = {
  eyebrow: string;
  /** H1 — pass a fragment with <br /> for controlled line breaks */
  title: React.ReactNode;
  blurb: string;
  primary?: HeroCta;
  secondary?: HeroCta;
  /** Bottom-left meta line */
  meta?: string;
  /** Full-bleed media slot behind the hero content (future video/art) */
  media?: { slot: string; label: string; spec: string };
};

/**
 * PageHero — sub-page hero with the home stack: top dome (z0) → media slot
 * (z1) → content (z2) → meta row. Percentage dome host keeps short pages
 * free of phantom scroll (spec D6).
 */
export function PageHero({
  eyebrow,
  title,
  blurb,
  primary = { href: "#waitlist", label: "Join the Waitlist" },
  secondary,
  meta = "Built in Korea — Powered for the World",
  media,
}: PageHeroProps) {
  return (
    <header className={styles.hero} data-theme-section="dark">
      <div className={styles.heroDomeHost} aria-hidden>
        <GradientDome position="top" />
      </div>
      {media && (
        <div className={styles.heroMedia}>
          <MediaFrame slot={media.slot} label={media.label} spec={media.spec} fill />
        </div>
      )}
      <div className={styles.heroContent}>
        <p className={styles.eyebrow} data-hero-intro>
          {eyebrow}
        </p>
        <h1 className={styles.heroTitle} data-hero-intro>
          {title}
        </h1>
        <div className={styles.heroCtas} data-hero-intro>
          {primary && <UIButton href={primary.href} label={primary.label} />}
          {secondary && (
            <UIButton
              href={secondary.href}
              label={secondary.label}
              variant="secondary"
              withIcon={false}
            />
          )}
        </div>
      </div>
      <div className={styles.heroFooter} data-hero-intro>
        <p className={styles.heroMeta}>{meta}</p>
        <p className={styles.heroBlurb}>{blurb}</p>
      </div>
    </header>
  );
}
