export type NavItem = {
  title: string;
  href: string;
};

export type SocialLinks = {
  email: string | null;
  linkedin: string | null;
  instagram: string | null;
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

export type AboutSectionContent = {
  eyebrow: string;
  heading: string;
  graduationLabel: string;
  gpaLabel: string;
  relevantLabel: string;
  foundationsLabel: string;
};

export type ContactSectionContent = {
  eyebrow: string;
  heading: string;
  text: string;
  emailLabel: string;
  cvLabel: string;
};

export type NotFoundContent = {
  code: string;
  heading: string;
  text: string;
  homeLabel: string;
  projectsLabel: string;
};

export type FooterContent = {
  navigateLabel: string;
  connectLabel: string;
  allProjects: { label: string; href: string };
  builtWith: string;
  copyright: (year: number, name: string) => string;
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

export type ProjectsSectionContent = {
  /** Section heading, also the label in the middle of the wheel. */
  title: string;
  /** Label on each project's link. */
  action: string;
  viewAll: { label: string; href: string };
};

export type ProjectsPageContent = {
  backLabel: string;
  heading: string;
  intro: string;
  /** Meta description for search results. */
  description: string;
  filterLabel: string;
  /** Label of the pill that clears the filter. */
  allLabel: string;
  emptyText: string;
  showAllLabel: string;
};

export type ProjectDetailContent = {
  backLabel: string;
  demoLabel: string;
  repoLabel: string;
  overviewHeading: string;
  stackHeading: string;
  teamHeading: string;
  teamSize: (size: number) => string;
  roleLabel: string;
  /** Accessible name of the previous and next project links. */
  moreLabel: string;
  previousLabel: string;
  nextLabel: string;
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

export type OrganizationSectionContent = {
  title: string;
  /** Heading above the committee cards. */
  committeesTitle: string;
  /** Joins the first and last year, e.g. "2025 to 2026". */
  periodLabel: (from: string, to: string) => string;
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  verifyUrl: string | null;
};

export type CertificationsSectionContent = {
  title: string;
  /** Label on the verification link. */
  verifyLabel: string;
  /** Alt text for a certificate image. */
  imageAlt: (title: string) => string;
  previousLabel: string;
  nextLabel: string;
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
  /** Gets the larger tile in the Skills grid. */
  featured?: boolean;
};

export type SkillsSectionContent = {
  eyebrow: string;
  heading: string;
  /** Label before the project links on each card. */
  usedInLabel: string;
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

export type PublicationsSectionContent = {
  eyebrow: string;
  heading: string;
  readPaperLabel: string;
  /** Accessible name for the certificate thumbnail button. */
  viewCertificateLabel: (title: string) => string;
  /** Visible title of the certificate dialog. */
  certificateTitle: string;
  /** Alt text for the certificate image. */
  certificateAlt: (title: string) => string;
};

export type TechLogo = {
  name: string;
  /** Simple Icons slug (https://simpleicons.org), or null when no logo exists */
  slug: string | null;
};
