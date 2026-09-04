import Image from "next/image";
import styles from "./FounderSection.module.css";

const FOUNDER_BIO = `Արեգ Գևորգյանը հայ ռեստորատոր, ձեռնարկատեր և Kamancha ռեստորանների, Restormania և Pideh նախագծի հիմնադիր-տնօրենն է, որի մասնագիտական գործունեությունը հիմնականում կենտրոնացած է ռեստորանային բիզնեսի, հայկական գաստրոնոմիայի և հյուրընկալության ոլորտների զարգացման վրա։

Ռեստորանային ոլորտում նրա առաջին խոշոր նախագծերից մեկը Armat Restaurant-ն էր, որը հիմնադրվել է 2017 թվականին։ Հետագայում ձևավորվել և զարգացել են Kamancha, Pideh, Kamancha Factory և Kamancha Tapaka Rooms նախագծերը՝ ընդգրկելով ռեստորանային գործունեության, արագ սննդի և սննդի առաքման տարբեր ուղղություններ։`;

export function FounderSection() {
  return (
    <section
      className={styles.section}
      id="founder"
      aria-labelledby="founder-title"
    >
      <h2 className={styles.srOnly} id="founder-title">
        Հիմնադիր
      </h2>
      <div className={styles.row}>
        <figure className={styles.portrait}>
          <Image
            src="/assets/founder.png"
            alt="Արեգ Գևորգյան"
            width={344}
            height={488}
            className={styles.photo}
          />
        </figure>

        <article className={styles.card}>
          <p className={styles.bio}>{FOUNDER_BIO}</p>
        </article>

        <div className={styles.stack} aria-hidden="true">
          <figure className={`${styles.portrait} ${styles.stackFront}`}>
            <Image
              src="/assets/founder.png"
              alt=""
              width={344}
              height={488}
              className={styles.photo}
            />
          </figure>
          <figure className={`${styles.portrait} ${styles.stackBack}`}>
            <Image
              src="/assets/founder.png"
              alt=""
              width={344}
              height={488}
              className={styles.photo}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
