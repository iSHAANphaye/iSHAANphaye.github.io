import { StickyNav } from "@/components/layout/StickyNav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyNav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
