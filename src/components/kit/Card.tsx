import styles from "./kit.module.css";

export type CardAccent = "cyan" | "magenta" | "purple" | "orange" | "gold";

export type CardProps = {
  n?: string;
  title: string;
  body?: string;
  accent?: CardAccent;
  children?: React.ReactNode;
};

export function Card({ n, title, body, accent, children }: CardProps) {
  /* No data-reveal here: cards always live inside a parent [data-stagger]
     grid — baking in a per-card reveal would double-animate (M06 vs M11). */
  return (
    <article
      className={`${styles.card} ${styles.hasPinTopLeft}`}
      data-accent={accent}
    >
      {n && <span className={styles.cardNum}>{n}</span>}
      <h3 className={styles.cardTitle}>{title}</h3>
      {body && <p className={styles.cardBody}>{body}</p>}
      {children}
    </article>
  );
}
