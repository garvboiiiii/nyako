import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import DOMPurify from "dompurify";

const A4_RATIO = 842 / 595; // height/width in points

/**
 * Renders an HTML fragment into a hidden container, rasterizes it, and
 * slices the result into A4-proportioned pages of a new PDF. This is a
 * visual "print" of the content rather than a native re-authoring — good
 * enough for straightforward documents/tables, but it won't preserve
 * things like live text selection or exact font metrics of the original.
 */
export async function htmlToPdf(
  html: string,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-99999px";
  container.style.top = "0";
  container.style.width = "794px"; // ~A4 width at 96dpi
  container.style.background = "#ffffff";
  container.style.padding = "32px";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.color = "#111111";
  // Word/Excel content is user-uploaded and gets converted to HTML by
  // mammoth/SheetJS before landing here — sanitize before it ever touches
  // the DOM so a crafted document can't run script via innerHTML. Default
  // config is used deliberately: it already strips <script>, event-handler
  // attributes, and javascript: URLs, while keeping the inline `style`
  // attributes that table/heading formatting depends on.
  container.innerHTML = DOMPurify.sanitize(html);
  document.body.appendChild(container);

  onProgress?.(15);

  let fullCanvas: HTMLCanvasElement;
  try {
    fullCanvas = await html2canvas(container, { scale: 2, backgroundColor: "#ffffff", useCORS: false });
  } finally {
    document.body.removeChild(container);
  }

  onProgress?.(55);

  const pageWidthPx = fullCanvas.width;
  const pageHeightPx = Math.round(pageWidthPx * A4_RATIO);
  const totalPages = Math.max(1, Math.ceil(fullCanvas.height / pageHeightPx));

  const pdfDoc = await PDFDocument.create();
  const pdfPageWidth = 595;
  const pdfPageHeight = 842;

  for (let i = 0; i < totalPages; i++) {
    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = pageWidthPx;
    sliceCanvas.height = pageHeightPx;
    const ctx = sliceCanvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    ctx.drawImage(
      fullCanvas,
      0,
      i * pageHeightPx,
      pageWidthPx,
      pageHeightPx,
      0,
      0,
      pageWidthPx,
      pageHeightPx
    );

    const blob: Blob = await new Promise((resolve, reject) =>
      sliceCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error("slice export failed"))), "image/jpeg", 0.88)
    );
    const bytes = await blob.arrayBuffer();
    const image = await pdfDoc.embedJpg(bytes);
    const page = pdfDoc.addPage([pdfPageWidth, pdfPageHeight]);
    page.drawImage(image, { x: 0, y: 0, width: pdfPageWidth, height: pdfPageHeight });

    onProgress?.(55 + Math.round(((i + 1) / totalPages) * 40));
  }

  const finalBytes = await pdfDoc.save();
  onProgress?.(100);
  return new Blob([finalBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}
