import { AnimatePresence } from "framer-motion";
import type { GalleryItem } from "../../types";
import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (item: GalleryItem) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onImageClick }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-brand-gray">
        <p className="text-lg mb-2">No designs found</p>
        <p className="text-sm">Try a different category filter.</p>
      </div>
    );
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} onClick={onImageClick} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
