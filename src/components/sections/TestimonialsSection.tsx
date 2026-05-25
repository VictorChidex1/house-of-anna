import React from "react";
import { motion, type Variants } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";

const TESTIMONIALS = [
  {
    quote:
      "Anna absolutely transformed my wedding vision into reality. The gown was breathtaking — every detail, every stitch was perfect.",
    author: "Chioma A.",
    role: "Bridal Client",
    initial: "C",
  },
  {
    quote:
      "I've never had a blazer fit so perfectly. The consultation was thorough, and the craftsmanship is unmatched.",
    author: "Tunde O.",
    role: "Corporate Client",
    initial: "T",
  },
  {
    quote:
      "The Ankara cocktail dress turned heads at every event. Anna has a gift for blending tradition with modern elegance.",
    author: "Amara K.",
    role: "Fashion Client",
    initial: "A",
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
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white overflow-hidden pb-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20 md:mb-24"
        >
          <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-5">
            What Our Clients Say
          </h2>
          <GoldDivider className="mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`relative p-8 lg:p-10 bg-brand-cream/30 border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-xl transition-all duration-500 flex flex-col group rounded-sm ${
                i === 1 ? "md:translate-y-12" : ""
              }`}
            >
              {/* Massive Watermark Quote */}
              <span className="absolute top-2 left-6 font-serif text-[8rem] leading-none text-brand-gold/[0.04] group-hover:text-brand-gold/10 transition-colors duration-500 pointer-events-none select-none">
                &ldquo;
              </span>

              <blockquote className="relative z-10 font-serif italic text-brand-gray text-lg md:text-base lg:text-lg leading-relaxed flex-1 mb-8 mt-4 group-hover:text-brand-dark transition-colors duration-300">
                "{t.quote}"
              </blockquote>
              
              <div className="relative z-10 flex items-center gap-4 mt-auto">
                {/* Monogram Avatar */}
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center border border-brand-gold/20 shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <span className="font-serif text-brand-gold text-lg">{t.initial}</span>
                </div>
                <div>
                  <p className="font-medium text-brand-dark text-sm tracking-wide">{t.author}</p>
                  <p className="text-brand-gold text-xs tracking-[0.15em] uppercase mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
