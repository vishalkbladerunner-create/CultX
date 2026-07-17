import { DashedLine } from "@/components/chrome/DashedLine";
import styles from "./CinemaHeading.module.css";

export type CinemaAccent = "cyan" | "magenta" | "purple" | "orange" | "gold";

export type CinemaHeadingProps = {
  eyebrow: string;
  /** H2 — pass a fragment with <br /> for controlled line breaks */
  title: React.ReactNode;
  lede?: string;
  /** Accent family for the eyebrow (one accent per region) */
  accent?: CinemaAccent;
};

/**
 * CinemaHeading — the K-Cinema section head: dashed top line (L03) +
 * corner pin (L02) + eyebrow + M15 masked H2 (slides up out of its mask
 * on viewport entry) + optional lede. Replaces kit SectionHeading.
 */
export function CinemaHeading({
  eyebrow,
  title,
  lede,
  accent,
}: CinemaHeadingProps) {
  return (
    <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
      <DashedLine className={styles.lineTop} />
      <p
        className={styles.eyebrow}
        data-reveal
        {...(accent ? { "data-accent": accent } : {})}
      >
        {eyebrow}
      </p>
      <div className={styles.maskH2} data-mask-reveal>
        <h2 className={styles.h2}>{title}</h2>
      </div>
      {lede ? (
        <p className={styles.lede} data-reveal>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
