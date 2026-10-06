import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/content/projects";
import { skillGroups, skillsSection } from "@/content/skills";
import type { SkillGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

const CARD = "rounded-xl border border-border bg-card backdrop-blur-md";

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

// Grid placement. Desktop uses 6 columns: a featured group takes 4, the tile
// right after it takes the remaining 2, and the other tiles go two to a row.
// When those leave an odd one over, the last three share a row (or a single
// tile takes the full row) so none sits alone. Tablet uses 2 columns: a
// featured group takes the full row, and when the rest is an odd number, the
// last tile takes a full row too.
function spanFor(groups: SkillGroup[], index: number) {
  const group = groups[index];
  if (group.featured) return "md:col-span-2 lg:col-span-4";

  const rest = groups.filter((g) => !g.featured).length;
  const lonely = index === groups.length - 1 && rest % 2 === 1;
  const tablet = lonely ? "md:col-span-2" : "";

  // Tiles laid out in pairs: everything except featured groups and the tile
  // that fills the row next to one.
  const paired = groups.filter(
    (g, i) => !g.featured && !groups[i - 1]?.featured,
  );
  const position = paired.indexOf(group);
  const odd = paired.length % 2 === 1;
  const desktop =
    position === -1
      ? "lg:col-span-2"
      : !odd
        ? "lg:col-span-3"
        : paired.length === 1
          ? "lg:col-span-6"
          : position >= paired.length - 3
            ? "lg:col-span-2"
            : "lg:col-span-3";
  return `${tablet} ${desktop}`.trim();
}

function SkillCard({ group, featured }: { group: SkillGroup; featured: boolean }) {
  // Unknown slugs are skipped, so a link can never point to a missing project.
  const used = group.usedIn.flatMap((slug) => {
    const project = projectsBySlug.get(slug);
    return project ? [project] : [];
  });

  return (
    <article
      className={cn(
        CARD,
        "flex h-full flex-col gap-5 p-6 transition duration-300 motion-reduce:transition-none md:p-8",
        "hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_0_28px_-8px_var(--primary)] motion-reduce:hover:translate-y-0",
        "focus-within:border-primary focus-within:shadow-[0_0_28px_-8px_var(--primary)]",
      )}
    >
      <div className="space-y-2">
        <h3
          className={cn(
            "font-semibold tracking-tight",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {group.title}
        </h3>
        <p className="text-base text-foreground">{group.description}</p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>

      {used.length > 0 && (
        <div className="mt-auto space-y-3 border-t border-border pt-5">
          <h4 className="font-mono text-xs tracking-widest text-foreground uppercase">
            {skillsSection.usedInLabel}
          </h4>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {used.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 outline-none hover:decoration-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {project.title}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function Skills() {
  // Nothing to show, nothing to render, heading included.
  if (skillGroups.length === 0) return null;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24"
    >
      {/* Text sits on a card surface everywhere except the Hero. */}
      <Reveal className="mb-6 w-fit lg:mb-8">
        <div className={cn(CARD, "px-6 py-5")}>
          <SectionHeading
            eyebrow={skillsSection.eyebrow}
            title={skillsSection.heading}
            id="skills-heading"
          />
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 0.08}
            className={spanFor(skillGroups, i)}
          >
            <SkillCard group={group} featured={Boolean(group.featured)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
