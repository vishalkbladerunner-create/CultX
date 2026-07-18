import styles from "./GradientDome.module.css";

type Props = {
  position?: "top" | "bottom";
  className?: string;
};

/**
 * Section-local spherical gradient (reference `GradientBgDark`, M05).
 *
 * Pure CSS — the noir dome lives in styles/atmosphere.css (`.ck-dome`:
 * bright action-green rim + halo on void black, grain-dithered). No image
 * assets; recolor = edit one token.
 *
 * Server component: pure SSR markup. The scroll scale is applied by
 * `ScrollDriver` (GSAP ScrollTrigger) directly on the DOM node via the
 * `--parallax-scale` CSS var — React never re-renders it, so the scrub
 * is never wiped by hydration.
 *
 * Place inside a positioned host whose height is set by the parent section
 * (ref hosts: 200vh mobile hero, 110–130% hero/opportunity, 100% propositions,
 * calc(120% + 420px) footer).
 */
export function GradientDome({ position = "top", className = "" }: Props) {
  return (
    <div
      className={[
        styles.root,
        position === "bottom" ? styles.bottom : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-dome=""
      data-dome-position={position}
      aria-hidden
    >
      <div className="ck-dome" />
    </div>
  );
}
