export type ImageFormat = "image/png" | "image/jpeg" | "image/webp";

export interface ConvertImageFormatOptions {
  targetFormat: ImageFormat;
  quality?: number; // 0-1, ignored for PNG
}

export const FORMAT_LABELS: Record<ImageFormat, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
};

export const FORMAT_EXTENSIONS: Record<ImageFormat, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

/**
 * Converts an image to any target format via Canvas. JPEG has no alpha
 * channel, so converting a transparent PNG to JPG flattens onto white.
 */
export async function run(
  file: File,
  options: ConvertImageFormatOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  onProgress?.(10);
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;

  if (options.targetFormat === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  onProgress?.(70);

  const quality = options.targetFormat === "image/png" ? undefined : (options.quality ?? 0.92);

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => {
        onProgress?.(100);
        return b ? resolve(b) : reject(new Error("This browser can't export that format."));
      },
      options.targetFormat,
      quality
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
