import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { getPostBySlug } from "../content/blogPosts";
import { getToolById } from "../lib/intent/dictionary";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";


export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  usePageTitle(post?.title ?? "Blog");
  useMetaDescription(post?.description ?? "");
  useCanonicalUrl(`/blog/${slug ?? ""}`);


  if (!post) return <Navigate to="/blog" replace />;

  const relatedTool = getToolById(post.relatedToolSlug);

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-ink transition mb-8 focus-ring">
        <ArrowLeft size={14} /> All guides
      </Link>

      <p className="flex items-center gap-3 text-xs text-text-dim mb-3">
        <span>
          {new Date(post.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {post.readTimeMinutes} min read
        </span>
      </p>

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-8 leading-tight">{post.title}</h1>

      <div className="prose prose-sm max-w-none space-y-4 text-text-dim leading-relaxed
        [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-2
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
        [&_a]:text-primary [&_a]:hover:underline [&_strong]:text-ink [&_strong]:font-semibold">
        {post.content}
      </div>

      {relatedTool && (
        <div className="mt-12 pt-8 border-t border-line">
          <p className="text-xs uppercase tracking-wide text-text-dim mb-3">Try the tool</p>
          <Link
            to={`/tools/${relatedTool.slug}`}
            className="inline-flex items-center gap-2 font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 hover:shadow-md transition-all focus-ring"
          >
            {relatedTool.title} <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </article>
  );
}
