import * as React from "react";

const BOOT_MS = 1450;

/**
 * Short technical intro: SYS/BOOT -> ISAIAH -> SERRANO -> reveal.
 * Skippable (click / Enter / Escape), auto-completes in ~1.45s,
 * instant when prefers-reduced-motion is set.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const doneRef = React.useRef(onDone);
  doneRef.current = onDone;
  const finished = React.useRef(false);

  const finish = React.useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      setHidden(true);
      document.documentElement.classList.add("boot-done");
      document.body.style.overflow = "";
      doneRef.current();
    }, 650);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    const t1 = window.setTimeout(() => setPhase(1), 380);
    const t2 = window.setTimeout(() => setPhase(2), 760);
    const t3 = window.setTimeout(finish, BOOT_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [finish]);

  const skip = React.useCallback(
    (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      finish();
    },
    [finish],
  );

  if (hidden) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Escape" || e.key === " ") skip(e);
      }}
      className="boot-face fixed inset-0 z-[100] cursor-pointer bg-background text-foreground"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        opacity: leaving ? 0.98 : 1,
      }}
    >
      <div className="flex h-full flex-col justify-between px-6 py-6 md:px-12 md:py-10">
        <div className="flex items-start justify-between">
          <span className="label-mono font-bold text-primary">ISAIAH.DEV</span>
          <span className="label-mono text-muted-foreground">SYS / BOOT</span>
        </div>

        <div className="flex flex-col gap-2" aria-hidden="true">
          <p
            className="label-mono text-muted-foreground transition-opacity duration-300"
            style={{ opacity: phase >= 0 ? 1 : 0 }}
          >
            {phase === 0 ? "Initializing interface" : phase === 1 ? "ISAIAH" : "SERRANO"}
          </p>
          <p className="display-section" style={{ fontSize: "clamp(3rem, 13vw, 11rem)" }}>
            <span
              className="block transition-all duration-500"
              style={{
                opacity: phase >= 1 ? 1 : 0.12,
                transform: phase >= 1 ? "none" : "translateY(12px)",
              }}
            >
              ISAIAH
            </span>
            <span
              className="block text-primary transition-all duration-500"
              style={{
                opacity: phase >= 2 ? 1 : 0.12,
                transform: phase >= 2 ? "none" : "translateY(12px)",
              }}
            >
              SERRANO
            </span>
          </p>
          <div className="mt-4 h-px w-full bg-border" aria-hidden="true">
            <div
              className="h-full bg-primary transition-[width] duration-300 ease-linear"
              style={{ width: phase === 0 ? "22%" : phase === 1 ? "58%" : "100%" }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="label-mono text-muted-foreground">SANTA ROSA, PH</span>
          <span className="label-mono text-muted-foreground">TAP TO SKIP</span>
        </div>
      </div>
    </div>
  );
}
