import Timeline, { type TimelineItem } from "@/components/ui/timeline";
import { experience, experienceSection } from "@/content/organization";
import {
  experienceYearRange,
  sortExperienceNewestFirst,
} from "@/lib/experience";

const items: TimelineItem[] = sortExperienceNewestFirst(experience).map(
  (entry, i) => ({
    id: `${entry.type}-${entry.title}-${i}`,
    date: entry.period,
    badge: entry.type,
    title: entry.title,
    subtitle: entry.organization,
    description: entry.description,
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
