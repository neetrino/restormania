"use client";

import Image from "next/image";
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
      <div className={styles.row}>
        <figure className={styles.portrait}>
          <Image
            src="/assets/founder.png"
            alt={t.founder.photoAlt}
            width={344}
            height={488}
            className={styles.photo}
            priority
          />
        </figure>

        <article className={styles.card}>
          <p className={styles.bio}>{t.founder.bio}</p>
        </article>

        <div className={styles.stack} aria-hidden="true">
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
        </div>
      </div>
    </section>
  );
}
