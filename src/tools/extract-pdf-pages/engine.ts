import { PDFDocument } from "pdf-lib";
import { parsePageRange } from "../../lib/file-engine/pageRange";

export interface ExtractPagesOptions {
  /** Pages to keep, e.g. "1,3,5-7" */
  pages: string;
}

export async function run(
  file: File,
  options: ExtractPagesOptions,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes);
  const totalPages = source.getPageCount();
  const indices = parsePageRange(options.pages, totalPages);

  const out = await PDFDocument.create();
  const copied = await out.copyPages(source, indices);
  copied.forEach((page, i) => {
    out.addPage(page);
    onProgress?.(Math.round(((i + 1) / copied.length) * 100));
  });

  const outBytes = await out.save();
  return new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}
