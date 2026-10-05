"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

type Cta = { label: string; href: string };

type HeroSectionProps = {
  badge: string;
  headline: string;
  description: string;
  primaryCta: Cta;
  /** null hides the button (e.g. while no CV is uploaded). */
  secondaryCta: Cta | null;
  /** null renders nothing in its place. */
  profileImage: string | null;
  /** Alt text for the profile image. */
  profileAlt?: string;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

function HeroSection({
  badge,
  headline,
  description,
  primaryCta,
  secondaryCta,
  profileImage,
  profileAlt = "",
}: HeroSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate overflow-x-clip px-4 pt-32 pb-10 md:pt-40 md:pb-14">
        {/* Soft scrim behind the copy keeps text readable over bright shader areas. */}
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center before:absolute before:-inset-x-8 before:-inset-y-10 before:-z-10 before:rounded-full before:bg-background/45 before:blur-3xl">
          {profileImage && (
            <motion.div {...fadeUp(0)}>
              <Image
                src={profileImage}
                alt={profileAlt}
                width={144}
                height={144}
                priority
                className="size-28 rounded-full border border-border object-cover md:size-36"
              />
            </motion.div>
          )}

          <motion.p
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-foreground backdrop-blur-md"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {badge}
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="max-w-2xl text-base text-pretty text-muted-foreground md:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              className="group relative h-12 w-fit overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-300 hover:ps-14 hover:pe-6 motion-reduce:transition-none"
            >
              <a href={primaryCta.href}>
                <span className="relative z-10">{primaryCta.label}</span>
                <span className="absolute right-1 flex size-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:right-[calc(100%-44px)] group-hover:rotate-45 motion-reduce:transition-none">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </Button>

            {secondaryCta && (
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full px-6 text-sm font-medium backdrop-blur-md"
              >
                <a href={secondaryCta.href} download>
                  <Download />
                  {secondaryCta.label}
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default HeroSection;
