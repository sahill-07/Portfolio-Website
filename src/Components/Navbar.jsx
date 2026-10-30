import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import useTheme from "../hooks/useTheme.js";
import { COMMIT, SOCIALS } from "../data/profile.js";
import { ArrowIcon, SocialIcon } from "./Ui.jsx";

// Each link scrolls to a section on the home page.
// sectionId must match the id on the section in Home.jsx.
const NAV_LINKS = [
  { to: "/", label: "Home", hint: "Start here" },
  { to: "/#experience", label: "Experience", hint: "Where I work now", sectionId: "experience" },
  { to: "/#skills", label: "Skills", hint: "My toolbox", sectionId: "skills" },
  { to: "/#projects", label: "Projects", hint: "What I’ve built", sectionId: "projects" },
];

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

// Small green chip showing which commit this build came from
function BuildChip({ className = "" }) {
  return (
    <div
      title="Commit this build was made from"
      className={`items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/[0.03] px-3 py-1.5 font-mono text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {COMMIT}
    </div>
  );
}

export default function Navbar({ name }) {
  // ---------------- State ----------------
  const [open, setOpen] = useState(false); // is the mobile menu open?
  const [mounted, setMounted] = useState(false); // used for the slide-in on first load
  const [scrolled, setScrolled] = useState(false); // stronger shadow once scrolled
  const [hidden, setHidden] = useState(false); // bar hides when scrolling down
  const [progress, setProgress] = useState(0); // 0 to 1, how far down the page we are
  const [hovered, setHovered] = useState(null); // which desktop link the mouse is over
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false }); // sliding highlight

  const [dark, toggleTheme] = useTheme();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const linkRefs = useRef([]); // DOM elements of the desktop links, to measure them
  const lastY = useRef(0); // previous scroll position

  // ---------------- Which link is active? ----------------
  // Home is active with no hash. A section link is active when the URL hash matches.
  const activeIndex = NAV_LINKS.findIndex((link) =>
    link.sectionId ? pathname === "/" && hash === `#${link.sectionId}` : pathname === "/" && !hash
  );
  const highlighted = hovered ?? activeIndex; // the highlight follows the mouse, else the active link

  // ---------------- Clicking a section link ----------------
  const goToSection = (event, sectionId) => {
    event.preventDefault();
    setOpen(false);

    const wantedHash = `#${sectionId}`;

    if (pathname === "/" && hash === wantedHash) {
      // Already on that section's URL: just scroll again
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Change the URL; the effect below does the scrolling
      navigate(`/${wantedHash}`);
    }
  };

  // Clicking a link: sections scroll, "Home" just goes home
  const onLinkClick = (event, link) => {
    if (link.sectionId) goToSection(event, link.sectionId);
    else setOpen(false);
  };

  // ---------------- Effects ----------------

  // Scroll to the section named in the URL (works for direct visits and for links from other pages)
  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  // Slide the bar in once when the site first loads
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Close the menu and show the bar whenever the page or section changes
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname, hash]);

  // While the mobile menu is open: freeze page scrolling, close on Escape,
  // and close if the window becomes wide enough for the desktop bar
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => event.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = (event) => event.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  // Move the sliding highlight behind the hovered or active desktop link
  useLayoutEffect(() => {
    const measure = () => {
      const element = linkRefs.current[highlighted];
      if (element) {
        setPill({ left: element.offsetLeft, width: element.offsetWidth, ready: true });
      } else {
        setPill((previous) => ({ ...previous, ready: false }));
      }
    };

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure); // fonts change text width, so measure again once loaded
    return () => window.removeEventListener("resize", measure);
  }, [highlighted]);

  // Scroll effects: shadow, progress line, and hide-on-scroll-down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 8);
      setProgress(maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0);

      if (y > lastY.current + 6 && y > 120) setHidden(true); // scrolling down: hide
      else if (y < lastY.current - 6) setHidden(false); // scrolling up: show

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // ---------------- Animation helpers for the mobile menu ----------------
  const tuckedAway = !mounted || (hidden && !open);

  // Each item waits a bit longer than the one before, so they appear one by one
  const delay = (i) => ({ transitionDelay: open ? `${200 + i * 80}ms` : "0ms" });

  const riseStyle = `transition-all duration-700 ${EASE} motion-reduce:transition-none ${
    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;
  const popStyle = `transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] motion-reduce:transition-none ${
    open ? "scale-100 opacity-100" : "scale-50 opacity-0"
  }`;

  // ---------------- Render ----------------
  return (
    <>
      {/* ===== Full-screen mobile menu =====
          It grows out of the hamburger button as a circle (clip-path). */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 overflow-hidden bg-slate-50 transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(.76,0,.24,1)] motion-reduce:transition-none md:hidden dark:bg-slate-950 ${
          open ? "visible" : "invisible"
        }`}
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 2.7rem) 2.55rem)"
            : "circle(0% at calc(100% - 2.7rem) 2.55rem)",
        }}
      >
        {/* Drifting colour blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl motion-safe:animate-float dark:bg-blue-500/25" />
          <div
            className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl motion-safe:animate-float dark:bg-violet-500/25"
            style={{ animationDelay: "-4s" }}
          />
        </div>

        <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-28 sm:px-10 sm:pt-32">
          {/* Big links, each sliding up out of its own mask */}
          <nav aria-label="Mobile">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeIndex === i;

              return (
                <div key={link.to} className="relative overflow-hidden">
                  <Link
                    to={link.to}
                    onClick={(event) => onLinkClick(event, link)}
                    style={delay(i)}
                    className={`group flex items-center justify-between py-5 transition-transform duration-700 ${EASE} motion-reduce:transition-none ${
                      open ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    <span className="flex flex-col">
                      <span
                        className={`text-4xl font-extrabold tracking-tight ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{link.hint}</span>
                    </span>

                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:translate-x-1 group-active:scale-90 ${
                        isActive
                          ? "border-transparent bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30"
                          : "border-slate-900/15 text-slate-700 dark:border-white/20 dark:text-white"
                      }`}
                    >
                      <ArrowIcon className="h-5 w-5" />
                    </span>
                  </Link>

                  {/* Divider that draws itself across */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-px w-full origin-left bg-slate-900/10 transition-transform duration-1000 ease-out motion-reduce:transition-none dark:bg-white/15 ${
                      open ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={delay(i)}
                  />
                </div>
              );
            })}
          </nav>

          {/* Spacer: pushes the rest to the bottom on tall screens */}
          <div className="min-h-8 flex-1" />

          {/* Contact button with a light shimmer passing across it */}
          <div className={riseStyle} style={delay(NAV_LINKS.length)}>
            <Link
              to="/#contact"
              onClick={(event) => goToSection(event, "contact")}
              className="relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/30 transition-transform active:scale-[0.98]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-md motion-safe:animate-shimmer"
              />
              <span className="relative">Get in touch</span>
              <ArrowIcon className="relative h-5 w-5" />
            </Link>
          </div>

          {/* Social icons popping in one by one */}
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((social, i) => (
              <span key={social.label} className={popStyle} style={delay(NAV_LINKS.length + 1 + i * 0.6)}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-slate-900/10 bg-white/60 text-slate-700 backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:text-blue-600 active:scale-90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-blue-300"
                >
                  <SocialIcon name={social.icon} />
                </a>
              </span>
            ))}
          </div>

          {/* Build info */}
          <div className={`mt-6 flex items-center gap-3 ${riseStyle}`} style={delay(NAV_LINKS.length + 3)}>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">deployed from</span>
            <BuildChip className="flex" />
          </div>
        </div>
      </div>

      {/* ===== Top bar ===== */}
      <header
        onFocus={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ${EASE} sm:px-4 sm:pt-4 ${
          tuckedAway ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        {/* Keyboard users: press Tab once on page load to reveal this */}
        <a
          href="#main"
          className="absolute -top-20 left-6 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white focus:top-2"
        >
          Skip to content
        </a>

        {/* Thin gradient border: this wrapper's padding (p-px) shows as the border */}
        <div
          className={`mx-auto max-w-5xl rounded-[1.1rem] bg-gradient-to-r from-white/80 via-blue-400/40 to-violet-400/50 p-px transition-shadow duration-300 dark:from-white/15 dark:via-blue-400/30 dark:to-violet-400/40 ${
            scrolled
              ? "shadow-2xl shadow-indigo-900/15 dark:shadow-black/50"
              : "shadow-lg shadow-slate-900/5 dark:shadow-black/25"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/75 backdrop-blur-xl dark:bg-slate-900/80">
            <div
              className={`flex items-center justify-between gap-2 px-2.5 transition-[height] duration-300 sm:px-3 md:px-4 ${
                scrolled ? "h-14" : "h-14 md:h-[4.25rem]"
              }`}
            >
              {/* Logo: clicking it goes home and scrolls to the top */}
              <Link
                to="/"
                onClick={() => {
                  setOpen(false);
                  if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 text-base font-extrabold text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  {name.charAt(0)}
                </span>
                <span className="hidden flex-col leading-tight min-[380px]:flex">
                  <span className="font-bold tracking-tight text-slate-900 dark:text-white">{name}</span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">~/devops</span>
                </span>
              </Link>

              {/* Desktop links, with a highlight that slides between them */}
              <nav
                aria-label="Main"
                onMouseLeave={() => setHovered(null)}
                className="relative hidden items-center md:flex"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0.5 rounded-full bg-slate-900/[0.07] transition-[left,width,opacity] duration-300 ease-[cubic-bezier(.34,1.3,.64,1)] dark:bg-white/10"
                  style={{ left: pill.left, width: pill.width, opacity: pill.ready ? 1 : 0 }}
                />

                {NAV_LINKS.map((link, i) => {
                  const isActive = activeIndex === i;

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      ref={(element) => (linkRefs.current[i] = element)}
                      onClick={(event) => onLinkClick(event, link)}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                      {/* Small dot under the active link */}
                      {isActive && (
                        <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Right side: build chip, theme toggle, contact button, hamburger */}
              <div className="flex items-center gap-2">
                <BuildChip className="hidden lg:flex" />
                <ThemeToggle dark={dark} onToggle={toggleTheme} />

                <Link
                  to="/#contact"
                  onClick={(event) => goToSection(event, "contact")}
                  className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110 md:inline-flex"
                >
                  Contact
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* Hamburger: three lines that turn into an X */}
                <button
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-nav"
                  onClick={() => setOpen((previous) => !previous)}
                  className={`grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-slate-900/5 md:hidden dark:hover:bg-white/10 ${
                    open ? "bg-slate-900/5 dark:bg-white/10" : ""
                  }`}
                >
                  <span className="relative block h-3.5 w-5">
                    <span
                      className={`absolute left-0 block h-0.5 w-5 rounded bg-slate-900 transition-all duration-300 dark:bg-white ${
                        open ? "top-1.5 rotate-45" : "top-0"
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-slate-900 transition-all duration-200 dark:bg-white ${
                        open ? "scale-x-0 opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute left-0 block h-0.5 w-5 rounded bg-slate-900 transition-all duration-300 dark:bg-white ${
                        open ? "top-1.5 -rotate-45" : "top-3"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Reading-progress line along the bottom edge of the bar */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </header>
    </>
  );
}