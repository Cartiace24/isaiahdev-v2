import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Code2,
  Headphones,
  Languages,
  MonitorSmartphone,
  Terminal,
  Wrench,
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import {
  useActiveSection,
  useScrollProgress,
  useScrollReveal,
  useScrollY,
} from "@/hooks/use-scroll-reveal";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Isaiah Serrano — Web Developer & IT Support" },
      {
        name: "description",
        content:
          "Portfolio of Isaiah Saul F. Serrano, web developer and IT support technician in Santa Rosa, Laguna: projects, work experience, certifications, and skills.",
      },
      { property: "og:title", content: "Isaiah Serrano — Web Developer & IT Support" },
      {
        property: "og:description",
        content:
          "Projects, work experience, certifications, and skills of Isaiah Saul F. Serrano, web developer and IT support technician.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#stack", id: "stack", label: "Tech Stack" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const sectionIds = navLinks.map((l) => l.id);

const groupIcons: Record<string, typeof Code2> = {
  "Web Stack": Code2,
  "Core Languages": Terminal,
  "Desktop & Runtime": MonitorSmartphone,
  "Tools & Workflow": Wrench,
  "IT & Admin": Headphones,
  Languages: Languages,
};

function SectionHeading({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-foreground/80 pb-4">
      <h2 className="label-mono font-bold text-foreground">{label}</h2>
      {meta ? <span className="label-mono shrink-0 text-muted-foreground">{meta}</span> : null}
    </div>
  );
}

function spotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const scrollY = useScrollY();
  const activeSection = useActiveSection(sectionIds);
  const activeLabel = navLinks.find((l) => l.id === activeSection)?.label ?? "Intro";
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <LoadingScreen />

      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto grid h-14 max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6">
          <div className="flex min-w-0 items-center gap-4">
            <span className="label-mono shrink-0 font-bold text-primary">ISAIAH.DEV</span>
            <span className="hidden h-3 w-px shrink-0 bg-border sm:block" />
            <span className="hidden items-center gap-2 sm:flex">
              <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
              <span className="label-mono truncate text-muted-foreground">Open to work</span>
            </span>
            {/* mobile active-section indicator */}
            <span className="label-mono flex min-w-0 items-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 text-primary md:hidden">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="truncate">{activeLabel}</span>
            </span>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`label-mono relative py-1 transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full ring-1 ring-border transition-colors hover:ring-primary/50 md:hidden"
          >
            <span
              className={`block h-px w-4 bg-foreground transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-foreground transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* scroll progress */}
        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />

        {/* mobile menu */}
        <div
          className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-border py-3 text-lg font-bold tracking-tight transition-colors hover:text-primary ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "w-6 bg-primary" : "w-0 bg-transparent"
                      }`}
                    />
                    {link.label}
                  </span>
                  <span aria-hidden="true" className="label-mono text-muted-foreground">
                    →
                  </span>
                </a>
              );
            })}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={profile.emailHref}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center font-mono text-xs font-medium text-primary-foreground"
              >
                Email me
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full px-4 py-2.5 text-center font-mono text-xs text-muted-foreground ring-1 ring-border"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-28 lg:pt-24 lg:pb-28">
        <header className="animate-reveal">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
            <div>
              <p className="label-mono mb-6 text-primary">{profile.role}</p>

              {/* name + photo aligned on mobile */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:block">
                <h1 className="min-w-0 text-[2.25rem] leading-[0.85] font-extrabold tracking-tighter break-words uppercase sm:text-6xl lg:text-8xl">
                  {profile.firstName}
                  <br />
                  <span className="text-primary">{profile.lastName}</span>
                </h1>
                <div className="group relative shrink-0 lg:hidden">
                  <div className="absolute -inset-2 rounded-3xl bg-primary/20 blur-xl" />
                  <div className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-primary/40 scan-beam">
                    <img
                      src={profile.photo}
                      alt={`Portrait of ${profile.name}`}
                      width={256}
                      height={320}
                      className="photo-duotone aspect-[4/5] w-28 object-cover object-top sm:w-36"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
                  </div>
                </div>
              </div>

              <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
                <a
                  href={profile.emailHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-85"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground hover:ring-primary/50"
                >
                  {profile.githubLabel}
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="rounded-full px-4 py-2 text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground hover:ring-primary/50"
                >
                  {profile.phone}
                </a>
                <span className="rounded-full px-4 py-2 text-muted-foreground ring-1 ring-border">
                  {profile.location}
                </span>
              </div>
            </div>

            {/* desktop photo — larger, with effects */}
            <div className="hidden lg:block">
              <div
                className="group relative animate-float-slow"
                style={{ transform: `translateY(${Math.min(scrollY, 400) * -0.06}px)` }}
              >
                <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-primary/60 via-border to-transparent" />
                <div className="relative overflow-hidden rounded-[1.75rem] bg-surface scan-beam">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-grid opacity-40" />
                  <div className="pointer-events-none absolute inset-0 z-10 scanline" />
                  <img
                    src={profile.photo}
                    alt={`Portrait of ${profile.name}`}
                    width={680}
                    height={850}
                    className="photo-duotone aspect-[4/5] w-full object-cover object-top group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-background to-transparent px-4 pt-10 pb-3">
                    <span className="label-mono text-primary">ID / 001</span>
                    <span className="label-mono text-muted-foreground">SANTA ROSA</span>
                  </div>
                </div>
                {/* corner brackets */}
                <span className="pointer-events-none absolute -top-2 -left-2 z-20 size-6 border-t border-l border-primary/70" />
                <span className="pointer-events-none absolute -right-2 -bottom-2 z-20 size-6 border-r border-b border-primary/70" />
              </div>
            </div>
          </div>
        </header>

        <section id="projects" className="mt-28 scroll-mt-20" data-reveal>
          <SectionHeading label="Selected Projects (05)" meta="2023 — Present" />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {projects.map((project, i) => (
              <article
                key={project.index}
                data-reveal
                onMouseMove={spotlight}
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="group card-spotlight relative flex flex-col rounded-2xl bg-surface p-6 ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:ring-primary/40"
              >
                <div className="relative flex items-start justify-between">
                  <span className="label-mono text-muted-foreground">{project.index}</span>
                  <span className="label-mono rounded-full px-2 py-0.5 text-muted-foreground ring-1 ring-border transition-colors group-hover:text-primary group-hover:ring-primary/50">
                    {project.status}
                  </span>
                </div>
                <h3 className="relative mt-6 flex items-center gap-2 text-xl font-bold tracking-tight">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} — view on GitHub`}
                      className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary transition-colors"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 -translate-x-1 text-primary opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] text-primary transition-colors group-hover:bg-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-32 grid gap-20 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <section id="work" className="scroll-mt-20" data-reveal>
            <SectionHeading label="Work History" />
            <div className="space-y-10">
              {experience.map((job, i) => (
                <div
                  key={job.title + job.period}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  className="relative border-l border-border pl-8"
                >
                  <div
                    className={`absolute top-1.5 -left-[4.5px] size-2 rounded-full ${
                      job.current ? "bg-primary" : "bg-border"
                    }`}
                  />
                  <span className="label-mono mb-1 block text-muted-foreground">{job.period}</span>
                  <h3 className="text-lg font-bold tracking-tight">{job.title}</h3>
                  <p className="mb-3 text-sm text-primary">{job.org}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span aria-hidden="true">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16" data-reveal>
              <SectionHeading label="Education" />
              <div className="rounded-2xl bg-surface p-6 ring-1 ring-border">
                <span className="label-mono text-muted-foreground">{education.period}</span>
                <h3 className="mt-2 text-lg font-bold tracking-tight">{education.degree}</h3>
                <p className="text-sm text-primary">{education.school}</p>
                <p className="mt-1 text-sm text-muted-foreground">{education.place}</p>
                <span className="label-mono mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-primary">
                  {education.honor}
                </span>
              </div>
            </div>
          </section>

          <section id="stack" className="space-y-16 scroll-mt-20">
            <div data-reveal>
              <SectionHeading label="Tech Stack" />
              <div className="grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group, i) => {
                  const Icon = groupIcons[group.label] ?? Code2;
                  return (
                    <div
                      key={group.label}
                      data-reveal
                      onMouseMove={spotlight}
                      style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                      className="group card-spotlight rounded-2xl bg-surface p-5 ring-1 ring-border transition-colors duration-500 hover:ring-primary/40"
                    >
                      <div className="relative mb-4 flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <h3 className="label-mono leading-tight text-foreground">{group.label}</h3>
                      </div>
                      <div className="relative flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-primary hover:ring-primary/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div data-reveal>
              <SectionHeading label="Certifications" />
              <div className="space-y-5">
                {certifications.map((cert) => (
                  <div key={cert.title} className="group flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{cert.title}</p>
                      <p className="label-mono mt-1 text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <span className="label-mono shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section
          id="contact"
          className="mt-32 scroll-mt-20 rounded-3xl bg-surface p-8 ring-1 ring-border md:p-14"
          data-reveal
        >
          <p className="label-mono text-primary">Let's work together</p>
          <h2 className="mt-4 max-w-[18ch] text-3xl font-extrabold tracking-tighter uppercase sm:text-4xl md:text-6xl">
            Available for new roles
          </h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={profile.emailHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-flex justify-center rounded-full px-6 py-3 font-mono text-sm text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground hover:ring-primary/50"
            >
              Call {profile.phone}
            </a>
          </div>
        </section>
      </main>

      {/* mobile contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex gap-2">
          <a
            href={profile.emailHref}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center font-mono text-xs font-medium text-primary-foreground"
          >
            Email
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="flex-1 rounded-full px-4 py-2.5 text-center font-mono text-xs text-muted-foreground ring-1 ring-border"
          >
            Call
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full px-4 py-2.5 text-center font-mono text-xs text-muted-foreground ring-1 ring-border"
          >
            GitHub
          </a>
        </div>
      </div>

      <footer className="mt-24 border-t border-border pb-20 md:pb-0">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <p className="label-mono text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex gap-8">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="label-mono underline underline-offset-4 transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a
              href={profile.emailHref}
              target="_blank"
              rel="noreferrer"
              className="label-mono underline underline-offset-4 transition-colors hover:text-primary"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
