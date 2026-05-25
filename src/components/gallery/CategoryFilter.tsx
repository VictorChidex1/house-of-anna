import type { GalleryCategory } from "../../types";

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "Crepe", value: "crepe" },
  { label: "Vintage", value: "vintage" },
  { label: "Silk", value: "silk" },
  { label: "Ankara", value: "ankara" },
  { label: "Corporate", value: "corporate" },
];

interface CategoryFilterProps {
  selected: GalleryCategory[];
  onToggle: (category: GalleryCategory | "all") => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onToggle }) => {
  const allActive = selected.length === 0;

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
      <button
        onClick={() => onToggle("all")}
        className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
          allActive
            ? "bg-brand-gold text-white border-brand-gold"
            : "bg-transparent text-brand-gray border-brand-gold/30 hover:border-brand-gold hover:text-brand-dark"
        }`}
      >
        All
      </button>

      {CATEGORIES.map((cat) => {
        const isActive = selected.includes(cat.value);
        return (
          <button
            key={cat.value}
            onClick={() => onToggle(cat.value)}
            className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
              isActive
                ? "bg-brand-gold text-white border-brand-gold"
                : "bg-transparent text-brand-gray border-brand-gold/30 hover:border-brand-gold hover:text-brand-dark"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
