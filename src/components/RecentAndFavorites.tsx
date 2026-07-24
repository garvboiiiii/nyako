import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { getToolIcon } from "../lib/icons";
import { useRecentTools, useFavoriteTools } from "../lib/useToolMemory";
import { getToolById } from "../lib/intent/dictionary";

function ToolChipRow({ ids, icon: RowIcon, label }: { ids: string[]; icon: typeof Clock; label: string }) {
  const tools = ids.map(getToolById).filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (tools.length === 0) return null;

  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-text-dim mb-2.5">
        <RowIcon size={13} /> {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const Icon = getToolIcon(tool.iconName);
          return (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-line bg-surface hover:border-primary/40 hover:text-primary transition focus-ring"
            >
              <Icon size={14} />
              {tool.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function RecentAndFavorites() {
  const { recent } = useRecentTools();
  const { favorites } = useFavoriteTools();

  if (recent.length === 0 && favorites.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 mb-4 flex flex-col sm:flex-row gap-6">
      <ToolChipRow ids={favorites} icon={Star} label="Favorites" />
      <ToolChipRow ids={recent} icon={Clock} label="Recently used" />
    </div>
  );
}
