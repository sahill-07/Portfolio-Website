import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandPalette({ open, onClose, onToggleTheme, github }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      { label: "Go to Home", hint: "Page", run: () => navigate("/") },
      { label: "Go to Projects", hint: "Page", run: () => navigate("/projects") },
      { label: "Go to About", hint: "Page", run: () => navigate("/about") },
      { label: "Toggle dark mode", hint: "Theme", run: onToggleTheme },
      { label: "Open GitHub", hint: "Link", run: () => window.open(github, "_blank", "noopener") },
    ],
    [navigate, onToggleTheme, github]
  );

  const results = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  // Reset and focus every time it opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const run = (cmd) => {
    if (!cmd) return;
    onClose();
    cmd.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") run(results[index]);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/50 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          className="w-full border-b border-slate-200 bg-transparent px-5 py-4 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:border-white/10 dark:text-white"
        />
        <ul className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-slate-500">
              No matches. Try “projects” or “theme”.
            </li>
          )}
          {results.map((c, i) => (
            <li key={c.label}>
              <button
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => run(c)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
                  i === index
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {c.label}
                <span className="font-mono text-xs opacity-70">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}