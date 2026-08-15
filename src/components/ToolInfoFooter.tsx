import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Lightbulb, ShieldCheck } from "lucide-react";
import { getToolById, getRelatedByCategory, CATEGORIES } from "../lib/intent/dictionary";
import { BLOG_POSTS } from "../content/blogPosts";

export default function ToolInfoFooter({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  const related = getRelatedByCategory(toolId, 4);
  const relatedPost = BLOG_POSTS.find((p) => p.relatedToolSlug === toolId);

  return (
    <div className="mt-12 space-y-10">
      <section>
        <h2 className="font-display text-xl font-semibold text-ink mb-3">{tool.title}: what this tool does</h2>
        <p className="text-sm text-text-dim leading-relaxed max-w-3xl">{tool.longDescription}</p>
      </section>

      <section>
        <h2 className="font-display text-sm uppercase tracking-wide text-text-dim mb-4">How it works</h2>
        <ol className="grid sm:grid-cols-3 gap-4">
          {tool.howItWorks.map((step, i) => (
            <li key={i} className="rounded-xl border border-line bg-surface p-4">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-ink mt-1.5 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-sm uppercase tracking-wide text-text-dim mb-4">When this tool is useful</h2>
        <ul className="grid sm:grid-cols-3 gap-3">
          {tool.whyUseIt.map((item) => (
            <li key={item} className="rounded-xl border border-line bg-surface p-4 flex gap-3 text-sm text-text-dim leading-relaxed">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {tool.supportedFormats.length > 0 && (
        <section>
          <h2 className="font-display text-sm uppercase tracking-wide text-text-dim mb-4">Supported formats</h2>
          <div className="flex flex-wrap gap-2">
            {tool.supportedFormats.map((f) => (
              <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full border border-line bg-surface text-text-dim">
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={17} className="text-primary" />
          <h2 className="font-display text-sm uppercase tracking-wide text-text-dim">Tips for better results</h2>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-sm text-text-dim leading-relaxed">
          {tool.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={17} className="text-primary" />
          <h2 className="font-display text-sm uppercase tracking-wide text-text-dim">What to expect</h2>
        </div>
        <p className="text-sm text-text-dim leading-relaxed">{tool.limitations}</p>
      </section>

      {tool.faq.length > 0 && (
        <section>
          <h2 className="font-display text-sm uppercase tracking-wide text-text-dim mb-4">Frequently asked questions</h2>
          <div className="divide-y divide-line rounded-xl border border-line bg-surface overflow-hidden">
            {tool.faq.map((f) => (
              <div key={f.q} className="p-4">
                <p className="font-display font-semibold text-sm mb-1.5">{f.q}</p>
                <p className="text-sm text-text-dim leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedPost && (
        <section>
          <Link
            to={`/blog/${relatedPost.slug}`}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 hover:border-primary/40 transition group"
          >
            <span className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen size={16} className="text-primary" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-text-dim">Related guide</span>
              <span className="block font-display font-semibold text-sm group-hover:text-primary transition">{relatedPost.title}</span>
            </span>
          </Link>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-sm uppercase tracking-wide text-text-dim mb-4">
            More {CATEGORIES[tool.category].label.toLowerCase()} tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.slug}`}
                className="text-sm px-3.5 py-1.5 rounded-full border border-line bg-surface hover:border-primary/40 hover:text-primary transition focus-ring"
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
