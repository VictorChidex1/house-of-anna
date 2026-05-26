import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import type { GalleryCategory } from "../types";
import type { GalleryItem } from "../types";
import { useGallery } from "../hooks/useGallery";
import GoldDivider from "../components/ui/GoldDivider";
import CategoryFilter from "../components/gallery/CategoryFilter";
import GalleryGrid from "../components/gallery/GalleryGrid";
import ImageLightbox from "../components/gallery/ImageLightbox";
import Pagination from "../components/gallery/Pagination";
import PageSeo from "../components/seo/PageSeo";

const ITEMS_PER_PAGE = 10;

const PortfolioPage: React.FC = () => {
  const { items, loading } = useGallery();
  const [selectedCategories, setSelectedCategories] = useState<GalleryCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategories, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const handleCategoryToggle = (cat: GalleryCategory | "all") => {
    if (cat === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
      );
    }
    setPage(1);
  };

  return (
    <div className="min-h-screen py-16 px-4 max-w-7xl mx-auto">
      <PageSeo
        title="Portfolio — House of Anna"
        description="Browse our curated collection of bespoke gowns, bridal wear, corporate styles, and Ankara creations. Each piece tells a story of craftsmanship."
        path="/portfolio"
        image="/assets/portfolio8.jpeg"
        jsonLd={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://house-of-anna.vercel.app/" }, { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://house-of-anna.vercel.app/portfolio" }] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">Our Portfolio</h1>
        <GoldDivider className="mx-auto" />
        <p className="text-brand-gray mt-4 max-w-xl mx-auto">
          Browse through our collection of bespoke designs across different fabric categories.
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-12 group">
        <FaSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gold/40 w-4 h-4 group-focus-within:text-brand-gold transition-colors duration-500" />
        <input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-brand-gold/20 text-brand-dark font-serif italic text-lg placeholder:text-brand-gray/40 focus:outline-none transition-all duration-500"
        />
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-gold transition-all duration-700 ease-out group-focus-within:w-full" />
      </div>

      <CategoryFilter selected={selectedCategories} onToggle={handleCategoryToggle} />

      {loading ? (
        <div className="text-center py-20 text-brand-gray">Loading gallery...</div>
      ) : (
        <>
          <GalleryGrid items={paginated} onImageClick={setLightboxItem} />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
};

export default PortfolioPage;
