import { useEffect, useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/delete-pdf-pages/engine";
import { getPdfPageCount } from "../lib/file-engine/pdfRender";
import { validatePageRange } from "../lib/file-engine/pageRange";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";


export default function DeletePdfPagesPage() {
  usePageTitle("Delete PDF Pages");
  useMetaDescription("Delete specific pages from a PDF for free, directly in your browser — no upload required.");
  useTrackToolVisit("delete-pdf-pages");
  useCanonicalUrl("/tools/delete-pdf-pages");
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pages, setPages] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) getPdfPageCount(file).then(setPageCount).catch(() => setPageCount(null));
  }, [file]);

  async function handleRun() {
    if (!file || !pageCount) return;
    const check = validatePageRange(pages, pageCount);
    if (!check.ok) {
      setError(check.reason ?? "Invalid page range.");
      return;
    }
    setProgress(0);
    setError(null);
    try {
      const output = await run(file, { pages }, setProgress);
      setResult(output);
    } catch {
      setError("Could not edit this PDF.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
    setPageCount(null);
    setPages("");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">PDF Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">Delete PDF Pages</h1>
      <p className="text-sm text-text-dim mb-8">Remove specific pages and keep the rest.</p>

      {!file && (
        <Dropzone accept="application/pdf" onFiles={(f) => setFile(f[0])} label="Drop a PDF or tap to browse" hint="" />
      )}

      {file && !result && (
        <div className="space-y-5">
          {pageCount && <p className="text-sm text-text-dim">{pageCount} pages detected.</p>}
          <label className="block text-sm">
            <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">Pages to delete</span>
            <input
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 2,4-6"
              className="w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus-ring bg-surface"
            />
          </label>
          {progress === null && (
            <button
              onClick={handleRun}
              className="font-display text-xs uppercase tracking-wide bg-ink text-paper px-4 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Delete pages
            </button>
          )}
        </div>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Removing pages" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="delete-pdf-pages" blob={result} filename={`edited-${file.name}`} originalSize={file.size} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="delete-pdf-pages" />

    </div>
  );
}
