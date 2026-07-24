import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { parseIntent } from "../lib/intent/scorer";
import { getToolIcon } from "../lib/icons";
import { useKeyboardShortcuts } from "../lib/useKeyboardShortcuts";
import { track } from "../lib/analytics";
import NyakoMascot, { type MascotState } from "./NyakoMascot";

const PLACEHOLDERS = [
  "Compress image to 40KB",
  "Merge PDF",
  "Create Passport Photo",
  "Transparent Signature",
  "Resize Image",
  "Convert PNG to JPG",
];

export default function CommandBar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [showDisambiguation, setShowDisambiguation] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const [mascotState, setMascotState] = useState<MascotState>("idle");

  useEffect(() => {
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Header's search icon links here with ?focus=1
  useEffect(() => {
    if (searchParams.get("focus")) {
      inputRef.current?.focus();
      searchParams.delete("focus");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    // The search bar is the core interaction of the whole product — autofocus
    // it by default. Skipped on small screens so the keyboard doesn't pop up
    // and shove the page around before the person has scrolled to it.
    if (window.innerWidth >= 768) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyboardShortcuts({
    onSlash: () => inputRef.current?.focus(),
    onEscape: () => {
      setShowSuggestions(false);
      setShowDisambiguation(false);
      inputRef.current?.blur();
    },
  });

  const intent = useMemo(() => (value.trim() ? parseIntent(value) : null), [value]);
  const suggestions = useMemo(() => (intent ? intent.matches.slice(0, 5) : []), [intent]);

  useEffect(() => setHighlightedIdx(0), [value]);

  function go(slug: string) {
    const q = intent?.params.targetSizeBytes
      ? `?target=${Math.round(intent.params.targetSizeBytes)}`
      : "";
    setMascotState("happy");
    setShowSuggestions(false);
    setTimeout(() => navigate(`/tools/${slug}${q}`), 250);
  }

  function handleChange(v: string) {
    setValue(v);
    setShowDisambiguation(false);
    setShowSuggestions(v.trim().length > 0);
    setMascotState(v.trim() ? "thinking" : "idle");
  }

  function submitBest() {
    if (!intent || !intent.best) return;
    track("search_submitted", { query: value.slice(0, 40) });
    setMascotState("searching");
    setTimeout(() => {
      if (intent.needsDisambiguation) {
        setShowDisambiguation(true);
        setShowSuggestions(false);
        setMascotState("thinking");
        track("search_disambiguation_shown", { query: value.slice(0, 40) });
        return;
      }
      go(intent.best!.tool.slug);
    }, 350);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (showSuggestions && suggestions[highlightedIdx]) {
      go(suggestions[highlightedIdx].tool.slug);
      return;
    }
    submitBest();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIdx((i) => Math.max(i - 1, 0));
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-end justify-center gap-3">
        <NyakoMascot state={mascotState} size={64} className="hidden sm:block shrink-0 mb-1" />
        <div className="relative flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-1 bg-surface border border-line rounded-full pl-5 pr-1.5 py-1.5 shadow-[0_8px_30px_rgba(37,99,235,0.08)] focus-within:border-primary/50 transition"
          >
            <Search size={16} className="text-text-dim shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => {
                setMascotState((s) => (s === "idle" && value.trim() ? "thinking" : s));
                if (value.trim()) setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={handleKeyDown}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              aria-label="Describe what you want to do with your file"
              aria-expanded={showSuggestions}
              aria-controls="search-suggestions"
              role="combobox"
              autoComplete="off"
              className="font-display flex-1 bg-transparent text-ink placeholder-text-dim/70 text-sm sm:text-base outline-none min-w-0 px-2"
            />
            <button
              type="submit"
              aria-label="Search Tools"
              className="shrink-0 flex items-center gap-2 font-display text-xs sm:text-sm bg-primary text-white pl-4 pr-3 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Search Tools
              <span aria-hidden="true" className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                ↗
              </span>
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="search-suggestions"
              role="listbox"
              className="absolute left-0 right-0 mt-2 bg-surface border border-line rounded-2xl shadow-lg overflow-hidden z-30 animate-fade-slide"
            >
              {suggestions.map((m, i) => {
                const Icon = getToolIcon(
                  m.tool.iconName
                );
                return (
                  <li key={m.tool.id} role="option" aria-selected={i === highlightedIdx}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => go(m.tool.slug)}
                      onMouseEnter={() => setHighlightedIdx(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition ${
                        i === highlightedIdx ? "bg-primary/5" : ""
                      }`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-primary" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-ink truncate">{m.tool.title}</span>
                        <span className="block text-xs text-text-dim truncate">{m.tool.description}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {showDisambiguation && intent && intent.matches.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-text-dim w-full text-center">Did you mean:</span>
          {intent.matches.slice(0, 3).map((m) => (
            <button
              key={m.tool.id}
              onClick={() => go(m.tool.slug)}
              className="text-sm px-3 py-1.5 rounded-full border border-line bg-surface hover:border-primary/50 transition focus-ring"
            >
              {m.tool.title}
            </button>
          ))}
        </div>
      )}

      <p className="mt-3 text-center text-xs text-text-dim">
        Press <kbd className="px-1.5 py-0.5 rounded border border-line bg-surface font-mono">/</kbd> to search from anywhere
      </p>
    </div>
  );
}
