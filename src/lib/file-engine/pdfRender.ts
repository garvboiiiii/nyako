import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;


export async function renderPdfToImages(
  file: File,
  opts: {
    scale?: number;
    format?: "image/jpeg" | "image/png";
    quality?: number;
  } = {},
  onProgress?: (pct: number) => void
): Promise<Blob[]> {

  const {
    scale = 3,
    format = "image/png",
    quality = 1,
  } = opts;

  const bytes = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: bytes,
  }).promise;

  const blobs: Blob[] = [];

  const outputScale = window.devicePixelRatio || 1;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

    const page = await pdf.getPage(pageNum);

    const viewport = page.getViewport({
      scale: scale * outputScale,
    });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d", {
      alpha: false,
    })!;

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const blob: Blob = await new Promise((resolve, reject) => {

      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error("Canvas export failed"));
        },
        format,
        quality
      );

    });

    blobs.push(blob);

    onProgress?.(
      Math.round((pageNum / pdf.numPages) * 100)
    );

    canvas.width = 0;
    canvas.height = 0;
  }

  return blobs;
}

export async function getPdfPageCount(file: File): Promise<number> {

  const bytes = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: bytes,
  }).promise;

  return pdf.numPages;
}
