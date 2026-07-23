import Link from "next/link";
import { GradientDome } from "@/components/background/GradientDome";
import { DashedLine } from "@/components/chrome/DashedLine";
import { MediaFrame } from "@/components/kit/MediaFrame";
import styles from "./FormatStage.module.css";

/**
 * FormatStage — K-Cinema formats set piece (spec §4.2).
 *
 * M09 sticky stage + M15 masked title swap, driven entirely by
 * ScrollDriver's generalized [data-stage-scope] binding:
 *   [data-stage-scope]  this section
 *   [data-stage-frame]  absolutely-stacked poster frames (first visible)
 *   [data-stage-step]   right-column steps (viewport-center band triggers)
 *   [data-stage-title]  masked huge title inside each frame (yPercent swap)
 *
 * Desktop ≥800px: sticky poster stage left (top 14vh, height 68vh),
 * four 72vh steps right. Mobile: stacked — each step carries its own
 * 2:3 poster (48vh) above the text; the sticky stage is hidden.
 * Copy: four pillars verbatim from cult/content-strategy/03-home.md §3.
 */

const FORMATS: readonly {
  n: string;
  anchor: string;
  accent: keyof typeof ACCENTS;
  slot: string;
  frameLabel: string;
  title: string;
  body: string;
  /** Owner-supplied key visual; frame renders placeholder chrome until set */
  imageSrc?: string;
}[] = [
  {
    n: "01",
    anchor: "comic",
    accent: "cyan",
    slot: "format-comic",
    frameLabel: "COMIC KEY VISUAL",
    title: "AI Comic / Webtoon",
    body: "Finished webtoons become premium AI comic animation — fast, and at scale.",
    imageSrc: "/images/formats/comic.jpg",
  },
  {
    n: "02",
    anchor: "universe",
    accent: "magenta",
    slot: "format-universe",
    frameLabel: "UNIVERSE KEY VISUAL",
    title: "AI Star IP Universe",
    body: "Iconic characters brought to life with studio-level AI production and movie-length storytelling.",
    imageSrc: "/images/formats/universe.jpg",
  },
  {
    n: "03",
    anchor: "short",
    accent: "purple",
    slot: "format-short",
    frameLabel: "SHORT KEY VISUAL",
    title: "AI Short",
    body: "Viral short-form built for social platforms — TikTok, Reels, Shorts.",
    imageSrc: "/images/formats/short.jpg",
  },
  {
    n: "04",
    anchor: "drama",
    accent: "purple",
    slot: "format-drama",
    frameLabel: "DRAMA KEY VISUAL",
    title: "AI Drama",
    body: "Cinematic long-form AI series with K-drama emotion and retention.",
    imageSrc: "/images/formats/drama.jpg",
  },
];

const POSTER_SPEC = "Key visual · 1600×1200 PNG/WebP";

const ACCENTS = {
  cyan: styles.accentCyan,
  magenta: styles.accentMagenta,
  purple: styles.accentPurple,
} as const;

export function FormatStage() {
  return (
    <section
      className={styles.band}
      id="formats"
      data-theme-section="dark"
      data-stage-scope
    >
      {/* Bottom dome bleeds 20% past the band and mask-fades at both
          edges — one continuous canvas, no seam (spec §1 invariant). */}
      <div className={styles.domeHost} aria-hidden>
        <GradientDome position="bottom" />
      </div>

      <div className={styles.layout}>
        <div className={`${styles.sectionHead} ${styles.hasPinTopLeft}`}>
          <DashedLine className={styles.lineTop} />
          <p className={styles.eyebrow} data-reveal>
            02 — Four Experiences
          </p>
          <div className={styles.maskH2} data-mask-reveal>
            <h2 className={styles.h2}>Every major AI entertainment format.</h2>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Sticky stage — desktop only (aria-hidden decor; the same
              content is readable in the steps for all users). */}
          <div className={styles.stageWrap} aria-hidden>
            <div className={styles.stage}>
              {/* Pure key visual stack — no title painted on the art */}
              <div className={styles.posterStack}>
                {FORMATS.map((f) => (
                  <div key={f.n} className={styles.frame} data-stage-frame>
                    <div className={styles.posterHost}>
                      <MediaFrame
                        slot={f.slot}
                        label={f.frameLabel}
                        spec={POSTER_SPEC}
                        fill
                        imageSrc={f.imageSrc}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Caption sits under the poster (left column), swaps with scroll */}
              <div className={styles.stageCaption} aria-hidden>
                {FORMATS.map((f, i) => (
                  <p
                    key={f.n}
                    className={`${styles.stageCaptionItem} ${ACCENTS[f.accent]}`}
                    data-stage-caption
                    {...(i === 0 ? { "data-active": "" } : {})}
                  >
                    <span className={styles.stageCaptionNum}>{f.n}</span>
                    <span className={styles.stageCaptionTitle}>{f.title}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <ol className={styles.steps}>
            {FORMATS.map((f) => (
              <li key={f.n} className={styles.step} data-stage-step>
                <div className={styles.stepPosterHost}>
                  <MediaFrame
                    slot={f.slot}
                    label={f.frameLabel}
                    spec={POSTER_SPEC}
                    fill
                    imageSrc={f.imageSrc}
                  />
                </div>
                <span className={`${styles.stepNum} ${ACCENTS[f.accent]}`}>
                  {f.n}
                </span>
                <h3 className={styles.stepTitle}>{f.title}</h3>
                <p className={styles.stepBody}>{f.body}</p>
                <Link className={styles.stepLink} href={`/pillars#${f.anchor}`}>
                  See how each format works →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
