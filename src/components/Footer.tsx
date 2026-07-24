import { Link } from "react-router-dom";
import { TOOLS } from "../lib/intent/dictionary";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <p className="font-display text-xs uppercase tracking-wide text-text-dim mb-4">
          All tools
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {TOOLS.map((t) => (
            <Link
              key={t.id}
              to={`/tools/${t.slug}`}
              className="text-sm text-text-dim hover:text-ink transition focus-ring"
            >
              {t.title}
            </Link>
          ))}
        </div>
        <p className="text-xs text-text-dim mt-8">
          Files are processed in your browser. Nothing is uploaded to a server.
        </p>
      </div>
    </footer>
  );
}
