"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "./presets";

type RevealAs = "div" | "section" | "footer" | "header" | "article" | "figure" | "p";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: RevealAs;
  /** Use inside RevealGroup — inherits parent stagger, no own viewport trigger. */
  child?: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "variants" | "initial" | "animate" | "whileInView"
>;

const elements = {
  div: motion.div,
  section: motion.section,
  footer: motion.footer,
  header: motion.header,
  article: motion.article,
  figure: motion.figure,
  p: motion.p,
} as const;

export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
  child = false,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = elements[as];

  if (prefersReducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  if (child) {
    return (
      <Component className={className} variants={variants} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "footer";
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = elements[as];

  if (prefersReducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Component
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}
