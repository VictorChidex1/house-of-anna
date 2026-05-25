import HeroSection from "../components/sections/HeroSection";
import FeaturedWorks from "../components/sections/FeaturedWorks";
import ServicesSection from "../components/sections/ServicesSection";
import SummarySection from "../components/sections/SummarySection";
import TestimonialsSection from "../components/sections/TestimonialsSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedWorks />
      <ServicesSection />
      <SummarySection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
