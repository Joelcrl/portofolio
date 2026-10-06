"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { coreProjects, projectsSection } from "@/content/projects";
import { useMediaQuery } from "@/hooks/use-media-query";

// Same query as the `wheel:` variant in app/globals.css. Below it (or on touch
// screens) the wheel would block vertical scrolling, so a card list renders.
const WHEEL_QUERY = "(min-width: 1024px) and (pointer: fine)";

const wheelItems: WorksWheelItem[] = coreProjects.map((project) => ({
  title: project.title,
  image: project.coverImage,
  href: `/projects/${project.slug}`,
  category: project.category,
  tagline: project.tagline,
  metrics: project.metrics,
}));

export default function Projects() {
  const showWheel = useMediaQuery(WHEEL_QUERY);
  const { title, action, viewAll } = projectsSection;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-16 wheel:py-0"
    >
      {/* On desktop the wheel shows the title in its ring. */}
      <h2
        id="projects-heading"
        className="mb-8 px-4 text-center text-3xl font-semibold tracking-tight wheel:sr-only"
      >
        {title}
      </h2>

      {/* Desktop: the stage is laid out by CSS from the first paint; the wheel
          mounts into it once the media query is confirmed on the client.
          isolate keeps the cards' z-index (up to 100) inside the stage, so
          the link below always sits above them. */}
      <div className="isolate hidden h-[calc(100svh-6rem)] min-h-[36rem] wheel:block">
        {showWheel && (
          <WorksWheel items={wheelItems} label={title} action={action} />
        )}
      </div>

      {/* Mobile, tablet and touch screens. */}
      <ul className="mx-auto flex max-w-2xl flex-col gap-6 px-4 wheel:hidden">
        {coreProjects.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} action={action} index={i} />
          </li>
        ))}
      </ul>

      <div className="relative mt-10 flex justify-center px-4 wheel:mt-6">
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full px-6 text-sm font-medium backdrop-blur-md"
        >
          <Link href={viewAll.href}>
            {viewAll.label}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
