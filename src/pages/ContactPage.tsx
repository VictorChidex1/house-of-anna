import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import GoldDivider from "../components/ui/GoldDivider";
import PageSeo from "../components/seo/PageSeo";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Bespoke Gown",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "new"
      });
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", serviceType: "Bespoke Gown", message: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <PageSeo
        title="Contact The Atelier — House of Anna"
        description="Ready to begin your bespoke journey? Reach out to House of Anna's studio in Port Harcourt, Nigeria."
        path="/contact"
        image="/assets/logo.webp"
        jsonLd={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://house-of-anna.vercel.app/" }, { "@type": "ListItem", position: 2, name: "Contact", item: "https://house-of-anna.vercel.app/contact" }] }}
      />
      {/* ───── Hero Section ───── */}
      <section className="relative py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/hero-image.webp')] bg-cover bg-center opacity-10 bg-fixed" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <p className="text-brand-gold tracking-[0.3em] uppercase text-xs mb-4 font-medium">Get in Touch</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white leading-tight mb-6">
            Contact <span className="text-brand-gold italic">The Atelier</span>
          </h1>
          <GoldDivider className="mx-auto" />
        </motion.div>
      </section>

      {/* ───── Main Contact Area ───── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-6">Studio Information</h2>
            <p className="text-brand-gray leading-relaxed mb-12 max-w-md">
              Whether you are ready to begin your bespoke journey or simply have a question about our collections, we would love to hear from you.
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-2 font-medium">Location</h4>
                <p className="text-brand-dark font-light text-lg">Port-Harcourt, Nigeria</p>
                <p className="text-brand-gray text-sm mt-1">Consultations by appointment only.</p>
              </div>

              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-2 font-medium">Direct Line</h4>
                <a href="https://wa.me/2347066659660" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-light text-lg hover:text-brand-gold transition-colors">
                  +234 706 665 9660 (WhatsApp)
                </a>
              </div>

              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-2 font-medium">Email</h4>
                <a href="mailto:Annpeter19@gmail.com" className="text-brand-dark font-light text-lg hover:text-brand-gold transition-colors">
                  Annpeter19@gmail.com
                </a>
              </div>

              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-2 font-medium">Social</h4>
                <a href="https://www.instagram.com/house_of_anna_/" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-light text-lg hover:text-brand-gold transition-colors">
                  @house_of_anna_
                </a>
              </div>
            </div>

            {/* Decorative Image */}
            <div className="relative aspect-[4/3] w-full max-w-sm mt-auto overflow-hidden">
               <img src="/assets/portfolio8.jpeg" alt="Atelier Details" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-brand-navy/10 mix-blend-overlay" />
            </div>
          </motion.div>

          {/* Right Side: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 sm:p-12 shadow-sm border border-brand-gold/10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">Send an Inquiry</h2>
            <GoldDivider className="mb-8" />

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-brand-dark mb-4">Message Received</h3>
                <p className="text-brand-gray leading-relaxed">
                  Thank you for your interest in House of Anna. We have received your inquiry and Anna will be in touch with you shortly to begin your bespoke journey.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-all text-xs tracking-[0.2em] uppercase"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && <div className="p-4 bg-red-50 text-red-600 text-sm">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="peer w-full bg-transparent border-b border-brand-gold/30 py-3 text-brand-dark focus:outline-none focus:border-brand-gold placeholder-transparent transition-colors" placeholder="Full Name" />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-brand-gray/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-gold tracking-widest uppercase">Full Name</label>
                  </div>
                  <div className="relative group">
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="peer w-full bg-transparent border-b border-brand-gold/30 py-3 text-brand-dark focus:outline-none focus:border-brand-gold placeholder-transparent transition-colors" placeholder="Email Address" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-brand-gray/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-gold tracking-widest uppercase">Email Address</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="peer w-full bg-transparent border-b border-brand-gold/30 py-3 text-brand-dark focus:outline-none focus:border-brand-gold placeholder-transparent transition-colors" placeholder="Phone Number" />
                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-brand-gray/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-gold tracking-widest uppercase">Phone Number</label>
                  </div>
                  <div className="relative group">
                    <select name="serviceType" id="serviceType" value={formData.serviceType} onChange={handleChange} className="peer w-full bg-transparent border-b border-brand-gold/30 py-3 text-brand-dark focus:outline-none focus:border-brand-gold transition-colors appearance-none rounded-none">
                      <option value="Bespoke Gown">Bespoke Gown</option>
                      <option value="Corporate Wear">Corporate Wear</option>
                      <option value="Traditional/Ankara">Traditional/Ankara</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Alterations">Alterations</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold/50">▼</div>
                    <label htmlFor="serviceType" className="absolute left-0 -top-3.5 text-xs text-brand-gray/70 tracking-widest uppercase">Service Type</label>
                  </div>
                </div>

                <div className="relative group pt-4">
                  <textarea name="message" id="message" required rows={4} value={formData.message} onChange={handleChange} className="peer w-full bg-transparent border-b border-brand-gold/30 py-3 text-brand-dark focus:outline-none focus:border-brand-gold placeholder-transparent transition-colors resize-none" placeholder="Tell us about your vision..." />
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs text-brand-gray/70 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-gray/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-gold tracking-widest uppercase">Tell us about your vision...</label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-navy text-white font-medium tracking-[0.2em] uppercase text-sm hover:bg-brand-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
