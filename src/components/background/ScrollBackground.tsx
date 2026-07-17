import { FixedAtmosphere } from "./FixedAtmosphere";
import { ScrollDriver } from "./ScrollDriver";

/**
 * Page-level scroll atmosphere:
 * - FixedAtmosphere: always-mounted green radial wash (ref SiteGradientBgLight)
 * - ScrollDriver: Lenis + GSAP systems (dome parallax M05, header theme M03,
 *   reveals M06/M07) driving section-anchored <GradientDome /> layers.
 */
export function ScrollBackground() {
  return (
    <>
      <FixedAtmosphere />
      <ScrollDriver />
    </>
  );
}
