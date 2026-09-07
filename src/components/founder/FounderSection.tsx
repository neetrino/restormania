"use client";

import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
} from "@/components/motion/presets";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./FounderSection.module.css";

export function FounderSection() {
  const { t } = useTranslation();

  return (
    <section
      className={styles.section}
      id="founder"
      aria-labelledby="founder-title"
    >
      <h2 className={styles.srOnly} id="founder-title">
        {t.founder.title}
      </h2>
      <RevealGroup className={styles.row}>
        <Reveal as="figure" className={styles.portrait} variants={slideFromLeft} child>
          <Image
            src="/assets/founder.png"
            alt={t.founder.photoAlt}
            width={344}
            height={488}
            className={styles.photo}
            priority
          />
        </Reveal>

        <Reveal as="article" className={styles.card} variants={fadeUp} child>
          <p className={styles.bio}>{t.founder.bio}</p>
        </Reveal>

        <Reveal className={styles.stack} variants={slideFromRight} child aria-hidden="true">
          <figure className={`${styles.portrait} ${styles.stackFront}`}>
            <Image
              src="/assets/founder.png"
              alt=""
              width={344}
              height={488}
              className={styles.photo}
            />
          </figure>
          <figure className={`${styles.portrait} ${styles.stackBack}`}>
            <Image
              src="/assets/founder.png"
              alt=""
              width={344}
              height={488}
              className={styles.photo}
            />
          </figure>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
