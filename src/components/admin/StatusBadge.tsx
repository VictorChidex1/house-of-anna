import type { InquiryStatus } from "../../types";

const STYLES: Record<InquiryStatus, string> = {
  new: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  contacted: "bg-blue-100 text-blue-700 border-blue-300",
  booked: "bg-green-100 text-green-700 border-green-300",
};

interface StatusBadgeProps {
  status: InquiryStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-[10px] tracking-widest uppercase border rounded-full font-medium ${STYLES[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
