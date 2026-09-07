"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./Hero.module.css";

const titleTransition = {
  duration: 1.15,
  ease: [0.16, 1, 0.3, 1] as const,
  delay: 0.06,
};

const subtitleTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as const,
  delay: 0.38,
};

export function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const titleInitial = prefersReducedMotion
    ? false
    : { opacity: 0, y: 40, scale: 0.96 };
  const subtitleInitial = prefersReducedMotion
    ? false
    : { opacity: 0, y: 24, filter: "blur(6px)" };

  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <motion.h1
        className={styles.restormania}
        id="hero-title"
        initial={titleInitial}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : titleTransition}
      >
        RESTORMANIA
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        key={t.hero.subtitle}
        initial={subtitleInitial}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={
          prefersReducedMotion ? { duration: 0 } : subtitleTransition
        }
      >
        {t.hero.subtitle}
      </motion.p>
    </section>
  );
}
