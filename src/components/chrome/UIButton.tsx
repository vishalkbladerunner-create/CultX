import styles from "./UIButton.module.css";

type Props = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  /** square icon tile with arrow (ref .has-icon) */
  withIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** Generic 16×16 right-arrow (stroke family of the reference icon set, redrawn). */
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M7.24 12.99L9.22 12.99L14.25 7.86L8.99 2.5L7.22 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M1.26 7.77L14.26 7.81" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/**
 * Split CTA button — reference `.ui-button` (L08 + M12).
 * Label cell carries two stacked labels that swap vertically on hover;
 * optional square icon tile does the same with two arrows.
 * Theme-aware via [data-theme] on an ancestor (site header / section).
 */
export function UIButton({
  href,
  label,
  variant = "primary",
  withIcon = variant === "primary",
  onClick,
}: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${
        withIcon ? styles.hasIcon : ""
      }`}
    >
      <span className={styles.content}>
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      {withIcon && (
        <span className={styles.icon}>
          <span>
            <ArrowRight />
          </span>
          <span aria-hidden>
            <ArrowRight />
          </span>
        </span>
      )}
    </a>
  );
}
