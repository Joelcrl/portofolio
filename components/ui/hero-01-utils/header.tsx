"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavigationSection = {
  title: string;
  href: string;
};

type HeaderProps = {
  navigationData: NavigationSection[];
  brandName: string;
  className?: string;
};

// The nav item with this href is shown as the CTA button instead of a link.
const CTA_HREF = "#contact";
const HOME_HREF = "#home";

/** Href of the section crossing the middle of the viewport, or null. */
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = hrefs.join("|");

  useEffect(() => {
    const ids = key
      .split("|")
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = ids.find((id) => visible.get(id));
        setActive(current ? `#${current}` : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

function scrollToHash(href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  history.pushState(null, "", href);
}

const CtaButton = ({
  item,
  className,
  onClick,
}: {
  item: NavigationSection;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <Button
    asChild
    className={cn(
      "group relative h-10 w-fit overflow-hidden rounded-full p-1 ps-4 pe-12 text-sm font-medium transition-all duration-300 hover:ps-12 hover:pe-4 motion-reduce:transition-none",
      className,
    )}
  >
    <a href={item.href} onClick={onClick}>
      <span className="relative z-10">{item.title}</span>
      <span className="absolute right-1 flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:right-[calc(100%-36px)] group-hover:rotate-45 motion-reduce:transition-none">
        <ArrowUpRight size={16} />
      </span>
    </a>
  </Button>
);

const Header = ({ navigationData, brandName, className }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Href to scroll to once the mobile menu has finished closing.
  const pendingHref = useRef<string | null>(null);

  const cta = navigationData.find((item) => item.href === CTA_HREF) ?? null;
  const links = navigationData.filter((item) => item !== cta);
  const active = useActiveSection(navigationData.map((item) => item.href));

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false);
  }, []);

  useEffect(() => {
    // Sync once on mount, e.g. when the page is reloaded mid-scroll.
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  // The Sheet locks page scroll while open, so close it first and scroll after.
  const handleMobileNav = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    pendingHref.current = event.currentTarget.getAttribute("href");
    setIsOpen(false);
  };

  const handleSheetClosed = (event: Event) => {
    const href = pendingHref.current;
    if (!href) return;
    event.preventDefault();
    pendingHref.current = null;
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-center px-4",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-fit w-full max-w-6xl items-center justify-between gap-3.5 border transition-all duration-300 motion-reduce:transition-none lg:gap-6",
            scrolled
              ? "rounded-full border-border bg-background/60 p-2.5 ps-5 shadow-2xl shadow-primary/10 backdrop-blur-lg"
              : "border-transparent bg-transparent",
          )}
        >
          <a
            href={HOME_HREF}
            className="rounded-md text-base font-semibold tracking-tight text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {brandName}
          </a>

          {/* Desktop navigation */}
          <NavigationMenu className="rounded-full border border-border bg-background/40 p-0.5 backdrop-blur-md max-lg:hidden">
            <NavigationMenuList className="flex gap-0">
              {links.map((item) => {
                const isActive = active === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium tracking-normal text-muted-foreground transition hover:bg-muted hover:text-foreground",
                        isActive && "bg-muted text-foreground",
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-4">
            {cta && <CtaButton item={cta} className="hidden lg:flex" />}

            {/* Mobile navigation */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="block rounded-full border border-border bg-background/40 p-2 backdrop-blur-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
                  <Menu width={20} height={20} />
                  <span className="sr-only">Open menu</span>
                </SheetTrigger>

                <SheetContent
                  showCloseButton={false}
                  side="right"
                  className="w-full border-l-0 p-0 sm:w-96"
                  onCloseAutoFocus={handleSheetClosed}
                >
                  <div className="flex items-center justify-between p-6">
                    <span className="text-base font-semibold tracking-tight text-foreground">
                      {brandName}
                    </span>
                    <SheetClose className="block rounded-full border border-border p-2.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
                      <X width={16} height={16} />
                      <span className="sr-only">Close menu</span>
                    </SheetClose>
                  </div>

                  <div className="flex flex-col gap-8 overflow-y-auto px-6 pb-6">
                    <SheetTitle className="sr-only">{brandName}</SheetTitle>
                    <NavigationMenu
                      orientation="vertical"
                      className="flex-none items-start"
                    >
                      <NavigationMenuList className="flex flex-col items-start gap-3">
                        {links.map((item) => {
                          const isActive = active === item.href;
                          return (
                            <NavigationMenuItem key={item.href}>
                              <NavigationMenuLink
                                href={item.href}
                                onClick={handleMobileNav}
                                aria-current={isActive ? "location" : undefined}
                                className={cn(
                                  "group/nav flex items-center p-0 text-2xl font-semibold tracking-tight transition-all hover:bg-transparent focus:bg-transparent motion-reduce:transition-none",
                                  isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:translate-x-2 hover:text-foreground",
                                )}
                              >
                                <span
                                  aria-hidden
                                  className={cn(
                                    "h-0.5 overflow-hidden bg-accent transition-all duration-300",
                                    isActive
                                      ? "mr-2 w-4 opacity-100"
                                      : "w-0 opacity-0 group-hover/nav:mr-2 group-hover/nav:w-4 group-hover/nav:opacity-100",
                                  )}
                                />
                                {item.title}
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          );
                        })}
                      </NavigationMenuList>
                    </NavigationMenu>

                    {cta && <CtaButton item={cta} onClick={handleMobileNav} />}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </MotionConfig>
  );
};

export default Header;
