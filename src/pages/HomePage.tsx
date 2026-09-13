import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  MonitorSmartphone,
  Lock,
  Zap,
  Ban,
  WifiOff,
  LogIn,
} from "lucide-react";
import CommandBar from "../components/CommandBar";
import HeroBackground from "../components/HeroBackground";
import PrivacyBadges from "../components/PrivacyBadges";
import CategoryFilter from "../components/CategoryFilter";
import ToolCard from "../components/ToolCard";
import RecentAndFavorites from "../components/RecentAndFavorites";
import HomeDropZone from "../components/HomeDropZone";
import { TOOLS, CATEGORIES, type CategoryId } from "../lib/intent/dictionary";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import JsonLd from "../components/JsonLd";
import { webApplicationSchema, faqPageSchema } from "../lib/schema";
import { BLOG_POSTS, getPostBySlug } from "../content/blogPosts";

const SUGGESTION_CHIPS = [
  { label: "Compress Image", slug: "compress-image" },
  { label: "Merge PDF", slug: "merge-pdf" },
  { label: "Passport Photo", slug: "passport-photo" },
  { label: "Transparent Signature", slug: "transparent-image" },
  { label: "Background Remover", slug: "transparent-image" },
];

const POPULAR_TOOL_IDS = [
  "compress-image",
  "passport-photo",
  "transparent-image",
  "merge-pdf",
  "split-pdf",
  "resize-image",
  "crop-image",
  "image-to-pdf",
  "compress-pdf",
  "ocr-image",
];

// Hand-picked spread across categories (PDF, image, conversion, OCR,
// compression, signature, passport) rather than a pure "most recent" sort,
// so the homepage always surfaces a mix of cornerstone and newer guides
// instead of only whatever was published last.
const FEATURED_GUIDE_SLUGS = [
  "compress-pdf-for-email",
  "png-vs-jpg-vs-webp",
  "passport-photo-at-home",
  "merge-multiple-pdfs-into-one",
  "transparent-signature-for-documents",
  "screenshot-to-text-ocr",
  "social-media-image-size-guide",
  "delete-vs-extract-pdf-pages",
  "excel-to-pdf-columns-cut-off-fix",
];

// One representative guide per topic, used for the quick-link row under the
// guides heading — gives crawlers and readers another path into the guide
// library, grouped by the kind of problem rather than publish date.
const GUIDE_TOPICS: { label: string; slug: string }[] = [
  { label: "Compression", slug: "reduce-image-size-for-website" },
  { label: "PDF pages", slug: "delete-vs-extract-pdf-pages" },
  { label: "Image formats", slug: "png-vs-jpg-vs-webp" },
  { label: "OCR", slug: "screenshot-to-text-ocr" },
  { label: "Signatures", slug: "transparent-signature-for-documents" },
  { label: "Passport photos", slug: "passport-photo-file-size-requirements" },
  { label: "Office to PDF", slug: "excel-to-pdf-columns-cut-off-fix" },
];

const WHY_NYAKO = [
  { icon: MonitorSmartphone, title: "Runs in your browser", body: "Most core tools process files on your device — nothing is uploaded for those local tools." },
  { icon: LogIn, title: "No login", body: "Every tool works the moment you land on the page. No account needed." },
  { icon: Lock, title: "Privacy first", body: "For tools that process locally, your files stay on your device. The individual tool page explains its processing model." },
  { icon: Zap, title: "Lightning fast", body: "No upload, no queue, no waiting on a server. Processing starts instantly." },
  { icon: Ban, title: "No watermarks", body: "Free tools shouldn't punish you. Your output is clean, every time." },
  { icon: WifiOff, title: "Works offline", body: "Once a tool's loaded, most keep working without an internet connection." },
];

const CATEGORY_LINKS: { category: CategoryId; example: string; slug: string }[] = [
  { category: "pdf", example: "compressing a PDF for email", slug: "compress-pdf-for-email" },
  { category: "image", example: "resizing photos for social media", slug: "social-media-image-size-guide" },
  { category: "conversion", example: "converting Excel to a clean PDF", slug: "excel-to-pdf-columns-cut-off-fix" },
  { category: "ocr", example: "pulling text out of a screenshot", slug: "screenshot-to-text-ocr" },
];

const FAQS = [
  {
    q: "Do you store my files?",
    a: "No. Every core tool processes your file inside your own browser. It's never uploaded anywhere, so there's nothing on a server to leak, sell, or lose.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. Every tool works the moment you land on the page. An account is only ever optional, for saving history later.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The core tools stay free, supported by unobtrusive ads — never by watermarking or limiting your files.",
  },
  {
    q: "How can browser-based tools be as capable as server-based ones?",
    a: "Modern browsers can run genuinely fast image and PDF processing locally, using the same JavaScript engine that renders the rest of the page. For everyday tasks — compressing a photo, merging a few PDFs, converting a document — that's more than enough power, without needing to send your file anywhere first.",
  },
  {
    q: "Will my file quality get worse using these tools?",
    a: "Not more than any equivalent desktop tool would. Compression tools reduce file size by design, but you control the target — and lossless operations like merging, splitting, or rotating don't touch image or text quality at all.",
  },
  {
    q: "Is there a file size limit?",
    a: "Since processing happens on your own device, the practical limit is your device's memory rather than an artificial cap we impose. Very large files (several hundred MB) may take longer to process locally than a smaller one, but there's no arbitrary upload ceiling.",
  },
  {
    q: "Does Nyako work on mobile?",
    a: "Yes — every tool works in a mobile browser the same way it does on desktop, since the processing happens locally either way. No app install is required.",
  },
  {
    q: "What happens if I close the tab midway through a task?",
    a: "Since nothing is uploaded to a server, closing the tab simply stops the local process — there's no partial upload sitting somewhere. Just reopen the tool and start again.",
  },
];

export default function HomePage() {
  useCanonicalUrl("/");
  const location = useLocation();
  const [category, setCategory] = useState<CategoryId | null>(null);

  // Scroll to the right section when arriving via a header nav link like
  // "/#tools" from another page.
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  const displayedTools = useMemo(() => {
    if (category === null) return TOOLS.filter((t) => POPULAR_TOOL_IDS.includes(t.id));
    return TOOLS.filter((t) => t.category === category);
  }, [category]);

  const remainingTools = useMemo(() => {
    if (category !== null) return [];
    const shown = new Set(POPULAR_TOOL_IDS);
    return TOOLS.filter((t) => !shown.has(t.id));
  }, [category]);

  return (
    <>
      <JsonLd data={[webApplicationSchema(), faqPageSchema(FAQS)]} />
      <HomeDropZone />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-14 sm:pb-20">
        <HeroBackground />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
            Tell us what you need.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-text-dim">One search. Every file task.</p>

          <div className="mt-10">
            <CommandBar />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {SUGGESTION_CHIPS.map((chip) => (
              <Link
                key={chip.label}
                to={`/tools/${chip.slug}`}
                className="text-sm px-3.5 py-1.5 rounded-full border border-line bg-surface hover:border-primary/40 hover:text-primary transition focus-ring"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#tools"
              className="font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 hover:shadow-md transition-all focus-ring inline-flex items-center gap-1.5"
            >
              Search Tools <ArrowRight size={15} />
            </a>
            <a
              href="#tools"
              className="font-display text-sm border border-line px-5 py-2.5 rounded-full font-medium hover:border-primary/40 hover:text-primary transition focus-ring"
            >
              Browse All Tools
            </a>
          </div>

          <PrivacyBadges className="mt-8" />
        </div>
      </section>

      <RecentAndFavorites />

      {/* POPULAR TOOLS / CATEGORIES */}
      <section id="tools" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3 text-center">
          {category ? CATEGORIES[category].label : "Popular Tools"}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-4">
          {category ? CATEGORIES[category].description : "Everything you need, in one place"}
        </h2>

        {category === null && (
          <p className="text-center text-text-dim max-w-2xl mx-auto mb-8 leading-relaxed">
            Nyako bundles the file tasks people actually run into — <Link to="/tools/compress-pdf" className="text-primary hover:underline">compress a PDF</Link>{" "}
            down to a target size, <Link to="/tools/merge-pdf" className="text-primary hover:underline">merge PDFs</Link>{" "}
            into one document, <Link to="/tools/passport-photo" className="text-primary hover:underline">crop a passport photo</Link>{" "}
            to spec, or <Link to="/tools/convert-image-format" className="text-primary hover:underline">convert between image formats</Link>{" "}
            — as a single free toolkit instead of nineteen different websites. Pick a category below,
            or search for what you need at the top of the page.
          </p>
        )}

        <CategoryFilter selected={category} onChange={setCategory} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {remainingTools.length > 0 && (
          <div className="mt-8 pt-8 border-t border-line">
            <p className="text-xs uppercase tracking-widest text-text-dim mb-3">More tools</p>
            <div className="flex flex-wrap gap-2">
              {remainingTools.map((t) => (
                <Link
                  key={t.id}
                  to={`/tools/${t.slug}`}
                  className="text-sm px-3 py-1.5 rounded-full border border-line bg-surface hover:border-primary/40 hover:text-primary transition focus-ring"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* LEARNING / GUIDES */}
      <section id="guides" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Learn</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Practical guides for file work</h2>
            <p className="mt-3 text-text-dim max-w-2xl leading-relaxed">
              The tool is only part of the job. These {BLOG_POSTS.length} guides explain file
              formats, compression targets, document conversion quirks, and the checks that help
              you avoid the most common mistakes — from getting a{" "}
              <Link to="/blog/passport-photo-file-size-requirements" className="text-primary hover:underline">
                passport photo under a KB limit
              </Link>{" "}
              to figuring out why a{" "}
              <Link to="/blog/why-pdf-to-word-formatting-breaks" className="text-primary hover:underline">
                PDF to Word conversion looks messy
              </Link>.
            </p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline shrink-0">
            View all {BLOG_POSTS.length} guides <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {GUIDE_TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              to={`/blog/${topic.slug}`}
              className="text-sm px-3.5 py-1.5 rounded-full border border-line bg-surface hover:border-primary/40 hover:text-primary transition focus-ring"
            >
              {topic.label}
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_GUIDE_SLUGS.map(getPostBySlug)
            .filter((post): post is NonNullable<typeof post> => Boolean(post))
            .map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-2xl border border-line bg-surface p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <p className="text-xs text-text-dim mb-2">
                  {new Date(post.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  <span className="mx-2">•</span>{post.readTimeMinutes} min read
                </p>
                <h3 className="font-display font-semibold leading-snug group-hover:text-primary transition">{post.title}</h3>
                <p className="mt-2 text-sm text-text-dim leading-relaxed">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read guide <ArrowRight size={14} />
                </span>
              </Link>
            ))}
        </div>
      </section>

      {/* WHY NYAKO */}
      <section id="features" className="bg-paper border-y border-line scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3 text-center">Why Nyako</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-12">Built to earn your trust</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_NYAKO.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold mb-1">{item.title}</p>
                  <p className="text-sm text-text-dim leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center scroll-mt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Pricing</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Free. No plans. No paywalls.</h2>
        <p className="text-text-dim max-w-lg mx-auto leading-relaxed">
          Every tool on Nyako is free to use, with no file limits and no watermarks. We keep the
          lights on with unobtrusive ads — never by charging for the tools themselves.
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-paper border-y border-line scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">About</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Why we built Nyako</h2>
          <p className="text-text-dim max-w-lg mx-auto leading-relaxed">
            File tools online are usually slow, ad-choked, and ask you to upload personal documents
            to a stranger's server. Nyako runs everything on your own device instead — so it's
            faster, and there's simply nothing of yours for us to lose.
          </p>
          <p className="text-text-dim max-w-lg mx-auto leading-relaxed mt-4">
            That covers everyday jobs like{" "}
            {CATEGORY_LINKS.map((c, i) => (
              <span key={c.slug}>
                <Link to={`/blog/${c.slug}`} className="text-primary hover:underline">
                  {c.example}
                </Link>
                {i < CATEGORY_LINKS.length - 2 ? ", " : i === CATEGORY_LINKS.length - 2 ? ", and " : ""}
              </span>
            ))}
            {" "}— all covered in our <Link to="/blog" className="text-primary hover:underline">guides</Link>{" "}
            if you want the details behind the tool.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3 text-center">FAQ</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">Good questions</h2>
        <div className="divide-y divide-line">
          {FAQS.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="font-display font-semibold mb-2">{f.q}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
