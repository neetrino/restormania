"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./LanguageSwitcher.module.css";

const LOCALES = [
  { code: "hy", label: "HY" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      focusable="false"
    >
      <path
        d="M2.5 5L7 9.5L11.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LanguageSwitcher() {
  const [locale, setLocale] = useState<LocaleCode>("hy");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];
  const options = LOCALES.filter((item) => item.code !== locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
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

  const selectLocale = (code: LocaleCode) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div className={styles.switcher} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Language"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{current.label}</span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul className={styles.menu} id={listId} role="listbox" aria-label="Language">
          {options.map((item) => (
            <li key={item.code} role="option" aria-selected={false}>
              <button
                type="button"
                className={styles.option}
                onClick={() => selectLocale(item.code)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
