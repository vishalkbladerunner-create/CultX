"use client";

import { useEffect, useRef } from "react";
import styles from "./HomePage.module.css";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className={styles.heroMedia} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/hero-poster.jpg"
        alt=""
        className={styles.heroPoster}
      />
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero/hero-poster.jpg"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
