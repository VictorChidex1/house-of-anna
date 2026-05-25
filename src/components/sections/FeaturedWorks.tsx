import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoldDivider from "../ui/GoldDivider";

const FEATURED = [
  {
    title: "Gold Silk Gown",
    category: "Silk",
    image: "/assets/hero-image.webp",
  },
  {
    title: "Navy Crepe Ensemble",
    category: "Crepe",
    image: "/assets/hero-image.webp",
  },
  {
    title: "Ankara Cocktail Dress",
    category: "Ankara",
    image: "/assets/hero-image.webp",
  },
];

const FeaturedWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-3">Featured Works</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">
          Recent Masterpieces
        </h2>
        <GoldDivider className="mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-[4/5] overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-brand-gold text-xs tracking-widest uppercase mb-1">
                {item.category}
              </p>
              <h3 className="text-white font-serif text-lg">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link
          to="/portfolio"
          className="inline-block px-8 py-3 border border-brand-navy/20 text-brand-navy tracking-wider uppercase text-sm hover:bg-brand-navy hover:text-white transition-colors"
        >
          View Full Portfolio
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedWorks;
