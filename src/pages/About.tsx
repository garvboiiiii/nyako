import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function About() {
  useCanonicalUrl("/about");

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
            About Nyako
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple tools for everyday files.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Nyako is a free collection of file, image, and PDF tools designed
            to make everyday digital tasks simpler, faster, and less
            frustrating.
          </p>
        </div>

        <div className="space-y-12 leading-8">

          {/* What is Nyako */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              What is Nyako?
            </h2>

            <p>
              We use files every day—compressing images, merging PDFs,
              converting documents, resizing files, signing documents, and
              dealing with countless other small tasks.
            </p>

            <p className="mt-4">
              Nyako exists to make those tasks easier without forcing people
              through complicated workflows, unnecessary account creation, or
              confusing interfaces.
            </p>

            <p className="mt-4">
              Our goal is simple: open Nyako, find the tool you need, get the
              job done, and move on.
            </p>
          </section>


          {/* Privacy */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Privacy by Design
            </h2>

            <p>
              Privacy is an important part of how Nyako is built.
            </p>

            <p className="mt-4">
              Whenever technically possible, our tools process files directly
              inside your browser. This means the file can remain on your
              device instead of being uploaded to a remote server.
            </p>

            <p className="mt-4">
              We also avoid making an account mandatory just to perform a
              simple file operation.
            </p>

            <p className="mt-4">
              Not every feature is necessarily processed locally, and if a
              feature requires server-side processing, we aim to make that
              clear before the relevant file is sent.
            </p>
          </section>


          {/* Why Nyako */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Why We Built It
            </h2>

            <p>
              Many useful file tools are surrounded by restrictions—login
              requirements, watermarks, artificial limits, complicated
              interfaces, or paywalls for simple tasks.
            </p>

            <p className="mt-4">
              We think basic file utilities should be easier to access.
            </p>

            <p className="mt-4">
              Nyako is our attempt to build that kind of utility: straightforward,
              fast, accessible, and useful without unnecessary friction.
            </p>
          </section>


          {/* Principles */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold">
              Our Principles
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="font-semibold">
                  Privacy First
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  We prefer browser-based processing whenever it is technically
                  practical.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="font-semibold">
                  No Unnecessary Login
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  Simple file tasks should not require creating an account.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="font-semibold">
                  No Watermarks
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  Our goal is to provide useful tools without adding unwanted
                  branding to your files.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="font-semibold">
                  Keep It Simple
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  Tools should be understandable the first time someone uses
                  them.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="font-semibold">
                  Free to Use
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  We want essential file utilities to remain accessible without
                  unnecessary barriers.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                <h3 className="font-semibold">
                  Keep Improving
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  Nyako is continuously improved based on real-world use and
                  feedback.
                </p>
              </div>

            </div>
          </section>


          {/* Tools */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              What You Can Do With Nyako
            </h2>

            <p>
              Nyako brings different everyday file utilities together in one
              place. Depending on the available tools, you can work with PDFs,
              images, documents, presentations, and other common file formats.
            </p>

            <p className="mt-4">
              We are continuously adding and improving tools so that common
              file-related tasks can be completed without having to search for
              a different website every time.
            </p>
          </section>


          {/* No Upload Claim */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Your Files Stay Yours
            </h2>

            <p>
              Nyako does not claim ownership of the files you process.
            </p>

            <p className="mt-4">
              When a tool works entirely within your browser, the file is
              processed locally on your device and is not uploaded to Nyako.
            </p>

            <p className="mt-4">
              You should always review the information provided by a specific
              tool before using it for sensitive or important documents.
            </p>
          </section>


          {/* Future */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              What's Next?
            </h2>

            <p>
              Nyako is still evolving.
            </p>

            <p className="mt-4">
              We want to expand the collection of tools while making the
              existing ones faster, easier to understand, and more pleasant to
              use.
            </p>

            <p className="mt-4">
              The long-term goal is not to create another complicated platform
              full of features nobody needs. It is to build a reliable toolbox
              that people can return to whenever they need to get something
              done.
            </p>
          </section>


          {/* Contact */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Get in Touch
            </h2>

            <p>
              Found a problem, have a suggestion, or want to tell us about a
              tool you'd like to see?
            </p>

            <p className="mt-4">
              We'd love to hear from you.
            </p>

            <p className="mt-4">
              Email:{" "}
              <a
                href="mailto:nyako.support@gmail.com"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                nyako.support@gmail.com
              </a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          © 2026 Nyako · Built with privacy in mind.
        </div>

      </div>
    </main>
  );
}