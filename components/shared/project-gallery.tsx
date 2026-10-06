"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GalleryImage = {
  src: string;
  alt: string;
  /** Accessible name for the thumbnail button. */
  openLabel: string;
};

type ProjectGalleryProps = {
  images: GalleryImage[];
  /** Visible title of the dialog, e.g. the project title. */
  title: string;
};

/**
 * Thumbnail grid. Each thumbnail opens its image in a dialog, contained so
 * nothing is cropped. Escape closes it and focus returns to the thumbnail
 * (both handled by Radix).
 */
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {images.map((image) => (
        <li key={image.src}>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={image.openLabel}
                className="relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-background outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 18rem, 50vw"
                  className="object-cover"
                />
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-[calc(100%-2rem)] gap-3 sm:max-w-5xl">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{image.alt}</DialogDescription>
              <div className="relative h-[70svh] w-full overflow-hidden rounded-md bg-background">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
