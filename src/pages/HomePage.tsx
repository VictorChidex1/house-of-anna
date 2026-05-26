import HeroSection from "../components/sections/HeroSection";
import FeaturedWorks from "../components/sections/FeaturedWorks";
import ServicesSection from "../components/sections/ServicesSection";
import SummarySection from "../components/sections/SummarySection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FAQsSection from "../components/sections/FAQsSection";
import PageSeo from "../components/seo/PageSeo";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "House of Anna",
      url: "https://house-of-anna.vercel.app",
      logo: "https://house-of-anna.vercel.app/assets/logo.webp",
      description:
        "Bespoke tailoring and fashion design — meticulously crafting elegance, confidence, and identity for every occasion.",
      sameAs: [
        "https://www.instagram.com/house_of_anna_/",
        "https://wa.me/2347066659660",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-706-665-9660",
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
    {
      "@type": "LocalBusiness",
      name: "House of Anna",
      image: "https://house-of-anna.vercel.app/assets/hero-image.webp",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Port Harcourt",
        addressCountry: "NG",
      },
      telephone: "+234-706-665-9660",
      priceRange: "$$",
    },
  ],
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageSeo
        title="House of Anna — Bespoke Tailoring & Fashion Design"
        description="Discover the art of bespoke fashion with House of Anna. Custom gowns, bridal wear, corporate attire, and Ankara styles crafted in Port Harcourt, Nigeria."
        path="/"
        jsonLd={HOME_JSON_LD}
      />
      <HeroSection />
      <FeaturedWorks />
      <ServicesSection />
      <SummarySection />
      <TestimonialsSection />
      <FAQsSection />
    </div>
  );
};

export default HomePage;

