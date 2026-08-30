/**
 * Renders a <script type="application/ld+json"> tag from a plain object.
 * Used for structured data (FAQPage, SoftwareApplication, BreadcrumbList,
 * Article, etc.) so Google can show rich results — FAQ accordions, star
 * ratings, breadcrumb trails in the SERP — instead of a plain blue link.
 *
 * Safe to use with SSR: since this renders as part of the normal React
 * tree, `renderToString` in entry-server.tsx picks it up automatically,
 * so every prerendered route (dist/<route>/index.html) ships its
 * structured data in the very first HTML response — no dependency on a
 * second JS-render crawl pass.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        // Guard against "</script>" appearing inside string values, which
        // would otherwise terminate the tag early and break the page.
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
