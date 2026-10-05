import About from "@/components/sections/about";
import Certifications from "@/components/sections/certifications";
import Hero from "@/components/sections/hero";
import Organization from "@/components/sections/organization";
import Projects from "@/components/sections/projects";
import Publications from "@/components/sections/publications";
import Skills from "@/components/sections/skills";

// Sections are composed here in the order listed in CLAUDE.md.
// Keep wrappers transparent so the shader background shows through.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Publications />
      <Organization />
      <Certifications />
      {/* TODO: Contact (prompts/09). */}
    </main>
  );
}
