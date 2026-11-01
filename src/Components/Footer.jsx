import { Link } from "react-router-dom";
import { PROFILE, ROADMAP, SOCIALS } from "../Data/profile.js";
import { Reveal, SocialIcon } from "./Ui.jsx";

const FOOTER_LINKS = [
  { label: "Experience", to: "/#experience" },
  { label: "Skills", to: "/#skills" },
  { label: "Projects", to: "/#projects" },
  { label: "DevOps Labs", to: "/#labs" },
  { label: "Contact", to: "/#contact" },
];

// Underline that grows from the left when you hover a link
const linkStyle =
  "relative py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400 " +
  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left " +
  "after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // "Currently learning" comes from your roadmap, so it never goes out of date
  const learningNow = ROADMAP.find((item) => item.status === "now");

  // "Sahil Bangar" -> "SB"
  const initials = PROFILE.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <footer className="relative border-t border-slate-900/10 bg-white/40 dark:border-white/10 dark:bg-slate-950/30">
      {/* Thin gradient line along the top edge, with a light that sweeps across it */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-px h-px overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent motion-safe:animate-shimmer" />
      </div>

      <Reveal>
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Logo and tagline: the tile tilts on hover */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex w-fit items-center gap-3 text-left"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 font-display text-lg font-extrabold text-white shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                {initials}
              </span>
              <span>
                <span className="block font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {PROFILE.name}
                </span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">
                  Application Support · Aspiring DevOps Engineer
                </span>
              </span>
            </button>

            {/* Section links */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              {FOOTER_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className={linkStyle}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social icons: lift on hover */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-900/10 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-90 dark:border-white/15 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-8 flex flex-col gap-3 border-t border-slate-900/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-slate-400">
            <p>
              © {new Date().getFullYear()} {PROFILE.name}. Built with React, Vite and Tailwind CSS.
            </p>

            {/* What you're learning right now, with a pulsing dot */}
            {learningNow && (
              <p className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Currently learning: {learningNow.title}
              </p>
            )}

            {/* Back to top: the arrow floats up on hover */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex w-fit items-center gap-2 font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Back to top
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-full border border-slate-900/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-500/50 dark:border-white/15"
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}