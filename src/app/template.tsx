import styles from "./template.module.css";

/**
 * M18 route wipe — App Router adaptation of the reference #page-transition.
 * template.tsx remounts on every client navigation, so a CSS-only veil
 * plays cover → reveal on each route change (and once on first paint).
 * Opacity-only, pointer-events none, ≤0.6s — never blocks content.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.veil} aria-hidden />
      {children}
    </>
  );
}
