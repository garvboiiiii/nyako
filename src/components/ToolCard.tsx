import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { getToolIcon } from "../lib/icons";
import { useFavoriteTools } from "../lib/useToolMemory";
import { track } from "../lib/analytics";
import type { ToolDefinition } from "../lib/intent/dictionary";

export default function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = getToolIcon(tool.iconName);
  const { isFavorite, toggleFavorite } = useFavoriteTools();
  const favorited = isFavorite(tool.id);

  return (
    <div className="group relative rounded-2xl border border-line bg-surface p-6 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all">
      <button
        onClick={() => {
          toggleFavorite(tool.id);
          track("favorite_toggled", { toolId: tool.id, favorited: !favorited });
        }}
        aria-label={favorited ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
        aria-pressed={favorited}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-paper transition focus-ring"
      >
        <Star size={16} className={favorited ? "fill-primary text-primary" : "text-line"} />
      </button>

      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon size={20} className="text-primary" />
      </div>
      <p className="font-display font-semibold text-base mb-1.5 pr-8">{tool.title}</p>
      <p className="text-sm text-text-dim mb-5 leading-relaxed">{tool.description}</p>
      <Link
        to={`/tools/${tool.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all focus-ring rounded"
      >
        Open <ArrowRight size={14} />
      </Link>
    </div>
  );
}
