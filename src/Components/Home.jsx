import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DEVOPS_EDGE,
  DEVOPS_LABS,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  LEARNING,
  PROFILE,
  PROJECTS,
  ROADMAP,
  SKILL_GROUPS,
  TOOLS,
} from "../data/profile.js";
import PipelineCard from "./PipelineCard.jsx";
import ToolsMarquee from "./ToolsMarquee.jsx";
import {
  ArrowIcon,
  Reveal,
  SectionHeading,
  SpotlightCard,
  TagList,
  prefersReducedMotion,
} from "./Ui.jsx";

/* ------------------------------------------------------------------
   Typing effect for the hero line.
   Types a word, waits, deletes it, then moves to the next word.
------------------------------------------------------------------ */
function useTypewriter(words) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return; // keep the first word still

    let wordIndex = 0;
    let letters = words[0].length;
    let deleting = true;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      letters += deleting ? -1 : 1;
      setText(word.slice(0, letters));

      let wait = deleting ? 35 : 70; // typing is slower than deleting

      if (!deleting && letters === word.length) {
        deleting = true; // finished typing: pause, then start deleting
        wait = 1800;
      } else if (deleting && letters === 0) {
        deleting = false; // finished deleting: move to the next word
        wordIndex = (wordIndex + 1) % words.length;
        wait = 300;
      }

      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

/* ------------------------------------------------------------------
   Section wrapper: centres the content, adds spacing, and gives the
   section an id so the navbar can scroll to it.
------------------------------------------------------------------ */
function Section({ id, narrow = false, className = "", children }) {
  return (
    <section
      id={id}
      className={`mx-auto scroll-mt-28 px-5 pt-24 ${narrow ? "max-w-3xl" : "max-w-6xl"} ${className}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------
   1. HERO
------------------------------------------------------------------ */
function Hero() {
  const typed = useTypewriter(PROFILE.roles);

  return (
    <section id="home" className="relative scroll-mt-28">
      {/* Dotted grid background that fades out toward the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-28 h-[36rem] text-slate-500/30 dark:text-white/10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 25%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 25%, transparent 72%)",
        }}
      />

      {/* Two blurred colour blobs that drift slowly */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-0 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl motion-safe:animate-float" />
        <div
          className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl motion-safe:animate-float"
          style={{ animationDelay: "-5s" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-8 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        {/* Left column: text and buttons. Each item rises in a little after the previous one. */}
        <div>
          <div className="mb-6 inline-flex animate-rise items-center gap-2.5 rounded-full border border-slate-900/10 bg-white/70 px-4 py-1.5 text-sm font-semibold text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Building practical DevOps skills
          </div>

          <h1
            className="animate-rise font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
            style={{ animationDelay: "100ms" }}
          >
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              {PROFILE.name}
            </span>
          </h1>

          <p
            className="mt-5 flex min-h-8 animate-rise items-center font-mono text-lg text-slate-600 sm:text-xl dark:text-slate-300"
            style={{ animationDelay: "220ms" }}
            aria-label={PROFILE.roles.join(", ")}
          >
            <span aria-hidden="true">I’m {typed}</span>
            <span aria-hidden="true" className="ml-1 inline-block h-6 w-0.5 bg-blue-500 motion-safe:animate-pulse" />
          </p>

          <p
            className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            style={{ animationDelay: "340ms" }}
          >
            {PROFILE.intro}
          </p>

          <div className="mt-9 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "460ms" }}>
            <Link
              to="/#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110 active:scale-95"
            >
              View projects
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/#contact"
              className="inline-flex items-center rounded-full border border-slate-900/15 px-7 py-3.5 font-semibold text-slate-800 transition-colors hover:bg-slate-900/5 active:scale-95 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Get in touch
            </Link>

            {/* Only shown when PROFILE.resume is set */}
            {PROFILE.resume && (
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 px-7 py-3.5 font-semibold text-slate-800 transition-colors hover:bg-slate-900/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                <span aria-hidden="true">↓</span> Resume
              </a>
            )}
          </div>
        </div>

        {/* Right column: the animated pipeline */}
        <div className="animate-rise" style={{ animationDelay: "350ms" }}>
          <PipelineCard />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   2. EXPERIENCE: a timeline with one card per job
------------------------------------------------------------------ */
function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        title="Work experience"
        description="Production support experience that shapes how I approach reliability, troubleshooting, and automation."
      />

      <ol className="relative mt-12 space-y-6 pl-10 sm:pl-12">
        {/* The vertical timeline line */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[0.95rem] top-2 w-px bg-slate-900/15 sm:left-[1.05rem] dark:bg-white/15"
        />

        {EXPERIENCE.map((job, index) => (
          <li key={job.role + job.company} className="relative">
            {/* The dot on the timeline. It pulses for a current job. */}
            <span className="absolute -left-10 top-7 grid h-8 w-8 place-items-center rounded-full border-2 border-blue-500 bg-white sm:-left-12 sm:h-9 sm:w-9 dark:bg-slate-950">
              {job.current && (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
                </span>
              )}
            </span>

            <Reveal delay={index * 100}>
              <SpotlightCard>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {job.role}
                    </h3>
                    <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                      {job.company}
                      <span className="font-normal text-slate-500 dark:text-slate-400"> · {job.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-slate-500 dark:text-slate-400">{job.period}</span>
                    {job.current && (
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-slate-600 dark:text-slate-400">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <TagList items={job.tools} className="mt-6" />
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Three small cards linking the job to DevOps */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {DEVOPS_EDGE.map((item, index) => (
          <Reveal key={item.title} delay={index * 90}>
            <div className="h-full rounded-2xl border border-slate-900/10 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
   6. EDUCATION AND LEARNING
------------------------------------------------------------------ */
function Education() {
  return (
    <Section id="education">
      <SectionHeading
        title="Education and learning"
        description="My academic background and the courses and activities that helped me develop my technical skills."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: degree card */}
        <Reveal>
          <SpotlightCard>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 9L12 4 2 9l10 5 10-5z" />
                <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
              </svg>
            </span>

            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {EDUCATION.degree}
            </h3>
            <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">{EDUCATION.school}</p>
            <p className="mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">{EDUCATION.years}</p>

            <TagList items={EDUCATION.skills} className="mt-6" />
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">Languages: {LANGUAGES.join(", ")}</p>
          </SpotlightCard>
        </Reveal>

        {/* Right: courses and hackathons */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {LEARNING.map((course, index) => (
            <Reveal key={course.title} delay={(index + 1) * 90}>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-4 backdrop-blur transition-colors hover:border-indigo-500/40 dark:border-white/10 dark:bg-white/[0.04]">
                <div>
                  <p className="font-semibold leading-snug text-slate-900 dark:text-white">{course.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{course.source}</p>
                </div>
                <span className="shrink-0 rounded-full border border-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/15 dark:text-slate-300">
                  {course.kind}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
   3. SKILLS: four cards of grouped skills
------------------------------------------------------------------ */
function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Toolbox"
        title="Technical skills"
        description="A snapshot of the tools I use, the areas I have experience with, and the technologies I’m currently learning."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal key={group.title} delay={index * 80}>
            <SpotlightCard>
              <div className="flex items-start gap-4">
                {/* Number badge: 01, 02, 03... */}
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-mono text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{group.description}</p>
                </div>
              </div>
              <TagList items={group.skills} className="mt-5" />
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        Skill labels are a snapshot of my current learning journey; I update them as I gain hands-on experience.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------
   4. PROJECTS: the first card spans the full width
------------------------------------------------------------------ */
/* ------------------------------------------------------------------
   4. PROJECTS: the first card spans the full width.
   Each card can show a "View live" button and a "View on GitHub" link.
   Both are optional: they only appear when the project has that field.
------------------------------------------------------------------ */
function Projects() {
  return (
    <Section id="projects">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title="Featured projects"
          description="Applications I’ve built and practical DevOps projects I’m developing."
        />
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all hover:gap-3 dark:text-blue-400"
        >
          All repositories <ArrowIcon />
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.title} delay={index * 100} className={index === 0 ? "md:col-span-2" : ""}>
            <SpotlightCard>
              {/* Title and status badge */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
                    project.status === "In progress"
                      ? "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                      : "border-slate-900/10 text-slate-500 dark:border-white/15 dark:text-slate-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description and tech tags */}
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{project.summary}</p>
              <TagList items={project.stack} className="mt-6" />

              {/* Button row: only rendered if the project has at least one link.
                  mt-auto pushes it to the bottom so the buttons line up across cards. */}
              {(project.live || project.link) && (
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                  {/* "View live" only appears when project.live has a URL */}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110 active:scale-95"
                    >
                      {/* Pulsing dot to show the project is live */}
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                      </span>
                      View live
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}

                  {/* "View on GitHub" only appears when project.link has a URL */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:gap-3 dark:text-blue-400"
                    >
                      View on GitHub <ArrowIcon />
                    </a>
                  )}
                </div>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
/* ------------------------------------------------------------------
   5. HANDS-ON DEVOPS LABS (planned exercises)
------------------------------------------------------------------ */
function Labs() {
  return (
    <Section id="labs">
      <SectionHeading
        eyebrow="Learning by doing"
        title="Hands-on DevOps labs"
        description="Small, practical labs that turn concepts into demonstrable skills. These are planned exercises; I’ll link each repository as I complete it."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {DEVOPS_LABS.map((lab, index) => (
          <Reveal key={lab.title} delay={index * 90}>
            <SpotlightCard>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">LAB_{lab.number}</span>
                <span className="rounded-full border border-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-white/15 dark:text-slate-400">
                  {lab.status}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-extrabold text-slate-900 dark:text-white">{lab.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{lab.summary}</p>

              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Planned outcome
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{lab.outcome}</p>

              <TagList items={lab.skills} className="mt-5" />
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
   7. ROADMAP: how each status looks (dot colour and label colour)
------------------------------------------------------------------ */
const ROADMAP_STATUS = {
  familiar: {
    label: "Familiar with basics",
    dot: "border-emerald-500 bg-emerald-500 text-white",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  now: {
    label: "Learning now",
    dot: "border-blue-500 bg-white dark:bg-slate-950",
    badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  next: {
    label: "Next",
    dot: "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950",
    badge: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
  planned: {
    label: "Planned",
    dot: "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950",
    badge: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
};

function Roadmap() {
  return (
    <Section id="roadmap" narrow>
      <SectionHeading
        title="My DevOps roadmap"
        description="What I’m learning now and the areas I plan to explore next."
      />

      <ol className="relative mt-12 space-y-8 pl-12">
        <span aria-hidden="true" className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-slate-900/15 dark:bg-white/15" />

        {ROADMAP.map((item, index) => {
          const style = ROADMAP_STATUS[item.status];

          return (
            <li key={item.title} className="relative">
              <Reveal delay={index * 90}>
                {/* Dot on the timeline: a tick when familiar, a pulse when current */}
                <span
                  className={`absolute -left-12 top-0.5 grid h-9 w-9 place-items-center rounded-full border-2 ${style.dot}`}
                >
                  {item.status === "familiar" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                  {item.status === "now" && (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
                    </span>
                  )}
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${style.badge}`}>{style.label}</span>
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{item.text}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------
   8. CONTACT: gradient call-to-action at the end of the page
------------------------------------------------------------------ */
function Contact() {
  const buttonStyle =
    "inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 font-semibold transition-colors hover:bg-white/15";

  return (
    <Section id="contact" className="pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-6 py-16 text-center text-white shadow-2xl shadow-indigo-900/30 sm:px-12 sm:py-20">
          {/* Two drifting glow blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl motion-safe:animate-float"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-fuchsia-400/30 blur-3xl motion-safe:animate-float"
            style={{ animationDelay: "-4s" }}
          />

          <h2 className="relative mx-auto max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let’s build something reliable.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-lg text-white/80">
            Interested in collaborating, discussing DevOps, or exploring opportunities? Feel free to connect.
          </p>

          {/* Buttons for any link that is filled in */}
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            {PROFILE.email && (
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center rounded-full bg-white px-7 py-3.5 font-semibold text-indigo-700 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {PROFILE.email}
              </a>
            )}
            {PROFILE.github && (
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className={buttonStyle}>
                GitHub
              </a>
            )}
            {PROFILE.linkedin && (
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className={buttonStyle}>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------
   THE PAGE: the order of sections is decided here.
   To reorder the page, move a line. To hide a section, delete its line.
------------------------------------------------------------------ */
export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <ToolsMarquee items={TOOLS} />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Labs />
      <Roadmap />
      <Contact />
    </div>
  );
}