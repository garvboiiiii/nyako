import mammoth from "mammoth";
import JSZip from "jszip";
import { htmlToPdf } from "../../lib/file-engine/htmlToPdf";

/**
 * Converts a .docx to PDF by extracting its content as HTML (mammoth.js
 * handles headings, bold/italic, lists well) and "printing" that to PDF
 * pages. mammoth deliberately drops *direct* paragraph formatting like
 * manually clicking "center align" (it only preserves named Word styles,
 * by design, to produce clean semantic HTML) — which is the #1 cause of
 * "alignment isn't followed". To recover it, we separately read each
 * paragraph's actual <w:jc> (justification) value straight from the
 * document's raw XML and re-apply it to the matching paragraph in
 * mammoth's output afterward.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  onProgress?.(10);

  const [{ value: html }, alignments] = await Promise.all([
    mammoth.convertToHtml({ arrayBuffer: bytes.slice(0) }),
    extractParagraphAlignments(bytes.slice(0)),
  ]);
  onProgress?.(20);

  const htmlWithAlignment = applyAlignments(html, alignments);
  onProgress?.(25);

  return htmlToPdf(htmlWithAlignment, (pct) => onProgress?.(25 + Math.round(pct * 0.75)));
}

type Alignment = "left" | "center" | "right" | "justify" | null;

/** Reads word/document.xml directly and pulls each paragraph's <w:jc> value, in order. */
async function extractParagraphAlignments(bytes: ArrayBuffer): Promise<Alignment[]> {
  try {
    const zip = await JSZip.loadAsync(bytes);
    const xml = await zip.files["word/document.xml"]?.async("text");
    if (!xml) return [];

    const doc = new DOMParser().parseFromString(xml, "application/xml");
    const paragraphs = Array.from(doc.getElementsByTagName("w:p"));

    return paragraphs.map((p) => {
      const jc = p.getElementsByTagName("w:jc")[0];
      const val = jc?.getAttribute("w:val");
      if (val === "center") return "center";
      if (val === "right" || val === "end") return "right";
      if (val === "both" || val === "distribute") return "justify";
      return null; // left is the default — no need to force it
    });
  } catch {
    return []; // if anything about this goes wrong, fall back to mammoth's plain output
  }
}

/**
 * Applies alignment values to mammoth's output by matching paragraphs in
 * document order. Mammoth emits roughly one block element (p/h1-h6/li)
 * per source paragraph in the same order they appeared, so a positional
 * match is reliable for the common case. If the counts are wildly
 * different (mammoth merged/split something unexpectedly), we skip
 * alignment injection entirely rather than risk misapplying it.
 */
function applyAlignments(html: string, alignments: Alignment[]): string {
  if (alignments.length === 0) return html;

  const container = document.createElement("div");
  container.innerHTML = html;
  const blocks = Array.from(container.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li"));

  if (blocks.length === 0 || Math.abs(blocks.length - alignments.length) > blocks.length * 0.5) {
    return html; // too different to trust a positional match
  }

  blocks.forEach((el, i) => {
    const align = alignments[i];
    if (align) (el as HTMLElement).style.textAlign = align;
  });

  return container.innerHTML;
}
