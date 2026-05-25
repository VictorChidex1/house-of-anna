import type { GalleryCategory } from "../../types";

const CATEGORIES: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Crepe", value: "crepe" },
  { label: "Vintage", value: "vintage" },
  { label: "Silk", value: "silk" },
  { label: "Ankara", value: "ankara" },
  { label: "Corporate", value: "corporate" },
];

interface CategoryFilterProps {
  active: GalleryCategory | "all";
  onSelect: (category: GalleryCategory | "all") => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ active, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
            active === cat.value
              ? "bg-brand-gold text-white border-brand-gold"
              : "bg-transparent text-brand-gray border-brand-gold/30 hover:border-brand-gold hover:text-brand-dark"
          } border`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
