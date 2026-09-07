"use client";

import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { fadeScale, fadeUp } from "@/components/motion/presets";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <h2 className={styles.srOnly} id="about-title">
        {t.about.title}
      </h2>
      <RevealGroup className={styles.grid}>
        <Reveal className={styles.visual} variants={fadeScale} child>
          <Image
            src="/assets/about-logo.png"
            alt="Restormania"
            width={515}
            height={394}
            className={styles.logo}
            priority
          />
        </Reveal>
        <Reveal className={styles.copy} variants={fadeUp} child>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.text}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </RevealGroup>
    </section>
  );
}
