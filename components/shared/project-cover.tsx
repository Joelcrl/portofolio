import Image from "next/image";

import { cn } from "@/lib/utils";

// Placeholder gradients built from the palette, picked by index so
// neighbouring cards don't look identical.
const PLACEHOLDERS = [
  "bg-linear-135 from-primary via-background to-accent",
  "bg-linear-45 from-accent via-background to-primary",
  "bg-linear-160 from-background via-primary to-accent",
  "bg-linear-20 from-primary via-accent/60 to-background",
];

type ProjectCoverProps = {
  title: string;
  /** Cover image path, or null for the gradient placeholder. */
  image: string | null;
  /** `sizes` for next/image, matching how wide the cover renders. */
  sizes: string;
  /** Picks the placeholder gradient. */
  variant?: number;
  /** Hide from assistive tech when the title is already announced nearby. */
  decorative?: boolean;
  className?: string;
};

/** A project's cover image, or a gradient placeholder (with the title unless decorative). */
export function ProjectCover({
  title,
  image,
  sizes,
  variant = 0,
  decorative = false,
  className,
}: ProjectCoverProps) {
  if (image) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image
          src={image}
          alt={decorative ? "" : title}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden={decorative || undefined}
      className={cn(
        "relative flex items-end overflow-hidden p-[6%]",
        PLACEHOLDERS[variant % PLACEHOLDERS.length],
        className,
      )}
    >
      {/* A decorative cover sits next to the real title, so don't repeat it. */}
      {!decorative && (
        <span className="rounded-md bg-background/60 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
          {title}
        </span>
      )}
    </span>
  );
}
