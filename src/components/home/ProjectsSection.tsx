"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp, slideFromLeft, slideFromRight } from "@/components/motion/presets";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import { KAMANCHA_URL, PIDEH_URL } from "@/lib/brand-links";
import { HOME_COPY, type HomeCopy } from "./home-copy";
import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  const { locale, t } = useTranslation();
  const copy = HOME_COPY[locale];

  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-title">
      <Reveal as="header" className={styles.heading} variants={fadeUp}>
        <h2 className={styles.title} id="projects-title">
          <span className={styles.titleLine}>{copy.projectsLead}</span>
          {locale === "hy" ? (
            <Image
              className={styles.badge}
              src="/assets/home/projects-badge.svg"
              alt={copy.projectsBadge}
              width={551}
              height={78}
            />
          ) : (
            <span className={styles.badgeText}>{copy.projectsBadge}</span>
          )}
        </h2>
        <p className={styles.note}>{copy.projectsNote}</p>
      </Reveal>
      <div className={styles.cardsRail}>
        <div className={styles.rowEqual}>
          <TumanyanCard copy={copy} more={t.brands.more} />
          <SaryanCard copy={copy} more={t.brands.more} />
        </div>
        <div className={styles.rowSplit}>
          <FactoryCard copy={copy} more={t.brands.more} />
          <PidehCard copy={copy} more={t.brands.more} />
        </div>
      </div>
    </section>
  );
}

function TumanyanCard({ copy, more }: { copy: HomeCopy; more: string }) {
  return (
    <Reveal as="article" className={styles.tumanyan} variants={slideFromLeft}>
      <div className={styles.photoFrame}>
        <Image
          className={styles.cover}
          src="/assets/home/tumanyan.png"
          alt=""
          width={640}
          height={716}
        />
        <span className={styles.mobilePill}>{copy.tumanyan}</span>
      </div>
      <span className={styles.placePill}>{copy.tumanyan}</span>
      <div className={styles.tumanyanPanel}>
        <p>{copy.tumanyanBody}</p>
        <PillLink href={KAMANCHA_URL} variant="kamancha" size="md" className={styles.tumanyanCta}>
          {more}
        </PillLink>
      </div>
      <p className={styles.mobileCaption}>{copy.tumanyanBody}</p>
      <PillLink href={KAMANCHA_URL} variant="solid" size="md" className={styles.mobileCta}>
        {more}
      </PillLink>
    </Reveal>
  );
}

function SaryanCard({ copy, more }: { copy: HomeCopy; more: string }) {
  return (
    <Reveal as="article" className={styles.saryan} variants={slideFromRight}>
      <div className={styles.saryanCopy}>
        <h3 className={styles.cardTitle}>{copy.saryanTitle}</h3>
        <p>{copy.saryanBody}</p>
      </div>
      <PillLink href={KAMANCHA_URL} variant="kamancha" size="md" className={styles.darkPill}>
        {more}
      </PillLink>
      <div className={styles.photoFrame}>
        <Image
          className={styles.saryanArt}
          src="/assets/home/saryan.png"
          alt=""
          width={650}
          height={253}
        />
        <span className={styles.mobilePill}>{copy.saryanTitle}</span>
      </div>
      <p className={styles.mobileCaption}>{copy.saryanBody}</p>
      <PillLink href={KAMANCHA_URL} variant="solid" size="md" className={styles.mobileCta}>
        {more}
      </PillLink>
    </Reveal>
  );
}

function FactoryCard({ copy, more }: { copy: HomeCopy; more: string }) {
  return (
    <Reveal as="article" className={styles.factory} variants={slideFromLeft}>
      <div className={styles.factoryCopy}>
        <h3 className={`${styles.cardTitle} ${styles.lightTitle}`}>{copy.factoryTitle}</h3>
        <p>{copy.factoryBody}</p>
        <a className={styles.phone} href="tel:+37495711771">
          <Image src="/assets/home/phone.svg" alt="" width={26} height={26} />
          <span>{copy.factoryPhone}</span>
        </a>
      </div>
      <div className={styles.factoryMedia}>
        <Image
          className={styles.factoryPhoto}
          src="/assets/home/factory-food.png"
          alt=""
          fill
          sizes="(max-width: 743px) 100vw, 420px"
        />
        <span className={styles.mobilePill}>{copy.factoryTitle}</span>
      </div>
      <PillLink href={KAMANCHA_URL} variant="solid" size="md" className={styles.cardCta}>
        {more}
      </PillLink>
      <p className={styles.mobileCaption}>{copy.factoryBody}</p>
      <PillLink href={KAMANCHA_URL} variant="solid" size="md" className={styles.mobileCta}>
        {more}
      </PillLink>
    </Reveal>
  );
}

function PidehCard({ copy, more }: { copy: HomeCopy; more: string }) {
  return (
    <Reveal as="article" className={styles.pideh} variants={slideFromRight}>
      <div className={styles.pidehMedia}>
        <div className={styles.pidehSpin}>
          <Image
            className={styles.pidehPhoto}
            src="/assets/home/pideh-combo.png"
            alt=""
            fill
            sizes="483px"
          />
        </div>
        <span className={styles.mobilePill}>{copy.pidehTitle}</span>
      </div>
      <h3 className={`${styles.cardTitle} ${styles.lightTitle}`}>{copy.pidehTitle}</h3>
      <p className={styles.pidehBody}>{copy.pidehBody}</p>
      <PillLink href={PIDEH_URL} variant="solid" size="md" className={styles.cardCta}>
        {more}
      </PillLink>
      <p className={styles.mobileCaption}>{copy.pidehBody}</p>
      <PillLink href={PIDEH_URL} variant="solid" size="md" className={styles.mobileCta}>
        {more}
      </PillLink>
    </Reveal>
  );
}
