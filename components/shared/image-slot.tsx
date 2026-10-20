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
  /**
   * "cover" crops the image to fill the slot. "contain" shows it whole over a
   * blurred copy of itself, for portrait photos and screenshots.
   */
  fit?: "cover" | "contain";
  className?: string;
};

/** A 16:9 rounded image, or a palette gradient while the image is not set. */
export function ImageSlot({
  src,
  alt,
  sizes,
  variant = 0,
  fit = "cover",
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
      {src && fit === "contain" && (
        // Decorative fill for the empty sides, so the slot never shows bars.
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          draggable={false}
          className="scale-110 object-cover opacity-60 blur-xl"
        />
      )}
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          draggable={false}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      )}
    </div>
  );
}
