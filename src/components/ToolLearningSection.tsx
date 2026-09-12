import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

type Learning = {
  intro: string;
  bestFor: string[];
  workflow: string[];
  checks: string[];
  related?: { label: string; slug: string }[];
};

const LEARNING: Record<string, Learning> = {
  "compress-image": {
    intro: "Image compression reduces the amount of data needed to store or share an image. The best result is not the smallest possible file; it is the smallest file that still looks right for the job.",
    bestFor: ["Email and upload size limits", "Faster web pages and smaller downloads", "Keeping photos practical for storage and sharing"],
    workflow: ["Keep the original image as your master copy.", "Choose the output format based on the image: photographs usually suit JPG or WebP, while transparency and crisp graphics often suit PNG.", "Compress, then inspect faces, small text, signatures, and fine edges before replacing the original."],
    checks: ["Compression and resizing are different: reducing pixel dimensions can save more space than quality reduction alone.", "Repeatedly recompressing an already compressed JPG can introduce visible artifacts.", "If an exact file-size limit matters, check the downloaded file itself rather than relying on an estimate."],
    related: [{ label: "PNG vs JPG vs WebP guide", slug: "png-vs-jpg-vs-webp" }, { label: "How to compress an image", slug: "compress-image-without-losing-quality" }],
  },
  "transparent-image": {
    intro: "Background removal is useful when an image needs to sit cleanly on a document, website, presentation, or colored background. Transparency changes the image itself; it is different from simply cropping the edges.",
    bestFor: ["Logos and graphics with transparent backgrounds", "Signatures placed over documents", "Images that need to work on multiple background colors"],
    workflow: ["Start with a clean, high-contrast source whenever possible.", "Check the edge around thin strokes, hair, handwriting, and small details.", "Export to a format that can actually store transparency, such as PNG, when transparency must be preserved."],
    checks: ["JPG cannot store transparent pixels.", "A photographed signature may contain shadows or paper texture that make clean removal harder.", "Inspect the result on both light and dark backgrounds to catch leftover halos."],
    related: [{ label: "Transparent signatures guide", slug: "transparent-signature-for-documents" }],
  },
  "resize-image": {
    intro: "Resizing changes an image's pixel dimensions. It is useful when a website, application, form, or document requires a specific width or height, and it can also reduce file size by removing pixels that will never be displayed.",
    bestFor: ["Preparing images for websites and forms", "Meeting required pixel dimensions", "Reducing oversized camera images before sharing"],
    workflow: ["Start from the highest-quality original available.", "Preserve the aspect ratio unless the destination explicitly requires distortion.", "Resize once to the final dimensions, then compress if a separate file-size limit still applies."],
    checks: ["Upscaling creates more pixels but cannot recreate detail that was never captured.", "Crop before resizing when large unused areas are part of the source.", "Keep the original so you can create a different size later without repeatedly resizing the same file."],
    related: [{ label: "Resize images without losing quality", slug: "resize-image-without-losing-quality" }],
  },
  "crop-image": {
    intro: "Cropping removes unwanted areas outside a rectangular frame. A good crop is based on the final use of the image, not simply on making the subject fill as much space as possible.",
    bestFor: ["Profile and thumbnail images", "Removing distracting edges", "Preparing a consistent aspect ratio for a website or document"],
    workflow: ["Decide the destination aspect ratio first.", "Keep important faces, text, signatures, and logos away from the crop boundary.", "Review the crop at the size where the final image will actually be displayed."],
    checks: ["Cropping does not remove an object from the middle of an image; it only removes areas outside the selected rectangle.", "Crop before resizing when large unused areas would otherwise consume pixels.", "Keep the original if you may need another crop later."],
    related: [{ label: "How to crop an image", slug: "how-to-crop-an-image" }],
  },
  "passport-photo": {
    intro: "Preparing an identification photo is more than making a face fit inside a rectangle. The receiving authority may have rules for dimensions, background, expression, head position, lighting, file size, and print or digital delivery.",
    bestFor: ["Preparing a photo for an application", "Creating a consistent crop from a phone photo", "Meeting a specified digital image size"],
    workflow: ["Start with an evenly lit, front-facing source image.", "Use the exact dimensions and background requirements published by the authority receiving the photo.", "Check the final crop and file size before uploading or printing."],
    checks: ["Requirements differ between authorities and can change, so verify the current official instructions.", "Do not assume a correctly cropped digital file automatically has the correct physical print size.", "Avoid heavy editing that changes the person's appearance when the receiving authority has stricter requirements."],
    related: [{ label: "Passport photo at home guide", slug: "passport-photo-at-home" }],
  },
  "ocr-image": {
    intro: "OCR, or optical character recognition, turns visible characters in an image into machine-readable text. It is most useful when the source is a scan or photograph where normal text selection is not possible.",
    bestFor: ["Scanned documents", "Screenshots containing printed text", "Extracting text from receipts, notes, and labels"],
    workflow: ["Use a sharp, straight and well-lit source.", "Run OCR and treat the output as a first draft rather than guaranteed transcription.", "Check names, numbers, dates, URLs, and other important values against the original image."],
    checks: ["OCR accuracy depends on image quality, language support, font, contrast, and layout.", "Handwriting and decorative typefaces are harder than clean printed text.", "If a PDF already has selectable text, OCR may be unnecessary."],
    related: [{ label: "OCR scanned documents guide", slug: "ocr-extract-text-from-scanned-document" }],
  },
  "convert-image-format": {
    intro: "Image formats make different trade-offs between compatibility, compression, transparency, and editing. Converting a file changes its container and encoding; it cannot recover detail that was already lost in the source.",
    bestFor: ["Websites that require a specific format", "Software that does not accept the original format", "Reducing photographic file size with a modern format"],
    workflow: ["Identify the format required by the destination.", "Use PNG when transparency or crisp graphics matter, JPG for broad photographic compatibility, and WebP when modern web delivery is appropriate.", "Open the converted file once to confirm dimensions, transparency, and visual quality."],
    checks: ["Converting JPG to PNG does not make previously lost JPG detail lossless.", "JPG cannot preserve transparency.", "Check compatibility when sending WebP to older software or systems."],
    related: [{ label: "PNG vs JPG vs WebP guide", slug: "png-vs-jpg-vs-webp" }],
  },
  "image-to-pdf": {
    intro: "Turning images into a PDF is useful when several photos or scans need to become one document. The resulting PDF contains the supplied images; it does not automatically make photographed text editable.",
    bestFor: ["Combining phone scans", "Submitting multiple photos as one document", "Creating a document from receipts, assignments, or certificates"],
    workflow: ["Put images into the intended reading order.", "Check orientation and make sure important edges are visible.", "Open the exported PDF before submitting it, especially when page order or image quality matters."],
    checks: ["Very high-resolution images can create unnecessarily large PDFs.", "A PDF made from photos may not contain selectable text; OCR is a separate step.", "Keep the original images if you may need to rebuild the PDF later."],
    related: [{ label: "Turn photos into a PDF", slug: "turn-photos-into-a-pdf" }],
  },
  "merge-pdf": {
    intro: "Merging combines multiple PDF files into one document while preserving the page sequence you choose. It is useful when a submission, report, or archive is spread across several separate PDFs.",
    bestFor: ["Combining application documents", "Joining reports, invoices, or certificates", "Keeping related scans in one file"],
    workflow: ["Decide the final reading order before merging.", "Keep a copy of the source PDFs in case the order needs to change.", "Open the merged result and check page count, orientation, and important pages before sharing."],
    checks: ["Merging is different from compression: it combines documents but does not necessarily reduce their size.", "Password-protected or damaged PDFs may need to be fixed before they can be read.", "Mixed portrait and landscape pages are allowed, but should be checked in the final document."],
    related: [{ label: "Merge multiple PDFs guide", slug: "merge-multiple-pdfs-into-one" }],
  },
  "split-pdf": {
    intro: "Splitting breaks a multi-page PDF into separate page files. It is useful when one source document contains material that needs to be uploaded, archived, or shared separately.",
    bestFor: ["Separating individual scanned pages", "Breaking a long document into smaller files", "Creating one PDF per page for a workflow"],
    workflow: ["Keep the original PDF untouched.", "Use the generated filenames and page numbers to preserve order.", "Open a few output files, including the first and last, to confirm the split worked as expected."],
    checks: ["Splitting is different from extracting: splitting produces every page separately, while extraction is better for a selected subset.", "Large PDFs can take longer because processing happens on the device.", "Keep the original if the page grouping may need to be recreated."],
    related: [{ label: "Split a PDF into pages", slug: "split-pdf-into-separate-pages" }],
  },
  "compress-pdf": {
    intro: "PDF compression is mainly useful when a document is too large for an email, upload portal, or storage workflow. The amount of reduction depends heavily on whether the PDF contains scanned images or mostly vector text.",
    bestFor: ["Email attachment limits", "Online application upload limits", "Reducing image-heavy or scanned PDFs"],
    workflow: ["Check the actual size limit first.", "Try the least aggressive compression that can meet it.", "Inspect small text, signatures, and diagrams in the final PDF before submitting it."],
    checks: ["Text-only PDFs may not shrink much because they are already compact.", "Strong image compression can reduce sharpness and may remove selectable text if pages are flattened.", "Keep the original so you can try a different target later."],
    related: [{ label: "Compress PDF for email", slug: "compress-pdf-for-email" }],
  },
  "pdf-to-images": {
    intro: "Converting PDF pages to images renders each page as a raster picture. This is useful for previews, presentations, thumbnails, and workflows where an image rather than a structured PDF is required.",
    bestFor: ["Creating page previews", "Using a PDF page in an image editor", "Sharing individual pages as pictures"],
    workflow: ["Choose JPG for compact photographic output or PNG when crisp text and lossless graphics matter.", "Render the pages at a resolution appropriate for the final use.", "Remember that the resulting image does not retain the original PDF's selectable text layer."],
    checks: ["Higher output resolution produces larger image files.", "A long PDF can create many output files, so a ZIP is useful for batches.", "Use PDF-to-Word or OCR instead if the real goal is editable text."],
    related: [{ label: "Convert PDF pages to images", slug: "convert-pdf-pages-to-images" }],
  },
  "rotate-pdf": {
    intro: "Rotating a PDF corrects page orientation without changing the underlying purpose of the document. It is especially useful for scans captured sideways or documents containing a mixture of portrait and landscape pages.",
    bestFor: ["Fixing sideways scans", "Correcting upside-down pages", "Normalizing a mixed-orientation document before sharing"],
    workflow: ["Inspect page thumbnails first.", "Rotate only the pages that need correction.", "Open the exported PDF and flip through it to make sure no page was rotated twice."],
    checks: ["Rotation by 90 degrees is not the same as deskewing a page that is tilted by a few degrees.", "Mixed orientation can be valid, so do not rotate every page just to make them uniform.", "Keep the original if the document is important."],
    related: [{ label: "How to rotate a PDF", slug: "how-to-rotate-a-pdf" }],
  },
  "delete-pdf-pages": {
    intro: "Deleting pages creates a cleaned version of an existing PDF. It is useful for removing blank pages, duplicate scans, outdated attachments, or information that is not needed by the recipient.",
    bestFor: ["Removing blank or duplicate pages", "Cleaning a document before submission", "Removing irrelevant pages from a shared copy"],
    workflow: ["Review page thumbnails carefully before deleting.", "Keep the original document as a backup.", "Open the result and confirm page order and page count after the deletion."],
    checks: ["If you only need a small subset, extracting pages can be safer than deleting many pages from a large source.", "Internal references such as page numbers may become outdated after deletion.", "Removing unrelated pages can reduce unnecessary disclosure, but review the document's context before sharing."],
    related: [{ label: "Delete pages from a PDF", slug: "delete-pages-from-a-pdf" }],
  },
  "extract-pdf-pages": {
    intro: "Extracting pages creates a new PDF containing only the pages you select. It is useful when a long report contains a smaller section that another person actually needs.",
    bestFor: ["Sharing a selected chapter or range", "Creating a focused application attachment", "Reducing unnecessary information in a shared copy"],
    workflow: ["Identify the source page numbers carefully.", "Use a continuous range when the relevant section is consecutive.", "Open the extracted PDF and verify its first page, last page, and important tables or signatures."],
    checks: ["Printed page numbers do not always match PDF page indexes.", "Extraction creates a new file; it does not delete pages from the original.", "Keep the source document so you can create another selection later."],
    related: [{ label: "Extract pages from a PDF", slug: "extract-pages-from-a-pdf" }],
  },
  "pdf-to-word": {
    intro: "PDF-to-Word conversion attempts to reconstruct editable document content from a fixed page layout. Simple text-heavy PDFs generally convert more cleanly than complex magazine-style layouts or scans.",
    bestFor: ["Editing text from a simple PDF", "Reusing paragraphs in a Word document", "Moving document content into an editable workflow"],
    workflow: ["Check whether the source PDF already contains selectable text.", "Convert the document and review headings, line breaks, tables, images, and page breaks.", "Treat the converted DOCX as an editable starting point when the source layout is complex."],
    checks: ["PDF and DOCX represent layouts differently, so pixel-perfect conversion is not guaranteed.", "Scanned PDFs may need OCR before the text can become editable.", "Always proofread important converted documents before publishing or submitting them."],
    related: [{ label: "Convert PDF to Word guide", slug: "convert-pdf-to-word" }],
  },
  "word-to-pdf": {
    intro: "Converting a Word document to PDF creates a fixed-layout version that is generally easier to share consistently across devices. It is commonly used for applications, reports, assignments, invoices, and final documents.",
    bestFor: ["Sharing a final document", "Reducing layout differences between devices", "Submitting documents where PDF is the required format"],
    workflow: ["Finish editing the DOCX first.", "Check headings, page breaks, tables, images, and fonts before conversion.", "Open the PDF after export and proofread the final pages rather than assuming the conversion was perfect."],
    checks: ["A PDF preserves a rendered layout, but it does not automatically make the source content immutable or legally signed.", "Unusual fonts and complex layouts can behave differently across conversion engines.", "Keep the editable DOCX as your source copy."],
    related: [{ label: "Word to PDF guide", slug: "convert-word-to-pdf" }],
  },
  "excel-to-pdf": {
    intro: "Excel-to-PDF conversion is useful when a spreadsheet needs to be shared as a fixed document. Spreadsheets are wider and more flexible than PDFs, so page layout deserves particular attention before export.",
    bestFor: ["Sharing a finished report", "Submitting spreadsheet data as a fixed document", "Creating a print-friendly copy"],
    workflow: ["Review columns, print areas, page breaks, and scaling in the source spreadsheet.", "Convert only after the sheet is arranged for the intended page layout.", "Open the PDF and check that headings, totals, and important columns are readable."],
    checks: ["Very wide sheets may need scaling or multiple pages.", "A PDF is not a replacement for the original spreadsheet when recipients need formulas or editable cells.", "Keep the original XLSX for future changes."],
    related: [{ label: "Excel to PDF", slug: "convert-excel-to-pdf" }],
  },
  "ppt-to-pdf": {
    intro: "Converting a presentation to PDF creates a fixed, easy-to-share version of the slides. It is useful when recipients need to read the deck without editing the original presentation.",
    bestFor: ["Sharing slides as a document", "Submitting presentations as PDFs", "Archiving a fixed copy of a deck"],
    workflow: ["Review slide order and important visuals before conversion.", "Check that text, images, and diagrams fit within each page.", "Open the PDF in a viewer and inspect several slides at normal reading size."],
    checks: ["Animations, transitions, embedded media, and interactive elements do not behave like they do in a presentation file.", "Keep the original PPTX when the deck may need editing.", "For print, check page size and margins rather than assuming screen dimensions are ideal."],
    related: [{ label: "PowerPoint to PDF", slug: "convert-ppt-to-pdf" }],
  },
};

export default function ToolLearningSection({ toolId }: { toolId: string }) {
  const content = LEARNING[toolId];
  if (!content) return null;

  return (
    <section className="rounded-2xl border border-line bg-paper p-6 sm:p-8 space-y-7">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2">
          <BookOpen size={18} />
          <span className="font-mono text-xs uppercase tracking-widest">Practical guide</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink">
          What to know before you use this tool
        </h2>
        <p className="mt-3 text-sm text-text-dim leading-relaxed max-w-3xl">{content.intro}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-7">
        <div>
          <h3 className="font-display font-semibold mb-3">Good use cases</h3>
          <ul className="space-y-2 text-sm text-text-dim leading-relaxed">
            {content.bestFor.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold mb-3">A sensible workflow</h3>
          <ol className="space-y-2 text-sm text-text-dim leading-relaxed list-decimal pl-5">
            {content.workflow.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold mb-3">Things worth checking</h3>
        <ul className="space-y-2 text-sm text-text-dim leading-relaxed list-disc pl-5">
          {content.checks.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      {content.related && content.related.length > 0 && (
        <div className="pt-5 border-t border-line">
          <p className="text-xs uppercase tracking-widest text-text-dim mb-3">Continue learning</p>
          <div className="flex flex-wrap gap-2">
            {content.related.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                {item.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
