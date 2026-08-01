import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import ImageCropSelector, { type FractionalRect } from "../components/ImageCropSelector";
import { run, PASSPORT_PRESETS } from "../tools/passport-photo/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import { useDroppedFile } from "../lib/useDroppedFile";

export default function PassportPhotoPage() {
  usePageTitle("Passport Photo Maker");
  useMetaDescription("Make a passport, visa, or ID photo in the correct size for your country — free, private, no studio needed.");
  useTrackToolVisit("passport-photo");
  useCanonicalUrl("/tools/passport-photo");
  useDroppedFile((file) => handleFiles([file]));


  const [file, setFile] = useState<File | null>(null);
  const [presetId, setPresetId] = useState(PASSPORT_PRESETS[0].id);
  const preset = PASSPORT_PRESETS.find((p) => p.id === presetId)!;
  const aspect = preset.widthPx / preset.heightPx;
  const [rect, setRect] = useState<FractionalRect>({ x: 0.15, y: 0.1, width: 0.7, height: 0.7 / aspect });
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: File[]) {
    setFile(files[0]);
    setResult(null);
    setError(null);
  }

  function handlePresetChange(id: string) {
    setPresetId(id);
    const p = PASSPORT_PRESETS.find((x) => x.id === id)!;
    const a = p.widthPx / p.heightPx;
    setRect((r) => ({ ...r, height: r.width / a }));
  }

  async function handleGenerate() {
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
      const output = await run(
        file,
        { crop: pixelRect, outputWidthPx: preset.widthPx, outputHeightPx: preset.heightPx },
        setProgress
      );
      setResult(output);
    } catch {
      setError("Could not generate the photo.");
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
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Passport Photo Maker</h1>
      <p className="text-sm text-text-dim mb-8">
        Crop to the standard size for your country and flatten onto a white background.
      </p>

      {!file && (
        <Dropzone accept="image/*" onFiles={handleFiles} label="Drop a photo or tap to browse" hint="Face forward, plain background works best" />
      )}

      {file && !result && (
        <div className="space-y-5">
          <label className="block text-sm">
            <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">Size</span>
            <select
              value={presetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus-ring bg-surface"
            >
              {PASSPORT_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <ImageCropSelector file={file} rect={rect} onChange={setRect} lockAspect={aspect} />

          {progress === null && (
            <button
              onClick={handleGenerate}
              className="font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Generate photo
            </button>
          )}
        </div>
      )}

      {progress !== null && (
        <div className="mt-6">
          <ProgressBar pct={progress} label="Generating" />
        </div>
      )}

      {error && <ErrorState message={error} />}

      {result && (
        <div className="mt-6">
          <DownloadCard toolId="passport-photo" blob={result} filename={`passport-photo-${preset.id}.jpg`} onReset={reset} />
        </div>
      )}
      <ToolInfoFooter toolId="passport-photo" />

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
