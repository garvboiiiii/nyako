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
 * PDF pages. Formulas are rendered as their last-calculated values (no
 * live recalculation), and very wide sheets will shrink to fit page width.
 */
export async function run(
  file: File,
  _options: Record<string, never> = {},
  onProgress?: (pct: number) => void
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const workbook = XLSX.read(bytes, { type: "array" });
  onProgress?.(15);

  const html = workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    const table = XLSX.utils.sheet_to_html(sheet, { header: "", footer: "" });
    return `<h3 style="font-family:Arial,sans-serif;margin-top:24px;">${escapeHtml(name)}</h3>${styleTable(table)}`;
  }).join("");

  onProgress?.(25);
  return htmlToPdf(html, (pct) => onProgress?.(25 + Math.round(pct * 0.75)));
}

function styleTable(html: string): string {
  return html.replace(
    "<table",
    '<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px;width:100%;" cellpadding="4"'
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
