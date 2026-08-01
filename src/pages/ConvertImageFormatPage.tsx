import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run, FORMAT_LABELS, FORMAT_EXTENSIONS, type ImageFormat } from "../tools/convert-image-format/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";


const FORMATS: ImageFormat[] = ["image/png", "image/jpeg", "image/webp"];

export default function ConvertImageFormatPage() {
  usePageTitle("Convert Image Format");
  useMetaDescription("Convert images between PNG, JPG, and WebP formats instantly and for free, right in your browser.");
  useTrackToolVisit("convert-image-format");
  useCanonicalUrl("/tools/convert-image-format");
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<ImageFormat>("image/jpeg");
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function convert(f: File, format: ImageFormat) {
    setResult(null);
    setError(null);
    setProgress(0);
    try {
      const output = await run(f, { targetFormat: format }, setProgress);
      setResult(output);
    } catch {
      setError("Could not convert this image.");
    } finally {
      setProgress(null);
    }
  }

  function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    convert(f, target);
  }

  function changeFormat(format: ImageFormat) {
    setTarget(format);
    if (file) convert(file, format);
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">Convert</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Convert Image Format</h1>
      <p className="text-sm text-text-dim mb-8">PNG, JPG, or WebP — any format to any format.</p>

      <div className="mb-5 flex gap-2">
        {FORMATS.map((f) => (
          <button
            key={f}
            onClick={() => changeFormat(f)}
            className={`font-display text-xs uppercase tracking-wide px-3.5 py-1.5 rounded-full border transition focus-ring ${
              target === f ? "bg-primary text-white border-primary" : "border-line text-text-dim hover:border-primary/40"
            }`}
          >
            {FORMAT_LABELS[f]}
          </button>
        ))}
      </div>

      {!file && (
        <Dropzone accept="image/*" onFiles={handleFiles} label="Drop an image or tap to browse" hint="" />
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Converting" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard
            toolId="convert-image-format"
            blob={result}
            filename={`${file.name.replace(/\.[^.]+$/, "")}.${FORMAT_EXTENSIONS[target]}`}
            originalSize={file.size}
            onReset={reset}
          />
        </div>
      )}
      <ToolInfoFooter toolId="convert-image-format" />

    </div>
  );
}
