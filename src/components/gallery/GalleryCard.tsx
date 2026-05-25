import { motion } from "framer-motion";
import type { GalleryItem } from "../../types";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: (item: GalleryItem) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative break-inside-avoid mb-4 overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <span className="inline-block px-2 py-0.5 text-[10px] tracking-widest uppercase bg-brand-gold text-white mb-2">
          {item.category}
        </span>
        <h3 className="text-white font-serif text-sm sm:text-base leading-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
