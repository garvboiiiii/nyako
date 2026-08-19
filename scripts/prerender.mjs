// Build-time prerender for Cloudflare Pages.
// The browser app remains a client-side React SPA, but every known public route
// also gets a real HTML snapshot in dist/<route>/index.html. Cloudflare Pages
// serves those static files before the SPA fallback, so crawlers receive the
// page content without depending on JavaScript execution.

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");
const clientDir = path.join(projectRoot, "dist");
const serverDir = path.join(projectRoot, "dist-server");


async function main() {
  const serverEntry = await findServerEntry(serverDir);
  if (!serverEntry) {
    console.error(`SSR bundle not found under ${serverDir}.`);
    process.exit(1);
  }

  console.log(`Using SSR bundle: ${serverEntry}`);
  const { render, getAllRoutes } = await import(pathToFileUrl(serverEntry));
  const template = await readFile(path.join(clientDir, "index.html"), "utf-8");
  const routes = getAllRoutes();

  console.log(`Prerendering ${routes.length} routes...`);

  let ok = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const appHtml = render(route.path);
      if (!appHtml.trim()) throw new Error("SSR returned empty HTML");

      const finalHtml = injectIntoTemplate(template, appHtml, route);
      const outDir = route.path === "/"
        ? clientDir
        : path.join(clientDir, route.path.replace(/^\//, ""));

      await mkdir(outDir, { recursive: true });
      const output = path.join(outDir, "index.html");
      await writeFile(output, finalHtml, "utf-8");

      // Fail the build if a supposedly prerendered route accidentally becomes
      // an empty SPA shell. This is the exact failure mode that can hide the
      // site's content from crawlers.
      const hasRootContent = /<div id="root">\s*<.+/s.test(finalHtml);
      const hasTitle = finalHtml.includes(`<title>${escapeHtml(route.title)}</title>`);
      if (!hasRootContent) throw new Error("generated HTML still has an empty #root");
      if (!hasTitle) throw new Error("route-specific <title> was not injected");

      ok++;
      console.log(`  ✓ ${route.path}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route.path}:`, err instanceof Error ? err.message : err);
    }
  }

  // Cloudflare Pages can use this as the SPA fallback for unknown routes.
  await writeFile(path.join(clientDir, "404.html"), template, "utf-8");

  await writeFile(path.join(clientDir, "sitemap.xml"), buildSitemap(routes), "utf-8");
  console.log(`  ✓ sitemap.xml (${routes.length} urls)`);

  console.log(`Done. ${ok} routes prerendered, ${failed} failed.`);

  await rm(serverDir, { recursive: true, force: true });

  if (failed > 0 || ok !== routes.length) process.exit(1);
}

async function findServerEntry(dir) {
  if (!existsSync(dir)) return null;

  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && entry.name === "entry-server.js") return full;
    if (entry.isDirectory()) {
      const nested = await findServerEntry(full);
      if (nested) return nested;
    }
  }
  return null;
}

function injectIntoTemplate(template, appHtml, route) {
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);

  html = replaceOrInsert(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  const canonical = `https://nyako.co.in${route.path}`;
  html = replaceOrInsert(
    html,
    /<link\s+rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${canonical}" />`,
    "</head>"
  );

  html = replaceOrInsert(
    html,
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );

  return html;
}

function replaceOrInsert(html, pattern, replacement, before = "</head>") {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(before, `    ${replacement}\n  ${before}`);
}

function buildSitemap(routes) {
  const priorityFor = (p) => {
    if (p === "/") return "1.0";
    if (p.startsWith("/tools/")) return "0.9";
    if (p === "/blog") return "0.8";
    if (p.startsWith("/blog/")) return "0.7";
    return "0.5";
  };

  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>https://nyako.co.in${route.path}</loc>\n    <priority>${priorityFor(route.path)}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pathToFileUrl(p) {
  return "file://" + p.replace(/\\/g, "/");
}

main();
