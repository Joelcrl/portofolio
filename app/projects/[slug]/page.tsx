import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { ProjectCover } from "@/components/shared/project-cover";
import { ProjectGallery } from "@/components/shared/project-gallery";
import SiteHeader from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { projectDetail, projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

// Only the slugs from content/projects.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${site.name}`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.tagline,
      ...(project.coverImage && { images: [{ url: project.coverImage }] }),
    },
  };
}

const CARD = "rounded-xl border border-border bg-card backdrop-blur-md";
// Reading width. The cover, the metrics strip and the gallery use the full
// page width.
const TEXT = "mx-auto w-full max-w-[760px]";
const H2 = "text-2xl font-semibold tracking-tight";
const CHIP =
  "rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground";

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(CARD, TEXT, "space-y-4 p-6 md:p-8")}>
      <h2 className={H2}>{heading}</h2>
      {children}
    </section>
  );
}

function Paragraphs({ text }: { text: string }) {
  return text.split(/\n{2,}/).map((paragraph, i) => (
    <p
      key={i}
      className="text-base leading-relaxed text-pretty text-foreground"
    >
      {paragraph}
    </p>
  ));
}

function PagerLink({
  project,
  label,
  align,
}: {
  project: Project;
  label: string;
  align: "start" | "end";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        CARD,
        "group flex flex-col gap-1 p-5 outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none",
        align === "end" && "sm:items-end sm:text-right",
      )}
    >
      <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-foreground uppercase">
        {align === "start" && <ArrowLeft className="size-4" aria-hidden />}
        {label}
        {align === "end" && <ArrowRight className="size-4" aria-hidden />}
      </span>
      <span className="text-lg font-semibold tracking-tight">
        {project.title}
      </span>
    </Link>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  // Neighbours in the order of content/projects.ts. No wrap-around.
  const previous = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;
  const d = projectDetail;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 pt-28 pb-16 md:pb-24">
        <header className={cn(CARD, TEXT, "space-y-5 p-6 md:p-8")}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-sm font-mono text-xs tracking-widest text-foreground uppercase outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {d.backLabel}
          </Link>

          <p className="font-mono text-xs tracking-widest text-foreground uppercase">
            {project.category} · {project.date}
          </p>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg text-pretty text-foreground">
              {project.tagline}
            </p>
          </div>

          {(project.links.demo || project.links.repo) && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {project.links.demo && (
                <Button
                  asChild
                  className="h-11 rounded-full px-6 text-sm font-medium"
                >
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.demoLabel}
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
              {project.links.repo && (
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full px-6 text-sm font-medium"
                >
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.repoLabel}
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
            </div>
          )}
        </header>

        <ProjectCover
          title={project.title}
          image={project.coverImage}
          sizes="(min-width: 1024px) 56rem, 100vw"
          variant={index}
          priority
          // The title is the h1 right above, so the cover is decoration.
          decorative
          className="aspect-video w-full rounded-xl border border-border"
        />

        {project.metrics.length > 0 && (
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn(CARD, "flex flex-col-reverse gap-2 p-5")}
              >
                <dt className="text-sm text-foreground">{metric.label}</dt>
                <dd className="font-mono text-4xl leading-none font-semibold">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {project.gallery.length > 0 && (
          <section
            aria-labelledby="gallery-heading"
            className={cn(CARD, "space-y-4 p-6 md:p-8")}
          >
            <h2 id="gallery-heading" className={H2}>
              {d.galleryHeading}
            </h2>
            <ProjectGallery
              images={project.gallery.map((src, i) => {
                const alt = d.galleryAlt(project.title, i + 1);
                return { src, alt, openLabel: d.galleryOpenLabel(alt) };
              })}
              title={project.title}
            />
          </section>
        )}

        <Section heading={d.overviewHeading}>
          <Paragraphs text={project.summary} />
        </Section>

        {project.details?.map((section) => (
          <Section key={section.heading} heading={section.heading}>
            <Paragraphs text={section.body} />
          </Section>
        ))}

        {project.stack.length > 0 && (
          <Section heading={d.stackHeading}>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className={CHIP}>
                  {tech}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.team && (
          <Section heading={d.teamHeading}>
            <p className="text-base text-foreground">
              {d.teamSize(project.team.size)}
            </p>
            {project.team.role && (
              <p className="text-base text-foreground">
                <span className="font-mono text-xs tracking-widest uppercase">
                  {d.roleLabel}
                </span>
                <br />
                {project.team.role}
              </p>
            )}
          </Section>
        )}

        {(previous || next) && (
          <nav
            aria-label={d.moreLabel}
            className={cn(TEXT, "grid gap-4 pt-4 sm:grid-cols-2")}
          >
            {previous ? (
              <PagerLink
                project={previous}
                label={d.previousLabel}
                align="start"
              />
            ) : (
              <span aria-hidden className="hidden sm:block" />
            )}
            {next && (
              <PagerLink project={next} label={d.nextLabel} align="end" />
            )}
          </nav>
        )}
      </main>
    </>
  );
}
