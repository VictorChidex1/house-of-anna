import { useState, useMemo } from "react";
import { useInquiries } from "../hooks/useInquiries";
import InquiryList from "../components/admin/InquiryList";
import Spinner from "../components/ui/Spinner";
import { FaSearch } from "react-icons/fa";

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
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-dark mb-1">Inquiries</h1>
        <p className="text-sm text-brand-gray">
          {inquiries.length} inquiry{inquiries.length !== 1 ? "ies" : "y"} total
        </p>
      </div>

      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray/50 w-3.5 h-3.5" />
        <input
          type="text"
          placeholder="Search by name, email, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-brand-gold/20 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-gold"
        />
      </div>

      <InquiryList inquiries={filtered} onUpdateStatus={updateStatus} />
    </div>
  );
};

export default AdminInquiriesPage;
