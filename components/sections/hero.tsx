import Header, {
  type NavigationSection,
} from "@/components/ui/hero-01-utils/header";
import HeroSection from "@/components/ui/hero-01-utils/hero";
import BrandSlider, {
  type BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import { site } from "@/content/site";
import { languages, tools, logoUrl } from "@/content/tech-stack";
import type { TechLogo } from "@/lib/types";

// The site is dark-only, so both variants use the white monochrome logo.
// For brand colors, use logoUrl(item.slug) without the color argument.
// Items without a Simple Icons logo (slug: null) render as a text badge.
const toBrandList = (items: TechLogo[]): BrandList[] =>
  items.map((item) => {
    const src = item.slug ? logoUrl(item.slug, "ffffff") : null;
    return { name: item.name, image: src, lightimg: src };
  });

export default function Hero() {
  const navigationData: NavigationSection[] = site.nav.map((item) => ({
    title: item.title,
    href: item.href,
  }));

  const { hero } = site;

  return (
    <div id="home" className="relative">
      <Header navigationData={navigationData} brandName={site.name} />
      <div>
        <HeroSection
          badge={hero.badge}
          headline={hero.headline}
          description={hero.description}
          primaryCta={hero.primaryCta}
          secondaryCta={
            site.cvPath
              ? { label: hero.secondaryCta.label, href: site.cvPath }
              : null
          }
          profileImage={site.profileImage}
          profileAlt={site.name}
        />
        <div className="flex flex-col gap-6">
          <BrandSlider
            brandList={toBrandList(languages)}
            label={hero.languagesLabel}
          />
          <BrandSlider
            brandList={toBrandList(tools)}
            label={hero.toolsLabel}
            reverse
          />
        </div>
      </div>
    </div>
  );
}
