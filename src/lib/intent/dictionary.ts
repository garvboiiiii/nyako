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
      "Set a target size in KB and drop your image in.",
      "We progressively adjust quality and resolution until it fits.",
      "Download the result — nothing was uploaded to a server.",
    ],
    faq: [
      { q: "Does this upload my photo?", a: "No — compression runs in a Web Worker on your device. The file never leaves your browser." },
      { q: "What if my target is too small?", a: "We'll get as close as possible and tell you honestly if the exact target isn't reachable without ruining the image." },
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
      "Upload a photo of your signature on a plain background.",
      "Pick the background color to remove and fine-tune the edges.",
      "Download a transparent PNG, ready to drop into any document.",
    ],
    faq: [
      { q: "Does this remove any background, like a person in a photo?", a: "Not reliably — this keys out one flat color. For complex photo backgrounds you'd need a model-based cutout, which we don't run here to keep things instant and fully offline." },
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
      "Upload an image.",
      "Enter the exact width and height you need.",
      "Download the resized file.",
    ],
    faq: [
      { q: "Will resizing distort my image?", a: "Only if you turn off 'maintain aspect ratio'. Leave it on to avoid stretching." },
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
      "Upload an image.",
      "Drag the box to reposition, drag the corner to resize.",
      "Download just the selected area.",
    ],
    faq: [],
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
      "Upload a clear, front-facing photo.",
      "Pick your country's size preset and adjust the crop.",
      "Download a print-ready photo on a white background.",
    ],
    faq: [
      { q: "Does it check official compliance rules (head size, lighting)?", a: "No — it standardizes size and background only. Double-check your country's specific requirements before submitting." },
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
      "Upload a photo or scan with printed text.",
      "We run on-device OCR (first use downloads a small language file).",
      "Copy the text or download it as a .txt file.",
    ],
    faq: [
      { q: "Does this work on handwriting?", a: "It's built for printed text — handwriting recognition is much less reliable." },
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
      "Pick your target format.",
      "Upload the image you want to convert.",
      "Download it in the new format.",
    ],
    faq: [
      { q: "Will converting to JPG lose transparency?", a: "Yes — JPG has no alpha channel, so transparent areas are filled with white." },
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
      "Upload as many images as you need.",
      "Reorder them by dragging the up/down controls.",
      "Download one combined PDF.",
    ],
    faq: [],
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
      "Upload two or more PDFs.",
      "Reorder them to set the final page order.",
      "Download the merged file.",
    ],
    faq: [],
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
      "Upload a PDF.",
      "We split every page into its own file automatically.",
      "Download a ZIP of all the individual pages.",
    ],
    faq: [],
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
      "Set a target size in MB and upload your PDF.",
      "We try a lossless pass first, then re-encode pages if needed.",
      "Download the result — we'll tell you honestly if the target wasn't reachable.",
    ],
    faq: [
      { q: "Will this affect text quality?", a: "If a page still exceeds the target after a lossless pass, that page is re-rendered as a flattened image — this shrinks file size a lot, but text on that page is no longer selectable/searchable." },
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
      "Pick JPG or PNG as your output format.",
      "Upload a PDF.",
      "Download the images — a ZIP if there's more than one page.",
    ],
    faq: [],
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
      "Upload a PDF.",
      "Choose which pages to rotate and by how much.",
      "Download the corrected file.",
    ],
    faq: [],
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
      "Upload a PDF.",
      "Type in which page numbers to remove.",
      "Download the edited file.",
    ],
    faq: [],
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
      "Upload a PDF.",
      "Type in which page numbers to keep.",
      "Download a new PDF with just those pages.",
    ],
    faq: [],
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
      "Upload a PDF.",
      "We extract the text content page by page.",
      "Download an editable .docx file.",
    ],
    faq: [
      { q: "Will formatting be preserved?", a: "Text comes through as plain paragraphs — this is a content conversion, not a layout conversion. Scanned PDFs (photos of text) have no text layer to extract." },
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
      "Upload a .docx file.",
      "We render its content and paginate it to PDF pages.",
      "Download the finished PDF.",
    ],
    faq: [],
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
      "Upload a .xlsx file.",
      "Every sheet is rendered as a table.",
      "Download the finished PDF.",
    ],
    faq: [],
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
      "Upload a .pptx file.",
      "We read the text from each slide.",
      "Download one PDF page per slide.",
    ],
    faq: [
      { q: "Will slide design and images be included?", a: "No — this is a text-content conversion, not a visual replica. Only text is reproduced." },
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
