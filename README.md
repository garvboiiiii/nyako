# Nyako — working MVP

18 file/image/PDF tools, all running **100% in the browser** — nothing is ever
uploaded to a server. Fully tested end-to-end (real file → real download) and
console-error-free across every page.

## Tools

**Image:** Compress Image, Transparent Signature (background remover), Resize
Image, Crop Image, Passport Photo Maker, OCR (image → text)
**PDF:** Image to PDF, Merge PDF, Split PDF, Compress PDF, PDF to Images,
Rotate PDF, Delete PDF Pages, Extract PDF Pages
**Convert:** PDF to Word, Word to PDF, Excel to PDF, PPT to PDF

## Run it

```bash
cd nyako
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build       # production build → /dist
npm run preview      # test the production build locally
```

Deploy `dist/` to Vercel, Netlify, or Cloudflare Pages (enable SPA fallback /
rewrite-to-index.html for client-side routing).

> **Blank page?** You likely opened `index.html` directly as a `file://` URL.
> Vite's build uses ES modules, which browsers block under `file://` due to
> CORS. Always serve it through `npm run dev` or `npm run preview`.

## What changed in this pass

1. **Fixed downloads.** Switched from a plain `<a download>` anchor to
   `file-saver`'s `saveAs()` — the anchor approach is unreliable on iOS
   Safari and in-app webviews, which is the most common real-world cause of
   "nothing downloads."
2. **Full rebrand to Nyako** — new blue palette (`#2563EB` / `#60A5FA`),
   Inter typography, dark mode with persisted preference, and a reactive cat
   mascot (idle / thinking / searching / happy / loading) that responds to
   command-bar interaction.
3. **Removed** the spinning circular badge, the green flowing wave, and the
   numbered navigation — replaced with a standard header (logo, nav, search,
   theme toggle) and a subtle mesh-gradient + floating-document hero
   background.
4. **Added 4 new tools** to round out the Popular Tools set: Resize Image,
   Crop Image (drag-to-select), Passport Photo Maker, and OCR.
5. **Self-hosted OCR assets.** Tesseract.js defaults to fetching its
   worker/core/language files from a third-party CDN — these are now served
   from `/public/tesseract` instead, so there's no external dependency and
   it keeps working in network-restricted environments.

## Project structure

```
src/
  lib/intent/dictionary.ts   ← tool keywords/synonyms — add a new tool here
  lib/intent/scorer.ts        ← keyword/regex matching, no AI
  lib/file-engine/            ← shared pdf.js render + page-range + html→pdf helpers
  lib/useDarkMode.ts           ← theme toggle hook
  tools/<slug>/engine.ts       ← pure function: file(s) in → Blob out
  components/                  ← Header, CommandBar, NyakoMascot, HeroBackground,
                                  Dropzone, ProgressBar, DownloadCard, ImageCropSelector
  pages/                       ← one page per tool + HomePage + BlogPage
```

**Adding a new tool:** add an entry to `dictionary.ts`, write `engine.ts`,
copy an existing similar page, add a lazy route in `App.tsx`. The homepage
grid, search, and footer all pick it up automatically.

## Known trade-offs (documented honestly, not hidden)

- **Compress PDF** rasterizes pages that don't fit the lossless pass — text
  on those pages is no longer selectable. Best for scanned/image-heavy PDFs.
- **PDF to Word / PPT to PDF** are text-content conversions (via pdf.js
  text extraction / pptx XML parsing), not visual/layout conversions.
- **Word to PDF / Excel to PDF** render the document to canvas and paginate
  it — good for everyday docs, not pixel-identical to Word/Excel's own
  renderer for complex layouts.
- **`xlsx` (SheetJS)** is pinned to npm's last published version (0.18.5),
  which has a known ReDoS/prototype-pollution advisory with no npm fix
  available (SheetJS moved fixed builds to their own CDN). Since this only
  parses a file the user picked themselves, client-side, the blast radius is
  limited to that user's own tab — but production should pull the patched
  build from cdn.sheetjs.com instead of npm.
- **`pdfjs-dist` is pinned to 4.10.38.** The 6.x line uses a very new JS
  engine feature not yet broadly supported in browsers — would have broken
  PDF rendering for real users.
