import * as React from "react";
import { profile } from "@/data/portfolio";
import { useScrollProgress } from "./reveal";

const LINKS = [
  { href: "#work", n: "01", label: "WORK", hint: "Twofold / Sino G / Desktop" },
  { href: "#build", n: "02", label: "ABOUT", hint: "What I build + timeline" },
  { href: "#stack", n: "03", label: "STACK", hint: "On screen / Off screen" },
  { href: "#contact", n: "04", label: "CONTACT", hint: "Let's work together" },
];

/**
 * Minimal floating navigation: ISAIAH.DEV ... MENU
 * Full-screen editorial overlay menu on open.
 */
export function SiteNav() {
  const [open, setOpen] = React.useState(false);
  const progress = useScrollProgress();
  const closeRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[120] focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="fixed inset-x-0 top-0 z-[80]">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <a
            href="#top"
            className="label-mono font-bold text-foreground"
            aria-label="Isaiah.dev — back to top"
          >
            ISAI<span className="text-primary">AH.DEV</span>
          </a>
          <div className="flex items-center gap-5">
            <span className="label-mono hidden text-muted-foreground sm:block">
              SANTA ROSA — {new Date().getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="label-mono flex min-h-[44px] min-w-[44px] items-center gap-3 text-foreground"
            >
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span
                  className="block h-px w-7 bg-current transition-transform duration-300"
                  style={{ transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="block h-px w-7 bg-current transition-transform duration-300"
                  style={{ transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none" }}
                />
              </span>
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
        <div
          className="progress-hairline h-px bg-primary"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>

      <div
        id="site-menu"
        data-open={open}
        aria-hidden={!open}
        className="menu-overlay fixed inset-0 z-[70] flex flex-col bg-background"
        style={{ visibility: open ? "visible" : "hidden" }}
      >
        <nav
          aria-label="Primary"
          className="flex flex-1 flex-col justify-center gap-1 px-6 pt-20 md:px-12"
        >
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="group rule-t flex items-baseline gap-5 py-4 transition-all duration-500 last:border-b last:border-border md:py-5"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(28px)",
                transitionDelay: open ? `${120 + i * 80}ms` : "0ms",
              }}
            >
              <span className="label-mono w-8 shrink-0 text-primary">{l.n}</span>
              <span className="display-section group-hover:text-primary group-focus-visible:text-primary">
                {l.label}
              </span>
              <span className="label-mono ml-auto hidden shrink-0 text-muted-foreground md:block">
                {l.hint}
              </span>
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-8 md:px-12">
          <div className="flex flex-col gap-1">
            <a
              href={profile.emailHref}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              className="link-line font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              {profile.email}
            </a>
            <span className="font-mono text-xs text-muted-foreground">{profile.phone}</span>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            className="link-line label-mono text-muted-foreground hover:text-foreground"
          >
            GITHUB ↗
          </a>
          <button ref={closeRef} type="button" className="sr-only" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Close menu
          </button>
        </div>
      </div>
    </>
  );
}
