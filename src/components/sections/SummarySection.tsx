import { motion } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";

const STATS = [
  { number: "50+", label: "Bespoke Creations" },
  { number: "7", label: "Fabric Categories" },
  { number: "100%", label: "Handcrafted" },
  { number: "5+", label: "Years Experience" },
];

const SummarySection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-brand-navy">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-3">
            House of Anna
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Built on Craftsmanship
          </h2>
          <GoldDivider className="mx-auto" />
          <p className="text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">
            Every garment is a collaboration between the client&apos;s vision and the artist&apos;s
            expertise. From fabric selection to the final stitch, we pour dedication into every
            piece — because clothing is more than fabric. It&apos;s identity, confidence, and art.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-4xl sm:text-5xl text-brand-gold mb-2">{stat.number}</p>
              <p className="text-white/60 text-sm tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
