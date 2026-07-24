/**
 * Strips path separators, control characters, and leading dots from a
 * filename before it's handed to the browser's save dialog. Filenames in
 * this app always originate from the user's own upload or a hardcoded
 * string, so this is defense-in-depth rather than a response to a known
 * exploit — but it costs nothing and rules out a whole class of
 * path-traversal-flavored mistakes if that ever changes.
 */
export function sanitizeFilename(name: string, fallback = "download"): string {
  const cleaned = name
    .replace(/[/\\?%*:|"<>\x00-\x1f]/g, "-")
    .replace(/^\.+/, "")
    .trim();
  return cleaned || fallback;
}
