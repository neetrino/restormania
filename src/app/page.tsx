import { AboutSection } from "@/components/about/AboutSection";
import { BrandBanners } from "@/components/brands/BrandBanners";
import { Footer } from "@/components/footer/Footer";
import { FounderSection } from "@/components/founder/FounderSection";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import {
  CanvasScaler,
  PageCanvasScaleRuntime,
} from "@/components/layout/CanvasScaler";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={`page-root ${styles.page}`}>
      <PageCanvasScaleRuntime />
      <Header />
      <CanvasScaler>
        <main>
          <Hero />
          <BrandBanners />
          <AboutSection />
          <FounderSection />
        </main>
        <Footer />
      </CanvasScaler>
    </div>
  );
}
