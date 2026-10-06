import Image from "next/image";

import { cn } from "@/lib/utils";

// Placeholder gradients built from the palette, picked by index so
// neighbouring slots don't look identical.
export const PLACEHOLDERS = [
  "bg-linear-135 from-primary via-background to-accent",
  "bg-linear-45 from-accent via-background to-primary",
  "bg-linear-160 from-background via-primary to-accent",
  "bg-linear-20 from-primary via-accent/60 to-background",
];

type ImageSlotProps = {
  /** Image path, or null for the gradient placeholder. */
  src: string | null;
  /** Alt text for the image. Required, even though the placeholder ignores it. */
  alt: string;
  /** `sizes` for next/image, matching how wide the slot renders. */
  sizes: string;
  /** Picks the placeholder gradient. */
  variant?: number;
  className?: string;
};

/** A 16:9 rounded image, or a palette gradient while the image is not set. */
export function ImageSlot({
  src,
  alt,
  sizes,
  variant = 0,
  className,
}: ImageSlotProps) {
  return (
    <div
      // The empty placeholder carries no information, so it stays silent.
      aria-hidden={src ? undefined : true}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border border-border",
        !src && PLACEHOLDERS[variant % PLACEHOLDERS.length],
        className,
      )}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover"
        />
      )}
    </div>
  );
}
