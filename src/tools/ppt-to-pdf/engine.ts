import JSZip from "jszip";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/**
 * A .pptx file is a ZIP of XML — this reads each slide's XML directly and
 * pulls out its text runs, then lays that text onto a matching PDF page.
 * It's a text-content conversion, not a visual replica: backgrounds,
 * images, and exact positioning from the original slide aren't
 * reproduced, only the words.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const zip = await JSZip.loadAsync(file);
  const slideFiles = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const na = parseInt(a.match(/slide(\d+)\.xml/)![1], 10);
      const nb = parseInt(b.match(/slide(\d+)\.xml/)![1], 10);
      return na - nb;
    });

  if (slideFiles.length === 0) throw new Error("No slides found in this file.");

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = 720; // 10in landscape @72dpi
  const pageHeight = 540; // 7.5in

  for (let i = 0; i < slideFiles.length; i++) {
    const xmlText = await zip.files[slideFiles[i]].async("text");
    const lines = extractTextLines(xmlText);

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawText(`Slide ${i + 1}`, {
      x: 40,
      y: pageHeight - 40,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    let cursorY = pageHeight - 80;
    lines.forEach((line, idx) => {
      const isTitle = idx === 0;
      const size = isTitle ? 22 : 14;
      const usedFont = isTitle ? boldFont : font;
      const wrapped = wrapText(line, usedFont, size, pageWidth - 80);
      for (const wLine of wrapped) {
        if (cursorY < 40) return;
        page.drawText(wLine, { x: 40, y: cursorY, size, font: usedFont, color: rgb(0.07, 0.08, 0.06) });
        cursorY -= size + 10;
      }
      cursorY -= 6;
    });

    onProgress?.(Math.round(((i + 1) / slideFiles.length) * 100));
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

function extractTextLines(xml: string): string[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const paragraphs = Array.from(doc.getElementsByTagName("a:p"));
  const lines: string[] = [];
  for (const p of paragraphs) {
    const runs = Array.from(p.getElementsByTagName("a:t"));
    const text = runs.map((r) => r.textContent ?? "").join("").trim();
    if (text) lines.push(text);
  }
  return lines;
}

function wrapText(text: string, font: { widthOfTextAtSize: (t: string, s: number) => number }, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}
