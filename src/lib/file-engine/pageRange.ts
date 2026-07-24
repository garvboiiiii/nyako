/**
 * Parses a human-friendly page range string like "1,3,5-7,10" into a
 * zero-indexed, deduplicated, sorted array of page indices.
 * Used by Delete Pages, Extract Pages, and Rotate PDF.
 */
export function parsePageRange(input: string, totalPages: number): number[] {
  const indices = new Set<number>();
  const cleaned = input.replace(/\s+/g, "");
  if (!cleaned) return [];

  for (const part of cleaned.split(",")) {
    if (!part) continue;
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      let start = parseInt(rangeMatch[1], 10);
      let end = parseInt(rangeMatch[2], 10);
      if (start > end) [start, end] = [end, start];
      for (let p = start; p <= end; p++) {
        if (p >= 1 && p <= totalPages) indices.add(p - 1);
      }
    } else if (/^\d+$/.test(part)) {
      const p = parseInt(part, 10);
      if (p >= 1 && p <= totalPages) indices.add(p - 1);
    }
  }
  return [...indices].sort((a, b) => a - b);
}

export function validatePageRange(input: string, totalPages: number): { ok: boolean; reason?: string } {
  if (!input.trim()) return { ok: false, reason: "Enter at least one page number." };
  const valid = /^[\d,\-\s]+$/.test(input);
  if (!valid) return { ok: false, reason: "Use numbers, commas, and dashes only, e.g. 1,3,5-7." };
  const indices = parsePageRange(input, totalPages);
  if (indices.length === 0) return { ok: false, reason: `Enter page numbers between 1 and ${totalPages}.` };
  return { ok: true };
}
