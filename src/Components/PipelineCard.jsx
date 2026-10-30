import { useEffect, useState } from "react";
import { COMMIT, PIPELINE } from "../data/profile.js";
import { prefersReducedMotion } from "./Ui.jsx";

export default function PipelineCard() {
  // step = how many stages are finished. The stage at index "step" is the one running.
  const [step, setStep] = useState(0);
  const total = PIPELINE.length;

  useEffect(() => {
    // Reduced motion: show everything finished and don't animate
    if (prefersReducedMotion()) {
      setStep(total);
      return;
    }

    // Move forward every 1.1 seconds, then pause on "done" for two ticks, then restart
    const id = setInterval(() => {
      setStep((current) => (current >= total + 2 ? 0 : current + 1));
    }, 1100);

    return () => clearInterval(id);
  }, [total]);

  const allDone = step >= total;

  return (
    <div className="relative">
      {/* Coloured glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-violet-500/30 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-slate-200 shadow-2xl shadow-indigo-900/30">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-400">CI/CD workflow · illustration</span>
        </div>

        {/* The stages */}
        <ol className="space-y-1 p-3 sm:p-4">
          {PIPELINE.map((item, index) => {
            const done = step > index;
            const running = step === index;

            return (
              <li
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-500 ${
                  running ? "bg-white/[0.06]" : ""
                }`}
              >
                {/* Status icon: tick, spinner or empty circle */}
                <span className="grid h-6 w-6 shrink-0 place-items-center">
                  {done ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" className="opacity-30" />
                      <path d="M8 12.5l2.7 2.7L16 9.8" />
                    </svg>
                  ) : running ? (
                    <span className="h-5 w-5 rounded-full border-2 border-blue-400 border-t-transparent motion-safe:animate-spin" />
                  ) : (
                    <span className="h-3 w-3 rounded-full border border-slate-600" />
                  )}
                </span>

                <span className="flex flex-col leading-tight">
                  <span className={`text-sm font-semibold ${done || running ? "text-white" : "text-slate-500"}`}>
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{item.detail}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {/* Footer line: turns green when all stages are done */}
        <div
          className={`flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-sm transition-all duration-500 ${
            allDone ? "bg-emerald-500/10 text-emerald-300" : "text-slate-500"
          }`}
        >
          <span className="font-semibold">
            {allDone ? "Demo complete — not a live deployment" : "Illustrative pipeline running…"}
          </span>
          <span className="font-mono text-xs">{COMMIT}</span>
        </div>
      </div>
    </div>
  );
}