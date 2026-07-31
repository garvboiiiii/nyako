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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
