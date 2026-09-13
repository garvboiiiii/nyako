import type { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string; // ISO format
  readTimeMinutes: number;
  relatedToolSlug: string;
  content: ReactNode;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "compress-pdf-for-email",
    title: "How to Compress a PDF for Email Without Losing Quality",
    description:
      "Most email providers cap attachments around 25MB. Here's how to shrink a PDF down to size without turning your text into mush.",
    publishDate: "2026-07-20",
    readTimeMinutes: 6,
    relatedToolSlug: "compress-pdf",
    content: (
      <>
        <p>
          If you've ever tried to email a PDF and gotten bounced back with "message too large,"
          you've run into the same wall almost everyone hits eventually. Gmail caps attachments at
          25MB, Outlook at 20MB — and a PDF full of scanned pages or high-resolution images can
          blow past that in a hurry.
        </p>

        <h2>Why PDFs get so big in the first place</h2>
        <p>
          Two things usually cause a bloated PDF: scanned pages saved as high-resolution images
          (a single scanned page at 300 DPI can be 2-3MB on its own), and photos embedded at their
          original camera resolution instead of a web-appropriate size. A 10-page scanned document
          can easily hit 30-40MB, while the same content as properly compressed images might be
          under 2MB.
        </p>

        <h2>The fastest fix: compress before you send</h2>
        <p>
          Rather than manually re-scanning at a lower resolution or fighting with Adobe Acrobat's
          confusing export settings, the quickest path is a dedicated compression tool that
          targets a specific file size. Set a target — say, under 5MB to be safely under any
          provider's limit — and let it handle the quality/resolution tradeoff automatically.
        </p>
        <p>
          Our <a href="/tools/compress-pdf">Compress PDF tool</a> does exactly this: pick a target
          size in MB, and it tries a lossless pass first (which sometimes is enough on its own),
          then progressively re-encodes pages only as much as needed to hit your target — and
          tells you honestly if an extremely aggressive target genuinely isn't reachable without
          making the document unreadable.
        </p>

        <h2>What actually happens when a PDF is compressed</h2>
        <p>
          For scanned or image-heavy PDFs, compression works by re-rendering each page and
          re-encoding it as a JPEG at a slightly lower quality and resolution. This is why very
          aggressive compression can make text look a little softer — there's a real tradeoff
          between file size and sharpness. The good news is that for most everyday use (emailing
          a signed contract, sending a form, sharing a scanned receipt), you can shave off 70-90%
          of the file size before the quality loss becomes noticeable at all.
        </p>

        <h2>A quick tip if you're the one creating the PDF</h2>
        <p>
          If you have control over how the PDF was made in the first place — say, you're
          exporting a Word document or scanning pages yourself — scanning at 150 DPI instead of
          300 DPI, and saving photos as JPEG rather than PNG before inserting them, will produce a
          much smaller file from the start. But if someone already sent you a huge PDF, compressing
          it after the fact works just as well.
        </p>
      </>
    ),
  },
  {
    slug: "png-vs-jpg-vs-webp",
    title: "PNG vs JPG vs WebP: Which Image Format Should You Actually Use?",
    description:
      "Three formats, three very different jobs. Here's a plain-language breakdown of when to use each one — and how to convert between them in seconds.",
    publishDate: "2026-07-22",
    readTimeMinutes: 7,
    relatedToolSlug: "convert-image-format",
    content: (
      <>
        <p>
          If you've ever saved an image and been confronted with a dropdown of format options, you
          know the vague anxiety of picking the wrong one. Here's the short version, followed by
          the slightly longer version for when it actually matters.
        </p>

        <h2>The one-line answer</h2>
        <ul>
          <li><strong>Photos</strong> → JPG</li>
          <li><strong>Logos, screenshots, graphics with text or transparency</strong> → PNG</li>
          <li><strong>Anything going on a website, if you can</strong> → WebP</li>
        </ul>

        <h2>JPG: built for photos</h2>
        <p>
          JPG uses "lossy" compression — it throws away some detail to keep file sizes small,
          betting that your eye won't notice in a photograph full of gradients and natural detail.
          This works great for photos and terribly for anything with sharp edges or flat colors
          (like text or logos), where it introduces visible fuzzy artifacts around the edges.
          JPG also has no transparency support — a "transparent" JPG isn't a real thing.
        </p>

        <h2>PNG: built for precision</h2>
        <p>
          PNG is "lossless" — every pixel is preserved exactly. That makes it the right call for
          screenshots, logos, diagrams, and anything with text in the image, where JPG's
          compression would blur sharp edges. PNG also supports true transparency, which is why
          it's the standard format for things like a transparent signature or a logo you'll place
          over different backgrounds. The tradeoff is file size — a PNG photo can be 5-10x larger
          than the same photo as a JPG.
        </p>

        <h2>WebP: the modern all-rounder</h2>
        <p>
          WebP is a newer format (created by Google) that generally beats both — smaller than JPG
          at equivalent photo quality, and it supports transparency like PNG. Nearly every modern
          browser supports it now. The only real reason to avoid it is compatibility with older
          software that expects a classic JPG or PNG file specifically (some older desktop apps,
          some printers, some legacy systems).
        </p>

        <h2>Converting between them</h2>
        <p>
          If you've got a file in the wrong format — a PNG that should be a much smaller JPG
          before you email it, or a JPG you want to turn into a WebP for a website — our{" "}
          <a href="/tools/convert-image-format">Convert Image Format tool</a> handles all three
          directions instantly, right in your browser. One thing worth knowing: converting a
          transparent PNG to JPG will fill the transparent areas with white, since JPG can't
          represent transparency at all.
        </p>
      </>
    ),
  },
  {
    slug: "passport-photo-at-home",
    title: "How to Take a Passport Photo at Home (Step by Step)",
    description:
      "Skip the photo booth. Here's how to get a compliant passport or visa photo with just your phone and a plain wall.",
    publishDate: "2026-07-24",
    readTimeMinutes: 6,
    relatedToolSlug: "passport-photo",
    content: (
      <>
        <p>
          Passport photo studios are convenient right up until you need one on a Sunday, or you'd
          rather not pay ₹150-300 for what's ultimately a 30-second photo. With a phone and a
          plain wall, you can get a compliant photo in a few minutes.
        </p>

        <h2>What you actually need</h2>
        <ul>
          <li>A plain, evenly lit wall — white or light gray works best</li>
          <li>Natural daylight (stand facing a window) or even overhead room lighting — avoid harsh shadows on one side of your face</li>
          <li>A phone, held at roughly eye level, about arm's length away or a bit further</li>
          <li>A neutral expression, both eyes open, looking straight at the camera</li>
        </ul>

        <h2>Step by step</h2>
        <ol>
          <li>Stand a couple of feet in front of a plain wall so there's no shadow directly behind you.</li>
          <li>Face a window or light source so your face is evenly lit — avoid backlighting (light behind you makes your face too dark).</li>
          <li>Have someone else take the photo, or use a tripod/timer — selfie-arm angles usually distort the photo too much for official use.</li>
          <li>Keep a neutral expression, mouth closed, looking directly at the camera.</li>
          <li>Take a few shots so you have options — small differences in lighting or angle add up.</li>
        </ol>

        <h2>Getting the size right</h2>
        <p>
          This is the part that trips most people up — different countries require different
          exact dimensions (the US wants 2×2 inches, India and the UK want 35×45mm, and so on),
          and just cropping a photo in a generic editor rarely gets it exactly right.
        </p>
        <p>
          Our <a href="/tools/passport-photo">Passport Photo Maker</a> handles this part: upload
          your photo, pick your country's preset, and use the crop tool to frame your face
          correctly — it outputs the exact pixel dimensions required and flattens the photo onto a
          plain white background automatically.
        </p>

        <h2>A couple of things that get photos rejected</h2>
        <p>
          Glasses with glare, shadows across the face, a smile instead of a neutral expression,
          and backgrounds that aren't plain and light are the most common reasons a
          self-taken passport photo gets bounced back. If in doubt, retake it — it costs nothing
          to try again at home, unlike a studio visit.
        </p>
      </>
    ),
  },
  {
    slug: "merge-multiple-pdfs-into-one",
    title: "How to Merge Multiple PDFs Into One File",
    description:
      "Combining scattered PDFs — invoices, scanned forms, chapters of a report — into a single file, in the right order, without installing anything.",
    publishDate: "2026-07-27",
    readTimeMinutes: 5,
    relatedToolSlug: "merge-pdf",
    content: (
      <>
        <p>
          It's a common little chore: you've got three or four separate PDFs — a cover letter, a
          resume, a couple of scanned certificates — and you need to send them as one file, not
          four separate attachments. Here's the fastest way to do it.
        </p>

        <h2>Why order matters more than you'd think</h2>
        <p>
          When you merge PDFs, the order you add them in becomes the final page order in the
          output file. Get this wrong and your cover letter ends up buried in the middle of the
          document instead of on top — a small thing, but it's the kind of detail people notice.
          A good merge tool should let you reorder files before combining them, not just append
          them in upload order.
        </p>

        <h2>The process</h2>
        <ol>
          <li>Gather the PDFs you want to combine into one place so you can find them quickly.</li>
          <li>Upload them to a merge tool — order doesn't have to be perfect on the first pass if you can rearrange afterward.</li>
          <li>Reorder using drag handles or up/down controls until the sequence matches what you want the reader to see first.</li>
          <li>Merge and download — check the page count matches what you expected (a quick way to catch an accidentally-duplicated file).</li>
        </ol>

        <p>
          Our <a href="/tools/merge-pdf">Merge PDF tool</a> does this entirely in your browser —
          you can add as many files as you need, reorder them with simple controls, and the
          combined file never touches a server on the way to your downloads folder.
        </p>

        <h2>One thing to watch for</h2>
        <p>
          If any of the source PDFs are password-protected, most browser-based merge tools
          (including this one) won't be able to open them without the password first. Remove the
          password protection from the individual file before merging, then re-add it to the
          final combined file afterward if you still need it locked.
        </p>
      </>
    ),
  },
  {
    slug: "transparent-signature-for-documents",
    title: "How to Create a Transparent Signature for Digital Documents",
    description:
      "A scanned signature usually comes with a white or off-white background that looks obviously pasted-on. Here's how to make it truly transparent.",
    publishDate: "2026-07-28",
    readTimeMinutes: 5,
    relatedToolSlug: "transparent-image",
    content: (
      <>
        <p>
          Signing a document digitally usually starts the same way: sign your name on a plain
          piece of paper, photograph or scan it, and drop that image into a Word doc or PDF. The
          problem is that a plain photo has a solid white (or slightly grey, depending on your
          scanner) background — so when you place it over any part of a document that isn't pure
          white, you get an ugly rectangle around your signature.
        </p>

        <h2>What "transparent" actually means here</h2>
        <p>
          A transparent PNG has an alpha channel — essentially, per-pixel information about how
          see-through each part of the image is. For a signature, that means the ink strokes stay
          fully visible while the background around them becomes fully invisible, so it blends
          into whatever page or field you place it on.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Sign your name on plain white paper with dark ink — the more contrast between ink and paper, the cleaner the result.</li>
          <li>Photograph or scan it in good, even light so there are no shadows across the paper.</li>
          <li>Upload it to a background-removal tool and select the background color to key out (usually white).</li>
          <li>Adjust the tolerance if some background is left behind or if parts of thin pen strokes get accidentally removed.</li>
          <li>Download as a PNG — the format that actually supports transparency (a JPG can't do this).</li>
        </ol>

        <p>
          Our <a href="/tools/transparent-image">Transparent Signature tool</a> is built exactly
          for this: it keys out a flat background color, lets you fine-tune edge softness and
          opacity so the result doesn't look jagged, and even lets you recolor the signature ink
          if you want it in blue instead of black.
        </p>

        <h2>A tip for a cleaner result</h2>
        <p>
          Sign larger than you think you need to on the original paper, then it can be scaled down
          — signatures that are photographed too small tend to have jagged, pixelated edges once
          the background is removed and they're placed into a document at a larger size.
        </p>
      </>
    ),
  },
  {
    slug: "ocr-extract-text-from-scanned-document",
    title: "How to Extract Text from a Scanned Document (OCR Explained)",
    description:
      "Turning a photo of a page into text you can actually copy, search, and edit — what OCR does, and how to get the cleanest results.",
    publishDate: "2026-07-29",
    readTimeMinutes: 6,
    relatedToolSlug: "ocr-image",
    content: (
      <>
        <p>
          You've got a photo of a printed page — a receipt, a page from a book, a scanned form —
          and you need the actual text out of it, not just a picture of it. That's what OCR
          (Optical Character Recognition) does: it looks at the shapes of letters in an image and
          converts them into real, selectable, searchable text.
        </p>

        <h2>What makes OCR accurate or inaccurate</h2>
        <p>
          OCR engines are pattern-matching against known letterforms, so a few things make a big
          difference to accuracy:
        </p>
        <ul>
          <li><strong>Printed text works far better than handwriting</strong> — consistent fonts are what OCR was trained on.</li>
          <li><strong>Straight, well-lit photos beat angled or shadowy ones</strong> — a skewed photo makes letters look distorted.</li>
          <li><strong>Higher resolution helps</strong> — a blurry or very small photo loses the fine detail that distinguishes similar letters (like "rn" versus "m").</li>
          <li><strong>Plain backgrounds beat busy ones</strong> — text over a patterned or textured surface confuses the letter-detection step.</li>
        </ul>

        <h2>Using it</h2>
        <p>
          Our <a href="/tools/ocr-image">OCR tool</a> runs entirely in your browser using an
          on-device recognition engine — the image never leaves your device. Upload a photo or
          scan, wait a few seconds while it reads the page, then copy the extracted text or
          download it as a .txt file.
        </p>

        <h2>Getting better results</h2>
        <p>
          If the first pass comes out messy, it's almost always a photo-quality issue rather than
          a tool limitation. Retake the photo straight-on (not at an angle), make sure the page
          is well and evenly lit with no glare, and crop out anything that isn't the text itself
          before running it through OCR again.
        </p>
      </>
    ),
  },
  {
    slug: "resize-image-without-losing-quality",
    title: "How to Resize an Image Without Losing Quality",
    description:
      "Stretching or shrinking an image the wrong way turns it blurry or pixelated. Here's how to resize correctly, whatever you're resizing for.",
    publishDate: "2026-08-01",
    readTimeMinutes: 6,
    relatedToolSlug: "resize-image",
    content: (
      <>
        <p>
          Whether you're prepping a photo for a website, fitting an image into a form's upload
          limit, or just need a smaller file to send, resizing seems simple — until the result
          comes out looking stretched, squished, or fuzzy. Here's what actually causes that, and
          how to avoid it.
        </p>

        <h2>The one rule that matters most: aspect ratio</h2>
        <p>
          Every image has a width-to-height ratio — a 1200×800 photo has a ratio of 3:2. If you
          resize to a new width but pick a height that doesn't match that same ratio, the image
          gets stretched or squashed out of shape. This is the single most common resizing mistake,
          and it's why a good resize tool locks width and height together by default: change one,
          and the other adjusts automatically to keep the image looking correct.
        </p>

        <h2>Shrinking vs. enlarging — very different outcomes</h2>
        <p>
          Making an image smaller is safe — you're just discarding detail that isn't needed at the
          smaller size, and it stays sharp. Making an image <em>larger</em> than its original
          resolution is where quality actually degrades: there's no real detail to add, so the
          software has to invent pixels to fill the gap, which is what produces that soft, blurry
          look on enlarged images. If you need a bigger image, the honest answer is that you need
          a higher-resolution original — no resize tool can truly add detail that was never
          captured.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Know your target size before you start — a website banner, a form's required dimensions, a specific pixel width for social media.</li>
          <li>Upload the image and enter the target width (or height).</li>
          <li>Keep "maintain aspect ratio" on unless you specifically need to force a different shape.</li>
          <li>Download and check the result at actual size — not zoomed in, since minor softness is invisible at normal viewing size but obvious when zoomed in.</li>
        </ol>

        <p>
          Our <a href="/tools/resize-image">Resize Image tool</a> handles the aspect-ratio math
          automatically and runs entirely in your browser — upload, set your dimensions, download.
        </p>

        <h2>A tip for social media and forms specifically</h2>
        <p>
          Many platforms and application forms specify exact pixel dimensions (like 1200×630 for a
          social share image, or a specific size for a government form upload). When you know the
          exact numbers required, enter them directly rather than guessing — it avoids the back
          and forth of the platform rejecting your upload for being the wrong size.
        </p>
      </>
    ),
  },
  {
    slug: "split-pdf-into-separate-pages",
    title: "How to Split a PDF Into Separate Pages",
    description:
      "Sometimes you need one page out of a fifty-page PDF, not the whole thing. Here's how to split a document apart cleanly.",
    publishDate: "2026-08-02",
    readTimeMinutes: 5,
    relatedToolSlug: "split-pdf",
    content: (
      <>
        <p>
          A long scanned PDF — a contract, a report, a bundle of forms — is convenient until you
          need to send just one section of it to someone, without forwarding the entire document.
          Splitting solves this by breaking every page into its own separate file.
        </p>

        <h2>Split vs. Extract — they sound similar but do different jobs</h2>
        <p>
          It's worth knowing the difference, since both show up as "PDF page" tools and it's easy
          to grab the wrong one:
        </p>
        <ul>
          <li><strong>Split</strong> turns every single page into its own separate PDF file — useful when you want each page as an independent document.</li>
          <li><strong>Extract</strong> pulls out a specific range of pages (say, pages 3 to 7) into one new combined file — useful when you want a subset, not every page individually.</li>
        </ul>
        <p>
          If you just need "page 4 by itself," split works and you pick out the one file you need
          from the results. If you need "pages 4 through 9 together," extract is the more direct
          tool for that.
        </p>

        <h2>How splitting works</h2>
        <ol>
          <li>Upload the PDF you want to break apart.</li>
          <li>The tool processes every page into its own individual PDF file automatically — no need to specify which pages, since it's all of them.</li>
          <li>Download comes as a ZIP file containing all the individual pages, named in order.</li>
        </ol>

        <p>
          Our <a href="/tools/split-pdf">Split PDF tool</a> does this entirely in your browser —
          upload once, and every page comes back as its own file in a single ZIP download.
        </p>

        <h2>A common use case</h2>
        <p>
          This comes up a lot with scanned multi-document batches — say you scanned ten different
          receipts into one PDF file because that's what the scanner produced, but you actually
          need each receipt as a separate file for an expense report. Splitting turns that one
          scan into ten individual files in a few seconds, instead of re-scanning each one
          separately.
        </p>
      </>
    ),
  },
  {
    slug: "convert-pdf-to-word",
    title: "How to Convert a PDF to Word (and What to Actually Expect)",
    description:
      "PDF-to-Word conversion has a reputation for mangling documents. Here's what it can realistically do, and how to get a usable result.",
    publishDate: "2026-08-03",
    readTimeMinutes: 6,
    relatedToolSlug: "pdf-to-word",
    content: (
      <>
        <p>
          You've got a PDF and you need to actually edit the text in it — fix a typo, update a
          number, rewrite a paragraph. PDFs aren't built to be edited directly, so the usual move
          is converting to a Word document first. Here's what that process can and can't do.
        </p>

        <h2>What conversion actually does</h2>
        <p>
          A PDF-to-Word tool reads the text content out of the PDF and rebuilds it as editable
          paragraphs in a .docx file. For a straightforward, mostly-text document — a letter, a
          simple report, a form's text fields — this works well and gets you a fully editable file.
        </p>

        <h2>Where it gets harder</h2>
        <p>
          Complex layouts are the real challenge for any PDF-to-Word tool, not just ours — multi-
          column text, precise page-break positions, embedded tables with specific formatting, and
          images woven into the text flow are all things that get simplified or lost in translation,
          because a PDF describes exact visual positions while Word describes flowing paragraphs —
          they're fundamentally different ways of representing a page.
        </p>
        <p>
          The other real limit: a <strong>scanned</strong> PDF (a photo of a page, saved as PDF)
          has no actual text in it at all — just a picture that looks like text. No PDF-to-Word
          tool can extract text that was never there in the first place; that needs OCR (optical
          character recognition) first to read the words out of the image.
        </p>

        <h2>How to get the best result</h2>
        <ol>
          <li>Upload your PDF to a conversion tool.</li>
          <li>It extracts the text content page by page into a new Word document.</li>
          <li>Open the result in Word and expect to do some cleanup — reflowing a paragraph here, fixing spacing there — rather than a perfect, untouched replica.</li>
        </ol>

        <p>
          Our <a href="/tools/pdf-to-word">PDF to Word tool</a> handles the text extraction
          entirely in your browser and produces an editable .docx — realistically best for
          text-heavy documents rather than complex, design-heavy layouts.
        </p>

        <h2>If the PDF is scanned, not typed</h2>
        <p>
          If your PDF is a scan (you'll know because you can't select/highlight text in it when
          you open it), run it through an <a href="/tools/ocr-image">OCR tool</a> first to pull
          the text out as actual characters, then work with that text directly — PDF-to-Word
          conversion won't help until there's real text to extract.
        </p>
      </>
    ),
  },
  {
    slug: "how-to-crop-an-image",
    title: "How to Crop an Image the Right Way",
    description:
      "Cropping seems trivial until you're staring at a selection box wondering exactly where to put it. Here's how to frame a crop that actually looks intentional.",
    publishDate: "2026-08-05",
    readTimeMinutes: 5,
    relatedToolSlug: "crop-image",
    content: (
      <>
        <p>
          Cropping is the simplest edit there is — cut away everything outside a box — but getting
          the box in the right place is where most people hesitate. A few basic ideas make it much
          less guesswork.
        </p>

        <h2>Crop with a purpose, not just to remove clutter</h2>
        <p>
          Before dragging a selection box, decide what the crop is actually for. Cropping to remove
          a distracting background is different from cropping to fit a specific platform's required
          shape (square for a profile photo, wide for a banner) — know which one you're doing,
          because it changes where the box should go.
        </p>

        <h2>The rule of thirds, in one sentence</h2>
        <p>
          If you're cropping a photo of a person or subject, avoid dead-centering them — placing
          them slightly off-center (roughly a third of the way from one edge) tends to look more
          natural and considered than a perfectly centered crop, which can feel static.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Upload your image — a selection box appears automatically over it.</li>
          <li>Drag the box to reposition it over the part you want to keep.</li>
          <li>Drag the corner handle to resize the box until the framing looks right.</li>
          <li>Download — only the selected area is exported, at full quality.</li>
        </ol>

        <p>
          Our <a href="/tools/crop-image">Crop Image tool</a> keeps this simple on purpose — drag,
          resize, download, all in your browser with nothing uploaded anywhere.
        </p>

        <h2>A common mistake</h2>
        <p>
          Cropping too tightly around a face or subject can look accidental rather than
          intentional — leaving a little breathing room around the edges of your subject usually
          reads better than a crop that clips right up against them.
        </p>
      </>
    ),
  },
  {
    slug: "how-to-rotate-a-pdf",
    title: "How to Rotate a PDF (Fixing Sideways Scans)",
    description:
      "A scanned page that comes out sideways or upside-down is one of the most common PDF annoyances. Here's the quick fix.",
    publishDate: "2026-08-06",
    readTimeMinutes: 4,
    relatedToolSlug: "rotate-pdf",
    content: (
      <>
        <p>
          It happens to almost everyone who scans documents: the page feeds in the wrong way, and
          the resulting PDF has one or more pages sideways or completely upside down. Rotating fixes
          this without needing to re-scan anything.
        </p>

        <h2>90°, 180°, or 270° — which one do you need?</h2>
        <ul>
          <li><strong>90° or 270°</strong> — for a page that's sideways (text runs top-to-bottom instead of left-to-right).</li>
          <li><strong>180°</strong> — for a page that's fully upside down.</li>
        </ul>
        <p>
          If you're not sure which direction, just try one — if it makes things worse instead of
          better, you'll immediately know to try the other direction instead.
        </p>

        <h2>Rotating just one page vs. the whole document</h2>
        <p>
          It's common for only one or two pages in an otherwise-correct scan to come out sideways
          (usually because a page was fed into the scanner differently from the rest). A good rotate
          tool lets you target specific page numbers instead of rotating everything, so you don't
          accidentally flip pages that were already correct.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Upload the PDF — the page count is detected so you know what you're working with.</li>
          <li>Specify which pages need rotating — all of them, or just the specific ones that are off.</li>
          <li>Pick the rotation angle and download the corrected file.</li>
        </ol>

        <p>
          Our <a href="/tools/rotate-pdf">Rotate PDF tool</a> handles both cases — rotate
          everything at once, or target just the pages that need it, entirely in your browser.
        </p>
      </>
    ),
  },
  {
    slug: "convert-pdf-pages-to-images",
    title: "How to Convert PDF Pages to Images (and Why You'd Want To)",
    description:
      "Sometimes a PDF page needs to become a JPG or PNG — for a presentation slide, a thumbnail, or dropping into an image editor. Here's how and when.",
    publishDate: "2026-08-07",
    readTimeMinutes: 5,
    relatedToolSlug: "pdf-to-images",
    content: (
      <>
        <p>
          PDFs are great for documents, but sometimes you need a page as a plain image instead — to
          paste into a slide deck, use as a thumbnail, or edit in an image tool that doesn't open
          PDFs directly. Converting handles all of these.
        </p>

        <h2>Common reasons to convert a PDF page to an image</h2>
        <ul>
          <li><strong>Presentations</strong> — pasting a PDF page as an image into PowerPoint or Google Slides, since most slide tools don't embed PDFs cleanly.</li>
          <li><strong>Thumbnails or previews</strong> — showing what a document looks like without making the viewer open the whole PDF.</li>
          <li><strong>Further editing</strong> — bringing a page into an image editor (to annotate, crop, or combine with other images) when the editor doesn't support PDFs directly.</li>
        </ul>

        <h2>JPG or PNG — which to pick</h2>
        <p>
          JPG gives smaller files and works well for pages that are mostly scanned photos or
          continuous-tone content. PNG is the better choice for pages with sharp text or line
          diagrams, where JPG's compression can introduce a slight blur or artifacting around
          crisp edges.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Choose your output format (JPG or PNG) before uploading.</li>
          <li>Upload the PDF — every page renders as its own image automatically.</li>
          <li>Download — a single image if there's one page, or a ZIP file if there are several.</li>
        </ol>

        <p>
          Our <a href="/tools/pdf-to-images">PDF to Images tool</a> does this entirely in your
          browser, and works the same whether the PDF has real text or is a scanned document,
          since it renders each page visually either way.
        </p>
      </>
    ),
  },
  {
    slug: "turn-photos-into-a-pdf",
    title: "How to Turn Photos Into a PDF (and Get the Page Order Right)",
    description:
      "Combining a stack of photos into one PDF is easy — the part people actually struggle with is getting them in the right order before converting.",
    publishDate: "2026-08-08",
    readTimeMinutes: 5,
    relatedToolSlug: "image-to-pdf",
    content: (
      <>
        <p>
          Whether it's a set of scanned receipts, photographed pages from a notebook, or product
          photos for a catalog, turning a batch of images into one shareable PDF is a common task.
          The conversion itself is simple — the real challenge is usually just getting the order right.
        </p>

        <h2>Why order trips people up</h2>
        <p>
          When you select multiple files from your phone or computer, they often don't upload in
          the order you'd expect — sometimes alphabetical by filename, sometimes by upload sequence,
          rarely in the actual reading order you want. If a tool just stacks them in upload order
          with no way to check or fix it, you end up with a PDF that reads out of sequence.
        </p>

        <h2>What to look for in a good image-to-PDF tool</h2>
        <ul>
          <li><strong>Visual thumbnails</strong> — so you can actually see which photo is which, not just a filename like "IMG_4821.jpg" that tells you nothing.</li>
          <li><strong>Easy reordering</strong> — simple up/down controls (or drag-and-drop) to fix the sequence without starting over.</li>
          <li><strong>No page limit surprises</strong> — the ability to add as many images as you actually need.</li>
        </ul>

        <h2>How to do it</h2>
        <ol>
          <li>Upload all your images at once, or add them in batches.</li>
          <li>Check the thumbnail previews next to each filename — this is the easiest way to catch an out-of-order photo before converting.</li>
          <li>Use the reorder arrows to fix anything that's out of sequence.</li>
          <li>Convert and download one combined PDF, in the order you confirmed.</li>
        </ol>

        <p>
          Our <a href="/tools/image-to-pdf">Image to PDF tool</a> shows a thumbnail next to every
          file in the list specifically so this ordering step is quick and visual instead of
          guesswork based on filenames.
        </p>
      </>
    ),
  },
  {
    slug: "delete-pages-from-a-pdf",
    title: "How to Delete Pages from a PDF",
    description:
      "A blank page, a duplicate scan, an irrelevant cover sheet — here's how to remove specific pages from a PDF without touching the rest.",
    publishDate: "2026-08-09",
    readTimeMinutes: 4,
    relatedToolSlug: "delete-pdf-pages",
    content: (
      <>
        <p>
          Scanned documents pick up extra pages more often than you'd think — a blank page fed
          through by accident, a duplicate of the same page scanned twice, a cover sheet that
          doesn't need to be in the final file. Deleting specific pages cleans this up without
          having to rebuild the whole document.
        </p>

        <h2>How to specify which pages to remove</h2>
        <p>
          A good delete-pages tool lets you type page numbers directly rather than clicking through
          a page-by-page interface — commas for individual pages, dashes for ranges. For example,
          "2,7,10-12" removes page 2, page 7, and pages 10 through 12 in a single pass.
        </p>

        <h2>What happens to the page numbers after deleting</h2>
        <p>
          Once pages are removed, everything after them shifts up to fill the gap — the same way
          removing a physical page from a printed stack would. If you're deleting multiple pages in
          one go, reference the page numbers from the <em>original</em> document, not a number you
          expect after earlier deletions.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Upload the PDF — the total page count is shown for reference.</li>
          <li>Type the page numbers to remove, using commas and ranges as needed.</li>
          <li>Download the edited file with those pages gone and everything else intact.</li>
        </ol>

        <p>
          Our <a href="/tools/delete-pdf-pages">Delete PDF Pages tool</a> handles this entirely in
          your browser — no page limit, no re-upload needed if you want to remove more afterward.
        </p>
      </>
    ),
  },
  {
    slug: "extract-pages-from-a-pdf",
    title: "How to Extract Specific Pages from a PDF",
    description:
      "Need just a few pages out of a long document, combined into their own file? Here's how extracting differs from splitting, and when to use which.",
    publishDate: "2026-08-10",
    readTimeMinutes: 4,
    relatedToolSlug: "extract-pdf-pages",
    content: (
      <>
        <p>
          If you've got a 40-page report and only need pages 12 through 15 as their own shareable
          file, extracting is the tool built for exactly that — pulling a chosen subset of pages
          out into a new, combined PDF.
        </p>

        <h2>Extract vs. Split — worth knowing the difference</h2>
        <p>
          These two PDF-page tools get confused often because they sound similar:
        </p>
        <ul>
          <li><strong>Extract</strong> pulls specific pages you choose into one new combined file.</li>
          <li><strong>Split</strong> breaks every single page of the document into its own separate file, with no page selection involved.</li>
        </ul>
        <p>
          If you want "just pages 3 to 7, together" — that's extract. If you want "every page as
          its own file" — that's split.
        </p>

        <h2>How to specify a page range</h2>
        <p>
          Type the pages you want using commas for individual pages and dashes for ranges — "1,5,9-12"
          keeps page 1, page 5, and pages 9 through 12, combined into a single new PDF in that order.
        </p>

        <h2>How to do it</h2>
        <ol>
          <li>Upload the PDF — the total page count is shown so you can reference numbers accurately.</li>
          <li>Type the page numbers you want to keep.</li>
          <li>Download a new PDF containing just those pages, in the order you specified.</li>
        </ol>

        <p>
          Our <a href="/tools/extract-pdf-pages">Extract PDF Pages tool</a> runs the whole process
          in your browser — upload, specify, download, with nothing sent to a server.
        </p>
      </>
    ),
  },
  {
    slug: "compress-image-without-losing-quality",
    title: "How to Compress an Image Without Losing Quality",
    description:
      "You don't have to choose between a tiny file and a blurry photo. Here's how smart compression keeps quality intact while hitting your target size.",
    publishDate: "2026-08-15",
    readTimeMinutes: 5,
    relatedToolSlug: "compress-image",
    content: (
      <>
        <p>
          "Compress this image" almost always really means "make this file small enough without
          it looking obviously worse." Those are two different goals, and most tools only let you
          pick a vague quality slider and hope for the best.
        </p>

        <h2>Why "quality %" sliders are the wrong starting point</h2>
        <p>
          A quality percentage doesn't tell you anything about the actual output — 70% quality on
          one photo might produce a 200KB file, and on another photo (more detail, more noise) it
          might produce 900KB. If a form or upload portal has a strict KB limit, guessing a
          percentage means uploading, checking the size, and trying again.
        </p>
        <p>
          It's usually faster to work backwards from the actual requirement: tell the tool the
          target file size you need, and let it figure out the quality and resolution that gets
          you there. That's how our <a href="/tools/compress-image">Compress Image tool</a> works —
          set a target in KB, and it tries a lighter compression pass first, only going further if
          the lighter pass isn't enough.
        </p>

        <h2>What actually causes visible quality loss</h2>
        <p>
          Two separate things happen during compression: the algorithm reduces color/detail
          precision (this is the "quality" part), and past a certain point it may also reduce the
          image's pixel dimensions. Dropping quality slightly is usually invisible. Dropping
          dimensions is more noticeable, especially for images with fine text or sharp edges. A
          good compressor should only touch dimensions as a last resort, after quality reduction
          alone can't hit the target.
        </p>

        <h2>Format choice matters as much as compression</h2>
        <p>
          A photograph saved as PNG is often several times larger than the same photo saved as
          JPG or WebP, for no visible quality benefit — PNG is a lossless format built for flat
          colors and sharp edges (screenshots, logos), not photographic detail. If you're
          uploading a photo and the format is flexible, converting to JPG or WebP first can get
          you most of the size reduction before compression even starts. See our{" "}
          <a href="/blog/png-vs-jpg-vs-webp">format comparison guide</a> for when to use each one.
        </p>

        <h2>A quick pre-upload checklist</h2>
        <ul>
          <li>Know the actual limit (KB or MB) before you start — don't guess.</li>
          <li>Use JPG or WebP for photos, PNG only for screenshots/logos/transparency.</li>
          <li>Set a target slightly under the limit, not right at it.</li>
          <li>Zoom in on faces and text after compressing to confirm it still looks right.</li>
        </ul>

        <p>
          And if the exact target genuinely can't be reached without ruining the image, a good
          tool should tell you that honestly instead of silently destroying quality to force the
          number.
        </p>
      </>
    ),
  },
  {
    slug: "convert-word-to-pdf",
    title: "How to Convert Word to PDF Without Breaking the Formatting",
    description:
      "A .docx that opens perfectly on your laptop can look completely different on someone else's. Here's why, and how converting to PDF fixes it.",
    publishDate: "2026-08-18",
    readTimeMinutes: 4,
    relatedToolSlug: "word-to-pdf",
    content: (
      <>
        <p>
          Send a Word document to five different people and there's a decent chance it renders
          five slightly different ways — a missing font substituted, a table that reflows, margins
          that shift. PDF exists specifically to solve that problem: it locks down exactly how a
          document looks, everywhere it's opened.
        </p>

        <h2>Why Word documents don't look the same everywhere</h2>
        <p>
          A .docx file doesn't embed a full copy of the fonts and layout — it stores instructions,
          and the app rendering it (Word, Google Docs, WPS, an older Word version) fills in the
          rest using whatever fonts are installed locally. If the recipient doesn't have the exact
          font you used, their system substitutes something similar, and spacing quietly shifts
          from there.
        </p>

        <h2>What converting to PDF actually fixes</h2>
        <p>
          A PDF freezes the exact visual layout — fonts, spacing, page breaks, images — into the
          file itself, so it looks identical whether it's opened on a phone, a different OS, or
          five years from now on software that may not exist yet. That's why resumes, contracts,
          invoices, and anything meant to be read (not edited) by someone else are almost always
          sent as PDF, not .docx.
        </p>

        <h2>How to convert without losing anything</h2>
        <ol>
          <li>Upload your .docx file to our <a href="/tools/word-to-pdf">Word to PDF tool</a>.</li>
          <li>It converts entirely in your browser — the document is never uploaded to a server.</li>
          <li>Download the PDF and check page breaks, especially around tables and images near a page edge.</li>
        </ol>

        <h2>One thing worth checking afterward</h2>
        <p>
          Tables and embedded images are the two elements most likely to shift slightly during any
          document conversion, simply because they depend on exact column widths and surrounding
          text flow. It only takes a few seconds to scroll through the PDF and confirm nothing got
          cut off at a page break before you send it.
        </p>
      </>
    ),
  },
  {
    slug: "convert-excel-to-pdf",
    title: "How to Convert Excel to PDF Without Cutting Off Columns",
    description:
      "Excel's default print settings chop wide sheets in half. Here's how to convert a spreadsheet to PDF that actually fits the page.",
    publishDate: "2026-08-20",
    readTimeMinutes: 4,
    relatedToolSlug: "excel-to-pdf",
    content: (
      <>
        <p>
          Everyone's opened a PDF exported from Excel where column F just... stops, and columns
          G through K show up on a second page nobody expected. It's one of the most common
          spreadsheet-to-PDF complaints, and it's almost always a page-width problem, not a bug.
        </p>

        <h2>Why wide sheets get cut off</h2>
        <p>
          A spreadsheet doesn't have "pages" the way a document does — rows and columns can extend
          indefinitely. When you export to PDF, something has to decide where a printed page ends,
          and by default that's usually based on standard page width, not the width of your data.
          If your sheet has 15 columns, it very likely doesn't fit on one portrait page at a
          readable size.
        </p>

        <h2>What to do before converting</h2>
        <ul>
          <li>Decide if the sheet is genuinely meant to be read on paper — if it's just for reference, keeping it as a spreadsheet might be better than PDF at all.</li>
          <li>Hide or delete any columns and rows you don't actually need in the final document.</li>
          <li>If it's wide, landscape orientation alone often solves the cutoff — no other changes needed.</li>
        </ul>

        <h2>Converting the file</h2>
        <p>
          Our <a href="/tools/excel-to-pdf">Excel to PDF tool</a> takes an .xlsx file and converts
          it directly in your browser, with nothing uploaded anywhere. Upload the spreadsheet,
          download the PDF, and check the first page for anything that looks unexpectedly
          truncated before sharing it further.
        </p>

        <h2>If a table still doesn't fit</h2>
        <p>
          For genuinely wide data (dozens of columns), no page orientation will make it fit
          cleanly at a readable font size — and forcing it usually just makes the text
          microscopic. In that case, splitting the sheet into a few logical PDF exports, or
          keeping only the columns relevant to the reader, produces a far more usable document
          than one giant unreadable table.
        </p>
      </>
    ),
  },
  {
    slug: "convert-ppt-to-pdf",
    title: "How to Convert PowerPoint to PDF for Sharing and Printing",
    description:
      "Sending the raw .pptx file means anyone can edit your slides — and animations can look broken outside PowerPoint. Here's when PDF is the better format.",
    publishDate: "2026-08-22",
    readTimeMinutes: 4,
    relatedToolSlug: "ppt-to-pdf",
    content: (
      <>
        <p>
          A .pptx file is built to be edited — that's the whole point of PowerPoint. But once a
          deck is final and just needs to be shared, printed, or attached to an email, that
          editability stops being a feature and starts being a risk: slides can be altered,
          animations depend on having PowerPoint installed, and fonts can substitute on a device
          that doesn't have the ones you used.
        </p>

        <h2>When PDF beats sending the raw .pptx</h2>
        <ul>
          <li><strong>Final, read-only sharing</strong> — a client, recruiter, or reviewer doesn't need to edit your slides, just view them exactly as designed.</li>
          <li><strong>Printing handouts</strong> — a PDF prints identically everywhere; a .pptx depends on the printing app's rendering.</li>
          <li><strong>Email attachments</strong> — recipients without PowerPoint (or with an incompatible version) can still open a PDF with almost anything.</li>
          <li><strong>Portfolio or application submissions</strong> — most upload portals expect PDF, not .pptx.</li>
        </ul>

        <h2>What happens to animations and transitions</h2>
        <p>
          PDF is a static format, so slide transitions and build animations don't carry over —
          each slide becomes one flat page showing its final state. If you specifically need
          animations preserved for playback, keep the .pptx for presenting live and export the PDF
          only as the "read this later" version.
        </p>

        <h2>How to convert it</h2>
        <ol>
          <li>Upload your .pptx to our <a href="/tools/ppt-to-pdf">PPT to PDF tool</a>.</li>
          <li>Conversion happens locally in your browser — the deck isn't sent to a server.</li>
          <li>Download the PDF and skim through it to confirm text boxes and images near slide edges rendered as expected.</li>
        </ol>
      </>
    ),
  },
  {
    slug: "free-pdf-tools-no-signup",
    title: "Free Online PDF Tools That Don't Need a Sign-Up (What to Actually Check)",
    description:
      "\"Free\" tools that demand an account, cap you after 2 files, or quietly upload your documents aren't really free. Here's what to look for instead.",
    publishDate: "2026-08-25",
    readTimeMinutes: 5,
    relatedToolSlug: "merge-pdf",
    content: (
      <>
        <p>
          Search "free PDF tools" and you'll find dozens of sites that are free right up until
          you hit a "Sign up to continue" wall on your second file, or a daily limit that resets
          your patience along with your usage count. A genuinely free tool shouldn't need your
          email address to compress one image.
        </p>

        <h2>Where your file actually goes matters</h2>
        <p>
          Most "free" PDF and image tools work by uploading your file to a server, processing it
          there, and sending the result back. That's not automatically dangerous, but it does mean
          a copy of your document — which might be a signed contract, a form with personal
          details, or a passport photo — briefly exists on someone else's infrastructure, subject
          to whatever their retention and privacy policy actually says (if you bother to read it).
        </p>
        <p>
          A tool that runs entirely in your browser skips that step completely: the file is read,
          processed, and downloaded without ever leaving your device. Nyako's tools — {" "}
          <a href="/tools/compress-pdf">Compress PDF</a>, <a href="/tools/merge-pdf">Merge PDF</a>,{" "}
          <a href="/tools/pdf-to-word">PDF to Word</a>, and the rest — all work this way.
        </p>

        <h2>Four things to check before trusting a "free" tool</h2>
        <ul>
          <li><strong>Does it ask for an account?</strong> A one-off task like merging two PDFs shouldn't require creating a login.</li>
          <li><strong>Is there a hidden file limit?</strong> "Free" that quietly becomes paid after 2–3 uses isn't really free.</li>
          <li><strong>Does the output have a watermark?</strong> Some "free" converters stamp their own branding across your document.</li>
          <li><strong>Where does the file go?</strong> If you can't tell whether it's uploaded to a server, assume it is.</li>
        </ul>

        <h2>The trade-off worth knowing</h2>
        <p>
          Browser-based tools do have one real limitation: very large files (hundreds of MB) can
          be slower to process locally than on a powerful server, since your own device is doing
          the work. For the vast majority of everyday tasks — compressing a photo, merging a few
          PDFs, converting a document — that trade-off is a small price for not uploading personal
          files to a stranger's server in the first place.
        </p>
      </>
    ),
  },
  {
    slug: "passport-photo-file-size-requirements",
    title: "Passport & ID Photo File Size Requirements (And How to Hit Them)",
    description:
      "Passport Seva, visa portals, and exam forms all specify a maximum photo file size — and they're all slightly different. Here's how to get it right the first time.",
    publishDate: "2026-08-27",
    readTimeMinutes: 4,
    relatedToolSlug: "passport-photo",
    content: (
      <>
        <p>
          Getting the photo dimensions right is only half the battle on most government and visa
          portals — the other half is the file size limit, and it trips people up constantly. A
          photo that looks perfectly fine can still get rejected at upload because it's 40KB over
          the cap.
        </p>

        <h2>Why file size limits exist at all</h2>
        <p>
          Government portals process enormous volumes of uploads, so most of them cap photo file
          size (commonly somewhere in the 20KB–300KB range depending on the form) to keep their
          systems fast and storage manageable. The limit has nothing to do with your photo's
          actual quality — a sharp, well-lit photo compressed correctly can easily fit under 50KB
          without looking noticeably different from the original.
        </p>

        <h2>Dimensions and file size are two separate requirements</h2>
        <p>
          It's easy to fix one and forget the other. A photo can be exactly the right pixel
          dimensions (say, 200×230px for many Indian passport and exam forms) and still be too
          large in KB if it wasn't compressed afterward — and vice versa. Both need to be checked
          before you upload.
        </p>

        <h2>A reliable order of operations</h2>
        <ol>
          <li>Crop and size the photo correctly first — use our <a href="/tools/passport-photo">Passport Photo tool</a> for standard passport, visa, and ID dimensions.</li>
          <li>Check the form's specific file size limit — it varies by portal, so don't assume it matches a different form you filled out before.</li>
          <li>If the exported photo is still too large, run it through <a href="/tools/compress-image">Compress Image</a> with the exact KB limit as your target.</li>
          <li>Re-check both dimensions and file size on the final file before uploading.</li>
        </ol>

        <h2>Always confirm on the actual portal</h2>
        <p>
          Requirements do change between form cycles and between agencies — a visa portal's limit
          isn't necessarily the same as an exam board's or a passport office's. Treat any number
          you've seen before as a starting point, not a guarantee, and confirm the current
          requirement on the actual form you're submitting.
        </p>
      </>
    ),
  },
  {
    slug: "reduce-image-size-for-website",
    title: "How to Reduce Image File Size for a Faster Website",
    description:
      "Oversized images are still the most common cause of a slow-loading page. Here's how to shrink them without visibly hurting quality, and which format to start from.",
    publishDate: "2026-08-29",
    readTimeMinutes: 5,
    relatedToolSlug: "compress-image",
    content: (
      <>
        <p>
          A camera or phone captures photos at a resolution meant for printing or zooming in —
          often 3000px or more on the long edge. Almost no website ever displays an image that
          large. If you upload it straight to a blog post or product page without resizing or
          compressing it first, the visitor's browser downloads all of that unused resolution
          before the page can even finish loading.
        </p>

        <h2>Resize before you compress</h2>
        <p>
          Compression alone can only do so much if the image is still 4000px wide. Figure out
          roughly how large the image will actually display (a blog hero image rarely needs to be
          wider than 1600–2000px), and use our <a href="/tools/resize-image">Resize Image tool</a>{" "}
          to bring it down to that size first. This one step often shrinks the file more than
          compression settings alone would.
        </p>

        <h2>Then pick the right output format</h2>
        <p>
          Photos compress best as JPG or WebP; screenshots, logos, and anything with flat colors
          or text compress best as PNG. Using the wrong format for the content is one of the
          quietest ways a page ends up slow — see our{" "}
          <a href="/blog/png-vs-jpg-vs-webp">PNG vs JPG vs WebP guide</a> for the full breakdown,
          and use <a href="/tools/convert-image-format">Convert Image Format</a> to switch.
        </p>

        <h2>Compress to a target, not a guess</h2>
        <p>
          Rather than exporting at a vague "medium quality" setting, our{" "}
          <a href="/tools/compress-image">Compress Image tool</a> lets you set an actual target
          file size in KB. For most web images, aiming for somewhere under 150–250KB per image is
          a reasonable starting point — small enough to load fast, large enough to still look
          sharp at typical display sizes.
        </p>

        <h2>A quick pre-upload checklist</h2>
        <ul>
          <li>Resize to roughly the display size first — not the camera's original resolution.</li>
          <li>Use JPG or WebP for photos, PNG only for graphics that need flat, sharp edges.</li>
          <li>Compress to a specific KB target rather than eyeballing a quality slider.</li>
          <li>Check the image at actual display size afterward, not just zoomed in.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "heic-to-jpg-iphone-photos",
    title: "How to Convert iPhone HEIC Photos to JPG",
    description:
      "iPhones save photos as HEIC by default — a format plenty of older software and upload forms still don't recognize. Here's how to get a JPG copy reliably.",
    publishDate: "2026-09-01",
    readTimeMinutes: 5,
    relatedToolSlug: "convert-image-format",
    content: (
      <>
        <p>
          Since iOS 11, iPhones save photos as HEIC by default — a format that compresses better
          than JPG at the same quality, which is why Apple switched to it. The catch is that
          HEIC support isn't universal. Some upload forms, older Windows software, and certain
          printers still expect a plain JPG and will simply reject a HEIC file outright.
        </p>

        <h2>Why the browser matters here</h2>
        <p>
          Converting an image in the browser depends on the browser being able to open it in the
          first place. Safari on macOS and iOS can decode HEIC natively, so a browser-based
          converter tends to work well there. Chrome and Firefox on Windows generally can't decode
          HEIC on their own, which means a HEIC file may fail to open in <em>any</em>{" "}
          browser-based tool — not just ours — until it's already been converted to something more
          universal.
        </p>

        <h2>The most reliable starting point</h2>
        <p>
          If you're on an iPhone or Mac, try our{" "}
          <a href="/tools/convert-image-format">Convert Image Format tool</a> directly in Safari
          first. If you're on Windows and the file won't open, the fastest fix is exporting a JPG
          copy from the Photos app itself before it ever reaches a browser: open the photo, use
          the share sheet, and choose "Save as JPEG" (or AirDrop/email it to yourself, which
          converts it automatically on many iPhones).
        </p>

        <h2>Stop it from happening again</h2>
        <p>
          If this trips you up often, change the capture format going forward:{" "}
          <strong>Settings → Camera → Formats → "Most Compatible"</strong> saves new photos
          directly as JPG instead of HEIC. It's a slightly larger file per photo, but it removes
          the conversion step entirely for anything you shoot afterward.
        </p>

        <h2>Once you have a JPG</h2>
        <p>
          If the converted photo is now larger than you need, our{" "}
          <a href="/tools/resize-image">Resize Image</a> and{" "}
          <a href="/tools/compress-image">Compress Image</a> tools can bring it down to a
          reasonable size for email or upload, entirely in your browser.
        </p>
      </>
    ),
  },
  {
    slug: "social-media-image-size-guide",
    title: "Image Dimensions for Instagram, Facebook, and LinkedIn",
    description:
      "The pixel dimensions social platforms commonly expect, and how to resize a photo to fit them without an awkward crop.",
    publishDate: "2026-09-02",
    readTimeMinutes: 5,
    relatedToolSlug: "resize-image",
    content: (
      <>
        <p>
          Every platform wants a slightly different shape, and uploading the wrong one usually
          means an automatic crop that cuts off exactly the part of the photo you cared about.
          Here are the dimensions that generally work well as of this writing — platforms do
          update these from time to time, so treat this as a solid starting point and confirm on
          the platform's own help page if precision really matters for a specific campaign.
        </p>

        <h2>Instagram</h2>
        <ul>
          <li>Feed post (portrait, most space in the app): 1080×1350px</li>
          <li>Feed post (square): 1080×1080px</li>
          <li>Story or Reel: 1080×1920px</li>
        </ul>

        <h2>Facebook</h2>
        <ul>
          <li>Shared photo: 1200×630px</li>
          <li>Cover photo: 820×312px</li>
          <li>Profile photo: 720×720px (displays as a circle, so keep the subject centered)</li>
        </ul>

        <h2>LinkedIn</h2>
        <ul>
          <li>Profile photo: 400×400px</li>
          <li>Cover banner: 1584×396px</li>
          <li>Shared post image: 1200×627px</li>
        </ul>

        <h2>If you only remember one rule</h2>
        <p>
          Square (1:1) and portrait-ish (4:5) images are the safest bets across almost every
          platform — they crop predictably and rarely lose the subject. Extremely wide or
          extremely tall images are the ones that get cropped unpredictably.
        </p>

        <h2>Resizing without stretching the photo</h2>
        <p>
          Changing width and height independently distorts faces and objects. Our{" "}
          <a href="/tools/resize-image">Resize Image tool</a> keeps the aspect ratio locked by
          default, and if the source photo's proportions don't match the target at all, crop it to
          the right shape first with <a href="/tools/crop-image">Crop Image</a> — see our{" "}
          <a href="/blog/how-to-crop-an-image">image cropping guide</a> for the basics — then
          resize the cropped result to the exact pixel dimensions above.
        </p>
      </>
    ),
  },
  {
    slug: "crop-photo-to-square",
    title: "How to Crop a Photo to a Perfect Square",
    description:
      "Profile pictures, thumbnails, and app icons almost always want a square. Here's the fastest way to get one without cutting off the wrong part of the photo.",
    publishDate: "2026-09-04",
    readTimeMinutes: 4,
    relatedToolSlug: "crop-image",
    content: (
      <>
        <p>
          Almost every profile photo field — LinkedIn, Slack, GitHub, WhatsApp, app store
          listings — expects a square image, but almost no photo comes out of a camera as a
          square. The result is usually an automatic crop that lops off part of a head or shifts
          the subject off-center.
        </p>

        <h2>Center the subject before you crop</h2>
        <p>
          A square crop only looks right if the important part of the photo — usually a face —
          sits roughly in the middle, with a little breathing room on every side. If the subject
          is off to one side in the original photo, note roughly where you want the final square
          to sit before you start dragging the crop box.
        </p>

        <h2>Lock the aspect ratio to 1:1</h2>
        <p>
          Our <a href="/tools/crop-image">Crop Image tool</a> lets you set a fixed 1:1 aspect
          ratio, so the crop box always stays a perfect square as you resize and reposition it —
          no eyeballing, no accidentally ending up with a slightly-off rectangle that looks wrong
          once it's inside a circular avatar frame.
        </p>

        <h2>Watch out for circular crops</h2>
        <p>
          Many platforms take your square upload and mask it into a circle for the display avatar.
          That means the corners of your square get cut off too — leave a bit of extra margin
          around the subject rather than cropping right up to the edges, or the circular version
          can end up cutting into hair or shoulders.
        </p>

        <h2>After cropping</h2>
        <p>
          If the cropped square is much larger than the platform actually needs, resize it down
          with <a href="/tools/resize-image">Resize Image</a> — most avatar uploads only need to
          be a few hundred pixels wide — and compress it with{" "}
          <a href="/tools/compress-image">Compress Image</a> if there's a file size limit on the
          upload form.
        </p>
      </>
    ),
  },
  {
    slug: "screenshot-to-text-ocr",
    title: "How to Extract Text from a Screenshot",
    description:
      "An error message, a quote, a table locked inside an image — here's how to pull the text back out as something you can actually copy and paste.",
    publishDate: "2026-09-05",
    readTimeMinutes: 4,
    relatedToolSlug: "ocr-image",
    content: (
      <>
        <p>
          A screenshot is just a picture of text, not real text — which is why trying to select
          and copy it does nothing. Optical character recognition (OCR) solves this by scanning
          the image for letter-shaped patterns and turning them back into a text you can paste
          anywhere.
        </p>

        <h2>Get a clean screenshot first</h2>
        <p>
          OCR accuracy depends heavily on the source image. A full-resolution screenshot taken
          directly on your device will read far better than a photo of a screen, or a screenshot
          that's been re-compressed several times by a messaging app before it reached you. If you
          have a choice, take the screenshot yourself rather than using a forwarded copy.
        </p>

        <h2>Run it through OCR</h2>
        <p>
          Upload the screenshot to our <a href="/tools/ocr-image">OCR — Image to Text tool</a>,
          which processes entirely in your browser and returns editable, copyable text within a
          few seconds for most images.
        </p>

        <h2>What trips OCR up specifically on screenshots</h2>
        <ul>
          <li>Very small font sizes, especially UI text meant to be read at native resolution.</li>
          <li>Low-contrast dark mode screenshots, where OCR engines have less edge contrast to work with.</li>
          <li>Emoji, icons, and stylized logos, which OCR will try (and usually fail) to read as letters.</li>
          <li>Dense tables, where column alignment can get scrambled in the extracted text.</li>
        </ul>

        <h2>Always read it back over</h2>
        <p>
          OCR is very good but not perfect, especially on numbers and unusual capitalization.
          Before pasting extracted text somewhere that matters — a form, a number you'll act on —
          compare it against the original screenshot. See our{" "}
          <a href="/blog/ocr-extract-text-from-scanned-document">guide to OCR on scanned documents</a>{" "}
          for the same checking habit applied to full scanned pages.
        </p>
      </>
    ),
  },
  {
    slug: "delete-vs-extract-pdf-pages",
    title: "Delete vs Extract PDF Pages: Which One Do You Need?",
    description:
      "Two PDF tools that sound almost identical but do opposite jobs. Here's a quick way to tell which one actually solves your problem.",
    publishDate: "2026-09-06",
    readTimeMinutes: 4,
    relatedToolSlug: "delete-pdf-pages",
    content: (
      <>
        <p>
          "Remove some pages from this PDF" can mean two genuinely different things, and picking
          the wrong tool means redoing the work. The distinction comes down to which pages you
          actually want to keep — most of them, or only a few.
        </p>

        <h2>Delete pages: keep almost everything</h2>
        <p>
          Use <a href="/tools/delete-pdf-pages">Delete PDF Pages</a> when the majority of the
          document is fine and you just need to remove a handful of specific pages — a blank scan,
          a duplicate, an outdated cover sheet. You select what goes, and everything else stays in
          its original order.
        </p>

        <h2>Extract pages: keep only a few</h2>
        <p>
          Use <a href="/tools/extract-pdf-pages">Extract PDF Pages</a> when it's the opposite —
          you only need a small slice of a much larger document, like pulling out one signed form
          from a 40-page contract bundle. You select what stays, and a brand-new PDF is created
          from just those pages.
        </p>

        <h2>A fast way to decide</h2>
        <p>
          Count which side is shorter. If you'd need to click more pages to mark for deletion than
          you'd need to click to mark for keeping, use Extract instead — it's less clicking and
          less room for error either way.
        </p>

        <h2>What they have in common</h2>
        <p>
          Both tools process the PDF entirely in your browser, leave the original file untouched
          unless you overwrite it yourself, and preserve the quality of every remaining page —
          neither one re-compresses or re-renders anything, it's purely a page-selection
          operation.
        </p>

        <h2>When you genuinely need both</h2>
        <p>
          Occasionally a document needs real restructuring — extract the relevant range from a
          large scanned bundle, then delete a couple of blank pages that ended up inside that
          range. If instead you need the document broken into several separate files rather than
          one trimmed-down file, <a href="/tools/split-pdf">Split PDF</a> is the better fit — see{" "}
          <a href="/blog/split-pdf-by-file-size">our guide on splitting large PDFs</a> for that
          case.
        </p>
      </>
    ),
  },
  {
    slug: "split-pdf-by-file-size",
    title: "How to Split a Large PDF for an Upload Limit",
    description:
      "Sometimes you don't care about specific page ranges — you just need a huge PDF broken into pieces small enough to actually get through an upload limit.",
    publishDate: "2026-09-08",
    readTimeMinutes: 5,
    relatedToolSlug: "split-pdf",
    content: (
      <>
        <p>
          Most PDF splitters, including ours, split by page — you choose where the breaks go, and
          each resulting file contains a specific range of pages. That's slightly different from
          the problem of "this 80MB file won't fit under this portal's 10MB limit," where you don't
          care about page numbers at all, only about getting under a size cap.
        </p>

        <h2>Figure out why it's so large first</h2>
        <p>
          Before splitting anything, check whether the file is large because it's genuinely long,
          or because a handful of image-heavy scanned pages are bloating an otherwise normal
          document. If it's the latter, <a href="/tools/compress-pdf">Compress PDF</a> alone —
          targeting a specific size — might solve the problem without splitting anything at all.
          See our <a href="/blog/compress-pdf-for-email">guide to compressing a PDF for email</a>{" "}
          for the same idea applied to attachment limits.
        </p>

        <h2>A workflow that reliably hits a size target</h2>
        <ol>
          <li>Compress the full document first, if it hasn't been already.</li>
          <li>
            If it's still too large, split it into roughly equal page ranges with{" "}
            <a href="/tools/split-pdf">Split PDF</a> — halves, thirds, or however many pieces get
            each chunk comfortably under the limit.
          </li>
          <li>Check each resulting file's size individually — an uneven document (a few pages with lots of images, the rest plain text) can split unevenly even with equal page counts.</li>
          <li>Compress any chunk that's still over the limit on its own.</li>
        </ol>

        <h2>Keep the pieces in order</h2>
        <p>
          Once a document becomes several files, filenames are the only thing telling you their
          order. Number them clearly (part-1, part-2, and so on) before sending or uploading them,
          especially if they're going somewhere that will display them alphabetically rather than
          in upload order.
        </p>
      </>
    ),
  },
  {
    slug: "why-pdf-to-word-formatting-breaks",
    title: "Why Your PDF to Word Conversion Looks Messy",
    description:
      "Shifted columns, wrong fonts, images in the wrong spot — here's why PDF to Word conversions get messy, and what's actually fixable versus what isn't.",
    publishDate: "2026-09-09",
    readTimeMinutes: 6,
    relatedToolSlug: "pdf-to-word",
    content: (
      <>
        <p>
          PDF was designed to make a document look identical everywhere — every letter and image
          is placed at an exact fixed position on the page. Word documents work completely
          differently: paragraphs, tables, and images flow and reflow based on the document's
          underlying structure. Converting from one to the other means guessing at that structure
          from a file that was never designed to have one.
        </p>

        <h2>What usually converts cleanly</h2>
        <p>
          Simple, single-column documents — reports, letters, plain text-heavy pages without
          complex layout — tend to convert well, because there's relatively little structural
          guessing required. Our <a href="/tools/pdf-to-word">PDF to Word tool</a> handles this
          kind of document reliably, right in your browser.
        </p>

        <h2>What tends to break</h2>
        <ul>
          <li><strong>Multi-column layouts</strong> — newsletters and academic papers can get read out of order, since the converter has to guess the reading flow.</li>
          <li><strong>Tables</strong> — cell borders and alignment don't always translate cleanly into an editable Word table.</li>
          <li><strong>Unusual fonts</strong> — if a font used in the PDF isn't installed on your system, Word substitutes a similar one, which can shift line breaks and spacing.</li>
          <li><strong>Precisely positioned images and text boxes</strong> — a design-heavy flyer or brochure PDF is the hardest case, since it was never meant to reflow at all.</li>
        </ul>

        <h2>Scanned PDFs are a special case</h2>
        <p>
          If a PDF is really just a photograph of a page — common with scanned documents — there's
          no text to convert at all, only pixels. Converting it needs OCR first to actually
          recognize the letters; see our{" "}
          <a href="/blog/ocr-extract-text-from-scanned-document">OCR guide</a> and try{" "}
          <a href="/tools/ocr-image">OCR — Image to Text</a> on the page images before expecting
          an editable result.
        </p>

        <h2>Realistic expectations</h2>
        <p>
          Treat a PDF-to-Word conversion as a strong head start, not a guaranteed perfect replica.
          For anything with tables or multi-column layout, plan to spend a few minutes fixing
          spacing and alignment afterward rather than expecting a pixel-perfect match — that's
          normal, and true of every PDF-to-Word converter, not just this one.
        </p>
      </>
    ),
  },
  {
    slug: "combine-scanned-documents-into-one-pdf",
    title: "How to Combine Multiple Scanned Documents into One PDF",
    description:
      "Several phone scans, forms, or receipts that need to become a single tidy PDF before you submit or email them. Here's a clean workflow.",
    publishDate: "2026-09-10",
    readTimeMinutes: 5,
    relatedToolSlug: "merge-pdf",
    content: (
      <>
        <p>
          Applications and submissions rarely ask for five separate files — they ask for "one PDF
          containing everything." If you scanned each page or document separately with a phone
          camera app, you likely have either several small PDFs or several photos, and need to get
          them into a single ordered document.
        </p>

        <h2>Check your starting point first</h2>
        <p>
          If your scanning app already saved each document as its own PDF, you can merge them
          directly. If instead you have plain photos of each page, convert them to PDF pages first
          with <a href="/tools/image-to-pdf">Image to PDF</a> — see our{" "}
          <a href="/blog/turn-photos-into-a-pdf">guide to turning photos into a PDF</a> — before
          merging anything.
        </p>

        <h2>Get the order right before merging</h2>
        <p>
          Rename or reorder the individual files so they sort in the exact sequence you want the
          final document to read in — cover page or form first, then supporting documents, in
          whatever order the recipient actually expects. It's much easier to fix the order now
          than to reopen a merged file and re-sort it later.
        </p>

        <h2>Merge them</h2>
        <p>
          Upload the files, in order, to our <a href="/tools/merge-pdf">Merge PDF tool</a>. It
          combines them into a single document locally in your browser — nothing is uploaded to a
          server in the process. See our{" "}
          <a href="/blog/merge-multiple-pdfs-into-one">full merging guide</a> for tips on handling
          mixed page sizes and orientations.
        </p>

        <h2>Compress if the result is too large</h2>
        <p>
          Several phone scans merged together can add up quickly, especially at full camera
          resolution. If the combined PDF is too big for an email attachment or upload form, run
          it through <a href="/tools/compress-pdf">Compress PDF</a> with a specific target size —
          our <a href="/blog/compress-pdf-for-email">guide to compressing a PDF for email</a>{" "}
          walks through choosing a sensible target.
        </p>
      </>
    ),
  },
  {
    slug: "excel-to-pdf-columns-cut-off-fix",
    title: "Excel to PDF: How to Stop Columns Getting Cut Off",
    description:
      "Export a wide spreadsheet to PDF and half the columns vanish off the edge of the page. Here's why it happens and how to get a complete, readable PDF.",
    publishDate: "2026-09-11",
    readTimeMinutes: 5,
    relatedToolSlug: "excel-to-pdf",
    content: (
      <>
        <p>
          A spreadsheet doesn't have "pages" the way a document does — it's one continuous grid.
          When you export it to PDF, Excel has to decide where to cut that grid into page-sized
          chunks, and by default it usually cuts by the sheet's normal print area, which was never
          set up with a PDF in mind. The result: columns past a certain point simply don't appear
          on any page.
        </p>

        <h2>Fix the print settings in Excel first</h2>
        <p>
          This is worth fixing at the source rather than after the fact, since a PDF with missing
          columns can't have that data added back in afterward.
        </p>
        <ul>
          <li><strong>Set the print area</strong> to exactly the range you want included — Page Layout → Print Area → Set Print Area.</li>
          <li><strong>Switch to landscape orientation</strong> for wide sheets — Page Layout → Orientation → Landscape.</li>
          <li><strong>Use "Fit to 1 page wide"</strong> under Page Layout → Scale to Fit, so every column shrinks to fit the page width instead of getting cut off.</li>
          <li><strong>Preview page breaks</strong> under View → Page Break Preview to see exactly where Excel plans to split the sheet before you export.</li>
        </ul>

        <h2>Then convert</h2>
        <p>
          Once the print area and layout look right in Excel's own preview, export or save as PDF,
          or upload the file directly to our{" "}
          <a href="/tools/excel-to-pdf">Excel to PDF tool</a>, which converts it locally in your
          browser.
        </p>

        <h2>If you already have the cut-off PDF</h2>
        <p>
          There's no reliable way to recover columns that were never rendered onto any page in the
          first place — the fix has to happen back in the spreadsheet, then be re-converted. If
          the PDF is otherwise fine and only a couple of pages came out sideways or in the wrong
          order, <a href="/tools/rotate-pdf">Rotate PDF</a> and{" "}
          <a href="/tools/extract-pdf-pages">Extract PDF Pages</a> can help clean up the export
          without redoing the whole thing.
        </p>
      </>
    ),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
