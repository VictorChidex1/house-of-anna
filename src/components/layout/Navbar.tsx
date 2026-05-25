import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            to="/"
            className="shrink-0 flex items-center px-3 py-1.5 rounded shadow-sm"
          >
            <img
              src="/assets/logo.webp"
              alt="House of Anna"
              className="h-16 sm:h-24 w-auto"
            />
          </Link>

          <button
            type="button"
            className="sm:hidden p-2 text-brand-dark"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          <div className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  pathname === link.to
                    ? "text-brand-gold"
                    : "text-brand-gray hover:text-brand-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t border-brand-gold/10">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block text-sm tracking-widest uppercase ${
                  pathname === link.to
                    ? "text-brand-gold"
                    : "text-brand-gray hover:text-brand-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
