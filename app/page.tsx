import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";

// Sections are composed here in the order listed in CLAUDE.md.
// Keep wrappers transparent so the shader background shows through.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      {/* TODO: About & Education (prompts/06) and Skills (prompts/07) go here, before Projects. */}
      <Projects />
      {/* TODO: Publications, Organization, Certifications, Contact. */}
    </main>
  );
}
