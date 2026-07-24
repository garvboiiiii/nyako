import { PDFDocument } from "pdf-lib";
import { parsePageRange } from "../../lib/file-engine/pageRange";

export interface DeletePagesOptions {
  /** Pages to remove, e.g. "2,4-6" */
  pages: string;
}

export async function run(
  file: File,
  options: DeletePagesOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const totalPages = doc.getPageCount();
  const toRemove = new Set(parsePageRange(options.pages, totalPages));

  // Remove from the end so earlier indices stay valid as we go.
  const sortedDesc = [...toRemove].sort((a, b) => b - a);
  sortedDesc.forEach((idx, n) => {
    doc.removePage(idx);
    onProgress?.(Math.round(((n + 1) / sortedDesc.length) * 100));
  });

  const outBytes = await doc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}
