import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { getToolIcon } from "../lib/icons";
import { getToolById } from "../lib/intent/dictionary";
import { track } from "../lib/analytics";
import NyakoMascot from "./NyakoMascot";

function suggestionsForType(file: File): { label: string; toolIds: string[] } {
  const type = file.type;
  const name = file.name.toLowerCase();

  if (type.startsWith("image/")) {
    return { label: "an image", toolIds: ["compress-image", "transparent-image", "resize-image", "crop-image", "convert-image-format", "image-to-pdf"] };
  }
  if (type === "application/pdf" || name.endsWith(".pdf")) {
    return { label: "a PDF", toolIds: ["compress-pdf", "merge-pdf", "split-pdf", "pdf-to-images", "pdf-to-word"] };
  }
  if (name.endsWith(".docx")) {
    return { label: "a Word document", toolIds: ["word-to-pdf"] };
  }
  if (name.endsWith(".xlsx")) {
    return { label: "a spreadsheet", toolIds: ["excel-to-pdf"] };
  }
  if (name.endsWith(".pptx")) {
    return { label: "a presentation", toolIds: ["ppt-to-pdf"] };
  }
  return { label: "a file", toolIds: [] };
}

/**
 * Wraps the homepage with a window-level drag listener. On drop, it does
 * NOT process the file itself (each tool has its own upload flow) — it
 * just detects the type and suggests the right tools, per the brief:
 * "automatically suggest relevant tools based on uploaded file type."
 */
export default function HomeDropZone() {
  const [dragging, setDragging] = useState(false);
  const [suggestion, setSuggestion] = useState<{ label: string; toolIds: string[] } | null>(null);
  const [dragDepth, setDragDepth] = useState(0);

  useEffect(() => {
    function onDragEnter(e: DragEvent) {
      if (!e.dataTransfer?.types.includes("Files")) return;
      e.preventDefault();
      setDragDepth((d) => d + 1);
      setDragging(true);
    }
    function onDragOver(e: DragEvent) {
      if (!e.dataTransfer?.types.includes("Files")) return;
      e.preventDefault();
    }
    function onDragLeave(e: DragEvent) {
      e.preventDefault();
      setDragDepth((d) => Math.max(0, d - 1));
    }
    function onDrop(e: DragEvent) {
      e.preventDefault();
      setDragging(false);
      setDragDepth(0);
      const file = e.dataTransfer?.files?.[0];
      if (!file) return;
      const result = suggestionsForType(file);
      setSuggestion(result);
      track("drop_suggestion_shown", { fileType: file.type || "unknown" });
    }

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  useEffect(() => {
    if (dragDepth === 0) setDragging(false);
  }, [dragDepth]);

  return (
    <>
      {dragging && (
        <div className="fixed inset-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-center pointer-events-none animate-fade-scale">
          <div className="bg-surface border-2 border-dashed border-primary rounded-3xl px-12 py-10 text-center shadow-xl">
            <p className="font-display text-lg font-semibold text-primary">Drop it anywhere</p>
            <p className="text-sm text-text-dim mt-1">We'll suggest the right tool for it</p>
          </div>
        </div>
      )}

      {suggestion && (
        <div
          role="dialog"
          aria-label="Suggested tools"
          className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96 z-50 bg-surface border border-line rounded-2xl shadow-xl p-5 animate-fade-slide"
        >
          <button
            onClick={() => setSuggestion(null)}
            aria-label="Dismiss"
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-paper transition focus-ring"
          >
            <X size={15} />
          </button>
          <div className="flex items-start gap-3">
            <NyakoMascot state="happy" size={44} className="shrink-0" />
            <div>
              <p className="font-display font-semibold text-sm">Looks like {suggestion.label}</p>
              <p className="text-xs text-text-dim mt-0.5">Here's what you can do with it:</p>
            </div>
          </div>
          {suggestion.toolIds.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestion.toolIds.map((id) => {
                const tool = getToolById(id);
                if (!tool) return null;
                const Icon = getToolIcon(tool.iconName);
                return (
                  <Link
                    key={id}
                    to={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-line hover:border-primary/40 hover:text-primary transition focus-ring"
                  >
                    <Icon size={13} />
                    {tool.title}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-text-dim">
              We don't have a tool for that format yet — try the search bar to describe what you need.
            </p>
          )}
        </div>
      )}
    </>
  );
}
