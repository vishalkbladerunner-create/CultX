import styles from "./FixedAtmosphere.module.css";

/**
 * Fixed atmospheric wash (reference `SiteGradientBgLight`, M04).
 * Pure CSS — no scroll JS. Sits under section content and section domes.
 */
export function FixedAtmosphere() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.wash} />
    </div>
  );
}
