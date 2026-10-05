import Link from "next/link";

import SiteHeader from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { notFoundSection } from "@/content/site";

// Shown for any unknown URL, including /projects/<unknown slug>.
export default function NotFound() {
  const { code, heading, text, homeLabel, projectsLabel } = notFoundSection;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 items-center px-4 pt-28 pb-16">
        <div className="w-full space-y-5 rounded-xl border border-border bg-card p-8 text-center backdrop-blur-md md:p-12">
          <p className="font-mono text-sm tracking-widest text-foreground">
            {code}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {heading}
          </h1>
          <p className="text-base text-foreground">{text}</p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-full px-6 text-sm font-medium"
            >
              <Link href="/">{homeLabel}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full px-6 text-sm font-medium"
            >
              <Link href="/projects">{projectsLabel}</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
