import { ImageSlot } from "@/components/shared/image-slot";
import Timeline, { type TimelineItem } from "@/components/ui/timeline";
import { experience, experienceSection } from "@/content/organization";
import {
  experienceYearRange,
  sortExperienceNewestFirst,
} from "@/lib/experience";
import { imageFit } from "@/lib/image-fit";

const items: TimelineItem[] = sortExperienceNewestFirst(experience).map(
  (entry, i) => ({
    id: `${entry.type}-${entry.title}-${i}`,
    date: entry.period,
    badge: entry.type,
    title: entry.title,
    subtitle: entry.organization,
    description: entry.description,
    media: (
      <ImageSlot
        src={entry.image}
        alt={experienceSection.imageAlt(entry.title, entry.organization)}
        sizes="(min-width: 768px) 20rem, 72vw"
        variant={i}
        fit={imageFit(entry.image)}
      />
    ),
  }),
);

const range = experienceYearRange(experience);
const periodLabel = range
  ? range.from === range.to
    ? range.from
    : experienceSection.periodLabel(range.from, range.to)
  : undefined;

export default function Organization() {
  // Hidden entirely, heading included, until there is something to show.
  if (items.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <Timeline
        headingId="experience-heading"
        items={items}
        title={experienceSection.title}
        periodLabel={periodLabel}
      />
    </section>
  );
}
