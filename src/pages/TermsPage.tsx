import React from "react";
import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const SECTIONS = [
  {
    title: "Services & Quotes",
    content:
      "All services provided by House of Anna are subject to a formal consultation and written quotation. The scope of work, timeline, and pricing are outlined in the quote and accepted upon payment of the deposit. Any changes to the scope after acceptance may result in revised pricing and timelines.",
  },
  {
    title: "Deposits & Payments",
    content:
      "A non-refundable deposit of 50% of the total quoted amount is required to secure your order and begin production. The remaining balance is due upon completion and before delivery. Payments can be made via bank transfer, mobile money, or as otherwise agreed.",
  },
  {
    title: "Cancellation & Refunds",
    content:
      "Orders cancelled after production has begun will not be eligible for a refund of the deposit. Once custom cutting and stitching have commenced, the deposit covers materials and labour already expended. House of Anna reserves the right to assess refunds on a case-by-case basis for orders cancelled before production begins.",
  },
  {
    title: "Client Responsibilities",
    content:
      "Clients are responsible for providing accurate measurements during the fitting session. House of Anna is not liable for fit issues arising from incorrect measurements provided by the client. Clients must also communicate any allergies or sensitivities to fabrics or embellishments prior to production.",
  },
  {
    title: "Intellectual Property",
    content:
      "All original designs, sketches, and patterns created by House of Anna remain the intellectual property of House of Anna. Clients may not reproduce, replicate, or distribute these designs without explicit written consent. Garments produced are for personal use only.",
  },
  {
    title: "Limitation of Liability",
    content:
      "House of Anna shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services, including but not limited to delays caused by factors beyond our control such as fabric availability, shipping delays, or force majeure.",
  },
  {
    title: "Governing Law",
    content:
      "These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Port Harcourt, Nigeria.",
  },
];

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* ───── Hero Section ───── */}
      <section className="relative py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/hero-image.webp')] bg-cover bg-center opacity-10 bg-fixed" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4 font-medium">Client Agreements</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white leading-tight mb-6">
            Terms of <span className="text-brand-gold italic">Service</span>
          </h1>
          <GoldDivider className="mx-auto" />
        </motion.div>
      </section>

      {/* ───── Main Document Area ───── */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 sm:p-16 lg:p-24 shadow-2xl border border-brand-gold/10 relative"
        >
          {/* Watermark */}
          <div className="absolute top-12 right-12 opacity-[0.03] pointer-events-none select-none">
            <h2 className="font-serif text-8xl md:text-[10rem] text-brand-navy">H.A</h2>
          </div>

          <div className="mb-20 relative z-10">
            <p className="text-brand-gray text-lg sm:text-xl leading-relaxed font-light max-w-3xl">
              Please read these terms carefully before engaging our services. By securing a consultation or making a deposit, you agree to the formal conditions outlined below.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24 relative z-10">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-start"
              >
                {/* Left Side: Number & Title */}
                <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start border-l-[3px] border-brand-gold/20 pl-6 sm:pl-8">
                  <span className="font-serif text-4xl sm:text-5xl text-brand-gold/40 mb-3 block">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-brand-dark leading-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Right Side: Content */}
                <div className="md:col-span-7 lg:col-span-8 md:pt-4">
                  <p className="text-brand-gray text-base sm:text-lg font-light leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sign-Off */}
          <div className="mt-32 pt-16 border-t border-brand-gold/20 flex flex-col items-center text-center relative z-10">
            <span className="font-serif text-3xl text-brand-dark italic mb-3">House of Anna Atelier</span>
            <span className="text-xs tracking-[0.2em] uppercase text-brand-gold font-medium mb-8">Official Terms & Conditions</span>
            <p className="text-xs sm:text-sm text-brand-gray/50 max-w-md">
              Last updated: May 2026. House of Anna reserves the right to update these terms at any time without prior notice.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsPage;
