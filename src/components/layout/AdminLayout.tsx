import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useAdmin } from "../../hooks/useAdmin";
import Spinner from "../ui/Spinner";

const NAV = [
  { label: "Dashboard", to: "/admin" },
  { label: "Inquiries", to: "/admin/inquiries" },
];

const AdminLayout: React.FC = () => {
  const { user, loading, logout } = useAdmin();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <Spinner className="min-h-screen" />;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-brand-cream">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-brand-navy text-white transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-2xl flex flex-col`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <Link to="/admin" className="block">
              <img 
                src="/assets/logo.webp" 
                alt="House of Anna" 
                className="h-16 w-auto object-contain bg-white/5 rounded p-2 border border-brand-gold/20" 
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-brand-gold transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 px-4 font-medium">Menu</p>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`block px-4 py-3 text-sm tracking-wider transition-all duration-300 ${
                  pathname === item.to
                    ? "bg-brand-gold/15 text-brand-gold border-l-2 border-brand-gold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-2 mt-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 px-4 font-medium">System</p>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider text-white/60 hover:text-brand-gold hover:bg-white/5 transition-all duration-300"
            >
              <FaHome className="w-4 h-4" />
              Live Website
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm tracking-wider text-white/60 hover:text-red-400 hover:bg-white/5 transition-all duration-300 text-left"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-gold/10 flex items-center justify-between px-4 sm:px-8 h-16 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-brand-dark"
              aria-label="Open sidebar"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <span className="font-serif text-brand-dark hidden sm:block text-lg">Atelier Command Center</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest text-brand-gray px-4 py-1.5 bg-white border border-brand-gold/20 rounded-full hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="text-xs tracking-widest uppercase text-brand-gray hover:text-brand-dark transition-colors sm:hidden"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8 lg:p-12 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
