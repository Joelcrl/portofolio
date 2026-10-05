import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectCover } from "@/components/shared/project-cover";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
  /** Link label, e.g. "View project". */
  action: string;
  /** Picks the placeholder gradient when there is no cover image. */
  index?: number;
  /** Heading level for the title, so the card fits the page outline. */
  headingLevel?: "h2" | "h3";
};

/** Project summary card linking to /projects/<slug>. */
export function ProjectCard({
  project,
  action,
  index = 0,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const metrics = project.metrics.slice(0, 2);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card backdrop-blur-md transition-colors focus-within:border-accent hover:border-accent/60">
      <ProjectCover
        title={project.title}
        image={project.coverImage}
        sizes="(min-width: 768px) 42rem, 100vw"
        variant={index}
        decorative
        className="aspect-video w-full"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          {project.category}
        </p>
        <Heading className="text-xl font-semibold tracking-tight text-foreground">
          {/* Stretched link: the whole card is clickable, the title names it. */}
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>

        {metrics.length > 0 && (
          <dl className="flex flex-wrap gap-x-6 gap-y-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="text-xs text-muted-foreground">{metric.label}</dt>
                <dd className="font-mono text-lg text-foreground">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <span
          aria-hidden
          className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent"
        >
          {action}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </span>
      </div>
    </article>
  );
}
