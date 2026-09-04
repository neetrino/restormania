import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import styles from "./BrandBanners.module.css";

export function BrandBanners() {
  return (
    <section
      className={styles.section}
      id="projects"
      aria-label="Նախագծեր"
    >
      <div className={styles.row}>
        <article className={`${styles.banner} ${styles.pideh}`}>
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
              <PillLink href="#about" size="md">
                Ավելին
              </PillLink>
            </div>
          </div>
          <div className={`${styles.media} ${styles.pidehMedia}`}>
            <Image
              src="/assets/pideh-food.png"
              alt=""
              width={510}
              height={240}
              className={styles.pidehImage}
              priority
            />
          </div>
        </article>

        <article className={`${styles.banner} ${styles.kamancha}`}>
          <div className={`${styles.media} ${styles.kamanchaMedia}`}>
            <Image
              src="/assets/kamancha-instrument.png"
              alt=""
              width={490}
              height={415}
              className={styles.kamanchaImage}
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
                className={styles.kamanchaLogo}
                unoptimized
              />
              <PillLink href="#about" size="md">
                Ավելին
              </PillLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
