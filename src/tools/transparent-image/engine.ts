export interface TransparentImageOptions {
  /** Hex color to key out, e.g. "#ffffff" for white */
  keyColor: string;
  /** 0-100, how close a pixel's color must be to keyColor to become transparent */
  tolerance: number;
  /** 0-100, width of the soft edge between kept and removed pixels — higher = smoother, softer cutout */
  feather: number;
  /** 0-100, final opacity applied to every kept (foreground) pixel — e.g. a watermark-style signature */
  outputOpacity: number;
  /** Optional hex color to recolor the kept foreground (e.g. turn a black signature into blue ink) */
  recolor?: string | null;
}

export const defaultOptions: TransparentImageOptions = {
  keyColor: "#ffffff",
  tolerance: 25,
  feather: 40,
  outputOpacity: 100,
  recolor: null,
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Removes a solid background color and makes it transparent, entirely
 * client-side via Canvas pixel manipulation. Best for scanned signatures,
 * documents, or product shots on a flat white/solid background.
 */
export async function run(
  file: File,
  options: TransparentImageOptions = defaultOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const [kr, kg, kb] = hexToRgb(options.keyColor);
  const thresholdSq = Math.pow((options.tolerance / 100) * 441.67, 2); // 441.67 = max RGB distance
  // feather 0-100 maps to a soft-edge band multiplier between ~1.05x (crisp) and ~3x (very soft)
  const featherMult = 1.05 + (options.feather / 100) * 1.95;
  const opacityMult = Math.max(0, Math.min(100, options.outputOpacity)) / 100;
  const recolorRgb = options.recolor ? hexToRgb(options.recolor) : null;

  const totalPixels = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const distSq = (r - kr) ** 2 + (g - kg) ** 2 + (b - kb) ** 2;

    let alpha = 255;
    if (distSq <= thresholdSq) {
      alpha = 0;
    } else if (distSq <= thresholdSq * featherMult) {
      const fade = (distSq - thresholdSq) / (thresholdSq * (featherMult - 1));
      alpha = Math.round(255 * Math.min(1, Math.max(0, fade)));
    }

    if (alpha > 0) {
      alpha = Math.round(alpha * opacityMult);
      if (recolorRgb) {
        data[i] = recolorRgb[0];
        data[i + 1] = recolorRgb[1];
        data[i + 2] = recolorRgb[2];
      }
    }
    data[i + 3] = alpha;

    if (onProgress && i % 40000 === 0) {
      onProgress(Math.round((i / 4 / totalPixels) * 100));
    }
  }

  ctx.putImageData(imageData, 0, 0);
  onProgress?.(100);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("export failed"))), "image/png")
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
