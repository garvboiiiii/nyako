import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";
import { BLOG_POSTS } from "../content/blogPosts";

export default function BlogPage() {
  usePageTitle("Blog");
  useMetaDescription("Guides on file formats, compression, and getting document work done faster — from the team behind Nyako.");
  useCanonicalUrl("/blog");

  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">Blog</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">Guides &amp; tips</h1>
      <p className="text-text-dim mb-10">
        Practical guides on file formats, compression, and getting document work done faster.
      </p>

      <div className="space-y-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-line bg-surface p-6 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all"
          >
            <p className="flex items-center gap-3 text-xs text-text-dim mb-2">
              <span>
                {new Date(post.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readTimeMinutes} min read
              </span>
            </p>
            <h2 className="font-display font-semibold text-lg mb-2">{post.title}</h2>
            <p className="text-sm text-text-dim leading-relaxed mb-4">{post.description}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
              Read <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
