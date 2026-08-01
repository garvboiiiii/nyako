import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run, defaultOptions, type CompressPdfResult } from "../tools/compress-pdf/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function CompressPdfPage() {
  usePageTitle("Compress PDF");
  useMetaDescription("Compress a PDF to a target file size for email or upload limits — free, private, works on scanned PDFs too.");
  useTrackToolVisit("compress-pdf");
  useCanonicalUrl("/tools/compress-pdf");
  
  const [params] = useSearchParams();
  const targetParam = params.get("target");
  const initialMB = targetParam ? Number(targetParam) / 1024 / 1024 : defaultOptions.targetSizeMB;

  const [file, setFile] = useState<File | null>(null);
  const [targetMB, setTargetMB] = useState(initialMB);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<CompressPdfResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function compress(f: File, mb: number) {
    setResult(null);
    setError(null);
    setProgress(0);
    try {
      const output = await run(f, { targetSizeMB: mb }, setProgress);
      setResult(output);
    } catch {
      setError("Could not compress this PDF. Make sure it's not password-protected.");
    } finally {
      setProgress(null);
    }
  }

  function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    compress(f, targetMB);
  }

  function retryWithTarget() {
    if (file) compress(file, targetMB);
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">PDF Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Compress PDF</h1>
      <p className="text-sm text-text-dim mb-8">
        Shrinks a PDF for email or upload limits. Works best on scanned or image-heavy PDFs.
      </p>

      <label className="block text-sm mb-4">
        <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">
          Target size (MB)
        </span>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0.05}
            step={0.1}
            value={targetMB}
            onChange={(e) => setTargetMB(Math.max(0.05, Number(e.target.value)))}
            className="w-40 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus-ring bg-surface"
          />
          {file && progress === null && (
            <button
              onClick={retryWithTarget}
              className="font-display text-xs uppercase tracking-wide border border-line px-3 py-2.5 rounded-lg hover:border-primary/40 hover:text-primary transition focus-ring"
            >
              Re-compress with this target
            </button>
          )}
        </div>
      </label>

      {!file && (
        <Dropzone accept="application/pdf" onFiles={handleFiles} label="Drop a PDF or tap to browse" hint="" />
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Compressing" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard
            toolId="compress-pdf"
            blob={result.blob}
            filename={`compressed-${file.name}`}
            originalSize={file.size}
            onReset={reset}
            note={
              result.targetMet
                ? undefined
                : {
                    tone: "warning",
                    text: `Couldn't quite reach ${targetMB} MB — at that size the pages would be unreadable. Closest we could get while staying legible: ${(result.blob.size / 1024 / 1024).toFixed(2)} MB.`,
                  }
            }
          />
        </div>
      )}
      <ToolInfoFooter toolId="compress-pdf" />

    </div>
  );
}
