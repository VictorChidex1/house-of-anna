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
    <div className="min-h-screen py-16 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">Terms of Service</h1>
        <GoldDivider className="mx-auto" />
        <p className="text-brand-gray mt-4 max-w-xl mx-auto text-sm">
          Please read these terms carefully before engaging our services.
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
        Last updated: May 2026. House of Anna reserves the right to update these terms at any time.
      </motion.p>
    </div>
  );
};

export default TermsPage;
