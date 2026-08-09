import { useEffect, useRef, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    let frame = 0;
    const tick = () => {
      const elapsed = Date.now() - startedAt.current;
      const pct = Math.min(100, Math.round((elapsed / 1600) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
        window.setTimeout(() => setHidden(true), 700);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-background px-6 py-8 transition-opacity duration-500 md:px-12 md:py-12 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 scanline" />

      <div className="relative flex items-start justify-between">
        <span className="label-mono font-bold text-primary">ISAIAH.DEV</span>
        <span className="label-mono text-muted-foreground">SYS / BOOT</span>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-6">
        <span className="label-mono text-muted-foreground">Initializing interface</span>
        <div className="font-mono text-7xl font-extrabold tracking-tighter tabular-nums text-foreground md:text-9xl">
          {String(progress).padStart(3, "0")}
          <span className="text-primary">%</span>
        </div>
        <div className="h-px w-full max-w-md overflow-hidden bg-border">
          <div
            className="h-full bg-primary transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-4">
        <span className="label-mono text-muted-foreground">
          {progress < 40
            ? "Loading assets…"
            : progress < 80
              ? "Compiling profile…"
              : "Ready"}
        </span>
        <span className="label-mono text-primary">Santa Rosa, PH</span>
      </div>
    </div>
  );
}
