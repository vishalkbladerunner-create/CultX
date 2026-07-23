"use client";

import { useState } from "react";
import Link from "next/link";
import { DashedLine } from "@/components/chrome/DashedLine";
import { GradientDome } from "@/components/background/GradientDome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MediaFrame } from "@/components/kit/MediaFrame";
import { CtaBand } from "@/components/kit/CtaBand";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaHeading } from "@/components/cinema/CinemaHeading";
import { KDramaAnimations } from "./KDramaAnimations";
import styles from "./KDramaPage.module.css";

/* ---- Module 1: IP Pipeline Acceleration Data ---- */
const SHOT_LIST = [
  {
    id: "shot-1",
    num: "SHOT #01",
    type: "Wide Establishing",
    lens: "35mm Anamorphic T1.8",
    angle: "Low Angle Tracking",
    lighting: "Rain-slicked Neon Street",
    duration: "4.2s",
    prompt: "Cinematic Gangnam alley, hyper-detailed volumetric rain, neon signs reflection, 8k raw color grade",
    webtoonPanel: "PANEL 01: Character enters neon alleyway under pouring rain.",
  },
  {
    id: "shot-2",
    num: "SHOT #02",
    type: "Emotion Close-Up",
    lens: "85mm Prime T1.4",
    angle: "Eye-Level Shallow DOF",
    lighting: "Subtle Emerald Key + Warm Rim",
    duration: "2.8s",
    prompt: "Close up emotional gaze, micro-expressions, lip-sync alignment, photorealistic skin detail",
    webtoonPanel: "PANEL 04: Tight reaction shot as tension peaks.",
  },
  {
    id: "shot-3",
    num: "SHOT #03",
    type: "Dynamic Action Tracking",
    lens: "24mm Ultra-Wide T2.0",
    angle: "High-Speed Whip Pan",
    lighting: "High-Contrast Strobe + Fog",
    duration: "3.5s",
    prompt: "High speed vehicle chase across Mapo Bridge, dynamic camera blur, cinematic suspense",
    webtoonPanel: "PANEL 09: Action sequence breaking through barriers.",
  },
];

/* ---- Module 2: Generative Pre-Visualization Lighting States ---- */
const LIGHTING_MODES = [
  {
    id: "neon",
    name: "Gangnam Neon",
    tag: "CYAN & MAGENTA STROBE",
    temp: "4200K",
    keyRatio: "4:1",
    fog: "68%",
    desc: "Cyberpunk urban aesthetic with high-contrast electric rim lighting and reflective wet surfaces.",
    color: "#00d4ff",
  },
  {
    id: "noir",
    name: "Cinematic Noir",
    tag: "SHADOW DEPTH & VOLUMETRIC KEY",
    temp: "3200K",
    keyRatio: "8:1",
    fog: "45%",
    desc: "Deep pitch shadow drama with harsh directional key light and dramatic silhouetting.",
    color: "#a6ff0d",
  },
  {
    id: "sunset",
    name: "Sunset Golden Hour",
    tag: "WARM AMBER & ATMOSPHERIC HAZE",
    temp: "2700K",
    keyRatio: "2:1",
    fog: "30%",
    desc: "Emotional nostalgic atmosphere with rich golden highlights and soft shadow falloff.",
    color: "#ffd000",
  },
  {
    id: "emerald",
    name: "Mood Monochromatic",
    tag: "HIGH-KEY EMERALD & SHADOW",
    temp: "5600K",
    keyRatio: "6:1",
    fog: "85%",
    desc: "Psychological thriller palette focused on dark emerald hues and dense atmospheric depth.",
    color: "#4ddb00",
  },
];

/* ---- Module 3: Emotion Localization Audio Tracks ---- */
const AUDIO_TRACKS = [
  { lang: "KOREAN (ORIGINAL)", actor: "Lee Min-ho AI Voice", sync: "100%", status: "MASTER" },
  { lang: "ENGLISH DUB", actor: "Neural Voice Actor #4", sync: "99.4%", status: "SYNCED" },
  { lang: "JAPANESE DUB", actor: "Neural Voice Actor #7", sync: "99.1%", status: "SYNCED" },
  { lang: "SPANISH DUB", actor: "Neural Voice Actor #12", sync: "98.9%", status: "SYNCED" },
];

const EMOTE_MODES = [
  {
    id: "intimacy",
    title: "Micro-Tremor Intimacy",
    desc: "Subtle breath cadence, lip flutter, and quiet emotional gravity for intimate dialogue.",
    freq: "120Hz – 4.2kHz",
    emoteMatch: "99.8%",
  },
  {
    id: "climax",
    title: "Climax Tension",
    desc: "High dynamic range vocal resonance with precise micro-expression synchronization.",
    freq: "80Hz – 8.5kHz",
    emoteMatch: "99.4%",
  },
  {
    id: "melancholy",
    title: "Subtle Melancholy",
    desc: "Pitch stability with natural vocal rasps and deep cultural emotion intact.",
    freq: "100Hz – 5.0kHz",
    emoteMatch: "99.1%",
  },
];

/* ---- Featured K-Drama Teasers ---- */
const DRAMA_SERIES = [
  {
    id: "reborn",
    title: "REBORN: SEOUL SHADOWS",
    tagline: "Betrayal. Power. Neural Revenge.",
    episodes: "12 EPISODES",
    genre: "Sci-Fi Thriller",
    budgetSaved: "99.6%",
    timeToScreen: "14 Days",
  },
  {
    id: "gangnam",
    title: "GANGNAM NOIR 2099",
    tagline: "High Stakes in the Under-City.",
    episodes: "8 EPISODES",
    genre: "Action Crime",
    budgetSaved: "99.4%",
    timeToScreen: "10 Days",
  },
  {
    id: "palace",
    title: "THE LAST JOSEON CODE",
    tagline: "Ancient Kings. Quantum Secrets.",
    episodes: "16 EPISODES",
    genre: "Historical Mystery",
    budgetSaved: "99.7%",
    timeToScreen: "21 Days",
  },
];

export function KDramaPage() {
  const [activeShot, setActiveShot] = useState(0);
  const [activeLighting, setActiveLighting] = useState(0);
  const [activeEmote, setActiveEmote] = useState(0);
  const [selectedDrama, setSelectedDrama] = useState<string | null>(null);

  const currentShot = SHOT_LIST[activeShot];
  const currentLighting = LIGHTING_MODES[activeLighting];
  const currentEmote = EMOTE_MODES[activeEmote];

  return (
    <main className={styles.main} id="top">
      {/* ============ 1. HERO SECTION ============ */}
      <CinemaHero
        eyebrow="K-Entertainment / K-Drama Engine"
        title={"From Webtoon Panels\nto Global Blockbusters."}
        blurb="Reimagining K-Drama production through generative pre-visualization and AI-augmented filmmaking."
        primary={{ href: "#pipeline", label: "Launch Storyboard Engine" }}
        secondary={{ href: "#previs", label: "Explore Pre-Vis Controls" }}
        media={{
          slot: "hero-kdrama-cinematic",
          label: "K-DRAMA CINEMATIC PREVIEW",
          spec: "21:9 Widescreen Anamorphic · 8K RAW HDR · Volumetric Lighting",
        }}
      />

      {/* High-Gloss Cinematic HUD Bar directly under Hero */}
      <div className={styles.heroHudBar}>
        <div className={styles.hudGrid}>
          <div className={styles.hudItem}>
            <span className={styles.hudDot} />
            <span className={styles.hudLabel}>CAMERA STATE: ACTIVE</span>
          </div>
          <div className={styles.hudItem}>
            <span className={styles.hudLabel}>TIMECODE:</span>
            <span className={styles.hudValue}>00:01:24:12</span>
          </div>
          <div className={styles.hudItem}>
            <span className={styles.hudLabel}>FORMAT:</span>
            <span className={styles.hudValue}>8K HDR RAW (ANAMORPHIC)</span>
          </div>
          <div className={styles.hudItem}>
            <span className={styles.hudLabel}>AI RENDER VELOCITY:</span>
            <span className={styles.hudGreenValue}>120 FPS REAL-TIME</span>
          </div>
        </div>
      </div>

      {/* ============ 2. NARRATIVE MODULE 1: IP PIPELINE ACCELERATION ============ */}
      <section
        className={`${styles.section} ${styles.moduleBg}`}
        id="pipeline"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.layout}>
          {/* Split Section Header */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <div className={styles.moduleEyebrowRow}>
              <span className={styles.moduleNum}>MODULE 01</span>
              <p className={styles.eyebrow} data-reveal>
                IP Pipeline Acceleration
              </p>
            </div>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                Webtoon storyboards to
                <br />
                cinematic shot-lists.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                Automate the jump from 2D webtoon panels to complete 3D camera angles, lighting maps, and anamorphic shot parameters in seconds.
              </p>
            </div>
          </div>

          {/* Interactive Storyboard & Shot-List Extractor Console */}
          <div className={styles.consoleStage}>
            <div className={styles.consoleHeader}>
              <div className={styles.consoleBadge}>
                <span className={styles.pulseIndicator} />
                <span>AI SHOT-LIST PARSER v3.4</span>
              </div>
              <div className={styles.shotTabs}>
                {SHOT_LIST.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`${styles.shotTabBtn} ${
                      idx === activeShot ? styles.shotTabActive : ""
                    }`}
                    onClick={() => setActiveShot(idx)}
                  >
                    {s.num}: {s.type}
                  </button>
                ))}
              </div>
            </div>

            {/* Symmetrical 2-Column Split: Webtoon Source vs 3D AI Shot-List */}
            <div className={styles.consoleSplitGrid}>
              {/* Left Column: Webtoon Panel Source */}
              <div className={styles.consoleColLeft}>
                <div className={styles.colHeader}>
                  <span className={styles.colTag}>SOURCE 2D INPUT</span>
                  <h4 className={styles.colTitle}>Webtoon Panel Storyboard</h4>
                </div>
                <div className={styles.webtoonPanelBox}>
                  <MediaFrame
                    slot={`webtoon-panel-${currentShot.id}`}
                    label={`WEBTOON STORYBOARD ${currentShot.num}`}
                    spec="4:5 Ratio · 2D Webtoon Frame + Bounding Box Data"
                    ratio="4/5"
                  />
                  <div className={styles.panelAnnotation}>
                    <span className={styles.annoBullet}>✦</span>
                    <p className={styles.annoText}>{currentShot.webtoonPanel}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: AI 3D Shot-List Output */}
              <div className={styles.consoleColRight}>
                <div className={styles.colHeader}>
                  <span className={styles.colTagGreen}>CINEMATIC 3D TARGET</span>
                  <h4 className={styles.colTitle}>Generated Camera Shot Parameters</h4>
                </div>

                <div className={styles.paramsCard}>
                  <div className={styles.paramRow}>
                    <span className={styles.paramKey}>CAMERA LENS</span>
                    <span className={styles.paramValGreen}>{currentShot.lens}</span>
                  </div>
                  <div className={styles.paramRow}>
                    <span className={styles.paramKey}>ANGLE & MOTION</span>
                    <span className={styles.paramVal}>{currentShot.angle}</span>
                  </div>
                  <div className={styles.paramRow}>
                    <span className={styles.paramKey}>LIGHTING MAP</span>
                    <span className={styles.paramVal}>{currentShot.lighting}</span>
                  </div>
                  <div className={styles.paramRow}>
                    <span className={styles.paramKey}>TARGET DURATION</span>
                    <span className={styles.paramVal}>{currentShot.duration}</span>
                  </div>

                  <div className={styles.promptBox}>
                    <span className={styles.promptLabel}>GENERATIVE PRE-VIS PROMPT:</span>
                    <p className={styles.promptText}>"{currentShot.prompt}"</p>
                  </div>

                  <div className={styles.velocityBadgeRow}>
                    <span className={styles.velocityTag}>PIPELINE VELOCITY // 10X FASTER</span>
                    <span className={styles.velocitySub}>ZERO MANUAL STORYBOARD RE-SKETCHING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wins Summary Row below Console */}
            <div className={styles.winsSummaryRow}>
              <div className={styles.winSummaryItem}>
                <span className={styles.winBullet}>✦</span>
                <div>
                  <h5 className={styles.winItemTitle}>Automated Spatial Mapping</h5>
                  <p className={styles.winItemBody}>
                    Webtoon panel depth is converted directly into volumetric 3D coordinates.
                  </p>
                </div>
              </div>
              <div className={styles.winSummaryItem}>
                <span className={styles.winBullet}>✦</span>
                <div>
                  <h5 className={styles.winItemTitle}>Anamorphic Lens Simulation</h5>
                  <p className={styles.winItemBody}>
                    Preserves filmic focal falloff and cinematic bokeh without expensive camera rigs.
                  </p>
                </div>
              </div>
              <div className={styles.winSummaryItem}>
                <span className={styles.winBullet}>✦</span>
                <div>
                  <h5 className={styles.winItemTitle}>Instant Director Iteration</h5>
                  <p className={styles.winItemBody}>
                    Re-angle shots or adjust lens focal lengths with immediate visual feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. NARRATIVE MODULE 2: GENERATIVE PRE-VISUALIZATION ============ */}
      <section
        className={`${styles.section} ${styles.moduleBg}`}
        id="previs"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.universeDomeHost} aria-hidden>
          <GradientDome position="top" />
        </div>
        <div className={styles.layout}>
          {/* Split Section Header */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <div className={styles.moduleEyebrowRow}>
              <span className={styles.moduleNum}>MODULE 02</span>
              <p className={styles.eyebrow} data-reveal>
                Generative Pre-Visualization
              </p>
            </div>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                Real-time virtual lighting
                <br />& camera blocking.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                Prototype scenes before rolling camera. Manipulate volumetric fog, key light color temperature, and lens depth in an interactive director suite.
              </p>
            </div>
          </div>

          {/* Interactive Virtual Lighting & Camera Console */}
          <div className={styles.previsConsoleStage}>
            <div className={styles.previsGrid}>
              {/* Left Column: Lighting Controls & State Selector */}
              <div className={styles.previsControlsCol}>
                <h4 className={styles.previsConsoleTitle}>Virtual Stage Lighting Console</h4>
                <p className={styles.previsConsoleDesc}>
                  Select a lighting profile to preview real-time atmosphere shifts:
                </p>

                <div className={styles.lightingModeList}>
                  {LIGHTING_MODES.map((mode, idx) => (
                    <button
                      key={mode.id}
                      className={`${styles.lightingCardBtn} ${
                        idx === activeLighting ? styles.lightingCardActive : ""
                      }`}
                      onClick={() => setActiveLighting(idx)}
                    >
                      <div className={styles.lightingCardHeader}>
                        <span
                          className={styles.colorDot}
                          style={{ backgroundColor: mode.color }}
                        />
                        <span className={styles.lightingName}>{mode.name}</span>
                        <span className={styles.lightingTag}>{mode.tag}</span>
                      </div>
                      <p className={styles.lightingDesc}>{mode.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Viewport Preview with Active HUD */}
              <div className={styles.previsViewportCol}>
                <div className={styles.viewportContainer}>
                  <div
                    className={styles.viewportGlowOverlay}
                    style={{
                      boxShadow: `inset 0 0 80px ${currentLighting.color}33`,
                      borderColor: currentLighting.color,
                    }}
                  />

                  <MediaFrame
                    slot={`virtual-previs-${currentLighting.id}`}
                    label={`VIRTUAL PRE-VIS VIEWPORT — ${currentLighting.name}`}
                    spec={`16:9 Cinema Viewport · Temp ${currentLighting.temp} · Key ${currentLighting.keyRatio}`}
                    ratio="16/9"
                  />

                  {/* Active HUD Overlay */}
                  <div className={styles.viewportHud}>
                    <div className={styles.hudPill}>
                      <span>PROFILE:</span>
                      <strong style={{ color: currentLighting.color }}>
                        {currentLighting.name.toUpperCase()}
                      </strong>
                    </div>
                    <div className={styles.hudPill}>
                      <span>TEMP: {currentLighting.temp}</span>
                    </div>
                    <div className={styles.hudPill}>
                      <span>KEY: {currentLighting.keyRatio}</span>
                    </div>
                    <div className={styles.hudPill}>
                      <span>FOG DENSITY: {currentLighting.fog}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.previsFooterLine}>
                  <span className={styles.winBullet}>✦</span>
                  <span>
                    Virtual pre-vis cuts physical stage setup time by up to 90%, giving Korean showrunners unprecedented creative autonomy.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. NARRATIVE MODULE 3: GLOBAL VOICE & EMOTION LOCALIZATION ============ */}
      <section
        className={`${styles.section} ${styles.moduleBg}`}
        id="localization"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.layout}>
          {/* Split Section Header */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <div className={styles.moduleEyebrowRow}>
              <span className={styles.moduleNum}>MODULE 03</span>
              <p className={styles.eyebrow} data-reveal>
                Global Voice & Emotion Localization
              </p>
            </div>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                Multi-language emotional sync
                <br />
                without losing nuance.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                Preserve the raw emotional weight of Korean acting across global dubbing. Neural pitch matching and lip-sync alignment keep every whisper authentic.
              </p>
            </div>
          </div>

          {/* Interactive Multi-Track Audio Waveform Console */}
          <div className={styles.audioConsoleStage}>
            <div className={styles.audioHeader}>
              <h4 className={styles.audioTitle}>Synchronized Emotion & Dubbing Inspector</h4>
              <div className={styles.emoteMatchBadge}>
                <span>NEURAL EMOTE MATCH RATE:</span>
                <strong className={styles.greenText}>{currentEmote.emoteMatch}</strong>
              </div>
            </div>

            {/* Emote Selector Buttons */}
            <div className={styles.emoteTabs}>
              {EMOTE_MODES.map((em, idx) => (
                <button
                  key={em.id}
                  className={`${styles.emoteTabBtn} ${
                    idx === activeEmote ? styles.emoteTabActive : ""
                  }`}
                  onClick={() => setActiveEmote(idx)}
                >
                  <span className={styles.emoteTabTitle}>{em.title}</span>
                  <span className={styles.emoteTabFreq}>{em.freq}</span>
                </button>
              ))}
            </div>

            <p className={styles.emoteActiveDesc}>{currentEmote.desc}</p>

            {/* Multi-Track Audio Rows */}
            <div className={styles.audioTracksContainer}>
              {AUDIO_TRACKS.map((track, i) => (
                <div key={track.lang} className={styles.trackRow}>
                  <div className={styles.trackMeta}>
                    <span className={styles.trackLang}>{track.lang}</span>
                    <span className={styles.trackActor}>{track.actor}</span>
                  </div>

                  {/* Simulated Waveform Visualizer */}
                  <div className={styles.waveformWrap}>
                    <div className={styles.waveformBars}>
                      {Array.from({ length: 48 }).map((_, barIdx) => {
                        const height = Math.sin(barIdx * 0.4 + i + activeEmote * 2) * 40 + 50;
                        return (
                          <div
                            key={barIdx}
                            className={styles.waveBar}
                            style={{
                              height: `${height}%`,
                              backgroundColor:
                                i === 0 ? "var(--ck-action)" : "rgba(242, 245, 240, 0.4)",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.trackStatus}>
                    <span className={styles.syncScore}>{track.sync}</span>
                    <span
                      className={
                        track.status === "MASTER" ? styles.statusMaster : styles.statusSynced
                      }
                    >
                      {track.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. NARRATIVE MODULE 4: CREATOR-DRIVEN SHOWRUNNING ============ */}
      <section
        className={`${styles.section} ${styles.moduleBg}`}
        id="showrunning"
        data-theme-section="dark"
        data-chapter-wipe
      >
        <div className={styles.wipeOverlay} data-wipe-overlay />
        <div className={styles.layout}>
          {/* Split Section Header */}
          <div className={styles.splitHeader}>
            <DashedLine className={styles.lineTop} />
            <div className={styles.moduleEyebrowRow}>
              <span className={styles.moduleNum}>MODULE 04</span>
              <p className={styles.eyebrow} data-reveal>
                Creator-Driven Showrunning
              </p>
            </div>
            <div className={styles.splitHeaderGrid}>
              <h2 className={styles.splitHeaderTitle} data-reveal>
                Empowering independent directors
                <br />
                to bypass gatekeepers.
              </h2>
              <p className={styles.splitHeaderLede} data-reveal>
                Put full creative and financial control back into the hands of Korean creators. Direct-to-fan distribution, rapid production cycles, and community ownership.
              </p>
            </div>
          </div>

          {/* Symmetrical 2-Column Comparison & Executive Velocity Suite */}
          <div className={styles.showrunnerGrid}>
            {/* Left Column: Traditional Bottleneck vs CultX Direct-to-Fan */}
            <div className={styles.showrunnerColLeft}>
              <h4 className={styles.colTitle}>The Studio Bottleneck vs CultX Pipeline</h4>

              <div className={styles.comparisonBox}>
                <div className={styles.compItemOld}>
                  <span className={styles.compTagOld}>TRADITIONAL STUDIO SYSTEM</span>
                  <p className={styles.compBody}>
                    Years stuck in script development hell, 80%+ equity surrendered to legacy distributors, executive interference, and zero direct fan ownership.
                  </p>
                </div>

                <div className={styles.compItemNew}>
                  <span className={styles.compTagNew}>CULTX AI SHOWRUNNING</span>
                  <p className={styles.compBody}>
                    Webtoon to release in weeks, 100% direct fan engagement, IP token monetization, and complete artistic autonomy for independent directors.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Velocity & Ownership Metrics */}
            <div className={styles.showrunnerColRight}>
              <h4 className={styles.colTitle}>Showrunner Velocity Metrics</h4>

              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <span className={styles.metricNum}>&lt;0.5%</span>
                  <span className={styles.metricLabel}>TRADITIONAL BUDGET</span>
                  <p className={styles.metricSub}>Hollywood-tier VFX without traditional $50M+ overhead.</p>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricNum}>10×</span>
                  <span className={styles.metricLabel}>PRODUCTION SPEED</span>
                  <p className={styles.metricSub}>From storyboard to episode release in days instead of years.</p>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricNum}>100%</span>
                  <span className={styles.metricLabel}>CREATOR IP AUTONOMY</span>
                  <p className={styles.metricSub}>Keep direct ownership of characters, universe, and tokens.</p>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricNum}>GLOBAL</span>
                  <span className={styles.metricLabel}>DIRECT-TO-FAN REACH</span>
                  <p className={styles.metricSub}>Instant multi-language streaming with integrated fan tokens.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prominent Centerpiece Callout Banner */}
          <div className={styles.centerpieceCallout}>
            <DashedLine className={styles.calloutLineTop} />
            <p className={styles.centerpieceText}>
              "The next Squid Game or Solo Leveling won't be greenlit in a corporate boardroom. It will be born on CultX."
            </p>
            <DashedLine className={styles.calloutLineBottom} />
          </div>
        </div>
      </section>

      {/* ============ 6. FEATURED K-DRAMA CONCEPT TEASERS ============ */}
      <section className={styles.section} data-theme-section="dark">
        <div className={styles.layout}>
          <CinemaHeading
            eyebrow="Episodic Showcase"
            accent="green"
            title="K-Drama Series Concepts in Production"
            lede="Explore active AI drama productions powered by the CultX pre-visualization and showrunning suite."
          />

          <div className={styles.seriesGrid}>
            {DRAMA_SERIES.map((s) => (
              <div key={s.id} className={styles.seriesCard}>
                <div className={styles.seriesMediaWrap}>
                  <MediaFrame
                    slot={`kdrama-series-${s.id}`}
                    label={s.title}
                    spec={`${s.episodes} · ${s.genre}`}
                    ratio="16/9"
                  />
                  <div className={styles.seriesBadge}>{s.genre}</div>
                </div>

                <div className={styles.seriesBody}>
                  <span className={styles.seriesMeta}>{s.episodes}</span>
                  <h4 className={styles.seriesTitle}>{s.title}</h4>
                  <p className={styles.seriesTagline}>{s.tagline}</p>

                  <div className={styles.seriesStatsRow}>
                    <div className={styles.sStat}>
                      <span>BUDGET SAVED:</span>
                      <strong>{s.budgetSaved}</strong>
                    </div>
                    <div className={styles.sStat}>
                      <span>SPEED TO SCREEN:</span>
                      <strong>{s.timeToScreen}</strong>
                    </div>
                  </div>

                  <button
                    className={styles.seriesCtaBtn}
                    onClick={() => setSelectedDrama(s.title)}
                  >
                    Inspect Director Specs →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Drawer for Selected Drama Specs */}
      {selectedDrama && (
        <div className={styles.modalOverlay} onClick={() => setSelectedDrama(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseBtn}
              onClick={() => setSelectedDrama(null)}
            >
              ✕ CLOSE
            </button>
            <span className={styles.modalEyebrow}>DIRECTOR SHOWCASE</span>
            <h3 className={styles.modalTitle}>{selectedDrama}</h3>
            <p className={styles.modalDesc}>
              This K-Drama concept was generated using the CultX AI Drama engine, combining webtoon panel extraction, real-time virtual lighting pre-vis, and neural voice localization.
            </p>
            <div className={styles.modalDivider} />
            <div className={styles.modalSpecsList}>
              <div className={styles.specItem}>
                <span>VIRTUAL LIGHTING MODE:</span>
                <strong>Gangnam Neon (4200K)</strong>
              </div>
              <div className={styles.specItem}>
                <span>EMOTION SYNC ENGINE:</span>
                <strong>Neural Lip-Sync v3.4 (99.4% match)</strong>
              </div>
              <div className={styles.specItem}>
                <span>CREATOR DISTRIBUTION:</span>
                <strong>CultX IP Token & Direct Sales Loop</strong>
              </div>
            </div>
            <Link className={styles.modalActionBtn} href="#waitlist">
              Join Waitlist to Back This IP →
            </Link>
          </div>
        </div>
      )}

      {/* ============ 7. CROSS-PAGE CTA ============ */}
      <CtaBand
        title="Ready to showrun your K-Drama?"
        body="Turn your webtoon, story, or character IP into a global cinematic series with CultX AI production tools."
        primary={{ href: "#waitlist", label: "Join Creator Waitlist" }}
        secondary={{ href: "/monetize", label: "Explore IP Monetization" }}
      />

      {/* ============ 8. SITE FOOTER ============ */}
      <SiteFooter />

      {/* Client-side animations */}
      <KDramaAnimations />
    </main>
  );
}
