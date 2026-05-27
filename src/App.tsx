import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import { AdminProvider } from "./contexts/AdminContext";
import Spinner from "./components/ui/Spinner";

const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminInquiriesPage = lazy(() => import("./pages/AdminInquiriesPage"));
const AdminSubscribersPage = lazy(() => import("./pages/AdminSubscribersPage"));

const AdminSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Spinner className="min-h-screen" />}>{children}</Suspense>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminSuspense>
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          </AdminSuspense>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
        <Route path="subscribers" element={<AdminSubscribersPage />} />
      </Route>

      <Route
        path="/admin/login"
        element={
          <AdminSuspense>
            <AdminProvider>
              <AdminLoginPage />
            </AdminProvider>
          </AdminSuspense>
        }
      />
    </Routes>
  );
};

export default App;
