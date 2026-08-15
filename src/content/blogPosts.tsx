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
    readTimeMinutes: 4,
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
    readTimeMinutes: 5,
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
    readTimeMinutes: 4,
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
    readTimeMinutes: 3,
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
    readTimeMinutes: 3,
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
    readTimeMinutes: 4,
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
    readTimeMinutes: 4,
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
    readTimeMinutes: 3,
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
    readTimeMinutes: 4,
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
    readTimeMinutes: 3,
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
    readTimeMinutes: 2,
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
    readTimeMinutes: 3,
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
    readTimeMinutes: 3,
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
    readTimeMinutes: 2,
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
    readTimeMinutes: 2,
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
