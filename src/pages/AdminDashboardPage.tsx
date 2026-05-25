import React from "react";
import { motion } from "framer-motion";
import ImageUploader from "../components/admin/ImageUploader";
import ImageGrid from "../components/admin/ImageGrid";
import GoldDivider from "../components/ui/GoldDivider";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-2">Dashboard</h1>
        <GoldDivider className="mb-4 w-16 mx-0" />
        <p className="text-brand-gray font-light">Manage your portfolio and oversee atelier operations.</p>
      </motion.div>

      {/* Atelier Overview Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 shadow-sm border border-brand-gold/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="font-serif text-6xl text-brand-gold">P</span>
          </div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-brand-gray mb-2 font-medium">Portfolio Items</h3>
          <p className="font-serif text-4xl text-brand-dark">Active</p>
        </div>
        
        <div className="bg-white p-6 shadow-sm border border-brand-gold/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="font-serif text-6xl text-brand-gold">I</span>
          </div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-brand-gray mb-2 font-medium">New Inquiries</h3>
          <p className="font-serif text-4xl text-brand-dark">Live</p>
        </div>

        <div className="bg-white p-6 shadow-sm border border-brand-gold/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="font-serif text-6xl text-brand-gold">S</span>
          </div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-brand-gray mb-2 font-medium">System Status</h3>
          <p className="font-serif text-4xl text-brand-dark text-green-600">Online</p>
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 sm:p-10 shadow-lg border border-brand-gold/10"
      >
        <h2 className="font-serif text-2xl text-brand-dark mb-6">Add to Collection</h2>
        <ImageUploader />
      </motion.div>

      {/* Gallery Grid Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-6 sm:p-10 shadow-lg border border-brand-gold/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h2 className="font-serif text-2xl text-brand-dark mb-4 sm:mb-0">Gallery Management</h2>
          <span className="text-xs tracking-widest uppercase text-brand-gray bg-brand-cream px-4 py-2 border border-brand-gold/20">Live Sync</span>
        </div>
        <ImageGrid />
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;
