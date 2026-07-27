import JSZip from "jszip";
import { renderPdfToImages } from "../../lib/file-engine/pdfRender";

export interface PdfToImagesOptions {
  format: "image/jpeg" | "image/png";
}

export const defaultOptions: PdfToImagesOptions = { format: "image/png" };

/**
 * Renders every page of a PDF to an image and returns a ZIP of the results
 * (or a single image directly if the PDF has only one page).
 */
export async function run(
  file: File,
  options: PdfToImagesOptions = defaultOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const images = await renderPdfToImages(file, { format: options.format }, onProgress);

  if (images.length === 1) return images[0];

  const zip = new JSZip();
  const ext = options.format === "image/png" ? "png" : "jpg";
  images.forEach((blob, i) => {
    zip.file(`page-${String(i + 1).padStart(2, "0")}.${ext}`, blob);
  });
  return zip.generateAsync({ type: "blob" });
}
