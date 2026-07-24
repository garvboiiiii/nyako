import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/image-to-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";

export default function ImageToPdfPage() {
  usePageTitle("Image to PDF");
  useMetaDescription("Combine unlimited JPG or PNG images into a single PDF, in your chosen order — free and private.");
  useTrackToolVisit("image-to-pdf");
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

  function move(idx: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  async function handleConvert() {
    setProgress(0);
    setError(null);
    try {
      const output = await run(files, {}, setProgress);
      setResult(output);
    } catch {
      setError("Could not convert these images. Make sure they're valid image files.");
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">PDF Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">Image to PDF</h1>
      <p className="text-sm text-text-dim mb-8">
        Combine any number of photos or scans into a single PDF, in the order you choose.
      </p>

      {!result && (
        <>
          <Dropzone
            accept="image/*"
            multiple
            onFiles={addFiles}
            label="Drop images or tap to browse"
            hint="No limit on how many you add"
          />

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between gap-2 text-sm bg-surface border border-line rounded-md px-3 py-2"
                >
                  <span className="truncate">{i + 1}. {f.name}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => move(i, -1)} aria-label={`Move ${f.name} up`} className="w-8 h-8 text-text-dim hover:text-ink focus-ring rounded">↑</button>
                    <button onClick={() => move(i, 1)} aria-label={`Move ${f.name} down`} className="w-8 h-8 text-text-dim hover:text-ink focus-ring rounded">↓</button>
                    <button onClick={() => removeFile(i)} aria-label={`Remove ${f.name}`} className="w-8 h-8 text-text-dim hover:text-red-600 focus-ring rounded">×</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {files.length >= 1 && progress === null && (
            <button
              onClick={handleConvert}
              className="mt-5 font-display text-xs uppercase tracking-wide bg-ink text-paper px-4 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Create PDF from {files.length} image{files.length > 1 ? "s" : ""}
            </button>
          )}
        </>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Building PDF" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && (
        <div className="mt-6">
          <DownloadCard toolId="image-to-pdf" blob={result} filename="images.pdf" originalSize={totalSize} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="image-to-pdf" />

    </div>
  );
}
