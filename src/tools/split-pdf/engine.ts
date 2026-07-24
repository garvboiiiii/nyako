import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

/**
 * Splits a PDF into one PDF file per page, packaged as a ZIP.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes);
  const pageCount = source.getPageCount();
  const zip = new JSZip();

  for (let i = 0; i < pageCount; i++) {
    const doc = await PDFDocument.create();
    const [page] = await doc.copyPages(source, [i]);
    doc.addPage(page);
    const pageBytes = await doc.save();
    zip.file(`page-${String(i + 1).padStart(2, "0")}.pdf`, pageBytes);
    onProgress?.(Math.round(((i + 1) / pageCount) * 100));
  }

  return zip.generateAsync({ type: "blob" });
}
