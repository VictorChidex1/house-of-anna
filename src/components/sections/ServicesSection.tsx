import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoldDivider from "../ui/GoldDivider";

const SERVICES = [
  {
    title: "Bespoke Gowns",
    description: "Evening, bridal, and occasion wear tailored to your measurements.",
  },
  {
    title: "Corporate Wear",
    description: "Professional attire for the modern workplace.",
  },
  {
    title: "Traditional & Ankara",
    description: "Modern takes on African-inspired fashion.",
  },
  {
    title: "Alterations",
    description: "Expert resizing and restyling of existing garments.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-brand-cream border-t border-brand-gold/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-3">What We Do</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">Our Services</h2>
          <GoldDivider className="mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-sm transition-all text-center"
            >
              <h3 className="font-serif text-xl text-brand-dark mb-3">{service.title}</h3>
              <p className="text-sm text-brand-gray leading-relaxed">{service.description}</p>
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
            to="/services"
            className="inline-block px-8 py-3 bg-brand-navy text-white tracking-wider uppercase text-sm hover:bg-brand-navy/90 transition-colors"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
