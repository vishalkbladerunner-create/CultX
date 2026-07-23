"use client";

import { GradientDome } from "@/components/background/GradientDome";
import { DashedLine } from "@/components/chrome/DashedLine";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { UIButton } from "@/components/chrome/UIButton";
import styles from "./AiCenterSection.module.css";

export function AiCenterSection() {
  return (
    <section
      className={styles.section}
      id="about"
      data-theme-section="dark"
      data-aicenter-teaser
    >
      {/* Background Ambient Radial Action-Green Dome Bloom */}
      <div className={styles.domeHost} aria-hidden>
        <GradientDome position="top" />
      </div>

      <div className={styles.layout}>
        {/* Section Header with Dashed Top Line & Corner Pin */}
        <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
          <DashedLine className={styles.lineTop} />
          <div className={styles.locationBadge} data-reveal>
            <span className={styles.pulseDot} aria-hidden />
            <span className={styles.badgeText}>BUILT IN GANGNAM, SEOUL • AI ENTERTAINMENT CAMPUS</span>
          </div>
          <div className={styles.maskH2} data-mask-reveal>
            <h2 className={styles.h2}>The World’s First AI Entertainment Campus.</h2>
          </div>
          <p className={styles.teaserLede} data-reveal>
            A hyper-collaborative ecosystem of ~300 elite creators living, innovating, and shipping K-drama & webtoon IPs together under one roof in Gangnam.
          </p>
        </div>

        {/* Minimalistic 3-Pill Key Stat Strip */}
        <div className={styles.statPillsRow} data-stagger>
          <div className={styles.statPill}>
            <span className={styles.pillIconWrap} aria-hidden>
              <svg className={styles.pillSvg} viewBox="0 0 20 20" fill="none" stroke="var(--ck-action)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 17.5s5-5.5 5-9a5 5 0 10-10 0c0 3.5 5 9 5 9z" />
                <circle cx="10" cy="8.5" r="2" />
              </svg>
            </span>
            <div className={styles.pillText}>
              <span className={styles.pillLabel}>LOCATION</span>
              <strong className={styles.pillValue}>Gangnam, Seoul</strong>
            </div>
          </div>
          <div className={styles.statPill}>
            <span className={styles.pillIconWrap} aria-hidden>
              <svg className={styles.pillSvg} viewBox="0 0 20 20" fill="none" stroke="var(--ck-action)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 2L3.5 11h6L8.5 18L16.5 9h-6L11 2z" />
              </svg>
            </span>
            <div className={styles.pillText}>
              <span className={styles.pillLabel}>TALENT POOL</span>
              <strong className={styles.pillValue}>300 Specialists</strong>
            </div>
          </div>
          <div className={styles.statPill}>
            <span className={styles.pillIconWrap} aria-hidden>
              <svg className={styles.pillSvg} viewBox="0 0 20 20" fill="none" stroke="var(--ck-action)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="14" r="3" />
                <circle cx="14" cy="14" r="3" />
                <circle cx="10" cy="6" r="3" />
                <path d="M8.2 7.8l-1 4.4M11.8 7.8l1 4.4M8.7 14h2.6" />
              </svg>
            </span>
            <div className={styles.pillText}>
              <span className={styles.pillLabel}>COMMUNITY</span>
              <strong className={styles.pillValue}>Nonce Culture</strong>
            </div>
          </div>
        </div>

        {/* Ultra-Wide Cinematic Teaser Showcase Frame */}
        <div className={styles.mediaContainer} data-reveal>
          <div className={styles.mediaFrameWrap}>
            <MediaFrame
              slot="home-about-campus"
              label="GANGNAM CAMPUS ATMOSPHERE"
              spec="Night Exterior & AI Creative Hub · 1600×900 PNG/WebP"
              ratio="16/9"
              imageSrc="/images/about/campus.jpg"
              alt="CultX AI Center campus in Gangnam, Seoul at night — studios glowing with collaborating creators"
            />
            {/* Glassmorphic Overlay Badge */}
            <div className={styles.overlayBadge}>
              <span className={styles.greenDot} aria-hidden />
              <span className={styles.badgeLabel}>GANGNAM HQ • 24/7 CO-CREATION</span>
            </div>
          </div>
        </div>

        {/* Magnetic Primary CTA Link forwarding to /about AI Center Subpage */}
        <div className={styles.ctaRow} data-reveal>
          <UIButton
            href="/about"
            label="Explore the AI Center Campus →"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}
