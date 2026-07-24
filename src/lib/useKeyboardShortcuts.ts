import { useEffect } from "react";

interface Options {
  onSlash?: () => void;
  onEscape?: () => void;
}

/**
 * Wires up "/" to focus the search input and "Esc" to blur/close it —
 * standard shortcuts from Linear, Raycast, GitHub, etc. Ignored while the
 * person is already typing in a text field (so "/" can still be typed
 * normally inside other inputs).
 */
export function useKeyboardShortcuts({ onSlash, onEscape }: Options) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        onSlash?.();
      } else if (e.key === "Escape") {
        onEscape?.();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSlash, onEscape]);
}
