import { useState, useMemo } from "react";
import { useInquiries } from "../hooks/useInquiries";
import InquiryList from "../components/admin/InquiryList";
import Spinner from "../components/ui/Spinner";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const AdminInquiriesPage: React.FC = () => {
  const { inquiries, loading, updateStatus } = useInquiries();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return inquiries;
    const q = search.toLowerCase();
    return inquiries.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.serviceType.toLowerCase().includes(q),
    );
  }, [inquiries, search]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-2">Inquiries</h1>
        <GoldDivider className="mb-4 w-16 mx-0" />
        <p className="text-brand-gray font-light">
          Manage {inquiries.length} total client {inquiries.length !== 1 ? "inquiries" : "inquiry"}.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 sm:p-10 shadow-lg border border-brand-gold/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="font-serif text-2xl text-brand-dark">Active Requests</h2>
          <div className="relative w-full sm:max-w-sm">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-brand-gold/20 text-sm text-brand-dark bg-brand-cream/30 focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </div>

        <InquiryList inquiries={filtered} onUpdateStatus={updateStatus} />
      </motion.div>
    </div>
  );
};

export default AdminInquiriesPage;
