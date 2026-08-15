import JSZip from "jszip";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// PowerPoint measures positions in EMUs (English Metric Units).
// 914400 EMU = 1 inch = 72 points, so points-per-EMU is a fixed constant —
// the PDF page is sized to exactly match the slide's own EMU dimensions,
// which means every shape position converts 1:1 with no extra scaling.
const EMU_PER_INCH = 914400;
const PT_PER_IN = 72;
const POINTS_PER_EMU = PT_PER_IN / EMU_PER_INCH;
const DEFAULT_SLIDE_WIDTH_EMU = 9144000; // 10in, PowerPoint's classic 4:3 default
const DEFAULT_SLIDE_HEIGHT_EMU = 6858000; // 7.5in

interface TextBox {
  x: number; // pt, from left
  y: number; // pt, from top
  width: number; // pt
  height: number; // pt
  lines: string[];
  isTitle: boolean;
}

/**
 * A .pptx file is a ZIP of XML — this reads each slide's shape positions
 * (<a:off>/<a:ext>) and text runs directly from the XML, then places each
 * text box on the PDF page at the same relative position it had on the
 * slide. It's still a text-content conversion (no backgrounds, images, or
 * exact fonts), but the layout now actually follows the original slide
 * instead of just stacking every line top to bottom.
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

  // The actual slide canvas size lives in ppt/presentation.xml. The PDF
  // page is sized to match it exactly (in points), so shape positions
  // need no separate scale factor — just a straight EMU-to-point convert.
  let slideWidthEmu = DEFAULT_SLIDE_WIDTH_EMU;
  let slideHeightEmu = DEFAULT_SLIDE_HEIGHT_EMU;
  const presentationXml = await zip.files["ppt/presentation.xml"]?.async("text");
  if (presentationXml) {
    const sizeMatch = presentationXml.match(/<p:sldSz\s+cx="(\d+)"\s+cy="(\d+)"/);
    if (sizeMatch) {
      slideWidthEmu = parseInt(sizeMatch[1], 10);
      slideHeightEmu = parseInt(sizeMatch[2], 10);
    }
  }
  const pageWidth = slideWidthEmu * POINTS_PER_EMU;
  const pageHeight = slideHeightEmu * POINTS_PER_EMU;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (let i = 0; i < slideFiles.length; i++) {
    const xmlText = await zip.files[slideFiles[i]].async("text");
    const boxes = extractTextBoxes(xmlText);

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawText(`${i + 1}`, {
      x: pageWidth - 24,
      y: 10,
      size: 8,
      font,
      color: rgb(0.6, 0.6, 0.6),
    });

    for (const box of boxes) {
      const isTitle = box.isTitle;
      const baseSize = isTitle ? 20 : 12;
      const usedFont = isTitle ? boldFont : font;
      const lineHeight = baseSize * 1.25;

      let cursorY = pageHeight - box.y - baseSize;
      const bottomLimit = pageHeight - box.y - box.height;
      for (const line of box.lines) {
        const wrapped = wrapText(line, usedFont, baseSize, box.width);
        for (const wLine of wrapped) {
          if (cursorY < bottomLimit) break;
          page.drawText(wLine, {
            x: box.x,
            y: cursorY,
            size: baseSize,
            font: usedFont,
            color: rgb(0.07, 0.08, 0.06),
            maxWidth: box.width,
          });
          cursorY -= lineHeight;
        }
      }
    }

    onProgress?.(Math.round(((i + 1) / slideFiles.length) * 100));
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

function extractTextBoxes(xml: string): TextBox[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const shapes = Array.from(doc.getElementsByTagName("p:sp"));
  const boxes: TextBox[] = [];

  shapes.forEach((shape, shapeIdx) => {
    const paragraphs = Array.from(shape.getElementsByTagName("a:p"));
    const lines: string[] = [];
    for (const p of paragraphs) {
      const runs = Array.from(p.getElementsByTagName("a:t"));
      const text = runs.map((r) => r.textContent ?? "").join("").trim();
      if (text) lines.push(text);
    }
    if (lines.length === 0) return;

    // Position/size from <a:xfrm><a:off x y/><a:ext cx cy/></a:xfrm>
    const xfrm = shape.getElementsByTagName("a:xfrm")[0];
    const off = xfrm?.getElementsByTagName("a:off")[0];
    const ext = xfrm?.getElementsByTagName("a:ext")[0];

    const xEmu = off ? parseInt(off.getAttribute("x") || "0", 10) : 457200;
    const yEmu = off ? parseInt(off.getAttribute("y") || "0", 10) : 457200 + shapeIdx * 1200000;
    const cxEmu = ext ? parseInt(ext.getAttribute("cx") || "0", 10) : DEFAULT_SLIDE_WIDTH_EMU - 914400;
    const cyEmu = ext ? parseInt(ext.getAttribute("cy") || "0", 10) : 900000;

    // Shapes referencing a "title" placeholder get rendered larger/bold.
    const placeholder = shape.getElementsByTagName("p:ph")[0];
    const phType = placeholder?.getAttribute("type") ?? "";
    const isTitle = phType.includes("title") || shapeIdx === 0;

    boxes.push({
      x: xEmu * POINTS_PER_EMU,
      y: yEmu * POINTS_PER_EMU,
      width: cxEmu * POINTS_PER_EMU,
      height: cyEmu * POINTS_PER_EMU,
      lines,
      isTitle,
    });
  });

  return boxes;
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
