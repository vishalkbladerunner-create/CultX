import styles from "./CinemaPanel.module.css";

export type CinemaPanelProps = {
  /** Giant words filled progressively on scroll (M07 scroll-fill) */
  words: string[];
  /** Optional line under the fill words (viewport-revealed) */
  lede?: string;
  id?: string;
};

/**
 * CinemaPanel — full-viewport transparent intertitle (M07).
 *
 * NO background: the fixed wash + domes show through, so the panel has
 * zero seam by construction. Giant words fill 0.14 → 1 opacity on scrub
 * via ScrollDriver's [data-scroll-fill] binding; the lede fades in after.
 * Reduced motion: words render at full opacity, lede visible.
 */
export function CinemaPanel({ words, lede, id }: CinemaPanelProps) {
  return (
    <section className={styles.panel} id={id} data-theme-section="dark">
      <div className={styles.inner}>
        <p className={styles.fillLine} data-scroll-fill>
          {words.map((w) => (
            <span key={w} className={styles.fillWord} data-fill-word>
              {w}
            </span>
          ))}
        </p>
        {lede ? (
          <p className={styles.lede} data-reveal>
            {lede}
          </p>
        ) : null}
      </div>
    </section>
  );
}
