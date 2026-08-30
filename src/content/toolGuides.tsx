/**
 * Extra, genuinely tool-specific content rendered below the FAQ on each
 * tool page. Deliberately NOT generic filler — each entry is written
 * around how that specific tool actually behaves, so it adds real
 * search-intent coverage (the "why did my output look wrong" queries)
 * instead of padding word count with reworded boilerplate.
 */
const COMMON_MISTAKES: Record<string, { title: string; body: string }[]> = {
  "compress-image": [
    {
      title: "Compressing a screenshot or logo the same way as a photo",
      body: "PNG-style images with flat colors and sharp text compress very differently from photographs. Pushing a screenshot through heavy photographic compression can introduce visible blur around text edges. If the image is mostly flat color, try a lighter compression pass first.",
    },
    {
      title: "Not checking the result at 100% zoom",
      body: "A thumbnail preview hides artifacts that show up clearly at full size — especially around faces, small text, and fine textures. Always open the compressed file at its actual size before relying on it for something important.",
    },
    {
      title: "Compressing an already-compressed JPG repeatedly",
      body: "Every time a JPG is re-saved, it loses a little more detail, even at the same quality setting. If you'll need to compress an image more than once, keep the original uncompressed version and compress fresh from it each time.",
    },
  ],
  "transparent-image": [
    {
      title: "Using a busy or shadowed background as the source",
      body: "Background removal works by detecting edges and color contrast. A subject photographed against a cluttered background, or one with a strong shadow, gives the algorithm less to work with — expect a cleaner cutout when the original background is simple and evenly lit.",
    },
    {
      title: "Saving the result as JPG",
      body: "JPG doesn't support transparency at all — it will fill the transparent area with a solid color (usually white) automatically. Transparent output only works when saved as PNG.",
    },
    {
      title: "Not zooming into the edges before using the file",
      body: "Fine details like hair strands, glasses frames, or thin jewelry are the hardest part of any background removal. Check those edges specifically at full zoom before dropping the image into a design or document.",
    },
  ],
  "resize-image": [
    {
      title: "Scaling an image up instead of down",
      body: "Reducing dimensions is lossless in the sense that no new detail needs to be invented. Enlarging a small image, on the other hand, can't add detail that was never captured — the result will look softer than the original, no matter which resize tool is used.",
    },
    {
      title: "Ignoring aspect ratio and stretching the image",
      body: "Typing a new width and height without keeping the original proportions distorts faces and objects noticeably. Unless you specifically need an exact non-proportional size (like a fixed banner slot), keep aspect ratio locked.",
    },
    {
      title: "Resizing for the wrong context",
      body: "A photo meant for print needs far higher pixel dimensions than one meant only for a web page or social post. Decide where the image will actually be used before picking a target size, not after.",
    },
  ],
  "crop-image": [
    {
      title: "Cropping too tight around the subject",
      body: "Especially for ID photos or profile pictures, cropping right up against the edge of a face or object leaves no margin for platforms that apply their own further cropping (like circular profile-picture masks). Leave a small buffer around the subject.",
    },
    {
      title: "Not checking the crop at the final display size",
      body: "A crop that looks fine in a large preview can look off-center or too tight once shown at the small size it'll actually appear at (a thumbnail, an avatar). Preview at realistic size when possible.",
    },
    {
      title: "Cropping before straightening a tilted photo",
      body: "If the original photo is slightly tilted, crop after straightening it, not before — cropping first often means re-cropping again once the image is rotated to level.",
    },
  ],
  "passport-photo": [
    {
      title: "Getting the pixel dimensions right but the file size wrong",
      body: "Most portals specify both a pixel size and a maximum file size (in KB), and they're separate requirements. A correctly sized photo can still be rejected if it's over the KB limit — check both before submitting, not just one.",
    },
    {
      title: "Using an outdated background-color requirement",
      body: "Background color requirements differ by country and by form (white, off-white, light grey are all common) and occasionally change between form cycles. Confirm the current requirement on the actual portal rather than assuming it matches a photo you used before.",
    },
    {
      title: "Smiling or tilting the head in the source photo",
      body: "Most official photo requirements specify a neutral expression and a straight-on, level head position. Fix the framing and background with the tool, but the pose itself needs to be right in the original photo you upload.",
    },
  ],
  "ocr-image": [
    {
      title: "Feeding in a low-resolution or blurry scan",
      body: "Text recognition accuracy depends heavily on how clearly individual characters are defined in the source image. A blurry photo of a document, or a scan taken at a low DPI, will produce noticeably more recognition errors than a sharp, well-lit capture.",
    },
    {
      title: "Not proofreading the extracted text",
      body: "OCR is very good but not perfect — characters that look similar (like '0' and 'O', or 'l' and '1') are the most common source of small errors. Always skim the output against the original before using it for anything important.",
    },
    {
      title: "Trying to OCR handwriting expecting print-level accuracy",
      body: "Printed text recognition is far more reliable than handwriting recognition, since handwriting varies enormously between people. Expect more manual correction when extracting text from handwritten notes versus a printed document.",
    },
  ],
  "convert-image-format": [
    {
      title: "Converting a photo to PNG expecting a smaller file",
      body: "PNG is a lossless format built for flat colors, not photographic detail — converting a photo from JPG to PNG usually makes the file considerably larger, not smaller, with no visible quality gain.",
    },
    {
      title: "Converting to a format the destination doesn't accept",
      body: "WebP is well supported by modern browsers but not universally accepted by every app or older system. Check where the file is going before assuming a newer format will work everywhere JPG or PNG would.",
    },
    {
      title: "Losing transparency by converting to JPG",
      body: "JPG has no transparency channel at all. If the source image has a transparent background, converting to JPG will fill that transparency with a solid color — convert to PNG or WebP instead if transparency needs to be kept.",
    },
  ],
  "image-to-pdf": [
    {
      title: "Mixing portrait and landscape photos without checking the order",
      body: "When several images are combined into one PDF, each keeps its own orientation — a mix of portrait and landscape pages in one document isn't an error, but it's worth reviewing the final PDF before sending it, since the page order matters for how it reads.",
    },
    {
      title: "Using very large original photos without considering final file size",
      body: "Full-resolution phone photos combined into a multi-page PDF can add up quickly in file size. If the PDF needs to be uploaded somewhere with a size limit, consider compressing it after combining the images.",
    },
    {
      title: "Assuming image order matches file upload order automatically",
      body: "Depending on how files are selected, upload order isn't always the order you expect. Always confirm the page sequence in the generated PDF before relying on it.",
    },
  ],
  "merge-pdf": [
    {
      title: "Not checking page order before merging",
      body: "The merged file follows the order the PDFs were added in — if that's not the order a form or reader expects, the result reads out of sequence even though nothing is technically wrong with it.",
    },
    {
      title: "Merging PDFs with inconsistent page sizes without checking",
      body: "Combining a mix of portrait and landscape, or different page-size documents, into one file is completely normal, but the discrepancy is easy to miss until someone else opens it. Scroll through the merged result once before sending.",
    },
    {
      title: "Merging instead of extracting when only certain pages are needed",
      body: "If the goal is actually to pull specific pages out of one document (not combine multiple documents into one), extracting is the right tool, not merging.",
    },
  ],
  "split-pdf": [
    {
      title: "Splitting when extraction was actually needed",
      body: "Splitting breaks every page into its own separate file with no page selection — if you only want a specific range combined into one new document, that's extraction, not splitting.",
    },
    {
      title: "Not renaming the resulting files before sharing multiple pages",
      body: "Splitting a document produces several files at once, often with generic sequential names. If they're being sent onward, a quick rename to something recognizable saves the recipient from opening each one to find the right page.",
    },
    {
      title: "Splitting a document that still needs a table of contents or cover page",
      body: "Once a document is split, context like a shared cover page or table of contents doesn't carry over to every resulting file. Consider whether the split pages need to stand alone or will always be read alongside the others.",
    },
  ],
  "compress-pdf": [
    {
      title: "Targeting the exact size limit instead of comfortably under it",
      body: "Compressing to precisely 25MB for a 25MB email limit leaves zero margin — attachment overhead and encoding can push it slightly over. Target a bit under the actual limit.",
    },
    {
      title: "Not distinguishing text-heavy PDFs from scan-heavy ones",
      body: "A PDF made of scanned pages is really a set of embedded photographs and compresses very differently from a PDF built from typed text. Scanned documents usually need more aggressive compression to hit the same target size.",
    },
    {
      title: "Compressing a document that already has small embedded images",
      body: "If a PDF is already small and text-dominant, aggressive compression settings won't reduce it much further and can start affecting text sharpness for little size benefit. Check the current size before deciding how hard to compress.",
    },
  ],
  "pdf-to-images": [
    {
      title: "Converting every page when only one or two are needed",
      body: "If you only need an image of a specific page (for a thumbnail or preview), converting the entire document wastes time and produces files you'll just delete. Extract the needed pages first if the tool supports it.",
    },
    {
      title: "Not checking image resolution matches the intended use",
      body: "An image meant to be printed needs higher resolution than one meant to be viewed on screen or shared as a thumbnail. Higher resolution also means larger files, so match the setting to where the image is actually going.",
    },
    {
      title: "Assuming all pages convert to identical dimensions",
      body: "If the source PDF mixes portrait and landscape pages, the resulting images will have different dimensions from each other, which can matter if they're being placed into a fixed-size layout afterward.",
    },
  ],
  "rotate-pdf": [
    {
      title: "Rotating the whole document when only one page is sideways",
      body: "Scanned documents often have just one or two pages rotated incorrectly, not the entire file. Rotate only the pages that actually need it rather than the whole document, or you'll turn correctly-oriented pages sideways instead.",
    },
    {
      title: "Confusing 90° clockwise with 90° counter-clockwise",
      body: "It's an easy mistake to rotate a page the wrong direction and end up upside down instead of corrected. Preview the result before downloading, especially on multi-page documents where it's easy to lose track.",
    },
    {
      title: "Not checking how the rotated PDF prints",
      body: "A page that displays correctly on screen can still print sideways if the printer driver interprets page rotation differently. Do a test print if the document is going to be printed, not just viewed digitally.",
    },
  ],
  "delete-pdf-pages": [
    {
      title: "Miscounting page numbers in a long document",
      body: "It's easy to be off by one when counting pages in a long PDF, especially if there's an unnumbered cover page. Double-check the actual page count and preview before deleting, since the operation removes pages permanently from the new file.",
    },
    {
      title: "Deleting instead of extracting",
      body: "If the actual goal is to keep only a few specific pages (not remove a few from a larger set), it's usually faster to extract the pages you want than to delete everything else one by one.",
    },
    {
      title: "Not keeping the original file",
      body: "Since deleting pages creates a new file, keep the original PDF until you've confirmed the edited version has everything it needs — it's much easier to start over from the original than to reconstruct a removed page.",
    },
  ],
  "extract-pdf-pages": [
    {
      title: "Using the wrong page range syntax",
      body: "Getting the comma-and-dash range syntax wrong (like typing a range backwards, e.g. 12-9 instead of 9-12) is the most common reason an extraction doesn't include the expected pages. Double-check the page count shown after upload before typing the range.",
    },
    {
      title: "Extracting when splitting was actually the goal",
      body: "If you want every page as its own separate file (not a specific subset combined together), that's splitting, not extraction — using the wrong one produces either too many files or one file with the wrong pages.",
    },
    {
      title: "Not verifying page order after extraction",
      body: "When pages are listed out of numerical order in the range (e.g. '9,3,7'), the extracted file follows that same order, not the original document order — useful when intentional, confusing when it's a typo.",
    },
  ],
  "pdf-to-word": [
    {
      title: "Expecting a perfect one-to-one layout match",
      body: "PDF is a fixed-layout format and Word is an editable, reflowing one — converting between them is a best-effort translation, not a guarantee. Complex layouts (multi-column text, heavy tables, specific fonts) are the most likely to need manual cleanup afterward.",
    },
    {
      title: "Converting a scanned PDF and expecting editable text",
      body: "A scanned PDF is really a photograph of a page, not actual text — converting it to Word without OCR will just produce an image inside a Word document, not editable text. Run OCR first if the source is a scan.",
    },
    {
      title: "Not checking tables and page breaks after converting",
      body: "Tables and images near a page edge are the most common things to shift slightly during conversion. Skim through the converted document before editing or sending it further.",
    },
  ],
  "word-to-pdf": [
    {
      title: "Using an unusual or non-default font",
      body: "Fonts that aren't broadly available can render slightly differently once flattened into a PDF if the system doing the conversion substitutes a similar font. Stick to common, widely available fonts for documents where exact typography matters.",
    },
    {
      title: "Not checking page breaks around tables and images",
      body: "A table or image positioned near the bottom of a page in Word can shift to a different page once converted, especially if it doesn't fit the remaining space exactly. Review the PDF's page breaks before sending it onward.",
    },
    {
      title: "Converting a document with tracked changes still visible",
      body: "If a Word document has tracked changes or comments left in, they can carry over visibly into the PDF. Accept or reject changes and remove comments first if the final PDF should look clean.",
    },
  ],
  "excel-to-pdf": [
    {
      title: "Not switching to landscape for wide sheets",
      body: "The single most common cause of columns getting cut off in an Excel-to-PDF export is portrait orientation on a sheet wider than one page — landscape solves this for most moderately wide spreadsheets without any other changes.",
    },
    {
      title: "Exporting hidden helper columns and rows by mistake",
      body: "Calculation helper columns that are hidden in the spreadsheet view can still appear in the exported PDF depending on how the export handles hidden cells. Delete or clearly mark anything that shouldn't be in the final document.",
    },
    {
      title: "Trying to fit an extremely wide table onto one page",
      body: "Beyond a certain column count, forcing everything onto one page shrinks text past a readable size. It's often more usable to keep only the relevant columns for the reader, or split the export into a few logical PDFs.",
    },
  ],
  "ppt-to-pdf": [
    {
      title: "Expecting animations and transitions to carry over",
      body: "PDF is a static format — each slide becomes one flat page in its final state, with no build animations or transitions. Keep the .pptx itself if the deck needs to be presented live with animations intact.",
    },
    {
      title: "Not checking text boxes positioned near slide edges",
      body: "Text or images placed close to a slide's edge in PowerPoint can occasionally shift slightly when flattened into a fixed PDF page. Skim through the converted file before sending it as a final version.",
    },
    {
      title: "Converting a deck with speaker notes expecting them included",
      body: "A standard slide-to-PDF export typically shows only the slide content, not the speaker notes underneath each slide. If notes need to be included, check whether the source application offers a 'notes pages' export option before converting.",
    },
  ],
};

export function getCommonMistakes(toolId: string): { title: string; body: string }[] {
  return COMMON_MISTAKES[toolId] ?? [];
}
