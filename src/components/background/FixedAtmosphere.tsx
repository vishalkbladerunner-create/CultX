import styles from "./FixedAtmosphere.module.css";

/**
 * Fixed atmospheric wash (reference `SiteGradientBgLight`, M04).
 * Markup only — ScrollDriver scrubs `--ck-atmo-y` / `--ck-atmo-hue`
 * on this node (`data-atmo`) so the wash drifts slowly with scroll.
 * Sits under section content and section domes.
 */
export function FixedAtmosphere() {
  return (
    <div className={styles.root} aria-hidden data-atmo="">
      <div className={styles.wash} />
    </div>
  );
}
