"use client";

import { MotionConfig, motion } from "motion/react";
import type { CSSProperties } from "react";

import { Marquee } from "@/components/ui/marquee";

export interface BrandList {
  name: string;
  /** Logo URL, or null to render a text badge. */
  image: string | null;
  lightimg: string | null;
}

type BrandSliderProps = {
  brandList: BrandList[];
  /** Small muted label above the slider. */
  label?: string;
  /** Scroll in the opposite direction. */
  reverse?: boolean;
};

// Seconds each item takes to scroll past, so speed stays even regardless of
// list length. The reversed slider runs a little slower so the two rows never
// move in lockstep.
const SECONDS_PER_ITEM = 2.6;
const REVERSE_SECONDS_PER_ITEM = 3.2;

function BrandItem({ brand }: { brand: BrandList }) {
  // The site is dark-only, so prefer the light logo variant.
  const src = brand.lightimg ?? brand.image;

  return (
    <div className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-background/40 px-4">
      {src && (
        // Plain <img>: small remote SVGs from cdn.simpleicons.org gain nothing from next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={brand.name}
          width={20}
          height={20}
          className="size-5"
        />
      )}
      <span
        aria-hidden={src ? true : undefined}
        className="font-mono text-xs whitespace-nowrap text-foreground"
      >
        {brand.name}
      </span>
    </div>
  );
}

function BrandSlider({ brandList, label, reverse = false }: BrandSliderProps) {
  if (brandList.length === 0) return null;

  const secondsPerItem = reverse ? REVERSE_SECONDS_PER_ITEM : SECONDS_PER_ITEM;
  const duration = `${brandList.length * secondsPerItem}s`;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4"
      >
        {label && (
          <div className="flex items-center justify-center gap-4">
            <div className="hidden h-px w-32 bg-linear-to-l from-muted-foreground to-transparent opacity-40 md:block" />
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {label}
            </p>
            <div className="hidden h-px w-32 bg-linear-to-r from-muted-foreground to-transparent opacity-40 md:block" />
          </div>
        )}
        <Marquee
          pauseOnHover
          reverse={reverse}
          style={{ "--duration": duration } as CSSProperties}
          className="py-1 [--gap:0.75rem] motion-safe:mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          {brandList.map((brand) => (
            <BrandItem key={brand.name} brand={brand} />
          ))}
        </Marquee>
      </motion.div>
    </MotionConfig>
  );
}

export default BrandSlider;
