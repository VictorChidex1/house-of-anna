import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
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
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/admin" className="font-serif text-lg text-brand-gold">
              House of <span className="text-white">Anna</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`block px-4 py-2.5 text-sm tracking-wider transition-colors ${
                  pathname === item.to
                    ? "bg-brand-gold/15 text-brand-gold border-l-2 border-brand-gold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={logout}
            className="px-4 py-2.5 text-sm tracking-wider text-white/40 hover:text-white hover:bg-white/5 transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-gold/10 flex items-center justify-between px-4 sm:px-6 h-14">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-brand-dark"
            aria-label="Open sidebar"
          >
            <FaBars className="w-5 h-5" />
          </button>
          <span className="text-sm text-brand-gray hidden sm:block">
            Welcome, {user.email}
          </span>
          <button
            onClick={logout}
            className="text-xs tracking-widest uppercase text-brand-gray hover:text-brand-dark transition-colors sm:hidden"
          >
            Logout
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
