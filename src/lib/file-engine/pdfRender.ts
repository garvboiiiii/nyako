import * as pdfjsLib from "pdfjs-dist";
// Vite-friendly worker import — bundles the worker as its own asset so it
// loads from the same origin (no CDN dependency, works offline once cached).
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * Renders every page of a PDF to a canvas and returns JPEG/PNG blobs.
 * Runs entirely client-side — the PDF bytes never leave the browser.
 */
export async function renderPdfToImages(
  file: File,
  opts: { scale?: number; format?: "image/jpeg" | "image/png"; quality?: number } = {},
  onProgress?: (pct: number) => void
): Promise<Blob[]> {
  const { scale = 1.5, format = "image/jpeg", quality = 0.85 } = opts;
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const blobs: Blob[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas export failed"))), format, quality)
    );
    blobs.push(blob);
    onProgress?.(Math.round((pageNum / pdf.numPages) * 100));
  }

  return blobs;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  return pdf.numPages;
}
