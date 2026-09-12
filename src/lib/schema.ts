import type { ToolDefinition } from "./intent/dictionary";
import type { BlogPost } from "../content/blogPosts";

const SITE_ORIGIN = "https://nyako.co.in";
const SITE_NAME = "Nyako";
const LOGO_URL = `${SITE_ORIGIN}/favicon.svg`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: LOGO_URL,
    sameAs: ["https://x.com/NyakoHQ"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_ORIGIN}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** WebApplication schema for the homepage only — moved here from the old
 *  static block in index.html, which used to get duplicated onto every
 *  single prerendered route with the same "url": "/" (wrong for anything
 *  that wasn't the homepage). */
export function webApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    applicationCategory: "Utility",
    operatingSystem: "Any (runs in browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free PDF, image, and file tools for everyday document work. Many tools process files locally in your browser, with no signup or watermarks.",
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

/** SoftwareApplication + embedded FAQPage for a tool page. */
export function toolSchema(tool: ToolDefinition) {
  const url = `${SITE_ORIGIN}/tools/${tool.slug}`;

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${tool.title} — Nyako`,
    url,
    applicationCategory: "Utility",
    operatingSystem: "Any (runs in browser)",
    description: tool.seoDescription,
    featureList: [tool.description, ...tool.whyUseIt],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faq = tool.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: tool.title, path: `/tools/${tool.slug}` },
  ]);

  return faq ? [softwareApp, faq, breadcrumb] : [softwareApp, breadcrumb];
}

export function articleSchema(post: BlogPost) {
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url,
    image: LOGO_URL,
    inLanguage: "en",
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return [article, breadcrumb];
}
