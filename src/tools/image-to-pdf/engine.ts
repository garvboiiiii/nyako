import { PDFDocument } from "pdf-lib";

/**
 * Combines an unlimited number of images into a single PDF, one image per
 * page sized to fit. Entirely client-side via pdf-lib.
 */
export async function run(
  files: File[],
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const bytes = await file.arrayBuffer();
    const isPng = file.type === "image/png";
    const image = isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(await ensureJpeg(file, bytes));

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    onProgress?.(Math.round(((i + 1) / files.length) * 100));
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

// pdf-lib only embeds true PNG or JPEG bytes. For other formats (webp, etc.)
// we redraw through a canvas and re-export as JPEG first.
async function ensureJpeg(file: File, originalBytes: ArrayBuffer): Promise<ArrayBuffer> {
  if (file.type === "image/jpeg" || file.type === "image/jpg") return originalBytes;

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = URL.createObjectURL(file);
  });
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("convert failed"))), "image/jpeg", 0.92)
  );
  return blob.arrayBuffer();
}
