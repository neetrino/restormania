"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { fadeScale, fadeUp, slideFromRight } from "@/components/motion/presets";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import { emphasizeNames, HOME_COPY } from "./home-copy";
import styles from "./IntroSection.module.css";

export function IntroSection() {
  const { locale, t } = useTranslation();
  const copy = HOME_COPY[locale];

  return (
    <section className={styles.intro} id="top" aria-labelledby="intro-title">
      <div className={styles.heroStack}>
      <Reveal className={styles.wordmark} variants={fadeUp}>
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
      </Reveal>
      <Reveal as="figure" className={styles.portrait} variants={fadeScale}>
        <Image
          className={styles.photo}
          src="/assets/home/founder-portrait.jpg"
          alt={t.founder.photoAlt}
          fill
          sizes="(max-width: 743px) 100vw, 650px"
          priority
        />
      </Reveal>
      </div>
      <Reveal as="p" className={styles.lead} variants={slideFromRight}>
        <strong>Restormania</strong>
        {copy.leadRest}
      </Reveal>
      <PillLink href="#projects" variant="kamancha" size="md" className={styles.more}>
        {t.brands.more}
      </PillLink>
      <Reveal className={styles.bio} id="intro-title" variants={fadeUp}>
        {t.founder.bio.split(/\n\n+/).map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>
            {emphasizeNames(paragraph).map((part, index) =>
              part.bold ? (
                <strong key={`${part.text}-${index}`}>{part.text}</strong>
              ) : (
                <span key={`${index}-${part.text.slice(0, 12)}`}>{part.text}</span>
              ),
            )}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
