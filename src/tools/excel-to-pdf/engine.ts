import * as XLSX from "xlsx";
import { htmlToPdf } from "../../lib/file-engine/htmlToPdf";

// NOTE: npm's registry only distributes xlsx up to 0.18.5, which has a
// known ReDoS / prototype-pollution advisory (SheetJS now publishes fixed
// builds via their own CDN instead of npm). Since this only ever parses a
// file the user picked themselves, entirely client-side, the blast radius
// is limited to that user's own tab — but a production deployment should
// pull the patched build from cdn.sheetjs.com rather than npm.

/**
 * Converts every sheet in a workbook to an HTML table and "prints" it to
 * PDF pages. The free/community build of SheetJS doesn't expose the
 * original cell styling (colors, borders, custom fonts), so instead of
 * relying on its generic sheet_to_html output, this builds the table
 * itself and applies the same alignment conventions Excel uses by
 * default — numbers and dates right-aligned, text left-aligned, and the
 * first row treated as a bold header — which is what "alignment looked
 * wrong" usually comes down to for spreadsheet exports.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const workbook = XLSX.read(bytes, { type: "array", cellDates: true });
  onProgress?.(15);

  const html = workbook.SheetNames.map((name) => sheetToStyledHtml(workbook, name)).join("");

  onProgress?.(25);
  return htmlToPdf(html, (pct) => onProgress?.(25 + Math.round(pct * 0.75)));
}

function sheetToStyledHtml(workbook: XLSX.WorkBook, sheetName: string): string {
  const sheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1");

  const rows: string[] = [];
  for (let r = range.s.r; r <= range.e.r; r++) {
    const isHeaderRow = r === range.s.r;
    const cells: string[] = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const ref = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[ref];
      const { text, align } = formatCell(cell);
      const tag = isHeaderRow ? "th" : "td";
      const style = [
        `text-align:${align}`,
        "padding:6px 10px",
        "border:1px solid #d1d5db",
        isHeaderRow ? "background:#f3f4f6;font-weight:700" : "",
      ]
        .filter(Boolean)
        .join(";");
      cells.push(`<${tag} style="${style}">${escapeHtml(text)}</${tag}>`);
    }
    rows.push(`<tr>${cells.join("")}</tr>`);
  }

  return (
    `<h3 style="font-family:Arial,sans-serif;margin:24px 0 8px;">${escapeHtml(sheetName)}</h3>` +
    `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px;width:100%;">${rows.join("")}</table>`
  );
}

function formatCell(cell: XLSX.CellObject | undefined): { text: string; align: "left" | "right" | "center" } {
  if (!cell || cell.v === undefined || cell.v === null) return { text: "", align: "left" };

  switch (cell.t) {
    case "n": // number — right-aligned, matches Excel/Sheets convention
      return { text: cell.w ?? String(cell.v), align: "right" };
    case "d": // date — right-aligned
      return { text: cell.w ?? String(cell.v), align: "right" };
    case "b": // boolean — centered
      return { text: cell.v ? "TRUE" : "FALSE", align: "center" };
    default: // string/text — left-aligned
      return { text: cell.w ?? String(cell.v), align: "left" };
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
