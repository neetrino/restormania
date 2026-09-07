import Image from "next/image";
import styles from "./AboutSection.module.css";

const ABOUT_PARAGRAPHS = [
  "Սարյան 8 հասցեում՝ Kamancha Tapaka Rooms-ը հայկական խոհանոցի նոր փորձառություն է ներկայացնում՝ համադրված գինին վայելելու մշակույթի և Քամանչայի հյուրընկալության հետ։",
  "Այստեղ մեկ մենյուում հավաքել ենք Քամանչայի ամենասիրված ու պահանջված ուտեստները՝ դրանք ներկայացնելով Սարյան փողոցի յուրահատուկ տրամադրությանը և գինու սիրահարների նախասիրություններին համապատասխան։",
  "Kamancha Tapaka Rooms — հայկական սիրված համերն ու գինու մշակույթը՝ մեկ վայրում։",
] as const;

export function AboutSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <h2 className={styles.srOnly} id="about-title">
        Restormania-ի մասին
      </h2>
      <div className={styles.grid}>
        <div className={styles.visual}>
          <Image
            src="/assets/about-logo.png"
            alt="Restormania"
            width={515}
            height={394}
            className={styles.logo}
            priority
          />
        </div>
        <div className={styles.copy}>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className={styles.text}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
