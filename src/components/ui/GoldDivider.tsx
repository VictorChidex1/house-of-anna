interface GoldDividerProps {
  className?: string;
}

const GoldDivider: React.FC<GoldDividerProps> = ({ className = "" }) => {
  return <hr className={`h-px w-20 bg-brand-gold border-0 ${className}`} />;
};

export default GoldDivider;
