import { CATEGORIES, type CategoryId } from "../lib/intent/dictionary";

interface CategoryFilterProps {
  selected: CategoryId | null;
  onChange: (category: CategoryId | null) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter tools by category">
      <button
        role="tab"
        aria-selected={selected === null}
        onClick={() => onChange(null)}
        className={`text-sm font-medium px-4 py-2 rounded-full border transition focus-ring ${
          selected === null ? "bg-primary text-white border-primary" : "border-line text-text-dim hover:border-primary/40"
        }`}
      >
        Popular
      </button>
      {(Object.keys(CATEGORIES) as CategoryId[]).map((id) => (
        <button
          key={id}
          role="tab"
          aria-selected={selected === id}
          onClick={() => onChange(id)}
          className={`text-sm font-medium px-4 py-2 rounded-full border transition focus-ring ${
            selected === id ? "bg-primary text-white border-primary" : "border-line text-text-dim hover:border-primary/40"
          }`}
        >
          {CATEGORIES[id].label}
        </button>
      ))}
    </div>
  );
}
