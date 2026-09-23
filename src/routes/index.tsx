import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Lenis from "lenis";
import { About, Build, Contact, Footer, Stack } from "@/components/cine/Sections";
import { Hero } from "@/components/cine/Hero";
import { Preloader } from "@/components/cine/Preloader";
import { SiteNav } from "@/components/cine/SiteNav";
import { Work } from "@/components/cine/Work";
import { ScrollTrigger, ensureGsap, gsap, useRevealScope } from "@/components/cine/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Isaiah Serrano — Web Developer & IT Support" },
      {
        name: "description",
        content:
          "Isaiah Serrano builds practical web and desktop tools — and keeps hardware and systems running. Selected work: Twofold, Sino G, Barangay Management System.",
      },
      { property: "og:title", content: "Isaiah Serrano — Web Developer & IT Support" },
      {
        property: "og:description",
        content:
          "Cinematic folio of Isaiah Serrano: selected work, what I build, history, stack, about, contact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = React.useState(false);
  const scope = useRevealScope<HTMLDivElement>();

  // Smooth scroll (skipped for reduced motion / SSR-safe).
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!ensureGsap()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", () => ScrollTrigger.update());
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor navigation that respects the menu + lenis.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: id === "#top" ? 0 : -8 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Refresh triggers once the intro lifts (layout + images settle).
  React.useEffect(() => {
    if (!booted) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [booted]);

  return (
    <div
      ref={scope}
      className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
    >
      {!booted ? <Preloader onDone={() => setBooted(true)} /> : null}
      <SiteNav />
      <main id="main">
        <Hero started={booted} />
        <Work />
        <Build />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
