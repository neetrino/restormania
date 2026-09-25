"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { useSheetSwipe } from "@/components/careers/useSheetSwipe";
import { useTranslation } from "@/i18n/LocaleProvider";
import pillStyles from "@/components/ui/PillLink.module.css";
import styles from "./OpenPositions.module.css";

const HR_PHONE_DISPLAY = "041 18 17 18";
const HR_PHONE_HREF = "tel:+37441181718";
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled])';

type OpenPositionsButtonProps = {
  className?: string;
};

function trapTab(container: HTMLElement, event: KeyboardEvent): void {
  const items = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)];
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) {
    return;
  }

  const atStart = document.activeElement === first;
  const atEnd = document.activeElement === last;
  if (event.shiftKey && atStart) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && atEnd) {
    event.preventDefault();
    first.focus();
  }
}

function useDialogBehavior(
  onClose: () => void,
  dialogRef: RefObject<HTMLDivElement | null>,
): void {
  useEffect(() => {
    const node = dialogRef.current;
    const mobileSheet = window.matchMedia("(max-width: 743px)").matches;
    if (mobileSheet) {
      node?.focus();
    } else {
      node?.querySelector<HTMLElement>("#career-firstName")?.focus();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Tab" && node) {
        trapTab(node, event);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [dialogRef, onClose]);
}

function OpenPositionsDialog({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const dismissingRef = useRef(false);
  const [dismissing, setDismissing] = useState(false);

  const requestClose = useCallback(() => {
    if (dismissingRef.current) {
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onClose();
      return;
    }
    dismissingRef.current = true;
    setDismissing(true);
  }, [onClose]);

  useDialogBehavior(requestClose, dialogRef);
  useSheetSwipe(dialogRef, onClose);

  useEffect(() => {
    if (!dismissing) {
      return;
    }
    const timer = window.setTimeout(onClose, 280);
    return () => window.clearTimeout(timer);
  }, [dismissing, onClose]);

  const overlayClass = [styles.overlay, dismissing ? styles.overlayDismiss : ""]
    .filter(Boolean)
    .join(" ");
  const panelClass = [styles.panel, dismissing ? styles.panelDismiss : ""]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <div className={overlayClass} onClick={requestClose}>
      <div
        ref={dialogRef}
        className={panelClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="open-positions-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          aria-label={t.careers.close}
          onClick={requestClose}
        >
          ×
        </button>
        <h2 id="open-positions-title" className={styles.title}>
          {t.careers.title}
        </h2>
        <p className={styles.intro}>{t.careers.intro}</p>
        <a className={styles.phone} href={HR_PHONE_HREF}>
          <span className={styles.phoneLabel}>{t.careers.phoneLabel}</span>
          <span className={styles.phoneNumber}>{HR_PHONE_DISPLAY}</span>
        </a>
        {sent ? (
          <p className={styles.success} role="status">
            {t.careers.success}
          </p>
        ) : (
          <CareerApplicationForm onSuccess={() => setSent(true)} />
        )}
      </div>
    </div>,
    document.body,
  );
}

export function OpenPositionsButton({ className }: OpenPositionsButtonProps) {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  const classNames = [
    pillStyles.pill,
    pillStyles.solid,
    pillStyles.sm,
    styles.trigger,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={classNames}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {t.footer.openPositions}
      </button>
      {open ? <OpenPositionsDialog onClose={close} /> : null}
    </>
  );
}
