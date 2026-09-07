/** Typical desktop artboard — matches Ilona / MacBook composition. */
export const PAGE_CANVAS_DESIGN_WIDTH = 1440;

/**
 * Below this: real mobile layout.
 * 744–1439: scaled-down desktop artboard (same as desktop, smaller).
 * ≥1440: live desktop with vw (no scale).
 */
export const PAGE_CANVAS_MIN_WIDTH = 744;

export type PageCanvasMetrics = {
  isCanvasActive: boolean;
  scale: number;
};

export function getPageCanvasMetrics(
  viewportWidth: number,
  designWidth: number = PAGE_CANVAS_DESIGN_WIDTH,
  minWidth: number = PAGE_CANVAS_MIN_WIDTH,
): PageCanvasMetrics {
  if (viewportWidth < minWidth || viewportWidth >= designWidth) {
    return { isCanvasActive: false, scale: 1 };
  }

  return {
    isCanvasActive: true,
    scale: viewportWidth / designWidth,
  };
}
