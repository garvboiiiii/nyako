import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run, defaultOptions, type PdfToImagesOptions } from "../tools/pdf-to-images/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useDroppedFile } from "../lib/useDroppedFile";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";



export default function PdfToImagesPage() {
  usePageTitle("PDF to Images");
  useMetaDescription("Convert every page of a PDF into a JPG or PNG image, free and entirely in your browser.");
  useTrackToolVisit("pdf-to-images");
  useCanonicalUrl("/tools/pdf-to-images");
  useDroppedFile((file) => handleFiles([file]));


  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<PdfToImagesOptions["format"]>(defaultOptions.format);
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
      const output = await run(f, { format }, setProgress);
      setResult(output);
    } catch {
      setError("Could not read this PDF. Make sure it's not password-protected.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  const filename = result?.type === "application/zip" ? "pages.zip" : `page.${format === "image/png" ? "png" : "jpg"}`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-wide text-primary">PDF Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">PDF to Images</h1>
      <p className="text-sm text-text-dim mb-8">
        Turns every page into an image. Multi-page PDFs download as a ZIP.
      </p>

      {!file && (
        <>
          <div className="mb-4 flex gap-2">
            {(["image/jpeg", "image/png"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`font-display text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border transition focus-ring ${
                  format === f ? "bg-ink text-paper border-ink" : "border-line text-text-dim hover:border-ink/40"
                }`}
              >
                {f === "image/png" ? "PNG" : "JPG"}
              </button>
            ))}
          </div>
          <Dropzone accept="application/pdf" onFiles={handleFiles} label="Drop a PDF or tap to browse" hint="One image per page" />
        </>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Rendering pages" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="pdf-to-images" blob={result} filename={filename} originalSize={file.size} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="pdf-to-images" />

    </div>
  );
}
