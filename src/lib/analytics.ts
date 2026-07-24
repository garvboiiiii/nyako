// Minimal analytics abstraction. Every call site in the app calls track()
// with a small, consistent event vocabulary — none of them need to know
// or care what actually receives the event. Swapping in a real provider
// (Plausible, GA4, PostHog...) later is a one-file change, right here.
//
// No file content, filenames, or other identifying details are ever
// tracked — only the event name and small non-identifying metadata
// (tool id, category, file-size bucket), matching the privacy promise
// made throughout the rest of the product.

export type AnalyticsEvent =
  | "search_submitted"
  | "search_disambiguation_shown"
  | "tool_page_view"
  | "tool_run_started"
  | "tool_run_completed"
  | "tool_run_failed"
  | "download_clicked"
  | "next_step_clicked"
  | "favorite_toggled"
  | "drop_suggestion_shown";

export function track(event: AnalyticsEvent, payload: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  // Swap this block for a real provider call when one is wired up.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload);
  }
}

/** Buckets a byte count into a small set of ranges instead of an exact number. */
export function sizeBucket(bytes: number): string {
  const kb = bytes / 1024;
  if (kb < 100) return "<100KB";
  if (kb < 500) return "100-500KB";
  if (kb < 2048) return "500KB-2MB";
  if (kb < 10240) return "2-10MB";
  return ">10MB";
}
