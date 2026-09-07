"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Header.module.css";

const SCROLL_THRESHOLD_PX = 12;

function scrollToPageTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", "#top");
}

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#founder", label: t.nav.founder },
    { href: "#top", label: t.nav.projects },
  ] as const;

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const next = window.scrollY > SCROLL_THRESHOLD_PX;
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
  }, []);

  return (
    <header className={styles.header}>
      <div
        className={`${styles.shell} ${scrolled ? styles.shellScrolled : ""}`}
      >
        <a
          className={styles.logo}
          href="#top"
          aria-label="Restormania"
          onClick={scrollToPageTop}
        >
          <Image
            src="/assets/header-logo-pill.png"
            alt=""
            width={86}
            height={56}
            priority
          />
        </a>

        <nav className={styles.nav} aria-label={t.nav.main}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={styles.navLink}
              href={link.href}
              onClick={link.href === "#top" ? scrollToPageTop : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <PillLink href="#projects" variant="pideh" size="sm">
            Pideh
          </PillLink>
          <PillLink href="#projects" variant="kamancha" size="sm">
            Kamancha
          </PillLink>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
