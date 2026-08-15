import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function About() {
  useCanonicalUrl("/about");
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">About Nyako</h1>

      <div className="space-y-6 leading-8">
        <p>
          Nyako is a free collection of file, image, and PDF tools built with one goal:
          making everyday file tasks simple, private, and accessible to everyone.
        </p>

        <p>
          Unlike many online tools, Nyako avoids unnecessary sign-ups, watermarks,
          and premium paywalls. Whenever possible, files are processed directly in
          your browser, helping keep your data private.
        </p>

        <p>
          Our mission is to create fast, reliable, and privacy-first tools that
          anyone can use without barriers.
        </p>

        <h2 className="text-2xl font-semibold pt-6">Our Principles</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Privacy First</li>
          <li>No Login Required</li>
          <li>No Watermarks</li>
          <li>Free to Use</li>
          <li>Fast Browser-Based Processing</li>
        </ul>

        <p>
          Nyako is continuously evolving with new tools and improvements.
        </p>
      </div>
    </main>
  );
}
