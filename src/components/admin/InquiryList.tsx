import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Inquiry, InquiryStatus } from "../../types";
import StatusBadge from "./StatusBadge";

interface InquiryListProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: InquiryStatus) => void;
}

const STATUS_OPTIONS: InquiryStatus[] = ["new", "contacted", "booked"];

const InquiryList: React.FC<InquiryListProps> = ({ inquiries, onUpdateStatus }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const formatDate = (ts: Inquiry["createdAt"]): string => {
    if (!ts) return "";
    const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-3">
      {inquiries.length === 0 ? (
        <p className="text-center py-12 text-brand-gray text-sm">No inquiries yet.</p>
      ) : (
        inquiries.map((inq) => {
          const open = expanded === inq.id;
          return (
            <div
              key={inq.id}
              className="border border-brand-gold/10 bg-white overflow-hidden"
            >
              <button
                onClick={() => setExpanded(open ? null : inq.id)}
                className="w-full flex flex-wrap items-center gap-3 p-4 text-left hover:bg-brand-cream/50 transition-colors"
              >
                <span className="flex-1 min-w-0 text-sm font-medium text-brand-dark truncate">
                  {inq.name}
                </span>
                <span className="text-xs text-brand-gray hidden sm:inline truncate max-w-[180px]">
                  {inq.email}
                </span>
                <StatusBadge status={inq.status} />
                <span className="text-[10px] text-brand-gray/60 tracking-wider whitespace-nowrap">
                  {formatDate(inq.createdAt)}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-brand-gold/5"
                  >
                    <div className="p-4 sm:p-6 space-y-4 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                            Email
                          </span>
                          <span className="text-brand-dark">{inq.email}</span>
                        </div>
                        {inq.phone && (
                          <div>
                            <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                              Phone
                            </span>
                            <span className="text-brand-dark">{inq.phone}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                            Service
                          </span>
                          <span className="text-brand-dark">{inq.serviceType}</span>
                        </div>
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                            Budget
                          </span>
                          <span className="text-brand-dark">{inq.budgetRange}</span>
                        </div>
                        {inq.eventDate && (
                          <div>
                            <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                              Event Date
                            </span>
                            <span className="text-brand-dark">{formatDate(inq.eventDate)}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                            Status
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              onUpdateStatus(inq.id, e.target.value as InquiryStatus)
                            }
                            className="px-2 py-1 border border-brand-gold/20 text-xs text-brand-dark bg-transparent focus:outline-none focus:border-brand-gold"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-brand-gold block mb-0.5">
                          Message
                        </span>
                        <p className="text-brand-gray leading-relaxed">{inq.message}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </div>
  );
};

export default InquiryList;
