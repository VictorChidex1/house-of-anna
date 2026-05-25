import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useScrollY } from "../../hooks/useScrollY";

const PHONE = "2347066659660";
const MESSAGE = "Hello House of Anna, I'd love to discuss a custom design.";

const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

const WhatsAppButton: React.FC = () => {
  const scrolledPast = useScrollY(300);

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className={`fixed right-6 z-40 p-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BD5A] transition-colors ${
        scrolledPast ? "bottom-20" : "bottom-6"
      }`}
    >
      <FaWhatsapp className="w-5 h-5" />
    </motion.a>
  );
};

export default WhatsAppButton;
