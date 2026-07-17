import { DashedLine } from "@/components/chrome/DashedLine";
import { UIButton } from "@/components/chrome/UIButton";
import styles from "./kit.module.css";

export type HeroCta = { href: string; label: string };

export type CtaBandProps = {
  title: string;
  body: string;
  primary: HeroCta;
  secondary?: HeroCta;
};

export function CtaBand({ title, body, primary, secondary }: CtaBandProps) {
  return (
    <section className={styles.ctaBand} data-theme-section="dark">
      <div className={styles.layout}>
        <div className={`${styles.ctaInner} ${styles.hasPinTopLeft} ${styles.hasPinBottomRight}`}>
          <DashedLine className={styles.lineTop} />
          <h2 className={styles.h3} data-reveal>
            {title}
          </h2>
          <p className={styles.ctaBody} data-reveal>
            {body}
          </p>
          <div className={styles.heroCtas} data-reveal>
            <UIButton href={primary.href} label={primary.label} />
            {secondary && (
              <UIButton
                href={secondary.href}
                label={secondary.label}
                variant="secondary"
                withIcon={false}
              />
            )}
          </div>
          <DashedLine className={styles.lineBottom} />
        </div>
      </div>
    </section>
  );
}
