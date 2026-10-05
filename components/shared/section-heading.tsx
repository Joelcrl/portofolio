import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono label above the heading. */
  eyebrow: string;
  title: string;
  /** Element for the title, so the section fits the page outline. */
  as?: "h2" | "h3";
  /** id for the title, for aria-labelledby on the section. */
  id?: string;
  /** Centers the eyebrow and heading. Default left. */
  align?: "left" | "center";
  className?: string;
};

/** Mono eyebrow label plus heading, shared by every section. */
export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  id,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("space-y-3", align === "center" && "text-center", className)}
    >
      {/* Foreground text with an accent bar: accent-colored small text falls
          below AA contrast over the brightest teal of the shader. */}
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-xs tracking-widest text-foreground uppercase",
          align === "center" && "justify-center",
        )}
      >
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
