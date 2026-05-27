import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import GoldDivider from "../ui/GoldDivider";

const FAQ_CATEGORIES = [
  {
    name: "Consultations & Fittings",
    faqs: [
      {
        question: "How do I book a consultation?",
        answer:
          "You can book a consultation through our contact page, via WhatsApp, or by sending us a direct message on Instagram. We will respond within 24 hours to schedule your session.",
      },
      {
        question: "Do I need to come in for measurements?",
        answer:
          "Yes — accurate measurements are essential for a perfect fit. We recommend an in-person session at our studio for precise measurements and to allow you to feel the fabrics. For returning clients or clients outside Port Harcourt, we can work with your existing measurements.",
      },
      {
        question: "How many fittings are included?",
        answer:
          "We typically include two fitting sessions per garment. The first fitting checks the structure and fit. The second confirms the final adjustments. Additional fittings can be arranged if needed at no extra cost.",
      },
    ],
  },
  {
    name: "Design & Fabrics",
    faqs: [
      {
        question: "What fabrics do you work with?",
        answer:
          "We work with a wide range of premium fabrics including crepe, silk, lace, Ankara, cotton, linen, tulle, velvet, and organza. We also offer fabric sourcing assistance if you are looking for something specific — locally or internationally.",
      },
      {
        question: "Can I bring my own fabric?",
        answer:
          "Absolutely. If you have fabric you love, we are happy to work with it. We will inspect the material to ensure it is suitable for your desired design and advise on any adjustments needed.",
      },
      {
        question: "Do you offer alterations for garments not made by you?",
        answer:
          "Yes, we offer alteration and restyling services for existing garments — whether purchased elsewhere or previously made by us. Pricing depends on the extent of the work required.",
      },
    ],
  },
  {
    name: "Pricing & Timelines",
    faqs: [
      {
        question: "How long does it take to complete a custom garment?",
        answer:
          "Typical turnaround is 2–4 weeks depending on the complexity of the design. Bridal gowns and elaborate evening pieces may require 4–8 weeks. We will provide a clear timeline during your initial consultation and keep you updated at every stage.",
      },
      {
        question: "What is your pricing structure?",
        answer:
          "Pricing varies based on the design complexity, fabric choice, and embellishments. We provide a detailed quote after the consultation. A 50% deposit is required to begin production, with the balance due on delivery.",
      },
    ],
  },
];

// Generate structured data for Google SEO
const generateFAQSchema = () => {
  const allFaqs = FAQ_CATEGORIES.flatMap((cat) => cat.faqs);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

const FAQsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-brand-cream relative">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ───── Left Column (Sticky Editorial Header) ───── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-4">
                The Details
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-6 leading-tight">
                Frequently Asked <br /> Questions
              </h2>
              <GoldDivider className="mb-6 w-16 mx-0" />
              <p className="text-brand-gray text-sm leading-relaxed mb-10 max-w-sm">
                Everything you need to know about our bespoke process, from the first sketch to the final fitting. Select a category below to explore.
              </p>

              {/* Category Tabs */}
              <div className="flex flex-col space-y-3">
                {FAQ_CATEGORIES.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(idx);
                      setOpenIndex(0); // Reset accordion on tab change
                    }}
                    className={`text-left px-6 py-4 transition-all duration-300 border-l-2 text-sm tracking-wider uppercase font-medium ${
                      activeCategory === idx
                        ? "border-brand-gold bg-brand-gold/5 text-brand-dark"
                        : "border-transparent text-brand-gray hover:text-brand-dark hover:bg-black/5"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ───── Right Column (Accordions) ───── */}
          <div className="lg:col-span-7 pt-4 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {FAQ_CATEGORIES[activeCategory].faqs.map((faq, i) => {
                  const isOpen = openIndex === i;

                  return (
                    <div
                      key={i}
                      className={`transition-colors duration-300 border ${
                        isOpen
                          ? "bg-white border-brand-gold/30 shadow-sm"
                          : "bg-transparent border-brand-gold/10 hover:border-brand-gold/30"
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between p-6 text-left group"
                      >
                        <span
                          className={`text-sm sm:text-base font-medium leading-snug transition-colors duration-300 pr-6 ${
                            isOpen ? "text-brand-gold" : "text-brand-dark group-hover:text-brand-gold"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? "bg-brand-gold border-brand-gold text-white rotate-180"
                              : "border-brand-gold/30 text-brand-gold group-hover:border-brand-gold"
                          }`}
                        >
                          {isOpen ? (
                            <FaTimes className="w-3 h-3" />
                          ) : (
                            <FaPlus className="w-3 h-3" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 text-sm text-brand-gray leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* ───── Conversion CTA ───── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 p-8 bg-brand-navy flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/assets/hero-image.webp')] opacity-5 bg-cover bg-center" />
              <div className="relative z-10 text-center sm:text-left">
                <h4 className="font-serif text-brand-gold text-xl mb-1">
                  Still have questions?
                </h4>
                <p className="text-white/70 text-sm">
                  Anna is available to discuss your unique vision.
                </p>
              </div>
              <a
                href="https://wa.me/2347066659660"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-3 bg-brand-gold text-brand-navy px-6 py-3 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors duration-300"
              >
                <FaWhatsapp className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
