import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/merge-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import { useDroppedFile } from "../lib/useDroppedFile";

export default function MergePdfPage() {
  usePageTitle("Merge PDF");
  useMetaDescription("Merge multiple PDF files into one document for free, entirely in your browser — no upload, no signup.");
  useTrackToolVisit("merge-pdf");
  useCanonicalUrl("/tools/merge-pdf");
  useDroppedFile((file) => addFiles([file]));




  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  function addFiles(newFiles: File[]) {
    setFiles((prev) => [...prev, ...newFiles]);
    setResult(null);
    setError(null);
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleMerge() {
    setProgress(0);
    setError(null);
    try {
      const output = await run(files, {}, setProgress);
      setResult(output);
    } catch (e) {
      setError("Could not merge these PDFs. Make sure all files are valid PDFs.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFiles([]);
    setResult(null);
    setError(null);
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <p className="font-display text-xs uppercase tracking-wide text-text-dim">PDF Tools</p>
      <h1 className="font-display text-2xl font-semibold mt-1 mb-2">Merge PDF</h1>
      <p className="text-sm text-text-dim mb-8">
        Combine multiple PDFs into one, in the order you choose.
      </p>

      {!result && (
        <>
          <Dropzone
            accept="application/pdf"
            multiple
            onFiles={addFiles}
            label="Drop PDFs or click to browse"
            hint="Add as many files as you need"
          />

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between text-sm bg-surface border border-line rounded-md px-3 py-2"
                >
                  <span className="truncate">{i + 1}. {f.name}</span>
                  <button
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${f.name}`}
                    className="text-text-dim hover:text-red-600 focus-ring ml-3 shrink-0"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {files.length >= 2 && progress === null && (
            <button
              onClick={handleMerge}
              className="mt-5 font-display text-xs uppercase tracking-wide bg-primary text-white px-4 py-2.5 rounded-md font-semibold hover:brightness-110 transition focus-ring"
            >
              Merge {files.length} files
            </button>
          )}
          {files.length === 1 && (
            <p className="mt-4 text-sm text-text-dim">Add at least one more PDF to merge.</p>
          )}
        </>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Merging" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && (
        <div className="mt-6">
          <DownloadCard toolId="merge-pdf" blob={result} filename="merged.pdf" originalSize={totalSize} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="merge-pdf" />

    </div>
  );
}
