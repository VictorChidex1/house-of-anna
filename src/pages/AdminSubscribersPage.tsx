import React, { useState, useMemo } from "react";
import { useSubscribers } from "../hooks/useSubscribers";
import Spinner from "../components/ui/Spinner";
import { FaSearch, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import GoldDivider from "../components/ui/GoldDivider";

const AdminSubscribersPage: React.FC = () => {
  const { subscribers, loading } = useSubscribers();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return subscribers;
    const q = search.toLowerCase();
    return subscribers.filter((s) => s.email.toLowerCase().includes(q));
  }, [subscribers, search]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-2">
          Newsletter Subscribers
        </h1>
        <GoldDivider className="mb-4 w-16 mx-0" />
        <p className="text-brand-gray font-light">
          {subscribers.length} {subscribers.length !== 1 ? "subscribers have" : "subscriber has"} joined the Inner Circle.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 sm:p-10 shadow-lg border border-brand-gold/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="font-serif text-2xl text-brand-dark">
            Subscriber List
          </h2>
          <div className="relative w-full sm:max-w-sm">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-brand-gold/20 text-sm text-brand-dark bg-brand-cream/30 focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FaEnvelope className="w-10 h-10 text-brand-gold/20 mx-auto mb-4" />
            <p className="text-brand-gray text-sm">
              {search ? "No subscribers match your search." : "No subscribers yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-brand-gold/10">
            {filtered.map((sub, idx) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <FaEnvelope className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <span className="text-sm text-brand-dark font-medium">
                    {sub.email}
                  </span>
                </div>
                <span className="text-xs text-brand-gray tracking-wider">
                  {sub.createdAt?.toDate
                    ? sub.createdAt.toDate().toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminSubscribersPage;
