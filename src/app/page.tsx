import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { IntroSection } from "@/components/home/IntroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
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
          <IntroSection />
          <ProjectsSection />
          <NewsSection />
        </main>
        <Footer />
      </CanvasScaler>
    </div>
  );
}
