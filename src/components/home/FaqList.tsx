"use client";

import { useState } from "react";
import styles from "./FaqList.module.css";

export type FaqItem = { q: string; a: string };

/**
 * FAQ accordion — reference M17 behavior, rebuilt dependency-free:
 * single-open list; opening animates body height (CSS grid rows 0fr→1fr)
 * and fades the body; closing reverses. Reduced-motion = instant.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <ul className={styles.list}>
      {items.map((item, i) => {
        const open = i === openIndex;
        return (
          <li key={item.q} className={styles.item} data-open={open || undefined}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
            >
              <span className={styles.index}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.qText}>{item.q}</span>
              <span className={styles.toggle} aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1V13M1 7H13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
              </span>
            </button>
            <div className={styles.bodyWrap}>
              <div className={styles.body}>
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
