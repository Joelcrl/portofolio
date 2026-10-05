import Image from "next/image";

import Timeline, { type TimelineItem } from "@/components/ui/timeline";
import { organization, organizationSection } from "@/content/organization";

// Roles and committees share the timeline; committees also get photo cards below.
const items: TimelineItem[] = [
  ...organization.roles.map((role, i) => ({
    id: `role-${i}`,
    year: role.year,
    month: role.month,
    title: role.title,
    description: role.description,
  })),
  ...organization.committees.map((committee, i) => ({
    id: `committee-${i}`,
    year: committee.year,
    month: null,
    title: committee.title,
    description: committee.description,
  })),
];

const years = items.map((item) => Number(item.year)).filter(Number.isFinite);
const first = years.length ? String(Math.min(...years)) : null;
const last = years.length ? String(Math.max(...years)) : null;
const periodLabel =
  first && last
    ? first === last
      ? first
      : organizationSection.periodLabel(first, last)
    : undefined;

export default function Organization() {
  const { committees } = organization;

  return (
    <section id="organization" aria-labelledby="organization-heading">
      <Timeline
        headingId="organization-heading"
        items={items}
        title={organizationSection.title}
        subtitle={organization.name}
        periodLabel={periodLabel}
        imageUrl={organization.image}
        imageAlt={organization.name}
      />

      {committees.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight">
            {organizationSection.committeesTitle}
          </h3>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committees.map((committee) => (
              <li
                key={`${committee.year}-${committee.title}`}
                className="overflow-hidden rounded-xl border border-border bg-card backdrop-blur-md"
              >
                {committee.image && (
                  <div className="relative aspect-video">
                    <Image
                      src={committee.image}
                      alt={committee.title}
                      fill
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2 p-5">
                  <p className="font-mono text-xs text-muted-foreground">
                    {committee.year}
                  </p>
                  <h4 className="text-lg font-semibold tracking-tight">
                    {committee.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {committee.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
