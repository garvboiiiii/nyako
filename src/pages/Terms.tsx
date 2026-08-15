import { useCanonicalUrl } from "../lib/useCanonicalUrl";


export default function Terms() {
  useCanonicalUrl("/terms");
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Last Updated: August 15, 2026
          </p>
        </div>

        <div className="space-y-10 leading-8">

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Acceptance of Terms
            </h2>

            <p>
              Welcome to <strong>Nyako</strong>. By accessing or using Nyako,
              you agree to be bound by these Terms of Service and our Privacy
              Policy.
            </p>

            <p className="mt-3">
              If you do not agree with these Terms, please do not use the
              website or its services.
            </p>
          </section>


          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Our Services
            </h2>

            <p>
              Nyako provides free browser-based tools for processing files,
              images, PDFs, and other supported formats.
            </p>

            <p className="mt-3">
              Available features may include, but are not limited to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>PDF conversion and processing</li>
              <li>PDF merging and splitting</li>
              <li>Image compression and conversion</li>
              <li>Document and presentation conversion</li>
              <li>File resizing and optimization</li>
              <li>Other file-related utilities</li>
            </ul>

            <p className="mt-4">
              Features may be added, modified, suspended, or removed at any
              time without prior notice.
            </p>
          </section>


          {/* Browser Processing */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Browser-Based Processing
            </h2>

            <p>
              Many Nyako tools are designed to process files directly in your
              web browser. When a tool performs local processing, the relevant
              file remains on your device and is not uploaded to Nyako's
              servers.
            </p>

            <p className="mt-3">
              However, not every feature or future feature is necessarily
              processed locally. Where server-side processing is required,
              Nyako will indicate this before the relevant file is transmitted.
            </p>
          </section>


          {/* User Responsibility */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              User Responsibility
            </h2>

            <p>
              You are responsible for the files, documents, images, and other
              content that you process using Nyako.
            </p>

            <p className="mt-3">
              You must ensure that you have the necessary rights, permissions,
              and authority to process any content you use with our services.
            </p>

            <p className="mt-3">
              Nyako does not claim ownership of your files or the content you
              process using the website.
            </p>
          </section>


          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Acceptable Use
            </h2>

            <p>
              You agree to use Nyako only for lawful purposes and in accordance
              with applicable laws and regulations.
            </p>

            <p className="mt-3">
              You must not use Nyako to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Violate any applicable law or regulation.
              </li>
              <li>
                Infringe copyright, trademark, privacy, or other rights of
                another person or organization.
              </li>
              <li>
                Process content that you do not have the legal right to use or
                process.
              </li>
              <li>
                Attempt to disrupt, overload, damage, or interfere with the
                website or its infrastructure.
              </li>
              <li>
                Attempt to gain unauthorized access to systems or services
                connected to Nyako.
              </li>
              <li>
                Use automated methods to abuse, scrape, or excessively consume
                website resources.
              </li>
            </ul>
          </section>


          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Intellectual Property
            </h2>

            <p>
              Nyako's name, branding, logos, design, website interface, source
              code, original content, and other intellectual property are owned
              by Nyako or its respective licensors unless otherwise stated.
            </p>

            <p className="mt-3">
              You may not copy, reproduce, modify, distribute, sell, or
              commercially exploit Nyako's proprietary content without
              appropriate authorization.
            </p>

            <p className="mt-3">
              Your own files and content remain yours. Using Nyako does not
              transfer ownership of your content to Nyako.
            </p>
          </section>


          {/* Third Party Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third-Party Services
            </h2>

            <p>
              Nyako may use third-party services for hosting, analytics,
              security, advertising, performance measurement, and other
              operational purposes.
            </p>

            <p className="mt-3">
              These services may include providers such as Google Analytics,
              Google AdSense, Google Search Console, Cloudflare, hosting
              providers, and other service providers.
            </p>

            <p className="mt-3">
              Your use of third-party services may also be subject to the
              respective provider's terms and policies.
            </p>
          </section>


          {/* Advertising */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Advertising
            </h2>

            <p>
              Nyako may display advertisements through third-party advertising
              providers, including Google AdSense.
            </p>

            <p className="mt-3">
              Advertising providers may use cookies or similar technologies in
              accordance with their own policies and applicable consent
              requirements.
            </p>

            <p className="mt-3">
              For information about how Nyako handles analytics, advertising,
              cookies, and related information, please review our Privacy
              Policy.
            </p>
          </section>


          {/* Availability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Availability and Changes to Services
            </h2>

            <p>
              We aim to keep Nyako available and reliable, but we do not
              guarantee that the website or any particular tool will always be
              available, uninterrupted, secure, or error-free.
            </p>

            <p className="mt-3">
              We may temporarily suspend or restrict access for maintenance,
              security updates, technical issues, upgrades, or other reasons.
            </p>

            <p className="mt-3">
              We may also change, discontinue, or introduce features at any
              time.
            </p>
          </section>


          {/* Accuracy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Accuracy of Results
            </h2>

            <p>
              Nyako tools are provided for general-purpose file and document
              processing. While we aim to provide accurate and reliable
              results, we cannot guarantee that every conversion, compression,
              extraction, or other operation will produce a perfect result for
              every file.
            </p>

            <p className="mt-3">
              You are responsible for reviewing the output produced by Nyako
              before relying on it for important, legal, financial, academic,
              professional, or other critical purposes.
            </p>
          </section>


          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Disclaimer of Warranties
            </h2>

            <p>
              Nyako is provided on an <strong>"as is"</strong> and{" "}
              <strong>"as available"</strong> basis, without warranties of any
              kind, whether express or implied, to the extent permitted by
              applicable law.
            </p>

            <p className="mt-3">
              We do not guarantee that Nyako will meet every user's
              requirements or that the service will always be uninterrupted,
              secure, accurate, or free from errors or harmful components.
            </p>
          </section>


          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Limitation of Liability
            </h2>

            <p>
              To the maximum extent permitted by applicable law, Nyako and its
              operators shall not be liable for any indirect, incidental,
              special, consequential, or other damages arising from or related
              to your use of, or inability to use, the website or its services.
            </p>

            <p className="mt-3">
              This includes, where legally permitted, loss of data, files,
              profits, business opportunities, or other losses resulting from
              reliance on the services or their output.
            </p>
          </section>


          {/* Backups */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Important Files and Backups
            </h2>

            <p>
              You are responsible for maintaining appropriate backups of
              important files before processing them with Nyako.
            </p>

            <p className="mt-3">
              Nyako should not be treated as a backup, archival, or permanent
              storage service.
            </p>
          </section>


          {/* Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third-Party Links
            </h2>

            <p>
              Nyako may contain links to websites or services operated by third
              parties. We are not responsible for the content, availability,
              security, or privacy practices of external websites.
            </p>
          </section>


          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Suspension or Termination
            </h2>

            <p>
              We reserve the right to restrict or terminate access to Nyako,
              without prior notice where reasonably necessary, if we believe
              that a user has violated these Terms, abused the service, or
              created a security or operational risk.
            </p>
          </section>


          {/* Governing */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Applicable Law
            </h2>

            <p>
              These Terms shall be interpreted and applied in accordance with
              applicable laws. Nothing in these Terms is intended to remove or
              limit any rights that cannot legally be excluded or restricted
              under applicable law.
            </p>
          </section>


          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to These Terms
            </h2>

            <p>
              We may update these Terms from time to time to reflect changes
              to Nyako, its features, third-party services, or applicable
              requirements.
            </p>

            <p className="mt-3">
              The updated version will be published on this page with a
              revised "Last Updated" date.
            </p>

            <p className="mt-3">
              Your continued use of Nyako after changes are published
              constitutes acceptance of the updated Terms, to the extent
              permitted by applicable law.
            </p>
          </section>


          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Contact
            </h2>

            <p>
              If you have questions about these Terms or Nyako's services,
              please contact us.
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