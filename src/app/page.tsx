import { AboutSection } from "@/components/about/AboutSection";
import { BrandBanners } from "@/components/brands/BrandBanners";
import { Footer } from "@/components/footer/Footer";
import { FounderSection } from "@/components/founder/FounderSection";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <BrandBanners />
        <AboutSection />
        <FounderSection />
      </main>
      <Footer />
    </div>
  );
}
