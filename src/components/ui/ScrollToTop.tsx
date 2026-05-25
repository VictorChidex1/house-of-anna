import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import { useScrollY } from "../../hooks/useScrollY";

const ScrollToTop: React.FC = () => {
  const visible = useScrollY(300);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 bg-brand-navy text-white rounded-full shadow-lg hover:bg-brand-gold hover:text-brand-navy transition-colors"
        >
          <FaChevronUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
