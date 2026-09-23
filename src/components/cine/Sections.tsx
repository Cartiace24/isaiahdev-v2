import * as React from "react";
import { certifications, education, experience, profile } from "@/data/portfolio";
import { ensureGsap, gsap } from "./reveal";

/* ================= WHAT I BUILD + HISTORY ================= */

const ON_SCREEN = ["Web Applications", "React", "TypeScript", "Supabase", "Vite", "Tailwind CSS"];
const OFF_SCREEN = [
  "PC Building",
  "Hardware Repair",
  "Windows Troubleshooting",
  "System Setup",
  "IT Support",
];

export function Build() {
  const root = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!ensureGsap()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-timeline-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 75%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="build" aria-labelledby="build-heading" className="mt-32 md:mt-48">
      <div className="px-6 md:px-12" data-reveal>
        <p className="label-mono text-primary">02 — WHAT I BUILD</p>
        <h2 id="build-heading" className="mt-3">
          <span className="mask-line">
            <span className="mask-line-inner display-section">WHAT</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner display-section text-muted-foreground">I BUILD</span>
          </span>
        </h2>
      </div>

      <div className="mt-10 grid border-y border-border md:grid-cols-2">
        <div className="border-b border-border p-8 md:border-r md:border-b-0 md:p-14" data-reveal>
          <p className="label-mono text-primary">ON SCREEN — SOFTWARE</p>
          <ul className="mt-6 flex flex-col">
            {ON_SCREEN.map((item, i) => (
              <li
                key={item}
                className="rule-t flex items-baseline gap-4 py-3 last:border-b last:border-border"
              >
                <span className="label-mono w-8 shrink-0 text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    i === 0
                      ? "text-2xl font-extrabold tracking-tight uppercase md:text-3xl"
                      : "text-lg font-bold tracking-tight uppercase"
                  }
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 md:p-14" data-reveal>
          <p className="label-mono text-muted-foreground">OFF SCREEN — HARDWARE + SYSTEMS</p>
          <ul className="mt-6 flex flex-col">
            {OFF_SCREEN.map((item, i) => (
              <li
                key={item}
                className="rule-t flex items-baseline gap-4 py-3 last:border-b last:border-border"
              >
                <span className="label-mono w-8 shrink-0 text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold tracking-tight uppercase">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
            Software on the screen, systems off it. I work in both worlds — I build things, and I fix
            them.
          </p>
        </div>
      </div>

      {/* editorial timeline */}
      <div className="mt-24 px-6 md:mt-32 md:px-12">
        <div data-reveal className="flex items-baseline justify-between gap-4">
          <p className="label-mono text-primary">HISTORY — WHERE I&apos;VE WORKED</p>
          <p className="label-mono hidden text-muted-foreground sm:block">2024 → 2026</p>
        </div>
        <div data-timeline className="relative mt-8">
          <div
            data-timeline-line
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[3px] w-px origin-top bg-primary"
          />
          <ol className="flex flex-col gap-14 md:gap-20">
            {experience.map((job) => (
              <li key={job.title + job.period} data-reveal className="relative pl-10 md:pl-16">
                <span
                  aria-hidden="true"
                  className={`absolute top-2 left-0 size-[7px] rounded-full ${
                    job.current ? "bg-primary" : "bg-border"
                  }`}
                />
                <p className="label-mono text-muted-foreground">{job.period}</p>
                <h3 className="display-project mt-2">{job.title}</h3>
                <p className="label-mono mt-2 text-primary">{job.org}</p>
                <ul className="mt-4 flex max-w-[62ch] flex-col gap-1.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="text-foreground">
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ================= SYSTEM / SPEC ================= */

const SPEC: Array<[string, string]> = [
  ["WEB", "React / TypeScript / Tailwind / Vite"],
  ["DATA", "Supabase / SQL / REST APIs"],
  ["DESKTOP", "Tauri 2 / Electron / Node.js"],
  ["CORE", "JavaScript / Python / PHP / HTML / CSS"],
  ["WORKFLOW", "Git / GitHub / VS Code / AI-assisted dev"],
  ["IT", "Support / Troubleshooting / Data entry"],
  ["LANG", "English / Filipino"],
];

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="mt-32 md:mt-48">
      <div className="px-6 md:px-12" data-reveal>
        <p className="label-mono text-primary">03 — SYSTEM / SPEC</p>
        <h2 id="stack-heading" className="mt-3">
          <span className="mask-line">
            <span className="mask-line-inner display-section">TECH</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner display-section text-muted-foreground">/ IT</span>
          </span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
          No skill badges, no meters. Just the honest inventory — what I reach for on screen, and what
          I handle off it.
        </p>
      </div>
      <dl className="mt-10 border-t border-border" data-reveal>
        {SPEC.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b border-border px-6 py-4 md:grid-cols-[220px_1fr] md:px-12"
          >
            <dt className="label-mono text-foreground">{k}</dt>
            <dd className="font-mono text-xs tracking-wide text-muted-foreground md:text-sm">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ================= ABOUT ================= */

export function About() {
  const root = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!ensureGsap()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-photo]",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" aria-labelledby="about-heading" className="mt-32 md:mt-48">
      <div className="px-6 md:px-12" data-reveal>
        <p className="label-mono text-primary">04 — ABOUT</p>
        <h2 id="about-heading" className="mt-3">
          <span className="mask-line">
            <span className="mask-line-inner display-section">I BUILD THINGS.</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner display-section text-primary">I ALSO FIX THEM.</span>
          </span>
        </h2>
      </div>

      <div className="mt-10 grid gap-10 px-6 md:grid-cols-12 md:px-12">
        <div className="overflow-hidden md:col-span-5" data-reveal="clip">
          <div className="overflow-hidden border border-border">
            <img
              data-about-photo
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={680}
              height={850}
              loading="lazy"
              className="photo-bw aspect-[4/5] w-full scale-110 object-cover object-top"
            />
          </div>
          <p className="label-mono mt-2 text-muted-foreground">
            {profile.name} — {profile.location}
          </p>
        </div>
        <div className="flex flex-col gap-8 md:col-span-7">
          <p className="max-w-[46ch] text-xl leading-snug font-medium tracking-tight sm:text-2xl" data-reveal>
            I&apos;m Isaiah, an IT graduate who builds software, works with hardware, and likes
            figuring out how things work.
          </p>
          <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2" data-reveal>
            <div>
              <p className="label-mono text-muted-foreground">{education.period}</p>
              <p className="mt-2 text-lg font-extrabold tracking-tight uppercase">{education.degree}</p>
              <p className="mt-1 text-sm text-muted-foreground">{education.school}</p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{education.place}</p>
              <p className="label-mono mt-3 inline-block bg-primary px-2 py-1 text-primary-foreground">
                {education.honor}
              </p>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">CREDENTIALS</p>
              <ul className="mt-3 flex flex-col gap-4">
                {certifications.map((c) => (
                  <li key={c.title} className="flex items-baseline justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">{c.issuer}</p>
                    </div>
                    <span className="label-mono shrink-0 text-muted-foreground">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT + FOOTER ================= */

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mt-32 md:mt-48">
      <div className="border-t border-border px-6 pt-16 md:px-12 md:pt-24" data-reveal>
        <p className="label-mono text-primary">05 — CONTACT — AVAILABLE FOR NEW ROLES</p>
        <h2 id="contact-heading" className="mt-4">
          <span className="mask-line">
            <span className="mask-line-inner display-hero">LET&apos;S</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner display-hero">WORK</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner display-hero text-primary">TOGETHER.</span>
          </span>
        </h2>
      </div>

      <div className="mt-12 grid gap-10 border-t border-border px-6 py-10 md:grid-cols-12 md:px-12 md:py-14">
        <div className="flex flex-col gap-3 md:col-span-7" data-reveal>
          <a
            href={profile.emailHref}
            target="_blank"
            rel="noreferrer"
            className="link-line w-fit font-mono text-sm break-all text-foreground sm:text-base"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="link-line w-fit font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="link-line w-fit font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            {profile.githubLabel} ↗
          </a>
        </div>
        <div className="md:col-span-5" data-reveal>
          <p className="label-mono text-foreground">OPEN FOR COMMISSIONS</p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
            WEBSITES · SMALL APPS · TOOLS · IT
          </p>
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
            Practical builds, honest timelines. If it runs in a browser or on a desk — I can probably
            make it or fix it.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-12" aria-label="Footer">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-mono font-bold text-foreground">
            ISAI<span className="text-primary">AH.DEV</span>
          </p>
          <p className="label-mono mt-2 text-muted-foreground">
            ISAIAH SERRANO — WEB DEVELOPER / IT SUPPORT
          </p>
        </div>
        <div className="flex gap-8">
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
        <p className="label-mono text-muted-foreground">© 2026 — SANTA ROSA, PH</p>
      </div>
    </footer>
  );
}
