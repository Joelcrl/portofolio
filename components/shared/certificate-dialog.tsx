"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CertificateDialogProps = {
  image: string;
  /** Alt text for both the thumbnail and the full image. */
  alt: string;
  /** Accessible name for the thumbnail button. */
  triggerLabel: string;
  /** Visible title of the dialog. */
  title: string;
  /** Shown under the title, e.g. which paper the certificate is for. */
  description: string;
};

/**
 * A certificate thumbnail that opens the whole image in a dialog. The image is
 * contained, never cropped. Escape closes the dialog and focus returns to the
 * thumbnail (both handled by Radix).
 */
export function CertificateDialog({
  image,
  alt,
  triggerLabel,
  title,
  description,
}: CertificateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={triggerLabel}
          className="group relative block aspect-[1.414] w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-background outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 16rem, 100vw"
            className="object-contain p-2"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[calc(100%-2rem)] gap-3 sm:max-w-5xl">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className="relative h-[70svh] w-full overflow-hidden rounded-md bg-background">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
