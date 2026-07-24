import imageCompression from "browser-image-compression";

export interface CompressImageOptions {
  targetSizeMB: number;
  maxWidthOrHeight?: number;
}

export interface CompressImageResult {
  blob: Blob;
  /** true if the output is at or under the requested target size */
  targetMet: boolean;
  targetSizeBytes: number;
}

export const defaultOptions: CompressImageOptions = {
  targetSizeMB: 0.2,
};

/**
 * Compresses toward a target size. browser-image-compression's own quality
 * search alone often can't hit small targets (e.g. 40KB) if the image
 * stays at a large resolution — quality has a practical floor before
 * artifacts make it pointless. So on top of its quality search, this also
 * progressively downscales dimensions and retries, and is honest in the
 * result about whether the target was actually reached.
 */
export async function run(
  file: File,
  options: CompressImageOptions = defaultOptions,
  onProgress?: (pct: number) => void
): Promise<CompressImageResult> {
  const targetBytes = options.targetSizeMB * 1024 * 1024;

  const initialDim = await estimateStartingDimension(file, options.maxWidthOrHeight, targetBytes);
  let maxWidthOrHeight = initialDim;
  let best: Blob | null = null;
  const maxAttempts = 7;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await imageCompression(file, {
      maxSizeMB: options.targetSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      initialQuality: 0.85,
      maxIteration: 12,
      onProgress: (p: number) => onProgress?.(Math.round(((attempt + p / 100) / maxAttempts) * 100)),
    });

    if (!best || result.size < best.size) best = result;
    if (result.size <= targetBytes) {
      onProgress?.(100);
      return { blob: result, targetMet: true, targetSizeBytes: targetBytes };
    }

    // Still too big — shrink dimensions further and try again.
    maxWidthOrHeight = Math.round(maxWidthOrHeight * 0.7);
    if (maxWidthOrHeight < 48) break; // below this, output is unusably tiny
  }

  onProgress?.(100);
  return { blob: best!, targetMet: false, targetSizeBytes: targetBytes };
}

/** Picks a sane starting resolution based on how aggressive the target is. */
async function estimateStartingDimension(
  file: File,
  explicitMax: number | undefined,
  targetBytes: number
): Promise<number> {
  if (explicitMax) return explicitMax;

  const dims = await getImageDimensions(file);
  const longSide = Math.max(dims.width, dims.height);

  if (targetBytes < 60_000) return Math.min(longSide, 700);
  if (targetBytes < 150_000) return Math.min(longSide, 1100);
  if (targetBytes < 400_000) return Math.min(longSide, 1600);
  return Math.min(longSide, 2400);
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
