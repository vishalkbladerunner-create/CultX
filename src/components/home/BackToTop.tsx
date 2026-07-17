"use client";

import styles from "./BackToTop.module.css";

/**
 * Back-to-top — reference footer pattern (arrow-up icon tile + label).
 * Routes through Lenis when present (butter scroll to 0).
 * Icon tile uses full-height dual stack (ref .ui-button .icon) so only one
 * arrow is visible at rest inside the clipped 44px cell.
 */
export function BackToTop() {
  return (
    <div className={styles.wrap}>
      <span>Back to top</span>
      <button
        type="button"
        className={styles.cta}
        aria-label="Back to top"
        onClick={() => {
          const lenis = window.__lenis;
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo(0, 0);
        }}
      >
        <span>
          <ArrowUp />
        </span>
        <span aria-hidden>
          <ArrowUp />
        </span>
      </button>
    </div>
  );
}

function ArrowUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M12.99 8.76L12.99 6.78L7.86 1.75L2.5 7.01L2.5 8.78"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M7.77 14.74L7.81 1.74" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
