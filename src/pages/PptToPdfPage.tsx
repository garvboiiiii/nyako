import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/ppt-to-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useDroppedFile } from "../lib/useDroppedFile";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function PptToPdfPage() {
  usePageTitle("PPT to PDF");
  useMetaDescription("Convert PowerPoint slide text to PDF pages for free, directly in your browser.");
  useTrackToolVisit("ppt-to-pdf");
  useCanonicalUrl("/tools/ppt-to-pdf");
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
      setError("Could not convert this file. Make sure it's a .pptx file.");
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
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">Convert</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">PPT to PDF</h1>
      <p className="text-sm text-text-dim mb-8">
        Pulls the text from every slide onto its own PDF page. A text-content conversion — slide
        backgrounds, images, and exact layout aren't reproduced.
      </p>

      {!file && (
        <Dropzone
          accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          onFiles={handleFiles}
          label="Drop a .pptx file or tap to browse"
          hint=""
        />
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Reading slides" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="ppt-to-pdf" blob={result} filename={`${file.name.replace(/\.pptx$/i, "")}.pdf`} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="ppt-to-pdf" />

    </div>
  );
}
