import { useEffect } from "react";

export function useMetaDescription(description: string) {
  useEffect(() => {
    let tag = document.querySelector('meta[name="description"]');
    const previous = tag?.getAttribute("content") ?? "";
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
    return () => {
      tag?.setAttribute("content", previous);
    };
  }, [description]);
}
