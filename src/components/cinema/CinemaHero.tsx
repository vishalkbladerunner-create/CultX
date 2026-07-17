import { GradientDome } from "@/components/background/GradientDome";
import { UIButton } from "@/components/chrome/UIButton";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { LetterReveal } from "./LetterReveal";
import styles from "./CinemaHero.module.css";

export type HeroCta = { href: string; label: string };

export type CinemaHeroProps = {
  eyebrow: string;
  /** Plain-string H1 — "\n" for controlled line breaks (M06 cascade) */
  title: string;
  blurb: string;
  primary?: HeroCta;
  secondary?: HeroCta;
  /** Bottom-left meta line */
  meta?: string;
  /** Full-bleed media slot behind the hero content (future video/art) */
  media?: { slot: string; label: string; spec: string };
};

/**
 * CinemaHero — the K-Cinema subpage title card.
 *
 * Same stack as the home hero (top dome z0 → media slot z1 → content z2
 * → meta row) with the seam-free upgrade: the percentage dome host
 * mask-fades at both edges so the tail dissolves into the next section
 * instead of cutting off at the fold. H1 plays the M06 letter cascade.
 */
export function CinemaHero({
  eyebrow,
  title,
  blurb,
  primary = { href: "#waitlist", label: "Join the Waitlist" },
  secondary,
  meta = "Built in Korea — Powered for the World",
  media,
}: CinemaHeroProps) {
  return (
    <header className={styles.hero} data-theme-section="dark">
      {/* z0 — dome image bg, mask-faded at both edges (seam-free) */}
      <div className={styles.heroDomeHost} aria-hidden>
        <GradientDome position="top" />
      </div>
      {media && (
        <div className={styles.heroMedia} aria-hidden>
          <MediaFrame
            slot={media.slot}
            label={media.label}
            spec={media.spec}
            fill
          />
        </div>
      )}
      {/* z2 — content */}
      <div className={styles.heroContent}>
        <p className={styles.eyebrow} data-hero-intro>
          {eyebrow}
        </p>
        <LetterReveal
          as="h1"
          trigger="load"
          delay={0.2}
          text={title}
          className={styles.heroTitle}
        />
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
