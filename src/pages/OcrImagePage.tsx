import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/ocr-image/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";

export default function OcrImagePage() {
  usePageTitle("OCR — Image to Text");
  useMetaDescription("Extract text from an image or scanned document with free browser-based OCR — no upload, works offline after first use.");
  useTrackToolVisit("ocr-image");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    setText(null);
    setError(null);
    setProgress(0);
    try {
      const output = await run(f, {}, setProgress);
      setText(output);
    } catch {
      setError("Could not read text from this image.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setText(null);
    setError(null);
  }

  const blob = text !== null ? new Blob([text], { type: "text/plain" }) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">Image Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Extract Text from Image (OCR)</h1>
      <p className="text-sm text-text-dim mb-8">
        Reads printed text out of a photo or scan. First use downloads a small language model —
        after that it works instantly, even offline.
      </p>

      {!file && (
        <Dropzone accept="image/*" onFiles={handleFiles} label="Drop an image or tap to browse" hint="Works best on clear, printed text" />
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Reading text" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {text !== null && (
        <div className="mt-6 space-y-4">
          <textarea
            readOnly
            value={text || "(No text found in this image.)"}
            rows={8}
            className="w-full rounded-lg border border-line px-3 py-2.5 text-sm bg-surface font-mono"
          />
          {blob && file && (
            <DownloadCard blob={blob} filename={`${file.name.replace(/\.[^.]+$/, "")}.txt`} onReset={reset} />
          )}
        </div>
      )}
      <ToolInfoFooter toolId="ocr-image" />

    </div>
  );
}
