import * as React from "react";
import { projects } from "@/data/portfolio";
import { ensureGsap, gsap } from "./reveal";

function find(title: string) {
  return projects.find((p) => p.title.toLowerCase().includes(title.toLowerCase()));
}

const twofold = find("twofold");
const sino = find("sino");
const desktop = find("barangay");
const rest = projects.filter((p) => p !== twofold && p !== sino && p !== desktop);

/**
 * Subtle cursor follower for project visuals (desktop / fine pointers only).
 * A small VIEW tag follows the cursor; the visual shifts a few px.
 */
function useCursorTag() {
  const tag = React.useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = React.useState("VIEW ↗");

  React.useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = tag.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-140%)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const show = React.useCallback((text: string) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setLabel(text);
    if (tag.current) tag.current.style.opacity = "1";
  }, []);
  const hide = React.useCallback(() => {
    if (tag.current) tag.current.style.opacity = "0";
  }, []);

  return { tag, label, show, hide };
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Technologies used">
      {items.map((t) => (
        <li key={t} className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ demo, repo, title }: { demo?: string | undefined; repo?: string | undefined; title: string }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2">
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} — open live site`}
          className="link-line label-mono text-foreground"
        >
          LIVE SITE ↗
        </a>
      ) : null}
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} — open source code on GitHub`}
          className="link-line label-mono text-muted-foreground hover:text-foreground"
        >
          SOURCE ↗
        </a>
      ) : null}
    </div>
  );
}

export function Work() {
  const root = React.useRef<HTMLElement | null>(null);
  const cursor = useCursorTag();

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!ensureGsap()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project-visual]").forEach((visual) => {
        gsap.fromTo(
          visual,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: visual, start: "top bottom", end: "center center", scrub: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-project-title]").forEach((title) => {
        gsap.fromTo(
          title,
          { yPercent: 12 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" aria-labelledby="work-heading" className="relative mt-32 md:mt-48">
      <div ref={cursor.tag} className="cursor-tag" aria-hidden="true">
        {cursor.label}
      </div>

      <div className="px-6 md:px-12" data-reveal>
        <p className="label-mono text-primary">01 — SELECTED WORK</p>
        <h2 id="work-heading" className="mt-3">
          <span className="mask-line">
            <span className="mask-line-inner display-section">SELECTED</span>
          </span>
          <span className="mask-line">
            <span className="mask-line-inner display-section text-muted-foreground">WORK</span>
          </span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
          Three builds, three different worlds — a private web app for couples, a social planning tool,
          and an offline-first desktop system. Scroll slowly; each one opens like its own chapter.
        </p>
      </div>

      {/* ============ 01 TWOFOLD ============ */}
      <article aria-labelledby="twofold-title" data-project className="mt-20 md:mt-32">
        <div className="flex items-end justify-between px-6 md:px-12" data-reveal>
          <span className="display-number text-primary" aria-hidden="true">
            01
          </span>
          <div className="pb-3 text-right">
            <p className="label-mono text-muted-foreground">FEATURED — WEB APP</p>
            <p className="label-mono mt-1 text-foreground">TWOFOLD</p>
          </div>
        </div>

        <div data-reveal="clip" className="mt-4 px-6 md:px-12">
          <a
            href={twofold?.demo ?? "https://twofold-indol.vercel.app/"}
            target="_blank"
            rel="noreferrer"
            aria-label="Twofold — open live site"
            onMouseEnter={() => cursor.show("VIEW LIVE ↗")}
            onMouseLeave={cursor.hide}
            onFocus={() => cursor.show("VIEW LIVE ↗")}
            onBlur={cursor.hide}
            className="group block border border-border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                twofold-indol.vercel.app
              </span>
              <span className="label-mono text-primary">● LIVE</span>
            </div>
            <div className="overflow-hidden">
              <div data-project-visual className="px-4 py-14 text-center sm:py-20 md:py-28">
                <p className="label-mono text-muted-foreground">TWO LIVES, ONE STORY</p>
                <p className="display-project mt-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]">
                  TWO
                  <span className="text-primary">FOLD</span>
                </p>
                <p className="mx-auto mt-5 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                  {twofold?.description ??
                    "A private digital scrapbook for couples where they can keep photos, memories, notes, places, milestones, and wishlists together."}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-2">
              <span className="label-mono text-muted-foreground">PRIVATE SCRAPBOOK — COUPLES</span>
              <span className="label-mono text-foreground transition-transform duration-500 group-hover:translate-x-1">
                OPEN ↗
              </span>
            </div>
          </a>
        </div>

        <div className="mt-8 grid gap-8 px-6 md:grid-cols-12 md:px-12">
          <h3
            id="twofold-title"
            data-project-title
            className="display-project md:col-span-7"
            data-reveal
          >
            TWOFOLD
          </h3>
          <div className="flex flex-col gap-5 md:col-span-5" data-reveal>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Photos, memories, notes, places, milestones, and wishlists — kept together in one quiet,
              private space. Built with React, TypeScript, Supabase, and Leaflet maps.
            </p>
            {twofold ? <TechList items={twofold.tech} /> : null}
            <ProjectLinks demo={twofold?.demo} repo={twofold?.repo} title="Twofold" />
          </div>
        </div>
      </article>

      {/* ============ 02 SINO G ============ */}
      <article aria-labelledby="sino-title" data-project className="mt-28 md:mt-44">
        <div className="flex items-end justify-between px-6 md:px-12" data-reveal>
          <div className="pb-3">
            <p className="label-mono text-muted-foreground">SOCIAL PLANNING — WEB APP</p>
            <p className="label-mono mt-1 text-foreground">SINO G?</p>
          </div>
          <span className="display-number text-muted-foreground" aria-hidden="true">
            02
          </span>
        </div>

        <div className="mt-4 grid gap-0 border-y border-border md:grid-cols-12" data-reveal="clip">
          <a
            href={sino?.demo ?? "https://sino-g.pages.dev/"}
            target="_blank"
            rel="noreferrer"
            aria-label="Sino G — open live site"
            onMouseEnter={() => cursor.show("VIEW LIVE ↗")}
            onMouseLeave={cursor.hide}
            onFocus={() => cursor.show("VIEW LIVE ↗")}
            onBlur={cursor.hide}
            className="group relative block overflow-hidden border-b border-border p-8 md:col-span-7 md:border-r md:border-b-0 md:p-14"
          >
            <div className="overflow-hidden">
              <p data-project-visual className="display-project">
                SINO
                <br />
                <span className="text-primary">G?</span>
              </p>
            </div>
            <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
              {sino?.description ??
                "A social planning app that helps groups quickly find a time when everyone is available."}
            </p>
            <p className="label-mono mt-6 text-foreground transition-transform duration-500 group-hover:translate-x-1">
              SINO-G.PAGES.DEV ↗
            </p>
          </a>
          <div className="flex flex-col justify-between gap-8 p-8 md:col-span-5 md:p-14">
            <div>
              <p className="label-mono text-primary">WHEN IS EVERYONE FREE?</p>
              <p className="mt-4 text-lg leading-snug font-medium tracking-tight">
                Stop guessing in the group chat. Sino G finds the overlap — fast.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {sino ? <TechList items={sino.tech} /> : null}
              <ProjectLinks demo={sino?.demo} repo={sino?.repo} title="Sino G" />
            </div>
          </div>
        </div>

        <h3 id="sino-title" className="sr-only">
          Sino G — social planning app
        </h3>
      </article>

      {/* ============ 03 DESKTOP ============ */}
      <article aria-labelledby="desktop-title" data-project className="mt-28 md:mt-44">
        <div className="flex items-end justify-between px-6 md:px-12" data-reveal>
          <span className="display-number text-primary" aria-hidden="true">
            03
          </span>
          <div className="pb-3 text-right">
            <p className="label-mono text-muted-foreground">OFFLINE-FIRST — DESKTOP</p>
            <p className="label-mono mt-1 text-foreground">BARANGAY SYSTEM</p>
          </div>
        </div>

        <div data-reveal="clip" className="mt-4 px-6 md:px-12">
          <div
            onMouseEnter={() => cursor.show("VIEW CODE ↗")}
            onMouseLeave={cursor.hide}
            className="border border-border"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="label-mono text-muted-foreground">BARANGAY MGMT — TAURI 2 + SQLITE</span>
              <span className="label-mono text-muted-foreground">LOCAL / OFFLINE</span>
            </div>
            <div className="grid md:grid-cols-12">
              <div className="overflow-hidden border-b border-border p-8 md:col-span-7 md:border-r md:border-b-0 md:p-14">
                <p data-project-visual className="display-project">
                  BARANGAY
                  <br />
                  SYSTEM
                </p>
                <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
                  {desktop?.description ??
                    "An offline-first desktop application for managing barangay records and administrative operations."}
                </p>
              </div>
              <ul className="divide-y divide-border md:col-span-5" aria-label="System modules">
                {[
                  ["RESIDENTS", "Profiles + household links"],
                  ["KK PROFILING", "Youth records + reports"],
                  ["DOCUMENTS", "Clearances + permits"],
                  ["USERS + ROLES", "Access control"],
                  ["LOCAL DB", "SQLite + Drizzle ORM"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-baseline justify-between gap-4 px-6 py-4 md:px-8">
                    <span className="label-mono text-foreground">{k}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3 md:px-6">
              {desktop ? <TechList items={desktop.tech} /> : null}
              <ProjectLinks repo={desktop?.repo} title="Barangay Management System" />
            </div>
          </div>
        </div>

        <h3 id="desktop-title" className="sr-only">
          Barangay Management System — offline-first desktop application
        </h3>
      </article>

      {/* ============ MORE WORK INDEX ============ */}
      <div className="mt-28 px-6 md:mt-40 md:px-12" data-reveal>
        <div className="rule-t flex items-baseline justify-between pt-4">
          <p className="label-mono text-muted-foreground">MORE WORK — INDEX</p>
          <p className="label-mono text-muted-foreground">({String(rest.length).padStart(2, "0")})</p>
        </div>
        <ul className="mt-2">
          {rest.map((p) => (
            <li key={p.title} className="rule-t group last:border-b last:border-border">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5">
                <span className="label-mono w-8 shrink-0 text-muted-foreground">{p.index}</span>
                <span className="min-w-[200px] flex-1 text-xl font-extrabold tracking-tight uppercase group-hover:text-primary">
                  {p.demo ?? p.repo ? (
                    <a
                      href={(p.demo ?? p.repo) as string}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} — ${p.demo ? "open live site" : "open on GitHub"}`}
                      className="link-line"
                    >
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </span>
                <span className="label-mono text-muted-foreground">{p.status}</span>
                <span className="hidden font-mono text-[11px] text-muted-foreground lg:block">
                  {p.tech.slice(0, 3).join(" / ")}
                </span>
                <span className="flex gap-5">
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} — live demo`}
                      className="link-line label-mono text-foreground"
                    >
                      LIVE ↗
                    </a>
                  ) : null}
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} — GitHub repository`}
                      className="link-line label-mono text-muted-foreground hover:text-foreground"
                    >
                      CODE ↗
                    </a>
                  ) : null}
                </span>
              </div>
              <p className="max-w-[64ch] pb-5 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
