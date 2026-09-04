import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#home", label: "Գլխավոր" },
  { href: "#about", label: "Restormania-ի մասին" },
  { href: "#founder", label: "Հիմնադիր" },
  { href: "#projects", label: "Նախագծեր" },
] as const;

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#home" aria-label="Restormania">
          <Image
            src="/assets/header-logo.svg"
            alt=""
            width={82}
            height={66}
            priority
            unoptimized
          />
        </a>

        <nav className={styles.nav} aria-label="Հիմնական">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <PillLink href="#projects" variant="outline">
            Pideh
          </PillLink>
          <PillLink href="#projects" variant="solid">
            Kamancha
          </PillLink>
        </div>
      </div>
    </header>
  );
}
