import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function Privacy() {
  useCanonicalUrl("/privacy");
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Last Updated: August 15, 2026
          </p>
        </div>

        <div className="space-y-10 leading-8">

          {/* Your Privacy Matters */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Your Privacy Matters
            </h2>

            <p>
              Welcome to <strong>Nyako</strong>. We believe your files belong
              to you—not us.
            </p>

            <p className="mt-3">
              Most tools on Nyako process files directly inside your browser,
              meaning your documents and images do not leave your device when
              local processing is possible.
            </p>

            <p className="mt-3">
              This Privacy Policy explains what information may be collected
              when you use Nyako and how third-party services used by the
              website may process information.
            </p>
          </section>


          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>

            <p>
              Nyako may collect or receive limited technical and usage
              information through the website and third-party services,
              including:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Browser type and version</li>
              <li>Device and operating system information</li>
              <li>Approximate geographic information</li>
              <li>Pages visited and interactions with the website</li>
              <li>Referral source</li>
              <li>Session and usage statistics</li>
              <li>Information collected through cookies and similar technologies</li>
            </ul>

            <p className="mt-4">
              We do not intentionally collect personally identifiable
              information through the file-processing tools themselves.
            </p>
          </section>


          {/* File Processing */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              File Processing
            </h2>

            <p>
              Nyako is designed with privacy-focused, client-side processing
              wherever technically possible.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>No mandatory account or sign-up is required.</li>
              <li>
                Files processed entirely in your browser are not uploaded to
                Nyako's servers.
              </li>
              <li>
                Nyako does not intentionally store files that are processed
                entirely on your device.
              </li>
            </ul>

            <p className="mt-4">
              If a future feature requires server-side processing or uploading
              a file, Nyako will clearly communicate this before the relevant
              file is transmitted.
            </p>
          </section>


          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Cookies and Similar Technologies
            </h2>

            <p>
              Nyako and its third-party service providers may use cookies,
              local storage, pixels, or similar technologies to operate the
              website, measure traffic, understand usage, remember
              preferences, and support advertising.
            </p>

            <p className="mt-3">
              Google Analytics 4 may use first-party cookies, including the
              <code className="mx-1 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                _ga
              </code>
              cookie, to distinguish users and sessions.
            </p>

            <p className="mt-3">
              You can control or delete cookies through your browser settings.
              Disabling certain cookies may affect some website functionality
              or measurement.
            </p>
          </section>


          {/* Google Analytics */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Google Analytics 4
            </h2>

            <p>
              Nyako uses <strong>Google Analytics 4 (GA4)</strong> to understand
              how visitors use the website and to improve its tools,
              performance, and user experience.
            </p>

            <p className="mt-3">
              Depending on the configuration and applicable settings, Google
              Analytics may process information such as browser and device
              information, session statistics, approximate geographic
              information, pages viewed, and interactions with the website.
            </p>

            <p className="mt-3">
              Google Analytics may use cookies and similar technologies to
              distinguish users and sessions.
            </p>

            <p className="mt-3">
              We do not intentionally send personally identifiable information,
              such as the contents of your files, to Google Analytics.
            </p>

            <p className="mt-3">
              Learn more about how Google Analytics handles data:
            </p>

            <a
              href="https://support.google.com/analytics/answer/6004245"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              Google Analytics — Safeguarding Your Data
            </a>
          </section>


          {/* Advertising */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Advertising
            </h2>

            <p>
              Nyako uses <strong>Google AdSense</strong> to display
              advertisements.
            </p>

            <p className="mt-3">
              Google and its advertising partners may use cookies, local
              storage, or similar technologies to serve, measure, and
              personalize advertisements, subject to applicable settings and
              user consent requirements.
            </p>

            <p className="mt-3">
              Advertising cookies may be used for purposes such as
              frequency capping, reporting, measuring advertising performance,
              and, where permitted, personalized advertising.
            </p>

            <p className="mt-3">
              Learn more about how Google uses cookies for advertising:
            </p>

            <a
              href="https://support.google.com/adsense/answer/7549925"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              Google AdSense — How AdSense Uses Cookies
            </a>

            <p className="mt-3">
              Users can also manage Google's advertising personalization
              settings through Google's advertising controls.
            </p>
          </section>


          {/* Consent */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Privacy Choices and Consent
            </h2>

            <p>
              Depending on your location and applicable privacy laws, you may
              be asked to provide consent before certain analytics, advertising,
              cookies, or similar technologies are used.
            </p>

            <p className="mt-3">
              In particular, Google requires publishers using AdSense to
              provide appropriate disclosures and obtain consent where
              legally required for users in the European Economic Area (EEA),
              the United Kingdom, and Switzerland.
            </p>

            <p className="mt-3">
              Where applicable, Nyako may use Google's consent management
              features or another appropriate consent management platform to
              respect these choices.
            </p>
          </section>


          {/* Third Party Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third-Party Services
            </h2>

            <p>
              Nyako uses certain third-party services to operate, measure,
              secure, and monetize the website. These may include:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Google Analytics 4</li>
              <li>Google AdSense</li>
              <li>Google Search Console</li>
              <li>Cloudflare</li>
              <li>Website hosting and infrastructure providers</li>
            </ul>

            <p className="mt-4">
              These third-party services may process technical, usage, or
              advertising-related information according to their own privacy
              policies and terms.
            </p>
          </section>


          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Data Security
            </h2>

            <p>
              We use reasonable technical and organizational measures to
              protect Nyako and the information processed through the website.
            </p>

            <p className="mt-3">
              However, no website or internet transmission can guarantee
              absolute security.
            </p>
          </section>


          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Children's Privacy
            </h2>

            <p>
              Nyako is a general-purpose website and is not specifically
              directed toward children. We do not knowingly collect personal
              information from children through the website.
            </p>
          </section>


          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to Nyako, its features, third-party services, or
              applicable requirements.
            </p>

            <p className="mt-3">
              Any changes will be reflected on this page along with the
              updated revision date.
            </p>
          </section>


          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Contact
            </h2>

            <p>
              If you have questions or concerns about this Privacy Policy or
              Nyako's privacy practices, you can contact us.
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