"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import { PAGE_CANVAS_MIN_WIDTH } from "@/lib/page-canvas";
import styles from "./BrandBanners.module.css";

const INTRO_DELAY_MS = 420;
const INTRO_DURATION_MS = 1400;
const SCROLL_RANGE_PX = 560;
const LERP = 0.1;

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

function isMobileCanvasWidth(width: number): boolean {
  return width < PAGE_CANVAS_MIN_WIDTH;
}

function ArrowCta({
  href,
  label,
  arrowSrc,
}: {
  href: string;
  label: string;
  arrowSrc: string;
}) {
  return (
    <a className={styles.arrowCta} href={href} aria-label={label}>
      <Image src={arrowSrc} alt="" width={35} height={35} unoptimized />
    </a>
  );
}

export function BrandBanners() {
  const { t } = useTranslation();
  const pidehRef = useRef<HTMLElement>(null);
  const kamanchaRef = useRef<HTMLElement>(null);
  const introRef = useRef(0);
  const retreatTargetRef = useRef(0);
  const retreatCurrentRef = useRef(0);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const apply = () => {
      const pideh = pidehRef.current;
      const kamancha = kamanchaRef.current;
      if (!pideh || !kamancha) {
        return;
      }

      if (reducedRef.current || isMobileCanvasWidth(window.innerWidth)) {
        pideh.style.opacity = "1";
        kamancha.style.opacity = "1";
        pideh.style.transform = "";
        kamancha.style.transform = "";
        return;
      }

      const intro = introRef.current;
      const retreat = retreatCurrentRef.current;
      const rest = -72 + 72 * intro;
      const pidehX = rest * (1 - retreat) + -78 * retreat;
      const kamanchaX = -rest * (1 - retreat) + 78 * retreat;
      const opacity = Math.max(0, intro * (1 - retreat * 0.98));

      pideh.style.opacity = String(opacity);
      kamancha.style.opacity = String(opacity);
      pideh.style.transform = `translate(${pidehX}%, -50%)`;
      kamancha.style.transform = `translate(${kamanchaX}%, -50%)`;
    };

    const schedule = () => {
      if (rafRef.current) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        const target = retreatTargetRef.current;
        const current = retreatCurrentRef.current;
        const next = current + (target - current) * LERP;
        retreatCurrentRef.current =
          Math.abs(target - next) < 0.001 ? target : next;
        apply();
        if (retreatCurrentRef.current !== target) {
          schedule();
        }
      });
    };

    let introRaf = 0;
    let introStart = 0;

    const introTick = (now: number) => {
      if (!introStart) {
        introStart = now;
      }
      const raw = Math.min(1, (now - introStart) / INTRO_DURATION_MS);
      introRef.current = easeOutCubic(raw);
      apply();
      if (raw < 1) {
        introRaf = window.requestAnimationFrame(introTick);
      }
    };

    const introTimer = window.setTimeout(() => {
      if (reducedRef.current || isMobileCanvasWidth(window.innerWidth)) {
        introRef.current = 1;
        apply();
        return;
      }
      introRaf = window.requestAnimationFrame(introTick);
    }, INTRO_DELAY_MS);

    const onScroll = () => {
      if (reducedRef.current || isMobileCanvasWidth(window.innerWidth)) {
        retreatTargetRef.current = 0;
        retreatCurrentRef.current = 0;
        apply();
        return;
      }
      retreatTargetRef.current = Math.min(
        1,
        Math.max(0, window.scrollY / SCROLL_RANGE_PX),
      );
      schedule();
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.clearTimeout(introTimer);
      window.cancelAnimationFrame(introRaf);
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className={styles.section}
      id="projects"
      aria-label={t.brands.projectsLabel}
    >
      <div className={styles.stage}>
        <article ref={pidehRef} className={`${styles.banner} ${styles.pideh}`}>
          <div className={styles.panel}>
            <div className={styles.copy}>
              <Image
                src="/assets/pideh-logo.svg"
                alt="Pideh"
                width={163}
                height={126}
                className={styles.pidehLogo}
                unoptimized
              />
              <PillLink href="#about" size="md" className={styles.moreDesktop}>
                {t.brands.more}
              </PillLink>
              <ArrowCta
                href="#about"
                label={t.brands.more}
                arrowSrc="/assets/arrow-up-right.svg"
              />
            </div>
          </div>
          <div className={`${styles.media} ${styles.pidehMedia}`}>
            <Image
              src="/assets/pideh-food.png"
              alt=""
              width={510}
              height={240}
              className={`${styles.pidehImage} ${styles.pidehImageDesktop}`}
              priority
            />
            <Image
              src="/assets/pideh-food-mobile.png"
              alt=""
              width={1120}
              height={1405}
              className={`${styles.pidehImage} ${styles.pidehImageMobile}`}
              priority
            />
          </div>
        </article>

        <article
          ref={kamanchaRef}
          className={`${styles.banner} ${styles.kamancha}`}
        >
          <div className={`${styles.media} ${styles.kamanchaMedia}`}>
            <Image
              src="/assets/kamancha-instrument.png"
              alt=""
              width={490}
              height={415}
              className={`${styles.kamanchaImage} ${styles.kamanchaImageDesktop}`}
              priority
            />
            <Image
              src="/assets/kamancha-tray.png"
              alt=""
              width={819}
              height={1024}
              className={`${styles.kamanchaImage} ${styles.kamanchaImageMobile}`}
              priority
            />
          </div>
          <div className={styles.panel}>
            <div className={styles.copy}>
              <Image
                src="/assets/kamancha-logo.svg"
                alt="Kamancha"
                width={230}
                height={110}
                className={`${styles.kamanchaLogo} ${styles.kamanchaLogoInFlow}`}
                unoptimized
              />
              <PillLink href="#about" size="md" className={styles.moreDesktop}>
                {t.brands.more}
              </PillLink>
            </div>
          </div>
          <Image
            src="/assets/kamancha-logo.svg"
            alt=""
            width={230}
            height={110}
            className={`${styles.kamanchaLogo} ${styles.kamanchaLogoOnTop}`}
            unoptimized
            aria-hidden
          />
          <ArrowCta
            href="#about"
            label={t.brands.more}
            arrowSrc="/assets/arrow-up-right-kamancha.svg"
          />
        </article>
      </div>

      <div className={styles.brandFilters}>
        <PillLink href="#projects" size="md">
          Pideh
        </PillLink>
        <PillLink href="#projects" size="md">
          Kamancha
        </PillLink>
      </div>
    </section>
  );
}
