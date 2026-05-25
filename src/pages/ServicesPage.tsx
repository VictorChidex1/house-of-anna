import React from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const SERVICES = [
  {
    title: "Bespoke Gowns",
    description:
      "Custom evening gowns, bridal wear, and special occasion dresses crafted to your measurements with premium fabrics.",
    price: "₦150,000 — ₦500,000",
    image: "/assets/portfolio5.jpg",
  },
  {
    title: "Corporate & Office Wear",
    description:
      "Tailored professional attire including pantsuits, blazers, and smart-casual pieces for the modern professional.",
    price: "₦80,000 — ₦250,000",
    image: "/assets/portfolio1.jpg",
  },
  {
    title: "Traditional & Ankara",
    description:
      "Modern interpretations of traditional African styles using Ankara, lace, and other vibrant fabrics.",
    price: "₦70,000 — ₦200,000",
    image: "/assets/portfolio3.jpg",
  },
  {
    title: "Bridal & Wedding Party",
    description:
      "Complete bridal collections including the bride's gown, bridesmaids, and mother-of-the-bride outfits.",
    price: "₦300,000 — ₦1,500,000",
    image: "/assets/portfolio10.jpeg",
  },
  {
    title: "Alterations & Restyling",
    description:
      "Expert alterations, resizing, and restyling of existing garments to give them a new lease on life.",
    price: "₦15,000 — ₦80,000",
    image: "/assets/portfolio6.jpg",
  },
  {
    title: "Fabric Sourcing",
    description:
      "Personal shopping assistance for sourcing quality fabrics locally and internationally.",
    price: "Consultation based",
    image: "/assets/portfolio7.jpg",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We discuss your vision, style, and the occasion to understand exactly what you need.",
  },
  {
    step: "02",
    title: "Design & Sketch",
    description:
      "Anna creates a custom sketch and fabric recommendation tailored to your preferences.",
  },
  {
    step: "03",
    title: "Fitting Session",
    description:
      "We take precise measurements and adjust the fit through multiple sessions.",
  },
  {
    step: "04",
    title: "Final Delivery",
    description:
      "Your piece is finished with handcrafted detail, pressed, and delivered to you.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* ───── Cinematic Hero Parallax ───── */}
      <section className="relative py-32 sm:py-48 bg-brand-navy overflow-hidden bg-[url('/assets/hero-image.webp')] bg-cover bg-center bg-fixed bg-no-repeat">
        <div className="absolute inset-0 bg-brand-navy/85" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4 font-medium">
            What We Offer
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-6">
            Crafted to Fit <br />
            <span className="text-brand-gold italic">Your Life</span>
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="text-white/70 mt-8 max-w-xl mx-auto leading-relaxed text-lg">
            From the first consultation to the final stitch — every service is
            designed around you.
          </p>
        </motion.div>
      </section>

      {/* ───── Alternating Lookbook Services ───── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">
            The Collections
          </h2>
          <GoldDivider className="mx-auto" />
          <p className="text-brand-gray mt-4 max-w-xl mx-auto">
            Explore our bespoke offerings. Every garment is a masterpiece in the
            making.
          </p>
        </motion.div>

        <div className="flex flex-col space-y-24 md:space-y-32">
          {SERVICES.map((service, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream group shadow-md hover:shadow-2xl transition-all duration-700">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                    {/* Inner gold border effect on hover */}
                    <div className="absolute inset-0 border border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-700 m-4 pointer-events-none" />
                  </div>
                </div>

                {/* Text Side */}
                <div
                  className={`w-full md:w-1/2 flex flex-col ${
                    isEven ? "md:pl-8 lg:pl-16" : "md:pr-8 lg:pr-16"
                  }`}
                >
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6 leading-tight">
                    {service.title}
                  </h3>
                  <hr className="w-16 border-t-2 border-brand-gold mb-8" />
                  <p className="text-base sm:text-lg text-brand-gray leading-relaxed mb-10 font-light">
                    {service.description}
                  </p>
                  <span className="inline-block self-start px-6 py-3 text-xs tracking-[0.2em] uppercase border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-colors duration-500 cursor-default">
                    {service.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ───── Animated How It Works Process ───── */}
      <section className="relative py-28 px-4 bg-brand-cream border-y border-brand-gold/10 overflow-hidden">
        {/* Massive Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
          <h2 className="text-[10rem] sm:text-[18rem] md:text-[24rem] font-serif text-brand-navy whitespace-nowrap">
            PROCESS
          </h2>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-6">
              From Vision to Wardrobe
            </h2>
            <GoldDivider className="mx-auto" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          >
            {PROCESS.map((item, i) => (
              <motion.div
                key={item.step}
                variants={cardVariants}
                className="relative text-center group"
              >
                {/* Connecting line (desktop) animated */}
                {i < PROCESS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                    className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-brand-gold origin-left"
                  />
                )}

                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-brand-gold/20 text-brand-gold font-serif text-2xl mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white shadow-sm transition-all duration-500">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-brand-dark mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── Fixed Light CTA Banner ───── */}
      <section className="relative py-28 px-4 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-6 leading-tight">
            Ready to Bring Your{" "}
            <span className="italic text-brand-gold">Vision to Life?</span>
          </h2>
          <GoldDivider className="mx-auto mb-10" />
          <p className="text-brand-gray mb-12 leading-relaxed text-lg font-light">
            Book a consultation today and let's create something truly
            extraordinary together.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-5 bg-brand-gold text-brand-navy font-medium tracking-[0.2em] uppercase text-sm hover:bg-brand-navy hover:text-white shadow-md hover:shadow-2xl transition-all duration-500"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
