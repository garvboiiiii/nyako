import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Document, Packer, Paragraph, PageBreak } from "docx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * Extracts text content from every page and lays it out as paragraphs in a
 * .docx file. This is a text-content conversion, not a visual/layout
 * conversion — tables, columns, and images from the original PDF are not
 * reproduced, but the words are fully editable in Word afterward.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const paragraphs: Paragraph[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    // Group text items into lines by their y-position.
    const lines = new Map<number, string[]>();
    for (const item of content.items) {
      if (!("str" in item)) continue;
      const y = Math.round((item.transform?.[5] ?? 0) / 3) * 3; // bucket nearby y's together
      if (!lines.has(y)) lines.set(y, []);
      lines.get(y)!.push(item.str);
    }
    const sortedY = [...lines.keys()].sort((a, b) => b - a);
    for (const y of sortedY) {
      const text = lines.get(y)!.join(" ").trim();
      if (text) paragraphs.push(new Paragraph(text));
    }

    if (pageNum < pdf.numPages) {
      paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
    }
    onProgress?.(Math.round((pageNum / pdf.numPages) * 90));
  }

  const doc = new Document({
    sections: [{ children: paragraphs.length ? paragraphs : [new Paragraph("(No extractable text found on this PDF.)")] }],
  });

  const blob = await Packer.toBlob(doc);
  onProgress?.(100);
  return blob;
}
