import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-wrap justify-center gap-6 text-sm">

          <Link to="/privacy" className="hover:text-blue-600">
            Privacy Policy
          </Link>

          <Link to="/terms" className="hover:text-blue-600">
            Terms of Service
          </Link>

          <Link to="/about" className="hover:text-blue-600">
            About Me
          </Link>

          <Link to="/contact" className="hover:text-blue-600">
            Contact Us
          </Link>

        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          © 2026 Nyako • No Login • No Watermarks • Privacy First
        </p>

      </div>
    </footer>
  );
}
