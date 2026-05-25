import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";

// Custom Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds animation
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const STATS = [
  { value: 50, suffix: "+", label: "Bespoke Creations" },
  { value: 7, suffix: "", label: "Fabric Categories" },
  { value: 100, suffix: "%", label: "Handcrafted" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SummarySection: React.FC = () => {
  return (
    <section className="relative py-28 px-4 bg-brand-navy overflow-hidden">
      {/* Editorial Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <h1 className="text-[8rem] sm:text-[14rem] md:text-[20rem] font-serif text-white whitespace-nowrap">
          CRAFTSMANSHIP
        </h1>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4 font-semibold">
            House of Anna
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Built on Craftsmanship
          </h2>
          <GoldDivider className="mx-auto" />
          <p className="text-white/70 mt-8 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
            Every garment is a collaboration between the client&apos;s vision and the artist&apos;s
            expertise. From fabric selection to the final stitch, we pour dedication into every
            piece — because clothing is more than fabric. <br className="hidden sm:block" />
            <span className="italic text-brand-gold">It&apos;s identity, confidence, and art.</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brand-gold/40 hover:bg-white/10 transition-all duration-300 text-center group"
            >
              {/* Subtle top glow effect on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/0 to-transparent group-hover:via-brand-gold/50 transition-all duration-500" />
              
              <p className="font-serif text-5xl sm:text-6xl text-brand-gold mb-4 drop-shadow-md">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/80 text-sm tracking-[0.2em] uppercase font-medium group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SummarySection;
