"use client";

import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { fadeUp, slideFromRight } from "@/components/motion/presets";
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
        <Reveal as="article" className={styles.card} variants={fadeUp} child>
          <p className={styles.bio}>{t.founder.bio}</p>
        </Reveal>

        <Reveal
          as="figure"
          className={styles.portrait}
          variants={slideFromRight}
          child
        >
          <Image
            src="/assets/founder.png"
            alt={t.founder.photoAlt}
            width={628}
            height={488}
            sizes="(max-width: 743px) 100vw, 628px"
            className={styles.photo}
            priority
          />
        </Reveal>
      </RevealGroup>
    </section>
  );
}
