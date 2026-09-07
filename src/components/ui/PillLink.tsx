import type { ReactNode } from "react";
import styles from "./PillLink.module.css";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "pideh" | "kamancha";
  size?: "sm" | "md";
  className?: string;
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function PillLink({
  href,
  children,
  variant = "solid",
  size = "sm",
  className,
}: PillLinkProps) {
  const classNames = [
    styles.pill,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const external = isExternalHref(href);

  return (
    <a
      className={classNames}
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
