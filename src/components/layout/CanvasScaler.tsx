"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  getPageCanvasMetrics,
  PAGE_CANVAS_DESIGN_WIDTH,
  PAGE_CANVAS_MIN_WIDTH,
} from "@/lib/page-canvas";
import styles from "./CanvasScaler.module.css";

function subscribeViewport(onStoreChange: () => void): () => void {
  window.addEventListener("resize", onStoreChange, { passive: true });
  return () => window.removeEventListener("resize", onStoreChange);
}

function getViewportWidthSnapshot(): number {
  return window.innerWidth;
}

/** Prefer mobile-first SSR to avoid a stretched desktop flash on tablets. */
function getServerViewportWidthSnapshot(): number {
  return PAGE_CANVAS_MIN_WIDTH - 1;
}

function usePageCanvasMetrics(designWidth: number, minWidth: number) {
  const viewportWidth = useSyncExternalStore(
    subscribeViewport,
    getViewportWidthSnapshot,
    getServerViewportWidthSnapshot,
  );

  return getPageCanvasMetrics(viewportWidth, designWidth, minWidth);
}

type CanvasScalerProps = {
  children: ReactNode;
  designWidth?: number;
  minWidth?: number;
  className?: string;
};

/**
 * Locks children to the desktop design width and scales them down on tablets
 * so proportions match desktop (not stretched to the viewport).
 */
export function CanvasScaler({
  children,
  designWidth = PAGE_CANVAS_DESIGN_WIDTH,
  minWidth = PAGE_CANVAS_MIN_WIDTH,
  className,
}: CanvasScalerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { scale, isCanvasActive } = usePageCanvasMetrics(designWidth, minWidth);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) {
      return;
    }

    const syncHeight = () => {
      setContentHeight(node.offsetHeight);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [isCanvasActive, scale]);

  const viewportHeight = isCanvasActive ? contentHeight * scale : undefined;

  const canvasStyle: CSSProperties | undefined = isCanvasActive
    ? {
        width: designWidth,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        marginBottom:
          contentHeight > 0 && scale < 1
            ? contentHeight * (scale - 1)
            : undefined,
      }
    : undefined;

  const viewportClassName = [styles.viewport, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={viewportClassName}
      style={
        viewportHeight && viewportHeight > 0
          ? { height: viewportHeight }
          : undefined
      }
    >
      <div
        ref={canvasRef}
        className={`${styles.canvas} ${isCanvasActive ? styles.canvasActive : ""}`}
        style={canvasStyle}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Keeps the fixed header on the same scale as the page canvas.
 */
export function PageCanvasScaleRuntime() {
  const viewportWidth = useSyncExternalStore(
    subscribeViewport,
    getViewportWidthSnapshot,
    getServerViewportWidthSnapshot,
  );

  useEffect(() => {
    const root = document.documentElement;
    const { isCanvasActive, scale } = getPageCanvasMetrics(viewportWidth);

    if (isCanvasActive) {
      root.style.setProperty("--page-canvas-scale", String(scale));
      root.classList.add("page-canvas-active");
    } else {
      root.classList.remove("page-canvas-active");
      root.style.removeProperty("--page-canvas-scale");
    }

    return () => {
      root.classList.remove("page-canvas-active");
      root.style.removeProperty("--page-canvas-scale");
    };
  }, [viewportWidth]);

  return null;
}
