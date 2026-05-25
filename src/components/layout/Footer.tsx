import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <img
              src="/assets/logo.webp"
              alt="House of Anna"
              className="h-20 sm:h-32 w-auto mb-4"
            />
            <p className="text-sm text-white/60 leading-relaxed">
              Bespoke tailoring and fashion design — crafting elegance for every
              occasion.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-brand-gold mb-3">
              Navigate
            </h4>
            <div className="space-y-2">
              {[
                { label: "Portfolio", to: "/portfolio" },
                { label: "Services", to: "/services" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-brand-gold mb-3">
              Connect
            </h4>
            <div className="space-y-2 text-sm text-white/60">
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <hr className="h-px bg-white/10 border-0 my-8" />

        <p className="text-xs text-white/40 text-center">
          &copy; {new Date().getFullYear()} House of Anna. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
