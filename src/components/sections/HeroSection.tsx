import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoldDivider from "../ui/GoldDivider";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] md:min-h-0 md:h-[90vh] flex flex-col justify-end md:justify-center items-center md:items-start overflow-hidden pb-8 md:pb-0">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/assets/hero-image.webp"
          alt="House of Anna — Bespoke Tailoring"
          className="w-full h-full object-cover object-top md:object-[center_15%]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 md:via-brand-navy/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/30 via-transparent to-brand-navy/30" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-brand-navy/80 via-brand-navy/30 to-transparent w-2/3" />

      <div className="relative z-10 text-center md:text-left px-4 md:px-12 lg:px-24 max-w-3xl md:max-w-2xl mt-auto md:mt-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand-gold tracking-[0.3em] uppercase text-xs md:text-sm mb-2 md:mb-6"
        >
          Bespoke Tailoring & Fashion Design
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-3 md:mb-6"
        >
          Elegance Stitched
          <br />
          <span className="text-brand-gold">to Perfection</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GoldDivider className="mx-auto md:mx-0 mb-4 md:mb-8" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/80 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed"
        >
          Discover the art of bespoke fashion with House of Anna — where every stitch tells a
          story of craftsmanship and luxury.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full px-4 sm:px-0"
        >
          <Link
            to="/portfolio"
            className="w-full sm:w-auto px-8 py-3 bg-brand-gold text-brand-navy font-medium tracking-wider uppercase text-sm hover:bg-brand-gold/90 transition-colors text-center"
          >
            View Portfolio
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3 border border-white/30 text-white tracking-wider uppercase text-sm hover:bg-white/10 transition-colors text-center"
          >
            Make an Inquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
