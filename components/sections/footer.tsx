import Link from "next/link";

import { getSocials } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { footerSection, site } from "@/content/site";

// The footer renders on every page, so in-page anchors need the home route in
// front: "#about" would otherwise resolve against /projects.
const toRoute = (href: string) => (href.startsWith("#") ? `/${href}` : href);

const LINK =
  "block w-fit rounded-sm text-sm text-foreground outline-none transition-colors hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none";

export default function Footer() {
  const socials = getSocials(site.links);
  const { navigateLabel, connectLabel, allProjects, builtWith, copyright } =
    footerSection;

  return (
    // Shader shows through; the card surface keeps text readable over it.
    <footer className="relative border-t border-border bg-card backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-2xl font-semibold tracking-tight">{site.name}</p>
            <p className="max-w-sm text-sm text-foreground">
              {site.hero.headline}
            </p>
          </div>

          <nav aria-label={navigateLabel} className="space-y-4">
            <h2 className="font-mono text-xs tracking-widest text-foreground uppercase">
              {navigateLabel}
            </h2>
            <ul className="space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={toRoute(item.href)} className={LINK}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={allProjects.href} className={LINK}>
                  {allProjects.label}
                </Link>
              </li>
            </ul>
          </nav>

          {socials.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-mono text-xs tracking-widest text-foreground uppercase">
                {connectLabel}
              </h2>
              {/* One provider for the whole row. */}
              <TooltipProvider>
                <ul className="flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <li key={social.key}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="size-10 rounded-full"
                          >
                            <a
                              href={social.href}
                              aria-label={social.label}
                              {...(social.external && {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              })}
                            >
                              {social.icon}
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </TooltipProvider>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-center text-sm text-foreground md:flex-row">
          <p>{copyright(new Date().getFullYear(), site.name)}</p>
          <p>{builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
