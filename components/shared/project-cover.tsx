import Image from "next/image";

import { PLACEHOLDERS } from "@/components/shared/image-slot";
import { cn } from "@/lib/utils";

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
  /** Load the image eagerly, for a cover that is the first thing on the page. */
  priority?: boolean;
  className?: string;
};

/** A project's cover image, or a gradient placeholder (with the title unless decorative). */
export function ProjectCover({
  title,
  image,
  sizes,
  variant = 0,
  decorative = false,
  priority = false,
  className,
}: ProjectCoverProps) {
  if (image) {
    // Covers are app screenshots in any aspect ratio, so they are shown whole
    // and a blurred copy fills the rest of the frame instead of cropping text.
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          draggable={false}
          className="scale-110 object-cover opacity-60 blur-xl"
        />
        <Image
          src={image}
          alt={decorative ? "" : title}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-contain"
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
