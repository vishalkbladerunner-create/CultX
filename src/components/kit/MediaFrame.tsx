import styles from "./MediaFrame.module.css";

export type MediaFrameProps = {
  /** Machine id for the owner's asset map, e.g. "hero-video-platform" */
  slot: string;
  /** Short uppercase role label, e.g. "HERO VIDEO" */
  label: string;
  /** Exact deliverable spec, e.g. "1920×1080 · WebM + MP4 (hvc1) · muted loop ≤8s" */
  spec: string;
  /** Aspect ratio of the future asset (ignored when fill is set) */
  ratio?: "21/9" | "16/9" | "4/3" | "1/1" | "4/5" | "9/16";
  /** Fill an absolutely-positioned host instead of sizing by ratio */
  fill?: boolean;
  className?: string;
};

/**
 * MediaFrame — empty slot for owner-supplied media (video / art / renders).
 * Ships as the final state until the asset drops: dashed chrome, corner
 * pins, role label + exact deliverable spec. Pure CSS, reduced-motion safe.
 */
export function MediaFrame({
  slot,
  label,
  spec,
  ratio = "16/9",
  fill = false,
  className,
}: MediaFrameProps) {
  return (
    <div
      className={`${styles.frame} ${className ?? ""}`}
      style={fill ? undefined : { aspectRatio: ratio }}
      data-media-slot={slot}
      data-fill={fill || undefined}
      role="img"
      aria-label={`${label} — media placeholder (${spec})`}
    >
      <span className={styles.pinTL} aria-hidden />
      <span className={styles.pinBR} aria-hidden />
      <div className={styles.center}>
        <span className={styles.label}>{label}</span>
        <span className={styles.spec}>{spec}</span>
      </div>
    </div>
  );
}
