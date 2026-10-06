import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { education } from "@/content/education";
import { aboutSection, site } from "@/content/site";
import { cn } from "@/lib/utils";

const CARD = "rounded-xl border border-border bg-card backdrop-blur-md";

// First letter of each word in the name, e.g. "JC".
const initials = site.name
  .split(/\s+/)
  .map((word) => word[0])
  .join("")
  .toUpperCase();

function Chips({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "accent" | "primary" | "muted";
}) {
  // Zero items: render nothing, not an empty group.
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-mono text-xs tracking-widest text-foreground uppercase">
        {label}
      </h4>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "rounded-full border px-3 py-1 text-sm",
              // Text stays full foreground: accent or muted text drops below AA
              // over the brightest teal of the shader. The tint carries the tone.
              "text-foreground",
              tone === "accent" && "border-accent/60 bg-accent/25",
              tone === "primary" && "border-primary/50 bg-primary/20",
              tone === "muted" && "border-border bg-muted",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
        <Reveal className="mx-auto w-full max-w-60 lg:col-span-5 lg:max-w-none">
          <div
            className={cn(
              CARD,
              "relative aspect-4/5 overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[28rem]",
            )}
          >
            {site.profileImage ? (
              <Image
                src={site.profileImage}
                alt={site.name}
                fill
                sizes="(min-width: 1024px) 28rem, 240px"
                className="object-cover"
              />
            ) : (
              // Placeholder until a photo is set: initials on a palette gradient.
              <div
                role="img"
                aria-label={site.name}
                className="flex size-full items-center justify-center bg-linear-135 from-primary via-background to-accent"
              >
                <span
                  aria-hidden
                  className="text-6xl font-semibold tracking-tight text-foreground lg:text-8xl"
                >
                  {initials}
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className={cn(CARD, "flex h-full flex-col gap-6 p-6 md:p-8")}>
            <SectionHeading
              eyebrow={aboutSection.eyebrow}
              title={aboutSection.heading}
              id="about-heading"
            />
            <p className="text-base leading-relaxed text-pretty text-foreground md:text-lg">
              {site.longBio}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-6 lg:mt-8">
        <div className={cn(CARD, "space-y-8 p-6 md:p-8")}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">
                {education.university}
              </h3>
              <p className="text-base text-foreground">
                {education.degree}, {education.specialization}
              </p>
              <p className="font-mono text-sm text-foreground">
                {aboutSection.graduationLabel} {education.expectedGraduation}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="flex items-baseline gap-2 sm:justify-end">
                <span className="font-mono text-5xl leading-none font-semibold">
                  {education.gpa.value}
                </span>
                <span className="font-mono text-sm text-foreground">
                  / {education.gpa.scale}
                </span>
              </p>
              <p className="mt-2 font-mono text-xs tracking-widest text-foreground uppercase">
                {aboutSection.gpaLabel}
              </p>
            </div>
          </div>

          <div className="space-y-6 border-t border-border pt-6">
            <Chips
              label={aboutSection.relevantLabel}
              items={education.relevantCourses}
              tone="primary"
            />
            <Chips
              label={aboutSection.foundationsLabel}
              items={education.supportingCourses}
              tone="muted"
            />
            <Chips
              label={aboutSection.interestsLabel}
              items={education.interests}
              tone="accent"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
