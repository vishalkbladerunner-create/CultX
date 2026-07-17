import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Atmosphere preview — CultX dev",
  robots: { index: false, follow: false },
};

const IMG = "/images";

/**
 * Dev-only comparison: brand PNG assets (left) vs pure-CSS replicas (right).
 * Not linked from the site; delete before launch or keep for design QA.
 */
export default function AtmospherePreview() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Atmosphere — PNG vs CSS replica</h1>
      <p className={styles.note}>
        Left: current brand PNG. Right: pure CSS (styles/atmosphere.css). Same
        measured stops.
      </p>

      {/* 1 — transparent dome */}
      <section className={styles.row}>
        <h2>Transparent dome (all pages, top/bottom)</h2>
        <div className={styles.pair}>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/gradient-green-poppy-transparent.png`} alt="" />
            </div>
            <figcaption>PNG · gradient-green-poppy-transparent</figcaption>
          </figure>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              <div className="ck-dome" />
            </div>
            <figcaption>CSS · .ck-dome</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — opaque dome */}
      <section className={styles.row}>
        <h2>Opaque dome (about-like pages, drawers)</h2>
        <div className={styles.pair}>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/gradient-green-poppy.png`} alt="" />
            </div>
            <figcaption>PNG · gradient-green-poppy</figcaption>
          </figure>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              <div className="ck-dome-opaque" />
            </div>
            <figcaption>CSS · .ck-dome-opaque</figcaption>
          </figure>
        </div>
      </section>

      {/* 3 — hero vignettes over stand-in "video" */}
      {(
        [
          ["homepage", "ck-vignette-home", "window center-right"],
          ["about", "ck-vignette-about", "window right half"],
          ["investors", "ck-vignette-investors", "window center + fill bottom-right"],
        ] as const
      ).map(([name, cls, desc]) => (
        <section className={styles.row} key={name}>
          <h2>
            Hero vignette — {name} <span className={styles.dim}>({desc})</span>
          </h2>
          <div className={styles.pair}>
            <figure className={styles.cell}>
              <div className={`${styles.stage} ${styles.fakeVideo}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/heroOverlay-green-poppy_${name}.png`}
                  alt=""
                  className={styles.overlayImg}
                />
              </div>
              <figcaption>PNG · heroOverlay-green-poppy_{name}</figcaption>
            </figure>
            <figure className={styles.cell}>
              <div className={`${styles.stage} ${styles.fakeVideo}`}>
                <div className={cls} />
              </div>
              <figcaption>CSS · .{cls}</figcaption>
            </figure>
          </div>
        </section>
      ))}

      {/* 4 — grain dither on/off */}
      <section className={styles.row}>
        <h2>Anti-banding grain (.ck-grain)</h2>
        <div className={styles.pair}>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              <div className="ck-dome" />
            </div>
            <figcaption>without grain</figcaption>
          </figure>
          <figure className={styles.cell}>
            <div className={`${styles.stage} ck-grain`}>
              <div className="ck-dome" />
            </div>
            <figcaption>with .ck-grain (feTurbulence dither)</figcaption>
          </figure>
        </div>
      </section>

      {/* 5 — full-bleed hero mock, CSS only */}
      <section className={styles.row}>
        <h2>Full-bleed hero mock — CSS only</h2>
        <div className={`${styles.heroMock} ck-grain`}>
          <div className="ck-dome" />
          <div className="ck-vignette-home" />
          <div className={styles.heroText}>
            <p className={styles.tag}>CultX Platform</p>
            <p className={styles.headline}>
              Where IPs
              <br />
              Become Legends.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
