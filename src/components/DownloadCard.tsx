import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { saveAs } from "file-saver";
import { getNextSteps } from "../lib/intent/dictionary";
import { track, sizeBucket } from "../lib/analytics";
import { sanitizeFilename } from "../lib/sanitizeFilename";
import NyakoMascot from "./NyakoMascot";

interface DownloadCardProps {
  blob: Blob;
  filename: string;
  originalSize?: number;
  onReset: () => void;
  /** Current tool's id — used to look up "what to do next" suggestions and analytics */
  toolId?: string;
  /** Optional note shown above the actions, e.g. when a size target wasn't reached */
  note?: { tone: "warning" | "info"; text: string };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DownloadCard({ blob, filename, originalSize, onReset, toolId, note }: DownloadCardProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Preview URL is memoized to the blob itself — avoids creating a fresh
  // object URL (and leaking the old one) on every re-render.
  const previewUrl = useMemo(() => URL.createObjectURL(blob), [blob]);
  const nextSteps = useMemo(() => (toolId ? getNextSteps(toolId) : []), [toolId]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    if (toolId) {
      track("tool_run_completed", { toolId, resultSize: sizeBucket(blob.size) });
    }
    return () => URL.revokeObjectURL(previewUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  const reduction =
    originalSize && originalSize > 0 ? Math.round((1 - blob.size / originalSize) * 100) : null;

  // A plain <a download> anchor is unreliable on several mobile browsers
  // (notably iOS Safari and in-app webviews), which often just navigate to
  // or preview the blob instead of saving it — this is the #1 real-world
  // cause of "nothing downloads". file-saver uses more robust per-browser
  // save strategies and is the standard fix.
  function handleDownload() {
    saveAs(blob, sanitizeFilename(filename));
    track("download_clicked", { toolId: toolId ?? "unknown" });
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6 text-center shadow-sm animate-fade-scale">
      <div className="flex flex-col items-center gap-1">
        <NyakoMascot state="happy" size={56} />
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-sm uppercase tracking-wide text-ok mt-1">
          Done
        </h3>
      </div>
      <p className="text-sm text-text-dim mt-2">
        {formatBytes(blob.size)}
        {reduction !== null && reduction > 0 && <> · {reduction}% smaller</>}
      </p>

      {note && (
        <p className={`mt-3 text-sm rounded-lg px-3 py-2 text-left ${note.tone === "warning" ? "bg-amber-50 text-amber-800" : "bg-primary/5 text-primary"}`}>
          {note.text}
        </p>
      )}

      <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleDownload}
          className="font-display text-xs uppercase tracking-wide bg-primary text-white px-4 py-2.5 rounded-full font-semibold hover:brightness-110 hover:shadow-md transition focus-ring"
        >
          Download
        </button>
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-xs uppercase tracking-wide border border-line px-4 py-2.5 rounded-full hover:border-primary/40 hover:text-primary transition focus-ring"
        >
          Open in new tab
        </a>
        <button
          onClick={onReset}
          className="font-display text-xs uppercase tracking-wide border border-line px-4 py-2.5 rounded-full hover:border-primary/40 hover:text-primary transition focus-ring"
        >
          Process another file
        </button>
      </div>

      {nextSteps.length > 0 && (
        <div className="mt-6 pt-5 border-t border-line">
          <p className="text-xs uppercase tracking-wide text-text-dim mb-3">Next step</p>
          <div className="flex flex-wrap justify-center gap-2">
            {nextSteps.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.slug}`}
                onClick={() => track("next_step_clicked", { from: toolId ?? "unknown", to: tool.id })}
                className="inline-flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-full border border-line hover:border-primary/40 hover:text-primary transition focus-ring"
              >
                {tool.title} <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
