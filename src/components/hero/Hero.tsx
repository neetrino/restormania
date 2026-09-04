import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <h1 className={styles.restormania} id="hero-title">
        RESTORMANIA
      </h1>
      <p className={styles.subtitle}>Subtitle</p>
    </section>
  );
}
