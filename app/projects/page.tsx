import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CategoryFilter } from "@/components/shared/category-filter";
import { ProjectCard } from "@/components/shared/project-card";
import { Reveal } from "@/components/shared/reveal";
import SiteHeader from "@/components/shared/site-header";
import { projects, projectsPage, projectsSection } from "@/content/projects";
import { site } from "@/content/site";
import { projectCategories, sortProjectsNewestFirst } from "@/lib/projects";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: projectsPage.description,
};

const CARD = "rounded-xl border border-border bg-card backdrop-blur-md";

export default async function ProjectsPage({
  searchParams,
}: PageProps<"/projects">) {
  const params = await searchParams;
  const raw = params.category;
  // ?category=a&category=b: the first one wins.
  const requested = (Array.isArray(raw) ? raw[0] : raw) || null;

  const categories = projectCategories(projects);
  const filtered = requested
    ? projects.filter((project) => project.category === requested)
    : projects;
  const visible = sortProjectsNewestFirst(filtered);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-28 pb-16 md:pb-24">
        {/* Text sits on a card surface everywhere except the Hero. */}
        <div className={`${CARD} space-y-4 p-6 md:p-8`}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm font-mono text-xs tracking-widest text-foreground uppercase outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {projectsPage.backLabel}
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {projectsPage.heading}
          </h1>
          <p className="max-w-2xl text-base text-foreground md:text-lg">
            {projectsPage.intro}
          </p>
        </div>

        <div className="mt-6 lg:mt-8">
          <CategoryFilter
            label={projectsPage.filterLabel}
            allLabel={projectsPage.allLabel}
            categories={categories}
            active={requested}
            basePath="/projects"
          />
        </div>

        {visible.length > 0 ? (
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-8">
            {visible.map((project, i) => (
              <li key={project.slug}>
                <Reveal delay={Math.min(i, 5) * 0.05} className="h-full">
                  <ProjectCard
                    project={project}
                    action={projectsSection.action}
                    index={i}
                    headingLevel="h2"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className={`${CARD} mt-6 flex flex-col items-start gap-4 p-6 md:p-8 lg:mt-8`}
          >
            <p className="text-base text-foreground">
              {projectsPage.emptyText}
            </p>
            <Link
              href="/projects"
              className="rounded-sm text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 outline-none hover:decoration-primary focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {projectsPage.showAllLabel}
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
