import styles from "./SceneRow.module.css";
import type { CinemaAccent } from "./CinemaHeading";

export type SceneRowProps = {
  n: string;
  title: string;
  body?: string;
  /** Optional trailing micro line (uppercase label treatment) */
  micro?: string;
  /** Accent family for the numeral (one accent per region) */
  accent?: CinemaAccent;
};

/**
 * SceneRow — numbered hairline row: the K-Cinema replacement for card
 * grids. Content reads as an editorial scene (numeral + title + body),
 * not as a boxed card. Parent list carries [data-stagger]; rows never
 * self-reveal (no double animation).
 */
export function SceneRow({ n, title, body, micro, accent }: SceneRowProps) {
  return (
    <li className={styles.row} {...(accent ? { "data-accent": accent } : {})}>
      <span className={styles.num}>{n}</span>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {body ? <p className={styles.body}>{body}</p> : null}
        {micro ? <p className={styles.micro}>{micro}</p> : null}
      </div>
    </li>
  );
}
