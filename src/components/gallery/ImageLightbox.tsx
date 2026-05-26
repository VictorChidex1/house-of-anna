import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import type { GalleryItem } from "../../types";
import GoldDivider from "../ui/GoldDivider";

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
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "unset";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Global Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 z-50 text-white/60 hover:text-white hover:scale-110 transition-all"
          >
            <FaTimes className="w-8 h-8" />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-brand-cream overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Image */}
            <div className="w-full md:w-3/5 lg:w-2/3 h-[50vh] md:h-[90vh] relative bg-brand-navy flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-2/5 lg:w-1/3 p-8 sm:p-12 flex flex-col justify-center overflow-y-auto bg-white max-h-[50vh] md:max-h-[90vh]">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6 font-medium">
                  {item.category}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4 leading-tight">
                  {item.title}
                </h2>
                <GoldDivider className="mb-6 w-16 mx-0" />
              </div>

              <div className="prose prose-sm sm:prose-base prose-p:text-brand-gray/80 prose-p:font-light prose-p:leading-relaxed mb-12">
                <p>{item.description}</p>
              </div>

              <div className="mt-auto pt-8 border-t border-brand-gold/10">
                <Link
                  to={`/contact?design=${encodeURIComponent(item.title)}`}
                  onClick={onClose}
                  className="w-full group flex items-center justify-between px-6 py-4 bg-brand-navy text-white text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-brand-gold transition-all duration-500"
                >
                  <span>Inquire About Design</span>
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-[10px] text-brand-gray/40 uppercase tracking-widest mt-4">
                  Reference: {item.title.substring(0, 8).toUpperCase()}-{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
