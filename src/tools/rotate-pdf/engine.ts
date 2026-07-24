import { PDFDocument, degrees } from "pdf-lib";
import { parsePageRange } from "../../lib/file-engine/pageRange";

export interface RotatePdfOptions {
  /** Which pages to rotate, e.g. "1,3,5-7", or "all" */
  pages: string;
  /** Rotation angle in degrees, clockwise */
  angle: 90 | 180 | 270;
}

export const defaultOptions: RotatePdfOptions = { pages: "all", angle: 90 };

export async function run(
  file: File,
  options: RotatePdfOptions = defaultOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const pages = doc.getPages();

  const targetIndices =
    options.pages.trim().toLowerCase() === "all"
      ? pages.map((_, i) => i)
      : parsePageRange(options.pages, pages.length);

  targetIndices.forEach((idx, n) => {
    const page = pages[idx];
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + options.angle) % 360));
    onProgress?.(Math.round(((n + 1) / targetIndices.length) * 100));
  });

  const outBytes = await doc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}
