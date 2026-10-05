"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait, for a small stagger between neighbours. */
  delay?: number;
  className?: string;
};

/** Fades and slides up once when it enters the viewport. Static with reduced motion. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
