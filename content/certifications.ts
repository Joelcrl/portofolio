import type {
  Certification,
  CertificationsSectionContent,
} from "@/lib/types";

// Newest first. Images are rendered from the original PDFs at 1600px wide.
export const certifications: Certification[] = [
  {
    title: "Build an AI Agent",
    issuer: "IBM SkillsBuild",
    date: "September 2026",
    image: "/images/certificates/ibm-build-an-ai-agent.jpg",
    verifyUrl: "https://www.credly.com/go/65nBLgfu",
  },
  {
    title: "AWS Academy Graduate: Cloud Architecting",
    issuer: "AWS Academy",
    date: "September 2026",
    image: "/images/certificates/aws-cloud-architecting.jpg",
    verifyUrl: "https://www.credly.com/go/du1ZRJs8",
  },
  {
    title: "AWS Academy Graduate: Cloud Foundations",
    issuer: "AWS Academy",
    date: "May 2026",
    image: "/images/certificates/aws-cloud-foundations.jpg",
    verifyUrl: "https://www.credly.com/go/kz7lkKca",
  },
  {
    title: "Azure AI Fundamentals (AI-900T00-A), Microsoft Elevate AI Training",
    issuer: "Microsoft Indonesia and GreatNusa",
    date: "March 2026",
    image: "/images/certificates/microsoft-azure-ai-fundamentals.jpg",
    verifyUrl: null, // no public verification link on the certificate
  },
  {
    title: "Dean's List 2025",
    issuer: "BINUS University, School of Computer Science",
    date: "December 2025",
    image: "/images/certificates/deans-list.jpg",
    verifyUrl: null,
  },
];

export const certificationsSection: CertificationsSectionContent = {
  title: "Certifications",
  verifyLabel: "Verify",
  imageAlt: (title) => `${title} certificate`,
  previousLabel: "Previous certificate",
  nextLabel: "Next certificate",
};
