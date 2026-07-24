export interface PassportPhotoOptions {
  crop: { x: number; y: number; width: number; height: number };
  outputWidthPx: number;
  outputHeightPx: number;
}

// Common passport/ID photo presets, in pixels at ~300 DPI.
export const PASSPORT_PRESETS = [
  { id: "us-2x2", label: "USA — 2×2 in", widthPx: 600, heightPx: 600 },
  { id: "in-35x45", label: "India — 35×45 mm", widthPx: 413, heightPx: 531 },
  { id: "uk-35x45", label: "UK — 35×45 mm", widthPx: 413, heightPx: 531 },
  { id: "schengen-35x45", label: "Schengen — 35×45 mm", widthPx: 413, heightPx: 531 },
];

export async function run(
  file: File,
  options: PassportPhotoOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  onProgress?.(10);
  const img = await loadImage(file);

  const canvas = document.createElement("canvas");
  canvas.width = options.outputWidthPx;
  canvas.height = options.outputHeightPx;
  const ctx = canvas.getContext("2d")!;

  // Flatten onto white first — covers transparent PNGs and keeps ID-photo
  // backgrounds consistent.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const { crop } = options;
  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    options.outputWidthPx,
    options.outputHeightPx
  );
  onProgress?.(85);

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => {
        onProgress?.(100);
        return b ? resolve(b) : reject(new Error("export failed"));
      },
      "image/jpeg",
      0.95
    )
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
