import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Document, Packer, Paragraph, PageBreak, AlignmentType, type AlignmentType as AlignmentTypeT } from "docx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface LineItem {
  text: string;
  minX: number;
  maxX: number;
}

/**
 * Extracts text content from every page and lays it out as paragraphs in a
 * .docx file. This is a text-content conversion, not a visual/layout
 * conversion — tables, columns, and images from the original PDF are not
 * reproduced — but unlike a naive extraction, each line's horizontal
 * position on the page is used to infer whether it was left, center, or
 * right aligned in the source PDF, and that alignment is carried over.
 * PDF text has no explicit "alignment" property the way a Word paragraph
 * does — it's just absolutely positioned — so this is inference from
 * position, which is the standard approach any PDF-to-Word tool has to
 * take.
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
    const pageWidth = page.getViewport({ scale: 1 }).width;

    // Group text items into lines by their y-position, tracking each
    // line's horizontal extent (leftmost start, rightmost end) so we can
    // infer its alignment relative to the page afterward.
    const lines = new Map<number, LineItem[]>();
    for (const item of content.items) {
      if (!("str" in item)) continue;
      const y = Math.round((item.transform?.[5] ?? 0) / 3) * 3; // bucket nearby y's together
      const x = item.transform?.[4] ?? 0;
      const width = "width" in item ? (item.width as number) : 0;
      if (!lines.has(y)) lines.set(y, []);
      lines.get(y)!.push({ text: item.str, minX: x, maxX: x + width });
    }

    const sortedY = [...lines.keys()].sort((a, b) => b - a);
    for (const y of sortedY) {
      const items = lines.get(y)!;
      const text = items.map((i) => i.text).join(" ").trim();
      if (!text) continue;

      const lineMinX = Math.min(...items.map((i) => i.minX));
      const lineMaxX = Math.max(...items.map((i) => i.maxX));
      const alignment = detectAlignment(lineMinX, lineMaxX, pageWidth);

      paragraphs.push(new Paragraph({ text, alignment }));
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

/**
 * Compares the empty space on the left and right of a line of text to the
 * page width to infer left/center/right alignment. Full-width lines
 * (ordinary wrapped body text reaching close to both margins) are always
 * treated as left, since second-guessing those tends to misfire.
 */
function detectAlignment(lineMinX: number, lineMaxX: number, pageWidth: number): (typeof AlignmentTypeT)[keyof typeof AlignmentTypeT] {
  const leftGap = lineMinX;
  const rightGap = pageWidth - lineMaxX;
  const lineWidth = lineMaxX - lineMinX;

  if (lineWidth > pageWidth * 0.75) return AlignmentType.LEFT;

  const gapDiff = Math.abs(leftGap - rightGap);
  const avgGap = (leftGap + rightGap) / 2;

  // Roughly equal empty space on both sides → centered.
  if (avgGap > 20 && gapDiff < avgGap * 0.25) {
    return AlignmentType.CENTER;
  }
  // Barely any space on the right, but real space on the left → right-aligned.
  if (rightGap < leftGap * 0.3 && leftGap > pageWidth * 0.15) {
    return AlignmentType.RIGHT;
  }
  return AlignmentType.LEFT;
}
