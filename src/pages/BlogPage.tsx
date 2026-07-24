import { usePageTitle } from "../lib/usePageTitle";

export default function BlogPage() {
  usePageTitle("Blog");
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <p className="font-display text-xs uppercase tracking-wide text-text-dim mb-3">Blog</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-4">Coming soon</h1>
      <p className="text-text-dim">
        We're writing up guides on file formats, compression, and getting document work done
        faster. Check back soon.
      </p>
    </div>
  );
}
