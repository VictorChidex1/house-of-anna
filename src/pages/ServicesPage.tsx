import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const SERVICES = [
  {
    title: "Bespoke Gowns",
    description:
      "Custom evening gowns, bridal wear, and special occasion dresses crafted to your measurements with premium fabrics.",
    price: "₦150,000 — ₦500,000",
  },
  {
    title: "Corporate & Office Wear",
    description:
      "Tailored professional attire including pantsuits, blazers, and smart-casual pieces for the modern professional.",
    price: "₦80,000 — ₦250,000",
  },
  {
    title: "Traditional & Ankara",
    description:
      "Modern interpretations of traditional African styles using Ankara, lace, and other vibrant fabrics.",
    price: "₦70,000 — ₦200,000",
  },
  {
    title: "Bridal & Wedding Party",
    description:
      "Complete bridal collections including the bride's gown, bridesmaids, and mother-of-the-bride outfits.",
    price: "₦300,000 — ₦1,500,000",
  },
  {
    title: "Alterations & Restyling",
    description:
      "Expert alterations, resizing, and restyling of existing garments to give them a new lease on life.",
    price: "₦15,000 — ₦80,000",
  },
  {
    title: "Fabric Sourcing",
    description:
      "Personal shopping assistance for sourcing quality fabrics locally and internationally.",
    price: "Consultation based",
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">Our Services</h1>
        <GoldDivider className="mx-auto" />
        <p className="text-brand-gray mt-4 max-w-xl mx-auto">
          From concept to creation — every garment is a masterpiece in the making.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 border border-brand-gold/10 hover:border-brand-gold/30 transition-colors flex flex-col"
          >
            <h3 className="font-serif text-xl text-brand-dark mb-3">{service.title}</h3>
            <p className="text-sm text-brand-gray leading-relaxed flex-1 mb-4">
              {service.description}
            </p>
            <p className="text-brand-gold font-medium text-sm tracking-wide">{service.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
