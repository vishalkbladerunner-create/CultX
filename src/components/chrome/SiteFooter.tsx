import { GradientDome } from "@/components/background/GradientDome";
import { DashedLine } from "@/components/chrome/DashedLine";
import { WaitlistForm } from "@/components/home/WaitlistForm";
import { BackToTop } from "@/components/home/BackToTop";
import { CultKWordmark } from "@/components/home/CultKWordmark";
import styles from "./SiteFooter.module.css";

const NAV = [
  { href: "/platform", label: "Platform" },
  { href: "/pillars", label: "Pillars" },
  { href: "/monetize", label: "Monetize" },
  { href: "/stars", label: "Star IPs" },
  { href: "/faq", label: "FAQ" },
];

/**
 * Shared site footer — reference L12 architecture.
 * Used on the home page and every sub-page (backbone, with header + scroll wash).
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer} data-theme-section="dark" id="waitlist">
      <div className={styles.footerGrid}>
        <DashedLine className={styles.footerLineTop} />
        <div className={styles.footerCol}>
          <h2 className={styles.newsTitle}>Join the CultK waitlist:</h2>
          <div className={styles.newsForm}>
            <WaitlistForm />
          </div>
          <div className={styles.listingBox}>
            <p className={styles.listingLogo}>
              Cult<span className={styles.listingK}>K</span>
            </p>
            <p className={styles.listingText}>
              CultK is built in Korea at the <strong>CultK AI Center</strong>,
              Gangnam — powered for the world.
            </p>
          </div>
        </div>
        <div className={`${styles.footerCol} ${styles.footerColLines}`}>
          <div className={styles.menuWrap}>
            <div className={styles.menuBody}>
              <p className={styles.menuEyebrow}>Navigation</p>
              <ul className={styles.menuLinks}>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a className={styles.menuLink} href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.menuFooter}>
              <ul className={styles.legalMenu}>
                <li>
                  <a className={styles.legalLink} href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className={styles.legalLink} href="#">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.footerCol} ${styles.footerColLines}`}>
          <div className={styles.menuWrap}>
            <div className={styles.menuBody}>
              <p className={styles.menuEyebrow}>Social</p>
              <ul className={styles.menuLinks}>
                <li>
                  <a className={styles.menuLink} href="#">
                    X / Twitter
                  </a>
                </li>
                <li>
                  <a className={styles.menuLink} href="#">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className={styles.menuLink} href="#">
                    Discord
                  </a>
                </li>
              </ul>
              <BackToTop />
            </div>
            <div className={styles.menuFooter}>
              © 2026 CultK Inc. All rights reserved
            </div>
          </div>
        </div>
        <DashedLine className={styles.footerLineBottom} />
      </div>

      {/* ref: wordmark-wrapper (trigger) + wordmark-placeholder (y:200→0 scrub) */}
      <div className={styles.wordmarkZone} data-wordmark-trigger>
        <div className={styles.wordmarkSlide} data-wordmark-slide>
          <CultKWordmark />
        </div>
      </div>

      <div className={styles.footerDomeHost} aria-hidden>
        <GradientDome position="bottom" />
      </div>
    </footer>
  );
}
