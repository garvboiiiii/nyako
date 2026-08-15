// Central Tool Registry. Every tool's metadata lives here — title, slug,
// description, keywords/synonyms, category, icon, and SEO copy — so
// there's exactly one place to touch when adding or editing a tool.
// Everything else (search, homepage grid, category filters, footer,
// sitemap, related-tools) is derived from this file.

export type CategoryId =
  | "image"
  | "pdf"
  | "signature"
  | "passport"
  | "ocr"
  | "conversion"
  | "compression";

export const CATEGORIES: Record<CategoryId, { label: string; description: string }> = {
  image: { label: "Image", description: "Resize, crop, and edit photos" },
  pdf: { label: "PDF", description: "Merge, split, rotate, and manage pages" },
  signature: { label: "Signature", description: "Transparent signatures and stamps" },
  passport: { label: "Passport Photo", description: "Standard-size ID photos" },
  ocr: { label: "OCR", description: "Pull text out of images and scans" },
  conversion: { label: "Conversion", description: "Convert between file formats" },
  compression: { label: "Compression", description: "Hit an exact target file size" },
};

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  synonyms: string[];
  /** true = fully working; false = registered for nav/SEO but shows a "coming soon" page */
  available: boolean;
  /** short description shown on tool cards */
  description: string;
  /** longer, keyword-rich description for <meta name="description"> */
  seoDescription: string;
  /** lucide-react icon name — resolved via the icon map in components/icons.ts */
  iconName: string;
  supportedFormats: string[];
  howItWorks: [string, string, string];
  faq: { q: string; a: string }[];
}

export const TOOLS: ToolDefinition[] = [
  {
    id: "compress-image",
    slug: "compress-image",
    title: "Compress Image",
    category: "compression",
    available: true,
    description: "Shrink a photo to a target size without losing quality.",
    seoDescription:
      "Compress JPG, PNG, or WebP images to an exact target size in KB — free, no signup, runs entirely in your browser.",
    iconName: "ImageDown",
    supportedFormats: ["JPG", "PNG", "WebP"],
    howItWorks: [
      "Set a target size in KB and drop your image in — no need to guess a quality percentage, just the file size you actually need.",
      "We progressively adjust quality and resolution until the output fits your target, trying a lighter touch first and only reducing further if needed.",
      "Download the result — nothing was uploaded to a server, and the whole process runs inside your browser tab.",
    ],
    faq: [
      { q: "Does this upload my photo?", a: "No — compression runs in a Web Worker on your device. The file never leaves your browser." },
      { q: "What if my target is too small?", a: "We'll get as close as possible and tell you honestly if the exact target isn't reachable without ruining the image." },
      { q: "Will this work for printing, not just screens?", a: "For print you generally want higher resolution than this tool's small-file-size targets are built for — it's optimized for email, web uploads, and forms, not print-quality output." },
      { q: "Can I compress several images at once?", a: "Not in a single batch right now — each run handles one image, so you'd repeat the process per photo. If you need to combine several into one file afterward, try Image to PDF." },
    ],
    synonyms: [
      "compress image",
      "reduce image size",
      "make image smaller",
      "shrink photo",
      "image under",
      "make image kb",
      "compress image to 40kb",
      "reduce photo size",
      "photo size kam karo",
      "image ka size kam karo",
    ],
  },
  {
    id: "transparent-image",
    slug: "transparent-image",
    title: "Transparent Signature",
    category: "signature",
    available: true,
    description: "Remove a solid background — great for signatures and stamps.",
    seoDescription:
      "Turn a scanned signature or stamp into a transparent PNG. Adjust color, softness, and opacity — free and private.",
    iconName: "Eraser",
    supportedFormats: ["JPG", "PNG"],
    howItWorks: [
      "Upload a photo of your signature on a plain background — a phone photo works fine as long as the lighting is even.",
      "Pick the background color to remove and fine-tune the edge softness and tolerance until the cutout looks clean.",
      "Download a transparent PNG, ready to drop into any document, form, or email signature block.",
    ],
    faq: [
      { q: "Does this remove any background, like a person in a photo?", a: "Not reliably — this keys out one flat color. For complex photo backgrounds you'd need a model-based cutout, which we don't run here to keep things instant and fully offline." },
      { q: "Why does the output have to be a PNG?", a: "Transparency is only supported by formats with an alpha channel — JPG can't represent see-through pixels at all, so PNG is the only correct choice here." },
      { q: "Can I change the ink color, not just remove the background?", a: "Yes — there's a recolor option that lets you tint the signature ink to a different color while keeping the transparent background intact." },
    ],
    synonyms: [
      "make image transparent",
      "make signature transparent",
      "transparent background",
      "remove background",
      "background remover",
      "transparent signature",
      "png transparent",
      "background hatao",
      "image transparent karo",
      "remove white background",
    ],
  },
  {
    id: "resize-image",
    slug: "resize-image",
    title: "Resize Image",
    category: "image",
    available: true,
    description: "Set exact width and height in pixels.",
    seoDescription: "Resize any image to exact pixel dimensions, with or without locked aspect ratio. Free, private, instant.",
    iconName: "Maximize2",
    supportedFormats: ["JPG", "PNG"],
    howItWorks: [
      "Upload an image — the tool reads its current dimensions automatically so you have a starting point.",
      "Enter the exact width and height you need, or just one of them with aspect ratio locked to calculate the other.",
      "Download the resized file, ready for whatever form, upload limit, or layout it needs to fit.",
    ],
    faq: [
      { q: "Will resizing distort my image?", a: "Only if you turn off 'maintain aspect ratio'. Leave it on to avoid stretching." },
      { q: "Can I make an image bigger than the original?", a: "You can enter larger dimensions, but enlarging beyond the original resolution doesn't add real detail — the result will look softer than a genuinely higher-resolution photo." },
      { q: "What's a good size for a website or social media?", a: "It depends on the platform, but common targets are around 1200px wide for a blog image or 1080px square for social posts — check the specific platform's current recommendation if you need to match it exactly." },
    ],
    synonyms: ["resize image", "change image size", "image dimensions", "image resize karo"],
  },
  {
    id: "crop-image",
    slug: "crop-image",
    title: "Crop Image",
    category: "image",
    available: true,
    description: "Select and cut out exactly the part you need.",
    seoDescription: "Crop any photo with a simple drag-to-select tool. Free, private, works entirely in your browser.",
    iconName: "Crop",
    supportedFormats: ["JPG", "PNG"],
    howItWorks: [
      "Upload an image and a selection box appears over it automatically, ready to adjust.",
      "Drag the box to reposition it, or drag the corner handle to resize — the preview updates live as you move it.",
      "Download just the selected area as a new image file, at the exact crop you framed.",
    ],
    faq: [
      { q: "Can I crop to a specific aspect ratio, like square or 4:3?", a: "You can freely resize the selection box to any shape you want — it's a manual drag, not locked to preset ratios, so you have full control over the exact crop." },
      { q: "Does cropping reduce image quality?", a: "No — cropping just removes pixels outside the selection, it doesn't recompress or degrade the pixels you keep." },
      { q: "Can I undo a crop and start over?", a: "Yes — use 'Process another file' to start fresh with the same image, or re-upload if you want a clean slate." },
    ],
    synonyms: ["crop image", "cut image", "trim photo", "image crop karo"],
  },
  {
    id: "passport-photo",
    slug: "passport-photo",
    title: "Passport Photo Maker",
    category: "passport",
    available: true,
    description: "Standard-size ID photos for passports and visas, in seconds.",
    seoDescription: "Make a passport, visa, or ID photo in the correct size for your country — free, private, no studio needed.",
    iconName: "CreditCard",
    supportedFormats: ["JPG", "PNG"],
    howItWorks: [
      "Upload a clear, front-facing photo taken against a plain, evenly lit background.",
      "Pick your country's size preset from the dropdown and adjust the crop box until your face is framed correctly.",
      "Download a print-ready photo on a white background, sized to the exact dimensions your country requires.",
    ],
    faq: [
      { q: "Does it check official compliance rules (head size, lighting)?", a: "No — it standardizes size and background only. Double-check your country's specific requirements before submitting." },
      { q: "Which countries' sizes are supported?", a: "Common presets are included for major countries; if yours isn't listed, you can still crop manually to match the millimeter or pixel dimensions your country specifies." },
      { q: "Can I use a photo taken with my phone?", a: "Yes — a phone photo works fine as long as it's well-lit, in focus, and taken against a plain background with no harsh shadows." },
    ],
    synonyms: [
      "passport photo maker",
      "passport photo",
      "passport size photo",
      "id photo maker",
      "visa photo",
    ],
  },
  {
    id: "ocr-image",
    slug: "ocr-image",
    title: "OCR — Image to Text",
    category: "ocr",
    available: true,
    description: "Pull editable text out of a photo or scan.",
    seoDescription: "Extract text from an image or scanned document with free browser-based OCR — no upload, works offline after first use.",
    iconName: "ScanText",
    supportedFormats: ["JPG", "PNG"],
    howItWorks: [
      "Upload a photo or scan with printed text — a straight-on, well-lit shot gives the most accurate results.",
      "We run on-device OCR to read the characters (first use downloads a small language file, cached for next time).",
      "Copy the extracted text directly, or download it as a .txt file for use anywhere.",
    ],
    faq: [
      { q: "Does this work on handwriting?", a: "It's built for printed text — handwriting recognition is much less reliable." },
      { q: "What languages does it support?", a: "The default language pack is English; accuracy drops noticeably outside of Latin-alphabet printed text since the model is trained specifically on that." },
      { q: "Why did some words come out garbled?", a: "OCR accuracy depends heavily on photo quality — blur, low resolution, glare, or an angled shot are the most common causes. Retaking the photo straight-on in good light usually fixes it." },
    ],
    synonyms: ["ocr", "image to text", "extract text from image", "read text from photo"],
  },
  {
    id: "convert-image-format",
    slug: "convert-image-format",
    title: "Convert Image Format",
    category: "conversion",
    available: true,
    description: "Switch between PNG, JPG, WebP — any format to any format.",
    seoDescription: "Convert images between PNG, JPG, and WebP formats instantly and for free, right in your browser.",
    iconName: "RefreshCcw",
    supportedFormats: ["JPG", "PNG", "WebP"],
    howItWorks: [
      "Pick your target format from the three options — PNG, JPG, or WebP.",
      "Upload the image you want to convert — the conversion starts automatically once it's uploaded.",
      "Download it in the new format, ready to use wherever the original format wasn't accepted.",
    ],
    faq: [
      { q: "Will converting to JPG lose transparency?", a: "Yes — JPG has no alpha channel, so transparent areas are filled with white." },
      { q: "Which format should I actually pick?", a: "JPG for photos, PNG for anything with transparency or sharp text/logos, and WebP if you want the smaller file size of a modern format and don't need maximum compatibility with older software." },
      { q: "Does converting to PNG make a JPG lossless?", a: "No — any detail already lost when the original was saved as a JPG stays lost. Converting the format afterward can't recover it, it just repackages the same pixels." },
    ],
    synonyms: [
      "convert png to jpg",
      "convert jpg to png",
      "png to jpg",
      "jpg to png",
      "webp to jpg",
      "jpg to webp",
      "png to webp",
      "webp to png",
      "convert image format",
      "change image format",
      "image format badlo",
    ],
  },
  {
    id: "image-to-pdf",
    slug: "image-to-pdf",
    title: "Image to PDF",
    category: "conversion",
    available: true,
    description: "Combine any number of photos into a single PDF.",
    seoDescription: "Combine unlimited JPG or PNG images into a single PDF, in your chosen order — free and private.",
    iconName: "FileImage",
    supportedFormats: ["JPG", "PNG", "WebP"],
    howItWorks: [
      "Upload as many images as you need — there's no fixed limit on how many you add.",
      "Check the thumbnail previews and reorder with the up/down arrows until the page sequence is correct.",
      "Download one combined PDF, with each image placed on its own page in the order you set.",
    ],
    faq: [
      { q: "Is there a limit on how many images I can combine?", a: "No hard limit is enforced, though extremely large batches (dozens of high-resolution photos) will naturally take longer and use more of your device's memory to process." },
      { q: "What page size and orientation does it use?", a: "Each page is sized to match its image directly, so portrait photos become portrait pages and landscape photos become landscape pages — there's no forced page-size cropping." },
      { q: "How do I know the pages will be in the right order?", a: "Thumbnail previews are shown next to each filename so you can visually confirm the sequence before converting — reorder with the arrow buttons if anything's out of place." },
    ],
    synonyms: [
      "image to pdf",
      "photo to pdf",
      "jpg to pdf",
      "png to pdf",
      "convert image to pdf",
      "photos ko pdf banao",
      "images ko pdf mein convert karo",
    ],
  },
  {
    id: "merge-pdf",
    slug: "merge-pdf",
    title: "Merge PDF",
    category: "pdf",
    available: true,
    description: "Combine multiple PDFs into one, in your chosen order.",
    seoDescription: "Merge multiple PDF files into one document for free, entirely in your browser — no upload, no signup.",
    iconName: "Combine",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Upload two or more PDFs you want combined into a single file.",
      "Reorder them using the up/down controls to set the final page sequence — order matters, since it becomes the merged document's page order.",
      "Download the merged file, with every page from every source PDF included in sequence.",
    ],
    faq: [
      { q: "Can I merge password-protected PDFs?", a: "Not directly — a locked PDF needs its password removed first before it can be read and merged. Once unlocked, merge normally and re-add protection to the final file if needed." },
      { q: "Is there a limit on how many PDFs I can merge?", a: "No fixed limit, though very large combined page counts will take longer to process since everything happens on your device rather than a server." },
      { q: "Does merging affect the quality of the original pages?", a: "No — pages are copied into the new file as-is, with no re-rendering or recompression involved." },
    ],
    synonyms: [
      "merge pdf",
      "combine pdf",
      "join pdf",
      "pdf merge",
      "pdf jodo",
      "combine multiple pdf",
    ],
  },
  {
    id: "split-pdf",
    slug: "split-pdf",
    title: "Split PDF",
    category: "pdf",
    available: true,
    description: "Break every page out into its own file.",
    seoDescription: "Split a PDF into individual page files, packaged as a ZIP — free, private, instant.",
    iconName: "Scissors",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Upload a PDF — no need to specify which pages, since splitting applies to the entire document.",
      "We split every page into its own file automatically, preserving the original page order in the filenames.",
      "Download a ZIP of all the individual pages, numbered so you can tell which is which at a glance.",
    ],
    faq: [
      { q: "How are the split files named?", a: "Each page is numbered in order (page-01.pdf, page-02.pdf, and so on) inside the downloaded ZIP, matching the original page sequence." },
      { q: "What if I only want some pages split out, not all of them?", a: "Splitting always produces every page as its own file — if you want a subset combined into one new file instead, use Extract PDF Pages, which is built for that case specifically." },
      { q: "Will this work on very large PDFs?", a: "Yes, though a PDF with hundreds of pages will take noticeably longer to process since it all happens on your device rather than a server." },
    ],
    synonyms: [
      "split pdf",
      "separate pdf pages",
      "extract pdf pages into files",
      "pdf todo",
      "break pdf into pages",
    ],
  },
  {
    id: "compress-pdf",
    slug: "compress-pdf",
    title: "Compress PDF",
    category: "compression",
    available: true,
    description: "Shrink a PDF for email or upload limits.",
    seoDescription: "Compress a PDF to a target file size for email or upload limits — free, private, works on scanned PDFs too.",
    iconName: "Minimize2",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Set a target size in MB and upload your PDF — scanned, image-heavy PDFs benefit the most from compression.",
      "We try a lossless pass first, then progressively re-encode pages as images only if that alone isn't enough to hit your target.",
      "Download the result — we'll tell you honestly if the target wasn't reachable without making the document illegible.",
    ],
    faq: [
      { q: "Will this affect text quality?", a: "If a page still exceeds the target after a lossless pass, that page is re-rendered as a flattened image — this shrinks file size a lot, but text on that page is no longer selectable/searchable." },
      { q: "Can I compress a password-protected PDF?", a: "The password needs to be removed first — a locked PDF can't be read and re-encoded until it's unlocked." },
      { q: "Why didn't compression change the file size much?", a: "Text-only PDFs (not scanned images) are usually already small and don't have much to compress — heavy compression gains mostly come from scanned pages or embedded high-resolution photos." },
    ],
    synonyms: [
      "compress pdf",
      "pdf compressor",
      "reduce pdf size",
      "shrink pdf",
      "compress pdf under 200 kb",
      "pdf under",
      "pdf ka size kam karo",
      "make pdf smaller",
    ],
  },
  {
    id: "pdf-to-images",
    slug: "pdf-to-images",
    title: "PDF to Images",
    category: "conversion",
    available: true,
    description: "Turn every page into a JPG or PNG.",
    seoDescription: "Convert every page of a PDF into a JPG or PNG image, free and entirely in your browser.",
    iconName: "Images",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Pick JPG or PNG as your output format before uploading.",
      "Upload a PDF — every page is rendered as a separate image at a readable resolution.",
      "Download the images — a single file if there's one page, or a ZIP if there's more than one.",
    ],
    faq: [
      { q: "What resolution are the output images?", a: "Pages are rendered at a resolution good for on-screen viewing and normal printing — not the extremely high resolution you'd want for large-format printing." },
      { q: "Should I pick JPG or PNG for the output?", a: "JPG gives smaller files and is usually fine for photo-like scanned pages; PNG is better if the page has sharp text or line art where JPG's compression could introduce visible artifacts." },
      { q: "Does this work on scanned PDFs, not just typed ones?", a: "Yes — since this renders each page visually rather than extracting text, it works the same way regardless of whether the PDF has real text or is just scanned images." },
    ],
    synonyms: [
      "pdf to images",
      "pdf to jpg",
      "pdf to png",
      "convert pdf to image",
      "pdf ko image banao",
    ],
  },
  {
    id: "rotate-pdf",
    slug: "rotate-pdf",
    title: "Rotate PDF",
    category: "pdf",
    available: true,
    description: "Fix sideways or upside-down pages.",
    seoDescription: "Rotate all or specific pages of a PDF by 90, 180, or 270 degrees — free and private.",
    iconName: "RotateCw",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Upload a PDF — the page count is detected automatically so you know what you're working with.",
      "Choose which pages to rotate (all of them, or a specific list) and pick the rotation angle.",
      "Download the corrected file, with just the pages you selected rotated and everything else untouched.",
    ],
    faq: [
      { q: "Can I rotate just one page instead of the whole document?", a: "Yes — type the specific page number(s) instead of 'all', and only those pages will be rotated." },
      { q: "Does rotating affect the page content quality?", a: "No — rotation is a lossless operation, it just changes the page's orientation metadata, not the actual content." },
      { q: "What if a scanned page is upside down, not just sideways?", a: "Use the 180° rotation option — it works the same way as 90° rotation, just flips the page fully around." },
    ],
    synonyms: ["rotate pdf", "turn pdf pages", "pdf ghumao", "fix pdf orientation"],
  },
  {
    id: "delete-pdf-pages",
    slug: "delete-pdf-pages",
    title: "Delete PDF Pages",
    category: "pdf",
    available: true,
    description: "Remove specific pages and keep the rest.",
    seoDescription: "Delete specific pages from a PDF for free, directly in your browser — no upload required.",
    iconName: "FileMinus",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Upload a PDF — the total page count is shown so you can reference the right numbers.",
      "Type in which page numbers to remove, using commas and ranges (like 2,4-6) for multiple pages at once.",
      "Download the edited file with those pages removed and everything else kept in its original order.",
    ],
    faq: [
      { q: "How do I specify multiple pages to delete?", a: "Use commas for individual pages and a dash for ranges — for example, '2,5,8-10' removes pages 2, 5, 8, 9, and 10." },
      { q: "Will the remaining pages renumber automatically?", a: "Yes — once pages are removed, the rest shift up naturally in the output file, just like they would if you'd physically pulled pages out of a printed document." },
      { q: "Can I preview which pages I'm about to delete first?", a: "The tool shows the total page count so you can reference numbers correctly, but there's no visual page-by-page preview yet — double-check your page numbers against the original before downloading." },
    ],
    synonyms: ["delete pdf pages", "remove pdf pages", "pdf se page hatao"],
  },
  {
    id: "extract-pdf-pages",
    slug: "extract-pdf-pages",
    title: "Extract PDF Pages",
    category: "pdf",
    available: true,
    description: "Pull out just the pages you need.",
    seoDescription: "Extract specific pages from a PDF into a new file — free, private, works in your browser.",
    iconName: "FilePlus",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Upload a PDF — the total page count is shown to help you reference the right numbers.",
      "Type in which page numbers to keep, using commas and ranges (like 3,7-9) for multiple pages.",
      "Download a new PDF containing just those pages, combined into a single file in the order you specified.",
    ],
    faq: [
      { q: "What's the difference between this and Split PDF?", a: "Extract pulls a specific range into one new combined file — Split instead breaks every single page into its own separate file. Use Extract when you want a subset together, Split when you want each page independent." },
      { q: "Does extracting affect page quality?", a: "No — pages are copied as-is into the new file, with no re-rendering or recompression." },
      { q: "Can I extract the same page more than once?", a: "Entering a page number twice won't duplicate it in the output — each unique page number is only included once, in its original position relative to the other selected pages." },
    ],
    synonyms: ["extract pdf pages", "pull pages from pdf", "pdf se pages nikaalo"],
  },
  {
    id: "pdf-to-word",
    slug: "pdf-to-word",
    title: "PDF to Word",
    category: "conversion",
    available: true,
    description: "Extract PDF text into an editable .docx.",
    seoDescription: "Convert PDF text into an editable Word document for free, right in your browser.",
    iconName: "FileText",
    supportedFormats: ["PDF"],
    howItWorks: [
      "Upload a PDF that has real, selectable text (not a scanned image).",
      "We extract the text content page by page, inferring each line's alignment from its position on the page so left/center/right layout carries over.",
      "Download an editable .docx file, ready to open and edit directly in Word or Google Docs.",
    ],
    faq: [
      { q: "Will formatting be preserved?", a: "Text comes through as plain paragraphs with alignment carried over — this is a content conversion, not a full layout conversion. Scanned PDFs (photos of text) have no text layer to extract." },
      { q: "Will tables and images from the PDF come through?", a: "No — this focuses on extracting the text content itself. Tables collapse into plain text lines, and images aren't reproduced in the Word output." },
      { q: "What if the PDF is a scan, not typed text?", a: "There's no text layer to extract from a scanned image, so run it through the OCR tool first to convert the scan into real text, then work with that text directly." },
    ],
    synonyms: ["pdf to word", "pdf to docx", "convert pdf to word"],
  },
  {
    id: "word-to-pdf",
    slug: "word-to-pdf",
    title: "Word to PDF",
    category: "conversion",
    available: true,
    description: "Turn a .docx into a shareable PDF.",
    seoDescription: "Convert a Word document to PDF for free, directly in your browser — no upload, no signup.",
    iconName: "FileOutput",
    supportedFormats: ["DOCX"],
    howItWorks: [
      "Upload a .docx file — headings, bold/italic text, lists, and paragraph alignment are all read from the document.",
      "We render its content and paginate it across PDF pages sized to match a standard page.",
      "Download the finished PDF, ready to share or print without needing Word installed.",
    ],
    faq: [
      { q: "Will fonts and exact spacing match the original?", a: "Content and basic formatting (headings, alignment, bold/italic, lists) carry over, but exact font rendering and precise spacing may differ slightly from what Word's own renderer produces." },
      { q: "Do embedded images in the document show up?", a: "Yes — images placed in the document are rendered as part of the page content in the output PDF." },
      { q: "Does this work with very long documents?", a: "Yes, though documents with many pages will take longer to render and paginate since it's all processed on your device." },
    ],
    synonyms: ["word to pdf", "docx to pdf", "convert word to pdf"],
  },
  {
    id: "excel-to-pdf",
    slug: "excel-to-pdf",
    title: "Excel to PDF",
    category: "conversion",
    available: true,
    description: "Every sheet becomes a printable PDF page.",
    seoDescription: "Convert an Excel spreadsheet to PDF for free, right in your browser.",
    iconName: "Table",
    supportedFormats: ["XLSX"],
    howItWorks: [
      "Upload a .xlsx file — every sheet in the workbook is picked up automatically.",
      "Each sheet is rendered as a table, with numbers right-aligned and text left-aligned to match Excel's own default conventions.",
      "Download the finished PDF, with each sheet laid out as its own printable section.",
    ],
    faq: [
      { q: "Will formulas show their calculated values?", a: "Yes — cells show their last-calculated result, the same way they'd appear if you printed directly from Excel. Formulas themselves aren't re-evaluated, just their stored values." },
      { q: "What happens with very wide sheets that don't fit a page?", a: "Wide tables shrink to fit the page width in the output rather than getting cut off, so all columns remain visible even if the text becomes smaller." },
      { q: "Will custom cell colors and fonts be preserved?", a: "No — only the data and its type-based alignment carry over. Custom cell colors, borders, and fonts from the original spreadsheet aren't reproduced." },
    ],
    synonyms: ["excel to pdf", "xlsx to pdf", "convert excel to pdf"],
  },
  {
    id: "ppt-to-pdf",
    slug: "ppt-to-pdf",
    title: "PPT to PDF",
    category: "conversion",
    available: true,
    description: "Slide text laid out as PDF pages.",
    seoDescription: "Convert PowerPoint slide text to PDF pages for free, directly in your browser.",
    iconName: "Presentation",
    supportedFormats: ["PPTX"],
    howItWorks: [
      "Upload a .pptx file — every slide is read directly from the file's internal structure.",
      "We read each slide's text boxes along with their actual position on the slide, so titles and body text land in roughly the same spot as the original.",
      "Download one PDF page per slide, with a page number added to each for easy reference.",
    ],
    faq: [
      { q: "Will slide design and images be included?", a: "No — this is a text-content conversion, not a visual replica. Backgrounds, images, and exact styling aren't reproduced, only text and its position." },
      { q: "Are speaker notes included in the output?", a: "No — only the visible text on each slide is extracted, speaker notes attached to a slide are not included." },
      { q: "Why does the text position sometimes look slightly off?", a: "Text boxes are placed using each shape's stored position on the slide, so the layout should closely track the original — very complex slides with unusual custom layouts may not translate perfectly." },
    ],
    synonyms: ["ppt to pdf", "powerpoint to pdf", "pptx to pdf"],
  },
];

// Free-standing regex rules for parameter extraction (size targets, formats).
// These run independent of which tool wins, then get attached as prefilled
// options for the destination tool.
export const PARAM_RULES = {
  sizeTarget: /(\d+(?:\.\d+)?)\s?(kb|mb)\b/i,
  constraintMax: /\b(under|below|less than|se kam)\b/i,
  formats: /\b(png|jpe?g|webp|pdf|docx?|heic)\b/gi,
};

// What to suggest right after a tool finishes — the natural next step in a
// real workflow (e.g. just made a PDF from photos? you'll probably want it
// smaller before emailing it). Shown as "Next step" chips on the result.
export const NEXT_STEPS: Record<string, string[]> = {
  "compress-image": ["image-to-pdf", "transparent-image"],
  "transparent-image": ["image-to-pdf", "resize-image"],
  "resize-image": ["compress-image", "image-to-pdf"],
  "crop-image": ["compress-image", "image-to-pdf"],
  "passport-photo": ["image-to-pdf"],
  "convert-image-format": ["compress-image"],
  "image-to-pdf": ["compress-pdf"],
  "merge-pdf": ["compress-pdf"],
  "split-pdf": ["compress-pdf"],
  "rotate-pdf": ["compress-pdf"],
  "delete-pdf-pages": ["compress-pdf"],
  "extract-pdf-pages": ["compress-pdf"],
  "pdf-to-images": ["compress-image"],
  "word-to-pdf": ["compress-pdf"],
  "excel-to-pdf": ["compress-pdf"],
  "ppt-to-pdf": ["compress-pdf"],
  "compress-pdf": ["merge-pdf"],
};

export function getNextSteps(toolId: string): ToolDefinition[] {
  const ids = NEXT_STEPS[toolId] ?? [];
  return ids
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter((t): t is ToolDefinition => Boolean(t));
}

/** Other tools in the same category, for a "Related tools" section. */
export function getRelatedByCategory(toolId: string, limit = 4): ToolDefinition[] {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) return [];
  return TOOLS.filter((t) => t.category === tool.category && t.id !== toolId).slice(0, limit);
}

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.id === id);
}
