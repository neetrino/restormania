import type { ReactNode } from "react";
import styles from "./PillLink.module.css";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md";
  className?: string;
};

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

  return (
    <a className={classNames} href={href}>
      {children}
    </a>
  );
}
