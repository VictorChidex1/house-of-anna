import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-white/80 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Newsletter Section */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-brand-gold/10 pb-16">
          <div>
            <h3 className="font-serif text-3xl text-brand-gold mb-2">
              Join the Inner Circle
            </h3>
            <p className="text-white/60 text-sm">
              Subscribe to receive exclusive access to new collections and
              atelier news.
            </p>
          </div>
          <form
            className="flex w-full md:max-w-md md:justify-self-end group"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="bg-transparent border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold py-2 px-0 w-full transition-colors rounded-none"
            />
            <button
              type="submit"
              className="ml-4 font-serif text-brand-gold tracking-widest uppercase text-sm hover:text-white transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: The Brand */}
          <div className="lg:pr-8">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/assets/logo.webp"
                alt="House of Anna"
                className="h-20 sm:h-24 w-auto"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Bespoke tailoring and fashion design — meticulously crafting
              elegance, confidence, and identity for every occasion.
            </p>
            <p className="text-xs text-brand-gold tracking-widest uppercase font-medium">
              Port-Harcourt, Nigeria
            </p>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="font-serif text-lg text-brand-gold mb-6">
              Collections
            </h4>
            <div className="space-y-4 flex flex-col">
              {[
                "Bespoke Bridal",
                "Corporate Wear",
                "Traditional Couture",
                "Expert Alterations",
              ].map((item) => (
                <Link
                  key={item}
                  to="/services"
                  className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: The House */}
          <div>
            <h4 className="font-serif text-lg text-brand-gold mb-6">
              The House
            </h4>
            <div className="space-y-4 flex flex-col">
              {[
                { label: "About Anna", to: "/about" },
                { label: "The Portfolio", to: "/portfolio" },
                { label: "Contact Studio", to: "/contact" },
                { label: "Terms of Service", to: "/terms" },
                { label: "Privacy Policy", to: "/privacy" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-serif text-lg text-brand-gold mb-6">Connect</h4>
            <div className="space-y-4 flex flex-col text-sm text-white/60">
              <a
                href="https://wa.me/2347066659660"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
              >
                Pinterest
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* Grand Sign-Off */}
        <div className="mt-20 pt-8 border-t border-brand-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} HOUSE OF ANNA. ALL RIGHTS
            RESERVED.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link
              to="/terms"
              className="hover:text-brand-gold transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-brand-gold transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
