import { DashedLine } from "@/components/chrome/DashedLine";
import styles from "./kit.module.css";
import type { CardAccent } from "./Card";

export type SectionHeadingProps = {
  /** Uppercase micro-label, e.g. "01 — The Market" */
  eyebrow: string;
  /** H2 — pass a fragment with <br /> for controlled line breaks */
  title: React.ReactNode;
  lede?: string;
  /** Optional per-format accent color for the eyebrow */
  accent?: CardAccent;
};

export function SectionHeading({ eyebrow, title, lede, accent }: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeadWrap}>
      <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
        <DashedLine className={styles.lineTop} />
        <p className={styles.eyebrow} data-accent={accent} data-reveal>
          {eyebrow}
        </p>
        <h2 className={styles.h2} data-reveal>
          {title}
        </h2>
      </div>
      {lede && (
        <p className={styles.lede} data-reveal>
          {lede}
        </p>
      )}
    </div>
  );
}
