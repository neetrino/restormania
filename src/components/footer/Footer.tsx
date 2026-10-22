"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { fadeUp } from "@/components/motion/presets";
import { OpenPositionsButton } from "@/components/careers/OpenPositionsButton";
import { useTranslation } from "@/i18n/LocaleProvider";
import { HOME_COPY } from "@/components/home/home-copy";
import styles from "./Footer.module.css";

const STORE_LINKS = [
  {
    href: "#",
    label: "Download on the App Store",
    src: "/assets/badge-app-store.svg",
    width: 120,
    height: 40,
  },
  {
    href: "#",
    label: "Get it on Google Play",
    src: "/assets/badge-google-play.svg",
    width: 135,
    height: 40,
  },
] as const;

const BRAND_BLOCKS = [{ name: "Kamancha" }, { name: "Pideh" }] as const;

/** Set to true when Kamancha and Pideh app-store badges should show in the footer. */
const SHOW_APP_STORES = false;

const CONTACT_ICONS = {
  pin: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  phone: "M7 4h3l1 4-2 1a11 11 0 0 0 6 6l1-2 4 1v3a2 2 0 0 1-2 2A15 15 0 0 1 5 6a2 2 0 0 1 2-2z",
  mail: "M4 7h16v10H4V7zm0 0 8 6 8-6",
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
} as const;

function ContactLine({
  icon,
  children,
}: {
  icon: keyof typeof CONTACT_ICONS;
  children: ReactNode;
}) {
  return (
    <p className={styles.contactLine}>
      <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path d={CONTACT_ICONS[icon]} />
      </svg>
      <span>{children}</span>
    </p>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/aregface",
    label: "Facebook",
    src: "/assets/social-facebook.svg",
    width: 26,
    height: 26,
  },
  {
    href: "https://www.instagram.com/restormania/",
    label: "Instagram",
    src: "/assets/social-instagram.svg",
    width: 26,
    height: 26,
  },
  {
    href: "https://t.me/restormania",
    label: "Telegram",
    src: "/assets/social-telegram.svg",
    width: 26,
    height: 26,
  },
  {
    href: "https://wa.me/37495711700",
    label: "WhatsApp",
    src: "/assets/social-whatsapp.svg",
    width: 26,
    height: 26,
  },
] as const;

function SocialLinks({ className }: { className: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.label}
          className={styles.socialLink}
          href={item.href}
          aria-label={item.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles.socialIcon}
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
          />
        </a>
      ))}
    </div>
  );
}

function StoreButtons({ brand }: { brand: string }) {
  return (
    <div className={styles.stores}>
      {STORE_LINKS.map((item) => (
        <a
          key={`${brand}-${item.label}`}
          className={styles.storeLink}
          href={item.href}
          aria-label={`${brand} — ${item.label}`}
        >
          <Image
            className={styles.storeBadge}
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
            unoptimized
          />
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const { locale, t } = useTranslation();
  const copy = HOME_COPY[locale];

  return (
    <footer className={styles.footer} id="contact">
      <RevealGroup className={styles.inner} as="div">
        <Reveal className={styles.logoWrap} variants={fadeUp} child>
          <a className={styles.logo} href="#top" aria-label="Restormania">
            <Image
              className={styles.barBottom}
              src="/assets/home/footer/bar-bottom.svg"
              alt=""
              width={250}
              height={91}
            />
            <Image
              className={styles.barTop}
              src="/assets/home/footer/bar-top.svg"
              alt=""
              width={299}
              height={127}
            />
            <Image
              className={styles.atMark}
              src="/assets/home/footer/at.svg"
              alt=""
              width={108}
              height={129}
            />
            <Image
              className={styles.letters}
              src="/assets/home/footer/letters.svg"
              alt=""
              width={366}
              height={238}
            />
          </a>
        </Reveal>

        <Reveal
          className={
            SHOW_APP_STORES ? styles.columns : `${styles.columns} ${styles.columnsWithoutStores}`
          }
          variants={fadeUp}
          child
        >
          <div className={styles.colStart}>
            <h3 className={styles.colTitle}>{t.footer.contact}</h3>
            <div className={styles.contactInfo}>
              <ContactLine icon="pin">{t.footer.address}</ContactLine>
              <ContactLine icon="phone">
                <a href="tel:+37495711700">095 711 700</a>
              </ContactLine>
              <ContactLine icon="mail">
                <a href="mailto:kamancharest@gmail.com">kamancharest@gmail.com</a>
              </ContactLine>
              <ContactLine icon="clock">{copy.hours}</ContactLine>
              {SHOW_APP_STORES ? (
                <OpenPositionsButton className={styles.careersButton} />
              ) : null}
            </div>
          </div>

          {SHOW_APP_STORES ? <SocialLinks className={styles.social} /> : null}

          <div className={SHOW_APP_STORES ? styles.colMid : `${styles.colMid} ${styles.colMidBottom}`}>
            {SHOW_APP_STORES ? (
              BRAND_BLOCKS.map((brand) => (
                <div className={styles.brandBlock} key={brand.name}>
                  <h3 className={styles.colTitle}>{brand.name}</h3>
                  <StoreButtons brand={brand.name} />
                </div>
              ))
            ) : (
              <>
                <OpenPositionsButton className={styles.careersButtonAside} />
                <SocialLinks className={`${styles.social} ${styles.socialUnderButton}`} />
              </>
            )}
          </div>
        </Reveal>

        <Reveal as="p" className={styles.copyright} variants={fadeUp} child>
          <span className={styles.copyrightMain}>
            © 2026 | All rights reserved
          </span>
          <span className={styles.copyrightSep} aria-hidden="true">
            {" "}
            |{" "}
          </span>
          <span className={styles.copyrightCredit}>
            Created by{" "}
            <a
              className={styles.credit}
              href="https://neetrino.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neetrino
            </a>
          </span>
        </Reveal>
      </RevealGroup>
    </footer>
  );
}
