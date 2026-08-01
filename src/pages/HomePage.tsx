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

const WHY_NYAKO = [
  { icon: MonitorSmartphone, title: "Runs in your browser", body: "Every core tool processes files on your device — nothing is uploaded." },
  { icon: LogIn, title: "No login", body: "Every tool works the moment you land on the page. No account needed." },
  { icon: Lock, title: "Privacy first", body: "Your files stay on your device. We can't see them, so we can't leak them." },
  { icon: Zap, title: "Lightning fast", body: "No upload, no queue, no waiting on a server. Processing starts instantly." },
  { icon: Ban, title: "No watermarks", body: "Free tools shouldn't punish you. Your output is clean, every time." },
  { icon: WifiOff, title: "Works offline", body: "Once a tool's loaded, most keep working without an internet connection." },
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
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">
          {category ? CATEGORIES[category].description : "Everything you need, in one place"}
        </h2>

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
