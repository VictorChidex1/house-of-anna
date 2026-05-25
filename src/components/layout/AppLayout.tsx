import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";
import ScrollToTopOnRoute from "../ui/ScrollToTopOnRoute";
import WhatsAppButton from "../ui/WhatsAppButton";

const AppLayout: React.FC = () => {
  return (
    <>
      <ScrollToTopOnRoute />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default AppLayout;
