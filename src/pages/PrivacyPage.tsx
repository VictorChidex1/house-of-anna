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
      "We do not sell, trade, or share your personal information with third parties for their marketing purposes. Data may be shared only with trusted service providers who assist us in operating our business (payment processors,cloud storage) — and only under strict confidentiality agreements.",
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
    <div className="min-h-screen py-16 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">Privacy Policy</h1>
        <GoldDivider className="mx-auto" />
        <p className="text-brand-gray mt-4 max-w-xl mx-auto text-sm">
          Your privacy matters to us. Here is how we handle your information.
        </p>
      </motion.div>

      <div className="space-y-10">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <h2 className="font-serif text-xl sm:text-2xl text-brand-dark mb-3">
              {section.title}
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-14 text-xs text-brand-gray/60 text-center border-t border-brand-gold/10 pt-8"
      >
        Last updated: May 2026. House of Anna reserves the right to update this policy at any time.
      </motion.p>
    </div>
  );
};

export default PrivacyPage;
