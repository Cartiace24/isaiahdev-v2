import * as React from "react";
import { profile } from "@/data/portfolio";
import { ensureGsap, gsap } from "./reveal";

/**
 * Full-screen editorial hero. Entrance is driven by `started`
 * (set when the preloader finishes); scroll drift via GSAP.
 */
export function Hero({ started }: { started: boolean }) {
  const root = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!ensureGsap()) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-title]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        "[data-hero-photo]",
        { scale: 1.12, yPercent: -4 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [started]);

  return (
    <header
      ref={root}
      id="top"
      className={`relative flex min-h-svh flex-col justify-end overflow-clip px-6 pt-24 pb-8 md:px-12 ${
        started ? "is-visible" : ""
      }`}
    >
      {/* meta row */}
      <div
        className="mb-6 flex items-center justify-between gap-4 transition-all delay-500 duration-700"
        style={{ opacity: started ? 1 : 0 }}
      >
        <p className="label-mono text-muted-foreground">SANTA ROSA, PH</p>
        <p className="label-mono text-muted-foreground">WEB / DESKTOP / IT</p>
        <p className="label-mono hidden text-primary sm:block">FOLIO — 2026</p>
      </div>

      {/* giant identity */}
      <h1 data-hero-title aria-label="Isaiah Serrano — Web Developer / IT Support">
        <span className="mask-line" aria-hidden="true">
          <span
            className="mask-line-inner display-hero"
            style={{ transitionDelay: started ? "60ms" : "0ms" }}
          >
            ISAIAH
          </span>
        </span>
        <span className="mask-line" aria-hidden="true">
          <span
            className="mask-line-inner display-hero text-primary"
            style={{ transitionDelay: started ? "180ms" : "0ms" }}
          >
            SERRANO
          </span>
        </span>
      </h1>

      {/* editorial composition: portrait + statement */}
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
        <figure
          className="img-field relative overflow-hidden border border-border md:col-span-4 md:order-2"
          style={{ transitionDelay: started ? "320ms" : "0ms" }}
        >
          <img
            data-hero-photo
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={680}
            height={850}
            loading="eager"
            className="photo-bw aspect-[4/5] w-full object-cover object-top"
          />
          <figcaption className="flex items-center justify-between border-t border-border bg-background px-3 py-2">
            <span className="label-mono text-muted-foreground">ID / 001 — {profile.name}</span>
            <span className="label-mono text-primary">● OPEN</span>
          </figcaption>
        </figure>

        <div className="md:col-span-8 md:order-1">
          <p
            className="label-mono text-primary transition-all delay-300 duration-700"
            style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(14px)" }}
          >
            {profile.role}
          </p>
          <p
            className="mt-4 max-w-[34ch] text-xl leading-snug font-medium tracking-tight transition-all delay-400 duration-700 sm:text-2xl"
            style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(14px)" }}
          >
            I build practical web and desktop tools — and keep hardware and systems running.
          </p>
          <div
            className="mt-6 flex flex-wrap gap-x-8 gap-y-2 transition-all delay-500 duration-700"
            style={{ opacity: started ? 1 : 0 }}
          >
            <a
              href="#work"
              className="link-line label-mono text-foreground"
              aria-label="Skip to selected work"
            >
              SELECTED WORK ↓
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="link-line label-mono text-muted-foreground hover:text-foreground"
            >
              GITHUB ↗
            </a>
            <a
              href={profile.emailHref}
              target="_blank"
              rel="noreferrer"
              className="link-line label-mono text-muted-foreground hover:text-foreground"
            >
              EMAIL ↗
            </a>
          </div>
        </div>
      </div>

      {/* bottom index strip */}
      <div
        className="rule-t mt-10 flex items-center justify-between gap-4 pt-4 transition-opacity delay-700 duration-700"
        style={{ opacity: started ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="label-mono text-muted-foreground">01 — INTRO</span>
        <span className="label-mono text-muted-foreground">SCROLL</span>
        <span className="label-mono text-muted-foreground">02 — WORK ↓</span>
      </div>
    </header>
  );
}
