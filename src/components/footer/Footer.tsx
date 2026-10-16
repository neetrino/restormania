"use client";

import Image from "next/image";
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
    href: "https://wa.me/37441181718",
    label: "WhatsApp",
    src: "/assets/social-whatsapp.svg",
    width: 26,
    height: 26,
  },
] as const;

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

        <Reveal className={styles.columns} variants={fadeUp} child>
          <div className={styles.colStart}>
            <h3 className={styles.colTitle}>{t.footer.contact}</h3>
            <div className={styles.contactInfo}>
              <p>{t.footer.address}</p>
              <p>
                <a href="tel:+37441181718">+ 374 41 18 17 18</a>
              </p>
              <p>
                <a href="mailto:kamancharest@gmail.com">kamancharest@gmail.com</a>
              </p>
              <p>{copy.hours}</p>
              <OpenPositionsButton className={styles.careersButton} />
            </div>
          </div>

          <div className={styles.social}>
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

          <div className={styles.colMid}>
            {BRAND_BLOCKS.map((brand) => (
              <div className={styles.brandBlock} key={brand.name}>
                <h3 className={styles.colTitle}>{brand.name}</h3>
                <StoreButtons brand={brand.name} />
              </div>
            ))}
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
