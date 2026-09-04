"use client";

import { useState } from "react";
import styles from "./LanguageSwitcher.module.css";

const LOCALES = [
  { code: "hy", label: "HY" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

export function LanguageSwitcher() {
  const [locale, setLocale] = useState<LocaleCode>("hy");

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {LOCALES.map((item, index) => (
        <span key={item.code} className={styles.item}>
          {index > 0 ? <span className={styles.divider} aria-hidden>|</span> : null}
          <button
            type="button"
            className={styles.button}
            aria-pressed={locale === item.code}
            onClick={() => {
              setLocale(item.code);
              document.documentElement.lang = item.code;
            }}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
}
