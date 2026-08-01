import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import { run, defaultOptions } from "../tools/transparent-image/engine";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useTrackToolVisit } from "../lib/useTrackToolVisit";
import ErrorState from "../components/ErrorState";
import ToolInfoFooter from "../components/ToolInfoFooter";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import { useDroppedFile } from "../lib/useDroppedFile";

export default function TransparentImagePage() {
  usePageTitle("Transparent Signature");
  useMetaDescription("Turn a scanned signature or stamp into a transparent PNG. Adjust color, softness, and opacity — free and private.");
  useTrackToolVisit("transparent-image");
  useCanonicalUrl("tools/transparent-image");
  useDroppedFile((file) => handleFiles([file]));
  const [file, setFile] = useState<File | null>(null);
  const [keyColor, setKeyColor] = useState(defaultOptions.keyColor);
  const [tolerance, setTolerance] = useState(defaultOptions.tolerance);
  const [feather, setFeather] = useState(defaultOptions.feather);
  const [outputOpacity, setOutputOpacity] = useState(defaultOptions.outputOpacity);
  const [recolorEnabled, setRecolorEnabled] = useState(false);
  const [recolor, setRecolor] = useState("#1d4ed8");
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function process(currentFile: File) {
    setProgress(0);
    setError(null);
    try {
      const output = await run(
        currentFile,
        { keyColor, tolerance, feather, outputOpacity, recolor: recolorEnabled ? recolor : null },
        setProgress
      );
      setResult(output);
    } catch {
      setError("Could not process this image. Try a JPG or PNG.");
    } finally {
      setProgress(null);
    }
  }

  function handleFiles(files: File[]) {
    const f = files[0];
    setFile(f);
    setResult(null);
    process(f);
  }

  function rerun() {
    if (file) process(file);
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">Image Tools</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Transparent Signature</h1>
      <p className="text-sm text-text-dim mb-8">
        Removes a solid background color — perfect for signatures, stamps, or logos on white paper.
        Fine-tune the edge softness, opacity, or even the ink color below.
      </p>

      {!file && (
        <Dropzone
          accept="image/*"
          onFiles={handleFiles}
          label="Drop an image or tap to browse"
          hint="Works best on a flat, solid background"
        />
      )}

      {file && (
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-[repeating-conic-gradient(#e4e4de_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4 flex justify-center">
            {result ? (
              <img src={URL.createObjectURL(result)} alt="Preview with transparent background" className="max-h-64 object-contain" />
            ) : (
              <img src={URL.createObjectURL(file)} alt="Original upload" className="max-h-64 object-contain opacity-60" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <label className="text-sm">
              <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">
                Background color to remove
              </span>
              <input
                type="color"
                value={keyColor}
                onChange={(e) => {
                  setKeyColor(e.target.value);
                  setTimeout(rerun, 0);
                }}
                className="w-full h-11 rounded-md border border-line cursor-pointer focus-ring"
                aria-label="Background color to remove"
              />
            </label>
            <label className="text-sm">
              <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">
                Tolerance ({tolerance})
              </span>
              <input
                type="range"
                min={5}
                max={80}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                onMouseUp={rerun}
                onTouchEnd={rerun}
                className="w-full accent-primary focus-ring"
                aria-label="Tolerance"
              />
            </label>
            <label className="text-sm">
              <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">
                Edge softness ({feather})
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={feather}
                onChange={(e) => setFeather(Number(e.target.value))}
                onMouseUp={rerun}
                onTouchEnd={rerun}
                className="w-full accent-primary focus-ring"
                aria-label="Edge softness"
              />
            </label>
            <label className="text-sm">
              <span className="block font-display text-xs uppercase tracking-wide text-text-dim mb-2">
                Opacity ({outputOpacity}%)
              </span>
              <input
                type="range"
                min={10}
                max={100}
                value={outputOpacity}
                onChange={(e) => setOutputOpacity(Number(e.target.value))}
                onMouseUp={rerun}
                onTouchEnd={rerun}
                className="w-full accent-primary focus-ring"
                aria-label="Output opacity"
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-text-dim">
              <input
                type="checkbox"
                checked={recolorEnabled}
                onChange={(e) => {
                  setRecolorEnabled(e.target.checked);
                  setTimeout(rerun, 0);
                }}
                className="accent-primary"
              />
              Recolor the signature ink
            </label>
            {recolorEnabled && (
              <input
                type="color"
                value={recolor}
                onChange={(e) => {
                  setRecolor(e.target.value);
                  setTimeout(rerun, 0);
                }}
                className="w-10 h-8 rounded-md border border-line cursor-pointer focus-ring"
                aria-label="Ink color"
              />
            )}
          </div>

          {progress !== null && <ProgressBar pct={progress} label="Processing" />}
          {error && <ErrorState message={error} />}

          {result && !progress && (
            <DownloadCard
              toolId="transparent-image"
              blob={result}
              filename={`transparent-${file.name.replace(/\.[^.]+$/, "")}.png`}
              onReset={reset}
            />
          )}
        </div>
      )}
      <ToolInfoFooter toolId="transparent-image" />

    </div>
  );
}
