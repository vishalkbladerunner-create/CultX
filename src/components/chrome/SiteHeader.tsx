"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/platform", label: "Platform" },
  { href: "/pillars", label: "Pillars" },
  { href: "/monetize", label: "Monetize" },
  { href: "/stars", label: "Star IPs" },
  { href: "/about", label: "AI Center" },
  { href: "/faq", label: "FAQ" },
];

/* M13 — logo stroke-draw plays once per JS session: on a fresh load the
   SSR markup carries data-draw and the CSS keyframes run; client-side
   remounts see the flag and render the static final state instead. */
let logoDrawnThisSession = false;

/**
 * Site header — reference L07 / site-header architecture:
 *   logo left · segmented secondary nav right (routes to sub-pages)
 *   progressive top-blur so scrolled content softens under the bar
 *   translucent frosted pills that read the wash behind them
 *
 * Backbone is shared across home + every sub-page via root layout.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [drawLogo] = useState(() => !logoDrawnThisSession);

  useEffect(() => {
    logoDrawnThisSession = true;
  }, []);

  function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      e.preventDefault();
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo(0, 0);
    }
    setOpen(false);
  }

  return (
    <header className={styles.header} data-site-header data-theme="dark">
      <div className={styles.topBlur} aria-hidden>
        {(
          [
            {
              blur: 1,
              mask: "linear-gradient(to bottom, #000 0%, #000 40%, transparent 75%)",
            },
            {
              blur: 2,
              mask: "linear-gradient(to bottom, #000 0%, #000 28%, transparent 58%)",
            },
            {
              blur: 4,
              mask: "linear-gradient(to bottom, #000 0%, #000 18%, transparent 45%)",
            },
            {
              blur: 8,
              mask: "linear-gradient(to bottom, #000 0%, #000 12%, transparent 35%)",
            },
          ] as const
        ).map((layer, i) => (
          <div
            key={layer.blur}
            className={styles.blurLayer}
            style={{
              zIndex: i + 1,
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: layer.mask,
              WebkitMaskImage: layer.mask,
            }}
          />
        ))}
      </div>

      <nav className={styles.navbar} aria-label="Primary">
        <Link
          href="/"
          className={styles.logo}
          onClick={goHome}
          aria-label="CultX home"
        >
          <svg
            className={styles.logoSvg}
            viewBox="0 -17 72 22"
            data-draw={drawLogo || undefined}
            aria-hidden
          >
            <defs>
              <linearGradient
                id="ck-header-logo-x"
                x1="0"
                y1="0"
                x2="1"
                y2="0.18"
              >
                <stop offset="0" style={{ stopColor: "var(--ck-green-300)" }} />
                <stop
                  offset="0.55"
                  style={{ stopColor: "var(--ck-green-100)" }}
                />
                <stop offset="1" style={{ stopColor: "var(--ck-chartreuse)" }} />
              </linearGradient>
            </defs>
            <text className={styles.logoText} x="0" y="0">
              Cult<tspan className={styles.logoX}>X</tspan>
            </text>
          </svg>
        </Link>

        <ul className={styles.menu}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.pill}
                  data-active={active || undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.pillLabel}>
                    <span>{item.label}</span>
                    <span aria-hidden>{item.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.menuLines} data-open={open || undefined} />
        </button>
      </nav>

      <div className={styles.mobileMenu} data-open={open || undefined}>
        <nav aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
