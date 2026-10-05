import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import {
  SqueezeCarousel,
  type SqueezeSlide,
} from "@/components/ui/carousel-squeeze";
import {
  certifications,
  certificationsSection,
} from "@/content/certifications";
import type { Certification } from "@/lib/types";

// The carousel repeats slides to fill its strip, so below this it would show
// the same certificate twice. Fewer certificates render as a card grid.
const CAROUSEL_MIN = 5;

// Placeholder backgrounds from the palette, for certificates without an image.
const PLACEHOLDERS = [
  "linear-gradient(135deg, var(--primary), var(--background) 60%, var(--accent))",
  "linear-gradient(45deg, var(--accent), var(--background) 55%, var(--primary))",
  "linear-gradient(160deg, var(--background), var(--primary) 70%, var(--accent))",
];

const issuedBy = (cert: Certification) => `${cert.issuer}, ${cert.date}`;

function toSlide(cert: Certification, i: number): SqueezeSlide {
  return {
    id: `${cert.title}-${i}`,
    title: cert.title,
    description: issuedBy(cert),
    overlay: <span className="font-medium text-foreground">{cert.issuer}</span>,
    image: cert.image ?? undefined,
    imageAlt: certificationsSection.imageAlt(cert.title),
    imageFit: "contain",
    background: PLACEHOLDERS[i % PLACEHOLDERS.length],
    ...(cert.verifyUrl
      ? {
          action: certificationsSection.verifyLabel,
          href: cert.verifyUrl,
          target: "_blank",
        }
      : {}),
  };
}

function CertificateCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-border bg-card backdrop-blur-md">
      {/* Landscape A4 ratio; contain so names and dates are never cropped. */}
      <div
        className="relative aspect-[1.414] bg-background"
        style={cert.image ? undefined : { background: PLACEHOLDERS[index % PLACEHOLDERS.length] }}
      >
        {cert.image && (
          <Image
            src={cert.image}
            alt={certificationsSection.imageAlt(cert.title)}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-3"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold tracking-tight">{cert.title}</h3>
        <p className="text-sm text-muted-foreground">{issuedBy(cert)}</p>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-1 rounded-sm pt-2 text-sm font-medium text-accent outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {certificationsSection.verifyLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
}

export default function Certifications() {
  // Hidden entirely, heading included, until there is something to show.
  if (certifications.length === 0) return null;

  const { title, previousLabel, nextLabel } = certificationsSection;

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="mx-auto w-full max-w-6xl px-4 py-16"
    >
      <h2
        id="certifications-heading"
        className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl"
      >
        {title}
      </h2>

      {certifications.length >= CAROUSEL_MIN ? (
        // Text under the strip sits on a card surface, per the readability rule.
        <div className="rounded-xl border border-border bg-card p-4 backdrop-blur-md md:p-6">
          <SqueezeCarousel
            slides={certifications.map(toSlide)}
            label={title}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            accent="var(--primary)"
            accentForeground="var(--primary-foreground)"
            // Scale with the carousel's own width so the open certificate takes
            // most of the row on a phone as well as on a desktop.
            height="clamp(120px, 39cqi, 340px)"
            gap="clamp(6px, 2cqi, 16px)"
            slatGap="clamp(4px, 1.2cqi, 8px)"
            slatWidth="clamp(4px, 1.2cqi, 8px)"
            radius={10}
          />
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertificateCard key={`${cert.title}-${i}`} cert={cert} index={i} />
          ))}
        </ul>
      )}
    </section>
  );
}
