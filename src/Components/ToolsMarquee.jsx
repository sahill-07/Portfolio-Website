import { useEffect, useRef } from "react";

/**
 * How it works:
 *  1. The list is rendered 3 times in a row, so there is always content to show.
 *  2. On scroll, we work out how far to shift the strip (scrollY × speed).
 *  3. The shift wraps around after one copy's width, so the loop never ends.
 *  4. The strip eases toward its target ("smooth"), which feels floaty.
 *
 * Props:
 *   items  - array of strings to show
 *   speed  - pixels moved per pixel scrolled (use a negative number for right-to-left)
 *   smooth - 0 to 1, how quickly it catches up (lower = floatier)
 */
export default function ToolsMarquee({ items, speed = 0.45, smooth = 0.12 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reduced motion: leave the strip still
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let loopWidth = 0; // width of ONE copy of the list
    let current = window.scrollY * speed; // position currently drawn
    let frame = 0;
    let running = false;

    // Move the strip to the "current" position
    const draw = () => {
      if (!loopWidth) return;
      const offset = ((current % loopWidth) + loopWidth) % loopWidth; // wrap into 0..loopWidth
      track.style.transform = `translate3d(${offset - loopWidth}px, 0, 0)`;
    };

    // Measure the strip (it holds 3 identical copies)
    const measure = () => {
      loopWidth = track.scrollWidth / 3;
      draw();
    };

    // Runs every frame while the strip is catching up with the scroll position
    const loop = () => {
      const target = window.scrollY * speed;
      current += (target - current) * smooth;
      draw();

      if (Math.abs(target - current) > 0.1) {
        frame = requestAnimationFrame(loop);
      } else {
        current = target; // close enough: snap and stop to save battery
        draw();
        running = false;
      }
    };

    // Start the loop when the user scrolls
    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    measure();
    document.fonts?.ready.then(measure); // re-measure once the web fonts load
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", measure);
    };
  }, [speed, smooth]);

  return (
    <section
      aria-label="Technologies and tools"
      className="overflow-hidden border-y border-slate-900/10 py-6 dark:border-white/10"
    >
      {/* The mask fades the strip out at the left and right edges */}
      <div
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <ul ref={trackRef} className="flex w-max gap-3 pr-3 will-change-transform">
          {[0, 1, 2].flatMap((copy) =>
            items.map((tool, index) => (
              <li
                key={`${copy}-${index}`}
                aria-hidden={copy > 0} // screen readers only read the first copy
                className="rounded-full border border-slate-900/10 bg-white/60 px-5 py-2 font-mono text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tool}
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}