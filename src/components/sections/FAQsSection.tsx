import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes } from "react-icons/fa";
import GoldDivider from "../ui/GoldDivider";

const FAQS = [
  {
    question: "How long does it take to complete a custom garment?",
    answer:
      "Typical turnaround is 2–4 weeks depending on the complexity of the design. Bridal gowns and elaborate evening pieces may require 4–8 weeks. We will provide a clear timeline during your initial consultation and keep you updated at every stage.",
  },
  {
    question: "What fabrics do you work with?",
    answer:
      "We work with a wide range of premium fabrics including crepe, silk, lace, Ankara, cotton, linen, tulle, velvet, and organza. We also offer fabric sourcing assistance if you are looking for something specific — locally or internationally.",
  },
  {
    question: "Do I need to come in for measurements?",
    answer:
      "Yes — accurate measurements are essential for a perfect fit. We recommend an in-person session at our studio for precise measurements and to allow you to feel the fabrics. For returning clients or clients outside Lagos, we can work with your existing measurements.",
  },
  {
    question: "Can I bring my own fabric?",
    answer:
      "Absolutely. If you have fabric you love, we are happy to work with it. We will inspect the material to ensure it is suitable for your desired design and advise on any adjustments needed.",
  },
  {
    question: "How many fittings are included?",
    answer:
      "We typically include two fitting sessions per garment. The first fitting checks the structure and fit. The second confirms the final adjustments. Additional fittings can be arranged if needed at no extra cost.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Pricing varies based on the design complexity, fabric choice, and embellishments. We provide a detailed quote after the consultation. A 50% deposit is required to begin production, with the balance due on delivery.",
  },
  {
    question: "Do you offer alterations for garments not made by you?",
    answer:
      "Yes, we offer alteration and restyling services for existing garments — whether purchased elsewhere or previously made by us. Pricing depends on the extent of the work required.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "You can book a consultation through our contact page, via WhatsApp, or by sending us a direct message on Instagram. We will respond within 24 hours to schedule your session.",
  },
];

const FAQsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold tracking-[0.25em] uppercase text-xs mb-4">
            Got Questions?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">
            Frequently Asked Questions
          </h2>
          <GoldDivider className="mx-auto" />
        </motion.div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-b border-brand-gold/10 last:border-b-0"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 py-5 text-left"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold text-xs font-serif">
                    ?
                  </span>
                  <span className="flex-1 text-sm sm:text-base text-brand-dark font-medium leading-snug">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-brand-gold transition-transform duration-300">
                    {isOpen ? <FaTimes className="w-3 h-3" /> : <FaPlus className="w-3 h-3" />}
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
                      <p className="pb-5 pl-12 text-sm text-brand-gray leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
