import React from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import GoldDivider from "../ui/GoldDivider";

const SERVICES = [
  {
    title: "Bespoke Gowns",
    description: "Evening, bridal, and occasion wear tailored to your exact measurements and vision.",
  },
  {
    title: "Corporate Wear",
    description: "Professional, structured attire designed to make a powerful statement in the modern workplace.",
  },
  {
    title: "Traditional & Ankara",
    description: "Modern, sophisticated takes on African-inspired fashion that celebrate culture and elegance.",
  },
  {
    title: "Alterations",
    description: "Expert resizing and restyling of existing garments to breathe new life into your wardrobe.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-brand-cream border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-4">
            What We Do
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-5">
            Our Services
          </h2>
          <GoldDivider className="mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="relative p-8 md:p-10 bg-white border border-brand-gold/10 hover:border-brand-gold/30 shadow-sm hover:shadow-xl transition-all duration-500 text-left group flex flex-col h-full"
            >
              {/* Faint Background Number */}
              <span className="absolute top-4 right-6 font-serif text-6xl text-brand-navy/[0.03] group-hover:text-brand-gold/10 transition-colors duration-500 pointer-events-none select-none">
                0{i + 1}
              </span>

              <div className="relative z-10 flex-grow">
                <h3 className="font-serif text-xl lg:text-2xl text-brand-dark mb-4 group-hover:text-brand-navy transition-colors duration-300">
                  {service.title}
                </h3>
                <hr className="w-8 border-t-2 border-brand-gold mb-5 transition-all duration-500 group-hover:w-16" />
                <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="inline-block px-10 py-4 bg-brand-navy text-white tracking-widest uppercase text-sm hover:bg-brand-navy/90 hover:shadow-lg transition-all duration-300"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
