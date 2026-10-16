"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { easeOutExpo } from "@/components/motion/presets";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import { KAMANCHA_URL } from "@/lib/brand-links";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Header.module.css";

const SCROLL_THRESHOLD_PX = 12;

function scrollToPageTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", "#top");
}

function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const next = window.scrollY > threshold;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [threshold]);

  return scrolled;
}

export function Header() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const scrolled = useScrolled(SCROLL_THRESHOLD_PX);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className={styles.header}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.7, ease: easeOutExpo, delay: 0.05 }
      }
    >
      <div className={`page-canvas-scale-wrap ${styles.canvasScaleWrap}`}>
        <div className={`${styles.shell} ${scrolled ? styles.shellScrolled : ""}`}>
          <div className={styles.center}>
            <a
              className={styles.logo}
              href="#top"
              aria-label={t.nav.main}
              onClick={scrollToPageTop}
            >
              <Image
                className={styles.logoMark}
                src="/assets/home/header/mark-word.svg"
                alt=""
                width={75}
                height={48}
                priority
              />
            </a>
            <div className={styles.brandActions}>
              <PillLink
                href="#news"
                variant="solid"
                size="sm"
                className={`${styles.navPill} ${styles.projectsPill}`}
              >
                {t.nav.ourProjects}
              </PillLink>
              <PillLink
                href={KAMANCHA_URL}
                variant="solid"
                size="sm"
                className={`${styles.navPill} ${scrolled ? styles.kamanchaScrolled : ""}`}
              >
                {t.nav.kamancha}
              </PillLink>
            </div>
          </div>
          <div className={styles.actions}>
            <LanguageSwitcher />
          </div>
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Image src="/assets/home/header/menu.svg" alt="" width={41} height={41} />
          </button>
        </div>
        {menuOpen ? (
          <nav className={styles.mobileNav} id="mobile-nav" onClick={() => setMenuOpen(false)}>
            <PillLink
              href="#news"
              variant="solid"
              size="sm"
              className={`${styles.navPill} ${styles.projectsPill}`}
            >
              {t.nav.ourProjects}
            </PillLink>
            <PillLink
              href={KAMANCHA_URL}
              variant="solid"
              size="sm"
              className={`${styles.navPill} ${styles.kamanchaScrolled}`}
            >
              {t.nav.kamancha}
            </PillLink>
            <div onClick={(event) => event.stopPropagation()}>
              <LanguageSwitcher />
            </div>
          </nav>
        ) : null}
      </div>
    </motion.header>
  );
}
