import { useEffect, type RefObject } from "react";

const MOBILE_SHEET = "(max-width: 743px)";
const DRAG_START_PX = 8;
const CLOSE_DRAG_PX = 96;
const CLOSE_VELOCITY = 0.7;
const CLOSE_MS = 280;

function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(target.closest("input, textarea, button, a, label, select"))
  );
}

function shouldCloseSheet(distance: number, elapsed: number): boolean {
  return distance > CLOSE_DRAG_PX || distance / Math.max(elapsed, 1) > CLOSE_VELOCITY;
}

function settleSheet(panel: HTMLElement, close: boolean, onClose: () => void): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (close && reduceMotion) {
    onClose();
    return;
  }

  panel.style.transition = `transform ${CLOSE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  panel.style.transform = close ? "translateY(100%)" : "";
  if (close) {
    window.setTimeout(onClose, CLOSE_MS);
  }
}

/** Drag a mobile bottom sheet downward to dismiss it. */
export function useSheetSwipe(
  panelRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
): void {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    let pointerId = -1;
    let startY = 0;
    let startTime = 0;
    let dragging = false;
    let dismissed = false;

    const onPointerDown = (event: PointerEvent) => {
      if (dismissed || !window.matchMedia(MOBILE_SHEET).matches) {
        return;
      }
      if (panel.scrollTop > 0 || isInteractiveTarget(event.target)) {
        return;
      }
      pointerId = event.pointerId;
      startY = event.clientY;
      startTime = event.timeStamp;
      dragging = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || dismissed) {
        return;
      }
      const delta = event.clientY - startY;
      if (!dragging && delta < DRAG_START_PX) {
        return;
      }
      if (!dragging) {
        dragging = true;
        panel.style.animation = "none";
        try {
          panel.setPointerCapture(event.pointerId);
        } catch {
          // Capture is unavailable when the pointer is already gone.
        }
      }
      panel.style.transition = "none";
      panel.style.transform = `translateY(${Math.max(0, delta)}px)`;
    };

    const onPointerUp = (event: PointerEvent, cancel = false) => {
      if (event.pointerId !== pointerId) {
        return;
      }
      const distance = Math.max(0, event.clientY - startY);
      const close =
        dragging && !cancel && shouldCloseSheet(distance, event.timeStamp - startTime);
      if (dragging) {
        dismissed = close;
        settleSheet(panel, close, onClose);
      }
      dragging = false;
      pointerId = -1;
    };

    const onPointerCancel = (event: PointerEvent) => {
      onPointerUp(event, true);
    };

    panel.addEventListener("pointerdown", onPointerDown);
    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerup", onPointerUp);
    panel.addEventListener("pointercancel", onPointerCancel);
    return () => {
      panel.removeEventListener("pointerdown", onPointerDown);
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerup", onPointerUp);
      panel.removeEventListener("pointercancel", onPointerCancel);
    };
  }, [onClose, panelRef]);
}
