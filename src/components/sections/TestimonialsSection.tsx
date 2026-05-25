import { motion } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";

const TESTIMONIALS = [
  {
    quote:
      "Anna absolutely transformed my wedding vision into reality. The gown was breathtaking — every detail, every stitch was perfect.",
    author: "Chioma A.",
    role: "Bridal Client",
  },
  {
    quote:
      "I've never had a blazer fit so perfectly. The consultation was thorough, and the craftsmanship is unmatched.",
    author: "Tunde O.",
    role: "Corporate Client",
  },
  {
    quote:
      "The Ankara cocktail dress turned heads at every event. Anna has a gift for blending tradition with modern elegance.",
    author: "Amara K.",
    role: "Fashion Client",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-3">Testimonials</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">
          What Our Clients Say
        </h2>
        <GoldDivider className="mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 border border-brand-gold/10 flex flex-col"
          >
            <svg className="w-8 h-8 text-brand-gold/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-brand-gray text-sm leading-relaxed flex-1 mb-6">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-medium text-brand-dark text-sm">{t.author}</p>
              <p className="text-brand-gold text-xs tracking-wider uppercase">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
