import type {
  Certification,
  CertificationsSectionContent,
} from "@/lib/types";

// TODO: Joel, add your certifications. The section stays hidden while empty.
export const certifications: Certification[] = [
  // {
  //   title: "Certificate name",
  //   issuer: "Issuer",
  //   date: "Month Year",
  //   image: "/images/certificates/certificate-name.jpg",
  //   verifyUrl: "https://...",
  // },
];

export const certificationsSection: CertificationsSectionContent = {
  title: "Certifications",
  verifyLabel: "Verify",
  imageAlt: (title) => `${title} certificate`,
  previousLabel: "Previous certificate",
  nextLabel: "Next certificate",
};
