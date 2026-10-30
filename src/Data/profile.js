// ==================================================================
//  ALL THE TEXT ON YOUR SITE LIVES HERE.
//  Components only display this data, so to change content, edit
//  this file and leave the layout code alone.
// ==================================================================

export const PROFILE = {
  name: "Sahil Bangar",
  // The hero line types these out one after another
  roles: [
    "an Application Support Engineer",
    "building DevOps skills",
    "learning CI/CD automation",
  ],
  intro:
    "Application Support Engineer at TCS with experience in Linux, shell scripting, SQL, and production troubleshooting. I’m building practical DevOps skills through Docker, CI/CD, and infrastructure automation.",
  email: "", // add your real email; empty values are hidden automatically
  github: "https://github.com/sahill-07",
  linkedin: "", // add your real LinkedIn URL
  resume: "/resume.pdf", // put resume.pdf in the /public folder, or set "" to hide the button
};

// Social icons (navbar menu and footer). Empty links are filtered out.
export const SOCIALS = [
  { label: "GitHub", href: PROFILE.github, icon: "github" },
  { label: "LinkedIn", href: PROFILE.linkedin, icon: "linkedin" },
  { label: "Email", href: PROFILE.email && `mailto:${PROFILE.email}`, icon: "mail" },
].filter((social) => social.href);

// Injected at build time by vite.config.js. Shows "local" on your machine.
export const COMMIT = typeof __COMMIT__ !== "undefined" ? __COMMIT__ : "local";

// Scrolling strip under the hero
export const TOOLS = [
  "Linux", "Shell scripting", "Git", "GitHub", "GitHub Actions", "Docker",
  "React", "Tailwind CSS", "Java", "SQL", "Oracle", "MongoDB", "C++", "Vite",
];

export const EXPERIENCE = [
  {
    role: "Application Support Engineer",
    company: "Tata Consultancy Services",
    location: "Mumbai, India",
    period: "Feb 2025 – Present",
    current: true,
    points: [
      "Monitor business-critical production applications and respond to incidents, escalating issues within agreed time limits.",
      "Troubleshoot stuck processes, failed file transfers, and service issues using Linux commands and shell scripts.",
      "Perform SQL and database checks to investigate data discrepancies and job-processing issues.",
      "Follow ITIL practices, maker-checker controls, and established production procedures when handling operational tasks.",
    ],
    tools: ["Linux", "Shell scripting", "SQL", "Oracle", "rsync", "ITIL"],
  },
];

// The three small cards under the job
export const DEVOPS_EDGE = [
  {
    title: "Production mindset",
    text: "Working around live systems has taught me to understand the impact of a command before executing it.",
  },
  {
    title: "Incident troubleshooting",
    text: "Investigating issues, escalating on time, and documenting findings are important parts of reliable operations.",
  },
  {
    title: "Automation mindset",
    text: "I look for opportunities to reduce repetitive manual work through scripts and automated workflows.",
  },
];

export const SKILL_GROUPS = [
  {
    title: "Operating Systems & Scripting",
    description: "Working with command-line tools, files, logs, and routine operational tasks.",
    skills: ["Linux", "Unix", "Bash / Shell scripting", "grep", "find", "awk", "sed", "rsync"],
  },
  {
    title: "Version Control & CI/CD",
    description: "Version control fundamentals and learning to automate software workflows.",
    skills: ["Git", "GitHub", "Branches & merging", "GitHub Actions (learning)"],
  },
  {
    title: "Containers & Infrastructure",
    description: "Currently developing practical skills in packaging and deploying applications.",
    skills: ["Docker (learning)", "Nginx (planned)", "Terraform (planned)"],
  },
  {
    title: "Development & Databases",
    description: "Application development fundamentals and database troubleshooting.",
    skills: ["React", "Java", "C++", "SQL", "Oracle", "MongoDB", "Tailwind CSS"],
  },
];

export const PROJECTS = [
  {
    title: "DevOps Portfolio",
    status: "In progress",
    summary: "Building a React portfolio while learning containerization and deployment. Planned improvements include a multi-stage Docker build, Nginx, GitHub Actions CI/CD, and Terraform.",
    stack: ["React", "Vite", "Docker", "Nginx", "GitHub Actions", "Terraform"],
    link: "",           // GitHub repo URL
    live: "",           // hosted site URL; add it after you deploy
  },
  {
    title: "Tech-CollabHub",
    status: "Built",
    summary: "A GitHub-based project recommendation system that uses repository information such as stars, forks, languages, and topics to help developers discover projects to contribute to. It also includes a discussion forum.",
    stack: ["React", "GitHub API", "Node.js"],
    link: "https://github.com/sahill-07/tech-collabhub",
    live: "",           // e.g. "https://tech-collabhub.vercel.app"
  },
  {
    title: "React Weather App",
    status: "Built",
    summary: "A weather application that fetches live weather information for different cities using the OpenWeather API, with Mumbai as the default city.",
    stack: ["React", "Vite", "Tailwind CSS", "OpenWeather API"],
    link: "https://github.com/sahill-07/React-Weather-App",
    live: "https://weather-app-by-sahill.netlify.app/",
  },
  {
    title: "Star Protect",
    status: "Built",
    summary: "A vehicle insurance management application with separate admin and user panels, login functionality, and route guards.",
    stack: ["Angular", "Tailwind CSS"],
    link: "",
    live: "",
  },
];

// These are ideas to build, not claims of finished projects
export const DEVOPS_LABS = [
  {
    number: "01",
    title: "Linux & Shell Automation",
    status: "Planned lab",
    summary:
      "Create a script that checks disk usage, writes a timestamped log, and reports when a configured threshold is exceeded.",
    skills: ["Bash", "Linux", "Logging", "Cron"],
    outcome: "A reusable script with a README, sample output, and safe test instructions.",
  },
  {
    number: "02",
    title: "Dockerized Web Application",
    status: "Planned lab",
    summary:
      "Package a React application in a multi-stage Docker image and serve the production build with Nginx.",
    skills: ["Dockerfile", "Multi-stage build", "Nginx"],
    outcome: "A reproducible local deployment with documented build and run commands.",
  },
  {
    number: "03",
    title: "GitHub Actions CI Pipeline",
    status: "Planned lab",
    summary:
      "Create a workflow that installs dependencies, runs available checks, and builds the application on pushes and pull requests.",
    skills: ["GitHub Actions", "YAML", "npm", "CI"],
    outcome: "A working workflow run linked from the repository and explained in the README.",
  },
];

export const EDUCATION = {
  degree: "Bachelor of Engineering, Computer Engineering",
  school: "Terna Engineering College",
  years: "2020 – 2024",
  skills: ["C++ and data structures", "Java and OOP", "SQL and databases", "Web development"],
};

export const LEARNING = [
  { title: "Meta Front-End Developer Professional Certificate", source: "Coursera", kind: "Certificate" },
  { title: "Web Development Bootcamp", source: "Udemy", kind: "Course" },
  { title: "Smart India Hackathon", source: "Participant", kind: "Hackathon" },
  { title: "Crescendo Hackathon", source: "Participant", kind: "Hackathon" },
];

export const LANGUAGES = ["English", "Hindi", "Marathi"];

// status can be: "familiar", "now", "next" or "planned"
export const ROADMAP = [
  {
    title: "Linux and shell scripting",
    text: "Practising server commands, log analysis, file operations, and practical automation.",
    status: "now",
  },
  {
    title: "Git and GitHub",
    text: "Building confidence with commits, branches, merging, and version control workflows.",
    status: "familiar",
  },
  {
    title: "Docker",
    text: "Learning containers, Dockerfiles, image building, multi-stage builds, and Nginx.",
    status: "next",
  },
  {
    title: "CI/CD",
    text: "Building a GitHub Actions workflow to test and build an application.",
    status: "next",
  },
  {
    title: "Infrastructure as code",
    text: "Planning to learn Terraform and infrastructure provisioning.",
    status: "planned",
  },
  {
    title: "Monitoring",
    text: "Planning to explore metrics, dashboards, uptime checks, and alerts.",
    status: "planned",
  },
];

// Steps shown in the hero's animated pipeline (an illustration, not a real deploy)
export const PIPELINE = [
  { label: "Checkout", detail: "git checkout" },
  { label: "Install and lint", detail: "npm ci && npm run lint" },
  { label: "Build image", detail: "docker build" },
  { label: "Scan image", detail: "trivy image" },
  { label: "Deploy", detail: "deployment workflow" },
];