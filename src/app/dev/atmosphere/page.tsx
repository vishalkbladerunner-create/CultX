import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Atmosphere preview — CultX dev",
  robots: { index: false, follow: false },
};

/**
 * Dev-only showcase of the pure-CSS noir atmosphere (styles/atmosphere.css).
 * No image assets anywhere — domes, vignettes, and grain are all code.
 * Not linked from the site; delete before launch or keep for design QA.
 */
export default function AtmospherePreview() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Atmosphere — pure-CSS noir system</h1>
      <p className={styles.note}>
        80–90% void black, 10–20% bright action green (#a6ff0d). Zero image
        assets — every layer below is code from styles/atmosphere.css.
      </p>

      {/* 1 — domes */}
      <section className={styles.row}>
        <h2>Noir domes (all pages, top/bottom)</h2>
        <div className={styles.pair}>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              <div className="ck-dome" />
            </div>
            <figcaption>.ck-dome — transparent variant (mask fades y40→90)</figcaption>
          </figure>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              <div className="ck-dome-opaque" />
            </div>
            <figcaption>.ck-dome-opaque — holds to y65, soft edge</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — hero vignettes over stand-in "video" */}
      {(
        [
          ["homepage", "ck-vignette-home", "window center-right · kiss left + lower-right"],
          ["about", "ck-vignette-about", "window right half · kiss upper-right"],
          ["investors", "ck-vignette-investors", "window center · accent bottom-right"],
        ] as const
      ).map(([name, cls, desc]) => (
        <section className={styles.row} key={name}>
          <h2>
            Hero vignette — {name} <span className={styles.dim}>({desc})</span>
          </h2>
          <figure className={styles.cell}>
            <div className={`${styles.stage} ${styles.fakeVideo}`}>
              <div className={cls} />
            </div>
            <figcaption>.{cls} over stand-in media</figcaption>
          </figure>
        </section>
      ))}

      {/* 3 — grain dither on/off */}
      <section className={styles.row}>
        <h2>Anti-banding grain (baked into every dome)</h2>
        <div className={styles.pair}>
          <figure className={styles.cell}>
            <div className={styles.stage}>
              <div className="ck-dome" />
            </div>
            <figcaption>dome as shipped (grain ::after built in)</figcaption>
          </figure>
          <figure className={styles.cell}>
            <div className={`${styles.stage} ck-grain`}>
              <div className="ck-dome" />
            </div>
            <figcaption>+ extra .ck-grain host (double dose, QA only)</figcaption>
          </figure>
        </div>
      </section>

      {/* 4 — full-bleed hero mock, CSS only */}
      <section className={styles.row}>
        <h2>Full-bleed hero mock — CSS only</h2>
        <div className={styles.heroMock}>
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
