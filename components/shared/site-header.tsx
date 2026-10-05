import Header, {
  type NavigationSection,
} from "@/components/ui/hero-01-utils/header";
import { site } from "@/content/site";

/** The site header, fed from content/site.ts. Works on Home and on other pages. */
export default function SiteHeader() {
  const navigationData: NavigationSection[] = site.nav.map((item) => ({
    title: item.title,
    href: item.href,
  }));

  return <Header navigationData={navigationData} brandName={site.name} />;
}
