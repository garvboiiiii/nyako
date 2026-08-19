import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppServer from "./AppServer";
import { TOOLS } from "./lib/intent/dictionary";
import { BLOG_POSTS } from "./content/blogPosts";

const SITE_ORIGIN = "https://nyako.co.in";

/**
 * Renders the full page to an HTML string for a given URL. Uses
 * AppServer (eager imports, no React.lazy) + plain renderToString —
 * deliberately not the lazy-loaded client App or a streaming renderer,
 * since heavy client-only libraries (pdf-lib, pdfjs-dist, tesseract.js)
 * pulled in behind Suspense boundaries proved unreliable to resolve
 * synchronously during Node SSR. This function is prerender-only; it
 * never ships to the browser.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppServer />
      </StaticRouter>
    </StrictMode>
  );
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

/** Every route worth prerendering, with the title/description Google should see. */
export function getAllRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [
    {
      path: "/",
      title: "Nyako | Free PDF, Image & File Tools | No Login, No Watermarks",
      description:
        "Nyako — free file, image, and PDF tools that run entirely in your browser. Compress, merge, convert, and sign files. No uploads, no signup, no watermarks.",
    },
    {
      path: "/about",
      title: "About — Nyako",
      description: "Learn what Nyako is, why it exists, and how it keeps every file on your device.",
    },
    {
      path: "/contact",
      title: "Contact — Nyako",
      description: "Get in touch with the Nyako team.",
    },
    {
      path: "/privacy",
      title: "Privacy Policy — Nyako",
      description: "How Nyako handles (or rather, doesn't handle) your files and data.",
    },
    {
      path: "/terms",
      title: "Terms of Service — Nyako",
      description: "The terms that apply to using Nyako's free file tools.",
    },
    {
      path: "/blog",
      title: "Blog — Nyako",
      description: "Guides and tips for working with PDFs, images, and documents.",
    },
  ];

  for (const tool of TOOLS) {
    if (!tool.available) continue;
    routes.push({
      path: `/tools/${tool.slug}`,
      title: `${tool.title} — Nyako`,
      description: tool.seoDescription,
    });
  }

  for (const post of BLOG_POSTS) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} — Nyako Blog`,
      description: post.description,
    });
  }

  return routes;
}

export { SITE_ORIGIN };
