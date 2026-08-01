import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run } from "../tools/resize-image/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import { useDroppedFile } from "../lib/useDroppedFile";

export default function ResizeImagePage() {
  usePageTitle("Resize Image");
  useMetaDescription("Resize any image to exact pixel dimensions, with or without locked aspect ratio. Free, private, instant.");
  useTrackToolVisit("resize-image");
  useCanonicalUrl("/tools/resize-image");
  useDroppedFile((file) => handleFiles([file]));
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    setResult(null);
    setError(null);
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = URL.createObjectURL(f);
  }

  async function handleResize() {
    if (!file) return;
    setProgress(0);
    setError(null);
    try {
      const output = await run(file, { width, height, maintainAspect }, setProgress);
      setResult(output);
    } catch {
      setError("Could not resize this image.");
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
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">Image Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Resize Image</h1>
      <p className="text-sm text-text-dim mb-8">Set exact dimensions in pixels.</p>

      {!file && (
        <Dropzone accept="image/*" onFiles={handleFiles} label="Drop an image or tap to browse" hint="" />
      )}

      {file && !result && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">Width (px)</span>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus-ring bg-surface"
              />
            </label>
            <label className="text-sm">
              <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">Height (px)</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus-ring bg-surface"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-text-dim">
            <input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="accent-primary" />
            Maintain aspect ratio
          </label>
          {progress === null && (
            <button
              onClick={handleResize}
              className="font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Resize
            </button>
          )}
        </div>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Resizing" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="resize-image" blob={result} filename={`resized-${file.name}`} originalSize={file.size} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="resize-image" />

    </div>
  );
}
