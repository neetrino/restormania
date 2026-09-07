"use client";

import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { fadeIn, fadeUp } from "@/components/motion/presets";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Facebook",
    src: "/assets/social-facebook.svg",
    width: 24,
    height: 24,
  },
  {
    href: "https://www.instagram.com/restormania/",
    label: "Instagram",
    src: "/assets/social-instagram.svg",
    width: 23,
    height: 23,
  },
  {
    href: "#",
    label: "Telegram",
    src: "/assets/social-telegram.svg",
    width: 26,
    height: 23,
  },
  {
    href: "#",
    label: "WhatsApp",
    src: "/assets/social-whatsapp.svg",
    width: 26,
    height: 26,
  },
] as const;

export function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#founder", label: t.nav.founder },
    { href: "#top", label: t.nav.projects },
  ] as const;

  return (
    <footer className={styles.footer} id="contact">
      <RevealGroup className={styles.inner} as="div">
        <Reveal className={styles.top} variants={fadeUp} child>
          <h2 className={styles.headline}>{t.footer.headline}</h2>

          <div className={styles.columns}>
            <div className={styles.colStart}>
              <h3 className={styles.colTitle}>{t.footer.navigation}</h3>
              <ul className={styles.list}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.colEnd}>
              <h3 className={styles.colTitle}>{t.footer.contact}</h3>
              <address className={styles.address}>
                <p>{t.footer.address}</p>
                <p>
                  <a href="tel:+37410123456">+374 10 123 456</a>
                </p>
                <p>
                  <a href="mailto:info@kamancha.am">info@kamancha.am</a>
                </p>
                <p className={styles.hours}>{t.footer.hours}</p>
              </address>
            </div>
          </div>
        </Reveal>

        <Reveal className={styles.social} variants={fadeIn} child>
          {SOCIAL_LINKS.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.label}
                className={styles.socialLink}
                href={item.href}
                aria-label={item.label}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Image
                  className={styles.socialIcon}
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                />
              </a>
            );
          })}
        </Reveal>

        <Reveal as="p" className={styles.copyright} variants={fadeUp} child>
          {t.footer.copyright}{" "}
          <a
            className={styles.credit}
            href="https://neetrino.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neetrino IT Company
          </a>
        </Reveal>
      </RevealGroup>
    </footer>
  );
}
