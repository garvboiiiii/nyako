import { useEffect } from "react";

const SITE_ORIGIN = "https://nyako.co.in";

/**
 * Sets <link rel="canonical"> to this page's own URL. Since this is a
 * client-rendered SPA, every route initially serves the exact same static
 * HTML — without a per-route canonical tag, Google's crawler sees
 * identical markup across pages and flags them as duplicates ("Duplicate
 * without user-selected canonical" in Search Console), refusing to index
 * most of them.
 *
 * This is injected via JS, so it only helps on Google's second, JS-render
 * crawl pass — not the very first raw-HTML pass. It's a real mitigation,
 * not a complete fix; a server-rendered page (Next.js) would set this
 * correctly from the first byte instead.
 */
export function useCanonicalUrl(path: string) {
  useEffect(() => {
    const href = `${SITE_ORIGIN}${path}`;
    let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previous = tag?.getAttribute("href") ?? null;
    if (!tag) {
      tag = document.createElement("link");
      tag.setAttribute("rel", "canonical");
      document.head.appendChild(tag);
    }
    tag.setAttribute("href", href);
    return () => {
      if (previous) tag?.setAttribute("href", previous);
    };
  }, [path]);
}