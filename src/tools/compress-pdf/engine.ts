import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export interface CompressPdfOptions {
  targetSizeMB: number;
}

export interface CompressPdfResult {
  blob: Blob;
  targetMet: boolean;
  targetSizeBytes: number;
}

export const defaultOptions: CompressPdfOptions = { targetSizeMB: 1 };

/**
 * Client-side PDF compression works by re-rasterizing each page and
 * re-encoding it as JPEG, then reassembling a new PDF. Pages are rendered
 * once at a decent base resolution and cached; if the result doesn't hit
 * the target, quality (and then scale) is stepped down and the *same*
 * cached canvases are re-encoded — no need to re-invoke pdf.js rendering
 * on every retry, so this stays fast even with several attempts. If the
 * target genuinely can't be reached without the output becoming illegible,
 * the result says so honestly instead of silently returning something
 * bigger than asked for.
 */
export async function run(
  file: File,
  options: CompressPdfOptions = defaultOptions,
  onProgress?: (pct: number) => void
): Promise<CompressPdfResult> {
  const originalBytes = await file.arrayBuffer();
  const targetBytes = options.targetSizeMB * 1024 * 1024;

  // First try a lossless pass — sometimes enough on its own, and never
  // degrades quality unnecessarily.
  const losslessDoc = await PDFDocument.load(originalBytes);
  const losslessBytes = await losslessDoc.save({ useObjectStreams: true });
  if (losslessBytes.length <= targetBytes) {
    onProgress?.(100);
    return {
      blob: new Blob([losslessBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
      targetMet: true,
      targetSizeBytes: targetBytes,
    };
  }

  const pdf = await pdfjsLib.getDocument({ data: originalBytes.slice(0) }).promise;
  const numPages = pdf.numPages;

  // Render every page once at a generous base scale — later attempts
  // downscale from this cached canvas instead of re-rendering with pdf.js.
  const baseScale = 1.5;
  const baseCanvases: HTMLCanvasElement[] = [];
  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: baseScale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;
    baseCanvases.push(canvas);
    onProgress?.(Math.round(((pageNum / numPages) * 40)));
  }

  const attempts: { quality: number; scaleFactor: number }[] = [
    { quality: 0.75, scaleFactor: 1.0 },
    { quality: 0.55, scaleFactor: 1.0 },
    { quality: 0.4, scaleFactor: 0.85 },
    { quality: 0.3, scaleFactor: 0.7 },
    { quality: 0.25, scaleFactor: 0.55 },
    { quality: 0.2, scaleFactor: 0.4 },
  ];

  let bestBlob: Blob | null = null;

  for (let i = 0; i < attempts.length; i++) {
    const { quality, scaleFactor } = attempts[i];
    const out = await PDFDocument.create();

    for (let p = 0; p < baseCanvases.length; p++) {
      const src = baseCanvases[p];
      const w = Math.max(1, Math.round(src.width * scaleFactor));
      const h = Math.max(1, Math.round(src.height * scaleFactor));

      let sourceForExport = src;
      if (scaleFactor !== 1.0) {
        const scaled = document.createElement("canvas");
        scaled.width = w;
        scaled.height = h;
        scaled.getContext("2d")!.drawImage(src, 0, 0, w, h);
        sourceForExport = scaled;
      }

      const jpegBlob: Blob = await new Promise((resolve, reject) =>
        sourceForExport.toBlob((b) => (b ? resolve(b) : reject(new Error("render failed"))), "image/jpeg", quality)
      );
      const jpegBytes = await jpegBlob.arrayBuffer();
      const image = await out.embedJpg(jpegBytes);
      const pdfPage = out.addPage([w, h]);
      pdfPage.drawImage(image, { x: 0, y: 0, width: w, height: h });

      onProgress?.(40 + Math.round((((i + (p + 1) / baseCanvases.length) / attempts.length) * 60)));
    }

    const finalBytes = await out.save();
    const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: "application/pdf" });

    if (!bestBlob || blob.size < bestBlob.size) bestBlob = blob;
    if (blob.size <= targetBytes) {
      onProgress?.(100);
      return { blob, targetMet: true, targetSizeBytes: targetBytes };
    }
  }

  onProgress?.(100);
  return { blob: bestBlob!, targetMet: false, targetSizeBytes: targetBytes };
}
