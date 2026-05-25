import React from "react";
import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const PHILOSOPHY = [
  {
    number: "01",
    title: "Craftsmanship",
    description: "Meticulous attention to the finest details. Every seam, bead, and fold is placed with intention and mastery."
  },
  {
    number: "02",
    title: "Individuality",
    description: "Your garment should be as unique as your fingerprint. We design pieces that tell your personal story."
  },
  {
    number: "03",
    title: "Heritage",
    description: "Blending modern elegance with timeless tailoring traditions passed down through generations."
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* ───── Hero Section ───── */}
      <section className="relative py-32 sm:py-40 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/hero-image.webp')] bg-cover bg-center opacity-10 bg-fixed" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4 font-medium">Meet The Designer</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-6">
            The Story Behind <br/><span className="text-brand-gold italic">the Stitch</span>
          </h1>
          <GoldDivider className="mx-auto" />
        </motion.div>
      </section>

      {/* ───── Editorial Spread ───── */}
      <section className="py-24 sm:py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative px-4 sm:px-8 lg:px-0"
          >
            {/* Offset Gold Frame */}
            <div className="absolute -inset-2 sm:-inset-6 border border-brand-gold/40 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 z-0" />
            
            {/* Main Image */}
            <div className="relative z-10 aspect-[3/4] bg-brand-navy shadow-2xl overflow-hidden">
              <img 
                src="/assets/anna.jpg" 
                alt="Anna Peter - Creative Director"
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 lg:pl-10 relative mt-12 lg:mt-0"
          >
            {/* Integrated Intro Quote */}
            <blockquote className="mb-10 lg:mb-16 border-l-4 border-brand-gold pl-6 sm:pl-8">
              <p className="font-serif italic text-brand-dark text-2xl sm:text-3xl leading-snug">
                "Clothing is more than fabric; it's identity, confidence, and art."
              </p>
            </blockquote>

            <div className="space-y-6 text-brand-gray leading-relaxed text-base sm:text-lg font-light relative z-10">
              <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-brand-gold first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest">
                House of Anna was born from a profound passion for fabric, form, and the transformative power of a perfectly fitted garment. With years of experience in bespoke tailoring, Anna Peter has dressed clients for weddings, galas, corporate events, and everyday elegance.
              </p>
              <p>
                Every piece that leaves the House of Anna studio is a collaboration — a deeply personal dialogue between the client's vision and the artist's expertise. We do not just make clothes; we sculpt confidence. We believe that what you wear dictates how you walk into a room.
              </p>
              <p>
                Whether you're dreaming of a show-stopping bridal gown that captures the romance of your love story, or a perfectly tailored blazer that commands respect in the boardroom, I bring the exact same dedication and precision to every single stitch.
              </p>

              {/* Signature */}
              <div className="pt-12 flex flex-col items-start">
                <GoldDivider className="mb-6 w-16 mx-0" />
                <span className="font-serif text-3xl sm:text-4xl text-brand-dark italic">Anna Peter</span>
                <span className="text-xs tracking-[0.2em] uppercase text-brand-gold mt-3 font-medium">Creative Director & Founder</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ───── The Atelier Philosophy ───── */}
      <section className="py-28 sm:py-32 px-4 bg-white border-t border-brand-gold/10 relative overflow-hidden">
        {/* Faint Background Logo/Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
          <h2 className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-serif text-brand-navy whitespace-nowrap">
            PHILOSOPHY
          </h2>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 sm:mb-24"
          >
            <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4">Our Ethos</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-6">The Atelier Philosophy</h2>
            <GoldDivider className="mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {PHILOSOPHY.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <span className="font-serif text-5xl sm:text-6xl text-brand-gold/20 mb-6 group-hover:text-brand-gold transition-colors duration-500">
                  {item.number}
                </span>
                <h3 className="font-serif text-2xl text-brand-dark mb-4">{item.title}</h3>
                <div className="w-8 h-[1px] bg-brand-gold mb-6 transition-all duration-500 group-hover:w-16" />
                <p className="text-brand-gray font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
