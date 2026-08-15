import type { ReactNode } from "react";

const GUIDE_ENHANCEMENTS: Record<string, ReactNode> = {
  "compress-pdf-for-email": (
    <>
      <h2>How to choose a compression target</h2>
      <p>Start from the requirement rather than choosing the strongest compression setting. If a portal allows 10 MB, aiming for 9 MB gives you a useful safety margin without asking the compressor to destroy more image detail than necessary. For email, a few megabytes is usually a comfortable target, but the exact limit depends on the mail service and whether the message is being sent through another system that adds attachment overhead.</p>
      <p>Scanned documents deserve special attention. A scan is often a collection of photographs inside a PDF, so the document can be visually simple while still being surprisingly large. If the text remains sharp at normal reading size, a moderate reduction is usually preferable to forcing every page into an extremely small file.</p>
      <h2>Why the result can look different</h2>
      <p>Text created directly by a PDF application is often represented as vectors and characters, while scanned text is represented by pixels. A compression pass can preserve ordinary PDF text very well but may need to re-encode scanned page images. That is why a heavily scanned PDF can show a visible quality change sooner than a text-heavy report.</p>
      <h2>A practical quality check</h2>
      <ol><li>Open the compressed PDF at normal reading size.</li><li>Zoom into small printed text, signatures, and numbers.</li><li>Check every page that contains a photograph or scan.</li><li>Confirm the final file size before uploading it.</li></ol>
      <p>If an important document becomes difficult to read, increase the target size and compress again. A slightly larger readable document is almost always better than a tiny document that loses critical information.</p>
    </>
  ),
  "png-vs-jpg-vs-webp": (
    <>
      <h2>Think about the image, not just the extension</h2>
      <p>The best format depends on what the pixels contain. A photograph has thousands of subtle color changes and usually benefits from a compact lossy format. A screenshot with text has sharp edges and repeated colors, so preserving exact edges is more important. Transparency adds another requirement because the file must be able to store an alpha channel.</p>
      <h2>When JPG is the practical choice</h2>
      <p>Use JPG when broad compatibility and a small photographic file are more important than perfect pixel preservation. Repeatedly saving an already compressed JPG can accumulate artifacts, so keep a higher-quality original when the image will be edited several times.</p>
      <h2>When PNG makes more sense</h2>
      <p>PNG is particularly useful for screenshots, diagrams, interface captures, logos, and transparent graphics. It is not automatically “higher quality” for every use; it simply preserves pixel information differently and can be much larger for photographs.</p>
      <h2>When WebP is a good web choice</h2>
      <p>WebP can provide a strong size-to-quality balance for modern websites and supports transparency. Before choosing it for a workflow, check whether the application receiving the file accepts WebP. Keeping the original source is still sensible when compatibility matters.</p>
      <h2>A simple decision rule</h2>
      <ul><li>Photo → JPG or WebP.</li><li>Screenshot, logo, diagram → PNG.</li><li>Transparent web graphic → PNG or WebP.</li><li>Maximum legacy compatibility → JPG or PNG.</li></ul>
    </>
  ),
  "passport-photo-at-home": (
    <>
      <h2>Lighting matters more than an expensive camera</h2>
      <p>A modern phone can capture more than enough detail for many ordinary identification-photo workflows. The harder problem is consistent lighting. Face a large window or another soft light source instead of standing with a bright window behind you. Strong side lighting can create shadows that make the face look uneven and can make background removal harder.</p>
      <h2>Keep the camera position natural</h2>
      <p>Keep the lens roughly level with the face and avoid an extreme wide-angle selfie. Ask someone else to take the photo when possible. Leave some space around the head so the final crop can be adjusted without cutting into hair or the shoulders.</p>
      <h2>Check the official requirement before submitting</h2>
      <p>Photo dimensions are only one part of an official requirement. Different authorities can specify background color, head position, expression, glasses, clothing, lighting, print quality, and even how recently the photo must have been taken. Use Nyako to prepare the file, but verify the current requirement of the authority receiving it.</p>
      <h2>Print versus digital submission</h2>
      <p>A digital application may ask for pixel dimensions and a maximum file size, while a printed application may specify physical dimensions. Those are related but not identical. Do not assume that a correctly cropped digital file automatically produces the correct printed size without checking the print settings.</p>
    </>
  ),
  "merge-multiple-pdfs-into-one": (
    <>
      <h2>Plan the final document before merging</h2>
      <p>Think of the merged PDF as the document another person will actually read. Put the cover or introduction first, then the main material, then supporting documents. If you are preparing an application, check whether the receiving organization specifies a particular order before you combine anything.</p>
      <h2>Keep an untouched original</h2>
      <p>Merging creates a new file, so keep the original PDFs when the documents are important. This makes it easy to correct an ordering mistake or create another version without repeatedly converting the same files.</p>
      <h2>Watch for inconsistent pages</h2>
      <p>Separate PDFs can have different page sizes and orientations. A merged file can therefore contain portrait and landscape pages together. That is not necessarily an error, but it is worth checking the final result before submission.</p>
      <h2>When merging is not enough</h2>
      <p>If you need to remove pages before combining files, delete or extract those pages first. If you need to make a large result easier to upload, compress the merged PDF afterward.</p>
    </>
  ),
  "transparent-signature-for-documents": (
    <>
      <h2>Why a white rectangle appears around signatures</h2>
      <p>A photographed signature is still a rectangular image. Even when the paper looks white to your eyes, the pixels can contain subtle gray or beige values. Placing that rectangle over a document makes the background visible, especially on colored forms or lines.</p>
      <h2>Use a clean source image</h2>
      <p>Sign with a dark pen on a clean, matte sheet and capture the page under even light. Avoid a strong shadow from your phone or hand. A cleaner source gives a background-removal tool a much easier color boundary to identify.</p>
      <h2>Why PNG is important</h2>
      <p>PNG supports transparency, so pixels outside the signature can genuinely become transparent. JPG cannot store transparent pixels. If you export a transparent signature as JPG, the transparent areas have to become a solid color.</p>
      <h2>Check the signature at document scale</h2>
      <p>Do not judge only by a highly zoomed-in preview. Place the signature at approximately the size you will use in the document and inspect the edges. A small amount of softness can look natural, while excessive tolerance can remove thin strokes.</p>
    </>
  ),
  "ocr-extract-text-from-scanned-document": (
    <>
      <h2>OCR works on pixels, not meaning</h2>
      <p>Optical character recognition first has to identify shapes that resemble letters and numbers. That means a clean scan can produce excellent results while a blurry photograph, decorative font, or low-contrast receipt can produce mistakes. OCR should therefore be treated as an extraction step followed by a quick review.</p>
      <h2>Prepare the image first</h2>
      <p>Straighten pages, improve lighting, and avoid tiny low-resolution screenshots when possible. Large printed characters with strong contrast are easier to recognize than faint text against a textured background.</p>
      <h2>Numbers deserve extra checking</h2>
      <p>OCR mistakes in ordinary prose are annoying; mistakes in account numbers, dates, invoice totals, URLs, and serial numbers can be serious. Compare extracted numbers against the source image before using them in an important workflow.</p>
      <h2>Scanned PDF versus selectable PDF</h2>
      <p>If you can already select and copy the text in a PDF, OCR may not be necessary. OCR is most useful when the page is essentially a photograph and there is no real text layer to select.</p>
    </>
  ),
  "resize-image-without-losing-quality": (
    <>
      <h2>Resizing and compression solve different problems</h2>
      <p>Resizing changes the number of pixels. Compression changes how efficiently those pixels are stored. If a camera photo is thousands of pixels wide but the destination only displays a few hundred, reducing its dimensions can save more space while keeping the displayed image sharp.</p>
      <h2>Why stretching looks wrong</h2>
      <p>If width and height are changed independently, circles can become ovals and faces can look wider or narrower. Locking the aspect ratio keeps the original proportions while calculating the matching dimension automatically.</p>
      <h2>Do not enlarge a tiny original expecting detail</h2>
      <p>Upscaling can create a larger file, but it cannot recover information that the original sensor or screenshot never captured. If a form requires a larger dimension, use the highest-quality source you have and avoid repeatedly resizing the same file.</p>
      <h2>A sensible workflow</h2>
      <p>Crop unwanted areas first, resize to the required dimensions, then compress if a file-size limit still applies. Keeping the original untouched lets you repeat the process at a different size later.</p>
    </>
  ),
  "split-pdf-into-separate-pages": (
    <>
      <h2>Split versus extract</h2>
      <p>Splitting usually means breaking a document into smaller pieces, such as one PDF per page or one PDF for each selected range. Extracting is more targeted: you create one new PDF containing only the pages you choose.</p>
      <h2>Useful reasons to split a PDF</h2>
      <p>A long scanned document may contain separate forms, receipts, or chapters that need to be sent to different people. Splitting avoids repeatedly opening and deleting pages in a desktop editor.</p>
      <h2>Check filenames and order</h2>
      <p>When a multi-page file becomes many files, the filenames become part of your workflow. Clear page numbers make it much easier to upload or archive the results without accidentally reversing their order.</p>
      <h2>Keep the source document</h2>
      <p>Splitting does not need to replace the original. Keeping the original is especially useful when you later discover that another page was needed in one of the smaller documents.</p>
    </>
  ),
  "convert-pdf-to-word": (
    <>
      <h2>Why PDF to Word is harder than it sounds</h2>
      <p>A PDF describes how a page should appear, often using precise coordinates for text and graphics. A Word document describes editable content that can reflow when the page changes. Converting between them therefore involves interpretation rather than a simple file-format rename.</p>
      <h2>Simple PDFs usually convert best</h2>
      <p>A document made from ordinary paragraphs and headings is easier to reconstruct than a magazine-style page with multiple columns, floating images, tables, and unusual fonts. Scanned pages are another category because their visible text may only exist as pixels.</p>
      <h2>Alignment is only one part of fidelity</h2>
      <p>Nyako attempts to infer common text alignment and preserve positioning, but complex layouts can still require cleanup. Check headings, tables, columns, line breaks, images, and page breaks before treating the converted DOCX as a final production document.</p>
      <h2>When to use OCR instead</h2>
      <p>If the source is a scanned image-only PDF and you need editable text, OCR is often a better starting point. You can then move the extracted text into a document and format it as needed.</p>
    </>
  ),
  "how-to-crop-an-image": (
    <>
      <h2>Crop for the final use</h2>
      <p>A good crop is not simply the smallest rectangle around the subject. Think about where the image will be used. A profile picture may need a square crop, a website banner may need a wide crop, and a document photo may need extra space around the subject for a later resize.</p>
      <h2>Crop before resizing when possible</h2>
      <p>If a large part of the original frame is unnecessary, remove it before resizing. This prevents the final file from spending pixels and storage on areas that will never be seen.</p>
      <h2>Protect important details</h2>
      <p>Keep faces, signatures, document text, and logos away from the crop edge. For repeated content, use the same aspect ratio so the resulting images feel consistent.</p>
      <h2>Crop versus background removal</h2>
      <p>Cropping removes everything outside a rectangular boundary. It does not isolate an object inside the frame. If you need the background around a signature or logo to become transparent, use a transparency tool instead.</p>
    </>
  ),
  "how-to-rotate-a-pdf": (
    <>
      <h2>Why scanned PDFs get rotated</h2>
      <p>Scanners and phone apps can save pages according to how they were captured rather than how they should be read. A multi-page document can therefore contain one sideways page between otherwise normal portrait pages.</p>
      <h2>Rotate only what needs fixing</h2>
      <p>When a document has mixed orientation, rotating every page can create a new problem. Preview page thumbnails and correct only the pages that are sideways or upside down.</p>
      <h2>Rotation is not deskewing</h2>
      <p>Rotating a page by 90 degrees is different from straightening a scan that is tilted by a few degrees. If text lines are diagonally skewed, the document needs a deskew workflow rather than a simple quarter-turn.</p>
      <h2>Check the final document</h2>
      <p>After rotation, quickly flip through the exported PDF. This catches pages that were accidentally rotated twice and confirms that portrait and landscape pages still make sense together.</p>
    </>
  ),
  "convert-pdf-pages-to-images": (
    <>
      <h2>Why convert a PDF page into an image?</h2>
      <p>Images are convenient when you need a visual preview, a page inside a presentation, a thumbnail for a website, or a raster copy for an image-editing workflow. A PDF is better for document structure; an image is better when the page needs to behave like a picture.</p>
      <h2>PNG or JPG?</h2>
      <p>PNG is a strong choice for sharp text, diagrams, and lossless output. JPG is generally smaller and can be a better fit for photographic pages. The right choice depends on whether crisp edges or compact storage matters more.</p>
      <h2>Remember what changes</h2>
      <p>Once a page is rendered as an image, the original selectable PDF text is no longer available inside that image. If you need editable text, use PDF-to-Word or OCR instead of treating an image export as an editable document.</p>
      <h2>Multi-page output</h2>
      <p>For a long PDF, generating a separate image for every page can create many files. A ZIP keeps those pages together and makes the result easier to move or archive.</p>
    </>
  ),
  "turn-photos-into-a-pdf": (
    <>
      <h2>Turn phone photos into a useful document</h2>
      <p>Phone cameras make it easy to collect scans, receipts, assignments, certificates, and handwritten notes. The problem starts when those images are scattered across a gallery and need to become one ordered document.</p>
      <h2>Order and orientation matter</h2>
      <p>Before exporting, put pages in reading order and check that portrait pages are not sideways. A good preview is more valuable than discovering an ordering mistake after submitting the PDF.</p>
      <h2>Keep the source images</h2>
      <p>The generated PDF is a new representation of your images. Keep the original photos when the document is important so you can recreate the PDF at a different size or quality later.</p>
      <h2>When OCR is useful</h2>
      <p>If the finished PDF needs searchable or selectable text, creating a PDF from photos is only the first step. OCR can be used afterward to turn the visual text into a machine-readable layer.</p>
    </>
  ),
  "delete-pages-from-a-pdf": (
    <>
      <h2>Common reasons to delete pages</h2>
      <p>Blank pages, duplicate scans, outdated attachments, internal notes, and accidental cover pages are common reasons to clean a PDF before sharing it. Removing them can make the final document shorter and easier to review.</p>
      <h2>Review before you delete</h2>
      <p>Page thumbnails can look similar, especially in scanned documents. If the document matters, compare the pages carefully and keep the original file as a backup.</p>
      <h2>Delete versus extract</h2>
      <p>If you want to keep most of a document and remove a few pages, deletion is convenient. If you only need a small subset of pages, extraction can be clearer because you explicitly select what belongs in the new file.</p>
      <h2>After deletion</h2>
      <p>Open the output and confirm that the remaining pages are in the expected order. Also check that references such as “see page 12” still make sense if the document contains internal page references.</p>
    </>
  ),
  "extract-pages-from-a-pdf": (
    <>
      <h2>Extraction is useful when you need only part of a document</h2>
      <p>Long reports often contain a few pages that are relevant to a particular person or application. Extracting those pages creates a focused PDF without distributing the rest of the source document.</p>
      <h2>Think in page ranges</h2>
      <p>For a continuous section, a range such as pages 5–12 is easier to verify than manually selecting many individual pages. Be careful with cover pages and inserted appendices because the visible page number may not match the PDF page index.</p>
      <h2>Extraction and privacy</h2>
      <p>Removing unrelated pages can also reduce unnecessary disclosure. If a document contains personal information that the recipient does not need, consider whether extracting only the relevant pages is appropriate.</p>
      <h2>Check the result</h2>
      <p>Open the extracted PDF before sending it. Confirm the first page, last page, total page count, and any important tables or signatures that span page boundaries.</p>
    </>
  ),
};

export function getBlogEnhancement(slug: string): ReactNode | null {
  return GUIDE_ENHANCEMENTS[slug] ?? null;
}
