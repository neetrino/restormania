"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n/LocaleProvider";
import { emphasizeNames, HOME_COPY } from "./home-copy";
import styles from "./IntroSection.module.css";

export function IntroSection() {
  const { locale, t } = useTranslation();
  const copy = HOME_COPY[locale];

  return (
    <section className={styles.intro} id="top" aria-labelledby="intro-title">
      <div className={styles.wordmark}>
        <Image
          className={styles.barTop}
          src="/assets/home/hero/bar-top.svg"
          alt=""
          width={469}
          height={201}
          priority
        />
        <Image
          className={styles.barBottom}
          src="/assets/home/hero/bar-bottom.svg"
          alt=""
          width={392}
          height={144}
          priority
        />
        <Image
          className={styles.letters}
          src="/assets/home/hero/letters.svg"
          alt="Restormania"
          width={518}
          height={267}
          priority
        />
      </div>
      <p className={styles.lead}>
        <strong>Restormania</strong>
        {copy.leadRest}
      </p>
      <div className={styles.bio} id="intro-title">
        {emphasizeNames(t.founder.bio).map((part, index) =>
          part.bold ? (
            <strong key={`${part.text}-${index}`}>{part.text}</strong>
          ) : (
            <span key={`${index}-${part.text.slice(0, 12)}`}>{part.text}</span>
          ),
        )}
      </div>
      <figure className={styles.portrait}>
        <Image
          className={styles.photo}
          src="/assets/home/founder-portrait.png"
          alt={t.founder.photoAlt}
          fill
          sizes="(max-width: 743px) 100vw, 650px"
          priority
        />
      </figure>
    </section>
  );
}
