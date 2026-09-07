"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <h2 className={styles.srOnly} id="about-title">
        {t.about.title}
      </h2>
      <div className={styles.grid}>
        <div className={styles.visual}>
          <Image
            src="/assets/about-logo.png"
            alt="Restormania"
            width={515}
            height={394}
            className={styles.logo}
            priority
          />
        </div>
        <div className={styles.copy}>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.text}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
