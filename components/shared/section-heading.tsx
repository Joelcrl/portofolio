import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono label above the heading. */
  eyebrow: string;
  title: string;
  /** Element for the title, so the section fits the page outline. */
  as?: "h2" | "h3";
  /** id for the title, for aria-labelledby on the section. */
  id?: string;
  className?: string;
};

/** Mono eyebrow label plus heading, shared by every section. */
export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Foreground text with an accent bar: accent-colored small text falls
          below AA contrast over the brightest teal of the shader. */}
      <p className="flex items-center gap-3 font-mono text-xs tracking-widest text-foreground uppercase">
        <span aria-hidden className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className="text-3xl font-semibold tracking-tight text-balance md:text-4xl"
      >
        {title}
      </Heading>
    </div>
  );
}
