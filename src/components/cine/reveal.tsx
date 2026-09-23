import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let gsapRegistered = false;

/** Register GSAP ScrollTrigger once (client-only). */
export function ensureGsap() {
  if (typeof window === "undefined") return false;
  if (!gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    gsapRegistered = true;
  }
  return true;
}

export { gsap, ScrollTrigger };

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * IntersectionObserver reveal: adds `is-visible` to every [data-reveal]
 * and .mask-line scope inside `ref` (or whole document when ref is null).
 */
export function useRevealScope<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const root = ref.current ?? document;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal], .mask-scope"));
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Page scroll progress 0..1 (hairline nav indicator). */
export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}
