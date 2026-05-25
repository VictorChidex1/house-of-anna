import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-[3/4] bg-brand-gold/10 flex items-center justify-center text-brand-gray">
              [Anna's Photo]
            </div>
          </div>

          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">
              The Story Behind <span className="text-brand-gold">the Stitch</span>
            </h1>
            <GoldDivider className="mb-6" />
            <div className="space-y-4 text-brand-gray leading-relaxed">
              <p>
                House of Anna was born from a passion for fabric, form, and the transformative
                power of a perfectly fitted garment. With years of experience in bespoke tailoring,
                Anna Peter has dressed clients for weddings, galas, corporate events, and everyday
                elegance.
              </p>
              <p>
                Every piece that leaves the House of Anna studio is a collaboration — a dialogue
                between the client's vision and the artist's expertise. We believe clothing is more
                than fabric; it's identity, confidence, and art.
              </p>
              <p>
                Whether you're dreaming of a show-stopping bridal gown or a perfectly tailored
                blazer for the boardroom, Anna brings the same dedication to every stitch.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
