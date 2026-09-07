"use client";

import Image from "next/image";
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
    { href: "#about", label: t.footer.about },
    { href: "#projects", label: t.footer.news },
    { href: "#contact", label: t.footer.contactLink },
  ] as const;

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <div className={styles.top}>
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
        </div>

        <div className={styles.social}>
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
        </div>

        <p className={styles.copyright}>
          {t.footer.copyright}{" "}
          <a
            className={styles.credit}
            href="https://neetrino.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neetrino IT Company
          </a>
        </p>
      </div>
    </footer>
  );
}
