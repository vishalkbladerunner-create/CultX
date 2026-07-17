"use client";

import { useState } from "react";
import styles from "./WaitlistForm.module.css";

/**
 * Waitlist strip — reference footer newsletter form (L12):
 * transparent 19px input + secondary outline CTA with arrow tile,
 * dashed technical line under the form.
 * Front-end only until the CRM endpoint lands (open decision in AGENTS.md).
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
    >
      {done ? (
        <p className={styles.success} role="status">
          You’re on the list. The legend starts soon.
        </p>
      ) : (
        <>
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className={styles.submit} type="submit">
            <span className={styles.label}>
              <span>Sign Up</span>
              <span aria-hidden>Sign Up</span>
            </span>
            {/* Full-height dual stack inside clipped icon tile (ref .ui-button > .icon) */}
            <span className={styles.iconTile}>
              <span>
                <ArrowRight />
              </span>
              <span aria-hidden>
                <ArrowRight />
              </span>
            </span>
          </button>
        </>
      )}
    </form>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M7.24 12.99L9.22 12.99L14.25 7.86L8.99 2.5L7.22 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M1.26 7.77L14.26 7.81" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
