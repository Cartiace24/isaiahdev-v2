import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/LoadingScreen";
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
    ],
  }),
  component: Index,
});

function SectionHeading({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between border-b border-foreground/80 pb-4">
      <h2 className="label-mono font-bold text-foreground">{label}</h2>
      {meta ? <span className="label-mono text-muted-foreground">{meta}</span> : null}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <LoadingScreen />

      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="label-mono font-bold text-primary">ISAIAH.DEV</span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              <span className="label-mono text-muted-foreground">Open to work</span>
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="label-mono transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a href={profile.emailHref} className="label-mono transition-colors hover:text-primary">
              Email
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <header className="animate-reveal">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_260px]">
            <div>
              <p className="label-mono mb-6 text-primary">{profile.role}</p>
              <h1 className="text-6xl leading-[0.85] font-extrabold tracking-tighter text-balance uppercase lg:text-8xl">
                {profile.firstName}
                <br />
                <span className="text-primary">{profile.lastName}</span>
              </h1>
              <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
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
                <span className="rounded-full px-4 py-2 text-muted-foreground ring-1 ring-border">
                  {profile.phone}
                </span>
                <span className="rounded-full px-4 py-2 text-muted-foreground ring-1 ring-border">
                  {profile.location}
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={512}
                  height={640}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="animate-reveal mt-28 [animation-delay:150ms]">
          <SectionHeading label="Selected Projects (04)" meta="2023 — Present" />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.index}
                className="group rounded-2xl bg-surface p-6 ring-1 ring-border transition-colors hover:ring-primary/40"
              >
                <div className="flex items-start justify-between">
                  <span className="label-mono text-muted-foreground">{project.index}</span>
                  <span className="label-mono rounded-full px-2 py-0.5 text-muted-foreground ring-1 ring-border transition-colors group-hover:text-primary group-hover:ring-primary/50">
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] text-primary"
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
          <section className="animate-reveal [animation-delay:300ms]">
            <SectionHeading label="Work History" />
            <div className="space-y-10">
              {experience.map((job) => (
                <div key={job.title + job.period} className="relative border-l border-border pl-8">
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

            <div className="mt-16">
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

          <section className="animate-reveal space-y-16 [animation-delay:450ms]">
            <div>
              <SectionHeading label="Tech Stack" />
              <div className="space-y-7">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="label-mono mb-3 text-muted-foreground">{group.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading label="Certifications" />
              <div className="space-y-5">
                {certifications.map((cert) => (
                  <div key={cert.title} className="group flex items-start justify-between gap-4">
                    <div>
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

        <section className="animate-reveal mt-32 rounded-3xl bg-surface p-10 ring-1 ring-border md:p-14">
          <p className="label-mono text-primary">Let's work together</p>
          <h2 className="mt-4 max-w-[18ch] text-4xl font-extrabold tracking-tighter uppercase md:text-6xl">
            Available for new roles
          </h2>
          <a
            href={profile.emailHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            {profile.email}
          </a>
        </section>
      </main>

      <footer className="mt-24 border-t border-border">
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
