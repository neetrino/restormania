import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import styles from "./AboutSection.module.css";

const ABOUT_PARAGRAPH_HY =
  "Restormania-ի առանձնահատկություններից մեկը բիզնեսի իրական գործընթացների հնարավորինս բաց ներկայացումն է։ Արեգը հաճախ խոսում է այն թեմաների մասին, որոնք սովորաբար մնում են բիզնեսի հանրային կերպարի սահմաններից դուրս՝ ֆինանսական և կառավարչական սխալներից մինչև չարդարացված որոշումներ, ձախողված փորձարկումներ և դրանց հետևանքով կատարված փոփոխություններ։";

const ABOUT_PARAGRAPH_EN =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.";

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
          <p className={styles.text}>{ABOUT_PARAGRAPH_HY}</p>
          <p className={styles.text}>{ABOUT_PARAGRAPH_EN}</p>
          <PillLink href="#founder" size="md" className={styles.cta}>
            Ավելին
          </PillLink>
        </div>
      </div>
    </section>
  );
}
