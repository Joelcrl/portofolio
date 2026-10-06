import { Download, Mail } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getSocials } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import { contactSection, site } from "@/content/site";

export default function Contact() {
  const { links, cvPath } = site;
  // Profile links only; email has its own button. Empty slots are skipped.
  const profiles = getSocials(links, [
    "linkedin",
    "instagram",
    "github",
    "scholar",
  ]);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-4xl px-4 py-16 md:py-24"
    >
      <Reveal>
        <div className="relative isolate">
          {/* Soft primary glow behind the panel. */}
          <div
            aria-hidden
            className="absolute inset-x-8 inset-y-4 -z-10 rounded-full bg-primary/40 blur-3xl"
          />

          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card px-6 py-12 text-center backdrop-blur-md md:px-14 md:py-16">
            <SectionHeading
              align="center"
              eyebrow={contactSection.eyebrow}
              title={contactSection.heading}
              id="contact-heading"
            />

            <p className="max-w-xl text-base text-pretty text-foreground md:text-lg">
              {contactSection.text}
            </p>

            {(links.email || cvPath) && (
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                {links.email && (
                  <Button
                    asChild
                    className="h-12 rounded-full px-6 text-sm font-medium"
                  >
                    <a href={links.email}>
                      <Mail />
                      {contactSection.emailLabel}
                    </a>
                  </Button>
                )}
                {cvPath && (
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full px-6 text-sm font-medium"
                  >
                    <a href={cvPath} download>
                      <Download />
                      {contactSection.cvLabel}
                    </a>
                  </Button>
                )}
              </div>
            )}

            {profiles.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-3">
                {profiles.map((profile) => (
                  <li key={profile.key}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
                    >
                      {profile.icon}
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
