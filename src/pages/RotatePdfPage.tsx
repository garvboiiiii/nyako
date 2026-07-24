import { useEffect, useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/rotate-pdf/engine";
import { getPdfPageCount } from "../lib/file-engine/pdfRender";
import { validatePageRange } from "../lib/file-engine/pageRange";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";

export default function RotatePdfPage() {
  usePageTitle("Rotate PDF");
  useMetaDescription("Rotate all or specific pages of a PDF by 90, 180, or 270 degrees — free and private.");
  useTrackToolVisit("rotate-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pages, setPages] = useState("all");
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) getPdfPageCount(file).then(setPageCount).catch(() => setPageCount(null));
  }, [file]);

  async function handleRotate() {
    if (!file) return;
    if (pages.trim().toLowerCase() !== "all" && pageCount) {
      const check = validatePageRange(pages, pageCount);
      if (!check.ok) {
        setError(check.reason ?? "Invalid page range.");
        return;
      }
    }
    setProgress(0);
    setError(null);
    try {
      const output = await run(file, { pages, angle }, setProgress);
      setResult(output);
    } catch {
      setError("Could not rotate this PDF.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
    setPageCount(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">PDF Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">Rotate PDF</h1>
      <p className="text-sm text-text-dim mb-8">Rotate all pages, or just the ones you pick.</p>

      {!file && (
        <Dropzone accept="application/pdf" onFiles={(f) => setFile(f[0])} label="Drop a PDF or tap to browse" hint="Rotate clockwise, 90° at a time" />
      )}

      {file && !result && (
        <div className="space-y-5">
          {pageCount && <p className="text-sm text-text-dim">{pageCount} pages detected.</p>}

          <label className="block text-sm">
            <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">Pages</span>
            <input
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="all, or e.g. 1,3,5-7"
              className="w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus-ring bg-surface"
            />
          </label>

          <div>
            <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">Rotation</span>
            <div className="flex gap-2">
              {([90, 180, 270] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className={`font-display text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border transition focus-ring ${
                    angle === a ? "bg-ink text-paper border-ink" : "border-line text-text-dim hover:border-ink/40"
                  }`}
                >
                  {a}°
                </button>
              ))}
            </div>
          </div>

          {progress === null && (
            <button
              onClick={handleRotate}
              className="font-display text-xs uppercase tracking-wide bg-ink text-paper px-4 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Rotate PDF
            </button>
          )}
        </div>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Rotating" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="rotate-pdf" blob={result} filename={`rotated-${file.name}`} originalSize={file.size} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="rotate-pdf" />

    </div>
  );
}
