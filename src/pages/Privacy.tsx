import { usePageTitle } from "../lib/usePageTitle";
import { useMetaDescription } from "../lib/useMetaDescription";
import { useCanonicalUrl } from "../lib/useCanonicalUrl";


  

export default function Privacy() {
  usePageTitle("Privacy Policy");
  useMetaDescription("How Nyako handles your data — what stays on your device, and what our advertising partners collect.");
  useCanonicalUrl("/privacy");
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Last Updated: July 29, 2026
          </p>
        </div>

        <div className="space-y-10 leading-8">

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Your Privacy Matters
            </h2>

            <p>
              Welcome to <strong>Nyako</strong>. We believe your files belong to
              you—not us.
            </p>

            <p className="mt-3">
              Most tools on Nyako process files directly inside your browser,
              meaning your documents never leave your device whenever local
              processing is possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Browser information</li>
              <li>Device information</li>
              <li>Anonymous usage statistics</li>
              <li>Pages visited</li>
              <li>Referral source</li>
            </ul>

            <p className="mt-4">
              We do not collect your personal documents when tools operate
              entirely in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              File Processing
            </h2>

            <p>
              Our goal is to keep your files on your own device.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>No mandatory sign-up.</li>
              <li>No unnecessary uploads.</li>
              <li>No storage of locally processed files.</li>
            </ul>

            <p className="mt-4">
              If a future feature requires server-side processing, Nyako will
              clearly indicate this before any upload takes place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Cookies
            </h2>

            <p>
              We may use cookies to improve your browsing experience, remember
              preferences, measure website performance, and support advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Advertising
            </h2>

            <p>
              Nyako uses Google AdSense to display advertisements.
            </p>

            <p className="mt-3">
              Google may use cookies to provide more relevant advertisements.
            </p>

            <p className="mt-3">
              Learn more:
            </p>

            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Analytics
            </h2>

            <p>
              We may use anonymous analytics to understand how visitors use
              Nyako and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third-Party Services
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Google AdSense</li>
              <li>Google Search Console</li>
              <li>Cloudflare</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Data Security
            </h2>

            <p>
              We use industry-standard security practices to protect our
              website. However, no internet service can guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page along with the updated revision
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Contact
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us.
            </p>

            <p className="mt-3">
              Website:
              <a
                href="https://nyako.co.in"
                className="ml-2 text-blue-600 hover:underline"
              >
                https://nyako.co.in
              </a>
            </p>

            <p className="mt-2">
              Email: nyako.support@gmail.com
            </p>
          </section>

        </div>

        <div className="mt-16 border-t pt-8 text-center text-sm text-neutral-500">
          © 2026 Nyako. Built with privacy in mind.
        </div>

      </div>
    </main>
  );
}
