import { ArrowUpRight } from "lucide-react";

import { CertificateDialog } from "@/components/shared/certificate-dialog";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { publications, publicationsSection } from "@/content/publications";
import { site } from "@/content/site";
import type { Publication } from "@/lib/types";
import { cn } from "@/lib/utils";

const CARD = "rounded-xl border border-border bg-card backdrop-blur-md";

/** "ICTIM 2026", without repeating the year when the venue already has it. */
const venueLine = (pub: Publication) =>
  pub.venue.includes(pub.year) ? pub.venue : `${pub.venue} ${pub.year}`;

function Authors({ authors }: { authors: string[] }) {
  if (authors.length === 0) return null;

  return (
    <p className="text-base text-foreground">
      {authors.map((author, i) => (
        <span key={`${author}-${i}`}>
          {author === site.fullName ? (
            <strong className="font-semibold">{author}</strong>
          ) : (
            author
          )}
          {i < authors.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  const {
    readPaperLabel,
    viewCertificateLabel,
    certificateTitle,
    certificateAlt,
  } = publicationsSection;

  return (
    <article
      className={cn(
        CARD,
        "grid gap-8 p-6 md:p-8",
        // With a certificate, the text column and a thumbnail column share the
        // row; without one, the text takes the full width.
        pub.certificateImage && "md:grid-cols-[minmax(0,1fr)_16rem]",
      )}
    >
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-sm text-foreground">{venueLine(pub)}</p>
          {pub.status && (
            <span className="rounded-full border border-accent/60 bg-accent/20 px-3 py-1 font-mono text-xs text-foreground">
              {pub.status}
            </span>
          )}
        </div>

        <h3 className="text-xl leading-snug font-semibold tracking-tight text-balance md:text-2xl">
          {pub.title}
        </h3>

        <Authors authors={pub.authors} />

        <p className="text-base leading-relaxed text-pretty text-foreground">
          {pub.summary}
        </p>

        {pub.metrics.length > 0 && (
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {pub.metrics.map((m) => (
              // The number reads first on screen; the label stays the term.
              <div key={m.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-xs tracking-widest text-foreground uppercase">
                  {m.label}
                </dt>
                <dd className="font-mono text-5xl leading-none font-semibold">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {pub.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {pub.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {pub.paperUrl && (
          <div>
            <Button
              asChild
              className="h-11 rounded-full px-6 text-sm font-medium"
            >
              <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                {readPaperLabel}
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        )}
      </div>

      {pub.certificateImage && (
        <div className="self-start">
          <CertificateDialog
            image={pub.certificateImage}
            alt={certificateAlt(pub.title)}
            triggerLabel={viewCertificateLabel(pub.title)}
            title={certificateTitle}
            description={pub.title}
          />
        </div>
      )}
    </article>
  );
}

export default function Publications() {
  // Nothing to show, nothing to render, heading included.
  if (publications.length === 0) return null;

  return (
    <section
      id="publications"
      aria-labelledby="publications-heading"
      className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24"
    >
      {/* Text sits on a card surface everywhere except the Hero. */}
      <Reveal className="mb-6 w-fit lg:mb-8">
        <div className={cn(CARD, "px-6 py-5")}>
          <SectionHeading
            eyebrow={publicationsSection.eyebrow}
            title={publicationsSection.heading}
            id="publications-heading"
          />
        </div>
      </Reveal>

      <div className="space-y-6 lg:space-y-8">
        {publications.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 0.08}>
            <PublicationCard pub={pub} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
