import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import NyakoMascot from "../components/NyakoMascot";
import { usePageTitle } from "../lib/usePageTitle";


export default function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <NyakoMascot state="error" size={100} className="mx-auto mb-6" />
      <h1 className="font-display text-2xl font-bold mb-2">Nothing here</h1>
      <p className="text-text-dim mb-8">
        This page doesn't exist — maybe the link is old, or the URL has a typo.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
      >
        Back to home <ArrowRight size={15} />
      </Link>
    </div>
  );
}
