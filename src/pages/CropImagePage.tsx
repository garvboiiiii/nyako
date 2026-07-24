import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import ImageCropSelector, { type FractionalRect } from "../components/ImageCropSelector";
import { run } from "../tools/crop-image/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";

const DEFAULT_RECT: FractionalRect = { x: 0.1, y: 0.1, width: 0.8, height: 0.8 };

export default function CropImagePage() {
  usePageTitle("Crop Image");
  useMetaDescription("Crop any photo with a simple drag-to-select tool. Free, private, works entirely in your browser.");
  useTrackToolVisit("crop-image");
  const [file, setFile] = useState<File | null>(null);
  const [rect, setRect] = useState<FractionalRect>(DEFAULT_RECT);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: File[]) {
    setFile(files[0]);
    setRect(DEFAULT_RECT);
    setResult(null);
    setError(null);
  }

  async function handleCrop() {
    if (!file) return;
    setProgress(0);
    setError(null);
    try {
      const img = await loadNaturalSize(file);
      const pixelRect = {
        x: rect.x * img.width,
        y: rect.y * img.height,
        width: rect.width * img.width,
        height: rect.height * img.height,
      };
      const output = await run(file, pixelRect, setProgress);
      setResult(output);
    } catch {
      setError("Could not crop this image.");
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
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Crop Image</h1>
      <p className="text-sm text-text-dim mb-8">Drag the box to reposition, drag the corner handle to resize.</p>

      {!file && (
        <Dropzone accept="image/*" onFiles={handleFiles} label="Drop an image or tap to browse" hint="" />
      )}

      {file && !result && (
        <div className="space-y-5">
          <ImageCropSelector file={file} rect={rect} onChange={setRect} />
          {progress === null && (
            <button
              onClick={handleCrop}
              className="font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Crop
            </button>
          )}
        </div>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Cropping" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && file && (
        <div className="mt-6">
          <DownloadCard toolId="crop-image" blob={result} filename={`cropped-${file.name}`} originalSize={file.size} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="crop-image" />

    </div>
  );
}

function loadNaturalSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
