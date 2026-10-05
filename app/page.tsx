import Hero from "@/components/sections/hero";

// Sections are composed here in the order listed in CLAUDE.md.
// Keep wrappers transparent so the shader background shows through.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      {/* TODO: add the remaining sections (About, Skills, ...) from prompts/03 onward */}
    </main>
  );
}
