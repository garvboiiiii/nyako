import { useCanonicalUrl } from "../lib/useCanonicalUrl";

export default function Contact() {
  useCanonicalUrl("/contact");

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Contact Nyako
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            We'd love to hear from you.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Found a bug, have an idea for a new tool, or simply want to share
            some feedback? Send us a message.
          </p>
        </div>

        <div className="space-y-10">

          {/* Main contact card */}
          <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
            <h2 className="text-2xl font-semibold">
              Get in touch
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-400">
              The easiest way to reach us is by email. You can contact us
              about technical issues, suggestions, partnerships, or anything
              related to Nyako.
            </p>

            <a
              href="mailto:nyako.support@gmail.com"
              className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              Email Nyako
            </a>
          </section>


          {/* Contact information */}
          <section>
            <h2 className="mb-5 text-2xl font-semibold">
              Contact information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Email */}
              <a
                href="mailto:nyako.support@gmail.com"
                className="group rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
              >
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Email
                </p>

                <p className="mt-2 break-all font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                  nyako.support@gmail.com
                </p>

                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  For bugs, feedback, questions, and inquiries.
                </p>
              </a>


              {/* Website */}
              <a
                href="https://nyako.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
              >
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Website
                </p>

                <p className="mt-2 font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                  nyako.co.in
                </p>

                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Visit Nyako and explore the available tools.
                </p>
              </a>


              {/* X */}
              <a
                href="https://x.com/NyakoHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
              >
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  X (Twitter)
                </p>

                <p className="mt-2 font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                  @NyakoHQ
                </p>

                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Follow Nyako for updates and announcements.
                </p>
              </a>

            </div>
          </section>


          {/* What to include */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Reporting a problem?
            </h2>

            <p className="leading-7 text-neutral-600 dark:text-neutral-400">
              If you're reporting a bug, including the name of the tool,
              what you were trying to do, and what went wrong can help us
              investigate it faster. Screenshots or error messages are also
              useful when available.
            </p>
          </section>


          {/* Feature requests */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Have an idea?
            </h2>

            <p className="leading-7 text-neutral-600 dark:text-neutral-400">
              We're continuously improving Nyako. If there is a file,
              image, or PDF task you'd like to see supported, send us your
              suggestion. Not every request will be implemented, but every
              useful idea helps shape what we build next.
            </p>
          </section>


          {/* Privacy note */}
          <section className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h2 className="text-lg font-semibold">
              Privacy
            </h2>

            <p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-400">
              Please avoid sending sensitive or confidential documents as
              email attachments unless you are comfortable sharing them.
              For information about how Nyako handles data and files, please
              review our Privacy Policy.
            </p>

            <a
              href="/privacy"
              className="mt-4 inline-block font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Read our Privacy Policy →
            </a>
          </section>

        </div>

      </div>
    </main>
  );
}