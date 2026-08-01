import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/split-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useDroppedFile } from "../lib/useDroppedFile";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function SplitPdfPage() {
  usePageTitle("Split PDF");
  useMetaDescription("Split a PDF into individual page files, packaged as a ZIP — free, private, instant.");
  useTrackToolVisit("split-pdf");
  useCanonicalUrl("/tools/split-pdf");
  useDroppedFile((file) => handleFiles([file]));


  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    setResult(null);
    setError(null);
    setProgress(0);
    try {
      const output = await run(f, {}, setProgress);
      setResult(output);
    } catch {
      setError("Could not split this PDF. Make sure it's not password-protected.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">PDF Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">Split PDF</h1>
      <p className="text-sm text-text-dim mb-8">Breaks every page out into its own PDF, packaged as a ZIP.</p>

      {!file && (
        <Dropzone accept="application/pdf" onFiles={handleFiles} label="Drop a PDF or tap to browse" hint="Every page becomes its own file" />
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Splitting" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="split-pdf" blob={result} filename="split-pages.zip" originalSize={file.size} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="split-pdf" />

    </div>
  );
}
