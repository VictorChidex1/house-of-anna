import React from "react";
import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const SECTIONS = [
  {
    title: "Information We Collect",
    content:
      "When you engage our services or submit an inquiry, we collect personal information including your full name, email address, phone number, and garment measurements. If you choose to upload reference images, we store those securely as well. We may also collect information you provide during consultations, such as style preferences and occasion details.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information solely to provide our tailoring services: to schedule consultations, take measurements, communicate about your order, process payments, and deliver finished garments. With your consent, we may also send you updates about new collections or atelier news via email.",
  },
  {
    title: "Data Storage & Security",
    content:
      "Your personal data is stored securely using Firebase (Google Cloud Platform) with encryption in transit and at rest. Access to your information is limited to House of Anna staff who require it to fulfill your order. We implement industry-standard security measures to protect your data.",
  },
  {
    title: "Third-Party Sharing",
    content:
      "We do not sell, trade, or share your personal information with third parties for their marketing purposes. Data may be shared only with trusted service providers who assist us in operating our business (payment processors, cloud storage) — and only under strict confidentiality agreements.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Measurement data may be kept on file to facilitate future orders. You may request deletion of your data at any time by contacting us.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to request access to the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and withdraw consent for marketing communications at any time. To exercise any of these rights, please contact us via the details on our Contact page.",
  },
  {
    title: "Contact",
    content:
      "If you have any questions about this privacy policy or how your data is handled, please reach out to us through our Contact page, via WhatsApp, or by visiting our studio in Port Harcourt, Nigeria.",
  },
];

const PrivacyPage: React.FC = () => {
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
          <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4 font-medium">Data & Privacy</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white leading-tight mb-6">
            Privacy <span className="text-brand-gold italic">Policy</span>
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
              Your privacy matters to us. This policy outlines exactly how House of Anna handles, protects, and utilizes your personal information to deliver a bespoke tailoring experience.
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
            <span className="text-xs tracking-[0.2em] uppercase text-brand-gold font-medium mb-8">Data Protection Policy</span>
            <p className="text-xs sm:text-sm text-brand-gray/50 max-w-md">
              Last updated: May 2026. House of Anna reserves the right to update this policy at any time without prior notice.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPage;
