import Image from "next/image";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { href: "#about", label: "Մեր մասին" },
  { href: "#projects", label: "Նորություններ" },
  { href: "#contact", label: "Կապ" },
] as const;

const SUPPORT_LINKS = [
  { href: "#", label: "Առաքում և Վերադարձ" },
  { href: "#", label: "Պայմաններ և դրույթներ" },
  { href: "#", label: "Գաղտնիության քաղաքականություն" },
  { href: "#", label: "Հաճախ տրվող հարցեր" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Facebook",
    src: "/assets/social-facebook.svg",
    width: 24,
    height: 24,
  },
  {
    href: "#",
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
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <h2 className={styles.headline}>Երկու վայր, մեկ պատմություն</h2>

        <div className={styles.columns}>
          <div className={styles.colStart}>
            <h3 className={styles.colTitle}>Նավիգացիա</h3>
            <ul className={styles.list}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.colCenter}>
            <h3 className={styles.colTitle}>Կոնտակտ</h3>
            <address className={styles.address}>
              <p>Աբովյան 23, Երևան, Հայաստան</p>
              <p>
                <a href="tel:+37410123456">+374 10 123 456</a>
              </p>
              <p>
                <a href="mailto:info@kamancha.am">info@kamancha.am</a>
              </p>
              <p className={styles.hours}>Երկ–Կիր: 12:00 – 00:00</p>
            </address>
          </div>

          <div className={styles.colEnd}>
            <h3 className={styles.colTitle}>Աջակցություն</h3>
            <ul className={`${styles.list} ${styles.listEnd}`}>
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.social}>
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              className={styles.socialLink}
              href={item.href}
              aria-label={item.label}
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

        <p className={styles.copyright}>
          Copyright © 2026 | All rights reserved | Created by{" "}
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
