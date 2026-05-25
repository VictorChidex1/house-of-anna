import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import type { GalleryItem } from "../../types";

interface ImageLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-brand-cream"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 text-brand-dark hover:bg-brand-gold hover:text-white transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto max-h-[65vh] object-contain bg-brand-dark"
            />

            <div className="p-6 sm:p-8">
              <span className="inline-block px-2 py-0.5 text-[10px] tracking-widest uppercase bg-brand-gold text-white mb-3">
                {item.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-dark mb-3">
                {item.title}
              </h2>
              <p className="text-brand-gray text-sm leading-relaxed mb-6">{item.description}</p>
              <Link
                to={`/contact?design=${encodeURIComponent(item.title)}`}
                className="inline-block px-6 py-3 bg-brand-navy text-white tracking-wider uppercase text-sm hover:bg-brand-navy/90 transition-colors"
              >
                Inquire About This Design
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
