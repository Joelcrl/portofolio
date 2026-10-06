import { certifications } from "@/content/certifications";
import { experience } from "@/content/organization";
import type {
  AboutSectionContent,
  ContactSectionContent,
  FooterContent,
  NotFoundContent,
  SiteContent,
  SocialLinks,
} from "@/lib/types";

export const site: SiteContent = {
  name: "Joel Chriscendo",
  fullName: "Joel Chriscendo Rahardjo Liem",

  profileImage: "/images/profile.jpeg",
  cvPath: "/cv/Joel-CV.pdf",
  links: {
    email: "mailto:jchriscendo@gmail.com",
    linkedin: "https://linkedin.com/in/joel-chriscendo-527099309",
    instagram: "https://instagram.com/joel_crl",
    github: "https://github.com/Joelcrl",
    scholar: null,
  },

  nav: [
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "Publications", href: "#publications" },
    ...(experience.length > 0
      ? [{ title: "Experience & Organization", href: "#experience" }]
      : []),
    ...(certifications.length > 0
      ? [{ title: "Certifications", href: "#certifications" }]
      : []),
    { title: "Contact", href: "#contact" },
  ],

  hero: {
    badge: "Data Science @ BINUS University",
    headline:
      "Data Science student building ML models and the pipelines that feed them.",
    description:
      "Computer Science student at BINUS University specializing in Data Science. I build end-to-end machine learning systems, from data collection and modeling to deployed dashboards, with a growing focus on data engineering.",
    primaryCta: { label: "View Projects", href: "#projects" },
    // Links to site.cvPath, hidden automatically while it is null.
    secondaryCta: { label: "Download CV" },
    languagesLabel: "Languages",
    toolsLabel: "Libraries & Tools",
  },

  longBio:
    "I'm Joel, a Computer Science student at BINUS University specializing in Data Science, graduating in 2028. I enjoy the full path from raw data to a working product: scraping and cleaning data, building and explaining models, and shipping them as tools people can actually use. My work spans explainable churn prediction, a real-time streaming pipeline with Kafka and Spark, and research on dynamic ensemble selection accepted at ICTIM 2026. Outside coursework, I serve as Vice Manager of the Academic Event commission at HIMTI. I'm currently looking for internship opportunities in data science, machine learning, or data engineering.",
};

export const aboutSection: AboutSectionContent = {
  eyebrow: "About",
  heading: "Hi, I'm Joel.",
  graduationLabel: "Expected graduation",
  gpaLabel: "GPA",
  relevantLabel: "Relevant coursework",
  foundationsLabel: "Foundations",
  interestsLabel: "Interests",
};

/** Visible name and accessible label for each profile link. */
export const socialLabels: Record<keyof SocialLinks, string> = {
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  scholar: "Google Scholar",
};

export const contactSection: ContactSectionContent = {
  eyebrow: "Contact",
  heading: "Let's work together",
  text: "I'm looking for internship opportunities in data science, machine learning and data engineering. My inbox is open.",
  emailLabel: "Email me",
  cvLabel: "Download CV",
};

export const footerSection: FooterContent = {
  navigateLabel: "Navigate",
  connectLabel: "Connect",
  allProjects: { label: "All Projects", href: "/projects" },
  builtWith: "Built with Next.js",
  copyright: (year, name) => `© ${year} ${name}`,
};

export const notFoundSection: NotFoundContent = {
  code: "404",
  heading: "Page not found",
  text: "The page you are looking for does not exist or has moved.",
  homeLabel: "Back to home",
  projectsLabel: "View all projects",
};
