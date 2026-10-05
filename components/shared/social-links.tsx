import { Mail } from "lucide-react";
import type { ReactNode } from "react";

import { LinkedInIcon } from "@/components/shared/icons";
import { socialLabels } from "@/content/site";
import { logoUrl } from "@/content/tech-stack";
import type { SocialLinks } from "@/lib/types";

export type SocialEntry = {
  key: keyof SocialLinks;
  label: string;
  href: string;
  icon: ReactNode;
  /** Links to other sites open in a new tab; mailto: does not. */
  external: boolean;
};

const ICON = "size-4";

// Simple Icons logos are small remote SVGs, so a plain <img> is enough.
const logo = (slug: string) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={logoUrl(slug, "ffffff")}
    alt=""
    width={16}
    height={16}
    className={ICON}
  />
);

const icons: Record<keyof SocialLinks, ReactNode> = {
  email: <Mail className={ICON} aria-hidden />,
  github: logo("github"),
  linkedin: <LinkedInIcon className={ICON} />,
  scholar: logo("googlescholar"),
};

/**
 * Profile links in a fixed order, skipping any whose value is still null, so
 * every consumer hides empty slots the same way.
 */
export function getSocials(
  links: SocialLinks,
  keys: (keyof SocialLinks)[] = ["email", "github", "linkedin", "scholar"],
): SocialEntry[] {
  return keys.flatMap((key) => {
    const href = links[key];
    if (!href) return [];
    return [
      {
        key,
        label: socialLabels[key],
        href,
        icon: icons[key],
        external: key !== "email",
      },
    ];
  });
}
