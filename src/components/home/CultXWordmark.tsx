"use client";

import { useEffect, useRef } from "react";
import styles from "./CultXWordmark.module.css";
import {
  CELL_DESKTOP,
  CELL_MOBILE,
  SQUARE_HALF_PX,
  nearestGridPoints,
  fract,
} from "@/lib/wordmark/grid";

/**
 * CultX footer wordmark — SVG/CSS/rAF port of reference LogoCanvas
 * (scrap CfV00Epg.js + SiteFooter pointer wiring via graphify).
 *
 * Hit area (ref: pointer on whole footer, not just canvas):
 *   - shell extends up through the dashed line above the wordmark
 *   - L/R full shell width; top soft-fades ~28px below the line
 *   - cursor may travel above the glyph box; geometry still tracks + fades
 *
 * Leave: remove data-hover and let CSS opacity transitions fade out
 * (no instant snap — matches the ref “shapes drift off the top” feel).
 */

/** ref marker ceiling 0.6 */
const MARKER_OPACITY_MAX = 0.6;

/**
 * Geometry base α — ref mul(0.4); bumped slightly for presence while
 * still below the previous over-bright 0.72.
 */
const GEOMETRY_ALPHA = 0.52;

/** Only the last few CSS px toward the top edge fade (not a tall band). */
const TOP_EDGE_FADE_PX = 5;

/** ms after leave before hard-resetting spotlight / points */
const LEAVE_RESET_MS = 560;

export function CultXWordmark() {
  const shellRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const triRef = useRef<SVGPolygonElement>(null);
  const sqRefs = useRef<(SVGRectElement | null)[]>([]);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const shell = shellRef.current;
    const visual = visualRef.current;
    if (!shell || !visual) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = () => window.innerWidth < 800;

    const target = { x: -1, y: -1 };
    const lerped = { x: -1, y: -1 };
    let active = false;
    let lastAuto = 0;
    let raf = 0;
    let last = performance.now();
    let leaveTimer = 0;
    let leaving = false;

    function hardReset() {
      target.x = -1;
      target.y = -1;
      lerped.x = -1;
      lerped.y = -1;
      shell!.style.setProperty("--wm-x", "-500px");
      shell!.style.setProperty("--wm-y", "-500px");
      if (triRef.current) {
        triRef.current.setAttribute("points", "");
      }
      sqRefs.current.forEach((sq) => {
        if (!sq) return;
        sq.setAttribute("x", "-100");
        sq.setAttribute("y", "-100");
      });
      markerRefs.current.forEach((m) => {
        if (!m) return;
        m.textContent = "";
      });
    }

    /** Soft leave — CSS fades overlay/dots; lerp mask off-screen */
    function beginLeave() {
      if (!active && !shell!.dataset.hover && !leaving) return;
      active = false;
      delete shell!.dataset.hover;
      leaving = true;
      // Carry mask smoothly off-screen instead of freezing then jumping
      target.x = 0.5;
      target.y = 2.5;
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => {
        leaving = false;
        if (!active) hardReset();
      }, LEAVE_RESET_MS);
    }

    function onPointerMove(e: PointerEvent) {
      // Map against the visual glyph box so spotlight aligns with letters.
      // Allow uy > 1 (cursor above glyphs, still inside shell / near dashed line).
      const rect = visual!.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      const ux = (e.clientX - rect.left) / rect.width;
      const uy = 1 - (e.clientY - rect.top) / rect.height;

      // Still inside expanded shell horizontally with a small edge pad
      const shellRect = shell!.getBoundingClientRect();
      const inShell =
        e.clientX >= shellRect.left &&
        e.clientX <= shellRect.right &&
        e.clientY >= shellRect.top &&
        e.clientY <= shellRect.bottom;

      if (!inShell) {
        beginLeave();
        return;
      }

      window.clearTimeout(leaveTimer);
      leaving = false;

      if (!active) {
        active = true;
        shell!.dataset.hover = "true";
        // Seed lerp near cursor for less jump-in
        lerped.x = Math.min(1.15, Math.max(-0.15, ux));
        lerped.y = uy;
      }

      // Full L/R of visual (and shell is full zone width). Allow slight
      // overshoot so edge cells stay reachable.
      target.x = Math.min(1.12, Math.max(-0.12, ux));
      // Do NOT clamp y — above the wordmark (uy > 1) keeps shapes tracking up
      target.y = uy;
    }

    function onPointerLeave() {
      beginLeave();
    }

    shell.addEventListener("pointermove", onPointerMove);
    shell.addEventListener("pointerleave", onPointerLeave);
    shell.addEventListener("pointercancel", onPointerLeave);

    function frame(now: number) {
      const dt = Math.min(now - last, 64);
      last = now;

      if (isMobile()) {
        target.x += dt * 0.001 * 0.5;
        if (target.x > 1.5) {
          target.x = -0.5;
          lerped.x = -0.5;
        }
        target.y = 0.15;
        if (!active) {
          active = true;
          shell!.dataset.hover = "true";
        }
      }

      // Keep animating during leave so mask exits smoothly (no frozen-then-jump)
      const hovering = active || shell!.dataset.hover === "true" || leaving;
      if (!hovering && !isMobile()) {
        raf = requestAnimationFrame(frame);
        return;
      }

      if (active || isMobile() || leaving) {
        const speed = leaving ? 12 : 7;
        lerped.x += (target.x - lerped.x) * Math.min(1, dt * 0.001 * speed);
        lerped.y += (target.y - lerped.y) * Math.min(1, dt * 0.001 * speed);
      }

      const cell = isMobile() ? CELL_MOBILE : CELL_DESKTOP;
      const rect = visual!.getBoundingClientRect();
      const aspect = rect.width / rect.height || 1;

      // Spotlight on the visual (letters). y may be negative when cursor above.
      shell!.style.setProperty("--wm-x", `${lerped.x * rect.width}px`);
      shell!.style.setProperty("--wm-y", `${(1 - lerped.y) * rect.height}px`);

      if (!isMobile() || now - lastAuto > 200) {
        lastAuto = now;
        const pts = nearestGridPoints(
          lerped.x * aspect,
          lerped.y,
          cell.w,
          cell.h
        );
        const t = now * 0.0013;
        const tri: string[] = [];

        pts.forEach((p, i) => {
          const st = Math.round(p.cx / cell.w - 0.5);
          const ot = Math.round(p.cy / cell.h - 0.5);
          const h1 = fract(Math.sin(st * 127.1 + ot * 311.7) * 43758.5453);
          const h2 = fract(Math.sin(st * 269.5 + ot * 183.3) * 43758.5453);
          const dx = p.cx + 0.08 * cell.w * Math.sin(t + h1 * 6.2831);
          const dy = p.cy + 0.04 * cell.h * Math.sin(t * 1.3 + h2 * 6.2831);

          const fx = dx / aspect;
          const fy = dy;
          const labelX = Math.round(Math.min(100, Math.max(0, fx * 100)));
          const labelY = Math.round(Math.min(120, Math.max(0, fy * 100)));

          // ref marker: 0.6 → 0 between y 30% → 80% (fades toward TOP)
          const markerOp =
            labelY <= 30
              ? MARKER_OPACITY_MAX
              : labelY >= 80
                ? 0
                : MARKER_OPACITY_MAX * (1 - (labelY - 30) / 50);

          const marker = markerRefs.current[i];
          if (marker) {
            marker.style.transform = `translate(${fx * rect.width}px, ${(1 - fy) * rect.height}px)`;
            marker.style.opacity = String(active || isMobile() ? markerOp : 0);
            marker.textContent = `${labelX}, ${Math.min(100, labelY)}`;
          }

          const px = fx * 1440;
          const py = (1 - fy) * 269;
          tri.push(`${px},${py}`);

          const sq = sqRefs.current[i];
          if (sq) {
            const half = isMobile() ? SQUARE_HALF_PX / 2 : SQUARE_HALF_PX;
            sq.setAttribute("x", String(px - half));
            sq.setAttribute("y", String(py - half));
            sq.setAttribute("width", String(half * 2));
            sq.setAttribute("height", String(half * 2));
            // Full α until within TOP_EDGE_FADE_PX of the top edge only.
            const distFromTop = (1 - fy) * rect.height;
            const topFade =
              distFromTop >= TOP_EDGE_FADE_PX
                ? 1
                : Math.max(0, distFromTop / TOP_EDGE_FADE_PX);
            sq.style.opacity = String(
              active || isMobile() ? GEOMETRY_ALPHA * topFade : 0
            );
          }
        });

        if (triRef.current) {
          triRef.current.setAttribute("points", tri.join(" "));
          const midY = pts.reduce((a, p) => a + p.cy, 0) / pts.length;
          const distFromTop = (1 - midY) * rect.height;
          const topFade =
            distFromTop >= TOP_EDGE_FADE_PX
              ? 1
              : Math.max(0, distFromTop / TOP_EDGE_FADE_PX);
          triRef.current.style.opacity = String(
            active || isMobile() ? GEOMETRY_ALPHA * topFade : 0
          );
        }
      }

      raf = requestAnimationFrame(frame);
    }

    if (!reduced) {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(leaveTimer);
      shell.removeEventListener("pointermove", onPointerMove);
      shell.removeEventListener("pointerleave", onPointerLeave);
      shell.removeEventListener("pointercancel", onPointerLeave);
    };
  }, []);

  return (
    <div className={styles.shell} ref={shellRef} aria-hidden>
      {/* Letter stack — clipped glyph canvas */}
      <div className={styles.visual} ref={visualRef}>
        <svg
          className={`${styles.wordmark} ${styles.solid}`}
          viewBox="0 0 1440 269"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="ckWmFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3fde6" />
              <stop offset="38%" stopColor="#b9ec8a" />
              <stop offset="62%" stopColor="#4d9e12" />
              <stop offset="82%" stopColor="#123a08" />
              <stop offset="100%" stopColor="#010300" />
            </linearGradient>

            <linearGradient id="ckWmFadeSharp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="52%" stopColor="#fff" />
              <stop offset="68%" stopColor="#999" />
              <stop offset="78%" stopColor="#000" />
            </linearGradient>

            <linearGradient id="ckWmFadeBlur1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="48%" stopColor="#000" />
              <stop offset="60%" stopColor="#fff" />
              <stop offset="78%" stopColor="#fff" />
              <stop offset="90%" stopColor="#000" />
            </linearGradient>

            <linearGradient id="ckWmFadeBlur2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="62%" stopColor="#000" />
              <stop offset="74%" stopColor="#aaa" />
              <stop offset="86%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>

            <linearGradient id="ckWmBottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="62%" stopColor="#fff" />
              <stop offset="82%" stopColor="#aaa" />
              <stop offset="94%" stopColor="#333" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>

            <filter id="ckWmBlur1" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
            <filter id="ckWmBlur2" x="-14%" y="-40%" width="128%" height="180%">
              <feGaussianBlur stdDeviation="7" />
            </filter>

            <mask id="ckWmMaskSharp">
              <rect width="1440" height="269" fill="url(#ckWmFadeSharp)" />
            </mask>
            <mask id="ckWmMaskBlur1">
              <rect width="1440" height="269" fill="url(#ckWmFadeBlur1)" />
            </mask>
            <mask id="ckWmMaskBlur2">
              <rect width="1440" height="269" fill="url(#ckWmFadeBlur2)" />
            </mask>
            <mask id="ckWmMaskBottom">
              <rect width="1440" height="269" fill="url(#ckWmBottomFade)" />
            </mask>
          </defs>

          <g mask="url(#ckWmMaskBottom)">
            <text
              className={styles.wmText}
              x="720"
              y="248"
              textAnchor="middle"
              fill="url(#ckWmFill)"
              filter="url(#ckWmBlur2)"
              mask="url(#ckWmMaskBlur2)"
            >
              CultX
            </text>
            <text
              className={styles.wmText}
              x="720"
              y="248"
              textAnchor="middle"
              fill="url(#ckWmFill)"
              filter="url(#ckWmBlur1)"
              mask="url(#ckWmMaskBlur1)"
            >
              CultX
            </text>
            <text
              className={styles.wmText}
              x="720"
              y="248"
              textAnchor="middle"
              fill="url(#ckWmFill)"
              mask="url(#ckWmMaskSharp)"
            >
              CultX
            </text>
          </g>
        </svg>

        <svg
          className={`${styles.wordmark} ${styles.dotted}`}
          viewBox="0 0 1440 269"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <text
            className={`${styles.wmText} ${styles.wmDots}`}
            x="720"
            y="248"
            textAnchor="middle"
          >
            CultX
          </text>
        </svg>
      </div>

      {/* Geometry — full L/R, soft top fade into dashed line */}
      <svg
        className={styles.overlay}
        viewBox="0 0 1440 269"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polygon ref={triRef} className={styles.tri} points="" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            ref={(el) => {
              sqRefs.current[i] = el;
            }}
            className={styles.sq}
            x="-100"
            y="-100"
            width="70"
            height="70"
          />
        ))}
      </svg>

      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            markerRefs.current[i] = el;
          }}
          className={styles.marker}
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
}
