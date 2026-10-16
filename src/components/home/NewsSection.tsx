"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp } from "@/components/motion/presets";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import { HOME_COPY } from "./home-copy";
import styles from "./NewsSection.module.css";

const CARD_COUNT = 3;

export function NewsSection() {
  const { locale, t } = useTranslation();
  const copy = HOME_COPY[locale];
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) {
      return;
    }
    const card = node.querySelector("article");
    const distance = card ? card.getBoundingClientRect().width + 24 : 360;
    node.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <section className={styles.section} id="news" aria-labelledby="news-title">
      <Reveal className={styles.heading} variants={fadeUp}>
        <h2 className={styles.title} id="news-title">
          {copy.newsTitle}
        </h2>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            type="button"
            aria-label={copy.newsPrev}
            onClick={() => scrollByCard(-1)}
          >
            <Image src="/assets/home/arrow-prev.svg" alt="" width={56} height={56} />
          </button>
          <button
            className={styles.arrow}
            type="button"
            aria-label={copy.newsNext}
            onClick={() => scrollByCard(1)}
          >
            <Image src="/assets/home/arrow-next.svg" alt="" width={56} height={56} />
          </button>
        </div>
      </Reveal>
      <Reveal className={styles.scroller} variants={fadeUp} ref={scroller}>
        {Array.from({ length: CARD_COUNT }, (_, index) => (
          <article className={styles.card} key={index}>
            <div className={styles.photoWrap}>
              <Image
                className={styles.photo}
                src="/assets/home/news-card.jpg"
                alt=""
                fill
                sizes="240px"
              />
            </div>
            <div className={styles.copy}>
              <h3>{copy.newsCardTitle}</h3>
              <p>{copy.newsCardBody}</p>
              <PillLink href="#news" variant="solid" size="md">
                {t.brands.more}
              </PillLink>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
