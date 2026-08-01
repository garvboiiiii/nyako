import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run, defaultOptions, type CompressImageResult } from "../tools/compress-image/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import { useDroppedFile } from "../lib/useDroppedFile";


export default function CompressImagePage() {
  usePageTitle("Compress Image");
  useMetaDescription("Compress JPG, PNG, or WebP images to an exact target size in KB — free, no signup, runs entirely in your browser.");
  useTrackToolVisit("compress-image");
  useCanonicalUrl("/tools/compress-image");
  useDroppedFile((file) => handleFiles([file]));
  const [params] = useSearchParams();
  const targetParam = params.get("target");
  const initialKB = targetParam ? Math.round(Number(targetParam) / 1024) : Math.round(defaultOptions.targetSizeMB * 1024);

  const [file, setFile] = useState<File | null>(null);
  const [targetKB, setTargetKB] = useState(initialKB);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<CompressImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function compress(f: File, kb: number) {
    setResult(null);
    setError(null);
    setProgress(0);
    try {
      const output = await run(f, { targetSizeMB: kb / 1024 }, setProgress);
      setResult(output);
    } catch {
      setError("Could not compress this image. Try a different file.");
    } finally {
      setProgress(null);
    }
  }

  function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    compress(f, targetKB);
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  function retryWithTarget() {
    if (file) compress(file, targetKB);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">Image Tools</p>
      <h1 className="font-display text-2xl font-bold mt-1 mb-2">Compress Image</h1>
      <p className="text-sm text-text-dim mb-8">Shrink a photo to a target size, right in your browser.</p>

      <label className="block text-sm mb-4">
        <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">
          Target size (KB)
        </span>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={5}
            value={targetKB}
            onChange={(e) => setTargetKB(Math.max(5, Number(e.target.value)))}
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
        <Dropzone
          accept="image/*"
          onFiles={handleFiles}
          label="Drop an image or click to browse"
          hint="JPG, PNG, WebP supported"
        />
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
            blob={result.blob}
            filename={`compressed-${file.name}`}
            originalSize={file.size}
            onReset={reset}
            toolId="compress-image"
            note={
              result.targetMet
                ? undefined
                : {
                    tone: "warning",
                    text: `Couldn't quite reach ${targetKB} KB — this image needed more detail than that to stay usable. Closest we could get: ${(result.blob.size / 1024).toFixed(1)} KB, at the smallest reasonable resolution and quality.`,
                  }
            }
          />
        </div>
      )}

      <ToolInfoFooter toolId="compress-image" />

    </div>
  );
}
