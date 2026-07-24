import { PDFDocument } from "pdf-lib";

/**
 * Merges an ordered list of PDF files into a single PDF, entirely
 * client-side. Files never touch a server.
 */
export async function run(
  files: File[],
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const merged = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const bytes = await files[i].arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
    onProgress?.(Math.round(((i + 1) / files.length) * 100));
  }

  const mergedBytes = await merged.save();
  return new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}
