"use client";

import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { fadeIn, fadeUp } from "@/components/motion/presets";
import { PillLink } from "@/components/ui/PillLink";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./Footer.module.css";

const STORE_LINKS = [
  {
    href: "#",
    label: "Download on the App Store",
    src: "/assets/badge-app-store.svg",
    width: 135,
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

const BRAND_BLOCKS = [
  { name: "Pideh", className: "colStart" },
  { name: "Kamancha", className: "colMid" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/aregface",
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
    href: "https://www.tiktok.com/@restormania",
    label: "TikTok",
    src: "/assets/social-tiktok.svg",
    width: 42,
    height: 42,
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
  const { t } = useTranslation();

  return (
    <footer className={styles.footer} id="contact">
      <RevealGroup className={styles.inner} as="div">
        <Reveal className={styles.top} variants={fadeUp} child>
          <h2 className={styles.headline}>{t.footer.headline}</h2>

          <div className={styles.columns}>
            {BRAND_BLOCKS.map((brand) => (
              <div
                key={brand.name}
                className={styles[brand.className]}
              >
                <h3 className={styles.colTitle}>{brand.name}</h3>
                <StoreButtons brand={brand.name} />
              </div>
            ))}

            <div className={styles.colEnd}>
              <h3 className={styles.colTitle}>{t.footer.contact}</h3>
              <div className={styles.contactInfo}>
                <p>
                  <a href="tel:+37441181718">+ 374 41 18 17 18</a>
                </p>
                <p>
                  <a href="mailto:kamancharest@gmail.com">
                    kamancharest@gmail.com
                  </a>
                </p>
                <p className={styles.hours}>{t.footer.hours}</p>
                <PillLink
                  href="#"
                  variant="solid"
                  size="sm"
                  className={styles.careersButton}
                >
                  {t.footer.openPositions}
                </PillLink>
              </div>
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
          <span className={styles.copyrightMain}>{t.footer.copyright}</span>
          <span className={styles.copyrightSep} aria-hidden="true">
            {" "}
            |{" "}
          </span>
          <span className={styles.copyrightCredit}>
            {t.footer.createdBy}{" "}
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
