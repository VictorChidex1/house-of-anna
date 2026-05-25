import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoldDivider from "../components/ui/GoldDivider";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] flex items-center justify-center bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 to-brand-navy" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-gold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Bespoke Tailoring & Fashion Design
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6"
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
            <GoldDivider className="mx-auto mb-8" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Discover the art of bespoke fashion with House of Anna — where every stitch tells a
            story of craftsmanship and luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/portfolio"
              className="px-8 py-3 bg-brand-gold text-brand-navy font-medium tracking-wider uppercase text-sm hover:bg-brand-gold/90 transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-white/30 text-white tracking-wider uppercase text-sm hover:bg-white/10 transition-colors"
            >
              Make an Inquiry
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">
            Craftsmanship You Can Wear
          </h2>
          <GoldDivider className="mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Crepe", "Silk", "Ankara", "Vintage", "High Fashion", "Bespoke Fit"].map(
            (service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 border border-brand-gold/10 hover:border-brand-gold/30 transition-colors"
              >
                <h3 className="font-serif text-xl text-brand-dark mb-2">{service}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Exquisite {service.toLowerCase()} designs tailored to your unique style and
                  occasion.
                </p>
              </motion.div>
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
