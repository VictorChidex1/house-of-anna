import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { GalleryItem, GalleryCategory } from "../types";

const SEED_IMAGES: GalleryItem[] = [
  {
    id: "seed-1",
    imageUrl: "/assets/portfolio1.jpg",
    thumbnailUrl: "/assets/portfolio1.jpg",
    category: "blazers" as GalleryCategory,
    title: "The 'Moremi' Crimson Blazer Set",
    description:
      "A bold crepe blazer set in deep crimson — tailored for power and elegance. Named after the legendary Yoruba queen who led with courage and style.",
    featured: true,
    createdAt: { seconds: 0, nanoseconds: 0, toDate: () => new Date() },
  },
  {
    id: "seed-2",
    imageUrl: "/assets/portfolio2.jpg",
    thumbnailUrl: "/assets/portfolio2.jpg",
    category: "bespoke-gowns" as GalleryCategory,
    title: "The 'Oyin' Sculpted Asymmetric Dress",
    description:
      "Liquid silk meets architectural form. This honey-hued asymmetric dress drapes like poetry — soft, luminous, and effortlessly commanding.",
    featured: true,
    createdAt: { seconds: 1, nanoseconds: 0, toDate: () => new Date() },
  },
  {
    id: "seed-3",
    imageUrl: "/assets/portfolio3.jpg",
    thumbnailUrl: "/assets/portfolio3.jpg",
    category: "ankara" as GalleryCategory,
    title: "The 'Amara' Geometric Wrap Set",
    description:
      "Vibrant Ankara reimagined through precision geometry and clean lines. A celebration of culture wrapped in contemporary grace.",
    featured: true,
    createdAt: { seconds: 2, nanoseconds: 0, toDate: () => new Date() },
  },
  {
    id: "seed-4",
    imageUrl: "/assets/portfolio4.jpg",
    thumbnailUrl: "/assets/portfolio4.jpg",
    category: "ankara" as GalleryCategory,
    title: "The 'Ife' Vintage Lace Gown",
    description:
      "A timeless masterpiece in vintage lace, inspired by the ancient city of Ife — where art and royalty converge. Designed for the woman who carries tradition with grace.",
    featured: false,
    createdAt: { seconds: 3, nanoseconds: 0, toDate: () => new Date() },
  },
];

export function useGallery() {
  const [firestoreItems, setFirestoreItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items: GalleryItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryItem[];
      setFirestoreItems(items);
      setLoading(false);
    });
    return unsub;
  }, []);

  const sorted = [...firestoreItems].sort(
    (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
  );
  const all = [...SEED_IMAGES, ...sorted];

  return { items: all, seedCount: SEED_IMAGES.length, loading };
}
