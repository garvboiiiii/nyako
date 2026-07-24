import mammoth from "mammoth";
import { htmlToPdf } from "../../lib/file-engine/htmlToPdf";

/**
 * Converts a .docx to PDF by first extracting its content as HTML
 * (headings, paragraphs, bold/italic, lists — mammoth.js handles the
 * common cases well) and then "printing" that HTML to PDF pages. Complex
 * layouts (multi-column, precise page breaks, embedded objects) won't be
 * pixel-identical to Word's own renderer, but everyday documents come
 * through cleanly.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  onProgress?.(10);
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer: bytes });
  onProgress?.(25);
  return htmlToPdf(html, (pct) => onProgress?.(25 + Math.round(pct * 0.75)));
}
