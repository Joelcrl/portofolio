export type NavItem = {
  title: string;
  href: string;
};

export type SocialLinks = {
  email: string | null;
  linkedin: string | null;
  github: string | null;
  scholar: string | null;
};

export type HeroContent = {
  badge: string;
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string | null };
  languagesLabel: string;
  toolsLabel: string;
};

export type SiteContent = {
  name: string;
  fullName: string;
  profileImage: string | null;
  cvPath: string | null;
  links: SocialLinks;
  nav: NavItem[];
  hero: HeroContent;
  longBio: string;
};

export type ProjectLinks = {
  repo: string | null;
  demo: string | null;
  paper: string | null;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** One line, shown under the title on cards. */
  tagline: string;
  /** One paragraph for the detail page. */
  summary: string;
  /** Headline numbers, e.g. { label: "ROC-AUC", value: "0.849" } */
  metrics: { label: string; value: string }[];
  stack: string[];
  links: ProjectLinks;
  /** Cover image, ideally 16:9. null renders a gradient placeholder. */
  coverImage: string | null;
  /** null for solo projects or when team details should not be shown. */
  team: { size: number; role: string | null } | null;
  /** e.g. "September 2026" */
  date: string;
  /** Shown in the Core Projects section on Home. */
  core: boolean;
  /** Optional longer write-up for the detail page, e.g. Problem, Approach, Results. */
  details?: { heading: string; body: string }[];
};

export type OrganizationRole = {
  year: string;
  /** null when the month is unknown */
  month: string | null;
  title: string;
  description: string;
};

export type Committee = {
  title: string;
  year: string;
  description: string;
  image: string | null;
};

export type Organization = {
  name: string;
  /** Group photo or logo for the timeline. null hides it. */
  image: string | null;
  roles: OrganizationRole[];
  committees: Committee[];
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  verifyUrl: string | null;
};

export type Education = {
  university: string;
  degree: string;
  specialization: string;
  expectedGraduation: string;
  gpa: { value: string; scale: string };
  relevantCourses: string[];
  supportingCourses: string[];
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
  /** Slugs from content/projects.ts where these skills were used. */
  usedIn: string[];
};

export type Publication = {
  title: string;
  venue: string;
  status: string;
  year: string;
  authors: string[];
  summary: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  paperUrl: string | null;
  certificateImage: string | null;
};

export type TechLogo = {
  name: string;
  /** Simple Icons slug (https://simpleicons.org), or null when no logo exists */
  slug: string | null;
};
