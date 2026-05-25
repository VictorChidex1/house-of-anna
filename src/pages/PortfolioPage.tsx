import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">Our Portfolio</h1>
        <GoldDivider className="mx-auto" />
        <p className="text-brand-gray mt-4 max-w-xl mx-auto">
          Browse through our collection of bespoke designs across different fabric categories.
        </p>
      </motion.div>

      <div className="text-center py-20 text-brand-gray">
        <p>Gallery grid coming soon — Step 6.</p>
      </div>
    </div>
  );
};

export default PortfolioPage;
