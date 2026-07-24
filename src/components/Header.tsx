import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../lib/useDarkMode";
import { useKeyboardShortcuts } from "../lib/useKeyboardShortcuts";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Tools", href: "/#tools" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight focus-ring">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 8 L3 2 L9 5.5 Z" fill="var(--color-primary)" />
        <path d="M19 8 L21 2 L15 5.5 Z" fill="var(--color-primary)" />
        <circle cx="12" cy="13" r="8" fill="var(--color-primary)" />
        <circle cx="9" cy="12" r="1.2" fill="#ffffff" />
        <circle cx="15" cy="12" r="1.2" fill="#ffffff" />
      </svg>
      <span className="text-ink">Nyako</span>
    </Link>
  );
}

function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-text-dim hover:text-ink hover:border-ink/30 transition focus-ring"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.4 14.7A8.5 8.5 0 1 1 9.3 3.6a7 7 0 0 0 11.1 11.1Z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSearchClick() {
    if (location.pathname === "/") {
      navigate("/?focus=1", { replace: true });
    } else {
      navigate("/?focus=1");
    }
  }

  useKeyboardShortcuts({
    onSlash: handleSearchClick,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-7 text-sm text-text-dim">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.href} className="hover:text-ink transition focus-ring">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSearchClick}
            aria-label="Search tools"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-text-dim hover:text-ink hover:border-ink/30 transition focus-ring"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <ThemeToggle />

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full border border-line focus-ring"
          >
            <span className={`block w-4 h-px bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block w-4 h-px bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-surface px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className="px-2 py-2.5 rounded-lg text-sm hover:bg-paper transition focus-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
