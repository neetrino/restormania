"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LOCALES, type Locale } from "@/i18n/locales";
import { useTranslation } from "@/i18n/LocaleProvider";
import styles from "./LanguageSwitcher.module.css";

const LOCALE_LABELS: Record<Locale, string> = {
  hy: "HY",
  en: "EN",
  ru: "RU",
};

function GlobeIcon() {
  return (
    <svg
      className={styles.globe}
      width="18"
      height="18"
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
        fill="currentColor"
      />
    </svg>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.switcher} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t.language}
        onClick={() => setOpen((value) => !value)}
      >
        <GlobeIcon />
      </button>

      {open ? (
        <ul
          className={styles.menu}
          id={listId}
          role="listbox"
          aria-label={t.language}
        >
          {LOCALES.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                className={`${styles.option} ${
                  code === locale ? styles.optionActive : ""
                }`}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
              >
                {LOCALE_LABELS[code]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
